"use client";

import { ApiError, type BirthDetails, type GunaMilan } from "@astrojanta/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BirthForm } from "@/components/birth-form";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { FormError } from "@/components/ui/field";
import { QuotaHint } from "@/components/quota-hint";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";

const VERDICT: Record<GunaMilan["verdict"], { label: string; tone: "good" | "gold" | "warn" | "bad" }> = {
  excellent: { label: "Excellent match", tone: "good" },
  good: { label: "Good match", tone: "gold" },
  average: { label: "Average — proceed with care", tone: "warn" },
  poor: { label: "Below 18 — traditionally not advised", tone: "bad" },
};

export function MatchingTool() {
  const [boy, setBoy] = useState<BirthDetails | null>(null);
  const [girl, setGirl] = useState<BirthDetails | null>(null);
  const qc = useQueryClient();
  const match = useMutation({
    mutationFn: () => api.matching.compute({ boy: boy!, girl: girl! }),
    onSettled: () => void qc.invalidateQueries({ queryKey: ["usage"] }),
  });
  const err = match.error instanceof ApiError ? match.error : null;

  return (
    <AnimatePresence mode="wait">
      {match.data ? (
        <motion.section key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
          <button
            type="button"
            onClick={() => match.reset()}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" /> New match
          </button>
          <MatchResult matching={match.data.matching} />
        </motion.section>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 grid gap-6 lg:grid-cols-2"
        >
          <Card className="p-6 sm:p-8">
            {boy ? (
              <SavedPerson label="Boy / Groom" birth={boy} onChange={() => setBoy(null)} />
            ) : (
              <BirthForm title="Boy / Groom" submitLabel="Save details" onSubmit={setBoy} />
            )}
          </Card>
          <Card className="p-6 sm:p-8">
            {girl ? (
              <SavedPerson label="Girl / Bride" birth={girl} onChange={() => setGirl(null)} />
            ) : (
              <BirthForm title="Girl / Bride" submitLabel="Save details" onSubmit={setGirl} />
            )}
          </Card>
          <div className="lg:col-span-2">
            <FormError message={err && err.code !== "VALIDATION" && err.code !== "QUOTA_EXCEEDED" ? err.message : null} />
            <QuotaHint feature="matching" error={err?.code === "QUOTA_EXCEEDED" ? err.message : null} />
            <Button
              type="button"
              size="lg"
              className="mt-4 w-full"
              disabled={!boy || !girl}
              loading={match.isPending}
              onClick={() => match.mutate()}
            >
              Check compatibility
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SavedPerson({ label, birth, onChange }: { label: string; birth: BirthDetails; onChange: () => void }) {
  return (
    <div>
      <p className="font-display text-lg text-gold-200">{label}</p>
      <p className="mt-2 text-xl font-medium">{birth.name}</p>
      <p className="mt-1 text-sm text-muted">
        {birth.date} · {birth.timeUnknown ? "time unknown" : birth.time} · {birth.place.name}
      </p>
      <Button variant="ghost" size="sm" className="mt-4" onClick={onChange}>
        Change
      </Button>
    </div>
  );
}

function MatchResult({ matching }: { matching: GunaMilan }) {
  const v = VERDICT[matching.verdict];
  return (
    <div className="grid gap-6">
      <Card className="text-center">
        <p className="text-xs uppercase tracking-wider text-muted">Ashtakoot score</p>
        <p className="mt-2 font-display text-6xl text-gradient-gold">
          {matching.total}
          <span className="text-2xl text-muted">/{matching.max}</span>
        </p>
        <div className="mt-4 flex justify-center">
          <Badge tone={v.tone}>{v.label}</Badge>
        </div>
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <p>
            {matching.boy.name}: {matching.boy.moonSign} · {matching.boy.nakshatra}
          </p>
          <p>
            {matching.girl.name}: {matching.girl.moonSign} · {matching.girl.nakshatra}
          </p>
        </div>
      </Card>
      {(matching.nadiDosha || matching.bhakootDosha) && (
        <Card className="border-amber-400/30">
          <p className="font-medium text-amber-200">Traditional cautions</p>
          <ul className="mt-2 list-inside list-disc text-sm text-muted">
            {matching.nadiDosha && <li>Nadi dosha — both charts share a nadi. Many families treat this as serious.</li>}
            {matching.bhakootDosha && <li>Bhakoot dosha — Moon signs fall in a 2/12, 5/9 or 6/8 relationship.</li>}
          </ul>
        </Card>
      )}
      <Card className="overflow-hidden p-0">
        <div className="px-5 pt-5 sm:px-6">
          <h2 className="font-display text-xl">Eight kootas</h2>
          <p className="text-xs text-muted">Points are from the Moon sign and nakshatra of each person.</p>
        </div>
        <ul className="mt-3">
          {matching.kootas.map((k) => (
            <li
              key={k.key}
              className="flex items-start justify-between gap-4 border-t border-white/5 px-5 py-3 sm:px-6"
            >
              <div>
                <p className="font-medium">
                  {k.name} <span className="text-xs text-muted">{k.nameHi}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted">{k.note}</p>
              </div>
              <span className={cn("tabular-nums font-medium", k.score === 0 ? "text-amber-300" : "text-gold-200")}>
                {k.score}/{k.max}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <p className="text-center text-xs text-muted">
        Guna Milan is one traditional filter, not a verdict on a relationship. An astrologer also weighs dasha, Navamsa
        and Mars.
      </p>
      <div className="flex justify-center">
        <ButtonLink href="/register">Ask the AI astrologer about this match</ButtonLink>
      </div>
    </div>
  );
}
