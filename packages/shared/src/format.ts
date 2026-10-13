import { SIGNS, SIGNS_HI } from "./chart";

export function formatDegree(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${d}°${String(m).padStart(2, "0")}′`;
}

export function formatDate(
  iso: string,
  opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" },
) {
  return new Intl.DateTimeFormat("en-IN", opts).format(new Date(iso));
}

export function yearOf(iso: string) {
  return new Date(iso).getFullYear();
}

export function signHindi(sign: string): string {
  return SIGNS_HI[SIGNS.indexOf(sign as (typeof SIGNS)[number])] ?? "";
}

export const PLANET_ABBR: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

export const PLANET_HI: Record<string, string> = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "गुरु",
  Venus: "शुक्र",
  Saturn: "शनि",
  Rahu: "राहु",
  Ketu: "केतु",
};

export const SIGN_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

/** Whole-sign house layout of the North Indian chart: text anchors in a 400×400 box (houses run anticlockwise). */
export const NORTH_INDIAN_ANCHORS: Record<number, { planets: [number, number]; sign: [number, number] }> = {
  1: { planets: [200, 100], sign: [200, 178] },
  2: { planets: [100, 42], sign: [100, 84] },
  3: { planets: [42, 100], sign: [84, 100] },
  4: { planets: [100, 200], sign: [178, 200] },
  5: { planets: [42, 300], sign: [84, 300] },
  6: { planets: [100, 358], sign: [100, 316] },
  7: { planets: [200, 300], sign: [200, 222] },
  8: { planets: [300, 358], sign: [300, 316] },
  9: { planets: [358, 300], sign: [316, 300] },
  10: { planets: [300, 200], sign: [222, 200] },
  11: { planets: [358, 100], sign: [316, 100] },
  12: { planets: [300, 42], sign: [300, 84] },
};

export interface ChartPlacement {
  name: string;
  signIndex: number;
  retrograde?: boolean;
}

export interface PositionedPlacement extends ChartPlacement {
  x: number;
  y: number;
}

export interface ChartHouse {
  house: number;
  signIndex: number;
  sign: [number, number];
  placements: PositionedPlacement[];
}

/** Lays out placements into the 12 houses of a North Indian chart, spreading crowded houses into rows. */
export function layoutNorthIndianChart(ascendantSignIndex: number, placements: ChartPlacement[]): ChartHouse[] {
  const byHouse = new Map<number, ChartPlacement[]>();
  for (const p of placements) {
    const house = ((p.signIndex - ascendantSignIndex + 12) % 12) + 1;
    byHouse.set(house, [...(byHouse.get(house) ?? []), p]);
  }

  return Array.from({ length: 12 }, (_, i) => {
    const house = i + 1;
    const anchor = NORTH_INDIAN_ANCHORS[house]!;
    const items = byHouse.get(house) ?? [];
    const perRow = house % 3 === 1 ? 3 : 2;
    const rows = Math.ceil(items.length / perRow);
    return {
      house,
      signIndex: (ascendantSignIndex + i) % 12,
      sign: anchor.sign,
      placements: items.map((p, idx) => {
        const row = Math.floor(idx / perRow);
        const col = idx % perRow;
        const inRow = Math.min(perRow, items.length - row * perRow);
        return {
          ...p,
          x: anchor.planets[0] + (col - (inRow - 1) / 2) * 34,
          y: anchor.planets[1] + (row - (rows - 1) / 2) * 20,
        };
      }),
    };
  });
}

/** Builds D1 (rashi) and D9 (navamsa) placements, falling back to a Moon chart when the birth time is unknown. */
export function chartDivisions(chart: {
  lagna: { signIndex: number } | null;
  planets: { name: string; signIndex: number; retrograde: boolean }[];
  navamsa: Record<string, string>;
}) {
  const moon = chart.planets.find((p) => p.name === "Moon")!;
  const d9Sign = (key: string) => SIGNS.indexOf(chart.navamsa[key] as (typeof SIGNS)[number]);
  return {
    D1: {
      ascendant: chart.lagna?.signIndex ?? moon.signIndex,
      placements: [
        ...(chart.lagna ? [{ name: "Lagna", signIndex: chart.lagna.signIndex }] : []),
        ...chart.planets.map((p) => ({ name: p.name, signIndex: p.signIndex, retrograde: p.retrograde })),
      ] as ChartPlacement[],
    },
    D9: {
      ascendant: chart.navamsa.Lagna ? d9Sign("Lagna") : d9Sign("Moon"),
      placements: Object.keys(chart.navamsa).map((k) => ({ name: k, signIndex: d9Sign(k) })) as ChartPlacement[],
    },
  };
}
