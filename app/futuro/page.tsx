import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import EtherealDivider from "@/components/ds/EtherealDivider";
import { Glyph, type GlyphName } from "@/components/ds";

export const metadata: Metadata = {
  title: "Futuro: la tesis y el concepto de capacidad de futuro",
  description:
    "Por qué existe Change, qué es capacidad de futuro y qué sostiene cada decisión que tomamos. Nuestro propósito, visión, misión y los valores que gobiernan el método.",
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Futuro: la tesis y el concepto de capacidad de futuro" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const VALORES: Array<{ k: string; h: string; p: string; g: GlyphName; c: string }> = [
  {
    k: "01",
    h: "Lectura primero",
    p: "Antes de proponer una respuesta, leemos. La urgencia no es excusa para saltarse el juicio. La velocidad importa, la dirección más.",
    g: "insight",
    c: "var(--signal-cyan)",
  },
  {
    k: "02",
    h: "Tensión sobre certeza",
    p: "Trabajamos donde las decisiones todavía no tienen forma. Nombrar la tensión vale más que prometer certeza falsa.",
    g: "risk",
    c: "var(--soft-violet)",
  },
  {
    k: "03",
    h: "Criterio explícito",
    p: "Toda decisión deja su porqué a la vista — qué se gana, qué se sacrifica y bajo qué condición se revisa. La estrategia no es solo lo que se decide, es por qué se decidió así.",
    g: "decision",
    c: "var(--change-violet)",
  },
  {
    k: "04",
    h: "Instrumentos, no opiniones",
    p: "Cada intervención deja un artefacto — radar, mapa, matriz, roadmap, memoria. Lo que el equipo puede leer, discutir y usar.",
    g: "project",
    c: "var(--change-violet)",
  },
  {
    k: "05",
    h: "Memoria del porqué",
    p: "El aprendizaje queda vivo. La próxima coyuntura no empieza de cero — empieza donde la anterior dejó criterio instalado.",
    g: "status",
    c: "var(--ink-graphite)",
  },
  {
    k: "06",
    h: "Confidencialidad como base",
    p: "Las decisiones que acompañamos casi nunca pueden hacerse públicas. Protegemos el contexto estratégico antes de usarlo como credencial.",
    g: "lock",
    c: "var(--opportunity-orange)",
  },
];

const HORIZONTES = [
  {
    k: "Propósito",
    h: "Transformar la relación de las organizaciones con el futuro.",
    p: "El futuro deja de ser una amenaza que se padece o una apuesta que se adivina. Se vuelve algo que se puede leer, interpretar y trabajar con método — mientras todavía hay margen para decidir. Ese cambio de relación es nuestra razón de existir.",
  },
  {
    k: "Visión",
    h: "El futuro convertido en capacidad instalada, no en servicio contratado.",
    p: "Imaginamos organizaciones que leen señales, interpretan tensiones, deciden con criterio y sostienen el aprendizaje por cuenta propia. Que pueden volver a decidir sin Change en la sala — porque la capacidad quedó operando dentro.",
  },
  {
    k: "Misión",
    h: "Instalar Change OS: el sistema que convierte incertidumbre en capacidad.",
    p: "Operamos el método —leer, interpretar, decidir, diseñar y sostener— como una forma de trabajar que deja prueba: artefactos, reportes vivos y un Mission Control donde el criterio permanece. No entregamos un deck; instalamos rutinas y capacidades que siguen funcionando cuando nos vamos.",
  },
];

export default function FuturoPage() {
  return (
    <PageScaffold
      kicker="Futuro · Tesis Change"
      title={<GradientTitle pre="La capacidad de futuro" accent="es lo que permite decidir cuando la certeza ya no llega a tiempo." accentGradient="var(--gradient-type-dark-warm)" />}
      lead="Por qué existe Change, qué es capacidad de futuro y qué sostiene cada decisión que acompañamos. La tesis, el propósito y los valores que gobiernan el método."
    >
      {/* ═══ TESIS — manifiesto editorial ═══ */}
      <section style={{ background: "var(--gradient-violet-whisper)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div style={{ maxWidth: 880, marginBottom: "clamp(36px,4vw,48px)" }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Tesis</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>
              El futuro se vuelve interpretable, decidible y accionable.
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p style={{ margin: 0, maxWidth: "70ch", font: "400 clamp(17px,1.5vw,21px)/1.6 var(--font-primary)", color: "var(--ink-graphite)" }}>
              La certeza dejó de ser condición para actuar. El entorno se mueve antes de que los números lo registren, las decisiones no pueden esperar y la información casi nunca llega completa. Lo que separa a las organizaciones que reaccionan de las que aprenden a tiempo no es la suerte ni la cantidad de datos — es la capacidad para leer el cambio mientras todavía es señal, interpretar qué tensión revela, decidir con criterio explícito y dejar instalado el porqué de cada decisión.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p style={{ margin: "26px 0 0", maxWidth: "70ch", font: "400 clamp(17px,1.5vw,21px)/1.6 var(--font-primary)", color: "var(--ink-graphite)" }}>
              Trabajamos justo donde la información es incompleta, las tensiones no son evidentes y las decisiones no pueden esperar. Ahí convertimos señales emergentes, comportamiento humano, estrategia, cultura y tecnología en instrumentos que se pueden usar para decidir, actuar y aprender.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <blockquote style={{ margin: "44px 0 0", padding: "clamp(28px,3vw,40px) clamp(24px,3vw,40px)", borderLeft: "3px solid var(--change-violet)", background: "rgba(109,59,255,.05)" }}>
              <p style={{ margin: 0, font: "600 clamp(20px,2.2vw,28px)/1.32 var(--font-primary)", letterSpacing: "-.025em", color: "var(--ink-graphite)" }}>
                Capacidad de futuro es una forma de operar — una habilidad organizacional instalada, no un servicio contratado.
              </p>
              <footer style={{ marginTop: 18, font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>El método se gobierna desde Change · la capacidad se queda en el cliente.</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <EtherealDivider />

      {/* ═══ PROPÓSITO · VISIÓN · MISIÓN ═══ */}
      <section style={{ background: "var(--surface-page)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div style={{ maxWidth: 820, marginBottom: "clamp(48px,6vw,72px)" }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Hacia dónde apunta Change</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Tres horizontes que sostienen cada decisión nuestra.</Reveal>
          </div>

          <div className="fut-horizontes" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {HORIZONTES.map((h, i) => (
              <Reveal key={h.k} delay={i * 110} as="article" className="ch-card" style={{ border: "1px solid var(--border-subtle)", borderTop: "3px solid var(--change-violet)", background: "rgba(255,255,255,.94)", padding: "32px 28px 36px", display: "flex", flexDirection: "column" }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--change-violet)", marginBottom: 14 }}>{h.k}</span>
                <h3 style={{ margin: "0 0 16px", font: "600 clamp(20px,1.8vw,24px)/1.15 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)", textWrap: "balance" }}>{h.h}</h3>
                <p style={{ margin: 0, font: "400 14.5px/1.6 var(--font-primary)", color: "var(--text-muted)", flexGrow: 1 }}>{h.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EtherealDivider />

      {/* ═══ VALORES ═══ */}
      <section style={{ background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div style={{ maxWidth: 820, marginBottom: "clamp(40px,5vw,56px)" }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Valores · Cómo gobierna Change</span>
            </Reveal>
            <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Seis principios que ningún proyecto se salta.</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "22px 0 0", maxWidth: "60ch", font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Aplican al primer correo, a la primera lectura del board y a la última versión del artefacto. La capacidad se construye con disciplina; el método no se delega.</Reveal>
          </div>

          <div className="fut-valores" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {VALORES.map((v, i) => (
              <Reveal key={v.k} delay={(i % 3) * 90} as="article" className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.92)", padding: "28px 26px 30px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <span aria-hidden="true" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: 38, height: 38, borderRadius: "50%", background: "var(--surface-card)", border: `1.5px solid ${v.c}`, color: v.c }}>
                    <Glyph name={v.g} size={18} />
                  </span>
                  <span style={{ font: "300 clamp(22px,2vw,28px)/1 var(--font-accent)", letterSpacing: "-.02em", color: v.c }}>{v.k}</span>
                </div>
                <h3 style={{ margin: "0 0 10px", font: "600 17px/1.18 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{v.h}</h3>
                <p style={{ margin: 0, font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{v.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{ height: "clamp(80px,8vw,120px)", background: "linear-gradient(180deg, var(--gradient-sky-pearl) 0%, var(--surface-dark-secondary) 100%)" }} />

      {/* ═══ CTA dark ═══ */}
      <section className="change-dark" style={{ position: "relative", overflow: "hidden", background: "var(--gradient-violet-atmosphere), var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "22ch", font: "600 clamp(32px,5vw,68px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>
            La capacidad de futuro empieza con una decisión real.
          </Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 600, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>
            No hace falta tener clara la pregunta. Trae la decisión que más te pesa y la trabajamos juntos. Desde ahí construimos la capacidad para volver a hacerlo sin Change en la sala.
          </Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Simular una decisión</Link>
            <Link href="/capacidades" className="btn btn-dghost">Conocer el método</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .fut-horizontes, .fut-valores { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          .fut-valores { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
