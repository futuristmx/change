"use client";

import { useState } from "react";

export interface Horizon {
  k: string;
  h: string;
  p: string;
  c: string;
  /** numeral del watermark (si no, usa el índice) */
  num?: string;
  /** ruta de la foto (opcional); si falta, placeholder con numeral + gradiente light */
  photo?: string;
  /** object-position de la foto, ej "center 35%" */
  focus?: string;
  /** overlay de color sobre la foto, ej "var(--change-olive-overlay)" */
  photoTint?: string;
}

export default function HorizonPanels({ horizontes, minH = "clamp(420px,42vw,540px)" }: { horizontes: Horizon[]; minH?: string }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div
        className="hp-grid"
        style={{
          display: "grid",
          gridTemplateColumns: horizontes.map((_, i) => (i === active ? "1.6fr" : "0.78fr")).join(" "),
          gap: "clamp(14px,1.6vw,20px)",
          transition: "grid-template-columns .55s var(--ease-premium)",
        }}
      >
        {horizontes.map((m, i) => {
          const on = i === active;
          const numeral = String(i + 1).padStart(2, "0");
          const dark = !!m.photo;
          return (
            <article
              key={m.k}
              className="hp-panel"
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={m.k}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}
              style={{
                position: "relative", overflow: "hidden", cursor: "pointer", outline: "none",
                minHeight: minH,
                border: "1px solid var(--border-subtle)", borderTop: `3px solid ${m.c}`,
                background: "var(--surface-card)",
              }}
            >
              {/* base — dark con foto, light sin foto */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0,
                background: dark
                  ? `linear-gradient(155deg, color-mix(in srgb, var(--surface-dark) 92%, ${m.c}) 0%, var(--surface-dark-secondary) 100%)`
                  : `linear-gradient(155deg, color-mix(in srgb, ${m.c} 16%, var(--pure-white)) 0%, var(--surface-soft) 56%, var(--pure-white) 100%)`,
              }} />

              {/* foto fundida (luminosity sobre base dark = atmósfera etérea) */}
              {dark && (
                <div aria-hidden="true" style={{
                  position: "absolute", inset: 0,
                  background: `url(${m.photo}) ${m.focus ?? "center 30%"} / cover no-repeat`,
                  opacity: 0.9,
                  mixBlendMode: "luminosity",
                }} />
              )}

              {/* tint olive DS 2.6 — unifica la sección */}
              {dark && m.photoTint && (
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: m.photoTint, pointerEvents: "none" }} />
              )}

              {/* numeral watermark — solo sin foto */}
              {!dark && (
                <span aria-hidden="true" style={{
                  position: "absolute", top: "clamp(14px,2.6vw,30px)", right: "clamp(14px,2.4vw,26px)",
                  font: "300 clamp(76px,11vw,150px)/1 var(--font-secondary)",
                  color: `color-mix(in srgb, ${m.c} 16%, transparent)`, letterSpacing: "-.04em",
                }}>{m.num ?? numeral}</span>
              )}

              {/* overlay inferior — oscuro con foto para legibilidad del texto blanco */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0,
                background: dark
                  ? `linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--surface-dark) 78%, transparent) 60%, var(--surface-dark) 100%)`
                  : `linear-gradient(180deg, rgba(255,255,255,0) 42%, color-mix(in srgb, var(--surface-card) 78%, transparent) 72%, var(--surface-card) 100%)`,
              }} />

              {/* label vertical */}
              <span aria-hidden="true" className="hp-vlabel" style={{
                position: "absolute", top: "clamp(20px,3.2vw,36px)", left: "clamp(16px,2vw,26px)",
                writingMode: "vertical-rl", transform: "rotate(180deg)",
                font: "700 11px var(--font-secondary)", letterSpacing: ".22em", textTransform: "uppercase",
                color: dark ? "var(--pure-white)" : "var(--ink-graphite)",
                opacity: on ? 0.28 : 0.6,
                transition: "opacity var(--duration-enter) var(--ease-premium)",
              }}>
                {m.k}
              </span>

              {/* contenido inferior */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(22px,2.4vw,38px)" }}>
                <span aria-hidden="true" style={{
                  display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12,
                  font: "700 11px var(--font-secondary)", letterSpacing: ".16em", textTransform: "uppercase",
                  color: dark ? "color-mix(in srgb, var(--pure-white) 72%, transparent)" : "var(--text-muted)",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.c }} />{m.k}
                </span>
                <h3 style={{
                  margin: 0,
                  font: "600 clamp(20px,1.9vw,28px)/1.12 var(--font-primary)", letterSpacing: "-.03em",
                  color: dark ? "var(--pure-white)" : "var(--ink-graphite)",
                  textWrap: "balance",
                }}>{m.h}</h3>

                {/* revelado al expandir */}
                <div className="hp-reveal" style={{
                  display: "grid",
                  gridTemplateRows: on ? "1fr" : "0fr",
                  opacity: on ? 1 : 0,
                  transition: "grid-template-rows var(--duration-enter) var(--ease-premium), opacity var(--duration-enter) var(--ease-premium)",
                }}>
                  <div style={{ overflow: "hidden", minHeight: 0 }}>
                    <p style={{
                      margin: "14px 0 0", font: "400 14.5px/1.6 var(--font-primary)",
                      color: dark ? "color-mix(in srgb, var(--pure-white) 80%, transparent)" : "var(--text-muted)",
                      maxWidth: "48ch",
                    }}>{m.p}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .hp-panel { transition: border-color var(--duration-premium) var(--ease-premium), box-shadow var(--duration-premium) var(--ease-premium); }
        .hp-panel:hover { box-shadow: 0 14px 36px rgba(31,17,72,.1); }
        @media (max-width: 820px) {
          .hp-grid { grid-template-columns: 1fr !important; }
          .hp-panel { min-height: clamp(360px,72vw,460px) !important; }
          .hp-reveal { grid-template-rows: 1fr !important; opacity: 1 !important; }
        }
      `}</style>
    </>
  );
}
