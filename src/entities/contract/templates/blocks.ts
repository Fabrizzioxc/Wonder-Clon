import { fallback } from "../lib/normalizers";
import type { ContractData } from "@/entities/contract/model/type";

export function buildBlocks(data: Partial<ContractData>) {
  const nTenants = Math.max(1, parseInt(String(data.numTenants || "1"), 10) || 1);
  const docPhrase = (type?: string, idType?: string, id?: string) =>
    type === "juridica" ? `identificada con NIF ${fallback(id)}` :
    idType === "nie" ? `titular del NIE nº ${fallback(id)}` :
    idType === "pasaporte" ? `identificado con Pasaporte nº ${fallback(id)}` :
    `identificado con DNI nº ${fallback(id)}`;

  const repLandlord = data.landlordSigner === "representante"
    ? ` Interviene un representante del Arrendador, manifestando contar con poder suficiente y vigente para este acto.` : ``;
  const repTenant = data.tenantSigner === "representante"
    ? ` Interviene un representante del Arrendatario, manifestando contar con poder suficiente y vigente para este acto.` : ``;

  const BLOQUE_PARTE_ARRENDADOR =
    data.landlordType === "juridica"
      ? `La sociedad ${fallback(data.landlordName)}, ${docPhrase(data.landlordType, data.landlordIdType, data.landlordId)}, con domicilio social en ${fallback(data.landlordAddress)}.${repLandlord}
En adelante, el "Arrendador".`
      : `${fallback(data.landlordName)}, ${docPhrase(data.landlordType, data.landlordIdType, data.landlordId)}, con domicilio en: ${fallback(data.landlordAddress)}.${repLandlord}
En adelante, el "Arrendador".`;

  const arrLbl = (nTenants > 1) ? 'los "Arrendatarios"' : 'el "Arrendatario"';
  const BLOQUE_PARTE_ARRENDATARIO =
    data.tenantType === "juridica"
      ? `La sociedad ${fallback(data.tenantName)}, ${docPhrase(data.tenantType, data.tenantIdType, data.tenantId)}, con domicilio social en ${fallback(data.propertyAddress)}.${repTenant}
En adelante, ${arrLbl}.`
      : `${fallback(data.tenantName)}, ${docPhrase(data.tenantType, data.tenantIdType, data.tenantId)}, con domicilio en: ${fallback(data.propertyAddress)}.${repTenant}
En adelante, ${arrLbl}.`;

  const coList: string[] = [];
  if (nTenants >= 2) {
    coList.push(
      (data.coTenant2Type === "juridica")
        ? `La sociedad ${fallback(data.coTenant2Name)}, ${docPhrase(data.coTenant2Type, data.coTenant2IdType, data.coTenant2Id)}, con domicilio social en ${fallback(data.propertyAddress)}.`
        : `${fallback(data.coTenant2Name)}, ${docPhrase(data.coTenant2Type, data.coTenant2IdType, data.coTenant2Id)}, con domicilio en: ${fallback(data.propertyAddress)}.`
    );
  }
  if (nTenants >= 3) {
    coList.push(
      (data.coTenant3Type === "juridica")
        ? `La sociedad ${fallback(data.coTenant3Name)}, ${docPhrase(data.coTenant3Type, data.coTenant3IdType, data.coTenant3Id)}, con domicilio social en ${fallback(data.propertyAddress)}.`
        : `${fallback(data.coTenant3Name)}, ${docPhrase(data.coTenant3Type, data.coTenant3IdType, data.coTenant3Id)}, con domicilio en: ${fallback(data.propertyAddress)}.`
    );
  }
  const BLOQUE_COTENANTS = coList.length ? coList.join("\n") + "\n" : "";

  const CLAUSULA_MOBILIARIO =
    data.furnished === "si"
      ? `La Vivienda se entrega amueblada y equipada conforme al inventario que se adjunta como Anexo I.
El/Los Arrendatario(s) declara(n) haberlo recibido en correcto estado de uso y conservación y se obliga(n) a mantenerlo, no sustraerlo ni sustituirlo sin autorización del Arrendador, y a devolverlo al finalizar el contrato en idéntico estado, salvo el desgaste por el uso ordinario. Cualquier falta, rotura o deterioro imputable al/los Arrendatario(s) será reparado o repuesto por este/estos; en caso contrario, el Arrendador podrá detraer su importe de la fianza legal y, en su caso, del depósito adicional, sin perjuicio de reclamar cantidades superiores si procediera.`
      : `La Vivienda se entrega sin amueblar. El/Los Arrendatario(s) podrá(n) introducir su propio mobiliario bajo su exclusiva responsabilidad, comprometiéndose a retirarlo al término del arrendamiento y a devolver la Vivienda en el mismo estado en que la recibió/recibieron, salvo el desgaste por el uso ordinario. Los daños causados en elementos preexistentes de la Vivienda serán reparados por el/los Arrendatario(s); en caso de incumplimiento, podrán ser compensados con cargo a la fianza legal y, en su caso, al depósito adicional.`;

  const BLOQUE_SUMINISTROS =
    data.includesUtilities === "si"
      ? `Los gastos de suministros (luz, agua, gas y tasas) se consideran incluidos en la renta y serán asumidos por el Arrendador.`
      : `Los gastos de suministros individualizados (luz, agua, gas) y cualesquiera tasas repercutibles serán por cuenta del/los Arrendatario(s).`;

  const BLOQUE_MASCOTAS =
    data.petsAllowed === "si"
      ? `Se permite la tenencia de mascotas, siendo el/los Arrendatario(s) responsable(s) de los posibles daños y de cumplir las normas de la comunidad.`
      : `Queda prohibida la tenencia de mascotas en la vivienda.`;

  const BLOQUE_DEPOSITO_ADICIONAL =
    data.additionalDeposit === "si"
      ? `Además de la fianza legal, el/los Arrendatario(s) entrega(n) un depósito adicional por importe de __________ € para garantizar el cumplimiento de sus obligaciones, que será devuelto una vez verificado el estado del inmueble.`
      : ``;

  const BLOQUE_AVALISTAS =
    data.hasGuarantors === "si"
      ? `El contrato cuenta con avalista(s): __________, con documento nº __________ y domicilio en __________, que responden solidariamente de las obligaciones del/los Arrendatario(s).`
      : ``;

  const CLAUSULA_SOLIDARIDAD =
    nTenants > 1
      ? `Los Arrendatarios asumen frente al Arrendador el cumplimiento de todas las obligaciones derivadas del presente contrato de forma solidaria, de modo que cualquiera de ellos podrá ser requerido por la totalidad de las cantidades debidas o por la ejecución de las obligaciones pendientes.
Las comunicaciones y notificaciones que el Arrendador dirija al domicilio de la Vivienda, o a cualquiera de los Arrendatarios, se entenderán válidamente realizadas frente a todos ellos. La entrega de llaves y la devolución de la posesión al término del contrato podrán efectuarse por cualquiera de los Arrendatarios, surtiendo plenos efectos frente a todos.`
      : ``;

  return {
    BLOQUE_PARTE_ARRENDADOR,
    BLOQUE_PARTE_ARRENDATARIO,
    BLOQUE_COTENANTS,
    CLAUSULA_MOBILIARIO,
    BLOQUE_SUMINISTROS,
    BLOQUE_MASCOTAS,
    BLOQUE_DEPOSITO_ADICIONAL,
    BLOQUE_AVALISTAS,
    CLAUSULA_SOLIDARIDAD,
  };
}
