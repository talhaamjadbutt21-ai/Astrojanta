import {
  GUEST_COOKIE,
  PRODUCT_FEATURES,
  type FeatureQuota,
  type ProductFeature,
  type UsagePlan,
  type UsageSnapshot,
} from "@astronex/shared";
import { and, count, eq, gte } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Db } from "../db/client";
import { featureUses } from "../db/schema";
import type { Env } from "../env";
import { AppError } from "../lib/errors";
import { questionLimit } from "./entitlements";

const guestIdSchema = z.uuid();

export function utcDayStart(now = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function utcNextDay(now = new Date()): Date {
  return new Date(utcDayStart(now).getTime() + 86_400_000);
}

export async function planFor(db: Db, env: Env, userId: string | null) {
  if (!userId) return { plan: "guest" as const, pro: false, limit: env.GUEST_DAILY_ATTEMPTS };
  const { pro, limit } = await questionLimit(db, userId, env);
  return { plan: (pro ? "pro" : "free") as UsagePlan, pro, limit };
}

function subjectOf(request: FastifyRequest, reply: FastifyReply, env: Env): { type: "user" | "guest"; id: string } {
  if (request.auth) return { type: "user", id: request.auth.userId };
  const existing = request.cookies[GUEST_COOKIE];
  const id = existing && guestIdSchema.safeParse(existing).success ? existing : crypto.randomUUID();
  reply.setCookie(GUEST_COOKIE, id, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 400 * 86_400,
  });
  return { type: "guest", id };
}

export function quotaMessage(quota: Pick<FeatureQuota, "plan" | "limit">): string {
  if (quota.plan === "guest") {
    return `You've used today's free attempt on this tool. Sign in for 2 attempts per tool each day, or Pro for 6.`;
  }
  if (quota.plan === "free") {
    return `You've used today's ${quota.limit} attempts on this tool. Upgrade to Pro for 6 per day, or come back tomorrow.`;
  }
  return `You've used today's ${quota.limit} Pro attempts on this tool. Come back tomorrow.`;
}

export async function readFeatureQuota(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
  feature: ProductFeature,
): Promise<FeatureQuota> {
  const subject = subjectOf(request, reply, env);
  const { plan, pro, limit } = await planFor(db, env, subject.type === "user" ? subject.id : null);
  const since = utcDayStart();
  const [row] = await db
    .select({ used: count() })
    .from(featureUses)
    .where(
      and(
        eq(featureUses.subjectId, subject.id),
        eq(featureUses.feature, feature),
        gte(featureUses.createdAt, since),
      ),
    );
  const used = Number(row?.used ?? 0);
  return {
    feature,
    used,
    limit,
    remaining: Math.max(0, limit - used),
    resetsAt: utcNextDay().toISOString(),
    plan,
    pro,
  };
}

export async function readUsageSnapshot(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<UsageSnapshot> {
  const features = {} as UsageSnapshot["features"];
  let plan: UsagePlan = "guest";
  let pro = false;
  for (const feature of PRODUCT_FEATURES) {
    const quota = await readFeatureQuota(db, env, request, reply, feature);
    features[feature] = quota;
    plan = quota.plan;
    pro = quota.pro;
  }
  return { plan, pro, features };
}

export async function consumeFeature(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
  feature: ProductFeature,
): Promise<FeatureQuota> {
  const quota = await readFeatureQuota(db, env, request, reply, feature);
  if (quota.remaining <= 0) throw new AppError("QUOTA_EXCEEDED", quotaMessage(quota));
  const subject = subjectOf(request, reply, env);
  await db.insert(featureUses).values({ subjectType: subject.type, subjectId: subject.id, feature });
  return { ...quota, used: quota.used + 1, remaining: quota.remaining - 1 };
}
