/* ════════════════════════════════════════════════════════════
   Change DS 2.4 — contrato tipado (fuente de verdad)
   Nombres de token, acentos semánticos, densidad, estados y
   microcopy es-MX. Sin JSX. Cero hex literal: todo es var(--token).
   ════════════════════════════════════════════════════════════ */

export type CardState = "default" | "hover" | "selected" | "locked" | "loading" | "empty";
export const CARD_STATES: CardState[] = ["default", "hover", "selected", "locked", "loading", "empty"];

export type Density = "editorial" | "standard" | "compact";
export const DENSITIES: Density[] = ["editorial", "standard", "compact"];
export const densityClass: Record<Density, string> = {
  editorial: "density-editorial",
  standard: "density-standard",
  compact: "density-compact",
};

/** Tonos semánticos de píldora de estado → mapean a la familia --badge-* del DS. */
export type PillTone = "success" | "focus" | "signal" | "opportunity" | "error" | "neutral";

/** Acento semántico de cada variante de card: color de meta/glyph + tono de pill. */
export interface SemanticAccent {
  /** color del eyebrow/meta y del glyph (texto con contraste AA sobre superficie clara) */
  accentVar: string;
  /** tono de la píldora de estado por defecto */
  tone: PillTone;
}

/* Acentos por variante — color = función, nunca decoración. */
export const ACCENT: Record<string, SemanticAccent> = {
  decision: { accentVar: "var(--text-accent)", tone: "focus" },        // violeta = acción/decisión
  insight: { accentVar: "var(--status-info-fg)", tone: "signal" },     // cian AA (status-info-fg)
  metric: { accentVar: "var(--status-success-fg)", tone: "success" },  // verde
  risk: { accentVar: "var(--status-error-fg)", tone: "error" },        // ámbar/rojo
  project: { accentVar: "var(--status-warning-fg)", tone: "opportunity" }, // clay/ámbar
  status: { accentVar: "var(--status-info-fg)", tone: "signal" },      // cian (sin "teal")
  nav: { accentVar: "var(--text-muted)", tone: "neutral" },
};

/** Rampa de evolución (color = madurez/progreso). */
export const EVO_RAMP = [
  { key: "noise", label: "Señal débil", colorVar: "var(--evo-noise)" },
  { key: "analysis", label: "En análisis", colorVar: "var(--evo-analysis)" },
  { key: "focus", label: "En foco", colorVar: "var(--evo-focus)" },
  { key: "validated", label: "Validado", colorVar: "var(--evo-validated)" },
] as const;

/** Paleta data-series por significado (categóricas). */
export const DATA_SERIES = {
  signal: "var(--data-signal)",
  human: "var(--data-human)",
  opportunity: "var(--data-opportunity)",
  validated: "var(--data-validated)",
  dependency: "var(--data-dependency)",
  risk: "var(--data-risk)",
  focus: "var(--data-focus)",
  structure: "var(--data-structure)",
} as const;

/** Microcopy es-MX, sobrio, tuteo — por variante para locked/empty. */
export const STATE_MICROCOPY: Record<string, { locked: string; empty: string }> = {
  decision: { locked: "Se activará después de aceptar la propuesta anterior.", empty: "Sin decisiones pendientes en este horizonte." },
  insight: { locked: "Se desbloqueará con una nueva señal.", empty: "Aún no hay insights registrados en este horizonte." },
  metric: { locked: "Esta métrica se actualizará próximamente.", empty: "Sin datos disponibles para este período." },
  risk: { locked: "El detalle de riesgo se abre con la sesión de criterio.", empty: "Sin riesgos activos en este horizonte." },
  project: { locked: "El proyecto se activa al cerrar el sprint anterior.", empty: "Sin proyectos en curso en este horizonte." },
  status: { locked: "El estado se actualiza al avanzar la fase.", empty: "Sin estados que reportar por ahora." },
  nav: { locked: "Esta sección se activará después de aceptar la propuesta.", empty: "Sin secciones disponibles." },
};
