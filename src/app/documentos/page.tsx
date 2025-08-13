import Link from "next/link"

export default function DocumentosPage() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Documentos</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Contrato de arrendamiento de vivienda habitual</h2>
          <p className="text-sm text-slate-600 mb-4">Rellena preguntas y genera el contrato listo para imprimir.</p>
          <Link href="/crear/contrato-arrendamiento-vivienda-habitual" className="text-emerald-600 font-medium">
            Rellenar el modelo →
          </Link>
        </div>
      </div>
    </section>
  )
}
