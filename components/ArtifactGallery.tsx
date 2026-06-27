"use client";

import { useEffect, useState } from "react";
import { Glyph, InlineTooltip, type GlyphName } from "@/components/ds";
import { type Lang } from "@/lib/i18n";

// Glyph y tip por ÍNDICE — las arrays ES/EN son paralelas, así el icono y
// el diagrama no dependen del texto traducido.
const ART_GLYPHS: GlyphName[] = ["read", "risk", "decision", "project", "project", "status", "nav", "status"];
const ART_TIPS = {
  es: [
    "Detectar y nombrar lo que se mueve en el entorno antes de que se vuelva urgencia.",
    "Convertir señales dispersas en sentido accionable para esta organización.",
    "Hacer explícito el criterio de elección antes de comprometer recursos.",
    "Convertir el criterio en movimientos concretos que el equipo puede ejecutar.",
    "Convertir el criterio en movimientos concretos que el equipo puede ejecutar.",
    "Mantener la capacidad construida viva entre decisiones.",
    "Activa varios movimientos del arco del método según el reto de la sesión.",
    "Mantener la capacidad construida viva entre decisiones.",
  ],
  en: [
    "Spot and name what's moving in the environment before it turns into urgency.",
    "Turn scattered signals into actionable meaning for this organization.",
    "Make the choice criteria explicit before committing resources.",
    "Turn criteria into concrete moves the team can execute.",
    "Turn criteria into concrete moves the team can execute.",
    "Keep the capacity you've built alive between decisions.",
    "Activates several moves of the method's arc depending on the session's challenge.",
    "Keep the capacity you've built alive between decisions.",
  ],
};
const ART_UI = {
  es: { open: "Ver detalle →", close: "Cerrar ↑", detail: "Detalle" },
  en: { open: "View detail →", close: "Close ↑", detail: "Detail" },
};
const COL_LABELS = {
  es: { pregunta: "Pregunta que responde", deja: "Qué deja", riesgo: "Riesgo que reduce", decision: "Decisión que habilita" },
  en: { pregunta: "Question it answers", deja: "What it leaves", riesgo: "Risk it reduces", decision: "Decision it enables" },
};

interface Artifact {
  h: string;
  k: string;
  c: string;
  p: string;
  pregunta: string;
  cuando: string;
  deja: string;
  method: string;
  riesgo: string;
  decision: string;
}

const ARTIFACTS_ES: Artifact[] = [
  {
    h: "Radar de señales",
    k: "Leer",
    c: "var(--signal-cyan)",
    p: "El mapa de lo que se mueve en tu entorno y todavía no es evidente.",
    pregunta: "¿Qué está cambiando en el entorno que todavía no tiene nombre en tu organización?",
    cuando: "Cuando algo se siente diferente pero nadie puede nombrarlo todavía — antes de que se vuelva urgencia.",
    deja: "Una lista de señales priorizadas con criterio de interpretación: qué mirar, con qué frecuencia y quién interpreta.",
    method: "Activa el primer movimiento del método: Leer. El trabajo empieza aquí.",
    riesgo: "Reaccionar tarde. Que la urgencia decida por ti antes de que hayas elegido.",
    decision: "Qué señales merecen atención estratégica — y cuáles son ruido que no vale perseguir.",
  },
  {
    h: "Mapa de tensiones",
    k: "Interpretar",
    c: "var(--soft-violet)",
    p: "Las fuerzas en contradicción que definen el campo donde vas a decidir.",
    pregunta: "¿Qué fuerzas se contraponen en esta decisión y dónde está el conflicto real — no el que parece?",
    cuando: "Cuando hay información pero no hay acuerdo sobre qué significa para esta organización en particular.",
    deja: "Las tensiones nombradas y ordenadas — el campo de decisión visible antes de tomar posición.",
    method: "Activa Interpretar: convierte señales dispersas en sentido accionable para la organización.",
    riesgo: "Decidir sobre el síntoma. Confundir el conflicto visible con el conflicto real.",
    decision: "Dónde está el conflicto que importa — y cuál es la tensión que la decisión debe resolver.",
  },
  {
    h: "Matriz de decisión",
    k: "Decidir",
    c: "var(--change-violet)",
    p: "Los criterios y sacrificios de cada camino, explícitos sobre la mesa.",
    pregunta: "¿Qué ganamos, qué sacrificamos y por qué — antes de comprometer recursos?",
    cuando: "Cuando hay opciones válidas pero no hay criterios explícitos para elegir entre ellas.",
    deja: "Los criterios documentados, los sacrificios visibles y la elección defendible ante cualquier interlocutor.",
    method: "Activa Decidir: hace el criterio explícito y sostenible para la próxima vez.",
    riesgo: "Elegir sin criterio y no poder explicar por qué. Reabrir la discusión cada vez que aparece presión.",
    decision: "Qué opción se elige — y qué criterio hace esa elección defendible en el tiempo.",
  },
  {
    h: "Roadmap vivo",
    k: "Diseñar",
    c: "var(--change-violet)",
    p: "La secuencia de movimientos que se actualiza conforme cambian las condiciones.",
    pregunta: "¿Cómo baja la decisión a movimientos concretos que el equipo puede ejecutar esta semana?",
    cuando: "Cuando la decisión existe como intención pero no tiene forma en el día a día del equipo.",
    deja: "Una secuencia de pasos con responsables, condiciones de revisión y primer movimiento definido.",
    method: "Activa Diseñar: convierte el criterio en plan ejecutable con su lógica visible.",
    riesgo: "Que la decisión muera en el deck. Que la urgencia operativa desplace lo que se decidió hacer.",
    decision: "Cuál es el primer movimiento — y qué condición dispara la revisión del plan.",
  },
  {
    h: "Reporte ejecutivo",
    k: "Diseñar",
    c: "var(--opportunity-orange)",
    p: "La síntesis que lleva la decisión al lenguaje del consejo y de quien firma.",
    pregunta: "¿Cómo lleva el diagnóstico al lenguaje de quien tiene que aprobar y de quien tiene que implementar?",
    cuando: "Cuando la decisión está tomada pero necesita ser comunicada y defendida hacia el board o la dirección.",
    deja: "Una síntesis ejecutiva con los criterios y sacrificios visibles, lista para presentar.",
    method: "Activa Diseñar en modo comunicación: la decisión en el formato que mueve.",
    riesgo: "Que quien aprueba no entienda el razonamiento y la decisión se pierda en el camino.",
    decision: "Cómo se presenta el criterio para que quien no estuvo en la sala pueda sostenerlo.",
  },
  {
    h: "Field Note",
    k: "Sostener",
    c: "var(--signal-cyan)",
    p: "El registro corto de lo aprendido en el camino, para que el juicio no se pierda.",
    pregunta: "¿Qué aprendió la organización en esta decisión y cómo se guarda para que valga la próxima vez?",
    cuando: "Al cierre de un proyecto o decisión importante, antes de que el equipo se disperse.",
    deja: "Un registro estructurado del juicio usado: qué se consideró, qué se descartó y por qué.",
    method: "Activa Sostener: convierte el aprendizaje puntual en memoria institucional acumulable.",
    riesgo: "Que el aprendizaje se quede en la cabeza de quien lo vivió y no viaje con la organización.",
    decision: "Qué criterio queda documentado para que la próxima decisión no empiece de cero.",
  },
  {
    h: "Workshop instrumentado",
    k: "Transversal",
    c: "var(--human-pink)",
    p: "Una sesión que no termina en post-its: termina en un artefacto que decide.",
    pregunta: "¿Cómo alinea a un equipo en torno a una decisión compleja sin que la sesión se pierda en el aire?",
    cuando: "Cuando la decisión involucra múltiples perspectivas y necesita que el equipo la construya, no solo la reciba.",
    deja: "No post-its: uno de los artefactos del método, construido colectivamente en sesión y listo para usarse.",
    method: "Puede activar cualquier movimiento del arco según la sesión — es el formato, no el contenido.",
    riesgo: "Gastar energía colectiva en un espacio que no produce criterio ni artefacto accionable.",
    decision: "Cómo hacer que el juicio colectivo se convierta en algo que la organización pueda usar y sostener.",
  },
  {
    h: "Mission Control",
    k: "Sostener",
    c: "var(--ink-graphite)",
    p: "La infraestructura de memoria estratégica donde la capacidad permanece viva entre decisiones.",
    pregunta: "¿Cómo permanece viva la capacidad de decisión después de que el trabajo termina?",
    cuando: "Cuando la organización ya tomó decisiones y quiere que el aprendizaje no se pierda al crecer.",
    deja: "Una infraestructura de memoria viva: señales, tensiones, decisiones y aprendizajes conectados en un sistema.",
    method: "Es el destino de todos los artefactos del método: donde la capacidad se sostiene entre decisiones.",
    riesgo: "Que la capacidad construida dependa de las personas que la construyeron — y se vaya con ellas.",
    decision: "Cómo sostener el criterio en el tiempo para que la organización no vuelva a empezar de cero.",
  },
];

const ARTIFACTS_EN: Artifact[] = [
  {
    h: "Signal radar", k: "Read", c: "var(--signal-cyan)",
    p: "The map of what's moving around you that isn't obvious yet.",
    pregunta: "What's changing in the environment that doesn't have a name in your organization yet?",
    cuando: "When something feels different but no one can name it yet — before it becomes urgency.",
    deja: "A prioritized list of signals with criteria for reading them: what to watch, how often, and who interprets.",
    method: "Activates the method's first move: Read. The work starts here.",
    riesgo: "Reacting late. Letting urgency decide for you before you've chosen.",
    decision: "Which signals deserve strategic attention — and which are noise not worth chasing.",
  },
  {
    h: "Tension map", k: "Interpret", c: "var(--soft-violet)",
    p: "The forces in contradiction that define the field where you'll decide.",
    pregunta: "What forces pull against each other in this decision, and where is the real conflict — not the apparent one?",
    cuando: "When there's information but no agreement on what it means for this organization in particular.",
    deja: "The tensions named and ordered — the decision field made visible before you take a position.",
    method: "Activates Interpret: turns scattered signals into actionable meaning for the organization.",
    riesgo: "Deciding on the symptom. Mistaking the visible conflict for the real one.",
    decision: "Where the conflict that matters lies — and which tension the decision must resolve.",
  },
  {
    h: "Decision matrix", k: "Decide", c: "var(--change-violet)",
    p: "The criteria and trade-offs of each path, explicit on the table.",
    pregunta: "What do we gain, what do we sacrifice, and why — before committing resources?",
    cuando: "When there are valid options but no explicit criteria to choose between them.",
    deja: "The criteria documented, the trade-offs visible, and the choice defensible to any interlocutor.",
    method: "Activates Decide: makes the criteria explicit and sustainable for next time.",
    riesgo: "Choosing without criteria and being unable to explain why. Reopening the discussion every time pressure appears.",
    decision: "Which option is chosen — and what criteria makes that choice defensible over time.",
  },
  {
    h: "Living roadmap", k: "Design", c: "var(--change-violet)",
    p: "The sequence of moves that updates as conditions change.",
    pregunta: "How does the decision come down to concrete moves the team can execute this week?",
    cuando: "When the decision exists as intention but has no shape in the team's day to day.",
    deja: "A sequence of steps with owners, review conditions, and a defined first move.",
    method: "Activates Design: turns criteria into an executable plan with its logic visible.",
    riesgo: "Letting the decision die in the deck. Letting operational urgency push aside what was decided.",
    decision: "What the first move is — and what condition triggers the plan's review.",
  },
  {
    h: "Executive report", k: "Design", c: "var(--opportunity-orange)",
    p: "The synthesis that brings the decision into the language of the board and whoever signs.",
    pregunta: "How do you bring the diagnosis into the language of whoever has to approve it and whoever has to implement it?",
    cuando: "When the decision is made but needs to be communicated and defended to the board or leadership.",
    deja: "An executive synthesis with the criteria and trade-offs visible, ready to present.",
    method: "Activates Design in communication mode: the decision in the format that moves people.",
    riesgo: "Whoever approves doesn't grasp the reasoning and the decision gets lost on the way.",
    decision: "How the criteria is presented so someone who wasn't in the room can stand behind it.",
  },
  {
    h: "Field Note", k: "Sustain", c: "var(--signal-cyan)",
    p: "The short record of what was learned along the way, so the judgment isn't lost.",
    pregunta: "What did the organization learn in this decision, and how is it kept so it counts next time?",
    cuando: "At the close of a project or important decision, before the team disperses.",
    deja: "A structured record of the judgment used: what was considered, what was discarded, and why.",
    method: "Activates Sustain: turns one-off learning into institutional memory that compounds.",
    riesgo: "Letting the learning stay in the head of whoever lived it and not travel with the organization.",
    decision: "What criteria stays documented so the next decision doesn't start from zero.",
  },
  {
    h: "Instrumented workshop", k: "Cross-cutting", c: "var(--human-pink)",
    p: "A session that doesn't end in sticky notes: it ends in an artifact that decides.",
    pregunta: "How do you align a team around a complex decision without the session evaporating into thin air?",
    cuando: "When the decision involves multiple perspectives and needs the team to build it, not just receive it.",
    deja: "No sticky notes: one of the method's artifacts, built collectively in session and ready to use.",
    method: "Can activate any move of the arc depending on the session — it's the format, not the content.",
    riesgo: "Spending collective energy in a space that produces neither criteria nor an actionable artifact.",
    decision: "How to turn collective judgment into something the organization can use and sustain.",
  },
  {
    h: "Mission Control", k: "Sustain", c: "var(--ink-graphite)",
    p: "The strategic-memory infrastructure where capacity stays alive between decisions.",
    pregunta: "How does decision-making capacity stay alive after the work is done?",
    cuando: "When the organization has already made decisions and wants the learning not to be lost as it grows.",
    deja: "A living memory infrastructure: signals, tensions, decisions, and learnings connected in one system.",
    method: "It's the destination of all the method's artifacts: where capacity is sustained between decisions.",
    riesgo: "Letting the capacity you built depend on the people who built it — and leave with them.",
    decision: "How to sustain the criteria over time so the organization doesn't start from zero again.",
  },
];

const DETAIL_KEYS = ["pregunta", "deja", "riesgo", "decision"] as const;

function useResponsiveCols() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    function compute() {
      const w = window.innerWidth;
      if (w <= 520) setCols(1);
      else if (w <= 900) setCols(2);
      else setCols(4);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return cols;
}

interface ArtCardProps {
  art: Artifact;
  i: number;
  active: boolean;
  onToggle: (i: number) => void;
  lang: Lang;
}

function ArtCard({ art, i, active, onToggle, lang }: ArtCardProps) {
  const tip = ART_TIPS[lang][i];
  const accentBorder = `3px solid ${art.c}`;
  return (
    <button
      type="button"
      aria-expanded={active}
      aria-controls={`art-detail-${i}`}
      onClick={() => onToggle(i)}
      className="art-card"
      style={{
        all: "unset",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: "24px 22px 26px",
        background: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,.78)",
        border: `1px solid ${active ? art.c : "var(--border-subtle)"}`,
        borderTop: accentBorder,
        transition:
          "transform var(--duration-standard) var(--ease-premium), border-color var(--duration-standard) var(--ease-premium), box-shadow var(--duration-standard) var(--ease-premium), background var(--duration-standard) var(--ease-premium)",
        boxShadow: active
          ? `0 2px 0 0 ${art.c}, 0 14px 36px color-mix(in srgb, ${art.c} 18%, transparent)`
          : "none",
        outline: "none",
        textAlign: "left",
        minHeight: 210,
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px var(--change-violet)";
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = active
          ? `0 2px 0 0 ${art.c}, 0 14px 36px color-mix(in srgb, ${art.c} 18%, transparent)`
          : "none";
      }}
    >
      {/* Slot 1 — glyph */}
      <span aria-hidden="true" style={{ display: "inline-flex", marginBottom: 12, color: art.c, opacity: active ? 1 : 0.7, transition: "opacity var(--duration-standard)" }}>
        <Glyph name={ART_GLYPHS[i] ?? "nav"} size={24} />
      </span>

      {/* Slot 1 — meta eyebrow */}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "700 11px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-graphite)", marginBottom: 12 }}>
        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: art.c, flexShrink: 0 }} />
        {tip ? (
          <InlineTooltip content={tip}>
            {art.k}
          </InlineTooltip>
        ) : art.k}
      </span>

      {/* Slot 2 — header */}
      <span style={{ display: "block", font: "600 17px/1.2 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)", marginBottom: 10 }}>{art.h}</span>

      {/* Slot 4 — content */}
      <span style={{ display: "block", font: "400 13px/1.55 var(--font-primary)", color: "var(--text-muted)", flexGrow: 1 }}>{art.p}</span>

      {/* Slot 8 — state feedback */}
      <span aria-hidden="true" style={{ marginTop: 16, font: "700 10px var(--font-secondary)", letterSpacing: ".1em", textTransform: "uppercase", color: active ? art.c : "var(--text-faint)", transition: "color .18s ease" }}>
        {active ? ART_UI[lang].close : ART_UI[lang].open}
      </span>
    </button>
  );
}

/* ── Diagrama vectorial del instrumento — esquema técnico grafito, dos tonos ──
   Estructura en gris claro (--soft-stone-gray), foco en grafito pleno. Grosores
   coherentes: estructura 1.3 · forma 1.8 · énfasis 3. viewBox 160 + geometricPrecision. */
const INK = "var(--ink-graphite)";
const FAINT = "var(--soft-stone-gray)";

function InstrumentDiagram({ index }: { index: number }) {
  const body = (() => {
    switch (index) {
      case 0:
        return (
          <>
            <g stroke={FAINT} strokeWidth="1.3"><circle cx="80" cy="80" r="58" /><circle cx="80" cy="80" r="38" /><circle cx="80" cy="80" r="19" /></g>
            <g stroke={FAINT} strokeWidth="1.1" strokeDasharray="1.5 6" opacity="0.7"><line x1="14" y1="80" x2="146" y2="80" /><line x1="80" y1="14" x2="80" y2="146" /></g>
            <g fill={FAINT} stroke="none"><circle cx="58" cy="104" r="3.4" /><circle cx="104" cy="112" r="3" /><circle cx="56" cy="58" r="2.8" /></g>
            <circle cx="110" cy="56" r="13" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.55" />
            <circle cx="110" cy="56" r="5" fill={INK} stroke="none" />
          </>
        );
      case 1:
        return (
          <>
            <g stroke={FAINT} strokeWidth="1.3" opacity="0.8"><line x1="80" y1="26" x2="80" y2="134" /><line x1="26" y1="80" x2="134" y2="80" /></g>
            <path d="M30 80 H64 M52 70 L64 80 L52 90" stroke={INK} strokeWidth="1.8" />
            <path d="M130 80 H96 M108 70 L96 80 L108 90" stroke={INK} strokeWidth="1.8" />
            <circle cx="80" cy="80" r="15" fill="none" stroke={FAINT} strokeWidth="1.3" />
            <circle cx="80" cy="80" r="7" fill={INK} stroke="none" />
          </>
        );
      case 2:
        return (
          <>
            <rect x="34" y="34" width="92" height="92" stroke={FAINT} strokeWidth="1.3" />
            <g stroke={FAINT} strokeWidth="1.3"><line x1="80" y1="34" x2="80" y2="126" /><line x1="34" y1="80" x2="126" y2="80" /></g>
            <g fill={FAINT} stroke="none"><circle cx="57" cy="103" r="3" /><circle cx="57" cy="57" r="3" /><circle cx="103" cy="103" r="3" /></g>
            <circle cx="103" cy="57" r="12" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.6" />
            <circle cx="103" cy="57" r="6" fill={INK} stroke="none" />
          </>
        );
      case 3:
        return (
          <>
            <line x1="26" y1="92" x2="134" y2="92" stroke={FAINT} strokeWidth="1.3" />
            <g fill={INK} stroke="none"><circle cx="38" cy="92" r="5" /><circle cx="70" cy="92" r="5" /></g>
            <g fill="none" stroke={INK} strokeWidth="1.8"><circle cx="102" cy="92" r="5" /><circle cx="134" cy="92" r="5" /></g>
            <path d="M102 92 L122 64" stroke={FAINT} strokeWidth="1.4" />
            <circle cx="122" cy="64" r="4.5" fill="none" stroke={FAINT} strokeWidth="1.4" />
          </>
        );
      case 4:
        return (
          <>
            <rect x="46" y="26" width="68" height="108" stroke={INK} strokeWidth="1.8" />
            <rect x="58" y="40" width="44" height="11" fill={INK} stroke="none" />
            <g stroke={FAINT} strokeWidth="1.5"><line x1="58" y1="68" x2="102" y2="68" /><line x1="58" y1="82" x2="102" y2="82" /><line x1="58" y1="96" x2="86" y2="96" /></g>
            <line x1="58" y1="114" x2="84" y2="114" stroke={INK} strokeWidth="3.2" />
          </>
        );
      case 5:
        return (
          <>
            <path d="M50 32 H96 L114 50 V128 H50 Z" stroke={INK} strokeWidth="1.8" />
            <path d="M96 32 V50 H114" stroke={INK} strokeWidth="1.5" />
            <g stroke={FAINT} strokeWidth="1.5"><line x1="62" y1="76" x2="102" y2="76" /><line x1="62" y1="90" x2="102" y2="90" /><line x1="62" y1="104" x2="86" y2="104" /></g>
            <circle cx="64" cy="62" r="3.2" fill={INK} stroke="none" />
          </>
        );
      case 6:
        return (
          <>
            <g stroke={FAINT} strokeWidth="1.3"><line x1="42" y1="46" x2="80" y2="80" /><line x1="118" y1="46" x2="80" y2="80" /><line x1="38" y1="106" x2="80" y2="80" /><line x1="122" y1="110" x2="80" y2="80" /></g>
            <g fill={FAINT} stroke="none"><circle cx="42" cy="46" r="3.6" /><circle cx="118" cy="46" r="3.6" /><circle cx="38" cy="106" r="3.6" /><circle cx="122" cy="110" r="3.6" /></g>
            <circle cx="80" cy="80" r="16" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.55" />
            <circle cx="80" cy="80" r="8" fill={INK} stroke="none" />
          </>
        );
      case 7:
        return (
          <>
            <g stroke={FAINT} strokeWidth="1.3"><line x1="80" y1="80" x2="44" y2="50" /><line x1="80" y1="80" x2="118" y2="54" /><line x1="80" y1="80" x2="46" y2="112" /><line x1="80" y1="80" x2="114" y2="114" /><line x1="44" y1="50" x2="118" y2="54" /><line x1="46" y1="112" x2="114" y2="114" /></g>
            <g fill={FAINT} stroke="none"><circle cx="44" cy="50" r="3.6" /><circle cx="118" cy="54" r="3.6" /><circle cx="46" cy="112" r="3.6" /><circle cx="114" cy="114" r="3.6" /></g>
            <circle cx="80" cy="80" r="11" fill="none" stroke={INK} strokeWidth="1.8" />
            <circle cx="80" cy="80" r="4" fill={INK} stroke="none" />
          </>
        );
      default:
        return <><circle cx="80" cy="80" r="40" stroke={FAINT} strokeWidth="1.3" /><circle cx="80" cy="80" r="6" fill={INK} stroke="none" /></>;
    }
  })();

  return (
    <svg viewBox="0 0 160 160" width="100%" height="auto" aria-hidden="true" shapeRendering="geometricPrecision" style={{ display: "block", width: "100%", maxWidth: 220, margin: "0 auto" }}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">{body}</g>
    </svg>
  );
}

function DetailPanel({ sel, selected, lang }: { sel: Artifact; selected: number; lang: Lang }) {
  return (
    <div
      id={`art-detail-${selected}`}
      role="region"
      aria-label={`${ART_UI[lang].detail}: ${sel.h}`}
      aria-live="polite"
      style={{ marginTop: 12, marginBottom: 12, overflow: "hidden", animation: "art-detail-in .28s var(--ease-premium)" }}
    >
      <div style={{ padding: "clamp(28px,3.4vw,40px)", border: `1px solid ${sel.c}`, borderTop: `3px solid ${sel.c}`, background: "rgba(255,255,255,.98)" }}>
        {/* Encabezado del panel */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: sel.c, flexShrink: 0 }} />
          <span style={{ font: "600 13px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>{sel.h}</span>
          <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)", marginLeft: 4 }}>· {sel.k}</span>
        </div>

        {/* Diagrama del instrumento + datos esenciales */}
        <div className="art-detail-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,250px) minmax(0,1fr)", gap: "clamp(24px,3vw,48px)", alignItems: "start" }}>
          <div style={{ background: "color-mix(in srgb, var(--ink-graphite) 3.5%, transparent)", border: "1px solid var(--border-subtle)", padding: "clamp(22px,2.6vw,32px)", display: "grid", placeItems: "center", aspectRatio: "1 / 1" }}>
            <InstrumentDiagram index={selected} />
          </div>
          <div className="art-detail-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "26px 32px" }}>
            {DETAIL_KEYS.map((key) => (
              <div key={key}>
                <span style={{ display: "block", font: "700 10px var(--font-secondary)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 9 }}>
                  {COL_LABELS[lang][key]}
                </span>
                <p style={{ margin: 0, font: "400 14px/1.6 var(--font-primary)", color: "var(--ink-graphite)" }}>{sel[key]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtifactGallery({ lang = "es" }: { lang?: Lang }) {
  const [selected, setSelected] = useState<number | null>(null);
  const cols = useResponsiveCols();
  const ARTIFACTS = lang === "en" ? ARTIFACTS_EN : ARTIFACTS_ES;

  function toggle(i: number) {
    setSelected((prev) => (prev === i ? null : i));
  }

  const sel = selected !== null ? ARTIFACTS[selected] : null;
  const selectedRow = selected !== null ? Math.floor(selected / cols) : -1;

  const rows: Artifact[][] = [];
  for (let i = 0; i < ARTIFACTS.length; i += cols) {
    rows.push(ARTIFACTS.slice(i, i + cols));
  }

  return (
    <div>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx}>
          <div
            className="art-grid"
            style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 12 }}
          >
            {row.map((art, colIdx) => {
              const globalI = rowIdx * cols + colIdx;
              return <ArtCard key={art.h} art={art} i={globalI} active={selected === globalI} onToggle={toggle} lang={lang} />;
            })}
          </div>
          {sel && selectedRow === rowIdx && <DetailPanel sel={sel} selected={selected as number} lang={lang} />}
        </div>
      ))}

      <style>{`
        @keyframes art-detail-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [role="region"][id^="art-detail-"] { animation: none !important; }
        }
        .art-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(46,46,51,.1) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .art-card { transition: none !important; }
          .art-card:hover { transform: none !important; }
        }
        @media (max-width: 820px) {
          .art-detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .art-detail-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
