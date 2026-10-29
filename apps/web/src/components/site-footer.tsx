import Link from "next/link";
import { Logo } from "./logo";
import { ProductHuntBadge } from "./product-hunt-badge";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Accurate Vedic Kundli, explained by an AI astrologer in your own language — instant, private and affordable.
          </p>
          <ProductHuntBadge lazy className="inline-block" />
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
              <Link className="hover:text-ink" href="/matching">
                Kundli matching
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/manglik">
                Manglik calculator
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/moon-sign">
                Moon sign &amp; Nakshatra
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/ai-astrologer">
                AI Astrologer chat
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-ink">Company</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link className="hover:text-ink" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/privacy">
                Privacy Policy
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
            <li>
              <Link className="hover:text-ink" href="/pricing">
                Pro account
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-muted/80 sm:px-6">
          Astrology offers guidance and reflection, not certainty. Astrojanta is not a substitute for medical, legal,
          financial or psychological advice. In distress? Call Tele-MANAS 14416 (India, 24×7, free).{" "}
          <Link className="text-gold-300/90 hover:text-gold-200" href="/privacy">
            Privacy
          </Link>
          {" · "}
          <Link className="text-gold-300/90 hover:text-gold-200" href="/terms">
            Terms
          </Link>
          . © {new Date().getFullYear()} Astrojanta.
        </p>
      </div>
    </footer>
  );
}
