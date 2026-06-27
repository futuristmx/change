/* Export del diagnóstico del simulador a PDF — carta horizontal, 1 página.
   Vectorial (jsPDF), DS de Change, con tipografía real incrustada.

   Tipografía: IBM Plex (OFL — libre de incrustar). IBM Plex Mono es la fuente
   mono del DS de Change; IBM Plex Sans cubre títulos/cuerpo. Las display
   comerciales (Postea / BD Orange) se sirven vía Adobe Fonts y su licencia NO
   permite incrustarlas en PDF, por eso no se usan aquí.
   Los .ttf viven en /public/fonts y se cargan bajo demanda (base64 en runtime),
   con caché en memoria y fallback a Helvetica si la carga falla. */

export interface SimulatorPdfData {
  title: string;
  dateStr: string;
  stepsTitle: string;
  steps: { label: string; answer: string }[];
  primaryMoveLabel: string;
  primaryLabel: string;
  secondaryLabel?: string | null;
  methodNote: string;
  tensionLabel: string; tension: string;
  riskLabel: string; risk: string;
  firstMoveLabel: string; firstMove: string;
  artifactLabel: string; artifact: string;
  ctaTitle: string;
  contactLine: string;
  fileName: string;
}

type JsPdfDoc = import("jspdf").jsPDF;

const _b64Cache: Record<string, string> = {};

function abToB64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

async function embedFonts(doc: JsPdfDoc): Promise<boolean> {
  const list: [string, string, string][] = [
    ["IBMPlexSans-Regular.ttf", "PlexSans", "normal"],
    ["IBMPlexSans-SemiBold.ttf", "PlexSans", "bold"],
    ["IBMPlexMono-SemiBold.ttf", "PlexMono", "normal"],
  ];
  try {
    for (const [file, name, style] of list) {
      if (!_b64Cache[file]) {
        const res = await fetch(`/fonts/${file}`);
        if (!res.ok) return false;
        _b64Cache[file] = abToB64(await res.arrayBuffer());
      }
      doc.addFileToVFS(file, _b64Cache[file]);
      doc.addFont(file, name, style);
    }
    return true;
  } catch {
    return false;
  }
}

async function logoPng(): Promise<{ data: string; ratio: number } | null> {
  try {
    const res = await fetch("/assets/change_logo_graphite.svg");
    const svg = await res.text();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const img = new Image();
    await new Promise<void>((ok, err) => { img.onload = () => ok(); img.onerror = () => err(new Error("img")); img.src = url; });
    const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 161 / 39;
    const baseW = 322, baseH = Math.round(baseW / ratio);
    const canvas = document.createElement("canvas");
    canvas.width = baseW; canvas.height = baseH;
    const ctx = canvas.getContext("2d");
    if (!ctx) { URL.revokeObjectURL(url); return null; }
    ctx.drawImage(img, 0, 0, baseW, baseH);
    URL.revokeObjectURL(url);
    return { data: canvas.toDataURL("image/png"), ratio };
  } catch { return null; }
}

export async function exportSimulatorPdf(d: SimulatorPdfData): Promise<void> {
  const mod = await import("jspdf");
  const JsPDF = mod.jsPDF ?? (mod as unknown as { default: typeof mod.jsPDF }).default;
  const doc = new JsPDF({ orientation: "landscape", unit: "mm", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 16;

  const INK: [number, number, number] = [38, 38, 43];
  const VIOLET: [number, number, number] = [109, 59, 255];
  const FAINT: [number, number, number] = [140, 140, 150];
  const RULE: [number, number, number] = [214, 214, 220];

  const ok = await embedFonts(doc);
  const SANS = ok ? "PlexSans" : "helvetica";
  const MONO = ok ? "PlexMono" : "courier";

  // ── Header ──
  const logo = await logoPng();
  if (logo) {
    const h = 9.5, w = h * logo.ratio;
    doc.addImage(logo.data, "PNG", M, M - 1, w, h);
  } else {
    doc.setFont(SANS, "bold"); doc.setFontSize(15); doc.setTextColor(...INK);
    doc.text("change", M, M + 6);
  }
  doc.setFont(MONO, "normal"); doc.setFontSize(8.5); doc.setTextColor(...FAINT);
  doc.text(d.title.toUpperCase(), W - M, M + 2.5, { align: "right" });
  doc.setFont(SANS, "normal"); doc.setFontSize(7.5);
  doc.text(d.dateStr, W - M, M + 7, { align: "right" });

  doc.setDrawColor(...VIOLET); doc.setLineWidth(0.7);
  doc.line(M, M + 13, W - M, M + 13);

  // ── Recorrido (5 pasos elegidos) ──
  let y = M + 22;
  doc.setFont(MONO, "normal"); doc.setFontSize(8); doc.setTextColor(...VIOLET);
  doc.text(d.stepsTitle.toUpperCase(), M, y);
  y += 6;
  const gap = 5;
  const colW = (W - 2 * M - 4 * gap) / 5;
  d.steps.forEach((s, i) => {
    const x = M + i * (colW + gap);
    doc.setFont(MONO, "normal"); doc.setFontSize(7); doc.setTextColor(...FAINT);
    doc.text(`${i + 1}. ${s.label.toUpperCase()}`, x, y);
    doc.setFont(SANS, "normal"); doc.setFontSize(8); doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(s.answer && s.answer.trim() ? s.answer.trim() : "—", colW);
    doc.text(lines.slice(0, 6), x, y + 4.6);
  });

  // ── Resultado ──
  y += 38;
  doc.setDrawColor(...RULE); doc.setLineWidth(0.3); doc.line(M, y, W - M, y);
  y += 8;
  doc.setFont(MONO, "normal"); doc.setFontSize(8); doc.setTextColor(...FAINT);
  doc.text(d.primaryMoveLabel.toUpperCase(), M, y);
  y += 8.5;
  doc.setFont(SANS, "bold"); doc.setFontSize(21); doc.setTextColor(...VIOLET);
  doc.text(d.primaryLabel + (d.secondaryLabel ? `  +  ${d.secondaryLabel}` : ""), M, y);
  y += 7.5;
  doc.setFont(SANS, "normal"); doc.setFontSize(9.5); doc.setTextColor(...INK);
  const note = doc.splitTextToSize(d.methodNote, W - 2 * M);
  doc.text(note.slice(0, 3), M, y);
  y += Math.min(note.length, 3) * 5 + 6;

  // dos columnas: tensión / riesgo · primer movimiento / artefacto
  const cW = (W - 2 * M - 10) / 2;
  const colLx = M, colRx = M + cW + 10;
  const field = (x: number, yy: number, label: string, text: string): number => {
    doc.setFont(MONO, "normal"); doc.setFontSize(7.5); doc.setTextColor(...VIOLET);
    doc.text(label.toUpperCase(), x, yy);
    doc.setFont(SANS, "normal"); doc.setFontSize(9.5); doc.setTextColor(...INK);
    const ls = doc.splitTextToSize(text, cW);
    doc.text(ls.slice(0, 4), x, yy + 4.8);
    return yy + 4.8 + Math.min(ls.length, 4) * 5 + 7;
  };
  let yl = y, yr = y;
  yl = field(colLx, yl, d.tensionLabel, d.tension);
  field(colLx, yl, d.riskLabel, d.risk);
  yr = field(colRx, yr, d.firstMoveLabel, d.firstMove);
  field(colRx, yr, d.artifactLabel, d.artifact);

  // ── Footer / CTA ──
  const fy = H - M - 4;
  doc.setDrawColor(...VIOLET); doc.setLineWidth(0.5); doc.line(M, fy - 7, W - M, fy - 7);
  doc.setFont(SANS, "bold"); doc.setFontSize(9.5); doc.setTextColor(...VIOLET);
  doc.text(d.ctaTitle, M, fy);
  doc.setFont(MONO, "normal"); doc.setFontSize(8); doc.setTextColor(...FAINT);
  doc.text(d.contactLine, W - M, fy, { align: "right" });

  doc.save(d.fileName);
}
