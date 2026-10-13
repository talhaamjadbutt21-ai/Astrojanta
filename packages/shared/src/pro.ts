import { z } from "zod";
import { emailSchema } from "./auth";

const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const optionalText = (max: number) => z.preprocess(blankToUndefined, z.string().trim().max(max).optional());

/** Inbox that receives Pro requests and sends payment links manually. */
export const DEFAULT_PRO_REQUEST_EMAIL = "talha.amjadbutt.21@gmail.com";

export const proPlanSchema = z.enum(["monthly", "yearly"]);

export const proInquirySchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required" }).max(80),
  email: emailSchema,
  phone: optionalText(20),
  plan: proPlanSchema,
  message: optionalText(500),
});

export const proConfigSchema = z.object({
  mode: z.literal("manual"),
  requestEmail: z.email(),
  /** True when the API can send Resend emails (RESEND_API_KEY + MAIL_FROM). */
  mailEnabled: z.boolean().default(false),
  /** True when monthly/yearly payment URLs are configured for auto-email. */
  hasPaymentLink: z.boolean().default(false),
});

export const adminGrantProSchema = z.object({
  email: emailSchema,
  plan: z.enum(["monthly", "yearly", "revoke"]),
});

export type ProInquiryInput = z.input<typeof proInquirySchema>;
export type ProPlan = z.infer<typeof proPlanSchema>;
export type ProConfig = z.infer<typeof proConfigSchema>;
export type AdminGrantProInput = z.infer<typeof adminGrantProSchema>;
