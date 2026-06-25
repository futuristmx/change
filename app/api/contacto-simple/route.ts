import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const simpleContactSchema = z.object({
  nombre: z.string().trim().min(2, "Nombre demasiado corto.").max(120),
  organizacion: z.string().trim().max(120).optional().or(z.literal("")),
  correo: z.string().trim().email("Correo inválido.").max(200),
  mensaje: z.string().trim().min(20, "Mensaje demasiado corto.").max(2000),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
  lt: z.number().optional(), // load time ms (anti-spam timing)
});

const URL_RE = /https?:\/\/[^\s]{6,}/gi;
const SPAM_RE = /(buy\s+cheap|buy\s+now|\bCBD\b|casino|poker|enlarge|pharma|viagra|payday\s+loan)/i;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = simpleContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Revisa los campos e intenta de nuevo." }, { status: 422 });
  }

  const { nombre, organizacion, correo, mensaje, website, lt } = parsed.data;

  // Honeypot — silently succeed to avoid fingerprinting
  if (website) return NextResponse.json({ ok: true });

  // Timing — bots fill forms in milliseconds
  if (typeof lt === "number" && lt < 3000) return NextResponse.json({ ok: true });

  // Too many links = spam
  const urlMatches = mensaje.match(URL_RE);
  if (urlMatches && urlMatches.length > 1) return NextResponse.json({ ok: true });

  // Obvious spam patterns
  if (SPAM_RE.test(mensaje)) return NextResponse.json({ ok: true });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const sb = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { error: dbError } = await sb.from("contact_submissions").insert({
        nombre,
        correo,
        organizacion: organizacion || null,
        decision_context: mensaje,
        source: "web-mensaje",
      });
      if (dbError) {
        console.error("[contacto-simple] insert failed:", dbError.message);
      }
    } catch (e) {
      console.error("[contacto-simple] supabase error:", e instanceof Error ? e.message : "unknown");
    }
  }

  return NextResponse.json({ ok: true });
}
