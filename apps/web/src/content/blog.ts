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
  published: string; // ISO date
  updated: string;
  intro: string;
  body: Block[];
  faqs: { q: string; a: string }[];
};

const mercuryRetrograde2026: Post = {
  slug: "mercury-retrograde-2026",
  title: "Mercury Retrograde Oct–Nov 2026: Dates, Effects by Rashi & What to Avoid",
  h1: "Mercury Retrograde October–November 2026: Dates, Effects by Rashi and What to Avoid",
  description:
    "Mercury retrograde 2026 dates (24 Oct–13 Nov) in IST, its Vedic position in Tula, the meaning of a retrograde, effects for each Moon sign and practical do's and don'ts.",
  keyword: "mercury retrograde 2026 dates",
  published: "2026-10-26",
  updated: "2026-10-26",
  intro:
    "Mercury — Budh in Vedic astrology — turned retrograde on 24 October 2026 and stays retrograde until 13 November 2026. This is the third and final Mercury retrograde of the year. Below you will find the exact dates in Indian time, where Mercury is in the sidereal (Vedic) zodiac, what a retrograde actually means, how it may play out for your Moon sign, and a practical list of what to do and what to avoid.",
  body: [
    { type: "h2", text: "Mercury retrograde 2026 dates (in IST)" },
    {
      type: "p",
      text: "Mercury has three retrograde periods in 2026. The first ran from late February to 20 March, the second from 29 June to 23 July, and the third is the one happening now:",
    },
    {
      type: "table",
      head: ["Event", "Date and time (IST, approx.)", "Mercury's position (Vedic / sidereal)"],
      rows: [
        ["Stations retrograde", "Saturday 24 October 2026, ~12:43 PM", "about 26°46′ Tula (Libra), Vishakha nakshatra"],
        ["Stations direct", "Friday 13 November 2026, ~9:24 PM", "about 10°49′ Tula (Libra), Swati nakshatra"],
        ["Post-retrograde shadow ends", "around 30 November 2026", "Mercury returns to ~26°46′ Tula"],
      ],
    },
    {
      type: "p",
      text: "Station times are approximate to within a few hours because a planet barely moves near its station — what matters is the day, not the minute. Many Western websites say this retrograde happens “in Scorpio”. That is true in the tropical zodiac. In Vedic astrology, which uses the sidereal zodiac with the Lahiri ayanamsa (roughly 24° in 2026), the whole retrograde stays inside Tula (Libra). That is why your Vedic reading of this period can differ from a Western horoscope.",
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
      text: "Generic Rashi predictions can only go so far. Astrojanta's [Vedic AI astrologer](/ai-astrologer) reads your actual Kundli — Lagna, Moon, houses and current dasha — and can explain how this Mercury retrograde interacts with your chart, in Hindi, Hinglish or English. Start with your free Kundli, then ask something specific, like “Which house is Mercury retrograde transiting for me, and what should I review at work?”",
    },
  ],
  faqs: [
    {
      q: "What are the Mercury retrograde 2026 dates?",
      a: "Mercury is retrograde three times in 2026: late February to 20 March, 29 June to 23 July, and 24 October to 13 November 2026. The current one began around 12:43 PM IST on 24 October and ends around 9:24 PM IST on 13 November.",
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

export const POSTS: Post[] = [mercuryRetrograde2026];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
