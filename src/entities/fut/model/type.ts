// src/entities/fut/model/type.ts

export interface FUTData {
  // I. Resumen
  resumenPedido: string;

  // II. Dependencia
  dependencia: string;

  // III. Solicitante
  tipoPersona: string; // "natural" | "juridica"
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  razonSocial: string;
  tipoDocumento: string; // "dni" | "ruc" | "ce"
  numeroDocumento: string;

  // IV. Dirección
  tipoVia: string;           // "avenida" | "jiron" | "calle" | "pasaje" | "carretera" | "prolongacion"
  nombreVia: string;
  numeroInmueble: string;
  block: string;
  interior: string;
  piso: string;
  manzana: string;
  lote: string;
  kilometro: string;
  sector: string;
  tipoZona: string;
  nombreZona: string;
  referencia: string;
  departamento: string;
  provincia: string;
  distrito: string;
  telefonos: string;
  correoElectronico: string;

  // V. Fundamentos
  fundamentacion: string;

  // VI. Adjuntos
  documentosAdjuntos: string;

  // Firma
  lugar: string;
  fecha: string;
}

/** Clave de T que es string (evita keys tipo symbol/number) */
export type KeyOf<T> = Extract<keyof T, string>;

/** Pregunta genérica ligada al shape T (no requiere index signature). */
export interface Question<T extends object> {
  id: KeyOf<T>;
  label: string;
  type: "text" | "textarea" | "radio" | "select" | "date" | "number";
  placeholder?: string;
  options?: { value: string; label: string }[];
  /** Condición para mostrar la pregunta según el estado actual */
  condition?: (data: T) => boolean;
}

/** Estado inicial vacío */
export const initialFUTData: FUTData = {
  resumenPedido: "",
  dependencia: "",
  tipoPersona: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombres: "",
  razonSocial: "",
  tipoDocumento: "",
  numeroDocumento: "",
  tipoVia: "",
  nombreVia: "",
  numeroInmueble: "",
  block: "",
  interior: "",
  piso: "",
  manzana: "",
  lote: "",
  kilometro: "",
  sector: "",
  tipoZona: "",
  nombreZona: "",
  referencia: "",
  departamento: "",
  provincia: "",
  distrito: "",
  telefonos: "",
  correoElectronico: "",
  fundamentacion: "",
  documentosAdjuntos: "",
  lugar: "",
  fecha: "",
};
