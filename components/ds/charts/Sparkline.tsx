/* Sparkline — mini line chart SVG. viewBox canónico 200×44 (compartido por
   MetricCard y ScoreCard). Color por token (serie por significado). */

interface SparklineProps {
  data: number[];
  /** token de color del trazo, ej "var(--data-validated)" */
  colorVar?: string;
  /** marca el último punto con un nodo */
  endNode?: boolean;
  width?: number;
  height?: number;
}

const VB_W = 200;
const VB_H = 44;
const PAD = 5;

export default function Sparkline({ data, colorVar = "var(--data-signal)", endNode = true, width = 200, height = 44 }: SparklineProps) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = (VB_W - PAD * 2) / (data.length - 1);

  const pts = data.map((v, i) => {
    const x = PAD + i * stepX;
    const y = PAD + (1 - (v - min) / span) * (VB_H - PAD * 2);
    return [x, y] as const;
  });
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [ex, ey] = pts[pts.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${VB_W} ${VB_H}`} fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d={d} stroke={colorVar} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {endNode && <circle cx={ex} cy={ey} r={3} fill={colorVar} />}
    </svg>
  );
}
