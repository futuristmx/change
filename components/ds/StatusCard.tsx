/* Variante: estado de flujo/ciclo. Slots 1,2,4,5. Acento cian (sin "teal").
   Línea de fases con nodo: done (verde) · actual (violeta foco) · futuro (gris). */
import CardContainer from "./CardContainer";
import { ACCENT, type CardState } from "./tokens";

type PhaseState = "done" | "current" | "future";
interface Phase { label: string; state: PhaseState }

interface StatusCardProps {
  title: string;
  phases: Phase[];
  state?: CardState;
  minHeight?: number;
}

const nodeColor: Record<PhaseState, string> = {
  done: "var(--evo-validated)",
  current: "var(--change-violet)",   // único violeta = nodo de foco
  future: "var(--text-faint)",
};

export default function StatusCard({ title, phases, state = "default", minHeight }: StatusCardProps) {
  return (
    <CardContainer variant="status" meta="Estado" glyph="status" accentVar={ACCENT.status.accentVar} state={state} minHeight={minHeight} ariaLabel={`Estado: ${title}`}>
      <h3 style={{ margin: 0, font: "600 var(--density-title-size, 20px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--text-strong)", lineHeight: 1.14 }}>{title}</h3>
      <ol style={{ listStyle: "none", margin: "4px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>
        {phases.map((p, i) => (
          <li key={p.label} style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "9px 0" }}>
            {i < phases.length - 1 && <span aria-hidden="true" style={{ position: "absolute", left: 4.5, top: 24, bottom: -9, width: 1, background: "var(--line-structural)" }} />}
            <span aria-hidden="true" style={{ position: "relative", zIndex: 1, width: 9, height: 9, borderRadius: "50%", background: nodeColor[p.state], boxShadow: "0 0 0 4px var(--surface-card)", flex: "0 0 auto" }} />
            <span style={{ font: p.state === "current" ? "600 14.5px var(--font-primary)" : "400 14.5px var(--font-primary)", color: p.state === "future" ? "var(--text-faint)" : "var(--text-body)" }}>{p.label}</span>
          </li>
        ))}
      </ol>
    </CardContainer>
  );
}
