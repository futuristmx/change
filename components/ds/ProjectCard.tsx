/* Variante: proyecto/iniciativa. Slots 1,2,4,5,8. Acento ámbar + barra de avance + estado. */
import CardContainer from "./CardContainer";
import CardMetadata, { type MetaItem } from "./CardMetadata";
import CardStatePill from "./CardStatePill";
import { ACCENT, type CardState, type PillTone } from "./tokens";

interface ProjectCardProps {
  title: string;
  body?: string;
  /** 0–100 */
  progress?: number;
  metadata?: MetaItem[];
  pill?: { tone: PillTone; label: string };
  state?: CardState;
  minHeight?: number;
}

export default function ProjectCard({ title, body, progress, metadata = [], pill, state = "default", minHeight }: ProjectCardProps) {
  return (
    <CardContainer variant="project" meta="Proyecto" glyph="project" accentVar={ACCENT.project.accentVar} state={state} minHeight={minHeight} ariaLabel={`Proyecto: ${title}`}>
      <h3 style={{ margin: 0, font: "600 var(--density-title-size, 20px) var(--font-primary)", letterSpacing: "-.02em", color: "var(--text-strong)", lineHeight: 1.14 }}>{title}</h3>
      {body && <p style={{ margin: 0, font: "400 15px/1.55 var(--font-primary)", color: "var(--text-muted)" }}>{body}</p>}
      {typeof progress === "number" && (
        <div aria-label={`Avance ${progress}%`} style={{ height: 4, background: "var(--chart-track)", overflow: "hidden" }}>
          <div style={{ width: `${Math.max(0, Math.min(100, progress))}%`, height: "100%", background: "var(--gradient-evolution)" }} />
        </div>
      )}
      {metadata.length > 0 && <CardMetadata items={metadata} />}
      {pill && <div style={{ marginTop: 2 }}><CardStatePill tone={pill.tone}>{pill.label}</CardStatePill></div>}
    </CardContainer>
  );
}
