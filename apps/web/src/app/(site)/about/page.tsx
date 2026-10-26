import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LegalArticle } from "@/components/legal-article";
import { absoluteUrl, CONTACT_EMAIL, pageOpenGraph, SITE_NAME } from "@/lib/site";

const TITLE = "About Astrojanta — Vedic Astrology Tools and AI Astrologer";
const DESCRIPTION =
  "Astrojanta offers free Vedic astrology tools — Kundli, matching, Manglik and Moon sign — and an AI astrologer that explains your real chart in Hindi or English.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph("/about", TITLE, DESCRIPTION),
};

export default function AboutPage() {
  return (
    <LegalArticle title="About Astrojanta" updated="26 October 2026">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: TITLE,
          url: absoluteUrl("/about"),
          about: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/"), email: CONTACT_EMAIL },
        }}
      />
      <p>
        Astrojanta is an independent web app for Vedic (Jyotish) astrology. It combines accurate chart calculation with
        an AI astrologer that explains your chart in plain Hindi, Hinglish or English.
      </p>
      <h2>What we offer</h2>
      <ul>
        <li><Link href="/kundli">Free Janam Kundli</Link> — Lagna, Rashi, Nakshatra, planets, divisional charts and dashas.</li>
        <li><Link href="/matching">Kundli matching</Link> — Ashtakoot Guna Milan out of 36.</li>
        <li><Link href="/manglik">Manglik calculator</Link> — Mars checked from Lagna and Moon, with classical cancellations.</li>
        <li><Link href="/moon-sign">Moon sign and Nakshatra finder</Link>.</li>
        <li><Link href="/ai-astrologer">AI astrologer chat</Link> that answers questions using your calculated chart.</li>
        <li>A <Link href="/blog">blog</Link> with practical guides to transits and chart reading.</li>
      </ul>
      <h2>How it works</h2>
      <p>
        Charts are computed from an astronomical ephemeris using the sidereal zodiac and the Lahiri ayanamsa, with
        historical time-zone data for your birth place. The AI never invents planet positions: it interprets only what
        was calculated, and shows the chart factors behind its answers.
      </p>
      <h2>What we believe</h2>
      <ul>
        <li>Astrology is guidance for reflection, not certainty, and never a substitute for medical, legal, financial or psychological advice.</li>
        <li>No fear-based predictions and no gemstone or puja upselling.</li>
        <li>Your birth data is private: it is encrypted at rest and you can delete it at any time. See our <Link href="/privacy">Privacy Policy</Link>.</li>
      </ul>
      <h2>Pricing</h2>
      <p>
        The tools and the AI astrologer can be used free within daily limits. An optional <Link href="/pricing">Pro plan</Link>{" "}
        raises those limits.
      </p>
      <h2>Contact</h2>
      <p>
        Feedback, corrections or questions are welcome — see our <Link href="/contact">contact page</Link> or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalArticle>
  );
}
