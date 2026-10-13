import { InvalidTimezoneError, matchKundlis } from "@astronex/astro";
import { matchingRequestSchema } from "@astronex/shared";
import type { FastifyInstance } from "fastify";
import type { AppContext } from "../app";
import { AppError } from "../lib/errors";
import { parse } from "../lib/validate";
import { consumeFeature } from "../services/usage";

export async function matchingRoutes(app: FastifyInstance, { db, env }: AppContext) {
  app.post("/api/matching", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request, reply) => {
    const input = parse(matchingRequestSchema, request.body);
    try {
      const matching = matchKundlis(input.boy, input.girl);
      const quota = await consumeFeature(db, env, request, reply, "matching");
      return { matching, quota };
    } catch (err) {
      if (err instanceof InvalidTimezoneError) {
        throw new AppError("VALIDATION", "Unknown time zone for birthplace", { timezone: [err.message] });
      }
      throw err;
    }
  });
}
