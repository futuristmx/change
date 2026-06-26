"use client";

import { useState } from "react";

export interface Founder {
  n: string;
  role: string;
  arc: string;
  domain: string;
  c: string;
  tagline: string;
  story: string;
  /** ruta de la foto (cuando exista); si falta, se muestra placeholder con iniciales */
  photo?: string;
  /** object-position de la foto para encuadrar la cara, ej "center 35%" */
  focus?: string;
}

export default function FoundersPanels({ founders }: { founders: Founder[] }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div
        className="fp-grid"
        style={{
          display: "grid",
          gridTemplateColumns: founders.map((_, i) => (i === active ? "1.6fr" : "0.78fr")).join(" "),
          gap: "clamp(14px,1.6vw,20px)",
          transition: "grid-template-columns .55s var(--ease-premium)",
        }}
      >
        {founders.map((m, i) => {
          const on = i === active;
          const initials = m.n.split(" ").map((w) => w[0]).slice(0, 2).join("");
          return (
            <article
              key={m.n}
              className="fp-panel"
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={m.n}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}
              style={{
                position: "relative", overflow: "hidden", cursor: "pointer", outline: "none",
                minHeight: "clamp(440px,44vw,580px)",
                border: "1px solid var(--border-subtle)", borderTop: `3px solid ${m.c}`,
                background: "var(--surface-dark-secondary)",
              }}
            >
              {/* base: gradiente dark del color del socio (respira a través de la foto) */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(155deg, color-mix(in srgb, ${m.c} 36%, var(--surface-dark)) 0%, var(--surface-dark-secondary) 52%, var(--surface-dark) 100%)` }} />
              {/* foto semi-transparente */}
              {m.photo && (
                <div aria-hidden="true" className="fp-photo" style={{ position: "absolute", inset: 0, background: `url(${m.photo}) ${m.focus ?? "center 30%"} / cover no-repeat`, opacity: 0.8 }} />
              )}
              {/* iniciales watermark (solo placeholder) */}
              {!m.photo && (
                <span aria-hidden="true" style={{ position: "absolute", top: "clamp(16px,3vw,34px)", right: "clamp(14px,2.4vw,26px)", font: "700 clamp(76px,11vw,150px)/1 var(--font-secondary)", color: "rgba(255,255,255,.055)", letterSpacing: "-.04em" }}>{initials}</span>
              )}
              {/* overlay para legibilidad */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,14,21,.14) 0%, rgba(10,14,21,0) 30%, rgba(10,14,21,.6) 68%, rgba(10,14,21,.93) 100%)" }} />

              {/* label vertical — rol · arco del método */}
              <span
                aria-hidden="true"
                className="fp-vlabel"
                style={{ position: "absolute", top: "clamp(22px,3.5vw,38px)", left: "clamp(16px,2vw,26px)", writingMode: "vertical-rl", transform: "rotate(180deg)", font: "700 11px var(--font-secondary)", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.62)", opacity: on ? 0.4 : 0.9, transition: "opacity .4s var(--ease-premium)" }}
              >
                {m.role} · {m.arc}
              </span>

              {/* contenido inferior */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(22px,2.4vw,40px)" }}>
                <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12, font: "700 10.5px var(--font-secondary)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.62)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.c }} />{m.role}
                </span>
                <h3 style={{ margin: 0, font: "600 clamp(22px,2.3vw,34px)/1.03 var(--font-primary)", letterSpacing: "-.03em", color: "#fff" }}>{m.n}</h3>

                {/* revelado al expandir */}
                <div className="fp-reveal" style={{ display: "grid", gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0, transition: "grid-template-rows .5s var(--ease-premium), opacity .45s var(--ease-premium)" }}>
                  <div style={{ overflow: "hidden", minHeight: 0 }}>
                    <span style={{ display: "block", marginTop: 8, font: "500 12.5px var(--font-mono)", letterSpacing: ".02em", color: "rgba(255,255,255,.66)" }}>{m.domain}</span>
                    <p style={{ margin: "16px 0 0", font: "600 clamp(15px,1.3vw,18px)/1.34 var(--font-primary)", letterSpacing: "-.015em", color: "#fff", maxWidth: "30ch" }}>{m.tagline}</p>
                    <p style={{ margin: "12px 0 0", font: "400 14px/1.6 var(--font-primary)", color: "rgba(255,255,255,.82)", maxWidth: "46ch" }}>{m.story}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .fp-panel { transition: border-color .3s var(--ease-premium); }
        @media (max-width: 820px) {
          .fp-grid { grid-template-columns: 1fr !important; }
          .fp-panel { min-height: clamp(420px,80vw,520px) !important; }
          .fp-reveal { grid-template-rows: 1fr !important; opacity: 1 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fp-photo { transition: none !important; transform: none !important; }
        }
      `}</style>
    </>
  );
}
