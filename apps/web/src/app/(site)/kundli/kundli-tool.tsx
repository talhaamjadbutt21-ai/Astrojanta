"use client";

import { ApiError, type BirthDetails } from "@astrojanta/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, MessageCircleHeart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BirthForm } from "@/components/birth-form";
import { ChartView } from "@/components/chart-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuotaHint } from "@/components/quota-hint";
import { api } from "@/lib/api";
import { pendingBirth, useSession } from "@/lib/session";

export function KundliTool() {
  const router = useRouter();
  const { data: user } = useSession();
  const [birth, setBirth] = useState<BirthDetails | null>(null);

  const qc = useQueryClient();
  const compute = useMutation({
    mutationFn: (b: BirthDetails) => api.charts.compute(b, "kundli"),
    onSettled: () => void qc.invalidateQueries({ queryKey: ["usage"] }),
  });
  const save = useMutation({
    mutationFn: (b: BirthDetails) => api.profiles.create({ relation: "self", birth: b }),
    onSuccess: ({ profile }) => router.push(`/chat/${profile.id}`),
  });

  const askAi = () => {
    if (!birth) return;
    if (user) return save.mutate(birth);
    pendingBirth.save(birth);
    router.push("/register?next=/dashboard");
  };

  const err = compute.error instanceof ApiError ? compute.error : null;

  return (
    <AnimatePresence mode="wait">
      {compute.data && birth ? (
        <motion.section
          key="result"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-10 grid gap-6"
          aria-live="polite"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={() => compute.reset()}
                className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
              >
                <ArrowLeft className="size-4" /> New Kundli
              </button>
              <h2 className="font-display text-3xl">{birth.name}’s Kundli</h2>
              <p className="text-sm text-muted">
                {birth.date} · {birth.timeUnknown ? "time unknown" : birth.time} · {birth.place.name}
              </p>
            </div>
            <Button onClick={askAi} loading={save.isPending} size="lg">
              <MessageCircleHeart className="size-5" /> Ask AI about this chart
            </Button>
          </div>
          {save.error && <p className="text-sm text-red-300">{(save.error as Error).message}</p>}
          <ChartView chart={compute.data.chart} transits={compute.data.transits} name={birth.name} />
        </motion.section>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-auto mt-10 max-w-xl"
        >
          <Card className="p-6 sm:p-8">
            <BirthForm
              pending={compute.isPending}
              serverError={err && err.code !== "VALIDATION" && err.code !== "QUOTA_EXCEEDED" ? err.message : null}
              serverFields={err?.fields}
              onSubmit={(b) => {
                setBirth(b);
                compute.mutate(b);
              }}
            />
            <QuotaHint feature="kundli" error={err?.code === "QUOTA_EXCEEDED" ? err.message : null} />
          </Card>
          <p className="mt-4 text-center text-xs text-muted">Nothing is stored unless you choose to save your chart.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
