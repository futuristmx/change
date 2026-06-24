import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Mission Control",
  description: "El criterio no debería morir en una junta. Un sistema vivo para sostener señales, decisiones, proyectos y reportes ejecutivos.",
};

export default function MissionControlPage() {
  return (
    <PageScaffold
      dark
      kicker="Mission Control"
      title="El criterio no debería morir en una junta."
      lead="Un sistema vivo que conecta señales, decisiones, proyectos y reportes para que el rumbo se revise, ajuste y sostenga en el tiempo."
    />
  );
}
