/* Timeline editorial (no tabla técnica). SVG 680×280. Headers de mes mono,
   barras por iniciativa coloreadas por significado, marcador "hoy" violeta
   (el único violeta del gráfico). */

export interface GanttRow {
  label: string;
  /** 0–1 inicio/fin sobre el eje temporal */
  start: number;
  end: number;
  /** token de color de la barra */
  colorVar?: string;
}

interface TimelineGanttProps {
  rows: GanttRow[];
  months: string[];
  /** 0–1 posición del marcador "hoy" */
  today?: number;
}

const W = 680, H = 280, LEFT = 150, TOP = 40, RIGHT = 24, BOTTOM = 24;

export default function TimelineGantt({ rows, months, today = 0.42 }: TimelineGanttProps) {
  const plotW = W - LEFT - RIGHT;
  const plotH = H - TOP - BOTTOM;
  const rowH = plotH / rows.length;
  const xAt = (f: number) => LEFT + f * plotW;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Línea de tiempo de iniciativas">
      {/* headers de mes + guías verticales */}
      {months.map((m, i) => {
        const x = LEFT + (i / months.length) * plotW;
        return (
          <g key={m}>
            <line x1={x} y1={TOP} x2={x} y2={H - BOTTOM} stroke="var(--chart-grid)" strokeWidth={1} />
            <text x={x + 6} y={TOP - 14} style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", fill: "var(--chart-label)" }}>{m}</text>
          </g>
        );
      })}
      {/* filas */}
      {rows.map((r, i) => {
        const y = TOP + i * rowH + rowH / 2;
        return (
          <g key={r.label}>
            <text x={LEFT - 16} y={y + 4} textAnchor="end" style={{ font: "500 13px var(--font-primary)", fill: "var(--text-body)" }}>{r.label}</text>
            <line x1={LEFT} y1={y} x2={W - RIGHT} y2={y} stroke="var(--chart-grid)" strokeWidth={1} strokeDasharray="2 4" />
            <rect x={xAt(r.start)} y={y - 7} width={Math.max(4, (r.end - r.start) * plotW)} height={14} rx={0} fill={r.colorVar ?? "var(--data-structure)"} />
          </g>
        );
      })}
      {/* marcador HOY (violeta — único acento de foco) */}
      <line x1={xAt(today)} y1={TOP - 4} x2={xAt(today)} y2={H - BOTTOM} stroke="var(--chart-today)" strokeWidth={1.5} />
      <text x={xAt(today)} y={H - 8} textAnchor="middle" style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", fill: "var(--chart-today)" }}>Hoy</text>
    </svg>
  );
}
