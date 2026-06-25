import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";
import DecisionSimulator from "@/components/DecisionSimulator";
import ContactFormSimple from "@/components/ContactFormSimple";

export const metadata: Metadata = {
  title: "Trabajar una decisión · prueba el modelo de Change",
  description:
    "Cinco preguntas que leen tu decisión antes de que empiece el trabajo. Prueba el simulador con un escenario o trae tu caso directamente. Sin formulario de captación, sin propuesta automática.",
};

export default function ContactoPage() {
  return (
    <PageScaffold
      kicker="Contacto"
      title="Trae una decisión difícil. Sal con una primera lectura."
      lead="No empieza con un proyecto ni con una propuesta. Empieza con una decisión real que tienes enfrente. Prueba el modelo con un escenario o describe tu caso directamente — el board lee lo que llega."
    >
      <DecisionSimulator />

      {/* Forma alternativa — mensaje breve */}
      <div style={{ marginTop: "clamp(64px,9vw,112px)", paddingTop: "clamp(52px,7vw,88px)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
          <p style={{ margin: "0 0 6px", font: "600 11.5px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Alternativa</p>
          <h2 style={{ margin: "0 0 14px", font: "600 clamp(22px,2.6vw,32px)/1.1 var(--font-primary)", letterSpacing: "-.035em", color: "var(--ink-graphite)" }}>Prefiero escribir un mensaje breve.</h2>
          <p style={{ margin: 0, font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>Si el simulador no es el formato que buscas, puedes escribirnos directamente. Sin captación de leads ni propuesta automática — el board lee lo que llega y responde si hay alineación.</p>
        </div>
        <ContactFormSimple />
      </div>
    </PageScaffold>
  );
}
