import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import { Glyph, type GlyphName } from "@/components/ds";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Field Notes: notas para decidir antes que la urgencia",
  description:
    "Notas breves sobre lo que está cambiando y lo que ese cambio te obliga a decidir. No comentamos la noticia: la convertimos en una decisión que tu organización todavía puede tomar a tiempo.",
  alternates: altLinks("/field-notes"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Field Notes: notas para decidir antes que la urgencia" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const CONTRATO_ES: Array<{ v: string; h: string; p: string; c: string; g: GlyphName }> = [
  { v: "Leer", h: "Señal", p: "Lo que cambió y dónde lo vimos. Un hecho concreto, fechado y rastreable, no una impresión.", c: "var(--signal-cyan)", g: "read" },
  { v: "Interpretar", h: "Tensión sistémica", p: "Qué fuerzas se mueven en sentido contrario debajo de esa señal. El conflicto de fondo que la señal apenas asoma.", c: "var(--soft-violet)", g: "risk" },
  { v: "Decidir", h: "Pregunta estratégica", p: "La pregunta que tu organización tendría que poder responder si esa tensión la alcanza. El nombre exacto del problema, antes de que sea problema.", c: "var(--change-violet)", g: "decision" },
  { v: "Diseñar", h: "Implicación", p: "Qué se mueve para tu sector, tu modelo o tu tablero si la señal madura. Dónde te toca, en concreto.", c: "var(--change-violet)", g: "project" },
  { v: "Sostener", h: "Decisión que abre", p: "La decisión que todavía está disponible hoy y que se encarece si esperas. No una recomendación genérica: una opción con fecha de caducidad.", c: "var(--ink-graphite)", g: "status" },
];
const CONTRATO_EN: Array<{ v: string; h: string; p: string; c: string; g: GlyphName }> = [
  { v: "Read", h: "Signal", p: "What changed and where we saw it. A concrete fact, dated and traceable, not an impression.", c: "var(--signal-cyan)", g: "read" },
  { v: "Interpret", h: "Systemic tension", p: "What forces move in opposite directions beneath that signal. The underlying conflict the signal barely hints at.", c: "var(--soft-violet)", g: "risk" },
  { v: "Decide", h: "Strategic question", p: "The question your organization would have to answer if that tension reaches it. The exact name of the problem, before it's a problem.", c: "var(--change-violet)", g: "decision" },
  { v: "Design", h: "Implication", p: "What moves for your sector, your model or your board if the signal matures. Where it touches you, concretely.", c: "var(--change-violet)", g: "project" },
  { v: "Sustain", h: "Decision it opens", p: "The decision still available today that gets costlier if you wait. Not a generic recommendation: an option with an expiration date.", c: "var(--ink-graphite)", g: "status" },
];

const TIPOS_ES = [
  { k: "Señal → decisión", c: "var(--signal-cyan)", h: "Interpretación de señal", p: "Tomamos un movimiento concreto del entorno mexicano —regulatorio, tecnológico, cultural, de mercado— y mostramos la tensión que esconde y a quién obliga a decidir." },
  { k: "Fuerzas en conflicto", c: "var(--soft-violet)", h: "Mapa de tensión", p: "Un solo conflicto de fondo que atraviesa varios sectores a la vez, desplegado como mapa de tensiones para verlo completo, no por pedazos." },
  { k: "El instrumento por dentro", c: "var(--change-violet)", h: "Nota de método", p: "Cómo se ve por dentro un instrumento de decisión —un radar de señales, una matriz de decisión, un roadmap vivo— usando un caso real desidentificado." },
];
const TIPOS_EN = [
  { k: "Signal → decision", c: "var(--signal-cyan)", h: "Signal interpretation", p: "We take a concrete move in the Mexican environment —regulatory, technological, cultural, market— and show the tension it hides and who it forces to decide." },
  { k: "Forces in conflict", c: "var(--soft-violet)", h: "Tension map", p: "A single underlying conflict that cuts across several sectors at once, laid out as a tension map to see it whole, not in pieces." },
  { k: "The instrument from the inside", c: "var(--change-violet)", h: "Method note", p: "How a decision instrument looks from the inside —a signal radar, a decision matrix, a living roadmap— using a real, de-identified case." },
];

const RITMO_ES = [
  { k: "Cadencia real", h: "Sin ruido de calendario", p: "No publicamos por inercia. Si una semana no hay nada que cambie tu forma de decidir, no hay nota. El silencio también dice algo." },
  { k: "Cierre accionable", h: "Una señal, una decisión", p: "Ninguna nota termina en abstracto. Si no abre una decisión concreta, no es una Field Note: es un comentario." },
  { k: "Lente local", h: "Contexto mexicano primero", p: "Leemos el entorno donde operan nuestros clientes. Las señales se interpretan desde aquí, no traducidas de otro mercado." },
];
const RITMO_EN = [
  { k: "Real cadence", h: "No calendar noise", p: "We don't publish out of inertia. If a week has nothing that changes how you decide, there's no note. Silence says something too." },
  { k: "Actionable close", h: "One signal, one decision", p: "No note ends in the abstract. If it doesn't open a concrete decision, it isn't a Field Note: it's a comment." },
  { k: "Local lens", h: "Mexican context first", p: "We read the environment where our clients operate. Signals are interpreted from here, not translated from another market." },
];

const FN_COPY = {
  es: {
    kicker: "Field Notes", titlePre: "Notas para decidir antes", titleAccent: "de que la urgencia cierre opciones.",
    lead: "Pocas notas, ninguna de relleno. Primera serie en preparación — las Field Notes existen cuando una señal merece convertirse en decisión, no antes.",
    whyK: "Por qué existe", whyH1: "Casi todo lo que vas a leer hoy te dice qué pasó. ", whyH2: "Casi nada te dice qué decidir.",
    whyP: "El cambio se vuelve visible cuando ya es urgente, y la urgencia cierra opciones antes de que alcances a evaluarlas. Field Notes trabaja un paso antes: lee la señal mientras todavía es débil y la deja en forma de decisión.",
    why3: [
      { h: "La señal llega temprano", p: "No esperamos a que un tema sea tendencia para nombrarlo. La señal débil de hoy es el frente abierto del próximo trimestre." },
      { h: "La interpretas, no solo la archivas", p: "Cada nota explica qué tensión sistémica revela la señal. Sin esa interpretación, una señal es solo un dato más." },
      { h: "Sale en forma de decisión", p: "Toda nota cierra en una decisión que sigue abierta para ti. No te dejamos con un dato: te dejamos con una opción que aún puedes tomar." },
    ],
    contractK: "El contrato de la nota", contractH: "Cómo se construye cada Field Note.", contractP: "Toda nota recorre la misma estructura, en orden. Es la misma lógica con la que leemos el entorno de un cliente: de la señal suelta a la decisión que abre.",
    findK: "Qué vas a encontrar", findH: "Tres tipos de nota, una sola disciplina.", findP: "Cambia el ángulo de entrada, no el rigor. Cada tipo termina en lo mismo: una tensión legible y una decisión que sigue en tus manos.",
    rhythmK: "Cómo lo manejamos", rhythmH: "Ritmo honesto: pocas notas, ninguna de relleno.",
    ctaH: "Una nota te muestra la tensión. Una sesión la convierte en tu decisión.", ctaP: "Las Field Notes son cómo construimos capacidad de futuro en público. Cuando una toca un nervio real de tu organización, el siguiente paso no es leer más: es trabajar esa decisión con instrumentos hechos para tu caso.", ctaWork: "Iniciar la conversación", ctaHow: "Cómo trabajamos",
  },
  en: {
    kicker: "Field Notes", titlePre: "Notes for deciding before", titleAccent: "urgency closes your options.",
    lead: "Few notes, none for filler. First series in the works — Field Notes exist when a signal deserves to become a decision, not before.",
    whyK: "Why it exists", whyH1: "Almost everything you'll read today tells you what happened. ", whyH2: "Almost nothing tells you what to decide.",
    whyP: "Change becomes visible when it's already urgent, and urgency closes options before you can evaluate them. Field Notes works one step earlier: it reads the signal while it's still weak and leaves it in the shape of a decision.",
    why3: [
      { h: "The signal arrives early", p: "We don't wait for a topic to trend before naming it. Today's weak signal is next quarter's open front." },
      { h: "You interpret it, you don't just file it", p: "Every note explains what systemic tension the signal reveals. Without that interpretation, a signal is just one more data point." },
      { h: "It comes out as a decision", p: "Every note closes on a decision still open to you. We don't leave you with a data point: we leave you with an option you can still take." },
    ],
    contractK: "The note's contract", contractH: "How each Field Note is built.", contractP: "Every note follows the same structure, in order. It's the same logic we use to read a client's environment: from the loose signal to the decision it opens.",
    findK: "What you'll find", findH: "Three kinds of note, one discipline.", findP: "The angle of entry changes, not the rigor. Each kind ends in the same place: a readable tension and a decision still in your hands.",
    rhythmK: "How we handle it", rhythmH: "Honest rhythm: few notes, none for filler.",
    ctaH: "A note shows you the tension. A session turns it into your decision.", ctaP: "Field Notes are how we build future capacity in public. When one touches a real nerve in your organization, the next step isn't to read more: it's to work that decision with instruments made for your case.", ctaWork: "Start the conversation", ctaHow: "How we work",
  },
};

export function FieldNotesView({ lang }: { lang: Lang }) {
  const t = FN_COPY[lang];
  const CONTRATO = lang === "en" ? CONTRATO_EN : CONTRATO_ES;
  const TIPOS = lang === "en" ? TIPOS_EN : TIPOS_ES;
  const RITMO = lang === "en" ? RITMO_EN : RITMO_ES;
  return (
    <PageScaffold
      lang={lang}
      kicker={t.kicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} accentGradient="var(--gradient-type-dark-rose)" />}
      lead={t.lead}
    >
      {/* ═══ POR QUÉ EXISTE ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="fn-head" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: 60, alignItems: "end", marginBottom: 60 }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.whyK}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,4vw,54px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                <span style={{ backgroundImage: "linear-gradient(100deg, var(--text-muted) 0%, var(--ink-graphite) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{t.whyH1}</span>
                <span style={{ backgroundImage: "linear-gradient(100deg, var(--change-violet) 0%, var(--soft-violet) 52%, var(--human-pink) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{t.whyH2}</span>
              </Reveal>
            </div>
            <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.whyP}</Reveal>
          </div>
          <div className="fn-types" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {t.why3.map((c, i) => (
              <Reveal key={c.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 32, minHeight: 210, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: 0, font: "600 clamp(20px,1.8vw,24px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EL CONTRATO ═══ */}
      <section id="contrato" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-white-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.contractK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.contractH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "56ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.contractP}</Reveal>
          {/* Desktop: horizontal line-and-node */}
          <div className="fn-flow" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
            {CONTRATO.map((s, i) => (
              <Reveal key={s.h} delay={i * 80} style={{ position: "relative", paddingTop: 20, borderTop: "2px solid var(--border-subtle)" }}>
                <span aria-hidden="true" style={{ position: "absolute", top: -6, left: 0, width: 9, height: 9, borderRadius: "50%", background: s.c }} />
                <span aria-hidden="true" style={{ display: "inline-flex", marginBottom: 6, color: s.c }}>
                  <Glyph name={s.g} size={14} />
                </span>
                <span style={{ display: "block", marginBottom: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{s.v}</span>
                <strong style={{ display: "block", font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{s.h}</strong>
                <span style={{ display: "block", marginTop: 8, font: "400 13.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{s.p}</span>
              </Reveal>
            ))}
          </div>
          {/* Mobile (≤768px): vertical rail + nodes */}
          <div className="fn-vflow" style={{ display: "none", position: "relative", flexDirection: "column", gap: 24, paddingLeft: 8 }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 14, top: 8, bottom: 8, width: 2, background: "var(--line-gradient-relation)" }} />
            {CONTRATO.map((s, i) => (
              <Reveal key={s.h} delay={i * 80} style={{ position: "relative", display: "grid", gridTemplateColumns: "40px 1fr", gap: 14, alignItems: "start" }}>
                <span aria-hidden="true" style={{ position: "relative", width: 26, height: 26, borderRadius: "50%", background: s.c, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-on-dark)", boxShadow: `0 0 0 4px var(--surface-page)` }}>
                  <Glyph name={s.g} size={12} />
                </span>
                <div>
                  <span style={{ display: "block", marginBottom: 4, font: "600 12px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{s.v}</span>
                  <strong style={{ display: "block", font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{s.h}</strong>
                  <span style={{ display: "block", marginTop: 6, font: "400 14px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{s.p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUÉ VAS A ENCONTRAR ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.findK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.findH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "56ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.findP}</Reveal>
          <div className="fn-types" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {TIPOS.map((t, i) => (
              <Reveal key={t.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: 34, display: "flex", flexDirection: "column", minHeight: 230 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: t.c }} />{t.k}
                </span>
                <h3 style={{ margin: "14px 0 0", font: "600 clamp(20px,1.8vw,25px)/1.08 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{t.h}</h3>
                <p style={{ margin: "13px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RITMO HONESTO ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-white-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.rhythmK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.rhythmH}</Reveal>
          <div className="fn-types" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {RITMO.map((c, i) => (
              <Reveal key={c.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: 32, minHeight: 200, display: "flex", flexDirection: "column" }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)" }}>{c.k}</span>
                <h3 style={{ margin: "12px 0 0", font: "600 clamp(19px,1.7vw,23px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "12px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "22ch", font: "600 clamp(32px,5vw,68px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.ctaH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 580, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.ctaP}</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            <Link href={localizeHref("/capacidades", lang)} className="btn btn-dghost">{t.ctaHow}</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .fn-head, .fn-types { grid-template-columns: 1fr !important; }
          .fn-flow { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .fn-flow { display: none !important; }
          .fn-vflow { display: flex !important; }
        }
      `}</style>
    </PageScaffold>
  );
}

export default function FieldNotesPage() {
  return <FieldNotesView lang="es" />;
}
