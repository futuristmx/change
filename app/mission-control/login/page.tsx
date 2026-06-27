import type { Metadata } from "next";
import { LoginView } from "@/components/MissionControlLoginView";
import { altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Acceso · Mission Control",
  alternates: altLinks("/mission-control/login"),
};

export default function MissionControlLoginPage() {
  return <LoginView lang="es" />;
}
