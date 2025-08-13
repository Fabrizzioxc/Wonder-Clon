"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Previene el scroll cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { href: "/", label: "INICIO" },
    { href: "/documentos", label: "DOCUMENTOS" },
    { href: "/faq", label: "FAQ" },
    { href: "/mi-cuenta", label: "MI CUENTA" },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barra principal */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="bg-slate-800 text-white px-3 py-2 rounded font-bold text-base sm:text-lg">
                WONDER.LEGAL
              </div>
              <span className="ml-2 text-slate-600 font-medium text-sm sm:text-base">España</span>
            </Link>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors text-sm xl:text-base ${
                    isActive(item.href) 
                      ? "text-cyan-600 border-b-2 border-cyan-600 pb-1" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Buscador desktop */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar"
                  className="w-40 lg:w-48 pr-10 border-gray-300 text-sm"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 bg-cyan-500 hover:bg-cyan-600"
                  aria-label="Buscar"
                >
                  <Search className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Botón hamburguesa (mobile y tablet) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden flex-shrink-0"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Componente de menú móvil */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
    </>
  );
}