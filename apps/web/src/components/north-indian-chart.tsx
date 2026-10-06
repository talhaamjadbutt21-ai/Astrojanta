import { SIGNS } from "@sebt/shared";
import { PLANET_ABBR } from "@/lib/format";

export interface ChartPlacement {
  name: string;
  signIndex: number;
  retrograde?: boolean;
}

// Text anchor (planets) and sign-number anchor per house, in a 400×400 North Indian layout (houses run anticlockwise).
const HOUSE_ANCHORS: Record<number, { planets: [number, number]; sign: [number, number] }> = {
  1: { planets: [200, 100], sign: [200, 178] },
  2: { planets: [100, 42], sign: [100, 84] },
  3: { planets: [42, 100], sign: [84, 100] },
  4: { planets: [100, 200], sign: [178, 200] },
  5: { planets: [42, 300], sign: [84, 300] },
  6: { planets: [100, 358], sign: [100, 316] },
  7: { planets: [200, 300], sign: [200, 222] },
  8: { planets: [300, 358], sign: [300, 316] },
  9: { planets: [358, 300], sign: [316, 300] },
  10: { planets: [300, 200], sign: [222, 200] },
  11: { planets: [358, 100], sign: [316, 100] },
  12: { planets: [300, 42], sign: [300, 84] },
};

const KENDRA = new Set([1, 4, 7, 10]);

export function NorthIndianChart({
  ascendantSignIndex,
  placements,
  title,
}: {
  ascendantSignIndex: number;
  placements: ChartPlacement[];
  title: string;
}) {
  const byHouse = new Map<number, ChartPlacement[]>();
  for (const p of placements) {
    const house = ((p.signIndex - ascendantSignIndex + 12) % 12) + 1;
    byHouse.set(house, [...(byHouse.get(house) ?? []), p]);
  }

  return (
    <svg viewBox="-6 -6 412 412" className="w-full" role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <linearGradient id="nic-stroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fde3a7" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>
        <radialGradient id="nic-fill" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#211c58" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0d0b29" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        rx="18"
        fill="url(#nic-fill)"
        stroke="url(#nic-stroke)"
        strokeWidth="2"
      />
      <g stroke="url(#nic-stroke)" strokeOpacity="0.7" strokeWidth="1.3" fill="none">
        <line x1="0" y1="0" x2="400" y2="400" />
        <line x1="400" y1="0" x2="0" y2="400" />
        <polygon points="200,0 400,200 200,400 0,200" />
      </g>
      <polygon points="200,0 300,100 200,200 100,100" fill="#f8cf72" fillOpacity="0.06" />

      {Array.from({ length: 12 }, (_, i) => {
        const house = i + 1;
        const { planets, sign } = HOUSE_ANCHORS[house]!;
        const signIndex = (ascendantSignIndex + i) % 12;
        const items = byHouse.get(house) ?? [];
        const perRow = KENDRA.has(house) ? 3 : 2;
        const rows = Math.ceil(items.length / perRow);
        return (
          <g key={house}>
            <text x={sign[0]} y={sign[1]} fontSize="12" fill="#a7a3c9" textAnchor="middle" dominantBaseline="central">
              <tspan>{signIndex + 1}</tspan>
              <title>{SIGNS[signIndex]}</title>
            </text>
            {items.map((p, idx) => {
              const row = Math.floor(idx / perRow);
              const col = idx % perRow;
              const inRow = Math.min(perRow, items.length - row * perRow);
              const x = planets[0] + (col - (inRow - 1) / 2) * 34;
              const y = planets[1] + (row - (rows - 1) / 2) * 20;
              const isLagna = p.name === "Lagna";
              return (
                <text
                  key={p.name}
                  x={x}
                  y={y}
                  fontSize={isLagna ? 12 : 14}
                  fontWeight={600}
                  fill={isLagna ? "#ff8a3d" : "#fde3a7"}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {isLagna ? "Asc" : PLANET_ABBR[p.name]}
                  {p.retrograde && p.name !== "Rahu" && p.name !== "Ketu" ? (
                    <tspan fontSize="9" fill="#c4b5fd">
                      ℞
                    </tspan>
                  ) : null}
                  <title>{p.name}</title>
                </text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
