// src/features/fut-wizard/model/futQuestions.ts
import type { FUTData, Question } from "@/entities/fut/model/type";

export const futQuestions: Question<FUTData>[] = [
  { id: "resumenPedido", label: "I. Resumen de su pedido:", type: "textarea", placeholder: "Describa brevemente su solicitud" },
  { id: "dependencia",   label: "II. Dependencia o autoridad a quien se dirige:", type: "text", placeholder: "Nombre de la dependencia o autoridad" },

  { id: "tipoPersona",   label: "III. Tipo de solicitante:", type: "radio",
    options: [{ value: "natural", label: "Persona Natural" },{ value: "juridica", label: "Persona Jurídica" }] },

  { id: "apellidoPaterno", label: "Apellido Paterno:", type: "text", placeholder: "Ingrese su apellido paterno",
    condition: (d) => d.tipoPersona === "natural" },
  { id: "apellidoMaterno", label: "Apellido Materno:", type: "text", placeholder: "Ingrese su apellido materno",
    condition: (d) => d.tipoPersona === "natural" },
  { id: "nombres",         label: "Nombres:", type: "text", placeholder: "Ingrese sus nombres",
    condition: (d) => d.tipoPersona === "natural" },

  { id: "razonSocial",     label: "Razón Social:", type: "text", placeholder: "Ingrese la razón social",
    condition: (d) => d.tipoPersona === "juridica" },

  { id: "tipoDocumento",   label: "Tipo de Documento:", type: "select",
    options: [{ value: "dni", label: "DNI" },{ value: "ruc", label: "RUC" },{ value: "ce", label: "C.E." }] },
  { id: "numeroDocumento", label: "Número de Documento:", type: "text", placeholder: "Ingrese el número de documento" },

  // IV Dirección
  { id: "tipoVia",         label: "IV. Tipo de Vía:", type: "select",
    options: [
      { value: "avenida", label: "Avenida" },
      { value: "jiron", label: "Jirón" },
      { value: "calle", label: "Calle" },
      { value: "pasaje", label: "Pasaje" },
      { value: "carretera", label: "Carretera" },
      { value: "prolongacion", label: "Prolongación" },
    ] },
  { id: "nombreVia",       label: "Nombre de la vía:", type: "text", placeholder: "Ingrese el nombre de la vía" },
  { id: "numeroInmueble",  label: "N° de Inmueble:", type: "text", placeholder: "Número" },
  { id: "block",           label: "Block:", type: "text", placeholder: "Block (opcional)" },
  { id: "interior",        label: "Interior:", type: "text", placeholder: "Interior (opcional)" },
  { id: "piso",            label: "Piso:", type: "text", placeholder: "Piso (opcional)" },
  { id: "manzana",         label: "Mz (Manzana):", type: "text", placeholder: "Manzana (opcional)" },
  { id: "lote",            label: "Lote:", type: "text", placeholder: "Lote (opcional)" },
  { id: "kilometro",       label: "Km (Kilómetro):", type: "text", placeholder: "Kilómetro (opcional)" },
  { id: "sector",          label: "Sector:", type: "text", placeholder: "Sector (opcional)" },

  { id: "tipoZona",        label: "Tipo de Zona:", type: "select",
    options: [
      { value: "urbanizacion", label: "Urbanización" },
      { value: "pueblo_joven", label: "Pueblo Joven" },
      { value: "unidad_vecinal", label: "Unidad Vecinal" },
      { value: "conjunto_habitacional", label: "Conjunto Habitacional" },
      { value: "asentamiento_humano", label: "Asentamiento Humano" },
      { value: "cooperativa", label: "Cooperativa" },
      { value: "residencial", label: "Residencial" },
      { value: "zona_industrial", label: "Zona Industrial" },
      { value: "centro_poblado", label: "Centro Poblado" },
      { value: "caserio", label: "Caserío" },
      { value: "asociacion", label: "Asociación" },
      { value: "fundo", label: "Fundo" },
      { value: "otros", label: "Otros" },
    ] },
  { id: "nombreZona",      label: "Nombre de zona:", type: "text", placeholder: "Ingrese el nombre de la zona" },
  { id: "referencia",      label: "Referencia:", type: "text", placeholder: "Referencia de ubicación" },
  { id: "departamento",    label: "Departamento:", type: "text", placeholder: "Departamento" },
  { id: "provincia",       label: "Provincia:", type: "text", placeholder: "Provincia" },
  { id: "distrito",        label: "Distrito:", type: "text", placeholder: "Distrito" },
  { id: "telefonos",       label: "Teléfonos:", type: "text", placeholder: "Número de teléfono" },
  { id: "correoElectronico", label: "Correo electrónico (autorizo notificaciones):", type: "text", placeholder: "correo@ejemplo.com" },

  // V–VI + firma
  { id: "fundamentacion",    label: "V. Fundamentación del pedido:", type: "textarea", placeholder: "Detalle los fundamentos de su solicitud" },
  { id: "documentosAdjuntos", label: "VI. Documentos que se adjuntan:", type: "textarea", placeholder: "Liste los documentos que adjunta" },
  { id: "lugar",             label: "Lugar:", type: "text", placeholder: "Ciudad donde se presenta" },
  { id: "fecha",             label: "Fecha:", type: "date", placeholder: "Fecha de presentación" },
];
