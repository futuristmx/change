/* Rejilla de actividad de baja saturación. CSS grid, celdas aspect-ratio 1,
   intensidad por color-mix sobre un token (sin hex crudo). */

interface HeatmapProps {
  /** matriz de intensidades 0–1 (filas × columnas) */
  data: number[][];
  columnLabels?: string[];
  rowLabels?: string[];
  /** token base de color */
  colorVar?: string;
}

export default function Heatmap({ data, columnLabels, rowLabels, colorVar = "var(--data-focus)" }: HeatmapProps) {
  const cols = data[0]?.length ?? 0;
  const cell = (v: number) => {
    const pct = Math.round(8 + Math.max(0, Math.min(1, v)) * 80); // 8%–88%
    return v <= 0 ? "var(--surface-soft)" : `color-mix(in srgb, ${colorVar} ${pct}%, var(--surface-soft))`;
  };
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 6 }}>
      {columnLabels && (
        <div style={{ display: "grid", gridTemplateColumns: `${rowLabels ? "56px " : ""}repeat(${cols}, 1fr)`, gap: 6 }}>
          {rowLabels && <span />}
          {columnLabels.map((c) => (
            <span key={c} style={{ font: "600 11px var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--chart-label)", textAlign: "center" }}>{c}</span>
          ))}
        </div>
      )}
      {data.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: `${rowLabels ? "56px " : ""}repeat(${cols}, 1fr)`, gap: 6, alignItems: "center" }}>
          {rowLabels && <span style={{ font: "500 11px var(--font-mono)", color: "var(--chart-label)" }}>{rowLabels[ri]}</span>}
          {row.map((v, ci) => (
            <span key={ci} title={`${Math.round(v * 100)}%`} style={{ aspectRatio: "1 / 1", minWidth: 18, background: cell(v), border: "1px solid var(--chart-grid)" }} />
          ))}
        </div>
      ))}
    </div>
  );
}
