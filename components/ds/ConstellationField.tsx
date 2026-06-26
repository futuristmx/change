/* Change DS — ConstellationField.
   Capa ambiental para superficies dark: estrellas (dots) con twinkle, líneas de
   constelación que se trazan al aparecer, y señales de luz que recorren algunas
   líneas. Determinista (sin Math.random → SSR estable). aria-hidden,
   pointer-events:none, z-index 0. Respeta prefers-reduced-motion. */

type Tone = "cyan" | "violet" | "faint";
const TONE: Record<Tone, string> = {
  cyan: "var(--signal-cyan)",
  violet: "var(--soft-violet)",
  faint: "var(--lavender-mist)",
};

interface Star { x: number; y: number; r: number; c: Tone; d: number }

// viewBox 1200 x 560
const STARS: Star[] = [
  { x: 140, y: 90, r: 1.8, c: "faint", d: 0 },
  { x: 230, y: 150, r: 2.2, c: "violet", d: 0.6 },
  { x: 320, y: 100, r: 3.0, c: "cyan", d: 1.2 },
  { x: 280, y: 220, r: 1.6, c: "faint", d: 2.0 },
  { x: 640, y: 80, r: 2.0, c: "violet", d: 0.4 },
  { x: 740, y: 140, r: 2.6, c: "cyan", d: 1.0 },
  { x: 845, y: 95, r: 2.0, c: "violet", d: 1.6 },
  { x: 910, y: 185, r: 3.2, c: "violet", d: 0.8 },
  { x: 1015, y: 125, r: 2.0, c: "cyan", d: 2.2 },
  { x: 500, y: 270, r: 1.8, c: "faint", d: 1.4 },
  { x: 580, y: 330, r: 2.4, c: "cyan", d: 0.2 },
  { x: 680, y: 300, r: 2.0, c: "violet", d: 1.8 },
  { x: 1080, y: 310, r: 2.2, c: "cyan", d: 1.0 },
  { x: 1140, y: 240, r: 1.6, c: "faint", d: 2.4 },
  { x: 70, y: 320, r: 1.6, c: "faint", d: 3.0 },
  { x: 390, y: 420, r: 1.8, c: "faint", d: 0.9 },
  { x: 770, y: 430, r: 2.0, c: "faint", d: 1.5 },
  { x: 990, y: 450, r: 3.0, c: "cyan", d: 0.5 },
  { x: 190, y: 470, r: 1.8, c: "violet", d: 2.0 },
  { x: 1150, y: 430, r: 1.6, c: "faint", d: 1.2 },
];

// pares de índices que forman constelaciones
const LINKS: Array<[number, number]> = [
  [0, 1], [1, 2], [1, 3],
  [4, 5], [5, 6], [6, 7], [7, 8],
  [9, 10], [10, 11],
  [12, 13], [16, 17],
];
// subconjunto por el que viaja una señal de luz
const FLOW = new Set(["5-6", "7-8", "10-11", "16-17"]);
// estrellas focales con halo
const FOCAL = [2, 7, 17];

export default function ConstellationField() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" focusable="false" style={{ display: "block", width: "100%", height: "100%" }}>
        <defs>
          {FOCAL.map((i) => {
            const s = STARS[i];
            return (
              <radialGradient key={i} id={`cf-halo-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={TONE[s.c]} stopOpacity="0.5" />
                <stop offset="100%" stopColor={TONE[s.c]} stopOpacity="0" />
              </radialGradient>
            );
          })}
        </defs>

        {/* líneas de constelación — se trazan al aparecer */}
        {LINKS.map(([a, b], i) => {
          const sa = STARS[a], sb = STARS[b];
          const isFlow = FLOW.has(`${a}-${b}`);
          return (
            <g key={`l-${i}`}>
              <line
                x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                stroke="var(--lavender-mist)" strokeWidth="0.8" strokeOpacity="0.16"
                pathLength={1} className="cf-line" style={{ animationDelay: `${0.3 + i * 0.18}s` }}
              />
              {isFlow && (
                <line
                  x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                  stroke={TONE[STARS[b].c]} strokeWidth="1.4" strokeLinecap="round"
                  pathLength={1} className="cf-flow" style={{ animationDelay: `${1.4 + i * 0.5}s` }}
                />
              )}
            </g>
          );
        })}

        {/* halos de estrellas focales */}
        {FOCAL.map((i) => {
          const s = STARS[i];
          return <circle key={`h-${i}`} cx={s.x} cy={s.y} r="34" fill={`url(#cf-halo-${i})`} className="cf-halo" style={{ animationDelay: `${i * 0.6}s` }} />;
        })}

        {/* estrellas */}
        {STARS.map((s, i) => (
          <circle key={`s-${i}`} cx={s.x} cy={s.y} r={s.r} fill={TONE[s.c]} className="cf-star" style={{ animationDelay: `${s.d}s` }} />
        ))}
      </svg>

      <style>{`
        .cf-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: cf-draw 1.6s var(--ease-premium, ease) forwards; }
        .cf-flow { stroke-dasharray: 0.14 0.86; stroke-dashoffset: 1; opacity: 0.7; animation: cf-flow 4.2s linear infinite; }
        .cf-star { opacity: 0.55; animation: cf-twinkle 4s ease-in-out infinite; }
        .cf-halo { opacity: 0.7; animation: cf-halopulse 5s ease-in-out infinite; }
        @keyframes cf-draw { to { stroke-dashoffset: 0; } }
        @keyframes cf-flow { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes cf-twinkle { 0%,100% { opacity: 0.32; } 50% { opacity: 1; } }
        @keyframes cf-halopulse { 0%,100% { opacity: 0.45; } 50% { opacity: 0.85; } }
        @media (prefers-reduced-motion: reduce) {
          .cf-line { stroke-dashoffset: 0; animation: none; }
          .cf-flow { display: none; }
          .cf-star { opacity: 0.6; animation: none; }
          .cf-halo { animation: none; }
        }
      `}</style>
    </div>
  );
}
