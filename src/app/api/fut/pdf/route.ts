import { NextRequest } from "next/server"
import { buildFUTHtml } from "@/features/fut-preview/lib/buildFUTHtml"
import type { FUTData } from "@/entities/fut/model/type"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Soporta puppeteer "full" y puppeteer-core sin usar 'any'
type AnyBrowser = import("puppeteer-core").Browser | import("puppeteer").Browser

export async function POST(req: NextRequest) {
  let browser: AnyBrowser | null = null

  try {
    const { data } = (await req.json()) as { data: FUTData }
    const html = buildFUTHtml(data)

    const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1"

    if (isProd) {
      // ✅ Producción (Vercel): puppeteer-core + @sparticuz/chromium
      const { default: chromium } = await import("@sparticuz/chromium")
      const pptr = await import("puppeteer-core")

      browser = await pptr.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      })
    } else {
      // ✅ Desarrollo local (Windows/Mac/Linux)
      try {
        // 1) Usa puppeteer "full" con Chromium embebido
        const pptr = await import("puppeteer")
        browser = await pptr.launch({
          executablePath: pptr.executablePath(),
          headless: true,
        })
      } catch {
        // 2) Fallback: puppeteer-core + Chrome del sistema
        const pptrCore = await import("puppeteer-core")
        const executablePath =
          process.env.CHROME_PATH ||
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" // ajusta si está en otra ruta

        browser = await pptrCore.launch({
          executablePath,
          headless: true,
        })
      }
    }

    if (!browser) {
      throw new Error("No se pudo lanzar el navegador")
    }

    const page = await browser.newPage()
    // Igual que en el contrato: evita 'networkidle0' que a veces cierra target en Win
    await page.setContent(html, { waitUntil: "load" })
    await page.emulateMediaType("screen")

    const pdfBytes = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    })

    // Stream de respuesta (evita problemas con ArrayBuffer/SharedArrayBuffer)
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array(pdfBytes))
        controller.close()
      },
    })

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="fut.pdf"',
        "Cache-Control": "no-store",
      },
    })
  } catch (err) {
    console.error("FUT PDF error:", err)
    return new Response("Failed to generate PDF", { status: 500 })
  } finally {
    // ✅ TS2454 resuelto: siempre existe el símbolo y chequeamos null
    if (browser) {
      try { await browser.close() } catch { /* ignore */ }
    }
  }
}
