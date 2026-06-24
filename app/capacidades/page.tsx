import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Método",
  description: "No compras una capacidad suelta. Entras a una cadena que escala contigo: Anticipar, Decidir, Diseñar y Sostener.",
};

export default function CapacidadesPage() {
  return (
    <PageScaffold
      kicker="Método · Capacidades"
      title="No compras una capacidad suelta. Entras a una cadena que escala contigo."
      lead="Anticipar, decidir, diseñar y sostener: cuatro capacidades conectadas que convierten el criterio en un sistema vivo."
    />
  );
}
