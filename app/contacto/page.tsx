import type { Metadata } from "next";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import DecisionSimulator from "@/components/DecisionSimulator";
import ContactFormSimple from "@/components/ContactFormSimple";

export const metadata: Metadata = {
  title: "Trabajar una decisión · prueba el modelo de Change",
  description:
    "Cinco preguntas que leen tu decisión antes de que empiece el trabajo. Prueba el simulador con un escenario o trae tu caso directamente. Sin formulario de captación, sin propuesta automática.",
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Trabajar una decisión · prueba el modelo de Change" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

export default function ContactoPage() {
  return (
    <PageScaffold
      kicker="Contacto"
      title={<GradientTitle pre="Trae una decisión difícil." accent="Sal con una primera lectura." accentGradient="var(--gradient-type-dark-ember)" />}
      lead="No empieza con un proyecto ni con una propuesta. Empieza con una decisión real que tienes enfrente. Prueba el modelo con el simulador o escríbenos directamente."
    >
      <DecisionSimulator />

      {/* Forma alternativa — mensaje breve */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(64px,8vw,112px) 0" }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ margin: "0 0 6px", font: "600 11.5px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Alternativa</p>
            <h2 style={{ margin: "0 0 14px", font: "600 clamp(22px,2.6vw,32px)/1.1 var(--font-primary)", letterSpacing: "-.035em", color: "var(--ink-graphite)" }}>Prefiero escribir un mensaje breve.</h2>
            <p style={{ margin: "0 0 36px", font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>Si el simulador no es el formato que buscas, puedes escribirnos directamente. Tu caso llega al board senior de Change. Si hay una tensión real que podamos trabajar, te respondemos con una primera lectura y un siguiente paso posible.</p>
            <ContactFormSimple />
          </div>
        </div>
      </section>
    </PageScaffold>
  );
}
