// src/components/DocumentPreview.tsx

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"


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
                    priority={true}
                  />
                </div>

                {/* How it works section */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-lg">¿Cómo funciona?</h3>

                  <div className="flex items-start space-x-3">
                    <div className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Elegir este modelo</h4>
                    <p className="text-sm text-slate-600">
                      Empieza haciendo clic en “Rellenar el modelo”
                    </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Rellenar el documento</h4>
                    <p className="text-sm text-slate-600">
                      Contesta a algunas preguntas y tu documento tipo se creará automáticamente.
                    </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Guardar - Imprimir</h4>
                    <p className="text-sm text-slate-600">
                      ¡Tu documento está ya listo! Lo recibirás en los formatos Word y PDF. Lo podrás modificar.
                    </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Consultar a un abogado</h4>
                    <p className="text-sm text-slate-600">
                      Puedes optar por recurrir a los servicios de un abogado después de haber rellenado el documento.
                    </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

  );
}
