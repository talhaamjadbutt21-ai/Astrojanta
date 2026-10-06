export const PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"] as const;
export type Planet = (typeof PLANETS)[number];

export const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;
export type Sign = (typeof SIGNS)[number];

export const SIGNS_HI = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrishchika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
] as const;

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const;
export type Nakshatra = (typeof NAKSHATRAS)[number];

export type Dignity = "exalted" | "debilitated" | "own" | "neutral";

export interface PlanetPosition {
  name: Planet;
  /** Sidereal longitude 0–360°. */
  longitude: number;
  sign: Sign;
  signIndex: number;
  /** Degree within sign, 0–30°. */
  degree: number;
  /** Whole-sign house from Lagna, 1–12. Null when birth time is unknown. */
  house: number | null;
  nakshatra: Nakshatra;
  nakshatraLord: Planet;
  pada: 1 | 2 | 3 | 4;
  retrograde: boolean;
  combust: boolean;
  dignity: Dignity;
}

export interface DashaPeriod {
  lord: Planet;
  start: string;
  end: string;
}

export interface MahaDasha extends DashaPeriod {
  antardashas: DashaPeriod[];
}

export interface Chart {
  meta: {
    ayanamsa: "lahiri";
    ayanamsaValue: number;
    houseSystem: "whole_sign";
    nodeType: "mean";
    utc: string;
    timeUnknown: boolean;
    engineVersion: string;
  };
  lagna: {
    longitude: number;
    sign: Sign;
    signIndex: number;
    degree: number;
    nakshatra: Nakshatra;
    pada: 1 | 2 | 3 | 4;
  } | null;
  moonSign: Sign;
  sunSign: Sign;
  birthNakshatra: Nakshatra;
  planets: PlanetPosition[];
  /** Navamsa (D9) sign of each planet (and lagna if known). */
  navamsa: Record<string, Sign>;
  dasha: {
    system: "vimshottari";
    mahadashas: MahaDasha[];
    current: { maha: Planet; antar: Planet; mahaEnds: string; antarEnds: string } | null;
  };
  doshas: {
    manglik: {
      fromLagna: boolean | null;
      fromMoon: boolean;
      cancelled: boolean;
      cancellationReasons: string[];
    };
  };
  yogas: { name: string; description: string }[];
}

export interface TransitSnapshot {
  at: string;
  planets: Pick<PlanetPosition, "name" | "sign" | "degree" | "retrograde" | "nakshatra">[];
  sadeSati: { active: boolean; phase: "rising" | "peak" | "setting" | null };
}
