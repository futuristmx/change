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
    altK: "Sin simulador", altH: "Escríbenos tu decisión como la dirías en voz alta.", altP: "Queremos empezar la conversación con un primer contexto. Escríbela en tus palabras —nosotros la leemos y te buscamos.",
  },
  en: {
    kicker: "Contact", titlePre: "Bring a hard decision.", titleAccent: "Leave with a first diagnosis.",
    lead: "It doesn't start with a project or a proposal. It starts with a real decision you're facing. Try the model with the simulator or write to us directly.",
    altK: "Without the simulator", altH: "Write us your decision the way you'd say it out loud.", altP: "We just want a first bit of context to start the conversation. Write it in your own words —we'll read it and reach out.",
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
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--gradient-white-pearl)" }}>
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
