"use client";

import { useEffect, useRef, useState } from "react";

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
const INSET = 100 / (2 * NODES.length);

export default function MethodFlow() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const node = NODES[active];
  const fill = (active / LAST) * (100 - 2 * INSET);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(el); } }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ maxWidth: 1020, margin: "0 auto", background: "linear-gradient(155deg,rgba(255,255,255,.94),rgba(244,242,250,.62))", border: "1px solid var(--border-subtle)", boxShadow: "0 30px 90px rgba(31,17,72,.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: "20px 28px", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>El arco del método</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          <span data-pulse style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-cyan)" }} />Interactivo
        </span>
      </div>

      <div style={{ position: "relative", padding: "52px 36px 40px" }}>
        {/* línea base + relleno progresivo, con dibujo al entrar en vista */}
        <div className="mf-line" style={{ position: "absolute", left: `${INSET}%`, right: `${INSET}%`, top: 78, height: 2, background: "var(--line-structural)", opacity: 0.45, transformOrigin: "left center", transform: inView ? "scaleX(1)" : "scaleX(0)", transition: "transform var(--duration-line) var(--ease-premium)" }} />
        <div className="mf-line" style={{ position: "absolute", left: `${INSET}%`, top: 78, height: 2, width: `${fill}%`, background: "var(--line-gradient-relation)", transformOrigin: "left center", transform: inView ? "scaleX(1)" : "scaleX(0)", transition: "width var(--duration-standard) var(--ease-premium), transform var(--duration-line) var(--ease-premium)" }} />

        <div className="mf-nodes" style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${NODES.length},1fr)`, gap: 8 }}>
          {NODES.map((n, i) => {
            const on = i === active;
            return (
              <button
                key={n.title}
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={`${n.title}, paso ${i + 1} de ${NODES.length}`}
                style={{ border: 0, background: "transparent", padding: 0, textAlign: "center", cursor: "pointer", fontFamily: "var(--font-primary)", color: "inherit", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(8px)", transition: `opacity .5s ${120 + i * 90}ms, transform .5s ${120 + i * 90}ms var(--ease-premium)` }}
              >
                <span aria-hidden="true" style={{ display: "block", marginBottom: 14, font: "300 clamp(26px,2.8vw,38px)/1 var(--font-secondary)", color: on ? "var(--change-violet)" : "var(--strategic-gray)", transition: "color var(--duration-standard) var(--ease-premium)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    display: "block", width: 16, height: 16, borderRadius: 999, margin: "0 auto 18px",
                    background: n.color,
                    boxShadow: on
                      ? `0 0 0 6px rgba(255,255,255,.92), 0 0 0 12px ${n.halo}, 0 8px 22px ${n.halo}`
                      : `0 0 0 6px rgba(255,255,255,.85), 0 0 0 9px ${n.halo}`,
                    transform: on ? "scale(1.25)" : "scale(1)",
                    transition: "transform var(--duration-standard) var(--ease-premium), box-shadow var(--duration-standard) var(--ease-premium)",
                  }}
                />
                <strong style={{ display: "block", font: "600 clamp(14px,1.3vw,16px) var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)", opacity: on ? 1 : 0.62, transition: "opacity var(--duration-standard) var(--ease-premium)" }}>{n.title}</strong>
                <span className="mf-micro" style={{ display: "block", marginTop: 5, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)" }}>{n.micro}</span>
              </button>
            );
          })}
        </div>

        <div className="mf-chain" style={{ display: "none", marginTop: 24, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".06em", color: "var(--text-muted)", textAlign: "center" }}>
          Leer · Interpretar · Decidir · Diseñar · Sostener
        </div>

        {/* panel de detalle */}
        <div style={{ margin: "36px 0 0", padding: "30px 32px", border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${node.color}`, background: "var(--surface-card)", transition: "border-color var(--duration-standard) var(--ease-premium)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
              <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: node.color }} />{node.title}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", border: `1px solid ${node.color}`, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: node.color }} />{node.artefacto}
            </span>
          </div>
          <h3 key={node.title} style={{ margin: "0 0 22px", font: "600 clamp(20px,1.9vw,26px)/1.28 var(--font-primary)", letterSpacing: "-.025em", color: "var(--ink-graphite)", textWrap: "balance" }}>{node.q}</h3>
          <div className="mf-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 28px" }}>
            {[
              ["Riesgo que reduce", node.riesgo],
              ["Decisión que habilita", node.decision],
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
          .mf-line { display: none; }
          .mf-nodes { grid-template-columns: repeat(3,1fr) !important; row-gap: 24px !important; }
          .mf-micro { display: none !important; }
          .mf-chain { display: block !important; }
          .mf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
