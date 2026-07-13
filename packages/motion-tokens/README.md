# @change/motion-tokens

Fuente única del sistema de Motion del **Change DS**. Consolida los tokens que hoy
viven dispersos y contradictorios en `styles/ds/tokens/motion*.css` a un solo set,
y agrega el adapter de framer-motion para que los proyectos dejen de hardcodear
segundos y springs.

> **Regla:** cero literales de tiempo/easing en el call site. Toda duración y toda
> curva vienen de aquí. Una sola curva de interacción; springs y bounce vetados.

## Consumir

**CSS** (custom properties):
```css
@import "@change/motion-tokens/css";

.button { transition: var(--transition-color); }
.panel  { transition: transform var(--dur-premium) var(--ease-strategic); }
```

**framer-motion** (presets, no springs):
```tsx
import { transition, revealVariants, stagger } from "@change/motion-tokens"

<motion.button whileHover={{ y: -1 }} transition={transition.hover} />
<motion.section variants={revealVariants} initial="initial" whileInView="animate" />
{items.map((it, i) => <motion.li key={it.id} transition={stagger(i)} … />)}
```

Para neutralizar el spring implícito de framer en toda una app, envuélvela una vez:
```tsx
import { MotionConfig } from "framer-motion"
import { transition } from "@change/motion-tokens"
<MotionConfig transition={transition.standard}>{children}</MotionConfig>
```

## Contenido

| Archivo | Qué expone |
|---|---|
| `motion-tokens.css` | `--dur-*`, `--ease-*`, `--stagger-*`, transiciones compuestas + reduced-motion |
| `tokens.ts` | `DURATION_MS`, `DURATION_S`, `EASE`, `STAGGER_S` (espejo JS de la CSS) |
| `presets.ts` | `transition` (hover/standard/glide/reveal/exit/lineDraw), `revealVariants`, `stagger()` |

## Escala

| Token | Valor | Uso |
|---|---|---|
| `--dur-instant` | 0ms | chrome de alta frecuencia (no anima) |
| `--dur-fast` | 120ms | hover/focus |
| `--dur-standard` | 220ms | transición estándar |
| `--dur-premium` | 330ms | techo del chrome · glide |
| `--dur-enter` | 420ms | reveal por scroll |
| `--dur-draw` | 1100ms | line-draw (capa de señal) |
| `--dur-pulse` | 5000ms | pulso ambiental (capa de señal) |
| `--ease-strategic` | `cubic-bezier(0.22,1,0.36,1)` | **la** curva — aterriza en y=1, sin overshoot |
| `--ease-exit` | `cubic-bezier(0.4,0,1,1)` | solo salidas |

## Estado

Fase 2 del plan de motion (post-consolidación del canónico, PR #125). Aún **sin
publicar** a un registro — es la fuente distribuible lista para publicarse y para que
`change` empiece a importarla. Siguiente: piloto en VDM (mayor superficie, peor
divergencia) antes de generalizar y prender el gate D8 de WARN→FAIL.
