"use client";

import { useState, useEffect, useRef } from "react";
import {
  SCENARIOS_ES, SCENARIOS_EN, QUESTIONS_ES, QUESTIONS_EN, CHIPS_ES, CHIPS_EN,
  buildPartialReading, buildFullReading, buildDecisionText,
  DIM_LABEL_ES, DIM_LABEL_EN, DIM_COLOR,
  type Scenario, type StepAnswer, type SimulatorReading,
} from "@/lib/decision-simulator";
import { track } from "@/lib/telemetry";
import { contactSchema } from "@/lib/contact-schema";
import { type Lang } from "@/lib/i18n";

const DS_UI = {
  es: {
    boardDiag: "Diagnóstico del board", changePrefix: "Cambio", emergingTension: "Tensión emergente", domRisk: "Riesgo dominante", firstMove: "Primer movimiento", suggArtifact: "Artefacto sugerido",
    diagPlaceholder: "Tu diagnóstico aparece aquí conforme avanzas.",
    boardDiagChange: "Diagnóstico del board · Change", primaryMove: "Movimiento principal", tensionDetected: "Tensión detectada",
    introEyebrow: "Estructura tu decisión", introH: "Ordena tu decisión en cinco preguntas.", introP: "Elige un escenario para ver cómo Change estructura una situación, o describe la tuya directamente.",
    or: "o", describeDirect: "Describir mi decisión directamente",
    changeScenario: "Cambiar escenario", back: "Volver", of: "de", scenario: "Escenario", next: "Siguiente →", seeDiag: "Ver diagnóstico →", skip: "Saltar",
    yourDiag: "Tu diagnóstico", scenarioDiag: "Diagnóstico del escenario", yourDecisionDiag: "Diagnóstico de tu decisión", whatYouDescribed: "Lo que describiste",
    workWithChange: "Trabajar esta decisión con Change", tryAnother: "Probar otro escenario", copied: "Copiado ✓", copyDiag: "Copiar diagnóstico", copiedAria: "Diagnóstico copiado al portapapeles", copyAria: "Copiar diagnóstico al portapapeles",
    nextStep: "El siguiente paso", contactH: "El board senior lee tu caso antes de buscarte.", contactP: "Tu caso llega al board senior de Change. Si hay una tensión real que podamos trabajar, te respondemos con un primer diagnóstico y un siguiente paso posible.",
    benefits: [["Tu información no circula", "Tratamos cada decisión como información sensible. No la compartimos ni la reciclamos."], ["Sin pitch ni propuesta automática", "Lo que recibes es un diagnóstico estructurado, no un correo de venta."]],
    seeDiagAgain: "← Ver el diagnóstico de nuevo",
    nameL: "Nombre", nameP: "Cómo te llamas", roleL: "Rol", roleP: "Tu rol o posición", orgL: "Organización", orgP: "Tu empresa", emailL: "Correo", emailP: "tu@empresa.com",
    sending: "Enviando…", sendCase: "Enviar mi caso", checkData: "Revisa los datos e intenta de nuevo.", sendFail: "Algo falló al enviar. Intenta de nuevo en un momento.",
    received: "Recibido", sentH: "Listo. Tu decisión llegó al board.", sentP: "Andrés Valencia y Miguel Cadena leen tu caso y te buscamos en un máximo de dos días hábiles con un primer diagnóstico. No necesitas hacer nada más.", readsAs1: "Change lo lee como caso de", readsAs2: ".",
    copyTitle: "LECTURA DE CHANGE · change.live", copyMove: "Movimiento principal", copyTension: "TENSIÓN IDENTIFICADA", copyRisk: "RIESGO DOMINANTE", copyFirst: "PRIMER MOVIMIENTO", copyArt: "Artefacto sugerido",
  },
  en: {
    boardDiag: "Board diagnosis", changePrefix: "Change", emergingTension: "Emerging tension", domRisk: "Dominant risk", firstMove: "First move", suggArtifact: "Suggested artifact",
    diagPlaceholder: "Your diagnosis appears here as you go.",
    boardDiagChange: "Board diagnosis · Change", primaryMove: "Primary move", tensionDetected: "Tension detected",
    introEyebrow: "Structure your decision", introH: "Order your decision in five questions.", introP: "Pick a scenario to see how Change structures a situation, or describe yours directly.",
    or: "or", describeDirect: "Describe my decision directly",
    changeScenario: "Change scenario", back: "Back", of: "of", scenario: "Scenario", next: "Next →", seeDiag: "See diagnosis →", skip: "Skip",
    yourDiag: "Your diagnosis", scenarioDiag: "Scenario diagnosis", yourDecisionDiag: "Diagnosis of your decision", whatYouDescribed: "What you described",
    workWithChange: "Work this decision with Change", tryAnother: "Try another scenario", copied: "Copied ✓", copyDiag: "Copy diagnosis", copiedAria: "Diagnosis copied to clipboard", copyAria: "Copy diagnosis to clipboard",
    nextStep: "The next step", contactH: "The senior board reads your case before reaching out.", contactP: "Your case reaches Change's senior board. If there's a real tension we can work, we'll reply with a first diagnosis and a possible next step.",
    benefits: [["Your information doesn't circulate", "We treat every decision as sensitive information. We don't share it or recycle it."], ["No pitch or automatic proposal", "What you get is a structured diagnosis, not a sales email."]],
    seeDiagAgain: "← See the diagnosis again",
    nameL: "Name", nameP: "What you go by", roleL: "Role", roleP: "Your role or position", orgL: "Organization", orgP: "Your company", emailL: "Email", emailP: "you@company.com",
    sending: "Sending…", sendCase: "Send my case", checkData: "Check the details and try again.", sendFail: "Something went wrong sending. Try again in a moment.",
    received: "Received", sentH: "Done. Your decision reached the board.", sentP: "Andrés Valencia and Miguel Cadena read your case and we'll reach out within two business days with a first diagnosis. You don't need to do anything else.", readsAs1: "Change reads it as a case of", readsAs2: ".",
    copyTitle: "CHANGE READING · change.live", copyMove: "Primary move", copyTension: "TENSION IDENTIFIED", copyRisk: "DOMINANT RISK", copyFirst: "FIRST MOVE", copyArt: "Suggested artifact",
  },
};

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

const STEP_LABELS_ES = ["Contexto", "Decisión", "Riesgo", "Actores", "Horizonte"];
const STEP_LABELS_EN = ["Context", "Decision", "Risk", "Actors", "Horizon"];

/* ── Chip de respuesta ── */
function Chip({
  text, selected, onClick,
}: { text: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        padding: "9px 13px",
        border: `1px solid ${selected ? "var(--change-violet)" : "var(--border-subtle)"}`,
        background: selected ? "color-mix(in srgb, var(--change-violet) 7%, var(--pure-white))" : "var(--pure-white)",
        color: selected ? "var(--ink-graphite)" : "var(--text-muted)",
        font: `${selected ? "500" : "400"} 13.5px/1.35 var(--font-primary)`,
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color .12s, background .12s, color .12s",
      }}
    >
      {text}
    </button>
  );
}

/* ── Panel de lectura parcial ── */
function ReadingPanel({ answers, lang }: { answers: StepAnswer[]; lang: Lang }) {
  const partial = buildPartialReading(answers, lang);
  const t = DS_UI[lang];
  const DIM_LABEL = lang === "en" ? DIM_LABEL_EN : DIM_LABEL_ES;

  const items: { label: string; text: string; color: string }[] = [];

  if (partial.changeDim && partial.changeSignal) {
    items.push({
      label: `${t.changePrefix} · ${DIM_LABEL[partial.changeDim]}`,
      text: partial.changeSignal,
      color: DIM_COLOR[partial.changeDim],
    });
  }
  if (partial.tension) {
    items.push({
      label: t.emergingTension,
      text: partial.tension,
      color: partial.decisionDim ? DIM_COLOR[partial.decisionDim] : "var(--change-violet)",
    });
  }
  if (partial.risk) {
    items.push({ label: t.domRisk, text: partial.risk, color: "var(--status-error-fg)" });
  }
  if (partial.firstMove) {
    items.push({ label: t.firstMove, text: partial.firstMove, color: "var(--success)" });
  }
  if (partial.artifact) {
    items.push({ label: t.suggArtifact, text: partial.artifact, color: "var(--opportunity-orange)" });
  }

  return (
    <div style={{
      background: "color-mix(in srgb, var(--change-violet) 3%, var(--surface-card))",
      padding: "24px 20px",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        marginBottom: 18,
        paddingBottom: 14,
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        <span data-pulse aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)", flexShrink: 0 }} />
        <span style={{ font: "600 10px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {t.boardDiag}
        </span>
      </div>

      {items.length === 0 ? (
        <p style={{ font: "400 13px/1.6 var(--font-primary)", color: "var(--text-faint)", margin: 0 }}>
          {t.diagPlaceholder}
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: item.color }} />
              <div>
                <span style={{ display: "block", font: "600 10px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 3 }}>
                  {item.label}
                </span>
                <span style={{ font: "400 12.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>
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
function ResultCard({ reading, lang }: { reading: SimulatorReading; lang: Lang }) {
  const t = DS_UI[lang];
  const DIM_LABEL = lang === "en" ? DIM_LABEL_EN : DIM_LABEL_ES;
  return (
    <div style={{
      background: "radial-gradient(circle at 80% -10%,color-mix(in srgb, var(--change-violet) 22%, transparent),transparent 50%),var(--surface-dark-secondary)",
      padding: "clamp(36px,5vw,52px)",
      color: "rgba(255,255,255,.9)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
        <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
        <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
          {t.boardDiagChange}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* movimiento principal */}
        <div style={{ paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            {t.primaryMove}
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
            {t.tensionDetected}
          </span>
          <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "rgba(255,255,255,.85)" }}>
            {reading.tension}
          </p>
        </div>

        {/* riesgo */}
        <div style={{ paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            {t.domRisk}
          </span>
          <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>
            {reading.risk}
          </p>
        </div>

        {/* primer movimiento */}
        <div style={{ paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            {t.firstMove}
          </span>
          <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "rgba(255,255,255,.85)" }}>
            {reading.firstMove}
          </p>
        </div>

        {/* artefacto */}
        <div>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", display: "block", marginBottom: 8 }}>
            {t.suggArtifact}
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
export default function DecisionSimulator({ lang = "es" }: { lang?: Lang }) {
  const t = DS_UI[lang];
  const SCENARIOS = lang === "en" ? SCENARIOS_EN : SCENARIOS_ES;
  const QUESTIONS = lang === "en" ? QUESTIONS_EN : QUESTIONS_ES;
  const CHIPS = lang === "en" ? CHIPS_EN : CHIPS_ES;
  const DIM_LABEL = lang === "en" ? DIM_LABEL_EN : DIM_LABEL_ES;
  const STEP_LABELS = lang === "en" ? STEP_LABELS_EN : STEP_LABELS_ES;
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
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [headerH, setHeaderH] = useState(80);

  function handleCopyReading() {
    if (!reading) return;
    const lines = [
      t.copyTitle,
      "",
      `${t.copyMove}: ${DIM_LABEL[reading.primaryDim]}` +
        (reading.secondaryDim ? ` + ${DIM_LABEL[reading.secondaryDim]}` : ""),
      "",
      t.copyTension,
      reading.tension,
      "",
      t.copyRisk,
      reading.risk,
      "",
      t.copyFirst,
      reading.firstMove,
      "",
      `${t.copyArt}: ${reading.artifact}`,
    ].join("\n");
    navigator.clipboard.writeText(lines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
      track("simulator_result_copied", { primary_dim: reading.primaryDim });
    }).catch(() => {/* ignore */});
  }

  useEffect(() => {
    if (phase === "quiz") {
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [phase, step]);

  // Mide la altura real del header sticky para que la barra de progreso
  // se ancle justo debajo (sin solaparse) y el scroll-into-view deje el
  // simulador a la altura correcta.
  useEffect(() => {
    function measure() {
      const h = document.querySelector("header")?.offsetHeight;
      if (h && h > 0) setHeaderH(h);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-into-view al cambiar de fase: evita que el usuario abra el quiz/
  // resultado/contacto a mitad de scroll. Honra prefers-reduced-motion.
  useEffect(() => {
    if (phase === "intro") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduce ? "auto" : "smooth",
      });
    });
  }, [phase, headerH]);

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
    if (currentChipIdx !== null) {
      const chip = CHIPS[step][currentChipIdx];
      if (text !== chip.text) {
        setCurrentChipIdx(null);
        setCurrentChipDim(null);
      }
    }
    track("simulator_answer_edited", { step });
  }

  /* avanza con la respuesta actual */
  function advanceStep() {
    const newAnswer: StepAnswer = { text: currentText.trim(), chipDim: currentChipDim };
    commitStep(newAnswer);
  }

  /* salta el paso sin guardar respuesta */
  function skipStep() {
    const emptyAnswer: StepAnswer = { text: "", chipDim: null };
    commitStep(emptyAnswer);
    track("simulator_step_skipped", { step });
  }

  function commitStep(answer: StepAnswer) {
    const newAnswers = [...completedAnswers, answer];
    setCompletedAnswers(newAnswers);
    track("simulator_step_completed", { step });

    if (step < 4) {
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
      const fullReading = buildFullReading(newAnswers, lang);
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
      selectedScenario?.id ?? null,
      lang
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
      const msg = fe.email?.[0] ?? fe.nombre?.[0] ?? t.checkData;
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
      setSubmitError(t.sendFail);
      setSubmitStatus("error");
    }
  }

  /* ═══════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════ */

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <section ref={containerRef} style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)", scrollMarginTop: 80 }}>
        <div style={{ ...WRAP, padding: "clamp(56px,7vw,88px) 0" }}>
          <div style={{ maxWidth: "52ch", marginBottom: "clamp(36px,5vw,52px)" }}>
            <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>
              {t.introEyebrow}
            </span>
            <h2 style={{ margin: "0 0 16px", font: "600 clamp(26px,3.2vw,44px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              {t.introH}
            </h2>
            <p style={{ margin: 0, font: "400 clamp(15px,1.3vw,18px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
              {t.introP}
            </p>
          </div>

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

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            <span style={{ font: "400 13px var(--font-primary)", color: "var(--text-faint)" }}>{t.or}</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
          </div>

          <button type="button" className="btn btn-secondary" onClick={startCustom}>
            {t.describeDirect}
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

    return (
      <section ref={containerRef} style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)", scrollMarginTop: 80 }}>
        <div style={{ ...WRAP, padding: "clamp(32px,4vw,44px) 0" }}>

          {/* Barra global de progreso — fija JUSTO debajo del header sticky.
              Mide headerH dinámicamente para evitar solape. zIndex 55 (debajo
              del header z:60) garantiza que nunca quede encima del menú; al
              usar top=headerH la barra cae siempre 0px debajo. */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              top: headerH,
              left: 0,
              right: 0,
              height: 4,
              background: "var(--track-graphite)",
              zIndex: 55,
            }}
          >
            <div
              role="progressbar"
              aria-label="Avance"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={step + 1}
              style={{
                height: "100%",
                width: `${((step + 1) / 5) * 100}%`,
                background: "var(--line-gradient-progress)",
                transition: "width var(--duration-premium) var(--ease-premium)",
              }}
            />
          </div>

          {/* ── Widget card ── */}
          <div className="sim-quiz-card" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 252px", border: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>


            {/* columna izquierda — pregunta */}
            <div style={{ padding: "clamp(22px,3vw,32px)", borderRight: "1px solid var(--border-subtle)" }}>

              {/* header: back + step counter */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <button
                  type="button"
                  onClick={handleRetry}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "400 13px var(--font-primary)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}
                >
                  <span aria-hidden="true" style={{ fontSize: 14 }}>←</span>
                  {selectedScenario ? t.changeScenario : t.back}
                </button>
                <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".08em", color: "var(--text-faint)" }}>
                  {step + 1} {t.of} 5
                </span>
              </div>

              {/* ── stepper breadcrumb ── */}
              <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 26 }}>
                {STEP_LABELS.map((label, i) => (
                  <div key={i} style={{ display: "contents" }}>
                    {i > 0 && (
                      <div style={{
                        flex: 1,
                        height: 2,
                        marginTop: 7,
                        background: i <= completedAnswers.length ? "var(--change-violet)" : "var(--border-subtle)",
                        transition: "background .25s",
                      }} />
                    )}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                        background: i < completedAnswers.length ? "var(--change-violet)" : "var(--surface-card)",
                        border: `2px solid ${i < completedAnswers.length ? "var(--change-violet)" : i === step ? "var(--change-violet)" : "var(--border-subtle)"}`,
                        transition: "background .25s, border-color .25s",
                        boxShadow: i === step ? "0 0 0 3px color-mix(in srgb, var(--change-violet) 15%, transparent)" : "none",
                      }} />
                      <span style={{
                        font: "600 9px var(--font-mono)",
                        letterSpacing: ".05em",
                        textTransform: "uppercase",
                        color: i === step ? "var(--change-violet)" : i < completedAnswers.length ? "var(--text-muted)" : "var(--text-faint)",
                        whiteSpace: "nowrap",
                        transition: "color .25s",
                      }}>
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* scenario badge */}
              {selectedScenario && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "5px 10px", background: "color-mix(in srgb, var(--change-violet) 6%, var(--pure-white))", border: "1px solid color-mix(in srgb, var(--change-violet) 18%, var(--border-subtle))" }}>
                  <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: DIM_COLOR[selectedScenario.primaryDim] }} />
                  <span style={{ font: "600 10.5px var(--font-mono)", letterSpacing: ".09em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                    {t.scenario}: {selectedScenario.label}
                  </span>
                </div>
              )}

              {/* pregunta */}
              <h2 style={{ margin: "0 0 7px", font: "600 clamp(18px,1.9vw,24px)/1.12 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                {q.label}
              </h2>
              <p style={{ margin: "0 0 16px", font: "400 13.5px/1.55 var(--font-primary)", color: "var(--text-muted)", maxWidth: "44ch" }}>
                {q.micro}
              </p>

              {/* chips — dos por fila */}
              <div className="sim-chips" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                {chips.map((chip, i) => (
                  <div key={i} style={{ flex: "1 0 calc(50% - 4px)", minWidth: 0 }}>
                    <Chip
                      text={chip.text}
                      selected={currentChipIdx === i}
                      onClick={() => selectChip(i)}
                    />
                  </div>
                ))}
              </div>

              {/* textarea */}
              <textarea
                ref={textareaRef}
                rows={2}
                value={currentText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={q.placeholder}
                style={{
                  width: "100%",
                  background: "var(--field-surface)",
                  border: "1px solid var(--field-outline)",
                  boxShadow: "var(--field-shadow)",
                  color: "var(--field-text)",
                  font: "400 15px/1.5 var(--font-primary)",
                  padding: "11px 13px",
                  outline: "none",
                  borderRadius: 0,
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
              <p style={{ margin: "6px 0 0", font: "400 11.5px/1.4 var(--font-primary)", color: "var(--text-faint)" }}>
                {q.example}
              </p>

              {/* botones */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18 }}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={advanceStep}
                  disabled={!canAdvance}
                  style={{ opacity: canAdvance ? 1 : 0.45 }}
                >
                  {step < 4 ? t.next : t.seeDiag}
                </button>
                {step < 4 && (
                  <button
                    type="button"
                    onClick={skipStep}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "400 13px var(--font-primary)", color: "var(--text-faint)" }}
                  >
                    {t.skip}
                  </button>
                )}
              </div>
            </div>

            {/* columna derecha — lectura parcial */}
            <ReadingPanel answers={completedAnswers} lang={lang} />
          </div>
        </div>

        <style>{`
          @media (max-width: 760px) {
            .sim-quiz-card { grid-template-columns: 1fr !important; }
            .sim-quiz-card > div:last-child { border-top: 1px solid var(--border-subtle); border-right: none !important; }
          }
          @media (max-width: 540px) {
            .sim-chips > div { flex: 1 0 100% !important; }
          }
        `}</style>
      </section>
    );
  }

  /* ── RESULTADO ── */
  if (phase === "result" && reading) {
    return (
      <section ref={containerRef} style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)", scrollMarginTop: 80 }}>
        <div style={{ ...WRAP, padding: "clamp(56px,7vw,88px) 0" }}>
          <div style={{ maxWidth: 680, marginBottom: "clamp(32px,4vw,48px)" }}>
            <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
              {t.yourDiag}
            </span>
            <h2 style={{ margin: 0, font: "600 clamp(24px,3vw,42px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              {selectedScenario
                ? `${t.scenarioDiag}: ${selectedScenario.label}`
                : t.yourDecisionDiag}
            </h2>
          </div>

          <div className="sim-result-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,48px)", alignItems: "start", marginBottom: "clamp(40px,5vw,60px)" }}>
            <ResultCard reading={reading} lang={lang} />

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                {t.whatYouDescribed}
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

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, borderTop: "1px solid var(--border-subtle)", paddingTop: 32 }}>
            <button type="button" className="btn btn-primary" onClick={handleStartContact}>
              {t.workWithChange}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleRetry}>
              {t.tryAnother}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCopyReading}
              aria-live="polite"
              aria-label={copied ? t.copiedAria : t.copyAria}
              style={{ minWidth: 130 }}
            >
              {copied ? t.copied : t.copyDiag}
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
      <section ref={containerRef} style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)", scrollMarginTop: 80 }}>
        <div style={{ ...WRAP, padding: "clamp(56px,7vw,88px) 0" }}>
          <div className="sim-contact-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(44px,6vw,88px)", alignItems: "start" }}>
            <div>
              <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
                {t.nextStep}
              </span>
              <h2 style={{ margin: "0 0 16px", font: "600 clamp(24px,2.8vw,40px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                {t.contactH}
              </h2>
              <p style={{ margin: "0 0 28px", font: "400 15.5px/1.6 var(--font-primary)", color: "var(--text-muted)", maxWidth: "44ch" }}>
                {t.contactP}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {t.benefits.map(([h, p]) => (
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
                {t.seeDiagAgain}
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20, border: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: "clamp(28px,4vw,40px)" }}>
              <div>
                <label htmlFor="sim-nombre" style={LABEL_STYLE}>{t.nameL}</label>
                <input id="sim-nombre" type="text" autoComplete="name" required value={contact.nombre} onChange={(e) => setContact((c) => ({ ...c, nombre: e.target.value }))} placeholder={t.nameP} style={FIELD_STYLE} />
              </div>
              <div>
                <label htmlFor="sim-rol" style={LABEL_STYLE}>{t.roleL}</label>
                <input id="sim-rol" type="text" value={contact.rol} onChange={(e) => setContact((c) => ({ ...c, rol: e.target.value }))} placeholder={t.roleP} style={FIELD_STYLE} />
              </div>
              <div>
                <label htmlFor="sim-org" style={LABEL_STYLE}>{t.orgL}</label>
                <input id="sim-org" type="text" autoComplete="organization" value={contact.organizacion} onChange={(e) => setContact((c) => ({ ...c, organizacion: e.target.value }))} placeholder={t.orgP} style={FIELD_STYLE} />
              </div>
              <div>
                <label htmlFor="sim-correo" style={LABEL_STYLE}>{t.emailL}</label>
                <input id="sim-correo" type="email" autoComplete="email" required value={contact.correo} onChange={(e) => setContact((c) => ({ ...c, correo: e.target.value }))} placeholder={t.emailP} style={FIELD_STYLE} />
              </div>

              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

              <div style={{ paddingTop: 4, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
                <button type="submit" className="btn btn-primary" disabled={submitStatus === "submitting"} style={{ opacity: submitStatus === "submitting" ? 0.7 : 1 }}>
                  {submitStatus === "submitting" ? t.sending : t.sendCase}
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
      <section ref={containerRef} style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)", scrollMarginTop: 80 }}>
        <div style={{ ...WRAP, padding: "clamp(88px,12vw,160px) 0" }}>
          <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--success)", marginBottom: 14 }}>
            {t.received}
          </span>
          <h2 style={{ margin: "0 0 16px", font: "600 clamp(28px,3.8vw,52px)/1.04 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", maxWidth: "20ch", textWrap: "balance" }}>
            {t.sentH}
          </h2>
          <p style={{ margin: "0 0 16px", font: "400 16px/1.6 var(--font-primary)", color: "var(--text-muted)", maxWidth: "44ch" }}>
            {t.sentP}
          </p>
          {reading && (
            <p style={{ margin: "0 0 36px", font: "400 14px/1.5 var(--font-primary)", color: "var(--text-muted)", maxWidth: "44ch" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: DIM_COLOR[reading.primaryDim] }} />
                {t.readsAs1} <strong style={{ color: "var(--ink-graphite)", marginLeft: 3 }}>{DIM_LABEL[reading.primaryDim]}</strong>{t.readsAs2}
              </span>
            </p>
          )}
          <button type="button" className="btn btn-secondary" onClick={handleRetry}>
            {t.tryAnother}
          </button>
        </div>
      </section>
    );
  }

  return null;
}
