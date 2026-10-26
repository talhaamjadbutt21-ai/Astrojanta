import { type AdminOverview, adminGrantProSchema } from "@astrojanta/shared";
import { and, count, desc, eq, gt } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import type { AppContext } from "../app";
import { conversations, messages, proInquiries, users } from "../db/schema";
import { AppError, notFound } from "../lib/errors";
import { parse } from "../lib/validate";
import { requireAdmin } from "../plugins/auth";
import { grantProByEmail, isProUntil } from "../services/entitlements";
import { sendProStatusEmail } from "../services/mail";

const DAY_MS = 86_400_000;

function numbered(value: number | string | bigint | null | undefined): number {
  return Number(value ?? 0);
}

export async function adminRoutes(app: FastifyInstance, { db, env, mailer }: AppContext) {
  app.get("/api/admin/overview", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request) => {
    requireAdmin(request, env);

    const weekAgo = new Date(Date.now() - 7 * DAY_MS);
    const dayAgo = new Date(Date.now() - DAY_MS);

    const [[usersTotal], [usersWeek], [questionsToday], [conversationCount], [proCount], [proSubs]] = await Promise.all([
      db.select({ n: count() }).from(users),
      db.select({ n: count() }).from(users).where(gt(users.createdAt, weekAgo)),
      db
        .select({ n: count() })
        .from(messages)
        .where(and(eq(messages.role, "user"), gt(messages.createdAt, dayAgo))),
      db.select({ n: count() }).from(conversations),
      db.select({ n: count() }).from(proInquiries),
      db.select({ n: count() }).from(users).where(gt(users.proUntil, new Date())),
    ]);

    const overview: AdminOverview = {
      users: { total: numbered(usersTotal?.n), last7Days: numbered(usersWeek?.n) },
      chat: { questionsToday: numbered(questionsToday?.n), conversations: numbered(conversationCount?.n) },
      pro: { inquiries: numbered(proCount?.n), subscribers: numbered(proSubs?.n) },
    };
    return { overview };
  });

  app.get("/api/admin/pro-inquiries", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request) => {
    requireAdmin(request, env);
    const rows = await db.select().from(proInquiries).orderBy(desc(proInquiries.createdAt)).limit(50);
    return {
      inquiries: rows.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        plan: r.plan,
        message: r.message,
        createdAt: r.createdAt.toISOString(),
      })),
    };
  });

  app.post("/api/admin/pro", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request) => {
    requireAdmin(request, env);
    const input = parse(adminGrantProSchema, request.body);
    const updated = await grantProByEmail(db, input.email, input.plan);
    if (!updated) throw notFound("User");

    try {
      await sendProStatusEmail(mailer, env, {
        email: updated.email,
        plan: input.plan,
        proUntil: updated.proUntil,
      });
    } catch (err) {
      request.log.error({ err }, "pro status email failed");
    }

    return {
      user: {
        id: updated.id,
        email: updated.email,
        pro: isProUntil(updated.proUntil),
        proUntil: updated.proUntil?.toISOString() ?? null,
      },
    };
  });

  app.get("/api/admin/users", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request) => {
    requireAdmin(request, env);
    const q = typeof request.query === "object" && request.query && "email" in request.query ? String((request.query as { email?: string }).email ?? "") : "";
    if (!q.trim()) throw new AppError("VALIDATION", "Email is required", { email: ["Email is required"] });
    const [row] = await db
      .select()
      .from(users)
      .where(eq(users.email, q.trim().toLowerCase()))
      .limit(1);
    if (!row) throw notFound("User");
    return {
      user: {
        id: row.id,
        email: row.email,
        pro: isProUntil(row.proUntil),
        proUntil: row.proUntil?.toISOString() ?? null,
        createdAt: row.createdAt.toISOString(),
      },
    };
  });
}
