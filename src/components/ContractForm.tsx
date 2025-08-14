"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Importar los módulos creados
import { ContractData, Question } from '@/types/type'
import { questions } from '@/types/contractQuestions'
import { FormField } from './FormField'
import { ContractPreview } from './ContractPreview'
import { ProgressBar } from './ProgressBar'

// Datos iniciales vacíos
const initialContractData: ContractData = {
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
}

export default function ContractForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [contractData, setContractData] = useState<ContractData>(initialContractData)

  const currentQuestion = questions[currentStep]

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
                        value={contractData[currentQuestion.id]}
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

                    {currentStep === questions.length - 1 ? (
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
              totalSteps={questions.length}
            />
          </div>
        </div>
      </main>
    </div>
  )
}