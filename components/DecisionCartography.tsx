"use client";

import { useState } from "react";

interface Node {
  title: string;
  micro: string;
  color: string;
  halo: string;
  q: string;
  riesgo: string;
  artefacto: string;
  decision: string;
  mc: string;
}

/* Arco del método — Capacidad de Futuro (5 movimientos) */
const NODES: Node[] = [
  {
    title: "Leer", micro: "qué cambia", color: "var(--signal-cyan)", halo: "rgba(89,184,217,.22)",
    q: "¿Qué está cambiando que todavía no aparece en los números?",
    riesgo: "Enterarte tarde, cuando el cambio ya es urgencia.",
    artefacto: "Radar de señales",
    decision: "Dónde poner atención antes de que sea urgente.",
    mc: "Las señales quedan vivas y vigiladas, no en una presentación que se archiva.",
  },
  {
    title: "Interpretar", micro: "qué significa", color: "var(--soft-violet)", halo: "rgba(138,108,255,.16)",
    q: "¿Qué significan estas señales para nosotros, no para el mercado en general?",
    riesgo: "Confundir movimiento del entorno con ruido, o reaccionar a la señal equivocada.",
    artefacto: "Mapa de tensiones",
    decision: "Qué tensión enfrentar primero.",
    mc: "Las tensiones se vuelven el marco compartido con el que el equipo lee el contexto.",
  },
  {
    title: "Decidir", micro: "qué importa", color: "var(--change-violet)", halo: "rgba(109,59,255,.18)",
    q: "¿Qué importa de verdad, qué se sacrifica y por qué?",
    riesgo: "Decidir por inercia o por la voz más fuerte de la junta.",
    artefacto: "Matriz de trade-offs",
    decision: "La apuesta, con su costo explícito.",
    mc: "La decisión queda registrada con su criterio, no solo con su resultado.",
  },
  {
    title: "Diseñar", micro: "qué forma toma", color: "var(--change-violet)", halo: "rgba(109,59,255,.18)",
    q: "¿Qué forma concreta toma esto para que el equipo lo ejecute?",
    riesgo: "Que la buena decisión se quede en intención.",
    artefacto: "Roadmap vivo",
    decision: "Qué se hace primero, quién y con qué secuencia.",
    mc: "El roadmap se mantiene vivo, no congelado en un documento.",
  },
  {
    title: "Sostener", micro: "qué se aprende", color: "var(--ink-graphite)", halo: "rgba(46,46,51,.12)",
    q: "¿Cómo seguimos aprendiendo cuando cambie el contexto otra vez?",
    riesgo: "Reinventar el rumbo en cada coyuntura y perder lo aprendido.",
    artefacto: "Mission Control",
    decision: "Ajustar con memoria, no desde cero.",
    mc: "Aquí cierra el ciclo: la próxima coyuntura no empieza de cero, empieza con memoria.",
  },
];

const LAST = NODES.length - 1;
const LINE_INSET = 100 / (2 * NODES.length); // % — alinea con el centro del primer/último nodo

export default function DecisionCartography() {
  const [active, setActive] = useState(0);
  const node = NODES[active];
  const fillWidth = (active / LAST) * (100 - 2 * LINE_INSET);

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
        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>El arco del método</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          <span data-pulse style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-cyan)" }} />
          Interactivo
        </span>
      </div>

      <div style={{ position: "relative", padding: "44px 32px 36px" }}>
        <div className="ch-traceline" style={{ position: "absolute", left: `${LINE_INSET}%`, right: `${LINE_INSET}%`, top: 52, height: 2, background: "var(--line-structural)", opacity: 0.5 }} />
        <div className="ch-traceline" style={{ position: "absolute", left: `${LINE_INSET}%`, top: 52, height: 2, width: `${fillWidth}%`, background: "linear-gradient(90deg,var(--signal-cyan),var(--change-violet))", transition: "width .4s var(--ease-premium)" }} />

        <div className="ch-tracenodes" style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${NODES.length},1fr)`, gap: 8 }}>
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
                <strong style={{ display: "block", font: "500 14px var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)", opacity: on ? 1 : 0.6, transition: "opacity .3s" }}>{n.title}</strong>
                <span className="ch-node-micro" style={{ display: "block", marginTop: 5, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)" }}>{n.micro}</span>
              </button>
            );
          })}
        </div>

        <div className="ch-chain-linear" style={{ display: "none", marginTop: 24, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".06em", color: "var(--text-muted)", textAlign: "center" }}>
          Leer · Interpretar · Decidir · Diseñar · Sostener
        </div>

        <div style={{ margin: "34px 0 0", padding: "28px 30px", border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${node.color}`, background: "#fff", transition: "border-color .3s var(--ease-premium)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: node.color }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>{node.title}</span>
          </div>
          <h3 style={{ margin: "0 0 22px", font: "600 clamp(19px,1.7vw,23px)/1.3 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)", textWrap: "balance" }}>{node.q}</h3>
          <div className="ch-node-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 28px" }}>
            {[
              ["Riesgo que reduce", node.riesgo],
              ["Decisión que habilita", node.decision],
              ["Artefacto", node.artefacto],
              ["En Mission Control", node.mc],
            ].map(([label, text]) => (
              <div key={label}>
                <span style={{ display: "block", marginBottom: 5, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{label}</span>
                <span style={{ display: "block", font: "400 14.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ch-traceline { display: none; }
          .ch-tracenodes { grid-template-columns: repeat(3,1fr) !important; row-gap: 26px !important; }
          .ch-node-micro { display: none !important; }
          .ch-chain-linear { display: block !important; }
          .ch-node-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
