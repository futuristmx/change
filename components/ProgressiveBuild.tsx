"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph, type GlyphName } from "@/components/ds";

export interface BuildStage {
  n: string;
  tag: string;
  c: string;
  p: string;
  g: GlyphName;
  duration: string;
}

/* Construcción progresiva — mecánica de ensamblaje:
   al entrar en vista, el rail se traza y los anillos de progreso se llenan en
   cascada (cada etapa "se construye"). Al hover, esa etapa gana foco y las
   demás se atenúan. */
export default function ProgressiveBuild({ stages }: { stages: BuildStage[] }) {
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(el); } }),
      { threshold: 0.2, rootMargin: "0px 0px -18% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={inView ? "pb-wrap pb-in" : "pb-wrap"}>
      <div className="pb-stages" style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${stages.length},1fr)`, gap: "clamp(20px,2.6vw,44px)" }}>
        {/* rail conector (detrás de los nodos) */}
        <div aria-hidden="true" className="pb-rail-track" style={{ position: "absolute", left: "16%", right: "16%", top: 33, height: 2, background: "var(--line-structural)", opacity: 0.35, zIndex: 0 }} />
        <div aria-hidden="true" className="pb-rail-fill" style={{ position: "absolute", left: "16%", right: "16%", top: 33, height: 2, background: "var(--line-gradient-relation)", zIndex: 0 }} />

        {stages.map((s, i) => {
          const focused = hovered === i;
          const dim = hovered !== null && !focused;
          const num = String(i + 1).padStart(2, "0");
          return (
            <article
              key={s.n}
              className="pb-stage"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ position: "relative", zIndex: 1, textAlign: "center", opacity: dim ? 0.5 : 1, transform: focused ? "translateY(-6px)" : "none", transition: "opacity .35s var(--ease-premium), transform .35s var(--ease-premium)" }}
            >
              {/* anillo de progreso + nodo */}
              <div style={{ position: "relative", width: 66, height: 66, margin: "0 auto 18px" }}>
                <svg width="66" height="66" viewBox="0 0 66 66" aria-hidden="true" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                  <circle cx="33" cy="33" r="30" fill="none" stroke="var(--soft-stone-gray)" strokeOpacity="0.5" strokeWidth="2.5" />
                  <circle className="pb-ring" cx="33" cy="33" r="30" fill="none" stroke={s.c} strokeWidth="2.5" strokeLinecap="round" pathLength={1} style={{ animationDelay: `${(0.2 + i * 0.3).toFixed(2)}s` }} />
                </svg>
                <span aria-hidden="true" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--surface-card)", border: `1.5px solid ${s.c}`, color: s.c, transition: "transform .35s var(--ease-premium), box-shadow .35s var(--ease-premium)", transform: focused ? "scale(1.08)" : "scale(1)", boxShadow: focused ? `0 0 0 5px var(--surface-card), 0 10px 28px color-mix(in srgb, ${s.c} 32%, transparent)` : "none" }}>
                    <Glyph name={s.g} size={24} strokeWidth={1.7} />
                  </span>
                </span>
              </div>

              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Paso {num} · {s.tag}</span>
              <h3 style={{ margin: "0 0 12px", font: "600 clamp(20px,1.9vw,26px)/1.04 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{s.n}</h3>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: focused ? "var(--ink-graphite)" : "var(--text-muted)", transition: "color .3s var(--ease-premium)" }}>
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: s.c }} />{s.duration}
              </span>
              <p style={{ margin: "0 auto", maxWidth: "32ch", font: "400 14.5px/1.65 var(--font-primary)", color: "var(--text-muted)" }}>{s.p}</p>
            </article>
          );
        })}
      </div>

      <style>{`
        .pb-rail-fill { transform: scaleX(0); transform-origin: left center; }
        .pb-in .pb-rail-fill { animation: pb-rail 1.2s var(--ease-premium) forwards; }
        @keyframes pb-rail { to { transform: scaleX(1); } }
        .pb-ring { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .pb-in .pb-ring { animation: pb-fill 1.1s var(--ease-premium) forwards; }
        @keyframes pb-fill { to { stroke-dashoffset: 0; } }
        @media (max-width: 880px) {
          .pb-stages { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pb-rail-track, .pb-rail-fill { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pb-rail-fill { transform: scaleX(1); animation: none; }
          .pb-ring { stroke-dashoffset: 0; animation: none; }
        }
      `}</style>
    </div>
  );
}
