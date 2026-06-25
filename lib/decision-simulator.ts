/**
 * Decision Simulator Lite — lógica pura, sin UI ni efectos.
 *
 * Rule-based, no IA. Lee una decisión en 5 preguntas y devuelve
 * una lectura estructurada: tensión, movimiento del método, riesgo,
 * primer movimiento, artefacto. Sin PII, sin envío aquí.
 */

export const DIMENSIONS = ["leer", "interpretar", "decidir", "disenar", "sostener"] as const;
export type Dimension = (typeof DIMENSIONS)[number];

export const DIM_LABEL: Record<Dimension, string> = {
  leer: "Leer",
  interpretar: "Interpretar",
  decidir: "Decidir",
  disenar: "Diseñar",
  sostener: "Sostener",
};

export const DIM_COLOR: Record<Dimension, string> = {
  leer: "var(--signal-cyan)",
  interpretar: "var(--soft-violet)",
  decidir: "var(--change-violet)",
  disenar: "var(--opportunity-orange)",
  sostener: "var(--human-pink)",
};

/* ── señal de cambio que aparece después de Q1 ── */
const CHANGE_SIGNALS: Record<Dimension, string> = {
  leer: "El entorno emite señales que todavía no tienen nombre en la organización.",
  interpretar: "El cambio ya es visible, pero su significado específico para este contexto no está claro.",
  decidir: "El cambio trae más oportunidades de las que el equipo puede sostener al mismo tiempo.",
  disenar: "El cambio exige una respuesta ejecutable, no solo una lectura del entorno.",
  sostener: "El cambio pone en riesgo lo que la organización tardó tiempo en construir.",
};

/* ── datos de la lectura por dimensión primaria ── */
const TENSION_DATA: Record<Dimension, { tension: string; risk: string; firstMove: string; artifact: string; methodNote: string }> = {
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

/* ── chips por pregunta ── */
export interface ChipOption {
  text: string;
  dim: Dimension | null;
}

export const CHIPS: ChipOption[][] = [
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

/* ── meta de cada pregunta ── */
export interface Question {
  label: string;
  micro: string;
  placeholder: string;
  example: string;
}

export const QUESTIONS: Question[] = [
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

/* ── 6 escenarios demo ── */
export interface Scenario {
  id: string;
  label: string;
  description: string;
  primaryDim: Dimension;
  answers: [string, string, string, string, string];
  chipDims: [Dimension | null, Dimension | null, null, null, null];
}

export const SCENARIOS: Scenario[] = [
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

/* ── detección de dimensión desde texto libre ── */
function detectDimFromText(text: string): Dimension {
  const t = text.toLowerCase();
  if (/señal|mercado|entorno|tendencia|cliente|exterior|compra|regul/.test(t)) return "leer";
  if (/significa|interpretar|tensión|conflicto|criterio para|entender|qué somos|identidad|leer/.test(t)) return "interpretar";
  if (/decidir|priorizar|elegir|trade.off|sacrificar|qué importa|iniciativas|cuáles|decimos que no/.test(t)) return "decidir";
  if (/forma ejecutable|roadmap|ejecutar|construir|implementar|rediseñar|traducir|bajar/.test(t)) return "disenar";
  if (/sostener|memoria|aprendizaje|continuar|acumula|hereda|transferir|no se pierda/.test(t)) return "sostener";
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

export function buildPartialReading(answers: StepAnswer[]): PartialReading {
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

export function buildFullReading(answers: StepAnswer[]): SimulatorReading {
  const partial = buildPartialReading(answers);

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
  scenarioId: string | null
): string {
  const labels = ["Qué está cambiando", "Decisión atorada", "Qué pasa si no se decide", "Quién la sostiene", "Horizonte"];
  const lines = answers
    .map((a, i) => (a.text ? `${labels[i]}: ${a.text}` : null))
    .filter((l): l is string => Boolean(l));

  lines.push(
    `\n— Lectura del simulador —`,
    `Movimiento principal: ${DIM_LABEL[reading.primaryDim]}`,
    `Tensión: ${reading.tension}`,
    `Artefacto sugerido: ${reading.artifact}`,
  );

  if (scenarioId) lines.push(`Escenario de referencia: ${scenarioId}`);

  return lines.join("\n").slice(0, 2000);
}
