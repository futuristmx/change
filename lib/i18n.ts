/* ══════════════════════════════════════════════════════════════
   i18n — Change (ES raíz · EN bajo /en)
   ES es el idioma por defecto y vive en la raíz (/, /futuro, ...).
   EN vive bajo /en (/en, /en/futuro, ...). Cada componente con
   contenido recibe `lang` y resuelve su copy desde un dict local.
   ══════════════════════════════════════════════════════════════ */

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

/** Rutas ES (canónicas) que ya tienen versión EN publicada bajo /en.
    El LanguageToggle solo ofrece la URL /en específica si está aquí;
    si no, manda a /en (home) para evitar 404 durante el rollout. */
export const EN_ROUTES = new Set<string>([
  "/",
  "/capacidades",
  "/mission-control",
  "/equipo",
  "/futuro",
]);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://change.live";

/** Prefija un href interno con /en cuando el idioma es inglés.
    Deja intactos externos, anclas y mailto. */
export function localizeHref(href: string, lang: Lang): string {
  if (lang === "es") return href;
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href === "/") return "/en";
  return "/en" + href;
}

/** Devuelve la ruta ES equivalente (sin /en) de un pathname. */
export function toEsPath(path: string): string {
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) return path.slice(3); // quita "/en"
  return path;
}

/** Devuelve la ruta EN equivalente (con /en) de un pathname ES. */
export function toEnPath(path: string): string {
  if (path === "/en" || path.startsWith("/en/")) return path;
  return path === "/" ? "/en" : "/en" + path;
}

/** Bloque `alternates` para metadata (canonical + hreflang).
    Recibe la ruta ES canónica, p. ej. "/" o "/futuro". */
export function altLinks(pathEs: string) {
  const esUrl = SITE_URL + (pathEs === "/" ? "" : pathEs);
  const enUrl = SITE_URL + (pathEs === "/" ? "/en" : "/en" + pathEs);
  return {
    canonical: esUrl,
    languages: {
      "es-MX": esUrl,
      en: enUrl,
      "x-default": esUrl,
    },
  };
}

/** Igual que altLinks pero con canonical apuntando a la versión EN. */
export function altLinksEn(pathEs: string) {
  const esUrl = SITE_URL + (pathEs === "/" ? "" : pathEs);
  const enUrl = SITE_URL + (pathEs === "/" ? "/en" : "/en" + pathEs);
  return {
    canonical: enUrl,
    languages: {
      "es-MX": esUrl,
      en: enUrl,
      "x-default": esUrl,
    },
  };
}

/** Helper de selección: pick({es,en}, lang). */
export function pick<T>(dict: { es: T; en: T }, lang: Lang): T {
  return dict[lang];
}
