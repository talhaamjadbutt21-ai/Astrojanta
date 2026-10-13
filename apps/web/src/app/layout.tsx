import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Noto_Sans_Devanagari } from "next/font/google";
import { CosmicBackground } from "@/components/cosmic-background";
import { Providers } from "@/components/providers";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", axes: ["SOFT", "opsz"] });
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Astrojanta — Free Kundli & AI Vedic Astrologer in Hindi and English",
    template: "%s · Astrojanta",
  },
  description:
    "Astrology for Everyone. Generate your free Janam Kundli with accurate Lahiri calculations, then ask an AI Vedic astrologer about career, marriage and dasha — in Hindi, Hinglish or English.",
  keywords: [
    "free kundli",
    "janam kundli",
    "kundli in hindi",
    "AI astrologer",
    "vedic astrology",
    "manglik dosha",
    "dasha",
    "astrojanta",
  ],
  applicationName: "Astrojanta",
  openGraph: { type: "website", siteName: "Astrojanta", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#07061a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${fraunces.variable} ${devanagari.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip font-sans">
        <CosmicBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
