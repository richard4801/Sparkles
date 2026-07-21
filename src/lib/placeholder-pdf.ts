/** Dependency-free PDF generation. Assembles the objects and computes the xref
 *  offsets by hand — used to deliver a real, valid PDF for resources whose actual
 *  document hasn't been uploaded to storage yet, and to serve a truncated
 *  "premium preview" that anyone can read before they buy. */

function escapePdfText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, max = 88): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

export interface PdfLine {
  size: number;
  text: string;
  /** Render in Helvetica-Bold instead of Helvetica. */
  bold?: boolean;
  /** Extra vertical space after this line, on top of the size-based leading. */
  gap?: number;
}

/** Turns a page's lines into a PDF content stream, wrapping long text and
 *  advancing the cursor down the page. Returns null once the text overflows the
 *  bottom margin so callers can start a new page. */
function contentStream(lines: PdfLine[]): string {
  let content = "BT\n";
  let y = 740;
  for (const ln of lines) {
    if (y < 60) break;
    const font = ln.bold ? "F2" : "F1";
    const wrapMax = ln.size >= 18 ? 46 : ln.size >= 14 ? 62 : 92;
    const wrapped = ln.text ? wrap(ln.text, wrapMax) : [""];
    for (const line of wrapped) {
      content += `/${font} ${ln.size} Tf\n1 0 0 1 72 ${y} Tm\n(${escapePdfText(line)}) Tj\n`;
      y -= ln.size + (ln.gap ?? 6);
    }
  }
  content += "ET";
  return content;
}

/** Assembles one or more pages of text into a valid multi-page PDF. */
function buildPdf(pages: PdfLine[][]): Buffer {
  const streams = pages.map(contentStream);

  // Object layout: 1 Catalog, 2 Pages, 3 Font (Helvetica), 4 Font (Bold),
  // then for each page i: page object 5 + i*2 and its content stream 6 + i*2.
  const pageObjNum = (i: number) => 5 + i * 2;
  const contentObjNum = (i: number) => 6 + i * 2;
  const kids = pages.map((_, i) => `${pageObjNum(i)} 0 R`).join(" ");

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];

  pages.forEach((_, i) => {
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjNum(i)} 0 R >>`,
    );
    const stream = streams[i];
    objects.push(
      `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
    );
  });

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

/** A minimal one-page placeholder document (used as the download fallback when a
 *  resource has no uploaded file yet). */
export function placeholderPdf(title: string, subtitle: string): Buffer {
  const page: PdfLine[] = [
    { size: 20, text: title, bold: true, gap: 10 },
    { size: 12, text: subtitle, gap: 18 },
    { size: 11, text: "Thank you for your purchase on Sparklyn." },
    { size: 11, text: "The full document for this resource is being prepared and" },
    { size: 11, text: "will be available for download here shortly." },
    { size: 11, text: "", gap: 6 },
    { size: 11, text: "If you need it urgently, contact support at hello@sparklyn.ng." },
  ];
  return buildPdf([page]);
}
