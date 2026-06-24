/* Variante: KPI/portafolio. Slots 1,2,4,5,8. Valor grande + delta + sparkline + estado.
   delta usa --status-success-* / --status-error-* (token, no rgba crudo). */
import CardContainer from "./CardContainer";
import CardStatePill from "./CardStatePill";
import Sparkline from "./charts/Sparkline";
import { ACCENT, type CardState, type PillTone } from "./tokens";

interface MetricCardProps {
  label: string;
  value: string;
  /** variación, ej "+12%" */
  delta?: string;
  deltaDirection?: "up" | "down";
  series?: number[];
  pill?: { tone: PillTone; label: string };
  state?: CardState;
  minHeight?: number;
}

export default function MetricCard({
  label, value, delta, deltaDirection = "up", series, pill, state = "default", minHeight,
}: MetricCardProps) {
  const positive = deltaDirection === "up";
  return (
    <CardContainer variant="metric" meta={label} glyph="metric" accentVar={ACCENT.metric.accentVar} state={state} minHeight={minHeight} ariaLabel={`Métrica ${label}: ${value}`}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, flexWrap: "wrap" }}>
        <span style={{ font: "400 56px/0.9 var(--font-accent)", letterSpacing: "-.04em", color: "var(--text-strong)", fontFeatureSettings: '"tnum"' }}>{value}</span>
        {delta && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", marginBottom: 6,
            background: positive ? "var(--status-success-bg)" : "var(--status-error-bg)",
            color: positive ? "var(--status-success-fg)" : "var(--status-error-fg)",
            font: "600 12.5px var(--font-mono)", letterSpacing: ".02em",
          }}>
            <span aria-hidden="true">{positive ? "↑" : "↓"}</span>{delta}
          </span>
        )}
      </div>

      {series && series.length > 1 && (
        <Sparkline data={series} colorVar={positive ? "var(--data-validated)" : "var(--data-risk)"} />
      )}

      {pill && (
        <div style={{ marginTop: 2 }}>
          <CardStatePill tone={pill.tone}>{pill.label}</CardStatePill>
        </div>
      )}
    </CardContainer>
  );
}
