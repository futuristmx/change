/* Slot 5 — Metadata: fila de chips mono (confianza · horizonte · dueño · código). */
import type { CSSProperties } from "react";

export interface MetaItem {
  label: string;
  value: string;
}

interface CardMetadataProps {
  items: MetaItem[];
  style?: CSSProperties;
}

export default function CardMetadata({ items, style }: CardMetadataProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 14,
        paddingTop: 14,
        borderTop: "1px solid var(--divider)",
        ...style,
      }}
    >
      {items.map((it) => (
        <span key={it.label} style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ font: "600 var(--density-meta-size, 11px) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{it.label}</span>
          <span style={{ font: "500 12px var(--font-mono)", letterSpacing: ".02em", color: "var(--text-muted)" }}>{it.value}</span>
        </span>
      ))}
    </div>
  );
}
