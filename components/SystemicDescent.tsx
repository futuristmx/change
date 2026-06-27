"use client";

import { useEffect, useRef, useState } from "react";
import { type Lang } from "@/lib/i18n";

interface Level {
  k: string;
  scale: string;
  color: string;
  width: string;
  p: string;
}

const LEVELS_ES: Level[] = [
  { k: "Época", scale: "Lo macro", color: "var(--signal-cyan)", width: "100%", p: "La certeza dejó de llegar antes de las decisiones importantes. Se decide con información incompleta, señales contradictorias y ventanas que se cierran rápido." },
  { k: "Contexto", scale: "Lo competitivo", color: "var(--soft-violet)", width: "82%", p: "Las empresas crecen más rápido que sus sistemas para decidir. El negocio suma frentes y sube lo que está en juego, pero la forma de pensar el rumbo sigue siendo la de antes." },
  { k: "Organización", scale: "Lo interno", color: "var(--change-violet)", width: "64%", p: "La operación avanza, pero el aprendizaje no se sostiene. Se decide, se ejecuta y se sigue, sin retener por qué se decidió así. Cada coyuntura empieza de cero." },
];

const LEVELS_EN: Level[] = [
  { k: "Era", scale: "The macro", color: "var(--signal-cyan)", width: "100%", p: "Certainty stopped arriving before the decisions that matter. You decide with incomplete information, contradictory signals and windows that close fast." },
  { k: "Context", scale: "The competitive", color: "var(--soft-violet)", width: "82%", p: "Companies grow faster than their systems for deciding. The business adds fronts and raises the stakes, but the way it thinks about direction is still the old one." },
  { k: "Organization", scale: "The internal", color: "var(--change-violet)", width: "64%", p: "Operations move forward, but learning doesn't hold. You decide, execute and move on, without retaining why you decided that way. Every turn starts from zero." },
];

const DECISION_ES = {
  k: "La decisión que te toca",
  p: "La pregunta deja de ser «¿qué está pasando en el mundo?» y se vuelve «¿qué hacemos el lunes?». Ahí es donde Change trabaja: en el punto exacto donde una tensión amplia se vuelve una decisión concreta.",
};
const DECISION_EN = {
  k: "The decision that's yours to make",
  p: "The question stops being “what's happening in the world?” and becomes “what do we do on Monday?”. That's where Change works: at the exact point where a broad tension becomes a concrete decision.",
};

const HUD_UI = {
  es: { radar: "RADAR · TENSIÓN", live: "EN VIVO" },
  en: { radar: "RADAR · TENSION", live: "LIVE" },
};

/* ── Radar de tensiones — scope vectorial vivo ──
   Anillos de contención (macro → propio) con malla de instrumento, barrido vivo,
   contactos que titilan y un área de spread con relleno gradiente que se contrae
   al descender hacia el centro: la decisión concreta. Instrumento, no adorno. */
const CX = 200, CY = 200;
const polar = (deg: number, r: number): [number, number] => {
  const a = (deg - 90) * Math.PI / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};
const fmt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

const RINGS = [150, 112, 74, 36];
const SPOKES = Array.from({ length: 6 }, (_, i) => i * 60);
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);
const HEX = Array.from({ length: 6 }, (_, i) => polar(i * 60, 100).map((n) => n.toFixed(1)).join(",")).join(" ");
const FOCUS = [1.42, 1.04, 0.64, 0.18];
const COLORS = ["var(--signal-cyan)", "var(--soft-violet)", "var(--change-violet)", "var(--success)"];
const META_ES = [
  { scale: "MACRO", name: "Época · lo macro" },
  { scale: "COMPETITIVO", name: "Contexto · lo competitivo" },
  { scale: "INTERNO", name: "Organización · lo interno" },
  { scale: "DECISIÓN", name: "La decisión que te toca" },
];
const META_EN = [
  { scale: "MACRO", name: "Era · the macro" },
  { scale: "COMPETITIVE", name: "Context · the competitive" },
  { scale: "INTERNAL", name: "Organization · the internal" },
  { scale: "DECISION", name: "The decision that's yours" },
];
/* contactos del scope [ángulo°, radio] y enlaces entre ellos */
const CONTACTS: Array<[number, number]> = [[25, 118], [82, 88], [150, 134], [212, 66], [268, 104], [320, 92], [122, 150]];
const LINKS: Array<[number, number]> = [[0, 2], [1, 4], [3, 5]];

function DescentFigure({ active, lang }: { active: number; lang: Lang }) {
  const consolidated = active === 3;
  const META = lang === "en" ? META_EN : META_ES;
  const hud = HUD_UI[lang];
  const meta = META[active] ?? META[0]!;
  const areaColor = COLORS[active] ?? "var(--signal-cyan)";
  const focus = FOCUS[active] ?? 1;

  return (
    <div className="sd-figure" style={{ position: "relative", width: "100%", maxWidth: 480, margin: "0 auto", aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 400 400" width="100%" height="100%" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <radialGradient id="sd-area" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--change-violet)" stopOpacity="0.34" />
            <stop offset="55%" stopColor="var(--soft-violet)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--signal-cyan)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sd-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--change-violet)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--change-violet)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sd-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--change-violet)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--change-violet)" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="sd-ringgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--signal-cyan)" />
            <stop offset="100%" stopColor="var(--change-violet)" />
          </linearGradient>
          <radialGradient id="sd-core-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--change-violet-300)" />
            <stop offset="100%" stopColor="var(--change-violet)" />
          </radialGradient>
          <radialGradient id="sd-core-validated" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--success) 55%, white)" />
            <stop offset="100%" stopColor="var(--success)" />
          </radialGradient>
        </defs>

        {/* HUD — corchetes de esquina */}
        <g stroke="var(--soft-stone-gray)" strokeWidth="1.2" fill="none" opacity="0.7">
          <path d="M12 38 V12 H38" /><path d="M362 12 H388 V38" />
          <path d="M388 362 V388 H362" /><path d="M38 388 H12 V362" />
        </g>

        {/* ticks de perímetro */}
        <g stroke="var(--soft-stone-gray)">
          {TICKS.map((deg) => {
            const major = deg % 30 === 0;
            const [x1, y1] = polar(deg, 150);
            const [x2, y2] = polar(deg, major ? 162 : 156);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={major ? 1.3 : 0.8} opacity={major ? 0.55 : 0.28} />;
          })}
        </g>

        {/* radios */}
        <g stroke="var(--soft-stone-gray)" strokeWidth="0.8" opacity="0.2">
          {SPOKES.map((deg) => { const [x, y] = polar(deg, 150); return <line key={deg} x1={CX} y1={CY} x2={x} y2={y} />; })}
        </g>

        {/* anillos de contención — el activo se enciende con gradiente */}
        {RINGS.map((r, i) => {
          const on = i === active;
          return (
            <circle key={i} cx={CX} cy={CY} r={r} fill="none"
              stroke={on ? "url(#sd-ringgrad)" : "var(--soft-stone-gray)"}
              strokeWidth={on ? 1.8 : 1}
              style={{ opacity: on ? 1 : 0.22, transition: "opacity .55s var(--ease-premium)" }} />
          );
        })}

        {/* barrido vivo — sector con relleno gradiente + haz líder */}
        <g className="sd-sweep">
          <path d={`M${CX} ${CY} L${fmt(polar(0, 150))} A150 150 0 0 1 ${fmt(polar(54, 150))} Z`} fill="url(#sd-sweep)" />
          <line x1={CX} y1={CY} x2={polar(0, 150)[0]} y2={polar(0, 150)[1]} stroke="url(#sd-beam)" strokeWidth="1.6" />
        </g>

        {/* contactos del scope + enlaces */}
        <g>
          {LINKS.map(([a, b], i) => {
            const ca = CONTACTS[a], cb = CONTACTS[b];
            if (!ca || !cb) return null;
            const [x1, y1] = polar(ca[0], ca[1]);
            const [x2, y2] = polar(cb[0], cb[1]);
            return <line key={`l-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 ? "var(--soft-violet)" : "var(--signal-cyan)"} strokeWidth="0.9" className="sd-link" style={{ animationDelay: `${(i * 1.9).toFixed(1)}s` }} />;
          })}
          {CONTACTS.map(([deg, r], i) => {
            const [x, y] = polar(deg, r);
            return <circle key={`c-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.8} fill={i % 2 ? "var(--signal-cyan)" : "var(--soft-violet)"} className="sd-contact" style={{ animationDelay: `${(i * 0.7).toFixed(1)}s`, animationDuration: `${3.4 + (i % 4) * 1.1}s` }} />;
          })}
        </g>

        {/* área de spread — relleno gradiente que se contrae al descender */}
        <polygon className="sd-area" points={HEX} fill="url(#sd-area)" stroke={areaColor} strokeWidth="1.4" strokeOpacity="0.65"
          style={{ transform: `scale(${focus})`, transition: "transform .6s var(--ease-premium), stroke .5s var(--ease-premium)" }} />

        {/* núcleo — la decisión; se ilumina al llegar a lo interno */}
        <circle cx={CX} cy={CY} r="7" fill="url(#sd-core-g)"
          style={{ opacity: consolidated ? 0 : (active === 2 ? 1 : 0.4), transition: "opacity .55s var(--ease-premium)" }} />

        {/* consolidación — la decisión se valida: sonar + núcleo verde */}
        {consolidated && (
          <g className="sd-consol">
            <circle cx={CX} cy={CY} r="20" fill="none" stroke="var(--success)" strokeWidth="1.5" className="sd-sonar" />
            <circle cx={CX} cy={CY} r="20" fill="none" stroke="var(--success)" strokeWidth="1.4" className="sd-sonar" style={{ animationDelay: "1.3s" }} />
            <circle cx={CX} cy={CY} r="10" fill="url(#sd-core-validated)" className="sd-core-val" />
          </g>
        )}
      </svg>

      {/* HUD — lectura tipo instrumento */}
      <div className="sd-hud" aria-hidden="true">
        <span className="sd-hud-tl"><span className="sd-hud-dot" />{hud.radar}</span>
        <span className="sd-hud-tr">0{active + 1} / 04</span>
        <span className="sd-hud-bl"><strong style={{ color: consolidated ? "var(--success)" : "var(--ink-graphite)" }}>{meta.scale}</strong><em>{meta.name}</em></span>
        <span className="sd-hud-br"><span className="sd-hud-live" />{hud.live}</span>
      </div>

      <style>{`
        .sd-area { transform-box: view-box; transform-origin: 200px 200px; }
        .sd-sweep { transform-box: view-box; transform-origin: 200px 200px; animation: sd-rotate 7s linear infinite; }
        @keyframes sd-rotate { to { transform: rotate(360deg); } }
        .sd-contact { opacity: .2; animation-name: sd-contact; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes sd-contact { 0%,100% { opacity: .12; } 50% { opacity: .85; } }
        .sd-link { opacity: .1; animation: sd-link 6.5s ease-in-out infinite; }
        @keyframes sd-link { 0%,100% { opacity: .06; } 50% { opacity: .34; } }
        .sd-consol { animation: sd-consol-in .5s var(--ease-premium); }
        @keyframes sd-consol-in { from { opacity: 0; } to { opacity: 1; } }
        .sd-sonar { transform-box: view-box; transform-origin: 200px 200px; animation: sd-sonar 2.8s ease-out infinite; }
        @keyframes sd-sonar { 0% { transform: scale(.5); opacity: .65; } 100% { transform: scale(2.2); opacity: 0; } }
        .sd-core-val { animation: sd-coreval 2.8s var(--ease-premium) infinite; }
        @keyframes sd-coreval { 0%,100% { opacity: .85; } 50% { opacity: 1; } }

        .sd-hud { position: absolute; inset: 0; pointer-events: none; }
        .sd-hud span { position: absolute; font-family: var(--font-mono); }
        .sd-hud-tl { top: 2px; left: 4px; display: inline-flex; align-items: center; gap: 7px; font: 600 11px var(--font-mono); letter-spacing: .14em; color: var(--text-muted); }
        .sd-hud-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--signal-cyan); animation: sd-live 2.4s ease-in-out infinite; }
        .sd-hud-tr { top: 2px; right: 4px; font: 600 11px var(--font-mono); letter-spacing: .12em; color: var(--ink-graphite); }
        .sd-hud-bl { bottom: 0; left: 4px; display: flex; flex-direction: column; gap: 3px; }
        .sd-hud-bl strong { font: 700 13px var(--font-mono); letter-spacing: .16em; transition: color .5s var(--ease-premium); }
        .sd-hud-bl em { font: 600 11px var(--font-mono); font-style: normal; letter-spacing: .05em; color: var(--text-faint); }
        .sd-hud-br { bottom: 4px; right: 4px; display: inline-flex; align-items: center; gap: 7px; font: 600 11px var(--font-mono); letter-spacing: .14em; color: var(--text-muted); }
        .sd-hud-live { width: 6px; height: 6px; border-radius: 50%; background: var(--success); animation: sd-live 2s ease-in-out infinite; }
        @keyframes sd-live { 0%,100% { opacity: 1; } 50% { opacity: .3; } }

        @media (prefers-reduced-motion: reduce) {
          .sd-sweep, .sd-contact, .sd-link, .sd-sonar, .sd-core-val, .sd-hud-dot, .sd-hud-live { animation: none !important; }
          .sd-contact { opacity: .4; } .sd-link { opacity: .2; } .sd-sonar { display: none; } .sd-core-val { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function SystemicDescent({ lang = "es" }: { lang?: Lang }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const LEVELS = lang === "en" ? LEVELS_EN : LEVELS_ES;
  const DECISION = lang === "en" ? DECISION_EN : DECISION_ES;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(el); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="sd-wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(340px,500px)", gap: "clamp(32px,5vw,72px)", alignItems: "center", maxWidth: 1180, margin: "0 auto" }}>
      <div className="sd-stack" style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* rail vertical animado */}
        <div aria-hidden="true" className="sd-rail" style={{ position: "absolute", left: 21, top: 26, bottom: 92, width: 2, background: "var(--line-structural)", opacity: 0.4 }} />
        <div aria-hidden="true" className="sd-rail" style={{ position: "absolute", left: 21, top: 26, height: inView ? "calc(100% - 118px)" : 0, width: 2, background: "linear-gradient(180deg,var(--signal-cyan),var(--change-violet))", transition: "height var(--duration-line) var(--ease-premium)" }} />

        {LEVELS.map((lv, i) => {
          const on = i === active;
          return (
            <button
              key={lv.k}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={on}
              className="sd-level"
              style={{
                position: "relative", width: lv.width, minWidth: 280, textAlign: "left", border: "1px solid var(--border-subtle)",
                borderLeft: `3px solid ${on ? lv.color : "var(--border-subtle)"}`,
                background: on ? "#fff" : "rgba(255,255,255,.7)", cursor: "pointer", padding: "22px 26px 22px 52px",
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity .5s ${i * 130}ms, transform .5s ${i * 130}ms var(--ease-premium), border-color .3s, background .3s, width .4s var(--ease-premium), box-shadow .2s var(--ease-premium)`,
                fontFamily: "var(--font-primary)",
              }}
            >
              <span aria-hidden="true" style={{ position: "absolute", left: 12, top: 24, width: 18, height: 18, borderRadius: "50%", background: lv.color, boxShadow: on ? `0 0 0 5px #fff, 0 0 0 9px ${lv.color}22` : "0 0 0 5px #fff", transform: on ? "scale(1.1)" : "scale(1)", transition: "transform .3s" }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, font: "600 clamp(20px,2vw,28px) var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>{lv.k}</h3>
                <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{lv.scale}</span>
              </div>
              <p style={{ margin: "10px 0 0", font: "400 14.5px/1.55 var(--font-primary)", color: on ? "var(--text-muted)" : "var(--text-faint)", transition: "color .3s var(--ease-premium)" }}>{lv.p}</p>
            </button>
          );
        })}

        {/* nodo terminal — la decisión concreta */}
        <div
          className="sd-decision"
          role="button"
          tabIndex={0}
          aria-pressed={active === 3}
          onMouseEnter={() => setActive(3)}
          onClick={() => setActive(3)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(3); } }}
          style={{ position: "relative", width: "62%", minWidth: 300, marginTop: 12, cursor: "pointer", outline: "none", border: "1px solid var(--change-violet)", borderLeft: "3px solid var(--change-violet)", background: "color-mix(in srgb, var(--change-violet) 5%, #fff)", padding: "24px 28px 26px 52px", opacity: inView ? 1 : 0, boxShadow: active === 3 ? "0 0 0 1px var(--success), 0 10px 30px color-mix(in srgb, var(--success) 16%, transparent)" : "none", transition: "opacity .6s .5s, width .4s var(--ease-premium), box-shadow .4s var(--ease-premium)" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: 11, top: 26, width: 20, height: 20, borderRadius: "50%", background: "var(--change-violet)", boxShadow: "0 0 0 5px #fff, 0 6px 18px rgba(109,59,255,.3)" }} />
          <span aria-hidden="true" style={{ position: "absolute", left: 19, top: -14, fontSize: 18, color: "var(--change-violet)" }}>↓</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}><span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--change-violet)" }} />{DECISION.k}</span>
          <p style={{ margin: "10px 0 0", font: "400 15px/1.6 var(--font-primary)", color: "var(--deep-warm-gray)" }}>{DECISION.p}</p>
        </div>
      </div>

      {/* figura — sticky en su columna para acompañar el scroll */}
      <div className="sd-figcol" style={{ position: "sticky", top: 100, alignSelf: "center" }}>
        <DescentFigure active={active} lang={lang} />
      </div>

      <style>{`
        .sd-level:hover { box-shadow: 0 8px 24px rgba(46,46,51,.09); border-color: color-mix(in srgb, var(--ink-graphite) 16%, transparent); }
        @media (max-width: 920px) {
          .sd-wrap { grid-template-columns: 1fr !important; gap: 36px !important; }
          .sd-figcol { position: static !important; order: -1; }
          .sd-figure { max-width: 360px !important; }
          .sd-level, .sd-decision { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
