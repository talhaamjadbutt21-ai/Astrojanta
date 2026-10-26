import { type ChartPlacement, layoutNorthIndianChart, PLANET_ABBR, SIGNS } from "@astrojanta/shared";

export function NorthIndianChart({
  ascendantSignIndex,
  placements,
  title,
}: {
  ascendantSignIndex: number;
  placements: ChartPlacement[];
  title: string;
}) {
  const houses = layoutNorthIndianChart(ascendantSignIndex, placements);

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

      {houses.map(({ house, signIndex, sign, placements: items }) => {
        return (
          <g key={house}>
            <text x={sign[0]} y={sign[1]} fontSize="12" fill="#a7a3c9" textAnchor="middle" dominantBaseline="central">
              <tspan>{signIndex + 1}</tspan>
              <title>{SIGNS[signIndex]}</title>
            </text>
            {items.map((p) => {
              const isLagna = p.name === "Lagna";
              return (
                <text
                  key={p.name}
                  x={p.x}
                  y={p.y}
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
