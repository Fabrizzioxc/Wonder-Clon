// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-blue-800">
          WONDER<span className="text-gray-600">.LEGAL</span>
        </Link>
        <ul className="flex gap-6">
          <li><Link href="/" className="hover:text-blue-600">Inicio</Link></li>
          <li><Link href="/documentos" className="hover:text-blue-600">Documentos</Link></li>
          <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
          <li><Link href="/mi-cuenta" className="hover:text-blue-600">Mi cuenta</Link></li>
        </ul>
      </div>
    </nav>
  );
}
