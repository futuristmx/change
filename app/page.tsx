import type { Metadata } from "next";
import Link from "next/link";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MissionControlLive from "@/components/MissionControlLive";
import EtherealDivider from "@/components/ds/EtherealDivider";
import WorkEvidence from "@/components/WorkEvidence";
import ConstellationField from "@/components/ds/ConstellationField";
import { SignalField, Glyph, type GlyphName } from "@/components/ds";

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const ARCO: Array<{ es: string; en: string; c: string; g: GlyphName }> = [
  { es: "Leer", en: "Read", c: "var(--signal-cyan)", g: "read" },
  { es: "Interpretar", en: "Interpret", c: "var(--soft-violet)", g: "risk" },
  { es: "Decidir", en: "Decide", c: "var(--change-violet)", g: "decision" },
  { es: "Diseñar", en: "Design", c: "var(--human-pink)", g: "project" },
  { es: "Sostener", en: "Sustain", c: "var(--success)", g: "status" },
];

/* Las 6 tensiones — espejo del visitante (P2 del mapa JTBD).
   `sim` conecta con el escenario del simulador en /contacto (?escenario=).
   `anchor` conecta con el caso correspondiente en /casos (#tension-0N). */
const TENSIONES: Array<{ es: string; en: string; c: string; sim: string | null; anchor: string }> = [
  { es: "La identidad que abrió la puerta ya no cabe en la siguiente etapa.", en: "The identity that opened the door no longer fits the next stage.", c: "var(--opportunity-orange)", sim: "crecer-sin-diluir", anchor: "#tension-01" },
  { es: "Todo es importante. Y por eso nada avanza.", en: "Everything is important. And that's why nothing moves.", c: "var(--change-violet)", sim: "demasiadas-iniciativas", anchor: "#tension-02" },
  { es: "El juicio que sostiene la empresa vive en pocas cabezas.", en: "The judgment that holds the company lives in a few heads.", c: "var(--human-pink)", sim: "criterio-en-pocas-cabezas", anchor: "#tension-03" },
  { es: "Lo que aguanta en calma no es lo que aguanta bajo presión.", en: "What holds in calm isn't what holds under pressure.", c: "var(--warning)", sim: null, anchor: "#tension-04" },
  { es: "El producto sigue igual. Tu cliente, no.", en: "The product stays the same. Your customer doesn't.", c: "var(--signal-cyan)", sim: "cliente-que-cambio", anchor: "#tension-05" },
  { es: "Una visión clara. Y ningún modo de gobernarla.", en: "A clear vision. And no way to govern it.", c: "var(--change-violet)", sim: "vision-sin-roadmap", anchor: "#tension-06" },
];

const COPY = {
  es: {
    heroBadge: "Capacidad de futuro",
    heroH1a: "Las decisiones grandes de tu empresa", heroH1b: "pasan todas por ti.",
    heroLead: "Change instala en tu equipo la capacidad de leer lo que cambia, decidir a tiempo y sostener el rumbo.",
    heroScroll: "¿Cuál es tu tensión? ↓",
    tenseKicker: "Las tensiones", tenseTitle: "Seis tensiones que conocemos de cerca. ¿Cuál es la tuya?",
    tenseSee: "Ver esta tensión", tenseWork: "Trabajarla ahora",
    changeKicker: "Lo que cambia", changeTitle: "No hacemos el trabajo por ti. Lo dejamos instalado en tu equipo.",
    changeLead: "Hoy, la empresa decide con tu memoria y tu instinto. Después, tu equipo lee, decide y sostiene con criterio propio — contigo o sin ti en la sala.",
    changeCta: "Ver qué queda instalado",
    startKicker: "Cómo se empieza", startTitle: "Se empieza con una decisión, no con un proyecto.",
    startLead: "Traes la decisión que te pesa. En dos a tres semanas sales con un diagnóstico: la tensión de fondo, el riesgo y el primer paso.",
    startCta1: "Conocer el Mapa de Claridad", startCta2: "Probar el simulador — 5 preguntas, 2 min",
    whyKicker: "Por qué Change", whyTitle: "Más de 12 años. Más de 13 países. Un sistema propio.",
    whyLead: "Change opera con un sistema propio de interpretación, decisión y seguimiento. Y lo que se decide no se archiva: sigue vivo en Mission Control.",
    whyCta1: "Conocer al equipo", whyCta2: "Ver Mission Control",
    ctaKicker: "El primer movimiento", ctaTitle: "Trae la decisión que más te pesa hoy.", ctaWork: "Trabajar una decisión",
  },
  en: {
    heroBadge: "Future Capacity",
    heroH1a: "The big decisions in your company", heroH1b: "all run through you.",
    heroLead: "Change installs in your team the capacity to read what's changing, decide in time, and hold the course.",
    heroScroll: "Which tension is yours? ↓",
    tenseKicker: "The tensions", tenseTitle: "Six tensions we know up close. Which one is yours?",
    tenseSee: "See this tension", tenseWork: "Work it now",
    changeKicker: "What changes", changeTitle: "We don't do the work for you. We leave it installed in your team.",
    changeLead: "Today, the company decides with your memory and your instinct. After, your team reads, decides and sustains with its own criteria — with or without you in the room.",
    changeCta: "See what stays installed",
    startKicker: "How it starts", startTitle: "It starts with a decision, not a project.",
    startLead: "You bring the decision weighing on you. In two to three weeks you leave with a diagnosis: the underlying tension, the risk, and the first step.",
    startCta1: "Meet the Clarity Map", startCta2: "Try the simulator — 5 questions, 2 min",
    whyKicker: "Why Change", whyTitle: "Over 12 years. Over 13 countries. A system of our own.",
    whyLead: "Change operates with its own system for interpreting, deciding and following through. And what gets decided isn't archived: it stays alive in Mission Control.",
    whyCta1: "Meet the team", whyCta2: "See Mission Control",
    ctaKicker: "The first move", ctaTitle: "Bring the decision weighing on you most today.", ctaWork: "Work on a decision",
  },
};

function Kicker({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <Reveal style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 11, marginBottom: 20 }}>
      <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
      <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: light ? "rgba(255,255,255,.8)" : "var(--text-muted)" }}>{label}</span>
    </Reveal>
  );
}

export function HomeView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header lang={lang} />
      <main id="main-content" style={{ flex: 1 }}>

        {/* ═══ 01 · HERO — P1: "¿esto es para alguien como yo?" ═══ */}
        <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 50% -10%,rgba(138,108,255,.14) 0%,rgba(89,184,217,.06) 34%,rgba(255,255,255,0) 60%),var(--gradient-celestial-horizon)" }}>
          <SignalField />
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,156px) 0 clamp(72px,9vw,116px)", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 34, padding: "7px 14px 7px 11px", border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.55)" }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.heroBadge}</span>
            </Reveal>

            <Reveal delay={60} as="h1" style={{ margin: "0 auto", maxWidth: "19ch", font: "600 clamp(42px,7vw,104px)/.94 var(--font-primary)", letterSpacing: "-.055em", color: "var(--ink-graphite)" }}>
              <span style={{ background: "var(--gradient-type-neutral-pulse)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.heroH1a}</span>{" "}
              <span style={{ background: "var(--gradient-type-dark-future)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.heroH1b}</span>
            </Reveal>

            <Reveal delay={120} as="p" style={{ margin: "clamp(28px,4vw,40px) auto 0", maxWidth: 620, font: "400 clamp(18px,1.6vw,22px)/1.5 var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>
              {t.heroLead}
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
              <Link href="#tensiones" className="btn btn-secondary">{t.heroScroll}</Link>
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
        {/* ═══ 02 · LAS TENSIONES — P2: "¿entienden mi problema?" · interactiva ═══ */}
        <section id="tensiones" style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,140px) 0" }}>
            <div style={{ maxWidth: 760, margin: "0 auto clamp(40px,5vw,56px)", textAlign: "center" }}>
              <Kicker label={t.tenseKicker} />
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.tenseTitle}</Reveal>
            </div>
            <div className="ch-tengrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {TENSIONES.map((tn, i) => (
                <Reveal key={tn.anchor} delay={(i % 3) * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderTop: `3px solid ${tn.c}`, padding: "28px 26px 24px", display: "flex", flexDirection: "column", minHeight: 190 }}>
                  <h3 style={{ margin: 0, font: "600 clamp(19px,1.7vw,23px)/1.22 var(--font-primary)", letterSpacing: "-.025em", color: "var(--ink-graphite)", flexGrow: 1 }}>
                    {lang === "en" ? tn.en : tn.es}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
                    <Link href={localizeHref(`/casos${tn.anchor}`, lang)} className="ch-tenlink" style={{ font: "700 11px var(--font-secondary)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                      {t.tenseSee} →
                    </Link>
                    <Link href={localizeHref(tn.sim ? `/contacto?escenario=${tn.sim}` : "/contacto", lang)} className="ch-tenlink" style={{ font: "700 11px var(--font-secondary)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--change-violet)" }}>
                      {t.tenseWork} →
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 03 · LO QUE CAMBIA — P3 (puente a /capacidades) ═══ */}
        <section style={{ background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,140px) 0", textAlign: "center" }}>
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
              <Kicker label={t.changeKicker} />
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.changeTitle}</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px auto 0", maxWidth: "56ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.changeLead}</Reveal>
              <Reveal delay={180} style={{ marginTop: 32 }}>
                <Link href={localizeHref("/capacidades", lang)} className="btn btn-secondary">{t.changeCta}</Link>
              </Reveal>
            </div>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 04 · CÓMO SE EMPIEZA — P4: primer paso proporcional ═══ */}
        <section style={{ background: "var(--gradient-violet-whisper)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,140px) 0", textAlign: "center" }}>
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
              <Kicker label={t.startKicker} />
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{t.startTitle}</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px auto 0", maxWidth: "54ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.startLead}</Reveal>
              <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 32 }}>
                <Link href={localizeHref("/mapa-de-claridad", lang)} className="btn btn-primary">{t.startCta1}</Link>
                <Link href={localizeHref("/contacto", lang)} className="btn btn-secondary">{t.startCta2}</Link>
              </Reveal>
            </div>
          </div>
        </section>

        <div aria-hidden="true" style={{ height: "clamp(80px,8vw,120px)", background: "linear-gradient(180deg, var(--surface-soft) 0%, var(--surface-dark) 100%)" }} />
        {/* ═══ 05 · POR QUÉ CHANGE — P5/P6: trayectoria + sistema propio + continuidad ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-dark-signal-field)" }}>
          <ConstellationField />
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-missionshell" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.whyKicker}</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.4vw,64px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>{t.whyTitle}</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.5vw,21px)/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.whyLead}</Reveal>
                <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                  <Link href={localizeHref("/equipo", lang)} className="btn btn-light">{t.whyCta1}</Link>
                  <Link href={localizeHref("/mission-control", lang)} target="_blank" rel="noopener noreferrer" className="btn btn-dghost">{t.whyCta2}</Link>
                </Reveal>
              </div>
              <Reveal delay={160}><MissionControlLive lang={lang} /></Reveal>
            </div>
          </div>
        </section>

        <div aria-hidden="true" style={{ height: "clamp(60px,6vw,90px)", background: "linear-gradient(180deg, var(--surface-dark-secondary) 0%, var(--surface-page) 100%)" }} />
        {/* ═══ 05b · EL TRABAJO EN ACCIÓN — evidencia humana ═══ */}
        <WorkEvidence lang={lang} />

        <div aria-hidden="true" style={{ height: "clamp(80px,8vw,120px)", background: "linear-gradient(180deg, var(--surface-page) 0%, var(--surface-dark-secondary) 100%)" }} />
        {/* ═══ 06 · INVITACIÓN — cierre del journey ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-violet-atmosphere), var(--surface-dark-secondary)" }}>
          <ConstellationField />
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(96px,12vw,176px) 0", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 26 }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.ctaKicker}</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(36px,5vw,76px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>{t.ctaTitle}</Reveal>
            <Reveal delay={140} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 40 }}>
              <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer lang={lang} />

      <style>{`
        .ch-tenlink { transition: color .15s ease; }
        .ch-tenlink:hover { color: var(--ink-graphite) !important; }
        @media (max-width: 980px) {
          .ch-missionshell { grid-template-columns: 1fr !important; }
          .ch-tengrid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .ch-herochain { display: none !important; }
        }
        @media (max-width: 620px) {
          .ch-tengrid { grid-template-columns: 1fr !important; }
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
