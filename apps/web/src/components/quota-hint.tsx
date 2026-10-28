"use client";

import type { FeatureQuota, ProductFeature } from "@astrojanta/shared";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { ReactNode } from "react";
import { api } from "@/lib/api";

export function QuotaHint({ feature, error }: { feature: ProductFeature; error?: string | null }) {
  const usage = useQuery({
    queryKey: ["usage", feature],
    queryFn: () => api.usage.feature(feature),
  });
  const quota = usage.data?.quota;

  return (
    <div className="mt-4 space-y-2 text-center">
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {quota ? <p className="text-xs text-muted">{label(quota)}</p> : null}
    </div>
  );
}

function label(quota: FeatureQuota): ReactNode {
  const left = `${quota.remaining} of ${quota.limit} attempts left today`;
  if (quota.remaining <= 0 && quota.plan === "guest") {
    return (
      <>
        {left}.{" "}
        <Link href="/register" className="text-gold-200 underline">
          Create a free account
        </Link>{" "}
        to keep going and unlock AI chat, or{" "}
        <Link href="/login" className="text-gold-200 underline">
          sign in
        </Link>
        .
      </>
    );
  }
  if (quota.remaining <= 0 && quota.plan === "free") {
    return (
      <>
        {left}.{" "}
        <Link href="/pricing" className="text-gold-200 underline">
          Upgrade to Pro
        </Link>{" "}
        for 6 per tool.
      </>
    );
  }
  if (quota.plan === "guest") return `${left} without an account. A free account also unlocks AI chat.`;
  if (quota.plan === "free") return `${left} on a free account. Pro gets 6 per tool.`;
  return `${left} on Pro.`;
}
