// src/features/fut-preview/lib/buildFUTHtml.ts
import type { FUTData } from "@/entities/fut/model/type"

const esc = (s: string) =>
  (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

export function buildFUTHtml(data: FUTData): string {
  // CSS simple, optimizado para A4 con márgenes; sin Tailwind para evitar dependencias en el render.
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>FUT</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  @page { size: A4; margin: 15mm; }
  html, body { margin: 0; padding: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
  .sheet { width: 210mm; min-height: 297mm; }
  .title { font-weight: 700; font-size: 12px; text-align: center; }
  .muted { font-size: 10px; color: #444; text-align: center; }
  .box { border: 1px solid #000; margin: 6px 0; }
  .box .head { background: #e5e7eb; padding: 4px; border-bottom: 1px solid #000; font-weight: 700; font-size: 11px; }
  .box .body { padding: 8px; font-size: 11px; line-height: 1.2; }
  .grid { display: grid; gap: 6px; }
  .grid-2 { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
  .field { font-size: 10px; }
  .field-label { display:block; font-size: 10px; margin-bottom: 2px; }
  .cell { border: 1px solid #000; min-height: 20px; padding: 4px; }
  .lines .cell { border-top: none; }
  .lines .cell:first-child { border-top: 1px solid #000; }
  .mt-8 { margin-top: 8px; }
</style>
</head>
<body>
  <div class="sheet">
    <div class="box" style="border-width:2px;">
      <div class="body" style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:30px;height:30px;background:#dc2626;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:10px;">PE</div>
          <div style="font-size:10px;line-height:1.1;">
            <div style="font-weight:700;">Ministerio</div>
            <div>de Educación</div>
          </div>
        </div>
        <div>
          <div class="title">FORMULARIO ÚNICO DE TRÁMITES (F.U.T.)</div>
          <div class="muted">RM N° 0445-2012-ED</div>
          <div class="muted">DISTRIBUCIÓN GRATUITA</div>
        </div>
        <div style="width:40px;"></div>
      </div>
    </div>

    <div class="box">
      <div class="head">I.- RESUMEN DE SU PEDIDO:</div>
      <div class="body">
        <div class="lines">
          ${[...Array(3)].map((_,i)=>`<div class="cell">${esc(data.resumenPedido).split("\n")[i]||""}</div>`).join("")}
        </div>
      </div>
    </div>

    <div class="box">
      <div class="head">II.- DEPENDENCIA O AUTORIDAD A QUIEN SE DIRIGE</div>
      <div class="body">
        <div class="cell">${esc(data.dependencia)}</div>
      </div>
    </div>

    <div class="box">
      <div class="head">III.- DATOS DEL SOLICITANTE:</div>
      <div class="body">
        <div class="grid grid-3">
          <div class="field">
            <label class="field-label">Apellido Paterno:</label>
            <div class="cell">${esc(data.apellidoPaterno)}</div>
          </div>
          <div class="field">
            <label class="field-label">Apellido Materno:</label>
            <div class="cell">${esc(data.apellidoMaterno)}</div>
          </div>
          <div class="field">
            <label class="field-label">Nombres:</label>
            <div class="cell">${esc(data.nombres)}</div>
          </div>
        </div>

        <div class="field mt-8">
          <label class="field-label">Razón Social:</label>
          <div class="cell">${esc(data.razonSocial)}</div>
        </div>

        <div class="grid grid-3 mt-8">
          <div class="field">
            <label class="field-label">DNI:</label>
            <div class="cell">${data.tipoDocumento === "dni" ? esc(data.numeroDocumento) : ""}</div>
          </div>
          <div class="field">
            <label class="field-label">RUC:</label>
            <div class="cell">${data.tipoDocumento === "ruc" ? esc(data.numeroDocumento) : ""}</div>
          </div>
          <div class="field">
            <label class="field-label">C.E.:</label>
            <div class="cell">${data.tipoDocumento === "ce" ? esc(data.numeroDocumento) : ""}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="head">IV.- DIRECCIÓN</div>
      <div class="body">
        <div class="field">
          <label class="field-label">Nombre de la vía:</label>
          <div class="cell">${esc(data.nombreVia)}</div>
        </div>

        <div class="grid grid-4 mt-8">
          ${[
            ["numeroInmueble","N° Inmueble"],
            ["block","Block"],
            ["interior","Interior"],
            ["piso","Piso"],
          ].map(([k,l])=>`<div class="field"><label class="field-label">${l}:</label><div class="cell">${esc((data as any)[k]||"")}</div></div>`).join("")}
        </div>

        <div class="grid grid-4 mt-8">
          ${[
            ["manzana","Mz"],
            ["lote","Lote"],
            ["kilometro","Km"],
            ["sector","Sector"],
          ].map(([k,l])=>`<div class="field"><label class="field-label">${l}:</label><div class="cell">${esc((data as any)[k]||"")}</div></div>`).join("")}
        </div>

        <div class="field mt-8">
          <label class="field-label">Referencia:</label>
          <div class="cell">${esc(data.referencia)}</div>
        </div>

        <div class="grid grid-3 mt-8">
          ${(["departamento","provincia","distrito"] as const).map((k)=>`
            <div class="field">
              <label class="field-label">${k[0].toUpperCase()+k.slice(1)}:</label>
              <div class="cell">${esc(String(data[k]||""))}</div>
            </div>
          `).join("")}
        </div>

        <div class="grid grid-2 mt-8">
          <div class="field">
            <label class="field-label">Teléfonos:</label>
            <div class="cell">${esc(data.telefonos)}</div>
          </div>
          <div class="field">
            <label class="field-label">Correo electrónico:</label>
            <div class="cell">${esc(data.correoElectronico)}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="head">V.- FUNDAMENTACIÓN DEL PEDIDO</div>
      <div class="body">
        <div class="lines">
          ${[...Array(10)].map((_,i)=>`<div class="cell">${esc(data.fundamentacion).split("\\n")[i]||""}</div>`).join("")}
        </div>
      </div>
    </div>

    <div class="box">
      <div class="head">VI.- DOCUMENTOS QUE SE ADJUNTAN</div>
      <div class="body">
        <div class="lines">
          ${[...Array(5)].map((_,i)=>`<div class="cell">${esc(data.documentosAdjuntos).split("\\n")[i]||""}</div>`).join("")}
        </div>
      </div>
    </div>

    <div class="grid grid-2 mt-8">
      <div class="box">
        <div class="head">LUGAR Y FECHA</div>
        <div class="body"><div class="cell">${esc([data.lugar, data.fecha].filter(Boolean).join(", "))}</div></div>
      </div>
      <div class="box">
        <div class="head">FIRMA DEL USUARIO</div>
        <div class="body"><div class="cell" style="height:40px;"></div></div>
      </div>
    </div>
  </div>
</body>
</html>`
}
