// src/entities/document-engine/exporters/buildContractHtml.ts
import type { ContractData } from "@/entities/contract/model/type"
import { formatFechaES, formatEuros, labelPago } from "@/entities/contract/lib/normalizers"
import { buildBlocks } from "@/entities/contract/templates/blocks"
import { getContractTemplate } from "@/entities/contract/templates/template"

function parseLineDirectives(raw: string) {
  let text = raw
  let cls = ""
  if (text.startsWith("[[TITLE]]")) { text = text.replace("[[TITLE]]",""); cls = "x-center x-bold x-up x-title" }
  else if (text.startsWith("[[RIGHT]]")) { text = text.replace("[[RIGHT]]",""); cls = "x-right" }
  else if (text.startsWith("[[CENTER]]")) { text = text.replace("[[CENTER]]",""); cls = "x-center x-bold x-up x-section" }
  else if (text.startsWith("[[CLAUSE]]")) { text = text.replace("[[CLAUSE]]",""); cls = "x-bold x-up x-clause" }
  return { text, cls }
}

function buildValues(contractData: ContractData): Record<string, string> {
  const def: Partial<ContractData> = {}
  const contractDate = formatFechaES(contractData.contractDate || "")
  const availabilityDate = formatFechaES(contractData.availabilityDate || "")
  const monthlyRent = formatEuros(contractData.monthlyRent || "")
  const paymentMethod = labelPago(contractData.paymentMethod || "")
  const blocks = buildBlocks({ ...def, ...contractData })
  return {
    ...Object.fromEntries(Object.entries(contractData).map(([k, v]) => [k, String(v ?? "")])),
    contractDate,
    availabilityDate,
    monthlyRent,
    paymentMethod,
    ...blocks,
  }
}

function renderTemplateToHtml(template: string, values: Record<string,string>): string {
  const lines = template.split("\n")
  const out: string[] = []
  for (const raw of lines) {
    const { text, cls } = parseLineDirectives(raw)
    const replaced = text.replace(/\{\{(\w+)\}\}/g, (_m, k) => (k in values ? values[k] : "__________"))
    out.push(`<div class="${cls}">${replaced || "&nbsp;"}</div>`)
  }
  const css = `
  body{font-family: ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;font-size:15px;line-height:1.7;padding:32px;}
  .x-center{text-align:center}.x-right{text-align:right}.x-bold{font-weight:700}.x-up{text-transform:uppercase;letter-spacing:.02em}
  .x-title{margin-top:4px;margin-bottom:8px}
  .x-section{margin-top:16px;margin-bottom:8px}
  .x-clause{margin-top:24px;margin-bottom:6px}
  `
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/><title>Contrato</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/><style>${css}</style></head><body>
${out.join("\n")}
</body></html>`
}

export function buildContractHtml(data: ContractData): string {
  const values = buildValues(data)
  const template = getContractTemplate()
  return renderTemplateToHtml(template, values)
}
