"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLinkClick = () => {
    onClose();
  };

  const menuItems = [
    { href: "/", label: "INICIO" },
    { href: "/documentos", label: "DOCUMENTOS" },
    { href: "/faq", label: "FAQ" },
    { href: "/mi-cuenta", label: "MI CUENTA" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay/Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 lg:hidden z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel mobile */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 sm:px-6 py-4 space-y-4">
            {/* Buscador mobile */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar documentos..."
                className="w-full pr-10 border-gray-300"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-cyan-500 hover:bg-cyan-600"
                aria-label="Buscar"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-100"></div>

            {/* Links mobile */}
            <nav className="grid gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`rounded-lg px-4 py-3 text-left transition-colors duration-200 ${
                    isActive(item.href) 
                      ? "bg-cyan-50 text-cyan-700 font-semibold border-l-4 border-cyan-500" 
                      : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Espaciado inferior */}
            <div className="h-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}