import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-slate-800 text-white px-4 py-2 rounded font-bold text-lg">
              WONDER.LEGAL
            </div>
            <span className="ml-2 text-slate-600 font-medium">España</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-cyan-500 font-medium border-b-2 border-cyan-500 pb-1"
            >
              INICIO
            </Link>
            <Link
              href="/documentos"
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              DOCUMENTOS
            </Link>
            <Link
              href="/faq"
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/mi-cuenta"
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              MI CUENTA
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar"
                className="w-48 pr-10 border-gray-300"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-cyan-500 hover:bg-cyan-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
