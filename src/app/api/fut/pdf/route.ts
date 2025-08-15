// src/app/api/fut/pdf/route.ts
import { NextResponse, type NextRequest } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { buildFUTHtml } from "@/features/fut-preview/lib/buildFUTHtml";
import type { FUTData } from "@/entities/fut/model/type";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChromiumLike = {
  executablePath: () => Promise<string | null>;
  args: string[];
};
const chrome = chromium as unknown as ChromiumLike;

/** Copia segura: Uint8Array -> ArrayBuffer (evita SharedArrayBuffer en el tipo) */
function toArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

async function resolveExecutablePath(): Promise<string | undefined> {
  // 0) Variable de entorno (si quieres forzar la ruta manualmente)
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  // 1) Intenta @sparticuz/chromium SIEMPRE (en Vercel y en local)
  try {
    const p = await chrome.executablePath();
    if (p) return p;
  } catch {
    // ignore
  }

  // 2) En local: intenta usar puppeteer “full” si está instalado
  try {
    const puppeteerFull: typeof import("puppeteer") = await import("puppeteer");
    const p = puppeteerFull.executablePath();
    if (p) return p;
  } catch {
    // ignore
  }

  // 3) Rutas conocidas de Chrome por SO
  const candidates = [
    "C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
    "C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];

  for (const c of candidates) {
    try {
      const { access } = await import("node:fs/promises");
      await access(c);
      return c;
    } catch {
      // try next
    }
  }

  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const { data } = (await req.json()) as { data: FUTData };
    const html = buildFUTHtml(data);

    const executablePath = await resolveExecutablePath();
    if (!executablePath) {
      // Expón un error claro para que no sea un 500 “ciego”
      return NextResponse.json(
        {
          error:
            "No se encontró un navegador para generar el PDF. Instala Google Chrome o añade 'puppeteer' (full) en dev, o configura CHROME_PATH.",
          hints: [
            "npm i -D puppeteer   # en local",
            "o instala Google Chrome y reinicia 'npm run dev'",
            "o exporta CHROME_PATH con la ruta al binario de Chrome",
          ],
        },
        { status: 500 }
      );
    }

    const browser = await puppeteer.launch({
      args: chrome.args ?? [],
      executablePath, // ahora garantizado
      headless: true,
      defaultViewport: { width: 794, height: 1123, deviceScaleFactor: 2 }, // A4 @ ~150DPI
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // PDF como Buffer (Uint8Array)
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
    });

    await browser.close();

    // Convierte a ArrayBuffer puro y responde (evita SharedArrayBuffer en tipos)
    const ab = toArrayBuffer(pdfBuffer);
    return new NextResponse(ab, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="fut.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("FUT PDF error:", err);
    return NextResponse.json({ error: "No se pudo generar el PDF" }, { status: 500 });
  }
}
