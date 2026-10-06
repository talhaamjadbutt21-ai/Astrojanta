import { z } from "zod";
import { birthDetailsSchema } from "./birth";

export const profileRelationSchema = z.enum(["self", "partner", "child", "parent", "friend", "other"]);

export const createProfileSchema = z.object({
  relation: profileRelationSchema.default("self"),
  birth: birthDetailsSchema,
});

export const profileIdParamSchema = z.object({ id: z.uuid() });

export interface Profile {
  id: string;
  relation: z.infer<typeof profileRelationSchema>;
  name: string;
  birthDate: string;
  birthTime: string | null;
  placeName: string;
  createdAt: string;
}

export type CreateProfileInput = z.input<typeof createProfileSchema>;
