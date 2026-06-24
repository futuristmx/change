/* Slot 8 — State pill: dot semántico + texto. Nunca color solo (siempre texto).
   Mapea PillTone → familia --badge-* del DS (con variantes dark). Cero rgba crudo. */
import type { PillTone } from "./tokens";

interface ToneTokens {
  dot: string;
  bg: string;
  border: string;
}

/* focus → badge-violet (único violeta-como-color permitido, por spec: pill de foco). */
const TONE: Record<PillTone, ToneTokens> = {
  success: { dot: "var(--badge-success-dot)", bg: "var(--badge-success-bg)", border: "var(--badge-success-border)" },
  focus: { dot: "var(--badge-violet-dot)", bg: "var(--badge-violet-bg)", border: "var(--badge-violet-border)" },
  signal: { dot: "var(--badge-signal-dot)", bg: "var(--badge-signal-bg)", border: "var(--badge-signal-border)" },
  opportunity: { dot: "var(--badge-opportunity-dot)", bg: "var(--badge-opportunity-bg)", border: "var(--badge-opportunity-border)" },
  error: { dot: "var(--badge-error-dot)", bg: "var(--badge-error-bg)", border: "var(--badge-error-border)" },
  neutral: { dot: "var(--badge-neutral-dot)", bg: "var(--badge-neutral-bg)", border: "var(--badge-neutral-border)" },
};

interface CardStatePillProps {
  tone: PillTone;
  children: React.ReactNode;
}

export default function CardStatePill({ tone, children }: CardStatePillProps) {
  const t = TONE[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        height: 26,
        padding: "0 11px",
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 0,
        font: "500 13px var(--font-primary)",
        letterSpacing: "-.01em",
        color: "var(--badge-text)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.dot, flex: "0 0 auto" }} />
      {children}
    </span>
  );
}
