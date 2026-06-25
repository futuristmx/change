"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

interface Caso {
  k: string;
  c: string;
  h: string;
  s: string;
  flow: string[];
}

const STEPS = ["Leer", "Interpretar", "Decidir", "Diseñar", "Sostener", "Capacidad instalada"];

export default function CasoCard({ caso, idx, bg }: { caso: Caso; idx: number; bg: string }) {
  const [open, setOpen] = useState(false);
  const label = String(idx + 1).padStart(2, "0");

  return (
    <section
      style={{ borderTop: "1px solid var(--border-subtle)", background: bg }}
    >
      <div
        style={{
          width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))",
          margin: "0 auto",
          padding: "clamp(80px,9vw,140px) 0",
        }}
      >
        {/* cabecera siempre visible */}
        <div style={{ maxWidth: 820 }}>
          <Reveal style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            marginBottom: 16,
            font: "600 var(--text-meta) var(--font-mono)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--ink-graphite)",
          }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: caso.c }} />
            Tensión {label} · {caso.k}
          </Reveal>
          <Reveal delay={60} as="h2" style={{
            margin: 0,
            font: "600 clamp(28px,3.6vw,50px)/1.02 var(--font-primary)",
            letterSpacing: "-.04em",
            color: "var(--ink-graphite)",
            textWrap: "balance",
          }}>
            {caso.h}
          </Reveal>
          <Reveal delay={120} as="p" style={{
            margin: "20px 0 0",
            font: "400 clamp(16px,1.4vw,19px)/1.55 var(--font-primary)",
            color: "var(--text-muted)",
          }}>
            {caso.s}
          </Reveal>
        </div>

        {/* botón toggle */}
        <Reveal delay={160}>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 28,
              font: "600 13px var(--font-mono)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: caso.c,
              outline: "none",
              padding: "2px 0",
              borderBottom: `1px solid ${caso.c}`,
            }}
            onFocus={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px var(--change-violet)"; }}
            onBlur={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            {open ? "Cerrar recorrido ↑" : "Ver el recorrido completo ↓"}
          </button>
        </Reveal>

        {/* cards del flujo — revelan al expandir */}
        <div
          aria-hidden={!open}
          style={{
            overflow: "hidden",
            maxHeight: open ? 1200 : 0,
            opacity: open ? 1 : 0,
            transition: "max-height .4s ease, opacity .3s ease",
            marginTop: open ? 36 : 0,
          }}
        >
          <div className="cs-flow" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {caso.flow.map((text, i) => (
              <article
                key={i}
                className="ch-card"
                style={{
                  background: "rgba(255,255,255,.85)",
                  border: "1px solid var(--border-subtle)",
                  borderTop: `2px solid ${i === STEPS.length - 1 ? caso.c : "var(--border-subtle)"}`,
                  padding: "24px 24px 26px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  font: "600 var(--text-meta) var(--font-mono)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--ink-graphite)",
                  marginBottom: 12,
                }}>
                  <span aria-hidden="true" style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: i === STEPS.length - 1 ? caso.c : "var(--soft-violet)",
                  }} />
                  {STEPS[i]}
                </span>
                <p style={{
                  margin: 0,
                  font: "400 13.5px/1.55 var(--font-primary)",
                  color: i === STEPS.length - 1 ? "var(--deep-warm-gray)" : "var(--text-muted)",
                }}>
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
