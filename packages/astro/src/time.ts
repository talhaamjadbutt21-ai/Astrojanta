export class InvalidTimezoneError extends Error {
  constructor(timezone: string) {
    super(`Unknown time zone: ${timezone}`);
    this.name = "InvalidTimezoneError";
  }
}

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function formatterFor(timezone: string): Intl.DateTimeFormat {
  let fmt = formatterCache.get(timezone);
  if (!fmt) {
    try {
      fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      throw new InvalidTimezoneError(timezone);
    }
    formatterCache.set(timezone, fmt);
  }
  return fmt;
}

/** UTC offset (ms) of `timezone` at the given instant, using the IANA database (historical rules included). */
export function timezoneOffsetMs(instantMs: number, timezone: string): number {
  const parts = formatterFor(timezone).formatToParts(new Date(instantMs));
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(instantMs / 1000) * 1000;
}

/** Converts a local civil date/time at `timezone` to a UTC Date. */
export function zonedTimeToUtc(date: string, time: string, timezone: string): Date {
  const [y, m, d] = date.split("-").map(Number) as [number, number, number];
  const [hh, mm, ss = 0] = time.split(":").map(Number) as [number, number, number?];
  const localAsUtc = Date.UTC(y, m - 1, d, hh, mm, ss);

  const firstOffset = timezoneOffsetMs(localAsUtc, timezone);
  let utc = localAsUtc - firstOffset;
  const secondOffset = timezoneOffsetMs(utc, timezone);
  if (secondOffset !== firstOffset) utc = localAsUtc - secondOffset;
  return new Date(utc);
}
