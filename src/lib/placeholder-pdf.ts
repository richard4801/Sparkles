/** Builds a minimal, valid one-page PDF as a Buffer — used to deliver a real
 *  file for resources whose actual document hasn't been uploaded to storage yet.
 *  No dependencies: assembles the objects and computes the xref offsets by hand. */
function escapePdfText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, max = 66): string[] {
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

export function placeholderPdf(title: string, subtitle: string): Buffer {
  const bodyLines = [
    { size: 20, text: title },
    { size: 12, text: subtitle },
    { size: 11, text: "" },
    { size: 11, text: "Thank you for your purchase on Sparklyn." },
    { size: 11, text: "The full document for this resource is being prepared and" },
    { size: 11, text: "will be available for download here shortly." },
    { size: 11, text: "" },
    { size: 11, text: "If you need it urgently, contact support at hello@sparklyn.ng." },
  ];

  // Build the content stream.
  let content = "BT\n";
  let y = 720;
  for (const { size, text } of bodyLines) {
    for (const line of wrap(text) .length ? wrap(text) : [""]) {
      content += `/F1 ${size} Tf\n1 0 0 1 72 ${y} Tm\n(${escapePdfText(line)}) Tj\n`;
      y -= size + 8;
    }
  }
  content += "ET";

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

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
