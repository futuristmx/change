import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Mapa de Claridad · el primer paso tiene forma de decisión",
  description:
    "El punto de partida con Change: traes una decisión que pesa y en dos a tres semanas sales con un diagnóstico claro — la tensión de fondo, el riesgo, los criterios y el primer paso.",
  alternates: altLinks("/mapa-de-claridad"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Mapa de Claridad · el primer paso tiene forma de decisión" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const MC_COPY = {
  es: {
    kicker: "Mapa de Claridad · La entrada",
    titlePre: "El primer paso tiene", titleAccent: "forma de decisión.",
    lead: "El Mapa de Claridad es el punto de partida con Change: traes una decisión que pesa, sales con un diagnóstico claro. Dura dos a tres semanas.",
    whoK: "Para quién es", whoH: "Para el que dirige y trae algo atorado.",
    whoP: "¿Crecemos o consolidamos? ¿Entra la siguiente generación y con qué reglas? ¿Cuál de todas las apuestas va primero? Si una pregunta así te está quitando el sueño, es aquí.",
    bringK: "Qué traes", bringH: "Una decisión real.",
    bringP: "No un proyecto, no un brief, no un presupuesto aprobado. La decisión como la dirías en voz alta.",
    getK: "Qué recibes", getH: "En dos a tres semanas, un diagnóstico:",
    gets: [
      ["La tensión de fondo, nombrada.", "Casi nunca es la que parece."],
      ["El riesgo que no estás viendo.", "El que cobra caro si nadie lo nombra a tiempo."],
      ["Los criterios para decidir.", "Explícitos, discutibles con tus socios."],
      ["El primer paso concreto.", "Ejecutable, con dueño y fecha."],
    ],
    nextK: "Cómo sigue (y cómo no)", nextH: "Cada paso se decide cuando toca.",
    nextP: "Si quieres profundizar, existe el Sprint de Rumbo: del diagnóstico al diseño, en seis a diez semanas. Y para lo que debe sostenerse en el tiempo, Mission Control. Pero el diagnóstico es tuyo y se queda en tu empresa — sigas o no.",
    ctaH: "Trae la decisión que más te pesa hoy.",
    ctaP: "¿Prefieres probar primero? El simulador: 5 preguntas, 2 minutos.",
    ctaWork: "Iniciar la conversación", ctaSim: "Probar el simulador",
  },
  en: {
    kicker: "Clarity Map · The entry",
    titlePre: "The first step takes the", titleAccent: "shape of a decision.",
    lead: "The Clarity Map is the starting point with Change: you bring a decision that weighs on you, you leave with a clear diagnosis. It takes two to three weeks.",
    whoK: "Who it's for", whoH: "For the one who leads and carries something stuck.",
    whoP: "Do we grow or consolidate? Does the next generation come in, and under what rules? Which of all the bets goes first? If a question like that is costing you sleep, this is the place.",
    bringK: "What you bring", bringH: "A real decision.",
    bringP: "Not a project, not a brief, not an approved budget. The decision as you'd say it out loud.",
    getK: "What you get", getH: "In two to three weeks, a diagnosis:",
    gets: [
      ["The underlying tension, named.", "It's almost never the one it seems."],
      ["The risk you're not seeing.", "The one that charges dearly if no one names it in time."],
      ["The criteria for deciding.", "Explicit, debatable with your partners."],
      ["The concrete first step.", "Executable, with an owner and a date."],
    ],
    nextK: "How it continues (and how it doesn't)", nextH: "Each step is decided when it's due.",
    nextP: "If you want to go deeper, there's the Direction Sprint: from diagnosis to design, in six to ten weeks. And for what must be sustained over time, Mission Control. But the diagnosis is yours and stays in your company — whether you continue or not.",
    ctaH: "Bring the decision weighing on you most today.",
    ctaP: "Prefer to try first? The simulator: 5 questions, 2 minutes.",
    ctaWork: "Start the conversation", ctaSim: "Try the simulator",
  },
};

export function MapaDeClaridadView({ lang }: { lang: Lang }) {
  const t = MC_COPY[lang];
  return (
    <PageScaffold
      lang={lang}
      kicker={t.kicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} accentGradient="var(--gradient-type-dark-future)" />}
      lead={t.lead}
    >
      {/* ═══ PARA QUIÉN ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(72px,9vw,128px) 0" }}>
          <div className="mc-two" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: "clamp(44px,5vw,80px)", alignItems: "end" }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.whoK}</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.whoH}</Reveal>
            </div>
            <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.whoP}</Reveal>
          </div>
        </div>
      </section>

      {/* ═══ QUÉ TRAES · QUÉ RECIBES ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-white-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(72px,9vw,128px) 0" }}>
          <div className="mc-two" style={{ display: "grid", gridTemplateColumns: "minmax(280px,.8fr) minmax(0,1.2fr)", gap: "clamp(28px,3vw,44px)", alignItems: "start" }}>
            {/* Qué traes */}
            <Reveal as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderTop: "3px solid var(--opportunity-orange)", padding: "32px 30px 34px" }}>
              <span style={{ display: "block", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>{t.bringK}</span>
              <h3 style={{ margin: 0, font: "600 clamp(22px,2vw,28px)/1.08 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{t.bringH}</h3>
              <p style={{ margin: "14px 0 0", font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{t.bringP}</p>
            </Reveal>
            {/* Qué recibes */}
            <Reveal delay={100} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderTop: "3px solid var(--change-violet)", padding: "32px 30px 34px" }}>
              <span style={{ display: "block", font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>{t.getK}</span>
              <h3 style={{ margin: "0 0 20px", font: "600 clamp(22px,2vw,28px)/1.08 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{t.getH}</h3>
              <div style={{ display: "grid", gap: 14 }}>
                {t.gets.map(([h, p], i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline", paddingTop: i === 0 ? 0 : 14, borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
                    <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--change-violet)", flexShrink: 0, position: "relative", top: -1 }} />
                    <p style={{ margin: 0, font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
                      <strong style={{ font: "600 15px var(--font-primary)", color: "var(--ink-graphite)" }}>{h}</strong>{" "}{p}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CÓMO SIGUE ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(72px,9vw,128px) 0" }}>
          <div style={{ maxWidth: 720 }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.nextK}</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(26px,3.4vw,46px)/1.02 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.nextH}</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "20px 0 0", font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{t.nextP}</Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.ctaH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 520, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.ctaP}</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-dghost">{t.ctaSim}</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .mc-two { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}

export default function MapaDeClaridadPage() {
  return <MapaDeClaridadView lang="es" />;
}
