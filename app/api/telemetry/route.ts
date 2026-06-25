import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

/**
 * Telemetría de intención — anónima, sin PII.
 * Solo INSERT en `score_events`. Graceful: si Supabase no está configurado,
 * responde 204 igual (la telemetría nunca rompe la experiencia).
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const b = json as Record<string, unknown>;
  const event = typeof b.event === "string" ? b.event.slice(0, 80) : "";
  const sessionId = typeof b.session_id === "string" ? b.session_id.slice(0, 80) : "";
  if (!event || !sessionId) return new NextResponse(null, { status: 204 });

  const path = typeof b.path === "string" ? b.path.slice(0, 200) : null;
  const props = b.props && typeof b.props === "object" ? b.props : null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    try {
      const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
      const { error } = await supabase.from("score_events").insert({ session_id: sessionId, event, props, path });
      if (error) console.error("[telemetry] insert failed:", error.message);
    } catch (e) {
      console.error("[telemetry] supabase error:", e instanceof Error ? e.message : "unknown");
    }
  }

  return new NextResponse(null, { status: 204 });
}
