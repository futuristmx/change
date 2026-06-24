import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import MissionControlTabs from "@/components/MissionControlTabs";

export const metadata: Metadata = {
  title: "Mission Control",
  description:
    "El criterio no debería morir en una junta. Un sistema vivo que conecta señales, decisiones, proyectos y reportes para que el rumbo se revise, ajuste y sostenga en el tiempo.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

export default function MissionControlPage() {
  return (
    <PageScaffold
      dark
      kicker="Mission Control"
      title="El criterio no debería morir en una junta."
      lead="No es un dashboard más. Es el lugar donde las decisiones que importan siguen vivas: conecta señales, criterios, proyectos y reportes para que el rumbo se revise, ajuste y sostenga en el tiempo."
    >
      {/* ═══ QUÉ ES / QUÉ NO ES ═══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "linear-gradient(180deg,var(--surface-dark-secondary),var(--surface-dark))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>Qué es, qué no es</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>El sistema que evita que la estrategia dependa de tu memoria.</Reveal>
          <div className="mc-vs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Reveal className="ch-card" style={{ border: "1px solid rgba(109,59,255,.32)", background: "var(--gradient-dark-card-violet, linear-gradient(150deg,#1B2034,#141826))", padding: "32px 30px" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: "var(--soft-violet)" }}>Lo que sí es</span>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "La memoria de por qué decidiste lo que decidiste.",
                  "El hilo que conecta una señal con la decisión y el proyecto que la ejecuta.",
                  "El ritual que mantiene el criterio revisable y compartido.",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, font: "400 15.5px/1.5 var(--font-primary)", color: "rgba(255,255,255,.78)" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 8, width: 6, height: 6, borderRadius: "50%", background: "var(--change-violet)" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90} className="ch-card" style={{ border: "1px solid rgba(255,255,255,.1)", background: "var(--gradient-dark-card-slate, linear-gradient(150deg,#181C2C,#121622))", padding: "32px 30px" }}>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: "rgba(255,255,255,.42)" }}>Lo que no es</span>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "No es un software que compras, instalas y usas solo.",
                  "No es otro tablero de métricas que nadie abre.",
                  "No es un reporte que se vuelve viejo el día que se entrega.",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, font: "400 15.5px/1.5 var(--font-primary)", color: "rgba(255,255,255,.6)" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 7, width: 11, height: 1, background: "rgba(255,255,255,.32)" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ DEMO ILUSTRATIVO ═══ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 18%, transparent),transparent 42%),var(--surface-dark)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <div className="mc-demo" style={{ display: "grid", gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)", gap: "clamp(44px,5vw,80px)", alignItems: "center" }}>
            <div>
              <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 22, padding: "6px 12px", border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.04)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal-cyan)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>Demo ilustrativo · datos de ejemplo</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,3.6vw,50px)/1.0 var(--font-primary)", letterSpacing: "-.04em", color: "#fff", textWrap: "balance" }}>Tres vistas. Un solo hilo de criterio.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "46ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.66)" }}>
                Radar de señales, memoria de decisiones y roadmap ejecutivo no son módulos sueltos: comparten la misma cadena. Lo que se ve aquí es un ejemplo — tu Mission Control se arma con tus decisiones reales.
              </Reveal>
            </div>
            <Reveal delay={140}><MissionControlTabs /></Reveal>
          </div>
        </div>
      </section>

      {/* ═══ LA PRUEBA DEL FOSO ═══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "linear-gradient(180deg,var(--surface-dark),var(--surface-dark-secondary))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,150px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>El miedo que resuelve</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>“Si yo no estoy en la sala, el rumbo se diluye.”</Reveal>
          <div className="mc-foso" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { n: "01", h: "La decisión queda escrita.", p: "El contexto, los supuestos y los trade-offs viven fuera de tu cabeza. Nadie tiene que adivinar por qué se eligió ese camino." },
              { n: "02", h: "El equipo decide igual sin ti.", p: "Con el criterio explícito y trazable, las decisiones del día a día se alinean al rumbo aunque tú no estés." },
              { n: "03", h: "El rumbo se revisa, no se reinventa.", p: "Cuando cambia una señal, ajustas desde donde estabas — no vuelves a discutir todo desde cero." },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 110} as="article" className="ch-card" style={{ border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", padding: "30px 28px", display: "flex", flexDirection: "column", minHeight: 220 }}>
                <span style={{ font: "300 clamp(34px,3.2vw,46px)/1 var(--font-secondary)", color: "var(--soft-violet)" }}>{c.n}</span>
                <h3 style={{ margin: "16px 0 0", font: "600 clamp(20px,1.8vw,24px)/1.08 var(--font-primary)", letterSpacing: "-.03em", color: "#fff" }}>{c.h}</h3>
                <p style={{ margin: "13px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "rgba(255,255,255,.62)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA (al Mapa — MC nunca se vende en frío) ═══ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 26%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Mission Control no se vende en frío.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 580, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.6)" }}>Llega cuando ya hay criterio que vale la pena sostener. Empieza por una decisión concreta en el Mapa de Claridad — el sistema se justifica solo cuando lo construido pide no perderse.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/capacidades" className="btn btn-dghost">Ver la escalera completa</Link>
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
