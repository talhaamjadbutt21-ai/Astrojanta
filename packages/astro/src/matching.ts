import { type BirthDetails, type GunaMilan, type KootaScore, NAKSHATRAS, SIGNS } from "@astrojanta/shared";
import { computeChart } from "./chart";
import { SIGN_LORDS } from "./constants";
import { houseFrom } from "./math";

type Gana = "deva" | "manushya" | "rakshasa";
type Nadi = "adi" | "madhya" | "antya";
type Yoni =
  | "horse"
  | "elephant"
  | "sheep"
  | "serpent"
  | "dog"
  | "cat"
  | "rat"
  | "cow"
  | "buffalo"
  | "tiger"
  | "deer"
  | "monkey"
  | "mongoose"
  | "lion";

const GANA: Gana[] = [
  "deva",
  "manushya",
  "rakshasa",
  "manushya",
  "deva",
  "manushya",
  "deva",
  "deva",
  "rakshasa",
  "rakshasa",
  "manushya",
  "manushya",
  "deva",
  "rakshasa",
  "deva",
  "rakshasa",
  "deva",
  "rakshasa",
  "rakshasa",
  "manushya",
  "manushya",
  "deva",
  "rakshasa",
  "rakshasa",
  "manushya",
  "manushya",
  "deva",
];

const NADI: Nadi[] = [
  "adi",
  "madhya",
  "antya",
  "antya",
  "madhya",
  "adi",
  "adi",
  "madhya",
  "antya",
  "antya",
  "madhya",
  "adi",
  "adi",
  "madhya",
  "antya",
  "antya",
  "madhya",
  "adi",
  "adi",
  "madhya",
  "antya",
  "antya",
  "madhya",
  "adi",
  "adi",
  "madhya",
  "antya",
];

const YONI: Yoni[] = [
  "horse",
  "elephant",
  "sheep",
  "serpent",
  "serpent",
  "dog",
  "cat",
  "sheep",
  "cat",
  "rat",
  "rat",
  "cow",
  "buffalo",
  "tiger",
  "buffalo",
  "tiger",
  "deer",
  "deer",
  "dog",
  "monkey",
  "mongoose",
  "monkey",
  "lion",
  "horse",
  "lion",
  "cow",
  "elephant",
];

const YONI_ENEMIES: ReadonlyArray<readonly [Yoni, Yoni]> = [
  ["horse", "buffalo"],
  ["elephant", "lion"],
  ["sheep", "monkey"],
  ["serpent", "mongoose"],
  ["dog", "deer"],
  ["cat", "rat"],
  ["cow", "tiger"],
];

const VARNA = [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1];

type Vashya = "quadruped" | "human" | "water" | "insect" | "wild";
const VASHYA: Vashya[] = [
  "quadruped",
  "quadruped",
  "human",
  "water",
  "wild",
  "human",
  "human",
  "insect",
  "human",
  "quadruped",
  "human",
  "water",
];

const FRIENDS: Record<string, readonly string[]> = {
  Sun: ["Moon", "Mars", "Jupiter"],
  Moon: ["Sun", "Mercury"],
  Mars: ["Sun", "Moon", "Jupiter"],
  Mercury: ["Sun", "Venus"],
  Jupiter: ["Sun", "Moon", "Mars"],
  Venus: ["Mercury", "Saturn"],
  Saturn: ["Mercury", "Venus"],
};

function yoniScore(a: Yoni, b: Yoni): number {
  if (a === b) return 4;
  const enemy = YONI_ENEMIES.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  if (enemy) return 0;
  return 2;
}

function vashyaScore(boy: Vashya, girl: Vashya): number {
  if (boy === girl) return 2;
  if ((boy === "human" && girl === "quadruped") || (boy === "quadruped" && girl === "human")) return 1;
  if (boy === "wild" && girl === "quadruped") return 1;
  if (boy === "water" && (girl === "human" || girl === "insect")) return 1;
  return 0;
}

function grahaMaitri(boyLord: string, girlLord: string): number {
  if (boyLord === girlLord) return 5;
  const boyLikes = FRIENDS[boyLord]?.includes(girlLord) ?? false;
  const girlLikes = FRIENDS[girlLord]?.includes(boyLord) ?? false;
  if (boyLikes && girlLikes) return 5;
  if (boyLikes || girlLikes) return 4;
  return 1;
}

function taraScore(from: number, to: number): number {
  const count = ((to - from + 27) % 27) + 1;
  const tara = ((count - 1) % 9) + 1;
  return tara === 3 || tara === 5 || tara === 7 ? 0 : 1.5;
}

function ganaScore(boy: Gana, girl: Gana): number {
  if (boy === girl) return 6;
  if ((boy === "deva" && girl === "manushya") || (boy === "manushya" && girl === "deva")) return 5;
  if ((boy === "manushya" && girl === "rakshasa") || (boy === "rakshasa" && girl === "manushya")) return 1;
  return 0;
}

function bhakootScore(boySign: number, girlSign: number): number {
  const d = houseFrom(boySign, girlSign);
  if (d === 2 || d === 12 || d === 5 || d === 9 || d === 6 || d === 8) return 0;
  return 7;
}

function verdictOf(total: number): GunaMilan["verdict"] {
  if (total >= 28) return "excellent";
  if (total >= 24) return "good";
  if (total >= 18) return "average";
  return "poor";
}

/** Ashtakoot Guna Milan from the two Moon signs and Moon nakshatras (0–26). */
export function gunaMilan(input: {
  boy: { name: string; moonSignIndex: number; nakshatraIndex: number };
  girl: { name: string; moonSignIndex: number; nakshatraIndex: number };
}): GunaMilan {
  const boyNak = ((input.boy.nakshatraIndex % 27) + 27) % 27;
  const girlNak = ((input.girl.nakshatraIndex % 27) + 27) % 27;
  const boySign = ((input.boy.moonSignIndex % 12) + 12) % 12;
  const girlSign = ((input.girl.moonSignIndex % 12) + 12) % 12;

  const varna = VARNA[boySign]! >= VARNA[girlSign]! ? 1 : 0;
  const vashya = vashyaScore(VASHYA[boySign]!, VASHYA[girlSign]!);
  const tara = taraScore(girlNak, boyNak) + taraScore(boyNak, girlNak);
  const yoni = yoniScore(YONI[boyNak]!, YONI[girlNak]!);
  const graha = grahaMaitri(SIGN_LORDS[boySign]!, SIGN_LORDS[girlSign]!);
  const gana = ganaScore(GANA[boyNak]!, GANA[girlNak]!);
  const bhakoot = bhakootScore(boySign, girlSign);
  const nadi = NADI[boyNak] === NADI[girlNak] ? 0 : 8;

  const kootas: KootaScore[] = [
    {
      key: "varna",
      name: "Varna",
      nameHi: "वर्ण",
      max: 1,
      score: varna,
      note: varna ? "Spiritual temperament is compatible." : "The girl's varna is higher than the boy's.",
    },
    {
      key: "vashya",
      name: "Vashya",
      nameHi: "वश्य",
      max: 2,
      score: vashya,
      note:
        vashya === 2 ? "Mutual attraction is strong." : vashya === 1 ? "Moderate attraction." : "Weak mutual control.",
    },
    {
      key: "tara",
      name: "Tara",
      nameHi: "तारा",
      max: 3,
      score: tara,
      note:
        tara === 3
          ? "Birth stars support each other."
          : tara >= 1.5
            ? "One direction is strained."
            : "Both tara counts are inauspicious.",
    },
    {
      key: "yoni",
      name: "Yoni",
      nameHi: "योनि",
      max: 4,
      score: yoni,
      note: yoni === 4 ? "Same yoni — strong biological match." : yoni === 0 ? "Enemy yonis." : "Neutral yoni pairing.",
    },
    {
      key: "grahaMaitri",
      name: "Graha Maitri",
      nameHi: "ग्रह मैत्री",
      max: 5,
      score: graha,
      note: graha >= 4 ? "Moon-sign lords are friendly." : "Moon-sign lords are indifferent or inimical.",
    },
    {
      key: "gana",
      name: "Gana",
      nameHi: "गण",
      max: 6,
      score: gana,
      note:
        gana === 6 ? "Same gana — temperaments align." : gana === 0 ? "Deva–Rakshasa mismatch." : "Partial gana match.",
    },
    {
      key: "bhakoot",
      name: "Bhakoot",
      nameHi: "भकूट",
      max: 7,
      score: bhakoot,
      note: bhakoot ? "Moon signs support family life." : "Bhakoot dosha (2/12, 5/9 or 6/8 signs apart).",
    },
    {
      key: "nadi",
      name: "Nadi",
      nameHi: "नाड़ी",
      max: 8,
      score: nadi,
      note: nadi
        ? "Different nadis — favourable for health and children."
        : "Nadi dosha — same nadi. Traditionally a serious mismatch.",
    },
  ];

  const total = kootas.reduce((sum, k) => sum + k.score, 0);
  return {
    boy: { name: input.boy.name, moonSign: SIGNS[boySign]!, nakshatra: NAKSHATRAS[boyNak]! },
    girl: { name: input.girl.name, moonSign: SIGNS[girlSign]!, nakshatra: NAKSHATRAS[girlNak]! },
    kootas,
    total,
    max: 36,
    verdict: verdictOf(total),
    nadiDosha: nadi === 0,
    bhakootDosha: bhakoot === 0,
  };
}

function moonRef(chart: ReturnType<typeof computeChart>, name: string) {
  const moon = chart.planets.find((p) => p.name === "Moon")!;
  return { name, moonSignIndex: moon.signIndex, nakshatraIndex: NAKSHATRAS.indexOf(moon.nakshatra) };
}

export function matchKundlis(boy: BirthDetails, girl: BirthDetails): GunaMilan {
  return gunaMilan({ boy: moonRef(computeChart(boy), boy.name), girl: moonRef(computeChart(girl), girl.name) });
}
