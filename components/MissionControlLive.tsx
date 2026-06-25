"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph, type GlyphName } from "@/components/ds";

const STAGE_GLYPH: Record<string, GlyphName> = {
  "Señal": "insight",
  "Tensión": "risk",
  "Decisión": "decision",
  "Proyecto": "project",
  "Aprendizaje": "status",
};

/* ── Demo ficticio plausible: UNA decisión trazada de extremo a extremo ── */
interface Stage {
  k: string;
  artefacto: string;
  color: string;
  body: string;
}

const TRACE: Stage[] = [
  { k: "Señal", artefacto: "Radar de señales", color: "var(--signal-cyan)", body: "Tres clientes industriales preguntaron por capacidad de nearshoring en menos de 60 días. Lo que parecía un caso aislado empezó a repetirse." },
  { k: "Tensión", artefacto: "Mapa de tensiones", color: "var(--soft-violet)", body: "Crecer rápido sin comprometer la calidad que nos ganó a esos clientes. Velocidad y estándar empujando en direcciones opuestas." },
  { k: "Decisión", artefacto: "Matriz de decisión", color: "var(--change-violet)", body: "Abrir una segunda línea acotada antes de comprometer la planta completa. Criterio explícito: la calidad pesa más que la velocidad de captura." },
  { k: "Proyecto", artefacto: "Roadmap vivo", color: "var(--change-violet)", body: "Piloto Línea B a 90 días. La métrica de calidad es el gate de continuidad: si no se sostiene, no se escala." },
  { k: "Aprendizaje", artefacto: "Memoria estratégica", color: "var(--lavender-mist)", body: "La calidad aguanta hasta ~70% de carga; arriba de eso se degrada. Criterio instalado para evaluar la próxima apertura sin volver a discutirlo desde cero." },
];

const SIGNALS = [
  { t: "Regulación de etiquetado entra en consulta pública", c: "var(--signal-cyan)" },
  { t: "Un competidor bajó precios 12% en el canal mayorista", c: "var(--opportunity-orange)" },
  { t: "La rotación del equipo comercial subió dos trimestres seguidos", c: "var(--warning)" },
];

const STATS = [
  { v: "3", label: "Proyectos vivos", c: "#fff" },
  { v: "7", label: "Señales activas", c: "var(--signal-cyan)" },
  { v: "12", label: "Decisiones trazadas", c: "var(--lavender-mist)" },
];

const LAST = TRACE.length - 1;

export default function MissionControlLive() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const stage = TRACE[active];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => { if (x.isIntersecting) { setInView(true); io.unobserve(el); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (!auto || !inView || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TRACE.length), 3600);
    return () => clearInterval(id);
  }, [auto, inView]);

  const select = (i: number) => { setActive(i); setAuto(false); };
  const fill = (active / LAST) * 100;

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid rgba(255,255,255,.1)",
        background: "var(--gradient-dark-card-sweep, linear-gradient(160deg,#1C2233,#12141F))",
        boxShadow: "0 30px 80px rgba(0,0,0,.5)",
      }}
    >
      {/* barra superior — latido vivo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,.09)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>
          <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />Mission Control · memoria viva
        </span>
        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Demo · datos de ejemplo</span>
      </div>

      <div className="mcl-body" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: 1, background: "rgba(255,255,255,.07)" }}>
        {/* ── columna A: la traza de una decisión ── */}
        <div style={{ background: "var(--surface-dark-tertiary)", padding: "26px 24px" }}>
          <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(217,210,255,.85)" }}>Trazabilidad de una decisión</span>
          <p style={{ margin: "8px 0 22px", font: "400 13px/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Toca cada paso: así viaja una señal hasta volverse aprendizaje que se queda.</p>

          {/* cadena de nodos */}
          <div style={{ position: "relative", marginBottom: 22 }}>
            <div style={{ position: "absolute", left: "8%", right: "8%", top: 9, height: 2, background: "rgba(255,255,255,.12)" }} />
            <div style={{ position: "absolute", left: "8%", top: 9, height: 2, width: `calc(${fill}% * 0.84)`, background: "var(--line-gradient-relation)", transition: "width var(--duration-premium) var(--ease-premium)" }} />
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${TRACE.length},1fr)`, gap: 4 }}>
              {TRACE.map((s, i) => {
                const on = i === active;
                return (
                  <button key={s.k} onClick={() => select(i)} aria-pressed={on} aria-label={`${s.k}, paso ${i + 1} de ${TRACE.length}`}
                    className="mcl-node-btn"
                    style={{ border: 0, background: "transparent", cursor: "pointer", padding: 0, textAlign: "center", fontFamily: "var(--font-primary)" }}>
                    <span data-pulse={on ? "" : undefined} style={{ display: "block", width: on ? 16 : 11, height: on ? 16 : 11, borderRadius: "50%", margin: "0 auto 9px", background: s.color, boxShadow: on ? `0 0 0 4px var(--surface-dark-tertiary), 0 0 14px ${s.color}` : "0 0 0 4px var(--surface-dark-tertiary)", transition: "all .3s var(--ease-premium)" }} />
                    <span className="mcl-nlabel" style={{ display: "block", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".04em", textTransform: "uppercase", color: on ? "#fff" : "rgba(255,255,255,.8)", transition: "color .3s" }}>{s.k}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* detalle del paso activo */}
          <div style={{ border: "1px solid rgba(255,255,255,.1)", borderLeft: `3px solid ${stage.color}`, background: "rgba(255,255,255,.03)", padding: "20px 22px", minHeight: 156 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: stage.color }} />
                <span aria-hidden="true" style={{ display: "inline-flex", color: stage.color }}>
                  <Glyph name={STAGE_GLYPH[stage.k] ?? "nav"} size={18} />
                </span>
                {stage.k}
              </span>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(217,210,255,.85)" }}>{stage.artefacto}</span>
            </div>
            <p key={stage.k} style={{ margin: 0, font: "400 14.5px/1.6 var(--font-primary)", color: "rgba(255,255,255,.82)" }}>{stage.body}</p>
          </div>
        </div>

        {/* ── columna B: señales vivas + aprendizaje ── */}
        <div style={{ background: "var(--surface-dark-secondary)", padding: "26px 24px", display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Señales activas</span>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              {SIGNALS.map((s) => (
                <div key={s.t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span data-pulse style={{ flexShrink: 0, marginTop: 5, width: 7, height: 7, borderRadius: "50%", background: s.c }} />
                  <span style={{ font: "400 13.5px/1.45 var(--font-primary)", color: "rgba(255,255,255,.82)" }}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.1)" }}>
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Estado de aprendizaje</span>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span data-pulse style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
              <strong style={{ font: "600 15px var(--font-primary)", color: "#fff" }}>Sostenido</strong>
            </div>
            <p style={{ margin: "8px 0 0", font: "400 13px/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>El criterio de cada decisión queda registrado. La próxima coyuntura no empieza de cero.</p>
          </div>
        </div>
      </div>

      {/* stats inferiores */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,.07)", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ background: "var(--surface-dark-tertiary)", padding: "18px 22px" }}>
            <div style={{ font: "300 clamp(26px,3vw,36px)/1 var(--font-secondary)", color: s.c }}>{s.v}</div>
            <div style={{ marginTop: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .mcl-body { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .mcl-node-btn { min-height: 44px; padding: 8px 4px !important; }
        }
        @media (max-width: 520px) {
          .mcl-nlabel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
