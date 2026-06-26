import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/ds";
import StickyCta from "@/components/StickyCta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://change.live";
const OG_IMAGE = "/assets/og-default.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Change · Capacidad de futuro para actuar sin certeza",
    template: "%s · Change",
  },
  description:
    "Change diseña capacidad de futuro: leer lo que cambia, interpretar tensiones, decidir con criterio, diseñar respuestas y sostener aprendizaje antes de que la urgencia decida por ti.",
  keywords: [
    "capacidad de futuro", "inteligencia estratégica", "foresight", "futuros",
    "toma de decisiones", "pensamiento sistémico", "diseño estratégico", "México", "Change",
  ],
  authors: [{ name: "Change" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Change",
    title: "Change · Capacidad de futuro para actuar sin certeza",
    description:
      "La certeza dejó de ser condición para actuar. Change diseña capacidad de futuro: leer, interpretar, decidir, diseñar y sostener.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Change · Capacidad de futuro para actuar sin certeza" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Change · Capacidad de futuro",
    description: "La certeza dejó de ser condición para actuar.",
    images: [OG_IMAGE],
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Change",
              url: SITE_URL,
              description:
                "Change diseña capacidad de futuro: la habilidad de una organización para leer cambio, interpretar tensiones, decidir con criterio, diseñar respuestas y sostener aprendizaje antes de que la urgencia la obligue.",
              areaServed: { "@type": "Country", name: "México" },
              knowsLanguage: "es-MX",
              logo: `${SITE_URL}/assets/change_logo_graphite.svg`,
            }),
          }}
        />
        <a href="#main-content" className="skip-link">Ir al contenido principal</a>
        <ScrollProgress />
        {children}
        <StickyCta />
      </body>
    </html>
  );
}
