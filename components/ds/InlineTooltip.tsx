"use client";
import { useId, useRef, useState } from "react";

interface InlineTooltipProps {
  children: React.ReactNode;
  content: string;
}

/**
 * InlineTooltip — término subrayado con popover on hover/focus/tap.
 * Radius 0, DS tokens, WCAG AAA (#ink-graphite sobre blanco = 12.8:1).
 * Funciona sobre fondos claros y oscuros (card blanca con sombra).
 */
export default function InlineTooltip({ children, content }: InlineTooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);

  function show() { setOpen(true); }
  function hide() { setOpen(false); }
  function toggle() { setOpen(o => !o); }

  return (
    <span
      ref={wrapRef}
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
          cursor: "help",
          outline: "none",
        }}
        onFocus={show}
        onBlur={hide}
        onClick={toggle}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
          if (e.key === "Escape") hide();
        }}
      >
        {children}
      </span>

      {open && (
        <span
          id={id}
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: 240,
            padding: "12px 16px",
            background: "var(--surface-card, #fff)",
            color: "var(--ink-graphite)",
            font: "400 13px/1.55 var(--font-primary)",
            border: "1px solid var(--border-subtle, rgba(46,46,51,.12))",
            boxShadow: "0 8px 28px rgba(0,0,0,.16), 0 1px 4px rgba(0,0,0,.08)",
            zIndex: 300,
            whiteSpace: "normal",
            textAlign: "left",
            pointerEvents: "none",
          }}
        >
          {content}
          {/* Flecha */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid var(--surface-card, #fff)",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%) translateY(-1px)",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "7px solid var(--border-subtle, rgba(46,46,51,.12))",
              zIndex: -1,
            }}
          />
        </span>
      )}
    </span>
  );
}
