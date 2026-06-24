/* Variante: riesgo/dependencia. Slots 1,2,5,8. Acento rojo/ámbar + estado. */
import CardContainer from "./CardContainer";
import CardMetadata, { type MetaItem } from "./CardMetadata";
import CardStatePill from "./CardStatePill";
import { ACCENT, type CardState, type PillTone } from "./tokens";

type Severity = "Alto" | "Medio" | "Bajo";

interface RiskCardProps {
  title: string;
  severity?: Severity;
  metadata?: MetaItem[];
  pill?: { tone: PillTone; label: string };
  state?: CardState;
  minHeight?: number;
}

const sevTone: Record<Severity, PillTone> = { Alto: "error", Medio: "opportunity", Bajo: "neutral" };

export default function RiskCard({ title, severity = "Medio", metadata = [], pill, state = "default", minHeight }: RiskCardProps) {
  return (
    <CardContainer variant="risk" meta={`Riesgo · ${severity}`} glyph="risk" accentVar={ACCENT.risk.accentVar} state={state} minHeight={minHeight} ariaLabel={`Riesgo ${severity}: ${title}`}>
      <h3 style={{ margin: 0, font: "600 var(--density-title-size, 20px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--text-strong)", lineHeight: 1.14 }}>{title}</h3>
      {metadata.length > 0 && <CardMetadata items={metadata} />}
      <div style={{ marginTop: 2 }}>
        <CardStatePill tone={pill?.tone ?? sevTone[severity]}>{pill?.label ?? `Severidad ${severity.toLowerCase()}`}</CardStatePill>
      </div>
    </CardContainer>
  );
}
