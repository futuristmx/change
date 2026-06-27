import type { Metadata } from "next";
import { EquipoView } from "@/app/equipo/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "The senior board that builds future capacity",
  description:
    "Interpreting change, deciding under ambiguity and holding the course don't fit in a single head. Change brings together the ways of thinking a hard decision needs at the same time.",
  alternates: altLinksEn("/equipo"),
  openGraph: { locale: "en" },
};

export default function Page() {
  return <EquipoView lang="en" />;
}
