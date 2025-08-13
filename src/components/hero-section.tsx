import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">¡Crea fácilmente tus documentos legales!</h1>

        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Un formulario muy intuitivo te guiará en la redacción de tus documentos
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar un documento"
              className="w-full h-14 text-lg pl-6 pr-16 border-gray-300 rounded-lg shadow-sm"
            />
            <Button
              size="lg"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-cyan-500 hover:bg-cyan-600 rounded-lg"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
