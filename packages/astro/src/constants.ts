import type { Planet } from "@astrojanta/shared";

export const ENGINE_VERSION = "astro-0.1.0";

export const NAKSHATRA_SPAN = 360 / 27;
export const PADA_SPAN = NAKSHATRA_SPAN / 4;
export const NAVAMSA_SPAN = 30 / 9;

/** Vimshottari order, starting from Ashwini's lord. */
export const DASHA_SEQUENCE: readonly Planet[] = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];

export const DASHA_YEARS: Readonly<Record<Planet, number>> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

/** Mean tropical year in ms; Vimshottari periods are measured in these. */
export const DASHA_YEAR_MS = 365.2425 * 86_400_000;

export const SIGN_LORDS: readonly Planet[] = [
  "Mars",
  "Venus",
  "Mercury",
  "Moon",
  "Sun",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Saturn",
  "Jupiter",
];

export const EXALTATION_SIGN: Partial<Record<Planet, number>> = {
  Sun: 0,
  Moon: 1,
  Mars: 9,
  Mercury: 5,
  Jupiter: 3,
  Venus: 11,
  Saturn: 6,
};

export const OWN_SIGNS: Partial<Record<Planet, readonly number[]>> = {
  Sun: [4],
  Moon: [3],
  Mars: [0, 7],
  Mercury: [2, 5],
  Jupiter: [8, 11],
  Venus: [1, 6],
  Saturn: [9, 10],
};

/** Combustion orbs in degrees from the Sun (direct / retrograde). */
export const COMBUSTION_ORB: Partial<Record<Planet, { direct: number; retro: number }>> = {
  Moon: { direct: 12, retro: 12 },
  Mars: { direct: 17, retro: 17 },
  Mercury: { direct: 14, retro: 12 },
  Jupiter: { direct: 11, retro: 11 },
  Venus: { direct: 10, retro: 8 },
  Saturn: { direct: 15, retro: 15 },
};

export const MANGLIK_HOUSES = new Set([1, 2, 4, 7, 8, 12]);
