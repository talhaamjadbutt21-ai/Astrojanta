"use client";

import { ApiError, type BirthDetails, type Chart, signHindi } from "@astrojanta/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BirthForm } from "@/components/birth-form";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuotaHint } from "@/components/quota-hint";
import { api } from "@/lib/api";
import { formatDegree } from "@/lib/format";

export function MoonSignTool() {
  const [birth, setBirth] = useState<BirthDetails | null>(null);
  const qc = useQueryClient();
  const compute = useMutation({
    mutationFn: (b: BirthDetails) => api.charts.compute(b, "moon_sign"),
    onSettled: () => void qc.invalidateQueries({ queryKey: ["usage"] }),
  });
  const err = compute.error instanceof ApiError ? compute.error : null;

  return (
    <AnimatePresence mode="wait">
      {compute.data && birth ? (
        <motion.section
          key="result"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-10 max-w-xl"
        >
          <button
            type="button"
            onClick={() => compute.reset()}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" /> New calculation
          </button>
          <MoonResult name={birth.name} chart={compute.data.chart} />
        </motion.section>
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-10 max-w-xl">
          <Card className="p-6 sm:p-8">
            <BirthForm
              submitLabel="Find my Moon sign"
              pending={compute.isPending}
              serverError={err && err.code !== "VALIDATION" && err.code !== "QUOTA_EXCEEDED" ? err.message : null}
              serverFields={err?.fields}
              onSubmit={(b) => {
                setBirth(b);
                compute.mutate(b);
              }}
            />
            <QuotaHint feature="moon_sign" error={err?.code === "QUOTA_EXCEEDED" ? err.message : null} />
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MoonResult({ name, chart }: { name: string; chart: Chart }) {
  const moon = chart.planets.find((p) => p.name === "Moon")!;
  const dasha = chart.dasha.current;
  return (
    <Card>
      <p className="text-sm text-muted">{name}</p>
      <h2 className="mt-1 font-display text-3xl">{chart.moonSign}</h2>
      <p className="text-muted">{signHindi(chart.moonSign)} rashi</p>
      <dl className="mt-6 grid gap-3 text-sm">
        <Row label="Nakshatra" value={`${moon.nakshatra} · pada ${moon.pada}`} />
        <Row label="Nakshatra lord" value={moon.nakshatraLord} />
        <Row label="Moon degree" value={formatDegree(moon.degree)} />
        <Row label="Sun sign (sidereal)" value={chart.sunSign} />
        {dasha ? <Row label="Current dasha" value={`${dasha.maha} – ${dasha.antar}`} /> : null}
      </dl>
      <p className="mt-6 text-xs text-muted">
        If the birth time is unknown, the Moon may have changed sign that day. A time from the birth certificate is more
        precise.
      </p>
      <ButtonLink href="/register" className="mt-6 w-full">
        Ask the AI astrologer
      </ButtonLink>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
