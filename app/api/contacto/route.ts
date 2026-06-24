import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

/**
 * Contact endpoint — server-side validation with the SAME Zod schema as the
 * client, then persistence to Supabase.
 *
 * Security / reglas:
 *  - SOLO INSERT en `contact_submissions` (nunca UPDATE/DELETE).
 *  - Usa la SERVICE ROLE key (solo en servidor; omite RLS). Nunca el cliente.
 *  - Nunca loguea PII fuera del servidor; el error de DB no se expone al usuario.
 *  - honeypot `website` debe ir vacío.
 *  - Si las env vars de Supabase no están configuradas, el form confirma igual
 *    y se registra una advertencia en el log (no se pierde la UX).
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validación fallida.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot tripped → pretend success, persist nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // ── Persistencia en Supabase (solo INSERT, vía service role) ──
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && serviceKey) {
    try {
      const supabase = createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        nombre: parsed.data.nombre,
        correo: parsed.data.email,
        organizacion: parsed.data.organizacion || null,
        decision_context: parsed.data.decision || null,
        source: "web-contacto",
      });
      if (dbError) {
        // No exponer el error al usuario — el form ya confirmó; el detalle queda en el log.
        console.error("[contacto] insert failed:", dbError.message);
      }
    } catch (e) {
      console.error("[contacto] supabase client error:", e instanceof Error ? e.message : "unknown");
    }
  } else {
    console.warn(
      "[contacto] Supabase no configurado (faltan NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY) — lead no persistido."
    );
  }

  return NextResponse.json({ ok: true });
}
