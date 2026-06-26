"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { Toast } from "@/components/ds";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

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
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "var(--field-label)",
  marginBottom: 9,
};

const HELP: React.CSSProperties = {
  display: "block",
  margin: "0 0 9px",
  font: "400 13px/1.45 var(--font-primary)",
  color: "var(--text-muted)",
};

const ERR: React.CSSProperties = {
  margin: "7px 0 0",
  font: "400 12.5px var(--font-primary)",
  color: "var(--status-error-fg)",
};

/* Las 5 preguntas que estructuran cualquier reto */
const PREGUNTAS = [
  { name: "cambio", label: "¿Qué está cambiando a tu alrededor?", help: "Una señal del mercado, una nueva regla, un competidor, una conducta del cliente que antes no veías.", ph: "Ej. Un competidor nuevo cambió la forma en que el cliente compra y nuestro modelo empezó a sentirse lento.", area: true, req: true },
  { name: "decision", label: "¿Qué decisión está atorada?", help: "La que no termina de tomarse. Descríbela como la dirías en voz alta, sin pulir.", ph: "Ej. Si rediseñamos la oferta completa o protegemos lo que ya funciona un año más.", area: true, req: true },
  { name: "costo", label: "¿Qué pasa si no se decide?", help: "Lo que se erosiona, lo que se pierde, lo que otro decide por ti si tú no lo haces.", ph: "Ej. Llegamos tarde a la nueva categoría y el margen sigue cayendo sin que sepamos por qué.", area: true, req: false },
  { name: "sostiene", label: "¿Quién tiene que sostener esta decisión?", help: "No quién la firma: quién la carga después.", ph: "Ej. Dirección general y el equipo comercial, que ejecutan el giro.", area: false, req: false },
  { name: "horizonte", label: "¿Qué horizonte importa aquí?", help: "No el ideal: el plazo que de verdad pesa.", ph: "Ej. Algo antes de cierre de año; el efecto real se juega a 24 meses.", area: false, req: false },
];

const Q: Record<string, string> = {
  cambio: "Qué está cambiando",
  decision: "Decisión atorada",
  costo: "Qué pasa si no se decide",
  sostiene: "Quién la sostiene",
  horizonte: "Horizonte",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value.trim() ?? "";

    const next: Errors = {};
    if (!get("cambio")) next.cambio = "Cuéntanos qué se está moviendo.";
    if (get("decision").length < 6) next.decision = "Describe la decisión que está atorada.";
    if (get("nombre").length < 2) next.nombre = "Tu nombre y rol, por favor.";

    // Construir la decisión estructurada a partir de las 5 preguntas
    const decision = PREGUNTAS
      .map((p) => ({ q: Q[p.name], a: get(p.name) }))
      .filter((x) => x.a)
      .map((x) => `${x.q}: ${x.a}`)
      .join("\n\n")
      .slice(0, 2000);

    const payload = {
      nombre: get("nombre"),
      email: get("email"),
      organizacion: get("organizacion"),
      decision,
      website: get("website"),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      if (fe.email?.[0]) next.email = fe.email[0];
      if (fe.nombre?.[0] && !next.nombre) next.nombre = fe.nombre[0];
      if (fe.decision?.[0] && !next.decision) next.decision = fe.decision[0];
    }
    if (Object.keys(next).length) { setErrors(next); return; }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.success ? parsed.data : payload),
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
      <>
        <div style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: "clamp(32px,4vw,48px)" }} role="status" aria-live="polite">
          <span style={{ font: "600 11px var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--success)" }}>Recibido</span>
          <h3 style={{ margin: "14px 0 10px", font: "600 clamp(22px,2.4vw,30px)/1.05 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>
            Listo. Tu decisión llegó.
          </h3>
          <p style={{ margin: 0, font: "400 15.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
            La estamos leyendo y te buscamos pronto con una primera estructura del reto. Mientras tanto, no necesitas hacer nada más.
          </p>
        </div>
        <Toast
          open
          tone="success"
          title="Listo. Tu decisión llegó."
          description="La estamos leyendo. Te buscamos pronto con una primera estructura del reto."
          onClose={() => setStatus("idle")}
        />
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {PREGUNTAS.map((p) => (
        <div key={p.name}>
          <label htmlFor={p.name} style={LABEL}>{p.label}</label>
          <span style={HELP}>{p.help}</span>
          {p.area ? (
            <textarea id={p.name} name={p.name} rows={3} aria-invalid={!!errors[p.name]} style={{ ...FIELD_BASE, resize: "vertical", lineHeight: 1.5 }} placeholder={p.ph} />
          ) : (
            <input id={p.name} name={p.name} type="text" aria-invalid={!!errors[p.name]} style={FIELD_BASE} placeholder={p.ph} />
          )}
          {errors[p.name] && <p style={ERR}>{errors[p.name]}</p>}
        </div>
      ))}

      <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 22 }}>
        <span style={{ ...LABEL, color: "var(--text-faint)", marginBottom: 16 }}>Con quién trabajamos esto</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label htmlFor="nombre" style={LABEL}>Nombre y rol</label>
            <input id="nombre" name="nombre" type="text" autoComplete="name" aria-invalid={!!errors.nombre} style={FIELD_BASE} placeholder="Cómo te llamas y qué decides" />
            {errors.nombre && <p style={ERR}>{errors.nombre}</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="cf-row">
            <div>
              <label htmlFor="organizacion" style={LABEL}>Organización</label>
              <input id="organizacion" name="organizacion" type="text" autoComplete="organization" style={FIELD_BASE} placeholder="Tu empresa" />
            </div>
            <div>
              <label htmlFor="email" style={LABEL}>Correo</label>
              <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} style={FIELD_BASE} placeholder="tu@empresa.com" />
              {errors.email && <p style={ERR}>{errors.email}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 4 }}>
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ opacity: status === "submitting" ? 0.7 : 1 }}>
          {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
        </button>
        {status === "error" && (
          <span style={{ font: "400 13.5px var(--font-primary)", color: "var(--status-error-fg)" }}>
            Algo falló al enviar. Intenta de nuevo en un momento.
          </span>
        )}
      </div>

      <style>{`@media (max-width: 620px){ .cf-row { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
}
