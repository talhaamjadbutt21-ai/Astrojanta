import { z } from "zod";

export const PRODUCT_FEATURES = ["kundli", "matching", "manglik", "moon_sign", "chat"] as const;
export type ProductFeature = (typeof PRODUCT_FEATURES)[number];
export const productFeatureSchema = z.enum(PRODUCT_FEATURES);
export const chartFeatureSchema = z.enum(["kundli", "manglik", "moon_sign"]);
export type ChartFeature = z.infer<typeof chartFeatureSchema>;

/** httpOnly cookie that identifies a signed-out visitor for per-tool daily limits. */
export const GUEST_COOKIE = "astrojanta_guest";

export type UsagePlan = "guest" | "free" | "pro";

export interface FeatureQuota {
  feature: ProductFeature;
  used: number;
  limit: number;
  remaining: number;
  resetsAt: string;
  plan: UsagePlan;
  pro: boolean;
}

export interface UsageSnapshot {
  plan: UsagePlan;
  pro: boolean;
  features: Record<ProductFeature, FeatureQuota>;
}
