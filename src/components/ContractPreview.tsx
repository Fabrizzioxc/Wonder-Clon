// src/components/ContractPreview.tsx
"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { ContractData } from "@/types/type"

// --- Helpers de formato ---
const MESES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
]

function formatFechaES(input?: string): string {
  if (!input) return ""
  // Soporta "YYYY-MM-DD" (input type="date") y "dd/mm/aaaa"
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/
  const eu = /^(\d{2})[\/.-](\d{2})[\/.-](\d{4})$/
  let d = 1, m = 0, y = 1970
  if (iso.test(input)) {
    const [, yy, mm, dd] = input.match(iso)!
    d = parseInt(dd, 10); m = parseInt(mm, 10) - 1; y = parseInt(yy, 10)
  } else if (eu.test(input)) {
    const [, dd, mm, yy] = input.match(eu)!
    d = parseInt(dd, 10); m = parseInt(mm, 10) - 1; y = parseInt(yy, 10)
  } else {
    // ya viene “bonito” (ej. “1 de agosto 2025”)
    return input
  }
  const mes = MESES[m] ?? ""
  return `${d} de ${mes} de ${y}`
}

function formatEuros(num?: string): string {
  if (!num) return ""
  const n = Number(String(num).replace(/[^\d.,-]/g, "").replace(",", "."))
  if (Number.isNaN(n)) return `${num} €`
  return `${n} €`
}

function labelPago(value?: string): string {
  switch (value) {
    case "transferencia": return "transferencia bancaria"
    case "domiciliacion": return "domiciliación bancaria"
    case "efectivo": return "efectivo"
    default: return value || ""
  }
}

// --- Template del contrato con TOKENS de bloque ---
function getContractTemplate(): string {
  return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA

En {{contractLocation}}, a {{contractDate}}

REUNIDOS

De una parte,
{{landlordName}}, {{LANDLORD_DOC_PHRASE}} con domicilio en: {{landlordAddress}}. {{BLOQUE_QUIEN_FIRMA_ARRENDADOR}}
En adelante, el "Arrendador".

Y de otra parte,
{{tenantName}}, {{TENANT_DOC_PHRASE}} con domicilio en: {{propertyAddress}}. {{BLOQUE_QUIEN_FIRMA_ARRENDATARIO}}
En adelante, el "Arrendatario".

Y que, a continuación, serán referidas, individualmente como la "Parte" y, de forma conjunta, como las "Partes". Las Partes, en la calidad con la que actúan, y reconociéndose capacidad jurídica para contratar y obligarse, y en especial para el otorgamiento del presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA. En adelante, el "Contrato".

EXPONEN

I. Que el Arrendador es propietario de la vivienda ubicada en: {{propertyAddress}}, con la siguiente Referencia Catastral: {{propertyReference}}. La vivienda cuenta con {{propertySize}} metros cuadrados de superficie, y presenta las siguientes características:

{{propertyDescription}}

{{BLOQUE_AMUEBLADO}}

En adelante, la "Vivienda".

Dicha superficie y composición, así como sus características y estado son perfectamente conocidas y aceptadas por las partes intervinientes en este contrato. No obstante, la Vivienda se arrienda como cuerpo cierto, así, de diferir la superficie real y la aquí descrita, esto no afectará de forma alguna a las condiciones y cláusulas que aquí se fijan, particularmente en lo relativo al precio de la renta.

II. Que el Arrendador ha exhibido una copia del Certificado de Eficiencia Energética de la Vivienda de acuerdo con lo regulado en el Real Decreto 235/2013, de 5 de abril, por el que se aprueba el procedimiento básico para la certificación de la eficiencia energética de los edificios.

III. Que el Arrendatario desea arrendar la Vivienda para su uso personal de vivienda habitual, y el Arrendador está interesado en arrendársela, así convienen pactar, de forma expresa y detallada, la oferta y aceptación en arrendamiento de la misma, acordando expresamente otorgar el presente contrato de arrendamiento de vivienda que se rige por las siguientes

CLÁUSULAS

PRIMERA. OBJETO

El presente Contrato tiene por objeto la constitución y regulación del arrendamiento de la Vivienda entre el Arrendador y el Arrendatario, de acuerdo con las condiciones pactadas en este Contrato.

El Arrendatario utilizará la Vivienda exclusivamente como vivienda habitual propia, no pudiéndose variar dicho uso sin consentimiento previo, expreso, y por escrito del Arrendador. El incumplimiento de esto será motivo de resolución del contrato.

La Vivienda se pondrá a disposición del Arrendatario con la entrega de llaves, recibiendo la Vivienda en un estado adecuado al fin al que se destina y con conocimiento previo de las características de la misma, especialmente su estado de uso y conservación.

SEGUNDA. DURACIÓN Y PRÓRROGAS

El arrendamiento se pacta por el plazo siguiente: {{contractDuration}}, a contar desde el siguiente día: {{availabilityDate}}.

TERCERA. LA RENTA Y SU ACTUALIZACIÓN

La renta pactada por las Partes es de {{monthlyRent}} mensuales que el Arrendatario pagará al Arrendador cada mes, anticipadamente.

El pago se realizará mediante {{paymentMethod}} a favor de la cuenta cuyos datos son:

Entidad bancaria: {{bankName}}
IBAN identificador de la cuenta: {{bankIban}}
Titular de la cuenta: {{accountHolder}}

CUARTA. GASTOS Y SUMINISTROS

{{BLOQUE_SUMINISTROS}}

QUINTA. MASCOTAS

{{BLOQUE_MASCOTAS}}

SEXTA. DEPÓSITO ADICIONAL

{{BLOQUE_DEPOSITO_ADICIONAL}}

SÉPTIMA. AVALISTAS / FIADORES

{{BLOQUE_AVALISTAS}}`
}

// --- Defaults cuando no hay datos del usuario ---
function getDefaultValues(): Partial<ContractData> {
  return {
    contractLocation: "Madrid",
    contractDate: "1 de agosto de 2025",
    landlordName: "Jose Martinez",
    landlordIdType: "dni",
    landlordId: "12345678A",
    landlordAddress: "Calle Falsa 123, 28080 Madrid",
    tenantName: "Luis Gomez",
    tenantIdType: "dni",
    tenantId: "87654321B",
    propertyAddress: "Calle Mayor 123, 28013 Madrid",
    propertyReference: "1234567AB1234C0001XY",
    propertySize: "80",
    propertyDescription: "Salón, cocina, 3 dormitorios, 2 baños, garaje, trastero",
    furnished: "no",
    contractDuration: "1 año",
    availabilityDate: "2025-09-01",
    monthlyRent: "800",
    paymentMethod: "transferencia",
    bankName: "Banco Santander",
    bankIban: "ES6600190020961234567890",
    accountHolder: "Carlos García Pérez",
    includesUtilities: "no",
    additionalDeposit: "no",
    hasGuarantors: "no",
    petsAllowed: "no",
    landlordSigner: "arrendador",
    tenantSigner: "arrendatario",
    landlordType: "fisica",
    tenantType: "fisica",
  }
}

// --- Construye los bloques dinámicos según radios/selects ---
function buildBlocks(data: ContractData & Partial<ContractData>) {
  // Doc phrase (Arrendador)
  let LANDLORD_DOC_PHRASE = ""
  if (data.landlordType === "juridica") {
    LANDLORD_DOC_PHRASE = `identificada con NIF ${data.landlordId}`
  } else {
    switch (data.landlordIdType) {
      case "dni": LANDLORD_DOC_PHRASE = `identificado con DNI nº ${data.landlordId}`; break
      case "nie": LANDLORD_DOC_PHRASE = `titular del NIE nº ${data.landlordId}`; break
      case "pasaporte": LANDLORD_DOC_PHRASE = `identificado con Pasaporte nº ${data.landlordId}`; break
      default: LANDLORD_DOC_PHRASE = `identificado con documento nº ${data.landlordId}`; break
    }
  }

  // Doc phrase (Arrendatario)
  let TENANT_DOC_PHRASE = ""
  if (data.tenantType === "juridica") {
    TENANT_DOC_PHRASE = `identificada con NIF ${data.tenantId}`
  } else {
    switch (data.tenantIdType) {
      case "dni": TENANT_DOC_PHRASE = `identificado con DNI nº ${data.tenantId}`; break
      case "nie": TENANT_DOC_PHRASE = `titular del NIE nº ${data.tenantId}`; break
      case "pasaporte": TENANT_DOC_PHRASE = `identificado con Pasaporte nº ${data.tenantId}`; break
      default: TENANT_DOC_PHRASE = `identificado con documento nº ${data.tenantId}`; break
    }
  }

  // Quién firma
  const BLOQUE_QUIEN_FIRMA_ARRENDADOR =
    data.landlordSigner === "representante"
      ? `Interviene un representante del Arrendador, manifestando contar con poder suficiente y vigente para este acto.`
      : ""
  const BLOQUE_QUIEN_FIRMA_ARRENDATARIO =
    data.tenantSigner === "representante"
      ? `Interviene un representante del Arrendatario, manifestando contar con poder suficiente y vigente para este acto.`
      : ""

  // Amueblado
  const BLOQUE_AMUEBLADO =
    data.furnished === "si"
      ? `La Vivienda se entrega amueblada y equipada, adjuntándose inventario como Anexo I.`
      : `La Vivienda se entrega sin amueblar.`

  // Suministros
  const BLOQUE_SUMINISTROS =
    data.includesUtilities === "si"
      ? `Los gastos de suministros (luz, agua, gas y tasas) se consideran incluidos en la renta y serán asumidos por el Arrendador.`
      : `Los gastos de suministros individualizados (luz, agua, gas) y cualesquiera tasas repercutibles serán por cuenta del Arrendatario.`

  // Mascotas
  const BLOQUE_MASCOTAS =
    data.petsAllowed === "si"
      ? `Se permite la tenencia de mascotas, siendo el Arrendatario responsable de los posibles daños y de cumplir las normas de la comunidad.`
      : `Queda prohibida la tenencia de mascotas en la vivienda.`

  // Depósito adicional
  const BLOQUE_DEPOSITO_ADICIONAL =
    data.additionalDeposit === "si"
      ? `Además de la fianza legal, el Arrendatario entrega un depósito adicional por importe de __________ € para garantizar el cumplimiento de sus obligaciones, que será devuelto una vez verificado el estado del inmueble.`
      : ``

  // Avalistas
  const BLOQUE_AVALISTAS =
    data.hasGuarantors === "si"
      ? `El contrato cuenta con avalista(s): __________, con documento nº __________ y domicilio en __________, que responden solidariamente de las obligaciones del Arrendatario.`
      : ``

  return {
    LANDLORD_DOC_PHRASE,
    TENANT_DOC_PHRASE,
    BLOQUE_QUIEN_FIRMA_ARRENDADOR,
    BLOQUE_QUIEN_FIRMA_ARRENDATARIO,
    BLOQUE_AMUEBLADO,
    BLOQUE_SUMINISTROS,
    BLOQUE_MASCOTAS,
    BLOQUE_DEPOSITO_ADICIONAL,
    BLOQUE_AVALISTAS,
  }
}

interface ContractPreviewProps {
  contractData: ContractData
  currentFieldId: keyof ContractData
}

export function ContractPreview({ contractData, currentFieldId }: ContractPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  // Merge de datos: user > defaults
  const values = useMemo(() => {
    const def = getDefaultValues()
    // Normalizaciones previas
    const contractDate = formatFechaES(contractData.contractDate || def.contractDate)
    const availabilityDate = formatFechaES(contractData.availabilityDate || def.availabilityDate)
    const monthlyRent = formatEuros(contractData.monthlyRent || def.monthlyRent)
    const paymentMethod = labelPago(contractData.paymentMethod || def.paymentMethod)
    const blocks = buildBlocks({ ...def, ...contractData })

    return {
      ...def,
      ...contractData,
      contractDate,
      availabilityDate,
      monthlyRent,
      paymentMethod,
      ...blocks,
    }
  }, [contractData])

  const template = useMemo(() => getContractTemplate(), [])

  // Render seguro línea a línea con placeholders
  const processed = useMemo(() => {
    const lines = template.split("\n")
    let globalFieldCounter = 0

    return (
      <div>
        {lines.map((line, lineIndex) => {
          const elements: React.ReactElement[] = []
          let lastIndex = 0
          const placeholderRegex = /\{\{(\w+)\}\}/g
          let match: RegExpExecArray | null

          while ((match = placeholderRegex.exec(line)) !== null) {
            const key = match[1] as keyof typeof values
            const placeholder = match[0]
            const start = match.index
            const end = start + placeholder.length

            // texto previo
            if (start > lastIndex) {
              elements.push(<span key={`t-${lineIndex}-${lastIndex}`}>{line.slice(lastIndex, start)}</span>)
            }

            globalFieldCounter++
            const currentValue = (values[key] as unknown as string) ?? ""
            const isCurrentField = key === currentFieldId && Boolean(values[key])

            elements.push(
              <span
                key={`f-${globalFieldCounter}-${String(key)}-${lineIndex}`}
                id={`field-${String(key)}-${globalFieldCounter}`}
                className={isCurrentField ? "bg-yellow-200 px-1 rounded" : ""}
              >
                {currentValue || "__________"}
              </span>
            )

            lastIndex = end
          }

          if (lastIndex < line.length) {
            elements.push(<span key={`t-${lineIndex}-${lastIndex}`}>{line.slice(lastIndex)}</span>)
          }

          return <div key={`line-${lineIndex}`}>{elements.length ? elements : line}</div>
        })}
      </div>
    )
  }, [template, values, currentFieldId])

  // Auto-scroll al campo actual cuando cambie
  useEffect(() => {
    if (currentFieldId && (values as any)[currentFieldId]) {
      const fieldElement = document.querySelector(`[id^="field-${String(currentFieldId)}-"]`)
      if (fieldElement && previewRef.current) {
        const containerRect = previewRef.current.getBoundingClientRect()
        const fieldRect = (fieldElement as HTMLElement).getBoundingClientRect()
        const relativeTop = fieldRect.top - containerRect.top + previewRef.current.scrollTop
        previewRef.current.scrollTo({ top: relativeTop - 100, behavior: "smooth" })
      }
    }
  }, [currentFieldId, values])

  return (
    <div
      ref={previewRef}
      className="bg-gray-50 rounded-lg p-6 text-sm leading-relaxed font-mono select-none max-h-[600px] overflow-y-auto"
      style={{ userSelect: "none" }}
    >
      <div className="whitespace-pre-line">{processed}</div>
    </div>
  )
}
