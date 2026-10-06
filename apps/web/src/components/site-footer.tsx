import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Accurate Vedic Kundli, explained by an AI astrologer in your own language — instant, private and affordable.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-ink">Tools</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link className="hover:text-ink" href="/kundli">
                Free Janam Kundli
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/register">
                AI Astrologer chat
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-ink">Account</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link className="hover:text-ink" href="/login">
                Sign in
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/register">
                Create account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-muted/80 sm:px-6">
          Astrology offers guidance and reflection, not certainty. SEBT AI is not a substitute for medical, legal,
          financial or psychological advice. In distress? Call Tele-MANAS 14416 (India, 24×7, free). ©{" "}
          {new Date().getFullYear()} SEBT AI.
        </p>
      </div>
    </footer>
  );
}
