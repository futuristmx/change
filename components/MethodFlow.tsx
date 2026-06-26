"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph, type GlyphName } from "@/components/ds";

const GLYPH_MAP: Record<string, GlyphName> = {
  Leer: "read",
  Interpretar: "risk",
  Decidir: "decision",
  Diseñar: "project",
  Sostener: "status",
};

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
    artefacto: "Matriz de decisión",
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
  const [auto, setAuto] = useState(true);
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

  // Auto-avance del arco (pausable, respeta reduced-motion)
  useEffect(() => {
    if (!auto || !inView) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % NODES.length), 2800);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  return (
    <div ref={ref} style={{ maxWidth: 1020, margin: "0 auto", background: "linear-gradient(155deg,rgba(255,255,255,.94),rgba(244,242,250,.62))", border: "1px solid var(--border-subtle)", boxShadow: "0 30px 90px rgba(31,17,72,.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: "20px 28px", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>El arco del método</span>
        <button type="button" onClick={() => setAuto((a) => !a)} aria-pressed={auto} style={{ all: "unset", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          <span {...(auto ? { "data-pulse": "" } : {})} aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: auto ? "var(--signal-cyan)" : "var(--soft-stone-gray)" }} />
          {auto ? "Avance automático" : "En pausa"}
        </button>
      </div>

      <div style={{ position: "relative", padding: "64px 36px 52px" }}>
        {/* línea base + relleno progresivo, con dibujo al entrar en vista.
            Top alineado al centro del círculo del nodo (52px de top del btn + 24px nodo radius = 76). */}
        <div className="mf-line" style={{ position: "absolute", left: `${INSET}%`, right: `${INSET}%`, top: 116, height: 2, background: "var(--line-structural)", opacity: 0.45, transformOrigin: "left center", transform: inView ? "scaleX(1)" : "scaleX(0)", transition: "transform var(--duration-line) var(--ease-premium)" }} />
        <div className="mf-line" style={{ position: "absolute", left: `${INSET}%`, top: 116, height: 2, width: `${fill}%`, background: "var(--line-gradient-relation)", transformOrigin: "left center", transform: inView ? "scaleX(1)" : "scaleX(0)", transition: "width var(--duration-standard) var(--ease-premium), transform var(--duration-line) var(--ease-premium)" }} />
        {inView && <div aria-hidden="true" className="mf-comet" style={{ position: "absolute", top: 113, width: 48, height: 8, borderRadius: 8, background: "radial-gradient(closest-side, rgba(138,108,255,.6), rgba(89,184,217,.18), transparent)", pointerEvents: "none" }} />}

        <div className="mf-nodes" style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${NODES.length},1fr)`, gap: 16 }}>
          {NODES.map((n, i) => {
            const on = i === active;
            const past = i < active;
            return (
              <button
                key={n.title}
                className="mf-node-btn"
                onClick={() => { setActive(i); setAuto(false); }}
                aria-pressed={on}
                aria-label={`${n.title}, paso ${i + 1} de ${NODES.length}`}
                style={{ border: 0, background: "transparent", padding: 0, textAlign: "center", cursor: "pointer", fontFamily: "var(--font-primary)", color: "inherit", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(8px)", transition: `opacity .5s ${120 + i * 90}ms, transform .5s ${120 + i * 90}ms var(--ease-premium)` }}
              >
                {/* Numeral monoespaciado, sobrio */}
                <span aria-hidden="true" style={{ display: "block", marginBottom: 14, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: on ? n.color : "var(--text-faint)", transition: "color var(--duration-standard) var(--ease-premium)" }}>
                  PASO {String(i + 1).padStart(2, "0")}
                </span>

                {/* Nodo principal — círculo 44px con Glyph dentro.
                    El halo del estado activo crece desde el centro,
                    sin tapar nada porque el glifo vive DENTRO del círculo. */}
                <span
                  aria-hidden="true"
                  className={on ? "mf-node-glow" : undefined}
                  style={{
                    ["--mf-halo" as string]: n.halo,
                    display: "inline-flex", justifyContent: "center", alignItems: "center",
                    width: 44, height: 44, borderRadius: "50%",
                    margin: "0 auto 24px",
                    background: on ? n.color : "var(--surface-card)",
                    border: `1.5px solid ${on || past ? n.color : "var(--border-subtle)"}`,
                    color: on ? "#fff" : n.color,
                    boxShadow: on
                      ? `0 0 0 6px var(--surface-card), 0 0 0 10px ${n.halo}, 0 12px 28px ${n.halo}`
                      : `0 0 0 4px var(--surface-card)`,
                    transform: on ? "scale(1.06)" : "scale(1)",
                    transition: "transform var(--duration-standard) var(--ease-premium), box-shadow var(--duration-standard) var(--ease-premium), background var(--duration-standard) var(--ease-premium), color var(--duration-standard) var(--ease-premium), border-color var(--duration-standard) var(--ease-premium)",
                  }}
                >
                  <Glyph name={GLYPH_MAP[n.title] ?? "nav"} size={22} />
                </span>

                <strong style={{ display: "block", font: "600 clamp(15px,1.4vw,17px) var(--font-primary)", letterSpacing: "-.015em", color: "var(--ink-graphite)", opacity: on ? 1 : 0.7, transition: "opacity var(--duration-standard) var(--ease-premium)" }}>{n.title}</strong>
                <span className="mf-micro" style={{ display: "block", marginTop: 6, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)" }}>{n.micro}</span>
              </button>
            );
          })}
        </div>

        {/* Slider de evolución — auto-avanza y se arrastra; gris → color */}
        <div className="mf-slider" style={{ margin: "34px 0 0", display: "flex", alignItems: "center", gap: 18 }}>
          <span aria-hidden="true" style={{ flexShrink: 0, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)" }}>Evolución</span>
          <input
            type="range" min={0} max={LAST} step={1} value={active}
            aria-label="Avance del arco del método"
            onChange={(e) => { setActive(Number(e.currentTarget.value)); setAuto(false); }}
            onPointerDown={() => setAuto(false)}
            className="mf-range"
            style={{ flex: 1, ["--mf-pct" as string]: `${(active / LAST) * 100}%`, ["--mf-thumb" as string]: node.color }}
          />
          <span style={{ flexShrink: 0, minWidth: 52, textAlign: "right", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".06em", color: "var(--ink-graphite)" }}>{active + 1} / {NODES.length}</span>
        </div>

        <div className="mf-chain" style={{ display: "none", marginTop: 24, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".06em", color: "var(--text-muted)", textAlign: "center" }}>
          Leer · Interpretar · Decidir · Diseñar · Sostener
        </div>

        {/* panel de detalle — superficie con gradiente del paso + glow y sheen al activar */}
        <div
          key={node.title}
          className="mf-panel"
          style={{
            ["--c" as string]: node.color,
            margin: "36px 0 0", position: "relative", overflow: "hidden",
            padding: "clamp(26px,3vw,34px)",
            border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${node.color}`,
            background: `linear-gradient(152deg, color-mix(in srgb, ${node.color} 11%, var(--surface-card)) 0%, var(--surface-card) 58%)`,
            boxShadow: `0 18px 50px color-mix(in srgb, ${node.color} 13%, transparent)`,
            transition: "border-color var(--duration-standard) var(--ease-premium)",
          }}
        >
          <span aria-hidden="true" className="mf-panel-glow" style={{ position: "absolute", top: -64, right: -44, width: 230, height: 230, borderRadius: "50%", background: `radial-gradient(circle, color-mix(in srgb, ${node.color} 24%, transparent), transparent 68%)`, pointerEvents: "none" }} />
          <span aria-hidden="true" className="mf-sheen" />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: node.color }} />{node.title}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", border: `1px solid ${node.color}`, background: `color-mix(in srgb, ${node.color} 8%, transparent)`, boxShadow: `0 4px 16px color-mix(in srgb, ${node.color} 18%, transparent)`, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: node.color }} />{node.artefacto}
              </span>
            </div>
            <h3 style={{ margin: "0 0 24px", font: "600 clamp(20px,1.9vw,26px)/1.28 var(--font-primary)", letterSpacing: "-.025em", color: "var(--ink-graphite)", textWrap: "balance" }}>{node.q}</h3>
            <div className="mf-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 28px" }}>
              {[
                ["Riesgo que reduce", node.riesgo],
                ["Decisión que habilita", node.decision],
              ].map(([label, text]) => (
                <div key={label}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 6, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>
                    <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: node.color }} />{label}
                  </span>
                  <span style={{ display: "block", font: "400 14.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "16px 18px", borderLeft: `2px solid color-mix(in srgb, ${node.color} 60%, transparent)`, background: `color-mix(in srgb, ${node.color} 6%, transparent)` }}>
              <span style={{ display: "block", marginBottom: 5, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>En Mission Control</span>
              <span style={{ display: "block", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{node.mc}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Slider de evolución: gris (neutro) → gradiente de acentos del DS */
        .mf-range { -webkit-appearance: none; appearance: none; height: 6px; background: transparent; cursor: pointer; }
        .mf-range::-webkit-slider-runnable-track { height: 6px; background:
          linear-gradient(90deg, transparent 0 var(--mf-pct,0%), var(--soft-stone-gray) var(--mf-pct,0%) 100%),
          linear-gradient(90deg, var(--signal-cyan) 0%, var(--soft-violet) 52%, var(--change-violet) 100%); }
        .mf-range::-moz-range-track { height: 6px; background:
          linear-gradient(90deg, transparent 0 var(--mf-pct,0%), var(--soft-stone-gray) var(--mf-pct,0%) 100%),
          linear-gradient(90deg, var(--signal-cyan) 0%, var(--soft-violet) 52%, var(--change-violet) 100%); }
        .mf-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--mf-thumb, var(--change-violet)); border: 2px solid var(--surface-card); box-shadow: 0 2px 10px rgba(31,17,72,.3); margin-top: -6px; transition: background .3s var(--ease-premium); }
        .mf-range::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--mf-thumb, var(--change-violet)); border: 2px solid var(--surface-card); box-shadow: 0 2px 10px rgba(31,17,72,.3); }
        .mf-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px color-mix(in srgb, var(--change-violet) 30%, transparent); }
        .mf-comet { left: ${INSET}%; animation: mf-comet 6s var(--ease-premium) infinite alternate; }
        @keyframes mf-comet { from { left: ${INSET}%; } to { left: ${100 - INSET}%; } }
        .mf-node-glow { animation: mf-nodeglow 3.4s var(--ease-premium) infinite; }
        @keyframes mf-nodeglow { 0%,100% { filter: drop-shadow(0 0 0 transparent); } 50% { filter: drop-shadow(0 0 7px var(--mf-halo, transparent)); } }
        /* design-wink: la card remonta al cambiar de paso → el destello barre una vez */
        .mf-panel { animation: mf-panel-in .5s var(--ease-premium) both; }
        @keyframes mf-panel-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .mf-sheen { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, transparent 32%, color-mix(in srgb, var(--c) 22%, rgba(255,255,255,.55)) 48%, transparent 64%); transform: translateX(-130%); }
        .mf-panel .mf-sheen { animation: mf-sheen 1.15s var(--ease-premium) .08s; }
        @keyframes mf-sheen { to { transform: translateX(130%); } }
        .mf-panel-glow { animation: mf-panel-glow 5s var(--ease-premium) infinite; }
        @keyframes mf-panel-glow { 0%,100% { opacity: .75; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .mf-panel, .mf-sheen, .mf-panel-glow { animation: none !important; }
          .mf-sheen { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mf-comet, .mf-node-glow { animation: none !important; }
          .mf-comet { display: none; }
        }
        @media (max-width: 768px) {
          .mf-line, .mf-comet { display: none; }
          .mf-nodes { grid-template-columns: repeat(3,1fr) !important; row-gap: 24px !important; }
          .mf-micro { display: none !important; }
          .mf-chain { display: block !important; }
          .mf-grid { grid-template-columns: 1fr !important; }
          .mf-node-btn { min-height: 44px; }
        }
      `}</style>
    </div>
  );
}
