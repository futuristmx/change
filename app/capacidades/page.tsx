import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import ArtifactGallery from "@/components/ArtifactGallery";
import ProgressiveBuild from "@/components/ProgressiveBuild";
import type { GlyphName } from "@/components/ds";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Método: leer, interpretar, decidir, diseñar y sostener",
  description:
    "No compras una capacidad suelta. Construyes capacidad de futuro: cinco movimientos que convierten incertidumbre en instrumentos de decisión.",
  alternates: altLinks("/capacidades"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Método: leer, interpretar, decidir, diseñar y sostener" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

function Head({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return (
    <div className="cap-head" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(280px,420px)", gap: 60, alignItems: "end", marginBottom: 60 }}>
      <div>
        <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
          <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
          <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{kicker}</span>
        </Reveal>
        <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{title}</Reveal>
      </div>
      <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{lead}</Reveal>
    </div>
  );
}

const CAPS_ES = [
  { v: "Leer", q: "¿Qué está cambiando?", c: "var(--signal-cyan)", art: "Radar de señales", p: "Separamos el ruido de la señal. Identificamos los movimientos del entorno que sí importan para tu decisión, antes de que se vuelvan obvios para todos." },
  { v: "Interpretar", q: "¿Qué significa para nosotros?", c: "var(--soft-violet)", art: "Mapa de tensiones", p: "Una señal sin interpretación es un dato suelto. Conectamos lo que cambia con lo que tensiona a tu organización: dónde se contradicen las fuerzas, qué presión se acumula, qué está en juego. Es la capa que casi nadie da, y la que cambia la conversación." },
  { v: "Decidir", q: "¿Qué importa y qué se sacrifica?", c: "var(--change-violet)", art: "Matriz de decisión", p: "Toda decisión real implica renunciar a algo. Hacemos explícitos los criterios y sacrificios y lo que cada camino cuesta, para que la decisión deje de depender de quién habla más fuerte y empiece a depender de qué pesa más." },
  { v: "Diseñar", q: "¿Qué forma toma?", c: "var(--change-violet)", art: "Roadmap vivo", p: "Una decisión sin forma no se ejecuta. Le damos cuerpo: la secuencia de movimientos, el prototipo que prueba la apuesta, la narrativa que alinea al equipo. La estrategia deja de ser intención y se vuelve algo que se puede empezar el lunes." },
  { v: "Sostener", q: "¿Cómo se mantiene vivo?", c: "var(--ink-graphite)", art: "Mission Control", p: "Lo difícil no es decidir bien una vez. Es no perder el rumbo cuando el entorno se mueve otra vez. Instalamos la memoria estratégica que mantiene viva la decisión, registra lo aprendido y avisa cuando las condiciones cambian." },
];
const CAPS_EN = [
  { v: "Read", q: "What's changing?", c: "var(--signal-cyan)", art: "Signal radar", p: "We separate signal from noise. We identify the moves in the environment that actually matter for your decision, before they become obvious to everyone." },
  { v: "Interpret", q: "What does it mean for us?", c: "var(--soft-violet)", art: "Tension map", p: "A signal without interpretation is a loose data point. We connect what's changing to what's straining your organization: where forces contradict, what pressure builds, what's at stake. It's the layer almost no one delivers — and the one that changes the conversation." },
  { v: "Decide", q: "What matters and what gets sacrificed?", c: "var(--change-violet)", art: "Decision matrix", p: "Every real decision means giving something up. We make the criteria, the trade-offs, and what each path costs explicit — so the decision stops depending on who talks loudest and starts depending on what weighs more." },
  { v: "Design", q: "What shape does it take?", c: "var(--change-violet)", art: "Living roadmap", p: "A decision without form doesn't get executed. We give it a body: the sequence of moves, the prototype that tests the bet, the narrative that aligns the team. Strategy stops being intention and becomes something you can start on Monday." },
  { v: "Sustain", q: "How does it stay alive?", c: "var(--ink-graphite)", art: "Mission Control", p: "The hard part isn't deciding well once. It's not losing the course when the environment moves again. We install the strategic memory that keeps the decision alive, records what's learned, and flags when conditions change." },
];

const ESCALERA_ES: Array<{ n: string; tag: string; c: string; p: string; g: GlyphName; duration: string }> = [
  { n: "Mapa de Claridad", tag: "Entrada", c: "var(--opportunity-orange)", g: "nav", duration: "2–3 SEMANAS", p: "El punto de partida. Tomamos la decisión que tienes enfrente y la ponemos en orden: qué cambia, qué tensiona, qué está en juego. Sales con un diagnóstico que tu equipo no tenía y con la primera versión de tus artefactos." },
  { n: "Sprint de Rumbo", tag: "Acotado", c: "var(--change-violet)", g: "decision", duration: "6–10 SEMANAS", p: "Un trabajo enfocado sobre un reto definido. Recorremos las cinco capacidades sobre tu caso real y aterrizamos la decisión en instrumentos. Sales con una respuesta diseñada, lista para ejecutar." },
  { n: "Mission Control", tag: "Sistema vivo", c: "var(--success)", g: "status", duration: "CONTINUO", p: "La infraestructura de memoria estratégica que mantiene viva cada decisión y avisa cuando el entorno se mueve. El destino de quien ya construyó músculo, no el punto de entrada." },
];
const ESCALERA_EN: Array<{ n: string; tag: string; c: string; p: string; g: GlyphName; duration: string }> = [
  { n: "Clarity Map", tag: "Entry", c: "var(--opportunity-orange)", g: "nav", duration: "2–3 WEEKS", p: "The starting point. We take the decision in front of you and put it in order: what's changing, what's straining, what's at stake. You leave with a diagnosis your team didn't have and the first version of your artifacts." },
  { n: "Direction Sprint", tag: "Bounded", c: "var(--change-violet)", g: "decision", duration: "6–10 WEEKS", p: "Focused work on a defined challenge. We run the five capacities over your real case and land the decision in instruments. You leave with a designed answer, ready to execute." },
  { n: "Mission Control", tag: "Living system", c: "var(--success)", g: "status", duration: "ONGOING", p: "The strategic-memory infrastructure that keeps every decision alive and flags when the environment moves. The destination for those who already built muscle, not the entry point." },
];

const CAP_COPY = {
  es: {
    scaffoldKicker: "Capacidades · Método",
    titlePre: "Capacidad de futuro: la habilidad de responder antes", titleAccent: "de que el problema tenga nombre.",
    lead: "Mientras la mayoría contrata respuestas a problemas ya nombrados, Change construye la capacidad de responder a los que todavía no lo tienen.",
    quesKicker: "Qué es", quesTitle: "Saber qué hacer antes de que la urgencia decida por ti.", quesLead: "La habilidad de una organización para interpretar el cambio, decidir, diseñar respuestas y sostener el aprendizaje antes de que el entorno la obligue a reaccionar. Una forma de operar, instalada en la organización.",
    ques: [
      { h: "Se ancla en una tensión real", p: "Cada arco de trabajo parte de la decisión específica que tu organización tiene enfrente y que aún no encuentra forma." },
      { h: "Se prueba en una decisión", p: "Se mide en si la siguiente decisión difícil se toma mejor, más rápido y con menos dependencia de una sola cabeza." },
      { h: "Se ve en un artefacto", p: "Cada avance deja un instrumento concreto: un radar, un mapa, una matriz. La capacidad se vuelve algo que tu equipo puede leer y usar." },
    ],
    fiveKicker: "Las cinco capacidades", fiveTitle: "Cinco movimientos para convertir incertidumbre en decisión.", fiveLead: "Cada capacidad responde una pregunta distinta y deja un instrumento concreto. Juntas forman el método con el que una organización pasa de reaccionar a anticipar.",
    artKicker: "La capacidad se ve", artTitle: "Cada capacidad deja un instrumento.", artLead: "Construimos instrumentos de decisión: artefactos con los que el pensamiento se vuelve algo que tu equipo puede leer, usar y defender.",
    buildKicker: "Construcción progresiva", buildTitle: "La capacidad no se entrega de golpe. Se construye por etapas.", buildLead: "Empiezas con una decisión y, si el sistema lo amerita, lo conviertes en una forma permanente de operar. Cada etapa deja valor por sí sola y prepara la siguiente.",
    ctaTitle: "El mejor momento para construir capacidad es antes de necesitarla.", ctaLead: "Cada relación arranca con la decisión que ya tienes enfrente. Trae una y la trabajamos juntos.", ctaWork: "Iniciar la conversación", ctaCases: "Ver capacidades instaladas",
  },
  en: {
    scaffoldKicker: "Capabilities · Method",
    titlePre: "Future capacity: the ability to respond before", titleAccent: "the problem has a name.",
    lead: "While most hire answers to problems already named, Change builds the capacity to respond to the ones that don't have a name yet.",
    quesKicker: "What it is", quesTitle: "Knowing what to do before urgency decides for you.", quesLead: "An organization's ability to interpret change, decide, design responses, and sustain learning before the environment forces it to react. A way of operating, installed in the organization.",
    ques: [
      { h: "Anchored in a real tension", p: "Every arc of work starts from the specific decision your organization has in front of it and hasn't yet found a shape for." },
      { h: "Proven in a decision", p: "It's measured by whether the next hard decision is made better, faster, and with less dependence on a single head." },
      { h: "Visible in an artifact", p: "Every step leaves a concrete instrument: a radar, a map, a matrix. Capacity becomes something your team can read and use." },
    ],
    fiveKicker: "The five capacities", fiveTitle: "Five moves to turn uncertainty into a decision.", fiveLead: "Each capacity answers a different question and leaves a concrete instrument. Together they form the method by which an organization moves from reacting to anticipating.",
    artKicker: "Capacity is visible", artTitle: "Each capacity leaves an instrument.", artLead: "We build instruments for deciding: artifacts that turn thinking into something your team can read, use, and defend.",
    buildKicker: "Progressive construction", buildTitle: "Capacity isn't delivered all at once. It's built in stages.", buildLead: "You start with a decision and, if the system warrants it, turn it into a permanent way of operating. Each stage delivers value on its own and sets up the next.",
    ctaTitle: "The best time to build capacity is before you need it.", ctaLead: "Every relationship starts with the decision already in front of you. Bring one and we'll work it together.", ctaWork: "Start the conversation", ctaCases: "See installed capabilities",
  },
};

export function CapacidadesView({ lang }: { lang: Lang }) {
  const t = CAP_COPY[lang];
  const CAPS = lang === "en" ? CAPS_EN : CAPS_ES;
  const ESCALERA = lang === "en" ? ESCALERA_EN : ESCALERA_ES;
  return (
    <PageScaffold
      lang={lang}
      kicker={t.scaffoldKicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} accentGradient="var(--gradient-type-dark-mineral)" />}
      lead={t.lead}
    >
      {/* ═══ QUÉ ES ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head kicker={t.quesKicker} title={t.quesTitle} lead={t.quesLead} />
          <div className="cap-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {t.ques.map((c, i) => (
              <Reveal key={c.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 32, minHeight: 210, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: 0, font: "600 clamp(20px,1.8vw,24px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LAS 5 CAPACIDADES ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-white-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head kicker={t.fiveKicker} title={t.fiveTitle} lead={t.fiveLead} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CAPS.map((c, i) => (
              <Reveal key={c.v} delay={i * 70} as="article" className="cap-cap ch-card" style={{ display: "grid", gridTemplateColumns: "240px 1fr 220px", gap: 28, alignItems: "center", background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: "30px 32px" }}>
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)", marginBottom: 8 }}>
                    <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: c.c }} />{c.q}
                  </span>
                  <h3 style={{ margin: 0, font: "600 clamp(24px,2.4vw,34px) var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.v}</h3>
                </div>
                <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", border: "1px solid var(--border-subtle)", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                    <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: c.c }} />{c.art}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARTEFACTOS ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head kicker={t.artKicker} title={t.artTitle} lead={t.artLead} />
          <ArtifactGallery lang={lang} />
        </div>
      </section>

      {/* ═══ CONSTRUCCIÓN PROGRESIVA (escalera viva line-and-node) ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-white-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head kicker={t.buildKicker} title={t.buildTitle} lead={t.buildLead} />
          <ProgressiveBuild stages={ESCALERA} lang={lang} />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(32px,5vw,68px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.ctaTitle}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.ctaLead}</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            <Link href={localizeHref("/casos", lang)} className="btn btn-dghost">{t.ctaCases}</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .cap-head, .cap-mesa { grid-template-columns: 1fr !important; }
          .cap-grid3, .cap-ladder { grid-template-columns: 1fr !important; }
          .cap-grid4 { grid-template-columns: 1fr 1fr !important; }
          .cap-cap { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 620px) {
          .cap-grid4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}

export default function CapacidadesPage() {
  return <CapacidadesView lang="es" />;
}
