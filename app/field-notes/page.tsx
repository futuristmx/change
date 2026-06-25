import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Field Notes: lecturas para decidir antes que la urgencia",
  description:
    "Notas breves sobre lo que está cambiando y lo que ese cambio te obliga a decidir. No comentamos la noticia: la convertimos en una decisión que tu organización todavía puede tomar a tiempo.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const CONTRATO = [
  { v: "Leer", h: "Señal", p: "Lo que cambió y dónde lo vimos. Un hecho concreto, fechado y rastreable, no una impresión.", c: "var(--signal-cyan)" },
  { v: "Interpretar", h: "Tensión sistémica", p: "Qué fuerzas se mueven en sentido contrario debajo de esa señal. El conflicto de fondo que la señal apenas asoma.", c: "var(--soft-violet)" },
  { v: "Decidir", h: "Pregunta estratégica", p: "La pregunta que tu organización tendría que poder responder si esa tensión la alcanza. El nombre exacto del problema, antes de que sea problema.", c: "var(--change-violet)" },
  { v: "Diseñar", h: "Implicación", p: "Qué se mueve para tu sector, tu modelo o tu tablero si la señal madura. Dónde te toca, en concreto.", c: "var(--change-violet)" },
  { v: "Sostener", h: "Decisión que abre", p: "La decisión que todavía está disponible hoy y que se encarece si esperas. No una recomendación genérica: una opción con fecha de caducidad.", c: "var(--ink-graphite)" },
];

const TIPOS = [
  { k: "Señal → decisión", c: "var(--signal-cyan)", h: "Lectura de señal", p: "Tomamos un movimiento concreto del entorno mexicano —regulatorio, tecnológico, cultural, de mercado— y mostramos la tensión que esconde y a quién obliga a decidir." },
  { k: "Fuerzas en conflicto", c: "var(--soft-violet)", h: "Mapa de tensión", p: "Un solo conflicto de fondo que atraviesa varios sectores a la vez, desplegado como mapa de tensiones para verlo completo, no por pedazos." },
  { k: "El instrumento por dentro", c: "var(--change-violet)", h: "Nota de método", p: "Cómo se ve por dentro un instrumento de decisión —un radar de señales, una matriz de trade-offs, un roadmap vivo— usando un caso real desidentificado." },
];

const RITMO = [
  { k: "Cadencia real", h: "Sin ruido de calendario", p: "No publicamos por inercia. Si una semana no hay nada que cambie tu forma de decidir, no hay nota. El silencio también es una lectura." },
  { k: "Cierre accionable", h: "Una señal, una decisión", p: "Ninguna nota termina en abstracto. Si no abre una decisión concreta, no es una Field Note: es un comentario." },
  { k: "Lente local", h: "Contexto mexicano primero", p: "Leemos el entorno donde operan nuestros clientes. Las señales se interpretan desde aquí, no traducidas de otro mercado." },
];

export default function FieldNotesPage() {
  return (
    <PageScaffold
      kicker="Field Notes"
      title="Lecturas para decidir antes de que la urgencia cierre opciones."
      lead="Notas breves sobre lo que está cambiando y lo que ese cambio te obliga a decidir. No comentamos la noticia: la convertimos en una pregunta que tu organización todavía puede contestar a tiempo."
    >
      {/* ═══ POR QUÉ EXISTE ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <div className="fn-head" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,440px)", gap: 60, alignItems: "end", marginBottom: 60 }}>
            <div>
              <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Por qué existe</span>
              </Reveal>
              <Reveal delay={60} as="h2" style={{ margin: 0, font: "600 clamp(28px,4vw,54px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Casi todo lo que vas a leer hoy te dice qué pasó. Casi nada te dice qué decidir.</Reveal>
            </div>
            <Reveal delay={120} as="p" style={{ margin: 0, font: "400 clamp(17px,1.4vw,20px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>El cambio se vuelve visible cuando ya es urgente, y la urgencia cierra opciones antes de que alcances a evaluarlas. Field Notes trabaja un paso antes: lee la señal mientras todavía es débil y la deja en forma de decisión.</Reveal>
          </div>
          <div className="fn-types" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { h: "La señal llega temprano", p: "No esperamos a que un tema sea tendencia para nombrarlo. La señal débil de hoy es el frente abierto del próximo trimestre." },
              { h: "La interpretas, no solo la archivas", p: "Cada nota explica qué tensión sistémica revela la señal. Sin esa lectura, una señal es solo un dato más." },
              { h: "Sale en forma de decisión", p: "Toda nota cierra en una decisión que sigue abierta para ti. No te dejamos con un dato: te dejamos con una opción que aún puedes tomar." },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.82)", border: "1px solid var(--border-subtle)", padding: 32, minHeight: 210, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: 0, font: "600 clamp(20px,1.8vw,24px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EL CONTRATO ═══ */}
      <section id="contrato" style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>El contrato de la nota</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Cómo se construye cada Field Note.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "56ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Toda nota recorre la misma estructura, en orden. Es la misma lógica con la que leemos el entorno de un cliente: de la señal suelta a la decisión que abre.</Reveal>
          <div className="fn-flow" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
            {CONTRATO.map((s, i, arr) => (
              <Reveal key={s.h} delay={i * 80} style={{ position: "relative", paddingTop: 20, borderTop: "2px solid var(--border-subtle)" }}>
                <span aria-hidden="true" style={{ position: "absolute", top: -6, left: 0, width: 9, height: 9, borderRadius: "50%", background: s.c }} />
                <span style={{ display: "block", marginBottom: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{s.v}</span>
                <strong style={{ display: "block", font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>{s.h}</strong>
                <span style={{ display: "block", marginTop: 8, font: "400 13.5px/1.5 var(--font-primary)", color: "var(--text-muted)" }}>{s.p}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUÉ VAS A ENCONTRAR ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Qué vas a encontrar</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Tres tipos de nota, una sola disciplina.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "56ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Cambia el ángulo de entrada, no el rigor. Cada tipo termina en lo mismo: una tensión legible y una decisión que sigue en tus manos.</Reveal>
          <div className="fn-types" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {TIPOS.map((t, i) => (
              <Reveal key={t.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: 34, display: "flex", flexDirection: "column", minHeight: 230 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: t.c }} />{t.k}
                </span>
                <h3 style={{ margin: "14px 0 0", font: "600 clamp(20px,1.8vw,25px)/1.08 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{t.h}</h3>
                <p style={{ margin: "13px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{t.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RITMO HONESTO ═══ */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "var(--change-violet)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cómo lo manejamos</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "22ch", font: "600 clamp(30px,4.2vw,56px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--ink-graphite)", textWrap: "balance" }}>Ritmo honesto: pocas notas, ninguna de relleno.</Reveal>
          <div className="fn-types" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {RITMO.map((c, i) => (
              <Reveal key={c.h} delay={i * 110} as="article" className="ch-card" style={{ background: "rgba(255,255,255,.85)", border: "1px solid var(--border-subtle)", padding: 32, minHeight: 200, display: "flex", flexDirection: "column" }}>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)" }}>{c.k}</span>
                <h3 style={{ margin: "12px 0 0", font: "600 clamp(19px,1.7vw,23px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{c.h}</h3>
                <p style={{ margin: "12px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "22ch", font: "600 clamp(32px,5vw,68px)/1.02 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Una nota te muestra la tensión. Una sesión la convierte en tu decisión.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 580, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Las Field Notes son cómo construimos capacidad de futuro en público. Cuando una toca un nervio real de tu organización, el siguiente paso no es leer más: es trabajar esa decisión con instrumentos hechos para tu caso.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/capacidades" className="btn btn-dghost">Cómo trabajamos</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .fn-head, .fn-types { grid-template-columns: 1fr !important; }
          .fn-flow { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .fn-flow { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}
