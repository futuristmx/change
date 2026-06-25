import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import MissionControlLive from "@/components/MissionControlLive";

export const metadata: Metadata = {
  title: "Mission Control: donde la capacidad de futuro se sostiene",
  description:
    "No es un tablero de métricas. Es memoria estratégica: la infraestructura de continuidad donde señales, decisiones y rumbo se mantienen vivos en lugar de perderse entre juntas.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const TENSIONES = [
  { k: "Reinvención del rumbo", t: "tensión 01", p: "Cada trimestre el equipo vuelve a discutir lo que ya se había decidido, porque nadie recuerda con qué razón se cerró la conversación anterior." },
  { k: "Pérdida de memoria", t: "tensión 02", p: "El porqué de una decisión clave vive en la cabeza de una persona o en un correo que nadie encuentra. Cuando esa persona no está, el porqué desaparece." },
  { k: "Decisiones aisladas", t: "tensión 03", p: "Una señal del entorno, una decisión de inversión y una entrega del roadmap ocurren en mundos separados, sin que nadie vea cómo una afecta a la otra." },
];

const ESCALERA = [
  { n: "Mapa de Claridad", tag: "empieza aquí", p: "El punto de entrada. Una decisión, leída e interpretada hasta volverse accionable." },
  { n: "Sprint de Rumbo", tag: "después", p: "Un reto acotado, trabajado de principio a fin con los instrumentos del método." },
  { n: "Mission Control", tag: "el sistema vivo", p: "El sistema vivo que sostiene el rumbo en el tiempo. Llega cuando hay capacidad que sostener." },
];

export default function MissionControlPage() {
  return (
    <PageScaffold
      dark
      kicker="Mission Control"
      title="Donde la capacidad de futuro se sostiene."
      lead="Las señales se interpretan, las decisiones se toman, los rumbos se diseñan. Mission Control es donde todo eso permanece vivo en lugar de perderse entre juntas."
    >
      {/* ═══ QUÉ ES / QUÉ NO ES ═══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "linear-gradient(180deg,var(--surface-dark-secondary),var(--surface-dark))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Qué es, qué no es</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 8px", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>No es un tablero de métricas. Es memoria estratégica.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "60ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Un tablero de métricas muestra números y mira hacia atrás. Mission Control sostiene el porqué: por qué se decidió lo que se decidió, qué cambió desde entonces y hacia dónde apunta el rumbo.</Reveal>
          <div className="mc-vs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Reveal className="ch-card" style={{ border: "1px solid rgba(255,255,255,.1)", background: "var(--gradient-dark-card-slate)", padding: "32px 30px" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Lo que evitamos</span>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Un tablero que mira solo hacia atrás.",
                  "Una herramienta más que el equipo aprende a ignorar.",
                  "Un repositorio donde las decisiones se guardan y se olvidan.",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, font: "400 15.5px/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 7, width: 11, height: 1, background: "rgba(255,255,255,.34)" }} />{t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90} className="ch-card" style={{ border: "1px solid rgba(109,59,255,.32)", background: "var(--gradient-dark-card-violet)", padding: "32px 30px" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: "var(--change-violet-300)" }}>Lo que construimos</span>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "La infraestructura de continuidad de tu capacidad de futuro.",
                  "El lugar donde señales, decisiones y rumbo dejan de vivir separados y empiezan a hablar entre sí.",
                  "La memoria que mantiene vivo el porqué cuando cambia el contexto.",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, font: "400 15.5px/1.5 var(--font-primary)", color: "rgba(255,255,255,.82)" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 8, width: 6, height: 6, borderRadius: "50%", background: "var(--change-violet)" }} />{t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ EL PROBLEMA QUE RESUELVE ═══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "var(--surface-dark)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>El problema que resuelve</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 18px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>El criterio no debería morir en una junta.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "58ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Sin un lugar donde sostenerse, la inteligencia estratégica se evapora. Mission Control existe para que el trabajo de leer, interpretar y decidir no se repita desde cero cada vez.</Reveal>
          <div className="mc-foso" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {TENSIONES.map((c, i) => (
              <Reveal key={c.k} delay={i * 110} as="article" className="ch-card" style={{ border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", padding: "30px 28px", display: "flex", flexDirection: "column", minHeight: 230 }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--change-violet-300)" }}>{c.t}</span>
                <h3 style={{ margin: "14px 0 0", font: "600 clamp(20px,1.8vw,24px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "#fff" }}>{c.k}</h3>
                <p style={{ margin: "13px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRES PLANOS + DEMO ═══ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 18%, transparent),transparent 42%),var(--surface-dark)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <div className="mc-demo" style={{ display: "grid", gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
            <div>
              <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 22, padding: "6px 12px", border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.04)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>Tres planos de una decisión · datos de ejemplo</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,3.6vw,50px)/1.0 var(--font-primary)", letterSpacing: "-.04em", color: "#fff", textWrap: "balance" }}>Señales, decisiones y rumbo, leídos juntos.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "46ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Mission Control conecta lo que normalmente vive disperso. El radar de señales, la memoria de decisiones y el roadmap ejecutivo se leen juntos y se sostienen con rituales de seguimiento. Lo que ves aquí es un ejemplo: los datos son ficticios y existen solo para mostrar la estructura.</Reveal>
            </div>
            <Reveal delay={140}><MissionControlLive /></Reveal>
          </div>
        </div>
      </section>

      {/* ═══ EL ÚLTIMO ESCALÓN ═══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "linear-gradient(180deg,var(--surface-dark),var(--surface-dark-secondary))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>El último escalón</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Mission Control no se instala. Se gana.</Reveal>
          <div className="mc-foso" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {ESCALERA.map((r, i) => (
              <Reveal key={r.n} delay={i * 110} as="article" className="ch-card" style={{ border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", padding: "30px 28px", display: "flex", flexDirection: "column", minHeight: 180 }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: i === ESCALERA.length - 1 ? "var(--change-violet-300)" : "rgba(255,255,255,.8)" }}>{r.tag}</span>
                <h3 style={{ margin: "14px 0 0", font: "600 clamp(20px,1.8vw,25px)/1.06 var(--font-primary)", letterSpacing: "-.03em", color: "#fff" }}>{r.n}</h3>
                <p style={{ margin: "12px 0 0", font: "400 14px/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{r.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 26%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Empieza por la decisión, no por el sistema.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 580, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Tráenos una decisión que tu organización tenga que tomar bajo ambigüedad. La trabajamos juntos y, si hay capacidad que sostener, Mission Control llega después.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/capacidades" className="btn btn-dghost">Ver el método</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .mc-vs, .mc-demo, .mc-foso { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
