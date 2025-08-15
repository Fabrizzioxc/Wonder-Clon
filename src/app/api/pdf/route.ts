// src/app/api/pdf/route.ts
import { NextRequest } from "next/server"
import { buildContractHtml } from "@/entities/document-engine/exporters/buildContractHtml"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { contractData } = await req.json()
    const html = buildContractHtml(contractData)

    // ...
const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1"

let puppeteer: any
let executablePath: string | undefined
let args: string[] = []
const headless = true

if (isProd) {
  // ✅ tomar el default export
  const { default: chromium } = await import("@sparticuz/chromium")
  const puppeteerCore = await import("puppeteer-core")

  puppeteer = puppeteerCore.default
  executablePath = (await chromium.executablePath()) || undefined
  args = chromium.args
} else {
  // dev: puppeteer completo (o fallback a CHROME_PATH)
  try {
    const puppeteerFull = await import("puppeteer")
    puppeteer = puppeteerFull.default
    executablePath = puppeteer.executablePath()
  } catch {
    const puppeteerCore = await import("puppeteer-core")
    puppeteer = puppeteerCore.default
    executablePath =
      process.env.CHROME_PATH ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  }
}

const browser = await puppeteer.launch({
  args,
  executablePath,
  headless,
})
// ...


    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "load" })
    await page.emulateMediaType("screen")

    const pdfBuffer: Uint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    })

    await browser.close()

    // Responder como stream para evitar problemas de tipos (SharedArrayBuffer)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(pdfBuffer))
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
