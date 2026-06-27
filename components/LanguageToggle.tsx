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

  // Gradiente de hover según el idioma visible (hues del DS de Change):
  // ENG rojo→azul (cyan) · ES rojo→verde
  const grad = isEn
    ? "linear-gradient(95deg, var(--status-error-fg) 0%, var(--signal-cyan) 100%)"
    : "linear-gradient(95deg, var(--status-error-fg) 0%, var(--success) 100%)";

  return (
    <Link
      href={target}
      hrefLang={isEn ? "es" : "en"}
      aria-label={aria}
      title={aria}
      className={`lang-switch${dark ? " lang-dark" : ""}`}
      style={{ ["--grad" as string]: grad }}
    >
      <span className="lang-code">{isEn ? "ENG" : "ES"}</span>
      <svg className="lang-swap" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4 H9 M7 2 L9 4 L7 6 M10 8 H3 M5 6 L3 8 L5 10" />
      </svg>

      <style>{`
        .lang-switch {
          display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px;
          border: 1px solid var(--border-subtle); user-select: none;
          color: var(--text-faint);
          transition: color .2s var(--ease-premium), border-color .2s var(--ease-premium);
        }
        .lang-code {
          font: 700 11px var(--font-mono); letter-spacing: .12em; text-transform: uppercase;
          color: var(--text-faint); transition: color .2s var(--ease-premium);
        }
        .lang-switch:hover { border-color: color-mix(in srgb, var(--ink-graphite) 22%, transparent); color: var(--ink-graphite); }
        .lang-switch:hover .lang-code {
          background-image: var(--grad);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        .lang-swap { opacity: .5; transition: opacity .2s var(--ease-premium); }
        .lang-switch:hover .lang-swap { opacity: .9; }

        .lang-dark { color: rgba(240,244,255,.55); border-color: rgba(255,255,255,.16); }
        .lang-dark .lang-code { color: rgba(240,244,255,.55); }
        .lang-dark:hover { color: #fff; border-color: rgba(255,255,255,.32); }

        @media (prefers-reduced-motion: reduce) {
          .lang-switch, .lang-code, .lang-swap { transition: none; }
        }
      `}</style>
    </Link>
  );
}
