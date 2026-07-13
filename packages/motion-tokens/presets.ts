import type { Transition, Variants } from 'framer-motion'
import { DURATION_S, EASE, STAGGER_S } from './tokens'

// Adapter de framer-motion — importa estos presets en vez de hardcodear
// `duration`/`ease` o usar `type: 'spring'`. Cada preset mapea a un estado.
// Esto neutraliza el pecado dominante río abajo (springs/bounce/segundos sueltos).

export const transition = {
  /** Feedback de estado en chrome: color/bg/border. */
  hover: { duration: DURATION_S.fast, ease: EASE.strategic },
  /** Transición estándar on-screen. */
  standard: { duration: DURATION_S.standard, ease: EASE.strategic },
  /** Continuidad: un elemento se traslada entre layouts (layoutId). Solo translate. */
  glide: { duration: DURATION_S.premium, ease: EASE.strategic },
  /** Entrada de contenido al viewport. */
  reveal: { duration: DURATION_S.enter, ease: EASE.strategic },
  /** Salida/dismiss de overlays, toasts, drawers. Único uso de ease-exit. */
  exit: { duration: DURATION_S.fast, ease: EASE.exit },
  /** Line-draw / carga: una relación se forma. */
  lineDraw: { duration: DURATION_S.draw, ease: EASE.strategic },
} satisfies Record<string, Transition>

/** Variants de entrada — base = estado final visible (nada nace con bounce/pop). */
export const revealVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: transition.reveal },
}

/** Transición de reveal escalonada por índice (onda editorial, no blink). */
export function stagger(index: number): Transition {
  return { ...transition.reveal, delay: index * STAGGER_S.list }
}
