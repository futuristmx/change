"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollProgress — barra global de progreso de scroll del documento.
 * 3px fija bajo el header sticky (80px), gradiente propio por página.
 * - Calcula scrollY / (scrollHeight - innerHeight) clamp 0..1
 * - Usa requestAnimationFrame para suavidad (1 frame por evento).
 * - Respeta prefers-reduced-motion: reduce → sin transition CSS.
 * - Debajo del header (z 60) y del menú móvil (z 55). Decorativa: aria-hidden.
 */

const HEADER_H = 80;

// Gradiente por ruta (sin prefijo /en) — match por prefijo más largo.
const ROUTE_GRADIENTS: Array<[string, string]> = [
  ["/capacidades", "linear-gradient(90deg, var(--signal-cyan) 0%, var(--change-violet) 100%)"],
  ["/casos", "linear-gradient(90deg, var(--opportunity-orange) 0%, var(--human-pink) 100%)"],
  ["/mapa-de-claridad", "linear-gradient(90deg, var(--signal-cyan) 0%, var(--success) 100%)"],
  ["/mission-control", "linear-gradient(90deg, var(--change-violet) 0%, var(--signal-cyan) 100%)"],
  ["/equipo", "linear-gradient(90deg, var(--human-pink) 0%, var(--change-violet) 100%)"],
  ["/futuro", "linear-gradient(90deg, var(--change-violet) 0%, var(--opportunity-orange) 100%)"],
  ["/contacto", "linear-gradient(90deg, var(--success) 0%, var(--signal-cyan) 55%, var(--change-violet) 100%)"],
  ["/field-notes", "linear-gradient(90deg, var(--warning) 0%, var(--human-pink) 100%)"],
];

const DEFAULT_GRADIENT =
  "linear-gradient(90deg, var(--change-violet) 0%, var(--signal-cyan) 55%, var(--human-pink) 100%)";

function gradientFor(pathname: string): string {
  const path = pathname === "/en" ? "/" : pathname.replace(/^\/en(?=\/)/, "");
  const hit = ROUTE_GRADIENTS.find(([prefix]) => path === prefix || path.startsWith(prefix + "/"));
  return hit ? hit[1] : DEFAULT_GRADIENT;
}

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);

    let frame = 0;
    const compute = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: HEADER_H,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 54,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: gradientFor(pathname),
          transformOrigin: "left center",
          transform: `scaleX(${progress})`,
          transition: reduceMotion ? "none" : "transform 80ms linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}
