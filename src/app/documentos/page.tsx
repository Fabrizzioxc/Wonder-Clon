import Link from "next/link";

export default function DocumentosPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold">Documentos disponibles</h1>
      <p className="text-slate-600 mt-2">Selecciona una plantilla para comenzar.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Link href="/documentos/arrendamiento" className="border rounded-xl p-4 hover:bg-slate-50">
          <h3 className="font-medium">Contrato de Arrendamiento</h3>
          <p className="text-sm text-slate-600 mt-1">Plantilla guiada paso a paso</p>
        </Link>
        {/* Agrega más tarjetas si quieres */}
      </div>
    </section>
  );
}
