import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MethodFlow from "@/components/MethodFlow";
import SystemicDescent from "@/components/SystemicDescent";
import CapacityScore from "@/components/CapacityScore";
import MissionControlLive from "@/components/MissionControlLive";
import EtherealDivider from "@/components/ds/EtherealDivider";
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

const ARCO: Array<{ t: string; c: string; g: GlyphName }> = [
  { t: "Leer", c: "var(--signal-cyan)", g: "read" },
  { t: "Interpretar", c: "var(--soft-violet)", g: "risk" },
  { t: "Decidir", c: "var(--change-violet)", g: "decision" },
  { t: "Diseñar", c: "var(--change-violet)", g: "project" },
  { t: "Sostener", c: "var(--ink-graphite)", g: "status" },
];

const ARTEFACTOS = [
  { h: "Radar de señales", p: "Lo que está cambiando alrededor, ordenado por relevancia y no por volumen de ruido.", k: "Leer", c: "var(--signal-cyan)" },
  { h: "Mapa de tensiones", p: "Las fuerzas que se contradicen dentro de la organización, nombradas para poder trabajarlas.", k: "Interpretar", c: "var(--soft-violet)" },
  { h: "Matriz de decisión", p: "Qué se gana y qué se sacrifica en cada opción, con el costo a la vista.", k: "Decidir", c: "var(--change-violet)" },
  { h: "Roadmap vivo", p: "La decisión convertida en secuencia de movimientos, que se actualiza cuando cambia el terreno.", k: "Diseñar", c: "var(--change-violet)" },
  { h: "Reporte ejecutivo", p: "El diagnóstico completo en lenguaje de dirección, lista para llevar al board que decide.", k: "Síntesis", c: "var(--opportunity-orange)" },
  { h: "Mission Control", p: "Donde señales, decisiones, proyectos y reportes se mantienen vivos y conectados.", k: "Sostener", c: "var(--ink-graphite)" },
];

const MANIFIESTO = [
  { k: "Se ancla en lo que está cambiando", p: "Cada arco de trabajo arranca en una señal real del entorno y una decisión específica que la organización tiene enfrente." },
  { k: "Se entrena en decisiones reales", p: "Cada reto instala músculo. La capacidad se hace ejercitándola sobre casos concretos, no aprendiéndola en abstracto." },
  { k: "Se ve en artefactos", p: "Radar, mapa, matriz, roadmap, memoria: instrumentos que se leen, se discuten y se usan para decidir." },
  { k: "Se sostiene con memoria", p: "El porqué de cada decisión queda vivo. La próxima coyuntura no empieza de cero." },
];

const COMO_TRABAJA = [
  { n: "01", h: "Primer diagnóstico", p: "Ordenamos la decisión, la tensión y lo que está cambiando. El objetivo es entender si hay una decisión real que vale la pena trabajar.", label: "Mapa de Claridad" },
  { n: "02", h: "Trabajo acotado", p: "Si hay tracción, construimos criterios, opciones, artefactos y un primer movimiento ejecutable. Con alcance definido desde el inicio.", label: "Sprint de Rumbo" },
  { n: "03", h: "Capacidad instalada", p: "Cuando el reto lo amerita, dejamos memoria, seguimiento y gobernanza para que la decisión no se pierda después de la sesión.", label: "Mission Control" },
];

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

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>

        {/* ═══ 01 · HERO ═══ */}
        <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 50% -10%,rgba(138,108,255,.14) 0%,rgba(89,184,217,.06) 34%,rgba(255,255,255,0) 60%),var(--gradient-celestial-horizon)" }}>
          <SignalField />
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,156px) 0 clamp(72px,9vw,116px)", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 34, padding: "7px 14px 7px 11px", border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.55)" }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Capacidad de futuro</span>
            </Reveal>

            <Reveal delay={60} as="h1" style={{ margin: "0 auto", maxWidth: "17ch", font: "600 clamp(42px,7vw,104px)/.94 var(--font-primary)", letterSpacing: "-.055em", color: "var(--ink-graphite)" }}>
              <span style={{ background: "var(--gradient-type-neutral-pulse)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>La certeza dejó de ser</span>{" "}
              <span style={{ background: "var(--gradient-type-dark-future)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>condición para actuar.</span>
            </Reveal>

            <Reveal delay={120} as="p" style={{ margin: "clamp(28px,4vw,40px) auto 0", maxWidth: 620, font: "400 clamp(18px,1.6vw,22px)/1.5 var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>
              Change ayuda a organizaciones a leer lo que cambia, decidir sin esperar certeza y sostener aprendizaje antes de que la urgencia decida por ellas.
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
              <Link href="/contacto" className="btn btn-primary">Trabajar una decisión</Link>
              <Link href="#score" className="btn btn-secondary">Medir mi capacidad de futuro</Link>
            </Reveal>

            <Reveal delay={280}>
              <div aria-hidden="true" className="ch-herochain" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: "clamp(44px,6vw,68px)" }}>
                {ARCO.map((n, i, arr) => (
                  <span key={n.t} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span aria-hidden="true" style={{ color: n.c, display: "inline-flex" }}>
                        <Glyph name={n.g} size={22} />
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: n.c }} />
                        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)" }}>{n.t}</span>
                      </span>
                    </span>
                    {i < arr.length - 1 && <span aria-hidden="true" style={{ width: 24, height: 1, background: "var(--line-gradient-relation)" }} />}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 02 · TENSIONES SISTÉMICAS ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Tensiones sistémicas" title="El problema no es el cambio. Es no tener capacidad para interpretarlo a tiempo." lead="Una tensión no nace en tu organización: baja hasta ella. Recorre el descenso — de la época al contexto, del contexto a la decisión que tienes enfrente." />
            <Reveal delay={120}><SystemicDescent /></Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 03 · SCORE DE CAPACIDAD DE FUTURO ═══ */}
        <section id="score" style={{ background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 720, margin: "0 auto clamp(40px,5vw,56px)", textAlign: "center" }}>
              <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Instrumento</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Mide dónde se rompe tu capacidad para actuar sin certeza.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "20px auto 0", maxWidth: "52ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Dos minutos. Cinco capacidades. Un primer movimiento concreto.</Reveal>
            </div>
            <Reveal delay={160}><CapacityScore /></Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 04 · MANIFIESTO DE CAPACIDAD DE FUTURO ═══ */}
        <section style={{ background: "var(--gradient-violet-whisper)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 880, marginBottom: "clamp(40px,5vw,56px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Manifiesto · Capacidad de futuro</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>La habilidad organizacional de actuar cuando todavía no hay certeza.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "62ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
Una forma de operar instalada en la organización: leer señales débiles, decidir con criterio explícito y sostener el aprendizaje cuando el contexto vuelve a moverse.
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
                  La pregunta es si tu organización tendrá capacidad para leer el contexto, decidir y moverse antes de que la urgencia decida por ella.
                </p>
                <footer style={{ marginTop: 18, font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>Esperar también decide.</footer>
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
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>El método</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.6vw,66px)/.96 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Leer. Interpretar. Decidir. Diseñar. Sostener.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "60ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Cinco movimientos que convierten incertidumbre en instrumentos de decisión. Toca cada uno: verás la pregunta que resuelve, el riesgo que reduce y el artefacto que deja.</Reveal>
            </div>
            <Reveal delay={160}><MethodFlow /></Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 06 · ARTEFACTOS ═══ */}
        <section style={{ background: "var(--gradient-violet-whisper)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(68px,8vw,116px) 0" }}>
            <SectionHead kicker="Artefactos" title="La capacidad de futuro se ve." lead="Instrumentos concretos que se leen, se discuten y se usan para decidir." />
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
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Memoria estratégica</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.4vw,64px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>La estrategia necesita memoria.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.5vw,21px)/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Sostiene señales, decisiones y reportes vivos para que la organización no reinvente el rumbo cada vez que el contexto cambia. La infraestructura donde el aprendizaje se queda instalado.</Reveal>
                <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                  <Link href="/mission-control" className="btn btn-light">Ver Mission Control</Link>
                  <Link href="/capacidades" className="btn btn-dghost">Ver el método</Link>
                </Reveal>
              </div>
              <Reveal delay={160}><MissionControlLive /></Reveal>
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
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cómo se trabaja con Change</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                <span style={{ background: "var(--gradient-type-neutral-pulse)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Toda relación con Change empieza con una</span>{" "}
                <span style={{ background: "var(--gradient-type-dark-ember)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>decisión real.</span>
              </Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "60ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Desde ahí construimos, de forma acotada y progresiva — sin retainer abierto ni alcance difuso.</Reveal>
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
              <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-mono)", letterSpacing: ".02em", color: "var(--text-muted)", fontStyle: "italic" }}>La urgencia suele cobrar más caro que la anticipación.</p>
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 13 · FIELD NOTES ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(68px,8vw,116px) 0" }}>
            <SectionHead kicker="Field Notes" title="Notas cortas sobre lo que cambia — y la decisión que abre." lead="Cada nota toma una señal real del entorno y la recorre completa: de qué cambió a qué decisión queda en tus manos. Pocas notas, ninguna de relleno." />
            <Reveal className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.7)", padding: "clamp(32px,4vw,48px)" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>El recorrido de cada nota</span>

              {/* Flow vivo: rail con gradient animado fluyendo + nodos con glifo y pulse stagger */}
              <div className="ch-fnflow" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, margin: "44px 0 28px" }}>
                {/* Rail estructural base */}
                <div aria-hidden="true" style={{ position: "absolute", left: "10%", right: "10%", top: 16, height: 2, background: "var(--line-structural)", opacity: 0.4 }} />
                {/* Rail vivo — gradient que fluye horizontal */}
                <div aria-hidden="true" className="ch-fnflow-flow" style={{ position: "absolute", left: "10%", right: "10%", top: 16, height: 2, backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(109,59,255,0.35) 30%, rgba(89,184,217,0.4) 50%, rgba(138,108,255,0.45) 70%, transparent 100%)", backgroundSize: "200% 100%", backgroundRepeat: "no-repeat" }} />

                {([
                  { t: "Señal", p: "qué cambió en el entorno", g: "insight" as GlyphName, c: "var(--signal-cyan)" },
                  { t: "Tensión sistémica", p: "qué fuerza de fondo revela", g: "risk" as GlyphName, c: "var(--soft-violet)" },
                  { t: "Pregunta estratégica", p: "qué obliga a preguntarse", g: "decision" as GlyphName, c: "var(--change-violet)" },
                  { t: "Implicación", p: "qué deja de ser cierto", g: "project" as GlyphName, c: "var(--change-violet)" },
                  { t: "Decisión que abre", p: "qué empieza a poder decidirse", g: "status" as GlyphName, c: "var(--ink-graphite)" },
                ]).map((s, i) => (
                  <div key={s.t} className="ch-fnflow-node" style={{ position: "relative", paddingTop: 50, textAlign: "left" }}>
                    {/* Nodo circular con glifo dentro — pulse stagger */}
                    <span aria-hidden="true" className="ch-fnflow-dot" style={{ position: "absolute", top: 0, left: 0, width: 34, height: 34, borderRadius: "50%", background: "var(--surface-card)", border: `1.5px solid ${s.c}`, color: s.c, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px rgba(255,255,255,.8)", animationDelay: `${i * 0.4}s` }}>
                      <Glyph name={s.g} size={16} />
                    </span>
                    <strong style={{ display: "block", font: "600 14.5px var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>{s.t}</strong>
                    <span style={{ display: "block", marginTop: 5, font: "400 13px/1.45 var(--font-primary)", color: "var(--text-muted)" }}>{s.p}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/field-notes" className="btn btn-secondary btn-sm">Ver las Field Notes</Link>
                <span style={{ font: "400 13px var(--font-primary)", color: "var(--text-muted)" }}>Las Field Notes existen cuando una señal merece convertirse en decisión.</span>
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
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>El primer movimiento</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(36px,5vw,76px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Empieza por una decisión. Construye capacidad desde ahí.</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "26px auto 0", maxWidth: 600, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>La primera conversación no vende nada cerrado: identifica qué tensión enfrentas y cuál es el primer paso, acotado y concreto.</Reveal>
            <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 40 }}>
              <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
              <Link href="/capacidades" className="btn btn-dghost">Conocer el método</Link>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />

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
