import type React from "react";
import Link from "next/link";
import Image from "next/image";
import EtherealDivider from "@/components/ds/EtherealDivider";
import InlineTooltip from "@/components/ds/InlineTooltip";
import LanguageToggle from "@/components/LanguageToggle";
import { type Lang, localizeHref } from "@/lib/i18n";

const COL_HEADER: React.CSSProperties = {
  font: "700 11px var(--font-secondary)",
  letterSpacing: ".18em",
  textTransform: "uppercase",
  color: "rgba(240,244,255,.55)",
  marginBottom: 16,
};

const COL_LINK: React.CSSProperties = {
  font: "400 14px var(--font-primary)",
  color: "rgba(240,244,255,.8)",
  display: "block",
  paddingBottom: 2,
};

const COL_A = [
  { es: "Inicio", en: "Home", href: "/" },
  { es: "Método", en: "Method", href: "/capacidades" },
  { es: "Mission Control", en: "Mission Control", href: "/mission-control" },
  { es: "Casos", en: "Cases", href: "/casos" },
  { es: "Contacto", en: "Contact", href: "/contacto" },
];
const COL_B = [
  { es: "Equipo", en: "Team", href: "/equipo" },
  { es: "Field Notes", en: "Field Notes", href: "/field-notes" },
  { es: "Futuro", en: "Future", href: "/futuro" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/change.innovation/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/changeconsulting/" },
];

const T = {
  es: {
    explore: "Explorar", firm: "Firma", social: "Redes", decision: "Decisión",
    taglinePre: "Inteligencia estratégica para", term: "capacidad de futuro",
    tip: "La capacidad de tomar mejores decisiones antes de que la certeza llegue. Es la condición para actuar cuando el entorno cambia.",
    decisionLead: "Trae una tensión real. Sal con un primer diagnóstico.",
    cta: "Trabajar una decisión →",
    copy: "© 2026 Change · Inteligencia estratégica para capacidad de futuro",
    country: "México",
  },
  en: {
    explore: "Explore", firm: "Firm", social: "Social", decision: "Decision",
    taglinePre: "Strategic intelligence for", term: "Future Capacity",
    tip: "The capacity to make better decisions before certainty arrives — what lets an organization act when the context shifts.",
    decisionLead: "Bring a real tension. Leave with a first diagnosis.",
    cta: "Work on a decision →",
    copy: "© 2026 Change · Strategic intelligence for Future Capacity",
    country: "Mexico",
  },
};

export default function Footer({ lang = "es" }: { lang?: Lang }) {
  const t = T[lang];
  return (
    <footer className="change-dark" style={{ background: "var(--gradient-dark-pearl)", color: "rgba(240,244,255,.8)" }}>
      <EtherealDivider dark />
      <div style={{ width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))", margin: "0 auto", padding: "clamp(120px,14vw,180px) 0 clamp(64px,7vw,90px)" }}>
        <div className="ch-foot" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr", gap: 36, alignItems: "start" }}>
          {/* Columna A — identidad */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Link href={localizeHref("/", lang)} aria-label="Change" style={{ display: "block", marginBottom: 20 }}>
              <Image
                src="/assets/change_logo_white.svg"
                alt="Change"
                width={156}
                height={38}
                loading="lazy"
                style={{ height: "clamp(32px,3.5vw,38px)", width: "auto", display: "block" }}
              />
            </Link>
            <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-primary)", color: "rgba(240,244,255,.65)", whiteSpace: "nowrap" }}>
              {t.taglinePre}{" "}
              <InlineTooltip content={t.tip}>
                {t.term}
              </InlineTooltip>
            </p>
          </div>

          {/* Columna B — Explorar */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={COL_HEADER}>{t.explore}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {COL_A.map((l) => (
                <Link key={l.href} href={localizeHref(l.href, lang)} className="ch-foot-link" style={COL_LINK}>{lang === "en" ? l.en : l.es}</Link>
              ))}
            </div>
          </div>

          {/* Columna C — Firma */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={COL_HEADER}>{t.firm}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {COL_B.map((l) => (
                <Link key={l.href} href={localizeHref(l.href, lang)} className="ch-foot-link" style={COL_LINK}>{lang === "en" ? l.en : l.es}</Link>
              ))}
            </div>
          </div>

          {/* Columna D — Redes */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={COL_HEADER}>{t.social}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {SOCIAL.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="ch-foot-link" style={COL_LINK}>{s.label}</a>
              ))}
            </div>
          </div>

          {/* Columna E — Decisión */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={COL_HEADER}>{t.decision}</div>
            <p style={{ margin: "0 0 16px", font: "400 13px/1.5 var(--font-primary)", color: "rgba(240,244,255,.65)" }}>
              {t.decisionLead}
            </p>
            <Link href={localizeHref("/contacto", lang)} className="ch-foot-link" style={{ ...COL_LINK, font: "600 13px var(--font-primary)" }}>
              {t.cta}
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", marginTop: "clamp(80px,9vw,120px)", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <span style={{ font: "400 12.5px var(--font-primary)", color: "rgba(240,244,255,.5)" }}>{t.copy}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <LanguageToggle variant="dark" />
            <span style={{ font: "700 10px var(--font-secondary)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(240,244,255,.35)" }}>{t.country}</span>
          </div>
        </div>
      </div>

      <style>{`
        .ch-foot-link { transition: color .15s ease; }
        .ch-foot-link:hover { color: rgba(240,244,255,1) !important; }
        @media (max-width: 980px) { .ch-foot { grid-template-columns: 1fr 1fr !important; gap: 36px 28px !important; } }
        @media (max-width: 520px) {
          .ch-foot { grid-template-columns: 1fr !important; }
          .ch-foot > div:first-child { order: 1; }
          .ch-foot > div:last-child { order: 2; }
        }
      `}</style>
    </footer>
  );
}
