/**
 * Blog posts as typed data. Inline links use [text](/path) syntax inside paragraph/list strings.
 * Add a new post by appending to POSTS; the index, sitemap and [slug] route pick it up automatically.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type Post = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  /** "founder" credits Talha Amjad (byline + Article schema Person); default is the Astrojanta team. */
  author?: "founder";
  published: string; // ISO date
  updated: string;
  intro: string;
  body: Block[];
  faqs: { q: string; a: string }[];
};

const mercuryRetrograde2026: Post = {
  slug: "mercury-retrograde-2026",
  title: "Budh Vakri 2026: IST Dates & Rashi-wise Effects",
  h1: "Budh Vakri 2026 (Mercury Retrograde): Dates in IST, Effects by Rashi and What to Avoid",
  description:
    "Budh vakri 2026: Mercury retrograde dates in IST, rashi-wise effects on career aur paisa, kya karein aur kya na karein, plus simple Budh upay.",
  keyword: "budh vakri 2026",
  published: "2026-10-26",
  updated: "2026-11-03",
  intro:
    "Mercury — Budh in Vedic astrology — turned retrograde (vakri) on 24 October 2026 and stays retrograde until 13 November 2026. This is the third and final Mercury retrograde of the year. Below you will find the exact dates in Indian time, where Mercury is in the sidereal (Vedic) zodiac, what a retrograde actually means, how it may play out for your Moon sign, and a practical list of what to do and what to avoid.",
  body: [
    { type: "h2", text: "Budh vakri 2026 dates (Mercury retrograde in IST)" },
    {
      type: "p",
      text: "Mercury has three retrograde periods in 2026. The first ran from 26 February to 21 March (in Kumbha), the second from 29 June to 24 July (Karka back into Mithuna), and the third is the one happening now:",
    },
    {
      type: "table",
      head: ["Event", "Date and time (IST, approx.)", "Mercury's position (Vedic / sidereal)"],
      rows: [
        ["Stations retrograde", "Saturday 24 October 2026, ~12:41 PM", "about 26°46′ Tula (Libra), Vishakha nakshatra"],
        ["Stations direct", "Friday 13 November 2026, ~9:22 PM", "about 10°49′ Tula (Libra), Swati nakshatra"],
        ["Post-retrograde shadow ends", "around 30 November 2026", "Mercury returns to ~26°46′ Tula"],
      ],
    },
    {
      type: "p",
      text: "Station times are given for New Delhi in IST and can differ by a few minutes between panchangs, because a planet barely moves near its station — what matters is the day, not the minute. Many Western websites say this retrograde happens “in Scorpio”. That is true in the tropical zodiac. In Vedic astrology, which uses the sidereal zodiac with the Lahiri ayanamsa (roughly 24° in 2026), the whole retrograde stays inside Tula (Libra). That is why your Vedic reading of this period can differ from a Western horoscope.",
    },
    {
      type: "p",
      text: "Not sure which sign you are in the Vedic system? Your Vedic Rashi is your Moon sign, not your sun sign. You can find it in a few seconds with the free [Moon sign and Nakshatra finder](/moon-sign).",
    },

    { type: "h2", text: "What does Mercury retrograde mean?" },
    {
      type: "p",
      text: "Astronomically, Mercury does not actually reverse. Because Mercury orbits the Sun faster than Earth, there are three or four stretches each year when, seen from Earth, it appears to slow down, stand still and move backwards against the background stars for about three weeks. Astrologers call this apparent backward motion vakri (retrograde).",
    },
    {
      type: "p",
      text: "Mercury rules communication, speech, writing, trade, contracts, calculation, short travel, technology and learning. In Jyotish, Budh is also the karaka of intelligence, analysis and commerce, and the lord of Mithuna (Gemini) and Kanya (Virgo). When a planet is retrograde, its themes are traditionally said to turn inward: they ask to be reviewed, revised and repeated rather than started fresh. So the classic Mercury retrograde meaning is not “everything breaks”, but “this is a period for the re- words”: review, revise, reconnect, renegotiate, repair.",
    },
    {
      type: "p",
      text: "Vedic astrology is also less fearful of retrograde planets than popular culture is. Classical texts often treat a retrograde planet as strong (cheshta bala is high when a planet is vakri), and a retrograde Mercury in a birth chart is not a defect. The transit is best read as a change of pace, not a curse.",
    },

    { type: "h2", text: "Why Tula (Libra) matters this time" },
    {
      type: "p",
      text: "Tula is ruled by Venus and is the sign of balance, partnership, agreements and fair exchange. Mercury is friendly with Venus, so Mercury in Tula is comfortable — diplomatic, tactful and focused on negotiation. Retrograde, that energy tends to show up as second thoughts about agreements, old conversations with partners or clients resurfacing, and a need to rebalance give-and-take in relationships and business.",
    },
    {
      type: "p",
      text: "Venus is also retrograde for much of this period (from early October to mid-November 2026), moving back through Tula into Kanya. When the sign lord and the planet in it are both retrograde, the review theme around relationships, money and agreements is emphasised. If you have been meaning to have an honest conversation about a partnership, this is a natural season for it — just let decisions settle after both planets turn direct.",
    },
    {
      type: "p",
      text: "Mercury moves back over Vishakha and Swati nakshatras. Vishakha is goal-driven and associated with determination; Swati, ruled by Rahu, is associated with independence, trade and movement. Practically, this suggests reviewing goals and business plans rather than launching new ventures.",
    },

    { type: "h2", text: "Mercury retrograde effects by Rashi (Moon sign)" },
    {
      type: "p",
      text: "In Vedic transit reading (gochar), the effect depends on which house from your Moon sign the planet is moving through. Below is the general picture for each Rashi. Treat it as a starting point: your Lagna, your natal Mercury and your current dasha change how strongly you feel any transit. For a reading based on your own chart, ask the [AI astrologer](/ai-astrologer).",
    },
    {
      type: "ul",
      items: [
        "Mesha (Aries) — 7th house: partnerships and contracts come up for review. Past clients, old friends or an ex may reconnect. Clarify expectations with your partner before agreeing to anything new.",
        "Vrishabha (Taurus) — 6th house: work routines, health habits and pending tasks. A good time to clear backlog, fix processes and recheck paperwork with colleagues. Double-check details in disputes.",
        "Mithuna (Gemini) — 5th house: Mercury is your Rashi lord, so you may feel this more. Creative projects, studies and romance are in review mode. Revisit unfinished creative work; students should revise rather than start new subjects.",
        "Karka (Cancer) — 4th house: home, family and property. Expect repairs, family discussions and possibly delays in property paperwork. Back up home devices and read rental or property documents twice.",
        "Simha (Leo) — 3rd house: communication, siblings, short trips and media. Messages can be misread, so proofread and confirm plans. A good time to rewrite, edit and reconnect with siblings.",
        "Kanya (Virgo) — 2nd house: Mercury is your Rashi lord. Money, savings and speech are highlighted. Review budgets and subscriptions, and think before speaking in family matters.",
        "Tula (Libra) — 1st house: the retrograde is in your own sign, so personal plans and how you present yourself are under review. You may rethink a personal goal or appearance. Avoid impulsive commitments; reflect first.",
        "Vrishchika (Scorpio) — 12th house: expenses, foreign links, sleep and solitude. Watch hidden costs and travel bookings. Rest, reflection and finishing pending matters work better than new starts.",
        "Dhanu (Sagittarius) — 11th house: income, networks and long-term goals. Old contacts can bring opportunities back. Re-examine goals and follow up on payments owed to you.",
        "Makara (Capricorn) — 10th house: career and reputation. Projects may need revisions, approvals can be slow, and miscommunication with seniors is possible. Document decisions and confirm instructions in writing.",
        "Kumbha (Aquarius) — 9th house: higher studies, long-distance travel, beliefs and teachers. Check visas, tickets and applications carefully. A good time to revisit spiritual practice or study.",
        "Meena (Pisces) — 8th house: shared finances, insurance, taxes and research. Review joint accounts and policies, and avoid signing complex financial documents in haste.",
      ],
    },
    {
      type: "p",
      text: "If your natal Mercury, Lagna or Moon is close to the 11°–27° range of Tula, the retrograde passes over that point three times (before, during and after the retrograde), so the themes can feel more personal. Your [free Kundli](/kundli) shows the exact degrees of your planets.",
    },

    { type: "h2", text: "What to avoid during Mercury retrograde" },
    {
      type: "p",
      text: "Nothing on this list is forbidden; it is about lowering the chance of avoidable mistakes during a period traditionally linked with miscommunication and delays.",
    },
    {
      type: "ul",
      items: [
        "Signing major contracts in a hurry. If you must sign, read every clause and get key points in writing.",
        "Buying expensive electronics or vehicles on impulse. Compare, check warranties and return policies.",
        "Launching a brand-new business, website or product without testing. Soft launches and fixes are fine.",
        "Sending important emails or messages without proofreading — check the recipient, attachments and tone.",
        "Making final decisions on reunions with an ex or old business partner while emotions are high.",
        "Booking travel without confirming dates, names and documents.",
      ],
    },

    { type: "h2", text: "What is good to do during Mercury retrograde" },
    {
      type: "ul",
      items: [
        "Review and revise: edit drafts, update your CV, refine business plans.",
        "Reconnect: reply to old messages, resolve pending misunderstandings, thank people you lost touch with.",
        "Repair and back up: fix devices, update software, back up phones and files.",
        "Research before deciding: gather information now and act after 13 November, ideally after the shadow period ends.",
        "Study and revise for exams — revision suits a retrograde better than starting a new syllabus.",
        "Finish pending paperwork you have been putting off.",
      ],
    },

    { type: "h2", text: "Remedies traditionally associated with Mercury" },
    {
      type: "p",
      text: "Traditional Jyotish suggests simple, low-cost practices for Budh. These are cultural and spiritual practices, not guarantees, and you never need to buy anything expensive:",
    },
    {
      type: "ul",
      items: [
        "Chanting the Budh beej mantra “Om Bram Breem Broum Sah Budhaya Namah” or the Vishnu Sahasranama, especially on Wednesdays.",
        "Donating green moong dal, green vegetables or study material to students on Wednesdays.",
        "Speaking carefully and keeping promises — Mercury is the planet of speech.",
        "Feeding birds or caring for plants, both traditionally connected with Mercury.",
      ],
    },
    {
      type: "p",
      text: "Be wary of anyone who tells you that a transit requires an expensive gemstone or puja. A three-week retrograde is a normal, recurring event that happens several times every year.",
    },

    { type: "h2", text: "Mercury retrograde in your birth chart vs. the transit" },
    {
      type: "p",
      text: "There are two different things people mean by “Mercury retrograde”. The transit, described above, affects everyone in a general way for a few weeks. A natal retrograde Mercury — being born while Mercury was retrograde — is a permanent part of your chart. It is common and often associated with a reflective, thorough or unconventional thinking style. Your [Kundli](/kundli) marks retrograde planets with an R so you can check.",
    },
    {
      type: "p",
      text: "Relationship questions during this Venus–Mercury retrograde season are common. If you are evaluating a match, a [Kundli matching](/matching) report and a [Manglik check](/manglik) give you objective chart information to discuss calmly, instead of making a rushed decision.",
    },

    { type: "h2", text: "Ask the AI astrologer about your own chart" },
    {
      type: "p",
      text: "Generic Rashi predictions can only go so far. Astrojanta's [Vedic AI astrologer](/ai-astrologer) reads your actual Kundli — Lagna, Moon, houses and current dasha — and can explain how this Mercury retrograde interacts with your chart, in Hindi, Hinglish or English. Start with your free Kundli (no sign-up needed), create a free account to open the AI chat, then ask something specific, like “Which house is Mercury retrograde transiting for me, and what should I review at work?”",
    },
  ],
  faqs: [
    {
      q: "What are the Budh vakri (Mercury retrograde) 2026 dates?",
      a: "Mercury is retrograde three times in 2026 (IST): 26 February to 21 March, 29 June to 24 July, and 24 October to 13 November 2026. The current one began around 12:41 PM IST on 24 October and ends around 9:22 PM IST on 13 November.",
    },
    {
      q: "Which sign is Mercury retrograde in, in Vedic astrology?",
      a: "In the sidereal zodiac with the Lahiri ayanamsa, this retrograde stays in Tula (Libra), moving back from about 26° to about 11° Tula. Western astrology places it in Scorpio because it uses the tropical zodiac.",
    },
    {
      q: "What does Mercury retrograde mean?",
      a: "It is the period when Mercury appears to move backwards from Earth's point of view. Astrologically, Mercury's themes — communication, contracts, technology, travel and learning — turn toward review and revision rather than new beginnings.",
    },
    {
      q: "Is Mercury retrograde bad?",
      a: "Not necessarily. It is linked with delays and misunderstandings, so care with details helps, but it is also good for reviewing, repairing and reconnecting. Vedic astrology considers retrograde planets strong, not inherently malefic.",
    },
    {
      q: "Can I sign a contract or buy a phone during Mercury retrograde?",
      a: "You can if you need to. Read documents carefully, get terms in writing, and check warranties and return policies. If a decision can wait, many people prefer to wait until after 13 November.",
    },
    {
      q: "Which Rashi is most affected by this Mercury retrograde?",
      a: "Tula (where the retrograde happens) and Mithuna and Kanya (ruled by Mercury) tend to notice it most. Your Lagna, natal Mercury and current dasha decide how strongly it shows up for you personally.",
    },
  ],
};

const freeAiKundli: Post = {
  slug: "free-ai-kundli-online",
  title: "Free AI Kundli: How to Make Your Janam Kundli Online (and Read It with AI)",
  h1: "Free AI Kundli: How to Make Your Janam Kundli Online and Read It with AI",
  description:
    "Make your Janam Kundli online free in a few seconds, understand the 12 houses, and read your chart with an AI astrologer in Hindi or English. Includes a Hindi guide (kundli kaise dekhe).",
  keyword: "ai kundli free",
  published: "2026-10-29",
  updated: "2026-11-09",
  intro:
    "A Janam Kundli is the starting point of every Vedic astrology reading, but most people get stuck after the chart appears: twelve boxes, planet abbreviations and numbers. This guide focuses on making an accurate chart: which birth details you need, the steps to follow, the mistakes that produce a wrong kundli, and how to ask an AI astrologer to explain the result in plain English, Hindi or Hinglish. If you already have a chart and want to learn to read it, start with our [AI kundli reader guide](/blog/ai-kundli-reader) instead.",
  body: [
    { type: "h2", text: "What is a Janam Kundli?" },
    {
      type: "p",
      text: "A Janam Kundli (जन्म कुंडली), also called a birth chart or horoscope, is a snapshot of the sky at the exact moment and place you were born. It records which zodiac sign was rising on the eastern horizon (the Lagna), where the Moon was (your Rashi and Nakshatra), and where the other planets were placed across twelve houses.",
    },
    {
      type: "p",
      text: "Vedic astrology (Jyotish) uses the sidereal zodiac, which is aligned with the fixed stars, rather than the tropical zodiac used in Western astrology. The gap between them is called the ayanamsa. Astrojanta uses the Lahiri (Chitrapaksha) ayanamsa, the standard used by most Indian astrologers and almanacs. That is why your Vedic Rashi is often one sign behind the sun sign you read in Western horoscopes.",
    },
    {
      type: "p",
      text: "From this one chart an astrologer reads personality, strengths, career and relationship themes, and — through the dasha system — the timing of life phases. Kundli matching, Manglik checks and Sade Sati are all calculated from the same chart.",
    },

    { type: "h2", text: "What you need to make an accurate kundli" },
    {
      type: "ul",
      items: [
        "Date of birth — fixes where the planets were.",
        "Exact time of birth — decides your Lagna and house positions. The Lagna changes roughly every two hours, so even a 10–15 minute error can shift houses. Use a birth certificate or hospital record if you can.",
        "Place of birth — gives the latitude, longitude and the historical time zone used for the calculation.",
      ],
    },
    {
      type: "p",
      text: "If you do not know your birth time, you can still find your Moon sign, Nakshatra and the signs of the planets. Treat anything about houses or the Lagna as uncertain until you have a reliable time.",
    },

    { type: "h2", text: "How to make your free kundli online on Astrojanta (step by step)" },
    {
      type: "ul",
      items: [
        "Open the [free AI kundli](/kundli) page. No sign-up is needed — guests get 1 free Kundli per day, and a free account gives you more.",
        "Enter your name (optional), date of birth and time of birth. Use 24-hour time carefully, or check AM/PM.",
        "Start typing your birth place and pick the right town from the suggestions, so the correct coordinates and time zone are used.",
        "Generate the chart. In a few seconds you get your Lagna, Rashi, Nakshatra and pada, the planetary table, the North Indian style D1 chart, the Navamsa (D9), your Vimshottari dasha timeline, and Manglik and Sade Sati status.",
        "Check that the basics look right — for example, compare your Moon sign with the [Moon sign and Nakshatra finder](/moon-sign) or an older chart you trust.",
        "To ask questions about the chart, create a free account. The AI astrologer chat needs an account so your chart and conversation can be saved.",
      ],
    },

    { type: "h2", text: "The 12 houses of the kundli, explained simply" },
    {
      type: "p",
      text: "Each of the twelve houses (bhavas) governs an area of life. The sign on a house, the planets sitting in it and where its lord is placed all colour that area. In the North Indian chart, the top-centre diamond is always the 1st house; the number written in it is the sign of your Lagna.",
    },
    {
      type: "table",
      head: ["House", "Main themes"],
      rows: [
        ["1st (Lagna)", "Self, body, temperament, overall direction of life"],
        ["2nd", "Family, savings, speech, food habits"],
        ["3rd", "Courage, effort, siblings, communication, short travel"],
        ["4th", "Mother, home, property, vehicles, inner peace"],
        ["5th", "Intelligence, education, children, creativity, romance"],
        ["6th", "Health routines, debts, competition, service, obstacles"],
        ["7th", "Marriage, spouse, partnerships, business deals"],
        ["8th", "Longevity, sudden changes, inheritance, research, the hidden"],
        ["9th", "Fortune, father, teachers, dharma, long journeys"],
        ["10th", "Career, status, public life, karma"],
        ["11th", "Income, gains, friends, networks, fulfilment of wishes"],
        ["12th", "Expenses, losses, foreign lands, sleep, spirituality, moksha"],
      ],
    },
    {
      type: "p",
      text: "A useful habit: when you have a question, first find the house that rules it, then look at that house's sign, any planets inside it, and where its lord sits. For marriage you would study the 7th house and Venus; for career the 10th house, its lord and the Sun and Saturn.",
    },

    { type: "h2", text: "Other parts of your chart worth knowing" },
    {
      type: "ul",
      items: [
        "Rashi and Nakshatra: the Moon's sign and one of 27 lunar mansions. They are used for rashifal, naming, Sade Sati and [Kundli matching](/matching).",
        "Grahas: the nine Vedic planets — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu. An R next to a planet means it was retrograde at birth, which is common and not a defect.",
        "Navamsa (D9): a divisional chart traditionally read for marriage and to judge how strong the D1 planets really are.",
        "Vimshottari dasha: a 120-year sequence of planetary periods that starts from your Moon's Nakshatra. The current mahadasha and antardasha show which planets are 'active' now.",
        "Manglik status: whether Mars falls in certain houses from the Lagna and Moon. Use the [Manglik calculator](/manglik) to see the check and any classical cancellations.",
      ],
    },

    { type: "h2", text: "How to read your kundli with the AI astrologer" },
    {
      type: "p",
      text: "This is what makes it an AI kundli rather than just a chart. The [AI astrologer](/ai-astrologer) reads the chart Astrojanta has calculated — it never guesses planetary positions — and answers your questions in plain language, pointing to the houses, lords and dashas behind each answer.",
    },
    {
      type: "p",
      text: "Specific questions get better answers than vague ones. Some good ones to start with:",
    },
    {
      type: "ul",
      items: [
        "Which planets are strongest in my chart, and what does that mean for me?",
        "Explain my Lagna and Moon sign in simple words.",
        "What does my current Mahadasha and Antardasha indicate for career?",
        "Which house rules marriage in my chart, and what is placed there?",
        "Meri shaadi kab hogi aur 7th house mein kya dikh raha hai?",
        "Am I Manglik, and does any cancellation apply?",
      ],
    },
    {
      type: "p",
      text: "Remember what astrology can and cannot do: it describes tendencies and favourable or challenging periods, not guaranteed events. The AI will not replace medical, legal or financial advice, and for major decisions many people also consult an experienced jyotishi.",
    },

    { type: "h2", text: "Kundli kaise dekhe? (कुंडली कैसे देखें — हिंदी में)" },
    {
      type: "p",
      text: "मुफ़्त जन्म कुंडली बनाने के लिए अपनी जन्म तिथि, जन्म का सही समय और जन्म स्थान डालें। कुछ ही सेकंड में आपको लग्न, राशि, नक्षत्र, ग्रहों की स्थिति, नवांश कुंडली और विंशोत्तरी दशा मिल जाएगी।",
    },
    {
      type: "ul",
      items: [
        "लग्न (पहला भाव): आपका स्वभाव, शरीर और जीवन की दिशा।",
        "राशि: जन्म के समय चंद्रमा जिस राशि में था — राशिफल, साढ़े साती और गुण मिलान इसी से देखे जाते हैं।",
        "सातवाँ भाव: विवाह और जीवनसाथी। दसवाँ भाव: करियर और मान-सम्मान।",
        "दशा: इस समय कौन-सा ग्रह सक्रिय है, यह महादशा और अंतर्दशा से पता चलता है।",
      ],
    },
    {
      type: "p",
      text: "कुंडली समझने में मुश्किल हो तो एआई ज्योतिषी से हिंदी या हिंग्लिश में पूछें — जैसे “मेरा करियर कैसा रहेगा?” या “मेरी शादी कब होगी?”। एआई चैट के लिए एक मुफ़्त अकाउंट बनाना होता है।",
    },

    { type: "h2", text: "Common mistakes when making a kundli online" },
    {
      type: "ul",
      items: [
        "Mixing up AM and PM, or entering a rounded time like 12:00 when the real time is unknown.",
        "Choosing the wrong town with the same name — always check the state or country in the suggestion.",
        "Comparing with a chart made in a different system (tropical/Western, or a different ayanamsa) and assuming one is wrong.",
        "Reading one planet in isolation instead of the house, its lord and the current dasha together.",
        "Panicking over a 'dosha'. Manglik and similar checks have classical cancellations and are only one factor.",
      ],
    },

    { type: "h2", text: "Make your free AI kundli now" },
    {
      type: "p",
      text: "Start with your [free AI kundli](/kundli) — no sign-up needed. Planning a marriage? Run [Kundli matching](/matching) for both partners. Then create a free account and ask the [AI astrologer](/ai-astrologer) to explain what your chart says, in the language you are comfortable with.",
    },
  ],
  faqs: [
    {
      q: "Is the AI kundli on Astrojanta free?",
      a: "Yes. Making your Janam Kundli is free and needs no sign-up — guests get 1 free Kundli per day. Chatting with the AI astrologer about your chart needs a free account. An optional Pro plan raises daily limits.",
    },
    {
      q: "What is an AI kundli?",
      a: "It is a Vedic birth chart calculated from an astronomical ephemeris, combined with an AI astrologer that explains it. On Astrojanta the AI only interprets the calculated chart; it does not invent planet positions.",
    },
    {
      q: "Can I get my kundli in Hindi?",
      a: "Yes. The chart shows Hindi sign names, and you can ask the AI astrologer questions in Hindi or Hinglish and get answers in the same language.",
    },
    {
      q: "How do I make a janam kundli online without birth time?",
      a: "Enter your best estimate. Your Moon sign, Nakshatra and planetary signs will usually still be correct, but the Lagna and house positions may not be, so treat house-based readings as uncertain.",
    },
    {
      q: "Kundli kaise dekhe — where should a beginner start?",
      a: "Start with the Lagna (1st house), your Moon sign (Rashi) and the current dasha. Then look at the house that rules your question — the 7th for marriage, the 10th for career — and the planets in it.",
    },
    {
      q: "Is an online kundli as accurate as one made by a pandit?",
      a: "The calculation can be just as accurate if your birth details are correct and the same system (sidereal, Lahiri ayanamsa) is used. Interpretation is where experience matters; the AI explains the chart, and for big decisions you may also consult an experienced astrologer.",
    },
  ],
};

const aiKundliReader: Post = {
  slug: "ai-kundli-reader",
  title: "AI Kundli Reader: Read Your Kundali Online Free (Houses, Planets & Lagna)",
  h1: "AI Kundli Reader: How to Read Your Kundali Online Free",
  description:
    "Already have your kundli? Learn to read it step by step: the Lagna, 12 houses, 9 planets and dasha, plus how an AI kundli reader explains it. Also: kundli vs kundalini.",
  keyword: "kundalini reader ai",
  published: "2026-10-30",
  updated: "2026-11-09",
  intro:
    'Searching for a "kundalini reader AI" usually means one thing: you have a kundli (or want one) and you would like someone — or something — to explain it. This guide shows how to read your kundali step by step, what the Lagna, houses and planets actually mean, and how an [AI kundli reader](/kundli) turns a confusing chart into plain answers in English, Hindi or Hinglish. We will also clear up the common mix-up between kundli (a birth chart) and kundalini (a yoga term). Don\'t have a chart yet? Make one first with our [free AI kundli guide](/blog/free-ai-kundli-online), then come back here to read it.',
  body: [
    { type: "h2", text: "Kundli, kundali, kundalini — which one are you looking for?" },
    {
      type: "p",
      text: "Kundli and kundali are two spellings of the same word: कुंडली, the Vedic birth chart. It is also called a Janam Kundli, Janam Patri or horoscope. It maps where the Sun, Moon and planets were, and which sign was rising, at the exact time and place you were born.",
    },
    {
      type: "p",
      text: "Kundalini (कुण्डलिनी) is something different. In yoga and tantra it describes a dormant spiritual energy said to rest at the base of the spine, which practices like pranayama, meditation and kundalini yoga aim to awaken through the chakras. It is not calculated from your birth details and has nothing to do with houses or planets.",
    },
    {
      type: "p",
      text: 'Because the words sound alike, many people type "kundalini reader" when they mean a kundli reader. If you want your birth chart read — personality, career, marriage timing, dasha — you are in the right place. If you are looking for kundalini awakening practice, a qualified yoga teacher is the right guide.',
    },

    { type: "h2", text: "What a kundli actually contains" },
    {
      type: "p",
      text: "Every kundli is built from three inputs: date of birth, exact time of birth and place of birth. From these, the chart records:",
    },
    {
      type: "ul",
      items: [
        "The Lagna (ascendant) — the zodiac sign rising on the eastern horizon at birth. It becomes the 1st house and sets the order of all twelve houses.",
        "The twelve houses (bhavas) — each one rules a part of life, from self and wealth to marriage, career and spirituality.",
        "The nine grahas — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu — each placed in a sign and a house.",
        "Your Rashi (Moon sign) and Nakshatra — the sign and lunar mansion where the Moon sat, which drive the dasha system and much of daily horoscope reading.",
        "The Vimshottari dasha — a 120-year timeline of planetary periods that shows which planet's themes are active in each phase of life.",
        "Divisional charts such as the Navamsa (D9), used for marriage and deeper strength of planets.",
      ],
    },
    {
      type: "p",
      text: "If you do not have a chart yet, you can make one in seconds with the [free AI kundli](/kundli) tool. Our step-by-step [guide to making a free AI kundli online](/blog/free-ai-kundli-online) covers the inputs and what to double-check.",
    },

    { type: "h2", text: "How to read your kundli in five steps" },
    { type: "h3", text: "1. Start with the Lagna" },
    {
      type: "p",
      text: "In the North Indian chart the top-centre diamond is always the 1st house, and the number written in it is the Lagna sign (1 = Aries/Mesha, 2 = Taurus/Vrishabha, and so on). The Lagna describes your body, temperament and the lens through which you meet the world. Its ruling planet, the Lagna lord, is one of the most important planets in the whole chart: where it sits shows where your life energy naturally flows.",
    },
    { type: "h3", text: "2. Read the houses counter-clockwise" },
    {
      type: "p",
      text: "From the 1st house, count counter-clockwise through the remaining eleven. A quick reference:",
    },
    {
      type: "table",
      head: ["House", "Main themes"],
      rows: [
        ["1st (Lagna)", "Self, body, personality"],
        ["2nd", "Wealth, family, speech, food"],
        ["3rd", "Courage, siblings, communication, short travel"],
        ["4th", "Mother, home, property, inner peace"],
        ["5th", "Intelligence, children, romance, past merit"],
        ["6th", "Health issues, debts, enemies, daily work"],
        ["7th", "Marriage, partnerships, business deals"],
        ["8th", "Longevity, sudden change, secrets, research"],
        ["9th", "Luck, father, dharma, higher learning"],
        ["10th", "Career, status, public reputation"],
        ["11th", "Income, gains, friends, wishes fulfilled"],
        ["12th", "Expenses, foreign lands, sleep, moksha"],
      ],
    },
    { type: "h3", text: "3. Place the planets" },
    {
      type: "p",
      text: "Each graha brings its own nature into the house it occupies. Jupiter expands and protects, Saturn delays and disciplines, Mars energises and can cause conflict, Venus brings comfort and relationships, Mercury sharpens thinking and trade, the Sun gives authority, the Moon shapes the mind and emotions, and Rahu and Ketu create obsession and detachment along their axis. A planet's sign matters too: exalted or in its own sign it works strongly, debilitated it struggles unless other factors help.",
    },
    { type: "h3", text: "4. Look at the house that answers your question" },
    {
      type: "p",
      text: "Do not try to read the whole chart at once. For a marriage question, look at the 7th house, its lord and Venus (or Jupiter for women in traditional readings), then check the Navamsa. For career, study the 10th house, its lord, the Sun and Saturn. For money, combine the 2nd and 11th houses. This focused method is exactly how experienced astrologers work.",
    },
    { type: "h3", text: "5. Add timing with the dasha" },
    {
      type: "p",
      text: 'A promise in the chart shows up when the right dasha runs. If you are in Venus mahadasha and Venus rules your 7th house, relationship themes are likely to be active. Your current mahadasha and antardasha tell you which parts of the chart are "switched on" right now.',
    },

    { type: "h2", text: "What an AI kundli reader does" },
    {
      type: "p",
      text: "Reading all of this by hand takes years of practice. An AI kundli reader does the cross-referencing for you. On AstroJanta the process has two separate layers:",
    },
    {
      type: "ul",
      items: [
        "Calculation — an astronomical ephemeris computes exact sidereal planet positions using the Lahiri ayanamsa, then builds your Lagna, houses, Nakshatra, Navamsa and Vimshottari dasha. Nothing here is guessed by AI.",
        "Interpretation — the [AI astrologer](/ai-astrologer) reads that calculated chart and answers your questions in plain language, pointing to the houses, planets and dasha its answer is based on.",
      ],
    },
    {
      type: "p",
      text: 'This split matters. A general chatbot asked to "read my kundli" may invent planet positions; a proper kundli analysis AI only interprets numbers that were actually calculated. You can ask follow-ups like "Why is my 10th house strong?", "When does my Saturn period end?" or "Mera shaadi ka yog kab hai?" and get answers grounded in your own chart. If you have one specific question rather than a whole chart to go through, our guide to [asking an astrologer one free question](/blog/ask-astrologer-free) shows how to phrase it.',
    },

    { type: "h2", text: "How to read your kundli online free with AstroJanta" },
    {
      type: "ul",
      items: [
        "Open the [free kundli](/kundli) page and enter your date, time and place of birth. Guests get 1 free Kundli per day with no sign-up.",
        "Review the basics: Lagna, Rashi, Nakshatra, the D1 and D9 charts, the planet table, Manglik and Sade Sati status, and your dasha timeline.",
        "Create a free account to unlock the [AI astrologer chat](/ai-astrologer) and save your chart.",
        "Ask one clear question at a time — career, marriage, money, health tendencies, or the effect of your current dasha.",
        "Use the answers as a guide for reflection, not as a fixed fate. For major decisions, combine them with practical advice.",
      ],
    },

    { type: "h2", text: "Common mistakes when reading a kundli" },
    {
      type: "ul",
      items: [
        "Using a wrong birth time. The Lagna changes about every two hours, so a small error can move every planet into a different house.",
        "Mixing Western and Vedic signs. Your Vedic Rashi is often one sign behind your Western sun sign because of the ayanamsa.",
        'Judging a planet in isolation. A "bad" planet can be well supported by its sign, aspects and the dasha it runs in.',
        "Fearing single yogas. Manglik dosha or Sade Sati are common and have many cancellations; read the whole picture.",
        "Ignoring timing. Without the dasha, you know what the chart promises but not when.",
      ],
    },

    { type: "h2", text: "Kundli reading in Hindi (kundli kaise padhe)" },
    {
      type: "p",
      text: "Sabse pehle Lagna dekhiye — chart ke upar beech wale khaane mein jo number likha hai, wahi aapka Lagna hai. Phir apne sawal ke hisaab se ghar chuniye: shaadi ke liye saatvan (7th), naukri ke liye dasvan (10th), paise ke liye doosra aur gyarahvan (2nd, 11th). Us ghar mein baithe grah aur uske swami grah ko dekhiye, aur aakhir mein apni chal rahi mahadasha check kijiye. AstroJanta ka AI astrologer yahi sab Hindi ya Hinglish mein samjha deta hai.",
    },
  ],
  faqs: [
    {
      q: "Is a kundalini reader the same as a kundli reader?",
      a: "No. Kundli (or kundali) is a Vedic birth chart calculated from your birth date, time and place. Kundalini is a yoga concept about spiritual energy and is not read from a chart. Most people searching for a kundalini reader AI actually want their kundli read.",
    },
    {
      q: "Can AI read my kundli accurately?",
      a: "AI can interpret a chart well if the chart itself is calculated correctly. AstroJanta computes planet positions with an astronomical ephemeris and the Lahiri ayanamsa, and the AI only explains that data, so accuracy depends mainly on your birth time being correct.",
    },
    {
      q: "How can I read my kundli online for free?",
      a: "Enter your birth details on the free kundli page to get your Lagna, houses, planets, Navamsa and dasha. Guests get 1 free Kundli per day; a free account adds the AI astrologer chat so you can ask questions about the chart.",
    },
    {
      q: "Which house should I check for marriage and career?",
      a: "The 7th house, its lord and Venus are the main factors for marriage, supported by the Navamsa (D9). The 10th house, its lord, the Sun and Saturn describe career. Always check the current dasha for timing.",
    },
    {
      q: "Can the AI kundli reader answer in Hindi?",
      a: "Yes. You can ask questions in Hindi, Hinglish or English and the AI astrologer replies in the same language, using Hindi sign names where helpful.",
    },
    {
      q: "What if I don't know my exact birth time?",
      a: "Your Moon sign, Nakshatra and planetary signs are usually still correct, but the Lagna and house placements may be off. Treat house-based readings as uncertain until you find a reliable birth time.",
    },
  ],
};

const askAstrologerFree: Post = {
  slug: "ask-astrologer-free",
  title: "Ask an Astrologer Free: How to Phrase One Question for a Chart-Based Answer",
  h1: "Ask an Astrologer Free – Get One Question Answered Instantly",
  description:
    "Have one question about marriage, career or money? How to phrase it, sample questions, how a free chart-based answer works, and the limits to know.",
  keyword: "ask astrologer free",
  published: "2026-10-31",
  updated: "2026-11-09",
  intro:
    "Most people who want to ask an astrologer free have just one burning question: When will I get married? Will this job change work out? Is this a good year for money? Traditionally you would book a paid consultation or wait days for a reply. Today you can ask the question online and get an instant answer grounded in your own Vedic birth chart. This guide explains how free astrology questions actually work, how to phrase your question so the answer is genuinely useful, sample questions for common topics, and what a free answer can and cannot tell you. This page is about getting one good answer; for how AI astrologers work, how accurate they are and how they handle your privacy, see our [AI astrologer guide](/blog/ai-astrologer-free-hindi). When you are ready, you can [ask the AI astrologer](/ai-astrologer) directly.",
  body: [
    { type: "h2", text: "Can you really ask an astrologer for free?" },
    {
      type: "p",
      text: 'Yes, but it helps to know what "free" usually means. Many astrology apps advertise a free first question and then switch to per-minute billing once the chat starts. Others give a generic sun-sign answer that is the same for millions of people. A useful free answer has to be based on your own chart, which means the astrologer (human or AI) needs your date, time and place of birth.',
    },
    {
      type: "p",
      text: "On AstroJanta, the reading starts from a real chart. Your [free kundli](/kundli) is calculated with an astronomical ephemeris and the Lahiri ayanamsa, and the AI astrologer explains that chart in plain language. You can ask in English, Hindi or Hinglish. The chat needs a free account, with no card and no per-minute charges, so you can ask your question and read the answer at your own pace.",
    },

    { type: "h2", text: "How an instant astrology answer works" },
    {
      type: "p",
      text: "When you ask a question, a good Vedic reading always follows the same logic, whether it is done by a pandit or by software:",
    },
    {
      type: "ul",
      items: [
        "Build the chart: The Lagna (ascendant), the 12 houses and the positions of the 9 grahas are calculated from your birth details.",
        "Find the relevant house: Each question maps to specific houses: the 7th for marriage, the 10th for career, the 2nd and 11th for money, the 6th for health and disputes, the 4th for property and home.",
        "Judge the house lord and the karaka: The planet that rules the house, and the natural significator (Venus for marriage, Saturn and the Sun for career, Jupiter for children and wisdom), show how strong the promise is.",
        "Check timing: The running Vimshottari mahadasha and antardasha, plus major transits of Saturn and Jupiter, show when a promise is likely to activate.",
      ],
    },
    {
      type: "p",
      text: "The AI astrologer does these steps in seconds and then explains them in everyday language. That is why the answer feels instant: the calculation is automatic, and the interpretation follows established Vedic rules rather than guesswork. If you want to understand the chart yourself first, our guide on [how to read your kundli with an AI kundli reader](/blog/ai-kundli-reader) walks through the houses and planets step by step.",
    },

    { type: "h2", text: "How to phrase your question for the best answer" },
    {
      type: "p",
      text: "The quality of the answer depends heavily on the question. Vague questions produce vague answers. A few simple habits make a big difference:",
    },
    {
      type: "ul",
      items: [
        'Be specific: "Will I change jobs in the next 12 months?" is far better than "Tell me about my career."',
        'Add a time frame: Astrology works through dashas and transits, so a window such as "this year" or "before 2028" lets the reading focus on timing.',
        "Give context: Mention whether you are studying, employed, married or running a business. The same chart reads differently at 19 and at 45.",
        "Ask one thing at a time: Combining marriage, career and health in one message spreads the answer thin. Ask, read, then follow up.",
        "Use an accurate birth time: The Lagna changes roughly every two hours, and house-based answers depend on it. If your time is uncertain, say so.",
      ],
    },

    { type: "h2", text: "Sample questions you can ask for free" },
    {
      type: "table",
      head: ["Topic", "Example question", "What the astrologer checks"],
      rows: [
        [
          "Marriage",
          "When is a good period for my marriage?",
          "7th house and lord, Venus, Navamsa (D9), current dasha",
        ],
        ["Love & compatibility", "Are my partner and I a good match?", "Gun Milan score, Manglik status, Moon signs"],
        ["Career", "Is this a good year to switch jobs?", "10th house and lord, Saturn, Sun, running antardasha"],
        ["Money", "Will my finances improve this year?", "2nd and 11th houses, Jupiter, dhana yogas"],
        [
          "Education",
          "Which field suits me: science, commerce or arts?",
          "4th, 5th and 9th houses, Mercury and Jupiter",
        ],
        ["Foreign travel", "Do I have chances of settling abroad?", "12th and 9th houses, Rahu, related dashas"],
      ],
    },
    {
      type: "p",
      text: "For relationship questions, it often helps to run the numbers first. Use [kundli matching](/matching) to see the 36-point Gun Milan score and the [Manglik check](/manglik) to see whether Mangal dosha is present, then ask the AI astrologer to explain what those results mean for your situation.",
    },

    { type: "h2", text: "Free AI astrologer vs paid human astrologer" },
    {
      type: "p",
      text: "Both have a place. A free AI astrologer is ideal for quick, specific questions and for understanding your own chart. It is available at any hour, never rushes you, gives consistent answers based on the same chart data, and does not push expensive remedies. An experienced human astrologer can add intuition, ask follow-up questions about your life story and handle complex family situations in a longer consultation.",
    },
    {
      type: "p",
      text: "A sensible approach is to start free. Generate your chart, ask your main question, and see whether the explanation resonates. If you then want a paid consultation, you will arrive with a clear understanding of your Lagna, dasha and key houses, which makes any paid session far more productive.",
    },

    { type: "h2", text: "What a free astrology answer cannot do" },
    {
      type: "p",
      text: "Astrology describes tendencies and timing, not guaranteed outcomes. Treat any reading, free or paid, as guidance for reflection rather than a final verdict. Be cautious of anyone who predicts certain disaster, demands money for urgent remedies, or tells you to make medical, legal or financial decisions purely from a chart. For those matters, a qualified doctor, lawyer or financial adviser should always come first.",
    },
    {
      type: "ul",
      items: [
        "It cannot replace professional medical, legal or financial advice.",
        "It is only as accurate as your birth time. A wrong time can shift the Lagna and every house.",
        "It cannot remove your free will. Charts show favourable and difficult periods; your choices shape the result.",
      ],
    },

    { type: "h2", text: "Ask your question in three steps" },
    {
      type: "ul",
      items: [
        "Step 1: Make your chart: Enter your birth date, time and place on the [free kundli page](/kundli). Guests get 1 free kundli per day without signing up.",
        "Step 2: Create a free account: The AI astrologer chat needs a free account so it can save your birth profile and your conversation.",
        "Step 3: Ask one clear question: Open the [AI astrologer](/ai-astrologer), type your question with a time frame, and follow up as needed.",
      ],
    },
    {
      type: "p",
      text: "The matching, Manglik and Moon sign tools give guests 3 free tries a day each, so you can explore your chart before you even sign up. And if your question is about timing right now, our guide to [Mercury retrograde 2026](/blog/mercury-retrograde-2026) explains what the current transit means for each Moon sign. For a fuller overview of what an online chart includes, read [free AI kundli online](/blog/free-ai-kundli-online).",
    },

    { type: "h2", text: "Muft mein astrologer se sawal kaise poochein" },
    {
      type: "p",
      text: 'Sabse pehle apni sahi janam tithi, samay aur sthan se kundli banaiye. Phir free account bana kar AI astrologer se ek saaf sawal poochiye, jaise "Meri shaadi ka yog kab hai?" ya "Kya is saal naukri badalna theek rahega?". Sawal mein samay seema jodiye, taaki jawab dasha aur gochar ke hisaab se mil sake. AstroJanta Hindi, Hinglish aur English teeno mein jawab deta hai.',
    },
  ],
  faqs: [
    {
      q: "Can I ask an astrologer a question for free?",
      a: "Yes. On AstroJanta you can ask the AI astrologer questions free with a free account, with no card or per-minute charges. Answers are based on your own Vedic birth chart, not just your sun sign.",
    },
    {
      q: "How do I get an instant answer to my astrology question?",
      a: "Generate your kundli with your birth date, time and place, then ask the AI astrologer one specific question with a time frame. The chart is calculated automatically, so the answer appears within seconds.",
    },
    {
      q: "Do I need my exact birth time to ask a question?",
      a: "An exact time gives the best results because the Lagna and houses depend on it. Without it, Moon sign, Nakshatra and planetary sign readings are usually still reliable, but house-based answers such as marriage or career timing are less certain.",
    },
    {
      q: "Is a free AI astrologer accurate?",
      a: "The accuracy depends on the chart calculation and your birth time. AstroJanta uses an astronomical ephemeris with the Lahiri ayanamsa and the AI explains that data using standard Vedic rules. Treat any reading as guidance rather than a guaranteed prediction.",
    },
    {
      q: "Can I ask my question in Hindi or Urdu?",
      a: "You can ask in Hindi, Hinglish or English and the AI astrologer replies in the same language. Roman Urdu questions are generally understood as well.",
    },
    {
      q: "What questions can I ask an astrologer?",
      a: "Common questions are about marriage timing, compatibility, career changes, finances, education, foreign travel and the effect of the current dasha or transits. Specific questions with a time frame get the most useful answers.",
    },
  ],
};

const kundliMilanOnlineFree: Post = {
  slug: "kundli-milan-online-free",
  title: "Kundli Milan Kaise Karein: 36 Gun Milan Guide",
  h1: "Kundli Milan Online Free – Complete Gun Milan Guide for Shaadi",
  description:
    "Kundli milan by date of birth, step by step: the 8 koot, all 36 gun, Nadi aur Bhakoot dosha, Manglik — aur score ka matlab. Free tool, plain English.",
  keyword: "kundli milan online free",
  published: "2026-11-01",
  updated: "2026-11-01",
  intro:
    "In most Indian families, the first serious step after a rishta is suggested is not the meeting over chai, it is the kundli milan. Parents in Delhi, Jaipur, Lucknow, Pune, Chennai and Kolkata still send the boy's and girl's birth details to a trusted pandit and wait anxiously for one number: how many gun matched out of 36. Today you can do the same kundli matching online free in a few seconds. This guide explains how gun milan works, what each of the eight kootas means, which score is considered good for shaadi, how Nadi dosha, Bhakoot dosha and Manglik dosha are judged, and how to read the result sensibly. When you are ready, open the [free kundli matching tool](/matching) and enter both birth details.",
  body: [
    { type: "h2", text: "What is kundli milan (gun milan)?" },
    {
      type: "p",
      text: "Kundli milan, also called gun milan, kundli matching or horoscope matching, is the Vedic method of checking compatibility between a bride and groom before marriage. The most widely used system in North and Central India is Ashtakoot milan, which compares eight aspects (koota) of the two charts. Each koota carries a fixed number of points called gun or guna, and together they add up to 36. South India often uses the Dashakoot (ten porutham) system, which looks at similar factors with different weights.",
    },
    {
      type: "p",
      text: "Ashtakoot matching is based mainly on the Moon: the Moon sign (rashi) and the birth star (nakshatra) of each person. The Moon represents the mind and emotions in Jyotish, so the matching essentially asks whether two minds, temperaments and family lives will sit comfortably together. That is why a correct date and place of birth matter most, and why an accurate birth time also helps when the Moon is near the end of a nakshatra or sign.",
    },

    { type: "h2", text: "The Ashtakoot 36 guna table" },
    {
      type: "p",
      text: "Here are the eight kootas, their maximum points and what each one checks. The higher kootas carry more weight because traditional texts consider them more important for a long, healthy marriage.",
    },
    {
      type: "table",
      head: ["Koota", "Max gun", "What it checks"],
      rows: [
        [
          "Varna",
          "1",
          "Spiritual and ego compatibility, based on the Moon sign's varna (Brahmin, Kshatriya, Vaishya, Shudra)",
        ],
        ["Vashya", "2", "Mutual attraction and who influences whom in the relationship"],
        ["Tara (Dina)", "3", "Health, wellbeing and fortune, counted from one nakshatra to the other"],
        ["Yoni", "4", "Physical and intimate compatibility, using the animal symbol of each nakshatra"],
        ["Graha Maitri", "5", "Mental wavelength and friendship between the Moon sign lords"],
        ["Gana", "6", "Temperament: Deva (divine), Manushya (human) or Rakshasa (fierce)"],
        ["Bhakoot (Rashi)", "7", "Love, family welfare and finances, from the relative position of the Moon signs"],
        ["Nadi", "8", "Health, genes and progeny, from the Adi, Madhya or Antya nadi of the nakshatra"],
        ["Total", "36", "Overall Ashtakoot compatibility score"],
      ],
    },
    {
      type: "p",
      text: "Notice that Nadi (8) and Bhakoot (7) together carry 15 of the 36 points. That is why a match can look average overall but still be flagged by a pandit: a zero in Nadi or Bhakoot is treated as a dosha, not just a low score.",
    },

    { type: "h2", text: "What gun milan score is good for marriage?" },
    {
      type: "p",
      text: "The traditional rule of thumb used across India is simple:",
    },
    {
      type: "ul",
      items: [
        "Below 18 gun: Not recommended in classical practice. Most families look for strong remedies or prefer another match.",
        "18 to 24 gun: Acceptable or average. The marriage can work well, especially if Nadi and Bhakoot are clear and the individual charts are strong.",
        "25 to 32 gun: Very good match. This is the range most families are happy with.",
        "33 to 36 gun: Excellent on paper, though very rare. Even here, astrologers still check the 7th house and Manglik status.",
      ],
    },
    {
      type: "p",
      text: "So 18 out of 36 is the minimum that is generally accepted. But the number alone is never the full story. A 28-gun match with Nadi dosha can be more worrying to a pandit than a 21-gun match with all major kootas clear. Experienced astrologers always read the score together with the doshas and with each person's own [kundli](/kundli).",
    },

    { type: "h2", text: "Nadi dosha: why 0 in Nadi worries families" },
    {
      type: "p",
      text: "Every nakshatra belongs to one of three nadis: Adi (Vata), Madhya (Pitta) or Antya (Kapha). If the bride and groom share the same nadi, Nadi koota scores 0 out of 8 and this is called Nadi dosha. Traditionally it is linked with health problems and difficulties with children, which is why it is taken very seriously in shaadi ke liye kundli matching.",
    },
    {
      type: "p",
      text: "Classical texts also give exceptions (parihar). Nadi dosha is commonly considered cancelled when both partners have the same rashi but different nakshatras, the same nakshatra but different rashis, or the same nakshatra but different charanas (padas). Many astrologers also consider the dosha reduced if the rashi lords are friends or the same planet. Remedies traditionally suggested include Nadi dosha nivaran puja and Maha Mrityunjaya jaap, but whether a remedy is needed should be decided after a full chart reading, not from the score alone.",
    },

    { type: "h2", text: "Bhakoot dosha: the 6-8, 9-5 and 2-12 positions" },
    {
      type: "p",
      text: "Bhakoot koota compares the positions of the two Moon signs. If the signs are 6th and 8th (shadashtak), 9th and 5th (navpancham) or 2nd and 12th (dwirdwadash) from each other, Bhakoot scores 0 out of 7 and Bhakoot dosha is formed. It is traditionally associated with friction, financial strain or distance in the family.",
    },
    {
      type: "p",
      text: "Like Nadi dosha, Bhakoot dosha is often considered cancelled when the lords of both Moon signs are the same planet (for example Aries and Scorpio, both ruled by Mars) or are natural friends, or when Nadi koota scores full points. This is one of the most common reasons a pandit says the match is fine even though the online score dropped by seven points.",
    },

    { type: "h2", text: "Manglik matching (Mangal dosha)" },
    {
      type: "p",
      text: "Manglik dosha, or Mangal dosha, is checked separately from the 36 gun. A person is usually called Manglik when Mars sits in the 1st, 2nd, 4th, 7th, 8th or 12th house from the Lagna (and many astrologers also check from the Moon and Venus). Mars in these houses is believed to bring heat and conflict into married life.",
    },
    {
      type: "ul",
      items: [
        "Manglik with Manglik: The most common solution. When both partners are Manglik, the dosha is generally considered to cancel out.",
        "Manglik with non-Manglik: Traditionally avoided, unless the dosha is weak or cancelled in the Manglik person's chart.",
        "Cancellation: Mars in its own sign (Aries, Scorpio) or exalted (Capricorn), aspects from Jupiter, and certain sign placements are classic cancellations. Many astrologers also consider the effect reduced after age 28.",
      ],
    },
    {
      type: "p",
      text: "Before you worry about Mangal dosha, check it properly. Use the free [Manglik dosha calculator](/manglik) for both partners, then compare the results with the gun milan score.",
    },

    { type: "h2", text: "How to do kundli milan online free on AstroJanta" },
    {
      type: "ul",
      items: [
        "Collect birth details: Date of birth, time of birth and place of birth (city and state) for both the ladka and the ladki. Birth certificates or hospital records are most reliable.",
        "Open the matching tool: Go to [kundli matching](/matching) and enter both sets of details.",
        "Read the score: You will see each koota, the total out of 36 and any Nadi or Bhakoot dosha.",
        "Check Manglik status: Run the [Manglik check](/manglik) for both, since it is not part of the 36 gun.",
        'Ask follow-up questions: Use the [AI astrologer](/blog/ask-astrologer-free) to ask in Hindi, Hinglish or English, for example "Kya Nadi dosha cancel ho raha hai?" or "Shaadi ke baad finances kaise rahenge?"',
      ],
    },
    {
      type: "p",
      text: "If you want to understand each person's chart on its own (the 7th house, Venus, Navamsa and the current dasha), read our guide on [using an AI kundli reader](/blog/ai-kundli-reader). A strong individual chart can support an average match, and a weak 7th house can strain even a high score.",
    },

    { type: "h2", text: "Birth time and IST: a small detail that matters" },
    {
      type: "p",
      text: "Indian birth times are recorded in Indian Standard Time (IST, UTC+5:30), and AstroJanta treats times entered for Indian cities as IST. For older births, note that India briefly used war-time adjustments in the 1940s and 1960s, and families abroad (NRIs in the US, UK, Canada or the Gulf) should enter the local time and city of birth, not the IST equivalent. The Moon moves about one nakshatra pada every six hours, so an error of a few hours can occasionally change Tara, Yoni, Gana or even Nadi.",
    },

    { type: "h2", text: "Kundli milan in Indian wedding tradition" },
    {
      type: "p",
      text: "Gun milan is usually the step before the roka or sagai. Once the kundlis match, families move on to choosing a shubh muhurat for the wedding. North Indian weddings typically cluster after Dev Uthani Ekadashi and Tulsi Vivah in November, through the winter season, and again around Basant Panchami and Akshaya Tritiya. Weddings are traditionally avoided during Kharmas (roughly mid-December to mid-January), Pitru Paksha and Chaturmas. Whether you are in Mumbai, Bengaluru, Hyderabad, Ahmedabad, Patna or Varanasi, the sequence is broadly the same: kundli milan, family meeting, roka, then muhurat.",
    },
    {
      type: "p",
      text: "Love marriages are increasingly common, and many couples now run kundli matching themselves to reassure their parents. In those cases, the most useful thing an online report can do is explain the doshas and their cancellations clearly so the conversation at home is based on facts rather than fear.",
    },

    { type: "h2", text: "What kundli matching cannot tell you" },
    {
      type: "p",
      text: "Gun milan is a traditional filter, not a verdict on two people. It does not measure values, communication, education, finances or how families treat each other. Many happy marriages have modest scores, and high scores do not guarantee harmony. Use the result as one input alongside meeting each other, talking openly and, if needed, consulting an experienced astrologer for the full charts.",
    },
  ],
  faqs: [
    {
      q: "How many gun should match for marriage?",
      a: "At least 18 out of 36 gun is the traditional minimum. 18 to 24 is average, 25 to 32 is very good and above 32 is excellent. Always also check Nadi dosha, Bhakoot dosha and Manglik status.",
    },
    {
      q: "Can I do kundli milan online free by date of birth?",
      a: "Yes. Enter the date, time and place of birth for both partners in AstroJanta's free kundli matching tool to get the 36 guna score, each koota and any doshas instantly.",
    },
    {
      q: "Can kundli matching be done by name only?",
      a: "Name-based matching uses the first syllable to guess the nakshatra, which is only a rough approximation. Matching by date, time and place of birth is far more accurate and is what pandits recommend.",
    },
    {
      q: "Is Nadi dosha always bad?",
      a: "Not always. Nadi dosha is traditionally considered cancelled if both have the same rashi but different nakshatras, the same nakshatra but different rashis, or the same nakshatra in different padas. A full chart reading decides how serious it is.",
    },
    {
      q: "What if only one partner is Manglik?",
      a: "Traditionally a Manglik is matched with another Manglik. If only one is Manglik, astrologers check whether the dosha is cancelled, for example by Mars in its own or exalted sign or Jupiter's aspect, before advising remedies.",
    },
    {
      q: "Is 36 gun milan a perfect match?",
      a: "36 out of 36 is extremely rare and looks perfect on paper, but astrologers still check the 7th house, Navamsa and Manglik dosha. The score is a guide, not a guarantee.",
    },
    {
      q: "Which time zone should I use for birth time?",
      a: "Use the local time of the birthplace. For births in India that is IST (UTC+5:30). If you were born abroad, enter the local time and city rather than converting to IST.",
    },
    {
      q: "Can I ask questions about my match in Hindi?",
      a: 'Yes. The AstroJanta AI astrologer understands Hindi, Hinglish and English, so you can ask questions like "Hamari kundli mein Bhakoot dosha hai kya?" and get an answer based on both charts.',
    },
  ],
};

const manglikDoshaMeaning: Post = {
  slug: "manglik-dosha-meaning",
  title: "Manglik Dosha in Kundli Matching: Kab Shaadi Safe Hai?",
  h1: "Manglik Dosha Meaning – Mangal Dosh, Kuja Dosha, Which Houses Count, Anshik vs High Manglik, Cancellation Rules, the Age 28 Belief and Upay",
  description:
    "Manglik ladka, non-manglik ladki — kab shaadi theek hai? Mangal dosh ke 6 ghar, parihar (cancellation) rules, age 28 myth, upay and a free Manglik check.",
  keyword: "manglik dosha meaning",
  author: "founder",
  published: "2026-11-02",
  updated: "2026-11-11",
  intro:
    '"Ladki Manglik hai" is probably the most anxious sentence in an Indian rishta conversation. In many families, the moment a pandit says mangal dosh (मंगल दोष), the mood in the room changes and a good match is quietly dropped. Yet Manglik dosha — मांगलिक दोष, Kuja dosha in the South, Bhaum dosha in older books — is one of the most misunderstood ideas in Vedic astrology. Mars falls in one of the so-called Manglik houses in roughly half of all charts, traditions disagree about which houses even count, and the same tradition lists a long set of conditions under which the dosha is considered weak or cancelled. This guide explains what Manglik dosha actually means, how it is calculated from the Lagna, the Moon and Venus, how high Manglik differs from anshik Manglik, which cancellation rules are commonly used, whether the dosha really ends at 28, and which remedies are traditionally followed — in calm language, with no fear and no guarantees. If you only want to know "main Manglik hoon ya nahi", start with the free [Manglik dosha calculator](/manglik).',
  body: [
    {
      type: "p",
      text: "Written in plain English, with the Hinglish words families actually use during matching: mangal dosh, manglik, anshik, parihar, nivaran, upay, rishta.",
    },

    { type: "h2", text: "Manglik dosha kya hai? (What Mangal dosh means)" },
    {
      type: "p",
      text: "Manglik dosha is a condition in the birth chart created by the position of Mars — Mangal. In Jyotish, Mars is the karaka of energy, courage, ambition, anger, property, siblings and physical drive; it is the commander of the planetary cabinet, not a gentle planet. When Mars occupies certain houses connected with self, family, home, partnership and shared life, traditional astrologers read its heat as intensity in married life: impatience, arguments, strong egos or delays. A person whose chart has that placement is called Manglik, or simply mangli in everyday speech.",
    },
    {
      type: "p",
      text: "One structural point explains a lot of the confusion around this topic, and it is rarely spelled out. Nadi, Bhakoot and Gana doshas describe a pair — the same girl can have Nadi dosha with one boy and a clean score with the next, because those are comparisons. Manglik dosha is different: it describes a single chart. You are Manglik or you are not, independently of whom you marry. Matching then compares the two statuses, which is why the question in a rishta is never just \"is she Manglik\" but \"are both Manglik, and how strongly\".",
    },
    {
      type: "p",
      text: "Mangal dosh is also checked separately from the 36 gun of Ashtakoot matching. It is not one of the eight kootas and it does not change the gun total, which is exactly why a couple can score 28 of 36 and still be told that the Manglik position needs discussion. Our guide to [kundli milan online free](/blog/kundli-milan-online-free) covers the gun milan side; this article deals only with Mars.",
    },
    {
      type: "p",
      text: "A note on sources, since this matters for how much weight to give any single rule. The Ashtakoot kootas come from a well-documented classical framework, but most of what is taught about Manglik dosha today — the house list, the grading into high and partial, the cancellation lists — reaches us through regional practice and modern matching manuals rather than one agreed text. That is why reputable astrologers and reputable websites genuinely differ on the details. Everything below is presented as traditional practice in common use, not as a verdict about anyone's marriage.",
    },

    { type: "h2", text: "Manglik meaning in Hindi (मांगलिक दोष का मतलब)" },
    {
      type: "p",
      text: 'The word dosha (दोष) is usually translated as "defect" or "blemish", and that translation causes real harm. In this context it refers to a configuration in a chart that the tradition flags for attention — not a flaw in a person. Calling someone "mangli" as though it were a character certificate is a misuse of the term. Here are the words you will hear during a rishta conversation and what each one means:',
    },
    {
      type: "ul",
      items: [
        "मंगल (Mangal) — the planet Mars. Also Bhaum, Kuja, Angaraka in older and regional usage.",
        "मांगलिक / मंगली (manglik / mangli) — a person whose chart has Mars in one of the six houses listed below.",
        "मंगल दोष / मांगलिक दोष (mangal dosh) — the placement itself. Kuja dosha is the same idea in Telugu, Tamil and Kannada-speaking regions; Chovva dosham in Kerala.",
        "अंशिक (anshik) — partial, i.e. a mild form of the dosha.",
        "परिहार / भंग (parihar / bhang) — cancellation: conditions under which the dosha is considered not to apply.",
        "निवारण / उपाय (nivaran / upay) — remedy: a traditional practice followed when the dosha is considered strong.",
        "कुंभ विवाह (Kumbh vivah) — the symbolic pot or tree marriage performed in some communities before the real wedding.",
      ],
    },
    {
      type: "p",
      text: "The body of this guide is in English, but the concepts map one to one onto the Hindi terms above, so you can take any section straight into a family conversation.",
    },

    { type: "h2", text: "Which houses make a person Manglik? (1, 2, 4, 7, 8, 12)" },
    {
      type: "p",
      text: "Mars is considered to cause Manglik dosha when it sits in the 1st, 2nd, 4th, 7th, 8th or 12th house. Each of these houses touches some part of married or domestic life, which is the logic behind the list:",
    },
    {
      type: "table",
      head: ["House", "Area of life", "Traditional concern with Mars here"],
      rows: [
        ["1st (Lagna)", "Self, temperament, body", "Short temper, dominating nature, impatience with the partner"],
        ["2nd", "Family, speech, accumulated wealth", "Harsh speech, friction with in-laws, money disputes"],
        ["4th", "Home, mother, peace of mind", "Lack of domestic peace, frequent shifting, property disputes"],
        ["7th", "Spouse and marriage", "Direct strain on the partnership, ego clashes, delays in marriage"],
        ["8th", "Longevity, sudden events, in-laws", "Sudden ups and downs, anxiety about health, hidden tensions"],
        ["12th", "Bed, expenses, distant places", "Expenses, time spent apart, distance in intimacy"],
      ],
    },
    {
      type: "p",
      text: "Notice what the six houses have in common: four of them (1, 4, 7, 8) are the ones that Mars also aspects in Jyotish, since Mars casts a full aspect on the 4th, 7th and 8th from itself. From the 1st house Mars aspects the 4th, 7th and 8th; from the 4th it reaches the 7th; from the 8th it reaches the 2nd and the 3rd. The traditional list is essentially a map of the positions from which Mars touches the marriage and home axis of the chart. The third column above is the classical concern, not a prediction — a house is a theme, not an outcome.",
    },

    { type: "h3", text: "Lagna, Chandra aur Shukra: the three reference points" },
    {
      type: "p",
      text: "Houses are counted from a reference point, and this is where most online disagreements begin. The fuller method checks Mars from three of them: the Lagna (ascendant), the Moon (Chandra) and Venus (Shukra). Mars counted from the Lagna carries the most weight, from the Moon a little less, and from Venus the least — Venus being the natural significator of marriage and pleasure, so Mars near it is read as friction in exactly that department.",
    },
    {
      type: "p",
      text: "Counting is simple arithmetic once you have a chart. Take the sign of the reference point as house 1 and count forward, including it. An example: suppose Mars is in Leo, the Lagna is Aries, the Moon is in Aquarius and Venus is in Capricorn. From Aries, Leo is the 5th — not a Manglik house, so no dosha from the Lagna. From Aquarius, Leo is the 7th — a Manglik house, so the dosha is present from the Moon. From Capricorn, Leo is the 8th — present from Venus too. Such a chart would usually be described as Manglik from the Moon and Venus but not from the Lagna, which most astrologers would call a mild or anshik case.",
    },
    {
      type: "p",
      text: "To do this for your own chart you need Mars's sign plus your Lagna, Moon and Venus signs. A free [kundli](/kundli) shows all four with exact degrees, and the [Moon sign and Nakshatra finder](/moon-sign) is the quicker route if you only need the Rashi.",
    },

    { type: "h3", text: "Jahan traditions alag hain: the 2nd house and other differences" },
    {
      type: "p",
      text: "Manglik dosha is the check where you should expect two trustworthy sources to tell you different things about the same chart. These are the real points of difference, so you know what to ask:",
    },
    {
      type: "table",
      head: ["Point of difference", "Commonly used version", "Also widely used"],
      rows: [
        [
          "Does the 2nd house count?",
          "Yes — the six-house list 1, 2, 4, 7, 8, 12 is the most common one in North Indian practice",
          "Some astrologers use only 1, 4, 7, 8, 12, treating the 2nd as a weaker or separate kutumba concern; some South Indian practice gives the 2nd extra weight",
        ],
        [
          "Which reference points?",
          "Lagna and Moon, with the Lagna weighted more",
          "Kuja dosha practice commonly adds Venus; a minority of astrologers judge from the Lagna alone",
        ],
        [
          "Does a strong Mars still count?",
          "The placement is noted, then the cancellation rules are applied to judge its strength",
          "Some treat Mars in its own or exalted sign as simply not Manglik at all",
        ],
        [
          "Is the 12th house read from the Moon?",
          "Yes, the same six houses are used from every reference point",
          "Some sources drop the 12th when counting from the Moon, since the Moon's 12th has a different classical meaning",
        ],
      ],
    },
    {
      type: "p",
      text: 'This is why two calculators can label the same person differently, and neither is being dishonest. If an astrologer tells you "Manglik hai", the useful follow-up questions are: from which reference point, which house, and does the 2nd house rule apply in your method? A clear answer tells you a great deal about how carefully the reading was done.',
    },

    { type: "h2", text: "High Manglik vs anshik (partial) Manglik" },
    {
      type: "p",
      text: "Not every Manglik is in the same position, and collapsing the distinction is where most of the unnecessary fear comes from. Astrologers usually grade the placement roughly like this:",
    },
    {
      type: "ul",
      items: [
        "Anshik (partial or low) Manglik: Mars is in a Manglik house from only the Moon or only Venus; or it is in a Manglik house from the Lagna but in a friendly or strong sign; or one or more cancellation factors apply. Many astrologers treat anshik Manglik as a minor note and do not insist on a Manglik partner.",
        "Regular Manglik: Mars is in a Manglik house from the Lagna, without a major cancellation.",
        "High (purna or double) Manglik: Mars is in a Manglik house from the Lagna and also from the Moon or Venus — especially in the 7th or 8th — in an enemy sign or debilitated in Cancer, and without any benefic aspect.",
      ],
    },
    {
      type: "p",
      text: 'Some websites print a percentage, as in "Manglik dosha 37% present". There is no classical basis for such a number and no agreed scale behind it; different tools compute it differently. Treat any percentage as a presentation choice, not as a measurement. The questions that actually matter are: from which reference points is Mars in a Manglik house, which house, in which sign, and is anything cancelling it?',
    },
    {
      type: "p",
      text: 'So when a relative says "woh Manglik hai", the right response is not panic but a question: how strong, and from where? A low Manglik and a high Manglik are different situations, and treating them as identical is how good rishtas get rejected for no reason.',
    },

    { type: "h2", text: "Manglik dosh ke effects: what the tradition actually says" },
    {
      type: "p",
      text: "Traditional texts associate a strong, uncancelled mangal dosh with delays in marriage, frequent arguments, two strong egos colliding, impulsive decisions and, in classical language, strain in the married household. Modern astrologers usually read this in practical terms: Mars brings intensity and a low tolerance for being managed. Two people with similar intensity often understand each other well; one very fiery partner with one very gentle partner can struggle unless both are aware of the pattern and willing to work with it.",
    },
    {
      type: "p",
      text: "Keep the other half of the picture in view. Mars also gives courage, discipline, physical stamina, protectiveness and drive, and classical astrology credits it with success in the army and police, engineering, surgery, sport, real estate and independent business. Plenty of Manglik people are loyal, hardworking, generous partners. The placement describes a temperament to be understood, not a sentence to be served.",
    },
    {
      type: "p",
      text: "And one thing should be said plainly, because older books are often quoted selectively to frighten families: no responsible astrologer predicts death, illness or the failure of a marriage from this single factor. Astrology is a lens for reflection, not a medical, legal or financial opinion, and a chart cannot tell you how two adults will choose to treat each other. If someone uses Manglik dosha to frighten you, that is a statement about them, not about the chart.",
    },

    { type: "h2", text: "Manglik dosha cancellation rules (mangal dosh parihar)" },
    {
      type: "p",
      text: "Traditional practice lists many conditions under which mangal dosh is considered cancelled (bhang) or greatly reduced. These are rules of thumb used by astrologers, and they vary between schools; none of them is a guarantee of anything, and none should be used to pressure a family into a decision. The most widely used are:",
    },
    {
      type: "ul",
      items: [
        "Manglik marries Manglik: if both partners are Manglik of broadly similar strength, the dosha is traditionally considered to cancel out. This is by far the most common resolution in Indian matchmaking.",
        "Mars in its own or exaltation sign: Mars in Aries or Scorpio (own signs) or Capricorn (exaltation) is considered well-behaved, so the dosha is treated as largely cancelled.",
        "Jupiter's influence: Mars conjunct or aspected by Jupiter (Guru), or Jupiter placed in the 1st or 7th house, is one of the classic cancellations.",
        "Benefic aspects: Mars conjunct or aspected by benefics such as Venus or a strong Moon is said to soften its harshness.",
        "Sign-specific exceptions: Mars in the 2nd in Gemini or Virgo, in the 4th in Aries or Scorpio, in the 7th in Capricorn or Cancer, in the 8th in Sagittarius or Pisces, and in the 12th in Taurus or Libra are commonly listed as non-dosha placements.",
        "Lagna-based exceptions: for Aries, Cancer, Leo and Scorpio ascendants, Mars owns a good house or acts as a yogakaraka, and many astrologers consider the dosha mild or absent for them.",
        "The partner's chart balances it: Saturn, Rahu or Ketu occupying the same Manglik houses in the other person's chart is often said to balance the placement, a condition sometimes called saam dosh.",
      ],
    },
    {
      type: "p",
      text: "Different astrologers accept different items from this list, and a few accept none of them, holding that the placement is simply the placement and should be weighed against the whole chart rather than cancelled. What almost everyone agrees on is the direction of travel: a cancellation does not erase Mars from the chart, it changes how much weight the placement is given.",
    },

    { type: "h3", text: "Why so many Manglik results turn out to be weak" },
    {
      type: "p",
      text: "The six Manglik houses are half of the twelve, so from any single reference point Mars has roughly a one-in-two chance of landing in one. Check from the Lagna, the Moon and Venus together and the proportion of people who are Manglik from at least one of them rises further. Being Manglik is therefore an ordinary result, not a rare misfortune — and once the cancellation rules are applied, a large share of those results are weak or cancelled. That combination is the honest reason not to treat the label as decisive: it is common, graded and frequently set aside, which is why reading the whole chart matters more than the word itself. Astrojanta's [kundli matching tool](/matching) is best read alongside a Manglik check for both partners rather than either one alone.",
    },

    { type: "h2", text: "Manglik aur shaadi: how it fits into kundli matching" },
    {
      type: "p",
      text: "Because Manglik dosha is not one of the eight kootas, it is checked as a separate step: run both charts, note each person's status and strength, then look at the two together. A full 36-gun report tells you nothing about Mars, and a Manglik check tells you nothing about Nadi, Bhakoot or Gana — you need both.",
    },
    {
      type: "p",
      text: "If a match raises a Manglik question, this is what an experienced astrologer will usually look at before giving an opinion, and much of it you can see yourself in a free [kundli](/kundli):",
    },
    {
      type: "ul",
      items: [
        "Both Manglik statuses side by side — from which reference points, which houses, which signs, and what strength.",
        "The cancellation factors in each chart, especially Mars's dignity and any Jupiter contact.",
        "The 7th house and its lord in each chart, the primary indicators of marriage in an individual kundli, plus Venus for both and traditionally Jupiter for the bride.",
        "The Navamsa (D9) chart, which many astrologers consider essential for marriage; Astrojanta's matching tool does not compare D9 charts, so this needs a fuller reading.",
        "The overall gun score and the heavy kootas — see [Nadi Dosha](/blog/nadi-dosha), [Bhakoot Dosha](/blog/bhakoot-dosha) and [Gana Dosha](/blog/gana-dosha) for the three that cause the most family anxiety.",
        "The running Vimshottari dasha of both people around the wedding; our [Mahadasha guide](/blog/vimshottari-mahadasha) explains how to read it. Timing often says more about early married life than any single dosha.",
      ],
    },

    { type: "h3", text: "Manglik to Manglik matching" },
    {
      type: "p",
      text: 'Matching one Manglik with another is the oldest and most widely accepted resolution, and it is why matrimonial ads carry lines like "Manglik, seeking Manglik". The reasoning is symmetry: two people with the same Mars-driven temperament are said to meet each other at the same pitch, so the placement stops being a mismatch. Most astrologers want the two doshas to be of broadly similar strength — pairing a high Manglik with an anshik one is a weaker form of the rule than pairing two strong ones.',
    },
    {
      type: "p",
      text: "Two cautions on this, both worth saying. First, the rule is a traditional convention, not a guarantee of harmony; two Manglik partners can still have a difficult marriage and two non-Manglik partners can too, because compatibility runs on communication, respect and shared values. Second, the convention is sometimes used to shrink a family's options drastically, as though a non-Manglik partner were forbidden. It is not. Many Manglik–non-Manglik marriages work perfectly well, particularly where the dosha is weak or cancelled, and the stronger practice is to read both charts properly rather than to filter rishtas by a single word.",
    },

    { type: "h2", text: "Does Manglik dosha end at 28? (manglik age 28)" },
    {
      type: "p",
      text: '"28 saal ke baad mangal dosh khatam ho jata hai" is one of the most repeated lines on this subject. The belief draws on the idea of planetary maturity (graha paripakva) in Jyotish, in which each planet is said to come into its own at a particular age — around 28 for Mars. The reasoning is that a matured Mars expresses itself with more control, so its harsher effects settle down.',
    },
    {
      type: "p",
      text: "Here is the honest version. The chart does not change: Mars stays in the same house and sign for life, and no classical rule says a dosha expires on a birthday. What many astrologers do accept is that the same temperament is handled better by a person of 30 than by one of 21 — more self-knowledge, more patience, more willingness to apologise. Some families are also simply more relaxed about matching after that age. So treat 28 as a softening factor to weigh alongside the cancellation rules, not as an automatic cancellation and certainly not as a reason to delay or hurry a marriage. You will also hear 18, 21 and 36 quoted for the same belief, which tells you how firm the number really is.",
    },

    { type: "h2", text: "Astrojanta ka Manglik calculator kya check karta hai (honestly)" },
    {
      type: "p",
      text: "Families make real decisions with these results, so here is exactly what our free [Manglik dosha calculator](/manglik) does and does not do:",
    },
    {
      type: "ul",
      items: [
        "It calculates your sidereal chart from date, time and place of birth using an astronomical ephemeris with the Lahiri (Chitrapaksha) ayanamsa, then finds Mars's sign and house.",
        "It treats Mars in houses 1, 2, 4, 7, 8 or 12 as Manglik — including the 2nd house — and checks that from two reference points: the Lagna and the Moon.",
        "It does not check from Venus. A chart that is Manglik only from Venus will show as not Manglik in our tool, so if your astrologer uses the Venus reference point, expect a difference.",
        "It shows the result as three plain rows — from Lagna (yes, no, or \"needs birth time\" when no time is available), from Moon, and Mars's sign and house — plus a single badge reading No, Yes or Cancelled.",
        'It lists the cancellation factors it can detect: Mars in its own sign, Mars exalted in Capricorn, Mars conjunct Jupiter, or Jupiter aspecting Mars. When the dosha is present and at least one of those applies, the badge reads "Cancelled".',
        "It does not grade high versus anshik Manglik, does not print a percentage, and does not apply the sign-specific, Lagna-specific or age-28 rules. Those need a human reading of the full chart.",
        "It does not compare two charts. Manglik-to-Manglik matching means running the tool once for each person; the 36-gun comparison lives on the separate [kundli matching page](/matching).",
      ],
    },
    {
      type: "p",
      text: "This is the same conservative approach we take in the [Nadi Dosha guide](/blog/nadi-dosha) and [Bhakoot Dosha guide](/blog/bhakoot-dosha): show the traditional position plainly, name the exceptions we can detect, and leave the judgement calls to a full reading, because schools apply them differently. Our [methodology page](/about-methodology) describes how the underlying calculations are done. If you want a specific result explained — which house Mars sits in, what the cancellation note means, how it reads alongside your 7th house — you can ask the [AI astrologer](/ai-astrologer) in Hindi, Hinglish or English. Treat it as an explanation, not a verdict.",
    },

    { type: "h2", text: "Manglik dosh nivaran aur upay: traditional remedies" },
    {
      type: "p",
      text: "Remedies (upay) are traditionally suggested only when the placement is strong and not cancelled. They are cultural and devotional practices meant to encourage patience and discipline, presented here for information: they carry no guaranteed outcome, and nothing on this list requires spending significant money. The common ones are:",
    },
    {
      type: "ul",
      items: [
        "Kumbh vivah: a symbolic marriage of the Manglik person to a clay pot (kumbh), a peepal or banana tree, or an idol of Vishnu before the real wedding. Practised in some communities and unknown in others; it is a custom, not a requirement.",
        "Mangal Bhat Puja at Ujjain: Mangalnath temple in Ujjain is traditionally regarded as the birthplace of Mars, and the Bhat Puja performed there is among the best-known Manglik observances. Many families combine it with a visit to Mahakaleshwar.",
        "Hanuman worship: reciting the Hanuman Chalisa, visiting a Hanuman temple on Tuesdays, offering sindoor and jasmine oil — Hanuman being traditionally associated with mastery over Mars.",
        'Mangal mantra: chanting the beej mantra "Om Kraam Kreem Kraum Sah Bhaumaya Namah", commonly 108 times on a Tuesday, or the Mangal Gayatri.',
        "Mangalvar vrat: fasting or eating simple food on Tuesdays, as an exercise in self-discipline rather than a transaction.",
        "Daan: donating masoor dal (red lentils), jaggery, red cloth or copper on Tuesdays, or helping siblings, soldiers and people in genuine need.",
        "Red coral (moonga) is sometimes advised, but strengthening Mars is not appropriate for every chart, so no gemstone should be worn on the strength of a label alone.",
      ],
    },
    {
      type: "p",
      text: "The most useful remedy, in our view, is not on any classical list: naming the pattern honestly and managing it. Mars shows up as a short fuse, an instinct to win arguments and difficulty in apologising. Couples who talk about how each of them behaves in a fight, and what each family expects day to day, are doing the practical version of every upay above. Be careful of anyone who demands large sums, frightens you about a partner's life or wellbeing, or insists that only their puja can save the marriage — that is a sales technique, not Jyotish.",
    },

    { type: "h2", text: "Myths vs facts about Manglik dosha" },
    {
      type: "table",
      head: ["Myth", "Fact"],
      rows: [
        [
          "A Manglik should never marry a non-Manglik",
          "Many such marriages work well, especially where the dosha is weak or cancelled; the convention is a preference, not a prohibition",
        ],
        [
          "Manglik dosha harms the spouse's life",
          "Classical phrasing is routinely over-dramatised; no responsible astrologer predicts harm from one placement, and astrology is not medical advice",
        ],
        [
          "Being Manglik is rare and unlucky",
          "Six of the twelve houses are on the list, so Mars lands in one in roughly half of all charts from any single reference point",
        ],
        [
          "The dosha ends exactly at 28",
          "Effects are said to soften with maturity; the placement itself remains for life, and 18, 21 and 36 are quoted just as confidently",
        ],
        [
          "Only an expensive puja can fix it",
          "Hanuman worship, a mantra, a Tuesday vrat and sincere daan are the traditional options, and they cost nothing",
        ],
        [
          "Every calculator should give the same answer",
          "Traditions differ on the 2nd house and on whether Venus is used, so results legitimately vary between astrologers and websites",
        ],
        [
          "Mars in the 1st house always means anger issues",
          "The sign, the aspects and the rest of the chart change how Mars behaves; the house alone decides nothing",
        ],
      ],
    },

    { type: "h2", text: "Manglik hai ya nahi: how to check, step by step" },
    {
      type: "ul",
      items: [
        "Get accurate birth details: date, exact time and place of birth. In India use the IST time recorded on the birth certificate; if you were born abroad, use the local clock time of that place.",
        "Run the free check: the [Manglik dosha calculator](/manglik) shows Mars's house from the Lagna and the Moon, and the cancellation factors it finds.",
        "Read it as a placement, not a verdict: note the house, the sign and which reference points flag it, so you can discuss specifics rather than a label.",
        "Check the partner too: if both are Manglik of similar strength, the dosha is traditionally considered cancelled. Then compare overall compatibility with [kundli matching](/matching).",
        "Look at the wider chart: our guide to [reading your kundli with an AI kundli reader](/blog/ai-kundli-reader) explains the 7th house, Venus and the dasha, which matter at least as much for marriage as Mars does.",
        'Ask follow-up questions: the AI astrologer answers in Hindi, Hinglish or English, so "Mera mangal dosh anshik hai ya purna?" or "Kya mera Manglik dosh cancel ho raha hai?" are perfectly good questions to start with.',
      ],
    },

    { type: "h2", text: "Manglik dosha in Indian families today" },
    {
      type: "p",
      text: 'From matrimonial listings in Delhi and Jaipur that specify "Manglik preferred" to families in Hyderabad and Chennai checking Kuja dosha before a horoscope is even exchanged, Mars still shapes a great many marriage decisions across India and in NRI families. At the same time, more couples are asking for an explanation instead of a yes-or-no verdict, which is the healthier way to use astrology: as a lens on temperament and timing, not as a reason to fear a person.',
    },

    { type: "h2", text: "Bottom line" },
    {
      type: "p",
      text: "Manglik dosha means Mars sits in the 1st, 2nd, 4th, 7th, 8th or 12th house, counted from the Lagna and often from the Moon and Venus as well. It describes one chart rather than a pair, it is not part of the 36 gun, and it is common — six of twelve houses qualify. Traditions disagree about the 2nd house and about Venus; the dosha is graded from anshik to high; a long list of traditional cancellations applies, the most common being a Manglik partner; and the age 28 belief is a softening idea, not a rule. None of it is a verdict on a marriage. Find out where Mars actually sits with the free [Manglik check](/manglik), read it together with [kundli matching](/matching) for both charts, and make the decision as a family with the couple's own wishes at the centre.",
    },
  ],
  faqs: [
    {
      q: "What does Manglik dosha mean?",
      a: "Manglik dosha, or mangal dosh, means Mars is placed in the 1st, 2nd, 4th, 7th, 8th or 12th house of the birth chart, counted from the Lagna and often from the Moon and Venus as well. It is traditionally linked with intensity and friction in married life. It describes one person's chart, not a couple.",
    },
    {
      q: "Manglik ka matlab kya hota hai? (manglik meaning in Hindi)",
      a: "मांगलिक (manglik), also said as मंगली (mangli), describes a person whose kundli has मंगल (Mars) in the 1st, 2nd, 4th, 7th, 8th or 12th bhava. दोष here means a configuration the tradition asks you to look at — not a defect in the person. The remedy words you will hear are निवारण and उपाय, and परिहार means the conditions under which the dosha is considered cancelled.",
    },
    {
      q: "How do I know if I am Manglik or not?",
      a: "Enter your date, exact time and place of birth in Astrojanta's free Manglik dosha calculator. It shows where Mars sits from your Lagna and from your Moon, Mars's sign and house, and any cancellation factors it detects, such as Mars in its own sign or Jupiter's aspect.",
    },
    {
      q: "What is Kuja dosha, and is it the same as Manglik dosha?",
      a: "Yes. Kuja is another name for Mars, so Kuja dosha in Telugu, Tamil and Kannada-speaking regions, and Chovva dosham in Kerala, describe the same placement that North India calls mangal dosh. South Indian practice more often includes Venus as a reference point alongside the Lagna and Moon.",
    },
    {
      q: "Can a Manglik marry a non-Manglik?",
      a: "Yes, and many do. Traditional practice prefers a Manglik partner, but the dosha is often weak (anshik) or cancelled — for example when Mars is in its own or exalted sign or has Jupiter's aspect. A reading of both full charts should decide, not the label by itself.",
    },
    {
      q: "What is anshik Manglik?",
      a: "Anshik or partial Manglik means a mild form of the dosha: Mars is in a Manglik house from only the Moon or only Venus, or it is in a Manglik house but strong or aspected by a benefic. Most astrologers treat anshik Manglik as a minor note rather than an obstacle to marriage.",
    },
    {
      q: "Does Manglik dosha end after 28?",
      a: "Many astrologers believe its effects soften after about 28, the age at which Mars is said to mature, and families are often more relaxed about matching after that. The placement itself never changes, so 28 is a softening factor rather than an automatic end — and you will hear 18, 21 and 36 quoted too.",
    },
    {
      q: "Is Manglik dosha cancelled if both partners are Manglik?",
      a: "That is the most widely used rule: when both partners are Manglik of broadly similar strength, the dosha is traditionally considered cancelled. It is a convention rather than a guarantee, and pairing a high Manglik with an anshik one is a weaker form of the rule than pairing two strong ones.",
    },
    {
      q: "Why do two websites say different things about my Manglik status?",
      a: "Because traditions genuinely differ. Some lists include the 2nd house and some do not, some check only from the Lagna while others add the Moon and Venus, and some treat a strong Mars as not Manglik at all. Ask which houses and which reference points a given reading uses before comparing results.",
    },
    {
      q: "What is the best remedy for Manglik dosha (mangal dosh nivaran)?",
      a: "Commonly followed upay are Kumbh vivah, Mangal Bhat Puja at Mangalnath temple in Ujjain, the Hanuman Chalisa and Tuesday worship, the Mangal beej mantra, a Tuesday vrat and daan of masoor dal or jaggery. They are traditional practices with no guaranteed outcome, and they are only considered necessary when the dosha is strong and uncancelled.",
    },
    {
      q: "Is being Manglik bad luck?",
      a: "No. Mars falls in one of the six houses in roughly half of all charts, so it is an ordinary result, and Mars also gives courage, stamina and drive. It describes a temperament worth understanding, not bad luck, and a great many Manglik people have happy marriages.",
    },
  ],
};

const varnaKootaMeaning: Post = {
  slug: "varna-koota-meaning",
  title: "Varna Koota Meaning in Gun Milan: 1 Point, Rashi-wise Varna Chart & Scoring",
  h1: "Varna Koota Meaning – The 1-Point Koota in Ashtakoot Gun Milan Explained",
  description:
    "What is Varna koota in kundli milan? Rashi-wise varna chart (Brahmin, Kshatriya, Vaishya, Shudra), how the 1 gun is scored, what a 0 means, plus all 8 kootas and lagna kundli milan vs jataka matching.",
  keyword: "varna koota meaning",
  published: "2026-11-03",
  updated: "2026-11-03",
  intro:
    'When a pandit or an online kundli milan report gives you a score out of 36, the very first row of the table is usually Varna. It carries just 1 gun, so many families skip past it, but it often raises questions: "Varna 0 aaya hai, kya yeh problem hai?" or "Varna ka caste se kya lena-dena hai?" This guide explains the Varna koota meaning in simple language, the rashi-wise varna chart, exactly how the point is scored, how much weight it really carries, and where it sits among the eight kootas of Ashtakoot gun milan. To see your own Varna score, run a free [kundli matching](/matching) for both partners.',
  body: [
    { type: "h2", text: "What is Varna koota?" },
    {
      type: "p",
      text: "Varna koota (वर्ण कूट) is the first of the eight kootas in Ashtakoot milan, the gun milan system used across North and Central India. It compares the varna of the bride's and groom's Moon signs (rashi) and is worth a maximum of 1 gun out of 36. Traditionally it is read as a check of spiritual temperament, ego and outlook on work and duty: whether the two people approach life with a similar inner nature, and whether the household will have a natural balance of leadership.",
    },
    {
      type: "p",
      text: "It is important to be clear about one thing: in kundli milan, varna is decided by the Moon sign in the birth chart, not by a person's caste or family background. Two people from the same community can have different varnas in their charts, and two people from very different backgrounds can have the same one. Varna koota is a symbolic grouping of the twelve rashis, not a social rule.",
    },

    { type: "h2", text: "Rashi-wise varna chart" },
    {
      type: "p",
      text: "The twelve rashis are grouped into four varnas, three rashis each. The grouping follows the element (tattva) of the sign: water signs are Brahmin, fire signs Kshatriya, earth signs Vaishya and air signs Shudra.",
    },
    {
      type: "table",
      head: ["Varna", "Rashis (Moon signs)", "Element", "Traditional nature"],
      rows: [
        [
          "Brahmin (highest rank)",
          "Karka (Cancer), Vrishchika (Scorpio), Meena (Pisces)",
          "Water (jal)",
          "Learning, spirituality, guidance",
        ],
        [
          "Kshatriya",
          "Mesha (Aries), Simha (Leo), Dhanu (Sagittarius)",
          "Fire (agni)",
          "Courage, leadership, protection",
        ],
        [
          "Vaishya",
          "Vrishabha (Taurus), Kanya (Virgo), Makara (Capricorn)",
          "Earth (prithvi)",
          "Trade, practicality, building wealth",
        ],
        ["Shudra", "Mithuna (Gemini), Tula (Libra), Kumbha (Aquarius)", "Air (vayu)", "Service, skill, cooperation"],
      ],
    },
    {
      type: "p",
      text: "Remember that this uses your Vedic (sidereal) Moon sign, which is often different from the sun sign used in Western horoscopes. If you are not sure of your rashi, find it in seconds with the free [Moon sign and Nakshatra finder](/moon-sign) or by making a free [Janam Kundli](/kundli).",
    },

    { type: "h2", text: "How Varna koota is scored" },
    {
      type: "p",
      text: "The rule is simple and is the same in most North Indian panchangs and software. The varnas are ranked in the order Brahmin, Kshatriya, Vaishya, Shudra, and the groom's varna is compared with the bride's:",
    },
    {
      type: "ul",
      items: [
        "1 gun: the groom's varna is the same as, or higher than, the bride's varna.",
        "0 gun: the bride's varna is higher than the groom's varna.",
      ],
    },
    {
      type: "table",
      head: ["Groom's Moon sign", "Bride's Moon sign", "Varna score"],
      rows: [
        ["Simha (Kshatriya)", "Dhanu (Kshatriya)", "1 – same varna"],
        ["Karka (Brahmin)", "Kanya (Vaishya)", "1 – groom's varna higher"],
        ["Makara (Vaishya)", "Mesha (Kshatriya)", "0 – bride's varna higher"],
        ["Tula (Shudra)", "Meena (Brahmin)", "0 – bride's varna higher"],
      ],
    },
    {
      type: "p",
      text: "The logic comes from the traditional household model in classical texts, where the husband was expected to lead the family's duties. Many modern astrologers read it more neutrally: a score of 1 suggests the two outlooks sit comfortably together, while 0 suggests one partner may feel more driven by ideals or ego than the other, which simply needs mutual respect.",
    },

    { type: "h2", text: "Is Varna 0 a problem? How much does it matter?" },
    {
      type: "p",
      text: 'Varna is the lightest koota in the 36-gun system. Losing it reduces the total by just 1 point, and there is no Varna "dosha" that astrologers treat with the seriousness of Nadi dosha (8 points) or Bhakoot dosha (7 points). A match with Varna 0 but strong Graha Maitri, Gana, Bhakoot and Nadi is generally considered far better than a match with Varna 1 and Nadi dosha.',
    },
    {
      type: "p",
      text: 'So if your report shows "Varna: 0/1", there is no need to worry on that basis alone. Look at the total score, the higher-value kootas, and each partner\'s individual chart: the 7th house, Venus, the running dasha and [Manglik dosha](/manglik). Our [Manglik dosha meaning](/blog/manglik-dosha-meaning) guide explains why that check is done separately from the 36 gun.',
    },

    { type: "h2", text: "All 8 kootas of Ashtakoot gun milan at a glance" },
    {
      type: "p",
      text: "Varna is one of eight kootas. Together they add up to 36 gun, and the higher the number, the more weight the koota carries:",
    },
    {
      type: "table",
      head: ["Koota", "Max gun", "What it checks", "Based on"],
      rows: [
        ["Varna", "1", "Spiritual temperament and ego", "Moon sign"],
        ["Vashya", "2", "Mutual attraction and influence", "Moon sign"],
        ["Tara", "3", "Health, wellbeing and fortune (birth star compatibility)", "Nakshatra"],
        ["Yoni", "4", "Physical and intimate compatibility", "Nakshatra"],
        ["Graha Maitri", "5", "Mental compatibility and friendship of rashi lords", "Moon sign"],
        ["Gana", "6", "Temperament: Deva, Manushya or Rakshasa", "Nakshatra"],
        ["Bhakoot", "7", "Family welfare, finances and emotional bond", "Moon sign"],
        ["Nadi", "8", "Health and progeny", "Nakshatra"],
      ],
    },
    {
      type: "p",
      text: "Traditionally, 18 out of 36 is the minimum generally accepted for marriage, 18 to 24 is average, 25 to 32 is very good and above 32 is excellent. For a full walkthrough of every koota, Nadi and Bhakoot dosha and how families read the score, see our [kundli milan online free](/blog/kundli-milan-online-free) guide.",
    },

    { type: "h2", text: "Lagna kundli milan vs Moon-based gun milan" },
    {
      type: "p",
      text: "Ashtakoot gun milan, including Varna, is calculated only from the Moon sign and nakshatra. That is why a matching tool can give you a score even if the birth time is not known exactly. But the Moon is only one part of the chart. Many astrologers therefore also do what is often called lagna kundli milan: comparing the two Lagna (ascendant) charts, the 7th house and its lord, Venus for the groom and Jupiter for the bride, and the dashas each person will run in the early years of marriage. Lagna-based matching needs accurate birth times, because the Lagna changes roughly every two hours.",
    },
    {
      type: "p",
      text: "A practical approach is to use both: the gun milan score as a first screening, and the Lagna charts for a deeper reading. You can generate both partners' charts with the free [kundli](/kundli) tool and then ask the [AI astrologer](/ai-astrologer) to compare the 7th houses and dashas in Hindi or English.",
    },

    { type: "h2", text: "Jataka matching and South Indian porutham" },
    {
      type: "p",
      text: "In Tamil Nadu, Kerala, Karnataka and Andhra Pradesh, horoscope matching is often called jataka matching or jathaka porutham, from the Sanskrit jataka (birth chart). Instead of Ashtakoot, families usually use the Dasha Porutham system of ten poruthams (matches) such as Dina, Gana, Mahendra, Stree Deergha, Yoni, Rasi, Rasi Adhipathi, Vasya, Rajju and Vedha. Most of them are based on the birth star (nakshatra), and Rajju is given special importance. Varna in the Ashtakoot sense is not one of the ten poruthams.",
    },
    {
      type: "p",
      text: "Both systems aim at the same question — will these two people live well together? — and both are best read together with the individual birth charts rather than as a single pass-or-fail number.",
    },

    { type: "h2", text: "How to check your Varna koota online" },
    {
      type: "ul",
      items: [
        "Collect both partners' date, time and place of birth. In India, use the IST time from the birth certificate; for births abroad, use the local time.",
        "Run the free [kundli matching](/matching) tool. It shows the Varna score along with all eight kootas and the total out of 36.",
        "Check each partner's [Manglik status](/manglik), since it is not part of the 36 gun.",
        'For a deeper reading, open both [Kundlis](/kundli) and compare the Lagna, 7th house and dashas, or ask the AI astrologer, for example: "Hamara Varna 0 hai, kya isse koi dikkat hogi?"',
      ],
    },
  ],
  faqs: [
    {
      q: "What is Varna koota in kundli milan?",
      a: "Varna koota is the first of the eight kootas in Ashtakoot gun milan. It compares the varna (Brahmin, Kshatriya, Vaishya or Shudra) of the bride's and groom's Moon signs and is worth 1 gun out of 36.",
    },
    {
      q: "How many points is Varna koota worth?",
      a: "Varna koota carries a maximum of 1 gun. It is the lowest-weighted of the eight kootas, which together total 36 gun.",
    },
    {
      q: "How is Varna koota scored?",
      a: "The groom gets 1 gun when his Moon sign's varna is the same as or higher than the bride's, in the order Brahmin, Kshatriya, Vaishya, Shudra. If the bride's varna is higher, the score is 0.",
    },
    {
      q: "Which rashi belongs to which varna?",
      a: "Brahmin: Karka, Vrishchika and Meena. Kshatriya: Mesha, Simha and Dhanu. Vaishya: Vrishabha, Kanya and Makara. Shudra: Mithuna, Tula and Kumbha. The varna is taken from the Vedic Moon sign.",
    },
    {
      q: "Is Varna koota related to caste?",
      a: "No. In kundli milan, varna is a symbolic grouping of Moon signs by element. It is decided by the birth chart, not by a person's caste or family.",
    },
    {
      q: "Is Varna 0 out of 1 bad for marriage?",
      a: "Not on its own. It lowers the total by only 1 gun, and astrologers give much more weight to Bhakoot, Nadi, Gana and Graha Maitri, as well as the individual charts and Manglik status.",
    },
    {
      q: "What is the difference between gun milan and lagna kundli milan?",
      a: "Gun milan uses only the Moon sign and nakshatra to give a score out of 36. Lagna kundli milan compares the ascendant charts, 7th house, Venus, Jupiter and dashas, and needs accurate birth times.",
    },
    {
      q: "What is jataka matching?",
      a: "Jataka matching (jathaka porutham) is the South Indian name for horoscope matching. It usually uses the ten-porutham system, which is based mostly on the birth nakshatra, instead of the 36-gun Ashtakoot system.",
    },
  ],
};

const aiAstrologerFreeHindi: Post = {
  slug: "ai-astrologer-free-hindi",
  title: "AI Astrologer Free in Hindi & Hinglish: How It Works, Accuracy & Privacy",
  h1: "AI Astrologer Free – Chat with an AI Jyotish in Hindi, Hinglish and English (2026 Guide)",
  description:
    "How an AI astrologer reads your Vedic kundli, AI vs pandit, Hindi and Hinglish chat examples, honest accuracy limits, privacy, and how to choose a free AI astrologer in India.",
  keyword: "ai astrologer",
  author: "founder",
  published: "2026-11-04",
  updated: "2026-11-09",
  intro:
    '"Meri shaadi kab hogi?" "Job change karun ya nahi?" "Kya main Manglik hoon?" For generations these questions went to the family pandit or a trusted jyotishi. Today many people in India type them into an AI astrologer instead, often late at night, in Hindi or Hinglish, straight from their phone. But not every AI astrologer works the same way. Some read your actual Vedic birth chart; others simply generate a confident-sounding paragraph. This guide explains what an AI astrologer really is, how a good one reads your kundli, how it compares with a human pandit, what to ask, how to use [Astrojanta\'s free AI astrologer](/ai-astrologer) step by step, and how to judge any AI astrology app before you trust it with your questions or your money.',
  body: [
    { type: "h2", text: "What is an AI astrologer?" },
    {
      type: "p",
      text: "An AI astrologer (also searched as AI jyotish or AI pandit) is software that answers astrology questions in plain conversation. A well-built one has two separate parts. The first is a calculation engine that computes your birth chart from your date, time and place of birth: the Lagna (ascendant), the Moon sign (rashi), the birth nakshatra, the positions of the nine grahas, the houses and the dasha periods. The second is a language model that has been instructed to interpret that chart using the rules of Jyotish and to explain it in everyday words.",
    },
    {
      type: "p",
      text: 'The difference matters. A general-purpose chatbot that has not calculated your chart can only guess where your planets are, and a guessed chart produces guessed answers. A proper AI astrologer computes first and interprets second, so every answer can point back to a real placement in your [kundli](/kundli): "your 7th lord is in the 10th house", "you are running Venus mahadasha", and so on.',
    },

    { type: "h2", text: "How an AI astrologer reads your Vedic kundli" },
    {
      type: "p",
      text: "Here is what happens behind the scenes on Astrojanta when you enter your birth details. Other apps may differ, which is why it is worth asking any service how it calculates.",
    },
    {
      type: "ul",
      items: [
        "Time conversion: your local birth time is converted to universal time using the historical time-zone database. For births in India, use the IST time written on your birth certificate; older births are handled with India's historical offsets, such as the war-time time of the 1940s.",
        "Planet positions: the Sun, Moon, Mars, Mercury, Jupiter, Venus and Saturn are computed with an astronomical ephemeris (the open-source Astronomy Engine library). Rahu and Ketu use the mean lunar node.",
        "Sidereal zodiac with Lahiri ayanamsa: positions are converted to the Vedic (sidereal) zodiac using the Lahiri (Chitrapaksha) ayanamsa, the standard used by most Indian panchangs. This is why your Vedic rashi is often one sign behind your Western sun sign.",
        "Lagna and houses: the sidereal ascendant for your birth place sets the 1st house, with whole-sign houses.",
        "Nakshatra and dasha: the Moon's nakshatra and pada start the 120-year Vimshottari dasha, which the AI uses to talk about timing.",
        "Divisional chart and doshas: the Navamsa (D9) chart, Manglik status from Lagna and Moon with classical cancellations, and current transits for Sade Sati.",
      ],
    },
    {
      type: "p",
      text: "Only after all this is calculated does the AI step in. It receives the computed chart, is told to use only that data, and looks up details like dasha dates or transits through tools instead of inventing them. The full method is described on our [methodology page](/about-methodology).",
    },

    { type: "h2", text: "AI astrologer vs human pandit: which should you use?" },
    {
      type: "p",
      text: "This is not an either-or choice. Both have real strengths, and many families use both.",
    },
    {
      type: "table",
      head: ["", "AI astrologer", "Experienced human pandit / jyotishi"],
      rows: [
        ["Availability", "Any time, instant replies, including at midnight", "Depends on appointments and schedules"],
        [
          "Cost",
          "Often free within daily limits, or a small subscription",
          "Consultation fees, sometimes charged per minute on chat apps",
        ],
        ["Consistency", "Applies the same chart and rules every time", "Varies by tradition, experience and the day"],
        [
          "Transparency",
          "Can show the houses, lords and dashas behind each answer",
          "Depends on the astrologer's style",
        ],
        [
          "Privacy",
          "You can ask sensitive questions without saying them aloud",
          "Requires sharing personal matters with a person",
        ],
        [
          "Judgement and intuition",
          "Limited; cannot read the person in front of it",
          "Strong; brings life experience and context",
        ],
        ["Rituals and remedies", "Can explain remedies; cannot perform a puja", "Can guide or perform rituals"],
      ],
    },
    {
      type: "p",
      text: "A sensible approach: use an AI astrologer to understand your own chart, ask everyday questions and prepare, and consult an experienced jyotishi for major decisions such as fixing a marriage date or interpreting a complicated match. If you go to a pandit already knowing your Lagna, rashi, nakshatra and running dasha, the conversation becomes far more useful.",
    },

    { type: "h2", text: "What to ask an AI astrologer (with Hindi and Hinglish examples)" },
    {
      type: "p",
      text: 'Specific questions get specific answers. "Mera future batao" is too broad; "Next two years mein career ke liye kaunsa dasha period accha hai?" gives the AI something concrete to analyse. Here are good starting points by topic.',
    },
    { type: "h3", text: "Shaadi and relationships" },
    {
      type: "ul",
      items: [
        '"Meri shaadi kab hogi? Mere 7th house aur Venus ke baare mein kya dikh raha hai?"',
        '"Love marriage ya arranged marriage — chart kya indicate karta hai?"',
        '"मेरी कुंडली में विवाह के योग कब बन रहे हैं?"',
        "Before asking about a specific partner, run the free [kundli matching](/matching) tool for both of you, then ask the AI to explain the gun milan result, especially Bhakoot and Nadi.",
      ],
    },
    { type: "h3", text: "Career and money" },
    {
      type: "ul",
      items: [
        '"Job change karne ke liye kaunsa time sahi rahega?"',
        '"Business suit karega ya naukri? 10th house kya kehta hai?"',
        '"Which planets are strongest in my chart, and what work suits them?"',
        '"Paisa kab tak stable hoga? 2nd aur 11th house ka analysis karo."',
      ],
    },
    { type: "h3", text: "Manglik dosha" },
    {
      type: "ul",
      items: [
        '"Kya main Manglik hoon? Anshik hai ya purna?"',
        '"Mera Mangal dosh cancel ho raha hai kya?"',
        "You can also check instantly with the free [Manglik calculator](/manglik), and read our [Manglik dosha meaning](/blog/manglik-dosha-meaning) guide for the cancellation rules.",
      ],
    },
    { type: "h3", text: "Sade Sati and Shani" },
    {
      type: "ul",
      items: [
        '"Kya meri Sade Sati chal rahi hai? Kaunsa phase hai?"',
        '"Shani ka transit mere career ko kaise affect karega?"',
        "Sade Sati is counted from your Moon sign, so first confirm your rashi with the [Moon sign and nakshatra finder](/moon-sign).",
      ],
    },
    { type: "h3", text: "Dasha and timing" },
    {
      type: "ul",
      items: [
        '"Abhi kaunsi mahadasha aur antardasha chal rahi hai, aur iska matlab kya hai?"',
        '"Agle Guru transit ka mere liye kya asar hoga?"',
      ],
    },
    {
      type: "p",
      text: "Write the way you speak. On Astrojanta the AI astrologer replies in the same language and script you use: English, Hindi in Devanagari, or Hinglish in Roman script.",
    },

    { type: "h2", text: "How to use Astrojanta's free AI astrologer: step by step" },
    {
      type: "ul",
      items: [
        "Step 1 – Gather birth details: date, exact time and place of birth. In India use the IST time from your birth certificate; if you were born abroad, use the local time there.",
        "Step 2 – Make your free kundli: open the [free kundli](/kundli) tool. No sign-up is needed. Check that your Lagna and Moon sign look right.",
        "Step 3 – Create a free account: the [AI astrologer](/ai-astrologer) chat needs a free account so your chart and conversation can be saved to your profile.",
        "Step 4 – Ask your first question: be specific, mention the topic and time frame, and ask in Hindi, Hinglish or English.",
        'Step 5 – Follow up: ask "why?" or "which planet shows this?" The AI keeps your chart in context and explains the factors behind its answer.',
      ],
    },
    {
      type: "p",
      text: "A free account gets 2 AI questions a day; the daily limit resets at midnight UTC, which is 5:30 AM IST. The kundli, matching, Manglik and Moon sign tools can be used without an account. If you need more questions, the optional Pro plan raises the limit to 6 a day; it is priced in US dollars ($2.99 a month or $29.99 a year), so your bank converts it to rupees. Details are on the [pricing page](/pricing). There is no gemstone or puja selling, and no per-minute meter running while you think.",
    },
    {
      type: "p",
      text: "To write a better question, see how to [phrase one question for a chart-based answer](/blog/ask-astrologer-free). Ready to try? [Ask the AI astrologer free](/ai-astrologer) — it takes about a minute to go from birth details to your first answer.",
    },

    { type: "h2", text: "How accurate is an AI astrologer? An honest answer" },
    {
      type: "p",
      text: "Accuracy has two layers, and it helps to separate them.",
    },
    {
      type: "ul",
      items: [
        "Calculation accuracy: are the planets, Lagna, houses and dashas correct? This is mathematics, not opinion. With correct birth details and a proper ephemeris plus Lahiri ayanamsa, the chart should match what a careful panchang-based astrologer would draw. Astrojanta's engine is tested against reference points such as the Lahiri ayanamsa at J2000, Makar Sankranti and the well-known chart of Indian Independence.",
        "Interpretive accuracy: is the reading meaningful? Astrology describes tendencies and favourable or challenging periods; it does not deliver certainties. No AI, and no human, can honestly promise the exact date of a wedding or a job offer.",
      ],
    },
    { type: "p", text: "Practical limits to keep in mind:" },
    {
      type: "ul",
      items: [
        "A birth time off by 10–15 minutes can change the Lagna and house placements, and with them many answers.",
        "Without a birth time, answers rely on the Moon chart and say less about houses.",
        "Different traditions (Parashari, KP, Lal Kitab, South Indian systems) can read the same chart differently. Astrojanta's AI follows the Parashari tradition.",
        "A language model can still phrase something poorly or overstate it. Treat every answer as guidance for reflection, and ask follow-up questions when something seems off.",
        "An AI astrologer is not a doctor, lawyer, financial adviser or counsellor. For health, legal, money or mental-health matters, consult a qualified professional. If you are in distress in India, call Tele-MANAS on 14416 (24×7, free).",
      ],
    },

    { type: "h2", text: "Privacy: what happens to your birth details" },
    {
      type: "p",
      text: "Your date, time and place of birth are personal data, so check how any app treats them. On Astrojanta, birth details are encrypted at rest, chart data and your question are shared with the AI model provider only to generate an answer, your password is never sent to it, and you can delete your account and data at any time. The [privacy policy](/privacy) explains this under India's Digital Personal Data Protection Act, 2023.",
    },

    { type: "h2", text: "How to choose the best AI astrologer app in India" },
    {
      type: "p",
      text: "There are now many AI astrology apps and websites. Rather than trusting a ranking, test any of them, including Astrojanta, against these criteria:",
    },
    {
      type: "ul",
      items: [
        "Does it calculate a real Vedic chart? It should ask for exact birth time and place, show your Lagna, rashi, nakshatra and dasha, and say which ayanamsa it uses (Lahiri is the Indian standard).",
        "Do answers cite your chart? Good answers mention specific houses, lords and dasha periods. Generic lines that could apply to anyone are a red flag.",
        "Language: can you chat in Hindi, Hinglish or your own language, and does it reply in the same script?",
        "Clear free tier and pricing: how many free questions, when the limit resets, and what paid plans cost, shown before you pay. Be wary of per-minute charges that are hard to track.",
        'No fear-selling: an app that pushes expensive gemstones, pujas or "urgent" remedies after scaring you about a dosha is putting sales first.',
        "Honesty about limits: it should admit uncertainty, flag when an answer depends on birth time, and avoid medical, legal or financial claims.",
        "Privacy: a readable privacy policy, encryption, and a way to delete your data.",
        "A real operator: a contact email and an identifiable person or company behind the service.",
      ],
    },
    {
      type: "p",
      text: "A quick test: ask the same question twice, worded differently. A chart-based AI astrologer should give consistent reasoning that points to the same placements.",
    },

    { type: "h2", text: "Related free tools and guides" },
    {
      type: "ul",
      items: [
        "[Free kundli](/kundli) — Lagna, rashi, nakshatra, Navamsa and Vimshottari dasha in seconds.",
        "[Kundli matching](/matching) — 36-gun Ashtakoot milan for shaadi; see also [kundli milan online free](/blog/kundli-milan-online-free) and [Varna koota meaning](/blog/varna-koota-meaning).",
        "[Manglik calculator](/manglik) — Mars from Lagna and Moon with cancellations.",
        "[Moon sign finder](/moon-sign) — your Vedic rashi and birth nakshatra.",
        "[How to read your kundli with an AI kundli reader](/blog/ai-kundli-reader) and [free AI kundli online](/blog/free-ai-kundli-online).",
        "[Ask an astrologer free](/blog/ask-astrologer-free) — tips for getting clear answers to your questions.",
      ],
    },
    {
      type: "p",
      text: "Astrology works best as a lens for understanding yourself and your timing, not as a source of fear. Start with your own chart, ask clear questions, and [chat with the AI astrologer free](/ai-astrologer) in the language you are most comfortable with.",
    },
  ],
  faqs: [
    {
      q: "Is there a free AI astrologer in India?",
      a: "Yes. Astrojanta's AI astrologer is free with a free account: 2 questions a day, resetting at 5:30 AM IST. The kundli, kundli matching, Manglik and Moon sign tools are free without sign-up.",
    },
    {
      q: "Can I chat with an AI astrologer in Hindi?",
      a: 'Yes. You can write in Hindi (Devanagari), Hinglish such as "meri shaadi kab hogi?", or English, and the AI astrologer replies in the same language and script.',
    },
    {
      q: "How does an AI astrologer read my kundli?",
      a: "It first calculates your Vedic chart from your birth date, time and place — sidereal positions with the Lahiri ayanamsa, Lagna, houses, nakshatra and Vimshottari dasha — and then the AI interprets only that computed data.",
    },
    {
      q: "Is AI astrology accurate?",
      a: "The chart calculation can be exact if your birth details are correct. Interpretation describes tendencies and timing, not certainties, and an incorrect birth time can change the Lagna and houses.",
    },
    {
      q: "Is an AI astrologer better than a pandit?",
      a: "It is different. An AI astrologer is instant, consistent, private and low-cost; an experienced pandit brings judgement, intuition and rituals. Many people use AI to understand their chart and a pandit for major decisions.",
    },
    {
      q: "What is AI jyotish?",
      a: "AI jyotish means using artificial intelligence to explain Vedic (Jyotish) astrology. A good AI jyotish computes your birth chart first and uses a language model only to interpret it in plain language.",
    },
    {
      q: "Can an AI astrologer tell me when I will get married?",
      a: "It can explain which dasha periods and transits are traditionally favourable for marriage in your chart, based on the 7th house, Venus and Jupiter. It cannot guarantee a date.",
    },
    {
      q: "Can the AI astrologer check Manglik dosha and Sade Sati?",
      a: "Yes. Your chart includes Manglik status from Lagna and Moon with classical cancellations, and current transits for Sade Sati, and the AI can explain both. You can also use the free Manglik calculator directly.",
    },
    {
      q: "Do I need my exact birth time?",
      a: "For Lagna and house-based answers, yes. Without it you still get your Moon sign, nakshatra, planetary signs and dasha, and the AI tells you when an answer depends on the birth time.",
    },
    {
      q: "Is my birth data safe with an AI astrologer?",
      a: "On Astrojanta, birth details are encrypted at rest, only chart data and your question are sent to the AI provider, and you can delete your data any time. Always check an app's privacy policy before sharing details.",
    },
  ],
};

const shaniSadeSati2026: Post = {
  slug: "shani-sade-sati-2026",
  title: "Shani Sade Sati 2026: Kin Rashiyon Par Hai, Dates in IST, Dhaiya & Upay",
  h1: "Shani Sade Sati 2026 – Which Rashis Are Affected, Dates in IST, Dhaiya and Remedies (Upay)",
  description:
    "Shani Sade Sati 2026: Saturn stays in Meena (Pisces) all year, so Kumbh, Meen and Mesh rashi are in Sade Sati and Simha, Dhanu in Dhaiya. Shani vakri 27 Jul–margi 11 Dec IST, phase-wise effects and simple upay.",
  keyword: "shani sade sati 2026",
  author: "founder",
  published: "2026-11-04",
  updated: "2026-11-04",
  intro:
    '"Kya meri Sade Sati chal rahi hai?" is one of the most searched astrology questions in India, and in 2026 the answer is simpler than usual. Shani (Saturn) spends the entire year in Meena rashi (Pisces), so no rashi enters or leaves Sade Sati in 2026. Kumbh (Aquarius), Meen (Pisces) and Mesh (Aries) Moon signs are under Shani Sade Sati, while Simha (Leo) and Dhanu (Sagittarius) are under Shani Dhaiya. Below you will find the exact Shani vakri and margi dates in IST, what each phase of Sade Sati means, rashi-wise effects, what really changes during the retrograde, the dates for 2027–2028, and practical, budget-friendly upay — without the fear that usually comes with the word "Shani".',
  body: [
    { type: "h2", text: "Shani Sade Sati 2026 at a glance (kin rashiyon par Sade Sati hai?)" },
    {
      type: "p",
      text: "Sade Sati is counted from your Moon sign (Chandra rashi), not your sun sign. It runs while Saturn transits the 12th, 1st and 2nd signs from your natal Moon — three signs of about two and a half years each, so roughly seven and a half years in total (saadhe saat saal). With Saturn in Meena throughout 2026, the picture for the year is:",
    },
    {
      type: "table",
      head: ["Rashi (Moon sign)", "Status in 2026", "Saturn's house from Moon"],
      rows: [
        ["Kumbh (Aquarius)", "Sade Sati – last phase (utarti Sade Sati)", "2nd"],
        ["Meen (Pisces)", "Sade Sati – peak / middle phase", "1st (over the Moon)"],
        ["Mesh (Aries)", "Sade Sati – first phase (chadhti Sade Sati)", "12th"],
        ["Simha (Leo)", "Shani Dhaiya – Ashtama Shani", "8th"],
        ["Dhanu (Sagittarius)", "Shani Dhaiya – Kantaka Shani", "4th"],
        ["Vrishabh, Mithun, Kark, Kanya, Tula, Vrishchik, Makar", "No Sade Sati or Dhaiya", "3rd, 5th–7th, 9th–11th"],
      ],
    },
    {
      type: "p",
      text: 'Not sure of your Moon sign? Many people in India know their "naam rashi" from the first letter of their name, but that is not always the same as the Chandra rashi in your birth chart. Find your real Moon sign and nakshatra in seconds with the free [Moon sign finder](/moon-sign), or generate your full [free kundli](/kundli), which also shows your current Sade Sati status.',
    },

    { type: "h2", text: "Shani transit 2026 dates in IST (Shani vakri and margi)" },
    {
      type: "p",
      text: "Saturn entered sidereal Meena on 29–30 March 2025 (the exact night differs slightly between panchangs). In 2026 it does not change sign at all. Its only two big events are the retrograde (vakri) and direct (margi) stations:",
    },
    {
      type: "table",
      head: ["Event", "Date and time (IST, approx.)", "Saturn's position (Vedic / sidereal)"],
      rows: [
        ["Shani vakri (turns retrograde)", "Monday 27 July 2026, ~1:10 AM", "about 20°33′ Meena (Pisces)"],
        ["Shani margi (turns direct)", "Friday 11 December 2026, ~5:05 AM", "about 13°44′ Meena (Pisces)"],
        ["Shani enters Mesh (first time)", "around 3 June 2027", "0° Mesh (Aries)"],
        ["Shani slips back into Meena (vakri)", "around 20–21 October 2027", "29° Meena"],
        ["Shani enters Mesh again, for good", "around 23–24 February 2028", "0° Mesh"],
      ],
    },
    {
      type: "p",
      text: "Station times vary by a few minutes between panchangs (Prokerala, Drik Panchang and others use slightly different methods and locations), because Saturn barely moves near a station. What matters is the day. Note also that Western sites put Saturn in Aries already in 2026 — that is the tropical zodiac. In Vedic astrology, with the Lahiri ayanamsa of roughly 24°, Saturn is still in Meena, which is why Indian Sade Sati lists differ from Western horoscopes. You can read more about how we calculate positions on our [methodology page](/about-methodology).",
    },

    { type: "h2", text: "What is Shani Sade Sati? (Sade Sati kya hai)" },
    {
      type: "p",
      text: "Saturn takes about 29.5 years to go around the zodiac, so it spends roughly two and a half years in each sign. Every 29–30 years it passes over the sign that holds your natal Moon. Because the Moon represents the mind (man), emotions, mother and everyday peace, Jyotish treats Saturn's slow pressure on the Moon — one sign before, on top of, and one sign after — as a long period of testing, responsibility and maturity. Most people experience Sade Sati two or three times in a lifetime.",
    },
    {
      type: "p",
      text: "Saturn is the karaka of karma, discipline, delay, hard work, servants and workers, old age, and justice. It is often called a teacher rather than a punisher: it rewards patience, honesty and effort, and it is harsh mainly on shortcuts. That is why the same Sade Sati can bring a promotion to one person and a difficult year to another.",
    },

    { type: "h2", text: "The three phases of Sade Sati (chadhti, madhya aur utarti)" },
    { type: "h3", text: "Phase 1 – Rising (Saturn in 12th from Moon): Mesh rashi in 2026" },
    {
      type: "p",
      text: "The 12th house rules expenses, sleep, foreign lands, hospitals and letting go. The first phase commonly shows up as rising kharcha, disturbed sleep, travel or relocation, and a feeling that old structures are slowly loosening. For Mesh rashi this phase began when Saturn entered Meena in March 2025.",
    },
    { type: "h3", text: "Phase 2 – Peak (Saturn over the Moon): Meen rashi in 2026" },
    {
      type: "p",
      text: "This is the phase people fear most, because Saturn sits directly on the Moon. It tends to bring heavier responsibilities, emotional pressure, health awareness and slow results — but also serious, lasting progress for those who work steadily. For Meen rashi the Sade Sati began in January 2023, when Saturn entered Kumbh, and the peak runs while Saturn is in Meena.",
    },
    { type: "h3", text: "Phase 3 – Setting (Saturn in 2nd from Moon): Kumbh rashi in 2026" },
    {
      type: "p",
      text: "The 2nd house rules family, savings, speech and food. The last phase usually concerns money discipline, family duties and the way you speak. Kumbh rashi has been in Sade Sati since January 2020 and is now in its final stretch, which ends only when Saturn settles in Mesh in February 2028.",
    },

    { type: "h2", text: "Rashi-wise effects of Sade Sati and Dhaiya in 2026" },
    {
      type: "p",
      text: "These are classical gochar (transit) tendencies based on your Moon sign alone. Your own birth chart — Saturn's natal strength, your Lagna and your running dasha — decides how strongly you feel them.",
    },
    { type: "h3", text: "Mesh (Aries) – Sade Sati first phase" },
    {
      type: "ul",
      items: [
        "Expenses, especially on family, health or travel, can rise — make a monthly budget and keep an emergency fund.",
        "Sleep and stress need care; avoid late-night overwork.",
        "Good time for long-term planning, foreign-related work and clearing old debts.",
        "Avoid impulsive job changes; build skills now so that 2027–2028 opportunities find you ready.",
      ],
    },
    { type: "h3", text: "Meen (Pisces) – Sade Sati peak" },
    {
      type: "ul",
      items: [
        "Career may feel slow, with more work and less credit — consistency pays off later.",
        "Keep a steady daily routine (dincharya), regular health check-ups and simple food.",
        "Relationships may feel heavy; speak calmly and avoid ego clashes at home and office.",
        "Natives whose natal Moon lies between about 13° and 21° Meena feel the 2026 retrograde most, because Saturn crosses that degree three times.",
      ],
    },
    { type: "h3", text: "Kumbh (Aquarius) – Sade Sati last phase" },
    {
      type: "ul",
      items: [
        "Focus on savings, EMIs and family finances; avoid lending large sums.",
        "Watch your speech — harsh words can create family disputes.",
        "Many Kumbh natives feel relief compared with 2023–2025; the lessons now consolidate.",
        "Good time to complete pending property or family matters patiently.",
      ],
    },
    { type: "h3", text: "Simha (Leo) – Ashtama Shani (Dhaiya)" },
    {
      type: "p",
      text: "Saturn in the 8th from the Moon is traditionally linked with sudden changes, hidden worries, health matters and in-laws' issues. Drive carefully, avoid risky investments and keep paperwork in order. This Dhaiya ends when Saturn leaves Meena for good in February 2028.",
    },
    { type: "h3", text: "Dhanu (Sagittarius) – Kantaka Shani (Dhaiya)" },
    {
      type: "p",
      text: "Saturn in the 4th from the Moon touches home, mother, property, vehicles and peace of mind. Expect property or house-shifting decisions to take longer; take care of your mother's health and avoid buying property in a hurry.",
    },
    { type: "h3", text: "Other rashis" },
    {
      type: "p",
      text: "For Vrishabh, Kark and Makar Moon signs, Saturn is in the 11th, 9th and 3rd houses respectively — the 3rd and 11th are classically among the best positions for Saturn, so 2026 can reward effort. Vrishabh should note, however, that its own Sade Sati begins when Saturn enters Mesh in June 2027.",
    },

    { type: "h2", text: "Shani vakri 2026: does the retrograde make Sade Sati worse?" },
    {
      type: "p",
      text: "No phase changes because of the retrograde. From 27 July to 11 December 2026 Saturn moves back from about 20° to 13° of Meena, but it never leaves the sign, so nobody enters or exits Sade Sati. What changes is the tone: a vakri Saturn is traditionally read as a time of review — pending matters return, old responsibilities need finishing, and decisions taken earlier in the year are tested. Once Shani becomes margi on 11 December 2026, delayed work usually starts moving again. For a broader view of retrogrades, see our guide to [Budh vakri 2026](/blog/mercury-retrograde-2026).",
    },

    { type: "h2", text: "Sade Sati dates 2027–2028: when will it end? (Sade Sati kab khatam hogi)" },
    {
      type: "ul",
      items: [
        "Kumbh: Sade Sati effectively ends when Saturn settles in Mesh around 23–24 February 2028. The first exit in June 2027 is temporary, because Saturn returns to Meena from October 2027 to February 2028.",
        "Meen: the peak ends in February 2028; Meen then enters the last phase while Saturn is in Mesh (until around 2030).",
        "Mesh: the peak begins when Saturn enters Mesh in June 2027, pauses during the October 2027–February 2028 dip, and resumes from February 2028.",
        "Vrishabh: Sade Sati begins with Saturn's entry into Mesh in June 2027, and for good from February 2028.",
        "Simha and Dhanu: Dhaiya ends in February 2028; Kark (Ashtama) and Makar (Kantaka) begin Dhaiya when Saturn enters Mesh.",
      ],
    },

    { type: "h2", text: "Shani Sade Sati remedies (Shani ke upay) that are simple and free" },
    {
      type: "p",
      text: "Classical texts and Indian tradition suggest many upay for Saturn. Most effective ones cost little or nothing and are really about the qualities Saturn values — discipline, humility and service. Nobody needs to spend thousands on pujas out of fear.",
    },
    {
      type: "ul",
      items: [
        "Recite the Hanuman Chalisa, especially on Tuesdays and Saturdays; Hanuman ji is traditionally believed to protect devotees from Shani's troubles.",
        'Chant the Shani mantra "Om Sham Shanaishcharaya Namah" 108 times on Saturdays, or the Shani beej mantra "Om Praam Preem Praum Sah Shanaye Namah".',
        "On Saturdays, light a sarson (mustard) oil diya under a peepal tree or at a Shani temple.",
        "Donate black til, urad dal, mustard oil, blankets or shoes to the needy, labourers or elderly people — service to workers is Saturn's favourite remedy.",
        "Be honest at work, respect elders and staff, and avoid alcohol, lies and shortcuts during Sade Sati.",
        "Keep a fixed routine: wake up early, exercise, and finish pending work — Saturn rewards consistency.",
        "Gemstones such as neelam (blue sapphire) should never be worn just because of Sade Sati; wear them only after a full chart analysis.",
      ],
    },

    { type: "h2", text: "How to check your own Sade Sati online free" },
    {
      type: "p",
      text: 'Sade Sati depends only on your natal Moon sign, but how it feels depends on your whole chart. On Astrojanta you can: (1) create your [free Vedic kundli](/kundli) with date, time and place of birth; (2) see your Moon sign, nakshatra, Saturn\'s natal position and your running Vimshottari dasha; and (3) ask the [AI astrologer](/ai-astrologer) in Hindi or English, for example "Meri Sade Sati kab khatam hogi?" or "Shani dasha aur Sade Sati ek saath chal rahi hai, kya karun?". If you are planning marriage during Sade Sati, also check [kundli milan](/matching) and your [Manglik status](/manglik) — Sade Sati alone is not a reason to delay a shaadi.',
    },

    { type: "h2", text: "Common Sade Sati myths" },
    {
      type: "ul",
      items: [
        "Myth: Sade Sati always brings bad luck. Fact: many people get promotions, marriage or property during Sade Sati; it brings responsibility, not only loss.",
        "Myth: your naam rashi decides Sade Sati. Fact: it is your Chandra rashi from the birth chart.",
        "Myth: you must do an expensive Shani puja. Fact: classical remedies are simple — discipline, mantra, daan and service.",
        "Myth: Sade Sati and Shani mahadasha are the same. Fact: Sade Sati is a transit; the mahadasha is a 19-year Vimshottari period in your own chart.",
      ],
    },
    {
      type: "p",
      text: "Related reading: [Manglik dosha meaning](/blog/manglik-dosha-meaning), [free AI kundli online](/blog/free-ai-kundli-online) and [AI astrologer free in Hindi](/blog/ai-astrologer-free-hindi).",
    },
  ],
  faqs: [
    {
      q: "Which rashis have Shani Sade Sati in 2026?",
      a: "Kumbh (Aquarius) in the last phase, Meen (Pisces) in the peak phase and Mesh (Aries) in the first phase, because Saturn stays in sidereal Meena for all of 2026.",
    },
    {
      q: "Which rashis have Shani Dhaiya in 2026?",
      a: "Simha (Leo) has Ashtama Shani (Saturn in the 8th) and Dhanu (Sagittarius) has Kantaka Shani (Saturn in the 4th) from the Moon sign.",
    },
    {
      q: "When is Shani vakri and margi in 2026?",
      a: "Saturn turns retrograde on 27 July 2026 (around 1 AM IST) and turns direct on 11 December 2026 (around 5 AM IST), staying in Meena throughout.",
    },
    {
      q: "Does Saturn change sign in 2026?",
      a: "No. Saturn entered Meena in March 2025 and first enters Mesh around 3 June 2027, so no rashi starts or ends Sade Sati in 2026.",
    },
    {
      q: "When will Kumbh rashi Sade Sati end?",
      a: "It effectively ends when Saturn settles in Mesh around 23–24 February 2028. Saturn briefly enters Mesh in June 2027 but returns to Meena from October 2027.",
    },
    {
      q: "When will Sade Sati start for Vrishabh (Taurus) rashi?",
      a: "Vrishabh Sade Sati begins when Saturn enters Mesh around 3 June 2027, and continues for good from February 2028.",
    },
    {
      q: "Is Sade Sati calculated from naam rashi or Moon sign?",
      a: "From your Chandra rashi (Moon sign) in the birth chart. Your naam rashi can be different, so check your Moon sign from your date, time and place of birth.",
    },
    {
      q: "What are the best remedies for Shani Sade Sati?",
      a: "Hanuman Chalisa, the Shani mantra on Saturdays, a mustard oil diya, donating black til, urad or blankets to the needy, and honest, disciplined work. Avoid wearing neelam without a full chart analysis.",
    },
    {
      q: "Can I get married during Sade Sati?",
      a: "Yes. Sade Sati alone is not a reason to delay marriage. Look at kundli milan, the 7th house, and your running dasha rather than Sade Sati by itself.",
    },
    {
      q: "Why do Western sites show Saturn in Aries in 2026?",
      a: "They use the tropical zodiac. Vedic astrology uses the sidereal zodiac with the Lahiri ayanamsa (about 24°), so in Jyotish Saturn is still in Meena (Pisces).",
    },
  ],
};

const rashifal2027: Post = {
  slug: "rashifal-2027",
  title: "Rashifal 2027: 12 Rashi, Career, Shaadi & Upay",
  h1: "Rashifal 2027 – Varshik Rashifal for All 12 Rashis: Career, Love, Shaadi, Dhan, Health and Upay",
  description:
    "Varshik rashifal 2027 for all 12 rashis: Shani enters Mesh 3 Jun, Guru exalted in Kark 25 Jan–26 Jun. Career, shaadi, dhan, Sade Sati aur saral upay.",
  keyword: "rashifal 2027",
  author: "founder",
  published: "2026-11-05",
  updated: "2026-11-09",
  intro:
    "“Saal 2027 kaisa rahega?” — every November, millions of people in India start searching for their varshik rashifal. 2027 is a genuinely eventful year in Vedic astrology: Shani (Saturn) leaves Meena and enters Mesh for the first time in about 30 years, Guru (Jupiter) spends the first half of the year exalted in Kark, and Rahu–Ketu sit on the Makar–Kark axis for the whole year. This rashifal 2027 explains each big gochar (transit) with dates in IST, then gives a practical horoscope 2027 for all 12 rashis — career and naukri, love and shaadi, dhan, health and one simple upay each. Everything is calculated in the sidereal zodiac with the Lahiri ayanamsa, the system used by Indian panchangs, and read from your Moon sign (Chandra rashi).",
  body: [
    { type: "h2", text: "Rashifal 2027 overview: saal 2027 kaisa rahega?" },
    {
      type: "p",
      text: "A yearly horoscope is mainly about the slow planets, because they shape the whole year: Saturn (about 2.5 years per sign), Jupiter (about 1 year per sign) and Rahu–Ketu (about 18 months per sign pair). In 2027 all of them are active:",
    },
    {
      type: "ul",
      items: [
        "Shani gochar 2027: Saturn moves from Meena into Mesh on 3 June 2027, turns vakri in August, slips back into Meena on 20 October and becomes margi on 24 December. In Mesh, Saturn is neecha (debilitated), so June–October is a period of discipline, restructuring and hard work for many people.",
        "Guru gochar 2027: Jupiter starts the year in Simha, moves back (vakri) into Kark on 25 January, where it is uchcha (exalted), returns to Simha on 26 June and enters Kanya on 26 November. The first half of 2027 is classically the best time of the year for education, children, marriage talks and new beginnings.",
        "Rahu ketu gochar 2027: Rahu stays in Makar and Ketu in Kark for the whole of 2027 (they changed sign on 5 December 2026), so ambition in career and status (Rahu) and detachment around home and emotions (Ketu) are background themes all year.",
        "Mangal vakri 2027: Mars is retrograde from 10 January to 1 April, moving from Simha back into Kark — so avoid hasty property, vehicle and legal decisions in the first quarter.",
        "Surya grahan 2027: the total solar eclipse of 2 August 2027 is seen in India only as a partial eclipse in the late afternoon (roughly 3:45–5:50 PM IST, depending on the city). The three Chandra grahans of 2027 are penumbral and carry no sutak.",
      ],
    },
    {
      type: "p",
      text: "In short, 2027 rewards patience and planning. The first half (Jupiter exalted) is better for starting things — shaadi, admission, a new job — and the second half (Saturn in Mesh, then retrograde) is better for finishing, consolidating and paying off debts.",
    },

    { type: "h2", text: "Gochar 2027 dates in IST (Shani, Guru, Rahu–Ketu, Mangal)" },
    {
      type: "table",
      head: ["Planet event", "Date and time (IST, approx.)", "Sign (Vedic / sidereal, Lahiri)"],
      rows: [
        [
          "Rahu enters Makar, Ketu enters Kark (mean node)",
          "Saturday 5 December 2026, ~10:30 PM",
          "Rahu in Makar, Ketu in Kark until June 2028",
        ],
        ["Guru (Jupiter) turns vakri", "Sunday 13 December 2026, ~6:00 AM", "about 2°47′ Simha"],
        ["Mangal (Mars) turns vakri", "Sunday 10 January 2027, ~6:30 PM", "about 16°11′ Simha"],
        ["Guru re-enters Kark (vakri, exalted)", "Monday 25 January 2027, ~1:00–1:30 AM", "Kark (Cancer)"],
        ["Mangal re-enters Kark (vakri)", "Wednesday 10 March 2027, ~12:30 AM", "Kark (Cancer)"],
        ["Mangal turns margi", "Thursday 1 April 2027, ~7:30 PM", "about 26°41′ Kark"],
        ["Guru turns margi", "Tuesday 13 April 2027, ~8:00 AM", "about 22°45′ Kark"],
        ["Shani enters Mesh (first time)", "Thursday 3 June 2027, ~5:30–6:30 AM", "Mesh (Aries) — Saturn neecha"],
        ["Guru enters Simha again", "Saturday 26 June 2027, ~5:15–5:45 AM", "Simha (Leo)"],
        ["Surya grahan (partial in India)", "Monday 2 August 2027, ~3:45–5:50 PM", "Sun and Moon in Kark"],
        ["Shani turns vakri", "Monday 9 August 2027, ~11:00–11:30 PM", "about 3°38′ Mesh"],
        ["Shani slips back into Meena (vakri)", "Wednesday 20 October 2027, ~6:00–7:15 AM", "Meena (Pisces)"],
        ["Guru enters Kanya", "Friday 26 November 2027, ~6:45–7:15 PM", "Kanya (Virgo)"],
        ["Shani turns margi", "Friday 24 December 2027, ~8:15–9:15 AM", "about 26°46′ Meena"],
        ["Shani enters Mesh for good", "Wednesday 23 February 2028, ~7:30 PM", "Mesh (Aries)"],
      ],
    },
    {
      type: "p",
      text: "These dates come from Astrojanta's own calculation engine (sidereal, Lahiri ayanamsa, mean Rahu–Ketu) and match Drik Panchang and Prokerala to the day. Times differ by a few minutes between panchangs — up to about 45 minutes for Jupiter and Saturn ingresses — because each uses a slightly different Lahiri value and method, so we give ranges. Two common confusions: Western (tropical) horoscopes already put Saturn in Aries in 2026 and Jupiter in Leo or Virgo at different dates, because the tropical zodiac is about 24° ahead of the Vedic one. And some panchangs use the true node for Rahu–Ketu, which changed sign on 25 November 2026 instead of 5 December. Read more on [how we calculate](/about-methodology).",
    },

    { type: "h2", text: "Meri rashi kaise pata kare? Moon sign vs sun sign" },
    {
      type: "p",
      text: "Vedic rashifal is always read from your Chandra rashi — the sign the Moon occupied when you were born. It is not your Western sun sign (the “star sign” in magazines), and it is often not your naam rashi from the first letter of your name either. A person born on 20 April, for example, is “Taurus” in Western astrology but can have any of the 12 rashis as their Moon sign. If you read the wrong rashi, the whole year's prediction will be wrong.",
    },
    {
      type: "p",
      text: "Find your real Moon sign and nakshatra in a few seconds with the free [Moon sign finder](/moon-sign), or make your full [free kundli](/kundli) to also see your Lagna and running dasha. For a personal 2027 reading, ask the [AI astrologer](/ai-astrologer) in Hindi or English — for example “2027 mein meri naukri kab lagegi?” or “Shaadi ka yog kab hai?”. Our guide to the [free AI astrologer in Hindi](/blog/ai-astrologer-free-hindi) explains how to ask good questions.",
    },

    { type: "h2", text: "Rashifal 2027 for all 12 rashis (varshik rashifal)" },
    {
      type: "p",
      text: "Each reading below is based on classical gochar rules from your Moon sign: Saturn and Rahu–Ketu give their best results in the 3rd, 6th and 11th houses, and Jupiter in the 2nd, 5th, 7th, 9th and 11th. Your own dasha and birth chart decide how strongly you feel these trends, so treat this as the weather of the year, not a fixed destiny.",
    },

    { type: "h3", text: "Mesh rashifal 2027 (Aries horoscope 2027)" },
    {
      type: "p",
      text: "Saturn moves from your 12th house onto your Moon sign on 3 June (peak of Sade Sati until 20 October), Jupiter moves between your 5th and 4th houses, and Rahu is in your 10th all year.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: Rahu in the 10th brings ambition and sudden opportunities, especially in tech, sales and politics. June–October demands extra hard work with slow recognition — do not quit a job without a new offer in hand.",
        "Love / shaadi: January and from late June (Jupiter in the 5th) are favourable for love and for families finalising rishtas. Avoid ego clashes when Saturn is over the Moon.",
        "Dhan: steady income, but expenses on home, vehicle or a parent's needs rise; avoid large loans in the first quarter (Mars vakri).",
        "Health: watch sleep, joints and stress from June. A fixed routine helps more than anything else.",
        "Upay: recite the Hanuman Chalisa on Tuesdays and Saturdays.",
      ],
    },

    { type: "h3", text: "Vrishabh rashifal 2027 (Taurus horoscope 2027)" },
    {
      type: "p",
      text: "Saturn is in your 11th house (very good) until June, then your Sade Sati begins with Saturn in the 12th from 3 June to 20 October. Jupiter is in your 3rd and 4th houses; Rahu is in your 9th.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: January–May is one of your best windows in years for promotions, gains and networking — act early. From June, workload and travel rise.",
        "Love / shaadi: family support is good; marriage talks can progress in the first half. Distance or travel may test relationships after June.",
        "Dhan: strong gains early in the year; from June expenses rise (foreign travel, hospital, house). Build savings before then.",
        "Health: guard sleep and eyes in the second half; avoid overwork.",
        "Upay: donate white rice or milk on Fridays and respect elders and teachers (Rahu in the 9th).",
      ],
    },

    { type: "h3", text: "Mithun rashifal 2027 (Gemini horoscope 2027)" },
    {
      type: "p",
      text: "Saturn is in your 10th house, then 11th from June to October; Jupiter is in your 3rd and, from January to June, your 2nd (good for money). Rahu is in your 8th and Ketu in your 2nd.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: hard, responsible work in the 10th brings respect; June–October gives gains, salary increments and help from seniors.",
        "Love / shaadi: February–June (Jupiter in the 2nd) is good for family events and engagement. Speak softly — Ketu in the 2nd can make words sound harsh.",
        "Dhan: savings improve in the first half; avoid speculation, crypto and risky trading (Rahu in the 8th).",
        "Health: Rahu in the 8th calls for care while driving and for regular check-ups; do not ignore small symptoms.",
        "Upay: feed green grass to cows on Wednesdays and chant “Om Budhaya Namah”.",
      ],
    },

    { type: "h3", text: "Kark rashifal 2027 (Cancer horoscope 2027)" },
    {
      type: "p",
      text: "Jupiter is exalted over your Moon sign from 25 January to 26 June — the headline of your year — and then in your 2nd. Saturn is in your 9th, then 10th from June to October. Ketu sits on your Moon sign and Rahu in your 7th all year.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: respect and wisdom grow in the first half; June–October (Saturn in the 10th) brings heavy responsibility but real career building.",
        "Love / shaadi: Jupiter on the Moon supports shaadi, but Rahu in the 7th asks you to check the rishta carefully — do proper [kundli milan](/matching) and verify facts before committing.",
        "Dhan: from late June (Jupiter in the 2nd) savings and family wealth improve.",
        "Health: Ketu on the Moon can bring restlessness or a feeling of detachment; meditation and sleep routine help.",
        "Upay: offer water to Shivling on Mondays and chant “Om Namah Shivaya”.",
      ],
    },

    { type: "h3", text: "Singh (Simha) rashifal 2027 (Leo horoscope 2027)" },
    {
      type: "p",
      text: "Saturn is in your 8th (Ashtama Shani dhaiya) except from June to October, when it is in your 9th. Jupiter is in your sign, then in your 12th from January to June, and in your 2nd from 26 November. Rahu is in your 6th (good) and Ketu in your 12th.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: Rahu in the 6th helps you beat competition, crack exams and win disputes. June–October brings relief and support from seniors or father.",
        "Love / shaadi: relationships are steady but need patience; good dates for shaadi come after late June when Jupiter returns to your sign.",
        "Dhan: expenses (travel, hospital, spiritual) are high in the first half; from late November Jupiter in the 2nd brings better savings.",
        "Health: Ashtama Shani calls for care with chronic issues and while driving; get insurance in place.",
        "Upay: offer water to the Sun at sunrise and recite the Aditya Hridayam on Sundays.",
      ],
    },

    { type: "h3", text: "Kanya rashifal 2027 (Virgo horoscope 2027)" },
    {
      type: "p",
      text: "Jupiter is in your 11th house (gains) from January to June, then your 12th, and on your Moon sign from 26 November. Saturn is in your 7th, and in your 8th (Ashtama Shani) from June to October. Rahu is in your 5th and Ketu in your 11th.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: February–June is your best phase — gains, bonuses and new contacts. Use it; June–October can bring sudden changes at work.",
        "Love / shaadi: Saturn in the 7th means serious relationships and possible marriage, often with someone mature; avoid quarrels with your spouse from June.",
        "Dhan: strong income in the first half (Jupiter and Ketu in the 11th). Avoid share-market gambling (Rahu in the 5th).",
        "Health: June–October needs extra care with digestion and old ailments.",
        "Upay: donate green moong dal on Wednesdays and help students with books.",
      ],
    },

    { type: "h3", text: "Tula rashifal 2027 (Libra horoscope 2027)" },
    {
      type: "p",
      text: "Saturn in your 6th house (one of its best positions) for most of the year, Jupiter in your 11th and 10th, Ketu in your 10th and Rahu in your 4th. Tula is one of the stronger rashis of 2027.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: victory over competitors, good results in government exams and job interviews. June–October (Saturn in the 7th) is good for partnerships and business.",
        "Love / shaadi: June–October brings serious marriage proposals; choose stability over glamour.",
        "Dhan: Jupiter in the 11th (January and July–November) brings gains; loans get repaid. Avoid buying property in a hurry (Rahu in the 4th).",
        "Health: generally good; Saturn in the 6th helps you recover from old illness.",
        "Upay: offer white flowers to Maa Lakshmi on Fridays and keep your home clean and uncluttered.",
      ],
    },

    { type: "h3", text: "Vrishchik rashifal 2027 (Scorpio horoscope 2027)" },
    {
      type: "p",
      text: "Jupiter in your 10th, then your 9th (exalted, luck) from January to June, and your 11th from 26 November. Saturn is in your 5th, and in your 6th (good) from June to October. Rahu is in your 3rd (good) all year.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: one of the luckiest years for Vrishchik — courage (Rahu in the 3rd), luck (Jupiter in the 9th) and victory over rivals. Good for job change, promotion and starting a business.",
        "Love / shaadi: love affairs get serious with Saturn in the 5th; the first half of the year is good for marriage with family blessings.",
        "Dhan: income rises steadily; December 2027 (Jupiter in the 11th) is a strong finish.",
        "Health: good energy; take care of your children's health and studies.",
        "Upay: offer red flowers to Hanuman ji on Tuesdays and donate to a temple or gurukul.",
      ],
    },

    { type: "h3", text: "Dhanu rashifal 2027 (Sagittarius horoscope 2027)" },
    {
      type: "p",
      text: "Saturn is in your 4th (Kantaka Shani dhaiya) except June–October, when it is in your 5th. Jupiter, your rashi lord, is in your 9th, then your 8th from January to June, and your 10th from 26 November. Rahu is in your 2nd and Ketu in your 8th.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: the first half is slow with hidden obstacles; things open up from late June and especially from December (Jupiter in the 10th).",
        "Love / shaadi: June–October improves romance; keep peace at home and with your mother.",
        "Dhan: Rahu in the 2nd brings money from new sources but also loose spending — keep a written budget and avoid lending.",
        "Health: watch chest, heart and stress in the first half; avoid fried food.",
        "Upay: apply a tilak of haldi on Thursdays and feed yellow sweets (besan laddoo) to children.",
      ],
    },

    { type: "h3", text: "Makar rashifal 2027 (Capricorn horoscope 2027)" },
    {
      type: "p",
      text: "Saturn, your rashi lord, is in your 3rd house (excellent) for most of the year and in your 4th (Kantaka dhaiya) from June to October. Jupiter is in your 7th from January to June and your 9th from November. Rahu is on your Moon sign and Ketu in your 7th.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: courage, initiative and self-effort pay off — good for business, media and sales. Rahu on the Moon brings big ambitions; stay ethical.",
        "Love / shaadi: February–June is a strong shaadi yog window with Jupiter (exalted) aspecting your Moon from the 7th. Ketu in the 7th asks you to stay emotionally present with your partner.",
        "Dhan: steady progress; avoid property deals between June and October.",
        "Health: Rahu on the Moon can cause overthinking and anxiety; reduce screen time at night.",
        "Upay: light a sarson oil diya under a peepal tree on Saturdays.",
      ],
    },

    { type: "h3", text: "Kumbh rashifal 2027 (Aquarius horoscope 2027)" },
    {
      type: "p",
      text: "Your Sade Sati is in its last phase (Saturn in the 2nd), with a welcome break from 3 June to 20 October when Saturn is in your 3rd. Jupiter is in your 7th, then your 6th from January to June. Rahu is in your 12th and Ketu in your 6th.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: June–October is your breakthrough window — confidence returns and efforts finally show results. Ketu in the 6th helps you win over competitors.",
        "Love / shaadi: January and July–November (Jupiter in the 7th) are good for marriage and partnerships.",
        "Dhan: expenses on foreign travel or medical needs (Rahu in the 12th); control family spending and avoid standing guarantee for loans.",
        "Health: sleep and eyes need care; a daily walk and pranayam help.",
        "Upay: donate black til and blankets to the needy on Saturdays.",
      ],
    },

    { type: "h3", text: "Meen rashifal 2027 (Pisces horoscope 2027)" },
    {
      type: "p",
      text: "Saturn is on your Moon sign (peak of Sade Sati) except June–October, when it is in your 2nd. Jupiter, your rashi lord, is in your 6th, then exalted in your 5th from January to June, and in your 7th from 26 November. Rahu is in your 11th (gains) all year.",
    },
    {
      type: "ul",
      items: [
        "Career / naukri: despite Sade Sati, Rahu in the 11th brings gains and useful contacts; the first half is excellent for students and for exams.",
        "Love / shaadi: February–June is good for love and for having children; December (Jupiter in the 7th) supports marriage.",
        "Dhan: income grows; June–October asks for discipline with savings and family expenses.",
        "Health: Saturn on the Moon brings fatigue and low mood at times — keep a routine and do not skip check-ups.",
        "Upay: offer chana dal and haldi at a Vishnu temple on Thursdays and chant “Om Gram Greem Graum Sah Gurave Namah”.",
      ],
    },

    { type: "h2", text: "2027 lucky rashi: kis rashi ki kismat chamkegi?" },
    {
      type: "p",
      text: "Judged only by the classical gochar of Saturn, Jupiter and Rahu–Ketu, the most supportive Moon signs in 2027 are:",
    },
    {
      type: "ul",
      items: [
        "Vrishchik (Scorpio): Jupiter in the 9th and 11th, Rahu in the 3rd and Saturn in the 6th from June — luck, courage and victory together.",
        "Tula (Libra): Saturn in the 6th for most of the year plus Jupiter in the 11th — competition, exams and gains.",
        "Makar (Capricorn): Saturn in the 3rd and Jupiter aspecting from the 7th — effort and marriage yog.",
        "Vrishabh (Taurus): only January–May, when Saturn is in the 11th; plan your big moves early.",
        "Kanya (Virgo) and Meen (Pisces): a strong first half from Jupiter, with Ketu (Kanya) or Rahu (Meen) in the 11th.",
      ],
    },
    {
      type: "p",
      text: "Rashis that need more patience are Mesh, Simha and Dhanu (Sade Sati peak or Shani dhaiya), and Kark and Makar need care in relationships because of the Rahu–Ketu axis. Remember that a good dasha can outweigh a hard transit and vice versa — check yours in your [free kundli](/kundli).",
    },

    { type: "h2", text: "Sade Sati 2027 and Shani dhaiya 2027: kin rashiyon par?" },
    {
      type: "p",
      text: "Because Saturn changes sign twice in 2027, the Sade Sati list changes during the year:",
    },
    {
      type: "table",
      head: ["Rashi", "1 Jan – 2 Jun and 20 Oct – 31 Dec 2027 (Shani in Meena)", "3 Jun – 19 Oct 2027 (Shani in Mesh)"],
      rows: [
        ["Kumbh", "Sade Sati – last phase", "Break (Saturn in 3rd)"],
        ["Meen", "Sade Sati – peak", "Sade Sati – last phase"],
        ["Mesh", "Sade Sati – first phase", "Sade Sati – peak"],
        ["Vrishabh", "No Sade Sati", "Sade Sati begins (first phase)"],
        ["Simha", "Ashtama Shani dhaiya", "No dhaiya"],
        ["Kanya", "No dhaiya", "Ashtama Shani dhaiya"],
        ["Dhanu", "Kantaka Shani dhaiya", "No dhaiya"],
        ["Makar", "No dhaiya", "Kantaka Shani dhaiya"],
      ],
    },
    {
      type: "p",
      text: "Kumbh's Sade Sati and the dhaiya of Simha and Dhanu end for good when Saturn settles in Mesh around 23 February 2028. Vrishabh's Sade Sati resumes from then. For phase-wise effects, the full Shani vakri story and free remedies, read our detailed [Shani Sade Sati guide](/blog/shani-sade-sati-2026).",
    },

    { type: "h2", text: "Shaadi and vivah yog 2027" },
    {
      type: "p",
      text: "Jupiter is the main karaka for marriage, so the strongest shaadi windows of 2027 are when Jupiter is exalted (25 January – 26 June) — especially for Kark, Makar, Meen and Vrishchik Moon signs. Many families also avoid fixing wedding muhurats while Jupiter is combust (asta), which is roughly 16 August to 15 September 2027, and during Kharmas (Sun in Dhanu, mid-December to mid-January). Before any rishta is finalised, match both kundlis with the free [kundli milan tool](/matching) and read our [guide to kundli milan online](/blog/kundli-milan-online-free). If Mangal dosha comes up, check your [Manglik status](/manglik) and read what [Manglik dosha really means](/blog/manglik-dosha-meaning) — it is often cancelled.",
    },

    { type: "h2", text: "Rashi anusar upay 2027 (simple remedies)" },
    {
      type: "p",
      text: "The best upay are inexpensive and build the qualities each planet values. Choose one and follow it for at least 40 days:",
    },
    {
      type: "ul",
      items: [
        "For Shani (Mesh, Vrishabh, Kumbh, Meen, Simha, Kanya, Dhanu, Makar): Hanuman Chalisa, a sarson oil diya on Saturdays, daan of black til, urad or blankets, and honest, disciplined work.",
        "For Guru (all rashis, especially Simha and Dhanu): respect teachers and elders, donate books or chana dal on Thursdays, and avoid giving false advice.",
        "For Rahu (Mesh, Mithun, Kark, Makar): avoid shortcuts and intoxicants, feed street dogs, and chant “Om Raam Rahave Namah” on Saturdays.",
        "For Ketu (Kark, Makar, Dhanu): Ganesh puja on Wednesdays, meditation, and donating a blanket to a temple.",
        "For Mangal vakri (January–March): avoid fights and rash driving, and recite the Hanuman Chalisa on Tuesdays.",
        "Gemstones: never wear neelam, gomed or other strong stones only because of a yearly rashifal; get a full chart reading first.",
      ],
    },

    { type: "h2", text: "Get your personal 2027 reading free" },
    {
      type: "p",
      text: "A Moon-sign rashifal is a good starting point, but your personal 2027 depends on your Lagna, your planets' natal strength and your Vimshottari dasha. On Astrojanta you can make your [free Vedic kundli](/kundli), see exactly which house Saturn and Jupiter transit for you, and then ask the [AI astrologer](/ai-astrologer) your 2027 questions in Hindi or English — “2027 mein ghar kharidne ka yog hai?”, “Career change kab karun?”, or “Mera Shani mahadasha kaisa rahega?”. Related reading: [free AI kundli online](/blog/free-ai-kundli-online) and [Budh vakri 2026](/blog/mercury-retrograde-2026).",
    },
  ],
  faqs: [
    {
      q: "Rashifal 2027: saal 2027 kaisa rahega?",
      a: "2027 is a year of big transits. Jupiter is exalted in Kark from 25 January to 26 June, which supports marriage, education and new starts, and Saturn enters Mesh on 3 June, which brings discipline and hard work. The first half is better for beginnings, the second half for consolidation.",
    },
    {
      q: "Shani kis rashi mein jayega 2027 mein?",
      a: "Saturn enters Mesh (Aries) on 3 June 2027, turns vakri on 9 August, returns to Meena (Pisces) on 20 October and enters Mesh for good around 23 February 2028 (sidereal, Lahiri, IST).",
    },
    {
      q: "Guru gochar 2027 kab hai?",
      a: "Jupiter moves back into Kark on 25 January 2027 (retrograde, exalted), turns direct on 13 April, enters Simha on 26 June and enters Kanya on 26 November 2027.",
    },
    {
      q: "Where are Rahu and Ketu in 2027?",
      a: "Rahu is in Makar (Capricorn) and Ketu in Kark (Cancer) for the whole of 2027. They entered these signs on 5 December 2026 (mean node) and stay until around June 2028.",
    },
    {
      q: "Which rashis have Sade Sati in 2027?",
      a: "Kumbh, Meen and Mesh all year (with a break for Kumbh from 3 June to 19 October), and Vrishabh from 3 June to 19 October, when Saturn is in Mesh.",
    },
    {
      q: "Which rashis have Shani dhaiya in 2027?",
      a: "Simha and Dhanu while Saturn is in Meena (January–2 June and from 20 October), and Kanya and Makar while Saturn is in Mesh (3 June–19 October).",
    },
    {
      q: "Which is the luckiest rashi in 2027?",
      a: "By classical gochar rules, Vrishchik (Scorpio) is the most supported, followed by Tula, Makar and, in the first half, Vrishabh, Kanya and Meen. Your own dasha can change this.",
    },
    {
      q: "2027 mein shaadi ke yog kis rashi ke hain?",
      a: "The strongest marriage windows are 25 January – 26 June 2027, when Jupiter is exalted, especially for Kark, Makar, Meen and Vrishchik Moon signs. Always confirm with kundli milan.",
    },
    {
      q: "Should I read rashifal by sun sign or moon sign?",
      a: "Vedic rashifal is read from your Moon sign (Chandra rashi) in the sidereal zodiac. Your Western sun sign is usually different, so find your Moon sign first.",
    },
    {
      q: "Meri rashi kaise pata kare?",
      a: "Enter your date, time and place of birth in a free Moon sign or kundli tool. The sign the Moon was in at your birth is your rashi; it may differ from your naam rashi.",
    },
    {
      q: "Is there a grahan in India in 2027?",
      a: "Yes. The solar eclipse of 2 August 2027 is visible as a partial eclipse across India in the late afternoon (about 3:45–5:50 PM IST, depending on the city). The 2027 lunar eclipses are penumbral, with no sutak.",
    },
    {
      q: "Rashifal kitna sahi hota hai?",
      a: "A rashifal based only on the Moon sign shows general trends shared by about one-twelfth of people. For accurate timing you need your full birth chart, Lagna and dasha.",
    },
  ],
};

const kaalSarpDosh: Post = {
  slug: "kaal-sarp-dosh",
  title: "Kaal Sarp Dosh: 12 Types, How to Check in Kundli & Calm Upay",
  h1: "Kaal Sarp Dosh – Kya Hota Hai, 12 Types, Effects, How to Check in Your Kundli and Upay",
  description:
    "Kaal Sarp Dosh kya hai? Simple English with Hinglish terms: how it forms on the Rahu–Ketu axis, how to check your kundli, the 12 types, lakshan, upay and what the Ujjain and Trimbakeshwar pujas involve.",
  keyword: "kaal sarp dosh",
  author: "founder",
  published: "2026-11-06",
  updated: "2026-11-09",
  intro:
    '"Pandit ji ne kaha meri kundli mein Kaal Sarp Dosh hai — ab kya hoga?" Few phrases in Indian astrology cause as much worry as this one. Kaal Sarp Dosh (also called Kaal Sarp Yog) is said to form when all seven planets sit on one side of the Rahu–Ketu axis in a birth chart. In this guide we explain, in plain language, what Kaal Sarp Dosh is, why it is said to happen, how to check it in your own kundli, the 12 commonly named types including Takshak, the effects people associate with it, and practical upay and nivaran — including what the well-known pujas at Trimbakeshwar and Ujjain actually involve. We also do something many articles skip: we separate what the classical texts say from later, popular practice, so you can make calm, informed decisions instead of fearful ones.',
  body: [
    {
      type: "p",
      text: "Written in plain English, with the Hinglish terms you'll hear from a pandit: yog, lakshan, upay, nivaran.",
    },
    { type: "h2", text: "Kaal Sarp Dosh kya hota hai? (What is Kaal Sarp Dosh)" },
    {
      type: "p",
      text: "In a Vedic birth chart, Rahu and Ketu — the lunar nodes — are always exactly opposite each other, 180° apart. They split the zodiac into two halves. Kaal Sarp Dosh is the popular name for a chart in which the Sun, Moon, Mars, Mercury, Jupiter, Venus and Saturn all fall within one half, between Rahu and Ketu, leaving the other half empty of planets. The image is of a serpent: Rahu as the head (mukh), Ketu as the tail (poonch), with every planet caught inside its body.",
    },
    {
      type: "p",
      text: 'The word "Kaal" means time and also death, and "Sarp" means serpent. That frightening name is a large part of why the combination gets so much attention. Read literally, it simply describes a pattern: the planets\' energy is concentrated on one side of the nodal axis, so Rahu–Ketu themes — desire, obsession, sudden change, detachment, past karma — are said to colour the whole chart. Whether that is good or bad depends on everything else in the kundli.',
    },
    {
      type: "p",
      text: 'You will see it written as Kaal Sarp Dosh, Kalsarp Dosh, Kal Sarp Yog or Kaalsarp Yoga. They all mean the same thing. "Dosh" (flaw) is the term most people use and search for in India; "yog" (combination) is the more neutral word that many traditional astrologers prefer.',
    },

    { type: "h2", text: "Is Kaal Sarp Dosh in the classical texts? An honest answer" },
    {
      type: "p",
      text: "This is worth knowing before you spend money or lose sleep. The idea of Kaal Sarp Dosh as described above — all planets hemmed between Rahu and Ketu — is not named that way in the core classical works such as Brihat Parashara Hora Shastra (BPHS), Brihat Jataka or Saravali. It became widespread through later writers, regional traditions and, especially, popular astrology of the 20th century.",
    },
    {
      type: "p",
      text: "Classical texts do describe a Sarpa yoga, but it is a different thing. Among the Nabhasa yogas, Sarpa yoga forms when malefic planets occupy three kendras (angular houses 1, 4, 7 and 10) and is contrasted with Mala yoga, where benefics occupy them. It has nothing to do with all planets being between the nodes. Some texts also mention Sarpa drekkanas and nakshatra-based snake associations, but none of these is the modern Kaal Sarp Dosh.",
    },
    {
      type: "p",
      text: "So astrologers genuinely disagree. Some treat Kaal Sarp Yog as an important, time-tested observation; others regard it as a later addition that is often exaggerated. Both views exist among serious practitioners. Our approach at Astrojanta, explained on our [methodology page](/about-methodology), is to show you the combination if it is present, explain the tradition behind it, and never treat it as a verdict on your life.",
    },

    { type: "h2", text: "Kaal Sarp Dosh kyu hota hai? (Why does it form)" },
    {
      type: "p",
      text: "Astronomically, there is nothing mysterious about it. Rahu and Ketu move backwards through the zodiac, completing a cycle in about 18.6 years. The slower outer planets — Jupiter and Saturn — spend a year and two and a half years respectively in each sign. When Jupiter and Saturn happen to be on the same side of the nodal axis, the faster planets often join them for weeks or months at a time. During such stretches, everyone born on those days has the pattern. That is why Kaal Sarp Yog is quite common: it appears in a noticeable share of charts, and many successful, happy people have it.",
    },
    {
      type: "p",
      text: "Traditionally, the explanation offered is karmic: Rahu and Ketu represent unfinished karma from past lives, and a chart dominated by the nodal axis is said to carry a strong karmic theme. Some families also link it to ancestral issues (pitru dosh) or to harming snakes in a past life. These are beliefs within the tradition, not facts that can be proven, and you are free to weigh them as you see fit.",
    },

    { type: "h2", text: "How to check Kaal Sarp Dosh in your kundli" },
    {
      type: "p",
      text: "You need an accurate birth chart, which means your correct date, time and place of birth. Then check these steps:",
    },
    {
      type: "ul",
      items: [
        "Find the houses (or exact degrees) of Rahu and Ketu. They will always be opposite each other — for example Rahu in the 4th house and Ketu in the 10th.",
        "Look at the seven planets: Sun, Moon, Mars, Mercury, Jupiter, Venus and Saturn. Uranus, Neptune and Pluto are not used in Vedic astrology.",
        "If all seven lie within the arc going from Rahu to Ketu (or all within the arc from Ketu to Rahu), the chart has Kaal Sarp Yog.",
        "If even one planet is outside that half, most astrologers say there is no full Kaal Sarp Dosh. Some call it a partial (aanshik) Kaal Sarp Yog, but many traditions do not count it at all.",
        "Many astrologers also check degrees: if a planet sits in the same sign as Rahu or Ketu but at a degree outside the arc, the pattern is considered broken.",
      ],
    },
    {
      type: "p",
      text: "The quickest way to do this is a reliable chart. Generate your [free kundli](/kundli) with Lahiri ayanamsa calculations, look at where Rahu and Ketu sit, and count the planets on each side. If you want an explanation in Hindi or Hinglish, our [AI astrologer](/ai-astrologer) can read your chart and tell you whether the pattern is present and how other factors modify it.",
    },
    {
      type: "p",
      text: 'A word on any "kaal sarp dosh calculator" online: the check itself is simple and mechanical, so any accurate chart will give the same result. What a calculator cannot do is judge severity. That depends on the Lagna, the strength of the Lagna lord, aspects from benefics like Jupiter, the running dasha, and much more. Be careful of tools or people who announce the dosh and immediately ask for an expensive puja.',
    },

    { type: "h2", text: "Types of Kaal Sarp Dosh (12 prakar)" },
    {
      type: "p",
      text: "In popular tradition, Kaal Sarp Yog is divided into 12 types based on the house Rahu occupies, counted from the Lagna (ascendant). Ketu is always in the seventh house from Rahu. The names come from the great serpents (nagas) of Indian mythology. These names and the themes linked to them come from later practice, not from BPHS, so treat them as a descriptive framework rather than scripture.",
    },
    {
      type: "table",
      head: ["Type", "Rahu – Ketu houses", "Life areas commonly linked"],
      rows: [
        ["Anant Kaal Sarp", "1st – 7th", "Self, health, confidence, partnerships"],
        ["Kulik Kaal Sarp", "2nd – 8th", "Family, speech, savings, sudden events"],
        ["Vasuki Kaal Sarp", "3rd – 9th", "Siblings, courage, luck, father"],
        ["Shankhpal Kaal Sarp", "4th – 10th", "Mother, home, property, career"],
        ["Padma Kaal Sarp", "5th – 11th", "Children, education, gains, friends"],
        ["Mahapadma Kaal Sarp", "6th – 12th", "Health, debts, enemies, expenses"],
        ["Takshak Kaal Sarp", "7th – 1st", "Marriage, partnerships, business"],
        ["Karkotak Kaal Sarp", "8th – 2nd", "Longevity themes, inheritance, family finances"],
        ["Shankhachud Kaal Sarp", "9th – 3rd", "Fortune, dharma, father, long travel"],
        ["Ghatak Kaal Sarp", "10th – 4th", "Career, status, domestic peace"],
        ["Vishdhar Kaal Sarp", "11th – 5th", "Gains, elder siblings, children"],
        ["Sheshnag Kaal Sarp", "12th – 6th", "Expenses, sleep, foreign lands, disputes"],
      ],
    },
    { type: "h3", text: "Takshak Kaal Sarp Dosh" },
    {
      type: "p",
      text: "Takshak Kaal Sarp Dosh is one of the most searched types. It forms when Rahu is in the 7th house and Ketu in the 1st, with all planets on one side. Because the 7th house governs marriage and partnerships, it is commonly linked with delays in shaadi, misunderstandings with a spouse or business partner, or a tendency to choose unconventional partners. In practice, a 7th-house Rahu is judged together with Venus, the 7th lord and the Navamsa (D9) chart — if those are strong, marriage can be perfectly happy. Before drawing conclusions about Takshak, it is far more useful to look at proper [kundli matching](/matching) than at the yog alone.",
    },
    { type: "h3", text: "Udit and Anudit (ascending and descending)" },
    {
      type: "p",
      text: 'Some astrologers also distinguish by direction. If the planets lie in the arc that Rahu is moving towards (Rahu leading them, the "mouth" of the serpent swallowing the chart), it is called Udit or ascending Kaal Sarp; if they lie behind Rahu, towards Ketu, some call it Anudit or descending, and a few traditions call this second version Kaal Amrit Yog and treat it as milder or even positive. Conventions differ between schools, so do not be alarmed if two astrologers label the same chart differently.',
    },

    { type: "h2", text: "Which Kaal Sarp Dosh is most dangerous?" },
    {
      type: "p",
      text: 'This is one of the most common questions, and the honest answer is that no type is dangerous by name. Popular articles often single out Takshak (marriage), Ghatak (career and home), Sheshnag and Karkotak as the "most dangerous" because the houses involved — the 7th, 10th, 8th and 12th — deal with sensitive areas of life. But a 12-row table cannot tell you how your life will go.',
    },
    {
      type: "p",
      text: 'What actually changes the impact, according to the astrologers who take the yog seriously, is: whether Rahu and Ketu are conjunct or aspected by benefics, especially Jupiter; whether the Lagna and Lagna lord are strong; whether the Moon is afflicted; and whether you are running a Rahu or Ketu mahadasha or antardasha. A chart with a strong Lagna lord and a well-placed Jupiter is generally described as handling any Kaal Sarp Yog well. So instead of asking "which type is most dangerous", ask "how strong is the rest of my chart, and what dasha am I in?"',
    },

    { type: "h2", text: "Kaal Sarp Dosh ke lakshan and effects" },
    {
      type: "p",
      text: "The effects associated with Kaal Sarp Dosh in popular astrology are broad, and it is important to read them calmly. Many of these experiences are part of ordinary human life and can have many causes. Astrologers who use the yog commonly mention:",
    },
    {
      type: "ul",
      items: [
        "Effort that seems to take longer than expected to pay off — success often described as coming after a struggle or later in life.",
        "Sudden ups and downs in career or money, with periods of rapid progress followed by setbacks.",
        "Delays or friction in marriage, depending on the houses involved.",
        "Restlessness, anxiety or a sense of being held back, especially during Rahu or Ketu dasha.",
        "Recurring dreams of snakes, water or falling, which some people report — though dreams are not a reliable diagnostic.",
        "On the positive side: strong drive, unusual talents, resilience, and the ability to rise dramatically. Many famous and successful people have charts with this pattern.",
      ],
    },
    {
      type: "p",
      text: "If you are going through a hard phase, please do not assume Kaal Sarp Dosh is the cause. It is often more helpful to check your current dasha and transits — for example, whether you are in [Shani Sade Sati](/blog/shani-sade-sati-2026) — and to take practical steps in parallel. For health, money or relationship problems, a doctor, financial adviser or counsellor should always come first; astrology can at best be a supportive lens.",
    },

    { type: "h2", text: "Kaal Sarp Dosh ke upay (remedies) and nivaran" },
    {
      type: "p",
      text: "Remedies for Kaal Sarp Dosh range from simple daily practices to formal pujas. You do not need to spend large sums of money. Traditional, low-cost upay include:",
    },
    {
      type: "ul",
      items: [
        'Chanting "Om Namah Shivaya" daily, or the Maha Mrityunjaya mantra, since Lord Shiva — who wears the serpent Vasuki — is considered the protector against Rahu–Ketu afflictions.',
        "Offering water or milk on a Shivling on Mondays, especially during Shravan month and on Nag Panchami.",
        'Reciting the Rahu mantra "Om Raam Rahave Namah" or the Ketu mantra "Om Kem Ketave Namah", 108 times, on Saturdays or Tuesdays as your tradition suggests.',
        "Worshipping Lord Ganesha (for Ketu) and Goddess Durga (for Rahu), or reciting the Hanuman Chalisa.",
        "Feeding birds, dogs or the needy, and donating to people who need it — many astrologers consider sincere seva the best remedy for any graha dosh.",
        "Keeping a disciplined routine, avoiding intoxicants and shortcuts, and staying patient — traits that help with any Rahu-dominant period.",
      ],
    },
    {
      type: "p",
      text: "Avoid wearing gemstones like gomed (hessonite) or lehsunia (cat's eye) simply because someone mentioned Kaal Sarp Dosh. Rahu and Ketu stones can intensify the nodes, and should only be considered after a full chart analysis — many careful astrologers advise against them for this purpose.",
    },

    { type: "h2", text: "Kaal Sarp Dosh puja: Trimbakeshwar, Ujjain and others" },
    {
      type: "p",
      text: "A Kaal Sarp Dosh nivaran puja is a formal Vedic ritual, usually involving Rahu–Ketu shanti, Nag puja with silver serpent idols, and offerings to Lord Shiva. It is performed by priests at temples, and many families choose it for peace of mind. The best-known places are:",
    },
    {
      type: "ul",
      items: [
        "Trimbakeshwar (near Nashik, Maharashtra) — a Jyotirlinga temple at the source of the Godavari, widely associated with Kaal Sarp shanti and Narayan Nagbali rituals.",
        "Ujjain (Madhya Pradesh) — home of the Mahakaleshwar Jyotirlinga; Kaal Sarp Dosh pujas are commonly performed in the city, including near the Kshipra river and at Siddhavat.",
        "Srikalahasti (Andhra Pradesh) — the Srikalahasteeswara temple is especially known for Rahu–Ketu puja in South India.",
        "Many families also perform the puja at a local Shiva temple, which tradition considers equally valid when done with sincerity.",
      ],
    },
    {
      type: "p",
      text: "Pujas are often scheduled on Nag Panchami, Amavasya, Mahashivratri or during Shravan, and typically take a few hours. Costs vary widely, so ask for a clear breakdown in advance and only work with recognised temple priests. A puja is a personal, devotional choice — it is not compulsory, and nobody should pressure you into it with fear. Astrojanta does not sell pujas or take any commission from them.",
    },

    { type: "h2", text: "Kaal Sarp Dosh and marriage, Manglik and other doshas" },
    {
      type: "p",
      text: "Kaal Sarp Dosh is often mentioned in the same breath as Manglik Dosha during rishta discussions. They are completely separate: Manglik Dosha is about Mars in certain houses, and you can check it with our free [Manglik calculator](/manglik) or read our guide to [Manglik dosha meaning](/blog/manglik-dosha-meaning). For marriage, Kaal Sarp Dosh is not part of the traditional Ashtakoota Guna Milan, and most astrologers do not treat it as a reason to reject a match on its own. A full [kundli milan](/matching) that looks at both charts, the 7th house and the dasha periods is far more meaningful.",
    },

    { type: "h2", text: "Does Kaal Sarp Dosh last for life?" },
    {
      type: "p",
      text: "The pattern in your birth chart does not change, but astrologers who use it generally agree that its influence is not constant. It is said to be felt most during Rahu or Ketu mahadasha or antardasha, and during major Rahu–Ketu transits over natal planets. Several traditions also say its effects ease after a certain age — commonly cited as around 42 to 48 — although this varies between schools. Knowing your current dasha is therefore more useful than worrying about the yog in general. Your [free kundli](/kundli) shows your full Vimshottari dasha timeline, and you can find your Chandra rashi with the [Moon sign finder](/moon-sign).",
    },

    { type: "h2", text: "The bottom line" },
    {
      type: "p",
      text: "Kaal Sarp Dosh is a popular, later-tradition combination in which all planets sit on one side of the Rahu–Ketu axis. It is common, it is not named that way in BPHS, and its effects — if you follow the tradition — depend heavily on the rest of the chart and your running dasha. Check it calmly in an accurate kundli, choose simple upay that bring you peace, treat any puja as a personal devotional choice, and keep putting in honest effort. If you would like a personalised explanation, ask our [AI astrologer](/ai-astrologer) in Hindi, Hinglish or English — it reads your actual chart rather than giving a one-size-fits-all verdict.",
    },
  ],
  faqs: [
    {
      q: "Kaal Sarp Dosh kya hota hai?",
      a: "Kaal Sarp Dosh is the popular name for a birth chart in which all seven planets, from the Sun to Saturn, lie on one side of the Rahu–Ketu axis. It is also called Kaal Sarp Yog.",
    },
    {
      q: "Is Kaal Sarp Dosh mentioned in Brihat Parashara Hora Shastra?",
      a: "Not under that name. BPHS describes a Nabhasa Sarpa yoga, which is about malefics in three kendras. The idea of all planets hemmed between Rahu and Ketu comes from later and popular tradition.",
    },
    {
      q: "How can I check Kaal Sarp Dosh in my kundli?",
      a: "Generate an accurate chart, note the houses or degrees of Rahu and Ketu, and see whether all seven planets fall within one half between them. If even one planet is outside, there is no full Kaal Sarp Dosh.",
    },
    {
      q: "How many types of Kaal Sarp Dosh are there?",
      a: "Popular tradition names 12 types by Rahu's house from the Lagna: Anant, Kulik, Vasuki, Shankhpal, Padma, Mahapadma, Takshak, Karkotak, Shankhachud, Ghatak, Vishdhar and Sheshnag.",
    },
    {
      q: "Which Kaal Sarp Dosh is most dangerous?",
      a: "No type is dangerous by name. Takshak, Ghatak, Karkotak and Sheshnag are often called the hardest because of the houses involved, but the real impact depends on the Lagna lord, Jupiter's influence and your running dasha.",
    },
    {
      q: "What is Takshak Kaal Sarp Dosh?",
      a: "It forms when Rahu is in the 7th house and Ketu in the 1st with all planets on one side. It is commonly linked to marriage and partnership themes, judged together with Venus, the 7th lord and the Navamsa.",
    },
    {
      q: "What are the simple upay for Kaal Sarp Dosh?",
      a: "Daily Om Namah Shivaya or the Maha Mrityunjaya mantra, water or milk on a Shivling on Mondays, Rahu and Ketu mantras, Hanuman Chalisa, and regular seva and donation to the needy.",
    },
    {
      q: "Where is Kaal Sarp Dosh puja done?",
      a: "The best-known places are Trimbakeshwar near Nashik, Ujjain in Madhya Pradesh and Srikalahasti in Andhra Pradesh. Many families also perform it at a local Shiva temple. A puja is optional, not compulsory.",
    },
    {
      q: "Does Kaal Sarp Dosh affect marriage?",
      a: "It is not part of Ashtakoota Guna Milan, and most astrologers do not reject a match because of it alone. A full kundli milan that studies the 7th house and dasha periods is far more reliable.",
    },
    {
      q: "Does Kaal Sarp Dosh last for the whole life?",
      a: "The pattern stays in the birth chart, but its influence is said to be strongest during Rahu or Ketu dasha and to ease with age. It is not a permanent sentence of bad luck.",
    },
  ],
};

const nadiDosha: Post = {
  slug: "nadi-dosha",
  title: "Nadi Dosha in Kundli Milan: Meaning, 27 Nakshatra Table & Parihar",
  h1: "Nadi Dosha – Kya Hota Hai, Adi/Madhya/Antya Nadi, Nakshatra Table, Cancellation and What to Check Before Shaadi",
  description:
    "Nadi Dosha kya hai? A simple English guide with Hinglish terms: same nadi = 0 of 8 gun, the Adi/Madhya/Antya nakshatra table, parihar and what to check before shaadi.",
  keyword: "nadi dosha",
  author: "founder",
  published: "2026-11-07",
  updated: "2026-11-09",
  intro: "\"Gun to 26 mil gaye, par Nadi mein zero hai — ab kya karein?\" In shaadi season, this is one of the most common worries in Indian families. Nadi Dosha is the single biggest deduction in kundli milan, and its traditional link with health and children makes it sound frightening. In this guide we explain what Nadi Dosha actually is, the three nadis — Adi, Madhya and Antya — with a complete, checked table of all 27 nakshatras, how to check it in your own kundli matching, the classical exceptions under which it is considered cancelled, and what a sensible family should really look at before deciding. No fear, no upsell — just the rules, and how to read them.",
  body: [
    {
      type: "p",
      text: "This guide is in simple English, using the Hinglish words families and pandits actually use: gun, nadi, parihar, shaadi.",
    },
    {
      type: "h2",
      text: "Nadi Dosha kya hota hai? (What is Nadi Dosha)",
    },
    {
      type: "p",
      text: "In kundli milan, the bride's and groom's Moon nakshatras are compared through eight kootas, together called Ashtakoota Guna Milan. The kootas add up to 36 gun. Nadi is the eighth and heaviest of them: it carries 8 of the 36 points on its own. Every one of the 27 nakshatras belongs to one of three nadis — Adi, Madhya or Antya. If the two Moon nakshatras fall in different nadis, Nadi koota gives the full 8 points. If they fall in the same nadi, it gives 0. That zero is what people call Nadi Dosha (also written Nadi Dosh or Ek Nadi Dosha).",
    },
    {
      type: "p",
      text: "So, at its simplest, Nadi Dosha is not a mysterious curse. It is one line in a scoring table: same nadi, 0 out of 8. Because those 8 points are such a large slice of 36, a same-nadi pair can lose almost a quarter of the total in one go, which is why the result jumps out at families and pandits. If you are new to the whole gun milan system, our [kundli milan online free guide](/blog/kundli-milan-online-free) explains all eight kootas and what score is generally considered good.",
    },
    {
      type: "p",
      text: "One quick clarification, because the word causes confusion. In Ayurveda, nadi usually means the pulse (nadi pariksha) or the channels of the body, and in yoga it refers to subtle energy channels like ida and pingala. Nadi koota in gun milan is a different idea: it is a classification of the 27 nakshatras into three groups for marriage matching. It is not a pulse reading and does not test anyone's health.",
    },
    {
      type: "p",
      text: "Also note: there are \"Nadi astrology\" palm-leaf traditions in Tamil Nadu (Nadi jothidam). Those are unrelated to Nadi koota as well. When someone says \"kundli mein Nadi Dosha hai\", they always mean the eighth koota in Ashtakoota matching.",
    },
    {
      type: "h2",
      text: "Adi, Madhya aur Antya: the 3 nadis",
    },
    {
      type: "p",
      text: "The three nadis are named for beginning, middle and end — Adi (aadi, first), Madhya (middle) and Antya (last). In popular explanations they are linked with the three Ayurvedic doshas: Adi with Vata, Madhya with Pitta and Antya with Kapha. This is the commonly repeated mapping in Indian matching books and websites. It is best understood as a traditional symbolic association, not a medical test: having Adi nadi does not mean a person has a Vata body type, and two people with the same nadi are not \"medically incompatible\".",
    },
    {
      type: "ul",
      items: [
        "Adi nadi (popularly linked with Vata): Ashwini, Ardra, Punarvasu, Uttara Phalguni, Hasta, Jyeshtha, Mula, Shatabhisha, Purva Bhadrapada.",
        "Madhya nadi (popularly linked with Pitta): Bharani, Mrigashira, Pushya, Purva Phalguni, Chitra, Anuradha, Purva Ashadha, Dhanishta, Uttara Bhadrapada.",
        "Antya nadi (popularly linked with Kapha): Krittika, Rohini, Ashlesha, Magha, Swati, Vishakha, Uttara Ashadha, Shravana, Revati.",
      ],
    },
    {
      type: "p",
      text: "Each nadi has exactly nine nakshatras. The pattern is easy to remember once you see it: going through the nakshatras in order, the nadis run Adi, Madhya, Antya, then reverse — Antya, Madhya, Adi — and keep zig-zagging. That is why Madhya always sits in the middle of each group of three.",
    },
    {
      type: "h2",
      text: "Nakshatra se Nadi kaise jaane: all 27 nakshatras table",
    },
    {
      type: "p",
      text: "Find your Moon nakshatra (janma nakshatra) in the table below. If you do not know it, generate your free [kundli](/kundli) with date, time and place of birth — the Moon nakshatra is shown there. This mapping is exactly the one Astrojanta's [kundli matching tool](/matching) uses, and it agrees with standard published Ashtakoota tables.",
    },
    {
      type: "table",
      head: [
        "#",
        "Nakshatra",
        "Nadi",
        "Moon sign (rashi)",
      ],
      rows: [
        [
          "1",
          "Ashwini",
          "Adi",
          "Aries (Mesh)",
        ],
        [
          "2",
          "Bharani",
          "Madhya",
          "Aries (Mesh)",
        ],
        [
          "3",
          "Krittika",
          "Antya",
          "Aries / Taurus",
        ],
        [
          "4",
          "Rohini",
          "Antya",
          "Taurus (Vrishabh)",
        ],
        [
          "5",
          "Mrigashira",
          "Madhya",
          "Taurus / Gemini",
        ],
        [
          "6",
          "Ardra",
          "Adi",
          "Gemini (Mithun)",
        ],
        [
          "7",
          "Punarvasu",
          "Adi",
          "Gemini / Cancer",
        ],
        [
          "8",
          "Pushya",
          "Madhya",
          "Cancer (Kark)",
        ],
        [
          "9",
          "Ashlesha",
          "Antya",
          "Cancer (Kark)",
        ],
        [
          "10",
          "Magha",
          "Antya",
          "Leo (Simha)",
        ],
        [
          "11",
          "Purva Phalguni",
          "Madhya",
          "Leo (Simha)",
        ],
        [
          "12",
          "Uttara Phalguni",
          "Adi",
          "Leo / Virgo",
        ],
        [
          "13",
          "Hasta",
          "Adi",
          "Virgo (Kanya)",
        ],
        [
          "14",
          "Chitra",
          "Madhya",
          "Virgo / Libra",
        ],
        [
          "15",
          "Swati",
          "Antya",
          "Libra (Tula)",
        ],
        [
          "16",
          "Vishakha",
          "Antya",
          "Libra / Scorpio",
        ],
        [
          "17",
          "Anuradha",
          "Madhya",
          "Scorpio (Vrishchik)",
        ],
        [
          "18",
          "Jyeshtha",
          "Adi",
          "Scorpio (Vrishchik)",
        ],
        [
          "19",
          "Mula",
          "Adi",
          "Sagittarius (Dhanu)",
        ],
        [
          "20",
          "Purva Ashadha",
          "Madhya",
          "Sagittarius (Dhanu)",
        ],
        [
          "21",
          "Uttara Ashadha",
          "Antya",
          "Sagittarius / Capricorn",
        ],
        [
          "22",
          "Shravana",
          "Antya",
          "Capricorn (Makar)",
        ],
        [
          "23",
          "Dhanishta",
          "Madhya",
          "Capricorn / Aquarius",
        ],
        [
          "24",
          "Shatabhisha",
          "Adi",
          "Aquarius (Kumbh)",
        ],
        [
          "25",
          "Purva Bhadrapada",
          "Adi",
          "Aquarius / Pisces",
        ],
        [
          "26",
          "Uttara Bhadrapada",
          "Madhya",
          "Pisces (Meen)",
        ],
        [
          "27",
          "Revati",
          "Antya",
          "Pisces (Meen)",
        ],
      ],
    },
    {
      type: "p",
      text: "Where a nakshatra spans two signs (for example Krittika, which begins in Aries and ends in Taurus), the rashi depends on which pada the Moon was in. That detail matters for the cancellation rules below, because some exceptions depend on whether the Moon signs are the same or different.",
    },
    {
      type: "h2",
      text: "Kundli matching mein Nadi Dosha kaise check karein",
    },
    {
      type: "p",
      text: "You only need the two Moon nakshatras. The steps are simple:",
    },
    {
      type: "ul",
      items: [
        "Get both birth details — date, exact time and place of birth for the boy and the girl. Birth time matters, because the Moon moves about one nakshatra a day and can change nakshatra within hours.",
        "Open the [free kundli matching tool](/matching) and enter both sets of details. It calculates each person's Moon sign and nakshatra and scores all eight kootas.",
        "Look at the Nadi row. 8/8 means different nadis — no Nadi Dosha. 0/8 means same nadi, and the tool will flag Nadi dosha.",
        "If Nadi shows 0, do not stop there. Note both nakshatras, both Moon signs and, if you can, both padas, then check the exceptions in the next section.",
      ],
    },
    {
      type: "p",
      text: "How Astrojanta's tool handles it, honestly: the tool scores Nadi in the standard raw way — same nadi gives 0, different nadis give 8 — and shows a Nadi dosha caution. It does not automatically apply the classical cancellation rules. That is a deliberate, conservative choice, because different schools apply those exceptions differently. So if your result shows Nadi dosha, read the exceptions below and look at both full charts before drawing any conclusion. Our [methodology page](/about-methodology) explains how the calculations are done.",
    },
    {
      type: "h2",
      text: "Nadi Dosha cancellation: when is it considered cancelled? (Nadi Dosha parihar)",
    },
    {
      type: "p",
      text: "This is the part most families most need to know, and the part fear-based articles often bury. Classical matching tradition — the rules are commonly associated with Muhurta texts such as Muhurta Chintamani — gives clear exceptions where the same nadi is not treated as a dosha. The three most widely cited are:",
    },
    {
      type: "ul",
      items: [
        "Same Moon sign (rashi), different nakshatras. Example: both Moons in Taurus, one in Krittika and one in Rohini — both Antya nadi, but the dosha is commonly considered cancelled.",
        "Same nakshatra, different Moon signs. This is possible only for nakshatras that span two signs, such as Krittika, Mrigashira, Punarvasu, Uttara Phalguni, Chitra, Vishakha, Uttara Ashadha, Dhanishta and Purva Bhadrapada. Example: one Moon in Krittika in Aries and the other in Krittika in Taurus.",
        "Same nakshatra, different padas (charanas). Each nakshatra has four padas. When both Moons are in the same nakshatra but in different quarters, many astrologers consider Nadi Dosha cancelled.",
      ],
    },
    {
      type: "p",
      text: "Beyond these three, practice varies. Some traditions also reduce or set aside Nadi Dosha when the lords of the two Moon signs are the same planet or natural friends, or when other strong agreement exists between the charts. Some lineages list particular nakshatras for which a same-nadi pairing is treated more leniently, and some regional customs say Nadi koota matters most within particular communities. Others are stricter — for example, some do not accept the same-nakshatra-different-pada exception for every nakshatra. There is no single rulebook followed by every pandit in India.",
    },
    {
      type: "p",
      text: "Practically, that means two things. First, a 0 in Nadi is a reason to look closer, not a final verdict. Second, if you consult a family priest or astrologer, ask which exception they are applying and why. A calm, specific answer is a good sign; a vague answer followed by an expensive puja is not.",
    },
    {
      type: "h2",
      text: "Nadi Dosha ke effects: what people worry about, calmly explained",
    },
    {
      type: "p",
      text: "Traditionally, Nadi koota is linked with health, constitution and progeny (santaan). That is why, when Nadi Dosha shows up, relatives often say things like \"bachchon mein dikkat hogi\", \"health issues aayenge\" or \"shaadi nahi karni chahiye\". It helps to separate what the tradition says from what it does not.",
    },
    {
      type: "ul",
      items: [
        "The tradition treats same nadi as a caution about harmony of constitution and about children. It is a classical concern, and it is reasonable to respect it as part of matching.",
        "It does not prove anything about fertility, genetics or the health of future children. Kundli matching is not a medical test. If you have real health or fertility questions, the right person to ask is a doctor, and the same is true for every couple, matched or not.",
        "It is one koota out of eight. Many couples with Nadi Dosha have long, happy marriages and healthy children; many couples with 8/8 in Nadi face difficulties. Astrology at its best describes tendencies, not guarantees.",
      ],
    },
    {
      type: "p",
      text: "Our view at Astrojanta is simple: a match should not be rejected on Nadi alone. Equally, Nadi Dosha should not be waved away without looking at the charts. Look at the exceptions, the overall score and the individual kundlis — then decide as a family, with the couple's own wishes at the centre.",
    },
    {
      type: "h2",
      text: "Same nadi marriage: what should you actually check?",
    },
    {
      type: "p",
      text: "If your match shows same nadi and no clear exception applies, here is what an experienced astrologer will usually look at before giving an opinion. You can see many of these yourself in a free [kundli](/kundli):",
    },
    {
      type: "ul",
      items: [
        "Overall gun score. Nadi is 8 of 36. A pair with 26–28 gun even after losing Nadi is in a very different position from one at 14. See our [gun milan guide](/blog/kundli-milan-online-free) for score ranges.",
        "The 7th house and its lord in each chart. The 7th house describes marriage and partnership; its strength and the planets aspecting it matter far more than one koota.",
        "Venus (Shukra) and, for the bride, Jupiter (Guru) in traditional reading. These are the natural significators of marriage and the spouse.",
        "The Navamsa (D9) chart. Many astrologers consider the D9 essential for marriage; a strong Navamsa can outweigh a weak koota score.",
        "The 5th house, for children. Since Nadi is linked with progeny, a careful astrologer checks the 5th house and its lord in both charts rather than relying on Nadi alone.",
        "Running dasha (Vimshottari) at and after marriage. Timing often explains more about early married life than matching scores.",
        "Manglik status — checked separately (more on that below).",
      ],
    },
    {
      type: "p",
      text: "If you want to talk through a specific result in plain language, you can ask our [AI astrologer](/ai-astrologer) to explain the full matching report and both charts. Treat it as an explanation, not a verdict, and involve a trusted family astrologer for the final view if that is your family's custom.",
    },
    {
      type: "h2",
      text: "Nadi aur baaki koots: Varna, Gana, Bhakoot and Manglik",
    },
    {
      type: "p",
      text: "Nadi sits alongside seven other kootas. Varna (1 point) looks at spiritual temperament and is explained in our [Varna Koota guide](/blog/varna-koota-meaning). Gana (6 points) compares the Deva, Manushya and Rakshasa nature of the two nakshatras. Bhakoot (7 points) compares the two Moon signs; a zero there is called Bhakoot Dosha, and it also has its own traditional exceptions. Nadi and Bhakoot together carry 15 of 36 points, which is why these two are the ones pandits mention most often.",
    },
    {
      type: "p",
      text: "Interestingly, the koots are linked: many astrologers say a strong Nadi score can ease a Bhakoot problem, and a same-rashi pairing (which affects Bhakoot) is also one of the main Nadi exceptions. This is another reason not to read any single koota in isolation.",
    },
    {
      type: "p",
      text: "Manglik Dosha is separate. It is not one of the eight Ashtakoota kootas; it comes from Mars's placement in each person's own chart. A match can have no Nadi Dosha and still need a Manglik check, or vice versa. You can check it with our free [Manglik tool](/manglik), and read the calm explanation in [Manglik Dosha meaning](/blog/manglik-dosha-meaning).",
    },
    {
      type: "h2",
      text: "Nadi Dosha upay: simple, optional notes",
    },
    {
      type: "p",
      text: "Because Nadi Dosha is so feared, it is also one of the most heavily marketed \"problems\" in online astrology. You do not need to buy anything because of a 0 in Nadi. If your family wants to observe a remedy, these are the traditional and low-cost options people commonly follow:",
    },
    {
      type: "ul",
      items: [
        "Check the exceptions first. Many \"Nadi Dosha\" cases are already considered cancelled under the rules above, and no remedy is needed at all.",
        "Follow your own family or community tradition. Some families ask the family priest to perform a simple Nadi dosha shanti or a Maha Mrityunjaya jaap at home or in a local temple; others do nothing. Both are legitimate choices.",
        "Daan (charity) and seva given with sincerity — food, clothing or help to people who need it — is the remedy most traditions agree on, and it costs only what you choose to give.",
        "Prayer that is meaningful to you, such as the Maha Mrityunjaya mantra or regular worship together as a couple.",
      ],
    },
    {
      type: "p",
      text: "Be cautious of anyone who says a particular paid puja, a gemstone or a costly ritual is compulsory, or who uses fear about children to push a sale. A genuine astrologer will explain the exception rules and the whole chart before talking about remedies, and will accept that the decision is yours.",
    },
    {
      type: "h2",
      text: "Bottom line",
    },
    {
      type: "p",
      text: "Nadi Dosha simply means both Moon nakshatras fall in the same nadi, so Nadi koota scores 0 out of 8 in gun milan. It is taken seriously in Indian tradition because of its link with health and progeny, but it is one koota among eight, it has well-known cancellation rules, and it says nothing medical about any couple. Find both nakshatras, check the exceptions, look at the overall score, the 7th house, Venus, the Navamsa and the dasha — and do not reject a good rishta on Nadi alone. Start by running both charts through the [free kundli matching tool](/matching).",
    },
  ],
  faqs: [
    {
      q: "Nadi Dosha kya hota hai?",
      a: "Nadi Dosha is when the bride's and groom's Moon nakshatras fall in the same nadi — Adi, Madhya or Antya. Nadi koota then scores 0 out of 8 in Ashtakoota gun milan instead of the full 8 points.",
    },
    {
      q: "How many points is Nadi in kundli matching?",
      a: "Nadi is worth 8 of the 36 gun — the most of any koota. Different nadis give 8 points and the same nadi gives 0; there is no in-between score.",
    },
    {
      q: "Which nakshatras are Adi, Madhya and Antya nadi?",
      a: "Adi: Ashwini, Ardra, Punarvasu, Uttara Phalguni, Hasta, Jyeshtha, Mula, Shatabhisha, Purva Bhadrapada. Madhya: Bharani, Mrigashira, Pushya, Purva Phalguni, Chitra, Anuradha, Purva Ashadha, Dhanishta, Uttara Bhadrapada. Antya: Krittika, Rohini, Ashlesha, Magha, Swati, Vishakha, Uttara Ashadha, Shravana, Revati.",
    },
    {
      q: "When is Nadi Dosha cancelled?",
      a: "The commonly cited exceptions are: same Moon sign but different nakshatras; same nakshatra but different Moon signs; and same nakshatra but different padas. Some traditions also ease it when the Moon-sign lords are the same or friends. Schools differ, so check with the full charts.",
    },
    {
      q: "Can we marry with same nadi?",
      a: "Yes, many couples with the same nadi marry and live happily. A match should not be rejected on Nadi alone; look at the exceptions, the overall gun score and both full kundlis before deciding.",
    },
    {
      q: "Does Nadi Dosha cause problems with children?",
      a: "Tradition links Nadi koota with progeny, but kundli matching is not a medical test and cannot predict fertility or a child's health. For real health questions, consult a doctor.",
    },
    {
      q: "Is Nadi in gun milan the same as nadi (pulse) in Ayurveda?",
      a: "No. Ayurvedic nadi refers to the pulse or body channels. Nadi koota is a grouping of the 27 nakshatras into three classes for marriage matching. The Vata–Pitta–Kapha link is a popular symbolic mapping.",
    },
    {
      q: "Does Astrojanta's matching tool apply Nadi Dosha cancellation?",
      a: "No. The tool scores Nadi the standard raw way — same nadi is 0, different is 8 — and flags Nadi dosha. It does not auto-apply exceptions, because schools differ. Use the cancellation rules in this guide alongside your result.",
    },
    {
      q: "Is Manglik Dosha part of Nadi or gun milan?",
      a: "No. Manglik Dosha comes from Mars's placement in each person's own chart and is checked separately from the eight Ashtakoota kootas.",
    },
    {
      q: "Is a puja compulsory for Nadi Dosha?",
      a: "No. Many cases are already cancelled by the exception rules. If your family wishes, a simple shanti or Maha Mrityunjaya jaap through your family priest, or sincere daan, is traditional; no paid ritual is required.",
    },
  ],
};

const vimshottariMahadasha: Post = {
  slug: "vimshottari-mahadasha",
  title: "Vimshottari Mahadasha: Order, Periods, Antardasha & How to Check",
  h1: "Vimshottari Mahadasha – Mahadasha, Antardasha Kya Hai, 9 Grahon ke Saal, Order and How to Check Your Current Dasha",
  description:
    "Mahadasha kya hai? A plain-English guide with Hinglish terms: the 120-year Vimshottari order, each graha's years, antardasha, how to find your current dasha in kundli, and calm notes on Shani, Rahu, Guru and Shukra.",
  keyword: "mahadasha",
  author: "founder",
  published: "2026-11-08",
  updated: "2026-11-09",
  intro: "\"Meri Shani ki mahadasha chal rahi hai — kya sab kharab hoga?\" \"Rahu ki dasha kab khatam hogi?\" Questions like these come up in almost every Indian family that looks at a kundli. Mahadasha is one of the most used — and most misunderstood — ideas in Vedic astrology. In this guide we explain, in plain language, what mahadasha, antardasha and pratyantardasha mean, how the 120-year Vimshottari system works, the standard order and length of each planet's period, how to find your own current dasha from your Moon nakshatra, and how to think calmly about the periods people worry about most: Shani, Rahu, Guru and Shukra. No fear, no gemstone upsell — just how the system works and how to read it sensibly.",
  body: [
    {
      type: "p",
      text: "This guide is in simple English, using the Hinglish words people actually use: dasha, mahadasha, antardasha, graha.",
    },
    { type: "h2", text: "Mahadasha kya hota hai? (What is Mahadasha)" },
    {
      type: "p",
      text: "In Jyotish, a dasha is a time period ruled by one graha. The idea is simple: your birth chart shows the promise — which houses are strong, which planets are well placed, which areas of life need more effort — and the dasha system shows when different parts of that promise tend to become active. Mahadasha (maha means big) is the main, long period. During, say, Jupiter mahadasha, Jupiter's condition in your chart — its sign, house, dignity, aspects and the houses it rules — becomes the main background theme for those years.",
    },
    {
      type: "p",
      text: "This is the most important point of the whole guide: a mahadasha is a timing period, not a life sentence. It does not mean \"Saturn's 19 years will be bad\" or \"Venus's 20 years will be lucky\". The same planet's period can feel completely different for two people, because what matters is how that planet sits in each person's own kundli. Dasha tells you whose chapter it is; the chart tells you what is written in that chapter.",
    },
    { type: "h3", text: "Antardasha aur Pratyantardasha" },
    {
      type: "p",
      text: "Each mahadasha is divided into nine sub-periods called antardasha (also called bhukti). The first antardasha always belongs to the mahadasha lord itself, and the rest follow the same fixed order as the mahadashas. So Saturn mahadasha begins with Saturn–Saturn, then Saturn–Mercury, Saturn–Ketu, and so on. Astrologers usually read the two together: the mahadasha lord sets the broad theme, and the antardasha lord colours the next one to three years. When people say \"Shani mein Budh ki antardasha chal rahi hai\", this is what they mean.",
    },
    {
      type: "p",
      text: "Antardashas are divided again into pratyantardashas — shorter windows of weeks or months — and some astrologers go further into sookshma and prana dashas. These finer levels are extremely sensitive to the exact birth time; an error of a few minutes can shift them noticeably. For most practical reading, mahadasha plus antardasha is enough, and over-reading tiny sub-periods often creates more anxiety than insight.",
    },
    { type: "h2", text: "Vimshottari Dasha kya hai? The 120-year system" },
    {
      type: "p",
      text: "Vimshottari means \"of one hundred and twenty\". In this system, the nine grahas — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu — share a full cycle of 120 years, each getting a fixed number of years. Classical texts such as Brihat Parashara Hora Shastra describe many dasha systems, but Vimshottari is the one given the most importance, and it is by far the most widely used in India today. Almost every kundli you get from a pandit, a panchang software or an app shows Vimshottari dasha by default.",
    },
    {
      type: "p",
      text: "The system is tied to the 27 nakshatras. Each nakshatra has a ruling planet, and the nine lords repeat three times around the zodiac. Your starting mahadasha is decided by the nakshatra in which the Moon was placed at your birth — your janma nakshatra.",
    },
    { type: "h2", text: "Mahadasha order aur har graha ke saal (Periods of each planet)" },
    {
      type: "p",
      text: "The order of Vimshottari mahadashas is fixed and always runs in the same cycle: Ketu → Venus (Shukra) → Sun (Surya) → Moon (Chandra) → Mars (Mangal) → Rahu → Jupiter (Guru) → Saturn (Shani) → Mercury (Budh) → and back to Ketu. The standard lengths are below; they add up to exactly 120 years. These are the same values used in Astrojanta's chart engine.",
    },
    {
      type: "table",
      head: ["Order", "Graha", "Mahadasha years", "Nakshatras ruled"],
      rows: [
        ["1", "Ketu", "7", "Ashwini, Magha, Mula"],
        ["2", "Venus (Shukra)", "20", "Bharani, Purva Phalguni, Purva Ashadha"],
        ["3", "Sun (Surya)", "6", "Krittika, Uttara Phalguni, Uttara Ashadha"],
        ["4", "Moon (Chandra)", "10", "Rohini, Hasta, Shravana"],
        ["5", "Mars (Mangal)", "7", "Mrigashira, Chitra, Dhanishta"],
        ["6", "Rahu", "18", "Ardra, Swati, Shatabhisha"],
        ["7", "Jupiter (Guru)", "16", "Punarvasu, Vishakha, Purva Bhadrapada"],
        ["8", "Saturn (Shani)", "19", "Pushya, Anuradha, Uttara Bhadrapada"],
        ["9", "Mercury (Budh)", "17", "Ashlesha, Jyeshtha, Revati"],
      ],
    },
    {
      type: "p",
      text: "Because the full cycle is 120 years, nobody lives through all nine mahadashas from the start. Most people experience five to seven of them in a lifetime, and which ones depends entirely on where the sequence started at birth.",
    },
    { type: "h3", text: "Antardasha ki length kaise nikalte hain" },
    {
      type: "p",
      text: "Antardasha length follows one simple formula: (mahadasha years × antardasha lord's years) ÷ 120. For example, inside Saturn's 19-year mahadasha, the Saturn–Saturn antardasha lasts 19 × 19 ÷ 120 ≈ 3 years, while Saturn–Sun lasts 19 × 6 ÷ 120 ≈ 11.4 months. Inside Venus mahadasha, Venus–Venus is 20 × 20 ÷ 120 ≈ 3 years 4 months. That is why some antardashas feel long and others pass quickly.",
    },
    { type: "h2", text: "Dasha balance: birth ke samay kaunsi dasha chal rahi thi" },
    {
      type: "p",
      text: "Your first mahadasha is the lord of your Moon nakshatra — but you do not get its full length. Each nakshatra covers 13°20′ of the zodiac. If the Moon had already travelled through part of the nakshatra at birth, that same fraction of the first mahadasha is treated as already used up before you were born. What is left is called the dasha balance (dasha shesh), and it is usually printed on traditional janam patris as something like \"Balance of Venus dasha: 12 years 4 months 9 days\".",
    },
    {
      type: "p",
      text: "Example: suppose the Moon was in Rohini, ruled by the Moon, and had covered three-quarters of the nakshatra at birth. The Moon mahadasha is 10 years, so three-quarters (7.5 years) is counted as already passed and only about 2.5 years remain after birth. After that, Mars mahadasha (7 years) begins, then Rahu (18), then Jupiter (16), and so on in order.",
    },
    {
      type: "p",
      text: "This is also why the Moon's exact position matters. The Moon moves roughly 13° a day, so a two-hour error in birth time moves it about 1° — which can shift dasha dates by several months. For Ketu or Sun periods the effect is smaller in absolute terms; for Venus it is larger. If your birth time is approximate, treat dasha start and end dates as approximate too.",
    },
    { type: "h2", text: "Apni current Mahadasha kaise check karein (How to check in your kundli)" },
    {
      type: "ul",
      items: [
        "Step 1: Get your birth chart with an accurate date, time and place of birth. You can make a free one on Astrojanta's [kundli page](/kundli).",
        "Step 2: Note your janma nakshatra (the Moon's nakshatra) and its lord. This tells you which mahadasha you were born in.",
        "Step 3: Look at the dasha balance at birth, then add the following mahadashas in the fixed order using the years in the table above.",
        "Step 4: Find which mahadasha today's date falls in, and inside it, which antardasha.",
        "Step 5: Now read the dasha lord in your chart — its house, sign, dignity, the houses it rules, conjunctions and aspects. That is where the actual meaning comes from.",
      ],
    },
    {
      type: "p",
      text: "Doing steps 3 and 4 by hand is possible but tedious, and easy to get wrong by a year. Any good kundli software does it automatically, which brings us to what our own tool shows.",
    },
    { type: "h2", text: "Astrojanta ki kundli mein dasha kya dikhata hai (Honest note on our tool)" },
    {
      type: "p",
      text: "When you generate a chart on the [free kundli page](/kundli), Astrojanta computes Vimshottari dasha from your Moon's exact longitude. It shows your current dasha as Mahadasha–Antardasha with the date the running antardasha ends, a timeline of all nine mahadashas with their start and end years (the first one starts before your birth, reflecting the balance), and the list of antardashas inside your current mahadasha with their start months. It uses the standard years in the table above, with antardashas split by the (maha × antar) ÷ 120 formula and a year counted as 365.2425 days.",
    },
    {
      type: "p",
      text: "What it does not show: it does not calculate pratyantardasha or finer sub-periods, and it does not offer other dasha systems such as Yogini or Ashtottari. It also does not print a \"good dasha / bad dasha\" verdict — the timeline is data, not a prediction. The underlying chart uses the sidereal zodiac with the Lahiri (Chitrapaksha) ayanamsa, planetary positions from the open-source Astronomy Engine ephemeris (not Swiss Ephemeris), mean Rahu and Ketu, and whole-sign houses. Because some software uses true nodes, a different ayanamsa or a 360-day dasha year, dates can differ by days to a few months between apps. The full approach is explained on our [methodology page](/about-methodology).",
    },
    {
      type: "p",
      text: "If you want to talk through your own dasha, the [AI astrologer](/ai-astrologer) reads the same calculated chart, including your running mahadasha–antardasha and the dasha timeline. It is instructed not to recalculate or invent dates, and to explain which houses and lords it is looking at so you can follow the reasoning. Treat its answers as a thoughtful explanation, not a guaranteed forecast.",
    },
    { type: "h2", text: "Dasha ka phal kaise padhein: the planet's condition matters most" },
    {
      type: "p",
      text: "A common mistake is reading effects from the dasha name alone — \"Rahu means confusion, Jupiter means luck\". Traditional astrologers look at several things together before saying anything about a period:",
    },
    {
      type: "ul",
      items: [
        "Dignity: is the dasha lord exalted, in its own sign, in a friendly sign, or debilitated? Is it combust or retrograde?",
        "Houses: which house does it occupy, and which houses does it rule from your Lagna? A planet ruling the 9th and 10th behaves very differently from one ruling the 6th and 8th.",
        "Connections: conjunctions and aspects with other planets, and the relationship between the mahadasha and antardasha lords.",
        "Navamsa and yogas: how the planet holds up in the D9 chart, and whether it is part of a yoga in your chart.",
        "Gochar (transits): what major slow planets like Saturn and Jupiter are doing at the same time.",
        "Your real life: age, choices, effort, health and circumstances. A dasha describes tendencies; it does not override how you live.",
      ],
    },
    {
      type: "p",
      text: "Many astrologers also note that the start of a new mahadasha (the dasha sandhi, or junction) can feel like a shift in priorities. That is a reasonable way to see it — chapters change — but it is not a danger zone to fear.",
    },
    { type: "h2", text: "Shani ki Mahadasha (Saturn Mahadasha, 19 years)" },
    {
      type: "p",
      text: "Shani mahadasha is probably the most feared period in Indian homes, and mostly unfairly. Saturn is the planet of time, discipline, hard work, responsibility, service and patience. In a chart where Saturn is well placed — for example in its own signs Capricorn and Aquarius, exalted in Libra, or ruling good houses for your Lagna (Saturn is often considered especially helpful for Taurus and Libra ascendants) — Saturn mahadasha can bring steady career growth, property, authority and long-lasting results that come from sustained effort. When Saturn is weak or afflicted, the same period may ask for more patience, slower progress and extra responsibility. Either way, its lessons tend to reward consistency.",
    },
    { type: "h3", text: "Shani Mahadasha vs Sade Sati: same nahi hai" },
    {
      type: "p",
      text: "People often mix these up. Shani mahadasha is a dasha — a 19-year timing period that comes from your Moon nakshatra and dasha sequence; some people never get it in their lifetime, others get it in childhood. Sade Sati is a transit — the roughly seven-and-a-half years when Saturn moves through the sign before your Moon sign, your Moon sign and the sign after it. Everyone goes through Sade Sati about every 30 years, regardless of dasha. You can be in Sade Sati without Shani mahadasha, in Shani mahadasha without Sade Sati, or occasionally both. We explain Sade Sati phases and the 2026 picture for each rashi in our [Shani Sade Sati 2026 guide](/blog/shani-sade-sati-2026).",
    },
    { type: "h2", text: "Rahu ki Mahadasha (18 years)" },
    {
      type: "p",
      text: "Rahu is a shadow point — the Moon's north node — not a physical planet, and it gives results largely according to the sign it sits in, the lord of that sign and the planets it is connected with. Rahu is associated with ambition, foreign lands, technology, unconventional paths, sudden change and strong desire. That is why many people see big career moves, relocation abroad, new fields or rapid rises during Rahu periods. When it is afflicted, the same energy can show as restlessness, confusion or chasing too many things at once.",
    },
    {
      type: "p",
      text: "A balanced way to approach Rahu mahadasha is to use its ambition with clear priorities: check big financial decisions twice, avoid shortcuts, and keep routines that ground you. Ketu mahadasha (7 years), Rahu's counterpart, is often described as more inward — detachment, research, spirituality, letting go of what no longer fits. Rahu and Ketu are also the axis behind [Kaal Sarp Dosh](/blog/kaal-sarp-dosh); having that yoga does not make a Rahu or Ketu dasha automatically difficult.",
    },
    { type: "h2", text: "Guru ki Mahadasha (Jupiter Mahadasha, 16 years)" },
    {
      type: "p",
      text: "Jupiter is the planet of wisdom, teachers, dharma, children, wealth and expansion, and its mahadasha is usually expected to be positive — growth in learning, marriage or family, respect and opportunities. Often it is. But Jupiter's results also depend on its condition: debilitated in Capricorn, combust, or ruling difficult houses for your Lagna, it may bring over-expansion, overconfidence or delayed promises. So even for Guru mahadasha, it is wiser to read the chart than to assume a golden period.",
    },
    { type: "h2", text: "Shukra ki Mahadasha (Venus Mahadasha, 20 years)" },
    {
      type: "p",
      text: "Venus has the longest mahadasha — 20 years. It relates to relationships, marriage, comforts, vehicles, art, beauty and enjoyment. A well-placed Venus period often coincides with marriage, a better lifestyle, creative work or business in luxury and design fields. Where Venus is weak or afflicted, the theme may come up as over-spending or relationship lessons. Because it lasts two decades, its antardashas vary a lot, and reading the antardasha lord is especially useful here.",
    },
    { type: "h2", text: "Baaki mahadashas: Surya, Chandra, Mangal, Budh, Ketu" },
    {
      type: "ul",
      items: [
        "Surya (Sun), 6 years: authority, government, father, self-confidence and career visibility.",
        "Chandra (Moon), 10 years: mind, emotions, mother, home, public and travel; often a sensitive, relationship-focused period.",
        "Mangal (Mars), 7 years: energy, courage, property, siblings, sports and technical work; good for initiative, with a need to manage anger and haste.",
        "Budh (Mercury), 17 years: education, communication, trade, writing, accounts and skills; often busy and mentally active.",
        "Ketu, 7 years: detachment, spirituality, research and sudden shifts; a good time for depth and inner work.",
      ],
    },
    {
      type: "p",
      text: "These short notes are general significations. They are starting points for understanding, not predictions for anyone's life.",
    },
    { type: "h2", text: "Other dasha systems: Yogini, Ashtottari and more" },
    {
      type: "p",
      text: "Vimshottari is not the only dasha system. Yogini dasha uses a 36-year cycle and is popular with some North Indian astrologers as a second check. Ashtottari dasha (108 years) is used by some traditions under specific conditions. Jaimini astrology uses sign-based dashas like Chara dasha. Classical texts describe many more. Still, most Indian kundli apps and most family pandits use Vimshottari as the main system, and that is what this guide — and Astrojanta's chart — follows.",
    },
    { type: "h2", text: "Upay: kya mahadasha ke liye remedies zaroori hain?" },
    {
      type: "p",
      text: "No remedy is compulsory. If you wish to do something traditional, keep it simple and low-cost: chanting the graha's mantra or a prayer of your own faith, fasting on the planet's weekday if your health permits, daan to people who genuinely need it, and service — Saturn especially is associated with honest work and helping elders and workers. Be cautious of anyone who says an expensive gemstone or a costly puja is the only way to \"survive\" a dasha. Gemstones in particular can be worn wrongly; most careful astrologers say they should not be prescribed from the dasha name alone.",
    },
    { type: "h2", text: "Important: dasha is a timing tool, not a decision maker" },
    {
      type: "p",
      text: "Please do not turn down a job, reject a rishta, delay medical treatment or make a big financial decision only because of a dasha. Dashas can help you reflect on timing and themes, but real decisions need real information — the person, the offer, your health reports, your finances and advice from qualified professionals. Astrology works best as a reflective lens alongside common sense, never as a replacement for it.",
    },
    { type: "h2", text: "Bottom line" },
    {
      type: "p",
      text: "Vimshottari mahadasha divides life into nine planetary chapters across a 120-year cycle, starting from the lord of your Moon nakshatra with a balance that depends on the Moon's exact position. Each mahadasha has nine antardashas, and the effects come from the planet's condition in your own chart — not from its name. Shani mahadasha is not Sade Sati, Rahu is not automatically bad and Guru is not automatically lucky. Start by seeing your own timeline on the [free kundli page](/kundli), then read the dasha lords in context, or ask the [AI astrologer](/ai-astrologer) to walk you through it.",
    },
  ],
  faqs: [
    {
      q: "Mahadasha kya hota hai?",
      a: "Mahadasha is the main planetary time period in Vedic astrology. In the Vimshottari system, each of the nine grahas rules a fixed number of years, and during its mahadasha that planet's condition in your chart becomes the main theme for that time.",
    },
    {
      q: "Mahadasha aur antardasha mein kya fark hai?",
      a: "Mahadasha is the long main period; antardasha is a sub-period inside it. Every mahadasha has nine antardashas, starting with its own lord and following the same fixed order. Astrologers read both together.",
    },
    {
      q: "How many years is each mahadasha?",
      a: "Ketu 7, Venus 20, Sun 6, Moon 10, Mars 7, Rahu 18, Jupiter 16, Saturn 19 and Mercury 17 years — a total of 120 years, in that order.",
    },
    {
      q: "How do I know my current mahadasha?",
      a: "Your first mahadasha is the lord of your Moon nakshatra, minus the portion already used at birth (the dasha balance). The following periods run in fixed order. The easiest way is to generate your kundli with accurate birth details — Astrojanta's free kundli shows your current mahadasha–antardasha and the full timeline.",
    },
    {
      q: "Is Shani mahadasha always bad?",
      a: "No. Saturn's results depend on its sign, house, dignity and the houses it rules in your chart. For many people Shani mahadasha brings steady career growth and lasting results from hard work.",
    },
    {
      q: "Is Shani mahadasha the same as Sade Sati?",
      a: "No. Shani mahadasha is a 19-year dasha period from your nakshatra sequence. Sade Sati is Saturn's roughly 7.5-year transit around your Moon sign that everyone experiences about every 30 years. They are separate and can overlap or not.",
    },
    {
      q: "Rahu ki mahadasha kaisi hoti hai?",
      a: "Rahu mahadasha (18 years) is often linked with ambition, foreign connections, technology and sudden change. Its actual results depend on Rahu's sign, its sign lord and planets connected to it. It is not automatically bad.",
    },
    {
      q: "Why do different apps show different dasha dates?",
      a: "Small differences in ayanamsa, true vs mean Rahu-Ketu, birth time and the length used for a dasha year (365.2425 days vs 360 days) can shift dates by days to months. Astrojanta uses Lahiri ayanamsa, mean nodes and a 365.2425-day year.",
    },
    {
      q: "Does Astrojanta show pratyantardasha?",
      a: "No. Astrojanta shows Vimshottari mahadashas and the antardashas within your current mahadasha, plus the end date of your running antardasha. It does not calculate pratyantardasha or other dasha systems like Yogini.",
    },
    {
      q: "Should I wear a gemstone or do a puja for a bad mahadasha?",
      a: "No remedy is compulsory. Simple options like mantra, prayer, daan and service are traditional and low-cost. Avoid wearing gemstones based only on the dasha name, and be wary of anyone using fear to sell an expensive ritual.",
    },
  ],
};

const bhakootDosha: Post = {
  slug: "bhakoot-dosha",
  title: "Bhakoot Dosha in Kundli Milan: 2/12, 5/9, 6/8 Rashi Table & Parihar",
  h1: "Bhakoot Dosha – Kya Hota Hai, 2/12, 5/9 aur 6/8 Rashi, Moon Sign Table, Cancellation and What to Check Before Shaadi",
  description:
    "Bhakoot Dosha kya hai? Simple English with Hinglish terms: how Bhakoot (Rashi koot) scores 7 of 36 gun, the 2/12, 5/9 and 6/8 Moon sign table, parihar rules and calm guidance.",
  keyword: "bhakoot dosha",
  author: "founder",
  published: "2026-11-09",
  updated: "2026-11-09",
  intro: "\"Baaki sab theek hai, bas Bhakoot mein zero aa raha hai.\" After Nadi, this is the line Indian families hear most often from a pandit or a kundli milan website. Bhakoot carries 7 of the 36 gun, so a zero there pulls the total down sharply, and words like \"shadashtak\" and \"dwirdwadash\" sound far more frightening than they are. In this guide we explain what Bhakoot Dosha actually is, how it is calculated from the two Moon signs, a complete table of which rashi pairs score 0, the classical cancellation rules, what the traditional worries about health, money and children really mean, and exactly what Astrojanta's matching tool does and does not check. No fear, no upsell — just the rule, and how to read it sensibly.",
  body: [
    {
      type: "p",
      text: "Written in plain English, with the Hinglish terms you'll hear in kundli milan: Bhakoot, rashi, shadashtak (6/8), dwirdwadash (2/12), parihar.",
    },
    {
      type: "h2",
      text: "Bhakoot Dosha kya hota hai? (What is Bhakoot Dosha)",
    },
    {
      type: "p",
      text: "Kundli milan in North India usually means Ashtakoota Guna Milan: eight kootas, worth 36 gun in total, calculated from the Moon sign (rashi) and Moon nakshatra of the boy and the girl. Bhakoot — also called Rashi koot or Rashikoot — is the seventh of these eight kootas and carries 7 points. Only Nadi, with 8 points, is worth more. Together the two make up 15 of the 36 gun, which is why pandits mention them first.",
    },
    {
      type: "p",
      text: "Bhakoot looks at one thing only: how far apart the two Moon signs are. Count from one person's Moon sign to the other's. If the signs are 2nd and 12th, 5th and 9th, or 6th and 8th from each other, Bhakoot scores 0. Every other distance scores the full 7. That zero is what people call Bhakoot Dosha (also written Bhakut Dosh or Bhakoot Dosh). There is no half score — it is all or nothing.",
    },
    {
      type: "p",
      text: "So Bhakoot Dosha is not a curse on a person and not something either partner \"has\" on their own. It describes the relationship between two Moon signs. The same girl can have Bhakoot Dosha with one boy and a full 7/7 with another. If you are new to gun milan, our [kundli milan online free guide](/blog/kundli-milan-online-free) explains all eight kootas and what total is generally considered good.",
    },
    {
      type: "h2",
      text: "Bhakoot ka score kaise nikalta hai: the 7 Moon sign distances",
    },
    {
      type: "p",
      text: "There are twelve rashis, so two Moon signs can stand in only seven kinds of relationship. Counting is inclusive: the sign you start from is 1. For example, from Aries (Mesh), Taurus (Vrishabh) is 2nd and Pisces (Meen) is 12th. Because the count is done both ways, each relationship is written as a pair of numbers.",
    },
    {
      type: "table",
      head: [
        "Distance between Moon signs",
        "Traditional name",
        "Bhakoot score",
        "Result",
      ],
      rows: [
        [
          "1/1 — same Moon sign",
          "Same rashi",
          "7",
          "No dosha",
        ],
        [
          "2/12 — next or previous sign",
          "Dwirdwadash (dvi-dvadash)",
          "0",
          "Bhakoot Dosha",
        ],
        [
          "3/11",
          "Tritiya-ekadash",
          "7",
          "No dosha",
        ],
        [
          "4/10",
          "Chaturth-dasham",
          "7",
          "No dosha",
        ],
        [
          "5/9",
          "Navpancham (nav-pancham)",
          "0",
          "Bhakoot Dosha",
        ],
        [
          "6/8",
          "Shadashtak (shad-ashtak)",
          "0",
          "Bhakoot Dosha",
        ],
        [
          "7/7 — opposite signs",
          "Samsaptak",
          "7",
          "No dosha",
        ],
      ],
    },
    {
      type: "p",
      text: "This 0-or-7 rule is the standard one found in published Ashtakoota tables and on the major Indian matching websites, and it is exactly what Astrojanta's [kundli matching tool](/matching) uses. Notice two things that often surprise families. First, a 7/7 (opposite signs) pairing gets full marks — some people assume \"opposite\" must be bad, but in Bhakoot it is considered favourable. Second, the same Moon sign also gets full marks in Bhakoot, even though it can affect other kootas.",
    },
    {
      type: "h3",
      text: "Traditional meanings of the three dosha patterns",
    },
    {
      type: "p",
      text: "Each pattern has a traditional association in matching books. These are the ideas behind the rule, not predictions:",
    },
    {
      type: "ul",
      items: [
        "2/12 (Dwirdwadash): traditionally linked with money matters and expenses in the household — the 2nd house is family wealth and the 12th is expenditure.",
        "5/9 (Navpancham): traditionally linked with children and with differences of outlook, dharma or family values — the 5th is progeny and the 9th is fortune and belief.",
        "6/8 (Shadashtak): traditionally treated as the most sensitive of the three, linked with disputes and health worries — the 6th is conflict and illness and the 8th is sudden change.",
      ],
    },
    {
      type: "p",
      text: "Different books describe these slightly differently, and some schools treat 5/9 more leniently than 6/8. What every school agrees on is the scoring: all three patterns give 0 out of 7.",
    },
    {
      type: "h2",
      text: "Rashi table: which Moon signs give Bhakoot Dosha?",
    },
    {
      type: "p",
      text: "Find your Moon sign (rashi) in the first column. The other three columns list the Moon signs that would give 0 in Bhakoot with yours. Any partner sign not listed in your row — including your own sign — gives the full 7 points. If you do not know your Moon sign, make a free [kundli](/kundli) with your date, time and place of birth; the Moon sign is shown there.",
    },
    {
      type: "table",
      head: [
        "Your Moon sign",
        "2/12 (Dwirdwadash)",
        "5/9 (Navpancham)",
        "6/8 (Shadashtak)",
      ],
      rows: [
        [
          "Aries (Mesh)",
          "Taurus, Pisces",
          "Leo, Sagittarius",
          "Virgo, Scorpio",
        ],
        [
          "Taurus (Vrishabh)",
          "Gemini, Aries",
          "Virgo, Capricorn",
          "Libra, Sagittarius",
        ],
        [
          "Gemini (Mithun)",
          "Cancer, Taurus",
          "Libra, Aquarius",
          "Scorpio, Capricorn",
        ],
        [
          "Cancer (Kark)",
          "Leo, Gemini",
          "Scorpio, Pisces",
          "Sagittarius, Aquarius",
        ],
        [
          "Leo (Simha)",
          "Virgo, Cancer",
          "Sagittarius, Aries",
          "Capricorn, Pisces",
        ],
        [
          "Virgo (Kanya)",
          "Libra, Leo",
          "Capricorn, Taurus",
          "Aquarius, Aries",
        ],
        [
          "Libra (Tula)",
          "Scorpio, Virgo",
          "Aquarius, Gemini",
          "Pisces, Taurus",
        ],
        [
          "Scorpio (Vrishchik)",
          "Sagittarius, Libra",
          "Pisces, Cancer",
          "Aries, Gemini",
        ],
        [
          "Sagittarius (Dhanu)",
          "Capricorn, Scorpio",
          "Aries, Leo",
          "Taurus, Cancer",
        ],
        [
          "Capricorn (Makar)",
          "Aquarius, Sagittarius",
          "Taurus, Virgo",
          "Gemini, Leo",
        ],
        [
          "Aquarius (Kumbh)",
          "Pisces, Capricorn",
          "Gemini, Libra",
          "Cancer, Virgo",
        ],
        [
          "Pisces (Meen)",
          "Aries, Aquarius",
          "Cancer, Scorpio",
          "Leo, Libra",
        ],
      ],
    },
    {
      type: "p",
      text: "So for any Moon sign, six of the twelve possible partner signs give Bhakoot Dosha and six do not. In other words, if you picked two people at random, roughly half of all pairings would show Bhakoot Dosha before any exception is applied. That alone should tell you it is a very common result, not a rare red flag.",
    },
    {
      type: "p",
      text: "Bhakoot uses the Vedic (sidereal) Moon sign, not the Western \"sun sign\" from newspapers. Many people who say \"I am a Leo\" have a completely different Moon rashi. Always use the Moon sign from a proper kundli.",
    },
    {
      type: "h2",
      text: "Kundli matching mein Bhakoot Dosha kaise check karein",
    },
    {
      type: "ul",
      items: [
        "Collect both sets of birth details — date, exact time and place of birth for the boy and the girl. The Moon changes sign roughly every two and a half days, so if either Moon is near the end or start of a sign, an hour's error in birth time can change the rashi and flip Bhakoot from 7 to 0 or back.",
        "Open the [free kundli matching tool](/matching) and enter both charts. It calculates each person's Moon sign and nakshatra and scores all eight kootas.",
        "Look at the Bhakoot row. 7/7 means no Bhakoot Dosha. 0/7 means the Moon signs are 2/12, 5/9 or 6/8 apart, and the tool shows a Bhakoot dosha caution.",
        "If Bhakoot shows 0, note both Moon signs and their lords, then look at the Nadi row and the Graha Maitri row before reading the cancellation rules below.",
      ],
    },
    {
      type: "h2",
      text: "Astrojanta ka matching tool Bhakoot ke liye kya karta hai (honestly)",
    },
    {
      type: "p",
      text: "Because families make real decisions with these numbers, here is exactly what our tool does, in plain words:",
    },
    {
      type: "ul",
      items: [
        "It calculates each person's sidereal Moon sign using the open-source Astronomy Engine ephemeris with the Lahiri ayanamsa (not Swiss Ephemeris, though it follows the same Lahiri convention). Rahu and Ketu use the mean node, and charts use whole-sign houses.",
        "It counts the distance between the two Moon signs and gives Bhakoot 0 if they are 2/12, 5/9 or 6/8 apart, and 7 for every other distance. Bhakoot depends only on the two Moon signs — not on nakshatra or pada.",
        "When Bhakoot is 0, it shows a \"Bhakoot dosha\" note under Traditional cautions.",
        "It does not apply any Bhakoot cancellation (parihar) rules. It does not check whether the sign lords are the same or friends to cancel the dosha, does not look at Navamsa (D9) lords, and does not add the 7 points back. The total out of 36 is always the raw total.",
        "It does not check Manglik Dosha — that is a separate check on the [Manglik page](/manglik).",
      ],
    },
    {
      type: "p",
      text: "This is the same conservative approach our [Nadi Dosha guide](/blog/nadi-dosha) describes: show the raw traditional score, flag the caution, and leave the exceptions to a human reading of both charts, because schools apply them differently. Our [methodology page](/about-methodology) explains how the underlying calculations are done.",
    },
    {
      type: "p",
      text: "One practical tip: the tool's Graha Maitri row compares the same two Moon-sign lords that the main Bhakoot exceptions use. If Graha Maitri shows 5/5, the two lords are either the same planet or natural friends of each other in the tool's friendship table. That is a useful hint, but still read the rules below rather than treating it as an automatic cancellation.",
    },
    {
      type: "h2",
      text: "Bhakoot Dosha cancellation: kab maana jata hai ki dosha nahi hai? (Bhakoot Dosha parihar)",
    },
    {
      type: "p",
      text: "Classical matching tradition — the rules are commonly associated with Muhurta texts such as Muhurta Chintamani — gives exceptions under which a 2/12, 5/9 or 6/8 pairing is not treated as harmful. The most widely cited are:",
    },
    {
      type: "ul",
      items: [
        "Same Moon-sign lord. If both Moon signs are ruled by the same planet, the dosha is commonly considered cancelled. Only three dosha pairs qualify: Aries–Scorpio (both Mars, 6/8), Taurus–Libra (both Venus, 6/8) and Capricorn–Aquarius (both Saturn, 2/12).",
        "Friendly Moon-sign lords. If the two lords are natural friends of each other, many astrologers treat the dosha as cancelled or greatly reduced. Examples: Aries–Leo (Mars and Sun), Cancer–Leo (Moon and Sun), Leo–Sagittarius (Sun and Jupiter), Taurus–Virgo (Venus and Mercury), Libra–Aquarius (Venus and Saturn) and Pisces–Leo (Jupiter and Sun).",
        "Friendly Navamsa lords. Some texts also allow cancellation when the lords of the two Moons' Navamsa (D9) signs are friends. This needs both D9 charts, which is why it is usually left to an astrologer.",
        "Clean Nadi. In the classical framing, the exceptions above are applied when there is no Nadi Dosha. If Nadi is also 0 and not itself cancelled, most traditional astrologers will not set Bhakoot Dosha aside so easily.",
      ],
    },
    {
      type: "p",
      text: "Count these out and the picture changes quite a lot. Of the 36 Moon sign pairings that score 0 in Bhakoot, 3 share a lord and around 14 more have lords that are mutual natural friends — so roughly half of all Bhakoot Dosha cases meet one of the two main exceptions on sign lords alone. Many of the 5/9 cases in particular fall into this group.",
    },
    {
      type: "p",
      text: "Beyond these, practice varies. Some traditions also ease Bhakoot Dosha when Tara or Vashya koota is favourable, when the overall score is high, or by regional custom. Others are stricter and accept only the same-lord exception. There is no single rulebook followed by every pandit in India, so if you consult one, ask which exception they are applying and why. A cancellation also does not change the printed score: Bhakoot still shows 0/7 in the 36-gun table; what changes is how much weight that zero is given.",
    },
    {
      type: "h2",
      text: "Bhakoot Dosha ke effects: health, paisa aur santaan — calmly explained",
    },
    {
      type: "p",
      text: "Relatives often attach big warnings to Bhakoot Dosha: \"shadashtak hai, jhagde honge\", \"dwirdwadash se paisa nahi tikega\", \"navpancham se santaan mein der hogi\". It helps to separate what the tradition says from what it can and cannot tell you.",
    },
    {
      type: "ul",
      items: [
        "Tradition treats Bhakoot as a measure of how the two Moon signs — the two minds and emotional natures — sit together in family life. It is reasonable to respect it as one part of matching.",
        "It is not a financial test. A 2/12 pairing cannot tell you whether a couple will earn well or save money. Habits, communication about money and honest planning tell you far more.",
        "It is not a medical or fertility test. A 5/9 or 6/8 pairing does not predict illness or problems with children. If there are real health or fertility questions, the right person to ask is a doctor, for every couple, matched or not.",
        "It is one koota out of eight. About half of all random pairings show Bhakoot Dosha; many of those couples have long, happy marriages, and many 7/7 couples face difficulties. Astrology at its best describes tendencies, not guarantees.",
      ],
    },
    {
      type: "p",
      text: "Our view at Astrojanta is simple: do not reject a rishta on Bhakoot alone. Equally, do not wave it away without a look. Check the exceptions, the overall score and both individual kundlis — then decide as a family, with the couple's own wishes at the centre.",
    },
    {
      type: "h2",
      text: "Bhakoot vs Nadi vs Manglik: kya fark hai?",
    },
    {
      type: "table",
      head: [
        "",
        "Bhakoot",
        "Nadi",
        "Manglik",
      ],
      rows: [
        [
          "Part of the 8 Ashtakoota kootas?",
          "Yes — 7th koota",
          "Yes — 8th koota",
          "No — separate check",
        ],
        [
          "Points",
          "7 of 36",
          "8 of 36",
          "No points",
        ],
        [
          "Based on",
          "Distance between the two Moon signs",
          "The two Moon nakshatras (Adi, Madhya, Antya)",
          "Mars's house position in each person's own chart",
        ],
        [
          "Dosha when",
          "Signs are 2/12, 5/9 or 6/8 apart",
          "Both nakshatras in the same nadi",
          "Mars in houses such as 1, 2, 4, 7, 8 or 12 (schools differ)",
        ],
        [
          "Common cancellation idea",
          "Same or friendly Moon-sign lords, clean Nadi",
          "Same rashi different nakshatra, same nakshatra different rashi or pada",
          "Both partners Manglik, and placement-based exceptions",
        ],
        [
          "Where to check on Astrojanta",
          "Matching tool — raw 0 or 7",
          "Matching tool — raw 0 or 8",
          "Manglik tool (separate)",
        ],
      ],
    },
    {
      type: "p",
      text: "Nadi and Bhakoot are linked in two ways. Classical cancellation of Bhakoot is usually framed with a clean Nadi, and a same-rashi pairing — which gives full marks in Bhakoot — is also one of the main Nadi exceptions. So when both Nadi and Bhakoot show 0, read both guides together; our [Nadi Dosha guide](/blog/nadi-dosha) covers the Nadi side in detail.",
    },
    {
      type: "p",
      text: "Manglik Dosha is a different thing altogether. It is not one of the eight kootas and does not change the 36-gun score; it comes from where Mars sits in each person's own chart. A match can have a perfect 7/7 in Bhakoot and still need a Manglik check, or vice versa. Read the calm explanation in [Manglik Dosha meaning](/blog/manglik-dosha-meaning). And if you want to see how the smallest koota works by comparison, our [Varna Koota guide](/blog/varna-koota-meaning) explains the 1-point Varna.",
    },
    {
      type: "h2",
      text: "Bhakoot Dosha ho to kya dekhein? What to check beyond the score",
    },
    {
      type: "p",
      text: "If your match shows Bhakoot Dosha and no clear exception applies, an experienced astrologer will usually look at the following before giving any opinion. Several of these you can see yourself in a free [kundli](/kundli):",
    },
    {
      type: "ul",
      items: [
        "The overall gun score. Losing 7 points still leaves 29 possible. A pair at 25–27 gun with Bhakoot 0 is in a very different position from one at 14. The common rule of thumb treats 18 or more as acceptable; see our [gun milan guide](/blog/kundli-milan-online-free).",
        "The Nadi and Graha Maitri rows. A clean Nadi and friendly Moon-sign lords are exactly what the classical exceptions look for.",
        "The 7th house and its lord in each chart — the main indicators of marriage and partnership in the individual kundli.",
        "Venus (Shukra), and for the bride traditionally also Jupiter (Guru), as significators of marriage and the spouse.",
        "The Navamsa (D9) chart. Many astrologers consider D9 essential for marriage, and one Bhakoot exception uses the Navamsa lords. Note that Astrojanta's matching tool does not compare D9 charts; this needs a fuller reading.",
        "The running Vimshottari dasha of both people around and after the wedding. Timing often explains more about early married life than any matching score.",
      ],
    },
    {
      type: "p",
      text: "If you would like a plain-language walk-through of a specific match — why Bhakoot is 0, what the sign lords are, how the rest of the score looks — you can ask our [AI astrologer](/ai-astrologer). Treat it as an explanation, not a verdict, and involve your family astrologer for the final view if that is your custom.",
    },
    {
      type: "h2",
      text: "Bhakoot Dosha upay: simple, optional notes",
    },
    {
      type: "p",
      text: "You do not need to buy anything because of a 0 in Bhakoot. First check the exceptions — many cases are already considered cancelled and need no remedy at all. If your family still wishes to observe something, these are low-cost, traditional choices:",
    },
    {
      type: "ul",
      items: [
        "Follow your own family or community custom. Some families ask the family priest for a simple shanti path or prayer before the wedding; others do nothing. Both are legitimate.",
        "Worship of the two Moon-sign lords, or prayer to a family deity, done together at home or in a local temple.",
        "Daan and seva given sincerely — food, clothing or help to people who need it. Most traditions agree on this, and it costs only what you choose to give.",
        "Honest conversation. Since Bhakoot is traditionally about money, children and temperament, simply talking openly about finances, family plans and expectations before marriage is a sensible \"upay\" in any tradition.",
      ],
    },
    {
      type: "p",
      text: "Be cautious of anyone who says a costly puja, gemstone or special ritual is compulsory for Bhakoot Dosha, or who uses fear about health or children to push a sale. A genuine astrologer explains the exception rules and the whole chart first, and accepts that the decision is yours.",
    },
    {
      type: "h2",
      text: "Bottom line",
    },
    {
      type: "p",
      text: "Bhakoot Dosha simply means the two Moon signs are 2/12, 5/9 or 6/8 apart, so the 7-point Bhakoot (Rashi) koota scores 0 in gun milan. It is common — roughly half of all random pairings show it — and a large share of cases meet a classical exception through same or friendly Moon-sign lords. Astrojanta's tool shows the raw 0-or-7 score and a caution, without applying cancellations. Find both Moon signs, check the lords and Nadi, look at the overall score, the 7th house, Venus, the Navamsa and the dasha — and do not reject a good rishta on Bhakoot alone. Start by running both charts through the [free kundli matching tool](/matching).",
    },
  ],
  faqs: [
    {
      q: "Bhakoot Dosha kya hota hai?",
      a: "Bhakoot Dosha is when the bride's and groom's Moon signs are 2/12, 5/9 or 6/8 from each other. Bhakoot (Rashi) koota then scores 0 out of 7 in Ashtakoota gun milan instead of the full 7 points.",
    },
    {
      q: "How many points is Bhakoot in kundli matching?",
      a: "Bhakoot is worth 7 of the 36 gun, second only to Nadi's 8. It is all or nothing: 2/12, 5/9 and 6/8 Moon sign pairings get 0, and every other pairing gets 7.",
    },
    {
      q: "Is same rashi (same Moon sign) bad for Bhakoot?",
      a: "No. Same Moon sign is a 1/1 pairing and gets the full 7 points in Bhakoot. Same rashi with different nakshatras is also one of the common Nadi Dosha exceptions.",
    },
    {
      q: "Which Bhakoot Dosha is the most serious — 2/12, 5/9 or 6/8?",
      a: "Tradition usually treats 6/8 (shadashtak) as the most sensitive and 5/9 as the mildest, but all three score 0 in the table. Whether it matters depends on the exceptions and the full charts.",
    },
    {
      q: "When is Bhakoot Dosha cancelled?",
      a: "The commonly cited exceptions are: both Moon signs ruled by the same planet (Aries–Scorpio, Taurus–Libra, Capricorn–Aquarius), Moon-sign lords that are natural friends, or friendly Navamsa lords — usually with a clean Nadi. Schools differ, so check with both charts.",
    },
    {
      q: "Does Astrojanta's matching tool apply Bhakoot Dosha cancellation?",
      a: "No. The tool scores Bhakoot the standard raw way — 0 for 2/12, 5/9 or 6/8 Moon signs, 7 otherwise — and shows a Bhakoot dosha caution. It does not auto-apply exceptions or add the points back.",
    },
    {
      q: "Can we marry with Bhakoot Dosha?",
      a: "Yes, many couples do and live happily. Roughly half of all random Moon sign pairings show Bhakoot Dosha. Do not reject a match on Bhakoot alone; check the exceptions, the overall score and both kundlis.",
    },
    {
      q: "Does Bhakoot Dosha cause money, health or children problems?",
      a: "Tradition links the three patterns with finances, children and disputes or health, but kundli matching is not a financial or medical test and cannot predict these. For health or fertility questions, consult a doctor.",
    },
    {
      q: "Is Bhakoot Dosha the same as Manglik Dosha?",
      a: "No. Bhakoot is one of the eight kootas and compares the two Moon signs. Manglik Dosha comes from Mars's placement in each person's own chart and is checked separately.",
    },
    {
      q: "Is a puja or gemstone compulsory for Bhakoot Dosha?",
      a: "No. Many cases are already cancelled by the exception rules. If your family wishes, simple prayer, a shanti path through your family priest or sincere daan is traditional; no paid ritual or gemstone is required.",
    },
  ],
};

const ganaDosha: Post = {
  slug: "gana-dosha",
  title: "Gana Dosha in Kundli Milan: Dev, Manushya, Rakshasa Gana & 6 Gun",
  h1: "Gana Dosha – Gan Kya Hota Hai, Dev/Manushya/Rakshasa Gana, 27 Nakshatra Table, Scoring and What to Check Before Shaadi",
  description:
    "Gana dosha kya hai? Plain English with Hinglish terms: Dev, Manushya and Rakshasa gana, all 27 nakshatras, how Gana koota scores 6 of 36 gun, where tables differ, parihar and calm guidance.",
  keyword: "gana dosha",
  author: "founder",
  published: "2026-11-10",
  updated: "2026-11-10",
  intro:
    "\"Ladka Rakshasa gana hai aur ladki Dev gana — ab rishta nahi ho sakta?\" Gana is the koota that puts the most frightening-sounding words into a kundli milan report, and families often read them as a character certificate. They are not. Gana koota is worth 6 of the 36 gun, it is read only from the Moon's nakshatra, and Dev, Manushya and Rakshasa are names for three classes of birth stars, not for people. This guide explains what gana means, which nakshatra belongs to which gana (all 27, checked against the classical lists), exactly how the 6 points are scored, where published tables genuinely disagree, when the tradition itself sets Gana Dosha aside, and what Astrojanta's matching tool does and does not do with it. No fear, no upsell — just the rule, and how to read it.",
  body: [
    {
      type: "p",
      text: "Written in plain English, with the Hinglish words you will actually hear during kundli milan: gan, gun, dosha, parihar, rishta, shaadi.",
    },
    {
      type: "h2",
      text: "Gana kya hota hai? (What gana means)",
    },
    {
      type: "p",
      text: "In Ashtakoota Guna Milan — the 36-gun kundli milan used across North and Central India — eight kootas are compared, and every one of them is calculated from the Moon sign (rashi) and Moon nakshatra of the boy and the girl. Gana is the sixth koota and carries 6 points. That makes it the third-heaviest after Nadi (8 points) and Bhakoot (7).",
    },
    {
      type: "p",
      text: "Gana means a group or class. The classical texts sort all 27 nakshatras into three ganas — Dev (deva, divine), Manushya (human) and Rakshasa (fierce) — with exactly nine nakshatras in each. Your gana comes from the nakshatra the Moon occupied at your birth, the same janma nakshatra that decides Nadi, Yoni and Tara. Gana koota compares the boy's gana with the girl's and awards points according to how well the tradition says those two temperaments sit together.",
    },
    {
      type: "p",
      text: 'One clarification before anything else, because it matters more than any number in this article. "Rakshasa" is usually translated as demon, and that translation does more damage than a zero ever could. Here it is simply the name of a class of birth stars that the tradition describes as forceful, strong-willed and independent. Krittika, Magha, Jyeshtha and Mula are Rakshasa gana nakshatras, and so are the birth stars of a great many gentle, successful and entirely ordinary people. A gana is not a moral grade, and nobody should be called a demon because of where the Moon was on the day they were born.',
    },
    {
      type: "h2",
      text: "Gan milan ya gun milan? A quick clarification",
    },
    {
      type: "p",
      text: 'A lot of people search for "gan milan" when they actually mean gun milan — the whole 36-point Ashtakoota check. The two words sound almost identical in everyday speech and get used interchangeably across India. Strictly speaking, gun (guna) are the 36 points in total, and gana is one koota worth 6 of them. If you were looking for the full system, our [kundli milan online free guide](/blog/kundli-milan-online-free) explains all eight kootas and what total is generally considered acceptable. If it is the 6-point temperament koota you want, read on.',
    },
    {
      type: "h2",
      text: "Dev, Manushya aur Rakshasa gana: the three types",
    },
    {
      type: "p",
      text: "Each gana holds exactly nine of the 27 nakshatras, so the three groups are the same size. The descriptions below are the traditional ones used in matching books; they describe a classical style of temperament, not a personality test result.",
    },
    {
      type: "table",
      head: ["Gana", "Traditional nature", "Classical guna commonly linked with it", "The nine nakshatras"],
      rows: [
        [
          "Dev (deva, divine)",
          "Gentle, giving, drawn to peace, learning and ritual",
          "Sattva",
          "Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati",
        ],
        [
          "Manushya (human)",
          "Practical and sociable, balanced between family life and worldly work",
          "Rajas",
          "Bharani, Rohini, Ardra, Purva Phalguni, Uttara Phalguni, Purva Ashadha, Uttara Ashadha, Purva Bhadrapada, Uttara Bhadrapada",
        ],
        [
          "Rakshasa (fierce)",
          "Strong-willed, intense, independent, comfortable with conflict",
          "Tamas",
          "Krittika, Ashlesha, Magha, Chitra, Vishakha, Jyeshtha, Mula, Dhanishta, Shatabhisha",
        ],
      ],
    },
    {
      type: "p",
      text: "The sattva–rajas–tamas mapping in the third column is the association most often repeated in Indian matching books. Treat it as symbolic, in the same way the Vata–Pitta–Kapha mapping used for Nadi is symbolic: it is a way of remembering the grouping, not a claim about anyone's body or mind. B. V. Raman's Muhurtha, one of the most widely used English references on matching, describes the three simply as Deva for piety and charitable nature, Manusha as a mixture of good and bad, and Rakshasa as dominance and self-will — and the nine-nakshatra lists it gives are exactly the ones above.",
    },
    {
      type: "h2",
      text: "Nakshatra se gana kaise jaane: all 27 nakshatras",
    },
    {
      type: "p",
      text: "Find the Moon nakshatra (janma nakshatra) of each person in the table below. If you do not know it, make a free [kundli](/kundli) with date, time and place of birth, or use the quicker [Moon sign and Nakshatra finder](/moon-sign) — both show the nakshatra. This mapping is the standard one, and it is exactly what Astrojanta's [kundli matching tool](/matching) uses.",
    },
    {
      type: "table",
      head: ["#", "Nakshatra", "Gana", "Moon sign (rashi)"],
      rows: [
        ["1", "Ashwini", "Dev", "Aries (Mesh)"],
        ["2", "Bharani", "Manushya", "Aries (Mesh)"],
        ["3", "Krittika", "Rakshasa", "Aries / Taurus"],
        ["4", "Rohini", "Manushya", "Taurus (Vrishabh)"],
        ["5", "Mrigashira", "Dev", "Taurus / Gemini"],
        ["6", "Ardra", "Manushya", "Gemini (Mithun)"],
        ["7", "Punarvasu", "Dev", "Gemini / Cancer"],
        ["8", "Pushya", "Dev", "Cancer (Kark)"],
        ["9", "Ashlesha", "Rakshasa", "Cancer (Kark)"],
        ["10", "Magha", "Rakshasa", "Leo (Simha)"],
        ["11", "Purva Phalguni", "Manushya", "Leo (Simha)"],
        ["12", "Uttara Phalguni", "Manushya", "Leo / Virgo"],
        ["13", "Hasta", "Dev", "Virgo (Kanya)"],
        ["14", "Chitra", "Rakshasa", "Virgo / Libra"],
        ["15", "Swati", "Dev", "Libra (Tula)"],
        ["16", "Vishakha", "Rakshasa", "Libra / Scorpio"],
        ["17", "Anuradha", "Dev", "Scorpio (Vrishchik)"],
        ["18", "Jyeshtha", "Rakshasa", "Scorpio (Vrishchik)"],
        ["19", "Mula", "Rakshasa", "Sagittarius (Dhanu)"],
        ["20", "Purva Ashadha", "Manushya", "Sagittarius (Dhanu)"],
        ["21", "Uttara Ashadha", "Manushya", "Sagittarius / Capricorn"],
        ["22", "Shravana", "Dev", "Capricorn (Makar)"],
        ["23", "Dhanishta", "Rakshasa", "Capricorn / Aquarius"],
        ["24", "Shatabhisha", "Rakshasa", "Aquarius (Kumbh)"],
        ["25", "Purva Bhadrapada", "Manushya", "Aquarius / Pisces"],
        ["26", "Uttara Bhadrapada", "Manushya", "Pisces (Meen)"],
        ["27", "Revati", "Dev", "Pisces (Meen)"],
      ],
    },
    {
      type: "p",
      text: "Two practical notes. First, gana is assigned to the whole nakshatra, so the pada (charana) never changes it — unlike Nadi, where some methods fall back on padas. Second, where a nakshatra spans two rashis, such as Krittika or Punarvasu, the Moon sign in the last column depends on the pada; that does not affect the gana, but it does affect Bhakoot and some of the cancellation rules further down.",
    },
    {
      type: "p",
      text: "This list is remarkably stable. Across classical texts, modern matching books and the major Indian matching websites, the nine-nine-nine division above is the same. Where sources really do differ is the scoring, which is the next section.",
    },
    {
      type: "h2",
      text: "Gana Koota ke 6 gun: kaun sa pair kitna score karta hai",
    },
    {
      type: "p",
      text: "Here is the table Astrojanta's matching tool applies. It is the symmetric version — the one most online calculators use — in which the order of boy and girl never changes the result:",
    },
    {
      type: "table",
      head: ["Gana pairing", "Gana points (out of 6)", "How it is usually described"],
      rows: [
        ["Dev – Dev", "6", "Same gana — full marks"],
        ["Manushya – Manushya", "6", "Same gana — full marks"],
        ["Rakshasa – Rakshasa", "6", "Same gana — full marks, and not a dosha at all"],
        ["Dev – Manushya", "5", "Workable; a single point is deducted"],
        ["Manushya – Rakshasa", "1", "Weak — a token point survives"],
        ["Dev – Rakshasa", "0", "The zero that families call Gana Dosha"],
      ],
    },
    {
      type: "p",
      text: "The first thing worth noticing is that Rakshasa with Rakshasa gets the full 6, exactly like Dev with Dev. The koota rewards two people having the same temperament; it does not rank the three ganas against each other. Two Rakshasa gana nakshatras are a full-marks pairing in every version of this table.",
    },
    {
      type: "p",
      text: "Because each gana holds nine of the 27 nakshatras, the three are equally likely, and the spread of outcomes is easy to work out. Of all the ways two random nakshatras can meet, about a third score the full 6, about 22% score 5, about 22% score 1 and about 22% score 0. So a low Gana score is a common result, not a rare warning sign — and the most it can ever cost is 6 points out of 36, less than Nadi and less than Bhakoot.",
    },
    {
      type: "h3",
      text: "Yahan traditions alag hain: where published tables disagree",
    },
    {
      type: "p",
      text: "Gana is the one koota where you should expect two reputable websites to give you different numbers for the same couple. Nadi and Bhakoot are all-or-nothing and almost universally agreed; Gana is graded, and the grades vary. These are the three points of difference you will actually run into:",
    },
    {
      type: "table",
      head: ["Point of difference", "Version Astrojanta uses", "Other published versions"],
      rows: [
        ["Dev with Manushya", "5 points, either way round", "6 points in one direction and 5 in the other"],
        ["Dev with Rakshasa", "0 points", "1 point in some tables"],
        ["Manushya with Rakshasa", "1 point", "0 in most tables"],
        [
          "Does it matter who is the boy and who is the girl?",
          "No — the table is symmetric",
          "Yes in the classical reading; swapping the two can change the score",
        ],
      ],
    },
    {
      type: "p",
      text: 'The asymmetry in the last row is real and goes back to the source texts. Raman\'s Muhurtha states it in words rather than numbers: a Manusha or a Deva man should not marry a Rakshasa girl unless there are other neutralising factors, but a marriage between a Rakshasa man and a Deva or Manusha girl is "passable". In other words, the classical worry is specifically about a Rakshasa gana bride with a Dev or Manushya gana groom; the reverse arrangement is treated more leniently. Modern graded tables try to encode that as a 1 in one cell and a 0 in its mirror — and, honestly, they do not all encode it the same way round.',
    },
    {
      type: "p",
      text: "What this means for you is simple. If two kundli milan reports disagree by a point or two, Gana is the first place to look, and neither site is necessarily wrong. What almost never differs is which nakshatra belongs to which gana, so check the gana labels first — if those agree, the disagreement is only about the scoring table, and it is worth at most a few points out of 36.",
    },
    {
      type: "h2",
      text: "Gana Dosha kya hota hai?",
    },
    {
      type: "p",
      text: "Gana Dosha (also written gan dosh) is the name families give to a Gana koota score of 0 — and some write-ups extend it to the 1-point result as well. That is the whole definition. It is a label for one cell in a scoring table, not a condition that either person carries around. The same girl can show Gana Dosha with one boy and full marks with another, because the score describes the pair, not the person.",
    },
    {
      type: "p",
      text: 'It is also a less standardised term than Nadi Dosha or Bhakoot Dosha. Plenty of matching reports never print the phrase "Gana Dosha" at all, and simply show the row as 0 of 6 or 1 of 6. Astrojanta\'s tool is one of them — more on that below.',
    },
    {
      type: "h2",
      text: "Rakshasa gana aur Manushya gana marriage: the question families actually ask",
    },
    {
      type: "p",
      text: "This is the single most searched Gana question in India, so here is the plain answer. Under the table Astrojanta uses, a Manushya–Rakshasa pairing scores 1 of 6, so the couple loses 5 of the 36 gun. Under the tables that give it 0, they lose 6. A Dev–Rakshasa pairing scores 0 here, so it costs the full 6. That is the entire arithmetic effect: at worst, six points out of thirty-six.",
    },
    {
      type: "p",
      text: "What the tradition is actually describing is a difference in how two people react when something goes wrong at home. The classical picture is that a Dev gana nature smooths things over and withdraws from conflict, while a Rakshasa gana nature meets it head on and would rather have the argument than leave it unsaid. Manushya sits in between, practical and worldly. When those styles differ, the tradition expects more friction in daily family life, especially in a joint family where several temperaments share a house.",
    },
    {
      type: "p",
      text: "That is a reasonable thing for a tradition to notice, and it is also something a couple can talk about openly in a way they cannot talk about, say, a planetary period. It is not a prediction of quarrels, separation or anything else, and about a fifth of all random pairings land in each of these cells — which should tell you how many ordinary, long, happy marriages sit inside them.",
    },
    {
      type: "h2",
      text: "Kundli matching mein gana kaise check karein",
    },
    {
      type: "p",
      text: "You only need the two Moon nakshatras. The steps are short:",
    },
    {
      type: "ul",
      items: [
        "Collect both sets of birth details — date, exact time and place of birth for the boy and the girl. Indian birth records are in Indian Standard Time (IST, UTC+5:30), so enter the time exactly as written on the certificate rather than converting it; for a birth abroad, enter the local time and city.",
        "Open the [free kundli matching tool](/matching) and enter both charts. It works out each person's Moon sign and nakshatra and scores all eight kootas.",
        "Look up each nakshatra in the 27-nakshatra table above to see the gana, or read the Gana row of the result directly.",
        "Read the Gana row as a score out of 6. A 6 or 5 needs no further thought. A 1 or 0 is worth understanding — note both nakshatras, both Moon signs and both Moon-sign lords, then read the cancellation rules below.",
        "Birth time matters, but less here than for Nadi. The Moon crosses about one nakshatra a day, so an hour's error only changes the gana if the Moon was near a nakshatra boundary. Padas never change the gana.",
      ],
    },
    {
      type: "h2",
      text: "Astrojanta ka matching tool Gana ke liye kya karta hai (honestly)",
    },
    {
      type: "p",
      text: "Because families make real decisions with these numbers, here is exactly what our tool does with Gana, in plain words:",
    },
    {
      type: "ul",
      items: [
        "It calculates each person's sidereal Moon position using the open-source Astronomy Engine ephemeris with the Lahiri ayanamsa (not Swiss Ephemeris, though it follows the same Lahiri convention), and reads the Moon's nakshatra from it.",
        "It maps each nakshatra to Dev, Manushya or Rakshasa using the standard nine-nine-nine list in the table above.",
        "It scores Gana with the symmetric table: 6 for the same gana, 5 for Dev with Manushya, 1 for Manushya with Rakshasa and 0 for Dev with Rakshasa. Swapping the boy and the girl never changes the Gana score in our tool.",
        'It shows Gana as one row of the Eight kootas card, with the score out of 6 and a one-line note — "Same gana — temperaments align", "Partial gana match" or "Deva–Rakshasa mismatch".',
        'It does not print the words "Gana Dosha" anywhere. The Traditional cautions box in the result only ever flags Nadi dosha and Bhakoot dosha, so a 0 in Gana will show as a 0 and nothing more.',
        "It does not apply any Gana parihar. No cancellation rule is checked and no points are added back; the total out of 36 is always the raw total.",
        "It does not compare Navamsa (D9) charts and does not check Manglik Dosha — that is a separate check on the [Manglik page](/manglik).",
      ],
    },
    {
      type: "p",
      text: "This is the same conservative approach described in our [Nadi Dosha guide](/blog/nadi-dosha) and [Bhakoot Dosha guide](/blog/bhakoot-dosha): show the raw traditional score, and leave the exceptions to a human reading of both charts, because schools apply them differently. Our [methodology page](/about-methodology) explains how the underlying calculations are done.",
    },
    {
      type: "p",
      text: "One useful hint inside the result: the Graha Maitri row compares the same two Moon-sign lords that the main Gana cancellation rule uses. If Graha Maitri shows 5 of 5, those two lords are either the same planet or mutual natural friends in our friendship table — which is precisely the classical condition for setting Gana Dosha aside. It is a hint, not an automatic cancellation.",
    },
    {
      type: "h2",
      text: "Gana Dosha cancellation: kab maana jata hai ki dosha nahi hai? (parihar)",
    },
    {
      type: "p",
      text: "Classical matching tradition gives several conditions under which a weak Gana score is not treated as a problem. The ones most commonly cited are:",
    },
    {
      type: "ul",
      items: [
        "Friendly or identical Moon-sign lords. This is the main one. Raman's Muhurtha puts it directly: the evil due to the bride being born in a Rakshasa gana star may be ignored when the Moon signs stand 2/12, 5/9 or 6/8 from each other and the lords of those signs are the same planet or mutual friends. Several other sources state the sign-lord friendship condition on its own, without the rashi-distance requirement.",
        "Good Tara agreement. Some sources pair the sign-lord rule with a clean Tara (birth-star) count, treating Gana Dosha as not applying when the Tara koota is satisfactory.",
        "Same Moon sign with different nakshatras, or the same nakshatra in different Moon signs. This is the same exception commonly quoted for Nadi Dosha, and a number of texts extend it to Gana.",
        "Distance between the birth stars. Raman's Muhurtha adds, at the end of the Gana section, that if the bride's nakshatra is beyond the 14th from the bridegroom's, the evil may be ignored.",
      ],
    },
    {
      type: "p",
      text: "Two honest caveats. First, not every school accepts that Gana has a parihar at all; some astrologers hold that the Gana score is simply the score, and that the right response to a low one is to weigh it against the rest of the chart rather than to cancel it. Second, a parihar never changes the printed number — Gana still shows 0 or 1 in the 36-gun table. What changes is how much weight that number is given.",
    },
    {
      type: "p",
      text: "So, as with Nadi and Bhakoot, there is no single rulebook followed by every pandit in India. If you consult one, ask which exception they are applying and why. A calm, specific answer is a good sign; a vague answer followed by an expensive puja is not.",
    },
    {
      type: "h2",
      text: "Gana Dosha ke effects: calmly explained",
    },
    {
      type: "p",
      text: 'Relatives can attach very large warnings to this one small koota — "Rakshasa gana hai, swabhav theek nahi hoga", "roz jhagda hoga", "nibhega nahi". It helps to separate what the tradition says from what it cannot tell you.',
    },
    {
      type: "ul",
      items: [
        "Tradition reads Gana as temperament — the default style each person brings to disagreement and daily family life. Respecting that as one part of matching is reasonable.",
        "It is not a character assessment. The names Dev, Manushya and Rakshasa classify birth stars, not people, and no nakshatra makes anyone good or bad, gentle or aggressive.",
        'It is not a prediction of quarrels or separation. Older books use strong language about "prohibited ganas", but a six-point koota cannot forecast how two adults will treat each other.',
        "It is one koota out of eight, and the smallest of the three big ones. Losing all of Gana still leaves 30 of 36 available, and the usual rule of thumb treats 18 or more as acceptable.",
      ],
    },
    {
      type: "p",
      text: "Our view at Astrojanta is the same as for every other koota: do not reject a rishta on Gana alone, and do not wave a low score away without a look either. Check the exceptions, the overall score and both individual kundlis — then decide as a family, with the couple's own wishes at the centre.",
    },
    {
      type: "h2",
      text: "Gana kam ho to kya dekhein? What to check before shaadi",
    },
    {
      type: "p",
      text: "If your match shows 0 or 1 in Gana, here is what an experienced astrologer will usually look at before giving an opinion. Several of these you can see yourself in a free [kundli](/kundli):",
    },
    {
      type: "ul",
      items: [
        "The overall gun score. Gana is 6 of 36. A pair at 25 gun after losing Gana is in a very different position from one at 14. See our [gun milan guide](/blog/kundli-milan-online-free) for the usual score ranges.",
        "The Nadi and Bhakoot rows, which carry 8 and 7 points. A clean Nadi and Bhakoot alongside a weak Gana is a far better picture than the other way round; read [Nadi Dosha](/blog/nadi-dosha) and [Bhakoot Dosha](/blog/bhakoot-dosha) for those.",
        "The Graha Maitri row and the two Moon-sign lords, since friendly or identical lords are the main classical Gana exception.",
        "The 7th house and its lord in each chart — the primary indicators of marriage and partnership in the individual kundli.",
        "Venus (Shukra), and for the bride traditionally also Jupiter (Guru), as the natural significators of marriage and the spouse.",
        "The Navamsa (D9) chart. Many astrologers consider D9 essential for marriage, and a strong Navamsa can outweigh a weak koota. Astrojanta's matching tool does not compare D9 charts, so this needs a fuller reading.",
        "The running Vimshottari dasha of both people around and after the wedding; our [Mahadasha guide](/blog/vimshottari-mahadasha) explains how to find it. Timing often explains more about early married life than any matching score.",
        "Manglik status, which is checked separately from the eight kootas.",
      ],
    },
    {
      type: "p",
      text: "If you want a plain-language walk-through of a specific result — why Gana came to 1, what the sign lords are, how the rest of the score looks — you can ask our [AI astrologer](/ai-astrologer). Treat it as an explanation, not a verdict, and involve your family astrologer for the final view if that is your custom.",
    },
    {
      type: "h2",
      text: "Gana aur baaki koots: Varna, Bhakoot, Nadi aur Manglik",
    },
    {
      type: "p",
      text: "Gana sits sixth among the eight kootas. Varna (1 point) looks at spiritual temperament from the Moon sign and is explained in our [Varna Koota guide](/blog/varna-koota-meaning). Yoni (4 points) compares the animal symbols of the two nakshatras. Bhakoot (7 points) compares the two Moon signs, and Nadi (8 points) compares the nakshatras' nadi. Gana, Bhakoot and Nadi together carry 21 of the 36 gun, which is why these three come up most often in family conversations.",
    },
    {
      type: "p",
      text: "Gana, Yoni and Nadi are all read from the same janma nakshatra, so they tend to move together: if the birth time is wrong enough to change the nakshatra, three kootas change at once. Bhakoot and Varna depend on the Moon sign instead, which is why a small time correction can leave them untouched while Gana shifts.",
    },
    {
      type: "p",
      text: "Manglik Dosha is a separate matter altogether. It is not one of the eight kootas and does not change the 36-gun score; it comes from where Mars sits in each person's own chart. A match can score a full 6 in Gana and still need a Manglik check, or the reverse. You can check it with our free [Manglik tool](/manglik), and read the calm explanation in [Manglik Dosha meaning](/blog/manglik-dosha-meaning).",
    },
    {
      type: "h2",
      text: "Gana Dosha upay: simple, optional notes",
    },
    {
      type: "p",
      text: "You do not need to buy anything because of a low Gana score. Check the exceptions first — many cases already meet one of them. If your family still wishes to observe something, these are the low-cost, traditional options people commonly follow:",
    },
    {
      type: "ul",
      items: [
        "Follow your own family or community custom. Some families ask the family priest for a simple shanti path or prayer before the wedding; others do nothing at all. Both are legitimate choices.",
        "Worship of the nakshatra deities or of the two Moon-sign lords, done together at home or at a local temple.",
        "Daan and seva offered sincerely — food, clothing or help to people who need it. Most traditions agree on this, and it costs only what you choose to give.",
        'An honest conversation. Since Gana is about temperament, simply talking about how each of you handles an argument, and what each family expects day to day, is a sensible "upay" in any tradition — and the only one that reliably helps.',
      ],
    },
    {
      type: "p",
      text: "Be wary of anyone who says a costly puja, a gemstone or a special ritual is compulsory for Gana Dosha, or who uses the word Rakshasa to frighten a family into a purchase. A genuine astrologer explains the scoring, the exceptions and the whole chart first, and accepts that the decision is yours.",
    },
    {
      type: "h2",
      text: "Bottom line",
    },
    {
      type: "p",
      text: "Gana koota sorts the 27 nakshatras into Dev, Manushya and Rakshasa — nine each — and compares the boy's gana with the girl's for 6 of the 36 gun. Same gana scores the full 6, including Rakshasa with Rakshasa; Dev with Manushya scores 5; the crossings involving Rakshasa score 1 or 0, and that zero is what families call Gana Dosha. Published tables genuinely differ on those last cells, the classical texts worry mainly about a Rakshasa gana bride with a Dev or Manushya groom, and well-known exceptions set the whole thing aside when the Moon-sign lords are the same or friendly. Six points out of thirty-six is not a reason to end a rishta. Find both nakshatras, read the whole score, look at the charts — start with the [free kundli matching tool](/matching).",
    },
  ],
  faqs: [
    {
      q: "Gana kya hota hai?",
      a: "Gana is a classical grouping of the 27 nakshatras into three classes — Dev, Manushya and Rakshasa — with nine nakshatras in each. Your gana comes from the nakshatra the Moon occupied at your birth, and it is compared in kundli milan as the sixth koota, worth 6 of the 36 gun.",
    },
    {
      q: "Gana Dosha kya hota hai?",
      a: "Gana Dosha is the name families give to a Gana koota score of 0 — a Dev and Rakshasa pairing in the table Astrojanta uses — and some write-ups extend it to the 1-point result too. It describes the pair, not a person, and the same person can score 6 with a different partner.",
    },
    {
      q: "How many points is Gana in kundli matching?",
      a: "Gana carries 6 of the 36 gun, making it the third-heaviest koota after Nadi (8) and Bhakoot (7). Same gana scores 6, Dev with Manushya scores 5, and the pairings with Rakshasa score 1 or 0 depending on the table used.",
    },
    {
      q: "Which nakshatras belong to which gana?",
      a: "Dev: Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati. Manushya: Bharani, Rohini, Ardra, Purva Phalguni, Uttara Phalguni, Purva Ashadha, Uttara Ashadha, Purva Bhadrapada, Uttara Bhadrapada. Rakshasa: Krittika, Ashlesha, Magha, Chitra, Vishakha, Jyeshtha, Mula, Dhanishta, Shatabhisha.",
    },
    {
      q: "Can a Rakshasa gana boy marry a Manushya gana girl?",
      a: "Yes. That pairing scores 1 of 6 in the table Astrojanta uses and 0 in some others, so at most it costs 6 of the 36 gun. Classical sources treat a Rakshasa gana groom with a Manushya or Dev gana bride more leniently than the reverse arrangement. Look at the full score and both charts rather than this row alone.",
    },
    {
      q: "Is Rakshasa gana bad?",
      a: "No. Rakshasa is the name of a class of birth stars that the tradition calls forceful and independent; it is not a judgement on anyone's character. Two Rakshasa gana nakshatras together score the full 6 points, exactly like two Dev gana nakshatras.",
    },
    {
      q: "Why do two websites show different Gana scores for the same couple?",
      a: "Because Gana is the one koota where published tables differ. Sources disagree on whether Dev–Manushya is 5 or 6, on which of the two Rakshasa crossings keeps a single point, and on whether swapping the boy and girl changes the score. The nakshatra-to-gana list itself is almost always the same.",
    },
    {
      q: "Does Astrojanta's matching tool flag Gana Dosha?",
      a: 'No. It shows Gana as a row scored out of 6 with a short note, but it never prints the words "Gana Dosha". The Traditional cautions box in the result only flags Nadi dosha and Bhakoot dosha.',
    },
    {
      q: "When is Gana Dosha cancelled?",
      a: "The most commonly cited exception is that the two Moon-sign lords are the same planet or mutual friends; some sources add good Tara agreement, the same Moon sign with different nakshatras, or a large distance between the two birth stars. Schools differ, and some do not accept a Gana parihar at all.",
    },
    {
      q: "Does gana depend on the nakshatra pada?",
      a: "No. Gana is assigned to the whole nakshatra, so all four padas share the same gana. A birth-time correction only changes your gana if it moves the Moon into a different nakshatra altogether.",
    },
    {
      q: "Is a puja compulsory for Gana Dosha?",
      a: "No. Gana is worth 6 of 36, many cases already meet a classical exception, and no remedy is required. If your family wishes, simple prayer, a shanti path through your family priest or sincere daan is traditional; no paid ritual or gemstone is needed.",
    },
  ],
};

const kitneGunMilneChahiye: Post = {
  slug: "kitne-gun-milne-chahiye",
  title: "Kundli Milan: Kitne Gun Milne Chahiye? 18 Se Kam Ho To Kya",
  h1: "Kitne Gun Milne Chahiye – The 36-Gun Ashtakoot Breakdown, Score Bands, and What to Do When Kundli Milan Comes Below 18",
  description:
    "18 of 36 gun is the traditional minimum for shaadi. Score bands, why Nadi aur Bhakoot outweigh the total, kam gun milne par kya karein, plus a free check.",
  keyword: "kitne gun milne chahiye",
  author: "founder",
  published: "2026-11-12",
  updated: "2026-11-12",
  intro:
    "Eighteen. If you want the number and nothing else: 18 out of 36 gun is the minimum that traditional kundli milan treats as acceptable for marriage, and most Indian families are comfortable once the score reaches 25 or more. But the total is a summary of eight separate checks carried out on two charts, and summaries hide things — which is why a 28-gun match can worry a pandit while a 20-gun match is cleared without discussion. This guide explains how the 36 gun are built up koota by koota, what each score band conventionally means, why the total on its own is the least useful part of the report, and — the question most people are really asking — what to actually do when the number comes in below 18. You can run both charts first with the free [kundli matching tool](/matching) and read this with your own score in front of you.",
  body: [
    {
      type: "p",
      text: "Written in plain English, with the Hinglish words families use during a rishta: gun, koot, milan, dosha, parihar, shaadi.",
    },

    { type: "h2", text: "Seedha jawab: kitne gun milne chahiye?" },
    {
      type: "p",
      text: "The convention used across North and Central India is that 18 of 36 is the pass mark. Below 18, classical practice advises against the match or asks for a much closer look; from 18 to 24 the match is called average or workable; from 25 to 32 it is considered very good; and anything above 32 is treated as excellent and is genuinely rare. Those four bands are what almost every pandit, matrimonial site and online calculator is working from.",
    },
    {
      type: "p",
      text: "Two things are worth saying immediately, because they change how much weight the number deserves. First, these bands are a widely shared convention rather than a single classical decree — you will find respected sources that put the comfortable range at 21 and others that start it at 24, and no text fixes the cut-offs the way a syllabus fixes pass marks. Second, the score is a sum, and a sum can conceal the shape of what it is summing. The rest of this guide is mostly about that second point.",
    },

    { type: "h2", text: "36 gun kaise bante hain: the Ashtakoot breakdown" },
    {
      type: "p",
      text: "Ashtakoot means eight factors. Each koota compares one aspect of the two charts and carries a fixed maximum, and the eight maximums add up to 36. Every one of them is calculated from just two things per person: the Moon sign (rashi) and the Moon's birth star (nakshatra). Nothing else in either chart enters the 36-gun total — not the Lagna, not the Sun, not Mars.",
    },
    {
      type: "table",
      head: ["Koota", "Max gun", "What it compares"],
      rows: [
        ["Varna", "1", "Spiritual temperament, from the varna of each Moon sign"],
        ["Vashya", "2", "Mutual influence — who naturally gives way to whom"],
        ["Tara", "3", "Wellbeing, counted both ways between the two nakshatras"],
        ["Yoni", "4", "Physical and intimate compatibility, via the nakshatra's animal symbol"],
        ["Graha Maitri", "5", "Mental wavelength, from the friendship between the two Moon-sign lords"],
        ["Gana", "6", "Temperament class: Dev, Manushya or Rakshasa"],
        ["Bhakoot", "7", "Family welfare and finances, from the distance between the Moon signs"],
        ["Nadi", "8", "Constitution and progeny, from the Adi, Madhya or Antya nadi"],
        ["Total", "36", "The Ashtakoot gun milan score"],
      ],
    },
    {
      type: "p",
      text: "Each koota has its own guide here if you want the detail: [Varna](/blog/varna-koota-meaning) for the single point everyone ignores, [Gana](/blog/gana-dosha) for the Dev/Manushya/Rakshasa classes, [Bhakoot](/blog/bhakoot-dosha) for the 2/12, 5/9 and 6/8 rashi positions, and [Nadi](/blog/nadi-dosha) for the heaviest koota of all. Our [kundli milan online free](/blog/kundli-milan-online-free) guide walks through the whole process end to end.",
    },

    { type: "h3", text: "Why the eight are not equal" },
    {
      type: "p",
      text: "The weighting is the single most important thing to understand about the total, and it is the reason two matches on the same score can be in completely different positions. Nadi alone is 8 points and Bhakoot is 7, so those two carry 15 of the 36 between them. Add Gana at 6 and the top three account for 21 — well over half the available score. Varna, at 1 point, is worth less than a thirtieth of the total.",
    },
    {
      type: "p",
      text: "There is a neat way to see how uneven the weighting is: the five smallest kootas — Varna, Vashya, Tara, Yoni and Graha Maitri — add up to 15 points, which is exactly what Nadi and Bhakoot are worth between them. Half the system rests on two rows. So two couples can both score 20 and be in entirely different positions. One loses Nadi, Bhakoot and Varna and keeps everything else; the other keeps Nadi and Bhakoot at full marks and loses Gana, Graha Maitri, Yoni and Varna. Both reports print 20 of 36, and no astrologer would read them the same way. Always read the rows, not just the last line.",
    },

    { type: "h2", text: "Score bands: 18 se kam, 18–24, 25–32, 33–36" },
    {
      type: "table",
      head: ["Score", "Common label", "What it usually means in practice"],
      rows: [
        [
          "Below 18",
          "Not advised",
          "Traditionally discouraged. Most families either look closely for cancellations or move on to another rishta",
        ],
        [
          "18 to 24",
          "Average / acceptable",
          "Workable, and very common. Usually fine when Nadi and Bhakoot are clear and both charts are sound",
        ],
        [
          "25 to 32",
          "Very good",
          "The range most families are happy with; doshas are still checked separately",
        ],
        [
          "33 to 36",
          "Excellent",
          "Rare. Looks ideal on paper, and astrologers still check the 7th house, Navamsa and Manglik status",
        ],
      ],
    },
    {
      type: "p",
      text: "A 36 of 36 is a curiosity rather than a goal: it requires all eight kootas to reach their maximum at once, and some pairings cannot get there at all — Varna, for instance, awards its single point only when the boy's varna is not lower than the girl's. A score in the twenties with the heavy kootas clean is a better practical position than a high score with a dosha sitting inside it.",
    },

    { type: "h3", text: "Astrojanta ke tool ki lines kahan hain (honestly)" },
    {
      type: "p",
      text: "Our own [matching tool](/matching) labels the bands slightly differently from the convention above, and you should know that before comparing its badge with a pandit's wording. It calls 28 and above excellent, 24 to 27 good, 18 to 23 average, and anything below 18 \"Below 18 — traditionally not advised\". So a 26-gun match reads as \"Good match\" in our tool while the common convention would call the same score very good. The underlying koota scores are the same; only the labels on the bands differ.",
    },
    {
      type: "p",
      text: "Two more limits worth knowing. The tool's \"Traditional cautions\" box flags only two things — Nadi dosha and Bhakoot dosha — so it will not warn you about Gana or anything else. And it does not check Manglik status or compare Navamsa charts at all; Manglik is a separate check on the [Manglik page](/manglik). Our [methodology page](/about-methodology) describes how the underlying calculations are done.",
    },

    { type: "h2", text: "Total alone kaafi nahi: Nadi, Bhakoot aur Manglik" },
    {
      type: "p",
      text: "When a koota scores zero, two separate things happen: points are lost, and in the case of Nadi and Bhakoot the result also acquires a name. Nadi dosha and Bhakoot dosha are flagged as conditions in their own right, not merely as missing points, and that naming is why families react to them so strongly. A 28-gun match carrying Nadi dosha routinely causes more discussion than a 21-gun match with every heavy koota clear.",
    },
    {
      type: "p",
      text: "Here is the part that most online reports never tell you, and it matters more than any band: the classical exceptions can set a dosha aside without changing the printed number at all. [Nadi dosha](/blog/nadi-dosha) is commonly considered cancelled when the two share a rashi but not a nakshatra, or a nakshatra but not a rashi, or the same nakshatra in different padas. [Bhakoot dosha](/blog/bhakoot-dosha) is commonly set aside when both Moon-sign lords are the same planet or natural friends. The calculator still shows 0 of 8 or 0 of 7, and the total still looks low, while an astrologer applying the parihar reads the same chart as substantially clear. If your score is low, this is the first place to look.",
    },
    {
      type: "p",
      text: "[Manglik dosha](/blog/manglik-dosha-meaning) sits outside the system entirely. It comes from where Mars falls in each person's own chart, it is not one of the eight kootas, and it never changes the 36-gun total. A couple can score 30 and still need a Manglik conversation, or score 17 with no Manglik question at all.",
    },

    { type: "h2", text: "18 se kam gun mile to kya karein" },
    {
      type: "p",
      text: "A score below 18 is a reason to look more carefully, not a reason to panic or to end a rishta by text message. Work through these in order — the early steps resolve a surprising number of low scores on their own.",
    },
    {
      type: "ul",
      items: [
        "Check the birth details before anything else. This is the most common cause of a wrong score and the easiest to fix. Four of the eight kootas — Nadi, Gana, Yoni and Tara, worth 21 points together — are read from the nakshatra, and the Moon crosses a nakshatra in roughly a day. An error of a few hours in the birth time, or the wrong city, can move the Moon into the next star and change four rows at once. Use the time on the birth certificate, in IST for Indian births, and the actual city of birth rather than the family's home town.",
        "Read the rows and find the zeros. A total tells you nothing about its shape. Note exactly which kootas scored zero and how heavy they were, because losing Nadi and Bhakoot is a different situation from losing five small kootas.",
        "Apply the cancellations (parihar). Check the Nadi and Bhakoot exceptions described above against your own two charts. A great many low scores are low on paper and clear in practice once the exceptions are applied.",
        "Look at the two individual charts, not just the comparison. The 7th house and its lord are the primary marriage indicators in each kundli, with Venus for both partners and traditionally Jupiter for the bride. A sound 7th house in both charts carries real weight against a modest total. Start with a free [kundli](/kundli) for each person.",
        "Check Graha Maitri and the Moon signs. Graha Maitri is 5 points of mental compatibility and is also the basis of the main Bhakoot exception, so friendly or identical Moon-sign lords help twice over. The [Moon sign and Nakshatra finder](/moon-sign) gives you both quickly.",
        "Ask about the Navamsa (D9). Most astrologers consider the Navamsa essential for marriage, and a strong D9 can outweigh a weak Ashtakoot total. Our tool does not compare D9 charts, so this genuinely needs a human reading.",
        "Look at the timing. The running Vimshottari dasha of both people around the wedding often explains more about early married life than any koota does; our [Mahadasha guide](/blog/vimshottari-mahadasha) explains how to find it.",
        "Then consult a learned astrologer with both full charts. Not a screenshot of the score — the complete birth details for both people. Ask specifically which kootas failed, whether any parihar applies, and what the D9 and the 7th houses look like.",
      ],
    },
    {
      type: "p",
      text: "If you want a particular row explained before you sit down with an astrologer — why Bhakoot came to 0, what your two Moon-sign lords are, how the rest of the score reads — you can ask our [AI astrologer](/ai-astrologer) in Hindi, Hinglish or English. Treat it as an explanation of the calculation, not as a verdict on a marriage.",
    },

    { type: "h2", text: "Kam gun milne par shaadi: how families actually decide" },
    {
      type: "p",
      text: "Plenty of Indian marriages have taken place below 18 gun, including arranged matches cleared by astrologers who looked past the total and found the cancellations. Plenty of high-scoring matches have struggled. Ashtakoot milan compares two Moon positions; it does not measure values, honesty, temper, how two families behave with each other, or whether either person wants the same life. Those are the things a couple and their families have to assess themselves.",
    },
    {
      type: "p",
      text: "Where couples have already chosen each other — increasingly common across Indian cities and in NRI families — a low score is best used as a conversation starter rather than an obstacle. Ask what the weak kootas describe, discuss whether that pattern sounds familiar, and let the chart inform the conversation instead of ending it. Astrology is a lens for reflection, not certainty, and it is not a substitute for medical, legal or financial advice.",
    },

    { type: "h2", text: "Upay: sensible, optional and cheap" },
    {
      type: "p",
      text: "Nothing on this list is compulsory, and a low gun score by itself does not require a remedy. Check the exceptions first, because many matches already meet one. If your family still wishes to observe something, these are the traditional low-cost options:",
    },
    {
      type: "ul",
      items: [
        "Follow your own family or community custom — many families simply ask their priest for a short shanti path before the wedding, and many do nothing at all.",
        "Worship of the two Moon-sign lords, or of the nakshatra deities, done at home or at a local temple.",
        "Daan and seva given sincerely: food, clothing or help to people who genuinely need it. This costs only what you choose to give.",
        "An honest conversation between the couple about money, family expectations and how each of them behaves in an argument — the practical version of almost every classical upay.",
      ],
    },
    {
      type: "p",
      text: "Be careful of anyone who quotes a large figure to \"fix\" a low score, insists that only their puja can save the match, or describes a partner's wellbeing in frightening terms. A genuine astrologer explains which kootas failed, which exceptions apply and what the full charts show, and accepts that the decision belongs to your family.",
    },

    { type: "h2", text: "Myths vs facts" },
    {
      type: "table",
      head: ["Myth", "Fact"],
      rows: [
        [
          "Below 18 means the marriage will fail",
          "It means the traditional filter advises a closer look. Cancellations, the individual charts and the Navamsa all still have to be read",
        ],
        [
          "A higher score always means a happier marriage",
          "The score compares two Moon positions only. It cannot see values, communication or how either family behaves",
        ],
        [
          "36 of 36 is the goal",
          "It is extremely rare and still does not remove the need to check the 7th house, Navamsa and Manglik status",
        ],
        [
          "All 36 points matter equally",
          "Nadi and Bhakoot carry 15 points between them; Varna carries 1. Which points you lost matters more than how many",
        ],
        [
          "An online score is the final word",
          "Calculators print the raw koota scores. The classical exceptions that set a dosha aside are usually applied by a human, not by the tool",
        ],
        [
          "A low score needs an expensive puja",
          "No remedy is required. Check the parihar first; the traditional options are prayer, daan and conversation, and they cost nothing",
        ],
        [
          "Name-based matching is good enough",
          "Matching by name guesses the nakshatra from the first syllable. Date, exact time and place of birth are far more reliable",
        ],
      ],
    },

    { type: "h2", text: "Bottom line" },
    {
      type: "p",
      text: "Eighteen of 36 is the traditional minimum, 25 and above is the range most families are comfortable with, and 33 or more is rare. But the total is built from eight unequal checks on two Moon positions, and Nadi and Bhakoot alone decide 15 of the points — so which rows failed tells you far more than the sum does. If your score came in below 18, verify the birth details, find the zeros, apply the cancellations, read both full charts and then take it to an astrologer who will look at all of it. Run both charts free with [kundli matching](/matching), check [Manglik status](/manglik) separately for each person, and treat the number as the beginning of the conversation rather than the end of it.",
    },
  ],
  faqs: [
    {
      q: "Kundli milan me kitne gun milne chahiye?",
      a: "At least 18 of 36 is the traditional minimum for marriage. 18 to 24 is considered average or workable, 25 to 32 is very good, and above 32 is excellent and rare. Astrologers read the score alongside Nadi, Bhakoot and Manglik checks rather than on its own.",
    },
    {
      q: "36 me se kitne gun milne chahiye for a good match?",
      a: "25 or more out of 36 is the range most Indian families treat as a good match. Anything from 18 upwards is traditionally acceptable, provided the heavy kootas — Nadi (8 points) and Bhakoot (7 points) — are clear or their classical exceptions apply.",
    },
    {
      q: "18 se kam gun mile to shaadi ho sakti hai?",
      a: "Traditional practice advises a closer look rather than an automatic no. Check the birth details first, see which kootas scored zero, and check whether the Nadi or Bhakoot exceptions apply — these can set a dosha aside without changing the printed total. Then have both full charts read, including the Navamsa and the 7th house.",
    },
    {
      q: "What are the 8 koots in the 36 gun milan chart?",
      a: "Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7) and Nadi (8), adding up to 36. All eight are calculated from the Moon sign and Moon nakshatra of each partner.",
    },
    {
      q: "Why does my ashtakoot score look low when the astrologer says the match is fine?",
      a: "Most likely because a classical exception applies. Nadi dosha is commonly considered cancelled when the pair share a rashi but not a nakshatra, or a nakshatra but not a rashi; Bhakoot dosha is commonly set aside when the two Moon-sign lords are the same planet or friends. Calculators print the raw zero, while an astrologer applies the parihar.",
    },
    {
      q: "Is a 36 out of 36 gun milan score possible?",
      a: "It is possible but extremely rare, and it is not really a target. Even at 36, astrologers still check Manglik status, the 7th house and the Navamsa chart, none of which form part of the Ashtakoot total.",
    },
    {
      q: "Which gun matter most in kundli matching?",
      a: "Nadi at 8 points and Bhakoot at 7 carry the most weight, with Gana at 6 next. Those three decide 21 of the 36 points, which is why losing them concerns astrologers far more than losing Varna, worth a single point.",
    },
    {
      q: "Does a low guna milan score mean the marriage will have problems?",
      a: "No. The score is a traditional filter based only on the two Moon positions, so it cannot assess values, communication, finances or how two families get along. Many marriages below 18 gun do well and many high-scoring ones struggle.",
    },
    {
      q: "Can a wrong birth time change my gun milan score?",
      a: "Yes, noticeably. Nadi, Gana, Yoni and Tara are all read from the nakshatra and are worth 21 points together, and the Moon changes nakshatra roughly every day. A few hours' error, or the wrong birth city, can move the Moon into the next star and change four rows at once.",
    },
    {
      q: "Does Astrojanta's matching tool check Manglik dosha?",
      a: "No. The matching tool scores the eight kootas and flags Nadi and Bhakoot dosha only. Manglik is checked separately for each person on the free Manglik page, because it comes from Mars's house position rather than from the Moon.",
    },
    {
      q: "Is gun milan needed for a love marriage?",
      a: "It is entirely a family choice and not a requirement. Many couples who have already chosen each other run kundli milan to reassure their parents; in that situation the most useful part of the report is a clear explanation of any dosha and its exceptions, so the conversation at home rests on facts rather than fear.",
    },
  ],
};

export const POSTS: Post[] = [
  kitneGunMilneChahiye,
  ganaDosha,
  bhakootDosha,
  vimshottariMahadasha,
  nadiDosha,
  kaalSarpDosh,
  rashifal2027,
  shaniSadeSati2026,
  aiAstrologerFreeHindi,
  varnaKootaMeaning,
  manglikDoshaMeaning,
  kundliMilanOnlineFree,
  askAstrologerFree,
  aiKundliReader,
  freeAiKundli,
  mercuryRetrograde2026,
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
