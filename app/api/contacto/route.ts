import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

/**
 * Contact endpoint — server-side validation with the SAME Zod schema as the
 * client. In Fase 2 this persists to Supabase (with RLS) and/or notifies by
 * email. For V1 it validates, drops bot submissions, and confirms receipt.
 *
 * Security notes:
 *  - never logs PII (email / message bodies)
 *  - honeypot field `website` must be empty
 *  - body size capped by the schema (max lengths)
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

  // Honeypot tripped → pretend success, do nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // TODO Fase 2: persistir en Supabase (RLS) y/o notificar por correo.
  // Por ahora confirmamos recepción sin registrar PII en logs.
  return NextResponse.json({ ok: true });
}
