import { z } from "zod";

export const placeSchema = z.object({
  name: z.string().trim().min(1).max(200),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  /** IANA time zone, e.g. "Asia/Kolkata". Used to resolve historical UTC offsets. */
  timezone: z.string().min(1).max(64),
});

export const birthDetailsSchema = z
  .object({
    name: z.string().trim().min(1, { error: "Name is required" }).max(80),
    gender: z.enum(["male", "female", "other"]).optional(),
    /** Local civil date at birthplace, YYYY-MM-DD. */
    date: z.iso.date({ error: "Use YYYY-MM-DD" }),
    /** Local civil time at birthplace, HH:mm (24h). Omit when unknown. */
    time: z.iso.time({ precision: -1, error: "Use HH:mm" }).optional(),
    timeUnknown: z.boolean().default(false),
    place: placeSchema,
  })
  .refine((v) => v.timeUnknown || v.time !== undefined, {
    error: "Birth time is required unless marked unknown",
    path: ["time"],
  })
  .refine((v) => v.date >= "1800-01-01" && v.date <= "2199-12-31", {
    error: "Date must be between 1800 and 2199",
    path: ["date"],
  });

export const placeSearchQuerySchema = z.object({
  q: z.string().trim().min(2).max(100),
});

export type Place = z.infer<typeof placeSchema>;
export type BirthDetails = z.infer<typeof birthDetailsSchema>;
export type BirthDetailsInput = z.input<typeof birthDetailsSchema>;
