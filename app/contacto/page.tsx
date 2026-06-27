import type { Metadata } from "next";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import DecisionSimulator from "@/components/DecisionSimulator";
import ContactFormSimple from "@/components/ContactFormSimple";
import { type Lang, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Trabajar una decisión · prueba el modelo de Change",
  description:
    "Cinco preguntas que leen tu decisión antes de que empiece el trabajo. Prueba el simulador con un escenario o trae tu caso directamente. Sin formulario de captación, sin propuesta automática.",
  alternates: altLinks("/contacto"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Trabajar una decisión · prueba el modelo de Change" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const CO_COPY = {
  es: {
    kicker: "Contacto", titlePre: "Trae una decisión difícil.", titleAccent: "Sal con un primer diagnóstico.",
    lead: "No empieza con un proyecto ni con una propuesta. Empieza con una decisión real que tienes enfrente. Prueba el modelo con el simulador o escríbenos directamente.",
    altK: "Sin simulador", altH: "Escríbenos la decisión como la dirías en voz alta.", altP: "Sin estructura, sin formato. El board senior de Change la lee directamente. Si hay una tensión real que pueda trabajarse con el método, te respondemos en menos de dos días hábiles con un primer diagnóstico y un paso posible.",
  },
  en: {
    kicker: "Contact", titlePre: "Bring a hard decision.", titleAccent: "Leave with a first diagnosis.",
    lead: "It doesn't start with a project or a proposal. It starts with a real decision you're facing. Try the model with the simulator or write to us directly.",
    altK: "Without the simulator", altH: "Write us the decision as you'd say it out loud.", altP: "No structure, no format. Change's senior board reads it directly. If there's a real tension that can be worked with the method, we reply in under two business days with a first diagnosis and a possible step.",
  },
};

export function ContactoView({ lang }: { lang: Lang }) {
  const t = CO_COPY[lang];
  return (
    <PageScaffold
      lang={lang}
      kicker={t.kicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} accentGradient="var(--gradient-type-dark-ember)" />}
      lead={t.lead}
    >
      <DecisionSimulator lang={lang} />

      {/* Forma alternativa — mensaje directo */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "linear-gradient(180deg,#FFFFFF,var(--pure-white))" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(64px,8vw,112px) 0" }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ margin: "0 0 6px", font: "600 11.5px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>{t.altK}</p>
            <h2 style={{ margin: "0 0 14px", font: "600 clamp(22px,2.6vw,32px)/1.1 var(--font-primary)", letterSpacing: "-.035em", color: "var(--ink-graphite)" }}>{t.altH}</h2>
            <p style={{ margin: "0 0 36px", font: "400 15px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>{t.altP}</p>
            <ContactFormSimple lang={lang} />
          </div>
        </div>
      </section>
    </PageScaffold>
  );
}

export default function ContactoPage() {
  return <ContactoView lang="es" />;
}
