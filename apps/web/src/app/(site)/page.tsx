import {
  BrainCircuit,
  HeartHandshake,
  Languages,
  LockKeyhole,
  MessageCircleHeart,
  MoonStar,
  ScrollText,
  Sparkles,
  Telescope,
} from "lucide-react";
import Link from "next/link";
import { ProductHuntBadge } from "@/components/product-hunt-badge";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ZodiacWheel } from "@/components/zodiac-wheel";

const FEATURES = [
  {
    icon: Telescope,
    title: "Astronomically accurate",
    body: "Planet positions come from an astronomical ephemeris with Lahiri ayanamsa and historical time zones — the AI never guesses your chart.",
  },
  {
    icon: BrainCircuit,
    title: "AI that reads your chart",
    body: "Ask anything. Answers cite the exact houses, lords and dashas in your Kundli, so you see the “why”, not just the “what”.",
  },
  {
    icon: Languages,
    title: "Hindi, Hinglish or English",
    body: "Type the way you talk — “meri shaadi kab hogi?” — and get a clear answer in the same language.",
  },
  {
    icon: LockKeyhole,
    title: "Private by design",
    body: "Birth details are encrypted at rest. No upselling of gemstones or pujas, and you can delete everything anytime.",
  },
];

const STEPS = [
  {
    icon: ScrollText,
    title: "Enter birth details",
    body: "Date, time and place of birth. Not sure of the time? We’ll still read your Moon chart.",
  },
  {
    icon: Sparkles,
    title: "Get your free Kundli",
    body: "D1 and Navamsa charts, planetary table, Vimshottari dasha, Manglik and Sade Sati status.",
  },
  {
    icon: MessageCircleHeart,
    title: "Ask the AI astrologer",
    body: "Career, marriage, money, timing — personalised answers grounded in your own chart.",
  },
];

const FAQ = [
  {
    q: "Is the Kundli really free?",
    a: "Yes. Kundli, matching, Manglik and Moon sign need no sign-up: without an account you get 1 Kundli and 3 tries on each other tool per day; a free account gets 2 per tool and Pro gets 6.",
  },
  {
    q: "How accurate are the calculations?",
    a: "We compute sidereal positions with an astronomical ephemeris, the Lahiri (Chitrapaksha) ayanamsa and historical time-zone data, and test against well-known reference charts.",
  },
  {
    q: "Can the AI astrologer predict the future with certainty?",
    a: "No one can. The AI explains tendencies and favourable periods based on classical Vedic principles. It does not give medical, legal or financial advice.",
  },
  {
    q: "What if I don’t know my birth time?",
    a: "You can still get your Moon sign, Nakshatra, planetary signs and dasha. House-based insights and the Lagna need an accurate birth time.",
  },
  {
    q: "How many free AI questions do I get?",
    a: "The AI astrologer chat needs a free account. A free account gets 2 AI questions a day and Pro gets 6. The Kundli, matching, Manglik and Moon sign tools need no sign-up. Limits reset at midnight UTC.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Astrojanta",
      alternateName: "Astrology for Everyone",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web, iOS, Android",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Free Vedic Kundli generator with an AI astrologer that explains your chart in Hindi and English.",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, server-generated JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <Reveal className="relative z-10 text-center lg:text-left">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-gold-200">
            <Sparkles className="size-3.5" /> Vedic astrology, explained by AI
          </span>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Your Kundli,
            <br />
            <span className="text-gradient-gold italic">finally explained.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            Generate an accurate Janam Kundli in seconds, then ask our AI astrologer about career, marriage and timing —
            in Hindi, Hinglish or English. <span className="font-devanagari text-ink/80">आपकी कुंडली, आपकी भाषा में।</span>
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href="/kundli" size="lg" className="w-full sm:w-auto">
              Get free Kundli
            </ButtonLink>
            <ButtonLink href="/matching" variant="secondary" size="lg" className="w-full sm:w-auto">
              Kundli matching
            </ButtonLink>
          </div>
          <p className="mt-5 text-xs text-muted">No sign-up needed for your Kundli · Free account for AI chat</p>
          <ProductHuntBadge className="mt-5 inline-block opacity-90 transition-opacity hover:opacity-100" />
        </Reveal>
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[460px]">
          <ZodiacWheel />
          <Card className="absolute -bottom-4 left-0 w-56 p-4 sm:-left-6">
            <p className="text-[11px] uppercase tracking-wider text-muted">You asked</p>
            <p className="mt-1 text-sm">“Career change kab karna sahi rahega?”</p>
          </Card>
          <Card className="absolute -top-2 right-0 w-52 p-4 sm:-right-4">
            <p className="text-[11px] uppercase tracking-wider text-gold-300">AI Astrologer</p>
            <p className="mt-1 text-sm text-ink/90">Your 10th lord enters a supportive dasha from mid-2027…</p>
          </Card>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-labelledby="features-title">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="features-title" className="font-display text-3xl font-semibold sm:text-4xl">
            Ancient wisdom, <span className="text-gradient-gold">modern clarity</span>
          </h2>
          <p className="mt-4 text-muted">
            Built for people who want real answers from their chart — not jargon, fear or sales pitches.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-gold text-night-950">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6" aria-labelledby="tools-title">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="tools-title" className="font-display text-3xl font-semibold sm:text-4xl">
            Free tools, <span className="text-gradient-gold">no sign-up</span>
          </h2>
          <p className="mt-4 text-muted">
            The same calculators people search for on Kundli sites — computed on your chart, not guessed.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              href: "/matching",
              icon: HeartHandshake,
              title: "Kundli matching",
              body: "Ashtakoot Guna Milan out of 36, with Nadi and Bhakoot cautions.",
            },
            {
              href: "/manglik",
              icon: Sparkles,
              title: "Manglik calculator",
              body: "Mars from Lagna and the Moon, plus classical cancellation yogas.",
            },
            {
              href: "/moon-sign",
              icon: MoonStar,
              title: "Moon sign & Nakshatra",
              body: "Your Vedic rashi, birth star and pada — sidereal Lahiri, not a sun sign.",
            },
          ].map((t, i) => (
            <Reveal key={t.href} delay={i * 0.08}>
              <Link href={t.href} className="block h-full">
                <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <div className="grid size-12 place-items-center rounded-2xl bg-gradient-gold text-night-950">
                    <t.icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">How it works</h2>
        </Reveal>
        <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <li className="relative h-full">
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl text-gradient-gold">{i + 1}</span>
                    <s.icon className="size-5 text-lilac-300" />
                  </div>
                  <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </Card>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <Card className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              className="absolute -right-24 -top-24 size-72 rounded-full bg-gold-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 size-72 rounded-full bg-lilac-400/20 blur-3xl"
              aria-hidden="true"
            />
            <h2 className="relative font-display text-3xl font-semibold sm:text-5xl">
              Start with your <span className="text-gradient-gold">free Kundli</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-muted">
              Takes 30 seconds. See your Lagna, Rashi, Nakshatra and running dasha instantly.
            </p>
            <div className="relative mt-8 flex justify-center">
              <ButtonLink href="/kundli" size="lg">
                Generate my Kundli
              </ButtonLink>
            </div>
          </Card>
        </Reveal>
      </section>

      <section id="faq" className="mx-auto mt-28 max-w-3xl scroll-mt-24 px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Questions, answered</h2>
        </Reveal>
        <div className="mt-10 grid gap-3">
          {FAQ.map((f) => (
            <details key={f.q} className="glass group rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span className="text-gold-300 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
