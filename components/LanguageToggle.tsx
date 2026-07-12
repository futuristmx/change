"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toEsPath, toEnPath, EN_ROUTES } from "@/lib/i18n";

interface Props {
  variant?: "light" | "dark";
}

export default function LanguageToggle({ variant = "light" }: Props) {
  const path = usePathname() || "/";
  const isEn = path === "/en" || path.startsWith("/en/");
  const esHref = toEsPath(path);
  // destino EN específico solo si la ruta ya tiene versión EN; si no, /en (home)
  const enHref = EN_ROUTES.has(esHref) ? toEnPath(path) : "/en";

  // El switch muestra el idioma ACTUAL; al hacer clic cambia al otro.
  const target = isEn ? esHref : enHref;
  const dark = variant === "dark";
  const aria = isEn ? "Cambiar a español" : "Switch to English";

  // Un solo color de hover según el idioma visible (hues del DS de Change):
  // ENG rojo · ES verde
  const hue = isEn ? "var(--status-error-fg)" : "var(--success)";

  return (
    <Link
      href={target}
      hrefLang={isEn ? "es" : "en"}
      aria-label={aria}
      title={aria}
      className={`lang-switch${dark ? " lang-dark" : ""}`}
      style={{ ["--hue" as string]: hue }}
    >
      <span className="lang-code">{isEn ? "ENG" : "ES"}</span>
      <svg className="lang-swap" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6 H13 M10.5 3.5 L13 6 L10.5 8.5" />
        <path d="M13 10 H3 M5.5 7.5 L3 10 L5.5 12.5" />
      </svg>

      <style>{`
        .lang-switch {
          display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px;
          border: 1px solid var(--border-subtle); user-select: none;
          color: var(--text-faint);
          transition: color var(--duration-standard) var(--ease-premium), border-color var(--duration-standard) var(--ease-premium);
        }
        .lang-code {
          font: 700 11px var(--font-mono); letter-spacing: .12em; text-transform: uppercase;
          color: var(--text-faint); transition: color var(--duration-standard) var(--ease-premium);
        }
        .lang-switch:hover { border-color: color-mix(in srgb, var(--hue) 45%, transparent); color: var(--hue); }
        .lang-switch:hover .lang-code { color: var(--hue); }
        .lang-swap { flex-shrink: 0; opacity: .7; transition: opacity var(--duration-standard) var(--ease-premium); }
        .lang-switch:hover .lang-swap { opacity: 1; }

        .lang-dark { color: rgba(240,244,255,.55); border-color: rgba(255,255,255,.16); }
        .lang-dark .lang-code { color: rgba(240,244,255,.55); }
        .lang-dark:hover { border-color: color-mix(in srgb, var(--hue) 50%, transparent); }

        @media (prefers-reduced-motion: reduce) {
          .lang-switch, .lang-code, .lang-swap { transition: none; }
        }
      `}</style>
    </Link>
  );
}
