import type { Metadata } from "next";
import { ContactoView } from "@/app/contacto/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Work a decision · try Change's model",
  description:
    "Five questions that read your decision before the work begins. Try the simulator with a scenario or bring your case directly. No lead-capture form, no automatic proposal.",
  alternates: altLinksEn("/contacto"),
  openGraph: { locale: "en" },
};

export default function Page() {
  return <ContactoView lang="en" />;
}
