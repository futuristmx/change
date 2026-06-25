import Link from "next/link";
import Image from "next/image";

const COL_A = [
  { label: "Método", href: "/capacidades" },
  { label: "Mission Control", href: "/mission-control" },
  { label: "Casos", href: "/casos" },
];
const COL_B = [
  { label: "Equipo", href: "/equipo" },
  { label: "Field Notes", href: "/field-notes" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink-graphite)", color: "rgba(240,244,255,.8)" }}>
      <div style={{ width: "min(1340px, calc(100% - clamp(40px,8vw,128px)))", margin: "0 auto", padding: "72px 0 44px" }}>
        <div className="ch-foot" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 36 }}>
          <div>
            <Link href="/" aria-label="Change" style={{ display: "block", marginBottom: 20 }}>
              <Image src="/assets/change_logo_white.svg" alt="Change" width={120} height={30} style={{ height: 30, width: "auto", display: "block" }} />
            </Link>
            <p style={{ margin: 0, maxWidth: 290, font: "400 14px/1.6 var(--font-primary)", color: "rgba(240,244,255,.8)" }}>
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

          <div>
            <div style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(240,244,255,.8)", marginBottom: 16 }}>Empieza por una decisión</div>
            <Link href="/contacto" className="btn btn-primary btn-sm">Simular una decisión</Link>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", marginTop: 52, paddingTop: 26, borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ font: "400 12.5px var(--font-primary)", color: "rgba(240,244,255,.8)" }}>© 2026 Change · Inteligencia estratégica</span>
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(240,244,255,.8)" }}>México</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .ch-foot { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </footer>
  );
}
