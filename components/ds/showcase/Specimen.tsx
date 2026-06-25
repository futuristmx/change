"use client";

/* ════════════════════════════════════════════════════════════
   Change DS 2.4 — Specimen vivo (ruta /laboratorio)
   Toggles de estado (6) y densidad (3) que verifican EN VIVO el
   sistema completo. Datos de muestra es-MX, sin hex.
   ════════════════════════════════════════════════════════════ */

import { useState } from "react";
import {
  DecisionCard, InsightCard, MetricCard, RiskCard, ProjectCard, StatusCard, NavCard,
  CardMetadata, CardStatePill, CardSkeleton, Glyph,
  BarSteps, LineEvolution, TimelineGantt, RadialGauge, Matrix2x2, Tooltip, Heatmap, ScoreCard, Sparkline,
  CARD_STATES, DENSITIES, densityClass, type CardState, type Density, type GlyphName, type PillTone,
} from "@/components/ds";

const WRAP = "min(1240px, calc(100% - clamp(32px,7vw,96px)))";

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "clamp(40px,6vw,72px) 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, font: "600 clamp(22px,2.4vw,30px) var(--font-primary)", letterSpacing: "-.03em", color: "var(--text-strong)" }}>{title}</h2>
        {note && <p style={{ margin: "8px 0 0", font: "400 14px var(--font-primary)", color: "var(--text-muted)" }}>{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Toggle<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)" }}>{label}</span>
      <div style={{ display: "inline-flex", gap: 2, padding: 4, border: "1px solid var(--border-subtle)", background: "var(--surface-soft)" }}>
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(o)} aria-pressed={o === value}
            style={{ padding: "6px 12px", border: 0, cursor: "pointer", background: o === value ? "var(--surface-card)" : "transparent",
              font: "500 12.5px var(--font-primary)", color: o === value ? "var(--change-violet)" : "var(--text-muted)" }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

const TONES: PillTone[] = ["success", "focus", "signal", "opportunity", "error", "neutral"];
const GLYPHS: GlyphName[] = ["decision", "insight", "metric", "risk", "project", "status", "nav", "lock"];

// ── datos de muestra (es-MX, sin hex) ──
const META = [{ label: "Confianza", value: "72%" }, { label: "Horizonte", value: "6 meses" }, { label: "Dueño", value: "AV" }];
const SERIES = [12, 18, 16, 24, 30, 28, 38, 44];

function CardGrid({ state, density }: { state: CardState; density: Density }) {
  return (
    <div className={densityClass[density]} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--density-card-gap, 16px)" }}>
      <DecisionCard state={state} title="¿Entramos al Bajío con marca propia o alianza local?"
        options={[{ label: "Marca propia", recommended: true }, { label: "Alianza local" }, { label: "Esperar Q3" }]}
        metadata={META} primaryLabel="Trabajar la decisión" secondaryLabel="Agendar lectura" minHeight={260} />
      <InsightCard state={state} title="El canal directo crece 3× más rápido que retail"
        body="Tres trimestres seguidos con la misma pendiente. La señal dejó de ser ruido."
        metadata={[{ label: "Confianza", value: "64%" }, { label: "Fuentes", value: "12" }]} minHeight={260} />
      <MetricCard state={state} label="Ingreso recurrente" value="1.8M" delta="+12%" deltaDirection="up" series={SERIES} pill={{ tone: "focus", label: "En foco" }} minHeight={260} />
      <RiskCard state={state} title="Dependencia de un solo proveedor de logística" severity="Alto"
        metadata={[{ label: "Impacto", value: "Alto" }, { label: "Dueño", value: "MC" }]} minHeight={260} />
      <ProjectCard state={state} title="Mission Control · fase 2" body="Trazabilidad de señales a decisiones." progress={65}
        metadata={[{ label: "Sprint", value: "3 / 5" }]} pill={{ tone: "signal", label: "En curso" }} minHeight={260} />
      <StatusCard state={state} title="Onboarding del cliente"
        phases={[{ label: "Mapa de Claridad", state: "done" }, { label: "Sprint de Rumbo", state: "current" }, { label: "Mission Control", state: "future" }]} minHeight={260} />
    </div>
  );
}

export default function Specimen() {
  const [state, setState] = useState<CardState>("default");
  const [density, setDensity] = useState<Density>("editorial");

  return (
    <div style={{ width: WRAP, margin: "0 auto", paddingBottom: 96 }}>
      {/* header */}
      <header style={{ padding: "clamp(56px,8vw,96px) 0 8px" }}>
        <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--change-violet)" }}>Change DS · Upgrade 2.4</span>
        <h1 style={{ margin: "14px 0 0", font: "600 clamp(34px,5vw,60px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-strong)" }}>Laboratorio del sistema</h1>
        <p style={{ margin: "16px 0 0", maxWidth: "60ch", font: "400 clamp(16px,1.4vw,19px)/1.5 var(--font-primary)", color: "var(--text-muted)" }}>
          Specimen vivo de la familia de tarjetas y el sistema de dataviz. Cambia estado y densidad para verificar los 6 estados × 3 densidades × 2 temas.
        </p>
      </header>

      {/* controles */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", flexWrap: "wrap", gap: 20, padding: "16px 0", background: "color-mix(in srgb, var(--surface-page) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-subtle)" }}>
        <Toggle label="Estado" options={CARD_STATES} value={state} onChange={setState} />
        <Toggle label="Densidad" options={DENSITIES} value={density} onChange={setDensity} />
      </div>

      <Section title="A · Familia de tarjetas" note="7 variantes — misma anatomía, distinta función. selected es NEUTRAL (no violeta).">
        <CardGrid state={state} density={density} />
        <div style={{ marginTop: "var(--density-card-gap,16px)" }} className={densityClass[density]}>
          <NavCard state={state} meta="Sección" title="Field Notes" body="Señales que estamos viendo cambiar." href="/field-notes" glyph="insight" accentVar="var(--status-info-fg)" />
        </div>
      </Section>

      <Section title="B · Reusables" note="Slots aislados: metadata, píldoras de estado (6 tonos), skeleton de carga.">
        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          <div><CardMetadata items={META} /></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TONES.map((t) => <CardStatePill key={t} tone={t}>{t}</CardStatePill>)}
          </div>
          <div style={{ border: "1px solid var(--field-outline)", padding: 24 }}><CardSkeleton /></div>
        </div>
      </Section>

      <Section title="C · Glifos estratégicos" note="SVG inline, stroke currentColor. Cero emoji, cero Lucide.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, color: "var(--change-violet)" }}>
          {GLYPHS.map((g) => (
            <div key={g} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Glyph name={g} size={28} />
              <span style={{ font: "500 11px var(--font-mono)", color: "var(--text-faint)" }}>{g}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="D · Dataviz" note="Color = significado/progreso, nunca orden. ≤1 violeta de foco por gráfico.">
        <div style={{ display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", alignItems: "start" }}>
          <Frame label="Barras de madurez (rampa)"><BarSteps unit="%" data={[{ label: "Q1", value: 20, step: 1 }, { label: "Q2", value: 38, step: 2 }, { label: "Q3", value: 55, step: 3 }, { label: "Q4", value: 68, step: 4 }, { label: "Foco", value: 84, step: 5 }, { label: "Q6", value: 72, step: 6 }, { label: "Q7", value: 90, step: 7 }]} /></Frame>
          <Frame label="Trayectoria de evolución"><LineEvolution data={[8, 16, 22, 30, 42, 54, 68, 82]} labels={["Ene", "", "Mar", "", "May", "", "Jul", ""]} /></Frame>
          <Frame label="Scorecard"><ScoreCard label="Decisiones trazadas" value="124" delta="+9%" series={SERIES} confidence={78} pill={{ tone: "success", label: "Validado" }} /></Frame>
          <Frame label="Medidor de confianza"><div style={{ display: "flex", justifyContent: "center" }}><RadialGauge value={78} /></div></Frame>
          <Frame label="Matriz esfuerzo × impacto"><Matrix2x2 points={[{ label: "Alianza", x: 0.28, y: 0.82, focus: true }, { label: "Marca propia", x: 0.72, y: 0.86 }, { label: "Esperar", x: 0.22, y: 0.32 }, { label: "Licenciar", x: 0.6, y: 0.42 }]} /></Frame>
          <Frame label="Timeline editorial"><TimelineGantt months={["Ene", "Feb", "Mar", "Abr", "May", "Jun"]} today={0.42} rows={[{ label: "Señales", start: 0, end: 0.32, colorVar: "var(--data-signal)" }, { label: "Escenarios", start: 0.2, end: 0.5, colorVar: "var(--data-structure)" }, { label: "Decisión", start: 0.45, end: 0.6, colorVar: "var(--data-opportunity)" }, { label: "Mission Control", start: 0.55, end: 1, colorVar: "var(--data-validated)" }]} /></Frame>
          <Frame label="Tooltip (anatomía)"><div style={{ padding: "8px 0 44px" }}><Tooltip title="Marzo 2026" rows={[{ label: "Señales activas", value: "7", dotVar: "var(--data-signal)" }, { label: "Decisiones", value: "12", dotVar: "var(--change-violet)" }, { label: "Validadas", value: "5", dotVar: "var(--data-validated)" }]} /></div></Frame>
          <Frame label="Heatmap de actividad"><Heatmap columnLabels={["L", "M", "M", "J", "V", "S", "D"]} rowLabels={["Sem 1", "Sem 2", "Sem 3", "Sem 4"]} data={[[0.1, 0.3, 0.5, 0.2, 0.7, 0.1, 0], [0.4, 0.6, 0.3, 0.8, 0.5, 0.2, 0.1], [0.2, 0.5, 0.9, 0.4, 0.6, 0.3, 0], [0.6, 0.3, 0.5, 0.7, 0.9, 0.4, 0.2]]} /></Frame>
          <Frame label="Sparkline"><div style={{ padding: "20px 0" }}><Sparkline data={SERIES} colorVar="var(--data-validated)" width={240} height={56} /></div></Frame>
        </div>
      </Section>

      {/* E · bloque dark */}
      <section className="change-dark" style={{ marginTop: 8, padding: "clamp(48px,7vw,88px) clamp(24px,4vw,48px)", background: "var(--surface-dark)" }}>
        <h2 style={{ margin: "0 0 6px", font: "600 clamp(22px,2.4vw,30px) var(--font-primary)", letterSpacing: "-.03em", color: "var(--text-strong)" }}>E · Tema dark</h2>
        <p style={{ margin: "0 0 28px", font: "400 14px var(--font-primary)", color: "var(--text-muted)" }}>Los tokens re-resuelven por tema. selected sigue neutral (no violeta); ejes y grids se invierten.</p>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))" }}>
          <MetricCard state="selected" label="Ingreso recurrente" value="1.8M" delta="+12%" series={SERIES} pill={{ tone: "focus", label: "En foco" }} minHeight={240} />
          <RiskCard state="default" title="Concentración de clientes en un solo sector" severity="Medio" metadata={[{ label: "Impacto", value: "Medio" }]} minHeight={240} />
          <div style={{ border: "1px solid var(--border-subtle)", padding: 24, background: "var(--surface-card)" }}><LineEvolution data={[8, 16, 22, 30, 42, 54, 68, 82]} /></div>
        </div>
      </section>
    </div>
  );
}

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 12 }}>{label}</div>
      <div style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: 24 }}>{children}</div>
    </div>
  );
}
