import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import ArtifactGallery from "@/components/ArtifactGallery";
import { Glyph, type GlyphName } from "@/components/ds";

export const metadata: Metadata = {
  title: "Método: leer, interpretar, decidir, diseñar y sostener",
  description:
    "No compras una capacidad suelta. Construyes capacidad de futuro: cinco movimientos que convierten incertidumbre en instrumentos de decisión.",
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

const CAPS = [
  { v: "Leer", q: "¿Qué está cambiando?", c: "var(--signal-cyan)", art: "Radar de señales", p: "Separamos el ruido de la señal. Identificamos los movimientos del entorno que sí importan para tu decisión, antes de que se vuelvan obvios para todos." },
  { v: "Interpretar", q: "¿Qué significa para nosotros?", c: "var(--soft-violet)", art: "Mapa de tensiones", p: "Una señal sin lectura es un dato suelto. Conectamos lo que cambia con lo que tensiona a tu organización: dónde se contradicen las fuerzas, qué presión se acumula, qué está en juego. Es la capa que casi nadie da, y la que cambia la conversación." },
  { v: "Decidir", q: "¿Qué importa y qué se sacrifica?", c: "var(--change-violet)", art: "Matriz de decisión", p: "Toda decisión real implica renunciar a algo. Hacemos explícitos los criterios, los criterios y sacrificios y lo que cada camino cuesta, para que la decisión deje de depender de quién habla más fuerte y empiece a depender de qué pesa más." },
  { v: "Diseñar", q: "¿Qué forma toma?", c: "var(--change-violet)", art: "Roadmap vivo", p: "Una decisión sin forma no se ejecuta. Le damos cuerpo: la secuencia de movimientos, el prototipo que prueba la apuesta, la narrativa que alinea al equipo. La estrategia deja de ser intención y se vuelve algo que se puede empezar el lunes." },
  { v: "Sostener", q: "¿Cómo se mantiene vivo?", c: "var(--ink-graphite)", art: "Mission Control", p: "Lo difícil no es decidir bien una vez. Es no perder el rumbo cuando el entorno se mueve otra vez. Instalamos la memoria estratégica que mantiene viva la decisión, registra lo aprendido y avisa cuando las condiciones cambian." },
];

const ARTE = [
  { h: "Radar de señales", p: "El mapa de lo que se mueve en tu entorno y todavía no es evidente.", k: "Leer", c: "var(--signal-cyan)" },
  { h: "Mapa de tensiones", p: "Las fuerzas en contradicción que definen el campo donde vas a decidir.", k: "Interpretar", c: "var(--soft-violet)" },
  { h: "Matriz de decisión", p: "Los criterios y sacrificios de cada camino, explícitos sobre la mesa.", k: "Decidir", c: "var(--change-violet)" },
  { h: "Roadmap vivo", p: "La secuencia de movimientos que se actualiza conforme cambian las condiciones.", k: "Diseñar", c: "var(--change-violet)" },
  { h: "Reporte ejecutivo", p: "La síntesis que lleva la decisión al lenguaje del consejo y de quien firma.", k: "Diseñar", c: "var(--opportunity-orange)" },
  { h: "Field Note", p: "El registro corto de lo aprendido en el camino, para que el juicio no se pierda.", k: "Sostener", c: "var(--signal-cyan)" },
  { h: "Workshop instrumentado", p: "Una sesión que no termina en post-its: termina en un artefacto que decide.", k: "Transversal", c: "var(--human-pink)" },
  { h: "Mission Control", p: "La infraestructura de memoria estratégica donde la capacidad permanece viva entre decisiones.", k: "Sostener", c: "var(--ink-graphite)" },
];

const ESCALERA: Array<{ n: string; tag: string; c: string; p: string; g: GlyphName; duration: string }> = [
  { n: "Mapa de Claridad", tag: "Entrada", c: "var(--signal-cyan)", g: "insight", duration: "2–3 SEMANAS", p: "El punto de partida. Tomamos la decisión que tienes enfrente y la ponemos en orden: qué cambia, qué tensiona, qué está en juego. Sales con una lectura que tu equipo no tenía y con la primera versión de tus artefactos." },
  { n: "Sprint de Rumbo", tag: "Acotado", c: "var(--soft-violet)", g: "decision", duration: "6–10 SEMANAS", p: "Un trabajo enfocado sobre un reto definido. Recorremos las cinco capacidades sobre tu caso real y aterrizamos la decisión en instrumentos. Sales con una respuesta diseñada, lista para ejecutar." },
  { n: "Mission Control", tag: "Sistema vivo", c: "var(--change-violet)", g: "status", duration: "CONTINUO", p: "La infraestructura de memoria estratégica que mantiene viva cada decisión y avisa cuando el entorno se mueve. El destino de quien ya construyó músculo, no el punto de entrada." },
];

export default function CapacidadesPage() {
  return (
    <PageScaffold
      kicker="Capacidades · Método"
      title={<GradientTitle pre="Capacidad de futuro: la habilidad de responder antes" accent="de que el problema tenga nombre." accentGradient="var(--gradient-type-dark-mineral)" />}
      lead="Mientras la mayoría contrata respuestas a problemas ya nombrados, Change construye la capacidad de responder a los que todavía no lo tienen."
    >
      {/* ═══ QUÉ ES ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head kicker="Qué es" title="Saber qué hacer antes de que la urgencia decida por ti." lead="La habilidad de una organización para interpretar el cambio, decidir, diseñar respuestas y sostener el aprendizaje antes de que el entorno la obligue a reaccionar. Una forma de operar, instalada en la organización." />
          <div className="cap-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { h: "Se ancla en una tensión real", p: "Cada arco de trabajo parte de la decisión específica que tu organización tiene enfrente y que aún no encuentra forma." },
              { h: "Se prueba en una decisión", p: "Se mide en si la siguiente decisión difícil se toma mejor, más rápido y con menos dependencia de una sola cabeza." },
              { h: "Se ve en un artefacto", p: "Cada avance deja un instrumento concreto: un radar, un mapa, una matriz. La capacidad se vuelve algo que tu equipo puede leer y usar." },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 32, minHeight: 210, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: 0, font: "600 clamp(20px,1.8vw,24px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LAS 5 CAPACIDADES ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head kicker="Las cinco capacidades" title="Cinco movimientos para convertir incertidumbre en decisión." lead="Cada capacidad responde una pregunta distinta y deja un instrumento concreto. Juntas forman el método con el que una organización pasa de reaccionar a anticipar." />
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
          <Head kicker="La capacidad se ve" title="Cada capacidad deja un instrumento." lead="Construimos instrumentos de decisión: artefactos con los que el pensamiento se vuelve algo que tu equipo puede leer, usar y defender." />
          <ArtifactGallery />
        </div>
      </section>

      {/* ═══ CONSTRUCCIÓN PROGRESIVA (escalera viva line-and-node) ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head kicker="Construcción progresiva" title="La capacidad no se entrega de golpe. Se construye por etapas." lead="Empiezas con una decisión y, si el sistema lo amerita, lo conviertes en una forma permanente de operar. Cada etapa deja valor por sí sola y prepara la siguiente." />
          <div className="cap-ladder" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {/* Rail conector con gradient relación */}
            <div aria-hidden="true" className="cap-ladder-rail" style={{ position: "absolute", left: "16%", right: "16%", top: 36, height: 2, background: "var(--line-gradient-relation)", opacity: 0.5 }} />
            {ESCALERA.map((r, i) => (
              <Reveal key={r.n} delay={i * 140} as="article" className="ch-card cap-ladder-card" style={{ position: "relative", border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.94)", padding: "60px 30px 30px", display: "flex", flexDirection: "column", textAlign: "center" }}>
                <span aria-hidden="true" style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", width: 26, height: 26, borderRadius: "50%", background: r.c, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 0 0 6px var(--surface-page), 0 8px 22px ${r.c}` }}>
                  <Glyph name={r.g} size={14} />
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
                  Paso {String(i + 1).padStart(2, "0")} · {r.tag}
                </span>
                <h3 style={{ margin: "0 0 6px", font: "600 clamp(22px,2vw,28px)/1.04 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{r.n}</h3>
                <span style={{ display: "inline-block", marginBottom: 14, font: "600 17px/1 var(--font-accent)", letterSpacing: ".08em", color: r.c }}>{r.duration}</span>
                <p style={{ margin: 0, font: "400 14.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{r.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(32px,5vw,68px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>El mejor momento para construir capacidad es antes de necesitarla.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Cada relación arranca con la decisión que ya tienes enfrente. Trae una y la trabajamos juntos.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/casos" className="btn btn-dghost">Ver capacidades instaladas</Link>
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
