import type { Metadata } from "next";
import { CasosView } from "@/app/casos/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Decisions that became capacity",
  description:
    "Six real tensions, the decision each one made possible, and the system it left installed. Cases anonymized by tension and sector.",
  alternates: altLinksEn("/casos"),
  openGraph: { locale: "en" },
};

export default function Page() {
  return <CasosView lang="en" />;
}
