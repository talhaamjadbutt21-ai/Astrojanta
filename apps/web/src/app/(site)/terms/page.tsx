import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle } from "@/components/legal-article";

import { CONTACT_EMAIL as SUPPORT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using Astrojanta Kundli tools, AI chat and Pro subscriptions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalArticle title="Terms of Use" updated="7 October 2026">
      <p>
        These terms govern your use of Astrojanta. By creating an account or using a public tool you agree to them.
        Privacy details are in the <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>The service</h2>
      <p>
        We provide Vedic chart calculators (Kundli, matching, Manglik, moon sign) and, after you sign in, an AI chat
        that interprets those charts. Each tool has a daily attempt limit. Pro raises that limit. Charts are computed
        with Lahiri ayanamsa; the AI does not invent planetary positions.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Astrology on this site is for reflection and entertainment. It is not medical, legal, financial, psychological
        or investment advice, and it is not a substitute for a qualified professional. You remain responsible for
        decisions you make. In distress in India, call Tele-MANAS 14416 (24×7, free).
      </p>

      <h2>Accounts</h2>
      <p>
        You must provide an accurate email and keep your password secret. You may delete your account at any time from
        the dashboard. We may suspend accounts that abuse the API, scrape at scale, or attempt to break encryption or
        other users’ data.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not attempt to access another person’s account or stored charts.</li>
        <li>Do not use the chat to harm yourself or others; crisis messages receive a fixed safety reply.</li>
        <li>Do not reverse-engineer, overload or resell the service without a written agreement.</li>
      </ul>

      <h2>Free quota and Pro</h2>
      <p>
        Without an account you get 1 attempt per tool per day. A free account gets 2 attempts per tool. Pro raises that
        to 6 attempts per tool for the paid period. Limits reset at midnight UTC. To buy Pro, request a payment link from
        the email on <Link href="/pricing">/pricing</Link>. Prices may change for new purchases. Refunds are handled
        case by case with the same contact email.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Astrojanta name, site design and software are ours. You keep rights in the birth details you submit. You
        grant us a licence to process them solely to provide the service.
      </p>

      <h2>Availability</h2>
      <p>
        Tools are provided “as is”. Ephemeris math can differ slightly from other software. We do not guarantee
        uninterrupted access or that every interpretation will match a human astrologer.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent allowed by applicable law, we are not liable for indirect or consequential loss, or for actions
        you take based on a chart or chat reply. Our aggregate liability for a paid period is limited to the fees you
        paid us for that period.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Courts in India have exclusive jurisdiction, without limiting
        any non-waivable consumer rights you have in your place of residence.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
      </p>
    </LegalArticle>
  );
}
