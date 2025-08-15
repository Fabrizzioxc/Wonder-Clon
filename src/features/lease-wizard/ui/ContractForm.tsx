// src/features/lease-wizard/ui/ContractForm.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import Link from "next/link"

// Tipos y preguntas
import { ContractData, Question } from "@/entities/contract"
import { questions as baseQuestions } from "@/features/lease-wizard/model/contractQuestions"

// UI
import { FormField } from "@/shared/ui/FormField"
import { ContractPreview } from "@/features/lease-preview/ui/ContractPreview"
import { ProgressBar } from "@/shared/ui/ProgressBar"

// ---------------- Utils (dinámica de co-arrendatarios) ----------------
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

    const n = Math.max(1, toInt(String(data.numTenants || "1")))
    const inserts: Question[] = []
    if (n >= 2) inserts.push(...makeCoTenantQuestions(2))
    if (n >= 3) inserts.push(...makeCoTenantQuestions(3))

    return [...cloned.slice(0, idx + 1), ...inserts, ...cloned.slice(idx + 1)]
    // Nota: NO pongas baseQuestions en deps o verás el warning de react-hooks/exhaustive-deps
  }, [data.numTenants])
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
  numTenants: "1", // inicia en 1
  tenantType: "",
  tenantName: "",
  tenantIdType: "",
  tenantId: "",
  tenantSigner: "",
  tenantEmail: "",
  // Co-arrendatarios (solo inicializa los string simples si quieres)
  coTenant2Name: "",
  // ❌ NO inicializar union types con "" (dejalos ausentes)
  // coTenant2Type: "",
  // coTenant2IdType: "",
  coTenant2Id: "",
  coTenant3Name: "",
  // coTenant3Type: "",
  // coTenant3IdType: "",
  coTenant3Id: "",
}

export default function ContractForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [contractData, setContractData] = useState<ContractData>(initialContractData)

  // 🔀 Preguntas calculadas en runtime según numTenants
  const questions = useRuntimeQuestions(contractData)

  // Asegura que currentStep siempre esté dentro de rango cuando cambie la longitud
  useEffect(() => {
    if (currentStep >= questions.length) {
      setCurrentStep(Math.max(0, questions.length - 1))
    }
  }, [questions.length, currentStep])

  const currentQuestion = questions[currentStep]
  const isLastStep = currentStep === questions.length - 1

  const handleInputChange = (value: string) => {
    setContractData((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  // 2) PDF vía /api/pdf
  const [isDownloading, setIsDownloading] = useState(false)
  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractData }),
      })
      if (!res.ok) throw new Error("PDF generation failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "contrato-arrendamiento.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      alert("No se pudo generar el PDF.")
    } finally {
      setIsDownloading(false)
    }
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
                        // Siempre pasar string para evitar TS2322
                        value={String(contractData[currentQuestion.id as keyof ContractData] ?? "")}
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

                    {isLastStep ? (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleDownload}
                          disabled={isDownloading}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                          title="Descargar documento"
                        >
                          <Download className="h-4 w-4" />
                          {isDownloading ? "Generando..." : "Descargar"}
                        </Button>
                      </div>
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
              totalSteps={questions.length}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
  