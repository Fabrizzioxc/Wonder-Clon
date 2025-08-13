import { Button } from "@/components/ui/button"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-navy-900 mb-12">FAQ</h1>

        {/* Pricing Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-navy-900 mb-8">
            ¿Qué servicios ofrece el sitio web y cuánto cuestan?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Left Column - Sin suscripción */}
            <div className="border border-gray-300 rounded-lg">
              <div className="bg-gray-50 p-4 text-center border-b">
                <h3 className="font-semibold text-navy-900">Sin suscripción</h3>
              </div>
              <div className="p-4">
                <div className="border-b py-4">
                  <p className="text-sm text-gray-600">Creación de un documento</p>
                </div>
                <div className="py-4">
                  <p className="text-sm text-gray-600">Consulta a un abogado</p>
                </div>
              </div>
            </div>

            {/* Middle Column - Suscripción (Highlighted) */}
            <div className="border-2 border-cyan-400 rounded-lg bg-cyan-50 relative">
              <div className="bg-cyan-100 p-4 text-center border-b border-cyan-200">
                <h3 className="font-semibold text-navy-900">
                  Suscripción ilimitada
                  <br />
                  <span className="text-sm">GRATUITA durante 7 días,</span>
                  <br />
                  <span className="text-sm">luego 39,95 € al mes</span>
                </h3>
              </div>
              <div className="p-4">
                <div className="border-b border-cyan-200 py-4">
                  <p className="font-semibold text-cyan-700">GRATUITO</p>
                </div>
                <div className="py-4">
                  <p className="font-semibold text-cyan-700">solo 19 €</p>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full">
                  ¡Prueba gratuita!
                </Button>
              </div>
            </div>

            {/* Right Column - Sin suscripción pricing */}
            <div className="border border-gray-300 rounded-lg">
              <div className="bg-gray-50 p-4 text-center border-b">
                <h3 className="font-semibold text-navy-900">Sin suscripción</h3>
              </div>
              <div className="p-4">
                <div className="border-b py-4">
                  <p className="text-sm">Entre 1,98 € y 79,99 €</p>
                </div>
                <div className="py-4">
                  <p className="text-sm">29 €</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <div className="space-y-12">
          {/* Subscription FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">¿Cómo funciona la suscripción?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Inscribiéndote:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Puedes rellenar y descargar gratuitamente todos los documentos que desees de forma{" "}
                  <strong>ilimitada</strong>
                </li>
                <li>
                  Cada <strong>consulta a los abogados</strong> cuesta <strong>solo 19 €</strong>.
                </li>
              </ul>
              <p>
                La suscripción es <strong>totalmente gratuita durante 7 días</strong>. Luego, se facturan 39,95 €
                mensuales.
              </p>
              <p>
                Puedes darte de baja de la suscripción en cualquier momento, incluso durante el periodo gratuito de
                prueba. Basta con hacer clic sobre "Dar de baja" en tu cuenta.
              </p>
              <p>Si te das de baja de la suscripción durante el periodo de prueba, aún no habrás pagado nada.</p>
            </div>
          </section>

          {/* Document Creation FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">¿Cómo rellenar y modificar un documento?</h2>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
              <li>Eliges un documento.</li>
              <li>
                Vas viendo cómo se va creando el documento mientras vas respondiendo a un cuestionario: se añaden o se
                quitan artículos, se cambian párrafos, se modifican ciertas palabras...
              </li>
              <li>
                Al finalizar, descargarás el documento creado en formatos Word y PDF. Podrás modificar el Word y
                volverlo a utilizar cómo y cuándo quieras.
              </li>
              <li>Si lo deseas, puedes pedir consejo a un abogado.</li>
            </ol>
          </section>

          {/* Lawyer Consultation FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">¿Cómo puedo consultar a un abogado?</h2>
            <div className="space-y-4 text-gray-700">
              <p>¿Tienes alguna pregunta? ¿Necesitas algún consejo personalizado?</p>
              <p>
                Te ofrecemos la posibilidad de recurrir a los servicios de un abogado que trabajará para ti durante una
                sesión de consulta de 30 minutos.
              </p>
              <p>
                Puedes plantearle todo tipo de preguntas sobre cualquier tema y no solo relativas a un documento
                concreto.
              </p>
              <p>
                Tienes la posibilidad de elegir esta opción en tu cuenta o al final del formulario. El abogado te
                contestará menos de 24 horas después de encargarlo.
              </p>
            </div>
          </section>

          {/* Email Issue FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">
              He comprado un documento pero no lo he recibido por correo electrónico. ¿Qué hago?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Es muy raro, pero puede pasar.</p>
              <p>No hay problema, puedes seguir el procedimiento establecido para recuperar un documento.</p>
            </div>
          </section>

          {/* Document Creation FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">¿Quién redacta los modelos?</h2>
            <div className="space-y-4 text-gray-700">
              <p>Los modelos los redactan abogados y juristas.</p>
              <p>El equipo de redacción aumenta constantemente y según el éxito del sitio web.</p>
            </div>
          </section>

          {/* Document Review FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">¿Quién revisará mi documento?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Nadie</strong>: ninguna persona revisará los documentos.
              </p>
              <p>
                Abogados y juristas crean los modelos iniciales. A continuación nuestro programa informático construye
                automáticamente el documento que precises en función de tus respuestas al formulario.
              </p>
              <p>
                Los modelos cubren la mayor parte de los casos habituales. En el caso de que pienses que el documento no
                se adapta a tu caso concreto, haz que lo lea un abogado.
              </p>
              <p>Además, en nuestro sitio web podrás solicitar una sesión de consulta con un abogado.</p>
            </div>
          </section>

          {/* Form Questions FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">
              ¿Debo contestar a todas y cada una de las preguntas del formulario?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>No, pero es aconsejable.</p>
              <p>
                El documento se va construyendo en función tus respuestas. Algunas de las preguntas sirven únicamente
                para rellenar los espacios en blanco dentro del modelo. Otras añadirán o eliminarán párrafos enteros. Te
                recomendamos contestar cuidadosamente a las preguntas.
              </p>
              <p>
                Si no sabes cómo contestar, un texto de ayuda, situado junto a cada espacio del formulario, te irá
                guiando.
              </p>
            </div>
          </section>

          {/* Security FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">¿Es seguro el sitio web?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                ¡Por supuesto! Los datos que nos das están encriptados. No podemos ni siquiera leerlos, y menos
                transmitirlos a un tercero.
              </p>
              <p>
                Los pagos con tarjeta se realizan a través de Mercanet, el sistema de pago seguro de BNP Paribas. Los
                pagos con Paypal se realizan de forma segura mediante Paypal Secure.
              </p>
              <p>
                Nunca tenemos acceso a los números de tu tarjeta de crédito o débito ni a tus datos de identificación.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
