"use client";

import { useEffect, useRef, useState } from "react";

interface Level {
  k: string;
  scale: string;
  color: string;
  width: string;
  p: string;
}

const LEVELS: Level[] = [
  { k: "Época", scale: "Lo macro", color: "var(--signal-cyan)", width: "100%", p: "La certeza dejó de llegar antes de las decisiones importantes. Se decide con información incompleta, señales contradictorias y ventanas que se cierran rápido." },
  { k: "Contexto", scale: "Lo competitivo", color: "var(--soft-violet)", width: "82%", p: "Las empresas crecen más rápido que sus sistemas para decidir. El negocio suma frentes y sube lo que está en juego, pero la forma de pensar el rumbo sigue siendo la de antes." },
  { k: "Organización", scale: "Lo interno", color: "var(--change-violet)", width: "64%", p: "La operación avanza, pero el aprendizaje no se sostiene. Se decide, se ejecuta y se sigue, sin retener por qué se decidió así. Cada coyuntura empieza de cero." },
];

const DECISION = {
  k: "La decisión que te toca",
  p: "La pregunta deja de ser «¿qué está pasando en el mundo?» y se vuelve «¿qué hacemos el lunes?». Ahí es donde Change trabaja: en el punto exacto donde una tensión amplia se vuelve una decisión concreta.",
};

/* ── Figura del descenso — minimalista y serena ──
   Anillos concéntricos = niveles de contención (macro contiene contexto contiene
   organización contiene la decisión). Un marcador DESCIENDE por el eje vertical
   de lo macro (borde) a lo propio (centro). El eje lleva un gradiente de evolución
   de color (cyan → violeta). Sin zoom: estable, sin glitches. */
const RING = [
  { r: 128, color: "var(--signal-cyan)" },
  { r: 84, color: "var(--soft-violet)" },
  { r: 46, color: "var(--change-violet)" },
];
const DESCEND = [0, 44, 82];

/* radar vivo — micro-nodos y conexiones que titilan/se trazan con timing variado */
const SPARKS: Array<[number, number]> = [
  [112, 118], [206, 112], [208, 206], [116, 202], [160, 96], [238, 160], [160, 224], [84, 160], [196, 70],
];
const SPARK_PATHS: Array<[number, number, number, number]> = [
  [112, 118, 160, 96], [206, 112, 238, 160], [208, 206, 160, 224], [116, 202, 84, 160],
];

function DescentFigure({ active }: { active: number }) {
  const descend = DESCEND[active] ?? 0;
  const dotColor = RING[active]?.color ?? "var(--signal-cyan)";

  return (
    <div className="sd-figure" style={{ width: "100%", maxWidth: 360, margin: "0 auto", aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 320 320" width="100%" height="100%" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="sd-axis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--signal-cyan)" />
            <stop offset="55%" stopColor="var(--soft-violet)" />
            <stop offset="100%" stopColor="var(--change-violet)" />
          </linearGradient>
          <radialGradient id="sd-core-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--change-violet-300)" />
            <stop offset="100%" stopColor="var(--change-violet)" />
          </radialGradient>
        </defs>

        {/* eje del descenso — gradiente de evolución macro → propio */}
        <line x1="160" y1="32" x2="160" y2="160" stroke="url(#sd-axis)" strokeWidth="1.5" strokeOpacity="0.45" />

        {/* anillos de contención */}
        {RING.map((ring, i) => {
          const on = i === active;
          return (
            <circle key={i} cx="160" cy="160" r={ring.r} fill="none"
              stroke={on ? ring.color : "var(--soft-stone-gray)"}
              strokeWidth={on ? 1.6 : 1}
              style={{ opacity: on ? 1 : 0.26, transition: "opacity .55s var(--ease-premium), stroke .55s var(--ease-premium)" }} />
          );
        })}

        {/* radar vivo — conexiones que se trazan y micro-nodos que titilan */}
        <g>
          {SPARK_PATHS.map(([x1, y1, x2, y2], i) => (
            <line key={`sp-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 ? "var(--soft-violet)" : "var(--signal-cyan)"} strokeWidth="1" pathLength={1} className="sd-sparkline" style={{ animationDelay: `${(i * 1.6).toFixed(1)}s`, animationDuration: `${5 + i * 1.3}s` }} />
          ))}
          {SPARKS.map(([x, y], i) => (
            <circle key={`sk-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.7} fill={i % 2 ? "var(--signal-cyan)" : "var(--soft-violet)"} className="sd-spark" style={{ animationDelay: `${(i * 0.83).toFixed(1)}s`, animationDuration: `${3.2 + (i % 4) * 1.1}s` }} />
          ))}
        </g>

        {/* núcleo — la decisión; se ilumina al llegar a lo interno */}
        <circle cx="160" cy="160" r="7" fill="url(#sd-core-g)"
          style={{ opacity: active === 2 ? 1 : 0.32, transition: "opacity .55s var(--ease-premium)" }} />

        {/* marcador de foco que desciende por el eje */}
        <g style={{ transform: `translateY(${descend}px)`, transition: "transform .6s var(--ease-premium)" }}>
          <circle className="sd-focus" cx="160" cy="32" r="13" fill="none" stroke={dotColor} strokeWidth="1" opacity="0.5" style={{ transition: "stroke .55s var(--ease-premium)" }} />
          <circle cx="160" cy="32" r="6.5" fill={dotColor} style={{ transition: "fill .55s var(--ease-premium)" }} />
        </g>
      </svg>

      <style>{`
        .sd-focus { animation: sd-focuspulse 3.8s var(--ease-premium) infinite; }
        @keyframes sd-focuspulse { 0%,100% { opacity: .5; } 50% { opacity: .16; } }
        .sd-spark { opacity: 0.2; animation-name: sd-spark; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes sd-spark { 0%,100% { opacity: 0.1; } 50% { opacity: 0.72; } }
        .sd-sparkline { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; animation-name: sd-sparkline; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes sd-sparkline { 0% { stroke-dashoffset: 1; opacity: 0; } 38% { opacity: 0.32; } 68% { stroke-dashoffset: 0; opacity: 0.2; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .sd-focus, .sd-spark, .sd-sparkline { animation: none !important; } .sd-sparkline { display: none; } .sd-spark { opacity: 0.3; } }
      `}</style>
    </div>
  );
}

export default function SystemicDescent() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(el); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="sd-wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,420px)", gap: "clamp(32px,5vw,72px)", alignItems: "center", maxWidth: 1120, margin: "0 auto" }}>
      <div className="sd-stack" style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* rail vertical animado */}
        <div aria-hidden="true" className="sd-rail" style={{ position: "absolute", left: 21, top: 26, bottom: 92, width: 2, background: "var(--line-structural)", opacity: 0.4 }} />
        <div aria-hidden="true" className="sd-rail" style={{ position: "absolute", left: 21, top: 26, height: inView ? "calc(100% - 118px)" : 0, width: 2, background: "linear-gradient(180deg,var(--signal-cyan),var(--change-violet))", transition: "height var(--duration-line) var(--ease-premium)" }} />

        {LEVELS.map((lv, i) => {
          const on = i === active;
          return (
            <button
              key={lv.k}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={on}
              className="sd-level"
              style={{
                position: "relative", width: lv.width, minWidth: 280, textAlign: "left", border: "1px solid var(--border-subtle)",
                borderLeft: `3px solid ${on ? lv.color : "var(--border-subtle)"}`,
                background: on ? "#fff" : "rgba(255,255,255,.7)", cursor: "pointer", padding: "22px 26px 22px 52px",
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity .5s ${i * 130}ms, transform .5s ${i * 130}ms var(--ease-premium), border-color .3s, background .3s, width .4s var(--ease-premium), box-shadow .2s var(--ease-premium)`,
                fontFamily: "var(--font-primary)",
              }}
            >
              <span aria-hidden="true" style={{ position: "absolute", left: 12, top: 24, width: 18, height: 18, borderRadius: "50%", background: lv.color, boxShadow: on ? `0 0 0 5px #fff, 0 0 0 9px ${lv.color}22` : "0 0 0 5px #fff", transform: on ? "scale(1.1)" : "scale(1)", transition: "transform .3s" }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, font: "600 clamp(20px,2vw,28px) var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{lv.k}</h3>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{lv.scale}</span>
              </div>
              <p style={{ margin: "10px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: on ? "var(--text-muted)" : "var(--text-faint)", transition: "color .3s var(--ease-premium)" }}>{lv.p}</p>
            </button>
          );
        })}

        {/* nodo terminal — la decisión concreta */}
        <div className="sd-decision" style={{ position: "relative", width: "62%", minWidth: 300, marginTop: 12, border: "1px solid var(--change-violet)", borderLeft: "3px solid var(--change-violet)", background: "color-mix(in srgb, var(--change-violet) 5%, #fff)", padding: "24px 28px 26px 52px", opacity: inView ? 1 : 0, transition: "opacity .6s .5s, width .4s var(--ease-premium)" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: 11, top: 26, width: 20, height: 20, borderRadius: "50%", background: "var(--change-violet)", boxShadow: "0 0 0 5px #fff, 0 6px 18px rgba(109,59,255,.3)" }} />
          <span aria-hidden="true" style={{ position: "absolute", left: 19, top: -14, fontSize: 18, color: "var(--change-violet)" }}>↓</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}><span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--change-violet)" }} />{DECISION.k}</span>
          <p style={{ margin: "10px 0 0", font: "400 15px/1.6 var(--font-primary)", color: "var(--deep-warm-gray)" }}>{DECISION.p}</p>
        </div>
      </div>

      {/* figura — sticky en su columna para acompañar el scroll */}
      <div className="sd-figcol" style={{ position: "sticky", top: 100, alignSelf: "center" }}>
        <DescentFigure active={active} />
      </div>

      <style>{`
        .sd-level:hover { box-shadow: 0 8px 24px rgba(46,46,51,.09); border-color: color-mix(in srgb, var(--ink-graphite) 16%, transparent); }
        @media (max-width: 920px) {
          .sd-wrap { grid-template-columns: 1fr !important; gap: 36px !important; }
          .sd-figcol { position: static !important; order: -1; }
          .sd-figure { max-width: 260px !important; }
          .sd-level, .sd-decision { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
