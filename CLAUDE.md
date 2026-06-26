# CLAUDE.md — change-web · Memoria operativa del repo

> Última actualización: 2026-06-25 · Change UI DS 2.4 integrado

Este sitio es la plataforma pública de Change — firma de inteligencia estratégica para
capacidad de futuro. No es una web genérica ni un SaaS. Es un artefacto institucional.
Cada componente debe poder responder: ¿esto ayuda al visitante a entender una tensión,
confiar más en Change, visualizar un artefacto, tomar una acción clara?

---

## Plataforma estratégica — BLOQUEADA

No redefinas. No es negociable.

- **Idea madre:** "La certeza dejó de ser condición para actuar."
- **Categoría:** Capacidad de Futuro
- **Qué hace Change:** diseña capacidades de futuro para actuar cuando no hay certeza
- **Método:** Leer → Interpretar → Decidir → Diseñar → Sostener
- **Mission Control:** memoria estratégica / infraestructura de continuidad. NUNCA software, NUNCA dashboard
- **Board visible:** Andrés Valencia + Miguel Cadena + Red de especialistas
- **Voz:** sobria, ejecutiva, premium, es-MX. Sin emojis.
- **Cliente:** organizaciones y líderes que deciden bajo ambigüedad
- **CTA global:** "Trabajar una decisión" (decisión de Andrés, 2026-06-25). NO usar "Simular una decisión": suena a inventado, no da certeza
- **CTA post-resultado:** "Trabajar esta decisión con Change" — solo después de que el usuario recibió un diagnóstico/resultado del simulador
- **Vocabulario:** evitar "lectura" como entregable (se malinterpreta como tarot) → usar "diagnóstico" / "interpretación". El verbo "Leer" del método se mantiene
- No parecer agencia, SaaS, trend lab ni consultora de decks

---

## Change UI Design System — UPGRADE 2.4

### Rol del Design System

Change UI no es una capa estética. Es un sistema de pensamiento visual para convertir
complejidad estratégica, inteligencia de futuros, decisiones, artefactos y seguimiento
en interfaces calmas, legibles y listas para acción.

### Filosofía visual

**Usar siempre:** Futurismo Sereno · Ethereal Horizons · Editorial Flat Premium ·
precisión · sobriedad · aire · calma · legibilidad · dirección estratégica.

**Evitar siempre:** estética SaaS genérica · tech-bro · cyberpunk · neón excesivo ·
enterprise rígido · dashboards saturados · cards decorativas sin función · gradientes
gratuitos · violeta excesivo · animaciones ornamentales · botones con glow innecesario ·
componentes que parezcan template.

### Stack técnico
- Next.js 15.5.x App Router · TypeScript strict · Tailwind v4 · Motion
- **Tailwind v4:** configuración en `app/globals.css` con `@theme inline` — NO existe `tailwind.config.js`
- Supabase `nqaagwrxmldspvaixxqf` para `contact_submissions`, `score_events`, `score_submissions`
- Vercel auto-deploy desde rama `main` vía PR merge (NO push directo a main)

### Tipografía

| Font | Variable CSS | Uso |
|------|-------------|-----|
| Postea Variable | `var(--font-primary)` | Títulos, leads, cuerpos editoriales |
| BD Orange Variable | `var(--font-secondary)` | Numerales, eyebrow labels, uppercase, meta |
| IBM Plex Mono | `var(--font-mono)` | Metadata, señales, timestamps, labels técnicos |

- Producción: Typekit kit `vjn7ksg` — `<link rel="stylesheet" href="https://use.typekit.net/vjn7ksg.css">`
- **NUNCA versionar .otf comerciales en el repo público** (licencia)
- Piso tipográfico: 11px desktop / 11px mobile. Nada por debajo de este piso.

### Color semántico

- **Electric Future Violet:** `var(--change-violet)` = `#6D3BFF` → acción, foco institucional
- Signal Cyan: `var(--signal-cyan)` = `#59B8D9`
- Human Pink: `var(--human-pink)` = `#B86AA4`
- Opportunity Orange: `var(--opportunity-orange)` = `#C97A3A`
- Success: `var(--success)` = `#5AA67A`
- Warning: `var(--warning)` = `#C98C42`
- Error: `var(--status-error-fg)` = `#C85E55`

**Reglas críticas de color:**
- `var(--text-muted)` y `var(--text-faint)` = `#4B4F59` (anulados en globals.css para AAA)
- Labels de color de marca → dot + texto `var(--ink-graphite)`. El texto small de hue de marca = BUG
- Contraste WCAG AAA obligatorio: 7:1 texto normal / 4.5:1 texto grande
- Texto en dark surfaces → opacidad `.8` (8.4–12.4:1)
- Violeta de label en dark → `var(--change-violet-300)` = `#B7A8FF`
- **CERO hex crudos en componentes.** Los tokens DEFINEN hex; los componentes usan `var(--token)`

### Layout

- Radius 0 en todo el sitio (regla permanente). Radius suave solo en overlays/modales justificados.
- Max-width wrapper: `min(1340px, calc(100% - clamp(40px,8vw,128px)))`
- Mucho whitespace. Grids claros. Alineación top en grupos editoriales.

### Motion tokens

```css
--duration-fast: 120ms;
--duration-standard: 220ms;
--duration-premium: 330ms;
--duration-enter: 420ms;
--duration-line: 1100ms;
--duration-pulse: 5000ms;
--ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
```

- Toda animación debe aclarar jerarquía, revelar relaciones o dar feedback. Nunca adorno.
- Respetar `prefers-reduced-motion` siempre.

---

## UPGRADE 2.4 — Dataviz + Card Family

### Evolution Ramp — color = madurez

```
ruido → análisis → foco → validado
--evo-noise → --evo-analysis → --evo-focus → --evo-validated
```

| Token | Hex | Significado |
|-------|-----|-------------|
| `--evo-noise` | `#BFC3CB` | Señal débil / ruido |
| `--evo-analysis` | `#59B8D9` | En monitoreo activo |
| `--evo-focus` | `#6D3BFF` | Decisión en curso (≤1 serie) |
| `--evo-validated` | `#5AA67A` | Evidencia cerrada |

- `--gradient-evolution` para fills horizontales de progreso
- Under `.change-dark`: `--evo-focus` → `#8A6CFF` (soft-violet)

### Data series — color por significado

`--data-{signal,human,opportunity,validated,dependency,risk,focus,structure}`

- Violeta (`--data-focus`) reservado para la serie en foco — máximo 1 serie por chart
- Siempre acompañar con label. Nunca solo color.

### Chart structure

`--chart-grid` · `--chart-axis` · `--chart-label` · `--chart-track` · `--chart-today`
`--chart-tooltip-{surface,outline,shadow}` · `--gradient-heat` · `--gradient-evolution`

**Tipos de chart válidos:** line-and-node · scorecards · timelines editoriales · barras
editoriales · micro-gantts · matrices 2x2 · tooltips premium · heatmaps sutiles · nodos
conectados · rutas de decisión.

### Card anatomy — 9 slots

Toda card estratégica considera estos slots (solo container + header son obligatorios):

1. **meta + glyph** — eyebrow mono que tipifica + glifo estratégico
2. **header** — la idea fuerte, con tensión estratégica
3. **container** — superficie blanca, línea grafito, sombra contenida
4. **content** — copy corto, o visual line-and-node
5. **metadata** — mono: confianza, horizonte, dueño, código
6. **primary action** — un CTA dominante (el violeta vive aquí)
7. **secondary action** — ghost/outline, nunca compite
8. **state** *(opcional)* — píldora semántica, dot + texto
9. **feedback** *(opcional)* — confirm/error inline post-acción

### Card family

`DecisionCard · InsightCard · MetricCard · RiskCard · ProjectCard · StatusCard · NavCard`
`ArtifactCard · CaseCard · ScoreCard · MissionControlCard · FieldNoteCard`

### 6 estados de cada card

`default · hover · selected · locked · loading · empty`

- **selected** → énfasis neutral (`--surface-selected`, `--border-selected`). NO glow violeta.
- **hover** → lift 2px, borde violeta, sombra suave
- **locked** → `--surface-locked` + borde dashed + icono de lock
- **loading** → skeleton shimmer (no spinner)
- **empty** → line-and-node mark + copy calmado

### Density

`.density-editorial` (24px, default) · `.density-standard` (16px) · `.density-compact` (14px)

---

## Componentes vivos del sitio

| Componente | Propósito |
|-----------|-----------|
| `MethodFlow` | Arco visual interactivo del método (5 verbos) |
| `SystemicDescent` | Descenso Época→Contexto→Organización→Decisión |
| `MissionControlLive` | Demo de memoria estratégica viva |
| `CapacityScore` | Instrumento de medición de capacidad de futuro |
| `DecisionSimulator` | "Estructura tu decisión" — experiencia principal de /contacto |
| `ArtifactGallery` | Galería de 8 artefactos del método (Card System 2.4) |
| `CasoCard` | Card expansible de cada caso por tensión (line-and-node) |
| `Header` | Nav sticky con pulso del logo |
| `Footer` | Cierre institucional dark |
| `StickyCta` | CTA sticky mobile (se oculta al llegar al footer) |
| `ScrollProgress` | Barra de progreso de scroll |
| `EtherealDivider` | Divisor etéreo entre secciones |

---

## Cómo debe trabajar Claude Code en este repo

1. Antes de implementar, verificar que el cambio fortalece la plataforma estratégica
2. No convertir conceptos en features innecesarias
3. No usar UI genérica ni hex crudos donde existan tokens
4. No agregar animaciones sin función cognitiva
5. No romper WCAG AAA (7:1 texto normal / 4.5:1 texto grande)
6. No introducir fuentes locales comerciales (no versionar .otf)
7. No reintroducir a Eric como perfil visible en el equipo
8. No exponer correos directos
9. No usar captchas
10. No usar IA generativa pública como feature
11. No convertir Mission Control en dashboard SaaS
12. El CTA global de botón es **"Trabajar una decisión"** (Andrés, 2026-06-25)
13. NO usar "Simular una decisión" ni "simulador" como nombre público (suena a inventado); la herramienta de /contacto se llama "Estructura tu decisión"
14. "Trabajar esta decisión con Change" se reserva para DESPUÉS de que el usuario recibió un diagnóstico o resultado del simulador
15. Toda implementación debe pasar `npm run build`, TypeScript strict, AAA, cero hex crudos y revisión visual

### Flujo de deploy

- **NUNCA push directo a main** desde el repo local (bloqueado por el clasificador)
- Canal correcto: rama → PR → `gh pr merge --squash --delete-branch`
- Claude NUNCA aparece como co-author en commits (override global)

### Regla de calidad antes de declarar listo

Ejecutar `npm run build` y confirmar que todas las páginas compilan sin errores.
No declarar "listo" sin output visible del build.

---

*Change · change.live · DS 2.4 · WCAG AAA · repo público futuristmx/change*
