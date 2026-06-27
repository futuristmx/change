"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph, type GlyphName } from "@/components/ds";
import { type Lang } from "@/lib/i18n";

export interface AscentLevel {
  n: string;
  tag: string;
  p: string;
  g: GlyphName;
  c: string;
}

/* El último escalón — ascenso por horizontes estratégicos.
   Cada nivel es una plataforma-horizonte inclinada en perspectiva 3D que gana
   luminosidad hacia la cumbre, conectada por un eje luminoso. Lectura por
   altitud (estética de instrumento). La cumbre se renderiza arriba: se asciende. */
export default function AscentLayers({ levels, lang = "es" }: { levels: AscentLevel[]; lang?: Lang }) {
  const levelWord = lang === "en" ? "LEVEL" : "NIVEL";
  const summitWord = lang === "en" ? " · SUMMIT" : " · CUMBRE";
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(el); } }),
      { threshold: 0.2, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cumbre arriba: se ordena de mayor a menor índice. La altitud crece al subir.
  const ordered = levels
    .map((lv, i) => ({ lv, alt: String(i + 1).padStart(2, "0"), top: i === levels.length - 1 }))
    .reverse();

  return (
    <div ref={ref} className={inView ? "al-wrap al-in" : "al-wrap"} style={{ perspective: "1600px" }}>
      <div className="al-scene">
        <span aria-hidden="true" className="al-axis" />
        {ordered.map(({ lv, alt, top }, vi) => (
          <article
            key={lv.n}
            className={`al-layer${top ? " al-summit" : ""}`}
            style={{ ["--c" as string]: lv.c, ["--d" as string]: `${vi * 120}ms` }}
          >
            <div className="al-stage" aria-hidden="true">
              <span className="al-disc" />
              <span className="al-ripple" />
              <span className="al-beam" />
              <span className="al-node"><Glyph name={lv.g} size={top ? 20 : 17} strokeWidth={1.6} /></span>
            </div>
            <div className="al-body">
              <div className="al-meta">
                <span className="al-tag">{lv.tag}</span>
                <span className="al-alt" aria-hidden="true">
                  <span className="al-alt-ticks" />{levelWord} {alt}{top ? summitWord : ""}
                </span>
              </div>
              <h3 className="al-title">{lv.n}</h3>
              <p className="al-desc">{lv.p}</p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .al-wrap { position: relative; }
        .al-scene { position: relative; display: flex; flex-direction: column; gap: clamp(22px,3vw,44px); transform-style: preserve-3d; }

        /* eje luminoso que une los horizontes (cumbre violeta → base cyan) */
        .al-axis {
          position: absolute; left: 59px; top: 24px; bottom: 24px; width: 2px; margin-left: -1px;
          background: linear-gradient(180deg, var(--change-violet), var(--human-pink) 52%, var(--signal-cyan));
          opacity: 0; transform: scaleY(0); transform-origin: top center;
          box-shadow: 0 0 14px color-mix(in srgb, var(--soft-violet) 50%, transparent);
          transition: opacity .6s var(--ease-premium), transform 1.1s var(--ease-premium);
        }
        .al-in .al-axis { opacity: .6; transform: scaleY(1); }

        .al-layer {
          position: relative; display: grid; grid-template-columns: 120px 1fr; gap: clamp(18px,2.4vw,34px);
          align-items: center; opacity: 0; transform: translateY(18px);
          transition: opacity .7s var(--d,0ms) var(--ease-premium), transform .7s var(--d,0ms) var(--ease-premium);
        }
        .al-in .al-layer { opacity: 1; transform: translateY(0); }

        .al-stage { position: relative; width: 120px; height: 100px; display: flex; align-items: center; justify-content: center; transform-style: preserve-3d; }

        /* plataforma-horizonte: disco inclinado en perspectiva */
        .al-disc {
          position: absolute; left: 50%; top: 56%; width: 104px; height: 104px; margin: -52px 0 0 -52px;
          border-radius: 50%; border: 1.5px solid var(--c);
          background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--c) 26%, transparent), transparent 68%);
          box-shadow: 0 0 26px color-mix(in srgb, var(--c) 36%, transparent), inset 0 0 20px color-mix(in srgb, var(--c) 20%, transparent);
          transform: rotateX(64deg) scale(.5); opacity: 0;
          transition: transform .85s var(--d,0ms) var(--ease-premium), opacity .85s var(--d,0ms) var(--ease-premium);
        }
        .al-in .al-disc { transform: rotateX(64deg) scale(1); opacity: 1; }

        /* anillo que respira sobre la plataforma */
        .al-ripple {
          position: absolute; left: 50%; top: 56%; width: 104px; height: 104px; margin: -52px 0 0 -52px;
          border-radius: 50%; border: 1px solid var(--c); transform: rotateX(64deg) scale(1); opacity: 0; pointer-events: none;
        }

        /* haz vertical del nodo a la plataforma */
        .al-beam {
          position: absolute; left: 50%; top: 14px; width: 2px; height: 44px; margin-left: -1px;
          background: linear-gradient(180deg, transparent, var(--c)); opacity: 0;
          transition: opacity .6s calc(var(--d,0ms) + 240ms) var(--ease-premium);
        }
        .al-in .al-beam { opacity: .5; }

        /* nodo que flota sobre el horizonte */
        .al-node {
          position: relative; z-index: 2; width: 46px; height: 46px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center; color: #fff;
          background: color-mix(in srgb, var(--c) 24%, var(--surface-dark));
          border: 1.5px solid var(--c);
          box-shadow: 0 0 0 5px var(--surface-dark), 0 10px 26px color-mix(in srgb, var(--c) 42%, transparent);
          transform: translateY(-14px);
        }

        .al-summit .al-disc, .al-summit .al-ripple { width: 124px; height: 124px; margin: -62px 0 0 -62px; }
        .al-summit .al-node { width: 54px; height: 54px; transform: translateY(-16px); }

        .al-body { padding: 2px 0; }
        .al-meta { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 9px; }
        .al-tag {
          font: 600 var(--text-meta) var(--font-mono); letter-spacing: .12em; text-transform: uppercase;
          color: color-mix(in srgb, var(--c) 58%, #fff);
        }
        .al-alt {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 var(--text-meta) var(--font-mono); letter-spacing: .14em; text-transform: uppercase;
          color: rgba(255,255,255,.5);
        }
        .al-alt-ticks { width: 22px; height: 7px; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,.45) 0 1px, transparent 1px 5px); }
        .al-title { margin: 0; font: 600 clamp(20px,1.9vw,26px)/1.06 var(--font-primary); letter-spacing: -.03em; color: #fff; }
        .al-summit .al-title { font-size: clamp(22px,2.1vw,29px); }
        .al-desc { margin: 11px 0 0; max-width: 60ch; font: 400 14.5px/1.55 var(--font-primary); color: rgba(255,255,255,.8); }

        .al-summit .al-node { animation: al-pulse 3.6s var(--ease-premium) infinite; }
        .al-in .al-summit .al-ripple { animation: al-ripple 3.6s var(--ease-premium) infinite; }
        @keyframes al-pulse {
          0%,100% { box-shadow: 0 0 0 5px var(--surface-dark), 0 10px 26px color-mix(in srgb, var(--c) 42%, transparent); }
          50% { box-shadow: 0 0 0 5px var(--surface-dark), 0 0 34px color-mix(in srgb, var(--c) 62%, transparent); }
        }
        @keyframes al-ripple {
          0% { transform: rotateX(64deg) scale(1); opacity: .5; }
          70%,100% { transform: rotateX(64deg) scale(1.5); opacity: 0; }
        }

        @media (max-width: 720px) {
          .al-axis { display: none; }
          .al-layer { grid-template-columns: 1fr; gap: 8px; justify-items: start; }
          .al-stage { width: 100px; height: 84px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .al-axis { opacity: .6; transform: scaleY(1); }
          .al-disc { opacity: 1; transform: rotateX(64deg) scale(1); }
          .al-beam { opacity: .5; }
          .al-summit .al-node, .al-summit .al-ripple { animation: none; }
        }
      `}</style>
    </div>
  );
}
