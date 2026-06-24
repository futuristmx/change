import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Lo que estamos viendo cambiar. Señales, lecturas y notas de campo desde el cruce entre estrategia y futuros.",
};

export default function FieldNotesPage() {
  return (
    <PageScaffold
      kicker="Field Notes"
      title="Lo que estamos viendo cambiar."
      lead="Señales, lecturas y notas de campo desde el cruce entre estrategia y futuros. Cada nota cierra en una implicación para decidir."
    />
  );
}
