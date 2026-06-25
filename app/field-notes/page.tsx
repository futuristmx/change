import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Field Notes: señales que exigen una decisión",
  description:
    "Lo que estamos viendo cambiar. Señales, lecturas y preguntas desde el cruce entre estrategia y futuros. Cada nota cierra en una implicación para decidir.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const CONTRATO = [
  { n: "01", h: "Pregunta profunda", p: "Una tensión real, no un titular de tendencia." },
  { n: "02", h: "Lectura sistémica", p: "Qué hay debajo del síntoma: fuerzas, no anécdotas." },
  { n: "03", h: "Implicación estratégica", p: "Qué cambia para quien tiene que decidir." },
  { n: "04", h: "Decisión accionable", p: "El por lo tanto: qué harías distinto el lunes." },
];

const TIPOS = [
  {
    k: "Señales",
    c: "var(--signal-cyan)",
    h: "Lo que está cambiando — y qué decisión exige.",
    p: "Lecturas de cambios relevantes del entorno mexicano y latinoamericano, antes de que se vuelvan urgentes. Cada señal llega atada a la decisión que dispara.",
  },
  {
    k: "Las preguntas de Change",
    c: "var(--change-violet)",
    h: "Las preguntas que un buen criterio se hace primero.",
    p: "Una biblioteca de preguntas estratégicas para usar en tu propia mesa. No respuestas empacadas: las preguntas que ordenan una conversación difícil.",
  },
  {
    k: "Lecturas",
    c: "var(--opportunity-orange)",
    h: "Cómo leemos un cambio complejo en voz alta.",
    p: "Notas de campo donde mostramos el razonamiento, no solo la conclusión. La forma en que pensamos una decisión, abierta para que la juzgues.",
  },
];

export default function FieldNotesPage() {
  return (
    <PageScaffold
      kicker="Field Notes"
      title="Lo que estamos viendo cambiar."
      lead="Señales, lecturas y preguntas desde el cruce entre estrategia y futuros. No publicamos ruido: cada nota cierra en una implicación para decidir."
    >
      {/* ═══ EL CONTRATO ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="fn-head" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: 60, alignItems: "end", marginBottom: 60 }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>El contrato de cada nota</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Si no termina en una decisión, no se publica.</Reveal>
            </div>
            <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>
              Es la diferencia entre un foresight que muere en el reporte y uno que mueve una decisión. Cada nota recorre cuatro pasos, siempre, o no sale.
            </Reveal>
          </div>
          <div className="fn-contract" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {CONTRATO.map((c, i) => (
              <Reveal key={c.n} delay={i * 90} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: "28px 24px 30px", minHeight: 196, display: "flex", flexDirection: "column" }}>
                <span style={{ font: "300 clamp(30px,3vw,42px)/1 var(--font-secondary)", color: i === CONTRATO.length - 1 ? "var(--change-violet)" : "var(--soft-violet)" }}>{c.n}</span>
                <h3 style={{ margin: "16px 0 0", font: "600 18px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "10px 0 0", font: "400 14px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUÉ VAS A ENCONTRAR ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Qué vas a encontrar</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,60px)", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Tres formas de pensar en voz alta.</Reveal>
          <div className="fn-types" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {TIPOS.map((t, i) => (
              <Reveal key={t.k} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: 34, display: "flex", flexDirection: "column", minHeight: 250 }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".13em", textTransform: "uppercase", color: t.c }}>{t.k}</span>
                <h3 style={{ margin: "14px 0 0", font: "600 clamp(21px,1.9vw,26px)/1.08 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{t.h}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CADENCIA / CIERRE ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,140px) 0" }}>
          <Reveal className="ch-card" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.7)", padding: "clamp(40px,6vw,72px)", textAlign: "center" }}>
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--change-violet)" }}>Cadencia comprometida</span>
            <h2 style={{ margin: "16px auto 0", maxWidth: "26ch", font: "600 clamp(26px,3.2vw,44px)/1.06 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>Pocas notas. Pero las que llegan, valen la pena.</h2>
            <p style={{ margin: "16px auto 32px", maxWidth: "50ch", font: "400 16px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
              Preferimos una señal al mes que sostenemos en serio, antes que un feed que se apaga en marzo. El archivo abre con una cadencia que podemos cumplir — mientras tanto, la mejor lectura es una conversación sobre la decisión que traes.
            </p>
            <Link href="/contacto" className="btn btn-primary">Trabajar una decisión</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .fn-head, .fn-types { grid-template-columns: 1fr !important; }
          .fn-contract { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .fn-contract { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
