import type { Metadata } from "next";
import { LoginView } from "@/components/MissionControlLoginView";
import { altLinksEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Access · Mission Control",
  alternates: altLinksEn("/mission-control/login"),
};

export default function Page() {
  return <LoginView lang="en" />;
}
