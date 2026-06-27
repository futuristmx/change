import type { Metadata } from "next";
import { FieldNotesView } from "@/app/field-notes/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Field Notes: notes for deciding before urgency",
  description:
    "Short notes on what's changing and what that change forces you to decide. We don't comment on the news: we turn it into a decision your organization can still make in time.",
  alternates: altLinksEn("/field-notes"),
  openGraph: { locale: "en" },
};

export default function Page() {
  return <FieldNotesView lang="en" />;
}
