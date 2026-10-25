import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { absoluteUrl, pageOpenGraph, SITE_NAME } from "@/lib/site";

const PATH = "/ai-astrologer";
const TITLE = "Free AI Astrologer — Vedic AI Astrology Chat Based on Your Kundli";
const DESCRIPTION =
  "Chat free with a Vedic AI astrologer that reads your real Kundli. Accurate Lahiri charts, dashas and yogas explained in Hindi, Hinglish or English — no gemstone upsells.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph(PATH, TITLE, DESCRIPTION),
};

const FAQS = [
  {
    q: "Is the AI astrologer free?",
    a: "Yes. Every tool on Astrojanta, including the AI astrologer chat, has a free daily limit that resets every day. A Pro plan raises the daily limit, but you never have to pay to get your Kundli or ask questions.",
  },
  {
    q: "How accurate is AI astrology?",
    a: "The chart itself is calculated, not guessed: planet positions come from an astronomical ephemeris with the Lahiri ayanamsa and historical time zones. The interpretation follows classical Vedic rules. Like any astrology, it describes tendencies and timing, not guaranteed outcomes, and it is only as good as the birth details you enter.",
  },
  {
    q: "What is the difference between an AI astrologer and an AI Kundli?",
    a: "An AI Kundli is your calculated birth chart — Lagna, Rashi, Nakshatra, houses and dashas. The AI astrologer is the conversation layer on top: it reads that Kundli and answers your questions about it in plain language.",
  },
  {
    q: "Can I ask in Hindi or Hinglish?",
    a: "Yes. Type the way you talk, for example “meri shaadi kab hogi?”, and the AI astrologer replies in the same language. English works too.",
  },
  {
    q: "What if I do not know my exact birth time?",
    a: "You can still get your Moon sign, Nakshatra, planetary signs and dasha periods. House-based answers and the Lagna need an accurate birth time, so the AI will tell you when an answer depends on it.",
  },
  {
    q: "Is an AI astrologer better than a human astrologer?",
    a: "It is different. An AI astrologer is instant, consistent, private and affordable, and shows the chart factors behind each answer. An experienced human astrologer brings intuition and life experience. Many people use the AI for everyday questions and understanding their chart, and consult a human for major decisions.",
  },
  {
    q: "Is my birth data private?",
    a: "Birth details are encrypted at rest, we do not sell gemstones or pujas, and you can delete your data at any time from your account.",
  },
];

const FEATURES = [
  {
    title: "A real Vedic chart, not a sun sign",
    text: "Sidereal positions with the Lahiri (Chitrapaksha) ayanamsa, D1 and Navamsa charts, Vimshottari dasha, Manglik and Sade Sati status — the same foundations a traditional jyotishi works from.",
  },
  {
    title: "Answers that show the “why”",
    text: "Each answer points to the houses, lords, yogas and dasha periods in your own Kundli, so you can follow the reasoning instead of taking a prediction on faith.",
  },
  {
    title: "Your language",
    text: "Ask in Hindi, Hinglish or English and get the reply in the same language — no need to translate jyotish terms yourself.",
  },
  {
    title: "Private and honest",
    text: "Encrypted birth data, no fear-based remedies, no gemstone or puja upselling. The AI explains tendencies; it does not claim certainty.",
  },
];

const STEPS = [
  {
    title: "Enter your birth details",
    text: "Date, time and place of birth. The place sets latitude, longitude and the historical time zone, which matter for an accurate Lagna.",
  },
  {
    title: "Get your free Kundli",
    text: "Astrojanta calculates your Lagna, Rashi, Nakshatra, planetary table, divisional charts and dasha timeline in seconds.",
  },
  {
    title: "Ask the AI astrologer",
    text: "Ask about career, marriage, money, health tendencies or timing. Follow up as you would with a human astrologer — the AI keeps your chart in context.",
  },
];

export default function AiAstrologerPage() {
  const url = absoluteUrl(PATH);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "AI Astrologer", item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${SITE_NAME} AI Astrologer`,
      url,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: ["en-IN", "hi-IN"],
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const h2 = "font-display text-2xl font-semibold tracking-tight sm:text-3xl";
  const p = "mt-4 leading-relaxed text-muted";
  const a = "text-gold-200 underline underline-offset-4 hover:text-gold-400";

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl text-sm text-muted">
        <ol className="flex gap-2">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            AI Astrologer
          </li>
        </ol>
      </nav>

      <header className="mx-auto mt-6 max-w-3xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Free <span className="text-gradient-gold">AI Astrologer</span> for Vedic Astrology
        </h1>
        <p className="mt-4 text-muted">
          Chat with a Vedic AI astrologer that reads your real Kundli — accurate charts, clear answers, in Hindi or
          English. <span className="font-devanagari">एआई ज्योतिषी से मुफ़्त सवाल पूछें</span>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/register" size="lg" className="w-full sm:w-auto">
            Ask the AI astrologer free
          </ButtonLink>
          <ButtonLink href="/kundli" variant="secondary" size="lg" className="w-full sm:w-auto">
            Make my free Kundli first
          </ButtonLink>
        </div>
      </header>

      <article className="mx-auto mt-16 max-w-3xl text-left">
        <section>
          <h2 className={h2}>What is an AI astrologer?</h2>
          <p className={p}>
            An AI astrologer is software that combines two things: an exact astronomical calculation of your birth chart
            and a language model that has been guided to interpret that chart using the rules of astrology. Instead of
            reading a generic horoscope for your sun sign, you ask a question — “When is a good period for a job
            change?” or “What does my Venus placement say about relationships?” — and get an answer grounded in your own
            planetary positions.
          </p>
          <p className={p}>
            AI astrology is only as good as the chart underneath it. Many chat apps let a language model “imagine”
            planet positions, which produces confident but wrong readings. Astrojanta never does that: the chart is
            computed first, and the AI only interprets what was calculated.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={h2}>How Astrojanta’s Vedic AI astrologer works</h2>
          <p className={p}>
            Astrojanta follows Vedic (Jyotish) astrology, which uses the sidereal zodiac. That is why your Vedic Rashi
            is often one sign behind your Western sun sign. Behind every answer is a full{" "}
            <Link href="/kundli" className={a}>
              AI Kundli
            </Link>{" "}
            — your Lagna (ascendant), Moon sign and Nakshatra, the twelve houses and their lords, the Navamsa chart and
            your Vimshottari dasha timeline.
          </p>
          <ol className="mt-6 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="glass rounded-2xl px-5 py-4">
                <h3 className="font-display text-lg font-semibold">
                  <span className="text-gradient-gold">{i + 1}.</span> {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className={p}>
            When you ask a question, the AI looks at the houses and planets relevant to that topic — the 7th house and
            Venus for marriage, the 10th house and its lord for career, the 2nd and 11th for money — and then checks
            which dasha and antardasha you are running to talk about timing. It explains the reasoning in plain words so
            you can learn your own chart along the way.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={h2}>Features</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-2xl px-5 py-4">
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
              </div>
            ))}
          </div>
          <p className={p}>
            The AI astrologer sits alongside free calculators you can use on their own: Ashtakoot{" "}
            <Link href="/matching" className={a}>
              Kundli matching
            </Link>{" "}
            with Guna Milan out of 36, a{" "}
            <Link href="/manglik" className={a}>
              Manglik dosha calculator
            </Link>{" "}
            that checks Mars from both the Lagna and the Moon with classical cancellations, and a{" "}
            <Link href="/moon-sign" className={a}>
              Moon sign and Nakshatra finder
            </Link>{" "}
            that gives your Vedic Rashi, birth star and pada.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={h2}>AI astrologer vs a human astrologer</h2>
          <p className={p}>
            A good human astrologer brings years of experience, intuition and the ability to read the person in front of
            them. That is valuable, and nothing here is meant to replace it for life’s biggest decisions. But
            consultations can be expensive, hard to schedule, and sometimes come with pressure to buy remedies.
          </p>
          <p className={p}>An AI astrologer is strongest where a human consultation is weakest:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            <li>
              <strong className="text-ink">Instant and available any time</strong> — ask at midnight, ask follow-ups,
              ask the same question a different way.
            </li>
            <li>
              <strong className="text-ink">Consistent</strong> — the same chart and rules are applied every time, and
              the chart factors behind each answer are shown.
            </li>
            <li>
              <strong className="text-ink">Private</strong> — you can ask about things you would not want to say out
              loud to another person.
            </li>
            <li>
              <strong className="text-ink">Free or low cost</strong>, with no gemstone or puja sales attached.
            </li>
          </ul>
          <p className={p}>
            Where a human still has the edge is in judgement across complex, conflicting chart factors and in emotional
            context. A sensible approach is to use the AI to understand your chart and everyday questions, and to
            consult an experienced jyotishi when a decision is truly significant.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={h2}>Accuracy and limits of AI astrology</h2>
          <p className={p}>
            Two different kinds of accuracy matter. The first is calculation accuracy: are the planets, houses and
            dashas correct? Astrojanta computes sidereal positions with an astronomical ephemeris, the Lahiri ayanamsa
            and historical time-zone data, and tests against well-known reference charts. If your birth time and place
            are right, your chart will be right.
          </p>
          <p className={p}>
            The second is interpretive accuracy, and here honesty matters. Astrology describes tendencies and favourable
            or challenging periods; it does not deliver certainties. The AI astrologer will not tell you the exact date
            something will happen, and it does not give medical, legal, financial or psychological advice. A few
            practical limits to keep in mind:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            <li>A birth time off by even 10–15 minutes can change the Lagna and house placements.</li>
            <li>Without a birth time, answers rely on the Moon chart and are less specific about houses.</li>
            <li>Different astrological traditions can read the same chart differently.</li>
            <li>Treat every reading as guidance for reflection, not an instruction.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className={h2}>How to use the free AI astrologer</h2>
          <p className={p}>
            Start by creating your{" "}
            <Link href="/kundli" className={a}>
              free Janam Kundli
            </Link>{" "}
            — no sign-up needed. Check that your Lagna and Moon sign look right. Then create a free account to open the
            AI astrologer chat for your saved profile.
          </p>
          <p className={p}>
            Ask specific questions for better answers. “Tell me about my future” is vague; “How does my current dasha
            affect my career over the next two years?” gives the AI something concrete to analyse. Good questions to
            start with:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            <li>Which planets are strongest in my chart, and what does that mean for me?</li>
            <li>What does my current Mahadasha and Antardasha indicate?</li>
            <li>Meri shaadi kab hogi, aur mere 7th house mein kya dikh raha hai?</li>
            <li>
              Am I Manglik? (You can also check instantly with the{" "}
              <Link href="/manglik" className={a}>
                Manglik calculator
              </Link>
              .)
            </li>
            <li>
              How compatible are we? (Run{" "}
              <Link href="/matching" className={a}>
                Kundli matching
              </Link>{" "}
              first, then ask the AI to explain the result.)
            </li>
          </ul>
        </section>

        <section className="glass mt-14 rounded-3xl px-6 py-10 text-center">
          <h2 className={h2}>Ask your first question today</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Your Kundli is free without sign-up. A free account unlocks the AI astrologer chat.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/register" size="lg" className="w-full sm:w-auto">
              Start free AI chat
            </ButtonLink>
            <ButtonLink href="/moon-sign" variant="secondary" size="lg" className="w-full sm:w-auto">
              Find my Moon sign
            </ButtonLink>
          </div>
        </section>

        <section className="mt-14">
          <h2 className={h2}>Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="glass rounded-2xl px-5 py-4">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
