import type { Metadata } from "next";
import { ToolGuideSection } from "@/components/tool-guide";
import { kundliGuide } from "@/content/tool-guides";
import { pageOpenGraph } from "@/lib/site";
import { KundliTool } from "./kundli-tool";

export const metadata: Metadata = {
  title: "Free Janam Kundli Online — Birth Chart with Dasha & Manglik Check",
  description:
    "Create your free Janam Kundli instantly: Lagna, Rashi, Nakshatra, D1 & Navamsa charts, Vimshottari dasha, Manglik dosha and Sade Sati — calculated with Lahiri ayanamsa.",
  alternates: { canonical: "/kundli" },
  openGraph: pageOpenGraph("/kundli"),
};

export default function KundliPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Free <span className="text-gradient-gold">Janam Kundli</span> Online
        </h1>
        <p className="mt-4 text-muted">
          Accurate Vedic birth chart with dasha periods, Manglik and Sade Sati check.{" "}
          <span className="font-devanagari">मुफ़्त जन्म कुंडली</span>
        </p>
      </header>
      <KundliTool />
      <ToolGuideSection guide={kundliGuide} />
    </div>
  );
}
