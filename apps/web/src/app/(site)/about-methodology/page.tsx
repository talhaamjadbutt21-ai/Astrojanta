import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LegalArticle } from "@/components/legal-article";
import { absoluteUrl, CONTACT_EMAIL, pageOpenGraph, SITE_NAME } from "@/lib/site";

const PATH = "/about-methodology";
const TITLE = "Methodology — How Astrojanta Calculates Your Kundli (Lahiri Ayanamsa)";
const DESCRIPTION =
  "Who builds Astrojanta, how Kundli charts are calculated (sidereal zodiac, Lahiri ayanamsa, whole-sign houses, Vimshottari dasha), how the AI astrologer is used, and its limits.";

export const metadata: Metadata = {
  // Absolute: the brand is already in the title, so skip the "· Astrojanta" template suffix.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph(PATH, TITLE, DESCRIPTION),
};

/*
 * TODO(owner): personal details are intentionally NOT filled in. Before publishing names or credentials,
 * add them here — do not invent them:
 *   - Builder / founder name(s) and role(s)
 *   - Relevant background (e.g. years studying Jyotish, software / astronomy experience)
 *   - Location (city, country) if you want it shown
 *   - Any astrologer who reviews interpretations, with their real credentials
 * When filled in, render them in the "Who builds Astrojanta" section below and add a `Person`
 * (author / founder) entry to the JSON-LD.
 */

export default function MethodologyPage() {
  return (
    <LegalArticle eyebrow="Company" title="About Astrojanta & our methodology" updated="2 November 2026">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: TITLE,
            description: DESCRIPTION,
            url: absoluteUrl(PATH),
            about: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/"), email: CONTACT_EMAIL },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "About", item: absoluteUrl("/about") },
              { "@type": "ListItem", position: 3, name: "Methodology", item: absoluteUrl(PATH) },
            ],
          },
        ]}
      />
      <p>
        This page explains who is behind Astrojanta, exactly how your Kundli is calculated, where AI is (and is not)
        used, and the limits of what astrology — and our software — can tell you. For a shorter overview see{" "}
        <Link href="/about">About Astrojanta</Link>.
      </p>

      <h2>Who builds Astrojanta</h2>
      <p>
        Astrojanta is an independent project that builds free Vedic (Jyotish) astrology tools and an AI astrologer for
        people who want to understand their own chart in Hindi, Hinglish or English.
      </p>
      {/* TODO(owner): add the builder's real name, role and relevant background here (see note at top of file). */}
      <p>
        Questions about the team or a correction to our methodology? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use our <Link href="/contact">contact page</Link>.
      </p>

      <h2>How your chart is calculated</h2>
      <p>
        Every chart is computed by our own calculation engine — the same code powers the{" "}
        <Link href="/kundli">free Kundli</Link>, <Link href="/matching">Kundli matching</Link>,{" "}
        <Link href="/manglik">Manglik calculator</Link> and <Link href="/moon-sign">Moon sign finder</Link>.
      </p>
      <ul>
        <li>
          <strong>Planet positions:</strong> geocentric apparent positions of the Sun, Moon, Mars, Mercury, Jupiter,
          Venus and Saturn from the open-source Astronomy Engine ephemeris library, measured on the true ecliptic of
          date.
        </li>
        <li>
          <strong>Zodiac and ayanamsa:</strong> the sidereal zodiac with the Lahiri (Chitrapaksha) ayanamsa — the
          standard in Indian astrology. It is computed from the Indian Ephemeris reference value using IAU 2006
          precession, following the same convention as the Lahiri mode in Swiss Ephemeris (mean value, without
          nutation).
        </li>
        <li>
          <strong>Rahu and Ketu:</strong> the mean lunar node (Meeus, <em>Astronomical Algorithms</em>); Ketu is always
          exactly opposite Rahu.
        </li>
        <li>
          <strong>Lagna and houses:</strong> the sidereal ascendant for your birth place, with whole-sign houses (the
          sign rising is the 1st house).
        </li>
        <li>
          <strong>Birth time and time zones:</strong> your local birth time is converted to UTC using the IANA time-zone
          database, including historical offsets such as India’s war-time time of the 1940s and daylight saving for
          births abroad.
        </li>
        <li>
          <strong>Unknown birth time:</strong> we use 12:00 noon for planet positions and do not show a Lagna or
          house-based results, because those depend on an accurate time.
        </li>
        <li>
          <strong>Nakshatra and dasha:</strong> 27 Nakshatras with padas, and the 120-year Vimshottari dasha starting
          from the Moon’s Nakshatra at birth.
        </li>
        <li>
          <strong>Divisional chart:</strong> Navamsa (D9) alongside the main Rashi chart (D1).
        </li>
        <li>
          <strong>Manglik dosha:</strong> Mars in the 1st, 2nd, 4th, 7th, 8th or 12th house counted from both the Lagna
          and the Moon, with classical cancellations (Mars in its own sign, exalted, conjunct or aspected by Jupiter)
          listed separately.
        </li>
        <li>
          <strong>Kundli matching:</strong> Ashtakoot Guna Milan out of 36 points, including Nadi and Bhakoot checks.
        </li>
        <li>
          <strong>Transits:</strong> current positions relative to your natal Moon, used for Gochar and Sade Sati.
        </li>
      </ul>
      <p>
        The engine is covered by automated tests against known reference points — for example the Lahiri ayanamsa at
        J2000, the Sun entering sidereal Capricorn at Makar Sankranti, the ascendant at sunrise, historical Indian time
        zones and the well-known chart for Indian Independence (15 August 1947, midnight, Delhi).
      </p>

      <h2>How AI is used</h2>
      <ul>
        <li>
          <strong>The AI never calculates your chart.</strong> All positions, houses, dashas and doshas come from the
          engine above. The <Link href="/ai-astrologer">AI astrologer</Link> receives that computed chart and may only
          interpret it.
        </li>
        <li>
          It is instructed to follow the Parashari tradition, to use only your chart data and tool results, and to look
          up dasha dates, transits or Navamsa details through tools instead of guessing.
        </li>
        <li>Answers point to the houses, lords and dashas behind them, so you can see the “why”.</li>
        <li>It replies in the language you write in — English, Hindi (Devanagari) or Hinglish.</li>
        <li>
          Messages that suggest a crisis are not answered with astrology; instead we show helpline details such as
          Tele-MANAS (14416, India, 24×7, free).
        </li>
        <li>
          The AI model is provided by a third party. What is shared with it is described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </li>
      </ul>

      <h2>Disclaimer</h2>
      <p>
        Astrology is a traditional system for reflection and guidance. It is not a science and cannot predict events
        with certainty. Nothing on Astrojanta — including AI answers — is medical, legal, financial or psychological
        advice. We do not sell gemstones or pujas, and remedies mentioned in our content are shared as cultural
        information only. AI answers can be wrong; please use your own judgement. See our{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>
      <p>If you are in distress in India, call Tele-MANAS on 14416 (24×7, free) or 112 in an emergency.</p>
    </LegalArticle>
  );
}
