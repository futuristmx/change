import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Decisiones",
  description: "No hacemos proyectos. Habilitamos decisiones que sobreviven a la operación.",
};

export default function CasosPage() {
  return (
    <PageScaffold
      kicker="Decisiones habilitadas"
      title="No hacemos proyectos. Habilitamos decisiones que sobreviven a la operación."
      lead="La evidencia de Change no es estética: es capacidad directiva instalada. Expansión, sucesión, portafolio y riesgo trabajados con estructura."
    />
  );
}
