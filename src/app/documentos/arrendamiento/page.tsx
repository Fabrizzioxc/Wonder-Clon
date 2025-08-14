
import Breadcrumb from "@/components/Breadcrumb";
import DocumentPreview from "@/components/DocumentPreview";
import DocumentHeader from "@/components/DocumentHeader"; // Importa el nuevo componente
import LeaseContent from "@/components/LeaseContent";   // Importa el nuevo componente

export default function ArrendamientoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Document Preview */}
          <DocumentPreview />

          {/* Columna Derecha - Contenido */}
          <div className="lg:col-span-2">
            <DocumentHeader />

            {/* Preguntas */}
            <LeaseContent />  
          </div>
        </div>
      </main>
    </div>
  );
}