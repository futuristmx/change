import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://change.live";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/capacidades", "/mission-control", "/equipo", "/field-notes", "/casos", "/contacto"];
  // ES en la raíz + EN bajo /en, con alternates hreflang para SEO bilingüe.
  return routes.map((route) => {
    const esUrl = `${SITE_URL}${route}`;
    const enUrl = `${SITE_URL}/en${route}`;
    return {
      url: esUrl,
      changeFrequency: route === "/field-notes" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
      alternates: { languages: { "es-MX": esUrl, en: enUrl } },
    };
  });
}
