import { computeChart, computeTransits } from "@astrojanta/astro";
import { type Conversation, chatRequestSchema, type StoredChatMessage } from "@astrojanta/shared";
import { and, asc, desc, eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { CRISIS_REPLY, isCrisisMessage } from "../ai/safety";
import type { AppContext } from "../app";
import { conversations, messages } from "../db/schema";
import { notFound } from "../lib/errors";
import { parse } from "../lib/validate";
import { requireAuth } from "../plugins/auth";
import { consumeFeature, readFeatureQuota } from "../services/usage";

const HISTORY_LIMIT = 20;

const toConversation = (c: typeof conversations.$inferSelect): Conversation => ({
  id: c.id,
  profileId: c.profileId,
  title: c.title,
  createdAt: c.createdAt.toISOString(),
});

export async function chatRoutes(app: FastifyInstance, { db, env, profiles, astrologer }: AppContext) {
  app.get("/api/chat/quota", async (request, reply) => {
    requireAuth(request);
    return { quota: await readFeatureQuota(db, env, request, reply, "chat") };
  });

  app.get("/api/conversations", async (request) => {
    const { userId } = requireAuth(request);
    const { profileId } = parse(z.object({ profileId: z.uuid() }), request.query);
    const rows = await db
      .select()
      .from(conversations)
      .where(and(eq(conversations.userId, userId), eq(conversations.profileId, profileId)))
      .orderBy(desc(conversations.updatedAt))
      .limit(50);
    return { conversations: rows.map(toConversation) };
  });

  app.get("/api/conversations/:id/messages", async (request) => {
    const { userId } = requireAuth(request);
    const { id } = parse(z.object({ id: z.uuid() }), request.params);
    const [conv] = await db
      .select()
      .from(conversations)
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
      .limit(1);
    if (!conv) throw notFound("Conversation");
    const rows = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(asc(messages.createdAt));
    const out: StoredChatMessage[] = rows.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: m.createdAt.toISOString(),
    }));
    return { conversation: toConversation(conv), messages: out };
  });

  app.delete("/api/conversations/:id", async (request, reply) => {
    const { userId } = requireAuth(request);
    const { id } = parse(z.object({ id: z.uuid() }), request.params);
    const deleted = await db
      .delete(conversations)
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
      .returning({ id: conversations.id });
    if (deleted.length === 0) throw notFound("Conversation");
    return reply.code(204).send();
  });

  /** Streams the astrologer's answer as plain UTF-8 text. The conversation id is returned in `x-conversation-id`. */
  app.post("/api/chat", { config: { rateLimit: { max: 20, timeWindow: "1 minute" } } }, async (request, reply) => {
    const { userId } = requireAuth(request);
    const input = parse(chatRequestSchema, request.body);
    const { profile, birth } = await profiles.get(userId, input.profileId);

    await consumeFeature(db, env, request, reply, "chat");

    let conversationId = input.conversationId;
    if (conversationId) {
      const [conv] = await db
        .select({ id: conversations.id })
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            eq(conversations.userId, userId),
            eq(conversations.profileId, profile.id),
          ),
        )
        .limit(1);
      if (!conv) throw notFound("Conversation");
      await db.update(conversations).set({ updatedAt: new Date() }).where(eq(conversations.id, conversationId));
    } else {
      const [conv] = await db
        .insert(conversations)
        .values({ userId, profileId: profile.id, title: input.message.slice(0, 80) })
        .returning({ id: conversations.id });
      conversationId = conv!.id;
    }

    await db.insert(messages).values({ conversationId, userId, role: "user", content: input.message });

    const history = (
      await db
        .select({ role: messages.role, content: messages.content })
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(desc(messages.createdAt))
        .limit(HISTORY_LIMIT)
    ).reverse();

    const abort = new AbortController();
    // Abort only when the *client* drops the response mid-stream.
    // Do not listen to request.raw "close" — that fires after the POST body is read and would
    // cancel the LLM before any tokens arrive.
    const onClientGone = () => {
      if (!reply.raw.writableFinished) abort.abort();
    };

    // Hijacking bypasses Fastify's reply pipeline, so carry over headers set by CORS/helmet hooks.
    const inherited = Object.fromEntries(
      Object.entries(reply.getHeaders()).filter((e): e is [string, string | number | string[]] => e[1] !== undefined),
    );
    reply.hijack();
    reply.raw.writeHead(200, {
      ...inherited,
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
      "x-conversation-id": conversationId,
    });
    reply.raw.on("close", onClientGone);
    // Flush a zero-width space immediately so reverse proxies start the stream
    // before tool calls finish (otherwise a 30s idle timeout returns 500).
    reply.raw.write("\u200b");

    let answer = "";
    try {
      const stream = isCrisisMessage(input.message)
        ? (async function* () {
            yield CRISIS_REPLY;
          })()
        : (() => {
            const chart = computeChart(birth);
            const moon = chart.planets.find((p) => p.name === "Moon")!;
            return astrologer.stream({
              chart,
              transits: computeTransits(moon.signIndex),
              personName: profile.name,
              language: input.language,
              history,
              abortSignal: abort.signal,
            });
          })();

      for await (const chunk of stream) {
        answer += chunk;
        reply.raw.write(chunk);
      }
      if (!answer.trim() && !abort.signal.aborted) {
        const notice = "_I couldn't generate an answer just now. Please try again._";
        answer = notice;
        if (!reply.raw.writableEnded) reply.raw.write(notice);
      }
    } catch (err) {
      if (!abort.signal.aborted) {
        request.log.error({ err }, "astrologer stream failed");
        const notice = "\n\n_Sorry, I couldn't finish that answer. Please try again in a moment._";
        answer += notice;
        if (!reply.raw.writableEnded) reply.raw.write(notice);
      }
    } finally {
      reply.raw.off("close", onClientGone);
      if (answer.trim()) {
        await db
          .insert(messages)
          .values({ conversationId, userId, role: "assistant", content: answer })
          .catch((err: unknown) => request.log.error({ err }, "failed to save assistant message"));
      }
      if (!reply.raw.writableEnded) reply.raw.end();
    }
  });
}
