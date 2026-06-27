import type { Metadata } from "next";
import { MissionControlView } from "@/app/mission-control/page";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Mission Control: where future capacity is sustained",
  description:
    "Living strategic memory: the continuity infrastructure where signals, decisions and course stay connected — the why behind every decision remains available when the context changes.",
  alternates: altLinksEn("/mission-control"),
  openGraph: { locale: "en" },
};

export default function Page() {
  return <MissionControlView lang="en" />;
}
