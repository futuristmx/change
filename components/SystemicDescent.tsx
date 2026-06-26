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

/* ── Figura del descenso — se deconstruye/enfoca según la fase activa ──
   Época: campo orbital amplio (cyan). Contexto: se contrae + emergen las
   fuerzas en tensión (rosa/naranja). Organización: solo el núcleo (violeta). */
const C = 180;
const polar = (r: number, deg: number): [number, number] => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};

const RINGS = [
  { r: 146, color: "var(--signal-cyan)", dash: "2 6", nodes: [18, 92, 164, 236, 308], op: [1, 0.25, 0.08] },
  { r: 100, color: "var(--soft-violet)", dash: "none", nodes: [50, 140, 230, 320], op: [0.45, 1, 0.22] },
  { r: 56, color: "var(--change-violet)", dash: "none", nodes: [0, 120, 240], op: [0.4, 0.65, 1] },
];

const TENSION = [
  { r: 146, deg: 330, color: "var(--opportunity-orange)" },
  { r: 100, deg: 196, color: "var(--human-pink)" },
];
const TENSION_OP = [0.18, 1, 0.42];

function DescentFigure({ active }: { active: number }) {
  const scale = [1, 1.08, 1.18][active] ?? 1;
  const coreR = [15, 21, 29][active] ?? 15;
  const radialOp = [0.22, 0.4, 0.7][active] ?? 0.4;
  const inner = RINGS[2];

  return (
    <div className="sd-figure" style={{ width: "100%", maxWidth: 420, margin: "0 auto", aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 360 360" width="100%" height="100%" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <radialGradient id="sd-core" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="var(--change-violet-300)" />
            <stop offset="62%" stopColor="var(--change-violet)" />
            <stop offset="100%" stopColor="var(--change-violet-700)" />
          </radialGradient>
          <linearGradient id="sd-radial-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--change-violet)" />
            <stop offset="100%" stopColor="var(--signal-cyan)" />
          </linearGradient>
        </defs>

        {/* halo de fondo que respira */}
        <circle className="sd-halo" cx="180" cy="180" r="150" fill="url(#sd-core)" opacity="0.06" />

        {/* sistema que enfoca (zoom) según la fase */}
        <g style={{ transformBox: "view-box", transformOrigin: "180px 180px", transform: `scale(${scale})`, transition: "transform .7s var(--ease-premium)" }}>

          {/* líneas radiales núcleo → nodos internos */}
          {inner.nodes.map((deg, i) => {
            const [x, y] = polar(inner.r, deg);
            return (
              <line key={`rl-${i}`} x1="180" y1="180" x2={x} y2={y} stroke="url(#sd-radial-line)" strokeWidth="1"
                style={{ opacity: radialOp, transition: "opacity .6s var(--ease-premium)" }} />
            );
          })}

          {/* anillos + sus nodos, con opacidad por fase */}
          {RINGS.map((ring, ri) => (
            <g key={ri} style={{ opacity: ring.op[active] ?? 1, transition: "opacity .6s var(--ease-premium)" }}>
              <circle cx="180" cy="180" r={ring.r} fill="none" stroke={ring.color} strokeWidth="1" strokeOpacity="0.45" strokeDasharray={ring.dash} />
              {ring.nodes.map((deg, ni) => {
                const [x, y] = polar(ring.r, deg);
                return <circle key={ni} cx={x} cy={y} r={ri === 2 ? 5 : 4} fill={ring.color} />;
              })}
            </g>
          ))}

          {/* fuerzas en tensión — acentos terciarios, emergen en "Contexto" */}
          {TENSION.map((t, i) => {
            const [x, y] = polar(t.r, t.deg);
            return (
              <g key={`t-${i}`} style={{ opacity: TENSION_OP[active] ?? 0.3, transition: "opacity .6s var(--ease-premium)" }}>
                <circle className="sd-tnode" cx={x} cy={y} r="9" fill="none" stroke={t.color} strokeWidth="1" opacity="0.5" style={{ animationDelay: `${i * 0.7}s` }} />
                <circle cx={x} cy={y} r="5" fill={t.color} />
              </g>
            );
          })}

          {/* núcleo — la decisión concreta */}
          <circle className="sd-corehalo" cx="180" cy="180" r={coreR + 8} fill="none" stroke="var(--change-violet)" strokeWidth="1" opacity="0.4" style={{ transition: "r .6s var(--ease-premium)" }} />
          <circle cx="180" cy="180" r={coreR} fill="url(#sd-core)" style={{ transition: "r .6s var(--ease-premium)" }} />
        </g>
      </svg>

      <style>{`
        .sd-halo { animation: sd-breathe 7s var(--ease-premium) infinite; transform-box: view-box; transform-origin: 180px 180px; }
        @keyframes sd-breathe { 0%,100% { transform: scale(1); opacity: .06; } 50% { transform: scale(1.04); opacity: .1; } }
        .sd-corehalo { animation: sd-pulse 3.4s var(--ease-premium) infinite; transform-box: view-box; transform-origin: 180px 180px; }
        @keyframes sd-pulse { 0%,100% { opacity: .4; } 50% { opacity: .12; } }
        .sd-tnode { animation: sd-tpulse 2.8s var(--ease-premium) infinite; transform-box: view-box; transform-origin: center; }
        @keyframes sd-tpulse { 0%,100% { opacity: .5; } 50% { opacity: .15; } }
        @media (prefers-reduced-motion: reduce) {
          .sd-halo, .sd-corehalo, .sd-tnode { animation: none !important; }
        }
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
                transition: `opacity .5s ${i * 130}ms, transform .5s ${i * 130}ms var(--ease-premium), border-color .3s, background .3s, width .4s var(--ease-premium)`,
                fontFamily: "var(--font-primary)",
              }}
            >
              <span aria-hidden="true" style={{ position: "absolute", left: 12, top: 24, width: 18, height: 18, borderRadius: "50%", background: lv.color, boxShadow: on ? `0 0 0 5px #fff, 0 0 0 9px ${lv.color}22` : "0 0 0 5px #fff", transform: on ? "scale(1.1)" : "scale(1)", transition: "transform .3s" }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, font: "600 clamp(20px,2vw,28px) var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{lv.k}</h3>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{lv.scale}</span>
              </div>
              <p style={{ margin: "10px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)", maxHeight: on ? 200 : 0, opacity: on ? 1 : 0, overflow: "hidden", transition: "max-height .4s var(--ease-premium), opacity .35s, margin .3s" }}>{lv.p}</p>
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
        @media (max-width: 920px) {
          .sd-wrap { grid-template-columns: 1fr !important; gap: 36px !important; }
          .sd-figcol { position: static !important; order: -1; }
          .sd-figure { max-width: 280px !important; }
          .sd-level, .sd-decision { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
