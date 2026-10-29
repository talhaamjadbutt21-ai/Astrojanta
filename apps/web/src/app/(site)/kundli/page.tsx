import type { Metadata } from "next";
import { ToolGuideSection } from "@/components/tool-guide";
import { kundliGuide } from "@/content/tool-guides";
import { pageOpenGraph } from "@/lib/site";
import { KundliTool } from "./kundli-tool";

export const metadata: Metadata = {
  title: "Free Kundli Online — AI Kundli & Janam Kundli in Hindi",
  description:
    "Make your free Janam Kundli online in seconds — Lagna, Rashi, Nakshatra, D1 & Navamsa, Vimshottari dasha, Manglik and Sade Sati — then read it with an AI astrologer in Hindi or English.",
  alternates: { canonical: "/kundli" },
  openGraph: pageOpenGraph(
    "/kundli",
    "Free Kundli Online — AI Kundli & Janam Kundli in Hindi",
    "Free Janam Kundli with Lagna, Nakshatra, dasha and Manglik check, explained by an AI astrologer in Hindi or English.",
  ),
};

export default function KundliPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Free <span className="text-gradient-gold">AI Kundli</span> Online — Janam Kundli in Hindi &amp; English
        </h1>
        <p className="mt-4 text-muted">
          Accurate Vedic birth chart with dasha periods, Manglik and Sade Sati check — no sign-up needed — then ask the
          AI astrologer what it means. <span className="font-devanagari">मुफ़्त जन्म कुंडली हिंदी में</span>
        </p>
      </header>
      <KundliTool />
      <ToolGuideSection guide={kundliGuide} />
    </div>
  );
}
