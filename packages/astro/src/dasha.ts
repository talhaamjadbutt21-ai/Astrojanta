import type { Chart, DashaPeriod, MahaDasha, Planet } from "@astrojanta/shared";
import { DASHA_SEQUENCE, DASHA_YEAR_MS, DASHA_YEARS, NAKSHATRA_SPAN } from "./constants";
import { norm360 } from "./math";

function sequenceFrom(lord: Planet): Planet[] {
  const start = DASHA_SEQUENCE.indexOf(lord);
  return Array.from({ length: 9 }, (_, i) => DASHA_SEQUENCE[(start + i) % 9]!);
}

/** Vimshottari Mahadashas (with Antardashas) covering one full 120-year cycle from the birth dasha. */
export function vimshottari(moonLongitude: number, birth: Date): MahaDasha[] {
  const lon = norm360(moonLongitude);
  const nakIndex = Math.floor(lon / NAKSHATRA_SPAN);
  const firstLord = DASHA_SEQUENCE[nakIndex % 9]!;
  const elapsedFraction = (lon % NAKSHATRA_SPAN) / NAKSHATRA_SPAN;

  let cursor = birth.getTime() - elapsedFraction * DASHA_YEARS[firstLord] * DASHA_YEAR_MS;

  return sequenceFrom(firstLord).map((lord) => {
    const mahaStart = cursor;
    const mahaMs = DASHA_YEARS[lord] * DASHA_YEAR_MS;
    let antarCursor = mahaStart;
    const antardashas: DashaPeriod[] = sequenceFrom(lord).map((antar) => {
      const start = antarCursor;
      antarCursor += (mahaMs * DASHA_YEARS[antar]) / 120;
      return { lord: antar, start: new Date(start).toISOString(), end: new Date(antarCursor).toISOString() };
    });
    cursor += mahaMs;
    return { lord, start: new Date(mahaStart).toISOString(), end: new Date(cursor).toISOString(), antardashas };
  });
}

export function currentDasha(mahadashas: MahaDasha[], at: Date): Chart["dasha"]["current"] {
  const iso = at.toISOString();
  const maha = mahadashas.find((m) => m.start <= iso && iso < m.end);
  const antar = maha?.antardashas.find((a) => a.start <= iso && iso < a.end);
  if (!maha || !antar) return null;
  return { maha: maha.lord, antar: antar.lord, mahaEnds: maha.end, antarEnds: antar.end };
}
