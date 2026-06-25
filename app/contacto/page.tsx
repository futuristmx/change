import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Trabajar una decisión · sal con una lectura estructurada",
  description:
    "No empieza con un proyecto ni con una propuesta. Empieza con una decisión real que tienes sobre la mesa. Tú la describes; nosotros te devolvemos una primera forma de leerla.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

export default function ContactoPage() {
  return (
    <PageScaffold
      kicker="Contacto"
      title="Trae una decisión difícil. Sal con una lectura estructurada."
      lead="No empieza con un proyecto ni con una propuesta. Empieza con una decisión real que tienes sobre la mesa. Tú la describes; nosotros te devolvemos una primera forma de leerla."
    >
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(72px,9vw,128px) 0" }}>
          <div className="ch-contact-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)", gap: "clamp(44px,6vw,88px)", alignItems: "start" }}>
            {/* ── columna izquierda: cómo trabajamos + confianza ── */}
            <div>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cómo trabajamos esto</span>
              <h2 style={{ margin: "16px 0 0", font: "600 clamp(24px,2.8vw,38px)/1.08 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                Una decisión bien planteada ya es la mitad del trabajo.
              </h2>
              <p style={{ margin: "18px 0 0", maxWidth: "44ch", font: "400 16px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
                Las cinco preguntas de al lado no son un formulario de captación. Son la estructura con la que empezamos a leer cualquier reto: qué cambia, qué significa, qué está en juego y quién lo sostiene. Responderlas con calma vale tanto para ti como para nosotros.
              </p>

              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  ["Esto no es un brief de proyecto", "No necesitas tener resuelto el alcance, el presupuesto ni el formato. Solo la decisión. Lo demás lo estructuramos juntos."],
                  ["Lo que escribas, lo leemos en serio", "Cada respuesta entra a la primera lectura del caso. Mientras más concreta sea la tensión, más útil será lo que te devolvamos."],
                  ["Se queda entre tú y nosotros", "Tratamos cada decisión como información sensible: no la compartimos, no la reciclamos en otros casos y no la usamos para venderte nada que no pediste."],
                ].map(([h, p]) => (
                  <div key={h} style={{ display: "flex", gap: 12 }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 8, width: 7, height: 7, borderRadius: "50%", background: "var(--change-violet)" }} />
                    <div>
                      <strong style={{ display: "block", font: "600 15px var(--font-primary)", letterSpacing: "-.01em", color: "var(--ink-graphite)" }}>{h}</strong>
                      <span style={{ display: "block", marginTop: 4, font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{p}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, paddingTop: 26, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <div style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 7 }}>Qué pasa después de enviar</div>
                  <span style={{ font: "400 14.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>Leemos tu caso con calma y te respondemos en un máximo de dos días hábiles con una primera lectura y el siguiente paso posible. Sin formularios adicionales, sin embudo.</span>
                </div>
                <div>
                  <div style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 7 }}>Quién va a leer tu caso</div>
                  <span style={{ font: "400 14.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>Andrés Valencia, Miguel Cadena y Eric O. Fuentes leen los casos que entran. Según el reto, sumamos partners para dar profundidad donde se necesita.</span>
                </div>
                <div>
                  <div style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 7 }}>Si prefieres escribir directo</div>
                  <a href="mailto:andres@change.live" style={{ font: "500 16px var(--font-primary)", color: "var(--change-violet)" }}>andres@change.live</a>
                </div>
              </div>
            </div>

            {/* ── columna derecha: las 5 preguntas ── */}
            <div>
              <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>La decisión · cinco preguntas</span>
              <h3 style={{ margin: "16px 0 24px", font: "600 clamp(22px,2.2vw,30px)/1.1 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>
                Responde con tus palabras. No buscamos lo correcto; buscamos lo verdadero del momento que estás atravesando.
              </h3>
              <div style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-card)", boxShadow: "var(--shadow-graphite-soft)", padding: "clamp(28px,4vw,40px)" }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 920px){ .ch-contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </PageScaffold>
  );
}
