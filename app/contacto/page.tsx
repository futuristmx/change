import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";
import DecisionSimulator from "@/components/DecisionSimulator";

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
    </PageScaffold>
  );
}
