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
    <div ref={ref} style={{ maxWidth: 940, margin: "0 auto" }}>
      <div className="sd-stack" style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* rail vertical animado */}
        <div aria-hidden="true" className="sd-rail" style={{ position: "absolute", left: 21, top: 26, bottom: 92, width: 2, background: "var(--line-structural)", opacity: 0.4 }} />
        <div aria-hidden="true" className="sd-rail" style={{ position: "absolute", left: 21, top: 26, height: inView ? "calc(100% - 118px)" : 0, width: 2, background: "linear-gradient(180deg,var(--signal-cyan),var(--change-violet))", transition: "height 1s var(--ease-premium)" }} />

        {LEVELS.map((lv, i) => {
          const on = i === active;
          return (
            <button
              key={lv.k}
              onClick={() => setActive(i)}
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
        <div className="sd-decision" style={{ position: "relative", width: "48%", minWidth: 300, marginTop: 12, border: "1px solid var(--change-violet)", borderLeft: "3px solid var(--change-violet)", background: "color-mix(in srgb, var(--change-violet) 5%, #fff)", padding: "24px 28px 26px 52px", opacity: inView ? 1 : 0, transition: "opacity .6s .5s, width .4s var(--ease-premium)" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: 11, top: 26, width: 20, height: 20, borderRadius: "50%", background: "var(--change-violet)", boxShadow: "0 0 0 5px #fff, 0 6px 18px rgba(109,59,255,.3)" }} />
          <span aria-hidden="true" style={{ position: "absolute", left: 19, top: -14, fontSize: 18, color: "var(--change-violet)" }}>↓</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}><span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--change-violet)" }} />{DECISION.k}</span>
          <p style={{ margin: "10px 0 0", font: "400 15px/1.6 var(--font-primary)", color: "var(--deep-warm-gray)" }}>{DECISION.p}</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .sd-level, .sd-decision { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
