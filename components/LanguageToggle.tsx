"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toEsPath, toEnPath, EN_ROUTES } from "@/lib/i18n";

/* Banderas minimalistas (hex reales de bandera — no son tokens del DS).
   Grafito (grayscale) por defecto, full color en hover, vía filtro CSS. */
function FlagMX() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ display: "block", borderRadius: 2 }}>
      <rect width="20" height="14" fill="#ffffff" />
      <rect width="6.67" height="14" fill="#006847" />
      <rect x="13.33" width="6.67" height="14" fill="#CE1126" />
      {/* emblema central — distingue de la bandera de Italia */}
      <circle cx="10" cy="7" r="2.2" fill="none" stroke="#6B4423" strokeWidth="0.9" />
      <circle cx="10" cy="7" r="0.75" fill="#6B4423" />
    </svg>
  );
}

function FlagENG() {
  // mitad izquierda USA · mitad derecha Union Jack
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ display: "block", borderRadius: 2 }}>
      <defs>
        <clipPath id="lt-flag-clip"><rect width="20" height="14" rx="2" /></clipPath>
      </defs>
      <g clipPath="url(#lt-flag-clip)">
        {/* USA — izquierda */}
        <rect width="10" height="14" fill="#ffffff" />
        {[0, 2, 4, 6, 8, 10, 12].map((y) => (
          <rect key={y} y={y} width="10" height="1" fill="#B22234" />
        ))}
        <rect width="5.4" height="7" fill="#3C3B6E" />
        {/* Union Jack — derecha */}
        <rect x="10" width="10" height="14" fill="#012169" />
        <path d="M10 0 L20 14 M20 0 L10 14" stroke="#ffffff" strokeWidth="2.4" />
        <path d="M10 0 L20 14 M20 0 L10 14" stroke="#C8102E" strokeWidth="1" />
        <rect x="10" y="5" width="10" height="4" fill="#ffffff" />
        <rect x="13" width="4" height="14" fill="#ffffff" />
        <rect x="10" y="6" width="10" height="2" fill="#C8102E" />
        <rect x="14" width="2" height="14" fill="#C8102E" />
      </g>
    </svg>
  );
}

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

  return (
    <Link
      href={target}
      hrefLang={isEn ? "es" : "en"}
      aria-label={aria}
      title={aria}
      className={`lang-switch${dark ? " lang-dark" : ""}`}
    >
      {isEn ? <FlagENG /> : <FlagMX />}
      <span className="lang-code">{isEn ? "ENG" : "ESP"}</span>
      <svg className="lang-swap" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4 H9 M7 2 L9 4 L7 6 M10 8 H3 M5 6 L3 8 L5 10" />
      </svg>

      <style>{`
        .lang-switch {
          display: inline-flex; align-items: center; gap: 7px; padding: 5px 9px;
          font: 600 11px var(--font-mono); letter-spacing: .1em; text-transform: uppercase;
          color: var(--text-faint); border: 1px solid var(--border-subtle); user-select: none;
          transition: color .2s var(--ease-premium), border-color .2s var(--ease-premium);
        }
        .lang-switch > svg:first-child { filter: grayscale(1) contrast(.85) opacity(.55); transition: filter .25s var(--ease-premium); }
        .lang-switch:hover { color: var(--ink-graphite); border-color: color-mix(in srgb, var(--ink-graphite) 22%, transparent); }
        .lang-switch:hover > svg:first-child { filter: none; }
        .lang-swap { color: currentColor; opacity: .5; }
        .lang-switch:hover .lang-swap { opacity: .85; }

        .lang-dark { color: rgba(240,244,255,.5); border-color: rgba(255,255,255,.16); }
        .lang-dark:hover { color: #fff; border-color: rgba(255,255,255,.32); }

        @media (prefers-reduced-motion: reduce) {
          .lang-switch, .lang-switch > svg:first-child { transition: none; }
        }
      `}</style>
    </Link>
  );
}
