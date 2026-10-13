import { z } from "zod";
import { birthDetailsSchema } from "./birth";

export const matchingRequestSchema = z.object({
  boy: birthDetailsSchema,
  girl: birthDetailsSchema,
});

export type MatchingRequest = z.input<typeof matchingRequestSchema>;

export interface KootaScore {
  key: "varna" | "vashya" | "tara" | "yoni" | "grahaMaitri" | "gana" | "bhakoot" | "nadi";
  name: string;
  nameHi: string;
  max: number;
  score: number;
  note: string;
}

export interface GunaMilan {
  boy: { name: string; moonSign: string; nakshatra: string };
  girl: { name: string; moonSign: string; nakshatra: string };
  kootas: KootaScore[];
  total: number;
  max: 36;
  verdict: "excellent" | "good" | "average" | "poor";
  nadiDosha: boolean;
  bhakootDosha: boolean;
}
