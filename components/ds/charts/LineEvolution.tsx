/* Line chart cuyo trazo recorre la rampa de evolución (gris→cyan→violeta→verde)
   vía un linearGradient SVG con stops de los tokens --evo-*. Nodo de foco al final. */

interface LineEvolutionProps {
  data: number[];
  width?: number;
  height?: number;
  /** etiquetas del eje X (mono) */
  labels?: string[];
}

const PAD = 16;

export default function LineEvolution({ data, width = 560, height = 220, labels }: LineEvolutionProps) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = (width - PAD * 2) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = PAD + i * stepX;
    const y = PAD + (1 - (v - min) / span) * (height - PAD * 2 - 18);
    return [x, y] as const;
  });
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [ex, ey] = pts[pts.length - 1];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} fill="none" role="img" aria-label="Trayectoria de evolución">
      <defs>
        <linearGradient id="evoRamp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--evo-noise)" />
          <stop offset="33%" stopColor="var(--evo-analysis)" />
          <stop offset="66%" stopColor="var(--evo-focus)" />
          <stop offset="100%" stopColor="var(--evo-validated)" />
        </linearGradient>
      </defs>
      {/* guías */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={PAD} x2={width - PAD} y1={PAD + g * (height - PAD * 2 - 18)} y2={PAD + g * (height - PAD * 2 - 18)} stroke="var(--chart-grid)" strokeWidth={1} />
      ))}
      <path d={d} stroke="url(#evoRamp)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* nodo de foco al final (validado) */}
      <circle cx={ex} cy={ey} r={5} fill="var(--evo-validated)" stroke="var(--surface-card)" strokeWidth={2} />
      {labels && labels.map((l, i) => (
        <text key={l} x={PAD + i * stepX} y={height - 4} textAnchor="middle" style={{ font: "600 10px var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase", fill: "var(--chart-label)" }}>{l}</text>
      ))}
    </svg>
  );
}
