"use client";

import type { FeatureQuota, ProductFeature } from "@astronex/shared";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { ReactNode } from "react";
import { api } from "@/lib/api";

export function QuotaHint({
  feature,
  error,
}: {
  feature: ProductFeature;
  error?: string | null;
}) {
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
        {left}. <Link href="/register" className="text-gold-200 underline">Sign in</Link> for 2 per tool, or{" "}
        <Link href="/pricing" className="text-gold-200 underline">Pro</Link> for 6.
      </>
    );
  }
  if (quota.remaining <= 0 && quota.plan === "free") {
    return (
      <>
        {left}. <Link href="/pricing" className="text-gold-200 underline">Upgrade to Pro</Link> for 6 per tool.
      </>
    );
  }
  if (quota.plan === "guest") return `${left} without an account. Sign in for 2, Pro for 6.`;
  if (quota.plan === "free") return `${left} on a free account. Pro gets 6 per tool.`;
  return `${left} on Pro.`;
}
