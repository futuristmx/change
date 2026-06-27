import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const leadSchema = z.object({
  correo: z.string().trim().email("Correo inválido.").max(200),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
  lt: z.number().optional(), // load-time ms (anti-spam timing)
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Revisa tu correo e intenta de nuevo." }, { status: 422 });
  }

  const { correo, source, website, lt } = parsed.data;

  // Honeypot — silently succeed to avoid fingerprinting
  if (website) return NextResponse.json({ ok: true });
  // Timing — bots fill forms in milliseconds
  if (typeof lt === "number" && lt < 1500) return NextResponse.json({ ok: true });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const sb = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { error: dbError } = await sb.from("contact_submissions").insert({
        nombre: "Lead — pestaña flotante",
        correo,
        organizacion: null,
        decision_context: source ? `Captura rápida desde ${source}` : "Captura rápida (pestaña flotante)",
        source: "web-floating-tab",
      });
      if (dbError) console.error("[lead] insert failed:", dbError.message);
    } catch (e) {
      console.error("[lead] supabase error:", e instanceof Error ? e.message : "unknown");
    }
  }

  return NextResponse.json({ ok: true });
}
