"use client";

import { ApiError, type BirthDetails, type Chart } from "@astrojanta/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BirthForm } from "@/components/birth-form";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { QuotaHint } from "@/components/quota-hint";
import { api } from "@/lib/api";

export function ManglikTool() {
  const [birth, setBirth] = useState<BirthDetails | null>(null);
  const qc = useQueryClient();
  const compute = useMutation({
    mutationFn: (b: BirthDetails) => api.charts.compute(b, "manglik"),
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
            <ArrowLeft className="size-4" /> New check
          </button>
          <ManglikResult name={birth.name} chart={compute.data.chart} />
        </motion.section>
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-10 max-w-xl">
          <Card className="p-6 sm:p-8">
            <BirthForm
              submitLabel="Check Manglik"
              pending={compute.isPending}
              serverError={err && err.code !== "VALIDATION" && err.code !== "QUOTA_EXCEEDED" ? err.message : null}
              serverFields={err?.fields}
              onSubmit={(b) => {
                setBirth(b);
                compute.mutate(b);
              }}
            />
            <QuotaHint feature="manglik" error={err?.code === "QUOTA_EXCEEDED" ? err.message : null} />
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ManglikResult({ name, chart }: { name: string; chart: Chart }) {
  const m = chart.doshas.manglik;
  const present = m.fromLagna === true || m.fromMoon;
  const mars = chart.planets.find((p) => p.name === "Mars");
  return (
    <Card>
      <p className="text-sm text-muted">{name}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl">Manglik dosha</h2>
        <Badge tone={!present ? "good" : m.cancelled ? "gold" : "warn"}>
          {!present ? "No" : m.cancelled ? "Cancelled" : "Yes"}
        </Badge>
      </div>
      <dl className="mt-6 grid gap-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">From Lagna</dt>
          <dd>{m.fromLagna === null ? "needs birth time" : m.fromLagna ? "yes" : "no"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">From Moon</dt>
          <dd>{m.fromMoon ? "yes" : "no"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Mars</dt>
          <dd>{mars ? `${mars.sign}${mars.house ? ` · house ${mars.house}` : ""}` : "—"}</dd>
        </div>
      </dl>
      {m.cancellationReasons.length > 0 && (
        <ul className="mt-4 list-inside list-disc text-sm text-muted">
          {m.cancellationReasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-muted">
        We treat Mars in houses 1, 2, 4, 7, 8 or 12 from Lagna or the Moon as Manglik, with cancellation when Mars is
        strong or Jupiter protects it.
      </p>
      <ButtonLink href="/register" className="mt-6 w-full">
        Ask the AI astrologer
      </ButtonLink>
    </Card>
  );
}
