/* Change DS — SignalField.
   Capa ambiental decorativa: 5 nodos suaves dispersos, animación de respiración
   en opacidad/escala con desfase. aria-hidden y pointer-events:none.
   Respeta prefers-reduced-motion (motion.css desactiva la animación globalmente
   reduciendo duraciones a 1ms, pero aquí además vamos a fallback estático con CSS). */

interface SignalFieldProps {
  /** intensidad base de opacidad */
  intensity?: number;
}

interface Seed {
  x: number;        // % horizontal
  y: number;        // % vertical
  r: number;        // px radio
  delay: number;    // s
  duration: number; // s
  colorVar: string; // CSS var
  opacity: number;
}

// Posiciones deterministas — sin Math.random para SSR estable.
const SEEDS: Seed[] = [
  { x: 12, y: 22, r: 180, delay: 0,   duration: 11, colorVar: "var(--signal-cyan)",  opacity: 0.14 },
  { x: 78, y: 18, r: 220, delay: 2.2, duration: 13, colorVar: "var(--soft-violet)",  opacity: 0.16 },
  { x: 38, y: 64, r: 160, delay: 4.0, duration: 10, colorVar: "var(--signal-cyan)",  opacity: 0.12 },
  { x: 86, y: 72, r: 200, delay: 1.1, duration: 12, colorVar: "var(--soft-violet)",  opacity: 0.15 },
  { x: 22, y: 84, r: 140, delay: 3.4, duration: 9,  colorVar: "var(--signal-cyan)",  opacity: 0.10 },
];

export default function SignalField({ intensity = 1 }: SignalFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        style={{ display: "block", width: "100%", height: "100%" }}
        focusable="false"
      >
        <defs>
          {SEEDS.map((s, i) => (
            <radialGradient key={i} id={`sf-grad-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={s.colorVar} stopOpacity={s.opacity * intensity} />
              <stop offset="100%" stopColor={s.colorVar} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>
        {SEEDS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r / 10}
            fill={`url(#sf-grad-${i})`}
            style={{
              transformOrigin: `${s.x}% ${s.y}%`,
              animation: `sf-breathe ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes sf-breathe {
          0%, 100% { opacity: .85; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes sf-breathe { from { opacity: 1; } to { opacity: 1; } }
        }
      `}</style>
    </div>
  );
}
