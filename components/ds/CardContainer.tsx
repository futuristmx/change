"use client";

/* ════════════════════════════════════════════════════════════
   Change DS 2.4 — CardContainer
   Contenedor estructural base. Resuelve los 6 estados
   (default·hover·selected·locked·loading·empty). De aquí heredan
   todas las variantes. Radius 0. selected = NEUTRAL (no violeta).
   ════════════════════════════════════════════════════════════ */

import { useState, type ReactNode } from "react";
import Glyph, { type GlyphName } from "./glyphs";
import CardSkeleton from "./CardSkeleton";
import { STATE_MICROCOPY, type CardState } from "./tokens";

export interface CardContainerProps {
  variant: string;          // clave para microcopy (decision/insight/…)
  meta: string;             // eyebrow (slot 1)
  glyph: GlyphName;
  accentVar: string;        // color de meta + glyph
  state?: CardState;
  interactive?: boolean;    // habilita hover real + foco por teclado
  onActivate?: () => void;  // click/Enter cuando interactive
  ariaLabel?: string;
  minHeight?: number;
  children?: ReactNode;     // header + content + metadata + acciones (slots 2-7)
}

export default function CardContainer({
  variant,
  meta,
  glyph,
  accentVar,
  state = "default",
  interactive = false,
  onActivate,
  ariaLabel,
  minHeight,
  children,
}: CardContainerProps) {
  const [hovered, setHovered] = useState(false);
  const copy = STATE_MICROCOPY[variant] ?? { locked: "", empty: "" };
  const effective: CardState = state === "default" && interactive && hovered ? "hover" : state;

  // ── geometría base ──
  const base: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "var(--density-card-gap, 16px)",
    padding: "var(--density-card-pad, 24px)",
    minHeight,
    background: "var(--surface-card)",
    border: "1px solid var(--field-outline)",
    borderRadius: 0,
    boxShadow: "var(--field-shadow)",
    transition: "transform var(--duration-standard,220ms) var(--ease-premium), border-color var(--duration-standard,220ms) var(--ease-premium), box-shadow var(--duration-standard,220ms) var(--ease-premium), background var(--duration-standard,220ms) var(--ease-premium)",
    cursor: interactive ? "pointer" : "default",
    textAlign: "left",
  };

  const byState: Record<CardState, React.CSSProperties> = {
    default: {},
    hover: { transform: "translateY(-2px)", borderColor: "var(--border-violet)", boxShadow: "var(--shadow-graphite)" },
    selected: { background: "var(--surface-selected)", borderColor: "var(--border-selected)", boxShadow: "var(--shadow-graphite-soft)" },
    locked: { background: "var(--surface-locked)", borderStyle: "dashed", borderColor: "var(--border-locked)", boxShadow: "none" },
    loading: {},
    empty: { boxShadow: "none" },
  };

  const style = { ...base, ...byState[effective] };

  // ── eyebrow (slot 1: meta + glyph) ──
  const eyebrow = (
    <div style={{ display: "flex", alignItems: "center", gap: 9, color: accentVar }}>
      <Glyph name={glyph} size={18} />
      <span style={{ font: "600 var(--density-meta-size, 11px) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase" }}>{meta}</span>
    </div>
  );

  // ── contenido por estado ──
  let body: ReactNode;
  if (effective === "loading") {
    body = <CardSkeleton />;
  } else if (effective === "locked") {
    body = (
      <>
        {eyebrow}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, color: "var(--text-locked)", padding: "8px 0" }}>
          <Glyph name="lock" size={22} />
          <p style={{ margin: 0, font: "400 14.5px/1.5 var(--font-primary)", maxWidth: "34ch" }}>{copy.locked}</p>
        </div>
      </>
    );
  } else if (effective === "empty") {
    body = (
      <>
        {eyebrow}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14, padding: "8px 0" }}>
          <svg width="56" height="20" viewBox="0 0 56 20" fill="none" stroke="var(--text-faint)" strokeWidth="1.4" aria-hidden="true">
            <line x1="6" y1="10" x2="50" y2="10" />
            <circle cx="6" cy="10" r="2.4" fill="var(--surface-card)" />
            <circle cx="28" cy="10" r="2.4" fill="var(--surface-card)" />
            <circle cx="50" cy="10" r="2.4" fill="var(--surface-card)" />
          </svg>
          <p style={{ margin: 0, font: "400 14.5px/1.5 var(--font-primary)", color: "var(--text-muted)", maxWidth: "34ch" }}>{copy.empty}</p>
        </div>
      </>
    );
  } else {
    body = (
      <>
        {eyebrow}
        {children}
        {effective === "selected" && (
          <span aria-hidden="true" style={{ position: "absolute", top: 14, right: 14, width: 9, height: 9, borderRadius: "50%", background: "var(--node-selected)", boxShadow: "0 0 0 4px var(--node-selected-halo)" }} />
        )}
      </>
    );
  }

  const commonProps = {
    style,
    "aria-label": ariaLabel,
    "aria-busy": effective === "loading" || undefined,
    onMouseEnter: interactive ? () => setHovered(true) : undefined,
    onMouseLeave: interactive ? () => setHovered(false) : undefined,
  };

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onActivate}
        aria-pressed={effective === "selected"}
        {...commonProps}
        style={{ ...style, font: "inherit", color: "inherit", width: "100%" }}
      >
        {body}
      </button>
    );
  }
  return <article {...commonProps}>{body}</article>;
}
