import type { Chart, PlanetPosition } from "@sebt/shared";
import { MANGLIK_HOUSES } from "./constants";
import { houseFrom } from "./math";

type Positions = Map<PlanetPosition["name"], PlanetPosition>;

export function manglik(planets: Positions, lagnaSign: number | null): Chart["doshas"]["manglik"] {
  const mars = planets.get("Mars")!;
  const moon = planets.get("Moon")!;
  const jupiter = planets.get("Jupiter")!;

  const fromLagna = lagnaSign === null ? null : MANGLIK_HOUSES.has(houseFrom(lagnaSign, mars.signIndex));
  const fromMoon = MANGLIK_HOUSES.has(houseFrom(moon.signIndex, mars.signIndex));

  const reasons: string[] = [];
  if (mars.dignity === "own") reasons.push("Mars is in its own sign");
  if (mars.dignity === "exalted") reasons.push("Mars is exalted in Capricorn");
  if (jupiter.signIndex === mars.signIndex) reasons.push("Mars is conjunct Jupiter");
  else if ([5, 7, 9].includes(houseFrom(jupiter.signIndex, mars.signIndex))) {
    reasons.push("Jupiter aspects Mars");
  }

  const present = fromLagna === true || fromMoon;
  return { fromLagna, fromMoon, cancelled: present && reasons.length > 0, cancellationReasons: present ? reasons : [] };
}

const MAHAPURUSHA = {
  Mars: "Ruchaka",
  Mercury: "Bhadra",
  Jupiter: "Hamsa",
  Venus: "Malavya",
  Saturn: "Sasa",
} as const;

export function detectYogas(planets: Positions, lagnaSign: number | null): Chart["yogas"] {
  const yogas: Chart["yogas"] = [];
  const p = (name: PlanetPosition["name"]) => planets.get(name)!;

  if ([1, 4, 7, 10].includes(houseFrom(p("Moon").signIndex, p("Jupiter").signIndex))) {
    yogas.push({
      name: "Gajakesari Yoga",
      description:
        "Jupiter is in a kendra from the Moon, traditionally linked to wisdom, reputation and support from others.",
    });
  }
  if (p("Sun").signIndex === p("Mercury").signIndex) {
    yogas.push({
      name: "Budhaditya Yoga",
      description: "Sun and Mercury share a sign, associated with intelligence, communication and analytical skill.",
    });
  }
  if (p("Moon").signIndex === p("Mars").signIndex) {
    yogas.push({
      name: "Chandra-Mangal Yoga",
      description: "Moon and Mars share a sign, associated with drive, enterprise and earning ability.",
    });
  }
  if (lagnaSign !== null) {
    for (const [planet, yogaName] of Object.entries(MAHAPURUSHA) as [keyof typeof MAHAPURUSHA, string][]) {
      const pos = p(planet);
      const inKendra = [1, 4, 7, 10].includes(houseFrom(lagnaSign, pos.signIndex));
      if (inKendra && (pos.dignity === "own" || pos.dignity === "exalted")) {
        yogas.push({
          name: `${yogaName} Yoga`,
          description: `${planet} is strong (${pos.dignity}) in a kendra from the Lagna — one of the Pancha Mahapurusha yogas.`,
        });
      }
    }
  }
  return yogas;
}
