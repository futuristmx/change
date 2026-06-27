"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toEsPath, toEnPath, EN_ROUTES } from "@/lib/i18n";

/* Banderas minimalistas (hex reales de bandera — no son tokens del DS).
   Se muestran en grafito (grayscale) por defecto y a full color en hover /
   idioma activo, vía filtros CSS. */
function FlagMX() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ display: "block", borderRadius: 2 }}>
      <rect width="20" height="14" fill="#ffffff" />
      <rect width="6.67" height="14" fill="#006847" />
      <rect x="13.33" width="6.67" height="14" fill="#CE1126" />
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
        {/* aspas blancas */}
        <path d="M10 0 L20 14 M20 0 L10 14" stroke="#ffffff" strokeWidth="2.4" />
        {/* aspas rojas */}
        <path d="M10 0 L20 14 M20 0 L10 14" stroke="#C8102E" strokeWidth="1" />
        {/* cruz blanca */}
        <rect x="10" y="5" width="10" height="4" fill="#ffffff" />
        <rect x="13" width="4" height="14" fill="#ffffff" />
        {/* cruz roja */}
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
  // Solo enlaza a la URL EN específica si esa ruta ya tiene versión EN;
  // si no, manda a /en (home) para no caer en 404 durante el rollout.
  const enHref = isEn ? path : (EN_ROUTES.has(esHref) ? toEnPath(path) : "/en");
  const dark = variant === "dark";

  return (
    <div className={`lang-toggle${dark ? " lang-dark" : ""}`} role="group" aria-label="Idioma / Language">
      <Link href={esHref} hrefLang="es" aria-current={!isEn ? "true" : undefined} data-active={!isEn} className="lang-opt" aria-label="Español (México)">
        <FlagMX />
        <span>ESP</span>
      </Link>
      <span aria-hidden="true" className="lang-sep" />
      <Link href={enHref} hrefLang="en" aria-current={isEn ? "true" : undefined} data-active={isEn} className="lang-opt" aria-label="English">
        <FlagENG />
        <span>ENG</span>
      </Link>

      <style>{`
        .lang-toggle { display: inline-flex; align-items: center; gap: 2px; user-select: none; }
        .lang-opt {
          display: inline-flex; align-items: center; gap: 6px; padding: 5px 8px;
          font: 600 11px var(--font-mono); letter-spacing: .1em; text-transform: uppercase;
          color: var(--text-faint); transition: color .2s var(--ease-premium);
        }
        .lang-opt svg { filter: grayscale(1) contrast(.85) opacity(.5); transition: filter .25s var(--ease-premium); }
        .lang-opt[data-active="true"] { color: var(--ink-graphite); }
        .lang-opt[data-active="true"] svg { filter: none; }
        .lang-opt:hover { color: var(--ink-graphite); }
        .lang-opt:hover svg { filter: none; }
        .lang-sep { width: 1px; height: 13px; background: var(--border-subtle); }

        .lang-dark .lang-opt { color: rgba(240,244,255,.5); }
        .lang-dark .lang-opt[data-active="true"] { color: #fff; }
        .lang-dark .lang-opt:hover { color: #fff; }
        .lang-dark .lang-sep { background: rgba(255,255,255,.18); }

        @media (prefers-reduced-motion: reduce) {
          .lang-opt, .lang-opt svg { transition: none; }
        }
      `}</style>
    </div>
  );
}
