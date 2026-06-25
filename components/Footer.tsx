import Link from "next/link";
import Image from "next/image";
import EtherealDivider from "@/components/ds/EtherealDivider";

const COL_A = [
  { label: "Método", href: "/capacidades" },
  { label: "Mission Control", href: "/mission-control" },
  { label: "Casos", href: "/casos" },
];
const COL_B = [
  { label: "Equipo", href: "/equipo" },
  { label: "Field Notes", href: "/field-notes" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/change.innovation/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/changeconsulting/" },
];

export default function Footer() {
  return (
    <footer className="change-dark" style={{ background: "var(--gradient-dark-pearl)", color: "rgba(240,244,255,.8)" }}>
      <EtherealDivider dark />
      <div style={{ width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))", margin: "0 auto", padding: "clamp(120px,14vw,180px) 0 clamp(64px,7vw,90px)" }}>
        <div className="ch-foot" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 36 }}>
          <div>
            <Link href="/" aria-label="Change" style={{ display: "block", marginBottom: 24 }}>
              <Image src="/assets/change_logo_white.svg" alt="Change" width={120} height={30} loading="lazy" style={{ height: 30, width: "auto", display: "block" }} />
            </Link>
            <p style={{ margin: 0, font: "400 14px/1.5 var(--font-primary)", color: "rgba(240,244,255,.8)", whiteSpace: "nowrap" }}>
              La certeza dejó de ser condición para actuar.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(240,244,255,.8)", marginBottom: 4 }}>Explorar</div>
            {COL_A.map((l) => (
              <Link key={l.href} href={l.href} style={{ font: "400 14px var(--font-primary)", color: "rgba(240,244,255,.8)" }}>{l.label}</Link>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(240,244,255,.8)", marginBottom: 4 }}>Firma</div>
            {COL_B.map((l) => (
              <Link key={l.href} href={l.href} style={{ font: "400 14px var(--font-primary)", color: "rgba(240,244,255,.8)" }}>{l.label}</Link>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(240,244,255,.8)", marginBottom: 4 }}>Redes</div>
            {SOCIAL.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ font: "400 14px var(--font-primary)", color: "rgba(240,244,255,.8)" }}>{s.label}</a>
            ))}
          </div>

          <div>
            <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(240,244,255,.8)", marginBottom: 16 }}>Empieza por una decisión</div>
            <Link href="/contacto" className="btn btn-primary btn-sm">Simular una decisión</Link>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", marginTop: "clamp(80px,9vw,120px)", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "400 12.5px var(--font-primary)", color: "rgba(240,244,255,.8)" }}>© 2026 Change · Inteligencia estratégica para capacidad de futuro</span>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(240,244,255,.8)" }}>México</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .ch-foot { grid-template-columns: 1fr 1fr !important; gap: 28px !important; } }
        @media (max-width: 520px) { .ch-foot { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
