"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { idx: "01", label: "Método", href: "/capacidades" },
  { idx: "02", label: "Mission Control", href: "/mission-control" },
  { idx: "03", label: "Casos", href: "/casos" },
  { idx: "04", label: "Equipo", href: "/equipo" },
  { idx: "05", label: "Field Notes", href: "/field-notes" },
  { idx: "06", label: "Futuro", href: "/futuro" },
];

// Pulse del logo — secuencia variable:
// pulse a los 15s, 30s, 45s, 60s, 75s, 95s, 120s; luego cada 45s.
// Es una serie de DELAYS entre pulsos (intervalos consecutivos).
const PULSE_DELAYS_MS = [15000, 15000, 15000, 15000, 15000, 20000, 25000];
const PULSE_RECURRING_MS = 45000;
const PULSE_VISIBLE_MS = 1200;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const pathname = usePathname();
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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
          background: "rgba(248,247,242,.82)",
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 1, background: "var(--divider-ethereal)", opacity: 0.7 }} />
        <nav
          className="ch-nav"
          style={{
            position: "relative",
            width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))",
            margin: "0 auto", display: "grid",
            gridTemplateColumns: "auto minmax(0,1fr) auto",
            alignItems: "center", gap: 28,
          }}
        >
          <Link href="/" aria-label="Change" className="ch-logo" data-pulsing={pulsing ? "true" : undefined} style={{ display: "block" }}>
            <Image src="/assets/change_logo_graphite.svg" alt="Change" width={161} height={39} style={{ height: 39, width: "auto", display: "block" }} priority />
          </Link>

          <div
            className="ch-command"
            style={{
              justifySelf: "center", display: "flex", alignItems: "center", gap: 2,
              padding: 5, border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.5)",
            }}
          >
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6, height: 44, padding: "0 15px",
                    color: active ? "var(--ink-graphite)" : "var(--text-muted)",
                    font: active ? "600 13.5px var(--font-primary)" : "500 13.5px var(--font-primary)",
                    letterSpacing: "-0.01em",
                    borderBottom: active ? "2px solid var(--change-violet)" : "2px solid transparent",
                    marginBottom: -1,
                    transition: "color .15s ease, border-color .15s ease",
                  }}
                >
                  <span style={{ font: "600 11px var(--font-mono)", letterSpacing: "0.04em", color: active ? "var(--change-violet)" : "var(--soft-stone-gray)" }}>{item.idx}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/contacto" className="btn btn-primary btn-sm ch-cta">Simular una decisión</Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú" aria-expanded={open}
              className="ch-burger"
              style={{
                display: "none", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, background: "transparent",
                border: "1px solid var(--border-subtle)", cursor: "pointer", color: "var(--ink-graphite)",
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
        <div style={{ position: "sticky", top: 80, zIndex: 55, background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)", padding: "8px 0" }}>
          <div style={{ width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))", margin: "0 auto", display: "flex", flexDirection: "column" }}>
            {NAV.map((item, i) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "14px 4px",
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    font: active ? "600 16px var(--font-primary)" : "500 16px var(--font-primary)",
                    color: active ? "var(--change-violet)" : "var(--ink-graphite)",
                    borderBottom: i < NAV.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .ch-command { display: none !important; }
          .ch-burger { display: inline-flex !important; }
          .ch-cta { display: none !important; }
        }
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
