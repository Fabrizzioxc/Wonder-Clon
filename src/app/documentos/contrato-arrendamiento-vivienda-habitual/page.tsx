import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DocPage() {
  return (
    <main className="container mx-auto px-4 py-10 grid md:grid-cols-[2fr,1fr] gap-6">
      <section>
        <h1 className="text-2xl font-semibold mb-2">Contrato de arrendamiento de vivienda habitual</h1>
        <p className="text-sm text-muted-foreground">Última revisión, formatos (Word/PDF), 10–15 páginas, rating ★★★★☆</p>
        <div className="prose prose-sm mt-4">
          <h2>¿Qué es?</h2>
          <p>Descripción breve del contrato y tipos de arrendamiento.</p>
          <h2>¿Cómo funciona?</h2>
          <ol><li>Elegir modelo</li><li>Rellenar</li><li>Guardar/Imprimir</li></ol>
        </div>
      </section>

      <aside>
        <Card>
          <CardHeader className="font-medium">Vista previa</CardHeader>
          <CardContent>
            <Link className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
                  href="/crear/contrato-arrendamiento-vivienda-habitual">
              Rellenar el modelo
            </Link>
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}
