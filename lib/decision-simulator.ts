/**
 * Decision Simulator Lite — lógica pura, sin UI ni efectos.
 *
 * Rule-based, no IA. Lee una decisión en 5 preguntas y devuelve
 * una lectura estructurada: tensión, movimiento del método, riesgo,
 * primer movimiento, artefacto. Sin PII, sin envío aquí.
 */

export const DIMENSIONS = ["leer", "interpretar", "decidir", "disenar", "sostener"] as const;
export type Dimension = (typeof DIMENSIONS)[number];

import type { Lang } from "@/lib/i18n";

export const DIM_LABEL_ES: Record<Dimension, string> = {
  leer: "Leer", interpretar: "Interpretar", decidir: "Decidir", disenar: "Diseñar", sostener: "Sostener",
};
export const DIM_LABEL_EN: Record<Dimension, string> = {
  leer: "Read", interpretar: "Interpret", decidir: "Decide", disenar: "Design", sostener: "Sustain",
};
/** Alias ES por compatibilidad. */
export const DIM_LABEL = DIM_LABEL_ES;
export const getDimLabel = (lang: Lang) => (lang === "en" ? DIM_LABEL_EN : DIM_LABEL_ES);

export const DIM_COLOR: Record<Dimension, string> = {
  leer: "var(--signal-cyan)",
  interpretar: "var(--soft-violet)",
  decidir: "var(--change-violet)",
  disenar: "var(--opportunity-orange)",
  sostener: "var(--human-pink)",
};

/* ── señal de cambio que aparece después de Q1 ── */
const CHANGE_SIGNALS_ES: Record<Dimension, string> = {
  leer: "El entorno emite señales que todavía no tienen nombre en la organización.",
  interpretar: "El cambio ya es visible, pero su significado específico para este contexto no está claro.",
  decidir: "El cambio trae más oportunidades de las que el equipo puede sostener al mismo tiempo.",
  disenar: "El cambio exige una respuesta ejecutable, no solo una lectura del entorno.",
  sostener: "El cambio pone en riesgo lo que la organización tardó tiempo en construir.",
};
const CHANGE_SIGNALS_EN: Record<Dimension, string> = {
  leer: "The environment is emitting signals that don't have a name in the organization yet.",
  interpretar: "The change is already visible, but its specific meaning for this context isn't clear.",
  decidir: "The change brings more opportunities than the team can sustain at once.",
  disenar: "The change demands an executable response, not just a reading of the environment.",
  sostener: "The change puts at risk what the organization took time to build.",
};

type TData = { tension: string; risk: string; firstMove: string; artifact: string; methodNote: string };
/* ── datos de la lectura por dimensión primaria ── */
const TENSION_DATA_ES: Record<Dimension, TData> = {
  leer: {
    tension: "El entorno se mueve más rápido que la capacidad para nombrarlo.",
    risk: "Se reacciona cuando el cambio ya es urgencia — cuando la ventana de opciones ya se cerró.",
    firstMove: "Instalar un radar de señales: qué mirar, con qué frecuencia y quién tiene la responsabilidad de interpretarlo.",
    artifact: "Radar de señales",
    methodNote: "Esta lectura activa principalmente Leer — el primer movimiento del método. El trabajo empieza antes de que el cambio sea obvio para todos.",
  },
  interpretar: {
    tension: "La información existe, pero no hay acuerdo sobre qué significa para esta organización en particular.",
    risk: "Reaccionar a la señal equivocada o moverse por inercia sin entender qué está en juego de verdad.",
    firstMove: "Construir un mapa de tensiones: qué fuerzas se contraponen y dónde está el conflicto real de la decisión.",
    artifact: "Mapa de tensiones",
    methodNote: "Esta lectura activa principalmente Interpretar — la capa que más se salta. El problema no es falta de información: es falta de criterio para leerla.",
  },
  decidir: {
    tension: "Hay opciones claras, pero no hay criterios explícitos para elegir entre ellas — la decisión se posterga.",
    risk: "Decidir por la voz más fuerte en la sala, sin que el criterio quede registrado para la próxima vez.",
    firstMove: "Hacer explícitos los trade-offs: qué se gana, qué se sacrifica y por qué — antes de comprometer recursos.",
    artifact: "Matriz de trade-offs",
    methodNote: "Esta lectura activa principalmente Decidir. El reto no es elegir la opción correcta, sino hacer el criterio defendible y sostenible.",
  },
  disenar: {
    tension: "La decisión existe como intención, pero no tiene forma ejecutable — está en presentaciones, no en movimientos.",
    risk: "Que la buena decisión se quede en el deck y no baje al equipo que tiene que ejecutarla.",
    firstMove: "Bajar la decisión a un roadmap vivo: primeros pasos, responsables, secuencia y punto de revisión.",
    artifact: "Roadmap vivo",
    methodNote: "Esta lectura activa principalmente Diseñar. Lo que falta no es claridad, sino estructura que baje la decisión al equipo que la ejecuta.",
  },
  sostener: {
    tension: "Las decisiones se toman, pero el aprendizaje no se acumula — cada coyuntura empieza desde cero.",
    risk: "Reinventar el rumbo en cada crisis y perder el criterio que costó trabajo construir.",
    firstMove: "Darle memoria a las decisiones: el porqué, los criterios usados y las condiciones bajo las que se revisarán.",
    artifact: "Mission Control",
    methodNote: "Esta lectura activa principalmente Sostener. El trabajo es construir infraestructura de continuidad, no solo volver a decidir.",
  },
};
const TENSION_DATA_EN: Record<Dimension, TData> = {
  leer: {
    tension: "The environment moves faster than the capacity to name it.",
    risk: "You react when the change is already an emergency — when the window of options has already closed.",
    firstMove: "Set up a signal radar: what to watch, how often, and who's responsible for interpreting it.",
    artifact: "Signal radar",
    methodNote: "This reading mainly activates Read — the method's first move. The work starts before the change is obvious to everyone.",
  },
  interpretar: {
    tension: "The information exists, but there's no agreement on what it means for this organization in particular.",
    risk: "Reacting to the wrong signal, or moving by inertia without understanding what's truly at stake.",
    firstMove: "Build a tension map: what forces oppose each other and where the real conflict of the decision lies.",
    artifact: "Tension map",
    methodNote: "This reading mainly activates Interpret — the most-skipped layer. The problem isn't lack of information: it's lack of criteria to read it.",
  },
  decidir: {
    tension: "There are clear options, but no explicit criteria to choose between them — the decision is postponed.",
    risk: "Deciding by the loudest voice in the room, without the criteria being recorded for next time.",
    firstMove: "Make the trade-offs explicit: what's gained, what's sacrificed, and why — before committing resources.",
    artifact: "Trade-off matrix",
    methodNote: "This reading mainly activates Decide. The challenge isn't choosing the right option, but making the criteria defensible and sustainable.",
  },
  disenar: {
    tension: "The decision exists as intention, but has no executable form — it's in presentations, not in moves.",
    risk: "Letting the good decision stay in the deck and never reach the team that has to execute it.",
    firstMove: "Bring the decision down to a living roadmap: first steps, owners, sequence, and review point.",
    artifact: "Living roadmap",
    methodNote: "This reading mainly activates Design. What's missing isn't clarity, but structure that brings the decision down to the team that executes it.",
  },
  sostener: {
    tension: "Decisions get made, but learning doesn't accumulate — every turn starts from zero.",
    risk: "Reinventing the course in every crisis and losing the criteria that took work to build.",
    firstMove: "Give decisions memory: the why, the criteria used, and the conditions under which they'll be revisited.",
    artifact: "Mission Control",
    methodNote: "This reading mainly activates Sustain. The work is building continuity infrastructure, not just deciding again.",
  },
};

/* ── chips por pregunta ── */
export interface ChipOption {
  text: string;
  dim: Dimension | null;
}

export const CHIPS_ES: ChipOption[][] = [
  /* Q1 — qué cambia */
  [
    { text: "El mercado se mueve más rápido que nuestra respuesta.", dim: "leer" },
    { text: "Nuestro cliente tiene expectativas nuevas que no habíamos visto.", dim: "leer" },
    { text: "La operación creció, pero el criterio no escaló con ella.", dim: "sostener" },
    { text: "Hay más presiones que capacidad para atenderlas al mismo tiempo.", dim: "decidir" },
    { text: "El contexto exige actuar antes de tener certeza.", dim: "interpretar" },
  ],
  /* Q2 — decisión atorada */
  [
    { text: "Dónde crecer sin perder lo que nos hace lo que somos.", dim: "interpretar" },
    { text: "Qué iniciativas sostenemos y a cuáles les decimos que no.", dim: "decidir" },
    { text: "Cómo darle forma ejecutable a la dirección que ya tenemos.", dim: "disenar" },
    { text: "Cómo evitar que el criterio construido se pierda.", dim: "sostener" },
    { text: "Qué parte de la experiencia rediseñar primero.", dim: "disenar" },
  ],
  /* Q3 — qué pasa si no */
  [
    { text: "Crecemos, pero perdemos lo que nos hace únicos.", dim: null },
    { text: "Todo avanza lento y el equipo se agota sin resultados visibles.", dim: null },
    { text: "Cada crisis empieza de cero. El aprendizaje no se acumula.", dim: null },
    { text: "Perdemos relevancia sin saber exactamente dónde.", dim: null },
    { text: "La visión queda en presentaciones, no en decisiones.", dim: null },
  ],
  /* Q4 — quién la sostiene */
  [
    { text: "La dirección general y el equipo ejecutivo.", dim: null },
    { text: "El equipo comercial y de producto.", dim: null },
    { text: "El equipo fundador y la generación que viene.", dim: null },
    { text: "El equipo directivo y los líderes de área.", dim: null },
  ],
  /* Q5 — horizonte */
  [
    { text: "Hay algo que mover en los próximos noventa días.", dim: null },
    { text: "El efecto real se juega a doce o dieciocho meses.", dim: null },
    { text: "Es urgente ahora; el cambio tomará años en consolidarse.", dim: null },
    { text: "No hay fecha fija, pero el costo de esperar es real.", dim: null },
  ],
];

export const CHIPS_EN: ChipOption[][] = [
  [
    { text: "The market moves faster than our response.", dim: "leer" },
    { text: "Our customer has new expectations we hadn't seen.", dim: "leer" },
    { text: "Operations grew, but our judgment didn't scale with them.", dim: "sostener" },
    { text: "There are more pressures than capacity to handle them at once.", dim: "decidir" },
    { text: "The context demands acting before having certainty.", dim: "interpretar" },
  ],
  [
    { text: "Where to grow without losing what makes us who we are.", dim: "interpretar" },
    { text: "Which initiatives we sustain and which we say no to.", dim: "decidir" },
    { text: "How to give executable form to the direction we already have.", dim: "disenar" },
    { text: "How to keep the judgment we've built from being lost.", dim: "sostener" },
    { text: "Which part of the experience to redesign first.", dim: "disenar" },
  ],
  [
    { text: "We grow, but lose what makes us unique.", dim: null },
    { text: "Everything moves slowly and the team burns out with no visible results.", dim: null },
    { text: "Every crisis starts from zero. Learning doesn't accumulate.", dim: null },
    { text: "We lose relevance without knowing exactly where.", dim: null },
    { text: "The vision stays in presentations, not in decisions.", dim: null },
  ],
  [
    { text: "Senior leadership and the executive team.", dim: null },
    { text: "The commercial and product teams.", dim: null },
    { text: "The founding team and the next generation.", dim: null },
    { text: "The leadership team and area leads.", dim: null },
  ],
  [
    { text: "There's something to move in the next ninety days.", dim: null },
    { text: "The real effect plays out at twelve to eighteen months.", dim: null },
    { text: "It's urgent now; the change will take years to consolidate.", dim: null },
    { text: "There's no fixed date, but the cost of waiting is real.", dim: null },
  ],
];

/* ── meta de cada pregunta ── */
export interface Question {
  label: string;
  micro: string;
  placeholder: string;
  example: string;
}

export const QUESTIONS_ES: Question[] = [
  {
    label: "¿Qué está cambiando a tu alrededor?",
    micro: "Una señal del mercado, del cliente, del contexto regulatorio o del equipo. Lo que sea que se esté moviendo.",
    placeholder: "Un competidor nuevo cambió la forma en que el cliente compra y nuestro modelo empezó a sentirse lento.",
    example: "Ej. El mercado ya no compra como antes — el ciclo de decisión se alargó y nuestro equipo comercial no sabe cómo responder.",
  },
  {
    label: "¿Qué decisión está atorada?",
    micro: "La que no termina de tomarse. Descríbela como la dirías en voz alta, sin pulir.",
    placeholder: "Si rediseñamos la oferta completa o protegemos lo que ya funciona un año más.",
    example: "Ej. Si seguimos creciendo en el segmento que conocemos o si hacemos la apuesta hacia un mercado que todavía no nos compra.",
  },
  {
    label: "¿Qué pasa si no se decide?",
    micro: "Lo que se erosiona, lo que pierde terreno o lo que otro decide por ti si no lo haces tú.",
    placeholder: "Llegamos tarde a la nueva categoría y el margen sigue cayendo sin que sepamos por qué.",
    example: "Ej. El equipo sigue ejecutando en piloto automático, con iniciativas que compiten entre sí y ninguna llega a término.",
  },
  {
    label: "¿Quién tiene que sostener esta decisión?",
    micro: "No quién la firma — quién la carga en el día a día después.",
    placeholder: "Dirección general y el equipo comercial, que ejecutan el giro.",
    example: "Ej. El equipo de producto que tiene que cambiar su roadmap y la dirección que tiene que explicarlo al board.",
  },
  {
    label: "¿Qué horizonte importa aquí?",
    micro: "No el ideal — el plazo que de verdad pesa en esta decisión.",
    placeholder: "Algo antes de cierre de año; el efecto real se juega a veinticuatro meses.",
    example: "Ej. Hay una ventana de seis meses antes de que el competidor consolide su posición.",
  },
];
export const QUESTIONS_EN: Question[] = [
  {
    label: "What's changing around you?",
    micro: "A signal from the market, the customer, the regulatory context, or the team. Whatever is moving.",
    placeholder: "A new competitor changed how the customer buys and our model started to feel slow.",
    example: "E.g. The market no longer buys like before — the decision cycle got longer and our sales team doesn't know how to respond.",
  },
  {
    label: "What decision is stuck?",
    micro: "The one that never quite gets made. Describe it as you'd say it out loud, unpolished.",
    placeholder: "Whether we redesign the whole offering or protect what already works for another year.",
    example: "E.g. Whether we keep growing in the segment we know or make the bet toward a market that doesn't buy from us yet.",
  },
  {
    label: "What happens if it isn't decided?",
    micro: "What erodes, what loses ground, or what someone else decides for you if you don't.",
    placeholder: "We arrive late to the new category and the margin keeps falling without us knowing why.",
    example: "E.g. The team keeps executing on autopilot, with initiatives competing against each other and none reaching completion.",
  },
  {
    label: "Who has to sustain this decision?",
    micro: "Not who signs it — who carries it day to day afterward.",
    placeholder: "Senior leadership and the commercial team, who execute the shift.",
    example: "E.g. The product team that has to change its roadmap and the leadership that has to explain it to the board.",
  },
  {
    label: "What horizon matters here?",
    micro: "Not the ideal one — the timeframe that truly weighs on this decision.",
    placeholder: "Something before year-end; the real effect plays out at twenty-four months.",
    example: "E.g. There's a six-month window before the competitor consolidates its position.",
  },
];

/* ── 6 escenarios demo ── */
export interface Scenario {
  id: string;
  label: string;
  description: string;
  primaryDim: Dimension;
  answers: [string, string, string, string, string];
  chipDims: [Dimension | null, Dimension | null, null, null, null];
}

export const SCENARIOS_ES: Scenario[] = [
  {
    id: "crecer-sin-diluir",
    label: "Crecer sin diluir",
    description: "El mercado pide adaptación, pero cada cambio nos aleja de lo que nos hizo relevantes.",
    primaryDim: "interpretar",
    answers: [
      "El mercado nos pide adaptarnos, pero cada adaptación nos aleja de lo que nos hizo relevantes.",
      "Dónde crecer sin perder lo que nos hace lo que somos.",
      "Crecemos, pero la propuesta se vuelve genérica. Perdemos la razón por la que nos elegían.",
      "Dirección general y el equipo comercial.",
      "Los cambios que hagamos ahora definen lo que seremos en tres años.",
    ],
    chipDims: ["leer", "interpretar", null, null, null],
  },
  {
    id: "demasiadas-iniciativas",
    label: "Demasiadas iniciativas",
    description: "Más oportunidades buenas que capacidad para perseguirlas. El equipo se dispersa.",
    primaryDim: "decidir",
    answers: [
      "Hay más presiones e iniciativas de las que podemos atender al mismo tiempo.",
      "Qué iniciativas sostenemos y a cuáles les decimos que no este año.",
      "Todo avanza lento y nada llega a término. El equipo se agota sin resultados visibles.",
      "El equipo directivo que tiene que priorizar recursos y tiempo.",
      "Si no lo resolvemos este trimestre, perdemos el momentum.",
    ],
    chipDims: ["decidir", "decidir", null, null, null],
  },
  {
    id: "decisiones-que-se-pierden",
    label: "Decisiones que se pierden",
    description: "El criterio de cada decisión importante desaparece. Cada crisis empieza desde cero.",
    primaryDim: "sostener",
    answers: [
      "La operación avanza, pero el criterio de cada decisión importante no se acumula.",
      "Cómo evitar que el aprendizaje se pierda y que cada coyuntura empiece desde cero.",
      "Cada reto nuevo empieza desde cero. Lo que costó trabajo construir no se hereda.",
      "El equipo que opera y los líderes que toman decisiones estratégicas.",
      "Es urgente ahora, antes de que el equipo crezca más y el problema se amplifique.",
    ],
    chipDims: ["sostener", "sostener", null, null, null],
  },
  {
    id: "cliente-que-cambio",
    label: "El cliente ya cambió",
    description: "Nuestro cliente decide distinto. La experiencia que ofrecemos ya no responde igual.",
    primaryDim: "leer",
    answers: [
      "Nuestro cliente tiene expectativas nuevas que no habíamos visto y la experiencia que damos ya no responde.",
      "Qué parte de la experiencia rediseñar primero y qué mantener mientras.",
      "Perdemos relevancia sin saber exactamente dónde ni por qué.",
      "El equipo de producto y la dirección comercial.",
      "Necesitamos mover algo concreto este año.",
    ],
    chipDims: ["leer", "disenar", null, null, null],
  },
  {
    id: "vision-sin-roadmap",
    label: "Visión sin roadmap",
    description: "Hay dirección clara, pero no logra traducirse en movimientos que el equipo ejecute.",
    primaryDim: "disenar",
    answers: [
      "Tenemos una dirección clara, pero no logra bajar a decisiones del día a día.",
      "Cómo darle forma ejecutable a la dirección que ya tenemos.",
      "La visión queda en presentaciones. La operación sigue su propio camino.",
      "El equipo directivo y los líderes de área que ejecutan.",
      "El efecto real se juega en los próximos dieciocho meses.",
    ],
    chipDims: ["interpretar", "disenar", null, null, null],
  },
  {
    id: "criterio-en-pocas-cabezas",
    label: "Criterio en pocas manos",
    description: "El rumbo depende de quienes lo iniciaron. Si no están, el criterio desaparece.",
    primaryDim: "sostener",
    answers: [
      "El contexto exige actuar antes de tener certeza, pero el criterio vive en muy pocas cabezas.",
      "Cómo transferir el criterio estratégico a un equipo que pueda sostenerlo.",
      "Si alguien clave se va, el criterio se va con él. La organización queda sin brújula.",
      "La generación que lleva el conocimiento y la que debe recibirlo.",
      "La transición ya está pasando o está a punto de comenzar.",
    ],
    chipDims: ["interpretar", "sostener", null, null, null],
  },
];

export const SCENARIOS_EN: Scenario[] = [
  {
    id: "crecer-sin-diluir", label: "Grow without diluting",
    description: "The market asks for adaptation, but each change pulls us away from what made us relevant.",
    primaryDim: "interpretar",
    answers: [
      "The market asks us to adapt, but each adaptation pulls us away from what made us relevant.",
      "Where to grow without losing what makes us who we are.",
      "We grow, but the offering becomes generic. We lose the reason they chose us.",
      "Senior leadership and the commercial team.",
      "The changes we make now define what we'll be in three years.",
    ],
    chipDims: ["leer", "interpretar", null, null, null],
  },
  {
    id: "demasiadas-iniciativas", label: "Too many initiatives",
    description: "More good opportunities than capacity to pursue them. The team scatters.",
    primaryDim: "decidir",
    answers: [
      "There are more pressures and initiatives than we can handle at once.",
      "Which initiatives we sustain and which we say no to this year.",
      "Everything moves slowly and nothing reaches completion. The team burns out with no visible results.",
      "The leadership team that has to prioritize resources and time.",
      "If we don't resolve it this quarter, we lose the momentum.",
    ],
    chipDims: ["decidir", "decidir", null, null, null],
  },
  {
    id: "decisiones-que-se-pierden", label: "Decisions that get lost",
    description: "The criteria behind each important decision disappears. Every crisis starts from zero.",
    primaryDim: "sostener",
    answers: [
      "Operations move forward, but the criteria behind each important decision doesn't accumulate.",
      "How to keep learning from being lost and every turn from starting at zero.",
      "Every new challenge starts from zero. What took work to build isn't inherited.",
      "The team that operates and the leaders who make strategic decisions.",
      "It's urgent now, before the team grows more and the problem amplifies.",
    ],
    chipDims: ["sostener", "sostener", null, null, null],
  },
  {
    id: "cliente-que-cambio", label: "The customer already changed",
    description: "Our customer decides differently. The experience we offer no longer responds the same.",
    primaryDim: "leer",
    answers: [
      "Our customer has new expectations we hadn't seen and the experience we give no longer responds.",
      "Which part of the experience to redesign first and what to keep in the meantime.",
      "We lose relevance without knowing exactly where or why.",
      "The product team and commercial leadership.",
      "We need to move something concrete this year.",
    ],
    chipDims: ["leer", "disenar", null, null, null],
  },
  {
    id: "vision-sin-roadmap", label: "Vision without roadmap",
    description: "There's a clear direction, but it doesn't translate into moves the team executes.",
    primaryDim: "disenar",
    answers: [
      "We have a clear direction, but it doesn't come down to day-to-day decisions.",
      "How to give executable form to the direction we already have.",
      "The vision stays in presentations. Operations follow their own path.",
      "The leadership team and area leads who execute.",
      "The real effect plays out in the next eighteen months.",
    ],
    chipDims: ["interpretar", "disenar", null, null, null],
  },
  {
    id: "criterio-en-pocas-cabezas", label: "Judgment in few hands",
    description: "The course depends on those who started it. If they're not there, the judgment disappears.",
    primaryDim: "sostener",
    answers: [
      "The context demands acting before having certainty, but the judgment lives in very few heads.",
      "How to transfer the strategic judgment to a team that can sustain it.",
      "If someone key leaves, the judgment leaves with them. The organization is left without a compass.",
      "The generation that holds the knowledge and the one that should receive it.",
      "The transition is already happening or about to begin.",
    ],
    chipDims: ["interpretar", "sostener", null, null, null],
  },
];

/* ── detección de dimensión desde texto libre ── */
function detectDimFromText(text: string): Dimension {
  const t = text.toLowerCase();
  if (/señal|mercado|entorno|tendencia|cliente|exterior|compra|regul|signal|market|environment|trend|customer|buy/.test(t)) return "leer";
  if (/significa|interpretar|tensión|conflicto|criterio para|entender|qué somos|identidad|means?|interpret|tension|conflict|understand|identity/.test(t)) return "interpretar";
  if (/decidir|priorizar|elegir|trade.off|sacrificar|qué importa|iniciativas|cuáles|decimos que no|decide|prioriti|choose|sacrifice|initiative|say no/.test(t)) return "decidir";
  if (/forma ejecutable|roadmap|ejecutar|construir|implementar|rediseñar|traducir|bajar|executable|execute|build|implement|redesign|translate/.test(t)) return "disenar";
  if (/sostener|memoria|aprendizaje|continuar|acumula|hereda|transferir|no se pierda|sustain|memory|learning|accumulate|inherit|transfer/.test(t)) return "sostener";
  return "interpretar";
}

export interface StepAnswer {
  text: string;
  chipDim: Dimension | null;
}

/* ── lectura parcial (mientras avanza el quiz) ── */
export interface PartialReading {
  answeredCount: number;
  changeDim: Dimension | null;
  decisionDim: Dimension | null;
  changeSignal: string | null;
  tension: string | null;
  risk: string | null;
  firstMove: string | null;
  artifact: string | null;
  methodNote: string | null;
  isComplete: boolean;
}

export function buildPartialReading(answers: StepAnswer[], lang: Lang = "es"): PartialReading {
  const CHANGE_SIGNALS = lang === "en" ? CHANGE_SIGNALS_EN : CHANGE_SIGNALS_ES;
  const TENSION_DATA = lang === "en" ? TENSION_DATA_EN : TENSION_DATA_ES;
  const count = answers.length;

  const changeDim = count >= 1
    ? (answers[0].chipDim ?? (answers[0].text ? detectDimFromText(answers[0].text) : null))
    : null;

  const rawDecisionDim = count >= 2
    ? (answers[1].chipDim ?? (answers[1].text ? detectDimFromText(answers[1].text) : null))
    : null;

  /* la dimensión de la lectura es la de la decisión (Q2) si existe; si no, la del cambio (Q1) */
  const decisionDim = rawDecisionDim ?? changeDim;

  const readingDim = decisionDim ?? "interpretar";

  return {
    answeredCount: count,
    changeDim,
    decisionDim,
    changeSignal: count >= 1 && changeDim ? CHANGE_SIGNALS[changeDim] : null,
    tension: count >= 2 && decisionDim ? TENSION_DATA[readingDim].tension : null,
    risk: count >= 3 && decisionDim ? TENSION_DATA[readingDim].risk : null,
    firstMove: count >= 5 ? TENSION_DATA[readingDim].firstMove : null,
    artifact: count >= 5 ? TENSION_DATA[readingDim].artifact : null,
    methodNote: count >= 5 ? TENSION_DATA[readingDim].methodNote : null,
    isComplete: count >= 5,
  };
}

/* ── lectura completa (para la tarjeta de resultado) ── */
export interface SimulatorReading {
  primaryDim: Dimension;
  secondaryDim: Dimension | null;
  changeSignal: string;
  tension: string;
  risk: string;
  firstMove: string;
  artifact: string;
  methodNote: string;
}

export function buildFullReading(answers: StepAnswer[], lang: Lang = "es"): SimulatorReading {
  const partial = buildPartialReading(answers, lang);
  const CHANGE_SIGNALS = lang === "en" ? CHANGE_SIGNALS_EN : CHANGE_SIGNALS_ES;
  const TENSION_DATA = lang === "en" ? TENSION_DATA_EN : TENSION_DATA_ES;

  const primaryDim = partial.decisionDim ?? "interpretar";
  const secondaryDim: Dimension | null =
    partial.changeDim && partial.changeDim !== primaryDim ? partial.changeDim : null;

  const data = TENSION_DATA[primaryDim];

  return {
    primaryDim,
    secondaryDim,
    changeSignal: CHANGE_SIGNALS[partial.changeDim ?? primaryDim],
    tension: data.tension,
    risk: data.risk,
    firstMove: data.firstMove,
    artifact: data.artifact,
    methodNote: data.methodNote,
  };
}

/* ── construye el campo `decision` para /api/contacto ── */
export function buildDecisionText(
  answers: StepAnswer[],
  reading: SimulatorReading,
  scenarioId: string | null,
  lang: Lang = "es"
): string {
  const DIM_LABEL = lang === "en" ? DIM_LABEL_EN : DIM_LABEL_ES;
  const labels = lang === "en"
    ? ["What's changing", "Stuck decision", "What happens if not decided", "Who sustains it", "Horizon"]
    : ["Qué está cambiando", "Decisión atorada", "Qué pasa si no se decide", "Quién la sostiene", "Horizonte"];
  const lines = answers
    .map((a, i) => (a.text ? `${labels[i]}: ${a.text}` : null))
    .filter((l): l is string => Boolean(l));

  lines.push(
    lang === "en" ? `\n— Simulator reading —` : `\n— Lectura del simulador —`,
    `${lang === "en" ? "Primary move" : "Movimiento principal"}: ${DIM_LABEL[reading.primaryDim]}`,
    `${lang === "en" ? "Tension" : "Tensión"}: ${reading.tension}`,
    `${lang === "en" ? "Suggested artifact" : "Artefacto sugerido"}: ${reading.artifact}`,
  );

  if (scenarioId) lines.push(`${lang === "en" ? "Reference scenario" : "Escenario de referencia"}: ${scenarioId}`);

  return lines.join("\n").slice(0, 2000);
}
