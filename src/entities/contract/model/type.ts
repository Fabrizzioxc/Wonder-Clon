// src/entities/contract/model/type.ts

export interface ContractData {
  // Inmueble
  propertyAddress: string
  propertySize: string
  propertyDescription: string
  furnished: string                // valores esperados: "si" | "no"
  propertyReference: string

  // Duración / Fechas
  contractDuration: string
  availabilityDate: string         // "YYYY-MM-DD" o "dd/mm/aaaa"

  // Económico
  monthlyRent: string
  paymentMethod: string            // "transferencia" | "domiciliacion" | "efectivo"
  bankName: string
  bankIban: string
  accountHolder: string
  includesUtilities: string        // "si" | "no"
  additionalDeposit: string        // "si" | "no"
  hasGuarantors: string            // "si" | "no"
  petsAllowed: string              // "si" | "no"

  // Encabezado
  contractLocation: string
  contractDate: string             // "YYYY-MM-DD" o "dd/mm/aaaa"

  // Arrendador
  numLandlords: string             // "1" | "2" | ...
  landlordType: string             // "fisica" | "juridica"
  landlordName: string
  landlordIdType: string           // "dni" | "nie" | "pasaporte"
  landlordId: string
  landlordAddress: string
  landlordSigner: string           // "arrendador" | "representante"
  landlordEmail: string

  // Arrendatarios
  numTenants: string               // "1" | "2" | "3"
  tenantType: string               // "fisica" | "juridica"
  tenantName: string
  tenantIdType: string             // "dni" | "nie" | "pasaporte"
  tenantId: string
  tenantSigner: string             // "arrendatario" | "representante"
  tenantEmail: string

  // Co-arrendatarios opcionales (aparecen si numTenants = 2 ó 3)
  coTenant2Name?: string
  coTenant2Type?: "fisica" | "juridica"
  coTenant2IdType?: "dni" | "nie" | "pasaporte"
  coTenant2Id?: string

  coTenant3Name?: string
  coTenant3Type?: "fisica" | "juridica"
  coTenant3IdType?: "dni" | "nie" | "pasaporte"
  coTenant3Id?: string
}

export interface Question {
  id: keyof ContractData
  label: string
  type: "text" | "textarea" | "radio" | "select" | "date" | "number"
  placeholder?: string
  options?: { value: string; label: string }[]
}
