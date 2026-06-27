import type { Metadata } from "next";
import { FuturoView } from "@/app/futuro/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Future: the thesis and the concept of future capacity",
  description:
    "Why Change exists, what future capacity is, and what holds every decision we make. Our purpose, vision, mission, and the values that govern the method.",
  alternates: altLinksEn("/futuro"),
  openGraph: { locale: "en" },
};

export default function Page() {
  return <FuturoView lang="en" />;
}
