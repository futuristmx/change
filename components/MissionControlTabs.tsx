"use client";

import { useState } from "react";

interface Tab {
  num: string;
  label: string;
  panel: string;
  copy: string;
}

const TABS: Tab[] = [
  { num: "01", label: "Radar", panel: "Radar de señales", copy: "Lectura de cambios relevantes conectada a decisiones vigentes y posibles movimientos." },
  { num: "02", label: "Decisiones", panel: "Memoria de decisiones", copy: "Contexto, supuestos y trade-offs disponibles para que el equipo no vuelva a discutir desde cero." },
  { num: "03", label: "Roadmap", panel: "Roadmap ejecutivo", copy: "Proyectos, responsables y señales de avance conectados al criterio original." },
];

const STATS = [
  { value: "3", color: "#fff", label: "Proyectos vivos" },
  { value: "7", color: "var(--signal-cyan)", label: "Señales activas" },
  { value: "12", color: "var(--lavender-mist)", label: "Decisiones trazadas" },
];

export default function MissionControlTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,.1)",
        background: "var(--gradient-dark-card-sweep, linear-gradient(160deg,#1C2233,#12141F))",
        boxShadow: "var(--shadow-dark-card, 0 30px 80px rgba(0,0,0,.5))",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,.09)" }}>
        {TABS.map((t, i) => (
          <button
            key={t.num}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            style={{
              cursor: "pointer", background: "transparent", border: 0, display: "flex",
              alignItems: "center", gap: 8, padding: "0 0 14px",
              borderBottom: `2px solid ${i === active ? "var(--change-violet)" : "transparent"}`,
              color: i === active ? "#fff" : "rgba(240,244,255,.5)",
              transition: "color .25s, border-color .25s",
            }}
          >
            <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".08em", color: i === active ? "var(--soft-violet)" : "rgba(240,244,255,.35)" }}>{t.num}</span>
            <span style={{ font: "500 14px var(--font-primary)", letterSpacing: "-.01em" }}>{t.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: "28px 26px" }}>
        <div className="ch-mcgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ background: "var(--gradient-dark-card-violet, linear-gradient(150deg,#1B2034,#141826))", padding: "24px 22px", boxShadow: "var(--edge-highlight-top, inset 0 1px 0 rgba(255,255,255,.06))" }}>
            <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(217,210,255,.7)" }}>Vista activa</span>
            <h3 style={{ margin: "11px 0 9px", font: "600 21px var(--font-primary)", letterSpacing: "-.02em", color: "#fff" }}>{tab.panel}</h3>
            <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-primary)", color: "rgba(255,255,255,.64)" }}>{tab.copy}</p>
          </div>
          <div style={{ background: "var(--gradient-dark-card-slate, linear-gradient(150deg,#181C2C,#121622))", padding: "24px 22px", boxShadow: "var(--edge-highlight-top, inset 0 1px 0 rgba(255,255,255,.06))" }}>
            <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Trazabilidad</span>
            <h3 style={{ margin: "11px 0 9px", font: "600 18px var(--font-primary)", letterSpacing: "-.02em", color: "#fff" }}>Señal → Decisión → Proyecto</h3>
            <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-primary)", color: "rgba(255,255,255,.64)" }}>Lo importante no se pierde entre juntas, documentos y chats.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.07)", borderTop: 0 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: "#101019", padding: "18px 20px" }}>
              <div style={{ font: "300 clamp(26px,3vw,36px)/1 var(--font-secondary)", color: s.color }}>{s.value}</div>
              <div style={{ marginTop: 7, font: "600 11px var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .ch-mcgrid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
