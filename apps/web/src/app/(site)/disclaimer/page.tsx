import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle } from "@/components/legal-article";

import { pageOpenGraph, CONTACT_EMAIL as SUPPORT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "What Astrojanta's Kundli tools and AI astrologer can and cannot tell you: guidance and reflection, not medical, legal, financial or psychological advice.",
  alternates: { canonical: "/disclaimer" },
  openGraph: pageOpenGraph("/disclaimer"),
};

export default function DisclaimerPage() {
  return (
    <LegalArticle title="Disclaimer" updated="16 November 2026">
      <p>
        This page sets out, in one place, what Astrojanta is for and what it is not for. It sits alongside our{" "}
        <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>, and expands on the
        disclaimer in our <Link href="/about-methodology">methodology page</Link>.
      </p>

      <h2>Astrology is for guidance, not certainty</h2>
      <p>
        Astrology on this site is for reflection, guidance and entertainment. Jyotish is a traditional system; it is not
        a science and it cannot predict events with certainty. Everything you read here — a Kundli, a matching score, a
        dosha check or an AI reply — is an interpretation of a traditional model, offered so you can think about your
        own situation. It is not a verdict on your life.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on Astrojanta, including AI answers, is medical, legal, financial, psychological or investment advice,
        and it is not a substitute for a qualified professional. For any important decision — your health, a marriage, a
        job, money, a legal matter — please consult someone qualified in that field. You remain responsible for the
        decisions you make.
      </p>
      <p>If you are in distress in India, call Tele-MANAS on 14416 (24×7, free) or 112 in an emergency.</p>

      <h2>No guaranteed outcomes</h2>
      <p>
        We do not promise results. Tools are provided “as is”, and we do not guarantee uninterrupted access or that
        every interpretation will match a human astrologer. Ephemeris math can differ slightly from other software, so
        another panchang or calculator may show a slightly different figure for the same birth details. We do not sell
        gemstones or pujas, and any remedies (upay) mentioned in our content are shared as cultural information only —
        never as a promised fix, and never as something you must pay for.
      </p>

      <h2>AI answers are generated, and can be wrong</h2>
      <p>
        The <Link href="/ai-astrologer">AI astrologer</Link> never calculates your chart. Every position, house, dasha
        and dosha comes from our own calculation engine, and the AI only interprets what the engine produced. Even so,
        its replies are machine-generated and can be wrong, incomplete or worded badly. Please use your own judgement,
        and treat an AI answer as an explanation to consider rather than a decision to act on. The underlying AI model
        is provided by a third party; what is shared with it is described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <p>
        Messages that suggest a crisis are not answered with astrology. Instead we show helpline details such as
        Tele-MANAS (14416, India, 24×7, free).
      </p>

      <h2>Results depend on your birth details</h2>
      <p>
        A chart is only as accurate as the date, time and place you enter. Small errors matter: the Moon changes
        nakshatra roughly every day, and the Lagna changes every couple of hours, so a wrong birth time can change your
        Lagna, your nakshatra and anything calculated from them. Where possible use the time recorded on your birth
        certificate, and the actual city of birth rather than your family’s home town.
      </p>
      <p>
        If you do not know your birth time, we use 12:00 noon for planet positions and do not show a Lagna or
        house-based results, because those depend on an accurate time. How everything is calculated is documented on our{" "}
        <Link href="/about-methodology">methodology page</Link>.
      </p>

      <h2>Panchang and muhurat content</h2>
      <p>
        Dates and timings published in our guides are calculated for a stated city and are panchang shuddhi only. They
        do not check a wedding lagna and they know nothing about a particular couple’s charts. Treat them as a shortlist
        to confirm with your own family purohit and local panchang.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about anything on this page? Use our <Link href="/contact">contact page</Link> or email{" "}
        <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
      </p>
    </LegalArticle>
  );
}
