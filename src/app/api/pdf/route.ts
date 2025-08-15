// src/app/api/pdf/route.ts
import { NextRequest } from "next/server"
import { buildContractHtml } from "@/entities/document-engine/exporters/buildContractHtml"
import type { ContractData } from "@/entities/contract/model/type"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { contractData } = (await req.json()) as { contractData: ContractData }
    const html = buildContractHtml(contractData)

    const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1"

    // Preparar variables concretas por entorno (sin any)
    let browser:
      | Awaited<ReturnType<(typeof import("puppeteer-core"))["launch"]>>
      | Awaited<ReturnType<(typeof import("puppeteer"))["launch"]>>

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
      // ✅ Desarrollo local: intenta puppeteer completo (con Chromium propio)
      try {
        const pptr = await import("puppeteer")
        browser = await pptr.launch({
          executablePath: pptr.executablePath(),
          headless: true,
        })
      } catch {
        // Fallback: puppeteer-core usando tu navegador del sistema
        const pptrCore = await import("puppeteer-core")
        const executablePath =
          process.env.CHROME_PATH ||
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"

        browser = await pptrCore.launch({
          executablePath,
          headless: true,
        })
      }
    }

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "load" })
    await page.emulateMediaType("screen")

    const pdfBytes = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    })

    await browser.close()

    // Stream de respuesta para evitar problemas con ArrayBuffer/SharedArrayBuffer
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
        "Content-Disposition": 'attachment; filename="contrato-arrendamiento.pdf"',
        "Cache-Control": "no-store",
      },
    })
  } catch (err) {
    console.error("PDF error:", err)
    return new Response("Failed to generate PDF", { status: 500 })
  }
}
