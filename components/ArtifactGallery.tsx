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
  { key: "cuando" as const,    label: "Cuándo se usa" },
  { key: "riesgo" as const,    label: "Riesgo que reduce" },
  { key: "decision" as const,  label: "Decisión que habilita" },
  { key: "deja" as const,      label: "Qué deja" },
  { key: "method" as const,    label: "Conexión con el método" },
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
      role="listitem"
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

function DetailPanel({ sel, selected }: { sel: Artifact; selected: number }) {
  return (
    <div
      id={`art-detail-${selected}`}
      role="region"
      aria-label={`Detalle: ${sel.h}`}
      aria-live="polite"
      style={{ marginTop: 12, marginBottom: 12, overflow: "hidden", animation: "art-detail-in .28s var(--ease-premium)" }}
    >
      <div style={{ padding: "36px 40px", border: `1px solid ${sel.c}`, borderTop: `3px solid ${sel.c}`, background: "rgba(255,255,255,.98)" }}>
        {/* Encabezado del panel */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: sel.c, flexShrink: 0 }} />
          <span style={{ font: "600 13px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>{sel.h}</span>
          <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)", marginLeft: 4 }}>· {sel.k}</span>
        </div>

        {/* Slots 4–6 del sistema de cards 2.4: 6 columnas de detalle */}
        <div className="art-detail-cols" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px 36px" }}>
          {DETAIL_COLS.map((col) => (
            <div key={col.key}>
              <span style={{ display: "block", font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 10 }}>
                {col.label}
              </span>
              <p style={{ margin: 0, font: "400 14px/1.65 var(--font-primary)", color: "var(--ink-graphite)" }}>{sel[col.key]}</p>
            </div>
          ))}
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
            role="list"
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
        @media (max-width: 900px) {
          .art-detail-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .art-detail-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
