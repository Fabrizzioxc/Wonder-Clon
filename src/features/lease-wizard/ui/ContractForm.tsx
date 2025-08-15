"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { ContractData, Question } from "@/entities/contract/model/type"
import { questions as baseQuestions } from "@/features/lease-wizard/model/contractQuestions"
import { FormField } from "../../../shared/ui/FormField"
import { ContractPreview } from "../../lease-preview/ui/ContractPreview"
import { ProgressBar } from "@/shared/ui/ProgressBar"

// ---------------- Utils ----------------
const toInt = (v: string, d = 1) => {
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : d
}

function makeCoTenantQuestions(idx: 2 | 3): Question[] {
  return [
    {
      id: (`coTenant${idx}Name` as keyof ContractData),
      label: `Nombre completo del co-arrendatario ${idx}:`,
      type: "text",
      placeholder: "Nombre y apellidos / Razón social",
    },
    {
      id: (`coTenant${idx}Type` as keyof ContractData),
      label: `Tipo de co-arrendatario ${idx}:`,
      type: "select",
      options: [
        { value: "fisica", label: "Persona física" },
        { value: "juridica", label: "Persona jurídica" },
      ],
    },
    {
      id: (`coTenant${idx}IdType` as keyof ContractData),
      label: `Tipo de documento del co-arrendatario ${idx}:`,
      type: "select",
      options: [
        { value: "dni", label: "DNI" },
        { value: "nie", label: "NIE" },
        { value: "pasaporte", label: "Pasaporte" },
      ],
    },
    {
      id: (`coTenant${idx}Id` as keyof ContractData),
      label: `Nº de documento del co-arrendatario ${idx}:`,
      type: "text",
      placeholder: idx === 2 ? "12345678A" : "87654321B",
    },
  ]
}

/** Inserta preguntas de co-arrendatarios inmediatamente después del paso "numTenants". */
function useRuntimeQuestions(data: ContractData) {
  return useMemo<Question[]>(() => {
    const cloned = [...baseQuestions]
    const idx = cloned.findIndex(q => q.id === "numTenants")
    if (idx === -1) return cloned

    const n = Math.max(1, toInt(data.numTenants || "1"))
    const inserts: Question[] = []
    if (n >= 2) inserts.push(...makeCoTenantQuestions(2))
    if (n >= 3) inserts.push(...makeCoTenantQuestions(3))

    return [...cloned.slice(0, idx + 1), ...inserts, ...cloned.slice(idx + 1)]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.numTenants]) // << quitar baseQuestions del array para evitar el warning
}

// ---------------- Estado inicial ----------------
const initialContractData: ContractData = {
  // Inmueble
  propertyAddress: "",
  propertySize: "",
  propertyDescription: "",
  furnished: "",
  propertyReference: "",

  // Duración / Fechas
  contractDuration: "",
  availabilityDate: "",

  // Económico
  monthlyRent: "",
  paymentMethod: "",
  bankName: "",
  bankIban: "",
  accountHolder: "",
  includesUtilities: "",
  additionalDeposit: "",
  hasGuarantors: "",
  petsAllowed: "",

  // Encabezado
  contractLocation: "",
  contractDate: "",

  // Arrendador
  numLandlords: "",
  landlordType: "",
  landlordName: "",
  landlordIdType: "",
  landlordId: "",
  landlordAddress: "",
  landlordSigner: "",
  landlordEmail: "",

  // Arrendatarios
  numTenants: "1",
  tenantType: "",
  tenantName: "",
  tenantIdType: "",
  tenantId: "",
  tenantSigner: "",
  tenantEmail: "",

  // Co-arrendatarios opcionales
  coTenant2Name: "",
  coTenant2Type: "fisica",
  coTenant2IdType: "dni",
  coTenant2Id: "",
  coTenant3Name: "",
  coTenant3Type: "fisica",
  coTenant3IdType: "dni",
  coTenant3Id: "",
}

export default function ContractForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [contractData, setContractData] = useState<ContractData>(initialContractData)

  const runtimeQuestions = useRuntimeQuestions(contractData)

  // Ajustar índice si cambia la cantidad de pasos
  useEffect(() => {
    if (currentStep > runtimeQuestions.length - 1) {
      setCurrentStep(runtimeQuestions.length - 1)
    }
  }, [runtimeQuestions.length, currentStep])

  // Limpiar co-arrendatarios al bajar el número
  useEffect(() => {
    const n = Math.max(1, toInt(contractData.numTenants || "1"))
    setContractData(prev => {
      const next = { ...prev }
      let changed = false
      if (n < 2) {
        if (next.coTenant2Name || next.coTenant2Id) changed = true
        next.coTenant2Name = ""
        next.coTenant2Type = "fisica"
        next.coTenant2IdType = "dni"
        next.coTenant2Id = ""
      }
      if (n < 3) {
        if (next.coTenant3Name || next.coTenant3Id) changed = true
        next.coTenant3Name = ""
        next.coTenant3Type = "fisica"
        next.coTenant3IdType = "dni"
        next.coTenant3Id = ""
      }
      return changed ? next : prev
    })
  }, [contractData.numTenants])

  const currentQuestion = runtimeQuestions[currentStep]

  const handleInputChange = (value: string) => {
    setContractData(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < runtimeQuestions.length - 1) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Contrato de arrendamiento de vivienda habitual
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Columna Izquierda - Formulario */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question" className="text-base font-medium text-slate-800">
                      {currentQuestion.label}
                    </Label>
                    <div className="mt-2">
                      <FormField
                        question={currentQuestion}
                        value={contractData[currentQuestion.id] as string}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Navegación */}
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

                    {currentStep === runtimeQuestions.length - 1 ? (
                      <Button
                        onClick={handleExportPDF}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white"
                      >
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

            {/* Links adicionales */}
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

          {/* Columna Central - Vista Previa del Documento */}
          <div className="col-span-12 lg:col-span-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <ContractPreview
                  contractData={contractData}
                  currentFieldId={currentQuestion.id}
                />
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Barra de Progreso */}
          <div className="col-span-12 lg:col-span-2">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={runtimeQuestions.length}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
