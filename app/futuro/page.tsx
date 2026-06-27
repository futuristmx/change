import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import HorizonPanels from "@/components/HorizonPanels";
import EtherealDivider from "@/components/ds/EtherealDivider";
import type { GlyphName } from "@/components/ds";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Futuro: la tesis y el concepto de capacidad de futuro",
  description:
    "Por qué existe Change, qué es capacidad de futuro y qué sostiene cada decisión que tomamos. Nuestro propósito, visión, misión y los valores que gobiernan el método.",
  alternates: altLinks("/futuro"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Futuro: la tesis y el concepto de capacidad de futuro" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const VALORES_ES: Array<{ k: string; h: string; p: string; g: GlyphName; c: string }> = [
  { k: "01", h: "Interpretar primero", p: "Antes de proponer una respuesta, leemos. La urgencia no es excusa para saltarse el juicio. La velocidad importa, la dirección más.", g: "read", c: "var(--signal-cyan)" },
  { k: "02", h: "Tensión sobre certeza", p: "Trabajamos donde las decisiones todavía no tienen forma. Nombrar la tensión vale más que prometer certeza falsa.", g: "risk", c: "var(--human-pink)" },
  { k: "03", h: "Criterio explícito", p: "Toda decisión deja su porqué a la vista — qué se gana, qué se sacrifica y bajo qué condición se revisa. La estrategia no es solo lo que se decide, es por qué se decidió así.", g: "decision", c: "var(--change-violet)" },
  { k: "04", h: "Instrumentos, no opiniones", p: "Cada intervención deja un artefacto — radar, mapa, matriz, roadmap, memoria. Lo que el equipo puede leer, discutir y usar.", g: "project", c: "var(--opportunity-orange)" },
  { k: "05", h: "Memoria del porqué", p: "El aprendizaje queda vivo. La próxima coyuntura no empieza de cero — empieza donde la anterior dejó criterio instalado.", g: "status", c: "var(--success)" },
  { k: "06", h: "Confidencialidad como base", p: "Las decisiones que acompañamos casi nunca pueden hacerse públicas. Protegemos el contexto estratégico antes de usarlo como credencial.", g: "lock", c: "var(--warning)" },
];
const VALORES_EN: Array<{ k: string; h: string; p: string; g: GlyphName; c: string }> = [
  { k: "01", h: "Interpret first", p: "Before proposing an answer, we read. Urgency is no excuse to skip judgment. Speed matters; direction matters more.", g: "read", c: "var(--signal-cyan)" },
  { k: "02", h: "Tension over certainty", p: "We work where decisions don't have shape yet. Naming the tension is worth more than promising false certainty.", g: "risk", c: "var(--human-pink)" },
  { k: "03", h: "Explicit criteria", p: "Every decision leaves its why in plain sight — what's gained, what's sacrificed, and under what condition it's revisited. Strategy isn't only what's decided; it's why it was decided that way.", g: "decision", c: "var(--change-violet)" },
  { k: "04", h: "Instruments, not opinions", p: "Every intervention leaves an artifact — radar, map, matrix, roadmap, memory. What the team can read, discuss, and use.", g: "project", c: "var(--opportunity-orange)" },
  { k: "05", h: "Memory of the why", p: "Learning stays alive. The next turn doesn't start from zero — it starts where the last one left criteria installed.", g: "status", c: "var(--success)" },
  { k: "06", h: "Confidentiality as a base", p: "The decisions we support can almost never be made public. We protect the strategic context before using it as a credential.", g: "lock", c: "var(--warning)" },
];

const HORIZONTES_ES = [
  { k: "Propósito", c: "var(--signal-cyan)", h: "Transformar la relación de las organizaciones con el futuro.", p: "El futuro deja de ser una amenaza que se padece o una apuesta que se adivina. Se vuelve algo que se puede leer, interpretar y trabajar con método — mientras todavía hay margen para decidir. Ese cambio de relación es nuestra razón de existir." },
  { k: "Visión", c: "var(--human-pink)", h: "Organizaciones que construyen futuro con imaginación, criterio y responsabilidad.", p: "Imaginamos un entorno donde decidir el rumbo deje de ser reactivo. Donde las organizaciones no enfrenten el futuro desde la urgencia, la inercia o la moda, sino desde capacidades vivas que evolucionan con ellas: leer la señal, disputar su sentido, decidir con criterio compartido y sostener lo aprendido. Capacidades que permanecen — para que la próxima coyuntura no empiece de cero ni dependa de alguien externo." },
  { k: "Misión", c: "var(--change-violet)", h: "Convertir incertidumbre en capacidad viva.", p: "Acompañamos a líderes y equipos a leer lo que cambia, interpretar la tensión que revela, decidir con criterio explícito, darle forma y sostenerla en el tiempo. No entregamos recomendaciones: diseñamos los procesos, narrativas y artefactos que instalan esa capacidad. Change OS opera detrás —el sistema que vuelve replicable el criterio—; Mission Control aparece delante, donde cada decisión deja memoria, trazabilidad y continuidad." },
];
const HORIZONTES_EN = [
  { k: "Purpose", c: "var(--signal-cyan)", h: "Transform organizations' relationship with the future.", p: "The future stops being a threat you endure or a bet you guess. It becomes something you can read, interpret, and work with method — while there's still room to decide. That shift in relationship is our reason to exist." },
  { k: "Vision", c: "var(--human-pink)", h: "Organizations that build the future with imagination, judgment, and responsibility.", p: "We imagine an environment where deciding the course stops being reactive. Where organizations don't face the future from urgency, inertia, or fashion, but from living capacities that evolve with them: read the signal, contest its meaning, decide with shared criteria, and sustain what's learned. Capacities that remain — so the next turn doesn't start from zero or depend on someone external." },
  { k: "Mission", c: "var(--change-violet)", h: "Turn uncertainty into living capacity.", p: "We support leaders and teams to read what's changing, interpret the tension it reveals, decide with explicit criteria, give it form, and sustain it over time. We don't hand over recommendations: we design the processes, narratives, and artifacts that install that capacity. Change OS operates behind — the system that makes judgment replicable; Mission Control appears in front, where each decision leaves memory, traceability, and continuity." },
];

const FUT_COPY = {
  es: {
    kicker: "Futuro · Tesis Change", titlePre: "La capacidad de futuro", titleAccent: "es lo que permite decidir cuando la certeza ya no llega a tiempo.",
    lead: "Por qué existe Change, qué es capacidad de futuro y qué sostiene cada decisión que acompañamos. La tesis, el propósito y los valores que gobiernan el método.",
    tesisK: "Tesis", tesisH: "El futuro se vuelve interpretable, decidible y accionable.",
    tesisP1: "La certeza dejó de ser condición para actuar. El entorno se mueve antes de que los números lo registren, las decisiones no pueden esperar y la información casi nunca llega completa. Lo que separa a las organizaciones que reaccionan de las que aprenden a tiempo no es la suerte ni la cantidad de datos — es la capacidad para leer el cambio mientras todavía es señal, interpretar qué tensión revela, decidir con criterio explícito y dejar instalado el porqué de cada decisión.",
    tesisP2: "Trabajamos justo donde la información es incompleta, las tensiones no son evidentes y las decisiones no pueden esperar. Ahí convertimos señales emergentes, comportamiento humano, estrategia, cultura y tecnología en instrumentos que se pueden usar para decidir, actuar y aprender.",
    quote: "Capacidad de futuro es una forma de operar — una habilidad organizacional instalada, no un servicio contratado.", quoteFoot: "El método se gobierna desde Change · la capacidad se queda en el cliente.",
    horizK: "Hacia dónde apunta Change", horizH: "Tres horizontes que sostienen cada decisión nuestra.",
    valK: "Valores · Cómo gobierna Change", valH: "Seis principios que ningún proyecto se salta.", valP: "Aplican al primer correo, al primer diagnóstico del board y a la última versión del artefacto. La capacidad se construye con disciplina; el método no se delega.",
    ctaH: "La capacidad de futuro empieza con una decisión real.", ctaP: "No hace falta tener clara la pregunta. Trae la decisión que más te pesa y la trabajamos juntos. Desde ahí construimos la capacidad para volver a hacerlo sin Change en la sala.", ctaWork: "Trabajar una decisión", ctaMethod: "Conocer el método",
  },
  en: {
    kicker: "Future · Change thesis", titlePre: "Future capacity", titleAccent: "is what lets you decide when certainty no longer arrives in time.",
    lead: "Why Change exists, what future capacity is, and what holds every decision we support. The thesis, the purpose, and the values that govern the method.",
    tesisK: "Thesis", tesisH: "The future becomes interpretable, decidable, and actionable.",
    tesisP1: "Certainty is no longer a condition for acting. The environment moves before the numbers register it, decisions can't wait, and information almost never arrives complete. What separates organizations that react from those that learn in time isn't luck or the amount of data — it's the capacity to read change while it's still a signal, interpret what tension it reveals, decide with explicit criteria, and leave the why of each decision installed.",
    tesisP2: "We work exactly where information is incomplete, tensions aren't evident, and decisions can't wait. There we turn emerging signals, human behavior, strategy, culture, and technology into instruments you can use to decide, act, and learn.",
    quote: "Future capacity is a way of operating — an installed organizational ability, not a contracted service.", quoteFoot: "The method is governed from Change · the capacity stays with the client.",
    horizK: "Where Change points", horizH: "Three horizons that hold every decision we make.",
    valK: "Values · How Change governs", valH: "Six principles no project skips.", valP: "They apply to the first email, the board's first diagnosis, and the last version of the artifact. Capacity is built with discipline; the method isn't delegated.",
    ctaH: "Future capacity starts with a real decision.", ctaP: "You don't need the question figured out. Bring the decision weighing on you most and we'll work it together. From there we build the capacity to do it again without Change in the room.", ctaWork: "Work on a decision", ctaMethod: "Get to know the method",
  },
};

export function FuturoView({ lang }: { lang: Lang }) {
  const t = FUT_COPY[lang];
  const VALORES = lang === "en" ? VALORES_EN : VALORES_ES;
  const HORIZONTES = lang === "en" ? HORIZONTES_EN : HORIZONTES_ES;
  return (
    <PageScaffold
      lang={lang}
      kicker={t.kicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} accentGradient="var(--gradient-type-dark-warm)" />}
      lead={t.lead}
    >
      {/* ═══ TESIS — manifiesto editorial ═══ */}
      <section style={{ background: "var(--gradient-violet-whisper)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div style={{ maxWidth: 880, marginBottom: "clamp(36px,4vw,48px)" }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.tesisK}</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              {t.tesisH}
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p style={{ margin: 0, maxWidth: "70ch", font: "400 clamp(17px,1.5vw,21px)/1.6 var(--font-primary)", color: "var(--ink-graphite)" }}>
              {t.tesisP1}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p style={{ margin: "26px 0 0", maxWidth: "70ch", font: "400 clamp(17px,1.5vw,21px)/1.6 var(--font-primary)", color: "var(--ink-graphite)" }}>
              {t.tesisP2}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <blockquote style={{ margin: "44px 0 0", padding: "clamp(28px,3vw,40px) clamp(24px,3vw,40px)", borderLeft: "3px solid var(--change-violet)", background: "rgba(109,59,255,.05)" }}>
              <p style={{ margin: 0, font: "600 clamp(20px,2.2vw,28px)/1.32 var(--font-primary)", letterSpacing: "-.025em", color: "var(--ink-graphite)" }}>
                {t.quote}
              </p>
              <footer style={{ marginTop: 18, font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.quoteFoot}</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <EtherealDivider />

      {/* ═══ PROPÓSITO · VISIÓN · MISIÓN ═══ */}
      <section style={{ background: "var(--surface-page)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div style={{ maxWidth: 820, marginBottom: "clamp(48px,6vw,72px)" }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.horizK}</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.horizH}</Reveal>
          </div>

          {/* Paneles dinámicos expandibles (variante light) */}
          <Reveal delay={110}><HorizonPanels horizontes={HORIZONTES} /></Reveal>
        </div>
      </section>

      <EtherealDivider />

      {/* ═══ VALORES ═══ */}
      <section style={{ background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div style={{ maxWidth: 820, marginBottom: "clamp(40px,5vw,56px)" }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.valK}</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.valH}</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "60ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.valP}</Reveal>
          </div>

          {/* Paneles dinámicos expandibles (light) — 2 filas de 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,1.6vw,20px)" }}>
            <Reveal delay={110}><HorizonPanels horizontes={VALORES.slice(0, 3).map((v) => ({ k: v.k, num: v.k, h: v.h, p: v.p, c: v.c }))} minH="clamp(340px,32vw,420px)" /></Reveal>
            <Reveal delay={150}><HorizonPanels horizontes={VALORES.slice(3, 6).map((v) => ({ k: v.k, num: v.k, h: v.h, p: v.p, c: v.c }))} minH="clamp(340px,32vw,420px)" /></Reveal>
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{ height: "clamp(80px,8vw,120px)", background: "linear-gradient(180deg, var(--gradient-sky-pearl) 0%, var(--surface-dark-secondary) 100%)" }} />

      {/* ═══ CTA dark ═══ */}
      <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-violet-atmosphere), var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "22ch", font: "600 clamp(32px,5vw,68px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>
            {t.ctaH}
          </Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 600, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>
            {t.ctaP}
          </Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            <Link href={localizeHref("/capacidades", lang)} className="btn btn-dghost">{t.ctaMethod}</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .fut-horizontes, .fut-valores { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          .fut-valores { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}

export default function FuturoPage() {
  return <FuturoView lang="es" />;
}
