export const DEG = Math.PI / 180;

export function norm360(deg: number): number {
  const r = deg % 360;
  return r < 0 ? r + 360 : r;
}

/** Smallest signed difference a − b in degrees, in (−180, 180]. */
export function angleDiff(a: number, b: number): number {
  const d = norm360(a - b);
  return d > 180 ? d - 360 : d;
}

export function signIndexOf(longitude: number): number {
  return Math.floor(norm360(longitude) / 30) % 12;
}

/** Whole-sign house number (1–12) of `signIndex` counted from `fromSignIndex`. */
export function houseFrom(fromSignIndex: number, signIndex: number): number {
  return ((signIndex - fromSignIndex + 12) % 12) + 1;
}

export function round(value: number, digits = 4): number {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}
