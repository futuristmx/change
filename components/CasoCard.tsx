"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { type Lang } from "@/lib/i18n";

interface Caso {
  k: string;
  c: string;
  h: string;
  s: string;
  flow: string[];
  img?: string;
  imgAlt?: string;
}

const STEPS_ES = ["Leer", "Interpretar", "Decidir", "Diseñar", "Sostener", "Capacidad instalada"];
const STEPS_EN = ["Read", "Interpret", "Decide", "Design", "Sustain", "Installed capacity"];
const CC_UI = {
  es: { tension: "Tensión", open: "Ver el recorrido completo ↓", close: "Cerrar recorrido ↑" },
  en: { tension: "Tension", open: "See the full journey ↓", close: "Close journey ↑" },
};

/* Evolution Ramp (DS 2.4) — color de cada paso del método según madurez */
const STEP_EVO = [
  "var(--evo-analysis)",   /* Leer — en radar */
  "var(--evo-analysis)",   /* Interpretar — en análisis */
  "var(--evo-focus)",      /* Decidir — en foco */
  "var(--evo-focus)",      /* Diseñar — ejecutando */
  "var(--evo-validated)",  /* Sostener — validado */
  "var(--evo-validated)",  /* Capacidad instalada — cerrado */
];

export default function CasoCard({ caso, idx, bg, lang = "es" }: { caso: Caso; idx: number; bg: string; lang?: Lang }) {
  const [open, setOpen] = useState(false);
  const label = String(idx + 1).padStart(2, "0");
  const STEPS = lang === "en" ? STEPS_EN : STEPS_ES;
  const ui = CC_UI[lang];

  return (
    <section style={{ borderTop: "1px solid var(--border-subtle)", background: bg }}>
      <div style={{ width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))", margin: "0 auto", padding: "clamp(80px,9vw,140px) 0" }}>

        {/* Cabecera siempre visible */}
        <div style={{ maxWidth: 820 }}>
          <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 16, font: "700 11px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: caso.c }} />
            {ui.tension} {label} · {caso.k}
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,3.6vw,50px)/1.02 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
            {caso.h}
          </Reveal>
          <Reveal delay={120} as="p" style={{ margin: "20px 0 0", font: "400 clamp(16px,1.4vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
            {caso.s}
          </Reveal>
        </div>

        {/* Botón toggle */}
        <Reveal delay={160}>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            style={{
              all: "unset", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28,
              font: "700 11px var(--font-secondary)", letterSpacing: ".12em", textTransform: "uppercase",
              color: caso.c, outline: "none", padding: "2px 0",
              borderBottom: `1px solid ${caso.c}`,
            }}
            onFocus={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px var(--change-violet)"; }}
            onBlur={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            {open ? ui.close : ui.open}
          </button>
        </Reveal>

        {/* Recorrido — line-and-node con Evolution Ramp DS 2.4 */}
        <div
          aria-hidden={!open}
          style={{
            overflow: "hidden",
            maxHeight: open ? 1600 : 0,
            opacity: open ? 1 : 0,
            transition: "max-height .45s ease, opacity .3s ease",
            marginTop: open ? 40 : 0,
          }}
        >
          {/* Imagen de evidencia (opcional) */}
          {caso.img && (
            <div style={{ position: "relative", width: "100%", height: "clamp(180px,18vw,280px)", overflow: "hidden", marginBottom: 32 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={caso.img}
                alt={caso.imgAlt ?? caso.k}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  filter: "grayscale(15%) contrast(1.05) brightness(.96)",
                  display: "block",
                }}
              />
              {/* Gradient overlay — right edge fades to background */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 55%, rgba(255,255,255,.65) 100%)", pointerEvents: "none" }} />
            </div>
          )}

          {/* Rail de conexión horizontal (desktop) + cards */}
          <div style={{ position: "relative" }}>
            {/* Rail de fondo */}
            <div className="caso-rail" style={{ position: "absolute", top: 22, left: "calc(16.67% / 2)", right: "calc(16.67% / 2)", height: 2, background: "var(--chart-track)", zIndex: 0 }} />
            {/* Rail relleno — Evolution Ramp */}
            <div className="caso-rail" style={{ position: "absolute", top: 22, left: "calc(16.67% / 2)", width: "83%", height: 2, background: "var(--gradient-evolution-line)", zIndex: 1 }} />

            {/* Grid de steps con nodos superiores */}
            <div className="cs-flow" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0 10px", position: "relative", zIndex: 2 }}>
              {caso.flow.map((text, i) => {
                const isLast = i === STEPS.length - 1;
                const evoColor = STEP_EVO[i] ?? caso.c;
                return (
                  <article key={i} style={{ display: "flex", flexDirection: "column" }}>
                    {/* Nodo del rail */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                      <span
                        aria-hidden="true"
                        style={{
                          width: isLast ? 16 : 12,
                          height: isLast ? 16 : 12,
                          borderRadius: "50%",
                          background: evoColor,
                          border: isLast ? `2px solid ${caso.c}` : "2px solid var(--pure-white)",
                          boxShadow: isLast ? `0 0 12px color-mix(in srgb, ${caso.c} 40%, transparent)` : "none",
                          flexShrink: 0,
                        }}
                      />
                    </div>
                    {/* Card */}
                    <div
                      className="ch-card caso-step"
                      style={{
                        background: isLast ? `color-mix(in srgb, ${caso.c} 5%, white)` : "rgba(255,255,255,.85)",
                        border: `1px solid ${isLast ? caso.c : "var(--border-subtle)"}`,
                        borderTop: `2px solid ${evoColor}`,
                        padding: "20px 18px 22px",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      {/* Meta eyebrow */}
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "700 10px var(--font-secondary)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)", marginBottom: 10 }}>
                        <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: evoColor }} />
                        {STEPS[i]}
                      </span>
                      <p style={{ margin: 0, font: "400 13px/1.55 var(--font-primary)", color: isLast ? "var(--ink-graphite)" : "var(--text-muted)" }}>
                        {text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Leyenda de Evolution Ramp */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginTop: 24, padding: "12px 0", borderTop: "1px solid var(--border-subtle)" }}>
            <span style={{ font: "700 9px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)" }}>Estado del recorrido</span>
            {[
              { l: "En análisis", c: "var(--evo-analysis)" },
              { l: "En foco", c: "var(--evo-focus)" },
              { l: "Validado", c: "var(--evo-validated)" },
            ].map((r) => (
              <span key={r.l} style={{ display: "inline-flex", alignItems: "center", gap: 5, font: "700 9px var(--font-secondary)", letterSpacing: ".1em", textTransform: "uppercase", color: r.c }}>
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: r.c }} />
                {r.l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .cs-flow { grid-template-columns: 1fr 1fr 1fr !important; }
          .caso-rail { display: none !important; }
        }
        @media (max-width: 600px) {
          .cs-flow { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .cs-flow { grid-template-columns: 1fr !important; }
        }
        .caso-step { transition: box-shadow var(--duration-standard) var(--ease-premium); }
        .caso-step:hover { box-shadow: 0 4px 16px rgba(46,46,51,.08); }
        @media (prefers-reduced-motion: reduce) {
          .caso-step { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
