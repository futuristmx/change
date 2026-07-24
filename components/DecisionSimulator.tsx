"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import {
  SCENARIOS_ES, SCENARIOS_EN, QUESTIONS_ES, QUESTIONS_EN, CHIPS_ES, CHIPS_EN,
  buildPartialReading, buildFullReading, buildDecisionText,
  DIM_LABEL_ES, DIM_LABEL_EN, DIM_COLOR,
  type Scenario, type StepAnswer, type SimulatorReading,
} from "@/lib/decision-simulator";
import { track } from "@/lib/telemetry";
import { contactSchema } from "@/lib/contact-schema";
import { type Lang } from "@/lib/i18n";
import { exportSimulatorPdf } from "@/lib/simulator-pdf";

const DS_UI = {
  es: {
    boardDiag: "Diagnóstico del board", changePrefix: "Cambio", emergingTension: "Tensión emergente", domRisk: "Riesgo dominante", firstMove: "Primer movimiento", suggArtifact: "Artefacto sugerido",
    diagPlaceholder: "Tu diagnóstico aparece aquí conforme avanzas.",
    boardDiagChange: "Diagnóstico del board · Change", primaryMove: "Movimiento principal", tensionDetected: "Tensión detectada",
    introEyebrow: "Estructura tu decisión", introH: "Estructura una decisión atorada y recibe un diagnóstico.", introP: "Respondes cinco preguntas guiadas —con opciones sugeridas— y al final obtienes un diagnóstico: el movimiento del método que activa, la tensión, el riesgo y un primer paso concreto.",
    instrTag: "Instrumento interactivo", instrMeta: "5 preguntas · 2 min", pathEnd: "Diagnóstico", pathStart: "Inicio",
    step0Label: "Paso 0 · Elige tu punto de partida", step0Sub: "Hay dos maneras de entrar. Las dos llevan al mismo recorrido de cinco pasos.",
    optionA: "Opción A", optionARec: "Recomendada", ownTitle: "Tu propia decisión", ownDesc: "Describe la decisión que traes hoy en cinco pasos guiados y recibe su diagnóstico.",
    optionB: "Opción B", examplesTitle: "Explorar con un escenario de ejemplo", examplesDesc: "¿Aún no traes una decisión propia? Elige un caso típico: el recorrido llega precargado con respuestas que puedes editar en cada paso, y ves cómo trabaja el instrumento.",
    exHint: "Recorrido precargado →",
    or: "o",
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
    ready: "Diagnóstico listo", inProgress: "Diagnóstico en curso", revealLead: "Esto es lo que vimos en tu decisión.", primaryMoveLabel: "Movimiento principal del método",
    strategicRead: "Cómo lo leemos", resultNote: "Es una primera lectura estructurada de tu decisión. Una conversación con el board la vuelve precisa — no promete certeza, la trabaja.",
    downloadPdf: "Descargar PDF", downloadingPdf: "Generando…",
    pdfTitle: "Diagnóstico de decisión", pdfSteps: "Tu recorrido", pdfCta: "El siguiente paso: trabaja esta decisión con Change", pdfContact: "change.live · change.live/contacto", pdfFile: "Diagnostico-Change.pdf",
  },
  en: {
    boardDiag: "Board diagnosis", changePrefix: "Change", emergingTension: "Emerging tension", domRisk: "Dominant risk", firstMove: "First move", suggArtifact: "Suggested artifact",
    diagPlaceholder: "Your diagnosis appears here as you go.",
    boardDiagChange: "Board diagnosis · Change", primaryMove: "Primary move", tensionDetected: "Tension detected",
    introEyebrow: "Structure your decision", introH: "Structure a stuck decision and get a diagnosis.", introP: "You answer five guided questions —with suggested options— and at the end you get a diagnosis: the method move it activates, the tension, the risk, and a concrete first step.",
    instrTag: "Interactive instrument", instrMeta: "5 questions · 2 min", pathEnd: "Diagnosis", pathStart: "Start",
    step0Label: "Step 0 · Choose your starting point", step0Sub: "There are two ways in. Both lead to the same five-step path.",
    optionA: "Option A", optionARec: "Recommended", ownTitle: "Your own decision", ownDesc: "Describe the decision you're carrying today in five guided steps and get its diagnosis.",
    optionB: "Option B", examplesTitle: "Explore with an example scenario", examplesDesc: "Not carrying a decision yet? Pick a typical case: the path arrives preloaded with answers you can edit at every step, and you see how the instrument works.",
    exHint: "Preloaded path →",
    or: "or",
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
    ready: "Diagnosis ready", inProgress: "Diagnosis in progress", revealLead: "Here's what we saw in your decision.", primaryMoveLabel: "Primary method move",
    strategicRead: "How we read it", resultNote: "This is a first structured reading of your decision. A conversation with the board makes it precise — it doesn't promise certainty, it works on it.",
    downloadPdf: "Download PDF", downloadingPdf: "Generating…",
    pdfTitle: "Decision diagnosis", pdfSteps: "Your path", pdfCta: "Next step: work this decision with Change", pdfContact: "change.live · change.live/en/contacto", pdfFile: "Change-diagnosis.pdf",
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
        transition: "border-color var(--duration-fast), background var(--duration-fast), color var(--duration-fast)",
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
        <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
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
                <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 3 }}>
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
  const [pdfBusy, setPdfBusy] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLElement>(null);

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

  // Preselección por URL (?escenario=<id>): las tensiones del home y de /casos
  // llegan aquí con su escenario ya elegido — el visitante entra directo al
  // recorrido sin repetir la elección en el Paso 0.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = new URLSearchParams(window.location.search).get("escenario");
    if (!id) return;
    const sc = SCENARIOS.find((s) => s.id === id);
    if (sc) startScenario(sc);
    // Solo al montar: la URL de entrada no cambia durante la sesión del instrumento.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // El instrumento es UNA sola superficie: las fases se intercambian dentro de
  // la misma card, sin reposicionar la página. Solo aseguramos —de forma
  // instantánea y sin pelear con el smooth-scroll de Lenis— que la card siga a
  // la vista si quedó parcialmente fuera; nunca arrastramos al usuario.
  useEffect(() => {
    if (phase === "intro") return;
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.5) {
      el.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [phase]);

  async function handleExportPdf() {
    if (!reading || pdfBusy) return;
    setPdfBusy(true);
    track("simulator_pdf_exported", { primary_dim: reading.primaryDim });
    try {
      const dateStr = new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-MX", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
      await exportSimulatorPdf({
        title: t.pdfTitle,
        dateStr,
        stepsTitle: t.pdfSteps,
        steps: STEP_LABELS.map((label, i) => ({ label, answer: completedAnswers[i]?.text ?? "" })),
        primaryMoveLabel: t.primaryMoveLabel,
        primaryLabel: DIM_LABEL[reading.primaryDim],
        secondaryLabel: reading.secondaryDim ? DIM_LABEL[reading.secondaryDim] : null,
        methodNote: reading.methodNote,
        tensionLabel: t.tensionDetected, tension: reading.tension,
        riskLabel: t.domRisk, risk: reading.risk,
        firstMoveLabel: t.firstMove, firstMove: reading.firstMove,
        artifactLabel: t.suggArtifact, artifact: reading.artifact,
        ctaTitle: t.pdfCta,
        contactLine: t.pdfContact,
        fileName: t.pdfFile,
      });
    } catch { /* noop */ } finally {
      setPdfBusy(false);
    }
  }

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

  /* ═══════════════════════════════════════════════════════
     RENDER — una sola superficie-instrumento; las fases se
     intercambian dentro de la misma card (sin saltos).
  ═══════════════════════════════════════════════════════ */
  const dotStyle = (c: string): React.CSSProperties => ({ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 });

  const simCss = `
    .sim-start { margin-top: clamp(22px,2.8vw,30px); height: 50px; padding: 0 26px; font-size: 15px; }
    .sim-ex-card { transition: border-color var(--duration-fast) var(--ease-premium), box-shadow var(--duration-fast) var(--ease-premium), transform var(--duration-fast) var(--ease-premium); }
    .sim-ex-card:hover { border-color: var(--change-violet); box-shadow: 0 10px 26px color-mix(in srgb, var(--change-violet) 14%, transparent); transform: translateY(-2px); }
    .sim-ex-card:hover .sim-ex-hint { color: var(--soft-violet); }
    .sim-path { display: flex; align-items: flex-start; gap: 0; margin: clamp(22px,3vw,30px) 0 0; }
    .sim-path-node { display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0; text-align: center; }
    .sim-path-dot { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; border: 1.5px solid var(--soft-stone-gray); color: var(--text-muted); font: 600 12px var(--font-mono); background: var(--surface-card); }
    .sim-path-label { font: 600 11px var(--font-mono); letter-spacing: .07em; text-transform: uppercase; color: var(--text-faint); max-width: 10ch; line-height: 1.25; }
    .sim-path-line { flex: 1 1 auto; min-width: 12px; height: 2px; margin: 14px 3px 0; background: var(--soft-stone-gray); opacity: .5; }
    .sim-path-line-end { background: linear-gradient(90deg, var(--soft-stone-gray), var(--change-violet)); opacity: .8; }
    .sim-path-dot-end { border: none; background: var(--change-violet); box-shadow: 0 6px 18px color-mix(in srgb, var(--change-violet) 32%, transparent); }
    .sim-path-label-end { color: var(--change-violet); font-weight: 700; }
    .sim-path-dot-start { border-color: var(--change-violet); color: var(--change-violet); box-shadow: 0 0 0 3px color-mix(in srgb, var(--change-violet) 14%, transparent); }
    .sim-path-label-start { color: var(--change-violet); font-weight: 700; }
    .sim-own { display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%; text-align: left; cursor: pointer; padding: 18px 20px; border: 1px solid var(--change-violet); border-left: 3px solid var(--change-violet); background: color-mix(in srgb, var(--change-violet) 5%, var(--surface-card)); transition: background var(--duration-fast) var(--ease-premium), box-shadow var(--duration-fast) var(--ease-premium), transform var(--duration-fast) var(--ease-premium); }
    .sim-own:hover { background: color-mix(in srgb, var(--change-violet) 9%, var(--surface-card)); box-shadow: 0 10px 26px color-mix(in srgb, var(--change-violet) 16%, transparent); transform: translateY(-2px); }
    .sim-own:focus-visible { outline: 2px solid var(--soft-violet); outline-offset: 2px; }
    .sim-own-arrow { flex-shrink: 0; color: var(--change-violet); font-size: 20px; transition: transform var(--duration-fast) var(--ease-premium); }
    .sim-own:hover .sim-own-arrow { transform: translateX(3px); }

    /* Intro modular — los bloques entran por fases desde arriba: qué es → recorrido → Paso 0 → Opción A → o → Opción B */
    .sim-stage { display: flex; flex-direction: column; gap: clamp(22px,2.8vw,30px); }
    .sim-stage > * { opacity: 0; transform: translateY(12px); animation: sim-rise .55s var(--ease-premium) forwards; }
    .sim-stage > *:nth-child(1) { animation-delay: .05s; }
    .sim-stage > *:nth-child(2) { animation-delay: .22s; }
    .sim-stage > *:nth-child(3) { animation-delay: .4s; }
    .sim-stage > *:nth-child(4) { animation-delay: .56s; }
    .sim-stage > *:nth-child(5) { animation-delay: .7s; }
    .sim-stage > *:nth-child(6) { animation-delay: .84s; }
    .sim-opt-tag { display: inline-block; margin-bottom: 10px; font: 600 var(--text-meta) var(--font-mono); letter-spacing: .12em; text-transform: uppercase; }
    .sim-exwrap { border: 1px solid var(--border-subtle); background: rgba(255,255,255,.55); padding: clamp(18px,2.4vw,24px); }

    .sim-quiz { display: grid; grid-template-columns: 1fr 248px; }
    .sim-quiz-q { padding-right: clamp(20px,2.4vw,30px); }
    .sim-quiz-side { border-left: 1px solid var(--border-subtle); }
    .sim-chips > div { flex: 1 0 calc(50% - 4px); min-width: 0; }

    .sim-reveal > * { opacity: 0; transform: translateY(10px); animation: sim-rise .6s var(--ease-premium) forwards; }
    .sim-reveal > *:nth-child(1) { animation-delay: .04s; }
    .sim-reveal > *:nth-child(2) { animation-delay: .12s; }
    .sim-reveal > *:nth-child(3) { animation-delay: .2s; }
    .sim-reveal > *:nth-child(4) { animation-delay: .32s; }
    .sim-reveal > *:nth-child(5) { animation-delay: .44s; }
    .sim-reveal > *:nth-child(6) { animation-delay: .54s; }
    @keyframes sim-rise { to { opacity: 1; transform: none; } }
    .sim-hero { position: relative; overflow: hidden; padding: clamp(24px,3vw,34px); background: radial-gradient(circle at 82% -10%, color-mix(in srgb, var(--change-violet) 28%, transparent), transparent 55%), var(--surface-dark-secondary); border-left: 3px solid var(--change-violet); }
    .sim-layers { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border-subtle); border: 1px solid var(--border-subtle); }
    .sim-layer { background: var(--surface-card); padding: 20px 22px; }
    .sim-layer-key { background: color-mix(in srgb, var(--change-violet) 5%, var(--surface-card)); }
    .sim-recap { margin-top: 6px; border: 1px solid var(--border-subtle); background: rgba(255,255,255,.5); }
    .sim-recap > summary { cursor: pointer; list-style: none; padding: 14px 18px; font: 600 var(--text-meta) var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between; }
    .sim-recap > summary::-webkit-details-marker { display: none; }
    .sim-recap[open] > summary { border-bottom: 1px solid var(--border-subtle); }
    .sim-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }

    @media (max-width: 760px) {
      .sim-quiz { grid-template-columns: 1fr; }
      .sim-quiz-q { padding-right: 0; }
      .sim-quiz-side { border-left: none; border-top: 1px solid var(--border-subtle); margin-top: 18px; }
      .sim-layers { grid-template-columns: 1fr; }
    }
    @media (max-width: 720px) { .sim-intro-grid { grid-template-columns: 1fr !important; } .sim-contact-grid { grid-template-columns: 1fr !important; } }
    @media (max-width: 640px) { .sim-focal { grid-template-columns: 1fr !important; gap: 18px !important; } }
    @media (max-width: 560px) {
      .sim-path-label { display: none; } .sim-path-label-end { display: block !important; }
      .sim-path-dot { width: 26px; height: 26px; } .sim-path-line { margin-top: 12px; }
      .sim-chips > div { flex: 1 0 100%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .sim-ex-card { transition: none; } .sim-ex-card:hover { transform: none; }
      .sim-own { transition: none; } .sim-own:hover { transform: none; } .sim-own:hover .sim-own-arrow { transform: none; }
      .sim-reveal > * { animation: none; opacity: 1; transform: none; }
      .sim-stage > * { animation: none; opacity: 1; transform: none; }
    }
  `;

  const shell = (opts: { barLeft: React.ReactNode; barRight?: React.ReactNode; progress?: number | null; wide?: boolean; body: React.ReactNode }) => (
    <section ref={containerRef} className="sim-sec" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)", scrollMarginTop: 96 }}>
      <div style={{ ...WRAP, padding: "clamp(48px,6vw,80px) 0" }}>
        <div className="sim-card" style={{ maxWidth: opts.wide ? 960 : 880, margin: "0 auto", border: "1px solid var(--border-subtle)", background: "linear-gradient(155deg,rgba(255,255,255,.96),rgba(244,242,250,.66))", boxShadow: "0 30px 80px rgba(31,17,72,.07)" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "14px 22px", borderBottom: "1px solid var(--border-subtle)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>{opts.barLeft}</span>
            {opts.barRight != null && <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{opts.barRight}</span>}
            {typeof opts.progress === "number" && (
              <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "rgba(46,46,51,.08)" }}>
                <span style={{ display: "block", height: "100%", width: `${Math.round(opts.progress * 100)}%`, background: "linear-gradient(90deg,var(--signal-cyan),var(--change-violet))", transition: "width var(--duration-enter) var(--ease-premium)" }} />
              </span>
            )}
          </div>
          <div style={{ padding: "clamp(26px,3.4vw,40px)" }}>{opts.body}</div>
        </div>
      </div>
      <style>{simCss}</style>
    </section>
  );

  /* ── INTRO ── */
  if (phase === "intro") {
    return shell({
      barLeft: <><span data-pulse aria-hidden="true" style={dotStyle("var(--change-violet)")} /> {t.instrTag}</>,
      barRight: t.instrMeta,
      body: (
        <div className="sim-stage">
          {/* Módulo 1 — qué es el instrumento */}
          <div>
            <h2 style={{ margin: "0 0 14px", maxWidth: "24ch", font: "600 clamp(24px,3vw,40px)/1.07 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              {t.introH}
            </h2>
            <p style={{ margin: 0, maxWidth: "60ch", font: "400 clamp(15px,1.3vw,17px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
              {t.introP}
            </p>
          </div>

          {/* Módulo 2 — preview del recorrido: Paso 0 → 5 pasos → Diagnóstico */}
          <div className="sim-path" aria-hidden="true" style={{ margin: 0 }}>
            <span className="sim-path-node">
              <span className="sim-path-dot sim-path-dot-start">0</span>
              <span className="sim-path-label sim-path-label-start">{t.pathStart}</span>
            </span>
            {STEP_LABELS.map((label, i) => (
              <Fragment key={i}>
                <span className="sim-path-line" />
                <span className="sim-path-node">
                  <span className="sim-path-dot">{i + 1}</span>
                  <span className="sim-path-label">{label}</span>
                </span>
              </Fragment>
            ))}
            <span className="sim-path-line sim-path-line-end" />
            <span className="sim-path-node">
              <span className="sim-path-dot sim-path-dot-end">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--text-inverse)" }} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span className="sim-path-label sim-path-label-end">{t.pathEnd}</span>
            </span>
          </div>

          {/* Módulo 3 — Paso 0: encabezado del punto de partida */}
          <div style={{ paddingTop: "clamp(22px,2.8vw,28px)", borderTop: "1px solid var(--border-subtle)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--change-violet)" }}>
              <span aria-hidden="true" style={dotStyle("var(--change-violet)")} />{t.step0Label}
            </span>
            <p style={{ margin: "8px 0 0", font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)", maxWidth: "52ch" }}>{t.step0Sub}</p>
          </div>

          {/* Módulo 4 — Opción A: tu propia decisión */}
          <div>
            <span className="sim-opt-tag" style={{ color: "var(--change-violet)" }}>
              {t.optionA} <span style={{ color: "var(--text-faint)", fontWeight: 500 }}>· {t.optionARec}</span>
            </span>
            <button type="button" className="sim-own" onClick={startCustom}>
              <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <strong style={{ font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{t.ownTitle}</strong>
                <span style={{ font: "400 13.5px/1.45 var(--font-primary)", color: "var(--text-muted)" }}>{t.ownDesc}</span>
              </span>
              <span aria-hidden="true" className="sim-own-arrow">→</span>
            </button>
          </div>

          {/* Divisor "o" */}
          <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            <span style={{ font: "600 12px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{t.or}</span>
            <span style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
          </div>

          {/* Módulo 5 — Opción B: escenarios de ejemplo (explicados) */}
          <div className="sim-exwrap">
            <span className="sim-opt-tag" style={{ color: "var(--text-muted)" }}>{t.optionB}</span>
            <strong style={{ display: "block", font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{t.examplesTitle}</strong>
            <p style={{ margin: "6px 0 16px", font: "400 13.5px/1.55 var(--font-primary)", color: "var(--text-muted)", maxWidth: "62ch" }}>{t.examplesDesc}</p>
            <div className="sim-intro-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => startScenario(sc)}
                  className="sim-ex-card"
                  style={{ display: "flex", flexDirection: "column", gap: 8, padding: "16px 16px", background: "var(--pure-white)", border: "1px solid var(--border-subtle)", cursor: "pointer", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span aria-hidden="true" style={dotStyle(DIM_COLOR[sc.primaryDim])} />
                    <span style={{ font: "600 13.5px var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>{sc.label}</span>
                  </div>
                  <p style={{ margin: 0, font: "400 12.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{sc.description}</p>
                  <span className="sim-ex-hint" style={{ marginTop: "auto", font: "600 11px var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)", transition: "color var(--duration-fast) var(--ease-premium)" }}>{t.exHint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    });
  }

  /* ── QUIZ ── */
  if (phase === "quiz") {
    const q = QUESTIONS[step];
    const chips = CHIPS[step];
    const canAdvance = currentText.trim().length >= 3;

    return shell({
      barLeft: <><span data-pulse aria-hidden="true" style={dotStyle("var(--change-violet)")} /> {t.inProgress}</>,
      barRight: `${step + 1} ${t.of} 5`,
      progress: (step + 1) / 5,
      body: (
        <div className="sim-quiz" style={{ display: "grid", gridTemplateColumns: "1fr 248px" }}>
            {/* columna izquierda — pregunta */}
            <div className="sim-quiz-q">

              {/* back */}
              <div style={{ marginBottom: 16 }}>
                <button
                  type="button"
                  onClick={handleRetry}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "400 13px var(--font-primary)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}
                >
                  <span aria-hidden="true" style={{ fontSize: 14 }}>←</span>
                  {selectedScenario ? t.changeScenario : t.back}
                </button>
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
                        transition: "background var(--duration-standard)",
                      }} />
                    )}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                        background: i < completedAnswers.length ? "var(--change-violet)" : "var(--surface-card)",
                        border: `2px solid ${i < completedAnswers.length ? "var(--change-violet)" : i === step ? "var(--change-violet)" : "var(--border-subtle)"}`,
                        transition: "background var(--duration-standard), border-color var(--duration-standard)",
                        boxShadow: i === step ? "0 0 0 3px color-mix(in srgb, var(--change-violet) 15%, transparent)" : "none",
                      }} />
                      <span style={{
                        font: "600 11px var(--font-mono)",
                        letterSpacing: ".05em",
                        textTransform: "uppercase",
                        color: i === step ? "var(--change-violet)" : i < completedAnswers.length ? "var(--text-muted)" : "var(--text-faint)",
                        whiteSpace: "nowrap",
                        transition: "color var(--duration-standard)",
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
                  <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".09em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
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

            {/* columna derecha — lectura parcial (diagnóstico en vivo) */}
            <div className="sim-quiz-side">
              <ReadingPanel answers={completedAnswers} lang={lang} />
            </div>
        </div>
      ),
    });
  }

  /* ── RESULTADO ── */
  if (phase === "result" && reading) {
    return shell({
      wide: true,
      barLeft: <><span data-pulse aria-hidden="true" style={dotStyle("var(--success)")} /> {t.ready}</>,
      progress: 1,
      body: (
        <div className="sim-reveal" style={{ display: "flex", flexDirection: "column", gap: "clamp(22px,2.8vw,30px)" }}>
          {/* Encabezado de revelación */}
          <div>
            <span style={{ display: "block", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>{t.yourDiag}</span>
            <h2 style={{ margin: 0, font: "600 clamp(24px,3vw,40px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              {selectedScenario ? `${t.scenarioDiag}: ${selectedScenario.label}` : t.yourDecisionDiag}
            </h2>
            <p style={{ margin: "10px 0 0", maxWidth: "56ch", font: "400 clamp(15px,1.3vw,17px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.revealLead}</p>
          </div>

          {/* Focal — el movimiento principal como RESULTADO (figura, relevancia) */}
          <div className="sim-focal" style={{ display: "grid", gridTemplateColumns: "minmax(0,auto) minmax(0,1fr)", gap: "clamp(24px,4vw,52px)", alignItems: "center", paddingBottom: "clamp(24px,3vw,30px)", borderBottom: "1px solid var(--border-subtle)" }}>
            <div>
              <span style={{ display: "block", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 10 }}>{t.primaryMoveLabel}</span>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 13 }}>
                <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: DIM_COLOR[reading.primaryDim], flexShrink: 0 }} />
                <span style={{ font: "300 clamp(40px,5.4vw,66px)/.92 var(--font-primary)", letterSpacing: "-.04em", background: "var(--gradient-type-electric)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{DIM_LABEL[reading.primaryDim]}</span>
              </div>
              {reading.secondaryDim && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12, font: "400 14px var(--font-primary)", color: "var(--text-muted)" }}>
                  <span aria-hidden="true" style={{ color: "var(--text-faint)" }}>+</span>
                  <span aria-hidden="true" style={dotStyle(DIM_COLOR[reading.secondaryDim])} />{DIM_LABEL[reading.secondaryDim]}
                </span>
              )}
            </div>
            <div>
              <p style={{ margin: 0, font: "400 clamp(15px,1.4vw,17px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{reading.methodNote}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 16, padding: "9px 14px", border: `1px solid ${DIM_COLOR[reading.primaryDim]}`, background: "var(--surface-card)" }}>
                <span aria-hidden="true" style={dotStyle(DIM_COLOR[reading.primaryDim])} />
                <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-faint)" }}>{t.suggArtifact}</span>
                <span style={{ font: "600 14px var(--font-primary)", color: "var(--ink-graphite)" }}>{reading.artifact}</span>
              </span>
            </div>
          </div>

          {/* Lectura estratégica — bloque con relevancia (como el punto vulnerable del Score) */}
          <div style={{ border: "1px solid var(--border-subtle)", borderLeft: "3px solid var(--change-violet)", background: "var(--gradient-sky-pearl)", padding: "clamp(22px,2.6vw,28px) clamp(22px,2.6vw,28px)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)", marginBottom: 14 }}>
              <span aria-hidden="true" style={dotStyle("var(--change-violet)")} />{t.strategicRead}
            </span>
            <p style={{ margin: "0 0 10px", font: "400 15px/1.55 var(--font-primary)", color: "var(--deep-warm-gray)" }}><strong style={{ fontWeight: 600, color: "var(--ink-graphite)" }}>{t.tensionDetected}: </strong>{reading.tension}</p>
            <p style={{ margin: "0 0 10px", font: "400 15px/1.55 var(--font-primary)", color: "var(--deep-warm-gray)" }}><strong style={{ fontWeight: 600, color: "var(--ink-graphite)" }}>{t.domRisk}: </strong>{reading.risk}</p>
            <p style={{ margin: 0, font: "400 15px/1.55 var(--font-primary)", color: "var(--deep-warm-gray)" }}><strong style={{ fontWeight: 600, color: "var(--change-violet)" }}>{t.firstMove}: </strong><strong style={{ fontWeight: 600, color: "var(--ink-graphite)" }}>{reading.firstMove}</strong></p>
          </div>

          <p style={{ margin: 0, font: "400 13px/1.5 var(--font-primary)", color: "var(--text-faint)" }}>{t.resultNote}</p>

          {/* Recap — refuerza que trabajó SOBRE su input */}
          <details className="sim-recap">
            <summary>{t.whatYouDescribed}<span aria-hidden="true" style={{ color: "var(--change-violet)" }}>▾</span></summary>
            <div style={{ padding: "6px 18px 16px" }}>
              {completedAnswers.map((a, i) => a.text ? (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
                  <span style={{ flexShrink: 0, font: "600 11px var(--font-mono)", color: "var(--text-faint)", marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 3 }}>{STEP_LABELS[i]}</span>
                    <span style={{ font: "400 14px/1.5 var(--font-primary)", color: "var(--ink-graphite)" }}>{a.text}</span>
                  </div>
                </div>
              ) : null)}
            </div>
          </details>

          {/* Acciones */}
          <div className="sim-actions" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "clamp(22px,2.6vw,28px)" }}>
            <button type="button" className="btn btn-primary" onClick={handleStartContact}>{t.workWithChange}</button>
            <button type="button" className="btn btn-secondary" onClick={handleExportPdf} disabled={pdfBusy} style={{ opacity: pdfBusy ? 0.7 : 1 }}>{pdfBusy ? t.downloadingPdf : t.downloadPdf}</button>
            <button type="button" className="btn btn-secondary" onClick={handleCopyReading} aria-live="polite" aria-label={copied ? t.copiedAria : t.copyAria}>{copied ? t.copied : t.copyDiag}</button>
            <button type="button" onClick={handleRetry} style={{ background: "none", border: "none", padding: "0 6px", cursor: "pointer", font: "500 13px var(--font-primary)", color: "var(--text-muted)" }}>{t.tryAnother}</button>
          </div>
        </div>
      ),
    });
  }

  /* ── CONTACTO ── */
  if (phase === "contact") {
    return shell({
      wide: true,
      barLeft: <><span aria-hidden="true" style={dotStyle("var(--change-violet)")} /> {t.nextStep}</>,
      progress: 1,
      body: (
          <div className="sim-contact-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(36px,5vw,64px)", alignItems: "start" }}>
            <div>
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
      ),
    });
  }

  /* ── ENVIADO ── */
  if (phase === "sent") {
    return shell({
      barLeft: <><span aria-hidden="true" style={dotStyle("var(--success)")} /> {t.received}</>,
      progress: 1,
      body: (
        <div style={{ padding: "clamp(8px,2vw,24px) 0" }}>
          <h2 style={{ margin: "0 0 16px", font: "600 clamp(26px,3.4vw,44px)/1.05 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", maxWidth: "20ch", textWrap: "balance" }}>
            {t.sentH}
          </h2>
          <p style={{ margin: "0 0 16px", font: "400 16px/1.6 var(--font-primary)", color: "var(--text-muted)", maxWidth: "48ch" }}>
            {t.sentP}
          </p>
          {reading && (
            <p style={{ margin: "0 0 32px", font: "400 14px/1.5 var(--font-primary)", color: "var(--text-muted)", maxWidth: "48ch" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: DIM_COLOR[reading.primaryDim] }} />
                {t.readsAs1} <strong style={{ color: "var(--ink-graphite)", marginLeft: 3 }}>{DIM_LABEL[reading.primaryDim]}</strong>{t.readsAs2}
              </span>
            </p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button type="button" className="btn btn-secondary" onClick={handleExportPdf} disabled={pdfBusy} style={{ opacity: pdfBusy ? 0.7 : 1 }}>{pdfBusy ? t.downloadingPdf : t.downloadPdf}</button>
            <button type="button" onClick={handleRetry} style={{ background: "none", border: "none", padding: "0 6px", cursor: "pointer", font: "500 13px var(--font-primary)", color: "var(--text-muted)" }}>{t.tryAnother}</button>
          </div>
        </div>
      ),
    });
  }

  return null;
}
