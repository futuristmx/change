import type { Metadata } from "next";
import { HomeView } from "@/app/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Change · Future Capacity to act without certainty",
  description:
    "Change designs future capacity: read what's changing, interpret tensions, decide with criteria, design responses and sustain learning before urgency decides for you.",
  alternates: altLinksEn("/"),
  openGraph: {
    locale: "en",
    title: "Change · Future Capacity to act without certainty",
    description:
      "Certainty is no longer a condition for acting. Change designs future capacity: read, interpret, decide, design and sustain.",
  },
};

export default function Page() {
  return <HomeView lang="en" />;
}
