/* Change DS — Toast.
   Surface --toast-*, role=status, animación change-toast-enter (motion.css).
   Bottom-right fixed, z-toast. Sin hex crudos. */
"use client";

import { useEffect } from "react";

interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  onClose?: () => void;
  tone?: "success" | "neutral";
  /** ms; null = sin auto-close */
  autoCloseMs?: number | null;
}

export default function Toast({
  open,
  title,
  description,
  onClose,
  tone = "neutral",
  autoCloseMs = 6000,
}: ToastProps) {
  useEffect(() => {
    if (!open || !onClose || !autoCloseMs) return;
    const id = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(id);
  }, [open, onClose, autoCloseMs]);

  if (!open) return null;

  const dotVar = tone === "success" ? "var(--success)" : "var(--strategic-gray)";

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: "var(--z-toast)" as unknown as number,
        maxWidth: 380,
        padding: "16px 18px",
        background: "var(--toast-surface)",
        border: "1px solid var(--toast-outline)",
        boxShadow: "var(--toast-shadow)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "change-toast-enter var(--duration-standard, .35s) var(--ease-premium, ease-out) both",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          marginTop: 6,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: dotVar,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <strong
          style={{
            display: "block",
            font: "600 14px/1.3 var(--font-primary)",
            letterSpacing: "-.01em",
            color: "var(--toast-title)",
          }}
        >
          {title}
        </strong>
        {description && (
          <p
            style={{
              margin: "6px 0 0",
              font: "400 13px/1.5 var(--font-primary)",
              color: "var(--toast-desc)",
            }}
          >
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          style={{
            flexShrink: 0,
            border: 0,
            background: "transparent",
            padding: 4,
            cursor: "pointer",
            color: "var(--toast-close)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color .15s, background .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--toast-close-hover)";
            e.currentTarget.style.background = "var(--toast-close-hover-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--toast-close)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 L6 18 M6 6 L18 18" />
          </svg>
        </button>
      )}
    </div>
  );
}
