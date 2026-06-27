import type { Metadata } from "next";
import Link from "next/link";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MethodFlow from "@/components/MethodFlow";
import SystemicDescent from "@/components/SystemicDescent";
import CapacityScore from "@/components/CapacityScore";
import MissionControlLive from "@/components/MissionControlLive";
import EtherealDivider from "@/components/ds/EtherealDivider";
import WorkEvidence from "@/components/WorkEvidence";
import ConstellationField from "@/components/ds/ConstellationField";
import { Badge, SignalField, Glyph, type BadgeTone, type GlyphName } from "@/components/ds";

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

/* ── shared section-head ── */
function SectionHead({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return (
    <div className="ch-sechead" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(280px,420px)", gap: 60, alignItems: "end", marginBottom: 60 }}>
      <div>
        <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
          <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
          <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{kicker}</span>
        </Reveal>
        <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.4vw,62px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{title}</Reveal>
      </div>
      <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{lead}</Reveal>
    </div>
  );
}

const ARCO: Array<{ es: string; en: string; c: string; g: GlyphName }> = [
  { es: "Leer", en: "Read", c: "var(--signal-cyan)", g: "read" },
  { es: "Interpretar", en: "Interpret", c: "var(--soft-violet)", g: "risk" },
  { es: "Decidir", en: "Decide", c: "var(--change-violet)", g: "decision" },
  { es: "Diseñar", en: "Design", c: "var(--human-pink)", g: "project" },
  { es: "Sostener", en: "Sustain", c: "var(--success)", g: "status" },
];

const ARTEFACTOS_ES = [
  { h: "Radar de señales", p: "Lo que está cambiando alrededor, ordenado por relevancia y no por volumen de ruido.", k: "Leer", c: "var(--signal-cyan)" },
  { h: "Mapa de tensiones", p: "Las fuerzas que se contradicen dentro de la organización, nombradas para poder trabajarlas.", k: "Interpretar", c: "var(--soft-violet)" },
  { h: "Matriz de decisión", p: "Qué se gana y qué se sacrifica en cada opción, con el costo a la vista.", k: "Decidir", c: "var(--change-violet)" },
  { h: "Roadmap vivo", p: "La decisión convertida en secuencia de movimientos, que se actualiza cuando cambia el terreno.", k: "Diseñar", c: "var(--change-violet)" },
  { h: "Reporte ejecutivo", p: "El diagnóstico completo en lenguaje de dirección, lista para llevar al board que decide.", k: "Síntesis", c: "var(--opportunity-orange)" },
  { h: "Mission Control", p: "Donde señales, decisiones, proyectos y reportes se mantienen vivos y conectados.", k: "Sostener", c: "var(--ink-graphite)" },
];
const ARTEFACTOS_EN = [
  { h: "Signal radar", p: "What's changing around you, ordered by relevance, not by volume of noise.", k: "Read", c: "var(--signal-cyan)" },
  { h: "Tension map", p: "The forces that contradict each other inside the organization, named so you can work them.", k: "Interpret", c: "var(--soft-violet)" },
  { h: "Decision matrix", p: "What you gain and what you sacrifice in each option, with the cost in plain sight.", k: "Decide", c: "var(--change-violet)" },
  { h: "Living roadmap", p: "The decision turned into a sequence of moves that updates when the terrain changes.", k: "Design", c: "var(--change-violet)" },
  { h: "Executive report", p: "The full diagnosis in leadership language, ready to take to the board that decides.", k: "Synthesis", c: "var(--opportunity-orange)" },
  { h: "Mission Control", p: "Where signals, decisions, projects, and reports stay alive and connected.", k: "Sustain", c: "var(--ink-graphite)" },
];

const MANIFIESTO_ES = [
  { k: "Se ancla en lo que está cambiando", p: "Cada arco de trabajo arranca en una señal real del entorno y una decisión específica que la organización tiene enfrente." },
  { k: "Se entrena en decisiones reales", p: "Cada reto instala músculo. La capacidad se hace ejercitándola sobre casos concretos, no aprendiéndola en abstracto." },
  { k: "Se ve en artefactos", p: "Radar, mapa, matriz, roadmap, memoria: instrumentos que se leen, se discuten y se usan para decidir." },
  { k: "Se sostiene con memoria", p: "El porqué de cada decisión queda vivo. La próxima coyuntura no empieza de cero." },
];
const MANIFIESTO_EN = [
  { k: "Anchored in what's changing", p: "Every arc of work starts from a real signal in the environment and a specific decision the organization has in front of it." },
  { k: "Trained on real decisions", p: "Every challenge installs muscle. Capacity is made by exercising it on concrete cases, not by learning it in the abstract." },
  { k: "Visible in artifacts", p: "Radar, map, matrix, roadmap, memory: instruments that are read, discussed, and used to decide." },
  { k: "Sustained with memory", p: "The why behind each decision stays alive. The next turn doesn't start from zero." },
];

const COMO_TRABAJA_ES = [
  { n: "01", h: "Primer diagnóstico", p: "Ordenamos la decisión, la tensión y lo que está cambiando. El objetivo es entender si hay una decisión real que vale la pena trabajar.", label: "Mapa de Claridad" },
  { n: "02", h: "Trabajo acotado", p: "Si hay tracción, construimos criterios, opciones, artefactos y un primer movimiento ejecutable. Con alcance definido desde el inicio.", label: "Sprint de Rumbo" },
  { n: "03", h: "Capacidad instalada", p: "Cuando el reto lo amerita, dejamos memoria, seguimiento y gobernanza para que la decisión no se pierda después de la sesión.", label: "Mission Control" },
];
const COMO_TRABAJA_EN = [
  { n: "01", h: "First diagnosis", p: "We order the decision, the tension, and what's changing. The goal is to understand whether there's a real decision worth working.", label: "Clarity Map" },
  { n: "02", h: "Bounded work", p: "If there's traction, we build criteria, options, artifacts, and an executable first move. With scope defined from the start.", label: "Direction Sprint" },
  { n: "03", h: "Installed capacity", p: "When the challenge warrants it, we leave memory, follow-through, and governance so the decision isn't lost after the session.", label: "Mission Control" },
];

const FN_FLOW = [
  { es: "Señal", en: "Signal", pEs: "qué cambió en el entorno", pEn: "what changed in the environment", g: "insight" as GlyphName, c: "var(--signal-cyan)" },
  { es: "Tensión sistémica", en: "Systemic tension", pEs: "qué fuerza de fondo revela", pEn: "what underlying force it reveals", g: "risk" as GlyphName, c: "var(--soft-violet)" },
  { es: "Pregunta estratégica", en: "Strategic question", pEs: "qué obliga a preguntarse", pEn: "what it forces you to ask", g: "decision" as GlyphName, c: "var(--change-violet)" },
  { es: "Implicación", en: "Implication", pEs: "qué deja de ser cierto", pEn: "what stops being true", g: "project" as GlyphName, c: "var(--change-violet)" },
  { es: "Decisión que abre", en: "Decision it opens", pEs: "qué empieza a poder decidirse", pEn: "what becomes decidable", g: "status" as GlyphName, c: "var(--ink-graphite)" },
];

const COPY = {
  es: {
    heroBadge: "Capacidad de futuro",
    heroH1a: "La certeza dejó de ser", heroH1b: "condición para actuar.",
    heroLead: "Change ayuda a organizaciones a leer lo que cambia, decidir sin esperar certeza y sostener aprendizaje antes de que la urgencia decida por ellas.",
    ctaWork: "Trabajar una decisión", ctaMeasure: "Medir mi capacidad de futuro",
    tenseKicker: "Tensiones sistémicas", tenseTitle: "El problema no es el cambio. Es no tener capacidad para interpretarlo a tiempo.", tenseLead: "Una tensión no nace en tu organización: baja hasta ella. Recorre el descenso — de la época al contexto, del contexto a la decisión que tienes enfrente.",
    scoreKicker: "Instrumento", scoreTitle: "Mide dónde se rompe tu capacidad para actuar sin certeza.", scoreLead: "Dos minutos. Cinco capacidades. Un primer movimiento concreto.",
    maniKicker: "Manifiesto · Capacidad de futuro", maniTitle: "La habilidad organizacional de actuar cuando todavía no hay certeza.", maniLead: "Una forma de operar instalada en la organización: leer señales débiles, decidir con criterio explícito y sostener el aprendizaje cuando el contexto vuelve a moverse.",
    maniQuote: "La pregunta es si tu organización tendrá capacidad para leer el contexto, decidir y moverse antes de que la urgencia decida por ella.", maniFoot: "Esperar también decide.",
    methodKicker: "El método", methodTitle: "Leer. Interpretar. Decidir. Diseñar. Sostener.", methodLead: "Cinco movimientos que convierten incertidumbre en instrumentos de decisión. Toca cada uno: verás la pregunta que resuelve, el riesgo que reduce y el artefacto que deja.",
    artKicker: "Artefactos", artTitle: "La capacidad de futuro se ve.", artLead: "Instrumentos concretos que se leen, se discuten y se usan para decidir.",
    mcKicker: "Memoria estratégica", mcTitle: "La estrategia necesita memoria.", mcLead: "Sostiene señales, decisiones y reportes vivos para que la organización no reinvente el rumbo cada vez que el contexto cambia. La infraestructura donde el aprendizaje se queda instalado.", mcCta: "Ver Mission Control", mcCta2: "Ver el método",
    workKicker: "Cómo se trabaja con Change", workTitlea: "Toda relación con Change empieza con una", workTitleb: "decisión real.", workLead: "Desde ahí construimos, de forma acotada y progresiva — sin retainer abierto ni alcance difuso.", workFoot: "La urgencia suele cobrar más caro que la anticipación.",
    fnKicker: "Field Notes", fnTitle: "Notas cortas sobre lo que cambia — y la decisión que abre.", fnLead: "Cada nota toma una señal real del entorno y la recorre completa: de qué cambió a qué decisión queda en tus manos. Pocas notas, ninguna de relleno.", fnJourney: "El recorrido de cada nota", fnCta: "Ver las Field Notes", fnNote: "Las Field Notes existen cuando una señal merece convertirse en decisión.",
    ctaKicker: "El primer movimiento", ctaTitle: "Empieza por una decisión. Construye capacidad desde ahí.", ctaLead: "La primera conversación no vende nada cerrado: identifica qué tensión enfrentas y cuál es el primer paso, acotado y concreto.", ctaWork2: "Trabajar una decisión", ctaMethod: "Conocer el método",
  },
  en: {
    heroBadge: "Future Capacity",
    heroH1a: "Certainty is no longer", heroH1b: "a condition for acting.",
    heroLead: "Change helps organizations read what's changing, decide without waiting for certainty, and sustain learning before urgency decides for them.",
    ctaWork: "Work on a decision", ctaMeasure: "Measure my future capacity",
    tenseKicker: "Systemic tensions", tenseTitle: "The problem isn't change. It's not having the capacity to interpret it in time.", tenseLead: "A tension isn't born in your organization: it descends into it. Follow the descent — from the era to the context, from the context to the decision in front of you.",
    scoreKicker: "Instrument", scoreTitle: "Measure where your capacity to act without certainty breaks.", scoreLead: "Two minutes. Five capacities. One concrete first move.",
    maniKicker: "Manifesto · Future Capacity", maniTitle: "The organizational ability to act when there's still no certainty.", maniLead: "A way of operating installed in the organization: read weak signals, decide with explicit criteria, and sustain learning when the context shifts again.",
    maniQuote: "The question is whether your organization will have the capacity to read the context, decide, and move before urgency decides for it.", maniFoot: "Waiting decides too.",
    methodKicker: "The method", methodTitle: "Read. Interpret. Decide. Design. Sustain.", methodLead: "Five moves that turn uncertainty into instruments for deciding. Tap each one: you'll see the question it answers, the risk it reduces, and the artifact it leaves.",
    artKicker: "Artifacts", artTitle: "Future capacity is visible.", artLead: "Concrete instruments that are read, discussed, and used to decide.",
    mcKicker: "Strategic memory", mcTitle: "Strategy needs memory.", mcLead: "It keeps signals, decisions, and reports alive so the organization doesn't reinvent its course every time the context changes. The infrastructure where learning stays installed.", mcCta: "See Mission Control", mcCta2: "See the method",
    workKicker: "How working with Change works", workTitlea: "Every relationship with Change starts with a", workTitleb: "real decision.", workLead: "From there we build, in a bounded and progressive way — no open retainer, no fuzzy scope.", workFoot: "Urgency usually charges more than anticipation.",
    fnKicker: "Field Notes", fnTitle: "Short notes on what's changing — and the decision it opens.", fnLead: "Each note takes a real signal from the environment and walks it all the way: from what changed to what decision lands in your hands. Few notes, none for filler.", fnJourney: "The journey of each note", fnCta: "See the Field Notes", fnNote: "Field Notes exist when a signal deserves to become a decision.",
    ctaKicker: "The first move", ctaTitle: "Start with a decision. Build capacity from there.", ctaLead: "The first conversation sells nothing closed: it identifies which tension you face and what the first step is — bounded and concrete.", ctaWork2: "Work on a decision", ctaMethod: "Get to know the method",
  },
};

/* Map de color-token a tono semántico del Badge DS. */
function mapTone(colorVar: string): BadgeTone {
  switch (colorVar) {
    case "var(--signal-cyan)":          return "signal";
    case "var(--soft-violet)":          return "violet";
    case "var(--change-violet)":        return "violet";
    case "var(--opportunity-orange)":   return "opportunity";
    case "var(--ink-graphite)":         return "neutral";
    case "var(--human-pink)":           return "opportunity";
    default:                            return "neutral";
  }
}

export function HomeView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const ARTEFACTOS = lang === "en" ? ARTEFACTOS_EN : ARTEFACTOS_ES;
  const MANIFIESTO = lang === "en" ? MANIFIESTO_EN : MANIFIESTO_ES;
  const COMO_TRABAJA = lang === "en" ? COMO_TRABAJA_EN : COMO_TRABAJA_ES;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header lang={lang} />
      <main id="main-content" style={{ flex: 1 }}>

        {/* ═══ 01 · HERO ═══ */}
        <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 50% -10%,rgba(138,108,255,.14) 0%,rgba(89,184,217,.06) 34%,rgba(255,255,255,0) 60%),var(--gradient-celestial-horizon)" }}>
          <SignalField />
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,156px) 0 clamp(72px,9vw,116px)", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 34, padding: "7px 14px 7px 11px", border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.55)" }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.heroBadge}</span>
            </Reveal>

            <Reveal delay={60} as="h1" style={{ margin: "0 auto", maxWidth: "17ch", font: "600 clamp(42px,7vw,104px)/.94 var(--font-primary)", letterSpacing: "-.055em", color: "var(--ink-graphite)" }}>
              <span style={{ background: "var(--gradient-type-neutral-pulse)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.heroH1a}</span>{" "}
              <span style={{ background: "var(--gradient-type-dark-future)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.heroH1b}</span>
            </Reveal>

            <Reveal delay={120} as="p" style={{ margin: "clamp(28px,4vw,40px) auto 0", maxWidth: 620, font: "400 clamp(18px,1.6vw,22px)/1.5 var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>
              {t.heroLead}
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
              <Link href={localizeHref("/contacto", lang)} className="btn btn-primary">{t.ctaWork}</Link>
              <Link href="#score" className="btn btn-secondary">{t.ctaMeasure}</Link>
            </Reveal>

            <Reveal delay={280}>
              <div aria-hidden="true" className="ch-herochain" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: "clamp(44px,6vw,68px)" }}>
                {ARCO.map((n, i, arr) => (
                  <span key={n.es} className="ch-arcitem" style={{ ["--ac" as string]: n.c, display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <span aria-hidden="true" className="ch-arcglyph">
                        <Glyph name={n.g} size={20} />
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                        <span className="ch-arcdot" />
                        <span className="ch-arclabel">{lang === "en" ? n.en : n.es}</span>
                      </span>
                    </span>
                    {i < arr.length - 1 && <span aria-hidden="true" style={{ width: 24, height: 1, background: "var(--line-structural)", opacity: 0.5 }} />}
                  </span>
                ))}
              </div>
              <style>{`
                .ch-arcglyph { display: inline-flex; color: var(--ink-graphite); opacity: .68; transition: color .3s var(--ease-premium), opacity .3s var(--ease-premium), transform .3s var(--ease-premium); }
                .ch-arcdot { width: 8px; height: 8px; border-radius: 999px; background: var(--ink-graphite); opacity: .5; transition: background .3s var(--ease-premium), opacity .3s var(--ease-premium); }
                .ch-arclabel { font: 600 var(--text-meta) var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); transition: color .3s var(--ease-premium); }
                .ch-arcitem:hover .ch-arcglyph { color: var(--ac); opacity: 1; transform: translateY(-2px); }
                .ch-arcitem:hover .ch-arcdot { background: var(--ac); opacity: 1; }
                .ch-arcitem:hover .ch-arclabel { color: var(--ink-graphite); }
                @media (prefers-reduced-motion: reduce) {
                  .ch-arcglyph, .ch-arcdot, .ch-arclabel { transition: none; }
                  .ch-arcitem:hover .ch-arcglyph { transform: none; }
                }
              `}</style>
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 02 · TENSIONES SISTÉMICAS ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker={t.tenseKicker} title={t.tenseTitle} lead={t.tenseLead} />
            <Reveal delay={120}><SystemicDescent lang={lang} /></Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 03 · SCORE DE CAPACIDAD DE FUTURO ═══ */}
        <section id="score" style={{ background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 720, margin: "0 auto clamp(40px,5vw,56px)", textAlign: "center" }}>
              <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.scoreKicker}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.scoreTitle}</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "20px auto 0", maxWidth: "52ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.scoreLead}</Reveal>
            </div>
            <Reveal delay={160}><CapacityScore lang={lang} /></Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 04 · MANIFIESTO DE CAPACIDAD DE FUTURO ═══ */}
        <section style={{ background: "var(--gradient-violet-whisper)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 880, marginBottom: "clamp(40px,5vw,56px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.maniKicker}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.maniTitle}</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "62ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
{t.maniLead}
              </Reveal>
            </div>

            <div className="ch-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: "clamp(40px,5vw,56px)" }}>
              {MANIFIESTO.map((idea, i) => (
                <Reveal key={idea.k} delay={(i % 4) * 60} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderTop: `3px solid var(--change-violet)`, padding: "26px 24px 28px", display: "flex", flexDirection: "column" }}>
                  <h3 style={{ margin: 0, font: "600 17px/1.18 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{idea.k}</h3>
                  <p style={{ margin: "12px 0 0", font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)", flexGrow: 1 }}>{idea.p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <blockquote style={{ margin: 0, padding: "clamp(28px,3vw,40px) clamp(24px,3vw,40px)", borderLeft: "3px solid var(--change-violet)", background: "rgba(109,59,255,.04)" }}>
                <p style={{ margin: 0, font: "600 clamp(18px,2vw,26px)/1.35 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>
                  {t.maniQuote}
                </p>
                <footer style={{ marginTop: 18, font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.maniFoot}</footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 05 · MÉTODO ═══ */}
        <section id="metodo" style={{ background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 820, marginBottom: "clamp(40px,5vw,60px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.methodKicker}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.6vw,66px)/.96 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.methodTitle}</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "60ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.methodLead}</Reveal>
            </div>
            <Reveal delay={160}><MethodFlow lang={lang} /></Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 06 · ARTEFACTOS ═══ */}
        <section style={{ background: "var(--gradient-violet-whisper)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(68px,8vw,116px) 0" }}>
            <SectionHead kicker={t.artKicker} title={t.artTitle} lead={t.artLead} />
            <div className="ch-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {ARTEFACTOS.map((a, i) => (
                <Reveal key={a.h} delay={(i % 3) * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderTop: `3px solid ${a.c}`, padding: "28px 26px 30px", display: "flex", flexDirection: "column", minHeight: 200 }}>
                  <span style={{ display: "inline-flex" }}>
                    <Badge tone={mapTone(a.c)}>{a.k}</Badge>
                  </span>
                  <h3 style={{ margin: "16px 0 0", font: "600 20px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{a.h}</h3>
                  <p style={{ margin: "10px 0 0", font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{a.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div aria-hidden="true" style={{ height: "clamp(80px,8vw,120px)", background: "linear-gradient(180deg, var(--surface-soft) 0%, var(--surface-dark) 100%)" }} />
        {/* ═══ 07 · MISSION CONTROL (dark) ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-dark-signal-field)" }}>
          <ConstellationField />
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-missionshell" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.mcKicker}</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.4vw,64px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>{t.mcTitle}</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.5vw,21px)/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.mcLead}</Reveal>
                <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                  <Link href={localizeHref("/mission-control", lang)} target="_blank" rel="noopener noreferrer" className="btn btn-light">{t.mcCta}</Link>
                  <Link href={localizeHref("/capacidades", lang)} className="btn btn-dghost">{t.mcCta2}</Link>
                </Reveal>
              </div>
              <Reveal delay={160}><MissionControlLive lang={lang} /></Reveal>
            </div>
          </div>
        </section>

        <div aria-hidden="true" style={{ height: "clamp(80px,8vw,120px)", background: "linear-gradient(180deg, var(--surface-dark-secondary) 0%, var(--surface-page) 100%)" }} />
        {/* ═══ 09 · CÓMO SE TRABAJA CON CHANGE ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 820, marginBottom: "clamp(44px,6vw,64px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.workKicker}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                <span style={{ background: "var(--gradient-type-neutral-pulse)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.workTitlea}</span>{" "}
                <span style={{ background: "var(--gradient-type-dark-ember)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.workTitleb}</span>
              </Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "60ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.workLead}</Reveal>
            </div>

            <div className="ch-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 36 }}>
              {COMO_TRABAJA.map((paso, i) => (
                <Reveal key={paso.h} delay={i * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: "32px 28px 36px", display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "block", font: "300 clamp(38px,4vw,54px)/1 var(--font-accent)", letterSpacing: "-.04em", color: "var(--change-violet)", marginBottom: 20 }}>{paso.n}</span>
                  <h3 style={{ margin: "0 0 12px", font: "600 clamp(18px,1.6vw,22px)/1.15 var(--font-primary)", letterSpacing: "-.025em", color: "var(--ink-graphite)" }}>{paso.h}</h3>
                  <p style={{ margin: "0 0 24px", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)", flexGrow: 1 }}>{paso.p}</p>
                  <span style={{ display: "inline-flex", borderTop: "1px solid var(--border-subtle)", paddingTop: 16 }}>
                    <Badge tone="violet">{paso.label}</Badge>
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-mono)", letterSpacing: ".02em", color: "var(--text-muted)", fontStyle: "italic" }}>{t.workFoot}</p>
            </Reveal>
          </div>
        </section>

        {/* ═══ 12.5 · WORK EVIDENCE ═══ */}
        <WorkEvidence lang={lang} />

        <EtherealDivider />
        {/* ═══ 13 · FIELD NOTES ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(68px,8vw,116px) 0" }}>
            <SectionHead kicker={t.fnKicker} title={t.fnTitle} lead={t.fnLead} />
            <Reveal className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.7)", padding: "clamp(32px,4vw,48px)" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.fnJourney}</span>

              {/* Flow vivo: rail con gradient animado fluyendo + nodos con glifo y pulse stagger */}
              <div className="ch-fnflow" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, margin: "44px 0 28px" }}>
                {/* Rail estructural base */}
                <div aria-hidden="true" style={{ position: "absolute", left: "10%", right: "10%", top: 16, height: 2, background: "var(--line-structural)", opacity: 0.4 }} />
                {/* Rail vivo — gradient que fluye horizontal */}
                <div aria-hidden="true" className="ch-fnflow-flow" style={{ position: "absolute", left: "10%", right: "10%", top: 16, height: 2, backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(109,59,255,0.35) 30%, rgba(89,184,217,0.4) 50%, rgba(138,108,255,0.45) 70%, transparent 100%)", backgroundSize: "200% 100%", backgroundRepeat: "no-repeat" }} />

                {FN_FLOW.map((s, i) => (
                  <div key={s.es} className="ch-fnflow-node" style={{ position: "relative", paddingTop: 50, textAlign: "left" }}>
                    {/* Nodo circular con glifo dentro — pulse stagger */}
                    <span aria-hidden="true" className="ch-fnflow-dot" style={{ position: "absolute", top: 0, left: 0, width: 34, height: 34, borderRadius: "50%", background: "var(--surface-card)", border: `1.5px solid ${s.c}`, color: s.c, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px rgba(255,255,255,.8)", animationDelay: `${i * 0.4}s` }}>
                      <Glyph name={s.g} size={16} />
                    </span>
                    <strong style={{ display: "block", font: "600 14.5px var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>{lang === "en" ? s.en : s.es}</strong>
                    <span style={{ display: "block", marginTop: 5, font: "400 13px/1.45 var(--font-primary)", color: "var(--text-muted)" }}>{lang === "en" ? s.pEn : s.pEs}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <Link href={localizeHref("/field-notes", lang)} className="btn btn-secondary btn-sm">{t.fnCta}</Link>
                <span style={{ font: "400 13px var(--font-primary)", color: "var(--text-muted)" }}>{t.fnNote}</span>
              </div>
            </Reveal>
          </div>
        </section>

        <div aria-hidden="true" style={{ height: "clamp(80px,8vw,120px)", background: "linear-gradient(180deg, var(--surface-page) 0%, var(--surface-dark-secondary) 100%)" }} />
        {/* ═══ 15 · CTA FINAL (dark) ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-violet-atmosphere), var(--surface-dark-secondary)" }}>
          <ConstellationField />
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(96px,12vw,176px) 0", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 26 }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.ctaKicker}</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(36px,5vw,76px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>{t.ctaTitle}</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "26px auto 0", maxWidth: 600, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.ctaLead}</Reveal>
            <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 40 }}>
              <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork2}</Link>
              <Link href={localizeHref("/capacidades", lang)} className="btn btn-dghost">{t.ctaMethod}</Link>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer lang={lang} />

      <style>{`
        @media (max-width: 980px) {
          .ch-sechead, .ch-grid3, .ch-missionshell, .ch-declist, .ch-teamstrip { grid-template-columns: 1fr !important; }
          .ch-grid4 { grid-template-columns: 1fr 1fr !important; }
          .ch-mrow { grid-template-columns: 170px 1fr !important; }
          .ch-mrow > div:last-child { display: none !important; }
          .ch-fnflow { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .ch-herochain { display: none !important; }
        }
        @media (max-width: 620px) {
          .ch-grid4 { grid-template-columns: 1fr !important; }
          .ch-fnflow { grid-template-columns: 1fr !important; }
          .ch-mrow { grid-template-columns: 1fr !important; }
          .ch-mrow > div:first-child { padding-bottom: 0 !important; }
        }
      `}</style>
    </div>
  );
}

export const metadata: Metadata = {
  alternates: altLinks("/"),
};

export default function Page() {
  return <HomeView lang="es" />;
}
