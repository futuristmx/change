/* Variante: decisión estratégica. Slots 1,2,4,5,6,7. Violeta = acción (CTA). */
import Link from "next/link";
import CardContainer from "./CardContainer";
import CardMetadata, { type MetaItem } from "./CardMetadata";
import { ACCENT, type CardState } from "./tokens";

interface DecisionOption {
  label: string;
  recommended?: boolean;
}

interface DecisionCardProps {
  title: string;
  options?: DecisionOption[];
  metadata?: MetaItem[];
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  state?: CardState;
  minHeight?: number;
}

const headerStyle: React.CSSProperties = {
  margin: 0,
  font: "600 var(--density-title-size, 20px) var(--font-primary)",
  letterSpacing: "-.02em",
  color: "var(--text-strong)",
  lineHeight: 1.12,
};

export default function DecisionCard({
  title, options = [], metadata = [], primaryLabel = "Trabajar la decisión", primaryHref = "/contacto",
  secondaryLabel, secondaryHref = "/contacto", state = "default", minHeight,
}: DecisionCardProps) {
  return (
    <CardContainer variant="decision" meta="Decisión" glyph="decision" accentVar={ACCENT.decision.accentVar} state={state} minHeight={minHeight} ariaLabel={`Decisión: ${title}`}>
      <h3 style={headerStyle}>{title}</h3>

      {options.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {options.map((o) => (
            <span key={o.label} style={{
              display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 12px",
              border: `1px solid ${o.recommended ? "var(--border-violet)" : "var(--divider)"}`,
              background: o.recommended ? "var(--action-primary-subtle)" : "transparent",
              font: "500 13.5px var(--font-primary)", color: "var(--text-body)",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: o.recommended ? "var(--change-violet)" : "var(--text-faint)" }} />
              {o.label}
            </span>
          ))}
        </div>
      )}

      {metadata.length > 0 && <CardMetadata items={metadata} />}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
        <Link href={primaryHref} className="btn btn-primary btn-sm">{primaryLabel}</Link>
        {secondaryLabel && <Link href={secondaryHref} className="btn btn-secondary btn-sm">{secondaryLabel}</Link>}
      </div>
    </CardContainer>
  );
}
