"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Scroll fluido global (futurismo sereno) — Lenis.
   Respeta prefers-reduced-motion: si está activo, no inicializa y deja el
   scroll nativo. Timing afín al DS (~suave, no exagerado).
   La instancia se expone en window.__lenis: los scrolls programáticos
   (p. ej. reposicionar el instrumento al cambiar de fase) deben pasar por
   lenis.scrollTo — un scrollTop nativo lo revierte el raf de Lenis. */
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
    (window as typeof window & { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as typeof window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
