import { computeChart, computeTransits, InvalidTimezoneError } from "@sebt/astro";
import { birthDetailsSchema } from "@sebt/shared";
import type { FastifyInstance } from "fastify";
import { AppError } from "../lib/errors";
import { parse } from "../lib/validate";

/** Public, stateless chart computation backing the free Kundli tool. Nothing is stored. */
export async function chartRoutes(app: FastifyInstance) {
  app.post("/api/charts", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request) => {
    const birth = parse(birthDetailsSchema, request.body);
    try {
      const chart = computeChart(birth);
      return { chart, transits: computeTransits(chart.planets.find((p) => p.name === "Moon")!.signIndex) };
    } catch (err) {
      if (err instanceof InvalidTimezoneError) {
        throw new AppError("VALIDATION", "Unknown time zone for birthplace", { "place.timezone": [err.message] });
      }
      throw err;
    }
  });
}
