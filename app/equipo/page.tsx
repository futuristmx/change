import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "El board senior que construye capacidad de futuro",
  description:
    "Interpretar el cambio, decidir bajo ambigüedad y sostener el rumbo no caben en una sola cabeza. Change reúne las formas de pensar que una decisión difícil necesita al mismo tiempo.",
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "El board senior que construye capacidad de futuro" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const SOCIOS = [
  {
    n: "Andrés Valencia",
    arc: "Leer · Interpretar",
    disc: "Radar de señales · Mapa de tensiones",
    c: "var(--signal-cyan)",
    p: "Convierte señales dispersas en lectura estratégica. Ve qué está cambiando en el entorno antes de que se vuelva urgente y nombra la tensión que la organización todavía no puede articular.",
    cred: [
      "Experto generalista en foresight estratégico e innovación",
      "Maestría en Business Innovation",
      "Ex-miembro del board directivo de The Design Futures Initiative",
      "Ex-presidente del Consejo Promotor de Innovación y Diseño de México",
      "Miembro de la red latinoamericana de políticas públicas y diseño",
    ],
  },
  {
    n: "Miguel Cadena",
    arc: "Decidir · Aterrizar",
    disc: "Matriz de decisión · Reporte ejecutivo",
    c: "var(--change-violet)",
    p: "Convierte la lectura en apuestas con costos explícitos y crecimiento sostenible. Define qué se protege, qué se sacrifica y cómo el criterio se defiende ante el board o la dirección.",
    cred: [
      "Experto generalista en propiedad intelectual e innovación estratégica",
      "Estratega en innovación de modelos de negocio y monetización",
      "Consultor de empresas transnacionales en estrategias basadas en activos intangibles",
      "Profesor invitado en licenciatura y posgrado en diversas universidades",
    ],
  },
];

const RED = {
  arc: "Profundidad por reto",
  disc: "Dominio específico",
  c: "var(--soft-stone-gray)",
  p: "Entra cuando el reto lo exige — cultura organizacional, tecnología, finanzas, operación. Sin diluir el método. El board crece por la pregunta, no por el organigrama.",
};

const ESCALERA = [
  { n: "Mapa de Claridad", tag: "Entrada", c: "var(--ink-graphite)", p: "Una primera lectura de la decisión y sus tensiones. El punto donde se ve si vale la pena ir más a fondo." },
  { n: "Sprint de Rumbo", tag: "Acotado", c: "var(--soft-violet)", p: "Un tramo de trabajo con alcance definido para llevar una decisión de la lectura al diseño, con artefactos al final." },
  { n: "Mission Control", tag: "Sistema vivo", c: "var(--change-violet)", p: "La infraestructura que sostiene el aprendizaje en el tiempo. Llega cuando ya hay una relación de trabajo, nunca en frío." },
];

export default function EquipoPage() {
  return (
    <PageScaffold
      kicker="Board"
      title={<GradientTitle pre="La capacidad de futuro se construye" accent="con un board senior." accentGradient="var(--gradient-type-dark-graphite)" />}
      lead="Interpretar el cambio, decidir bajo ambigüedad y sostener el rumbo no caben en una sola cabeza. Change reúne las formas de pensar que una decisión difícil necesita al mismo tiempo."
    >
      {/* ═══ POR QUÉ UNA MESA ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="eq-intro" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: "clamp(44px,5vw,80px)", alignItems: "end" }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Por qué un board</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>El rumbo no debería depender de una sola cabeza.</Reveal>
            </div>
            <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
              La incertidumbre no se resuelve con más opinión, sino con formas de pensar que se corrigen entre sí. Cada perfil cubre una parte del arco de una decisión: leer la señal, interpretar lo que significa, decidir qué importa, diseñar la respuesta y sostener el aprendizaje.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ LA MESA ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Socios fundadores</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>El board sostiene el criterio. La red aporta profundidad cuando el reto lo exige.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "56ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>No repartimos un proyecto en tareas. Repartimos una decisión en capacidades. Cada capacidad deja un artefacto que puedes ver. El método no se delega: se gobierna desde Change.</Reveal>
          {/* Socios fundadores — perfil con trayectoria real */}
          <div className="eq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {SOCIOS.map((m, i) => (
              <Reveal key={m.n} delay={(i % 2) * 90} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", borderTop: `3px solid ${m.c}`, padding: "clamp(30px,3vw,40px) clamp(28px,2.6vw,36px)", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "700 11px var(--font-secondary)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: m.c }} />{m.arc}
                </span>
                <h3 style={{ margin: "14px 0 4px", font: "600 clamp(22px,2vw,26px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{m.n}</h3>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)" }}>{m.disc}</span>
                <p style={{ margin: "16px 0 22px", font: "400 14.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{m.p}</p>
                <div style={{ marginTop: "auto", paddingTop: 22, borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{ display: "block", font: "700 10px var(--font-secondary)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 14 }}>Trayectoria</span>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {m.cred.map((cr) => (
                      <li key={cr} style={{ display: "flex", gap: 11, font: "400 13.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>
                        <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 8, width: 5, height: 5, borderRadius: "50%", background: m.c }} />
                        <span>{cr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Red de especialistas — capa extensible, no es socio nombrado */}
          <Reveal delay={120} as="article" className="ch-card eq-red" style={{ marginTop: 20, background: "rgba(255,255,255,.7)", border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${RED.c}`, padding: "clamp(28px,3vw,38px) clamp(28px,2.6vw,40px)", display: "grid", gridTemplateColumns: "minmax(0,260px) minmax(0,1fr)", gap: "clamp(20px,4vw,56px)", alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "700 11px var(--font-secondary)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: RED.c }} />{RED.arc}
              </span>
              <h3 style={{ margin: "14px 0 4px", font: "600 clamp(20px,1.9vw,24px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>Red de especialistas</h3>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)" }}>{RED.disc}</span>
            </div>
            <p style={{ margin: 0, font: "400 clamp(15px,1.3vw,17px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{RED.p}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CÓMO ENTRAMOS ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cómo entramos</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>El trabajo empieza por una decisión, no por un retainer.</Reveal>
          <div className="eq-ladder" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {ESCALERA.map((r, i) => (
              <Reveal key={r.n} delay={i * 120} as="article" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.85)", padding: "32px 30px", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: r.c }} />{r.tag}
                </span>
                <h3 style={{ margin: "12px 0 0", font: "600 clamp(21px,1.9vw,26px)/1.04 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{r.n}</h3>
                <p style={{ margin: "13px 0 0", font: "400 14.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{r.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Trae la decisión que más te pesa hoy.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>No necesitas tener claro el problema ni el camino. Eso es justo lo que el board hace contigo.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Simular una decisión</Link>
            <Link href="/capacidades" className="btn btn-dghost">Ver el método</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .eq-intro, .eq-grid, .eq-ladder { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 720px) {
          .eq-red { grid-template-columns: 1fr !important; gap: 18px !important; align-items: start !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
