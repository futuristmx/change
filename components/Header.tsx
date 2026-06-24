"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { idx: "01", label: "Claridad", href: "/contacto" },
  { idx: "02", label: "Método", href: "/capacidades" },
  { idx: "03", label: "Mission Control", href: "/mission-control" },
  { idx: "04", label: "Equipo", href: "/equipo" },
  { idx: "05", label: "Field Notes", href: "/field-notes" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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
          <Link href="/" aria-label="Change" style={{ display: "block" }}>
            <Image src="/assets/change_logo_graphite.svg" alt="Change" width={140} height={34} style={{ height: 34, width: "auto", display: "block" }} priority />
          </Link>

          <div
            className="ch-command"
            style={{
              justifySelf: "center", display: "flex", alignItems: "center", gap: 2,
              padding: 5, border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,.5)",
            }}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 15px",
                  color: "var(--text-muted)", font: "500 13.5px var(--font-primary)", letterSpacing: "-0.01em",
                }}
              >
                <span style={{ font: "600 11px var(--font-mono)", letterSpacing: "0.04em", color: "var(--soft-stone-gray)" }}>{item.idx}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/contacto" className="btn btn-primary btn-sm ch-cta">Trabajar una decisión</Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú" aria-expanded={open}
              className="ch-burger"
              style={{
                display: "none", alignItems: "center", justifyContent: "center",
                width: 42, height: 42, background: "transparent",
                border: "1px solid var(--border-subtle)", cursor: "pointer", color: "#1B191F",
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
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "13px 4px", font: "500 16px var(--font-primary)", color: "#1B191F",
                  borderBottom: i < NAV.length - 1 ? "1px solid var(--border-subtle)" : "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .ch-command { display: none !important; }
          .ch-burger { display: inline-flex !important; }
          .ch-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
