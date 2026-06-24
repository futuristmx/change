import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Equipo",
  description: "Change no es una voz individual. Es una mesa de criterio: estrategia, foresight, diseño, tecnología, operación y narrativa.",
};

export default function EquipoPage() {
  return (
    <PageScaffold
      kicker="Equipo"
      title="Change no es una voz individual. Es una mesa de criterio."
      lead="Estrategia, foresight, diseño, tecnología, operación y narrativa, conectadas según el reto. Una mesa senior, no una fábrica de entregables."
    />
  );
}
