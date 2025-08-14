// src/components/ContractPreview.tsx
"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { ContractData } from "@/types/type"

// ---------------- Helpers ----------------
const MESES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
]

function formatFechaES(input?: string): string {
  if (!input) return ""
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
    return input // ya viene “bonito”
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

const fallback = (s?: string) => (s && s.trim() ? s : "__________")

// ------- Mapa de anclas (campo → bloque/token visible) -------
const SCROLL_ANCHORS: Record<string, string> = {
  // Bloques condicionales
  furnished: "CLAUSULA_MOBILIARIO",
  includesUtilities: "BLOQUE_SUMINISTROS",
  petsAllowed: "BLOQUE_MASCOTAS",
  additionalDeposit: "BLOQUE_DEPOSITO_ADICIONAL",
  hasGuarantors: "BLOQUE_AVALISTAS",
  // Identidad/representación de partes (scroll al párrafo completo)
  landlordIdType: "BLOQUE_PARTE_ARRENDADOR",
  landlordType: "BLOQUE_PARTE_ARRENDADOR",
  landlordSigner: "BLOQUE_PARTE_ARRENDADOR",
  landlordName: "BLOQUE_PARTE_ARRENDADOR",
  landlordId: "BLOQUE_PARTE_ARRENDADOR",
  landlordAddress: "BLOQUE_PARTE_ARRENDADOR",
  tenantIdType: "BLOQUE_PARTE_ARRENDATARIO",
  tenantType: "BLOQUE_PARTE_ARRENDATARIO",
  tenantSigner: "BLOQUE_PARTE_ARRENDATARIO",
  tenantName: "BLOQUE_PARTE_ARRENDATARIO",
  tenantId: "BLOQUE_PARTE_ARRENDATARIO",
  // Nº de arrendatarios → lista + cláusula
  numTenants: "CLAUSULA_SOLIDARIDAD",
  // Fechas/locación
  contractLocation: "contractLocation",
  contractDate: "contractDate",
  availabilityDate: "availabilityDate",
  // Económicos
  monthlyRent: "monthlyRent",
  paymentMethod: "paymentMethod",
  bankName: "bankName",
  bankIban: "bankIban",
  accountHolder: "accountHolder",
  // Inmueble
  propertyAddress: "propertyAddress",
  propertyReference: "propertyReference",
  propertySize: "propertySize",
  propertyDescription: "propertyDescription",
}

function getAnchorKey(currentFieldId: string) {
  return SCROLL_ANCHORS[currentFieldId] || currentFieldId
}

// --------------- Template ---------------
function getContractTemplate(): string {
  return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA

En {{contractLocation}}, a {{contractDate}}

REUNIDOS

De una parte,
{{BLOQUE_PARTE_ARRENDADOR}}

Y de otra parte,
{{BLOQUE_PARTE_ARRENDATARIO}}
{{BLOQUE_COTENANTS}}

Y que, a continuación, serán referidas, individualmente como la "Parte" y, de forma conjunta, como las "Partes". Las Partes, en la calidad con la que actúan, y reconociéndose capacidad jurídica para contratar y obligarse, y en especial para el otorgamiento del presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA. En adelante, el "Contrato".

EXPONEN

I. Que el Arrendador es propietario de la vivienda ubicada en: {{propertyAddress}}, con la siguiente Referencia Catastral: {{propertyReference}}. La vivienda cuenta con {{propertySize}} metros cuadrados de superficie, y presenta las siguientes características:

{{propertyDescription}}

En adelante, la "Vivienda".

Dicha superficie y composición, así como sus características y estado son perfectamente conocidas y aceptadas por las partes intervinientes en este contrato. No obstante, la Vivienda se arrienda como cuerpo cierto, así, de diferir la superficie real y la aquí descrita, esto no afectará de forma alguna a las condiciones y cláusulas que aquí se fijan, particularmente en lo relativo al precio de la renta.

II. Que el Arrendador ha exhibido una copia del Certificado de Eficiencia Energética de la Vivienda de acuerdo con lo regulado en el Real Decreto 235/2013, de 5 de abril, por el que se aprueba el procedimiento básico para la certificación de la eficiencia energética de los edificios.

III. Que el Arrendatario desea arrendar la Vivienda para su uso personal de vivienda habitual, y el Arrendador está interesado en arrendársela, así convienen pactar, de forma expresa y detallada, la oferta y aceptación en arrendamiento de la misma, acordando expresamente otorgar el presente contrato de arrendamiento de vivienda que se rige por las siguientes

CLÁUSULAS

PRIMERA. OBJETO

El presente Contrato tiene por objeto la constitución y regulación del arrendamiento de la Vivienda entre el Arrendador y los Arrendatarios, de acuerdo con las condiciones pactadas en este Contrato.

El/Los Arrendatario(s) utilizará(n) la Vivienda exclusivamente como vivienda habitual propia, no pudiéndose variar dicho uso sin consentimiento previo, expreso, y por escrito del Arrendador. El incumplimiento de esto será motivo de resolución del contrato.

La Vivienda se pondrá a disposición del/los Arrendatario(s) con la entrega de llaves, recibiendo la Vivienda en un estado adecuado al fin al que se destina y con conocimiento previo de las características de la misma, especialmente su estado de uso y conservación.

SEGUNDA. DURACIÓN Y PRÓRROGAS

El arrendamiento se pacta por el plazo siguiente: {{contractDuration}}, a contar desde el siguiente día: {{availabilityDate}}.

TERCERA. LA RENTA Y SU ACTUALIZACIÓN

La renta pactada por las Partes es de {{monthlyRent}} mensuales que el/los Arrendatario(s) pagará(n) al Arrendador cada mes, anticipadamente.

El pago se realizará mediante {{paymentMethod}} a favor de la cuenta cuyos datos son:

Entidad bancaria: {{bankName}}
IBAN identificador de la cuenta: {{bankIban}}
Titular de la cuenta: {{accountHolder}}

CUARTA. GASTOS Y SUMINISTROS

{{BLOQUE_SUMINISTROS}}

CUARTA BIS. MOBILIARIO E INVENTARIO

{{CLAUSULA_MOBILIARIO}}

QUINTA. MASCOTAS

{{BLOQUE_MASCOTAS}}

SEXTA. DEPÓSITO ADICIONAL

{{BLOQUE_DEPOSITO_ADICIONAL}}

SÉPTIMA. AVALISTAS / FIADORES

{{BLOQUE_AVALISTAS}}

OCTAVA. PLURALIDAD DE ARRENDATARIOS Y SOLIDARIDAD

{{CLAUSULA_SOLIDARIDAD}}`
}

// ------------- Defaults -------------
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
    // Co-arrendatarios opcionales
    coTenant2Name: "",
    coTenant2Type: "fisica",
    coTenant2IdType: "dni",
    coTenant2Id: "",
    coTenant3Name: "",
    coTenant3Type: "fisica",
    coTenant3IdType: "dni",
    coTenant3Id: "",
    numTenants: "1",
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
  } as any
}

// ------------- Bloques dinámicos -------------
function buildBlocks(data: ContractData & Partial<ContractData>) {
  const nTenants = Math.max(1, parseInt(String(data.numTenants || "1"), 10) || 1)

  // Frases de documento según tipo (física) o NIF (jurídica)
  const docPhrase = (type?: string, idType?: string, id?: string) =>
    type === "juridica"
      ? `identificada con NIF ${fallback(id)}`
      : idType === "nie"
      ? `titular del NIE nº ${fallback(id)}`
      : idType === "pasaporte"
      ? `identificado con Pasaporte nº ${fallback(id)}`
      : `identificado con DNI nº ${fallback(id)}`

  // Representación (arrendador/arrendatario principal)
  const repLandlord =
    data.landlordSigner === "representante"
      ? ` Interviene un representante del Arrendador, manifestando contar con poder suficiente y vigente para este acto.`
      : ``

  const repTenant =
    data.tenantSigner === "representante"
      ? ` Interviene un representante del Arrendatario, manifestando contar con poder suficiente y vigente para este acto.`
      : ``

  // Párrafo del ARRENDADOR
  const BLOQUE_PARTE_ARRENDADOR =
    data.landlordType === "juridica"
      ? `La sociedad ${fallback(data.landlordName)}, ${docPhrase(data.landlordType, data.landlordIdType, data.landlordId)}, con domicilio social en ${fallback(data.landlordAddress)}.${repLandlord}
En adelante, el "Arrendador".`
      : `${fallback(data.landlordName)}, ${docPhrase(data.landlordType, data.landlordIdType, data.landlordId)}, con domicilio en: ${fallback(data.landlordAddress)}.${repLandlord}
En adelante, el "Arrendador".`

  // Párrafo del ARRENDATARIO principal (plurales si corresponde)
  const arrLbl = nTenants > 1 ? 'los "Arrendatarios"' : 'el "Arrendatario"'
  const BLOQUE_PARTE_ARRENDATARIO =
    data.tenantType === "juridica"
      ? `La sociedad ${fallback(data.tenantName)}, ${docPhrase(data.tenantType, data.tenantIdType, data.tenantId)}, con domicilio social en ${fallback(data.propertyAddress)}.${repTenant}
En adelante, ${arrLbl}.`
      : `${fallback(data.tenantName)}, ${docPhrase(data.tenantType, data.tenantIdType, data.tenantId)}, con domicilio en: ${fallback(data.propertyAddress)}.${repTenant}
En adelante, ${arrLbl}.`

  // Co-arrendatarios (2 y 3) — si hay 2 o 3, listar
  const coList: string[] = []
  if (nTenants >= 2) {
    const name = (data as any).coTenant2Name
    const type = (data as any).coTenant2Type || "fisica"
    const idType = (data as any).coTenant2IdType || "dni"
    const id = (data as any).coTenant2Id
    const p =
      type === "juridica"
        ? `La sociedad ${fallback(name)}, ${docPhrase(type, idType, id)}, con domicilio social en ${fallback(data.propertyAddress)}.`
        : `${fallback(name)}, ${docPhrase(type, idType, id)}, con domicilio en: ${fallback(data.propertyAddress)}.`
    coList.push(p)
  }
  if (nTenants >= 3) {
    const name = (data as any).coTenant3Name
    const type = (data as any).coTenant3Type || "fisica"
    const idType = (data as any).coTenant3IdType || "dni"
    const id = (data as any).coTenant3Id
    const p =
      type === "juridica"
        ? `La sociedad ${fallback(name)}, ${docPhrase(type, idType, id)}, con domicilio social en ${fallback(data.propertyAddress)}.`
        : `${fallback(name)}, ${docPhrase(type, idType, id)}, con domicilio en: ${fallback(data.propertyAddress)}.`
    coList.push(p)
  }
  const BLOQUE_COTENANTS = coList.length ? coList.join("\n") + "\n" : ""

  // Cláusula completa de mobiliario
  const CLAUSULA_MOBILIARIO =
    data.furnished === "si"
      ? `La Vivienda se entrega amueblada y equipada conforme al inventario que se adjunta como Anexo I.
El/Los Arrendatario(s) declara(n) haberlo recibido en correcto estado de uso y conservación y se obliga(n) a mantenerlo, no sustraerlo ni sustituirlo sin autorización del Arrendador, y a devolverlo al finalizar el contrato en idéntico estado, salvo el desgaste por el uso ordinario. Cualquier falta, rotura o deterioro imputable al/los Arrendatario(s) será reparado o repuesto por este/estos; en caso contrario, el Arrendador podrá detraer su importe de la fianza legal y, en su caso, del depósito adicional, sin perjuicio de reclamar cantidades superiores si procediera.`
      : `La Vivienda se entrega sin amueblar. El/Los Arrendatario(s) podrá(n) introducir su propio mobiliario bajo su exclusiva responsabilidad, comprometiéndose a retirarlo al término del arrendamiento y a devolver la Vivienda en el mismo estado en que la recibió/recibieron, salvo el desgaste por el uso ordinario. Los daños causados en elementos preexistentes de la Vivienda serán reparados por el/los Arrendatario(s); en caso de incumplimiento, podrán ser compensados con cargo a la fianza legal y, en su caso, al depósito adicional.`

  // Suministros
  const BLOQUE_SUMINISTROS =
    data.includesUtilities === "si"
      ? `Los gastos de suministros (luz, agua, gas y tasas) se consideran incluidos en la renta y serán asumidos por el Arrendador.`
      : `Los gastos de suministros individualizados (luz, agua, gas) y cualesquiera tasas repercutibles serán por cuenta del/los Arrendatario(s).`

  // Mascotas
  const BLOQUE_MASCOTAS =
    data.petsAllowed === "si"
      ? `Se permite la tenencia de mascotas, siendo el/los Arrendatario(s) responsable(s) de los posibles daños y de cumplir las normas de la comunidad.`
      : `Queda prohibida la tenencia de mascotas en la vivienda.`

  // Depósito adicional
  const BLOQUE_DEPOSITO_ADICIONAL =
    data.additionalDeposit === "si"
      ? `Además de la fianza legal, el/los Arrendatario(s) entrega(n) un depósito adicional por importe de __________ € para garantizar el cumplimiento de sus obligaciones, que será devuelto una vez verificado el estado del inmueble.`
      : ``

  // Avalistas
  const BLOQUE_AVALISTAS =
    data.hasGuarantors === "si"
      ? `El contrato cuenta con avalista(s): __________, con documento nº __________ y domicilio en __________, que responden solidariamente de las obligaciones del/los Arrendatario(s).`
      : ``

  // Solidaridad (solo si hay 2+)
  const CLAUSULA_SOLIDARIDAD =
    nTenants > 1
      ? `Los Arrendatarios asumen frente al Arrendador el cumplimiento de todas las obligaciones derivadas del presente contrato de forma solidaria, de modo que cualquiera de ellos podrá ser requerido por la totalidad de las cantidades debidas o por la ejecución de las obligaciones pendientes.
Las comunicaciones y notificaciones que el Arrendador dirija al domicilio de la Vivienda, o a cualquiera de los Arrendatarios, se entenderán válidamente realizadas frente a todos ellos. La entrega de llaves y la devolución de la posesión al término del contrato podrán efectuarse por cualquiera de los Arrendatarios, surtiendo plenos efectos frente a todos.`
      : ``

  return {
    BLOQUE_PARTE_ARRENDADOR,
    BLOQUE_PARTE_ARRENDATARIO,
    BLOQUE_COTENANTS,
    CLAUSULA_MOBILIARIO,
    BLOQUE_SUMINISTROS,
    BLOQUE_MASCOTAS,
    BLOQUE_DEPOSITO_ADICIONAL,
    BLOQUE_AVALISTAS,
    CLAUSULA_SOLIDARIDAD,
  }
}

// ------------- Props -------------
interface ContractPreviewProps {
  contractData: ContractData
  currentFieldId: keyof ContractData
}

// ------------- Component -------------
export function ContractPreview({ contractData, currentFieldId }: ContractPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  // Merge + normalizaciones + bloques
  const values = useMemo(() => {
    const def = getDefaultValues()
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

  // Ancla para scroll/resaltado
  const anchorKey = useMemo(
    () => getAnchorKey(String(currentFieldId)),
    [currentFieldId]
  )

  // Render 1-pass con placeholders
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

            if (start > lastIndex) {
              elements.push(<span key={`t-${lineIndex}-${lastIndex}`}>{line.slice(lastIndex, start)}</span>)
            }

            globalFieldCounter++
            const currentValue = (values[key] as unknown as string) ?? ""
            const isCurrentField =
              (key === currentFieldId || key === (anchorKey as any)) && Boolean(values[key])

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
  }, [template, values, currentFieldId, anchorKey])

  // Auto-scroll al bloque ancla (o al campo si existe como token)
  useEffect(() => {
    if (anchorKey && (values as any)[anchorKey]) {
      let fieldElement =
        document.querySelector(`[id^="field-${String(anchorKey)}-"]`) ||
        document.querySelector(`[id^="field-${String(currentFieldId)}-"]`)
      if (fieldElement && previewRef.current) {
        const containerRect = previewRef.current.getBoundingClientRect()
        const fieldRect = (fieldElement as HTMLElement).getBoundingClientRect()
        const relativeTop = fieldRect.top - containerRect.top + previewRef.current.scrollTop
        previewRef.current.scrollTo({ top: relativeTop - 100, behavior: "smooth" })
      }
    }
  }, [anchorKey, currentFieldId, values])

  return (
    <div
      ref={previewRef}
      className="bg-gray-50 rounded-lg p-6 text-sm leading-relaxed font-mono select-none max-h=[600px] overflow-y-auto"
      style={{ userSelect: "none" }}
    >
      <div className="whitespace-pre-line">{processed}</div>
    </div>
  )
}
