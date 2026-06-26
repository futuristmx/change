"use client";

import type { ReactNode, FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Status = "idle" | "submitting" | "info";

const FIELD_LABEL: React.CSSProperties = {
  display: "block",
  font: "600 11px var(--font-mono)",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "rgba(240,244,255,.72)",
  marginBottom: 8,
};

const FIELD: React.CSSProperties = {
  width: "100%",
  height: 48,
  padding: "0 14px",
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.18)",
  color: "#F0F1F5",
  font: "400 15px var(--font-primary)",
  letterSpacing: "-0.005em",
  outline: "none",
  transition: "border-color var(--duration-standard) var(--ease-premium), background var(--duration-standard) var(--ease-premium)",
};

function FieldRow({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>{children}</div>;
}

export default function MissionControlLoginPage() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // No backend conectado: simulamos validación y mostramos el mensaje
    // institucional. Esto proyecta el sistema sin engañar al usuario.
    window.setTimeout(() => setStatus("info"), 700);
  }

  return (
    <div className="change-dark" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface-dark)" }}>
      <main
        id="main-content"
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 80% 15%, rgba(109,59,255,.22) 0%, rgba(109,59,255,0) 42%)," +
            "radial-gradient(circle at 12% 80%, rgba(89,184,217,.16) 0%, rgba(89,184,217,0) 38%)," +
            "linear-gradient(180deg, var(--surface-dark) 0%, var(--surface-dark-secondary) 100%)",
          display: "grid",
          placeItems: "center",
          padding: "clamp(36px,5vw,72px) clamp(20px,4vw,48px) clamp(56px,6vw,84px)",
        }}
      >
        {/* Layout split: branding izquierda · form derecha */}
        <div
          className="mcl-shell"
          style={{
            width: "100%",
            maxWidth: 1080,
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(380px,460px)",
            gap: "clamp(48px,6vw,96px)",
            alignItems: "center",
          }}
        >
          {/* ── Branding column ── */}
          <div>
            <Link href="/" aria-label="Change · Inicio" style={{ display: "block", width: "fit-content", marginBottom: 30 }}>
              <Image
                src="/assets/change_icon_white.svg"
                alt="Change"
                width={56}
                height={56}
                priority
                style={{ height: 54, width: "auto", display: "block" }}
              />
            </Link>

            <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: 11, marginBottom: 24, padding: "7px 14px", border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.04)" }}>
              <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
              <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>Mission Control · Memoria Viva</span>
            </div>

            <h1 style={{ margin: "0 0 18px", maxWidth: "14ch", font: "600 clamp(34px,4.4vw,58px)/1.0 var(--font-primary)", letterSpacing: "-.045em", color: "#fff", textWrap: "balance" }}>
              Acceso exclusivo a Mission Control
            </h1>
            <p style={{ margin: 0, maxWidth: "46ch", font: "400 clamp(15px,1.3vw,18px)/1.55 var(--font-primary)", color: "rgba(240,244,255,.72)" }}>
              Mission Control sostiene el porqué de cada decisión que el board acompaña. Si tu organización es cliente de Change, tu acceso fue entregado en la primera sesión de trabajo.
            </p>

            <ul style={{ margin: "32px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Conexión cifrada extremo a extremo.",
                "Autenticación de dos factores en cada inicio de sesión.",
                "Sesiones expiran tras 20 minutos de inactividad.",
              ].map((t) => (
                <li key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start", font: "400 13.5px/1.5 var(--font-primary)", color: "rgba(240,244,255,.62)" }}>
                  <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 6, width: 6, height: 6, borderRadius: "50%", background: "var(--soft-violet)" }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Form card ── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              position: "relative",
              padding: "clamp(32px,3.5vw,44px) clamp(28px,3vw,40px)",
              background: "var(--gradient-dark-card-violet, linear-gradient(150deg,#241845 0%,#181B30 56%,#10131F 100%))",
              border: "1px solid rgba(138,108,255,.24)",
              boxShadow: "var(--shadow-dark-card-violet, 0 24px 60px rgba(0,0,0,.5))",
            }}
          >
            <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "var(--divider-ethereal-dark)" }} />

            <span style={{ display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--lavender-mist)" }}>
              Iniciar sesión
            </span>
            <h2 style={{ margin: "8px 0 28px", font: "600 clamp(22px,2.2vw,28px)/1.15 var(--font-primary)", letterSpacing: "-.025em", color: "#fff" }}>
              Bienvenida al sistema.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <FieldRow>
                <label htmlFor="mcl-user" style={FIELD_LABEL}>Usuario o correo</label>
                <input
                  id="mcl-user"
                  name="user"
                  type="text"
                  autoComplete="username"
                  placeholder="nombre@organizacion.com"
                  style={FIELD}
                  required
                />
              </FieldRow>

              <FieldRow>
                <label htmlFor="mcl-pwd" style={FIELD_LABEL}>Contraseña</label>
                <input
                  id="mcl-pwd"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  style={FIELD}
                  required
                />
              </FieldRow>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "400 13px var(--font-primary)", color: "rgba(240,244,255,.72)", cursor: "pointer" }}>
                  <input type="checkbox" name="remember" style={{ accentColor: "var(--change-violet)", width: 14, height: 14 }} />
                  Mantener sesión por 8 horas
                </label>
                <a href="#" style={{ font: "600 12.5px var(--font-mono)", letterSpacing: ".06em", color: "var(--lavender-mist)", textDecoration: "underline", textUnderlineOffset: 3 }} onClick={(e) => { e.preventDefault(); setStatus("info"); }}>
                  ¿Olvidaste tu acceso?
                </a>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn btn-primary"
                style={{ width: "100%", height: 50, marginTop: 8, opacity: status === "submitting" ? 0.72 : 1 }}
              >
                {status === "submitting" ? "Validando…" : "Entrar al sistema"}
              </button>

              {/* SSO separator */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 0" }}>
                <span aria-hidden="true" style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)" }} />
                <span style={{ font: "600 10.5px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(240,244,255,.5)" }}>O usa SSO corporativo</span>
                <span aria-hidden="true" style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)" }} />
              </div>

              <button
                type="button"
                onClick={() => setStatus("info")}
                className="btn btn-secondary"
                style={{ width: "100%", height: 48 }}
              >
                Continuar con SSO
              </button>

              {/* Mensaje de estado — sutil, profesional */}
              {status === "info" && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: 4,
                    padding: "14px 16px",
                    border: "1px solid rgba(138,108,255,.32)",
                    background: "rgba(109,59,255,.10)",
                    color: "rgba(240,244,255,.88)",
                    font: "400 13.5px/1.5 var(--font-primary)",
                  }}
                >
                  <strong style={{ display: "block", marginBottom: 4, font: "600 12.5px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--lavender-mist)" }}>Acceso restringido</strong>
                  El sistema está en transición a SSO empresarial. Para tu acceso temporal, contacta al board en{" "}
                  <a href="mailto:board@change.live" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 3 }}>board@change.live</a>.
                </div>
              )}
            </div>

            <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ font: "600 10.5px var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(240,244,255,.5)" }}>v1.4 · Memoria Viva</span>
              <Link href="/mission-control" style={{ font: "400 12.5px var(--font-primary)", color: "rgba(240,244,255,.62)" }}>← Volver a Mission Control</Link>
            </div>
          </form>
        </div>

        <p style={{ position: "absolute", bottom: 24, left: 0, right: 0, margin: 0, padding: "0 20px", textAlign: "center", font: "400 11.5px/1.5 var(--font-mono)", letterSpacing: ".06em", color: "rgba(240,244,255,.42)" }}>
          Cualquier intento de acceso no autorizado queda registrado · Change Intelligence
        </p>
      </main>

      <style>{`
        @media (max-width: 880px) {
          .mcl-shell { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        #main-content input:focus,
        #main-content input:focus-visible {
          border-color: var(--soft-violet) !important;
          background: rgba(255,255,255,.07) !important;
          outline: 2px solid var(--soft-violet);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
