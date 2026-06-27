/**
 * Score de Capacidad de Futuro — lógica pura, sin UI ni efectos.
 *
 * Regla, no IA. Mide parcialmente qué tan preparada está una organización para
 * actuar cuando no hay certeza, sobre las cinco capacidades del método:
 * Leer · Interpretar · Decidir · Diseñar · Sostener.
 *
 * Esta función es determinista y testeable de forma aislada (ver
 * capacity-score.test.ts). El componente visual la consume; nunca al revés.
 */

export const DIMENSIONS = ["leer", "interpretar", "decidir", "disenar", "sostener"] as const;
export type Dimension = (typeof DIMENSIONS)[number];

/** Escala de respuesta: 0 = casi nunca … 3 = de forma sistemática. */
export type AnswerValue = 0 | 1 | 2 | 3;
export const ANSWER_MIN = 0;
export const ANSWER_MAX = 3;

/** Respuestas del usuario. null/ausente = sin contestar. */
export type Answers = Partial<Record<Dimension, AnswerValue | null>>;

export interface DimensionMeta {
  key: Dimension;
  label: string;
  question: string;
  risk: string;
  firstMove: string;
}

import type { Lang } from "@/lib/i18n";

export const DIMENSION_META_ES: Record<Dimension, DimensionMeta> = {
  leer: {
    key: "leer", label: "Leer",
    question: "¿Detectan las señales del entorno antes de que se vuelvan urgentes?",
    risk: "Te enteras tarde, cuando el cambio ya es urgencia.",
    firstMove: "Instalar un radar de señales: qué mirar antes de que sea obvio para todos.",
  },
  interpretar: {
    key: "interpretar", label: "Interpretar",
    question: "¿Entienden qué significan esas señales para su contexto, no para el mercado en general?",
    risk: "Reaccionar a la señal equivocada o confundir ruido con tendencia.",
    firstMove: "Construir un mapa de tensiones de la decisión que traes hoy.",
  },
  decidir: {
    key: "decidir", label: "Decidir",
    question: "¿Toman decisiones con criterios y trade-offs explícitos?",
    risk: "Decidir por inercia o por la voz más fuerte de la junta.",
    firstMove: "Hacer explícitos los criterios y trade-offs de tu decisión atorada.",
  },
  disenar: {
    key: "disenar", label: "Diseñar",
    question: "¿Convierten las decisiones en movimientos concretos y secuenciados?",
    risk: "Que las buenas decisiones se queden en intención.",
    firstMove: "Bajar una decisión a un roadmap vivo con su primer paso.",
  },
  sostener: {
    key: "sostener", label: "Sostener",
    question: "¿Guardan memoria, aprendizaje y seguimiento de lo que deciden?",
    risk: "Reinventar el rumbo en cada coyuntura y perder lo aprendido.",
    firstMove: "Darle memoria a tu criterio para no empezar de cero la próxima vez.",
  },
};

export const DIMENSION_META_EN: Record<Dimension, DimensionMeta> = {
  leer: {
    key: "leer", label: "Read",
    question: "Do you spot signals from the environment before they turn urgent?",
    risk: "You find out late, when the change is already an emergency.",
    firstMove: "Set up a signal radar: what to watch before it's obvious to everyone.",
  },
  interpretar: {
    key: "interpretar", label: "Interpret",
    question: "Do you understand what those signals mean for your context, not for the market at large?",
    risk: "Reacting to the wrong signal, or mistaking noise for a trend.",
    firstMove: "Build a tension map of the decision you're carrying today.",
  },
  decidir: {
    key: "decidir", label: "Decide",
    question: "Do you make decisions with explicit criteria and trade-offs?",
    risk: "Deciding by inertia, or by the loudest voice in the room.",
    firstMove: "Make the criteria and trade-offs of your stuck decision explicit.",
  },
  disenar: {
    key: "disenar", label: "Design",
    question: "Do you turn decisions into concrete, sequenced moves?",
    risk: "Letting good decisions stall as mere intention.",
    firstMove: "Bring a decision down to a living roadmap with its first step.",
  },
  sostener: {
    key: "sostener", label: "Sustain",
    question: "Do you keep memory, learning and follow-through on what you decide?",
    risk: "Reinventing the course at every turn and losing what was learned.",
    firstMove: "Give your judgment memory, so you don't start from zero next time.",
  },
};

/** Alias ES por compatibilidad (tests y código existente). */
export const DIMENSION_META = DIMENSION_META_ES;

export function getDimensionMeta(lang: Lang): Record<Dimension, DimensionMeta> {
  return lang === "en" ? DIMENSION_META_EN : DIMENSION_META_ES;
}

export type Level = "reactivo" | "emergente" | "en-construccion" | "sostenido";

export interface LevelMeta {
  key: Level;
  label: string;
  min: number;
  max: number;
  blurb: string;
}

export const LEVELS_ES: LevelMeta[] = [
  { key: "reactivo", label: "Reactivo", min: 0, max: 39, blurb: "La organización responde cuando el cambio ya es urgencia. Hay capacidad, pero llega tarde." },
  { key: "emergente", label: "Emergente", min: 40, max: 59, blurb: "Hay lectura del entorno, pero el criterio no termina de sostenerse en el tiempo." },
  { key: "en-construccion", label: "En construcción", min: 60, max: 79, blurb: "La capacidad existe en partes; falta conectarla en una cadena que sostenga el rumbo." },
  { key: "sostenido", label: "Sostenido", min: 80, max: 100, blurb: "La organización lee, decide y aprende como sistema. El reto es no perderlo al crecer." },
];

export const LEVELS_EN: LevelMeta[] = [
  { key: "reactivo", label: "Reactive", min: 0, max: 39, blurb: "The organization responds when change is already an emergency. There's capacity, but it arrives late." },
  { key: "emergente", label: "Emerging", min: 40, max: 59, blurb: "There's reading of the environment, but judgment doesn't quite hold over time." },
  { key: "en-construccion", label: "Under construction", min: 60, max: 79, blurb: "The capacity exists in parts; it still needs connecting into a chain that holds the course." },
  { key: "sostenido", label: "Sustained", min: 80, max: 100, blurb: "The organization reads, decides and learns as a system. The challenge is not to lose it while growing." },
];

/** Alias ES por compatibilidad. */
export const LEVELS = LEVELS_ES;

export type ScoreResult =
  | { status: "incomplete"; answered: number; missing: Dimension[] }
  | { status: "invalid"; invalid: Dimension[] }
  | {
      status: "ok";
      total: number;
      byDimension: Record<Dimension, number>;
      weakest: Dimension;
      weakestLabel: string;
      level: Level;
      levelLabel: string;
      levelBlurb: string;
      risk: string;
      firstMove: string;
      recommendation: string;
    };

function isValidAnswer(v: unknown): v is AnswerValue {
  return typeof v === "number" && Number.isInteger(v) && v >= ANSWER_MIN && v <= ANSWER_MAX;
}

function levelFor(total: number, levels: LevelMeta[]): LevelMeta {
  return levels.find((l) => total >= l.min && total <= l.max) ?? levels[levels.length - 1];
}

/**
 * Calcula el resultado del Score a partir de las respuestas.
 * - Respuestas incompletas → status "incomplete" (no lanza).
 * - Valores fuera de rango / no enteros → status "invalid" (no lanza).
 * - Completo y válido → status "ok" con score total, por dimensión, dimensión
 *   más vulnerable, nivel, riesgo principal y primer movimiento.
 */
export function scoreCapacity(answers: Answers, lang: Lang = "es"): ScoreResult {
  // 1) valores inválidos (presentes pero fuera de rango)
  const invalid: Dimension[] = [];
  for (const d of DIMENSIONS) {
    const v = answers[d];
    if (v !== null && v !== undefined && !isValidAnswer(v)) invalid.push(d);
  }
  if (invalid.length > 0) return { status: "invalid", invalid };

  // 2) respuestas incompletas
  const missing = DIMENSIONS.filter((d) => answers[d] === null || answers[d] === undefined);
  if (missing.length > 0) {
    return { status: "incomplete", answered: DIMENSIONS.length - missing.length, missing };
  }

  // 3) score por dimensión (0–100) y total
  const byDimension = {} as Record<Dimension, number>;
  for (const d of DIMENSIONS) {
    byDimension[d] = Math.round(((answers[d] as AnswerValue) / ANSWER_MAX) * 100);
  }
  const total = Math.round(DIMENSIONS.reduce((s, d) => s + byDimension[d], 0) / DIMENSIONS.length);

  // 4) dimensión más vulnerable (mínimo; empate → orden del arco, determinista)
  let weakest: Dimension = DIMENSIONS[0];
  for (const d of DIMENSIONS) {
    if (byDimension[d] < byDimension[weakest]) weakest = d;
  }

  const metaSet = lang === "en" ? DIMENSION_META_EN : DIMENSION_META_ES;
  const levels = lang === "en" ? LEVELS_EN : LEVELS_ES;
  const lvl = levelFor(total, levels);
  const meta = metaSet[weakest];

  return {
    status: "ok",
    total,
    byDimension,
    weakest,
    weakestLabel: meta.label,
    level: lvl.key,
    levelLabel: lvl.label,
    levelBlurb: lvl.blurb,
    risk: meta.risk,
    firstMove: meta.firstMove,
    recommendation: lang === "en"
      ? `Your most vulnerable point is ${meta.label}. ${meta.firstMove}`
      : `Tu punto más vulnerable es ${meta.label}. ${meta.firstMove}`,
  };
}

/** Datos de contacto opcionales (solo si el usuario decide enviar). */
export interface ScoreContact {
  nombre?: string;
  organizacion?: string;
  email?: string;
  decision?: string;
}

export interface ScorePayload {
  answers: Answers;
  result: ScoreResult;
  contact?: ScoreContact;
  source: string;
}

/**
 * Construye el payload que se guarda — a partir del MISMO resultado que se
 * muestra en pantalla, garantizando consistencia entre lo visible y lo guardado.
 */
export function buildScorePayload(answers: Answers, result: ScoreResult, contact?: ScoreContact): ScorePayload {
  return { answers, result, contact, source: "score-capacidad-futuro" };
}
