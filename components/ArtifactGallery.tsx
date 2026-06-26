"use client";

import { useEffect, useState } from "react";
import { Glyph, InlineTooltip, type GlyphName } from "@/components/ds";

const GLYPH_K: Record<string, GlyphName> = {
  "Leer": "insight",
  "Interpretar": "risk",
  "Decidir": "decision",
  "Diseñar": "project",
  "Sostener": "status",
  "Transversal": "nav",
};

const METHOD_TIPS: Record<string, string> = {
  "Leer":        "Detectar y nombrar lo que se mueve en el entorno antes de que se vuelva urgencia.",
  "Interpretar": "Convertir señales dispersas en sentido accionable para esta organización.",
  "Decidir":     "Hacer explícito el criterio de elección antes de comprometer recursos.",
  "Diseñar":     "Convertir el criterio en movimientos concretos que el equipo puede ejecutar.",
  "Sostener":    "Mantener la capacidad construida viva entre decisiones.",
  "Transversal": "Activa varios movimientos del arco del método según el reto de la sesión.",
};

interface Artifact {
  h: string;
  k: string;
  c: string;
  p: string;
  pregunta: string;
  cuando: string;
  deja: string;
  method: string;
  riesgo: string;
  decision: string;
}

const ARTIFACTS: Artifact[] = [
  {
    h: "Radar de señales",
    k: "Leer",
    c: "var(--signal-cyan)",
    p: "El mapa de lo que se mueve en tu entorno y todavía no es evidente.",
    pregunta: "¿Qué está cambiando en el entorno que todavía no tiene nombre en tu organización?",
    cuando: "Cuando algo se siente diferente pero nadie puede nombrarlo todavía — antes de que se vuelva urgencia.",
    deja: "Una lista de señales priorizadas con criterio de interpretación: qué mirar, con qué frecuencia y quién interpreta.",
    method: "Activa el primer movimiento del método: Leer. El trabajo empieza aquí.",
    riesgo: "Reaccionar tarde. Que la urgencia decida por ti antes de que hayas elegido.",
    decision: "Qué señales merecen atención estratégica — y cuáles son ruido que no vale perseguir.",
  },
  {
    h: "Mapa de tensiones",
    k: "Interpretar",
    c: "var(--soft-violet)",
    p: "Las fuerzas en contradicción que definen el campo donde vas a decidir.",
    pregunta: "¿Qué fuerzas se contraponen en esta decisión y dónde está el conflicto real — no el que parece?",
    cuando: "Cuando hay información pero no hay acuerdo sobre qué significa para esta organización en particular.",
    deja: "Las tensiones nombradas y ordenadas — el campo de decisión visible antes de tomar posición.",
    method: "Activa Interpretar: convierte señales dispersas en sentido accionable para la organización.",
    riesgo: "Decidir sobre el síntoma. Confundir el conflicto visible con el conflicto real.",
    decision: "Dónde está el conflicto que importa — y cuál es la tensión que la decisión debe resolver.",
  },
  {
    h: "Matriz de decisión",
    k: "Decidir",
    c: "var(--change-violet)",
    p: "Los criterios y sacrificios de cada camino, explícitos sobre la mesa.",
    pregunta: "¿Qué ganamos, qué sacrificamos y por qué — antes de comprometer recursos?",
    cuando: "Cuando hay opciones válidas pero no hay criterios explícitos para elegir entre ellas.",
    deja: "Los criterios documentados, los sacrificios visibles y la elección defendible ante cualquier interlocutor.",
    method: "Activa Decidir: hace el criterio explícito y sostenible para la próxima vez.",
    riesgo: "Elegir sin criterio y no poder explicar por qué. Reabrir la discusión cada vez que aparece presión.",
    decision: "Qué opción se elige — y qué criterio hace esa elección defendible en el tiempo.",
  },
  {
    h: "Roadmap vivo",
    k: "Diseñar",
    c: "var(--change-violet)",
    p: "La secuencia de movimientos que se actualiza conforme cambian las condiciones.",
    pregunta: "¿Cómo baja la decisión a movimientos concretos que el equipo puede ejecutar esta semana?",
    cuando: "Cuando la decisión existe como intención pero no tiene forma en el día a día del equipo.",
    deja: "Una secuencia de pasos con responsables, condiciones de revisión y primer movimiento definido.",
    method: "Activa Diseñar: convierte el criterio en plan ejecutable con su lógica visible.",
    riesgo: "Que la decisión muera en el deck. Que la urgencia operativa desplace lo que se decidió hacer.",
    decision: "Cuál es el primer movimiento — y qué condición dispara la revisión del plan.",
  },
  {
    h: "Reporte ejecutivo",
    k: "Diseñar",
    c: "var(--opportunity-orange)",
    p: "La síntesis que lleva la decisión al lenguaje del consejo y de quien firma.",
    pregunta: "¿Cómo lleva el diagnóstico al lenguaje de quien tiene que aprobar y de quien tiene que implementar?",
    cuando: "Cuando la decisión está tomada pero necesita ser comunicada y defendida hacia el board o la dirección.",
    deja: "Una síntesis ejecutiva con los criterios y sacrificios visibles, lista para presentar.",
    method: "Activa Diseñar en modo comunicación: la decisión en el formato que mueve.",
    riesgo: "Que quien aprueba no entienda el razonamiento y la decisión se pierda en el camino.",
    decision: "Cómo se presenta el criterio para que quien no estuvo en la sala pueda sostenerlo.",
  },
  {
    h: "Field Note",
    k: "Sostener",
    c: "var(--signal-cyan)",
    p: "El registro corto de lo aprendido en el camino, para que el juicio no se pierda.",
    pregunta: "¿Qué aprendió la organización en esta decisión y cómo se guarda para que valga la próxima vez?",
    cuando: "Al cierre de un proyecto o decisión importante, antes de que el equipo se disperse.",
    deja: "Un registro estructurado del juicio usado: qué se consideró, qué se descartó y por qué.",
    method: "Activa Sostener: convierte el aprendizaje puntual en memoria institucional acumulable.",
    riesgo: "Que el aprendizaje se quede en la cabeza de quien lo vivió y no viaje con la organización.",
    decision: "Qué criterio queda documentado para que la próxima decisión no empiece de cero.",
  },
  {
    h: "Workshop instrumentado",
    k: "Transversal",
    c: "var(--human-pink)",
    p: "Una sesión que no termina en post-its: termina en un artefacto que decide.",
    pregunta: "¿Cómo alinea a un equipo en torno a una decisión compleja sin que la sesión se pierda en el aire?",
    cuando: "Cuando la decisión involucra múltiples perspectivas y necesita que el equipo la construya, no solo la reciba.",
    deja: "No post-its: uno de los artefactos del método, construido colectivamente en sesión y listo para usarse.",
    method: "Puede activar cualquier movimiento del arco según la sesión — es el formato, no el contenido.",
    riesgo: "Gastar energía colectiva en un espacio que no produce criterio ni artefacto accionable.",
    decision: "Cómo hacer que el juicio colectivo se convierta en algo que la organización pueda usar y sostener.",
  },
  {
    h: "Mission Control",
    k: "Sostener",
    c: "var(--ink-graphite)",
    p: "La infraestructura de memoria estratégica donde la capacidad permanece viva entre decisiones.",
    pregunta: "¿Cómo permanece viva la capacidad de decisión después de que el trabajo termina?",
    cuando: "Cuando la organización ya tomó decisiones y quiere que el aprendizaje no se pierda al crecer.",
    deja: "Una infraestructura de memoria viva: señales, tensiones, decisiones y aprendizajes conectados en un sistema.",
    method: "Es el destino de todos los artefactos del método: donde la capacidad se sostiene entre decisiones.",
    riesgo: "Que la capacidad construida dependa de las personas que la construyeron — y se vaya con ellas.",
    decision: "Cómo sostener el criterio en el tiempo para que la organización no vuelva a empezar de cero.",
  },
];

const DETAIL_COLS = [
  { key: "pregunta" as const,  label: "Pregunta que responde" },
  { key: "deja" as const,      label: "Qué deja" },
  { key: "riesgo" as const,    label: "Riesgo que reduce" },
  { key: "decision" as const,  label: "Decisión que habilita" },
];

function useResponsiveCols() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    function compute() {
      const w = window.innerWidth;
      if (w <= 520) setCols(1);
      else if (w <= 900) setCols(2);
      else setCols(4);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return cols;
}

interface ArtCardProps {
  art: Artifact;
  i: number;
  active: boolean;
  onToggle: (i: number) => void;
}

function ArtCard({ art, i, active, onToggle }: ArtCardProps) {
  const accentBorder = `3px solid ${art.c}`;
  return (
    <button
      type="button"
      aria-expanded={active}
      aria-controls={`art-detail-${i}`}
      onClick={() => onToggle(i)}
      className="art-card"
      style={{
        all: "unset",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: "24px 22px 26px",
        background: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,.78)",
        border: `1px solid ${active ? art.c : "var(--border-subtle)"}`,
        borderTop: accentBorder,
        transition:
          "transform var(--duration-standard) var(--ease-premium), border-color var(--duration-standard) var(--ease-premium), box-shadow var(--duration-standard) var(--ease-premium), background var(--duration-standard) var(--ease-premium)",
        boxShadow: active
          ? `0 2px 0 0 ${art.c}, 0 14px 36px color-mix(in srgb, ${art.c} 18%, transparent)`
          : "none",
        outline: "none",
        textAlign: "left",
        minHeight: 210,
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px var(--change-violet)";
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = active
          ? `0 2px 0 0 ${art.c}, 0 14px 36px color-mix(in srgb, ${art.c} 18%, transparent)`
          : "none";
      }}
    >
      {/* Slot 1 — glyph */}
      <span aria-hidden="true" style={{ display: "inline-flex", marginBottom: 12, color: art.c, opacity: active ? 1 : 0.7, transition: "opacity var(--duration-standard)" }}>
        <Glyph name={GLYPH_K[art.k] ?? "nav"} size={24} />
      </span>

      {/* Slot 1 — meta eyebrow */}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "700 11px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-graphite)", marginBottom: 12 }}>
        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: art.c, flexShrink: 0 }} />
        {METHOD_TIPS[art.k] ? (
          <InlineTooltip content={METHOD_TIPS[art.k]}>
            {art.k}
          </InlineTooltip>
        ) : art.k}
      </span>

      {/* Slot 2 — header */}
      <span style={{ display: "block", font: "600 17px/1.2 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)", marginBottom: 10 }}>{art.h}</span>

      {/* Slot 4 — content */}
      <span style={{ display: "block", font: "400 13px/1.55 var(--font-primary)", color: "var(--text-muted)", flexGrow: 1 }}>{art.p}</span>

      {/* Slot 8 — state feedback */}
      <span aria-hidden="true" style={{ marginTop: 16, font: "700 10px var(--font-secondary)", letterSpacing: ".1em", textTransform: "uppercase", color: active ? art.c : "var(--text-faint)", transition: "color .18s ease" }}>
        {active ? "Cerrar ↑" : "Ver detalle →"}
      </span>
    </button>
  );
}

/* ── Diagrama vectorial del instrumento — minimalista, grafito neutro ── */
const DIA = { fill: "none", stroke: "var(--ink-graphite)", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const INK = "var(--ink-graphite)";

function InstrumentDiagram({ name }: { name: string }) {
  const body = (() => {
    switch (name) {
      case "Radar de señales":
        return (
          <>
            <g opacity="0.3"><circle cx="60" cy="60" r="44" /><circle cx="60" cy="60" r="29" /><circle cx="60" cy="60" r="14" /></g>
            <g opacity="0.22"><line x1="14" y1="60" x2="106" y2="60" /><line x1="60" y1="14" x2="60" y2="106" /></g>
            <g fill={INK} stroke="none"><circle cx="82" cy="44" r="3.4" /><circle cx="45" cy="74" r="2.6" /><circle cx="70" cy="83" r="2.2" /><circle cx="43" cy="48" r="2" /></g>
            <circle cx="82" cy="44" r="8" fill="none" strokeWidth="1.1" opacity="0.5" />
          </>
        );
      case "Mapa de tensiones":
        return (
          <>
            <g opacity="0.25"><line x1="60" y1="22" x2="60" y2="98" /><line x1="22" y1="60" x2="98" y2="60" /></g>
            <path d="M24 60 H42 M35 53 L42 60 L35 67" />
            <path d="M96 60 H78 M85 53 L78 60 L85 67" />
            <circle cx="60" cy="60" r="11" fill="none" opacity="0.4" />
            <circle cx="60" cy="60" r="5.5" fill={INK} stroke="none" />
          </>
        );
      case "Matriz de decisión":
        return (
          <>
            <rect x="26" y="26" width="68" height="68" opacity="0.5" />
            <g opacity="0.5"><line x1="60" y1="26" x2="60" y2="94" /><line x1="26" y1="60" x2="94" y2="60" /></g>
            <g fill={INK} stroke="none" opacity="0.32"><circle cx="43" cy="43" r="2.4" /><circle cx="43" cy="77" r="2.4" /><circle cx="77" cy="77" r="2.4" /></g>
            <circle cx="77" cy="43" r="9" fill="none" opacity="0.45" />
            <circle cx="77" cy="43" r="5" fill={INK} stroke="none" />
          </>
        );
      case "Roadmap vivo":
        return (
          <>
            <line x1="20" y1="66" x2="100" y2="66" opacity="0.4" />
            <g fill={INK} stroke="none"><circle cx="28" cy="66" r="4" /><circle cx="52" cy="66" r="4" /></g>
            <g fill="none"><circle cx="76" cy="66" r="4" /><circle cx="100" cy="66" r="4" /></g>
            <path d="M76 66 L92 46" opacity="0.5" /><circle cx="92" cy="46" r="3.4" fill="none" />
          </>
        );
      case "Reporte ejecutivo":
        return (
          <>
            <rect x="34" y="22" width="52" height="76" opacity="0.55" />
            <rect x="42" y="32" width="36" height="8" rx="0" fill={INK} stroke="none" opacity="0.55" />
            <g opacity="0.42"><line x1="42" y1="52" x2="78" y2="52" /><line x1="42" y1="62" x2="78" y2="62" /><line x1="42" y1="72" x2="66" y2="72" /></g>
            <line x1="42" y1="84" x2="58" y2="84" strokeWidth="2.4" />
          </>
        );
      case "Field Note":
        return (
          <>
            <path d="M40 28 H72 L84 40 V92 H40 Z" opacity="0.55" />
            <path d="M72 28 V40 H84" opacity="0.55" />
            <g opacity="0.42"><line x1="48" y1="58" x2="76" y2="58" /><line x1="48" y1="68" x2="76" y2="68" /><line x1="48" y1="78" x2="64" y2="78" /></g>
            <circle cx="49" cy="48" r="2.6" fill={INK} stroke="none" />
          </>
        );
      case "Workshop instrumentado":
        return (
          <>
            <g opacity="0.45"><line x1="30" y1="34" x2="60" y2="60" /><line x1="92" y1="34" x2="60" y2="60" /><line x1="26" y1="76" x2="60" y2="60" /><line x1="94" y1="80" x2="60" y2="60" /></g>
            <g fill={INK} stroke="none" opacity="0.65"><circle cx="30" cy="34" r="3" /><circle cx="92" cy="34" r="3" /><circle cx="26" cy="76" r="3" /><circle cx="94" cy="80" r="3" /></g>
            <circle cx="60" cy="60" r="12" fill="none" opacity="0.4" />
            <circle cx="60" cy="60" r="6.5" fill={INK} stroke="none" />
          </>
        );
      case "Mission Control":
        return (
          <>
            <g opacity="0.38"><line x1="60" y1="60" x2="32" y2="36" /><line x1="60" y1="60" x2="90" y2="40" /><line x1="60" y1="60" x2="34" y2="84" /><line x1="60" y1="60" x2="86" y2="86" /><line x1="32" y1="36" x2="90" y2="40" /><line x1="34" y1="84" x2="86" y2="86" /></g>
            <g fill={INK} stroke="none"><circle cx="32" cy="36" r="3" /><circle cx="90" cy="40" r="3" /><circle cx="34" cy="84" r="3" /><circle cx="86" cy="86" r="3" /></g>
            <circle cx="60" cy="60" r="8" fill="none" strokeWidth="1.4" />
            <circle cx="60" cy="60" r="3.2" fill={INK} stroke="none" />
          </>
        );
      default:
        return <><circle cx="60" cy="60" r="30" opacity="0.4" /><circle cx="60" cy="60" r="5" fill={INK} stroke="none" /></>;
    }
  })();

  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true" style={{ display: "block", maxWidth: 188, margin: "0 auto" }}>
      <g {...DIA}>{body}</g>
    </svg>
  );
}

function DetailPanel({ sel, selected }: { sel: Artifact; selected: number }) {
  return (
    <div
      id={`art-detail-${selected}`}
      role="region"
      aria-label={`Detalle: ${sel.h}`}
      aria-live="polite"
      style={{ marginTop: 12, marginBottom: 12, overflow: "hidden", animation: "art-detail-in .28s var(--ease-premium)" }}
    >
      <div style={{ padding: "clamp(28px,3.4vw,40px)", border: `1px solid ${sel.c}`, borderTop: `3px solid ${sel.c}`, background: "rgba(255,255,255,.98)" }}>
        {/* Encabezado del panel */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: sel.c, flexShrink: 0 }} />
          <span style={{ font: "600 13px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>{sel.h}</span>
          <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)", marginLeft: 4 }}>· {sel.k}</span>
        </div>

        {/* Diagrama del instrumento + datos esenciales */}
        <div className="art-detail-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,250px) minmax(0,1fr)", gap: "clamp(24px,3vw,48px)", alignItems: "start" }}>
          <div style={{ background: "color-mix(in srgb, var(--ink-graphite) 3.5%, transparent)", border: "1px solid var(--border-subtle)", padding: "clamp(22px,2.6vw,32px)", display: "grid", placeItems: "center", aspectRatio: "1 / 1" }}>
            <InstrumentDiagram name={sel.h} />
          </div>
          <div className="art-detail-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "26px 32px" }}>
            {DETAIL_COLS.map((col) => (
              <div key={col.key}>
                <span style={{ display: "block", font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 9 }}>
                  {col.label}
                </span>
                <p style={{ margin: 0, font: "400 14px/1.6 var(--font-primary)", color: "var(--ink-graphite)" }}>{sel[col.key]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtifactGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const cols = useResponsiveCols();

  function toggle(i: number) {
    setSelected((prev) => (prev === i ? null : i));
  }

  const sel = selected !== null ? ARTIFACTS[selected] : null;
  const selectedRow = selected !== null ? Math.floor(selected / cols) : -1;

  const rows: Artifact[][] = [];
  for (let i = 0; i < ARTIFACTS.length; i += cols) {
    rows.push(ARTIFACTS.slice(i, i + cols));
  }

  return (
    <div>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx}>
          <div
            className="art-grid"
            style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 12 }}
          >
            {row.map((art, colIdx) => {
              const globalI = rowIdx * cols + colIdx;
              return <ArtCard key={art.h} art={art} i={globalI} active={selected === globalI} onToggle={toggle} />;
            })}
          </div>
          {sel && selectedRow === rowIdx && <DetailPanel sel={sel} selected={selected as number} />}
        </div>
      ))}

      <style>{`
        @keyframes art-detail-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [role="region"][id^="art-detail-"] { animation: none !important; }
        }
        .art-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(46,46,51,.1) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .art-card { transition: none !important; }
          .art-card:hover { transform: none !important; }
        }
        @media (max-width: 820px) {
          .art-detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .art-detail-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
