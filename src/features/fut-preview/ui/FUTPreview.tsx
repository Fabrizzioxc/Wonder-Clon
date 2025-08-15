// src/features/fut-preview/ui/FUTPreview.tsx
"use client";

import type { FUTData } from "@/entities/fut/model/type";
import React, { useEffect, useMemo, useRef } from "react";

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

function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  let p: HTMLElement | null = el?.parentElement ?? null;
  while (p) {
    const st = getComputedStyle(p);
    if (/auto|scroll/i.test(st.overflowY)) return p;
    p = p.parentElement;
  }
  return null;
}

const SCROLL_MAP: Record<string, string> = {
  // I
  resumenPedido: "anchor-resumen",
  // II
  dependencia: "anchor-dependencia",
  // III
  apellidoPaterno: "anchor-solicitante",
  apellidoMaterno: "anchor-solicitante",
  nombres: "anchor-solicitante",
  razonSocial: "anchor-solicitante",
  tipoDocumento: "anchor-solicitante",
  numeroDocumento: "anchor-solicitante",
  // IV
  nombreVia: "anchor-direccion",
  numeroInmueble: "anchor-direccion",
  block: "anchor-direccion",
  interior: "anchor-direccion",
  piso: "anchor-direccion",
  manzana: "anchor-direccion",
  lote: "anchor-direccion",
  kilometro: "anchor-direccion",
  sector: "anchor-direccion",
  referencia: "anchor-direccion",
  departamento: "anchor-direccion",
  provincia: "anchor-direccion",
  distrito: "anchor-direccion",
  telefonos: "anchor-direccion",
  correoElectronico: "anchor-direccion",
  // V
  fundamentacion: "anchor-fundamentacion",
  // VI
  documentosAdjuntos: "anchor-documentos",
  // Firma/fecha
  lugar: "anchor-firma",
  fecha: "anchor-firma",
};

export function FUTPreview({ data, currentFieldId }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isCurrent = (id: keyof FUTData) => currentFieldId === id;

  // Para re-disparar el efecto al teclear
  const currentValue = currentFieldId ? String(data[currentFieldId] ?? "") : "";

  useEffect(() => {
    if (!currentFieldId) return;

    const root = rootRef.current;
    if (!root) return;

    // 1) intenta usar el contenedor scrollable real (está fuera del componente)
    const container = getScrollParent(root) ?? root;

    // 2) PRIORIDAD: el nodo del campo concreto; fallback: ancla de sección
    const fieldSel = `[data-field="${String(currentFieldId)}"]`;
    const anchorId =
      SCROLL_MAP[String(currentFieldId)] ?? `anchor-${String(currentFieldId)}`;

    let target =
      root.querySelector<HTMLElement>(fieldSel) ||
      root.querySelector<HTMLElement>(`#${anchorId}`);

    if (!target) return;

    const c = container as HTMLElement;
    const cRect = c.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const currentTop = c.scrollTop;
    const relativeTop = tRect.top - cRect.top + currentTop;
    const relativeBottom = relativeTop + tRect.height;

    const margin = 40; // px de colchón
    const viewTop = currentTop + margin;
    const viewBottom = currentTop + c.clientHeight - margin;

    // Sólo movemos si NO está visible
    if (relativeTop < viewTop || relativeBottom > viewBottom) {
      c.scrollTo({ top: Math.max(0, relativeTop - 80), behavior: "smooth" });
    }

    // Resaltado suave
    const valueEl =
      root.querySelector<HTMLElement>(fieldSel) ?? target;
    valueEl.classList.add("ring-2", "ring-yellow-300", "rounded");
    const to = setTimeout(() => {
      valueEl.classList.remove("ring-2", "ring-yellow-300");
    }, 1200);

    return () => clearTimeout(to);
  }, [currentFieldId, currentValue]);

  // ---- Secciones con líneas multipágina ----
  const sectionI = useMemo(() => {
    const lines = splitLines(data.resumenPedido, 80);
    return [...Array(3)].map((_, i) => (
      <div
        key={i}
        data-field={i === 0 ? "resumenPedido" : undefined}
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
        data-field={i === 0 ? "fundamentacion" : undefined}
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
        data-field={i === 0 ? "documentosAdjuntos" : undefined}
        className={`border border-black min-h-[20px] p-1 border-t-0 first:border-t ${
          isCurrent("documentosAdjuntos") && (lines[i] || i === 0) ? "bg-yellow-200" : ""
        }`}
      >
        {lines[i] || ""}
      </div>
    ));
  }, [data.documentosAdjuntos, currentFieldId]);

  return (
    <div ref={rootRef}>
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
        <div id="anchor-resumen" className="sr-only" />
        <div className="border border-black mb-2">
          <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">I.- RESUMEN DE SU PEDIDO:</div>
          <div className="p-2">{sectionI}</div>
        </div>

        {/* II */}
        <div id="anchor-dependencia" className="sr-only" />
        <div className="border border-black mb-2">
          <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">
            II.- DEPENDENCIA O AUTORIDAD A QUIEN SE DIRIGE
          </div>
          <div className="p-2">
            <div
              className={`border border-black min-h-[20px] p-1 ${isCurrent("dependencia") ? "bg-yellow-200" : ""}`}
              data-field="dependencia"
            >
              {data.dependencia || ""}
            </div>
          </div>
        </div>

        {/* III (extracto) */}
        <div id="anchor-solicitante" className="sr-only" />
        <div className="border border-black mb-2">
          <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">III.- DATOS DEL SOLICITANTE:</div>
          <div className="p-2">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <span className="text-xs">Apellido Paterno:</span>
                <div
                  className={`border border-black min-h-[20px] p-1 ${isCurrent("apellidoPaterno") ? "bg-yellow-200" : ""}`}
                  data-field="apellidoPaterno"
                >
                  {data.apellidoPaterno || ""}
                </div>
              </div>
              <div>
                <span className="text-xs">Apellido Materno:</span>
                <div
                  className={`border border-black min-h-[20px] p-1 ${isCurrent("apellidoMaterno") ? "bg-yellow-200" : ""}`}
                  data-field="apellidoMaterno"
                >
                  {data.apellidoMaterno || ""}
                </div>
              </div>
              <div>
                <span className="text-xs">Nombres:</span>
                <div
                  className={`border border-black min-h-[20px] p-1 ${isCurrent("nombres") ? "bg-yellow-200" : ""}`}
                  data-field="nombres"
                >
                  {data.nombres || ""}
                </div>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-xs">Razón Social:</span>
              <div
                className={`border border-black min-h-[20px] p-1 ${isCurrent("razonSocial") ? "bg-yellow-200" : ""}`}
                data-field="razonSocial"
              >
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
                    data-field={data.tipoDocumento === t ? "numeroDocumento" : undefined}
                  >
                    {data.tipoDocumento === t ? data.numeroDocumento : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* IV Dirección */}
        <div id="anchor-direccion" className="sr-only" />
        <div className="border border-black mb-2">
          <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">IV.- DIRECCIÓN:</div>
          <div className="p-2">
            <div className="mb-2">
              <span className="text-xs">Nombre de la vía:</span>
              <div
                className={`border border-black min-h-[20px] p-1 ${isCurrent("nombreVia") ? "bg-yellow-200" : ""}`}
                data-field="nombreVia"
              >
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
                  <div
                    className={`border border-black min-h-[20px] p-1 ${isCurrent(key) ? "bg-yellow-200" : ""}`}
                    data-field={String(key)}
                  >
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
                  <div
                    className={`border border-black min-h-[20px] p-1 ${isCurrent(key) ? "bg-yellow-200" : ""}`}
                    data-field={String(key)}
                  >
                    {String(data[key] || "")}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-2">
              <span className="text-xs">Referencia:</span>
              <div
                className={`border border-black min-h-[20px] p-1 ${isCurrent("referencia") ? "bg-yellow-200" : ""}`}
                data-field="referencia"
              >
                {data.referencia || ""}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
              {(["departamento", "provincia", "distrito"] as const).map((k) => (
                <div key={k}>
                  <span className="capitalize">{k}:</span>
                  <div
                    className={`border border-black min-h-[20px] p-1 ${isCurrent(k) ? "bg-yellow-200" : ""}`}
                    data-field={k}
                  >
                    {String(data[k] || "")}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span>Teléfonos:</span>
                <div
                  className={`border border-black min-h-[20px] p-1 ${isCurrent("telefonos") ? "bg-yellow-200" : ""}`}
                  data-field="telefonos"
                >
                  {data.telefonos || ""}
                </div>
              </div>
              <div>
                <span>Correo electrónico:</span>
                <div
                  className={`border border-black min-h-[20px] p-1 ${isCurrent("correoElectronico") ? "bg-yellow-200" : ""}`}
                  data-field="correoElectronico"
                >
                  {data.correoElectronico || ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* V – VI – Firma */}
        <div id="anchor-fundamentacion" className="sr-only" />
        <div className="border border-black mb-2">
          <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">V.- FUNDAMENTACIÓN DEL PEDIDO:</div>
          <div className="p-2">{sectionV}</div>
        </div>

        <div id="anchor-documentos" className="sr-only" />
        <div className="border border-black mb-2">
          <div className="bg-gray-200 p-1 font-bold text-xs border-b border-black">VI.- DOCUMENTOS QUE SE ADJUNTAN:</div>
          <div className="p-2">{sectionVI}</div>
        </div>

        <div id="anchor-firma" className="sr-only" />
        <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
          <div className="border-2 border-black rounded p-4 text-center">
            <div className="bg-gray-200 p-2 font-bold text-xs mb-2">LUGAR Y FECHA</div>
            <div
              className={`min-h-[40px] p-1 ${isCurrent("lugar") || isCurrent("fecha") ? "bg-yellow-200" : ""}`}
              data-field="fecha"
            >
              {data.lugar && data.fecha ? `${data.lugar}, ${data.fecha}` : ""}
            </div>
          </div>
          <div className="border-2 border-black rounded p-4 text-center">
            <div className="bg-gray-200 p-2 font-bold text-xs mb-2">FIRMA DEL USUARIO</div>
            <div className="min-h-[40px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
