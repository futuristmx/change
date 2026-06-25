import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MethodFlow from "@/components/MethodFlow";
import SystemicDescent from "@/components/SystemicDescent";
import CapacityScore from "@/components/CapacityScore";
import MissionControlLive from "@/components/MissionControlLive";
import EtherealDivider from "@/components/ds/EtherealDivider";
import { Badge, SignalField, type BadgeTone } from "@/components/ds";

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const INSTAGRAM_URL = "https://www.instagram.com/change.innovation/";
const LINKEDIN_URL = "https://www.linkedin.com/company/changeconsulting/";

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

const ARCO = [
  { t: "Leer", c: "var(--signal-cyan)" },
  { t: "Interpretar", c: "var(--soft-violet)" },
  { t: "Decidir", c: "var(--change-violet)" },
  { t: "Diseñar", c: "var(--change-violet)" },
  { t: "Sostener", c: "var(--ink-graphite)" },
];

const ARTEFACTOS = [
  { h: "Radar de señales", p: "Lo que está cambiando alrededor, ordenado por relevancia y no por volumen de ruido.", k: "Leer", c: "var(--signal-cyan)" },
  { h: "Mapa de tensiones", p: "Las fuerzas que se contradicen dentro de la organización, nombradas para poder trabajarlas.", k: "Interpretar", c: "var(--soft-violet)" },
  { h: "Matriz de trade-offs", p: "Qué se gana y qué se sacrifica en cada opción, con el costo a la vista.", k: "Decidir", c: "var(--change-violet)" },
  { h: "Roadmap vivo", p: "La decisión convertida en secuencia de movimientos, que se actualiza cuando cambia el terreno.", k: "Diseñar", c: "var(--change-violet)" },
  { h: "Reporte ejecutivo", p: "La lectura completa en lenguaje de dirección, lista para llevar a una mesa que decide.", k: "Síntesis", c: "var(--opportunity-orange)" },
  { h: "Mission Control", p: "Donde señales, decisiones, proyectos y reportes se mantienen vivos y conectados.", k: "Sostener", c: "var(--ink-graphite)" },
  { h: "Field Note", p: "Una lectura corta y pública de un cambio real: de la señal a la decisión que abre.", k: "Pensamiento", c: "var(--signal-cyan)" },
  { h: "Workshop instrumentado", p: "Una sesión que no produce post-its, sino instrumentos de decisión para llevarse.", k: "Trabajo", c: "var(--human-pink)" },
];

const TENSIONES = [
  { k: "Crecer sin diluir identidad", c: "var(--opportunity-orange)", p: "El negocio se expande y la esencia que lo hizo valioso empieza a perderse. Instalamos la regla para crecer sabiendo qué es innegociable y qué puede cambiar." },
  { k: "Priorizar apuestas cuando no alcanza", c: "var(--change-violet)", p: "Hay más oportunidades buenas que recursos para perseguirlas. Instalamos la matriz de trade-offs que vuelve defendible decir que no." },
  { k: "Transferir criterio entre generaciones y equipos", c: "var(--human-pink)", p: "El juicio vive en una o pocas cabezas y no se hereda. Lo hacemos explícito y transferible, para que el rumbo no dependa de quién esté en la sala." },
  { k: "Anticipar qué se rompe bajo presión", c: "var(--warning)", p: "La organización funciona hasta que el contexto la exige de más. Mapeamos los puntos de quiebre antes de que el estrés los encuentre." },
  { k: "Rediseñar la experiencia cuando el usuario ya cambió", c: "var(--signal-cyan)", p: "Lo que funcionaba dejó de corresponder con quien ahora decide y compra. Releemos al usuario real y rediseñamos desde ahí, no desde la inercia." },
  { k: "Convertir visión en roadmap gobernable", c: "var(--change-violet)", p: "Hay una visión clara que no logra bajar a movimientos concretos. La volvemos secuencia accionable y sostenible en el tiempo." },
];

const MESA = [
  { n: "Andrés Valencia", arc: "Leer · Interpretar", c: "var(--signal-cyan)", p: "Trae señales del entorno y las vuelve tensiones nombradas y narrativa que la organización entiende." },
  { n: "Miguel Cadena", arc: "Decidir", c: "var(--change-violet)", p: "Convierte la lectura en apuestas con costo explícito y en crecimiento que se sostiene." },
  { n: "Red de especialistas", arc: "Por reto", c: "var(--soft-stone-gray)", p: "Sumamos especialistas cuando una tensión específica lo exige, sin inflar la estructura." },
];

const CF_IDEAS = [
  { k: "No es tendencia", c: "var(--signal-cyan)", p: "No nace de lo que todos ya están haciendo. Surge de la decisión específica que tu organización tiene enfrente." },
  { k: "No es predicción", c: "var(--soft-violet)", p: "El futuro no se pronostica. Se trabaja. La certeza no es la condición de entrada." },
  { k: "No es workshop", c: "var(--change-violet)", p: "No termina en post-its. Termina en artefactos: instrumentos con los que se puede decidir." },
  { k: "No es dashboard", c: "var(--ink-graphite)", p: "No mira solo hacia atrás. Lee hacia adelante y sostiene el porqué de cada decisión." },
  { k: "Es capacidad organizacional", c: "var(--signal-cyan)", p: "Algo que la organización puede hacer sola después del trabajo conjunto. No una dependencia." },
  { k: "Se entrena en decisiones reales", c: "var(--soft-violet)", p: "Cada reto instala músculo. No hay capacidad sin ejercicio concreto sobre casos reales." },
  { k: "Se prueba en artefactos", c: "var(--change-violet)", p: "La lectura, la matriz, el mapa: instrumentos con los que se decide, no opiniones sueltas." },
  { k: "Se sostiene con memoria", c: "var(--opportunity-orange)", p: "La decisión no se pierde entre juntas. Se queda viva donde la organización puede volver." },
];

const COMO_TRABAJA = [
  { n: "01", h: "Primera lectura", p: "Ordenamos la decisión, la tensión y lo que está cambiando. El objetivo es entender si hay una decisión real que vale la pena trabajar.", label: "Mapa de Claridad" },
  { n: "02", h: "Trabajo acotado", p: "Si hay tracción, construimos criterios, opciones, artefactos y un primer movimiento ejecutable. Con alcance definido desde el inicio.", label: "Sprint de Rumbo" },
  { n: "03", h: "Capacidad instalada", p: "Cuando el reto lo amerita, dejamos memoria, seguimiento y gobernanza para que la decisión no se pierda después de la sesión.", label: "Mission Control" },
];

const EVITAMOS = [
  { c: "var(--change-violet)", h: "No vendemos diagnóstico infinito", p: "Cada etapa debe acercar una decisión. No hay trabajo que no tenga un artefacto claro al final." },
  { c: "var(--signal-cyan)", h: "No entregamos opiniones sueltas", p: "El pensamiento queda en instrumentos: radar, mapa, matriz, roadmap o memoria. Algo que se puede leer, discutir y usar." },
  { c: "var(--ink-graphite)", h: "No forzamos Mission Control", p: "No todas las decisiones necesitan un sistema vivo. Se propone solo cuando hay capacidad que sostener." },
  { c: "var(--opportunity-orange)", h: "No desaparecemos después del workshop", p: "El aprendizaje se documenta, se traduce y se vuelve trazable. El trabajo no termina con la sesión." },
];

const CREDIBILIDAD_PUNTOS = [
  "Casos anonimizados por confidencialidad estratégica.",
  "El valor se demuestra por tensión resuelta, decisión habilitada, artefacto construido y capacidad instalada.",
  "El board senior sostiene el criterio. El método no se delega.",
  "La red de especialistas aporta profundidad específica cuando el reto lo exige.",
  "La información sensible no se usa como material público sin autorización expresa.",
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
              La certeza dejó de ser <span style={{ background: "var(--gradient-type-electric)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>condición para actuar.</span>
            </Reveal>

            <Reveal delay={120} as="p" style={{ margin: "clamp(28px,4vw,40px) auto 0", maxWidth: 620, font: "400 clamp(18px,1.6vw,22px)/1.5 var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>
              Change ayuda a organizaciones a leer lo que cambia, decidir sin esperar certeza y sostener aprendizaje antes de que la urgencia decida por ellas.
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
              <Link href="/contacto" className="btn btn-primary">Simular una decisión</Link>
              <Link href="#score" className="btn btn-secondary">Medir mi capacidad de futuro</Link>
            </Reveal>

            <Reveal delay={280}>
              <div aria-hidden="true" className="ch-herochain" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: "clamp(44px,6vw,68px)" }}>
                {ARCO.map((n, i, arr) => (
                  <span key={n.t} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: n.c }} />
                      <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)" }}>{n.t}</span>
                    </span>
                    {i < arr.length - 1 && <span style={{ color: "var(--border-subtle)" }}>→</span>}
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
        {/* ═══ 04 · TESIS ═══ */}
        <section style={{ background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(96px,12vw,176px) 0", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 26 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>La tesis de Change</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(30px,4.4vw,62px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              El futuro no se predice. Se vuelve <span style={{ background: "var(--gradient-type-electric)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>interpretable, decidible y accionable.</span>
            </Reveal>
            <Reveal delay={120} as="p" style={{ margin: "26px auto 0", maxWidth: 680, font: "400 clamp(17px,1.5vw,21px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
              Trabajamos justo donde la información es incompleta, las tensiones no son evidentes y las decisiones no pueden esperar. Ahí convertimos señales del entorno, comportamiento humano, estrategia y diseño en instrumentos que se pueden usar: para decidir, actuar y aprender.
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 04.5 · QUÉ ES CAPACIDAD DE FUTURO ═══ */}
        <section style={{ background: "var(--gradient-violet-whisper)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 820, marginBottom: "clamp(44px,6vw,64px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Capacidad de Futuro</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>La capacidad que separa a las organizaciones que reaccionan de las que aprenden antes de que sea tarde.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "66ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
                Capacidad de Futuro no es predecir lo que viene. Es desarrollar la habilidad organizacional para leer señales, interpretar tensiones, decidir con criterio, diseñar respuestas y sostener aprendizaje cuando todavía no hay certeza suficiente.
              </Reveal>
            </div>

            <div className="ch-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: "clamp(44px,6vw,64px)" }}>
              {CF_IDEAS.map((idea, i) => (
                <Reveal key={idea.k} delay={(i % 4) * 60} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderTop: `3px solid ${idea.c}`, padding: "24px 22px 26px", display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)", marginBottom: 10 }}>
                    <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: idea.c }} />
                  </span>
                  <h3 style={{ margin: "0 0 10px", font: "600 16px/1.2 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{idea.k}</h3>
                  <p style={{ margin: 0, font: "400 13px/1.55 var(--font-primary)", color: "var(--text-muted)", flexGrow: 1 }}>{idea.p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <blockquote style={{ margin: 0, padding: "clamp(28px,3vw,40px) clamp(24px,3vw,40px)", borderLeft: "3px solid var(--change-violet)", background: "rgba(109,59,255,.04)" }}>
                <p style={{ margin: 0, font: "600 clamp(18px,2vw,26px)/1.35 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>
                  La pregunta no es si el contexto va a cambiar. La pregunta es si tu organización tendrá capacidad para leerlo, decidir y moverse antes de que la urgencia decida por ella.
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
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Artefactos" title="La capacidad de futuro se ve." lead="No entregamos opiniones. Entregamos instrumentos que se pueden leer, discutir y usar para decidir. Esto es lo que produce el método." />
            <div className="ch-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {ARTEFACTOS.map((a, i) => (
                <Reveal key={a.h} delay={(i % 4) * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: "28px 26px 30px", display: "flex", flexDirection: "column", minHeight: 220 }}>
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

        <EtherealDivider />
        {/* ═══ 07 · MISSION CONTROL (dark) ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-dark-signal-field)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-missionshell" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Memoria estratégica</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.4vw,64px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>La estrategia necesita memoria.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.5vw,21px)/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Mission Control sostiene señales, decisiones, proyectos y reportes vivos, para que la organización no tenga que reinventar el rumbo cada vez que cambia el contexto. Es la infraestructura donde el aprendizaje se queda instalado.</Reveal>
                <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                  <Link href="/mission-control" className="btn btn-light">Ver Mission Control</Link>
                  <Link href="/capacidades" className="btn btn-dghost">Ver el método</Link>
                </Reveal>
              </div>
              <Reveal delay={160}><MissionControlLive /></Reveal>
            </div>
          </div>
        </section>

        <EtherealDivider dark />
        {/* ═══ 08 · CAPACIDADES INSTALADAS / DECISIONES ═══ */}
        <section style={{ background: "var(--surface-soft)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Capacidades instaladas" title="No mostramos proyectos. Mostramos capacidades instaladas." lead="Cada trabajo de Change deja a la organización capaz de algo que antes no podía sostener. Estas son las tensiones que sabemos volver decisión." />
            <div className="ch-declist" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
              {TENSIONES.map((d, i) => (
                <Reveal key={d.k} delay={(i % 2) * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 36 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                    <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: d.c }} />Tensión {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ margin: "14px 0 10px", font: "600 clamp(21px,1.9vw,27px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{d.k}</h3>
                  <p style={{ margin: 0, font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{d.p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120} style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <Link href="/casos" className="btn btn-secondary">Ver casos por tensión</Link>
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 09 · CÓMO SE TRABAJA CON CHANGE ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 820, marginBottom: "clamp(44px,6vw,64px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cómo se trabaja con Change</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>No empezamos con una propuesta cerrada. Empezamos con una <span style={{ background: "var(--gradient-type-electric)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>decisión.</span></Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "60ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Cada relación empieza con una decisión real que la organización necesita tomar. Desde ahí construimos, de forma acotada y progresiva.</Reveal>
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
              <p style={{ margin: "0 0 28px", font: "400 13.5px/1.55 var(--font-mono)", letterSpacing: ".02em", color: "var(--text-muted)", fontStyle: "italic" }}>La urgencia suele cobrar más caro que la anticipación.</p>
              <Link href="/contacto" className="btn btn-secondary">Simular una decisión</Link>
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 10 · LO QUE EVITAMOS ═══ */}
        <section style={{ background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 820, marginBottom: "clamp(44px,6vw,64px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Lo que evitamos</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,3.8vw,54px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>La peor consultoría es la que termina en una presentación que nadie puede sostener.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "62ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Muchas organizaciones no temen pagar por estrategia. Temen pagar por algo que no cambie la forma en que deciden. Change trabaja para que cada intervención deje una lectura, un criterio, un artefacto o un sistema que la organización pueda volver a usar.</Reveal>
            </div>

            <div className="ch-declist" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: "clamp(36px,5vw,56px)" }}>
              {EVITAMOS.map((item, i) => (
                <Reveal key={item.h} delay={(i % 2) * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${item.c}`, padding: "28px 28px 30px" }}>
                  <h3 style={{ margin: "0 0 10px", font: "600 clamp(16px,1.5vw,20px)/1.2 var(--font-primary)", letterSpacing: "-.025em", color: "var(--ink-graphite)" }}>{item.h}</h3>
                  <p style={{ margin: 0, font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{item.p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <blockquote style={{ margin: 0, padding: "clamp(24px,3vw,36px) clamp(20px,3vw,36px)", borderLeft: "3px solid var(--border-subtle)", background: "rgba(255,255,255,.6)" }}>
                <p style={{ margin: 0, font: "500 clamp(17px,1.8vw,22px)/1.4 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>El costo real no es decidir imperfectamente. Es seguir posponiendo decisiones hasta que el contexto las tome por ti.</p>
                <footer style={{ marginTop: 14, font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>Una decisión no tomada también consume recursos.</footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 11 · CREDIBILIDAD ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-teamstrip" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,480px)", gap: "clamp(44px,5vw,80px)", alignItems: "start" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Credibilidad</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,3.8vw,54px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Trabajamos con decisiones que no siempre pueden hacerse públicas.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "56ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Muchas de las decisiones que acompañamos involucran crecimiento, relevo, priorización, inversión, marca o tensiones internas. Por eso algunos casos se presentan anonimizados: protegemos el contexto estratégico antes que usarlo como credencial.</Reveal>
              </div>

              <Reveal delay={120}>
                <aside className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.85)", padding: "32px 30px" }}>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                    {CREDIBILIDAD_PUNTOS.map((punto) => (
                      <li key={punto} style={{ display: "flex", gap: 12, alignItems: "flex-start", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
                        <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 6, width: 6, height: 6, borderRadius: "50%", background: "var(--change-violet)" }} />
                        {punto}
                      </li>
                    ))}
                  </ul>
                  <p style={{ margin: "24px 0 0", padding: "16px 0 0", borderTop: "1px solid var(--border-subtle)", font: "600 13px/1.45 var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>
                    El criterio se sostiene desde el board. La profundidad se suma por reto.
                  </p>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 12 · EQUIPO ═══ */}
        <section style={{ background: "var(--surface-soft)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-teamstrip" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(330px,460px)", gap: "clamp(44px,5vw,80px)", alignItems: "start" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Board</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.2vw,60px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Un board para pensar lo que todavía no tiene forma.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Change no es una persona ni una metodología empacada. Es el board donde se cruzan lectura del futuro, dirección de negocio y diseño de sistema, sobre el mismo arco de trabajo.</Reveal>
              </div>
              <div>
                <Reveal delay={120} as="aside" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.85)", padding: "32px 30px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {MESA.map((m, i) => (
                      <div key={m.n} style={{ padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                          <strong style={{ font: "600 16px var(--font-primary)", color: "var(--ink-graphite)" }}>{m.n}</strong>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-graphite)", textAlign: "right" }}>
                            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: m.c }} />{m.arc}
                          </span>
                        </div>
                        <p style={{ margin: "8px 0 0", font: "400 13.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{m.p}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={180} style={{ marginTop: 20, paddingLeft: 16, borderLeft: "2px solid var(--change-violet)" }}>
                  <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>El board senior sostiene el criterio. La red de especialistas aporta profundidad específica cuando el reto lo exige. El método no se delega: se gobierna desde Change.</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <EtherealDivider />
        {/* ═══ 13 · FIELD NOTES ═══ */}
        <section style={{ background: "var(--surface-page)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Field Notes" title="Pensamos en voz alta para mostrar cómo leemos cambio." lead="Cada nota toma una señal real y la recorre completa: de qué cambió a qué decisión abre. Pocas notas, ninguna de relleno." />
            <Reveal className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.7)", padding: "clamp(32px,4vw,48px)" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>El recorrido de cada nota</span>
              <div className="ch-fnflow" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, margin: "24px 0 28px" }}>
                {[
                  ["Señal", "qué cambió en el entorno"],
                  ["Tensión sistémica", "qué fuerza de fondo revela"],
                  ["Pregunta estratégica", "qué obliga a preguntarse"],
                  ["Implicación", "qué deja de ser cierto"],
                  ["Decisión que abre", "qué empieza a poder decidirse"],
                ].map(([t, p], i, arr) => (
                  <div key={t} style={{ position: "relative", paddingTop: 18, borderTop: "2px solid var(--border-subtle)" }}>
                    <span aria-hidden="true" style={{ position: "absolute", top: -5, left: 0, width: 8, height: 8, borderRadius: "50%", background: i === arr.length - 1 ? "var(--change-violet)" : "var(--soft-violet)" }} />
                    <strong style={{ display: "block", font: "600 14.5px var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>{t}</strong>
                    <span style={{ display: "block", marginTop: 5, font: "400 13px/1.45 var(--font-primary)", color: "var(--text-muted)" }}>{p}</span>
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

        <EtherealDivider />
        {/* ═══ 14 · CONTACTO EN HOME ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-dark-pearl)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-teamstrip" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,480px)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Contacto</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4vw,56px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>No empieces con un formulario. Empieza con una decisión.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "52ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Antes de pedirte datos, el simulador te permite probar cómo Change lee una decisión difícil: eliges un escenario, respondes cinco preguntas y recibes una primera lectura. Solo si tiene sentido avanzar, compartes tu información.</Reveal>
                <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                  <Link href="/contacto" className="btn btn-light">Simular una decisión</Link>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dghost"
                    style={{ display: "inline-flex", alignItems: "center", gap: 9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    Instagram
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dghost"
                    style={{ display: "inline-flex", alignItems: "center", gap: 9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                      <line x1="8" y1="11" x2="8" y2="16" />
                      <line x1="8" y1="8" x2="8" y2="8.01" strokeWidth="2.4" strokeLinecap="round" />
                      <line x1="12" y1="16" x2="12" y2="13" />
                      <path d="M12 11a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5" />
                    </svg>
                    LinkedIn
                  </a>
                </Reveal>
                <Reveal delay={240}>
                  <p style={{ margin: "20px 0 0", font: "400 13px/1.5 var(--font-mono)", letterSpacing: ".02em", color: "rgba(255,255,255,.45)" }}>Sin pitch ni propuesta automática. El board lee lo que llega.</p>
                </Reveal>
              </div>

              <Reveal delay={140}>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {[
                    { n: "01", h: "Prueba un escenario", p: "Explora una tensión parecida a la tuya sin compartir información privada." },
                    { n: "02", h: "Recibe una primera lectura", p: "El sistema identifica tensión, riesgo, movimiento principal y artefacto sugerido." },
                    { n: "03", h: "Decide si avanzar", p: "Si la lectura te sirve, puedes enviar tu caso para trabajarlo con Change." },
                  ].map((s, i) => (
                    <div key={s.n} style={{ padding: "22px 24px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", display: "flex", gap: 18, alignItems: "flex-start" }}>
                      <span style={{ font: "300 24px/1 var(--font-accent)", letterSpacing: "-.02em", color: i === 2 ? "var(--signal-cyan)" : "rgba(255,255,255,.55)", flexShrink: 0, marginTop: 2 }}>{s.n}</span>
                      <div>
                        <strong style={{ display: "block", font: "600 15px/1.2 var(--font-primary)", color: "#fff", marginBottom: 6 }}>{s.h}</strong>
                        <p style={{ margin: 0, font: "400 13.5px/1.5 var(--font-primary)", color: "rgba(255,255,255,.65)" }}>{s.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <EtherealDivider dark />
        {/* ═══ 15 · CTA FINAL (dark) ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-violet-atmosphere), var(--surface-dark-secondary)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(96px,12vw,176px) 0", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 26 }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>El primer movimiento</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(36px,5vw,76px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Empieza por una decisión. Construye capacidad desde ahí.</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "26px auto 0", maxWidth: 600, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>La primera conversación no vende una solución cerrada. Identifica qué tensión enfrentas, qué decisión necesita estructura y qué capacidad debe empezar a construirse. De ahí sale el primer paso, acotado y concreto.</Reveal>
            <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 40 }}>
              <Link href="/contacto" className="btn btn-light">Simular una decisión</Link>
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
