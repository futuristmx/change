import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Trabajar una decisión · sesión de claridad",
  description: "La decisión difícil no necesita más opiniones. Necesita estructura. Trae una decisión y sal con un sistema de claridad.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

export default function ContactoPage() {
  return (
    <PageScaffold
      kicker="Claridad · Contacto"
      title="La decisión difícil no necesita más opiniones. Necesita estructura."
      lead="La primera conversación no vende una solución: revela qué decisión necesita estructura y qué criterio falta explicitar."
    >
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-sky-pearl)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(72px,9vw,128px) 0" }}>
          <div className="ch-contact-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: "clamp(44px,6vw,88px)", alignItems: "start" }}>
            <div>
              <h2 style={{ margin: 0, font: "600 clamp(26px,3vw,40px)/1.05 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
                Trae una decisión difícil. Sal con una estructura.
              </h2>
              <p style={{ margin: "20px 0 0", maxWidth: "42ch", font: "400 16.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
                Cuéntanos qué está atorado. Respondemos para agendar una primera lectura — sin compromiso, sin pitch.
              </p>
              <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 6 }}>Correo directo</div>
                  <a href="mailto:andres@change.live" style={{ font: "500 16px var(--font-primary)", color: "var(--change-violet)" }}>andres@change.live</a>
                </div>
                <div>
                  <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 6 }}>Base</div>
                  <span style={{ font: "500 16px var(--font-primary)", color: "var(--ink-graphite)" }}>México</span>
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-card)", boxShadow: "var(--shadow-graphite-soft)", padding: "clamp(28px,4vw,44px)" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 920px){ .ch-contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </PageScaffold>
  );
}
