import type { FastifyInstance } from "fastify";
import { computeChart, computeTransits } from "@sebt/astro";
import { createProfileSchema, profileIdParamSchema } from "@sebt/shared";
import { AppError } from "../lib/errors";
import { parse } from "../lib/validate";
import { requireAuth } from "../plugins/auth";
import type { AppContext } from "../app";

const MAX_PROFILES_PER_USER = 25;

export async function profileRoutes(app: FastifyInstance, { profiles }: AppContext) {
  app.get("/api/profiles", async (request) => {
    const { userId } = requireAuth(request);
    return { profiles: await profiles.list(userId) };
  });

  app.post("/api/profiles", async (request, reply) => {
    const { userId } = requireAuth(request);
    const input = parse(createProfileSchema, request.body);
    if ((await profiles.count(userId)) >= MAX_PROFILES_PER_USER) {
      throw new AppError("VALIDATION", `You can save up to ${MAX_PROFILES_PER_USER} profiles`);
    }
    const profile = await profiles.create(userId, input.relation, input.birth);
    return reply.code(201).send({ profile });
  });

  app.get("/api/profiles/:id", async (request) => {
    const { userId } = requireAuth(request);
    const { id } = parse(profileIdParamSchema, request.params);
    const { profile, birth } = await profiles.get(userId, id);
    const chart = computeChart(birth);
    return { profile, chart, transits: computeTransits(chart.planets.find((p) => p.name === "Moon")!.signIndex) };
  });

  app.delete("/api/profiles/:id", async (request, reply) => {
    const { userId } = requireAuth(request);
    const { id } = parse(profileIdParamSchema, request.params);
    await profiles.remove(userId, id);
    return reply.code(204).send();
  });
}
