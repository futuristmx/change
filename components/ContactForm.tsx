"use client";

import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const FIELD_BASE: React.CSSProperties = {
  width: "100%",
  background: "var(--field-surface)",
  border: "1px solid var(--field-outline)",
  boxShadow: "var(--field-shadow)",
  color: "var(--field-text)",
  font: "400 16px var(--font-primary)",
  padding: "13px 15px",
  outline: "none",
  borderRadius: 0,
};

const LABEL: React.CSSProperties = {
  display: "block",
  font: "600 11px var(--font-mono)",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--field-label)",
  marginBottom: 9,
};

const ERR: React.CSSProperties = {
  margin: "7px 0 0",
  font: "400 12.5px var(--font-primary)",
  color: "var(--status-error-fg)",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      organizacion: (form.elements.namedItem("organizacion") as HTMLInputElement).value,
      decision: (form.elements.namedItem("decision") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const next: FieldErrors = {};
      (Object.keys(fieldErrors) as (keyof ContactInput)[]).forEach((k) => {
        const msg = fieldErrors[k]?.[0];
        if (msg) next[k] = msg;
      });
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: "clamp(32px,4vw,48px)" }}>
        <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--success)" }}>Recibido</span>
        <h3 style={{ margin: "14px 0 10px", font: "600 clamp(22px,2.4vw,30px)/1.05 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>
          Gracias. Tu decisión está en buenas manos.
        </h3>
        <p style={{ margin: 0, font: "400 15.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
          Te escribimos pronto para agendar una primera lectura. No vendemos una solución: revelamos qué decisión necesita estructura.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <label htmlFor="nombre" style={LABEL}>Nombre</label>
        <input id="nombre" name="nombre" type="text" autoComplete="name" aria-invalid={!!errors.nombre} style={FIELD_BASE} placeholder="Tu nombre" />
        {errors.nombre && <p style={ERR}>{errors.nombre}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="cf-row">
        <div>
          <label htmlFor="email" style={LABEL}>Correo</label>
          <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} style={FIELD_BASE} placeholder="tu@empresa.com" />
          {errors.email && <p style={ERR}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="organizacion" style={LABEL}>Organización <span style={{ color: "var(--text-faint)", letterSpacing: 0, textTransform: "none" }}>(opcional)</span></label>
          <input id="organizacion" name="organizacion" type="text" autoComplete="organization" style={FIELD_BASE} placeholder="Tu empresa" />
        </div>
      </div>

      <div>
        <label htmlFor="decision" style={LABEL}>¿Qué decisión difícil traes?</label>
        <textarea id="decision" name="decision" rows={5} aria-invalid={!!errors.decision} style={{ ...FIELD_BASE, resize: "vertical", lineHeight: 1.5 }} placeholder="Describe la decisión que está pidiendo estructura…" />
        {errors.decision && <p style={ERR}>{errors.decision}</p>}
      </div>

      {/* honeypot — hidden from humans */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 4 }}>
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ opacity: status === "submitting" ? 0.7 : 1 }}>
          {status === "submitting" ? "Enviando…" : "Trabajar una decisión"}
        </button>
        {status === "error" && (
          <span style={{ font: "400 13.5px var(--font-primary)", color: "var(--status-error-fg)" }}>
            Algo falló al enviar. Intenta de nuevo o escríbenos a andres@change.live.
          </span>
        )}
      </div>

      <style>{`@media (max-width: 620px){ .cf-row { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
}
