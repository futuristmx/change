"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress — barra global de progreso de scroll del documento.
 * 2px fija arriba, gradient violeta (--line-gradient-progress).
 * - Calcula scrollY / (scrollHeight - innerHeight) clamp 0..1
 * - Usa requestAnimationFrame para suavidad (1 frame por evento).
 * - Respeta prefers-reduced-motion: reduce → sin transition CSS.
 * - z-index var(--z-sticky). Decorativa: aria-hidden.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

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
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 100,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "var(--line-gradient-progress)",
          transformOrigin: "left center",
          transform: `scaleX(${progress})`,
          transition: reduceMotion ? "none" : "transform 80ms linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}
