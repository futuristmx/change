/* Variante: señal/patrón, read-only. Slots 1,2,4,5. Acento cian (sin acción). */
import CardContainer from "./CardContainer";
import CardMetadata, { type MetaItem } from "./CardMetadata";
import { ACCENT, type CardState } from "./tokens";

interface InsightCardProps {
  title: string;
  body: string;
  metadata?: MetaItem[];
  state?: CardState;
  minHeight?: number;
}

export default function InsightCard({ title, body, metadata = [], state = "default", minHeight }: InsightCardProps) {
  return (
    <CardContainer variant="insight" meta="Insight" glyph="insight" accentVar={ACCENT.insight.accentVar} state={state} minHeight={minHeight} ariaLabel={`Insight: ${title}`}>
      <h3 style={{ margin: 0, font: "600 var(--density-title-size, 20px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--text-strong)", lineHeight: 1.14 }}>{title}</h3>
      <p style={{ margin: 0, font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{body}</p>
      {metadata.length > 0 && <CardMetadata items={metadata} />}
    </CardContainer>
  );
}
