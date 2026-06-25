"use client";

import { useState, useEffect, useRef } from "react";
import {
  SCENARIOS, QUESTIONS, CHIPS,
  buildPartialReading, buildFullReading, buildDecisionText,
  DIM_LABEL, DIM_COLOR,
  type Scenario, type StepAnswer, type SimulatorReading,
} from "@/lib/decision-simulator";
import { track } from "@/lib/telemetry";
import { contactSchema } from "@/lib/contact-schema";

type Phase = "intro" | "quiz" | "result" | "contact" | "sent";

interface ContactData {
  nombre: string;
  rol: string;
  organizacion: string;
  correo: string;
}

const WRAP: React.CSSProperties = {
  width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))",
  margin: "0 auto",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  font: "600 11px var(--font-mono)",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "var(--field-label)",
  marginBottom: 9,
};

const FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  background: "var(--field-surface)",
  border: "1px solid var(--field-outline)",
  boxShadow: "var(--field-shadow)",
  color: "var(--field-text)",
  font: "400 16px var(--font-primary)",
  padding: "13px 15px",
  outline: "none",
  borderRadius: 0,
};

/* ── Chip de respuesta ── */
function Chip({
  text, selected, onClick,
}: { text: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-block",
        padding: "10px 16px",
        border: `1px solid ${selected ? "var(--change-violet)" : "var(--border-subtle)"}`,
        background: selected ? "color-mix(in srgb, var(--change-violet) 7%, var(--pure-white))" : "var(--pure-white)",
        color: "var(--ink-graphite)",
        font: "400 14px/1.4 var(--font-primary)",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color .15s, background .15s",
      }}
    >
      {text}
    </button>
  );
}

/* ── Panel de lectura parcial ── */
function ReadingPanel({ answers }: { answers: StepAnswer[] }) {
  const partial = buildPartialReading(answers);

  const items: { label: string; text: string; color: string }[] = [];

  if (partial.changeDim && partial.changeSignal) {
    items.push({
      label: `Cambio · ${DIM_LABEL[partial.changeDim]}`,
      text: partial.changeSignal,
      color: DIM_COLOR[partial.changeDim],
    });
  }
  if (partial.tension) {
    items.push({
      label: "Tensión emergente",
      text: partial.tension,
      color: partial.decisionDim ? DIM_COLOR[partial.decisionDim] : "var(--change-violet)",
    });
  }
  if (partial.risk) {
    items.push({
      label: "Riesgo dominante",
      text: partial.risk,
      color: "var(--status-error-fg)",
    });
  }
  if (partial.firstMove) {
    items.push({
      label: "Primer movimiento",
      text: partial.firstMove,
      color: "var(--success)",
    });
  }
  if (partial.artifact) {
    items.push({
      label: "Artefacto sugerido",
      text: partial.artifact,
      color: "var(--opportunity-orange)",
    });
  }

  return (
    <div style={{
      position: "sticky",
      top: 32,
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      padding: "28px 26px",
      minHeight: 260,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        <span data-pulse aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)", flexShrink: 0 }} />
        <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Lectura del board
        </span>
      </div>

      {items.length === 0 ? (
        <p style={{ font: "400 14px/1.6 var(--font-primary)", color: "var(--text-faint)", margin: 0 }}>
          Tu lectura aparecerá aquí conforme avances.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: "50%", background: item.color }} />
              <div>
                <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 4 }}>
                  {item.label}
                </span>
                <span style={{ font: "400 13.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Tarjeta de resultado ── */
function ResultCard({ reading }: { reading: SimulatorReading }) {
  return (
    <div style={{
      background: "radial-gradient(circle at 80% -10%,color-mix(in srgb, var(--change-violet) 22%, transparent),transparent 50%),var(--surface-dark-secondary)",
      padding: "clamp(36px,5vw,52px)",
      color: "rgba(255,255,255,.9)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
        <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
        <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
          Lectura del board · Change
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* movimiento principal */}
        <div style={{ paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            Movimiento principal
          </span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: DIM_COLOR[reading.primaryDim] }} />
            <span style={{ font: "600 22px var(--font-primary)", letterSpacing: "-.02em", color: "#fff" }}>
              {DIM_LABEL[reading.primaryDim]}
            </span>
            {reading.secondaryDim && (
              <>
                <span style={{ color: "rgba(255,255,255,.3)" }}>+</span>
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: DIM_COLOR[reading.secondaryDim] }} />
                <span style={{ font: "400 16px var(--font-primary)", color: "rgba(255,255,255,.6)" }}>
                  {DIM_LABEL[reading.secondaryDim]}
                </span>
              </>
            )}
          </div>
          <p style={{ margin: "12px 0 0", font: "400 14px/1.6 var(--font-primary)", color: "rgba(255,255,255,.65)" }}>
            {reading.methodNote}
          </p>
        </div>

        {/* tensión */}
        <div style={{ paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            Tensión detectada
          </span>
          <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "rgba(255,255,255,.85)" }}>
            {reading.tension}
          </p>
        </div>

        {/* riesgo */}
        <div style={{ paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            Riesgo dominante
          </span>
          <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>
            {reading.risk}
          </p>
        </div>

        {/* primer movimiento */}
        <div style={{ paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            Primer movimiento
          </span>
          <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "rgba(255,255,255,.85)" }}>
            {reading.firstMove}
          </p>
        </div>

        {/* artefacto */}
        <div>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            Artefacto sugerido
          </span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)" }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: DIM_COLOR[reading.primaryDim] }} />
            <span style={{ font: "600 15px var(--font-primary)", color: "#fff" }}>{reading.artifact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Componente principal ── */
export default function DecisionSimulator() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [completedAnswers, setCompletedAnswers] = useState<StepAnswer[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentChipIdx, setCurrentChipIdx] = useState<number | null>(null);
  const [currentChipDim, setCurrentChipDim] = useState<import("@/lib/decision-simulator").Dimension | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [reading, setReading] = useState<SimulatorReading | null>(null);
  const [contact, setContact] = useState<ContactData>({ nombre: "", rol: "", organizacion: "", correo: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* foco al textarea cuando avanza el paso */
  useEffect(() => {
    if (phase === "quiz") {
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [phase, step]);

  function resetQuiz() {
    setStep(0);
    setCompletedAnswers([]);
    setCurrentText("");
    setCurrentChipIdx(null);
    setCurrentChipDim(null);
    setSelectedScenario(null);
    setReading(null);
    setSubmitStatus("idle");
    setSubmitError("");
  }

  function startScenario(scenario: Scenario) {
    resetQuiz();
    setSelectedScenario(scenario);
    setCurrentText(scenario.answers[0]);
    setCurrentChipDim(scenario.chipDims[0]);
    /* seleccionar chip que coincida con Q1 del escenario */
    const chipIdx = CHIPS[0].findIndex((c) => c.text === scenario.answers[0]);
    setCurrentChipIdx(chipIdx >= 0 ? chipIdx : null);
    setPhase("quiz");
    setStep(0);
    track("simulator_scenario_selected", { scenario_id: scenario.id });
  }

  function startCustom() {
    resetQuiz();
    setPhase("quiz");
    setStep(0);
    track("simulator_started");
  }

  function selectChip(chipIdx: number) {
    const chip = CHIPS[step][chipIdx];
    setCurrentChipIdx(chipIdx);
    setCurrentChipDim(chip.dim);
    setCurrentText(chip.text);
    track("simulator_chip_selected", { step, chip_text: chip.text });
  }

  function handleTextChange(text: string) {
    setCurrentText(text);
    /* si el usuario edita, deseleccionar el chip */
    if (currentChipIdx !== null) {
      const chip = CHIPS[step][currentChipIdx];
      if (text !== chip.text) {
        setCurrentChipIdx(null);
        setCurrentChipDim(null);
      }
    }
    track("simulator_answer_edited", { step });
  }

  function advanceStep() {
    const newAnswer: StepAnswer = { text: currentText.trim(), chipDim: currentChipDim };
    const newAnswers = [...completedAnswers, newAnswer];
    setCompletedAnswers(newAnswers);
    track("simulator_step_completed", { step });

    if (step < 4) {
      /* pre-rellenar siguiente paso con escenario si aplica */
      const nextStep = step + 1;
      if (selectedScenario) {
        setCurrentText(selectedScenario.answers[nextStep]);
        setCurrentChipDim(selectedScenario.chipDims[nextStep] ?? null);
        const chipIdx = CHIPS[nextStep].findIndex((c) => c.text === selectedScenario.answers[nextStep]);
        setCurrentChipIdx(chipIdx >= 0 ? chipIdx : null);
      } else {
        setCurrentText("");
        setCurrentChipIdx(null);
        setCurrentChipDim(null);
      }
      setStep(nextStep);
    } else {
      /* todas las preguntas contestadas → calcular lectura completa */
      const fullReading = buildFullReading(newAnswers);
      setReading(fullReading);
      setPhase("result");
      track("simulator_result_viewed", {
        primary_dim: fullReading.primaryDim,
        secondary_dim: fullReading.secondaryDim,
        scenario_id: selectedScenario?.id ?? null,
      });
    }
  }

  function handleRetry() {
    resetQuiz();
    setPhase("intro");
    track("simulator_retry");
  }

  function handleStartContact() {
    setPhase("contact");
    track("simulator_contact_started", {
      primary_dim: reading?.primaryDim,
      artifact: reading?.artifact,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reading) return;
    setSubmitStatus("submitting");
    setSubmitError("");

    const decisionText = buildDecisionText(
      completedAnswers,
      reading,
      selectedScenario?.id ?? null
    );

    const nombreConRol = contact.nombre.trim() + (contact.rol.trim() ? `, ${contact.rol.trim()}` : "");

    const payload = {
      nombre: nombreConRol,
      email: contact.correo.trim(),
      organizacion: contact.organizacion.trim(),
      decision: decisionText,
      website: "",
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      const msg = fe.email?.[0] ?? fe.nombre?.[0] ?? "Revisa los datos e intenta de nuevo.";
      setSubmitError(msg);
      setSubmitStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("request failed");
      setPhase("sent");
      track("simulator_submitted", { primary_dim: reading.primaryDim, artifact: reading.artifact });
    } catch {
      setSubmitError("Algo falló al enviar. Intenta de nuevo en un momento.");
      setSubmitStatus("error");
    }
  }

  /* ═══════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════ */

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ ...WRAP, padding: "clamp(72px,9vw,120px) 0" }}>
          <div style={{ maxWidth: "52ch", marginBottom: "clamp(44px,6vw,64px)" }}>
            <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>
              Simulador de decisiones
            </span>
            <h2 style={{ margin: "0 0 16px", font: "600 clamp(26px,3.2vw,44px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              Prueba el modelo antes de compartir tu caso.
            </h2>
            <p style={{ margin: 0, font: "400 clamp(15px,1.3vw,18px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
              Selecciona un escenario para ver cómo Change lee una situación, o describe la tuya directamente.
            </p>
          </div>

          {/* grid de escenarios */}
          <div className="sim-intro-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 36 }}>
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => startScenario(sc)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "22px 20px",
                  background: "var(--pure-white)",
                  border: "1px solid var(--border-subtle)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color .15s, box-shadow .15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--change-violet)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: DIM_COLOR[sc.primaryDim], flexShrink: 0 }} />
                  <span style={{ font: "600 14px var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>{sc.label}</span>
                </div>
                <p style={{ margin: 0, font: "400 13px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{sc.description}</p>
              </button>
            ))}
          </div>

          {/* separador */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            <span style={{ font: "400 13px var(--font-primary)", color: "var(--text-faint)" }}>o</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
          </div>

          <button type="button" className="btn btn-secondary" onClick={startCustom}>
            Describir mi decisión directamente
          </button>
        </div>

        <style>{`
          @media (max-width: 920px) { .sim-intro-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 580px) { .sim-intro-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    );
  }

  /* ── QUIZ ── */
  if (phase === "quiz") {
    const q = QUESTIONS[step];
    const chips = CHIPS[step];
    const canAdvance = currentText.trim().length >= 3;
    const partial = buildPartialReading(completedAnswers);

    return (
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ ...WRAP, padding: "clamp(60px,8vw,100px) 0" }}>

          {/* barra de progreso */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,24px)", marginBottom: "clamp(36px,5vw,52px)" }}>
            <button
              type="button"
              onClick={handleRetry}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "400 13px var(--font-primary)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}
            >
              <span aria-hidden="true" style={{ fontSize: 16 }}>←</span>
              {selectedScenario ? "Cambiar escenario" : "Volver"}
            </button>
            <div style={{ flex: 1, display: "flex", gap: 6 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 3,
                    background: i < completedAnswers.length
                      ? "var(--change-violet)"
                      : i === step
                        ? "color-mix(in srgb, var(--change-violet) 35%, var(--border-subtle))"
                        : "var(--border-subtle)",
                    transition: "background .3s",
                  }}
                />
              ))}
            </div>
            <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              {step + 1} de 5
            </span>
          </div>

          <div className="sim-quiz-grid" style={{ display: "grid", gridTemplateColumns: "1fr minmax(280px,380px)", gap: "clamp(44px,6vw,80px)", alignItems: "start" }}>
            {/* columna pregunta */}
            <div>
              {selectedScenario && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "6px 12px", background: "color-mix(in srgb, var(--change-violet) 8%, var(--pure-white))", border: "1px solid color-mix(in srgb, var(--change-violet) 20%, var(--border-subtle))" }}>
                  <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: DIM_COLOR[selectedScenario.primaryDim] }} />
                  <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                    Escenario: {selectedScenario.label}
                  </span>
                </div>
              )}

              <h2 style={{ margin: "0 0 10px", font: "600 clamp(22px,2.8vw,38px)/1.08 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                {q.label}
              </h2>
              <p style={{ margin: "0 0 24px", font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)", maxWidth: "44ch" }}>
                {q.micro}
              </p>

              {/* chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                {chips.map((chip, i) => (
                  <Chip
                    key={i}
                    text={chip.text}
                    selected={currentChipIdx === i}
                    onClick={() => selectChip(i)}
                  />
                ))}
              </div>

              {/* textarea */}
              <textarea
                ref={textareaRef}
                rows={3}
                value={currentText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={q.placeholder}
                style={{
                  width: "100%",
                  background: "var(--field-surface)",
                  border: "1px solid var(--field-outline)",
                  boxShadow: "var(--field-shadow)",
                  color: "var(--field-text)",
                  font: "400 16px/1.5 var(--font-primary)",
                  padding: "13px 15px",
                  outline: "none",
                  borderRadius: 0,
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
              <p style={{ margin: "8px 0 0", font: "400 12.5px/1.4 var(--font-primary)", color: "var(--text-faint)" }}>
                {q.example}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={advanceStep}
                  disabled={!canAdvance}
                  style={{ opacity: canAdvance ? 1 : 0.45 }}
                >
                  {step < 4 ? "Siguiente →" : "Ver lectura →"}
                </button>
                {step < 4 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentText("");
                      setCurrentChipIdx(null);
                      setCurrentChipDim(null);
                      advanceStep();
                    }}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "400 13px var(--font-primary)", color: "var(--text-faint)" }}
                  >
                    Saltar
                  </button>
                )}
              </div>
            </div>

            {/* panel de lectura */}
            <ReadingPanel answers={completedAnswers} />
          </div>

          {partial.isComplete && (
            <div style={{ marginTop: 24, textAlign: "right" }}>
              <button type="button" className="btn btn-secondary" onClick={advanceStep}>
                Ver lectura completa →
              </button>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 860px) { .sim-quiz-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    );
  }

  /* ── RESULTADO ── */
  if (phase === "result" && reading) {
    return (
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ ...WRAP, padding: "clamp(72px,9vw,120px) 0" }}>
          <div style={{ maxWidth: 680, marginBottom: "clamp(36px,5vw,52px)" }}>
            <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
              Resultado del simulador
            </span>
            <h2 style={{ margin: 0, font: "600 clamp(24px,3vw,42px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              {selectedScenario
                ? `Lectura para el escenario: ${selectedScenario.label}`
                : "Lectura de tu decisión"}
            </h2>
          </div>

          <div className="sim-result-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,48px)", alignItems: "start", marginBottom: "clamp(40px,5vw,60px)" }}>
            <ResultCard reading={reading} />

            {/* resumen de respuestas */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                Lo que describiste
              </span>
              {completedAnswers.map((a, i) => a.text ? (
                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
                  <span style={{ flexShrink: 0, font: "600 11px var(--font-mono)", color: "var(--text-faint)", marginTop: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span style={{ display: "block", font: "600 12px var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 4 }}>
                      {QUESTIONS[i].label.replace("¿", "").replace("?", "")}
                    </span>
                    <span style={{ font: "400 14px/1.55 var(--font-primary)", color: "var(--ink-graphite)" }}>{a.text}</span>
                  </div>
                </div>
              ) : null)}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, borderTop: "1px solid var(--border-subtle)", paddingTop: 32 }}>
            <button type="button" className="btn btn-primary" onClick={handleStartContact}>
              Trabajar esta decisión con Change
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleRetry}>
              Probar otro escenario
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) { .sim-result-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    );
  }

  /* ── CONTACTO ── */
  if (phase === "contact") {
    return (
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ ...WRAP, padding: "clamp(72px,9vw,120px) 0" }}>
          <div className="sim-contact-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(44px,6vw,88px)", alignItems: "start" }}>
            {/* columna contexto */}
            <div>
              <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
                El siguiente paso
              </span>
              <h2 style={{ margin: "0 0 16px", font: "600 clamp(24px,2.8vw,40px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                El board lee tu caso antes de buscarte.
              </h2>
              <p style={{ margin: "0 0 28px", font: "400 15.5px/1.6 var(--font-primary)", color: "var(--text-muted)", maxWidth: "40ch" }}>
                Andrés Valencia y Miguel Cadena leen cada caso que entra. Te buscamos en un máximo de dos días hábiles con una primera lectura y el siguiente paso posible.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["Tu información no circula", "Tratamos cada decisión como información sensible. No la compartimos ni la reciclamos."],
                  ["Sin pitch ni propuesta automática", "Lo que recibes es una lectura estructurada, no un correo de venta."],
                ].map(([h, p]) => (
                  <div key={h} style={{ display: "flex", gap: 12 }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: "50%", background: "var(--change-violet)" }} />
                    <div>
                      <strong style={{ display: "block", font: "600 14px var(--font-primary)", color: "var(--ink-graphite)" }}>{h}</strong>
                      <span style={{ display: "block", marginTop: 3, font: "400 13.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{p}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleRetry}
                style={{ marginTop: 28, background: "none", border: "none", padding: 0, cursor: "pointer", font: "400 13px var(--font-primary)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}
              >
                ← Ver la lectura de nuevo
              </button>
            </div>

            {/* columna formulario */}
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20, border: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: "clamp(28px,4vw,40px)" }}>
              <div>
                <label htmlFor="sim-nombre" style={LABEL_STYLE}>Nombre</label>
                <input
                  id="sim-nombre"
                  type="text"
                  autoComplete="name"
                  required
                  value={contact.nombre}
                  onChange={(e) => setContact((c) => ({ ...c, nombre: e.target.value }))}
                  placeholder="Cómo te llamas"
                  style={FIELD_STYLE}
                />
              </div>
              <div>
                <label htmlFor="sim-rol" style={LABEL_STYLE}>Rol</label>
                <input
                  id="sim-rol"
                  type="text"
                  value={contact.rol}
                  onChange={(e) => setContact((c) => ({ ...c, rol: e.target.value }))}
                  placeholder="Tu rol o posición"
                  style={FIELD_STYLE}
                />
              </div>
              <div>
                <label htmlFor="sim-org" style={LABEL_STYLE}>Organización</label>
                <input
                  id="sim-org"
                  type="text"
                  autoComplete="organization"
                  value={contact.organizacion}
                  onChange={(e) => setContact((c) => ({ ...c, organizacion: e.target.value }))}
                  placeholder="Tu empresa"
                  style={FIELD_STYLE}
                />
              </div>
              <div>
                <label htmlFor="sim-correo" style={LABEL_STYLE}>Correo</label>
                <input
                  id="sim-correo"
                  type="email"
                  autoComplete="email"
                  required
                  value={contact.correo}
                  onChange={(e) => setContact((c) => ({ ...c, correo: e.target.value }))}
                  placeholder="tu@empresa.com"
                  style={FIELD_STYLE}
                />
              </div>

              {/* honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

              <div style={{ paddingTop: 4, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitStatus === "submitting"}
                  style={{ opacity: submitStatus === "submitting" ? 0.7 : 1 }}
                >
                  {submitStatus === "submitting" ? "Enviando…" : "Enviar mi caso"}
                </button>
                {submitStatus === "error" && (
                  <span style={{ font: "400 13px var(--font-primary)", color: "var(--status-error-fg)" }}>
                    {submitError}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) { .sim-contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    );
  }

  /* ── ENVIADO ── */
  if (phase === "sent") {
    return (
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ ...WRAP, padding: "clamp(88px,12vw,160px) 0" }}>
          <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--success)", marginBottom: 14 }}>
            Recibido
          </span>
          <h2 style={{ margin: "0 0 16px", font: "600 clamp(28px,3.8vw,52px)/1.04 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", maxWidth: "20ch", textWrap: "balance" }}>
            Listo. Tu decisión llegó al board.
          </h2>
          <p style={{ margin: "0 0 36px", font: "400 16px/1.6 var(--font-primary)", color: "var(--text-muted)", maxWidth: "44ch" }}>
            Andrés Valencia y Miguel Cadena leen tu caso y te buscamos en un máximo de dos días hábiles con una primera lectura. No necesitas hacer nada más.
          </p>
          <button type="button" className="btn btn-secondary" onClick={handleRetry}>
            Probar otro escenario
          </button>
        </div>
      </section>
    );
  }

  return null;
}
