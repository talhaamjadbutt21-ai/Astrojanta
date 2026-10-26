import { type Chart, PLANETS, type TransitSnapshot } from "@astrojanta/shared";
import { tool } from "ai";
import { z } from "zod";

/**
 * Read-only tools bound to one already-authorised chart.
 * They take no user/profile identifiers, so the model cannot reach anyone else's data.
 */
export function chartTools(chart: Chart, transits: TransitSnapshot) {
  return {
    getDashaTimeline: tool({
      description:
        "Vimshottari Mahadasha and Antardasha periods overlapping a year range. Use for timing questions (marriage, career change, 'when will…').",
      inputSchema: z.object({
        fromYear: z.number().int().min(1800).max(2200),
        toYear: z.number().int().min(1800).max(2200),
      }),
      execute: async ({ fromYear, toYear }) => {
        const from = `${Math.min(fromYear, toYear)}-01-01`;
        const to = `${Math.max(fromYear, toYear) + 1}-01-01`;
        return chart.dasha.mahadashas
          .filter((m) => m.end > from && m.start < to)
          .map((m) => ({
            mahadasha: m.lord,
            start: m.start.slice(0, 10),
            end: m.end.slice(0, 10),
            antardashas: m.antardashas
              .filter((a) => a.end > from && a.start < to)
              .map((a) => ({ lord: a.lord, start: a.start.slice(0, 10), end: a.end.slice(0, 10) })),
          }));
      },
    }),

    getCurrentTransits: tool({
      description:
        "Current sidereal positions of all planets (Gochar) and Sade Sati status relative to the natal Moon.",
      inputSchema: z.object({}),
      execute: async () => transits,
    }),

    getNavamsa: tool({
      description:
        "Navamsa (D9) signs, used for marriage, partner and dharma questions, and to judge planetary strength.",
      inputSchema: z.object({}),
      execute: async () => chart.navamsa,
    }),

    getPlanetDetails: tool({
      description:
        "Full details for one planet: longitude, nakshatra, pada, nakshatra lord, dignity, retrograde, combustion, house.",
      inputSchema: z.object({ planet: z.enum(PLANETS) }),
      execute: async ({ planet }) => chart.planets.find((p) => p.name === planet) ?? null,
    }),
  };
}
