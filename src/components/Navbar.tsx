"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 h-14 grid grid-cols-[auto,1fr,auto] items-center gap-4">
        {/* Logo */}
        <Link href="/" className="font-extrabold tracking-tight text-slate-900">
          <span className="text-indigo-900">WONDER</span>
          <span className="text-slate-600">.LEGAL</span>
        </Link>

        {/* Links centrados */}
        <nav className="justify-self-center">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li><Link href="/" className="hover:text-indigo-700">Inicio</Link></li>
            <li><Link href="/documentos" className="hover:text-indigo-700">Documentos</Link></li>
            <li><Link href="/faq" className="hover:text-indigo-700">FAQ</Link></li>
            <li><Link href="/mi-cuenta" className="hover:text-indigo-700">Mi cuenta</Link></li>
          </ul>
        </nav>

        {/* Buscador a la derecha (sin funcionalidad) */}
        <div className="hidden md:flex items-center gap-2 justify-self-end">
          <div className="relative">
            <input
              aria-label="Buscar"
              placeholder="Buscar"
              className="pl-3 pr-8 h-9 w-56 rounded-full border bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}
