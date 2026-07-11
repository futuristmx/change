"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { type Lang, localizeHref } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

const ACCESO_HREF = "/mission-control/login";

const NAV = [
  { idx: "01", es: "Método", en: "Method", href: "/capacidades" },
  { idx: "02", es: "Mission Control", en: "Mission Control", href: "/mission-control" },
  { idx: "03", es: "Casos", en: "Cases", href: "/casos" },
  { idx: "04", es: "Equipo", en: "Team", href: "/equipo" },
  // Field Notes fuera del nav hasta el go-live de la Fase 4 (URL sigue viva) — plan 2026-07-10, T2
  { idx: "05", es: "Futuro", en: "Future", href: "/futuro" },
  { idx: "06", es: "Acceso Clientes", en: "Client Access", href: ACCESO_HREF },
];

const CTA_LABEL = { es: "Trabajar una decisión", en: "Work on a decision" };

// Pulse del logo — secuencia variable:
// pulse a los 15s, 30s, 45s, 60s, 75s, 95s, 120s; luego cada 45s.
// Es una serie de DELAYS entre pulsos (intervalos consecutivos).
const PULSE_DELAYS_MS = [15000, 15000, 15000, 15000, 15000, 20000, 25000];
const PULSE_RECURRING_MS = 45000;
const PULSE_VISIBLE_MS = 1200;

interface HeaderProps {
  /** "dark" → variante glass oscura (para superficies dark como el login) */
  variant?: "light" | "dark";
  /** false → oculta el CTA "Trabajar una decisión" (p. ej. en el login) */
  showCta?: boolean;
  /** idioma activo — localiza labels y hrefs */
  lang?: Lang;
}

export default function Header({ variant = "light", showCta = true, lang = "es" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const pathname = usePathname();
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const dark = variant === "dark";

  // Paleta por variante — premium en ambos casos
  const c = dark
    ? {
        headerBg: "linear-gradient(180deg, rgba(26,22,38,.74) 0%, rgba(14,13,19,.46) 100%)",
        headerBorder: "1px solid rgba(255,255,255,.08)",
        headerShadow: "0 10px 44px rgba(0,0,0,.42)",
        blur: "blur(26px)",
        divider: "var(--divider-ethereal-dark)",
        logo: "/assets/change_logo_white.svg",
        cmdBorder: "1px solid rgba(255,255,255,.12)",
        cmdBg: "rgba(255,255,255,.045)",
        cmdShadow: "inset 0 1px 0 rgba(255,255,255,.07), 0 6px 24px rgba(0,0,0,.28)",
        itemActive: "#fff",
        itemIdle: "rgba(240,244,255,.62)",
        idxActive: "var(--change-violet-300)",
        idxIdle: "rgba(255,255,255,.4)",
        activeBorder: "var(--soft-violet)",
        burgerBorder: "1px solid rgba(255,255,255,.16)",
        burgerColor: "#fff",
        mobileBg: "rgba(16,15,22,.97)",
        mobileBorder: "1px solid rgba(255,255,255,.1)",
        mobileSep: "1px solid rgba(255,255,255,.08)",
        mobileItemActive: "var(--change-violet-300)",
        mobileItemIdle: "rgba(240,244,255,.92)",
      }
    : {
        headerBg: "rgba(248,247,242,.82)",
        headerBorder: "1px solid var(--border-subtle)",
        headerShadow: "none",
        blur: "blur(18px)",
        divider: "var(--divider-ethereal)",
        logo: "/assets/change_logo_graphite.svg",
        cmdBorder: "1px solid var(--border-subtle)",
        cmdBg: "rgba(255,255,255,.5)",
        cmdShadow: "none",
        itemActive: "var(--ink-graphite)",
        itemIdle: "var(--text-muted)",
        idxActive: "var(--change-violet)",
        idxIdle: "var(--soft-stone-gray)",
        activeBorder: "var(--change-violet)",
        burgerBorder: "1px solid var(--border-subtle)",
        burgerColor: "var(--ink-graphite)",
        mobileBg: "var(--surface-card)",
        mobileBorder: "1px solid var(--border-subtle)",
        mobileSep: "1px solid var(--border-subtle)",
        mobileItemActive: "var(--change-violet)",
        mobileItemIdle: "var(--ink-graphite)",
      };

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) return;
    const timers = timersRef.current;
    let acc = 0;
    const flash = () => {
      setPulsing(true);
      const off = setTimeout(() => setPulsing(false), PULSE_VISIBLE_MS);
      timers.push(off);
    };
    // Secuencia fija
    PULSE_DELAYS_MS.forEach((d) => {
      acc += d;
      const t = setTimeout(flash, acc);
      timers.push(t);
    });
    // Recurrencia: después de la última marca, cada 45s
    const recur = setInterval(flash, PULSE_RECURRING_MS);
    timers.push(recur as unknown as ReturnType<typeof setTimeout>);
    return () => {
      timers.forEach((t) => clearTimeout(t as unknown as number));
      clearInterval(recur);
      timersRef.current = [];
    };
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky", top: 0, zIndex: 60, height: 80,
          display: "flex", alignItems: "center",
          background: c.headerBg,
          backdropFilter: c.blur, WebkitBackdropFilter: c.blur,
          borderBottom: c.headerBorder,
          boxShadow: c.headerShadow,
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 1, background: c.divider, opacity: dark ? 0.9 : 0.7 }} />
        <nav
          className="ch-nav"
          data-variant={variant}
          style={{
            position: "relative",
            width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))",
            margin: "0 auto", display: "grid",
            gridTemplateColumns: "auto minmax(0,1fr) auto minmax(0,1fr) auto",
            alignItems: "center", gap: 20,
          }}
        >
          <Link href={localizeHref("/", lang)} aria-label="Change" className="ch-logo" data-pulsing={pulsing ? "true" : undefined} style={{ display: "block" }}>
            <Image src={c.logo} alt="Change" width={161} height={39} style={{ height: 39, width: "auto", display: "block" }} priority />
          </Link>

          <span aria-hidden="true" />{/* spacer col2 — mantiene el menú centrado */}

          <div
            className="ch-command"
            style={{
              justifySelf: "center", display: "flex", alignItems: "center", gap: 2,
              padding: 5, border: c.cmdBorder, background: c.cmdBg, boxShadow: c.cmdShadow,
            }}
          >
            {NAV.map((item) => {
              const lhref = localizeHref(item.href, lang);
              const label = lang === "en" ? item.en : item.es;
              const active = pathname === lhref || pathname.startsWith(lhref + "/");
              const isAcceso = item.href === ACCESO_HREF;
              return (
                <Fragment key={item.href}>
                  {isAcceso && (
                    <span aria-hidden="true" style={{ width: 1, height: 22, background: dark ? "rgba(255,255,255,.14)" : "var(--border-subtle)", margin: "0 6px" }} />
                  )}
                  <Link
                    href={lhref}
                    aria-current={active ? "page" : undefined}
                    target={isAcceso ? "_blank" : undefined}
                    rel={isAcceso ? "noopener noreferrer" : undefined}
                    className="ch-navlink"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6, height: 44, padding: "0 12px",
                      color: active ? c.itemActive : c.itemIdle,
                      font: active ? "600 13.5px var(--font-primary)" : "500 13.5px var(--font-primary)",
                      letterSpacing: "-0.01em",
                      borderBottom: active ? `2px solid ${c.activeBorder}` : "2px solid transparent",
                      marginBottom: -1,
                      transition: "color .15s ease, background-color .15s ease, border-color .15s ease",
                    }}
                  >
                    <span className="ch-navidx" style={{ font: "600 11px var(--font-mono)", letterSpacing: "0.04em", color: active ? c.idxActive : c.idxIdle }}>{item.idx}</span>
                    {label}
                  </Link>
                </Fragment>
              );
            })}
          </div>

          <span className="ch-lang" style={{ justifySelf: "center" }}><LanguageToggle variant={variant} /></span>

          <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 12 }}>
            {showCta && <Link href={localizeHref("/contacto", lang)} className="btn btn-primary btn-sm ch-cta">{lang === "en" ? CTA_LABEL.en : CTA_LABEL.es}</Link>}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú" aria-expanded={open}
              className="ch-burger"
              style={{
                display: "none", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, background: "transparent",
                border: c.burgerBorder, cursor: "pointer", color: c.burgerColor,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
                <line x1="1" y1="5" x2="17" y2="5" /><line x1="1" y1="13" x2="17" y2="13" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div style={{ position: "sticky", top: 80, zIndex: 55, background: c.mobileBg, backdropFilter: c.blur, WebkitBackdropFilter: c.blur, borderBottom: c.mobileBorder, padding: "8px 0" }}>
          <div style={{ width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))", margin: "0 auto", display: "flex", flexDirection: "column" }}>
            {NAV.map((item, i) => {
              const lhref = localizeHref(item.href, lang);
              const label = lang === "en" ? item.en : item.es;
              const active = pathname === lhref || pathname.startsWith(lhref + "/");
              const isAcceso = item.href === ACCESO_HREF;
              return (
                <Link
                  key={item.href}
                  href={lhref}
                  aria-current={active ? "page" : undefined}
                  target={isAcceso ? "_blank" : undefined}
                  rel={isAcceso ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "14px 4px",
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    font: active ? "600 16px var(--font-primary)" : "500 16px var(--font-primary)",
                    color: active ? c.mobileItemActive : c.mobileItemIdle,
                    borderBottom: c.mobileSep,
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <div style={{ padding: "14px 4px" }}><LanguageToggle variant={variant} /></div>
          </div>
        </div>
      )}

      <style>{`
        /* Hover de items del nav — neutral, por variante */
        .ch-nav[data-variant="light"] .ch-navlink:hover { color: var(--ink-graphite) !important; background: color-mix(in srgb, var(--ink-graphite) 5%, transparent); }
        .ch-nav[data-variant="light"] .ch-navlink:hover .ch-navidx { color: var(--ink-graphite) !important; }
        .ch-nav[data-variant="dark"] .ch-navlink:hover { color: #fff !important; background: rgba(255,255,255,.07); }
        .ch-nav[data-variant="dark"] .ch-navlink:hover .ch-navidx { color: #fff !important; }
        @media (max-width: 1200px) {
          .ch-command { display: none !important; }
          .ch-burger { display: inline-flex !important; }
          .ch-cta { display: none !important; }
          .ch-lang { display: none !important; }
        }
        /* Hover del logo — feedback de que lleva al inicio */
        .ch-logo { transition: opacity .18s var(--ease-premium); }
        .ch-logo:hover { opacity: .66; }
        /* Pulse del logo — driven por React state (data-pulsing).
           Disparos: 15s, 30s, 45s, 60s, 75s, 95s, 120s, luego cada 45s.
           El filter vira a violet vibrante durante ~1.2s por pulso. */
        .ch-logo img {
          transition: filter var(--duration-premium) var(--ease-premium);
        }
        .ch-logo[data-pulsing="true"] img {
          filter: brightness(0) saturate(100%) invert(28%) sepia(94%) saturate(3200%) hue-rotate(248deg) brightness(100%) contrast(101%);
        }
        @media (prefers-reduced-motion: reduce) {
          .ch-logo[data-pulsing="true"] img { filter: none; }
        }
      `}</style>
    </>
  );
}
