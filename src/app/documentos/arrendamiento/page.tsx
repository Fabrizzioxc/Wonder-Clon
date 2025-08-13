"use client";

import { useState } from "react";

export default function ArrendamientoWizard() {
  const [step, setStep] = useState(1);

  return (
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <h2 className="text-2xl font-semibold">Contrato de Arrendamiento</h2>
      <p className="text-slate-600 mt-2">Completa el formulario (sin persistencia todavía).</p>

      <div className="mt-8 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-medium">Paso 1: Datos de las partes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="input" placeholder="Nombre del Arrendador" />
              <input className="input" placeholder="DNI del Arrendador" />
              <input className="input" placeholder="Nombre del Arrendatario" />
              <input className="input" placeholder="DNI del Arrendatario" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium">Paso 2: Inmueble y condiciones</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="input" placeholder="Dirección del inmueble" />
              <input className="input" placeholder="Monto mensual (PEN)" type="number" />
              <input className="input" placeholder="Plazo (meses)" type="number" />
              <input className="input" placeholder="Fecha de inicio (YYYY-MM-DD)" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium">Paso 3: Revisión</h3>
            <p className="text-sm text-slate-600">
              Aquí mostraremos un preview del documento antes de generar el PDF.
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            className="btn-secondary"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            Atrás
          </button>
          {step < 3 ? (
            <button className="btn-primary" onClick={() => setStep((s) => Math.min(3, s + 1))}>
              Siguiente
            </button>
          ) : (
            <button className="btn-primary">Generar documento</button>
          )}
        </div>
      </div>
    </section>
  );
}
