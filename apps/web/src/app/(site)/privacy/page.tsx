import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle } from "@/components/legal-article";

import { CONTACT_EMAIL as SUPPORT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Astrojanta collects, uses and protects your birth details and account data under Indian DPDP rules.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalArticle title="Privacy Policy" updated="26 October 2026">
      <p>
        Astrojanta (“we”, “us”) provides Vedic astrology tools and an optional AI chat. This policy explains what we
        collect, why, and your rights under India’s Digital Personal Data Protection Act, 2023 (DPDP Act).
      </p>

      <h2>Who we are</h2>
      <p>
        The service is operated at the website you are using. For privacy requests email{" "}
        <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account:</strong> email address. Passwords are stored by our authentication provider (Supabase Auth),
          not in our application database.
        </li>
        <li>
          <strong>Birth details:</strong> name, date, time and place of birth that you enter so we can compute a chart.
          These are encrypted at rest on our servers.
        </li>
        <li>
          <strong>Chat:</strong> questions you send to the AI astrologer and the replies, tied to your account.
        </li>
        <li>
          <strong>Payments:</strong> Pro is sold via a personal payment link sent by email. Payment details are collected
          by that payment app or bank, not stored in Astrojanta. We only record that your account should have Pro access.
        </li>
        <li>
          <strong>Technical:</strong> cookies needed to keep you signed in, and standard server logs (IP, user agent)
          for security and rate limiting.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <p>
        We use this data to create your Kundli, run matching tools, answer AI questions grounded in your chart, enforce
        daily attempt limits on each tool, take Pro payments, prevent abuse, and comply with law. We do not sell
        personal data.
      </p>

      <h2>Cookies</h2>
      <p>
        After you sign in we set httpOnly cookies (<code>astrojanta_session</code> and <code>astrojanta_refresh</code>) so
        the browser can call our API. Signed-out visitors receive <code>astrojanta_guest</code> so we can apply the daily
        tool limit. These cookies are not used for advertising. You can sign out to clear the session cookies.
      </p>
      <p>
        We do not currently run a separate analytics or tracking service. Our hosting provider (Vercel) and API keep
        standard technical logs. If we add privacy-friendly analytics in future, we will list it here.
      </p>

      <h2>Advertising and Google AdSense</h2>
      <p>
        We may show advertising served by Google AdSense. If we do, third-party vendors, including Google, use cookies
        to serve ads based on your prior visits to this website or other websites. Google’s use of advertising cookies,
        including the DoubleClick cookie, enables it and its partners to serve ads to you based on your visits to this
        site and/or other sites on the Internet.
      </p>
      <ul>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          You can also opt out of some third-party vendors’ use of cookies for personalised advertising at{" "}
          <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">
            www.aboutads.info
          </a>
          .
        </li>
        <li>
          Learn how Google uses information from sites that use its services at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
            policies.google.com/technologies/partner-sites
          </a>
          .
        </li>
      </ul>
      <p>Your birth details and chat content are never shared with advertisers.</p>

      <h2>Who else sees data</h2>
      <ul>
        <li>Supabase — authentication and, in production, the PostgreSQL database.</li>
        <li>The AI model provider — chart-derived context and your question text, not your password.</li>
        <li>The payment app or bank on the link we email you — if you buy Pro.</li>
        <li>Place search uses the Open-Meteo geocoding API with the place name you type.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        Account, profiles and chats stay until you delete your account. You can delete your account from the dashboard
        (right of erasure), which removes your account, saved charts and conversations. You can also delete individual
        profiles and conversations. If you cannot sign in, email <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> from your
        account address to request deletion. Encrypted birth details become unreadable if we rotate the encryption key without a
        migration.
      </p>

      <h2>Your rights</h2>
      <p>
        You may access, correct or erase your personal data, and withdraw consent by deleting the account. Contact{" "}
        <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>. We will not use your chart for automated decisions that produce
        legal effects — astrology here is guidance, not a certified opinion.
      </p>

      <h2>Children</h2>
      <p>
        The service is not directed at children under 18. Do not create an account for a minor without a parent or
        guardian’s authority. You may store a child’s chart under your own account if you are authorised to do so.
      </p>

      <h2>Security</h2>
      <p>
        Traffic uses HTTPS in production. Birth payloads are encrypted with AES-256-GCM. Session tokens live in
        httpOnly cookies. No method is perfect; please use a unique password.
      </p>

      <h2>Changes</h2>
      <p>
        We will update this page when our practices change. Continued use after an update means you accept the revised
        policy. See also our <Link href="/terms">Terms of Use</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data? Email <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> or use our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalArticle>
  );
}
