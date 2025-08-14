import Image from "next/image"

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/img/home-hero.webp"
                alt="Documento legal con pluma y firma"
                className="w-full max-w-md"
                width={400}
                height={300}
                priority={true}
              />
            </div>
          </div>

          {/* Right side - Steps */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-8">¿Cómo funciona?</h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Elegir un modelo</h3>
                  <p className="text-slate-600">Puedes elegir entre nuestros 490 documentos disponibles.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Rellenar el documento</h3>
                  <p className="text-slate-600">
                    Contesta a algunas preguntas y tu documento se creará automáticamente.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Guardar - Imprimir</h3>
                  <p className="text-slate-600">¡Tu documento ya se puede utilizar! Utilízalo para lo que quieras.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Consultar a un abogado</h3>
                  <p className="text-slate-600">Si lo deseas, puedes pedir la ayuda de un abogado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
