/* Matriz decisión esfuerzo × impacto. SVG 560×400, 4 cuadrantes con wash de
   preferencia (cuadrante recomendado), ejes mono, puntos por significado;
   ≤1 punto de foco violeta. */

export interface MatrixPoint {
  label: string;
  /** 0–1 eje X (esfuerzo) */
  x: number;
  /** 0–1 eje Y (impacto) */
  y: number;
  focus?: boolean;
}

interface Matrix2x2Props {
  points: MatrixPoint[];
  xLabel?: string;
  yLabel?: string;
}

const W = 560, H = 400, M = 44;

export default function Matrix2x2({ points, xLabel = "Esfuerzo", yLabel = "Impacto" }: Matrix2x2Props) {
  const px = (x: number) => M + x * (W - M * 2);
  const py = (y: number) => H - M - y * (H - M * 2);
  const midX = M + (W - M * 2) / 2;
  const midY = M + (H - M * 2) / 2;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Matriz esfuerzo × impacto">
      <defs>
        <radialGradient id="prefWash" cx="100%" cy="0%" r="120%">
          <stop offset="0%" stopColor="var(--violet-subtle)" />
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* cuadrante preferente: bajo esfuerzo (izq) + alto impacto (arriba) → arriba-izquierda */}
      <rect x={M} y={M} width={(W - M * 2) / 2} height={(H - M * 2) / 2} fill="url(#prefWash)" />
      {/* marco + ejes */}
      <rect x={M} y={M} width={W - M * 2} height={H - M * 2} fill="none" stroke="var(--chart-axis)" strokeWidth={1} />
      <line x1={midX} y1={M} x2={midX} y2={H - M} stroke="var(--chart-grid)" strokeWidth={1} />
      <line x1={M} y1={midY} x2={W - M} y2={midY} stroke="var(--chart-grid)" strokeWidth={1} />
      {/* etiquetas de eje */}
      <text x={W / 2} y={H - 14} textAnchor="middle" style={{ font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", fill: "var(--chart-label)" }}>{xLabel} →</text>
      <text x={18} y={H / 2} textAnchor="middle" transform={`rotate(-90 18 ${H / 2})`} style={{ font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", fill: "var(--chart-label)" }}>{yLabel} →</text>
      {/* puntos */}
      {points.map((p) => (
        <g key={p.label}>
          <circle cx={px(p.x)} cy={py(p.y)} r={p.focus ? 8 : 6} fill={p.focus ? "var(--data-focus)" : "var(--data-structure)"} stroke="var(--surface-card)" strokeWidth={2} />
          <text x={px(p.x) + 12} y={py(p.y) + 4} style={{ font: "500 12.5px var(--font-primary)", fill: "var(--text-body)" }}>{p.label}</text>
        </g>
      ))}
    </svg>
  );
}
