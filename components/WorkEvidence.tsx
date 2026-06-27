"use client";

import Reveal from "@/components/Reveal";
import { type Lang } from "@/lib/i18n";

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

interface EvidenceImage {
  src: string;
  alt: string;
  altEn: string;
  pos: string;
}

const IMAGES: EvidenceImage[] = [
  {
    src: "/img/proyectos/espacio-lobby.jpg",
    alt: "Espacio de trabajo, Ciudad de México",
    altEn: "Workspace, Mexico City",
    pos: "center 55%",
  },
  {
    src: "/img/proyectos/conferencia-gdl.jpg",
    alt: "Conferencia Universidad de Guadalajara",
    altEn: "Conference, Universidad de Guadalajara",
    pos: "center 30%",
  },
  {
    src: "/img/proyectos/boardroom-ejecutivo.jpg",
    alt: "Sesión estratégica ejecutiva",
    altEn: "Executive strategy session",
    pos: "center 40%",
  },
  {
    src: "/img/proyectos/sesion-nocturna.jpg",
    alt: "Sesión de trabajo de fondo",
    altEn: "Deep work advisory session",
    pos: "center 40%",
  },
  {
    src: "/img/proyectos/perspectiva-cdmx.jpg",
    alt: "Perspectiva estratégica, Ciudad de México",
    altEn: "Strategic altitude, Mexico City",
    pos: "center 35%",
  },
];

export default function WorkEvidence({ lang = "es" }: { lang?: Lang }) {
  const kicker = lang === "en" ? "The work in action" : "El trabajo en acción";

  return (
    <section aria-label={kicker} style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--surface-page)" }}>
      {/* Kicker */}
      <div style={{ width: WRAP, margin: "0 auto", paddingTop: "clamp(52px,6vw,80px)", paddingBottom: "clamp(20px,2.5vw,28px)" }}>
        <Reveal style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span aria-hidden="true" style={{ width: 7, height: 7, flexShrink: 0, background: "var(--change-violet)" }} />
          <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            {kicker}
          </span>
        </Reveal>
      </div>

      {/* Filmstrip — full-width, no max-width */}
      <div className="we-strip" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", height: "clamp(220px,26vw,400px)", gap: 2, overflow: "hidden" }}>
        {IMAGES.map((img, i) => (
          <Reveal
            key={img.src}
            delay={i * 70}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={lang === "en" ? img.altEn : img.alt}
              loading="lazy"
              decoding="async"
              className="we-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: img.pos,
                filter: "grayscale(18%) contrast(1.06) brightness(.97)",
                transition: "transform .6s var(--ease-premium), filter .4s ease",
                display: "block",
              }}
            />
            {/* Gradient veil — bottom darkens slightly */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 45%, rgba(14,13,18,.36) 100%)",
                pointerEvents: "none",
              }}
            />
          </Reveal>
        ))}
      </div>

      {/* Bottom breathing space */}
      <div style={{ height: "clamp(32px,4vw,52px)" }} />

      <style>{`
        .we-img:hover {
          transform: scale(1.04);
          filter: grayscale(0%) contrast(1.04) brightness(.98);
        }
        @media (prefers-reduced-motion: reduce) {
          .we-img { transition: none !important; }
        }
        @media (max-width: 760px) {
          .we-strip {
            grid-template-columns: repeat(5, 72vw) !important;
            height: clamp(180px, 52vw, 280px) !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            scroll-snap-type: x mandatory;
            gap: 2px !important;
          }
          .we-strip > * {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
