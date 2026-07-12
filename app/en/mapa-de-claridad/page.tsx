import type { Metadata } from "next";
import { MapaDeClaridadView } from "@/app/mapa-de-claridad/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Clarity Map · the first step takes the shape of a decision",
  description:
    "The starting point with Change: you bring a decision that weighs on you and in two to three weeks you leave with a clear diagnosis — the underlying tension, the risk, the criteria, and the first step.",
  alternates: altLinksEn("/mapa-de-claridad"),
  openGraph: {
    locale: "en",
    title: "Clarity Map · the first step takes the shape of a decision",
    description:
      "You bring a real decision. In two to three weeks you leave with a diagnosis: the underlying tension, the risk you're not seeing, the criteria, and the first concrete step.",
  },
};

export default function Page() {
  return <MapaDeClaridadView lang="en" />;
}
