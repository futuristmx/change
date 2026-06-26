"use client";
import { useId, useRef, useState, useLayoutEffect, useEffect } from "react";

interface InlineTooltipProps {
  children: React.ReactNode;
  content: string;
}

/* Layout effect en cliente, effect en servidor — evita el warning de SSR */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * InlineTooltip — término subrayado con popover on hover/focus/tap.
 * Superficie SIEMPRE clara (tokens --tooltip-* fijos), legible sobre fondos
 * claros y oscuros. Detección de borde: se reacomoda para no cortarse en
 * los límites del viewport. Radius 0, WCAG AAA (grafito sobre blanco = 12.8:1).
 */
export default function InlineTooltip({ children, content }: InlineTooltipProps) {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const id = useId();
  const popRef = useRef<HTMLSpanElement>(null);

  // Reacomoda el popover si se sale del viewport
  useIsoLayoutEffect(() => {
    if (!open || !popRef.current) return;
    const margin = 12;
    const rect = popRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    let correction = 0;
    if (rect.left < margin) correction = margin - rect.left;
    else if (rect.right > vw - margin) correction = vw - margin - rect.right;
    if (correction !== 0) setShift((s) => s + correction);
  }, [open]);

  function show() { setShift(0); setOpen(true); }
  function hide() { setOpen(false); }
  function toggle() { if (open) hide(); else show(); }

  return (
    <span
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <span
        tabIndex={0}
        role="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        style={{
          display: "inline",
          borderBottom: "1px dotted currentColor",
          cursor: "default",
          outline: "none",
        }}
        onFocus={show}
        onBlur={hide}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
          if (e.key === "Escape") hide();
        }}
      >
        {children}
      </span>

      {open && (
        <span
          ref={popRef}
          id={id}
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: `translateX(calc(-50% + ${shift}px))`,
            width: 250,
            maxWidth: "calc(100vw - 24px)",
            padding: "13px 16px",
            background: "var(--tooltip-surface)",
            color: "var(--tooltip-text)",
            font: "400 13px/1.55 var(--font-primary)",
            border: "1px solid var(--tooltip-outline)",
            boxShadow: "var(--tooltip-shadow)",
            zIndex: 300,
            whiteSpace: "normal",
            textAlign: "left",
            pointerEvents: "none",
          }}
        >
          {content}
          {/* Flecha — sigue apuntando al término aunque el popover se reacomode */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "100%",
              left: `calc(50% - ${shift}px)`,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid var(--tooltip-surface)",
            }}
          />
        </span>
      )}
    </span>
  );
}
