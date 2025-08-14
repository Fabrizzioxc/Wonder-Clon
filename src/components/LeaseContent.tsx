export default function LeaseContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          ¿Qué es un contrato de arrendamiento de vivienda habitual?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          El <strong>contrato de arrendamiento de vivienda habitual</strong> es un acuerdo mediante el cual el
          propietario (el <strong>arrendador</strong>) se obliga a poner a disposición o ceder el uso y disfrute de dicho bien
          inmueble al arrendatario o inquilino, que lo ocupará como su vivienda principal o habitual.
        </p>
        <p className="text-slate-700 leading-relaxed">
          La parte arrendataria se compromete, en contraprestación, a satisfacer una serie de pagos conocidos como
          renta de forma más común, alquiler.
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
  );
}