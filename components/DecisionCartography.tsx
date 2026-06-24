"use client";

import { useState } from "react";

interface Node {
  title: string;
  micro: string;
  copy: string;
  color: string;
  halo: string;
}

const NODES: Node[] = [
  { title: "Señal", micro: "qué cambia", color: "var(--signal-cyan)", halo: "rgba(89,184,217,.22)", copy: "Lo que empieza a moverse afuera: mercado, usuario, tecnología, regulación o competencia. Una señal no es urgente todavía — pero ignorarla tiene costo." },
  { title: "Escenario", micro: "qué podría pasar", color: "var(--soft-violet)", halo: "rgba(109,59,255,.14)", copy: "La señal se vuelve posibilidad estratégica. Qué puede pasar, con qué ritmo y bajo qué condiciones. Sin escenarios, solo hay reacción." },
  { title: "Criterio", micro: "qué importa", color: "var(--change-violet)", halo: "rgba(109,59,255,.18)", copy: "El equipo explicita qué debe pesar más: margen, velocidad, control, marca, aprendizaje o resiliencia. El criterio es la decisión antes de la decisión." },
  { title: "Decisión", micro: "qué se elige", color: "var(--change-violet)", halo: "rgba(109,59,255,.18)", copy: "La conversación deja de ser opinión dispersa y se vuelve una elección con trade-offs visibles y razonamiento trazable." },
  { title: "Proyecto", micro: "qué se mueve", color: "var(--change-violet)", halo: "rgba(109,59,255,.18)", copy: "La decisión baja a iniciativas, responsables, ritmo e hitos concretos. El criterio se vuelve movimiento." },
  { title: "Sistema", micro: "qué sostiene", color: "var(--ink-graphite)", halo: "rgba(46,46,51,.12)", copy: "El criterio queda vivo: trazable, revisable, gobernable en el tiempo. Mission Control es donde vive el sistema." },
];

const LAST = NODES.length - 1;
const LINE_INSET = 100 / 12; // % — alinea con el centro del primer/último nodo (6 columnas)

export default function DecisionCartography() {
  const [active, setActive] = useState(0);
  const node = NODES[active];
  const fillWidth = (active / LAST) * (100 - 2 * LINE_INSET); // % del tramo iluminado

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        background: "linear-gradient(155deg,rgba(255,255,255,.92),rgba(244,242,250,.66))",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 30px 80px rgba(31,17,72,.07)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: "20px 26px", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cartografía de decisión</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          <span data-pulse style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-cyan)" }} />
          Interactivo
        </span>
      </div>

      <div style={{ position: "relative", padding: "44px 32px 36px" }}>
        {/* traceline base + relleno progresivo */}
        <div className="ch-traceline" style={{ position: "absolute", left: `${LINE_INSET}%`, right: `${LINE_INSET}%`, top: 52, height: 2, background: "var(--line-structural)", opacity: 0.5 }} />
        <div className="ch-traceline" style={{ position: "absolute", left: `${LINE_INSET}%`, top: 52, height: 2, width: `${fillWidth}%`, background: "linear-gradient(90deg,var(--signal-cyan),var(--change-violet))", transition: "width .4s var(--ease-premium)" }} />

        <div className="ch-tracenodes" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
          {NODES.map((n, i) => {
            const on = i === active;
            return (
              <button
                key={n.title}
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={`${n.title}, paso ${i + 1} de ${NODES.length}`}
                style={{ border: 0, background: "transparent", padding: 0, textAlign: "center", cursor: "pointer", fontFamily: "var(--font-primary)", color: "inherit" }}
              >
                <span
                  style={{
                    display: "block", width: 16, height: 16, borderRadius: 999, margin: "0 auto 20px",
                    background: n.color,
                    boxShadow: on
                      ? `0 0 0 6px rgba(255,255,255,.9), 0 0 0 11px ${n.halo}, 0 6px 16px ${n.halo}`
                      : `0 0 0 6px rgba(255,255,255,.85), 0 0 0 9px ${n.halo}`,
                    transform: on ? "scale(1.2)" : "scale(1)",
                    transition: "transform .3s var(--ease-premium), box-shadow .3s var(--ease-premium)",
                  }}
                />
                <strong style={{ display: "block", font: "500 14px var(--font-primary)", letterSpacing: "-.01em", color: on ? "var(--change-violet)" : "var(--ink-graphite)", transition: "color .3s" }}>{n.title}</strong>
                <span style={{ display: "block", marginTop: 5, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)" }}>{n.micro}</span>
              </button>
            );
          })}
        </div>

        {/* cadena lineal — solo mobile (<768px), reemplaza al traceline */}
        <div className="ch-chain-linear" style={{ display: "none", marginTop: 24, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".06em", color: "var(--text-muted)", textAlign: "center" }}>
          Señal · Escenario · Criterio · Decisión · Proyecto · Sistema
        </div>

        <div style={{ margin: "34px 0 0", padding: "26px 28px", border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${node.color}`, background: "#fff", transition: "border-color .3s var(--ease-premium)" }}>
          <h3 style={{ margin: 0, font: "600 21px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{node.title}</h3>
          <p style={{ margin: "10px 0 0", font: "400 15.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{node.copy}</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ch-traceline { display: none; }
          .ch-tracenodes { grid-template-columns: repeat(3,1fr) !important; row-gap: 28px !important; }
          .ch-chain-linear { display: block !important; }
        }
      `}</style>
    </div>
  );
}
