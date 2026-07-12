import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Intentions Board v0 · Change",
  robots: { index: false, follow: false },
};

const DIM_LABEL: Record<string, string> = {
  leer: "Leer",
  interpretar: "Interpretar",
  decidir: "Decidir",
  disenar: "Diseñar",
  sostener: "Sostener",
};

const DIM_COLOR: Record<string, string> = {
  leer: "#22D3EE",
  interpretar: "#A78BFA",
  decidir: "#6D3BFF",
  disenar: "#F59E0B",
  sostener: "#6B7280",
};

const SCENARIO_LABEL: Record<string, string> = {
  "crecer-sin-diluir": "Crecer sin diluir",
  "demasiadas-iniciativas": "Demasiadas iniciativas",
  "decisiones-que-se-pierden": "Decisiones que se pierden",
  "cliente-que-cambio": "El cliente que cambió",
  "vision-sin-roadmap": "Visión sin roadmap",
  "criterio-en-pocas-cabezas": "Criterio en pocas cabezas",
};

interface EventRow {
  event: string;
  props: Record<string, string> | null;
  created_at: string;
}

interface ContactRow {
  id: string;
  created_at: string;
  nombre: string;
  organizacion: string;
  source: string;
  honeypot_triggered: boolean;
}

function pct(num: number, den: number) {
  if (!den) return "—";
  return Math.round((num / den) * 100) + "%";
}

function topN<T extends string>(arr: T[], n = 3): { key: T; count: number }[] {
  const counts: Record<string, number> = {};
  for (const k of arr) counts[k] = (counts[k] ?? 0) + 1;
  return (Object.entries(counts) as [T, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count }));
}

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  const sb = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

  const [evRes, ctRes] = await Promise.all([
    sb.from("score_events")
      .select("event, props, created_at")
      .order("created_at", { ascending: false })
      .limit(2000),
    sb.from("contact_submissions")
      .select("id, created_at, nombre, organizacion, source, honeypot_triggered")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);
  const events = evRes.data as EventRow[] | null;
  const contacts = ctRes.data as ContactRow[] | null;

  const ev = events ?? [];
  const ct = (contacts ?? []).filter(c => !c.honeypot_triggered);

  const scoreStarts    = ev.filter(e => e.event === "score_started").length;
  const scoreCompleted = ev.filter(e => e.event === "score_completed" || e.event === "score_result_viewed").length;
  const scoreSubmitted = ev.filter(e => e.event === "score_submitted").length;

  const simStarts     = ev.filter(e => e.event === "simulator_started").length;
  const simCompleted  = ev.filter(e => e.event === "simulator_result_viewed").length;
  const simSubmitted  = ev.filter(e => e.event === "simulator_submitted").length;
  const simCopied     = ev.filter(e => e.event === "simulator_result_copied").length;

  const simDims = ev
    .filter(e => e.event === "simulator_result_viewed" && e.props?.primary_dim)
    .map(e => e.props!.primary_dim);

  const simScenarios = ev
    .filter(e => e.event === "simulator_scenario_selected" && e.props?.scenario_id)
    .map(e => e.props!.scenario_id);

  const scoreWeakest = ev
    .filter(e => (e.event === "score_submitted" || e.event === "score_completed") && e.props?.weakest)
    .map(e => e.props!.weakest);

  const total = ev.length;
  const lastEventAt = ev[0]?.created_at ?? null;

  return {
    scoreStarts, scoreCompleted, scoreSubmitted,
    simStarts, simCompleted, simSubmitted, simCopied,
    simDims: topN(simDims),
    simScenarios: topN(simScenarios),
    scoreWeakest: topN(scoreWeakest),
    contacts: ct.slice(0, 10),
    totalContacts: ct.length,
    total,
    lastEventAt,
  };
}

export default async function IntentionsPage() {
  const d = await getData();

  const MONO: React.CSSProperties = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" };
  const SANS: React.CSSProperties = { fontFamily: "var(--font-primary, 'Montserrat', sans-serif)" };

  const Metric = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
    <div style={{ padding: "20px 24px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
      <span style={{ ...MONO, display: "block", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: 8 }}>{label}</span>
      <span style={{ ...SANS, display: "block", fontSize: 32, fontWeight: 700, letterSpacing: "-.04em", color: "var(--text-on-dark)", lineHeight: 1 }}>{value}</span>
      {sub && <span style={{ ...MONO, display: "block", marginTop: 6, fontSize: 11, color: "rgba(255,255,255,.4)" }}>{sub}</span>}
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ ...MONO, margin: "0 0 16px", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", fontWeight: 600 }}>{children}</h2>
  );

  if (!d) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--dark-0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ ...MONO, color: "rgba(255,255,255,.35)", fontSize: 13 }}>Supabase no configurado.</p>
      </main>
    );
  }

  const noData = d.total === 0;

  return (
    <main style={{ minHeight: "100vh", background: "var(--dark-0)", padding: "clamp(48px,8vw,80px) clamp(24px,6vw,80px)" }}>

      {/* HEADER */}
      <header style={{ marginBottom: 56, borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
          <h1 style={{ ...SANS, margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-.03em", color: "var(--text-on-dark)" }}>
            Intentions Board <span style={{ ...MONO, fontSize: 12, color: "rgba(255,255,255,.35)", fontWeight: 400, marginLeft: 6 }}>v0</span>
          </h1>
          <span style={{ ...MONO, fontSize: 11, color: "rgba(255,255,255,.35)", letterSpacing: ".08em" }}>change.live · uso interno</span>
        </div>
        {d.lastEventAt && (
          <p style={{ ...MONO, margin: "10px 0 0", fontSize: 11, color: "rgba(255,255,255,.3)" }}>
            Último evento: {new Date(d.lastEventAt).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        )}
      </header>

      {noData ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <span style={{ ...MONO, fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Sin eventos registrados todavía.
          </span>
          <p style={{ ...SANS, marginTop: 12, fontSize: 14, color: "rgba(255,255,255,.2)" }}>
            Cuando los instrumentos generen tráfico, los datos aparecen aquí.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 56 }}>

          {/* SCORE */}
          <section>
            <SectionTitle>Score de Capacidad de Futuro</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
              <Metric label="Iniciados" value={d.scoreStarts} />
              <Metric label="Completados" value={d.scoreCompleted} sub={`${pct(d.scoreCompleted, d.scoreStarts)} de quienes empezaron`} />
              <Metric label="Enviados" value={d.scoreSubmitted} sub={`${pct(d.scoreSubmitted, d.scoreCompleted)} de quienes leyeron`} />
            </div>
            {d.scoreWeakest.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <span style={{ ...MONO, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", display: "block", marginBottom: 10 }}>
                  Dimensión más vulnerable (Score)
                </span>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {d.scoreWeakest.map(({ key, count }) => (
                    <span key={key} style={{
                      ...MONO,
                      fontSize: 11,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      padding: "6px 12px",
                      background: "rgba(255,255,255,.07)",
                      border: `1px solid ${DIM_COLOR[key] ?? "rgba(255,255,255,.15)"}`,
                      color: DIM_COLOR[key] ?? "var(--text-on-dark)",
                    }}>
                      {DIM_LABEL[key] ?? key} · {count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* SIMULATOR */}
          <section>
            <SectionTitle>Decision Simulator</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
              <Metric label="Iniciados" value={d.simStarts} />
              <Metric label="Resultado visto" value={d.simCompleted} sub={`${pct(d.simCompleted, d.simStarts)} conversión`} />
              <Metric label="Enviados (lead)" value={d.simSubmitted} sub={`${pct(d.simSubmitted, d.simCompleted)} de quienes leyeron`} />
              <Metric label="Diagnóstico copiado" value={d.simCopied} />
            </div>

            {d.simDims.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
                <div>
                  <span style={{ ...MONO, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", display: "block", marginBottom: 10 }}>
                    Dimensión primaria (Simulator)
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {d.simDims.map(({ key, count }) => (
                      <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: DIM_COLOR[key] ?? "var(--text-on-dark)" }} />
                        <span style={{ ...SANS, fontSize: 13, color: "var(--text-on-dark)", flex: 1 }}>{DIM_LABEL[key] ?? key}</span>
                        <span style={{ ...MONO, fontSize: 12, color: "rgba(255,255,255,.5)" }}>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {d.simScenarios.length > 0 && (
                  <div>
                    <span style={{ ...MONO, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", display: "block", marginBottom: 10 }}>
                      Escenario más elegido
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {d.simScenarios.map(({ key, count }) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ ...SANS, fontSize: 13, color: "var(--text-on-dark)", flex: 1 }}>{SCENARIO_LABEL[key] ?? key}</span>
                          <span style={{ ...MONO, fontSize: 12, color: "rgba(255,255,255,.5)" }}>{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* SUBMISSIONS */}
          <section>
            <SectionTitle>Submissions — contact_submissions · {d.totalContacts} total</SectionTitle>
            {d.contacts.length === 0 ? (
              <p style={{ ...MONO, fontSize: 12, color: "rgba(255,255,255,.25)" }}>Sin envíos todavía.</p>
            ) : (
              <div style={{ border: "1px solid rgba(255,255,255,.1)", overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                      {["Fecha", "Nombre", "Organización", "Source"].map(h => (
                        <th key={h} style={{ ...MONO, padding: "10px 16px", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", textAlign: "left", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {d.contacts.map((c, i) => (
                      <tr key={c.id} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                        <td style={{ ...MONO, padding: "12px 16px", fontSize: 11, color: "rgba(255,255,255,.4)" }}>
                          {new Date(c.created_at).toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}
                        </td>
                        <td style={{ ...SANS, padding: "12px 16px", fontSize: 13, color: "var(--text-on-dark)" }}>{c.nombre}</td>
                        <td style={{ ...SANS, padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,.6)" }}>{c.organizacion}</td>
                        <td style={{ ...MONO, padding: "12px 16px", fontSize: 11, color: "rgba(255,255,255,.35)", letterSpacing: ".06em" }}>{c.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>
      )}

      <footer style={{ marginTop: 64, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <p style={{ ...MONO, fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".06em", margin: 0 }}>
          change.live · intentions board v0 · no indexado · solo lectura
        </p>
      </footer>
    </main>
  );
}
