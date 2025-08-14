import { Star, FileText, Calendar, File } from "lucide-react";
import Link from "next/link";

export default function DocumentHeader() {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        Contrato de arrendamiento de vivienda habitual
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-600">
            <strong>Última revisión</strong>
            <br />
            15/08/2025
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <File className="h-4 w-4 text-slate-500" />
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
            <Star
              key={star}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
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
  );
}