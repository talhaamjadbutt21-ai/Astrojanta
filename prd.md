# Product Requirements Document: AI Astrologer (Vedic / Jyotish) Web Tool

| Field | Value |
|---|---|
| Product name (working) | Astrojanta — Astrology for Everyone |
| Version | v0.1 (Draft) |
| Date | 6 Oct 2026 |
| Owner | Talha |
| Status | Draft for review |
| Target market | India (primary), Indian diaspora in US/UK/UAE/Canada (secondary) |

---

## 1. Summary

An SEO-first website with free Vedic astrology tools: Kundli (birth chart), Kundli matching (Guna Milan), daily rashifal, Panchang, dosha checks, numerology, and more. On top of these sits an **AI Astrologer chat** that explains the user's actual computed chart in plain Hindi, Hinglish, or English.

The free tools bring in organic traffic. The AI chat and detailed reports bring in revenue.

**Core principle:** the AI never calculates planetary positions itself. An astronomical ephemeris does all chart math, and the LLM only interprets the structured result. This keeps answers accurate and consistent, and it's what separates us from generic "ask ChatGPT about astrology" sites.

---

## 2. Problem and Opportunity

### 2.1 User problems
1. **Human astrologers cost a lot and are hard to judge.** Apps like AstroTalk charge ₹20–₹200+/min, quality varies, and they push upsells (gemstones, pujas).
2. **Free Kundli tools give data without explanation.** Users get a chart full of houses, degrees, and dashas but can't tell what it means for their own life.
3. **Language barrier.** Many users think in Hindi or Hinglish, but most explanations are formal English or heavy Sanskrit terminology.
4. **Privacy and judgement.** People hesitate to ask a human astrologer about marriage delays, career failure, or relationships. An AI feels safer.
5. **Speed.** Users want answers now, not after waiting for an astrologer to come online.

### 2.2 Market opportunity
- India has one of the world's largest astrology audiences, and searches for "kundli", "rashifal", "kundli milan", and "aaj ka rashifal" are evergreen with very high volume.
- Most incumbents are content portals or marketplaces for human astrologers. **Few combine accurate free tools with a chart-grounded AI explainer** that is conversational and multilingual.
- Long-tail and programmatic searches are under-served, e.g. "mars in 7th house for leo ascendant", "rahu mahadasha effects in hindi", "guna milan 18 points is it good".

### 2.3 Reality check on SEO competition
The **head terms** ("kundli", "horoscope", "rashifal") are **not** low-competition. AstroSage, AstroTalk, Times of India, Dainik Bhaskar, Ganeshaspeaks, and Drik Panchang have dominated them for years with strong domain authority.

The realistic way in:
- **Long-tail, programmatic pages** (planet × house × ascendant, nakshatra × pada, dasha × antardasha combinations).
- **Hindi and Hinglish content**, which is less optimised than English.
- **Interactive tools that answer the query directly** (e.g. a "Manglik dosha calculator" that gives a yes/no plus an explanation).
- **Topical authority**, building deep clusters before going after head terms.

Astrology also falls under Google's **YMYL-adjacent / helpful-content** scrutiny. Thin, mass-produced AI pages are likely to be demoted. Programmatic pages **must** have unique, useful value (computed data, examples, FAQs, internal links), not just reworded LLM text.

---

## 3. Goals and Non-Goals

### 3.1 Goals (first 12 months)
| # | Goal | Metric | Target |
|---|---|---|---|
| G1 | Build organic traffic | Monthly organic sessions | 100k by month 6, 500k+ by month 12 |
| G2 | Turn visitors into users | Free Kundli generations / month | 30k by month 6 |
| G3 | Make money | Paying users / month | 1.5–3% of chart generators |
| G4 | Engagement | AI chat messages per active user | ≥ 6 per session |
| G5 | Trust and accuracy | Chart calculation accuracy vs. reference (Drik Panchang / JHora) | ≥ 99.5% match on positions; 100% on rashi/nakshatra/lagna |
| G6 | Retention | D30 retention for registered users | ≥ 15% |

### 3.2 Non-goals (v1)
- A marketplace of human astrologers (maybe later).
- Selling gemstones, pujas, or remedies products.
- Native iOS/Android apps (we'll ship a PWA instead).
- Western/tropical astrology as a main focus (Sun-sign horoscopes only, for SEO).
- Tarot, palmistry via image upload, or face reading (later phases at most).

---

## 4. Target Users / Personas

| Persona | Description | Key needs |
|---|---|---|
| **Priya, 26, Marriage seeker** (Tier-1/2 city) | Family is looking for a match and asks for Kundli matching | Guna Milan score, Manglik check, "is this match good?" explained simply |
| **Rahul, 30, Career-anxious professional** | Stuck in his job, wondering when things will improve | Dasha timeline, career houses, "when will I get a job / promotion" |
| **Sunita, 48, Traditional parent** | Checks Panchang, muhurat, and rashifal daily; prefers Hindi | Daily rashifal in Hindi, Panchang, festival dates, child's Kundli |
| **Arjun, 22, Curious Gen-Z** | Into astrology memes, wants a shareable personality reading | Fun insights, compatibility with a crush, share cards for Instagram/WhatsApp |
| **NRI user, 35** (US/UK) | Wants a Vedic chart but needs time zone and place handled correctly | Accurate birthplace/timezone handling, English UI, USD pricing |

---

## 5. Product Scope

### 5.1 Phase 1: MVP (Weeks 0–10)

#### A. Free tools (SEO landing pages)
| Tool | Description | Primary keyword examples |
|---|---|---|
| **Free Kundli / Janam Kundli** | Full D1 (Lagna) chart in North and South Indian styles, planetary positions, nakshatra, Navamsa (D9), Vimshottari Dasha | free kundli, janam kundli, kundli in hindi |
| **Kundli Matching (Guna Milan)** | Ashtakoota 36-point matching, Manglik check for both, koota-wise breakdown | kundli milan, guna milan, kundli matching by name and DOB |
| **Manglik Dosha Calculator** | Mars placement check plus traditional cancellation rules | manglik dosha check, am i manglik |
| **Daily / Weekly / Monthly Rashifal** | 12 moon-sign horoscopes in Hindi + English | aaj ka rashifal, mesh rashifal, daily horoscope |
| **Moon Sign / Rashi Calculator** | Rashi, nakshatra, pada from DOB | my rashi, rashi by date of birth |
| **Nakshatra Finder** | Birth nakshatra with traits | my nakshatra, nakshatra calculator |
| **Today's Panchang** | Tithi, vara, nakshatra, yoga, karana, Rahu Kaal, sunrise/sunset by city | aaj ka panchang, rahu kaal today |
| **Sade Sati Calculator** | Saturn transit over the moon sign, with start and end dates | sade sati check, shani sade sati |
| **Numerology Calculator** | Mulank / Bhagyank (Life Path), name number | numerology calculator, mulank |

Every tool page must have:
- The tool at the top.
- A computed result with a short plain-language explanation.
- A CTA: **"Ask the AI Astrologer about your result →"**.
- SEO content below the tool (what it is, how it's calculated, FAQs with schema).

#### B. AI Astrologer chat (core differentiator)
- Users enter birth details (name, DOB, time, place) or pick a saved profile.
- The system computes the chart and passes **structured chart JSON** to the LLM as context.
- Users ask free-form questions in Hindi, English, or Hinglish, e.g. "Meri shaadi kab hogi?", "Is 2027 good for a job change?", "Why do I feel stuck?"
- Answers must:
  - Point to the specific chart factors behind them (e.g. "Your 7th lord Venus is in the 10th house…").
  - Be balanced, not fatalistic or fear-based.
  - Include gentle disclaimers on health, legal, and financial topics.
  - Reply in the user's language and script (Devanagari or Roman).
- Suggested starter questions grouped by topic: Career, Marriage, Love, Finance, Health (general), Education, Foreign travel.
- Free tier: **3 free questions** per chart, then a paywall.

#### C. Accounts and profiles
- Login with phone OTP (preferred in India), Google, or email magic link.
- Save multiple birth profiles (self, spouse, child, parents).
- Chat history saved per profile.

#### D. Monetisation (MVP)
- **Pay-per-question packs:** e.g. ₹49 for 10 questions, ₹149 for 50.
- **Premium subscription:** $2.99/month or $29.99/year for 6 daily attempts on every tool, detailed reports, and an ad-free experience.
- **PDF reports:** Detailed Kundli report (₹99–₹299), Marriage/Compatibility report, Career report, Yearly forecast (Varshphal).
- **Display ads** on free pages (AdSense first, then Ezoic/Mediavine once traffic qualifies). No ads inside the chat.
- Payments: manual — user emails a Pro request; operator sends a payment link and grants Pro in `/admin`.

### 5.2 Phase 2: Growth (Months 3–6)
- **Programmatic SEO pages** (see §7.3), e.g. "Sun in 5th house", "Rahu in 7th house for Scorpio ascendant".
- **Shareable result cards** (Guna Milan score, personality, compatibility) for WhatsApp and Instagram, a key growth loop in India.
- **Personalised daily horoscope** based on the user's full chart and current transits, not just moon sign, sent via WhatsApp/Email/Web push.
- **Muhurat finder** for marriage, griha pravesh, vehicle purchase, and naming ceremony.
- **Baby name suggestions** by nakshatra syllable.
- More languages: Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada.
- **Transit (Gochar) report:** what current Saturn, Jupiter, and Rahu/Ketu transits mean for the user.

### 5.3 Phase 3: Expansion (Months 6–12)
- Voice chat in Hindi (speech-to-text plus TTS).
- Yearly forecast subscription with monthly updates.
- Lal Kitab and KP-system modes.
- Divisional charts (D10 career, D7 children, etc.) explained by AI.
- B2B/API: white-label Kundli and matchmaking API for matrimony sites.
- An optional "Talk to a verified human astrologer" escalation (marketplace), only if data supports it.

---

## 6. Functional Requirements

### 6.1 Birth data input
| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Collect name, gender (optional), date of birth, time of birth, place of birth | P0 |
| FR-2 | Place autocomplete with lat/long and **historical timezone** handling (incl. India pre-1955 and war-time offsets, and DST for NRIs) | P0 |
| FR-3 | An "I don't know my birth time" option: show moon-sign-based results only and clearly flag reduced accuracy | P0 |
| FR-4 | Date/time pickers that work well on mobile; support DD/MM/YYYY and 12-hour time with AM/PM | P0 |
| FR-5 | Save the profile (if logged in) or keep it in the browser session (if anonymous) | P0 |

### 6.2 Astrology calculation engine
| ID | Requirement | Priority |
|---|---|---|
| FR-10 | Sidereal zodiac with **Lahiri (Chitrapaksha) ayanamsa** by default; Raman and KP as options | P0 |
| FR-11 | Planet positions for Sun–Saturn plus Rahu/Ketu (Mean and True node option), with sign, degree, nakshatra, pada, retrograde, combustion | P0 |
| FR-12 | Ascendant (Lagna), houses (Whole-sign default; Placidus/KP optional) | P0 |
| FR-13 | Divisional charts D1, D9 (MVP); D2, D3, D7, D10, D12, D60 (Phase 2+) | P0/P1 |
| FR-14 | Vimshottari Dasha: Mahadasha, Antardasha, Pratyantardasha with dates | P0 |
| FR-15 | Ashtakoota Guna Milan (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi), with dosha exceptions | P0 |
| FR-16 | Manglik dosha detection with standard cancellation rules (documented which tradition is followed) | P0 |
| FR-17 | Panchang computation for any date and location | P0 |
| FR-18 | Yoga detection (Raj yoga, Gajakesari, Budhaditya, Kaal Sarp, etc.) as a rule engine | P1 |
| FR-19 | Ashtakavarga, Shadbala | P2 |
| FR-20 | Output a **canonical chart JSON** schema used by the UI, PDF generator, and LLM | P0 |
| FR-21 | Calculations must be deterministic and pass a regression test suite against reference charts (Drik Panchang / Jagannatha Hora) | P0 |

### 6.3 AI Astrologer
| ID | Requirement | Priority |
|---|---|---|
| FR-30 | The LLM receives the system prompt, the chart JSON, current transits and dasha, and the conversation history | P0 |
| FR-31 | The LLM **must not** invent planetary positions; it may only reference data in the provided JSON (enforced by prompt plus output validation) | P0 |
| FR-32 | Language auto-detection; reply in the same language/script, with a user-overridable toggle | P0 |
| FR-33 | Streaming responses | P0 |
| FR-34 | Safety layer: refuse or redirect on medical diagnosis, death or lifespan predictions, self-harm (show helpline), legal or investment advice; no fear-mongering, no selling remedies | P0 |
| FR-35 | Explanations cite chart factors ("because…") and can expand to "Show technical details" | P1 |
| FR-36 | Retrieval (RAG) over a curated, reviewed knowledge base of classical interpretations (BPHS-style rules, planet/house/sign meanings) to keep answers consistent | P1 |
| FR-37 | Question quota per plan; rate limiting and abuse protection | P0 |
| FR-38 | Thumbs up/down feedback per answer, logged for evaluation | P0 |
| FR-39 | Model routing: a cheaper model for simple Q&A, a stronger model for reports and complex questions | P1 |

### 6.4 Reports
| ID | Requirement | Priority |
|---|---|---|
| FR-40 | Generate a branded PDF (Hindi + English) from chart JSON plus AI-written sections | P0 |
| FR-41 | Email and in-account download after payment | P0 |
| FR-42 | Reports are cached per profile and version; regenerate only on request | P1 |

### 6.5 Content and horoscope engine
| ID | Requirement | Priority |
|---|---|---|
| FR-50 | Daily/weekly/monthly rashifal generated from actual transits, with **human editorial review** before publishing | P0 |
| FR-51 | A CMS for blog/articles (planets, houses, nakshatras, festivals, remedies explained) | P0 |
| FR-52 | A template system for programmatic pages with unique data blocks per page | P1 |

### 6.6 Admin
| ID | Requirement | Priority |
|---|---|---|
| FR-60 | Dashboard: users, revenue, chats, top questions, flagged answers | P1 |
| FR-61 | Prompt/version management and A/B testing of prompts | P1 |
| FR-62 | Refund and quota management | P1 |

---

## 7. SEO Strategy (Core Growth Engine)

### 7.1 Technical SEO
- **Server-side rendering / static generation** for all public pages (Next.js SSG/ISR).
- Core Web Vitals: LCP < 2.0s on 4G mobile, CLS < 0.1, INP < 200ms. Most Indian users are on mid-range Android phones.
- Clean URLs in both languages: `/kundli`, `/hi/kundli`, `/rashifal/mesh/today`, `/hi/rashifal/mesh/aaj`.
- `hreflang` for `en-IN`, `hi-IN`, and later regional languages.
- Structured data: `FAQPage`, `HowTo`, `WebApplication`, `BreadcrumbList`, `Article`, `Organization`.
- XML sitemaps split by section; automated internal linking between related pages.
- Tool result pages that contain personal data are `noindex`.

### 7.2 Content clusters (topical authority)
| Pillar | Cluster examples |
|---|---|
| Kundli | how to read a kundli, 12 houses explained, lagna meaning, D9 navamsa explained |
| Marriage | guna milan meaning, nadi dosha, bhakoot dosha, manglik remedies, late-marriage yogas |
| Planets | each planet in each sign and house, retrograde planets, combustion |
| Dasha | each mahadasha, each antardasha combo, dasha predictions |
| Nakshatras | 27 nakshatras × traits, compatibility, padas, baby names |
| Rashifal | 12 rashis × daily/weekly/monthly/yearly (2026, 2027) |
| Transits | Shani gochar 2026–2027, Guru gochar, Rahu-Ketu gochar, Sade Sati by rashi |
| Panchang & festivals | daily panchang, tithi meanings, festival muhurats, eclipse dates |
| Numerology | mulank 1–9, bhagyank, name numerology |

### 7.3 Programmatic SEO (pSEO) page matrix
| Template | Combinations | Approx. pages |
|---|---|---|
| Planet in House | 9 planets × 12 houses | 108 |
| Planet in Sign | 9 × 12 | 108 |
| Planet in House for Ascendant | 9 × 12 × 12 | 1,296 |
| Mahadasha–Antardasha | 9 × 9 | 81 |
| Nakshatra × Pada | 27 × 4 | 108 |
| Rashi compatibility | 12 × 12 | 144 |
| Nakshatra compatibility | 27 × 27 | 729 |
| Daily rashifal | 12 × 365 per language | ~4,380/yr per language |
| Panchang by city | top 200 cities × daily | dynamic (ISR) |

**Quality bar for pSEO pages (to avoid helpful-content penalties):**
- Each page includes **computed, page-specific data** (e.g. example charts, effects by dasha, strengths/weaknesses tables), not just prose.
- Base interpretations are **written or reviewed by an experienced astrologer** (credited author bio, which helps E-E-A-T); AI expands them, and humans spot-check.
- Unique FAQs per page, internal links to related combinations, and a CTA into the tool.
- Roll out in batches (e.g. 100 pages/week), monitor indexation and rankings, prune or merge underperformers.

### 7.4 Off-page and distribution
- Shareable WhatsApp/Instagram result cards with a backlink or short URL.
- YouTube Shorts / Instagram Reels for rashifal and transit content (cheap traffic, brand searches).
- Digital PR around major transits and eclipses (Shani gochar, etc.).
- Guest posts and partnerships with Hindi content sites.
- Embeddable free widgets (daily rashifal, panchang) for other sites, a natural backlink source.

---

## 8. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Chart calculation < 300ms p95; first AI token < 2s p95; tool pages < 2s LCP on 4G |
| Scalability | Handle 10× traffic spikes during festivals and eclipses; cache rashifal/panchang at the CDN |
| Availability | 99.5% uptime for MVP |
| Accuracy | Regression suite of ≥ 500 reference charts; CI fails on any deviation |
| Localisation | Full UI in English + Hindi at launch; Devanagari fonts optimised (subset, `font-display: swap`) |
| Accessibility | WCAG 2.1 AA for core flows |
| Mobile | Mobile-first; PWA installable; works on low-end Android |
| Cost control | LLM cost per paying user < 25% of ARPU; caching of common interpretations; token budgets per answer |
| Observability | Logging of LLM prompts/responses (PII-masked), error tracking, cost dashboards |

---

## 9. Privacy, Legal, and Ethics

- **India DPDP Act 2023 compliance.** Birth details plus name count as personal data. We need explicit consent, a clear privacy policy, data deletion on request, and a grievance officer contact.
- Do **not** send names or exact identities to the LLM when they aren't needed; send chart data and a first name only.
- Encrypt birth data at rest; never sell user data.
- **Disclaimer** on every AI answer page: astrology is for guidance and entertainment and is not a substitute for medical, legal, financial, or psychological advice.
- **No predictions of death, lifespan, serious illness, or accidents.** No caste-based content. No fear-based upselling.
- Self-harm or distress keywords trigger a compassionate reply and the Indian mental-health helpline (Tele-MANAS 14416 / 1-800-891-4416).
- **Ephemeris licensing:** Swiss Ephemeris is dual-licensed (AGPL or paid commercial). For a closed-source commercial SaaS, **buy the Swiss Ephemeris professional licence** or use a permissively licensed alternative. This must be decided before launch.
- Consumer protection: transparent pricing, refund policy, GST-compliant invoicing (Razorpay supports this).
- Advertising compliance with the ASCI guidelines on claims (no "guaranteed results").

---

## 10. Proposed Technical Architecture

```
┌──────────────────────────────┐
│  Next.js (App Router)        │  SSG/ISR for SEO pages, React UI for tools & chat
│  Tailwind, i18n (en/hi)      │  PWA, hosted on Vercel / Cloudflare
└──────────────┬───────────────┘
               │ REST / tRPC
┌──────────────▼───────────────┐
│  API layer (Node/TS or       │  Auth, quotas, payments webhooks, chat orchestration
│  Python FastAPI)             │
└──┬───────────┬───────────┬───┘
   │           │           │
┌──▼─────┐ ┌───▼────────┐ ┌▼──────────────────┐
│ Astro  │ │ LLM gateway│ │ Postgres (Supabase│
│ engine │ │ (Gemma /   │ │ / Neon) + Redis   │
│ Swiss  │ │ Anthropic /│ │ cache, pgvector   │
│ Eph. + │ │ Gemini)    │ │ for RAG           │
│ rules  │ │ + RAG      │ └───────────────────┘
└────────┘ └────────────┘
```

**Stack recommendation**
- **Frontend:** Next.js + TypeScript + Tailwind + shadcn/ui; `next-intl` for i18n.
- **Astro engine:** Python service using `pyswisseph` (licensing per §9), or a Node binding; a rule engine for doshas, yogas, and Guna Milan; containerised.
- **LLM:** Provider-agnostic gateway. Launch chat uses Google Gemma 4 (`gemma-4-26b-a4b-it`) via the Gemini API; OpenAI is an optional fallback.
- **DB:** PostgreSQL (users, profiles, charts, chats, payments) + Redis (rate limits, cache) + pgvector (knowledge base).
- **Auth:** Supabase Auth / Firebase Phone OTP / Auth.js.
- **Payments:** Manual payment link by email; Pro granted in admin after payment.
- **PDF:** Server-side HTML-to-PDF (Playwright) with embedded Devanagari fonts.
- **Analytics:** GA4 + Google Search Console + PostHog (product funnels).
- **CMS:** Sanity / Payload / MDX in repo for articles and pSEO base content.

**Canonical chart JSON (excerpt)**
```json
{
  "meta": { "ayanamsa": "lahiri", "house_system": "whole_sign", "tz": "Asia/Kolkata" },
  "lagna": { "sign": "Leo", "degree": 14.23, "nakshatra": "Purva Phalguni", "pada": 1 },
  "planets": [
    { "name": "Moon", "sign": "Taurus", "house": 10, "degree": 8.51,
      "nakshatra": "Krittika", "pada": 4, "retro": false, "dignity": "exalted" }
  ],
  "dasha": { "current": { "maha": "Venus", "antar": "Saturn", "ends": "2027-03-14" } },
  "doshas": { "manglik": { "present": false, "cancelled_by": [] } },
  "yogas": ["Gajakesari"]
}
```

---

## 11. Key User Flows

1. **SEO visitor → free Kundli → AI chat**
   Google search "free kundli in hindi" → `/hi/kundli` → enters details → sees chart and a short summary → clicks "AI se puchhein" → asks 3 free questions → paywall → buys ₹49 pack or signs up for a subscription.

2. **Kundli matching → share → viral loop**
   Enters both partners' details → sees "26/36 Guna – Good match" with a breakdown → shares the card on WhatsApp → recipients land on the matching tool → repeat.

3. **Daily retention**
   User opts into a WhatsApp/push daily horoscope that's personalised to their chart → opens the app → asks a follow-up question in chat.

---

## 12. Success Metrics and Analytics

**North Star:** weekly users who receive a chart-grounded AI answer.

| Funnel stage | Metric |
|---|---|
| Acquisition | Organic sessions, indexed pages, keyword rankings (top 3 / top 10), CTR from SERP |
| Activation | % visitors who generate a chart; % chart generators who ask ≥ 1 AI question |
| Revenue | Conversion to paid, ARPU, ARPPU, LTV, refund rate, ad RPM |
| Retention | D1/D7/D30, daily horoscope opt-in rate, WhatsApp open rate |
| Quality | Thumbs-up rate ≥ 80%, flagged-answer rate < 1%, calculation regression pass rate 100% |
| Cost | LLM cost per answer, cost per paying user |

---

## 13. Milestones and Timeline

| Phase | Weeks | Deliverables |
|---|---|---|
| 0. Validation | 1–2 | Keyword research (Ahrefs/Semrush + GSC), competitor audit, ephemeris licence decision, brand + domain |
| 1. Engine | 2–5 | Astro engine + chart JSON + regression suite; Guna Milan; Manglik; Panchang |
| 2. MVP web | 4–8 | Kundli, Matching, Rashi, Manglik, Panchang pages (en + hi); SEO foundation |
| 3. AI chat | 6–9 | Chat with chart context, safety layer, quotas, auth |
| 4. Monetisation | 8–10 | Razorpay, question packs, subscription, first PDF report |
| 5. Launch | 10 | Public launch, GSC submission, 50–100 high-quality articles live |
| 6. Growth | 11–26 | pSEO batches, share cards, daily personalised horoscope, regional languages |

---

## 14. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Head-term SEO is dominated by big incumbents | Slow traffic growth | Start with long-tail, Hindi/Hinglish, and pSEO; build topical authority before chasing head terms |
| Google helpful-content / spam updates hit AI pages | Traffic collapse | Human-reviewed base content, unique computed data per page, gradual rollout, prune thin pages |
| LLM hallucination of chart facts | Loss of trust | Ephemeris-only calculations, strict grounding prompt, output validator that checks cited positions against chart JSON |
| Harmful or fear-based predictions | Reputational and legal risk | Safety policy, red-team testing, blocked topics, helpline routing |
| Calculation errors (timezone, ayanamsa) | Users compare with AstroSage and leave | Regression suite vs. reference software; historical timezone DB |
| LLM costs exceed revenue | Negative margins | Model routing, caching, token caps, free-tier limits |
| Ephemeris AGPL licence | Legal exposure | Buy a commercial licence or open-source the engine |
| Low willingness to pay in India | Low revenue | Micro-pricing (₹49 packs), UPI, ads on free pages, NRI pricing in USD |
| Regulatory (DPDP) | Fines | Consent flows, deletion, minimal data to LLM, DPA with vendors |

---

## 15. Open Questions

1. Final brand name and domain (Hindi-friendly, short, `.com` or `.in`)?
2. Whose interpretive tradition do we follow (Parashari default; KP or Lal Kitab later)?
3. Hire or partner with a credentialed astrologer for content review and the author bio (for E-E-A-T)?
4. Swiss Ephemeris commercial licence vs. open-sourcing the engine?
5. Which LLM provider(s) at launch, and what's the budget per 1k answers?
6. Do we show remedies (mantras, charity, fasting) at all? If yes, only non-commercial ones?
7. WhatsApp Business API for daily horoscopes: in the MVP or Phase 2?

---

## 16. Appendix: Competitor Snapshot

| Competitor | Strengths | Gaps we can exploit |
|---|---|---|
| AstroSage | Huge content library, high domain authority, many tools | Dated UX, heavy ads, data without explanation |
| AstroTalk | Human astrologer marketplace, strong brand | Expensive per-minute model, upsell-heavy |
| Drik Panchang | Highly accurate Panchang and calendar | No personalised AI interpretation |
| Ganeshaspeaks | Brand, reports | Expensive reports, generic content |
| Generic "AI astrology" apps | Trendy | Usually Western/tropical, inaccurate Vedic math, no Hindi |

**Positioning statement:**
*"Accurate Vedic Kundli, explained by an AI astrologer in your own language: instant, private, and affordable."*
