/* Change DS — EmptyState.
   Surface --empty-*, opcionalmente con frame interior + glyph.
   Sin hex crudos. */
import type { ReactNode } from "react";
import Glyph, { type GlyphName } from "./glyphs";

interface EmptyStateProps {
  title: string;
  description?: string;
  glyph?: GlyphName;
  /** CTA slot opcional al pie */
  action?: ReactNode;
  /** estructura con frame interior decorativo (líneas + nodo) */
  structured?: boolean;
}

export default function EmptyState({
  title,
  description,
  glyph = "insight",
  action,
  structured = false,
}: EmptyStateProps) {
  return (
    <div
      style={{
        background: structured ? "var(--empty-surface-structured)" : "var(--empty-surface)",
        border: "1px solid var(--empty-outline)",
        boxShadow: "var(--empty-shadow)",
        padding: "clamp(36px,5vw,64px)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--empty-frame-bg)",
          border: "1px solid var(--empty-frame-outline)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--empty-node)",
        }}
      >
        <Glyph name={glyph} size={26} />
      </div>
      <div style={{ maxWidth: "44ch" }}>
        <h3
          style={{
            margin: 0,
            font: "600 22px/1.25 var(--font-primary)",
            letterSpacing: "-.02em",
            color: "var(--empty-title)",
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              margin: "12px 0 0",
              font: "400 15px/1.55 var(--font-primary)",
              color: "var(--empty-desc)",
            }}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
