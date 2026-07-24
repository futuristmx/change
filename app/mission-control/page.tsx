import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import MissionControlLive from "@/components/MissionControlLive";
import EtherealDivider from "@/components/ds/EtherealDivider";
import AscentLayers, { type AscentLevel } from "@/components/AscentLayers";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Mission Control: donde la capacidad de futuro se sostiene",
  description:
    "Memoria estratégica viva: la infraestructura de continuidad donde señales, decisiones y rumbo se mantienen conectados — el porqué de cada decisión sigue disponible cuando cambia el contexto.",
  alternates: altLinks("/mission-control"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Mission Control: donde la capacidad de futuro se sostiene" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const TENSIONES_ES = [
  { k: "Reinvención del rumbo", t: "tensión 01", p: "Cada trimestre el equipo vuelve a discutir lo que ya se había decidido, porque nadie recuerda con qué razón se cerró la conversación anterior." },
  { k: "Pérdida de memoria", t: "tensión 02", p: "El porqué de una decisión clave vive en la cabeza de una persona o en un correo que nadie encuentra. Cuando esa persona no está, el porqué desaparece." },
  { k: "Decisiones aisladas", t: "tensión 03", p: "Una señal del entorno, una decisión de inversión y una entrega del roadmap ocurren en mundos separados, sin que nadie vea cómo una afecta a la otra." },
];
const TENSIONES_EN = [
  { k: "Reinventing the course", t: "tension 01", p: "Every quarter the team re-debates what was already decided, because no one remembers the reasoning that closed the previous conversation." },
  { k: "Loss of memory", t: "tension 02", p: "The why behind a key decision lives in one person's head or in an email no one can find. When that person is gone, the why disappears." },
  { k: "Isolated decisions", t: "tension 03", p: "An environmental signal, an investment decision and a roadmap delivery happen in separate worlds, with no one seeing how one affects the other." },
];

const ESCALERA_ES: AscentLevel[] = [
  { n: "Mapa de Claridad", tag: "empieza aquí", p: "El punto de entrada. Una decisión, leída e interpretada hasta volverse accionable.", g: "read", c: "var(--signal-cyan)" },
  { n: "Sprint de Rumbo", tag: "después", p: "Un reto acotado, trabajado de principio a fin con los instrumentos del método.", g: "decision", c: "var(--human-pink)" },
  { n: "Mission Control", tag: "el sistema vivo", p: "El sistema vivo que sostiene el rumbo en el tiempo. Llega cuando hay capacidad que sostener.", g: "status", c: "var(--change-violet)" },
];
const ESCALERA_EN: AscentLevel[] = [
  { n: "Clarity Map", tag: "start here", p: "The entry point. A decision, read and interpreted until it becomes actionable.", g: "read", c: "var(--signal-cyan)" },
  { n: "Direction Sprint", tag: "next", p: "A bounded challenge, worked end to end with the method's instruments.", g: "decision", c: "var(--human-pink)" },
  { n: "Mission Control", tag: "the living system", p: "The living system that holds the course over time. It arrives when there's capacity to sustain.", g: "status", c: "var(--change-violet)" },
];

const MC_COPY = {
  es: {
    kicker: "Mission Control", titlePre: "Donde la capacidad de futuro", titleAccent: "se sostiene.",
    lead: "Las señales se interpretan, las decisiones se toman, los rumbos se diseñan. Mission Control es donde todo eso permanece vivo en lugar de perderse entre juntas.",
    quesK: "Qué es", quesH: "Memoria Viva: la continuidad estratégica de cada relación con Change.", quesP: "Mission Control es la memoria estratégica donde quedan vivos los criterios, señales, decisiones y rumbo de cada relación con Change. No es un producto que se compra: es la infraestructura de continuidad que queda instalada cuando una decisión necesita sostenerse en el tiempo.",
    access: "Acceso a Mission Control",
    avoidH: "Lo que evitamos", avoid: ["Un tablero que mira solo hacia atrás.", "Una herramienta más que el equipo aprende a ignorar.", "Un repositorio donde las decisiones se guardan y se olvidan."],
    buildH: "Lo que construimos", build: ["La infraestructura de continuidad de tu capacidad de futuro.", "El lugar donde señales, decisiones y rumbo dejan de vivir separados y empiezan a hablar entre sí.", "La memoria que mantiene vivo el porqué cuando cambia el contexto."],
    probK: "El problema que resuelve", probH: "El criterio no debería morir en una junta.", probP: "Sin un lugar donde sostenerse, la inteligencia estratégica se evapora. Mission Control existe para que el trabajo de leer, interpretar y decidir no se repita desde cero cada vez.",
    demoBadge: "Tres planos de una decisión · datos de ejemplo", demoH: "Señales, decisiones y rumbo, leídos juntos.", demoP: "Mission Control conecta lo que normalmente vive disperso. El radar de señales, la memoria de decisiones y el roadmap ejecutivo se leen juntos y se sostienen con rituales de seguimiento. Lo que ves aquí es un ejemplo: los datos son ficticios y existen solo para mostrar la estructura.",
    lastK: "El último escalón", lastH: "Mission Control no se instala. Se gana.",
    ctaH: "Empieza por la decisión, no por el sistema.", ctaP: "Tráenos una decisión que tu organización tenga que tomar bajo ambigüedad. La trabajamos juntos y, si hay capacidad que sostener, Mission Control llega después.", ctaWork: "Iniciar la conversación", ctaMethod: "Ver el método",
  },
  en: {
    kicker: "Mission Control", titlePre: "Where future capacity", titleAccent: "is sustained.",
    lead: "Signals get interpreted, decisions get made, courses get designed. Mission Control is where all of that stays alive instead of getting lost between meetings.",
    quesK: "What it is", quesH: "Living Memory: the strategic continuity of every relationship with Change.", quesP: "Mission Control is the strategic memory where the criteria, signals, decisions and course of every relationship with Change stay alive. It's not a product you buy: it's the continuity infrastructure that gets installed when a decision needs to hold over time.",
    access: "Access Mission Control",
    avoidH: "What we avoid", avoid: ["A dashboard that only looks backward.", "One more tool the team learns to ignore.", "A repository where decisions are stored and forgotten."],
    buildH: "What we build", build: ["The continuity infrastructure for your future capacity.", "The place where signals, decisions and course stop living apart and start talking to each other.", "The memory that keeps the why alive when the context changes."],
    probK: "The problem it solves", probH: "Judgment shouldn't die in a meeting.", probP: "Without a place to hold, strategic intelligence evaporates. Mission Control exists so the work of reading, interpreting and deciding isn't repeated from scratch every time.",
    demoBadge: "Three planes of a decision · sample data", demoH: "Signals, decisions and course, read together.", demoP: "Mission Control connects what usually lives scattered. The signal radar, the decision memory and the executive roadmap are read together and held with follow-through rituals. What you see here is an example: the data is fictional and exists only to show the structure.",
    lastK: "The last rung", lastH: "Mission Control isn't installed. It's earned.",
    ctaH: "Start with the decision, not the system.", ctaP: "Bring us a decision your organization has to make under ambiguity. We work it together and, if there's capacity to sustain, Mission Control comes after.", ctaWork: "Start the conversation", ctaMethod: "See the method",
  },
};

export function MissionControlView({ lang }: { lang: Lang }) {
  const t = MC_COPY[lang];
  const TENSIONES = lang === "en" ? TENSIONES_EN : TENSIONES_ES;
  const ESCALERA = lang === "en" ? ESCALERA_EN : ESCALERA_ES;
  return (
    <PageScaffold
      dark
      ambient
      lang={lang}
      kicker={t.kicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} preGradient="var(--gradient-type-light-rose-dark)" accentGradient="var(--gradient-type-light-mineral-dark)" />}
      lead={t.lead}
    >
      <EtherealDivider dark />
      {/* ═══ QUÉ ES / QUÉ NO ES ═══ */}
      <section style={{ background: "linear-gradient(180deg,var(--surface-dark-secondary),var(--surface-dark))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.quesK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 8px", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.quesH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(32px,4vw,40px)", maxWidth: "62ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.quesP}</Reveal>
          <Reveal delay={160} style={{ display: "inline-flex", flexWrap: "wrap", gap: 12, marginBottom: "clamp(40px,5vw,56px)" }}>
            <Link href={localizeHref("/mission-control/login", lang)} className="btn btn-light" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} data-pulse />
              {t.access}
            </Link>
          </Reveal>
          <div className="mc-vs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Reveal className="ch-card" style={{ border: "1px solid rgba(255,255,255,.1)", background: "var(--gradient-dark-card-slate)", padding: "32px 30px" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.avoidH}</span>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {t.avoid.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, font: "400 15.5px/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--error)" }} />{item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90} className="ch-card" style={{ border: "1px solid rgba(109,59,255,.32)", background: "var(--gradient-dark-card-violet)", padding: "32px 30px" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: "var(--change-violet-300)" }}>{t.buildH}</span>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {t.build.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, font: "400 15.5px/1.5 var(--font-primary)", color: "rgba(255,255,255,.82)" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--success)" }} />{item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <EtherealDivider dark />
      {/* ═══ EL PROBLEMA QUE RESUELVE ═══ */}
      <section style={{ background: "var(--surface-dark)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.probK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 18px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.probH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "58ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.probP}</Reveal>
          <div className="mc-foso" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {TENSIONES.map((c, i) => (
              <Reveal key={c.k} delay={i * 110} as="article" className="ch-card" style={{ border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", padding: "30px 28px", display: "flex", flexDirection: "column", minHeight: 230 }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--change-violet-300)" }}>{c.t}</span>
                <h3 style={{ margin: "14px 0 0", font: "600 clamp(20px,1.8vw,24px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--text-on-dark)" }}>{c.k}</h3>
                <p style={{ margin: "13px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EtherealDivider dark />
      {/* ═══ TRES PLANOS + DEMO ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 18%, transparent),transparent 42%),var(--surface-dark)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <div className="mc-demo" style={{ display: "grid", gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)", gap: "clamp(44px,5vw,80px)", alignItems: "start" }}>
            <div>
              <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 22, padding: "6px 12px", border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.04)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.demoBadge}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,3.6vw,50px)/1.0 var(--font-primary)", letterSpacing: "-.04em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.demoH}</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "46ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.demoP}</Reveal>
            </div>
            <Reveal delay={140}><MissionControlLive lang={lang} /></Reveal>
          </div>
        </div>
      </section>

      <EtherealDivider dark />
      {/* ═══ EL ÚLTIMO ESCALÓN ═══ */}
      <section style={{ background: "linear-gradient(180deg,var(--surface-dark),var(--surface-dark-secondary))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.lastK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.lastH}</Reveal>
          {/* Ascenso por horizontes estratégicos — la cumbre se gana */}
          <AscentLayers levels={ESCALERA} lang={lang} />
        </div>
      </section>

      <EtherealDivider dark />
      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 26%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.ctaH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 580, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.ctaP}</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            <Link href={localizeHref("/capacidades", lang)} className="btn btn-dghost">{t.ctaMethod}</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .mc-vs, .mc-demo, .mc-foso { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}

export default function MissionControlPage() {
  return <MissionControlView lang="es" />;
}
