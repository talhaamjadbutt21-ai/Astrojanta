import { computeChart, computeTransits, InvalidTimezoneError } from "@astronex/astro";
import { birthDetailsSchema, chartFeatureSchema } from "@astronex/shared";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { AppContext } from "../app";
import { AppError } from "../lib/errors";
import { parse } from "../lib/validate";
import { consumeFeature } from "../services/usage";

/** Public chart computation. Each successful call spends one daily attempt for the requested tool. */
export async function chartRoutes(app: FastifyInstance, { db, env }: AppContext) {
  app.post("/api/charts", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request, reply) => {
    const birth = parse(birthDetailsSchema, request.body);
    const { feature } = parse(z.object({ feature: chartFeatureSchema.default("kundli") }), request.query);
    try {
      const chart = computeChart(birth);
      const quota = await consumeFeature(db, env, request, reply, feature);
      return { chart, transits: computeTransits(chart.planets.find((p) => p.name === "Moon")!.signIndex), quota };
    } catch (err) {
      if (err instanceof InvalidTimezoneError) {
        throw new AppError("VALIDATION", "Unknown time zone for birthplace", { "place.timezone": [err.message] });
      }
      throw err;
    }
  });
}
