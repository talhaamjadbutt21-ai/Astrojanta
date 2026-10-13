import { type PlaceResult, placeSearchQuerySchema } from "@astronex/shared";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { AppContext } from "../app";
import { AppError } from "../lib/errors";
import { parse } from "../lib/validate";

const upstreamSchema = z.object({
  results: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        timezone: z.string().optional(),
        country: z.string().optional(),
        admin1: z.string().optional(),
      }),
    )
    .optional(),
});

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX = 2000;

export async function placeRoutes(app: FastifyInstance, { env }: AppContext) {
  const cache = new Map<string, { at: number; results: PlaceResult[] }>();

  app.get("/api/places", { config: { rateLimit: { max: 60, timeWindow: "1 minute" } } }, async (request) => {
    const { q } = parse(placeSearchQuerySchema, request.query);
    const key = q.toLowerCase();
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < CACHE_TTL_MS) return { results: hit.results };

    const url = new URL(env.GEOCODING_URL);
    url.searchParams.set("name", q);
    url.searchParams.set("count", "8");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");

    let data: z.infer<typeof upstreamSchema>;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error(`Geocoder responded ${res.status}`);
      data = upstreamSchema.parse(await res.json());
    } catch (err) {
      request.log.warn({ err }, "place search failed");
      throw new AppError("UPSTREAM", "Place search is temporarily unavailable");
    }

    const results: PlaceResult[] = (data.results ?? [])
      .filter((r) => r.timezone)
      .map((r) => ({
        id: String(r.id),
        name: [r.name, r.admin1, r.country].filter(Boolean).join(", "),
        latitude: r.latitude,
        longitude: r.longitude,
        timezone: r.timezone!,
      }));

    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
    cache.set(key, { at: Date.now(), results });
    return { results };
  });
}
