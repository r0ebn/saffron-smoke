/**
 * Font files for the PDF and image engines.
 *
 * renderPdf and renderImage never fetch: every font the Document or Canvas
 * uses must be given as bytes (TTF, OTF or WOFF — not WOFF2). The files come
 * from the @fontsource packages in devDependencies, so a clean checkout gets
 * them with `npm install`. One entry per family / weight / style used.
 */
import { readFile } from "node:fs/promises";

export interface FontFile {
  family: string;
  src: Buffer;
  weight?: number;
  style?: "normal" | "italic";
}

const FONTSOURCE = new URL("../node_modules/@fontsource/", import.meta.url);

const SPECS: Array<{ family: string; file: string; weight: number; style?: "normal" | "italic" }> = [
  { family: "Cormorant Garamond", file: "cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff", weight: 400 },
  { family: "Cormorant Garamond", file: "cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff", weight: 500 },
  { family: "Cormorant Garamond", file: "cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff", weight: 600 },
  { family: "Cormorant Garamond", file: "cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff", weight: 700 },
  { family: "Cormorant Garamond", file: "cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff", weight: 400, style: "italic" },
  { family: "Cormorant Garamond", file: "cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff", weight: 500, style: "italic" },
  { family: "Cormorant Garamond", file: "cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff", weight: 600, style: "italic" },
  { family: "Inter", file: "inter/files/inter-latin-400-normal.woff", weight: 400 },
  { family: "Inter", file: "inter/files/inter-latin-500-normal.woff", weight: 500 },
  { family: "Inter", file: "inter/files/inter-latin-600-normal.woff", weight: 600 },
  { family: "Inter", file: "inter/files/inter-latin-700-normal.woff", weight: 700 },
];

export async function loadFontFiles(): Promise<FontFile[]> {
  const out: FontFile[] = [];
  for (const spec of SPECS) {
    const src = await readFile(new URL(spec.file, FONTSOURCE));
    out.push({ family: spec.family, src, weight: spec.weight, style: spec.style });
  }
  return out;
}
