import type { Metadata } from "next";
import { ToolGuideSection } from "@/components/tool-guide";
import { manglikGuide } from "@/content/tool-guides";
import { pageOpenGraph } from "@/lib/site";
import { ManglikTool } from "./manglik-tool";

export const metadata: Metadata = {
  title: "Manglik Dosha Calculator — Free Mangal Dosha Check",
  description:
    "Free Manglik (Mangal) dosha calculator from your Vedic birth chart. Checks Mars from Lagna and the Moon, plus classical cancellation yogas.",
  alternates: { canonical: "/manglik" },
  openGraph: pageOpenGraph("/manglik"),
};

export default function ManglikPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          <span className="text-gradient-gold">Manglik Dosha</span> Calculator (Free)
        </h1>
        <p className="mt-4 text-muted">
          Mars in the 1st, 2nd, 4th, 7th, 8th or 12th from Lagna or Moon, with cancellation notes.{" "}
          <span className="font-devanagari">मंगल दोष</span>
        </p>
      </header>
      <ManglikTool />
      <ToolGuideSection guide={manglikGuide} />
    </div>
  );
}
