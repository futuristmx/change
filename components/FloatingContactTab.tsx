"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const COPY = {
  es: {
    aria: "Contacto rápido con Change",
    label: "Change",
    eyebrow: "Hablemos",
    heading: "Déjanos tu correo y te buscamos para platicar cómo podemos ayudarte.",
    placeholder: "tu@organización.com",
    send: "Enviar",
    sending: "Enviando…",
    okTitle: "Gracias.",
    okBody: "Te escribimos pronto para platicar.",
    close: "Cerrar",
    invalid: "Revisa tu correo.",
    open: "Abrir contacto rápido",
  },
  en: {
    aria: "Quick contact with Change",
    label: "Change",
    eyebrow: "Let's talk",
    heading: "Leave your email and we'll reach out to explore how we can help.",
    placeholder: "you@organization.com",
    send: "Send",
    sending: "Sending…",
    okTitle: "Thank you.",
    okBody: "We'll be in touch soon to talk.",
    close: "Close",
    invalid: "Check your email.",
    open: "Open quick contact",
  },
};

export default function FloatingContactTab() {
  const path = usePathname() || "/";
  const isEn = path === "/en" || path.startsWith("/en/");
  const t = isEn ? COPY.en : COPY.es;

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const ref = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const loadedAt = useRef<number>(typeof Date !== "undefined" ? Date.now() : 0);

  // Cerrar con Escape · clic fuera
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    const f = window.setTimeout(() => inputRef.current?.focus(), 480);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("mousedown", onClick); window.clearTimeout(f); };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v || !v.includes("@") || !v.includes(".")) { setStatus("error"); return; }
    setStatus("sending");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: v, source: path, website: hp, lt: Date.now() - loadedAt.current }),
      });
      setStatus("ok");
    } catch {
      setStatus("ok"); // no bloqueamos al usuario por un fallo de red
    }
  }

  return (
    <aside ref={ref} className={`fct${open ? " fct-open" : ""}`} aria-label={t.aria}>
      <div className="fct-panel" id="fct-panel" role="region" inert={!open ? true : undefined}>
        <div className="fct-inner">
          {status === "ok" ? (
            <div className="fct-ok" role="status" aria-live="polite">
              <span className="fct-ok-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--text-inverse)" }} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <strong className="fct-ok-title">{t.okTitle}</strong>
              <span className="fct-ok-body">{t.okBody}</span>
            </div>
          ) : (
            <>
              <span className="fct-eyebrow">{t.eyebrow}</span>
              <p className="fct-heading">{t.heading}</p>
              <form onSubmit={submit} noValidate className="fct-form">
                {/* honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
                <div className="fct-row">
                  <input
                    ref={inputRef}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder={t.placeholder}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                    className="fct-input"
                    aria-label={t.placeholder}
                  />
                  <button type="submit" className="fct-submit" disabled={status === "sending"} aria-label={t.send}>
                    {status === "sending" ? (
                      <span className="fct-spin" aria-hidden="true" />
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
                    )}
                  </button>
                </div>
                {status === "error" && <span className="fct-err" role="alert">{t.invalid}</span>}
              </form>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        className="fct-handle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="fct-panel"
        aria-label={open ? t.close : t.open}
      >
        <Image src="/assets/change_icon_white.svg" alt="" width={24} height={24} className="fct-swirl" style={{ width: 24, height: 24 }} />
        <span className="fct-vlabel" aria-hidden="true">{t.label}</span>
        <span className="fct-chev" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </span>
      </button>

      <style>{`
        .fct {
          position: fixed; right: 0; top: 50%; transform: translateY(-50%);
          z-index: 58; display: flex; align-items: center;
          --fctw: min(330px, 86vw);
          font-family: var(--font-primary);
        }
        /* ── Handle vertical ── */
        .fct-handle {
          all: unset; box-sizing: border-box; cursor: pointer;
          width: 46px; min-height: 138px;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 16px 0 14px;
          background: linear-gradient(180deg, color-mix(in srgb, var(--change-violet) 38%, var(--surface-dark)) 0%, var(--surface-dark) 70%, var(--surface-dark-secondary) 100%);
          border: 1px solid rgba(255,255,255,.12); border-right: none;
          box-shadow: -10px 0 36px rgba(10,12,20,.42);
          color: rgba(255,255,255,.85);
          transition: background var(--duration-premium) var(--ease-premium), box-shadow var(--duration-premium) var(--ease-premium);
        }
        .fct-handle:hover { background: linear-gradient(180deg, color-mix(in srgb, var(--change-violet) 52%, var(--surface-dark)) 0%, var(--surface-dark) 72%, var(--surface-dark-secondary) 100%); box-shadow: -12px 0 44px rgba(109,59,255,.28); }
        .fct-handle:focus-visible { outline: 2px solid var(--soft-violet); outline-offset: 2px; }
        .fct-swirl { display: block; opacity: .96; }
        .fct-vlabel {
          writing-mode: vertical-rl; transform: rotate(180deg);
          font: 700 12px var(--font-secondary); letter-spacing: .22em; text-transform: uppercase;
          color: rgba(255,255,255,.82);
        }
        .fct-chev { display: inline-flex; color: var(--change-violet-300); transition: transform var(--duration-enter) var(--ease-premium); }
        .fct-open .fct-chev { transform: rotate(180deg); }

        /* ── Panel expansible ── */
        .fct-panel {
          display: flex; justify-content: flex-end; overflow: hidden;
          width: 0;
          background: linear-gradient(150deg, color-mix(in srgb, var(--change-violet) 16%, var(--surface-dark)) 0%, var(--surface-dark) 52%, var(--surface-dark-secondary) 100%);
          border: 1px solid rgba(138,108,255,.22); border-right: none;
          box-shadow: -22px 0 60px rgba(10,12,20,.5);
          transition: width var(--duration-enter) var(--ease-premium);
        }
        .fct-open .fct-panel { width: var(--fctw); }
        .fct-inner {
          flex: 0 0 auto; width: var(--fctw); box-sizing: border-box;
          padding: clamp(20px,2.4vw,28px) clamp(20px,2.4vw,26px);
          display: flex; flex-direction: column; justify-content: center;
          opacity: 0; transform: translateX(14px);
          transition: opacity var(--duration-enter) var(--ease-premium), transform var(--duration-enter) var(--ease-premium);
        }
        .fct-open .fct-inner { opacity: 1; transform: translateX(0); transition-delay: var(--duration-fast); }

        .fct-eyebrow { font: 600 11px var(--font-mono); letter-spacing: .16em; text-transform: uppercase; color: var(--change-violet-300); margin-bottom: 12px; }
        .fct-heading { margin: 0 0 18px; font: 600 clamp(16px,1.5vw,19px)/1.32 var(--font-primary); letter-spacing: -.02em; color: var(--dark-text); max-width: 30ch; }
        .fct-form { margin: 0; }
        .fct-row { display: flex; gap: 8px; align-items: stretch; }
        .fct-input {
          flex: 1; min-width: 0; height: 44px; padding: 0 13px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.18);
          color: var(--dark-text); font: 400 14.5px var(--font-primary); outline: none; border-radius: 0;
          transition: border-color var(--duration-standard) var(--ease-premium), background var(--duration-standard) var(--ease-premium);
        }
        .fct-input::placeholder { color: rgba(240,244,255,.42); }
        .fct-input:focus { border-color: var(--soft-violet); background: rgba(255,255,255,.08); }
        .fct-submit {
          flex-shrink: 0; width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center;
          background: var(--change-violet); border: none; color: var(--text-inverse); cursor: pointer;
          transition: background var(--duration-standard) var(--ease-premium), opacity var(--duration-standard);
        }
        .fct-submit:hover { background: var(--soft-violet); }
        .fct-submit:disabled { opacity: .7; cursor: wait; }
        .fct-submit:focus-visible { outline: 2px solid var(--soft-violet); outline-offset: 2px; }
        .fct-err { display: block; margin-top: 9px; font: 400 12.5px var(--font-primary); color: var(--change-violet-300); }
        .fct-spin { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.35); border-top-color: var(--text-inverse); border-radius: 50%; animation: fct-spin .7s linear infinite; }
        @keyframes fct-spin { to { transform: rotate(360deg); } }

        .fct-ok { display: flex; flex-direction: column; gap: 8px; }
        .fct-ok-mark { width: 36px; height: 36px; border-radius: 50%; background: var(--success); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 4px; }
        .fct-ok-title { font: 600 18px var(--font-primary); letter-spacing: -.02em; color: var(--dark-text); }
        .fct-ok-body { font: 400 14px/1.5 var(--font-primary); color: rgba(240,244,255,.78); max-width: 28ch; }

        @media (max-width: 600px) {
          .fct { --fctw: min(300px, 82vw); }
          .fct-handle { width: 42px; min-height: 124px; }
          .fct-vlabel { font-size: 11px; letter-spacing: .18em; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fct-panel, .fct-inner, .fct-chev, .fct-handle, .fct-input, .fct-submit { transition: none !important; }
          .fct-spin { animation-duration: 1.2s; }
        }
      `}</style>
    </aside>
  );
}
