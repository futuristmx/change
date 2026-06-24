import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Change no es una voz individual. Es una mesa de criterio: estrategia, foresight, diseño, tecnología, operación y narrativa, conectadas según el reto.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const MESA = [
  {
    initials: "AV",
    name: "Andrés Valencia",
    role: "Futuros · Estrategia · Narrativa",
    c: "var(--change-violet)",
    p: "Lee las señales del entorno y las convierte en criterio. Sostiene la lectura de largo plazo y la traduce a la decisión que tienes enfrente — sin perder ni el rigor ni la calma.",
  },
  {
    initials: "MC",
    name: "Miguel Cadena",
    role: "Negocio · Dirección · Crecimiento",
    c: "var(--opportunity-orange)",
    p: "Aterriza la estrategia en términos de negocio: crecimiento, capacidad operativa y la realidad de dirigir una empresa que ya está en marcha. La claridad que no mueve el negocio no sirve.",
  },
  {
    initials: "EF",
    name: "Eric O. Fuentes",
    role: "Diseño · Sistema · Ejecución",
    c: "var(--signal-cyan)",
    p: "Convierte el criterio en sistema. Lo que se decide se vuelve algo que se puede ver, operar y sostener — no un documento que se archiva, sino un instrumento que la organización usa.",
  },
  {
    initials: "+",
    name: "Partners estratégicos",
    role: "Según reto y especialidad",
    c: "var(--soft-stone-gray)",
    p: "Especialistas que se suman cuando el reto lo pide. La mesa base se mantiene senior y enfocada; la profundidad técnica entra por proyecto, sin inflar la estructura.",
  },
];

export default function EquipoPage() {
  return (
    <PageScaffold
      kicker="Equipo"
      title="Quién va a pensar contigo."
      lead="Change no es una voz individual ni una firma sin rostro. Es una mesa de criterio: estrategia, foresight, diseño, negocio y narrativa, conectadas según el reto. Una mesa senior, no una fábrica de entregables."
    >
      {/* ═══ POR QUÉ IMPORTA QUIÉN PIENSA CONTIGO ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="eq-intro" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: "clamp(44px,5vw,80px)", alignItems: "end" }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Por qué importa</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Una decisión difícil no se la confías a un logo.</Reveal>
            </div>
            <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
              En las empresas que acompañamos, el criterio se le compra a personas con nombre y trayectoria — no a una marca. Por eso la mesa está antes que la metodología.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ LA MESA ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,#FAFAF8)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>La mesa de criterio</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Cada reto activa la combinación que necesita.</Reveal>
          <div className="eq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {MESA.map((m, i) => (
              <Reveal key={m.name} delay={i * 90} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: "32px 30px", display: "flex", gap: 22, alignItems: "flex-start" }}>
                <div aria-hidden="true" style={{ flexShrink: 0, width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border-subtle)", background: "color-mix(in srgb, var(--change-violet) 5%, #fff)", font: "600 19px var(--font-mono)", letterSpacing: ".02em", color: m.c }}>
                  {m.initials}
                </div>
                <div>
                  <h3 style={{ margin: 0, font: "600 21px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{m.name}</h3>
                  <span style={{ display: "block", marginTop: 6, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: m.c }}>{m.role}</span>
                  <p style={{ margin: "14px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{m.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CÓMO TRABAJA LA MESA ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cómo trabajamos</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Senior en la mesa. Acotados en el alcance.</Reveal>
          <div className="eq-princ" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { h: "Hablas con quien decide.", p: "Quien piensa tu reto es quien se sienta contigo. No hay capa de cuentas entre el criterio y tú." },
              { h: "Entramos por el reto, no por el catálogo.", p: "La combinación de la mesa se arma según la decisión. No vendemos horas: instalamos criterio." },
              { h: "Dejamos capacidad, no dependencia.", p: "El objetivo es que tu organización sostenga el rumbo — incluso cuando no estamos en la sala." },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 32, minHeight: 210, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: 0, font: "600 clamp(21px,1.9vw,26px)/1.06 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "16px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "18ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Conoce a la mesa con una decisión real.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 560, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.6)" }}>La mejor forma de saber si pensamos como tú necesitas es trabajar juntos una decisión que traigas atorada.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/capacidades" className="btn btn-dghost">Ver el método</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .eq-intro, .eq-grid, .eq-princ { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
