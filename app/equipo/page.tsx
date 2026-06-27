import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import FoundersPanels from "@/components/FoundersPanels";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "El board senior que construye capacidad de futuro",
  description:
    "Interpretar el cambio, decidir bajo ambigüedad y sostener el rumbo no caben en una sola cabeza. Change reúne las formas de pensar que una decisión difícil necesita al mismo tiempo.",
  alternates: altLinks("/equipo"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "El board senior que construye capacidad de futuro" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const SOCIOS_ES = [
  {
    n: "Andrés Valencia", role: "Co-fundador", arc: "Leer · Interpretar",
    domain: "Foresight e innovación estratégica", c: "var(--signal-cyan)",
    photo: "/assets/founder-andres.jpg", focus: "center 28%",
    tagline: "Ve la señal cuando todavía es débil.",
    story: "Presidió el Consejo Promotor de Innovación y Diseño de México y formó parte del board de The Design Futures Initiative. Desde ahí entendió algo incómodo: las organizaciones rara vez fallan por falta de información — fallan por no leerla a tiempo. Fundó Change para cerrar esa brecha: leer el futuro mientras todavía es señal y nombrar la tensión que nadie en la sala se atreve a decir en voz alta.",
  },
  {
    n: "Miguel Cadena", role: "Co-fundador", arc: "Decidir · Aterrizar",
    domain: "Estrategia, propiedad intelectual y modelos de negocio", c: "var(--change-violet)",
    photo: "/assets/founder-miguel.jpg", focus: "center 42%",
    tagline: "Convierte lo intangible en rentabilidad.",
    story: "Asesoró a empresas transnacionales en propiedad intelectual y modelos de negocio, y lo enseña en licenciatura y posgrado. Su convicción es simple: una decisión solo vale cuando sus costos están sobre la mesa y alguien puede defenderla frente al consejo. En Change convierte el diagnóstico en apuestas con criterio explícito — las que se sostienen solas cuando llega la presión.",
  },
  {
    n: "Andrés + Miguel", role: "Co-fundadores", arc: "Un mismo método",
    domain: "Lectura y aterrizaje, sin costuras", c: "var(--success)",
    photo: "/assets/founders-together.jpg", focus: "center 30%",
    tagline: "Dos disciplinas, un mismo método.",
    story: "Andrés lee el futuro mientras todavía es señal; Miguel lo vuelve decisión con costos explícitos. Fundaron Change para que ninguna mitad trabaje sola: el diagnóstico sin aterrizaje se queda en intuición, y la ejecución sin diagnóstico se queda en inercia.",
  },
];
const SOCIOS_EN = [
  {
    n: "Andrés Valencia", role: "Co-founder", arc: "Read · Interpret",
    domain: "Foresight and strategic innovation", c: "var(--signal-cyan)",
    photo: "/assets/founder-andres.jpg", focus: "center 28%",
    tagline: "Sees the signal while it's still weak.",
    story: "He chaired Mexico's Innovation and Design Promotion Council and served on the board of The Design Futures Initiative. From there he understood something uncomfortable: organizations rarely fail for lack of information — they fail by not reading it in time. He founded Change to close that gap: read the future while it's still a signal, and name the tension no one in the room dares to say out loud.",
  },
  {
    n: "Miguel Cadena", role: "Co-founder", arc: "Decide · Land",
    domain: "Strategy, intellectual property and business models", c: "var(--change-violet)",
    photo: "/assets/founder-miguel.jpg", focus: "center 42%",
    tagline: "Turns the intangible into profitability.",
    story: "He advised multinational companies on intellectual property and business models, and teaches it at undergraduate and graduate level. His conviction is simple: a decision is only worth it when its costs are on the table and someone can defend it before the board. At Change he turns the diagnosis into bets with explicit criteria — the ones that hold on their own when pressure arrives.",
  },
  {
    n: "Andrés + Miguel", role: "Co-founders", arc: "One method",
    domain: "Reading and landing, seamless", c: "var(--success)",
    photo: "/assets/founders-together.jpg", focus: "center 30%",
    tagline: "Two disciplines, one method.",
    story: "Andrés reads the future while it's still a signal; Miguel turns it into a decision with explicit costs. They founded Change so neither half works alone: diagnosis without landing stays intuition, and execution without diagnosis stays inertia.",
  },
];

const ESCALERA_ES = [
  { n: "Mapa de Claridad", tag: "Entrada", c: "var(--ink-graphite)", p: "Un primer diagnóstico de la decisión y sus tensiones. El punto donde se ve si vale la pena ir más a fondo." },
  { n: "Sprint de Rumbo", tag: "Acotado", c: "var(--soft-violet)", p: "Un tramo de trabajo con alcance definido para llevar una decisión del diagnóstico al diseño, con artefactos al final." },
  { n: "Mission Control", tag: "Sistema vivo", c: "var(--change-violet)", p: "La infraestructura que sostiene el aprendizaje en el tiempo. Llega cuando ya hay una relación de trabajo, nunca en frío." },
];
const ESCALERA_EN = [
  { n: "Clarity Map", tag: "Entry", c: "var(--ink-graphite)", p: "A first diagnosis of the decision and its tensions. The point where you see whether it's worth going deeper." },
  { n: "Direction Sprint", tag: "Bounded", c: "var(--soft-violet)", p: "A stretch of work with defined scope to take a decision from diagnosis to design, with artifacts at the end." },
  { n: "Mission Control", tag: "Living system", c: "var(--change-violet)", p: "The infrastructure that sustains learning over time. It arrives when there's already a working relationship, never cold." },
];

const EQ_COPY = {
  es: {
    kicker: "Board", titlePre: "La capacidad de futuro se construye", titleAccent: "con un board senior.",
    lead: "Interpretar el cambio, decidir bajo ambigüedad y sostener el rumbo no caben en una sola cabeza. Change reúne las formas de pensar que una decisión difícil necesita al mismo tiempo.",
    whyK: "Por qué un board", whyH: "El rumbo no debería depender de una sola cabeza.",
    whyP: "La incertidumbre no se resuelve con más opinión, sino con formas de pensar que se corrigen entre sí. Cada perfil cubre una parte del arco de una decisión: leer la señal, interpretar lo que significa, decidir qué importa, diseñar la respuesta y sostener el aprendizaje.",
    partnersK: "Socios fundadores", partnersH: "Change nació de dos obsesiones complementarias: leer el cambio a tiempo y volverlo decisión que se sostiene.",
    partnersP: "Dos fundadores, dos disciplinas, un mismo método. No repartimos un proyecto en tareas: repartimos una decisión en capacidades. Y el método no se delega — se gobierna desde aquí.",
    enterK: "Cómo entramos", enterH: "El trabajo empieza por una decisión, no por un retainer.",
    ctaH: "Trae la decisión que más te pesa hoy.", ctaP: "No necesitas tener claro el problema ni el camino. Eso es justo lo que el board hace contigo.", ctaWork: "Trabajar una decisión", ctaMethod: "Ver el método",
  },
  en: {
    kicker: "Board", titlePre: "Future capacity is built", titleAccent: "with a senior board.",
    lead: "Interpreting change, deciding under ambiguity and holding the course don't fit in a single head. Change brings together the ways of thinking a hard decision needs at the same time.",
    whyK: "Why a board", whyH: "The course shouldn't depend on a single head.",
    whyP: "Uncertainty isn't resolved with more opinion, but with ways of thinking that correct each other. Each profile covers a part of a decision's arc: read the signal, interpret what it means, decide what matters, design the response and sustain the learning.",
    partnersK: "Founding partners", partnersH: "Change was born from two complementary obsessions: reading change in time and turning it into a decision that holds.",
    partnersP: "Two founders, two disciplines, one method. We don't split a project into tasks: we split a decision into capacities. And the method isn't delegated — it's governed from here.",
    enterK: "How we come in", enterH: "The work starts with a decision, not a retainer.",
    ctaH: "Bring the decision weighing on you most today.", ctaP: "You don't need the problem or the path figured out. That's exactly what the board does with you.", ctaWork: "Work on a decision", ctaMethod: "See the method",
  },
};

export function EquipoView({ lang }: { lang: Lang }) {
  const t = EQ_COPY[lang];
  const SOCIOS = lang === "en" ? SOCIOS_EN : SOCIOS_ES;
  const ESCALERA = lang === "en" ? ESCALERA_EN : ESCALERA_ES;
  return (
    <PageScaffold
      lang={lang}
      kicker={t.kicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} accentGradient="var(--gradient-type-dark-graphite)" />}
      lead={t.lead}
    >
      {/* ═══ POR QUÉ UNA MESA ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="eq-intro" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: "clamp(44px,5vw,80px)", alignItems: "end" }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.whyK}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.whyH}</Reveal>
            </div>
            <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
              {t.whyP}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ LA MESA ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.partnersK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "24ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.partnersH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "58ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.partnersP}</Reveal>
          {/* Co-fundadores — paneles dinámicos expandibles (Andrés · Miguel · ambos) */}
          <Reveal delay={120}><FoundersPanels founders={SOCIOS} /></Reveal>
        </div>
      </section>

      {/* ═══ CÓMO ENTRAMOS ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.enterK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.enterH}</Reveal>
          <div className="eq-ladder" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {ESCALERA.map((r, i) => (
              <Reveal key={r.n} delay={i * 120} as="article" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.85)", padding: "32px 30px", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: r.c }} />{r.tag}
                </span>
                <h3 style={{ margin: "12px 0 0", font: "600 clamp(21px,1.9vw,26px)/1.04 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{r.n}</h3>
                <p style={{ margin: "13px 0 0", font: "400 14.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{r.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>{t.ctaH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.ctaP}</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            <Link href={localizeHref("/capacidades", lang)} className="btn btn-dghost">{t.ctaMethod}</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .eq-intro, .eq-grid, .eq-ladder { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}

export default function EquipoPage() {
  return <EquipoView lang="es" />;
}
