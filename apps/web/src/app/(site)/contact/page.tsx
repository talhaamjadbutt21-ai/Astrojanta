import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LegalArticle } from "@/components/legal-article";
import { absoluteUrl, CONTACT_EMAIL, pageOpenGraph, SITE_NAME } from "@/lib/site";

const TITLE = "Contact Astrojanta";
const DESCRIPTION = "Get in touch with Astrojanta for support, feedback, privacy or data deletion requests and business enquiries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: pageOpenGraph("/contact", TITLE, DESCRIPTION),
};

export default function ContactPage() {
  return (
    <LegalArticle title="Contact us" updated="26 October 2026">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: TITLE,
          url: absoluteUrl("/contact"),
          about: {
            "@type": "Organization",
            name: SITE_NAME,
            url: absoluteUrl("/"),
            contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL },
          },
        }}
      />
      <p>We read every message. The best way to reach us is by email:</p>
      <p className="text-lg">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <h2>What to include</h2>
      <ul>
        <li><strong>Support:</strong> the email on your account and what went wrong (a screenshot helps).</li>
        <li><strong>Chart questions:</strong> the tool you used. Please do not email full birth details unless needed.</li>
        <li><strong>Privacy or data deletion:</strong> write from your account email. You can also delete your account yourself from the dashboard.</li>
        <li><strong>Pro plan and payments:</strong> your account email and payment reference.</li>
        <li><strong>Business, press or partnerships:</strong> a short note about your request.</li>
      </ul>
      <p>We aim to reply within a few working days.</p>
      <h2>Before you write</h2>
      <p>
        Many answers are on our tool pages and in the FAQ on the <Link href="/ai-astrologer">AI astrologer</Link> page.
        See also our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.
      </p>
      <p>
        Astrojanta is not an emergency or counselling service. If you are in distress in India, call Tele-MANAS 14416
        (24×7, free).
      </p>
    </LegalArticle>
  );
}
