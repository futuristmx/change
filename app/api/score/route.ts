import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scoreCapacity, type Answers } from "@/lib/capacity-score";

export const runtime = "nodejs";

/**
 * Envío del Score de Capacidad de Futuro con datos de contacto (PII bajo
 * consentimiento: solo llega aquí si el usuario decide enviar).
 *
 * Seguridad / reglas:
 *  - El resultado se RECALCULA en el servidor a partir de las respuestas (no se
 *    confía en el resultado del cliente) → consistencia entre lo visible y lo
 *    guardado, y a prueba de manipulación.
 *  - Solo INSERT en `score_submissions`. Graceful si Supabase no está configurado.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 });
  }

  const b = json as Record<string, unknown>;
  const answers = (b.answers ?? {}) as Answers;
  const contact = (b.contact ?? {}) as Record<string, unknown>;
  if (b.website) return NextResponse.json({ ok: true }); // honeypot

  // Recalcular en el servidor — fuente de verdad del resultado guardado.
  const result = scoreCapacity(answers);
  if (result.status !== "ok") {
    return NextResponse.json({ ok: false, error: "El score está incompleto o es inválido." }, { status: 422 });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : null);
  const correo = str(contact.email, 200);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    try {
      const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
      const { error } = await supabase.from("score_submissions").insert({
        answers,
        result,
        total: result.total,
        level: result.level,
        weakest: result.weakest,
        nombre: str(contact.nombre, 200),
        organizacion: str(contact.organizacion, 200),
        correo,
        decision: str(contact.decision, 4000),
      });
      if (error) console.error("[score] insert failed:", error.message);
    } catch (e) {
      console.error("[score] supabase error:", e instanceof Error ? e.message : "unknown");
    }
  } else {
    console.warn("[score] Supabase no configurado — envío no persistido.");
  }

  return NextResponse.json({ ok: true, level: result.level, total: result.total });
}
