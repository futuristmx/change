"use client";

import { useState } from "react";
import Link from "next/link";
import {
  scoreCapacity, buildScorePayload, DIMENSIONS, DIMENSION_META,
  type Answers, type AnswerValue, type Dimension,
} from "@/lib/capacity-score";
import { track } from "@/lib/telemetry";

const OPTIONS: { v: AnswerValue; label: string }[] = [
  { v: 0, label: "Casi nunca" },
  { v: 1, label: "A veces" },
  { v: 2, label: "Casi siempre" },
  { v: 3, label: "De forma sistemática" },
];

const DIM_COLOR: Record<Dimension, string> = {
  leer: "var(--signal-cyan)",
  interpretar: "var(--soft-violet)",
  decidir: "var(--change-violet)",
  disenar: "var(--change-violet)",
  sostener: "var(--ink-graphite)",
};

const FIELD: React.CSSProperties = {
  width: "100%", background: "var(--field-surface)", border: "1px solid var(--field-outline)",
  color: "var(--field-text)", font: "400 15px var(--font-primary)", padding: "11px 14px", outline: "none", borderRadius: 0,
};
const FLABEL: React.CSSProperties = {
  display: "block", font: "600 11px var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase",
  color: "var(--field-label)", marginBottom: 8,
};

type Phase = "intro" | "quiz" | "result" | "sent";

export default function CapacityScore() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);

  const result = scoreCapacity(answers);
  const dim = DIMENSIONS[step];

  const start = () => { track("score_started"); setPhase("quiz"); setStep(0); };

  const answer = (v: AnswerValue) => {
    const next = { ...answers, [dim]: v };
    setAnswers(next);
    track("score_dimension_answered", { dimension: dim, value: v });
    window.setTimeout(() => {
      if (step < DIMENSIONS.length - 1) {
        setStep(step + 1);
      } else {
        const r = scoreCapacity(next);
        if (r.status === "ok") track("score_completed", { total: r.total, level: r.level, weakest: r.weakest });
        setPhase("result");
        track("score_result_viewed");
      }
    }, 260);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const get = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value.trim() ?? "";
    track("score_submit_requested");
    setSending(true);
    try {
      await fetch("/api/score", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildScorePayload(answers, result, {
          nombre: get("nombre"), organizacion: get("organizacion"), email: get("email"), decision: get("decision"),
        })),
      });
      track("score_submitted", result.status === "ok" ? { level: result.level, weakest: result.weakest } : undefined);
      setPhase("sent");
    } catch {
      setPhase("sent"); // el resultado ya es del usuario; no bloqueamos
    } finally {
      setSending(false);
    }
  }

  /* ── marco común ── */
  const Shell = ({ children, kicker }: { children: React.ReactNode; kicker: string }) => (
    <div style={{ maxWidth: 760, margin: "0 auto", border: "1px solid var(--border-subtle)", background: "var(--surface-card)", boxShadow: "0 30px 80px rgba(31,17,72,.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 26px", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
          <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--change-violet)" }} />Score de Capacidad de Futuro
        </span>
        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>{kicker}</span>
      </div>
      <div style={{ padding: "clamp(28px,4vw,44px)" }}>{children}</div>
    </div>
  );

  if (phase === "intro") {
    return (
      <Shell kicker="5 preguntas">
        <h3 style={{ margin: 0, font: "600 clamp(24px,2.8vw,36px)/1.08 var(--font-primary)", letterSpacing: "-.04em", color: "var(--ink-graphite)", textWrap: "balance" }}>
          ¿Qué tan lista está tu organización para actuar cuando no hay certeza?
        </h3>
        <p style={{ margin: "16px 0 28px", maxWidth: "54ch", font: "400 16px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>
          Cinco preguntas sobre las cinco capacidades del método: leer, interpretar, decidir, diseñar y sostener. Un diagnóstico parcial pero útil en dos minutos. Sin datos personales hasta que tú decidas.
        </p>
        <button onClick={start} className="btn btn-primary">Empezar el diagnóstico</button>
      </Shell>
    );
  }

  if (phase === "quiz") {
    const meta = DIMENSION_META[dim];
    const current = answers[dim];
    return (
      <Shell kicker={`${step + 1} de ${DIMENSIONS.length}`}>
        {/* progreso */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {DIMENSIONS.map((d, i) => (
            <span key={d} style={{ flex: 1, height: 3, background: i <= step ? "var(--change-violet)" : "var(--border-subtle)", transition: "background .3s" }} />
          ))}
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
          <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: DIM_COLOR[dim] }} />{meta.label}
        </span>
        <h3 style={{ margin: "14px 0 26px", font: "600 clamp(21px,2.2vw,28px)/1.2 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)", textWrap: "balance" }}>{meta.question}</h3>
        <div role="radiogroup" aria-label={meta.question} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {OPTIONS.map((o) => {
            const on = current === o.v;
            return (
              <button key={o.v} onClick={() => answer(o.v)} role="radio" aria-checked={on}
                style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer", width: "100%",
                  border: `1px solid ${on ? "var(--change-violet)" : "var(--border-subtle)"}`, background: on ? "color-mix(in srgb, var(--change-violet) 5%, #fff)" : "#fff",
                  padding: "14px 18px", font: "400 15.5px var(--font-primary)", color: "var(--ink-graphite)", transition: "border-color .2s, background .2s" }}>
                <span aria-hidden="true" style={{ flexShrink: 0, width: 16, height: 16, borderRadius: "50%", border: `2px solid ${on ? "var(--change-violet)" : "var(--soft-stone-gray)"}`, background: on ? "var(--change-violet)" : "transparent", boxShadow: on ? "inset 0 0 0 2px #fff" : "none", transition: "all .2s" }} />
                {o.label}
              </button>
            );
          })}
        </div>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{ marginTop: 22, background: "transparent", border: 0, cursor: "pointer", font: "500 13.5px var(--font-primary)", color: "var(--text-muted)" }}>← Anterior</button>
        )}
      </Shell>
    );
  }

  if (phase === "result" && result.status === "ok") {
    const r = result;
    return (
      <Shell kicker="Tu diagnóstico">
        <div className="cs-result" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(24px,4vw,44px)", alignItems: "center", marginBottom: 30 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ font: "300 clamp(56px,9vw,88px)/.9 var(--font-secondary)", background: "var(--gradient-type-electric)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{r.total}</div>
            <div style={{ marginTop: 4, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-faint)" }}>de 100</div>
          </div>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-graphite)" }}><span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--change-violet)" }} />Nivel · {r.levelLabel}</span>
            <p style={{ margin: "8px 0 0", font: "400 16px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{r.levelBlurb}</p>
          </div>
        </div>

        {/* barras por dimensión */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {DIMENSIONS.map((d) => {
            const weak = d === r.weakest;
            return (
              <div key={d} style={{ display: "grid", gridTemplateColumns: "104px 1fr 36px", gap: 12, alignItems: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
                  <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: DIM_COLOR[d] }} />{DIMENSION_META[d].label}
                </span>
                <span style={{ height: 8, background: "var(--surface-inset)", position: "relative", overflow: "hidden" }}>
                  <span style={{ position: "absolute", inset: "0 auto 0 0", width: `${r.byDimension[d]}%`, background: weak ? "var(--warning)" : "linear-gradient(90deg,var(--signal-cyan),var(--change-violet))", transition: "width .6s var(--ease-premium)" }} />
                </span>
                <span style={{ font: "600 13px var(--font-mono)", color: "var(--text-muted)", textAlign: "right" }}>{r.byDimension[d]}</span>
              </div>
            );
          })}
        </div>

        {/* punto más vulnerable + primer movimiento */}
        <div style={{ border: "1px solid var(--border-subtle)", borderLeft: "3px solid var(--warning)", background: "var(--gradient-sky-pearl)", padding: "22px 24px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-graphite)" }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--warning)" }} />Tu punto más vulnerable · {r.weakestLabel}
          </span>
          <p style={{ margin: "12px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--deep-warm-gray)" }}><strong style={{ fontWeight: 600, color: "var(--ink-graphite)" }}>Riesgo:</strong> {r.risk}</p>
          <p style={{ margin: "8px 0 0", font: "400 15px/1.55 var(--font-primary)", color: "var(--deep-warm-gray)" }}><strong style={{ fontWeight: 600, color: "var(--ink-graphite)" }}>Primer movimiento:</strong> {r.firstMove}</p>
        </div>

        <p style={{ margin: "20px 0 0", font: "400 13px/1.5 var(--font-primary)", color: "var(--text-faint)" }}>Este diagnóstico es parcial: una conversación la vuelve precisa. No promete certeza — la trabaja.</p>

        {!showForm ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <Link href="/contacto" onClick={() => track("score_cta_contacto")} className="btn btn-primary">Trabajar esta decisión con Change</Link>
            <button onClick={() => { setShowForm(true); track("score_submit_requested"); }} className="btn btn-secondary">Enviarme mi resultado</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate style={{ marginTop: 26, paddingTop: 24, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0, font: "400 14px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>Te enviamos tu diagnóstico y, si quieres, trabajamos tu punto vulnerable. Solo lo que escribas aquí se guarda.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="cs-frow">
              <div><label htmlFor="s-nombre" style={FLABEL}>Nombre y rol</label><input id="s-nombre" name="nombre" style={FIELD} placeholder="Cómo te llamas" /></div>
              <div><label htmlFor="s-org" style={FLABEL}>Organización</label><input id="s-org" name="organizacion" style={FIELD} placeholder="Tu empresa" /></div>
            </div>
            <div><label htmlFor="s-email" style={FLABEL}>Correo</label><input id="s-email" name="email" type="email" required style={FIELD} placeholder="tu@empresa.com" /></div>
            <div><label htmlFor="s-dec" style={FLABEL}>¿Qué decisión trabajarías primero? <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-faint)" }}>(opcional)</span></label><textarea id="s-dec" name="decision" rows={2} style={{ ...FIELD, resize: "vertical" }} placeholder="La decisión que más te pesa hoy…" /></div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
            <button type="submit" disabled={sending} className="btn btn-primary" style={{ alignSelf: "flex-start", opacity: sending ? 0.7 : 1 }}>{sending ? "Enviando…" : "Enviar mi resultado"}</button>
          </form>
        )}

        <style>{`@media (max-width:560px){ .cs-result{ grid-template-columns:1fr !important; text-align:center } .cs-frow{ grid-template-columns:1fr !important } }`}</style>
      </Shell>
    );
  }

  if (phase === "sent") {
    return (
      <Shell kicker="Recibido">
        <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--success)" }}>Listo</span>
        <h3 style={{ margin: "14px 0 10px", font: "600 clamp(22px,2.4vw,30px)/1.08 var(--font-primary)", letterSpacing: "-.03em", color: "var(--ink-graphite)" }}>Tu diagnóstico está en camino.</h3>
        <p style={{ margin: 0, maxWidth: "48ch", font: "400 15.5px/1.6 var(--font-primary)", color: "var(--text-muted)" }}>Te escribimos pronto. Si quieres, ya puedes traer tu punto vulnerable a una primera conversación — sin compromiso.</p>
        <div style={{ marginTop: 22 }}><Link href="/contacto" onClick={() => track("score_cta_contacto")} className="btn btn-primary">Trabajar esta decisión con Change</Link></div>
      </Shell>
    );
  }

  return null;
}
