export interface ContractData {
  // Inmueble
  propertyAddress: string
  propertySize: string
  propertyDescription: string
  furnished: string
  propertyReference: string

  // Duración / Fechas
  contractDuration: string
  availabilityDate: string

  // Económico
  monthlyRent: string
  paymentMethod: string
  bankName: string
  bankIban: string
  accountHolder: string
  includesUtilities: string
  additionalDeposit: string
  hasGuarantors: string
  petsAllowed: string

  // Encabezado
  contractLocation: string
  contractDate: string

  // Arrendador
  numLandlords: string
  landlordType: string                // "fisica" | "juridica"
  landlordName: string
  landlordIdType: string              // "dni" | "nie" | "pasaporte"
  landlordId: string
  landlordAddress: string
  landlordSigner: string              // "arrendador" | "representante"
  landlordEmail: string

  // Arrendatarios
  numTenants: string                  // "1" | "2" | "3"
  tenantType: string                  // "fisica" | "juridica"
  tenantName: string
  tenantIdType: string                // "dni" | "nie" | "pasaporte"
  tenantId: string
  tenantSigner: string                // "arrendatario" | "representante"
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
