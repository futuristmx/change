import type { Metadata } from "next";
import Specimen from "@/components/ds/showcase/Specimen";

/* Ruta interna de verificación del Change DS 2.4 — NO indexar, NO enlazar
   desde el sitio público. Anula el robots index:true global del layout. */
export const metadata: Metadata = {
  title: "Laboratorio · Change DS 2.4",
  robots: { index: false, follow: false },
};

export default function LaboratorioPage() {
  return (
    <main id="main-content" style={{ minHeight: "100vh", background: "var(--surface-page)" }}>
      <Specimen />
    </main>
  );
}
