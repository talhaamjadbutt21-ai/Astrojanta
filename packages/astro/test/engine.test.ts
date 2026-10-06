import { birthDetailsSchema } from "@sebt/shared";
import { describe, expect, it } from "vitest";
import {
  computeChart,
  computeTransits,
  lahiriAyanamsa,
  siderealAscendant,
  siderealLongitude,
  zonedTimeToUtc,
} from "../src";
import { DASHA_YEAR_MS } from "../src/constants";

const DELHI = { name: "New Delhi, India", latitude: 28.6139, longitude: 77.209, timezone: "Asia/Kolkata" };

describe("time zones", () => {
  it("converts IST to UTC", () => {
    expect(zonedTimeToUtc("1990-05-15", "10:30", "Asia/Kolkata").toISOString()).toBe("1990-05-15T05:00:00.000Z");
  });

  it("applies historical war-time offset (+06:30) in India, 1943", () => {
    expect(zonedTimeToUtc("1943-06-01", "12:00", "Asia/Kolkata").toISOString()).toBe("1943-06-01T05:30:00.000Z");
  });

  it("handles DST for diaspora births", () => {
    expect(zonedTimeToUtc("2020-07-01", "09:00", "America/New_York").toISOString()).toBe("2020-07-01T13:00:00.000Z");
  });
});

describe("ayanamsa", () => {
  it("matches Lahiri at J2000 (~23°51′)", () => {
    expect(lahiriAyanamsa(new Date("2000-01-01T12:00:00Z"))).toBeCloseTo(23.857, 2);
  });
});

describe("planet positions", () => {
  it("puts the Sun into sidereal Capricorn around Makar Sankranti 2026 (14 Jan ~15:13 IST)", () => {
    const before = siderealLongitude("Sun", zonedTimeToUtc("2026-01-14", "06:00", "Asia/Kolkata"));
    const after = siderealLongitude("Sun", zonedTimeToUtc("2026-01-15", "00:00", "Asia/Kolkata"));
    expect(Math.floor(before / 30)).toBe(8);
    expect(Math.floor(after / 30)).toBe(9);
  });

  it("has Rahu in sidereal Cancer at J2000", () => {
    const rahu = siderealLongitude("Rahu", new Date("2000-01-01T12:00:00Z"));
    expect(Math.floor(rahu / 30)).toBe(3);
  });

  it("keeps Ketu exactly opposite Rahu", () => {
    const d = new Date("2024-03-01T00:00:00Z");
    const diff = (siderealLongitude("Ketu", d) - siderealLongitude("Rahu", d) + 360) % 360;
    expect(diff).toBeCloseTo(180, 6);
  });
});

describe("ascendant", () => {
  it("rises with the Sun at sunrise in Delhi (equinox 2026, ~06:24 IST)", () => {
    const sunrise = zonedTimeToUtc("2026-03-21", "06:24", "Asia/Kolkata");
    const asc = siderealAscendant(sunrise, DELHI.latitude, DELHI.longitude);
    const sun = siderealLongitude("Sun", sunrise);
    const diff = Math.abs(((asc - sun + 540) % 360) - 180);
    expect(diff).toBeLessThan(2);
  });

  it("passes through all 12 signs in a day", () => {
    const start = zonedTimeToUtc("2026-06-01", "00:00", "Asia/Kolkata").getTime();
    const signs = new Set<number>();
    for (let m = 0; m < 24 * 60; m += 10) {
      signs.add(Math.floor(siderealAscendant(new Date(start + m * 60_000), DELHI.latitude, DELHI.longitude) / 30));
    }
    expect(signs.size).toBe(12);
  });
});

describe("computeChart", () => {
  const birth = birthDetailsSchema.parse({ name: "Test", date: "1995-08-15", time: "07:45", place: DELHI });
  const chart = computeChart(birth, { now: new Date("2026-10-06T00:00:00Z") });

  it("returns all nine grahas with consistent derived fields", () => {
    expect(chart.planets).toHaveLength(9);
    for (const p of chart.planets) {
      expect(p.signIndex).toBe(Math.floor(p.longitude / 30));
      expect(p.house).toBe(((p.signIndex - chart.lagna!.signIndex + 12) % 12) + 1);
      expect(p.degree).toBeGreaterThanOrEqual(0);
      expect(p.degree).toBeLessThan(30);
    }
    // ~2h after sunrise the Sun has risen above the horizon into the 12th (or still the 1st) house.
    expect([12, 1]).toContain(chart.planets.find((p) => p.name === "Sun")!.house);
  });

  it("produces a contiguous 120-year Vimshottari cycle that contains the birth", () => {
    const m = chart.dasha.mahadashas;
    expect(m).toHaveLength(9);
    for (let i = 1; i < m.length; i++) expect(m[i]!.start).toBe(m[i - 1]!.end);
    const span = new Date(m.at(-1)!.end).getTime() - new Date(m[0]!.start).getTime();
    expect(span / DASHA_YEAR_MS).toBeCloseTo(120, 6);
    expect(m[0]!.start <= chart.meta.utc && chart.meta.utc < m[0]!.end).toBe(true);
    expect(chart.dasha.current).not.toBeNull();
  });

  it("matches the well-known Indian Independence chart (15 Aug 1947, 00:00 IST, Delhi)", () => {
    const india = computeChart(
      birthDetailsSchema.parse({ name: "India", date: "1947-08-15", time: "00:00", place: DELHI }),
    );
    const signOf = (name: string) => india.planets.find((p) => p.name === name)!.sign;
    expect(india.lagna!.sign).toBe("Taurus");
    expect(india.moonSign).toBe("Cancer");
    expect(india.birthNakshatra).toBe("Pushya");
    for (const p of ["Sun", "Moon", "Mercury", "Venus", "Saturn"]) expect(signOf(p)).toBe("Cancer");
    expect(signOf("Rahu")).toBe("Taurus");
    expect(signOf("Mars")).toBe("Gemini");
    expect(signOf("Jupiter")).toBe("Libra");
  });

  it("omits lagna and houses when birth time is unknown", () => {
    const noTime = computeChart(
      birthDetailsSchema.parse({ name: "X", date: "1995-08-15", timeUnknown: true, place: DELHI }),
    );
    expect(noTime.lagna).toBeNull();
    expect(noTime.planets.every((p) => p.house === null)).toBe(true);
    expect(noTime.doshas.manglik.fromLagna).toBeNull();
  });
});

describe("transits", () => {
  it("reports Sade Sati phase from Saturn relative to natal Moon", () => {
    const at = new Date("2026-10-06T00:00:00Z");
    const saturnSign = Math.floor(siderealLongitude("Saturn", at) / 30);
    expect(computeTransits(saturnSign, at).sadeSati).toEqual({ active: true, phase: "peak" });
    expect(computeTransits((saturnSign + 6) % 12, at).sadeSati.active).toBe(false);
  });
});
