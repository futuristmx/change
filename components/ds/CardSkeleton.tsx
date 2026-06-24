/* Estado loading — secuencia de bloques .cs-skel (shimmer, sin spinner).
   Honra prefers-reduced-motion vía la clase .cs-skel (cards.css). */
interface CardSkeletonProps {
  /** líneas de cuerpo a simular */
  lines?: number;
  /** simular una fila de metadata al pie */
  meta?: boolean;
}

const bar = (width: string, height: number, mt = 0): React.CSSProperties => ({
  width,
  height,
  marginTop: mt,
  borderRadius: 0,
});

export default function CardSkeleton({ lines = 2, meta = true }: CardSkeletonProps) {
  return (
    <div aria-hidden="true" style={{ display: "flex", flexDirection: "column" }}>
      <div className="cs-skel" style={bar("38%", 11)} />
      <div className="cs-skel" style={bar("72%", 22, 16)} />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="cs-skel" style={bar(i === lines - 1 ? "60%" : "100%", 12, i === 0 ? 18 : 8)} />
      ))}
      {meta && (
        <div style={{ display: "flex", gap: 12, marginTop: 22, paddingTop: 14, borderTop: "1px solid var(--divider)" }}>
          <div className="cs-skel" style={bar("84px", 12)} />
          <div className="cs-skel" style={bar("64px", 12)} />
        </div>
      )}
    </div>
  );
}
