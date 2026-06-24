import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Método",
  description:
    "No compras una capacidad suelta. Entras a una cadena que escala contigo: Anticipar, Decidir, Diseñar y Sostener. Cuatro capacidades conectadas que vuelven el criterio un sistema vivo.",
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
        <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(32px,4.4vw,62px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>{title}</Reveal>
      </div>
      <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{lead}</Reveal>
    </div>
  );
}

const CAPS = [
  {
    n: "01",
    name: "Anticipar",
    c: "var(--signal-cyan)",
    q: "¿Qué está cambiando — y qué decisión te exige?",
    p: "Leemos señales del entorno antes de que se vuelvan urgentes y las convertimos en escenarios que se pueden discutir. No es tendencia decorativa: es ver la decisión que viene mientras todavía hay margen.",
    art: "Radar de señales · Escenarios",
  },
  {
    n: "02",
    name: "Decidir",
    c: "var(--change-violet)",
    q: "¿Qué debe pesar más cuando decides?",
    p: "Hacemos explícito el criterio que ya vive en tu cabeza: supuestos, trade-offs y lo que se gana o se sacrifica en cada ruta. El juicio deja de ser intuición privada y se vuelve algo que el equipo puede usar.",
    art: "Matriz de decisión · Criterios comparables",
  },
  {
    n: "03",
    name: "Diseñar",
    c: "var(--change-violet)",
    q: "¿Cómo lo vuelvo real sin fingir certeza?",
    p: "Convertimos la decisión en un primer movimiento concreto y una ruta que tolera lo que aún no sabes. No un plan rígido a tres años: el siguiente paso que permite avanzar y corregir.",
    art: "Roadmap de rumbo · Backcasting",
  },
  {
    n: "04",
    name: "Sostener",
    c: "var(--ink-graphite)",
    q: "¿Cómo evito que el criterio se diluya cuando no estoy?",
    p: "Instalamos el sistema y el ritual que mantienen viva la decisión: por qué se tomó, qué la cambiaría, quién la sostiene. Es la capa que ninguna consultoría tradicional entrega — y la que evita que todo dependa de una sola cabeza.",
    art: "Mission Control · Memoria de decisiones",
  },
];

const LADDER = [
  {
    step: "Peldaño 01",
    name: "Mapa de Claridad",
    tag: "Ver la brecha",
    c: "var(--ink-graphite)",
    p: "Una lectura estratégica para sacar una decisión atorada de la cabeza directiva y nombrar el criterio que debe gobernarla.",
    feel: "“Ahora veo cuál es el problema real.”",
    commit: "Sesión · bajo compromiso",
  },
  {
    step: "Peldaño 02",
    name: "Sprint de Rumbo",
    tag: "Cerrar la brecha",
    c: "var(--soft-violet)",
    p: "Un proyecto acotado que convierte la claridad en opciones, criterios comparables, trade-offs y los primeros proyectos.",
    feel: "“Ya tengo criterio para avanzar.”",
    commit: "Proyecto acotado",
  },
  {
    step: "Peldaño 03",
    name: "Mission Control",
    tag: "No soltarla nunca",
    c: "var(--change-violet)",
    p: "Un sistema vivo que sostiene trazabilidad, reportes y seguimiento ejecutivo para que el rumbo se revise y ajuste con el tiempo.",
    feel: "“El criterio no se diluye.”",
    commit: "Sistema recurrente",
  },
];

export default function CapacidadesPage() {
  return (
    <PageScaffold
      kicker="Método · Capacidades"
      title="No compras una capacidad suelta. Entras a una cadena que escala contigo."
      lead="Anticipar, decidir, diseñar y sostener: cuatro capacidades conectadas que convierten el criterio en un sistema vivo. No es un menú de servicios — es un arco que empieza donde más te duele hoy."
    >
      {/* ═══ LAS 4 CAPACIDADES (arco) ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head
            kicker="El arco completo"
            title="Cuatro capacidades. Una sola cadena de criterio."
            lead="Cada capacidad responde una pregunta y deja un artefacto. Entras por la que te aprieta hoy; el resto te espera cuando lo necesites."
          />
          <div className="cap-arc" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {CAPS.map((cap, i) => (
              <Reveal key={cap.n} delay={i * 100} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: "32px 28px 30px", display: "flex", flexDirection: "column", minHeight: 360 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                  <span style={{ font: "300 clamp(34px,3.4vw,48px)/1 var(--font-secondary)", color: cap.c }}>{cap.n}</span>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: cap.c }} />
                </div>
                <h3 style={{ margin: 0, font: "600 24px var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{cap.name}</h3>
                <p style={{ margin: "12px 0 0", font: "500 15px/1.4 var(--font-primary)", color: "var(--deep-warm-gray)" }}>{cap.q}</p>
                <p style={{ margin: "14px 0 0", font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{cap.p}</p>
                <span style={{ marginTop: "auto", paddingTop: 22, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{cap.art}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} as="p" style={{ margin: "40px 0 0", maxWidth: "66ch", font: "400 clamp(15px,1.2vw,17px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
            La cadena se lee de izquierda a derecha, pero nadie la compra completa de golpe. Lo normal es entrar por una decisión concreta y dejar que el criterio construido pida el siguiente peldaño.
          </Reveal>
        </div>
      </section>

      {/* ═══ LA ESCALERA (hogar canónico) ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,#FAFAF8)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Head
            kicker="La escalera"
            title="Empieza por una decisión. Escala cuando el criterio ya existe."
            lead="No vendemos un gran proyecto de entrada. Vendemos claridad sobre una decisión difícil — y dejamos que esa claridad jale el siguiente paso."
          />
          <div className="cap-ladder" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {LADDER.map((rung, i) => (
              <Reveal key={rung.name} delay={i * 120} as="article" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.85)", padding: "34px 30px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, background: rung.c }} />
                  <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)" }}>{rung.step}</span>
                </div>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: rung.c }}>{rung.tag}</span>
                <h3 style={{ margin: "12px 0 0", font: "600 clamp(24px,2.1vw,30px)/1.02 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{rung.name}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{rung.p}</p>
                <p style={{ margin: "20px 0 0", font: "400 italic 16px/1.45 var(--font-primary)", color: "var(--deep-warm-gray)" }}>{rung.feel}</p>
                <span style={{ marginTop: "auto", paddingTop: 22, borderTop: "1px solid var(--border-subtle)", marginBlockStart: 24, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{rung.commit}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140} as="p" style={{ margin: "40px 0 0", maxWidth: "62ch", font: "400 clamp(15px,1.2vw,17px)/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
            La escalera se jala, no se empuja. El Mapa abre la brecha sin cerrarla; el Sprint entrega criterio y muestra su fragilidad; Mission Control protege lo que ya construiste.
          </Reveal>
        </div>
      </section>

      {/* ═══ MÉTODOS COMO INSTRUMENTOS ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="cap-instr" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,440px)", gap: "clamp(44px,5vw,80px)", alignItems: "start" }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Métodos como instrumentos</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>No facilitamos talleres. Construimos instrumentos de decisión.</Reveal>
              <Reveal delay={120} as="p" style={{ margin: "24px 0 0", maxWidth: "52ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
                Foresight, planeación, diseño de servicio y narrativa no son productos sueltos en un catálogo. Son herramientas que elegimos según la decisión — y cada una deja algo que tu organización puede seguir usando sin nosotros.
              </Reveal>
            </div>
            <Reveal delay={120} as="aside" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.85)", padding: "30px 28px" }}>
              {[
                ["Cada método deja un artefacto", "No un deck que muere: un instrumento operable."],
                ["El criterio queda explícito", "Lo que decidiste y por qué, disponible para el equipo."],
                ["La decisión queda nombrada", "La prueba no es estética; es capacidad instalada."],
              ].map(([h, p], i) => (
                <div key={h} style={{ padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
                  <strong style={{ display: "block", font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{h}</strong>
                  <span style={{ display: "block", marginTop: 6, font: "400 14px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{p}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA al Mapa ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>El arco empieza por una sola decisión.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.6)" }}>Trae la que traes atorada. Empezamos por el Mapa de Claridad y desde ahí decidimos hasta dónde escalar.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/mission-control" className="btn btn-dghost">Ver cómo se sostiene</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .cap-head, .cap-instr { grid-template-columns: 1fr !important; }
          .cap-arc { grid-template-columns: 1fr 1fr !important; }
          .cap-ladder { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          .cap-arc { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
