// src/app/documentos/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DocumentosPage() {
  const items = [
    {
      href: "/documentos/arrendamiento",
      title: "Contrato de Arrendamiento",
      description: "Plantilla guiada paso a paso",
      tag: { text: "Guiado", className: "bg-cyan-100 text-cyan-800" },
      meta: "Documento legal",
    },
    {
      href: "/tramites/fut",
      title: "Formulario Único de Trámites (FUT)",
      description: "Formato oficial editable tipo planilla",
      tag: { text: "Nuevo", className: "bg-emerald-100 text-emerald-800" },
      meta: "Trámite Perú",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Documentos disponibles</h1>
          <p className="text-xl text-slate-600">Selecciona una plantilla para comenzar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <Link key={it.href} href={it.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500">
                <CardHeader>
                  <CardTitle className="text-slate-800">{it.title}</CardTitle>
                  <CardDescription className="text-slate-600">{it.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{it.meta}</span>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${it.tag.className}`}>
                      {it.tag.text}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
