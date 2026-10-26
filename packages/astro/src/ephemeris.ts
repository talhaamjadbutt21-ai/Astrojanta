import type { Planet } from "@astrojanta/shared";
import * as Astronomy from "astronomy-engine";
import { DEG, norm360 } from "./math";

const BODIES: Partial<Record<Planet, Astronomy.Body>> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mars: Astronomy.Body.Mars,
  Mercury: Astronomy.Body.Mercury,
  Jupiter: Astronomy.Body.Jupiter,
  Venus: Astronomy.Body.Venus,
  Saturn: Astronomy.Body.Saturn,
};

/** Julian centuries of TT since J2000.0. */
function centuriesTT(date: Date): number {
  return Astronomy.MakeTime(date).tt / 36525;
}

/** IAU 2006 general precession in longitude, arcseconds. */
function generalPrecessionArcsec(t: number): number {
  return 5028.796195 * t + 1.1054348 * t ** 2 + 0.00007964 * t ** 3 - 0.000023857 * t ** 4;
}

// Lahiri (Chitrapaksha) epoch per the Indian Ephemeris convention, as used by Swiss Ephemeris SIDM_LAHIRI.
const LAHIRI_T0 = (2435553.5 - 2451545.0) / 36525;
const LAHIRI_AYAN_T0 = 23.245524743;

/** Lahiri ayanamsa in degrees (mean, without nutation). */
export function lahiriAyanamsa(date: Date): number {
  const t = centuriesTT(date);
  return LAHIRI_AYAN_T0 + (generalPrecessionArcsec(t) - generalPrecessionArcsec(LAHIRI_T0)) / 3600;
}

/** Geocentric apparent tropical longitude on the true ecliptic of date. */
export function tropicalLongitude(planet: Planet, date: Date): number {
  if (planet === "Rahu") return meanNodeLongitude(date);
  if (planet === "Ketu") return norm360(meanNodeLongitude(date) + 180);

  const body = BODIES[planet];
  if (body === undefined) throw new Error(`No ephemeris body for ${planet}`);
  const time = Astronomy.MakeTime(date);
  const eqj = Astronomy.GeoVector(body, time, true);
  const ect = Astronomy.RotateVector(Astronomy.Rotation_EQJ_ECT(time), eqj);
  return norm360(Math.atan2(ect.y, ect.x) / DEG);
}

/** Mean lunar ascending node (Meeus, Astronomical Algorithms 47.7). */
export function meanNodeLongitude(date: Date): number {
  const t = centuriesTT(date);
  return norm360(125.0445479 - 1934.1362891 * t + 0.0020754 * t ** 2 + t ** 3 / 467441 - t ** 4 / 60616000);
}

export function siderealLongitude(planet: Planet, date: Date): number {
  return norm360(tropicalLongitude(planet, date) - lahiriAyanamsa(date));
}

/** Mean obliquity of the ecliptic (IAU 2006), degrees. */
function meanObliquity(date: Date): number {
  const t = centuriesTT(date);
  return (84381.406 - 46.836769 * t - 0.0001831 * t ** 2 + 0.0020034 * t ** 3) / 3600;
}

/** Tropical ascendant longitude for a geographic location. */
export function tropicalAscendant(date: Date, latitude: number, longitude: number): number {
  const lstHours = Astronomy.SiderealTime(date) + longitude / 15;
  const ramc = norm360(lstHours * 15) * DEG;
  const eps = meanObliquity(date) * DEG;
  const phi = latitude * DEG;
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps)));
  return norm360(asc / DEG);
}

export function siderealAscendant(date: Date, latitude: number, longitude: number): number {
  return norm360(tropicalAscendant(date, latitude, longitude) - lahiriAyanamsa(date));
}

/** True when the planet's sidereal longitude is decreasing at `date`. */
export function isRetrograde(planet: Planet, date: Date): boolean {
  if (planet === "Rahu" || planet === "Ketu") return true;
  if (planet === "Sun" || planet === "Moon") return false;
  const halfDay = 43_200_000;
  const before = siderealLongitude(planet, new Date(date.getTime() - halfDay));
  const after = siderealLongitude(planet, new Date(date.getTime() + halfDay));
  const delta = norm360(after - before);
  return delta > 180;
}
