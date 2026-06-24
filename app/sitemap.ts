import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://change.live";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/capacidades", "/mission-control", "/equipo", "/field-notes", "/casos", "/contacto"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/field-notes" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
