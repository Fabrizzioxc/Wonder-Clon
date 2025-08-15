import { Question } from '@/entities/contract/model/type'

export const questions: Question[] = [
  {
    id: "propertyAddress",
    label: "Dirección completa de la vivienda que se desea alquilar:",
    type: "text",
    placeholder: "Ej. C/Rey, 15, 2º, C. 28003. Madrid",
  },
  {
    id: "propertySize",
    label: "Número de metros cuadrados construidos que dispone la vivienda:",
    type: "number",
    placeholder: "Escribe un número",
  },
  {
    id: "propertyDescription",
    label: "Describe las partes, dependencias o espacios que forman la vivienda:",
    type: "textarea",
    placeholder:
      "Ej. Salón con cocina americana, tres dormitorios, dos baños, un aseo, un salón, una plaza de garaje y trastero en el sótano.",
  },
  {
    id: "furnished",
    label: "¿El arrendador entrega la vivienda amueblada?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "propertyReference",
    label: "Introduce la Referencia Catastral de la vivienda:",
    type: "text",
    placeholder: "Ej. 4359406SC4754J0002PB",
  },
  {
    id: "contractDuration",
    label: "Periodo de duración del contrato:",
    type: "text",
    placeholder: "Ej. 1 año",
  },
  {
    id: "availabilityDate",
    label: "Fecha en la que el arrendador pone la vivienda a disposición:",
    type: "date",
    placeholder: "dd/mm/aaaa",
  },
  {
    id: "monthlyRent",
    label: "Importe de la renta mensual:",
    type: "number",
    placeholder: "Introduce el importe en euros",
  },
  {
    id: "paymentMethod",
    label: "Forma de pago de la renta:",
    type: "select",
    options: [
      { value: "transferencia", label: "Transferencia bancaria" },
      { value: "domiciliacion", label: "Domiciliación bancaria" },
      { value: "efectivo", label: "Efectivo" },
    ],
  },
  {
    id: "bankName",
    label: "Nombre del banco:",
    type: "text",
    placeholder: "Ej. Banco Santander",
  },
  {
    id: "bankIban",
    label: "IBAN de la cuenta bancaria:",
    type: "text",
    placeholder: "Ej. ES6600190020961234567890",
  },
  {
    id: "accountHolder",
    label: "Titular de la cuenta bancaria:",
    type: "text",
    placeholder: "Nombre del titular",
  },
  {
    id: "includesUtilities",
    label: "¿Incluye suministros (luz, agua, gas, tasas)?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "additionalDeposit",
    label: "¿Se entrega depósito/fianza adicional?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "hasGuarantors",
    label: "¿El inquilino cuenta con avalistas o fiadores?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "petsAllowed",
    label: "¿El inquilino puede tener mascotas?",
    type: "radio",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },
  {
    id: "contractLocation",
    label: "Localidad donde se firma el contrato:",
    type: "text",
    placeholder: "Ej. Madrid",
  },
  {
    id: "contractDate",
    label: "Fecha de firma del contrato:",
    type: "date",
    placeholder: "dd/mm/aaaa",
  },
  {
    id: "numLandlords",
    label: "Número de arrendadores:",
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ],
  },
  {
    id: "landlordType",
    label: "Tipo de arrendador:",
    type: "radio",
    options: [
      { value: "fisica", label: "Persona física" },
      { value: "juridica", label: "Persona jurídica" },
    ],
  },
  {
    id: "landlordName",
    label: "Nombre completo del arrendador:",
    type: "text",
    placeholder: "Nombre y apellidos",
  },
  {
    id: "landlordIdType",
    label: "Tipo de documento de identificación del arrendador:",
    type: "select",
    options: [
      { value: "dni", label: "DNI" },
      { value: "nie", label: "NIE" },
      { value: "pasaporte", label: "Pasaporte" },
    ],
  },
  {
    id: "landlordId",
    label: "Número de documento de identificación del arrendador:",
    type: "text",
    placeholder: "Ej. 12345678A",
  },
  {
    id: "landlordAddress",
    label: "Dirección del arrendador:",
    type: "text",
    placeholder: "Dirección completa",
  },
  {
    id: "landlordSigner",
    label: "¿Quién firma el contrato por la parte del arrendador?",
    type: "radio",
    options: [
      { value: "arrendador", label: "El arrendador" },
      { value: "representante", label: "Un representante" },
    ],
  },
  {
    id: "landlordEmail",
    label: "E-mail del arrendador (opcional):",
    type: "textarea",
    placeholder: "correo@ejemplo.com",
  },
  {
    id: "numTenants",
    label: "Número de arrendatarios:",
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ],
  },
  {
    id: "tenantType",
    label: "Tipo de arrendatario:",
    type: "radio",
    options: [
      { value: "fisica", label: "Persona física" },
      { value: "juridica", label: "Persona jurídica" },
    ],
  },
  {
    id: "tenantName",
    label: "Nombre completo del arrendatario:",
    type: "text",
    placeholder: "Nombre y apellidos",
  },
  {
    id: "tenantIdType",
    label: "Tipo de documento de identificación del arrendatario:",
    type: "select",
    options: [
      { value: "dni", label: "DNI" },
      { value: "nie", label: "NIE" },
      { value: "pasaporte", label: "Pasaporte" },
    ],
  },
  {
    id: "tenantId",
    label: "Número de documento de identificación del arrendatario:",
    type: "text",
    placeholder: "Ej. 87654321B",
  },
  {
    id: "tenantSigner",
    label: "¿Quién firma el contrato por la parte del arrendatario?",
    type: "radio",
    options: [
      { value: "arrendatario", label: "El arrendatario" },
      { value: "representante", label: "Un representante" },
    ],
  },
  {
    id: "tenantEmail",
    label: "E-mail del arrendatario (opcional):",
    type: "textarea",
    placeholder: "correo@ejemplo.com",
  },
]