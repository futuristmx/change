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

export const DIMENSION_META: Record<Dimension, DimensionMeta> = {
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

export type Level = "reactivo" | "emergente" | "en-construccion" | "sostenido";

export interface LevelMeta {
  key: Level;
  label: string;
  min: number;
  max: number;
  blurb: string;
}

export const LEVELS: LevelMeta[] = [
  { key: "reactivo", label: "Reactivo", min: 0, max: 39, blurb: "La organización responde cuando el cambio ya es urgencia. Hay capacidad, pero llega tarde." },
  { key: "emergente", label: "Emergente", min: 40, max: 59, blurb: "Hay lectura del entorno, pero el criterio no termina de sostenerse en el tiempo." },
  { key: "en-construccion", label: "En construcción", min: 60, max: 79, blurb: "La capacidad existe en partes; falta conectarla en una cadena que sostenga el rumbo." },
  { key: "sostenido", label: "Sostenido", min: 80, max: 100, blurb: "La organización lee, decide y aprende como sistema. El reto es no perderlo al crecer." },
];

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

function levelFor(total: number): LevelMeta {
  return LEVELS.find((l) => total >= l.min && total <= l.max) ?? LEVELS[LEVELS.length - 1];
}

/**
 * Calcula el resultado del Score a partir de las respuestas.
 * - Respuestas incompletas → status "incomplete" (no lanza).
 * - Valores fuera de rango / no enteros → status "invalid" (no lanza).
 * - Completo y válido → status "ok" con score total, por dimensión, dimensión
 *   más vulnerable, nivel, riesgo principal y primer movimiento.
 */
export function scoreCapacity(answers: Answers): ScoreResult {
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

  const lvl = levelFor(total);
  const meta = DIMENSION_META[weakest];

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
    recommendation: `Tu punto más vulnerable es ${meta.label}. ${meta.firstMove}`,
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
