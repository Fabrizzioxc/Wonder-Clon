// src/components/Breadcrumb.tsx

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  return (
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
  );
}
