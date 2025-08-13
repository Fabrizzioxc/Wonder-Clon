import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Star, FileText, Calendar, FileIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image";

export default function ArrendamientoPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/documentos" className="hover:text-slate-900">
              Documentos
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Particulares</span>
            <ChevronRight className="h-4 w-4" />
            <span>Alojamiento, inmobiliario</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900">Contrato de arrendamiento de vivienda habitual</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Document Preview */}
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
                      <p className="text-sm text-slate-600">Empieza haciendo clic en "Rellenar el modelo"</p>
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
                        ¡Tu documento está ya listo! Lo recibirás en los formatos Word y PDF.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-800 mb-4">Contrato de arrendamiento de vivienda habitual</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    <strong>Última revisión</strong>
                    <br />
                    24/05/2025
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <FileIcon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    <strong>Formatos</strong>
                    <br />
                    Word y PDF
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    <strong>Tamaño</strong>
                    <br />1 a 15 páginas
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-slate-600 ml-2">4,5 - 315 votos</span>
                </div>
              </div>

              <Link
                href="/documentos/arrendamiento/contrato-arrendamiento-vivienda-habitual"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 text-lg font-semibold rounded-full inline-flex items-center justify-center"
              >
                Rellenar el modelo
              </Link>
            </div>

            {/* Content sections */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  ¿Qué es un contrato de arrendamiento de vivienda habitual?
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  El <strong>contrato de arrendamiento de vivienda habitual</strong> es un acuerdo mediante el cual el
                  propietario (el <strong>arrendador</strong>) se obliga a poner a disposición o ceder el uso y disfrute
                  de dicho bien inmueble al arrendatario o inquilino, que lo ocupará como su vivienda principal o
                  habitual.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  La parte arrendataria se compromete, en contraprestación, a satisfacer una serie de pagos conocidos
                  como renta de forma más común, alquiler.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  ¿Qué tipos de contratos de arrendamiento existen?
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Existen diferentes tipos de arrendamiento, dependiendo de cuál sea el espacio que se alquila:
                </p>

                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Contrato de arrendamiento de vivienda habitual:</strong> es aquel acuerdo mediante el cual
                      el arrendador entrega o cede un inmueble a la parte arrendataria para que éste lo ocupe como su
                      vivienda principal o habitual, a cambio del pago de una renta.
                    </div>
                  </li>

                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Contrato de arrendamiento de vivienda por temporada vacacional (turístico):</strong> es
                      aquel acuerdo mediante el cual el arrendador cede el uso del inmueble, de manera temporal, para
                      uso vacacional, de ocio, turismo, durante un tiempo determinado.
                    </div>
                  </li>

                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Contrato de arrendamiento de habitación:</strong> se trata de un acuerdo mediante el cual
                      el arrendatario tiene el derecho a usar una habitación ubicada al interior de una vivienda, así
                      como el derecho a utilizar de forma compartida con otras personas (es decir, no en exclusiva) las
                      zonas comunes de la vivienda (cocina, salón y cuarto de baño) por un tiempo determinado y a cambio
                      del pago de una renta.
                    </div>
                  </li>

                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Contrato de arrendamiento de local de negocio:</strong> es aquel acuerdo mediante el cual
                      el arrendador entrega o cede uno o varios inmuebles a la parte arrendataria para que inicie la
                      actividad comercial que se quiera, a cambio del pago de una renta.
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  ¿Es obligatoria la celebración por escrito de este contrato?
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  <strong>No, no es obligatoria.</strong> Las partes puede acordar un contrato de arrendamiento de
                  vivienda habitual de forma oral, es decir, acordar verbalmente el alquiler
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
