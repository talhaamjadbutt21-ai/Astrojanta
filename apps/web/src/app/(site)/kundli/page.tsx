import type { Metadata } from "next";
import { ToolGuideSection } from "@/components/tool-guide";
import { kundliGuide } from "@/content/tool-guides";
import { pageOpenGraph } from "@/lib/site";
import { KundliTool } from "./kundli-tool";

const PATH = "/kundli";
const TITLE = "Free Janam Kundli Online by Date of Birth";
const DESCRIPTION =
  "Enter your date, time and place of birth for a free Janam Kundli: Lagna, Rashi, Nakshatra, Navamsa, dasha, Manglik and Sade Sati, with Hindi names. No sign-up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph(PATH, TITLE, DESCRIPTION),
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
