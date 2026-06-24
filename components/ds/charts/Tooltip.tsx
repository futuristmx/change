/* Card de anotación de dato: superficie blanca + 1px outline + sombra,
   conector dashed + nodo al datum. Anatomía de tooltip (line-and-node). */

export interface TooltipRow {
  label: string;
  value: string;
  /** token de color del dot, ej "var(--data-validated)" */
  dotVar?: string;
}

interface TooltipProps {
  title: string;
  rows: TooltipRow[];
  /** muestra el conector dashed + nodo (anatomía) */
  connector?: boolean;
}

export default function Tooltip({ title, rows, connector = true }: TooltipProps) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{
        minWidth: 200, padding: "14px 16px", background: "var(--chart-tooltip-surface)",
        border: "1px solid var(--chart-tooltip-outline)", boxShadow: "var(--chart-tooltip-shadow)", borderRadius: 0,
      }}>
        <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>{title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map((r) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "400 13px var(--font-primary)", color: "var(--text-muted)" }}>
                {r.dotVar && <span style={{ width: 7, height: 7, borderRadius: "50%", background: r.dotVar }} />}
                {r.label}
              </span>
              <span style={{ font: "600 13px var(--font-mono)", color: "var(--text-strong)" }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
      {connector && (
        <svg width="20" height="34" viewBox="0 0 20 34" fill="none" aria-hidden="true" style={{ position: "absolute", left: 24, top: "100%" }}>
          <line x1="2" y1="0" x2="2" y2="28" stroke="var(--line-structural)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="2" cy="30" r="3" fill="var(--change-violet)" stroke="var(--surface-card)" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}
