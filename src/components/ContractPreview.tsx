"use client"

import React, { useEffect, useRef } from 'react'
import { ContractData } from '@/types/type'

interface ContractPreviewProps {
  contractData: ContractData
  currentFieldId: keyof ContractData
}

export function ContractPreview({ contractData, currentFieldId }: ContractPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  // Función para generar el template del contrato con placeholders únicos
  const getContractTemplate = (): string => {
    return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA

En {{contractLocation}}, a {{contractDate}}

REUNIDOS

De una parte,
{{landlordName}}, con DNI/NIF {{landlordId}}, y con domicilio en: {{landlordAddress}}.
En adelante, el "Arrendador".

Y de otra parte,
{{tenantName}}, con DNI/NIF {{tenantId}}, y con domicilio en: {{propertyAddress}}.
En adelante, el "Arrendatario".

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

El presente Contrato tiene por objeto la constitución y regulación del arrendamiento de la Vivienda entre el Arrendador y el Arrendatario, de acuerdo con las condiciones pactadas en este Contrato.

El Arrendatario utilizará la Vivienda exclusivamente como vivienda habitual propia, no pudiéndose variar dicho uso sin consentimiento previo, expreso, y por escrito del Arrendador. El incumplimiento de esto será motivo de resolución del contrato.

La Vivienda se pondrá a disposición del Arrendatario con la entrega de llaves, recibiendo la Vivienda en un estado adecuado al fin al que se destina y con conocimiento previo de las características de la misma, especialmente su estado de uso y conservación.

SEGUNDA. DURACIÓN Y PRÓRROGAS

El arrendamiento se pacta por el plazo siguiente: {{contractDuration}}, a contar desde el siguiente día: {{availabilityDate}}.

TERCERA. LA RENTA Y SU ACTUALIZACIÓN

La renta pactada por las Partes es de {{monthlyRent}} euros ({{monthlyRent}} €) mensuales que el Arrendatario pagará al Arrendador cada mes, anticipadamente.

El pago se realizará mediante {{paymentMethod}} a favor de la cuenta cuyos datos son:

Entidad bancaria: {{bankName}}
IBAN identificador de la cuenta: {{bankIban}}
Titular de la cuenta: {{accountHolder}}`
  }

  // Valores por defecto para campos vacíos
  const getDefaultValues = (): Partial<ContractData> => ({
    contractLocation: "Madrid",
    contractDate: "1 de agosto 2025",
    landlordName: "Jose Martinez",
    landlordId: "12345678A",
    landlordAddress: "Calle Falsa 123, 28080 Madrid",
    tenantName: "Luis Gomez",
    tenantId: "87654321B",
    propertyAddress: "Calle Mayor 123, 28013 Madrid",
    propertyReference: "1234567AB1234C0001XY",
    propertySize: "80",
    propertyDescription: "Salón, cocina, 3 dormitorios, 2 baños, garaje, trastero",
    contractDuration: "1 año",
    availabilityDate: "1 de septiembre 2025",
    monthlyRent: "800",
    paymentMethod: "transferencia bancaria",
    bankName: "Banco Santander",
    bankIban: "ES6600190020961234567890",
    accountHolder: "Carlos García Pérez"
  })

  // Función para reemplazar placeholders con valores reales o por defecto
  const processContractText = (): React.ReactElement => {
    const template = getContractTemplate()
    const defaultValues = getDefaultValues()
    
    // Dividir el texto en líneas para procesamiento
    const lines = template.split('\n')
    
    return (
      <div>
        {lines.map((line, lineIndex) => {
          let processedLine = line
          const elements: React.ReactElement[] = []
          let lastIndex = 0

          // Buscar todos los placeholders en esta línea
          const placeholderRegex = /\{\{(\w+)\}\}/g
          let match

          while ((match = placeholderRegex.exec(line)) !== null) {
            const fieldId = match[1] as keyof ContractData
            const placeholder = match[0]
            const startIndex = match.index
            const endIndex = match.index + placeholder.length

            // Agregar texto antes del placeholder
            if (startIndex > lastIndex) {
              elements.push(
                <span key={`text-${lineIndex}-${lastIndex}`}>
                  {line.slice(lastIndex, startIndex)}
                </span>
              )
            }

            // Obtener el valor actual o por defecto
            const currentValue = contractData[fieldId] || defaultValues[fieldId] || `[${fieldId}]`
            
            // Determinar si este campo debe estar resaltado
            const isCurrentField = fieldId === currentFieldId && contractData[fieldId]
            
            // Agregar el valor del campo con resaltado condicional
            elements.push(
              <span
                key={`field-${lineIndex}-${fieldId}`}
                id={`field-${fieldId}`}
                className={isCurrentField ? "bg-yellow-200 px-1 rounded" : ""}
              >
                {currentValue}
              </span>
            )

            lastIndex = endIndex
          }

          // Agregar el texto restante después del último placeholder
          if (lastIndex < line.length) {
            elements.push(
              <span key={`text-${lineIndex}-${lastIndex}`}>
                {line.slice(lastIndex)}
              </span>
            )
          }

          return (
            <div key={lineIndex}>
              {elements.length > 0 ? elements : line}
            </div>
          )
        })}
      </div>
    )
  }

  // Auto-scroll al campo actual cuando cambia
  useEffect(() => {
    if (currentFieldId && contractData[currentFieldId]) {
      const fieldElement = document.getElementById(`field-${currentFieldId}`)
      if (fieldElement && previewRef.current) {
        // Scroll del contenedor de la vista previa
        const containerRect = previewRef.current.getBoundingClientRect()
        const fieldRect = fieldElement.getBoundingClientRect()
        
        // Calcular la posición relativa del campo dentro del contenedor
        const relativeTop = fieldRect.top - containerRect.top + previewRef.current.scrollTop
        
        // Scroll suave al campo con un offset para mejor visualización
        previewRef.current.scrollTo({
          top: relativeTop - 100,
          behavior: 'smooth'
        })
      }
    }
  }, [currentFieldId, contractData])

  return (
    <div
      ref={previewRef}
      className="bg-gray-50 rounded-lg p-6 text-sm leading-relaxed font-mono select-none max-h-[600px] overflow-y-auto"
      style={{ userSelect: "none" }}
    >
      <div className="whitespace-pre-line">
        {processContractText()}
      </div>
    </div>
  )
}