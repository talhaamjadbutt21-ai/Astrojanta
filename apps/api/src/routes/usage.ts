import { productFeatureSchema } from "@astronex/shared";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { AppContext } from "../app";
import { parse } from "../lib/validate";
import { readFeatureQuota, readUsageSnapshot } from "../services/usage";

export async function usageRoutes(app: FastifyInstance, { db, env }: AppContext) {
  app.get("/api/usage", async (request, reply) => {
    const { feature } = parse(z.object({ feature: productFeatureSchema.optional() }), request.query);
    if (feature) return { quota: await readFeatureQuota(db, env, request, reply, feature) };
    return readUsageSnapshot(db, env, request, reply);
  });
}
