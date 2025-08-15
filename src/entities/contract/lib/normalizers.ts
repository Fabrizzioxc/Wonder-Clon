export const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"] as const;

export function formatFechaES(input?: string): string {
  if (!input) return "";
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/; const eu = /^(\d{2})[\/.-](\d{2})[\/.-](\d{4})$/;
  let d=1,m=0,y=1970;
  if (iso.test(input)) { const [,yy,mm,dd]=input.match(iso)!; d=+dd; m=+mm-1; y=+yy; }
  else if (eu.test(input)) { const [,dd,mm,yy]=input.match(eu)!; d=+dd; m=+mm-1; y=+yy; }
  else return input;
  return `${d} de ${MESES[m] ?? ""} de ${y}`;
}

export function formatEuros(num?: string): string {
  if (!num) return "";
  const n = Number(String(num).replace(/[^\d.,-]/g, "").replace(",", "."));
  return Number.isNaN(n) ? `${num} €` : `${n} €`;
}

export function labelPago(value?: string): string {
  switch (value) {
    case "transferencia": return "transferencia bancaria";
    case "domiciliacion": return "domiciliación bancaria";
    case "efectivo": return "efectivo";
    default: return value || "";
  }
}

export const fallback = (s?: string) => (s && s.trim() ? s : "__________");
    