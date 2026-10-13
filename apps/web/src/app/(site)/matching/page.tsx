import type { Metadata } from "next";
import { MatchingTool } from "./matching-tool";

export const metadata: Metadata = {
  title: "Kundli Matching — Ashtakoot Guna Milan Online",
  description:
    "Free Vedic Kundli matching (Ashtakoot Guna Milan). Compare two Moon charts for 36-guna compatibility, Nadi dosha and Bhakoot — the same system used for Hindu marriage matching.",
  alternates: { canonical: "/matching" },
};

export default function MatchingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Kundli <span className="text-gradient-gold">Matching</span>
        </h1>
        <p className="mt-4 text-muted">
          Ashtakoot Guna Milan out of 36 points, from both Moon signs and nakshatras.{" "}
          <span className="font-devanagari">कुंडली मिलान</span>
        </p>
      </header>
      <MatchingTool />
    </div>
  );
}
