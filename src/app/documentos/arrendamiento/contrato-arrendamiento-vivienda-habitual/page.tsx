"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ContractData {
  propertyAddress: string
  propertySize: string
  propertyDescription: string
  furnished: string
  propertyReference: string
  contractDuration: string
  availabilityDate: string
  monthlyRent: string
  paymentMethod: string
  bankName: string
  bankIban: string
  accountHolder: string
  includesUtilities: string
  additionalDeposit: string
  hasGuarantors: string
  petsAllowed: string
  contractLocation: string
  contractDate: string
  numLandlords: string
  landlordType: string
  landlordName: string
  landlordIdType: string
  landlordId: string
  landlordAddress: string
  landlordSigner: string
  landlordEmail: string
  numTenants: string
  tenantType: string
  tenantName: string
  tenantIdType: string
  tenantId: string
  tenantSigner: string
  tenantEmail: string
}

const questions = [
  {
    id: "propertyAddress",
    label: "Dirección completa de la vivienda que se desea alquilar:",
    type: "text",
    placeholder: "Ej. C/Rey, 15, 2º, C. 28003. Madrid",
  },
  {
    id: "propertySize",
    label: "Número de metros cuadrados construidos que dispone la vivienda:",
    type: "number",
    placeholder: "Escribe un número",
  },
  {
    id: "propertyDescription",
    label: "Describe las partes, dependencias o espacios que forman la vivienda:",
    type: "textarea",
    placeholder:
      "Ej. Salón con cocina americana, tres dormitorios, dos baños, un aseo, un salón, una plaza de garaje y trastero en el sótano.",
  },
  {
    id: "furnished",
    label: "¿El arrendador entrega la vivienda amueblada?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "propertyReference",
    label: "Introduce la Referencia Catastral de la vivienda:",
    type: "text",
    placeholder: "Ej. 4359406SC4754J0002PB",
  },
  {
    id: "contractDuration",
    label: "Periodo de duración del contrato:",
    type: "text",
    placeholder: "Ej. 1 año",
  },
  {
    id: "availabilityDate",
    label: "Fecha en la que el arrendador pone la vivienda a disposición:",
    type: "date",
    placeholder: "dd/mm/aaaa",
  },
  {
    id: "monthlyRent",
    label: "Importe de la renta mensual:",
    type: "number",
    placeholder: "Introduce el importe en euros",
  },
  {
    id: "paymentMethod",
    label: "Forma de pago de la renta:",
    type: "select",
    options: [
      { value: "transferencia", label: "Transferencia bancaria" },
      { value: "domiciliacion", label: "Domiciliación bancaria" },
      { value: "efectivo", label: "Efectivo" },
    ],
  },
  {
    id: "bankName",
    label: "Nombre del banco:",
    type: "text",
    placeholder: "Ej. Banco Santander",
  },
  {
    id: "bankIban",
    label: "IBAN de la cuenta bancaria:",
    type: "text",
    placeholder: "Ej. ES6600190020961234567890",
  },
  {
    id: "accountHolder",
    label: "Titular de la cuenta bancaria:",
    type: "text",
    placeholder: "Nombre del titular",
  },
  {
    id: "includesUtilities",
    label: "¿Incluye suministros (luz, agua, gas, tasas)?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "additionalDeposit",
    label: "¿Se entrega depósito/fianza adicional?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "hasGuarantors",
    label: "¿El inquilino cuenta con avalistas o fiadores?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "petsAllowed",
    label: "¿El inquilino puede tener mascotas?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "contractLocation",
    label: "Localidad donde se firma el contrato:",
    type: "text",
    placeholder: "Ej. Madrid",
  },
  {
    id: "contractDate",
    label: "Fecha de firma del contrato:",
    type: "date",
    placeholder: "dd/mm/aaaa",
  },
  {
    id: "numLandlords",
    label: "Número de arrendadores:",
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ],
  },
  {
    id: "landlordType",
    label: "Tipo de arrendador:",
    type: "radio",
    options: [
      { value: "fisica", label: "Persona física" },
      { value: "juridica", label: "Persona jurídica" },
    ],
  },
  {
    id: "landlordName",
    label: "Nombre completo del arrendador:",
    type: "text",
    placeholder: "Nombre y apellidos",
  },
  {
    id: "landlordIdType",
    label: "Tipo de documento de identificación del arrendador:",
    type: "select",
    options: [
      { value: "dni", label: "DNI" },
      { value: "nie", label: "NIE" },
      { value: "pasaporte", label: "Pasaporte" },
    ],
  },
  {
    id: "landlordId",
    label: "Número de documento de identificación del arrendador:",
    type: "text",
    placeholder: "Ej. 12345678A",
  },
  {
    id: "landlordAddress",
    label: "Dirección del arrendador:",
    type: "text",
    placeholder: "Dirección completa",
  },
  {
    id: "landlordSigner",
    label: "¿Quién firma el contrato por la parte del arrendador?",
    type: "radio",
    options: [
      { value: "arrendador", label: "El arrendador" },
      { value: "representante", label: "Un representante" },
    ],
  },
  {
    id: "landlordEmail",
    label: "E-mail del arrendador (opcional):",
    type: "textarea",
    placeholder: "correo@ejemplo.com",
  },
  {
    id: "numTenants",
    label: "Número de arrendatarios:",
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ],
  },
  {
    id: "tenantType",
    label: "Tipo de arrendatario:",
    type: "radio",
    options: [
      { value: "fisica", label: "Persona física" },
      { value: "juridica", label: "Persona jurídica" },
    ],
  },
  {
    id: "tenantName",
    label: "Nombre completo del arrendatario:",
    type: "text",
    placeholder: "Nombre y apellidos",
  },
  {
    id: "tenantIdType",
    label: "Tipo de documento de identificación del arrendatario:",
    type: "select",
    options: [
      { value: "dni", label: "DNI" },
      { value: "nie", label: "NIE" },
      { value: "pasaporte", label: "Pasaporte" },
    ],
  },
  {
    id: "tenantId",
    label: "Número de documento de identificación del arrendatario:",
    type: "text",
    placeholder: "Ej. 87654321B",
  },
  {
    id: "tenantSigner",
    label: "¿Quién firma el contrato por la parte del arrendatario?",
    type: "radio",
    options: [
      { value: "arrendatario", label: "El arrendatario" },
      { value: "representante", label: "Un representante" },
    ],
  },
  {
    id: "tenantEmail",
    label: "E-mail del arrendatario (opcional):",
    type: "textarea",
    placeholder: "correo@ejemplo.com",
  },
]

export default function ContractFormPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [contractData, setContractData] = useState<ContractData>({
    propertyAddress: "",
    propertySize: "",
    propertyDescription: "",
    furnished: "",
    propertyReference: "",
    contractDuration: "",
    availabilityDate: "",
    monthlyRent: "",
    paymentMethod: "",
    bankName: "",
    bankIban: "",
    accountHolder: "",
    includesUtilities: "",
    additionalDeposit: "",
    hasGuarantors: "",
    petsAllowed: "",
    contractLocation: "",
    contractDate: "",
    numLandlords: "",
    landlordType: "",
    landlordName: "",
    landlordIdType: "",
    landlordId: "",
    landlordAddress: "",
    landlordSigner: "",
    landlordEmail: "",
    numTenants: "",
    tenantType: "",
    tenantName: "",
    tenantIdType: "",
    tenantId: "",
    tenantSigner: "",
    tenantEmail: "",
  })

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleInputChange = (value: string) => {
    setContractData((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleExportPDF = () => {
    alert("Funcionalidad de exportación a PDF en desarrollo")
  }

  const getContractPreview = () => {
    const currentValue = contractData[currentQuestion.id as keyof ContractData]
    const highlightedText = currentValue || "esto es una prueba de la direccion de la vivien"

    return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA

En ${contractData.contractLocation || "Madrid"}, a ${contractData.contractDate || "1 de agosto 2025"}

REUNIDOS

De una parte,
${contractData.landlordName || "Jose Martinez"}, con DNI/NIF ${contractData.landlordId || "12345678A"}, y con domicilio en: ${contractData.landlordAddress || "Calle Falsa 123, 28080 Madrid"}.
En adelante, el "Arrendador".

Y de otra parte,
${contractData.tenantName || "Luis Gomez"}, con DNI/NIF ${contractData.tenantId || "87654321B"}, y con domicilio en: ${contractData.tenantName ? contractData.propertyAddress : "Calle Mayor 123, 28013 Madrid"}.
En adelante, el "Arrendatario".

Y que, a continuación, serán referidas, individualmente como la "Parte" y, de forma conjunta, como las "Partes". Las Partes, en la calidad con la que actúan, y reconociéndose capacidad jurídica para contratar y obligarse, y en especial para el otorgamiento del presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA. En adelante, el "Contrato".

EXPONEN

I. Que el Arrendador es propietario de la vivienda ubicada en: ${currentQuestion.id === "propertyAddress" ? highlightedText : contractData.propertyAddress || "esto es una prueba de la direccion de la vivienda"}, con la siguiente Referencia Catastral: ${contractData.propertyReference || "1234567AB1234C0001XY"}. La vivienda cuenta con ${contractData.propertySize || "80"} metros cuadrados de superficie, y presenta las siguientes características:

${contractData.propertyDescription || "Salón, cocina, 3 dormitorios, 2 baños, garaje, trastero"}

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

El arrendamiento se pacta por el plazo siguiente: ${contractData.contractDuration || "1 año"}, a contar desde el siguiente día: ${contractData.availabilityDate || "1 de septiembre 2025"}.

TERCERA. LA RENTA Y SU ACTUALIZACIÓN

La renta pactada por las Partes es de ${contractData.monthlyRent || "ochocientos"} euros (${contractData.monthlyRent || "800"} €) mensuales que el Arrendatario pagará al Arrendador cada mes, anticipadamente.

El pago se realizará mediante ${contractData.paymentMethod === "transferencia" ? "transferencia bancaria" : contractData.paymentMethod === "domiciliacion" ? "domiciliación bancaria" : "ingreso o transferencia bancaria"} a favor de la cuenta cuyos datos son:

Entidad bancaria: ${contractData.bankName || "Banco Santander"}
IBAN identificador de la cuenta: ${contractData.bankIban || "ES6600190020961234567890"}
Titular de la cuenta: ${contractData.accountHolder || "Carlos García Pérez"}`
  }

  const renderFormField = () => {
    const currentValue = contractData[currentQuestion.id as keyof ContractData]

    switch (currentQuestion.type) {
      case "textarea":
        return (
          <Textarea
            value={currentValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="min-h-[100px]"
          />
        )

      case "radio":
        return (
          <RadioGroup value={currentValue} onValueChange={handleInputChange}>
            {currentQuestion.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "select":
        return (
          <Select value={currentValue} onValueChange={handleInputChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "date":
        return <Input type="date" value={currentValue} onChange={(e) => handleInputChange(e.target.value)} />

      case "number":
        return (
          <Input
            type="number"
            value={currentValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
          />
        )

      default:
        return (
          <Input
            value={currentValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Contrato de arrendamiento de vivienda habitual</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Form (narrower) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question" className="text-base font-medium text-slate-800">
                      {currentQuestion.label}
                    </Label>
                    <div className="mt-2">{renderFormField()}</div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="flex items-center space-x-2 bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Anterior</span>
                    </Button>

                    {currentStep === questions.length - 1 ? (
                      <Button onClick={handleExportPDF} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        Exportar a PDF
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center space-x-2"
                      >
                        <span>Paso siguiente</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Link href="/documentos/arrendamiento" className="text-cyan-500 hover:text-cyan-600 text-sm">
                Modificar el modelo
              </Link>
              <br />
              <Link href="#" className="text-cyan-500 hover:text-cyan-600 text-sm">
                Documento guardado en tu cuenta
              </Link>
            </div>
          </div>

          {/* Center Column - Document Preview */}
          <div className="col-span-12 lg:col-span-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div
                  className="bg-gray-50 rounded-lg p-4 text-xs leading-relaxed font-mono select-none max-h-[600px] overflow-y-auto"
                  style={{ userSelect: "none" }}
                >
                  <pre className="whitespace-pre-wrap">
                    {getContractPreview()
                      .split(
                        contractData[currentQuestion.id as keyof ContractData] ||
                          "esto es una prueba de la direccion de la vivien",
                      )
                      .map((part, index, array) => {
                        if (index === array.length - 1) return part
                        return (
                          <span key={index}>
                            {part}
                            <span className="bg-yellow-200 px-1">
                              {contractData[currentQuestion.id as keyof ContractData] ||
                                "esto es una prueba de la direccion de la vivien"}
                            </span>
                          </span>
                        )
                      })}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Progress Bar */}
          <div className="col-span-12 lg:col-span-2">
            <div className="sticky top-8">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-slate-600">Progresión:</span>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-slate-800 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-1">
                      <span className="text-sm font-medium text-slate-800">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
