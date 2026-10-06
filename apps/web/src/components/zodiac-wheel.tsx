import { cn } from "@/lib/cn";
import { SIGN_GLYPHS } from "@/lib/format";

const TICK_DEGREES = Array.from({ length: 72 }, (_, i) => i * 5);
const SPOKE_DEGREES = [0, 90, 180, 270];

/** Decorative, slowly rotating zodiac wheel (pure SVG + CSS, no JS). */
export function ZodiacWheel({ className }: { className?: string }) {
  const r = 180;
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgb(248_207_114/0.35),rgb(167_139_250/0.12)_45%,transparent_70%)] blur-2xl" />
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <linearGradient id="wheel-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff0c9" />
            <stop offset="55%" stopColor="#f2b544" />
            <stop offset="100%" stopColor="#ff8a3d" />
          </linearGradient>
        </defs>
        <circle r={r} fill="none" stroke="url(#wheel-gold)" strokeOpacity="0.55" strokeWidth="1.2" />
        <circle r={r - 34} fill="none" stroke="url(#wheel-gold)" strokeOpacity="0.35" strokeWidth="0.8" />
        <circle r={r - 98} fill="none" stroke="#c4b5fd" strokeOpacity="0.25" strokeWidth="0.8" strokeDasharray="2 6" />
        {SIGN_GLYPHS.map((glyph, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180;
          const mid = (((i + 0.5) * 30 - 90) * Math.PI) / 180;
          return (
            <g key={glyph}>
              <line
                x1={Math.cos(a) * (r - 34)}
                y1={Math.sin(a) * (r - 34)}
                x2={Math.cos(a) * r}
                y2={Math.sin(a) * r}
                stroke="#f8cf72"
                strokeOpacity="0.4"
              />
              <text
                x={Math.cos(mid) * (r - 17)}
                y={Math.sin(mid) * (r - 17)}
                fill="#fde3a7"
                fontSize="17"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {glyph}
              </text>
            </g>
          );
        })}
        {TICK_DEGREES.map((deg) => {
          const a = (deg * Math.PI) / 180;
          const len = deg % 30 === 0 ? 8 : 4;
          return (
            <line
              key={deg}
              x1={Math.cos(a) * (r - 34)}
              y1={Math.sin(a) * (r - 34)}
              x2={Math.cos(a) * (r - 34 - len)}
              y2={Math.sin(a) * (r - 34 - len)}
              stroke="#fde3a7"
              strokeOpacity="0.35"
            />
          );
        })}
      </svg>
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 size-full animate-spin-slower" aria-hidden="true">
        {SPOKE_DEGREES.map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={Math.cos(a) * 30}
              y1={Math.sin(a) * 30}
              x2={Math.cos(a) * 140}
              y2={Math.sin(a) * 140}
              stroke="#c4b5fd"
              strokeOpacity="0.25"
            />
          );
        })}
        <polygon points="0,-120 104,60 -104,60" fill="none" stroke="#f8cf72" strokeOpacity="0.3" strokeWidth="0.8" />
        <polygon points="0,120 104,-60 -104,-60" fill="none" stroke="#f8cf72" strokeOpacity="0.3" strokeWidth="0.8" />
      </svg>
      <div className="absolute inset-[38%] grid place-items-center rounded-full bg-gradient-gold shadow-[0_0_80px_10px_rgb(242_181_68/0.35)] animate-float">
        <svg viewBox="0 0 24 24" className="size-1/2 text-night-950" fill="currentColor" aria-hidden="true">
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
        </svg>
      </div>
    </div>
  );
}
