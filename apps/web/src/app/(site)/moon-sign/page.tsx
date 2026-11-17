import type { Metadata } from "next";
import { ToolGuideSection } from "@/components/tool-guide";
import { moonSignGuide } from "@/content/tool-guides";
import { pageOpenGraph } from "@/lib/site";
import { MoonSignTool } from "./moon-sign-tool";

export const metadata: Metadata = {
  title: "Moon Sign Calculator: Free Rashi & Nakshatra",
  description:
    "Apni Chandra rashi (Moon sign), nakshatra aur pada free mein jaanein: bas janam tarikh, samay aur jagah daalein. Vedic Lahiri calculation, sun sign nahi.",
  alternates: { canonical: "/moon-sign" },
  openGraph: pageOpenGraph("/moon-sign"),
};

export default function MoonSignPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Moon Sign <span className="text-gradient-gold">&amp; Nakshatra</span> Calculator
        </h1>
        <p className="mt-4 text-muted">
          Your Vedic rashi is the Moon’s sidereal sign — not the Western sun sign.{" "}
          <span className="font-devanagari">चंद्र राशि</span>
        </p>
      </header>
      <MoonSignTool />
      <ToolGuideSection guide={moonSignGuide} />
    </div>
  );
}
