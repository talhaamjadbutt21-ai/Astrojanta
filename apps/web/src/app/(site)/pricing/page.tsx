import type { Metadata } from "next";
import { ProRequest } from "./pro-request";

export const metadata: Metadata = {
  title: "Pricing — Free vs Pro AI Astrologer",
  description:
    "Astrojanta Pro: $2.99/month or $29.99/year for 6 daily attempts on every tool. Request a payment link by email — no card checkout on the site.",
  alternates: { canonical: "/pricing" },
  robots: { index: true },
};

const FREE = [
  "Janam Kundli, Navamsa and dasha",
  "Kundli matching (Guna Milan)",
  "Manglik and Moon-sign calculators",
  "No sign-up needed: 3 attempts per tool per day",
  "AI astrologer chat with a free account",
  "2 attempts per tool per day (including chat) after sign-up",
];

const PRO = [
  "Everything in Free",
  "6 attempts per tool per day (Kundli, matching, Manglik, Moon sign, chat)",
  "Priority answers during peak hours",
  "Detailed reports when they launch",
  "Pay via a personal payment link (email request)",
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Pay only if you <span className="text-gradient-gold">keep asking</span>
        </h1>
        <p className="mt-4 text-muted">
          Signed-out visitors get 1 attempt per tool each day. A free account gets 2. Pro gets 6 on every tool.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        <article className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs uppercase tracking-wider text-muted">Free</p>
          <p className="mt-2 font-display text-4xl">$0</p>
          <p className="mt-1 text-sm text-muted">Forever, no card</p>
          <ul className="mt-6 grid gap-2.5 text-sm">
            {FREE.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-400" />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-gold-400/40 bg-gold-400/8 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-wider text-gold-300">Pro</p>
          <p className="mt-2 font-display text-4xl">
            $2.99<span className="text-lg text-muted">/mo</span>
          </p>
          <p className="mt-1 text-sm text-muted">or $29.99/year (save two months)</p>
          <ul className="mt-6 grid gap-2.5 text-sm">
            {PRO.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-400" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mx-auto mt-14 max-w-xl">
        <h2 className="text-center font-display text-2xl sm:text-3xl">Request Pro</h2>
        <ProRequest />
      </div>
    </div>
  );
}
