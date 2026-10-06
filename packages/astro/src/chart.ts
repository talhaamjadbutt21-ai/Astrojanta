import {
  type BirthDetails,
  type Chart,
  type Dignity,
  NAKSHATRAS,
  PLANETS,
  type Planet,
  type PlanetPosition,
  SIGNS,
  type TransitSnapshot,
} from "@sebt/shared";
import { detectYogas, manglik } from "./analysis";
import {
  COMBUSTION_ORB,
  DASHA_SEQUENCE,
  ENGINE_VERSION,
  EXALTATION_SIGN,
  NAKSHATRA_SPAN,
  NAVAMSA_SPAN,
  OWN_SIGNS,
  PADA_SPAN,
} from "./constants";
import { currentDasha, vimshottari } from "./dasha";
import { isRetrograde, lahiriAyanamsa, siderealAscendant, siderealLongitude } from "./ephemeris";
import { angleDiff, houseFrom, norm360, round, signIndexOf } from "./math";
import { zonedTimeToUtc } from "./time";

function nakshatraOf(longitude: number) {
  const lon = norm360(longitude);
  const index = Math.floor(lon / NAKSHATRA_SPAN) % 27;
  const pada = (Math.floor((lon % NAKSHATRA_SPAN) / PADA_SPAN) + 1) as 1 | 2 | 3 | 4;
  return { index, name: NAKSHATRAS[index]!, lord: DASHA_SEQUENCE[index % 9]!, pada };
}

function dignityOf(planet: Planet, signIndex: number): Dignity {
  const exalt = EXALTATION_SIGN[planet];
  if (exalt !== undefined) {
    if (signIndex === exalt) return "exalted";
    if (signIndex === (exalt + 6) % 12) return "debilitated";
  }
  if (OWN_SIGNS[planet]?.includes(signIndex)) return "own";
  return "neutral";
}

function navamsaSign(longitude: number) {
  return SIGNS[Math.floor(norm360(longitude) / NAVAMSA_SPAN) % 12]!;
}

function positionsAt(date: Date, lagnaSign: number | null): PlanetPosition[] {
  const sunLon = siderealLongitude("Sun", date);
  return PLANETS.map((name) => {
    const longitude = name === "Sun" ? sunLon : siderealLongitude(name, date);
    const signIndex = signIndexOf(longitude);
    const nak = nakshatraOf(longitude);
    const retrograde = isRetrograde(name, date);
    const orb = COMBUSTION_ORB[name];
    const combust = orb ? Math.abs(angleDiff(longitude, sunLon)) < (retrograde ? orb.retro : orb.direct) : false;
    return {
      name,
      longitude: round(longitude),
      sign: SIGNS[signIndex]!,
      signIndex,
      degree: round(longitude % 30),
      house: lagnaSign === null ? null : houseFrom(lagnaSign, signIndex),
      nakshatra: nak.name,
      nakshatraLord: nak.lord,
      pada: nak.pada,
      retrograde,
      combust,
      dignity: dignityOf(name, signIndex),
    };
  });
}

export interface ChartOptions {
  /** Reference instant used to determine the running dasha. Defaults to now. */
  now?: Date;
}

/** Computes a sidereal (Lahiri, whole-sign) Vedic birth chart. Pure and deterministic for a given input + `now`. */
export function computeChart(birth: BirthDetails, options: ChartOptions = {}): Chart {
  const timeUnknown = birth.timeUnknown || !birth.time;
  const utc = zonedTimeToUtc(birth.date, timeUnknown ? "12:00" : birth.time!, birth.place.timezone);

  let lagna: Chart["lagna"] = null;
  if (!timeUnknown) {
    const lon = siderealAscendant(utc, birth.place.latitude, birth.place.longitude);
    const signIndex = signIndexOf(lon);
    const nak = nakshatraOf(lon);
    lagna = {
      longitude: round(lon),
      sign: SIGNS[signIndex]!,
      signIndex,
      degree: round(lon % 30),
      nakshatra: nak.name,
      pada: nak.pada,
    };
  }

  const planets = positionsAt(utc, lagna?.signIndex ?? null);
  const byName = new Map(planets.map((p) => [p.name, p]));
  const moon = byName.get("Moon")!;
  const sun = byName.get("Sun")!;

  const navamsa: Record<string, (typeof SIGNS)[number]> = {};
  if (lagna) navamsa.Lagna = navamsaSign(lagna.longitude);
  for (const p of planets) navamsa[p.name] = navamsaSign(p.longitude);

  const mahadashas = vimshottari(moon.longitude, utc);

  return {
    meta: {
      ayanamsa: "lahiri",
      ayanamsaValue: round(lahiriAyanamsa(utc), 6),
      houseSystem: "whole_sign",
      nodeType: "mean",
      utc: utc.toISOString(),
      timeUnknown,
      engineVersion: ENGINE_VERSION,
    },
    lagna,
    moonSign: moon.sign,
    sunSign: sun.sign,
    birthNakshatra: moon.nakshatra,
    planets,
    navamsa,
    dasha: { system: "vimshottari", mahadashas, current: currentDasha(mahadashas, options.now ?? new Date()) },
    doshas: { manglik: manglik(byName, lagna?.signIndex ?? null) },
    yogas: detectYogas(byName, lagna?.signIndex ?? null),
  };
}

/** Current planetary transits relative to a natal Moon sign (for Gochar and Sade Sati). */
export function computeTransits(natalMoonSignIndex: number, at: Date = new Date()): TransitSnapshot {
  const planets = positionsAt(at, null);
  const saturn = planets.find((p) => p.name === "Saturn")!;
  const fromMoon = houseFrom(natalMoonSignIndex, saturn.signIndex);
  const phase = fromMoon === 12 ? "rising" : fromMoon === 1 ? "peak" : fromMoon === 2 ? "setting" : null;

  return {
    at: at.toISOString(),
    planets: planets.map(({ name, sign, degree, retrograde, nakshatra }) => ({
      name,
      sign,
      degree,
      retrograde,
      nakshatra,
    })),
    sadeSati: { active: phase !== null, phase },
  };
}
