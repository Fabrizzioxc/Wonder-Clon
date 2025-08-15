// src/app/tramites/fut/page.tsx
"use client";

import { FUTWizard } from "@/features/fut-wizard/ui/FUTWizard";

export default function FUTPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Formulario Único de Trámites (F.U.T.)</h1>
        <FUTWizard />
      </main>
    </div>
  );
}
