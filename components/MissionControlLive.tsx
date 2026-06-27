"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph, type GlyphName } from "@/components/ds";
import { type Lang } from "@/lib/i18n";

// Glyph y color por ÍNDICE — estables entre idiomas (las arrays son paralelas).
const STAGE_GLYPHS: GlyphName[] = ["insight", "risk", "decision", "project", "status"];
const STAGE_COLORS: string[] = ["var(--evo-analysis)", "var(--evo-analysis)", "var(--evo-focus)", "var(--evo-focus)", "var(--evo-validated)"];

interface Stage {
  k: string;
  artefacto: string;
  evo: string;
  body: string;
}

const TRACE_ES: Stage[] = [
  { k: "Señal", artefacto: "Radar de señales", evo: "En análisis", body: "Tres clientes industriales preguntaron por capacidad de nearshoring en menos de 60 días. Lo que parecía un caso aislado empezó a repetirse." },
  { k: "Tensión", artefacto: "Mapa de tensiones", evo: "En análisis", body: "Crecer rápido sin comprometer la calidad que nos ganó a esos clientes. Velocidad y estándar empujando en direcciones opuestas." },
  { k: "Decisión", artefacto: "Matriz de decisión", evo: "En foco", body: "Abrir una segunda línea acotada antes de comprometer la planta completa. Criterio explícito: la calidad pesa más que la velocidad de captura." },
  { k: "Proyecto", artefacto: "Roadmap vivo", evo: "En foco", body: "Piloto Línea B a 90 días. La métrica de calidad es el gate de continuidad: si no se sostiene, no se escala." },
  { k: "Aprendizaje", artefacto: "Memoria estratégica", evo: "Validado", body: "La calidad aguanta hasta ~70% de carga; arriba de eso se degrada. Criterio instalado para evaluar la próxima apertura sin volver a discutirlo desde cero." },
];

const TRACE_EN: Stage[] = [
  { k: "Signal", artefacto: "Signal radar", evo: "In analysis", body: "Three industrial clients asked about nearshoring capacity within 60 days. What looked like an isolated case started to repeat." },
  { k: "Tension", artefacto: "Tension map", evo: "In analysis", body: "Grow fast without compromising the quality that won us those clients. Speed and standard pulling in opposite directions." },
  { k: "Decision", artefacto: "Decision matrix", evo: "In focus", body: "Open a second, limited line before committing the whole plant. Explicit criterion: quality outweighs speed of capture." },
  { k: "Project", artefacto: "Living roadmap", evo: "In focus", body: "Line B pilot at 90 days. The quality metric is the continuity gate: if it doesn't hold, it doesn't scale." },
  { k: "Learning", artefacto: "Strategic memory", evo: "Validated", body: "Quality holds up to ~70% load; above that it degrades. Criterion installed to evaluate the next opening without re-arguing it from scratch." },
];

const SIGNALS_ES = [
  { t: "Regulación de etiquetado entra en consulta pública", c: "var(--evo-analysis)", evo: "En radar" },
  { t: "Un competidor bajó precios 12% en el canal mayorista", c: "var(--data-opportunity)", evo: "En análisis" },
  { t: "La rotación del equipo comercial subió dos trimestres seguidos", c: "var(--data-risk)", evo: "En foco" },
];
const SIGNALS_EN = [
  { t: "Labeling regulation enters public consultation", c: "var(--evo-analysis)", evo: "On radar" },
  { t: "A competitor cut prices 12% in the wholesale channel", c: "var(--data-opportunity)", evo: "In analysis" },
  { t: "Sales-team turnover rose two quarters in a row", c: "var(--data-risk)", evo: "In focus" },
];

const METRICS_ES = [
  { v: "3", label: "Proyectos vivos", c: "var(--evo-focus)", delta: "+1 este mes" },
  { v: "7", label: "Señales activas", c: "var(--evo-analysis)", delta: "3 en revisión" },
  { v: "12", label: "Decisiones trazadas", c: "var(--evo-validated)", delta: "4 cerradas" },
];
const METRICS_EN = [
  { v: "3", label: "Live projects", c: "var(--evo-focus)", delta: "+1 this month" },
  { v: "7", label: "Active signals", c: "var(--evo-analysis)", delta: "3 under review" },
  { v: "12", label: "Decisions traced", c: "var(--evo-validated)", delta: "4 closed" },
];

const MCL_UI = {
  es: {
    title: "Mission Control · memoria viva", demo: "Demo · datos de ejemplo",
    traceEyebrow: "Trazabilidad de una decisión",
    traceLead: "Toca cada paso: así viaja una señal hasta volverse aprendizaje que se queda.",
    step: "paso", of: "de", activeSignals: "Señales activas",
    learnStatus: "Estado de aprendizaje", sustained: "Sostenido",
    learnBody: "El criterio de cada decisión queda registrado. La próxima coyuntura no empieza de cero.",
    statusLabel: "Estado",
    legend: [{ l: "Señal débil", c: "var(--evo-noise)" }, { l: "En análisis", c: "var(--evo-analysis)" }, { l: "En foco", c: "var(--evo-focus)" }, { l: "Validado", c: "var(--evo-validated)" }],
  },
  en: {
    title: "Mission Control · living memory", demo: "Demo · sample data",
    traceEyebrow: "Traceability of a decision",
    traceLead: "Tap each step: this is how a signal travels until it becomes learning that stays.",
    step: "step", of: "of", activeSignals: "Active signals",
    learnStatus: "Learning status", sustained: "Sustained",
    learnBody: "The criteria behind each decision is recorded. The next turn doesn't start from zero.",
    statusLabel: "Status",
    legend: [{ l: "Weak signal", c: "var(--evo-noise)" }, { l: "In analysis", c: "var(--evo-analysis)" }, { l: "In focus", c: "var(--evo-focus)" }, { l: "Validated", c: "var(--evo-validated)" }],
  },
};

const LAST = TRACE_ES.length - 1;

export default function MissionControlLive({ lang = "es" }: { lang?: Lang }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const TRACE = lang === "en" ? TRACE_EN : TRACE_ES;
  const SIGNALS = lang === "en" ? SIGNALS_EN : SIGNALS_ES;
  const METRICS = lang === "en" ? METRICS_EN : METRICS_ES;
  const ui = MCL_UI[lang];
  const stage = TRACE[active];
  const stageColor = STAGE_COLORS[active];
  const fillPct = (active / LAST) * 100;

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

  return (
    <div
      ref={ref}
      className="change-dark"
      style={{
        border: "1px solid rgba(255,255,255,.06)",
        background: "var(--gradient-dark-card-slate, linear-gradient(160deg,#161D2A,#0F1420))",
        boxShadow: "0 24px 60px rgba(0,0,0,.42)",
      }}
    >
      {/* ── Barra superior — latido + label demo ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
          <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--evo-analysis)" }} />
          {ui.title}
        </span>
        <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>{ui.demo}</span>
      </div>

      <div className="mcl-body" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: 1, background: "rgba(255,255,255,.04)" }}>

        {/* ── Columna A: trazabilidad de la decisión ── */}
        <div style={{ background: "var(--surface-dark-tertiary)", padding: "26px 24px" }}>
          <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(217,210,255,.5)" }}>{ui.traceEyebrow}</span>
          <p style={{ margin: "8px 0 24px", font: "400 13px/1.5 var(--font-primary)", color: "rgba(255,255,255,.65)" }}>
            {ui.traceLead}
          </p>

          {/* Cadena de nodos con Evolution Ramp */}
          <div style={{ position: "relative", marginBottom: 24 }}>
            {/* Track de fondo */}
            <div style={{ position: "absolute", left: "8%", right: "8%", top: 9, height: 2, background: "var(--chart-track)" }} />
            {/* Relleno de progreso — evolution line gradient */}
            <div style={{
              position: "absolute", left: "8%", top: 9, height: 2,
              width: `calc(${fillPct}% * 0.84)`,
              background: "var(--gradient-evolution-line)",
              transition: "width var(--duration-premium) var(--ease-premium)",
            }} />
            {/* Nodos */}
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${TRACE.length},1fr)`, gap: 4 }}>
              {TRACE.map((s, i) => {
                const on = i === active;
                const nodeColor = STAGE_COLORS[i];
                return (
                  <button
                    key={s.k}
                    onClick={() => select(i)}
                    aria-pressed={on}
                    aria-label={`${s.k}, ${ui.step} ${i + 1} ${ui.of} ${TRACE.length}`}
                    className="mcl-node-btn"
                    style={{ border: 0, background: "transparent", cursor: "pointer", padding: 0, textAlign: "center", fontFamily: "var(--font-primary)" }}
                  >
                    <span
                      data-pulse={on ? "" : undefined}
                      style={{
                        display: "block",
                        width: on ? 14 : 9,
                        height: on ? 14 : 9,
                        borderRadius: "50%",
                        margin: "0 auto 9px",
                        background: on ? nodeColor : "var(--evo-noise)",
                        boxShadow: on ? `0 0 0 4px var(--surface-dark-tertiary), 0 0 10px ${nodeColor}` : "0 0 0 3px var(--surface-dark-tertiary)",
                        transition: "all .3s var(--ease-premium)",
                        opacity: i <= active ? 1 : 0.45,
                      }}
                    />
                    <span
                      className="mcl-nlabel"
                      style={{
                        display: "block",
                        font: "700 10px var(--font-secondary)",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: on ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.45)",
                        transition: "color .3s",
                      }}
                    >
                      {s.k}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel del paso activo */}
          <div style={{ border: "1px solid rgba(255,255,255,.1)", borderLeft: `3px solid ${stageColor}`, background: "rgba(255,255,255,.03)", padding: "20px 22px", minHeight: 156 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: stageColor }} />
                <span aria-hidden="true" style={{ display: "inline-flex", color: stageColor }}>
                  <Glyph name={STAGE_GLYPHS[active] ?? "nav"} size={18} />
                </span>
                {stage.k}
              </span>
              {/* Estado en ramp */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "700 10px var(--font-secondary)", letterSpacing: ".12em", textTransform: "uppercase", color: stageColor }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: stageColor }} />
                {stage.evo}
              </span>
            </div>
            <div style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(217,210,255,.45)", marginBottom: 8 }}>
              {stage.artefacto}
            </div>
            <p key={stage.k} style={{ margin: 0, font: "400 14.5px/1.6 var(--font-primary)", color: "rgba(255,255,255,.7)" }}>{stage.body}</p>
          </div>
        </div>

        {/* ── Columna B: señales + aprendizaje ── */}
        <div style={{ background: "var(--surface-dark-secondary)", padding: "26px 24px", display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{ui.activeSignals}</span>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 13 }}>
              {SIGNALS.map((s, idx) => (
                <div key={s.t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    data-pulse={idx === 0 ? "" : undefined}
                    style={{ flexShrink: 0, marginTop: 5, width: 7, height: 7, borderRadius: "50%", background: s.c, opacity: idx === 0 ? 1 : 0.8 }}
                  />
                  <div>
                    <span style={{ display: "block", font: "400 13px/1.45 var(--font-primary)", color: "rgba(255,255,255,.7)" }}>{s.t}</span>
                    <span style={{ display: "block", marginTop: 3, font: "700 9px var(--font-secondary)", letterSpacing: ".12em", textTransform: "uppercase", color: s.c, opacity: .8 }}>{s.evo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{ui.learnStatus}</span>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span data-pulse style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--evo-validated)" }} />
              <strong style={{ font: "600 15px var(--font-primary)", color: "#fff" }}>{ui.sustained}</strong>
            </div>
            <p style={{ margin: "8px 0 0", font: "400 13px/1.5 var(--font-primary)", color: "rgba(255,255,255,.65)" }}>
              {ui.learnBody}
            </p>
          </div>
        </div>
      </div>

      {/* ── Metric cards — Evolution Ramp DS 2.4 ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,.06)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        {METRICS.map((m) => (
          <div key={m.label} style={{ background: "var(--surface-dark-tertiary)", padding: "18px 22px" }}>
            <div style={{ font: "300 clamp(28px,3vw,38px)/1 var(--font-secondary)", color: m.c, letterSpacing: "-.02em" }}>{m.v}</div>
            <div style={{ marginTop: 6, font: "700 10px var(--font-secondary)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{m.label}</div>
            <div style={{ marginTop: 4, font: "400 11.5px var(--font-primary)", color: m.c, opacity: .75 }}>{m.delta}</div>
          </div>
        ))}
      </div>

      {/* ── Evolution ramp legend ── */}
      <div style={{ padding: "14px 22px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <span style={{ font: "700 9px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>{ui.statusLabel}</span>
        {ui.legend.map((r) => (
          <span key={r.l} style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "700 9px var(--font-secondary)", letterSpacing: ".1em", textTransform: "uppercase", color: r.c }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: r.c }} />
            {r.l}
          </span>
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
