/* ════════════════════════════════════════════════════════════
   Change DS 2.4 — glifos estratégicos
   SVG inline, stroke=currentColor (heredan el color del acento),
   stroke 1.5, round caps/joins. Cero emoji, cero Lucide.
   ════════════════════════════════════════════════════════════ */

export type GlyphName =
  | "decision" | "insight" | "metric" | "risk"
  | "project" | "status" | "nav" | "lock" | "read";

interface GlyphProps {
  name: GlyphName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const PATHS: Record<GlyphName, React.ReactNode> = {
  // nodo que se bifurca en dos rutas — decisión
  decision: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M7 12 L17 6.8 M7 12 L17 17.2" />
    </>
  ),
  // lente que observa — leer: detectar lo que cambia antes de que sea evidente
  read: (
    <>
      <path d="M2.5 12 C6 7.5 18 7.5 21.5 12 C18 16.5 6 16.5 2.5 12 Z" />
      <circle cx="12" cy="12" r="2.3" />
    </>
  ),
  // arcos concéntricos — señal/radar
  insight: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 7.5 A4.5 4.5 0 0 1 16.5 12" />
      <path d="M12 4 A8 8 0 0 1 20 12" />
    </>
  ),
  // trayectoria ascendente — métrica
  metric: (
    <>
      <path d="M4 16 L10 11 L13.5 13.5 L20 7" />
      <circle cx="20" cy="7" r="1.6" />
      <circle cx="4" cy="16" r="1.2" />
    </>
  ),
  // rutas que se cruzan — riesgo/conflicto
  risk: (
    <>
      <path d="M5 5 L19 19 M19 5 L5 19" />
      <circle cx="12" cy="12" r="2.2" />
    </>
  ),
  // capas/etapas — proyecto
  project: (
    <>
      <path d="M5 8 L12 5 L19 8 L12 11 Z" />
      <path d="M5 12.5 L12 15.5 L19 12.5" />
      <path d="M5 16.5 L12 19 L19 16.5" />
    </>
  ),
  // ciclo con nodo de avance — estado
  status: (
    <>
      <path d="M19 12 A7 7 0 1 1 14.5 5.5" />
      <path d="M19 6 L19 12 L13 12" />
    </>
  ),
  // entrada a una sección — navegación
  nav: (
    <>
      <path d="M5 5 L5 19 L13 19" />
      <path d="M11 12 L19 12 M15.5 8.5 L19 12 L15.5 15.5" />
    </>
  ),
  // candado — locked
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" />
      <path d="M8 11 V8 A4 4 0 0 1 16 8 V11" />
      <circle cx="12" cy="15.5" r="0.6" />
    </>
  ),
};

export default function Glyph({ name, size = 24, strokeWidth = 1.5, className }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
