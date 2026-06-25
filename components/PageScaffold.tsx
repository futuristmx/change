import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SignalField } from "@/components/ds";

/**
 * GradientTitle — utilidad para hero titles con dos gradientes inline.
 * Pasa `pre` (línea 1 con gradient neutral o claro) y `accent` (frase
 * destacada con el gradient distintivo de la página). El usuario quiere
 * variedad entre páginas y sin azul/cyan.
 */
export function GradientTitle({
  pre,
  accent,
  preGradient = "var(--gradient-type-neutral-pulse)",
  accentGradient,
}: {
  pre: string;
  accent: string;
  preGradient?: string;
  accentGradient: string;
}) {
  return (
    <>
      <span style={{ background: preGradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{pre}</span>{" "}
      <span style={{ background: accentGradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{accent}</span>
    </>
  );
}

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

interface PageScaffoldProps {
  kicker: string;
  /** Plain string OR JSX (para títulos con gradientes inline). */
  title: React.ReactNode;
  lead: string;
  /** optional dark hero (Mission Control) */
  dark?: boolean;
  /** ambient SignalField behind the hero */
  ambient?: boolean;
  children?: React.ReactNode;
}

/**
 * Shared page shell for inner pages. The hero is real (ported titles);
 * `children` carries page-specific content. Used by the V1 inner pages
 * until each gets its full port in Fase 2.
 */
export default function PageScaffold({ kicker, title, lead, dark = false, ambient = false, children }: PageScaffoldProps) {
  const heroBg = dark
    ? "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 22%, transparent),transparent 40%),linear-gradient(180deg,var(--surface-dark) 0%,var(--surface-dark-secondary) 100%)"
    : "radial-gradient(110% 80% at 84% -10%,rgba(138,108,255,.14) 0%,rgba(89,184,217,.06) 32%,rgba(255,255,255,0) 58%),linear-gradient(180deg,#FFFFFF 0%,var(--pure-white) 70%,var(--warm-haze) 100%)";
  const titleColor = dark ? "#fff" : "var(--ink-graphite)";
  const leadColor = dark ? "rgba(255,255,255,.8)" : "var(--ink-graphite)";
  const kickerColor = dark ? "rgba(255,255,255,.8)" : "var(--text-muted)";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header always outside the dark wrapper so its CSS vars stay in light-mode context */}
      <Header />
      <div className={dark ? "change-dark" : undefined} style={{ flex: 1, display: "flex", flexDirection: "column", background: dark ? "var(--surface-dark)" : "var(--surface-page)" }}>
      <main id="main-content" style={{ flex: 1 }}>
        <section style={{ position: "relative", overflow: "hidden", background: heroBg }}>
          {ambient && <SignalField />}
          <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(96px,13vw,170px) 0 clamp(64px,8vw,110px)" }}>
            <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 28 }}>
              <span data-pulse={dark ? "" : undefined} style={{ width: 7, height: 7, borderRadius: dark ? "50%" : 0, background: dark ? "var(--signal-cyan)" : "var(--change-violet)" }} />
              <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: kickerColor }}>{kicker}</span>
            </Reveal>
            <Reveal delay={60} as="h1" style={{ margin: 0, maxWidth: "20ch", font: "600 clamp(40px,6vw,86px)/.94 var(--font-primary)", letterSpacing: "-.05em", color: titleColor, textWrap: "balance" }}>{title}</Reveal>
            <Reveal delay={120} as="p" style={{ margin: "30px 0 0", maxWidth: "54ch", font: "400 clamp(18px,1.6vw,23px)/1.5 var(--font-primary)", letterSpacing: "-.02em", color: leadColor }}>{lead}</Reveal>
          </div>
        </section>

        {children ?? (
          <section style={{ borderTop: dark ? "1px solid rgba(255,255,255,.1)" : "1px solid var(--border-subtle)", background: dark ? "transparent" : "var(--gradient-sky-pearl)" }}>
            <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(80px,10vw,140px) 0" }}>
              <Reveal style={{ border: dark ? "1px solid rgba(255,255,255,.12)" : "1px solid var(--border-subtle)", background: dark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.8)", padding: "clamp(40px,6vw,72px)", textAlign: "center" }}>
                <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "var(--soft-violet)" : "var(--change-violet)" }}>Próximamente</span>
                <h2 style={{ margin: "16px auto 0", maxWidth: "24ch", font: "600 clamp(26px,3vw,42px)/1.05 var(--font-primary)", letterSpacing: "-.04em", color: titleColor }}>Esta sección se está construyendo a detalle.</h2>
                <p style={{ margin: "16px auto 32px", maxWidth: "46ch", font: "400 16px/1.6 var(--font-primary)", color: dark ? "rgba(255,255,255,.8)" : "var(--text-muted)" }}>
                  El contenido completo llega en la siguiente fase. Mientras tanto, puedes empezar por una conversación.
                </p>
                <Link href="/contacto" className={dark ? "btn btn-light" : "btn btn-primary"}>Trabajar una decisión</Link>
              </Reveal>
            </div>
          </section>
        )}
      </main>
      <Footer />
      </div>
    </div>
  );
}
