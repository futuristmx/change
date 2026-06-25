/**
 * Telemetría de calidad de intención — anónima, sin PII.
 *
 * Mide EVENTOS de intención (inició/completó score, dimensión más vulnerable,
 * si pidió enviar, si convirtió…), no vanidad de visitas. El id de sesión es
 * aleatorio y vive solo en sessionStorage: no identifica a la persona. La PII
 * (nombre, correo) NUNCA pasa por aquí; solo se recoge si el usuario envía el
 * formulario, por la ruta /api/score.
 */

const SESSION_KEY = "ch_sid";

function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = (crypto?.randomUUID?.() ?? `s_${Math.random().toString(36).slice(2)}_${Date.now()}`);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export type IntentEvent =
  | "score_started"
  | "score_dimension_answered"
  | "score_completed"
  | "score_result_viewed"
  | "score_submit_requested"
  | "score_submitted"
  | "score_cta_contacto"
  | "depth_mission_control"
  | "depth_artefactos"
  | "depth_casos"
  | "simulator_started"
  | "simulator_scenario_selected"
  | "simulator_step_completed"
  | "simulator_chip_selected"
  | "simulator_answer_edited"
  | "simulator_result_viewed"
  | "simulator_retry"
  | "simulator_contact_started"
  | "simulator_submitted"
  | "simulator_abandoned";

/** Envía un evento de intención. No bloquea, no lanza, no recolecta PII. */
export function track(event: IntentEvent, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      session_id: sessionId(),
      event,
      props: props ?? null,
      path: window.location?.pathname ?? null,
    });
    if (navigator?.sendBeacon) {
      navigator.sendBeacon("/api/telemetry", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    /* la telemetría nunca debe romper la experiencia */
  }
}
