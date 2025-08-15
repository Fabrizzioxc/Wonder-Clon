// src/features/fut-preview/ui/FUTPreview.tsx
"use client";

import type { FUTData } from "@/entities/fut/model/type";
import React, { useMemo } from "react";

const splitLines = (text: string, maxChars = 80) => {
  if (!text) return [""];
  const words = text.split(" ");
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length <= maxChars) {
      line = line ? `${line} ${w}` : w;
    } else {
      if (line) out.push(line);
      line = w;
    }
  }
  if (line) out.push(line);
  return out.length ? out : [""];
};

interface Props {
  data: FUTData;
  currentFieldId?: keyof FUTData;
}

export function FUTPreview({ data, currentFieldId }: Props) {
  const isCurrent = (id: keyof FUTData) => currentFieldId === id;

  const sectionI = useMemo(() => {
    const lines = splitLines(data.resumenPedido, 80);
    return [...Array(3)].map((_, i) => (
      <div
        key={i}
        className={`border border-black min-h-[20px] p-1 border-t-0 first:border-t ${
          isCurrent("resumenPedido") && (lines[i] || i === 0) ? "bg-yellow-200" : ""
        }`}
      >
        {lines[i] || ""}
      </div>
    ));
  }, [data.resumenPedido, currentFieldId]);

  const sectionV = useMemo(() => {
    const lines = splitLines(data.fundamentacion, 80);
    return [...Array(10)].map((_, i) => (
      <div
        key={i}
        className={`border border-black min-h-[20px] p-1 border-t-0 first:border-t ${
          isCurrent("fundamentacion") && (lines[i] || i === 0) ? "bg-yellow-200" : ""
        }`}
      >
        {lines[i] || ""}
      </div>
    ));
  }, [data.fundamentacion, currentFieldId]);

  const sectionVI = useMemo(() => {
    const lines = splitLines(data.documentosAdjuntos, 80);
    return [...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`border border-black min-h-[20px] p-1 border-t-0 first:border-t ${
          isCurrent("documentosAdjuntos") && (lines[i] || i === 0) ? "bg-yellow-200" : ""
        }`}
      >
        {lines[i] || ""}
      </div>
    ));
  }, [data.documentosAdjuntos, currentFieldId]);

  return (
    <div className="bg-white border-2 border-black p-4 font-mono text-xs leading-tight select-none">
      {/* Header */}
      <div className="border-2 border-black mb-2">
        <div className="flex items-center justify-between p-2 bg-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white text-xs font-bold">PERÚ</div>
            <div className="text-xs">
              <div className="font-bold">Ministerio</div>
              <div>de Educación</div>
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold text-sm">FORMULARIO ÚNICO DE TRÁMITES (F.U.T.)</div>
            <div className="text-xs">RM N° 0445-2012-ED</div>
            <div className="text-xs">DISTRIBUCIÓN GRATUITA</div>
          </div>
        </div>
      </div>

      {/* I */}
      <div className="border border-black mb-2">
        <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">I.- RESUMEN DE SU PEDIDO:</div>
        <div className="p-2">{sectionI}</div>
      </div>

      {/* II */}
      <div className="border border-black mb-2">
        <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">II.- DEPENDENCIA O AUTORIDAD A QUIEN SE DIRIGE</div>
        <div className="p-2">
          <div className={`border border-black min-h-[20px] p-1 ${isCurrent("dependencia") ? "bg-yellow-200" : ""}`}>
            {data.dependencia || ""}
          </div>
        </div>
      </div>

      {/* III (extracto) */}
      <div className="border border-black mb-2">
        <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">III.- DATOS DEL SOLICITANTE:</div>
        <div className="p-2">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div>
              <span className="text-xs">Apellido Paterno:</span>
              <div className={`border border-black min-h-[20px] p-1 ${isCurrent("apellidoPaterno") ? "bg-yellow-200" : ""}`}>
                {data.apellidoPaterno || ""}
              </div>
            </div>
            <div>
              <span className="text-xs">Apellido Materno:</span>
              <div className={`border border-black min-h-[20px] p-1 ${isCurrent("apellidoMaterno") ? "bg-yellow-200" : ""}`}>
                {data.apellidoMaterno || ""}
              </div>
            </div>
            <div>
              <span className="text-xs">Nombres:</span>
              <div className={`border border-black min-h-[20px] p-1 ${isCurrent("nombres") ? "bg-yellow-200" : ""}`}>
                {data.nombres || ""}
              </div>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-xs">Razón Social:</span>
            <div className={`border border-black min-h-[20px] p-1 ${isCurrent("razonSocial") ? "bg-yellow-200" : ""}`}>
              {data.razonSocial || ""}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {(["dni", "ruc", "ce"] as const).map((t) => (
              <div key={t}>
                <span className="text-xs">{t.toUpperCase()}:</span>
                <div
                  className={`border border-black min-h-[20px] p-1 ${
                    isCurrent("numeroDocumento") && data.tipoDocumento === t ? "bg-yellow-200" : ""
                  }`}
                >
                  {data.tipoDocumento === t ? data.numeroDocumento : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IV Dirección (extracto representativo) */}
      <div className="border border-black mb-2">
        <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">IV.- DIRECCIÓN:</div>
        <div className="p-2">
          <div className="mb-2">
            <span className="text-xs">Nombre de la vía:</span>
            <div className={`border border-black min-h-[20px] p-1 ${isCurrent("nombreVia") ? "bg-yellow-200" : ""}`}>
              {data.nombreVia || ""}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2 text-xs">
            {([
              ["numeroInmueble", "N° Inmueble"],
              ["block", "Block"],
              ["interior", "Interior"],
              ["piso", "Piso"],
            ] as [keyof FUTData, string][]).map(([key, label]) => (
              <div key={String(key)}>
                <span>{label}:</span>
                <div className={`border border-black min-h-[20px] p-1 ${isCurrent(key) ? "bg-yellow-200" : ""}`}>
                  {String(data[key] || "")}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2 text-xs">
            {([
              ["manzana", "Mz"],
              ["lote", "Lote"],
              ["kilometro", "Km"],
              ["sector", "Sector"],
            ] as [keyof FUTData, string][]).map(([key, label]) => (
              <div key={String(key)}>
                <span>{label}:</span>
                <div className={`border border-black min-h-[20px] p-1 ${isCurrent(key) ? "bg-yellow-200" : ""}`}>
                  {String(data[key] || "")}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-2">
            <span className="text-xs">Referencia:</span>
            <div className={`border border-black min-h-[20px] p-1 ${isCurrent("referencia") ? "bg-yellow-200" : ""}`}>
              {data.referencia || ""}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
            {(["departamento", "provincia", "distrito"] as const).map((k) => (
              <div key={k}>
                <span className="capitalize">{k}:</span>
                <div className={`border border-black min-h-[20px] p-1 ${isCurrent(k) ? "bg-yellow-200" : ""}`}>
                  {String(data[k] || "")}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span>Teléfonos:</span>
              <div className={`border border-black min-h-[20px] p-1 ${isCurrent("telefonos") ? "bg-yellow-200" : ""}`}>
                {data.telefonos || ""}
              </div>
            </div>
            <div>
              <span>Correo electrónico:</span>
              <div className={`border border-black min-h-[20px] p-1 ${isCurrent("correoElectronico") ? "bg-yellow-200" : ""}`}>
                {data.correoElectronico || ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* V – VI – Firma */}
      <div className="border border-black mb-2">
        <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">V.- FUNDAMENTACIÓN DEL PEDIDO:</div>
        <div className="p-2">{sectionV}</div>
      </div>

      <div className="border border-black mb-2">
        <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">VI.- DOCUMENTOS QUE SE ADJUNTAN:</div>
        <div className="p-2">{sectionVI}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
        <div className="border-2 border-black rounded p-4 text-center">
          <div className="bg-gray-200 p-2 font-bold text-xs mb-2">LUGAR Y FECHA</div>
          <div className={`min-h-[40px] p-1 ${isCurrent("lugar") || isCurrent("fecha") ? "bg-yellow-200" : ""}`}>
            {data.lugar && data.fecha ? `${data.lugar}, ${data.fecha}` : ""}
          </div>
        </div>
        <div className="border-2 border-black rounded p-4 text-center">
          <div className="bg-gray-200 p-2 font-bold text-xs mb-2">FIRMA DEL USUARIO</div>
          <div className="min-h-[40px]" />
        </div>
      </div>
    </div>
  );
}
