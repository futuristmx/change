// Valores canónicos de motion — FUENTE ÚNICA para consumidores JS / framer-motion.
// Espejo exacto de motion-tokens.css. Si cambias un valor, cámbialo en ambos.

/** Duraciones en milisegundos (para APIs que piden ms o CSS via template). */
export const DURATION_MS = {
  instant: 0,
  fast: 120,
  standard: 220,
  premium: 330,
  enter: 420,
  draw: 1100,
  pulse: 5000,
  breathe: 7000,
  drift: 90000,
} as const

/** Duraciones en segundos (framer-motion usa segundos). */
export const DURATION_S = {
  instant: 0,
  fast: 0.12,
  standard: 0.22,
  premium: 0.33,
  enter: 0.42,
  draw: 1.1,
  pulse: 5,
  breathe: 7,
  drift: 90,
} as const

/** Curvas cúbicas — framer acepta el arreglo directo como `ease`.
 *  Ninguna termina por encima de y=1: springs y overshoot están vetados. */
export const EASE = {
  /** La curva de casa. Enter, standard, hover, glide, draw, count. */
  strategic: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Accelerate-out — SOLO salidas/dismiss. Nunca ease-in en UI. */
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
} as const

/** Coreografía en segundos. */
export const STAGGER_S = {
  list: 0.09,
  pulse: 0.75,
} as const
