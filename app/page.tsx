import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import DecisionCartography from "@/components/DecisionCartography";
import MissionControlTabs from "@/components/MissionControlTabs";

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

const ARCO = [
  { t: "Leer", c: "var(--signal-cyan)" },
  { t: "Interpretar", c: "var(--soft-violet)" },
  { t: "Decidir", c: "var(--change-violet)" },
  { t: "Diseñar", c: "var(--change-violet)" },
  { t: "Sostener", c: "var(--ink-graphite)" },
];

const METODO = [
  { v: "Leer", q: "¿Qué está cambiando alrededor antes de que se vuelva urgente?", p: "Rastreamos las señales que importan y separamos ruido de movimiento real.", art: "Radar de señales", c: "var(--signal-cyan)" },
  { v: "Interpretar", q: "¿Qué significa lo que cambia para esta organización en particular?", p: "Convertimos señales sueltas en tensiones nombradas — el paso que casi nadie da, y donde se gana o se pierde la lectura.", art: "Mapa de tensiones", c: "var(--soft-violet)" },
  { v: "Decidir", q: "¿Qué importa de verdad y qué se sacrifica?", p: "Hacemos explícitos los criterios y los trade-offs para que la decisión se pueda defender y repetir.", art: "Matriz de trade-offs", c: "var(--change-violet)" },
  { v: "Diseñar", q: "¿Qué forma concreta toma la decisión?", p: "La bajamos a rumbo accionable: roadmap, prototipo o narrativa que el equipo puede ejecutar.", art: "Roadmap vivo", c: "var(--change-violet)" },
  { v: "Sostener", q: "¿Cómo se mantiene vivo el aprendizaje en la siguiente coyuntura?", p: "Le damos memoria a la estrategia para que no se reinicie cada vez que cambia el contexto.", art: "Mission Control", c: "var(--ink-graphite)" },
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
  { n: "Eric O. Fuentes", arc: "Diseñar · Sostener", c: "var(--ink-graphite)", p: "Da forma a la decisión y construye la infraestructura para que el aprendizaje no se pierda." },
  { n: "Partners", arc: "Por reto", c: "var(--soft-stone-gray)", p: "Sumamos especialistas cuando una tensión específica lo exige, sin inflar la estructura." },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>

        {/* ═══ 01 · HERO ═══ */}
        <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 50% -10%,rgba(138,108,255,.14) 0%,rgba(89,184,217,.06) 34%,rgba(255,255,255,0) 60%),linear-gradient(180deg,#FFFFFF 0%,var(--pure-white) 70%,var(--warm-haze) 100%)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,156px) 0 clamp(72px,9vw,116px)", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 34, padding: "7px 14px 7px 11px", border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.55)" }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Capacidad de futuro</span>
            </Reveal>

            <Reveal delay={60} as="h1" style={{ margin: "0 auto", maxWidth: "17ch", font: "600 clamp(42px,7vw,104px)/.94 var(--font-primary)", letterSpacing: "-.055em", color: "var(--ink-graphite)" }}>
              La certeza dejó de ser <span style={{ background: "var(--gradient-type-electric)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>condición para actuar.</span>
            </Reveal>

            <Reveal delay={120} as="p" style={{ margin: "clamp(28px,4vw,40px) auto 0", maxWidth: 660, font: "400 clamp(18px,1.6vw,23px)/1.5 var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>
              Change diseña capacidad de futuro para organizaciones que necesitan leer lo que cambia, decidir con criterio y sostener acción inteligente antes de que la urgencia decida por ellas.
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
              <Link href="/contacto" className="btn btn-primary">Trabajar una decisión</Link>
              <Link href="#metodo" className="btn btn-secondary">Ver el método</Link>
            </Reveal>

            {/* arco estático — apertura hacia el método */}
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

        {/* ═══ 02 · TENSIONES SISTÉMICAS ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Tensiones sistémicas" title="El problema no es el cambio. Es no tener capacidad para interpretarlo a tiempo." lead="El cambio no avisa con el lenguaje de tus decisiones. Lo que falla no es la información: es la capacidad de leerla, ordenarla y volverla decisión antes de que sea tarde." />
            <div className="ch-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                { h: "Época", m: "Lo macro", c: "var(--signal-cyan)", p: "La certeza dejó de llegar antes de las decisiones importantes. Hoy se decide con información incompleta, señales contradictorias y ventanas que se cierran rápido. Esperar a estar seguro ya es, en sí mismo, una decisión — casi siempre la peor." },
                { h: "Contexto", m: "Lo competitivo", c: "var(--soft-violet)", p: "Las empresas crecen más rápido que sus sistemas para decidir. El negocio se expande, suma frentes y aumenta lo que está en juego, pero la forma de pensar el rumbo sigue siendo la de cuando todo cabía en una cabeza." },
                { h: "Organización", m: "Lo interno", c: "var(--change-violet)", p: "La operación avanza, pero el aprendizaje no siempre se sostiene. Se decide, se ejecuta y se sigue, sin que la organización retenga por qué decidió así. Cada coyuntura vuelve a empezar de cero y el aprendizaje se evapora." },
              ].map((c, i) => (
                <Reveal key={c.h} delay={i * 120} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 36, minHeight: 280, display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                    <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: c.c }} />{c.m}
                  </span>
                  <h3 style={{ margin: "16px 0 0", font: "600 clamp(26px,2.4vw,36px)/1 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                  <p style={{ margin: "16px 0 0", font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 03 · TESIS ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
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

        {/* ═══ 04 · MÉTODO ═══ */}
        <section id="metodo" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="El método" title="Leer. Interpretar. Decidir. Diseñar. Sostener." lead="Cinco movimientos que convierten incertidumbre en instrumentos de decisión. No es un proceso lineal de una sola vez: es la forma en que una organización aprende a leerse a sí misma y a su entorno." />
            <Reveal style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.7)" }}>
              {METODO.map((m, i, arr) => (
                <div key={m.v} className="ch-mrow" style={{ display: "grid", gridTemplateColumns: "210px 1fr 230px", alignItems: "stretch", gap: 24, padding: "0 28px 0 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, padding: "26px 0 26px 28px" }}>
                    <span style={{ position: "absolute", left: 34, top: i === 0 ? "50%" : 0, bottom: i === arr.length - 1 ? "50%" : 0, width: 1, background: "var(--line-structural)" }} />
                    <span style={{ position: "relative", zIndex: 1, width: 11, height: 11, borderRadius: "50%", background: m.c, boxShadow: "0 0 0 4px #fff" }} />
                    <h3 style={{ margin: 0, font: "600 clamp(20px,1.9vw,25px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{m.v}</h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}><p style={{ margin: 0, font: "400 15px/1.5 var(--font-primary)", color: "var(--text-muted)" }}><strong style={{ color: "var(--deep-warm-gray)", fontWeight: 500 }}>{m.q}</strong> {m.p}</p></div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: m.c }} />{m.art}
                    </span>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ═══ 05 · CARTOGRAFÍA INTERACTIVA ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 760, marginBottom: "clamp(40px,5vw,60px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>El arco, paso a paso</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.4vw,62px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Recorre cada movimiento. Mira qué decisión habilita.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "20px 0 0", maxWidth: "56ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Cada nodo resuelve una pregunta, reduce un riesgo y deja un artefacto. Juntos, alimentan la memoria estratégica de la organización.</Reveal>
            </div>
            <Reveal delay={160}><DecisionCartography /></Reveal>
          </div>
        </section>

        {/* ═══ 06 · ARTEFACTOS ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Artefactos" title="La capacidad de futuro se ve." lead="No entregamos opiniones. Entregamos instrumentos que se pueden leer, discutir y usar para decidir. Esto es lo que produce el método." />
            <div className="ch-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {ARTEFACTOS.map((a, i) => (
                <Reveal key={a.h} delay={(i % 4) * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: "28px 26px 30px", display: "flex", flexDirection: "column", minHeight: 220 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                    <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: a.c }} />{a.k}
                  </span>
                  <h3 style={{ margin: "16px 0 0", font: "600 20px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{a.h}</h3>
                  <p style={{ margin: "10px 0 0", font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{a.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 07 · MISSION CONTROL (dark) ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 22%, transparent),transparent 38%),linear-gradient(180deg,var(--surface-dark) 0%,var(--surface-dark-secondary) 100%)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-missionshell" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Memoria estratégica</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.4vw,64px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>La estrategia necesita memoria.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.5vw,21px)/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Mission Control sostiene señales, decisiones, proyectos y reportes vivos, para que la organización no tenga que reinventar el rumbo cada vez que cambia el contexto. Es la infraestructura donde la capacidad de futuro se queda instalada.</Reveal>
                <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                  <Link href="/mission-control" className="btn btn-light">Ver Mission Control</Link>
                  <Link href="/capacidades" className="btn btn-dghost">Ver el método</Link>
                </Reveal>
              </div>
              <Reveal delay={160}><MissionControlTabs /></Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 08 · CAPACIDADES INSTALADAS / DECISIONES ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
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
          </div>
        </section>

        {/* ═══ 09 · EQUIPO ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-teamstrip" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(330px,460px)", gap: "clamp(44px,5vw,80px)", alignItems: "start" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>La mesa</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.2vw,60px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Una mesa para pensar lo que todavía no tiene forma.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Change no es una persona ni una metodología empacada. Es una mesa donde se cruzan lectura del futuro, dirección de negocio y diseño de sistema, sobre el mismo arco de trabajo.</Reveal>
              </div>
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
            </div>
          </div>
        </section>

        {/* ═══ 10 · FIELD NOTES ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Field Notes" title="Pensamos en voz alta para mostrar cómo leemos cambio." lead="Cada nota toma una señal real y la recorre completa: de qué cambió a qué decisión abre. No publicamos conclusiones; publicamos la forma en que pensamos." />
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
              <Link href="/field-notes" className="btn btn-secondary btn-sm">Leer las Field Notes</Link>
            </Reveal>
          </div>
        </section>

        {/* ═══ 11 · CTA FINAL (dark) ═══ */}
        <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(96px,12vw,176px) 0", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 26 }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>El primer movimiento</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(36px,5vw,76px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Empieza por una decisión. Construye capacidad desde ahí.</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "26px auto 0", maxWidth: 600, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>La primera conversación no vende una solución cerrada. Identifica qué tensión enfrentas, qué decisión necesita estructura y qué capacidad debe empezar a construirse. De ahí sale el primer paso, acotado y concreto.</Reveal>
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
