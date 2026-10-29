export type ToolGuide = {
  id: string;
  path: string;
  appName: string;
  heading: string;
  sections: { title: string; paragraphs: string[] }[];
  related: { href: string; label: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const kundliGuide: ToolGuide = {
  id: "kundli",
  path: "/kundli",
  appName: "Astrojanta Free Janam Kundli",
  heading: "What is a Janam Kundli?",
  sections: [
    {
      title: "Your birth chart in Vedic astrology",
      paragraphs: [
        "A Janam Kundli (जन्म कुंडली), also called a birth chart or horoscope, is a map of where the Sun, Moon and planets were in the sky at the exact moment and place you were born. Vedic astrology (Jyotish) uses this map as the foundation for every reading — personality, career, marriage, health and the timing of life events.",
        "Unlike Western astrology, which uses the tropical zodiac tied to the seasons, Vedic astrology uses the sidereal zodiac tied to the fixed stars. The difference between the two is called the ayanamsa. Astrojanta uses the Lahiri (Chitrapaksha) ayanamsa, the standard adopted by the Government of India and used by most Indian astrologers, so your Rashi and Lagna will usually be about one sign behind your Western sun sign.",
      ],
    },
    {
      title: "What you need to make an accurate Kundli",
      paragraphs: [
        "You need three things: date of birth, exact time of birth and place of birth. The date fixes the planets, the place gives the latitude, longitude and time zone, and the time decides the Lagna (ascendant) — the zodiac sign rising on the eastern horizon. The Lagna changes roughly every two hours, so even a 10–15 minute error can shift house positions. Use the time on your birth certificate or hospital record whenever possible.",
      ],
    },
    {
      title: "How to read the main parts of your Kundli",
      paragraphs: [
        "Lagna (Ascendant): the first house and the lens for the whole chart — body, temperament and overall direction in life. The remaining eleven houses (bhavas) follow in order, each ruling an area of life: wealth (2nd), siblings and courage (3rd), home and mother (4th), children and intellect (5th), health and competition (6th), marriage and partnership (7th), longevity and transformation (8th), fortune and dharma (9th), career (10th), gains (11th) and losses or moksha (12th).",
        "Rashi (Moon sign): the sign the Moon occupied at birth. Vedic astrology gives the Moon sign more weight than the Sun sign, and it is used for daily horoscopes, Sade Sati and Kundli matching. Your birth Nakshatra — one of 27 lunar mansions — refines this further.",
        "Grahas (planets): Vedic astrology uses nine grahas — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn and the lunar nodes Rahu and Ketu. Their sign, house, and the houses they rule describe how each life area plays out.",
        "Divisional charts: the D1 (Rashi chart) is the main chart. The D9 Navamsa chart divides each sign into nine parts and is traditionally read for marriage, spouse and the inner strength of planets.",
      ],
    },
    {
      title: "Dasha: the timing system",
      paragraphs: [
        "Vimshottari dasha is a 120-year cycle of planetary periods. Your starting dasha is set by the Nakshatra of your Moon at birth, and each mahadasha (major period) is split into antardashas (sub-periods). Astrologers read the dasha running at any time together with transits to judge when events are likely. Your Kundli lists the dasha sequence with dates so you can see which period you are in now.",
      ],
    },
    {
      title: "AI Kundli: read your chart with an AI astrologer",
      paragraphs: [
        "A chart full of degrees and houses is hard to read on your own. Astrojanta's AI Kundli adds a conversation layer: once your chart is ready, create a free account and ask the AI astrologer questions about it in English, Hindi or Hinglish — career, marriage, money, or which dasha you are running now. The AI only interprets the chart data calculated by our engine; it does not make up planetary positions, and it shows which houses and planets its answer is based on.",
        "Guests can try each chart tool 3 times without signing up. The AI chat needs a free account.",
      ],
    },
    {
      title: "Kundli in Hindi (कुंडली हिंदी में)",
      paragraphs: [
        "अपनी जन्म कुंडली मुफ़्त बनाने के लिए जन्म तिथि, जन्म का सही समय और जन्म स्थान डालें। आपको लग्न, राशि, नक्षत्र, ग्रहों की स्थिति, नवांश कुंडली और विंशोत्तरी दशा तुरंत मिल जाएगी। फिर एआई ज्योतिषी से हिंदी या हिंग्लिश में पूछें — जैसे “मेरी शादी कब होगी?” या “मेरा करियर कैसा रहेगा?”",
      ],
    },
  ],
  related: [
    {
      href: "/matching",
      label: "Kundli Matching (36 Gun Milan)",
      text: "compare two charts for marriage compatibility.",
    },
    { href: "/manglik", label: "Manglik Dosha Calculator", text: "check Mars placement from Lagna and Moon." },
    { href: "/moon-sign", label: "Moon Sign & Nakshatra Calculator", text: "find your Rashi, Nakshatra and pada." },
    { href: "/ai-astrologer", label: "AI Astrologer", text: "ask questions about your Kundli in Hindi or English." },
    {
      href: "/blog/free-ai-kundli-online",
      label: "Guide: how to make and read your Kundli with AI",
      text: "the 12 houses, step-by-step, and a Hindi section.",
    },
  ],
  faqs: [
    {
      q: "Is this Janam Kundli really free?",
      a: "Yes. Generating your Kundli with Lagna, Rashi, Nakshatra, D1 and Navamsa charts, Vimshottari dasha, Manglik and Sade Sati check is free. Guests can try each chart tool 3 times without signing up; the AI chat needs a free account, and Pro only adds more daily attempts.",
    },
    {
      q: "What is an AI Kundli?",
      a: "An AI Kundli is your calculated Vedic birth chart plus an AI astrologer that explains it. Astrojanta calculates the chart with an astronomical ephemeris and Lahiri ayanamsa; the AI then answers your questions about that chart in plain English, Hindi or Hinglish.",
    },
    {
      q: "What if I don't know my exact birth time?",
      a: "The planets' signs will mostly still be correct, but the Lagna and house positions can be wrong because the ascendant changes about every two hours. Use the most precise time you can find; a birth certificate or hospital record is best.",
    },
    {
      q: "Which ayanamsa does Astrojanta use?",
      a: "Astrojanta uses the Lahiri (Chitrapaksha) ayanamsa with the sidereal zodiac, the standard used by most Indian astrologers and almanacs.",
    },
    {
      q: "What is the difference between Lagna and Rashi?",
      a: "Lagna is the sign rising on the eastern horizon at your birth and depends on birth time and place. Rashi is the sign the Moon was in. Both are important; Rashi is used for horoscopes and matching, Lagna for house-based readings.",
    },
    {
      q: "What is Navamsa (D9) used for?",
      a: "The Navamsa divides each sign into nine parts. It is traditionally read for marriage and spouse, and to judge how strong planets in the main D1 chart really are.",
    },
    {
      q: "Can I ask questions about my Kundli in Hindi?",
      a: "Yes. After creating your chart you can chat with the AI astrologer in English, Hindi or Hinglish about career, marriage, dasha and more.",
    },
  ],
};

export const matchingGuide: ToolGuide = {
  id: "matching",
  path: "/matching",
  appName: "Astrojanta Kundli Matching",
  heading: "How Kundli Matching (Ashtakoot Guna Milan) works",
  sections: [
    {
      title: "What is Gun Milan?",
      paragraphs: [
        "Kundli matching, also called Gun Milan or Guna Milan (गुण मिलान), is the traditional Vedic method of checking marriage compatibility between two people. The most widely used system in North India is Ashtakoot — 'eight factors' — which compares the Moon sign (Rashi) and birth Nakshatra of the bride and groom and awards up to 36 points (gunas).",
        "Because it is based on the Moon, accurate birth date, time and place for both people matter. The Moon moves through a Nakshatra in about a day, so a wrong birth date or time can change the result.",
      ],
    },
    {
      title: "The 8 kootas and their points",
      paragraphs: [
        "Varna (1 point) — spiritual and ego compatibility. Vashya (2) — mutual attraction and influence. Tara (3) — birth-star compatibility and wellbeing. Yoni (4) — physical and sexual compatibility, based on the animal symbol of each Nakshatra. Graha Maitri (5) — friendship between the lords of the two Moon signs, i.e. mental compatibility. Gana (6) — temperament: Deva, Manushya or Rakshasa. Bhakoot (7) — the relative position of the two Moon signs, linked to family welfare and finances. Nadi (8) — Adi, Madhya or Antya nadi, traditionally linked to health and progeny.",
        "Together these add up to 36 points. Higher-weighted kootas such as Nadi, Bhakoot and Gana carry the most importance.",
      ],
    },
    {
      title: "How many gunas should match?",
      paragraphs: [
        "By common convention, fewer than 18 out of 36 is considered not recommended, 18–24 is average or acceptable, 25–32 is very good, and above 32 is excellent. These ranges are guidelines, not hard rules — an astrologer will also look at the full charts, the 7th house, Venus, the Navamsa and Manglik status.",
      ],
    },
    {
      title: "Nadi dosha and Bhakoot dosha",
      paragraphs: [
        "Nadi dosha occurs when both people have the same Nadi, giving 0 out of 8 points in that koota. Bhakoot dosha occurs when the Moon signs are in certain positions from each other (2/12, 6/8 or 5/9), giving 0 out of 7. Classical texts list exceptions (parihara) that can cancel these doshas, for example when the Moon-sign lords are the same or friends, or in some cases when the Nakshatras differ. Your matching report flags these doshas so you can discuss them in context.",
        "Kundli matching is one input among many. Compatibility, communication and shared values still matter most; treat the score as guidance rather than a verdict.",
      ],
    },
  ],
  related: [
    {
      href: "/manglik",
      label: "Manglik Dosha Calculator",
      text: "check both partners for Mangal dosha before matching.",
    },
    { href: "/kundli", label: "Free Janam Kundli", text: "see each partner's full birth chart and dasha." },
    {
      href: "/moon-sign",
      label: "Moon Sign & Nakshatra Calculator",
      text: "find the Rashi and Nakshatra used in matching.",
    },
  ],
  faqs: [
    {
      q: "How many gunas are needed for marriage?",
      a: "Traditionally at least 18 out of 36 gunas is considered acceptable, 25–32 is very good and above 32 is excellent. Astrologers also check doshas and the full charts, so the score alone is not the final word.",
    },
    {
      q: "What are the 8 kootas in Ashtakoot matching?",
      a: "Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7) and Nadi (8), adding up to 36 points.",
    },
    {
      q: "What is Nadi dosha?",
      a: "Nadi dosha happens when both partners share the same Nadi (Adi, Madhya or Antya), scoring 0 of 8 points. It is traditionally linked to health and progeny, and classical texts list some cancellation conditions.",
    },
    {
      q: "Can I match Kundli by name only?",
      a: "Name-based matching uses the first syllable to guess a Nakshatra and is far less reliable. Astrojanta matches using actual birth date, time and place to calculate each person's Moon sign and Nakshatra.",
    },
    {
      q: "Does Kundli matching check Manglik dosha?",
      a: "Guna Milan itself does not include Manglik dosha. Use the free Manglik calculator for both partners alongside the matching score.",
    },
  ],
};

export const manglikGuide: ToolGuide = {
  id: "manglik",
  path: "/manglik",
  appName: "Astrojanta Manglik Dosha Calculator",
  heading: "What is Manglik Dosha?",
  sections: [
    {
      title: "Meaning of Manglik (Mangal) Dosha",
      paragraphs: [
        "Manglik dosha, also called Mangal dosha or Kuja dosha (मंगल दोष), is a placement of Mars that Vedic astrology traditionally links to friction in marriage. A person is called Manglik when Mars sits in the 1st, 2nd, 4th, 7th, 8th or 12th house of the birth chart. Many astrologers check this from the Lagna (ascendant) and also from the Moon, and some from Venus as well.",
        "Mars represents energy, drive, courage and aggression. In houses connected with self, family, home, partnership, longevity and the bed, its fiery nature is said to show up as impatience, arguments or intensity in relationships — which is why the check is part of pre-marriage matching.",
      ],
    },
    {
      title: "Effects and how seriously to take it",
      paragraphs: [
        "Mars falls in one of these six houses for a large share of people, so being Manglik is very common. Its strength varies: Mars in its own signs (Aries, Scorpio) or exalted (Capricorn), or aspected by benefics like Jupiter, is generally considered milder. Results also depend on the rest of the chart and the running dasha. Treat a Manglik result as something to understand, not something to fear.",
      ],
    },
    {
      title: "Common cancellation conditions",
      paragraphs: [
        "Classical and traditional texts list several situations where Manglik dosha is considered cancelled or reduced. The best known is when both partners are Manglik, so the energies are said to balance. Others include Mars in its own or exaltation sign, Mars in certain signs for specific houses, and strong Jupiter or Venus influence. Different traditions use different lists, so the calculator shows where Mars is placed and notes the cancellation factors it finds rather than giving a single yes/no verdict.",
        "Many people also mention an age-based cancellation (often 28). This is a popular belief rather than a rule found consistently in classical texts.",
      ],
    },
    {
      title: "Remedies people traditionally follow",
      paragraphs: [
        "Traditional remedies include matching with another Manglik partner, Mangal-related prayers such as the Hanuman Chalisa, fasting on Tuesdays and charity. These are cultural and spiritual practices; Astrojanta presents them for information only and does not claim guaranteed outcomes.",
      ],
    },
  ],
  related: [
    {
      href: "/matching",
      label: "Kundli Matching (36 Gun Milan)",
      text: "combine the Manglik check with the guna score.",
    },
    { href: "/kundli", label: "Free Janam Kundli", text: "see Mars and every planet in your full chart." },
    { href: "/moon-sign", label: "Moon Sign Calculator", text: "Manglik is also checked from the Moon." },
  ],
  faqs: [
    {
      q: "How do I know if I am Manglik?",
      a: "You are considered Manglik if Mars is in the 1st, 2nd, 4th, 7th, 8th or 12th house of your birth chart, counted from the Lagna and often also from the Moon. Enter your birth date, time and place in the calculator to check.",
    },
    {
      q: "Can a Manglik marry a non-Manglik?",
      a: "Traditionally, matching two Manglik partners is preferred, but many astrologers allow a match when the dosha is mild or cancelled by other factors in either chart. It should be judged with the full charts and Guna Milan.",
    },
    {
      q: "Does Manglik dosha end at age 28?",
      a: "This is a popular belief, but it is not consistently found in classical texts. Most astrologers look at Mars's actual strength and cancellation factors instead.",
    },
    {
      q: "What cancels Manglik dosha?",
      a: "Common cancellation factors include both partners being Manglik, Mars in its own sign (Aries, Scorpio) or exalted (Capricorn), and benefic aspects from Jupiter. Traditions differ, so the calculator lists the factors it finds.",
    },
    {
      q: "Is Manglik dosha checked from Lagna or Moon?",
      a: "Both. Astrojanta checks Mars from the Lagna and from the Moon; a dosha present from both is considered stronger.",
    },
  ],
};

export const moonSignGuide: ToolGuide = {
  id: "moon-sign",
  path: "/moon-sign",
  appName: "Astrojanta Moon Sign & Nakshatra Calculator",
  heading: "Moon sign (Rashi) and Nakshatra explained",
  sections: [
    {
      title: "What is a Moon sign in Vedic astrology?",
      paragraphs: [
        "Your Moon sign, or Rashi (राशि), is the zodiac sign the Moon occupied at the moment you were born. In Vedic astrology the Moon represents the mind (manas), emotions and how you instinctively respond to life, which is why Indian astrologers give the Rashi more weight than the Sun sign. Daily and yearly horoscopes (rashifal), Sade Sati and Kundli matching are all read from the Moon sign.",
        "The twelve Rashis are Mesh (Aries), Vrishabh (Taurus), Mithun (Gemini), Kark (Cancer), Simha (Leo), Kanya (Virgo), Tula (Libra), Vrishchik (Scorpio), Dhanu (Sagittarius), Makar (Capricorn), Kumbh (Aquarius) and Meen (Pisces).",
      ],
    },
    {
      title: "Why your Vedic sign differs from your Western sign",
      paragraphs: [
        "Western astrology uses the tropical zodiac and usually talks about your Sun sign. Vedic astrology uses the sidereal zodiac, aligned with the fixed stars, and focuses on the Moon. The gap between the two zodiacs (the ayanamsa) is currently about 24 degrees, so planets often fall one sign earlier in a Vedic chart. Astrojanta uses the Lahiri ayanamsa.",
        "The Moon moves fast — about one sign every two and a half days — so you need the correct date and, ideally, birth time and place. Near a sign boundary the time can change your Rashi.",
      ],
    },
    {
      title: "What is a Nakshatra?",
      paragraphs: [
        "Nakshatras are the 27 lunar mansions of Vedic astrology, from Ashwini to Revati. Each covers 13°20′ of the zodiac, and the one holding your Moon is your birth star (janma nakshatra). Each Nakshatra is divided into four padas of 3°20′, which link it to the Navamsa chart and to the traditional starting syllables used for baby names.",
        "Your birth Nakshatra decides where your Vimshottari dasha begins, and it is the basis of several kootas in Kundli matching such as Tara, Yoni, Gana and Nadi. Each Nakshatra has a ruling planet, a deity and a symbol that astrologers use to describe temperament.",
      ],
    },
    {
      title: "How to use your result",
      paragraphs: [
        "Use your Rashi to read rashifal and to check Sade Sati — the roughly seven-and-a-half-year period when Saturn transits the sign before, the sign of, and the sign after your Moon. Use your Nakshatra and pada for naming, Kundli matching and understanding your dasha sequence. For the complete picture, generate your full Janam Kundli.",
      ],
    },
  ],
  related: [
    { href: "/kundli", label: "Free Janam Kundli", text: "full birth chart with Lagna, houses and dasha." },
    { href: "/matching", label: "Kundli Matching (36 Gun Milan)", text: "uses both partners' Rashi and Nakshatra." },
    { href: "/manglik", label: "Manglik Dosha Calculator", text: "Mars is checked from your Moon sign too." },
  ],
  faqs: [
    {
      q: "Is my Moon sign the same as my zodiac sign?",
      a: "Not usually. The zodiac sign people quote in Western astrology is the tropical Sun sign. Your Vedic Moon sign is the sidereal sign of the Moon at birth and is often completely different.",
    },
    {
      q: "Do I need my birth time to find my Moon sign?",
      a: "Usually the date is enough, because the Moon stays in a sign for about two and a half days. If you were born on a day when the Moon changed sign, the time decides your Rashi and Nakshatra.",
    },
    {
      q: "How many Nakshatras are there?",
      a: "There are 27 Nakshatras, each spanning 13°20′ of the zodiac and divided into four padas of 3°20′.",
    },
    {
      q: "What is Nakshatra pada used for?",
      a: "The pada links your Moon to a Navamsa sign and gives the traditional starting syllable for names. It also refines personality descriptions.",
    },
    {
      q: "Why is my Vedic sign one sign behind my Western sign?",
      a: "Vedic astrology uses the sidereal zodiac. Because of the precession of the equinoxes, it is currently about 24° behind the tropical zodiac used in Western astrology.",
    },
    { q: "Which ayanamsa is used?", a: "Astrojanta uses the Lahiri (Chitrapaksha) ayanamsa." },
  ],
};
