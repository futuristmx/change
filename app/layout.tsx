import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://change.live";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Change — La claridad no aparece. Se diseña.",
    template: "%s · Change",
  },
  description:
    "Change convierte decisiones ambiguas en sistemas de claridad, para que el rumbo no dependa de una sola cabeza. Inteligencia estratégica serena para decisiones complejas.",
  keywords: [
    "estrategia", "foresight", "futuros", "inteligencia estratégica",
    "toma de decisiones", "consultoría estratégica", "México", "Change",
  ],
  authors: [{ name: "Change" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Change",
    title: "Change — La claridad no aparece. Se diseña.",
    description:
      "Convertimos incertidumbre en criterio. Inteligencia estratégica serena para decisiones complejas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Change — La claridad no aparece. Se diseña.",
    description:
      "Convertimos incertidumbre en criterio. Inteligencia estratégica serena para decisiones complejas.",
  },
  robots: { index: true, follow: true },
  // Favicon: app/icon.svg (Change icon, Electric Future Violet #6D3BFF, sin fondo)
  // se sirve automáticamente por convención de Next.js.
};

export const viewport: Viewport = {
  themeColor: "#F8F7F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/vjn7ksg.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
