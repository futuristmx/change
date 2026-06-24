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
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>{kicker}</span>
        </Reveal>
        <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.6vw,66px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{title}</Reveal>
      </div>
      <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{lead}</Reveal>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main id="main-content" style={{ flex: 1 }}>

        {/* ═══ HERO (1 columna, centrado) ═══ */}
        <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 50% -10%,rgba(138,108,255,.14) 0%,rgba(89,184,217,.06) 34%,rgba(255,255,255,0) 60%),linear-gradient(180deg,#FFFFFF 0%,#F8F7F4 70%,#F2EFEA 100%)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,156px) 0 clamp(72px,9vw,116px)", textAlign: "center" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 34, padding: "7px 14px 7px 11px", border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.55)" }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Convertimos incertidumbre en criterio</span>
            </Reveal>

            <Reveal delay={60} as="h1" style={{ margin: "0 auto", maxWidth: "16ch", font: "600 clamp(48px,8vw,118px)/.9 var(--font-primary)", letterSpacing: "-.055em", color: "var(--ink-graphite)" }}>
              La claridad no aparece.<br />
              <span style={{ background: "var(--gradient-type-electric)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Se diseña.</span>
            </Reveal>

            <Reveal delay={120} as="p" style={{ margin: "clamp(28px,4vw,40px) auto 0", maxWidth: 640, font: "400 clamp(19px,1.7vw,24px)/1.45 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>
              El rumbo de una organización no debería depender de la cabeza de una sola persona. Change convierte el criterio directivo en un sistema claro, compartido y trazable.
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
              <Link href="/contacto" className="btn btn-primary">Trabajar una decisión</Link>
              <Link href="#metodo" className="btn btn-secondary">Ver el método</Link>
            </Reveal>

            {/* cadena estática — apertura hacia la sección Cartografía (oculta en mobile) */}
            <Reveal delay={280}>
              <div aria-hidden="true" className="ch-herochain" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: "clamp(44px,6vw,68px)" }}>
                {[
                  { t: "Señal", c: "var(--signal-cyan)" },
                  { t: "Escenario", c: "var(--change-violet)" },
                  { t: "Criterio", c: "var(--change-violet)" },
                  { t: "Decisión", c: "var(--change-violet)" },
                  { t: "Proyecto", c: "var(--change-violet)" },
                  { t: "Sistema", c: "var(--ink-graphite)" },
                ].map((n, i, arr) => (
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

        {/* ═══ CARTOGRAFÍA DE DECISIÓN (sección firma) ═══ */}
        <section id="cartografia" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div style={{ maxWidth: 760, marginBottom: "clamp(40px,5vw,60px)" }}>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>La cadena del criterio</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.6vw,66px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>De la señal al sistema. Sin perder el hilo.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "20px 0 0", maxWidth: "54ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>La cadena que convierte incertidumbre en criterio gobernable — paso a paso, con memoria.</Reveal>
            </div>
            <Reveal delay={160}><DecisionCartography /></Reveal>
          </div>
        </section>

        {/* ═══ PROBLEMA ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="La tensión real" title="Cuando todo parece urgente, el criterio se vuelve invisible." lead="No se atascan por falta de ideas, sino cuando las decisiones difíciles no tienen estructura compartida." />
            <div className="ch-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                { h: "El juicio vive en una cabeza.", p: "La organización depende de una lectura que no se puede transferir.", r: "Riesgo · dependencia crítica" },
                { h: "Las decisiones pierden memoria.", p: "Meses después nadie recuerda qué se sacrificó ni qué señal cambiaría la ruta.", r: "Riesgo · discusión circular" },
                { h: "La operación simula avance.", p: "La agenda se llena de movimiento, pero no necesariamente de dirección.", r: "Riesgo · rumbo diluido" },
              ].map((c, i) => (
                <Reveal key={c.h} delay={i * 120} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 36, minHeight: 248, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ margin: 0, font: "600 clamp(24px,2.1vw,32px)/1 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                  <p style={{ margin: "18px 0 0", font: "400 15.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
                  <span style={{ marginTop: "auto", paddingTop: 24, font: "600 11px var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: "var(--opportunity-orange)" }}>{c.r}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ DIFERENCIA ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,#FAFAF8)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Diferencia Change" title="Sacamos el criterio de una cabeza y lo volvemos sistema." lead="El mismo criterio que ya decide el futuro, recorriendo cuatro estados hasta volverse gobernable." />
            <div className="ch-staterow" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {[
                { n: "Estado 01", h: "Criterio concentrado", p: "Existe, pero no escala.", w: "25%", bar: "var(--soft-stone-gray)", track: "rgba(46,46,51,.1)", bg: "rgba(255,255,255,.7)", emph: false },
                { n: "Estado 02", h: "Criterio explícito", p: "Supuestos y trade-offs nombrados.", w: "50%", bar: "var(--soft-violet)", track: "rgba(46,46,51,.08)", bg: "rgba(255,255,255,.78)", emph: false },
                { n: "Estado 03", h: "Criterio trazable", p: "Conectado a señales y decisiones.", w: "75%", bar: "var(--change-violet)", track: "rgba(46,46,51,.08)", bg: "rgba(255,255,255,.85)", emph: false },
                { n: "Estado 04", h: "Criterio gobernado", p: "Revisable, transferible y sostenible.", w: "100%", bar: "var(--change-violet)", track: "color-mix(in srgb, var(--change-violet) 18%, transparent)", bg: "color-mix(in srgb, var(--change-violet) 5%, transparent)", emph: true },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 100} className="ch-card" style={{ background: s.bg, border: "1px solid var(--border-subtle)", padding: "30px 26px 34px" }}>
                  <div style={{ height: 3, background: s.track, marginBottom: 26 }}><div style={{ width: s.w, height: "100%", background: s.bar }} /></div>
                  <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: s.emph ? "var(--change-violet)" : "var(--text-faint)" }}>{s.n}</span>
                  <h3 style={{ margin: "13px 0 8px", font: "600 22px var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{s.h}</h3>
                  <p style={{ margin: 0, font: "400 14px/1.5 var(--font-primary)", color: s.emph ? "var(--deep-warm-gray)" : "var(--text-muted)" }}>{s.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MÉTODO ═══ */}
        <section id="metodo" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Método" title="La decisión debajo de la decisión." lead="Una secuencia para entender qué conversación estratégica está pidiendo forma." />
            <Reveal style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.7)" }}>
              {[
                { n: "01", h: "Señales", p: "Qué está cambiando y qué todavía es ruido." },
                { n: "02", h: "Escenarios", p: "Cómo podría moverse el contexto." },
                { n: "03", h: "Criterios", p: "Qué debe pesar más al decidir." },
                { n: "04", h: "Trade-offs", p: "Qué se gana, qué se sacrifica." },
                { n: "05", h: "Primer movimiento", p: "Qué acción permite avanzar sin fingir certeza." },
                { n: "06", h: "Gobierno", p: "Qué ritual sostiene el criterio." },
              ].map((m, i, arr) => (
                <div key={m.n} className="ch-mrow" style={{ display: "grid", gridTemplateColumns: "120px 230px 1fr", alignItems: "stretch", gap: 24, padding: "0 28px 0 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 18, padding: "26px 0 26px 28px" }}>
                    <span style={{ position: "absolute", left: 34, top: i === 0 ? "50%" : 0, bottom: i === arr.length - 1 ? "50%" : 0, width: 1, background: "var(--line-structural)" }} />
                    <span style={{ position: "relative", zIndex: 1, width: 9, height: 9, borderRadius: "50%", background: i === arr.length - 1 ? "var(--change-violet)" : "var(--soft-violet)", boxShadow: "0 0 0 4px #fff" }} />
                    <span style={{ font: "300 clamp(28px,2.6vw,38px) var(--font-secondary)", color: "var(--ink-graphite)" }}>{m.n}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}><h3 style={{ margin: 0, font: "600 20px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{m.h}</h3></div>
                  <div style={{ display: "flex", alignItems: "center" }}><p style={{ margin: 0, font: "400 15px var(--font-primary)", color: "var(--text-muted)" }}>{m.p}</p></div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ═══ RUTA ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,#F8F7F4)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Ruta de trabajo" title="Empieza por una decisión. Escala cuando el criterio ya existe." lead="La entrada no es un gran proyecto. Es una conversación difícil trabajada con estructura." />
            <div className="ch-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                { n: "01", h: "Mapa de Claridad", p: "Lectura estratégica para nombrar la decisión atorada y el criterio que debe gobernarla.", c: "var(--ink-graphite)", detail: [
                  ["Resuelve", "Una decisión ambigua o atorada sin estructura compartida."],
                  ["Entregamos", "Lectura estratégica · Marco de criterios · Primer movimiento."],
                  ["Cuándo", "Cuando la decisión ya está encima pero no hay consenso en qué importa más."],
                ] },
                { n: "02", h: "Sprint de Rumbo", p: "Trabajo acotado para convertir claridad en rutas, apuestas y primeros movimientos.", c: "var(--ink-graphite)", detail: [
                  ["Resuelve", "Claridad que no se convierte en dirección ni proyectos concretos."],
                  ["Entregamos", "Mapa de opciones · Criterios comparables · Trade-offs · Roadmap ejecutivo."],
                  ["Cuándo", "Cuando hay más de una apuesta posible y el equipo no puede priorizar."],
                ] },
                { n: "03", h: "Mission Control", p: "Sistema vivo para sostener trazabilidad, reportes y seguimiento ejecutivo.", c: "var(--change-violet)", detail: [
                  ["Resuelve", "Estrategia que se diluye entre juntas, documentos y chats."],
                  ["Entregamos", "Sistema vivo de trazabilidad · Radar de señales · Memoria de criterios."],
                  ["Cuándo", "Cuando el criterio existe pero necesita escala, gobierno y continuidad."],
                ] },
              ].map((r, i) => (
                <Reveal key={r.n} delay={i * 120} as="article" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.8)", padding: "36px 32px", display: "flex", flexDirection: "column" }}>
                  <div style={{ font: "300 clamp(40px,4vw,56px)/1 var(--font-secondary)", color: r.c }}>{r.n}</div>
                  <h3 style={{ margin: "18px 0 10px", font: "600 23px var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{r.h}</h3>
                  <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{r.p}</p>
                  <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 12 }}>
                    {r.detail.map(([label, text]) => (
                      <div key={label} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 12, alignItems: "baseline" }}>
                        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{label}</span>
                        <span style={{ font: "400 13.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MISSION CONTROL (dark) ═══ */}
        <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 22%, transparent),transparent 38%),linear-gradient(180deg,var(--surface-dark) 0%,var(--surface-dark-secondary) 100%)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-missionshell" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                  <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>Mission Control</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(34px,4.4vw,64px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>El criterio no debería morir en una junta.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 480, font: "400 clamp(18px,1.5vw,22px)/1.45 var(--font-primary)", letterSpacing: "-.02em", color: "rgba(255,255,255,.7)" }}>Conecta señales, decisiones, proyectos y reportes vivos para que el rumbo se revise, ajuste y sostenga.</Reveal>
                <Reveal delay={180} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                  <Link href="/mission-control" className="btn btn-light">Ver Mission Control</Link>
                  <Link href="/equipo" className="btn btn-dghost">Conocer al equipo</Link>
                </Reveal>
              </div>
              <Reveal delay={160}><MissionControlTabs /></Reveal>
            </div>
          </div>
        </section>

        {/* ═══ DECISIONES ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <SectionHead kicker="Decisiones habilitadas" title="Decisiones que sobrevivieron a la operación." lead="La evidencia de Change no es estética. Es capacidad directiva instalada." />
            <div className="ch-declist" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
              {[
                { k: "Expansión", c: "var(--opportunity-orange)", h: "¿Dónde crecer sin diluir esencia?", p: "Tensión entre velocidad, capacidad operativa y marca en contextos de crecimiento real." },
                { k: "Sucesión", c: "var(--human-pink)", h: "¿Cómo transferir criterio sin perder control?", p: "Decisiones que antes dependían de una sola lectura — y que ahora necesitan escala." },
                { k: "Portafolio", c: "var(--signal-cyan)", h: "¿Qué apuestas merecen recursos?", p: "Criterios comparables para priorizar innovación cuando el presupuesto no alcanza para todo." },
                { k: "Riesgo", c: "var(--warning)", h: "¿Qué se rompe primero bajo presión?", p: "Escenarios, vulnerabilidades y respuesta anticipatoria antes de que llegue la urgencia." },
              ].map((d, i) => (
                <Reveal key={d.k} delay={i * 80} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 36 }}>
                  <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: d.c }}>{d.k}</span>
                  <h3 style={{ margin: "14px 0 8px", font: "600 clamp(22px,2vw,30px)/1.02 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{d.h}</h3>
                  <p style={{ margin: 0, font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{d.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EQUIPO ═══ */}
        <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,#FAFAF8)" }}>
          <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(92px,11vw,168px) 0" }}>
            <div className="ch-teamstrip" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(330px,460px)", gap: "clamp(44px,5vw,80px)", alignItems: "start" }}>
              <div>
                <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                  <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Equipo</span>
                </Reveal>
                <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.2vw,60px)/.98 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Change no es una voz individual. Es una mesa de criterio.</Reveal>
                <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: 500, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Estrategia, foresight, diseño, tecnología, operación y narrativa, conectadas según el reto.</Reveal>
              </div>
              <Reveal delay={120} as="aside" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.85)", padding: "32px 30px" }}>
                <h3 style={{ margin: "0 0 24px", font: "600 20px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>Una mesa senior, no una fábrica de entregables.</h3>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[
                    { n: "Andrés Valencia", r: "futuros · estrategia · narrativa" },
                    { n: "Miguel Cadena", r: "negocio · dirección · crecimiento" },
                    { n: "Eric O. Fuentes", r: "diseño · sistema · ejecución" },
                    { n: "Partners estratégicos", r: "según reto y especialidad" },
                  ].map((m) => (
                    <div key={m.n} style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", padding: "15px 0", borderTop: "1px solid var(--border-subtle)" }}>
                      <strong style={{ font: "600 16px var(--font-primary)", color: "var(--ink-graphite)" }}>{m.n}</strong>
                      <span style={{ font: "500 11px var(--font-mono)", letterSpacing: ".03em", color: "var(--text-muted)", textAlign: "right" }}>{m.r}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ CTA FINAL (dark) ═══ */}
        <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(96px,12vw,176px) 0", textAlign: "center" }}>
            <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(36px,5vw,76px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Trae una decisión difícil. Sal con una estructura.</Reveal>
            <Reveal delay={100} as="p" style={{ margin: "26px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.6)" }}>La primera conversación no vende una solución: revela qué decisión necesita estructura y qué criterio falta explicitar.</Reveal>
            <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 40 }}>
              <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
              <Link href="/contacto" className="btn btn-dghost">Agendar una lectura</Link>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />

      {/* responsive collapse for home grids */}
      <style>{`
        @media (max-width: 980px) {
          .ch-sechead, .ch-grid3, .ch-ladder, .ch-missionshell, .ch-declist, .ch-teamstrip { grid-template-columns: 1fr !important; }
          .ch-staterow { grid-template-columns: 1fr 1fr !important; }
          .ch-mrow { grid-template-columns: 92px 1fr !important; }
          .ch-mrow > div:last-child { display: none !important; }
        }
        @media (max-width: 768px) {
          .ch-herochain { display: none !important; }
        }
        @media (max-width: 620px) {
          .ch-staterow { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
