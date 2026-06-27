"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Scroll fluido global (futurismo sereno) — Lenis.
   Respeta prefers-reduced-motion: si está activo, no inicializa y deja el
   scroll nativo. Timing afín al DS (~suave, no exagerado). */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
