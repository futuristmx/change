/* Variante: navegación/entrada de sección. Slots 1,2,4. Layout horizontal:
   icon-box (radius 0 explícito) + texto + chevron. Interactiva (link). */
import Link from "next/link";
import Glyph, { type GlyphName } from "./glyphs";
import { type CardState } from "./tokens";

interface NavCardProps {
  meta: string;
  title: string;
  body?: string;
  href: string;
  glyph?: GlyphName;
  accentVar?: string;
  state?: CardState;
}

export default function NavCard({ meta, title, body, href, glyph = "nav", accentVar = "var(--text-muted)", state = "default" }: NavCardProps) {
  const selected = state === "selected";
  return (
    <Link
      href={href}
      className="ds-navcard"
      aria-label={`${meta}: ${title}`}
      style={{
        display: "flex", alignItems: "center", gap: "var(--density-card-gap, 16px)",
        padding: "var(--density-card-pad, 24px)", borderRadius: 0,
        background: selected ? "var(--surface-selected)" : "var(--surface-card)",
        border: `1px solid ${selected ? "var(--border-selected)" : "var(--field-outline)"}`,
        boxShadow: selected ? "var(--shadow-graphite-soft)" : "var(--field-shadow)",
        transition: "transform var(--duration-standard,220ms) var(--ease-premium), border-color var(--duration-standard,220ms) var(--ease-premium), box-shadow var(--duration-standard,220ms) var(--ease-premium)",
      }}
    >
      <span aria-hidden="true" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 44, height: 44, flex: "0 0 auto", borderRadius: 0,
        border: "1px solid var(--border-subtle)", color: accentVar, background: "var(--surface-soft)",
      }}>
        <Glyph name={glyph} size={22} />
      </span>
      <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ font: "600 var(--density-meta-size, 11px) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: accentVar }}>{meta}</span>
        <span style={{ font: "600 var(--density-title-size, 20px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--text-strong)", lineHeight: 1.1 }}>{title}</span>
        {body && <span style={{ font: "400 14px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{body}</span>}
      </span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "0 0 auto" }}>
        <path d="M7 4 L13 10 L7 16" />
      </svg>
    </Link>
  );
}
