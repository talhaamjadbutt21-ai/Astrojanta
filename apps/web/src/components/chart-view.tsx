"use client";

import { type Chart, chartDivisions, signHindi, type TransitSnapshot } from "@astronex/shared";
import { Clock, Moon, Orbit, Sparkles, Sunrise } from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { formatDate, formatDegree, PLANET_HI, yearOf } from "@/lib/format";
import { NorthIndianChart } from "./north-indian-chart";
import { Badge, Card } from "./ui/card";

function Stat({ icon, label, value, sub }: { icon: ReactNode; label: string; value: string; sub?: string }) {
  return (
    <Card className="flex items-start gap-3.5 p-4 sm:p-5">
      <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-gold-400/12 text-gold-300">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate font-display text-lg leading-tight sm:text-xl">{value}</p>
        {sub && <p className="truncate text-xs text-muted">{sub}</p>}
      </div>
    </Card>
  );
}

export function ChartView({ chart, transits, name }: { chart: Chart; transits: TransitSnapshot; name: string }) {
  const [division, setDivision] = useState<"D1" | "D9">("D1");
  const moon = chart.planets.find((p) => p.name === "Moon")!;
  const current = chart.dasha.current;
  const manglik = chart.doshas.manglik;
  const manglikPresent = manglik.fromLagna === true || manglik.fromMoon;

  const divisions = chartDivisions(chart);

  const currentMaha = chart.dasha.mahadashas.find((m) => m.lord === current?.maha && m.end === current.mahaEnds);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={<Sunrise className="size-5" />}
          label="Lagna"
          value={chart.lagna ? `${chart.lagna.sign}` : "Unknown"}
          sub={
            chart.lagna ? `${signHindi(chart.lagna.sign)} · ${formatDegree(chart.lagna.degree)}` : "Needs birth time"
          }
        />
        <Stat
          icon={<Moon className="size-5" />}
          label="Moon sign (Rashi)"
          value={chart.moonSign}
          sub={signHindi(chart.moonSign)}
        />
        <Stat
          icon={<Sparkles className="size-5" />}
          label="Nakshatra"
          value={chart.birthNakshatra}
          sub={`Pada ${moon.pada} · lord ${moon.nakshatraLord}`}
        />
        <Stat
          icon={<Clock className="size-5" />}
          label="Current dasha"
          value={current ? `${current.maha} – ${current.antar}` : "—"}
          sub={current ? `Antardasha until ${formatDate(current.antarEnds)}` : undefined}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Card className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl">{division === "D1" ? "Birth chart (D1)" : "Navamsa (D9)"}</h2>
              <p className="text-xs text-muted">
                {division === "D1" && !chart.lagna ? "Moon chart — birth time unknown" : "North Indian style"}
              </p>
            </div>
            <div className="flex rounded-full bg-white/5 p-1" role="tablist" aria-label="Chart division">
              {(["D1", "D9"] as const).map((d) => (
                <button
                  key={d}
                  role="tab"
                  type="button"
                  aria-selected={division === d}
                  onClick={() => setDivision(d)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm transition-colors",
                    division === d ? "bg-gradient-gold text-night-950" : "text-muted hover:text-ink",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <motion.div key={division} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
            <NorthIndianChart
              title={`${name} ${division} chart`}
              ascendantSignIndex={divisions[division].ascendant}
              placements={divisions[division].placements}
            />
          </motion.div>
          <p className="mt-3 text-center text-[11px] text-muted">Numbers are signs (1 = Aries). ℞ = retrograde.</p>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="px-5 pt-5 sm:px-6">
            <h2 className="font-display text-xl">Planetary positions</h2>
            <p className="text-xs text-muted">Sidereal · Lahiri ayanamsa {chart.meta.ayanamsaValue.toFixed(3)}°</p>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-white/8 text-left text-xs uppercase tracking-wider text-muted">
                  <th className="px-5 py-2.5 font-medium sm:px-6">Graha</th>
                  <th className="px-3 py-2.5 font-medium">Sign</th>
                  <th className="px-3 py-2.5 font-medium">Degree</th>
                  <th className="px-3 py-2.5 font-medium">Nakshatra</th>
                  <th className="px-3 py-2.5 font-medium">House</th>
                  <th className="px-3 py-2.5 font-medium" />
                </tr>
              </thead>
              <tbody>
                {chart.planets.map((p) => (
                  <tr key={p.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                    <td className="px-5 py-3 sm:px-6">
                      <span className="font-medium">{p.name}</span>{" "}
                      <span className="text-xs text-muted">{PLANET_HI[p.name]}</span>
                    </td>
                    <td className="px-3 py-3">{p.sign}</td>
                    <td className="px-3 py-3 tabular-nums">{formatDegree(p.degree)}</td>
                    <td className="px-3 py-3">
                      {p.nakshatra} <span className="text-xs text-muted">({p.pada})</span>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{p.house ?? "—"}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.retrograde && p.name !== "Rahu" && p.name !== "Ketu" && <Badge tone="neutral">Retro</Badge>}
                        {p.combust && <Badge tone="warn">Combust</Badge>}
                        {p.dignity === "exalted" && <Badge tone="good">Exalted</Badge>}
                        {p.dignity === "own" && <Badge tone="gold">Own</Badge>}
                        {p.dignity === "debilitated" && <Badge tone="bad">Debilitated</Badge>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-display text-xl">Vimshottari Dasha</h2>
          <p className="mb-5 text-xs text-muted">Planetary periods that time events in your life</p>
          <ol className="grid gap-2">
            {chart.dasha.mahadashas.map((m) => {
              const active = m === currentMaha;
              return (
                <li
                  key={m.start}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm",
                    active ? "border border-gold-400/30 bg-gold-400/10" : "bg-white/[0.03]",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Orbit className={cn("size-4", active ? "text-gold-300" : "text-muted")} />
                    <span className={active ? "font-semibold text-gold-200" : ""}>{m.lord} Mahadasha</span>
                    {active && <Badge tone="gold">Now</Badge>}
                  </span>
                  <span className="tabular-nums text-muted">
                    {yearOf(m.start)} – {yearOf(m.end)}
                  </span>
                </li>
              );
            })}
          </ol>
          {currentMaha && (
            <div className="mt-5">
              <h3 className="mb-2 text-sm font-medium text-ink/90">Antardashas in {currentMaha.lord} Mahadasha</h3>
              <div className="flex flex-wrap gap-2">
                {currentMaha.antardashas.map((a) => (
                  <span
                    key={a.start}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      a.lord === current?.antar && a.end === current.antarEnds
                        ? "border-gold-400/40 bg-gold-400/15 text-gold-200"
                        : "border-white/10 text-muted",
                    )}
                  >
                    {a.lord} · {formatDate(a.start, { month: "short", year: "numeric" })}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>

        <div className="grid gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Manglik</h2>
              <Badge tone={!manglikPresent ? "good" : manglik.cancelled ? "gold" : "warn"}>
                {!manglikPresent ? "No" : manglik.cancelled ? "Cancelled" : "Yes"}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              From Lagna: {manglik.fromLagna === null ? "needs birth time" : manglik.fromLagna ? "yes" : "no"} · From
              Moon: {manglik.fromMoon ? "yes" : "no"}
            </p>
            {manglik.cancellationReasons.length > 0 && (
              <ul className="mt-2 list-inside list-disc text-xs text-muted">
                {manglik.cancellationReasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Sade Sati</h2>
              <Badge tone={transits.sadeSati.active ? "warn" : "good"}>
                {transits.sadeSati.active ? `${transits.sadeSati.phase} phase` : "Not active"}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              Saturn is transiting {transits.planets.find((p) => p.name === "Saturn")?.sign} relative to your Moon in{" "}
              {chart.moonSign}.
            </p>
          </Card>
          <Card>
            <h2 className="font-display text-xl">Yogas</h2>
            {chart.yogas.length === 0 ? (
              <p className="mt-2 text-sm text-muted">No major classical yogas detected by our rules yet.</p>
            ) : (
              <ul className="mt-3 grid gap-3">
                {chart.yogas.map((y) => (
                  <li key={y.name}>
                    <p className="text-sm font-medium text-gold-200">{y.name}</p>
                    <p className="text-xs leading-relaxed text-muted">{y.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
