/* Barras verticales con gradientes de profundidad --bar-step-1..7 (rampa de madurez).
   Series por significado, no por orden; ≤1 foco violeta (step 5). */

export interface BarDatum {
  label: string;
  value: number;
  /** paso de la rampa 1–7 (5 = foco violeta) */
  step?: number;
}

interface BarStepsProps {
  data: BarDatum[];
  height?: number;
  /** unidad opcional para el eje (ej "%") */
  unit?: string;
}

export default function BarSteps({ data, height = 200, unit = "" }: BarStepsProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 14, height, paddingTop: 8, borderBottom: "1px solid var(--chart-axis)" }}>
        {/* guías horizontales tenues */}
        {[0.25, 0.5, 0.75].map((g) => (
          <span key={g} aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: `${g * 100}%`, height: 1, background: "var(--chart-grid)" }} />
        ))}
        {data.map((d, i) => {
          const step = d.step ?? Math.min(i + 1, 7);
          return (
            <div key={d.label} style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
              <span style={{ font: "500 12px var(--font-mono)", color: "var(--chart-label)", marginBottom: 6 }}>{d.value}{unit}</span>
              <div title={`${d.label}: ${d.value}${unit}`} style={{ width: "100%", maxWidth: 52, height: `${(d.value / max) * 100}%`, background: `var(--bar-step-${step})`, borderRadius: 0 }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
        {data.map((d) => (
          <span key={d.label} style={{ flex: 1, textAlign: "center", font: "600 11px var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--chart-label)" }}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
