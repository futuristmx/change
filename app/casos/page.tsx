import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Decisiones que sobreviven a la operación",
  description:
    "No hacemos proyectos. Habilitamos decisiones que sobreviven a la operación: expansión, sucesión, portafolio y riesgo, trabajados con estructura.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const DECISIONES = [
  {
    k: "Expansión",
    c: "var(--opportunity-orange)",
    q: "¿Dónde crecer sin diluir lo que nos hizo buenos?",
    tension: "Velocidad, capacidad operativa y marca empujando en direcciones distintas mientras la oportunidad no espera.",
    flow: [
      ["Señal", "El mercado se mueve antes de que la estructura esté lista."],
      ["Criterio", "Qué define un buen crecimiento para esta empresa en particular."],
      ["Sistema", "La regla de expansión queda escrita y se revisa con cada nueva apertura."],
    ],
  },
  {
    k: "Sucesión",
    c: "var(--human-pink)",
    q: "¿Cómo transfiero el criterio sin perder el control?",
    tension: "Decisiones que dependían de una sola lectura — y que ahora tienen que escalar a una generación o un equipo nuevo.",
    flow: [
      ["Señal", "La empresa depende de una cabeza que no estará para siempre."],
      ["Criterio", "Lo que esa cabeza sabe se vuelve explícito y enseñable."],
      ["Sistema", "El criterio se sostiene aunque cambien las personas en la silla."],
    ],
  },
  {
    k: "Portafolio",
    c: "var(--signal-cyan)",
    q: "¿Qué apuestas merecen recursos cuando no alcanza para todo?",
    tension: "Más iniciativas que presupuesto, sin una forma comparable de decidir cuál financiar y cuál soltar.",
    flow: [
      ["Señal", "Cada área defiende su proyecto con su propia lógica."],
      ["Criterio", "Una matriz común vuelve comparables apuestas que no lo parecían."],
      ["Sistema", "La priorización se repite con disciplina cada ciclo, no por pelea."],
    ],
  },
  {
    k: "Riesgo",
    c: "var(--warning)",
    q: "¿Qué se rompe primero cuando llega la presión?",
    tension: "Vulnerabilidades que solo se ven cuando ya son urgencia, sin una lectura anticipada del escenario.",
    flow: [
      ["Señal", "Hay tensiones acumulándose que nadie está mirando junto."],
      ["Criterio", "Qué escenarios importan y qué dispararía una respuesta."],
      ["Sistema", "La organización ve venir el golpe con margen para responder."],
    ],
  },
];

export default function CasosPage() {
  return (
    <PageScaffold
      kicker="Decisiones habilitadas"
      title="No hacemos proyectos. Habilitamos decisiones que sobreviven a la operación."
      lead="La evidencia de Change no es estética: es capacidad directiva instalada. Estas son las clases de decisión que trabajamos con estructura — la prueba no es un logo, es una decisión que sigue de pie meses después."
    >
      {/* ═══ CÓMO LEER ESTA PÁGINA ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(72px,9vw,128px) 0" }}>
          <div className="cs-intro" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: "clamp(40px,5vw,72px)", alignItems: "center" }}>
            <Reveal as="p" style={{ margin: 0, font: "400 clamp(19px,1.9vw,28px)/1.4 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>
              Cada decisión recorre la misma cadena: una <strong style={{ color: "var(--change-violet)" }}>señal</strong> que se vuelve <strong style={{ color: "var(--change-violet)" }}>criterio</strong>, y un criterio que se vuelve <strong style={{ color: "var(--change-violet)" }}>sistema</strong>.
            </Reveal>
            <Reveal delay={100} as="p" style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
              Los ejemplos se presentan por tipo de decisión y sector, sin datos confidenciales. Lo que importa no es el nombre del cliente: es la estructura que quedó instalada.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ LAS DECISIONES ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="cs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {DECISIONES.map((d, i) => (
              <Reveal key={d.k} delay={i * 90} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: "36px 34px", display: "flex", flexDirection: "column" }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: d.c }}>{d.k}</span>
                <h3 style={{ margin: "14px 0 0", font: "600 clamp(22px,2.1vw,30px)/1.04 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{d.q}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{d.tension}</p>
                <div style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 14 }}>
                  {d.flow.map(([label, text], j) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 14, alignItems: "baseline" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: j === d.flow.length - 1 ? d.c : "var(--text-faint)" }}>
                        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: j === d.flow.length - 1 ? d.c : "var(--soft-violet)" }} />
                        {label}
                      </span>
                      <span style={{ font: "400 14px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--border-subtle)", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>¿Cuál de estas decisiones se parece a la tuya?</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>No tienes que encajar en una categoría. Trae la tensión real y la trabajamos con estructura desde la primera conversación.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/mission-control" className="btn btn-dghost">Ver cómo se sostiene</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .cs-intro, .cs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
