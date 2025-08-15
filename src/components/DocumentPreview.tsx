// src/components/DocumentPreview.tsx
"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

function StepItem({
  num,
  title,
  text,
}: {
  num: number
  title: string
  text: string
}) {
  return (
    <div className="flex items-start gap-3">
      {/* Círculo: no shrink + cuadrado perfecto + centrado */}
      <div className="flex-none w-8 aspect-square rounded-full bg-slate-800 text-white grid place-items-center text-sm font-bold leading-none shadow-sm select-none">
        {num}
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-600">{text}</p>
      </div>
    </div>
  )
}

export default function DocumentPreview() {
  return (
    <div className="lg:col-span-1">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="bg-white rounded-lg p-4 mb-4">
            <Image
              src="/img/doc-preview.png"
              alt="Vista previa del contrato de arrendamiento"
              className="w-full h-auto rounded-lg"
              width={400}
              height={300}
              priority
            />
          </div>

          {/* How it works section */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">¿Cómo funciona?</h3>

            <StepItem
              num={1}
              title="Elegir este modelo"
              text='Empieza haciendo clic en “Rellenar el modelo”'
            />
            <StepItem
              num={2}
              title="Rellenar el documento"
              text="Contesta a algunas preguntas y tu documento tipo se creará automáticamente."
            />
            <StepItem
              num={3}
              title="Guardar - Imprimir"
              text="¡Tu documento está ya listo! Lo recibirás en los formatos Word y PDF. Lo podrás modificar."
            />
            <StepItem
              num={4}
              title="Consultar a un abogado"
              text="Puedes optar por recurrir a los servicios de un abogado después de haber rellenado el documento."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
