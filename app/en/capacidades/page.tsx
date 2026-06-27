import type { Metadata } from "next";
import { CapacidadesView } from "@/app/capacidades/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Method: read, interpret, decide, design and sustain",
  description:
    "You don't buy a standalone capability. You build future capacity: five moves that turn uncertainty into instruments for deciding.",
  alternates: altLinksEn("/capacidades"),
  openGraph: { locale: "en" },
};

export default function Page() {
  return <CapacidadesView lang="en" />;
}
