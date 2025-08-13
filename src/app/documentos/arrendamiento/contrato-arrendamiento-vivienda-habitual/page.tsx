"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ContractData {
  // Datos del arrendador
  landlordName: string
  landlordDni: string
  landlordAddress: string

  // Datos del arrendatario
  tenantName: string
  tenantDni: string
  tenantAddress: string

  // Datos de la vivienda
  propertyAddress: string
  propertyReference: string
  propertyDescription: string

  // Datos del contrato
  contractDate: string
  contractLocation: string
  monthlyRent: string
  deposit: string
  contractDuration: string
}

const questions = [
  {
    id: "propertyAddress",
    label: "Dirección completa de la vivienda que se desea alquilar:",
    placeholder: "Introduce la dirección completa...",
  },
  {
    id: "landlordName",
    label: "Nombre completo del arrendador (propietario):",
    placeholder: "Introduce el nombre completo...",
  },
  {
    id: "landlordDni",
    label: "DNI/NIF del arrendador:",
    placeholder: "Introduce el DNI/NIF...",
  },
  {
    id: "landlordAddress",
    label: "Domicilio del arrendador:",
    placeholder: "Introduce el domicilio...",
  },
  {
    id: "tenantName",
    label: "Nombre completo del arrendatario (inquilino):",
    placeholder: "Introduce el nombre completo...",
  },
  {
    id: "tenantDni",
    label: "DNI/NIF del arrendatario:",
    placeholder: "Introduce el DNI/NIF...",
  },
  {
    id: "tenantAddress",
    label: "Domicilio del arrendatario:",
    placeholder: "Introduce el domicilio...",
  },
  {
    id: "contractLocation",
    label: "Ciudad donde se firma el contrato:",
    placeholder: "Introduce la ciudad...",
  },
  {
    id: "contractDate",
    label: "Fecha de firma del contrato:",
    placeholder: "dd/mm/aaaa",
  },
  {
    id: "monthlyRent",
    label: "Importe mensual del alquiler (en euros):",
    placeholder: "Introduce el importe...",
  },
  {
    id: "deposit",
    label: "Importe de la fianza (en euros):",
    placeholder: "Introduce el importe de la fianza...",
  },
  {
    id: "contractDuration",
    label: "Duración del contrato (en años):",
    placeholder: "Introduce la duración...",
  },
  {
    id: "propertyReference",
    label: "Referencia catastral de la vivienda:",
    placeholder: "Introduce la referencia catastral...",
  },
  {
    id: "propertyDescription",
    label: "Descripción de la vivienda (superficie, habitaciones, etc.):",
    placeholder: "Describe las características de la vivienda...",
  },
]

export default function ContractFormPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [contractData, setContractData] = useState<ContractData>({
    landlordName: "",
    landlordDni: "",
    landlordAddress: "",
    tenantName: "",
    tenantDni: "",
    tenantAddress: "",
    propertyAddress: "",
    propertyReference: "",
    propertyDescription: "",
    contractDate: "",
    contractLocation: "",
    monthlyRent: "",
    deposit: "",
    contractDuration: "",
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
    // PDF export functionality would be implemented here
    alert("Funcionalidad de exportación a PDF en desarrollo")
  }

  const getContractPreview = () => {
    const currentValue = contractData[currentQuestion.id as keyof ContractData]
    const highlightedText = currentValue || "esto es una prueba de la direccion de la vivien"

    return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA

En ${contractData.contractLocation || "Lima"}, a ${contractData.contractDate || "14 de agosto 2025"}

REUNIDOS

De una parte,

${contractData.landlordName || "fabrizzio"}, con DNI/NIF ${contractData.landlordDni || "12312312"}, y con domicilio en: ${contractData.landlordAddress || "peru lima"}.

En adelante, el "Arrendador".

Y de otra parte,

${contractData.tenantName || "______"} con DNI/NIF ${contractData.tenantDni || "______"}, y con domicilio en: ${currentQuestion.id === "propertyAddress" ? highlightedText : contractData.tenantAddress || "esto es una prueba de la direccion de la vivienda"}.

En adelante, el "Arrendatario".

Y que, a continuación, serán referidas, individualmente como la "Parte" y, de forma conjunta, como las "Partes". Las Partes, en la calidad con la que actúan, y reconociéndose capacidad jurídica para contratar y obligarse, y en especial para el otorgamiento del presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA. En adelante, el "Contrato".

EXPONEN

I. Que el Arrendador es propietario de la vivienda ubicada en: ${currentQuestion.id === "propertyAddress" ? highlightedText : contractData.propertyAddress || "esto es una prueba de la direccion de la vivienda"}, con la siguiente Referencia Catastral: ${contractData.propertyReference || "REFERENCIA FRENTE AL MASSSSS"}. La vivienda cuenta con ${contractData.propertyDescription || "2 metros cuadrados de superficie, y presenta las siguientes características:"}

${contractData.propertyDescription || "tres dormitorios vivienda etc asdjnasj das das da"}

En adelante, la "Vivienda".

Dicha superficie y composición, así como sus características y estado son perfectamente conocidas y aceptadas por las partes intervinientes en este contrato. No obstante, la Vivienda se arrienda como cuerpo cierto, así de diferir la superficie real y la aquí descrita, esto no afectará de forma alguna a las condiciones y cláusulas que aquí se fijan, particularmente en lo relativo al precio de la renta.

II. Que el Arrendador ha exhibido una copia del Certificado de Eficiencia Energética de la Vivienda de acuerdo con lo regulado en el Real Decreto 235/2013, de 5 de abril, por el que se aprueba el procedimiento básico para la certificación de la eficiencia energética de los edificios.

III. Que el Arrendatario desea arrendar la Vivienda para su uso personal de vivienda habitual, y el Arrendador está`
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Contrato de arrendamiento de vivienda habitual</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question" className="text-base font-medium text-slate-800">
                      {currentQuestion.label}
                    </Label>
                    <Input
                      id="question"
                      value={contractData[currentQuestion.id as keyof ContractData]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="mt-2"
                    />
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
              <Link href="/documentos/arrendamiento" className="text-cyan-500 hover:text-cyan-600 text-sm">
                Guardarlo (y sigue después)
              </Link>
            </div>
          </div>

          {/* Right Column - Document Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Progresión:</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-slate-800 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-800">{Math.round(progress)}%</span>
              </div>
            </div>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div
                  className="bg-gray-50 rounded-lg p-4 text-xs leading-relaxed font-mono select-none"
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
        </div>
      </main>
    </div>
  )
}
