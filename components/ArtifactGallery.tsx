"use client";

import { useState } from "react";

interface Artifact {
  h: string;
  k: string;
  c: string;
  p: string;
  pregunta: string;
  cuando: string;
  deja: string;
  method: string;
}

const ARTIFACTS: Artifact[] = [
  {
    h: "Radar de señales",
    k: "Leer",
    c: "var(--signal-cyan)",
    p: "El mapa de lo que se mueve en tu entorno y todavía no es evidente.",
    pregunta: "¿Qué está cambiando en el entorno que todavía no tiene nombre en tu organización?",
    cuando: "Cuando algo se siente diferente pero nadie puede nombrarlo todavía — antes de que se vuelva urgencia.",
    deja: "Una lista de señales priorizadas con criterio de lectura: qué mirar, con qué frecuencia y quién interpreta.",
    method: "Activa el primer movimiento del método: Leer. El trabajo empieza aquí.",
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
  },
  {
    h: "Matriz de trade-offs",
    k: "Decidir",
    c: "var(--change-violet)",
    p: "Los criterios y sacrificios de cada camino, explícitos sobre la mesa.",
    pregunta: "¿Qué ganamos, qué sacrificamos y por qué — antes de comprometer recursos?",
    cuando: "Cuando hay opciones válidas pero no hay criterios explícitos para elegir entre ellas.",
    deja: "Los criterios documentados, los trade-offs visibles y la elección defendible ante cualquier interlocutor.",
    method: "Activa Decidir: hace el criterio explícito y sostenible para la próxima vez.",
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
  },
  {
    h: "Reporte ejecutivo",
    k: "Diseñar",
    c: "var(--opportunity-orange)",
    p: "La síntesis que lleva la decisión al lenguaje del consejo y de quien firma.",
    pregunta: "¿Cómo lleva la lectura al lenguaje de quien tiene que aprobar y de quien tiene que implementar?",
    cuando: "Cuando la decisión está tomada pero necesita ser comunicada y defendida hacia el board o la dirección.",
    deja: "Una síntesis ejecutiva con los criterios y trade-offs visibles, lista para presentar.",
    method: "Activa Diseñar en modo comunicación: la decisión en el formato que mueve.",
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
  },
];

const DETAIL_COLS = [
  { key: "pregunta" as const, label: "Pregunta que responde" },
  { key: "cuando" as const,   label: "Cuándo se usa" },
  { key: "deja" as const,     label: "Qué deja" },
  { key: "method" as const,   label: "Conexión con el método" },
];

export default function ArtifactGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  function toggle(i: number) {
    setSelected(prev => (prev === i ? null : i));
  }

  const sel = selected !== null ? ARTIFACTS[selected] : null;

  return (
    <div>
      <div
        className="art-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
        }}
        role="list"
      >
        {ARTIFACTS.map((art, i) => {
          const active = selected === i;
          return (
            <button
              key={art.h}
              type="button"
              role="listitem"
              aria-expanded={active}
              aria-controls={`art-detail-${i}`}
              onClick={() => toggle(i)}
              style={{
                all: "unset",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                padding: "24px 22px 26px",
                background: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,.75)",
                border: `1px solid ${active ? art.c : "var(--border-subtle)"}`,
                borderTop: `3px solid ${art.c}`,
                transition: "border-color .18s ease, box-shadow .18s ease, background .18s ease",
                boxShadow: active ? "0 4px 24px rgba(0,0,0,.07)" : "none",
                outline: "none",
                textAlign: "left",
                minHeight: 190,
              }}
              onFocus={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px var(--change-violet)"; }}
              onBlur={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = active ? "0 4px 24px rgba(0,0,0,.07)" : "none"; }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                font: "600 var(--text-meta, 11px) var(--font-mono)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--ink-graphite)",
                marginBottom: 14,
              }}>
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: art.c, flexShrink: 0 }} />
                {art.k}
              </span>
              <span style={{
                display: "block",
                font: "600 17px/1.2 var(--font-primary)",
                letterSpacing: "-.02em",
                color: "var(--ink-graphite)",
                marginBottom: 10,
              }}>
                {art.h}
              </span>
              <span style={{
                display: "block",
                font: "400 13px/1.55 var(--font-primary)",
                color: "var(--text-muted)",
                flexGrow: 1,
              }}>
                {art.p}
              </span>
              <span aria-hidden="true" style={{
                marginTop: 16,
                font: "600 11px var(--font-mono)",
                letterSpacing: ".08em",
                color: active ? art.c : "var(--text-faint)",
                transition: "color .18s ease",
              }}>
                {active ? "Cerrar ↑" : "Ver detalle →"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel de detalle — aparece debajo del grid completo */}
      <div
        id={selected !== null ? `art-detail-${selected}` : undefined}
        role="region"
        aria-label={sel ? `Detalle: ${sel.h}` : undefined}
        aria-live="polite"
        style={{
          overflow: "hidden",
          maxHeight: sel ? 600 : 0,
          opacity: sel ? 1 : 0,
          transition: "max-height .3s ease, opacity .25s ease",
          marginTop: sel ? 12 : 0,
        }}
      >
        {sel && (
          <div style={{
            padding: "36px 40px",
            border: `1px solid ${sel.c}`,
            borderTop: `3px solid ${sel.c}`,
            background: "rgba(255,255,255,.97)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: sel.c, flexShrink: 0 }} />
              <span style={{ font: "600 13px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                {sel.h}
              </span>
              <span style={{ font: "400 13px var(--font-primary)", color: "var(--text-muted)", marginLeft: 4 }}>
                · {sel.k}
              </span>
            </div>

            <div className="art-detail-cols" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "28px 36px",
            }}>
              {DETAIL_COLS.map(col => (
                <div key={col.key}>
                  <span style={{
                    display: "block",
                    font: "600 10.5px var(--font-mono)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--text-faint)",
                    marginBottom: 10,
                  }}>
                    {col.label}
                  </span>
                  <p style={{
                    margin: 0,
                    font: "400 14px/1.65 var(--font-primary)",
                    color: "var(--ink-graphite)",
                  }}>
                    {sel[col.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .art-grid { grid-template-columns: repeat(2,1fr) !important; }
          .art-detail-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .art-grid { grid-template-columns: 1fr !important; }
          .art-detail-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
