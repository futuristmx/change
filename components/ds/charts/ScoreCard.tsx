/* Scorecard de dataviz (metric card rica): eyebrow + valor 58px + delta +
   sparkline + barra de confianza + pill de estado. Compone CardContainer. */
import CardContainer from "../CardContainer";
import CardStatePill from "../CardStatePill";
import Sparkline from "./Sparkline";
import { type CardState, type PillTone } from "../tokens";

interface ScoreCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down";
  series?: number[];
  /** confianza 0–100 */
  confidence?: number;
  pill?: { tone: PillTone; label: string };
  state?: CardState;
  minHeight?: number;
}

export default function ScoreCard({
  label, value, delta, deltaDirection = "up", series, confidence, pill, state = "default", minHeight,
}: ScoreCardProps) {
  const positive = deltaDirection === "up";
  return (
    <CardContainer variant="metric" meta={label} glyph="metric" accentVar="var(--status-success-fg)" state={state} minHeight={minHeight} ariaLabel={`Score ${label}: ${value}`}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, flexWrap: "wrap" }}>
        <span style={{ font: "400 58px/0.9 var(--font-accent)", letterSpacing: "-.04em", color: "var(--text-strong)", fontFeatureSettings: '"tnum"' }}>{value}</span>
        {delta && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", marginBottom: 8,
            background: positive ? "var(--status-success-bg)" : "var(--status-error-bg)",
            color: positive ? "var(--status-success-fg)" : "var(--status-error-fg)",
            font: "600 12.5px var(--font-mono)",
          }}>
            <span aria-hidden="true">{positive ? "↑" : "↓"}</span>{delta}
          </span>
        )}
      </div>

      {series && series.length > 1 && <Sparkline data={series} colorVar={positive ? "var(--data-validated)" : "var(--data-risk)"} />}

      {typeof confidence === "number" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", font: "600 10px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)" }}>
            <span>Confianza</span><span>{confidence}%</span>
          </div>
          <div style={{ height: 4, background: "var(--chart-track)", overflow: "hidden" }}>
            <div style={{ width: `${Math.max(0, Math.min(100, confidence))}%`, height: "100%", background: "var(--gradient-evolution)" }} />
          </div>
        </div>
      )}

      {pill && <div style={{ marginTop: 2 }}><CardStatePill tone={pill.tone}>{pill.label}</CardStatePill></div>}
    </CardContainer>
  );
}
