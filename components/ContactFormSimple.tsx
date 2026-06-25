"use client";

import { useState, useRef } from "react";

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  font: "600 12px/1 var(--font-mono)",
  letterSpacing: ".1em",
  textTransform: "uppercase" as const,
  color: "var(--text-muted)",
  marginBottom: 8,
};

const INPUT_STYLE: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "12px 14px",
  font: "400 15px/1.4 var(--font-primary)",
  color: "var(--ink-graphite)",
  background: "var(--field-surface, #fff)",
  border: "1px solid var(--field-outline, rgba(46,46,51,.18))",
  borderRadius: 0,
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color .15s ease",
};

export default function ContactFormSimple() {
  const [nombre, setNombre] = useState("");
  const [organizacion, setOrganizacion] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const loadedAt = useRef<number>(typeof Date !== "undefined" ? Date.now() : 0);

  function validate(): string | null {
    if (!nombre.trim() || nombre.trim().length < 2) return "Escribe tu nombre, por favor.";
    if (!correo.trim() || !correo.includes("@") || !correo.includes(".")) return "Revisa el formato del correo.";
    if (!mensaje.trim() || mensaje.trim().length < 20) return "Cuéntanos un poco más sobre lo que necesitas.";
    if (mensaje.trim().length > 2000) return "El mensaje es demasiado largo. Resúmelo un poco más.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setErrorMsg(err); return; }
    setErrorMsg("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contacto-simple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          organizacion: organizacion.trim(),
          correo: correo.trim(),
          mensaje: mensaje.trim(),
          website: hp,
          lt: typeof Date !== "undefined" ? Date.now() - loadedAt.current : 99999,
        }),
      });
      const data = await res.json() as { ok: boolean; error?: string };
      if (data.ok) {
        setStatus("ok");
      } else {
        setErrorMsg(data.error ?? "No se pudo enviar. Intenta de nuevo.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Hubo un problema de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div style={{ padding: "48px 0", textAlign: "center" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "var(--change-violet)", margin: "0 auto 20px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <p style={{ margin: "0 0 8px", font: "600 18px/1.3 var(--font-primary)", letterSpacing: "-.02em", color: "var(--ink-graphite)" }}>Tu mensaje llegó.</p>
        <p style={{ margin: 0, font: "400 14px/1.6 var(--font-primary)", color: "var(--text-muted)", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>El board lo lee. Si hay alineación para trabajar juntos, te buscamos en menos de dos días hábiles.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Honeypot — invisible para humanos, visible para bots */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
        <label htmlFor="website-field">Sitio web</label>
        <input id="website-field" name="website" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={e => setHp(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label htmlFor="cf-nombre" style={LABEL_STYLE}>Nombre</label>
          <input
            id="cf-nombre"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={INPUT_STYLE}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--change-violet)"; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--field-outline, rgba(46,46,51,.18))"; }}
          />
        </div>
        <div>
          <label htmlFor="cf-org" style={LABEL_STYLE}>Organización <span style={{ font: "400 11px var(--font-primary)", letterSpacing: 0, textTransform: "none", color: "var(--text-faint)" }}>(opcional)</span></label>
          <input
            id="cf-org"
            type="text"
            autoComplete="organization"
            maxLength={120}
            placeholder="Empresa o institución"
            value={organizacion}
            onChange={e => setOrganizacion(e.target.value)}
            style={INPUT_STYLE}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--change-violet)"; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--field-outline, rgba(46,46,51,.18))"; }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-correo" style={LABEL_STYLE}>Correo</label>
        <input
          id="cf-correo"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          placeholder="correo@organizacion.com"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          style={INPUT_STYLE}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--change-violet)"; }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--field-outline, rgba(46,46,51,.18))"; }}
        />
      </div>

      <div>
        <label htmlFor="cf-mensaje" style={LABEL_STYLE}>Mensaje</label>
        <textarea
          id="cf-mensaje"
          required
          rows={5}
          maxLength={2000}
          placeholder="Cuéntanos brevemente qué decisión enfrentas o qué tensión quieres trabajar."
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 120 }}
          onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--change-violet)"; }}
          onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--field-outline, rgba(46,46,51,.18))"; }}
        />
        <span style={{ display: "block", marginTop: 6, font: "400 11.5px var(--font-mono)", color: "var(--text-faint)", letterSpacing: ".04em" }}>{mensaje.length}/2000</span>
      </div>

      {errorMsg && (
        <p role="alert" style={{ margin: 0, font: "400 13.5px/1.45 var(--font-primary)", color: "var(--warning, #C0392B)", padding: "10px 14px", background: "rgba(192,57,43,.06)", border: "1px solid rgba(192,57,43,.18)" }}>
          {errorMsg}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary"
          style={{ opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "wait" : "pointer" }}
        >
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </button>
        <span style={{ font: "400 12px/1.45 var(--font-mono)", color: "var(--text-faint)", letterSpacing: ".04em" }}>Sin pitch automático. Sin propuesta cerrada.</span>
      </div>

      <style>{`
        @media (max-width: 560px) {
          form > div:first-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
