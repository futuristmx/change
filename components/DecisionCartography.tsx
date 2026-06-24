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
  { title: "Señal", micro: "qué cambia", copy: "Lo que empieza a moverse afuera: mercado, usuario, tecnología, regulación o competencia.", color: "var(--signal-cyan)", halo: "rgba(89,184,217,.18)" },
  { title: "Escenario", micro: "qué podría pasar", copy: "La señal se vuelve posibilidad estratégica: qué puede pasar, con qué ritmo y bajo qué condiciones.", color: "var(--change-violet)", halo: "rgba(109,59,255,.12)" },
  { title: "Criterio", micro: "qué importa", copy: "El equipo explicita qué debe pesar más: margen, velocidad, control, marca, aprendizaje o resiliencia.", color: "var(--change-violet)", halo: "rgba(109,59,255,.12)" },
  { title: "Decisión", micro: "qué se elige", copy: "La conversación deja de ser opinión dispersa y se vuelve una elección con trade-offs visibles.", color: "var(--change-violet)", halo: "rgba(109,59,255,.12)" },
  { title: "Proyecto", micro: "qué se mueve", copy: "La decisión baja a iniciativas, responsables, ritmo e hitos concretos.", color: "var(--change-violet)", halo: "rgba(109,59,255,.12)" },
  { title: "Sistema", micro: "qué sostiene", copy: "El criterio queda vivo: trazable, revisable y gobernable en el tiempo.", color: "var(--ink-graphite)", halo: "rgba(46,46,51,.1)" },
];

export default function DecisionCartography() {
  const [active, setActive] = useState(0);
  const node = NODES[active];

  return (
    <aside
      style={{
        background: "linear-gradient(155deg,rgba(255,255,255,.9),rgba(244,242,250,.62))",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 30px 80px rgba(31,17,72,.07)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: "18px 22px", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cartografía de decisión</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          <span data-pulse style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-cyan)" }} />
          Interactivo
        </span>
      </div>

      <div style={{ position: "relative", padding: "32px 24px" }}>
        <div className="ch-traceline" style={{ position: "absolute", left: 54, right: 54, top: 39, height: 1.5, background: "linear-gradient(90deg,var(--signal-cyan),var(--change-violet) 60%,var(--ink-graphite))", opacity: 0.45 }} />
        <div className="ch-tracenodes" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
          {NODES.map((n, i) => (
            <button
              key={n.title}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              style={{ border: 0, background: "transparent", padding: 0, textAlign: "center", cursor: "pointer", fontFamily: "var(--font-primary)", color: "inherit" }}
            >
              <span
                style={{
                  display: "block", width: 14, height: 14, borderRadius: 999, margin: "0 auto 18px",
                  background: n.color,
                  boxShadow: `0 0 0 6px rgba(255,255,255,.85), 0 0 0 9px ${n.halo}`,
                  transform: i === active ? "scale(1.16)" : "scale(1)",
                  transition: "transform .3s var(--ease-premium), box-shadow .3s var(--ease-premium)",
                }}
              />
              <strong style={{ display: "block", font: "500 13px var(--font-primary)", letterSpacing: "-.01em", color: i === active ? "var(--change-violet)" : "#1B191F", transition: "color .3s" }}>{n.title}</strong>
              <span style={{ display: "block", marginTop: 5, font: "600 11px var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)" }}>{n.micro}</span>
            </button>
          ))}
        </div>

        <div style={{ margin: "30px 0 0", padding: 24, border: "1px solid var(--border-subtle)", background: "#fff" }}>
          <h3 style={{ margin: 0, font: "600 19px var(--font-primary)", letterSpacing: "-.02em", color: "#1B191F" }}>{node.title}</h3>
          <p style={{ margin: "9px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{node.copy}</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .ch-traceline { display: none; }
          .ch-tracenodes { grid-template-columns: repeat(3,1fr) !important; row-gap: 24px !important; }
        }
      `}</style>
    </aside>
  );
}
