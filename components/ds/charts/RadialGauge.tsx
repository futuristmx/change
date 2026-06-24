/* Medidor radial de confianza. SVG 200×200. Track --chart-track; arco
   coloreado por la rampa según el valor; valor central mono/accent. */

interface RadialGaugeProps {
  /** 0–100 */
  value: number;
  label?: string;
  size?: number;
}

const R = 78;
const C = 2 * Math.PI * R;

function rampColor(v: number): string {
  if (v < 30) return "var(--evo-noise)";
  if (v < 55) return "var(--evo-analysis)";
  if (v < 80) return "var(--evo-focus)";
  return "var(--evo-validated)";
}

export default function RadialGauge({ value, label = "Confianza", size = 200 }: RadialGaugeProps) {
  const v = Math.max(0, Math.min(100, value));
  const dash = (v / 100) * C;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={`${label}: ${v}%`}>
      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--chart-track)" strokeWidth={12} />
      <circle
        cx="100" cy="100" r={R} fill="none" stroke={rampColor(v)} strokeWidth={12} strokeLinecap="round"
        strokeDasharray={`${dash} ${C - dash}`} transform="rotate(-90 100 100)"
      />
      <text x="100" y="96" textAnchor="middle" style={{ font: "400 44px var(--font-accent)", letterSpacing: "-.03em", fill: "var(--text-strong)" }}>{v}</text>
      <text x="100" y="120" textAnchor="middle" style={{ font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", fill: "var(--chart-label)" }}>{label}</text>
    </svg>
  );
}
