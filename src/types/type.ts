export interface ContractData {
  propertyAddress: string
  propertySize: string
  propertyDescription: string
  furnished: string
  propertyReference: string
  contractDuration: string
  availabilityDate: string
  monthlyRent: string
  paymentMethod: string
  bankName: string
  bankIban: string
  accountHolder: string
  includesUtilities: string
  additionalDeposit: string
  hasGuarantors: string
  petsAllowed: string
  contractLocation: string
  contractDate: string
  numLandlords: string
  landlordType: string
  landlordName: string
  landlordIdType: string
  landlordId: string
  landlordAddress: string
  landlordSigner: string
  landlordEmail: string
  numTenants: string
  tenantType: string
  tenantName: string
  tenantIdType: string
  tenantId: string
  tenantSigner: string
  tenantEmail: string
}

export interface Question {
  id: keyof ContractData
  label: string
  type: "text" | "textarea" | "radio" | "select" | "date" | "number"
  placeholder?: string
  options?: { value: string; label: string }[]
}