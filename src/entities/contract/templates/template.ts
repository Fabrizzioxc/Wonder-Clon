// src/entities/contract/templates/template.ts
export function getContractTemplate(): string {
  return `[[TITLE]]CONTRATO DE ARRENDAMIENTO DE VIVIENDA

[[RIGHT]]En {{contractLocation}}, a {{contractDate}}

[[CENTER]]REUNIDOS

De una parte,
{{BLOQUE_PARTE_ARRENDADOR}}

Y de otra parte,
{{BLOQUE_PARTE_ARRENDATARIO}}
{{BLOQUE_COTENANTS}}

Y que, a continuación, serán referidas, individualmente como la "Parte" y, de forma conjunta, como las "Partes". Las Partes, en la calidad con la que actúan, y reconociéndose capacidad jurídica para contratar y obligarse, y en especial para el otorgamiento del presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA. En adelante, el "Contrato".

[[CENTER]]EXPONEN

I. Que el Arrendador es propietario de la vivienda ubicada en: {{propertyAddress}}, con la siguiente Referencia Catastral: {{propertyReference}}. La vivienda cuenta con {{propertySize}} metros cuadrados de superficie, y presenta las siguientes características:

{{propertyDescription}}

En adelante, la "Vivienda".

Dicha superficie y composición, así como sus características y estado son perfectamente conocidas y aceptadas por las partes intervinientes en este contrato. No obstante, la Vivienda se arrienda como cuerpo cierto, así, de diferir la superficie real y la aquí descrita, esto no afectará de forma alguna a las condiciones y cláusulas que aquí se fijan, particularmente en lo relativo al precio de la renta.

II. Que el Arrendador ha exhibido una copia del Certificado de Eficiencia Energética de la Vivienda de acuerdo con lo regulado en el Real Decreto 235/2013, de 5 de abril, por el que se aprueba el procedimiento básico para la certificación de la eficiencia energética de los edificios.

III. Que el Arrendatario desea arrendar la Vivienda para su uso personal de vivienda habitual, y el Arrendador está interesado en arrendársela, así convienen pactar, de forma expresa y detallada, la oferta y aceptación en arrendamiento de la misma, acordando expresamente otorgar el presente contrato de arrendamiento de vivienda que se rige por las siguientes

[[CENTER]]CLÁUSULAS

[[CLAUSE]]PRIMERA. OBJETO
El presente Contrato tiene por objeto la constitución y regulación del arrendamiento de la Vivienda entre el Arrendador y los Arrendatarios, de acuerdo con las condiciones pactadas en este Contrato.

El/Los Arrendatario(s) utilizará(n) la Vivienda exclusivamente como vivienda habitual propia, no pudiéndose variar dicho uso sin consentimiento previo, expreso, y por escrito del Arrendador. El incumplimiento de esto será motivo de resolución del contrato.

La Vivienda se pondrá a disposición del/los Arrendatario(s) con la entrega de llaves, recibiendo la Vivienda en un estado adecuado al fin al que se destina y con conocimiento previo de las características de la misma, especialmente su estado de uso y conservación.

[[CLAUSE]]SEGUNDA. DURACIÓN Y PRÓRROGAS
El arrendamiento se pacta por el plazo siguiente: {{contractDuration}}, a contar desde el siguiente día: {{availabilityDate}}.

[[CLAUSE]]TERCERA. LA RENTA Y SU ACTUALIZACIÓN
La renta pactada por las Partes es de {{monthlyRent}} mensuales que el/los Arrendatario(s) pagará(n) al Arrendador cada mes, anticipadamente.

El pago se realizará mediante {{paymentMethod}} a favor de la cuenta cuyos datos son:
Entidad bancaria: {{bankName}}
IBAN identificador de la cuenta: {{bankIban}}
Titular de la cuenta: {{accountHolder}}

[[CLAUSE]]CUARTA. GASTOS GENERALES (SERVICIOS Y SUMINISTROS DE LA VIVIENDA)
{{BLOQUE_SUMINISTROS}}

[[CLAUSE]]CUARTA BIS. MOBILIARIO E INVENTARIO
{{CLAUSULA_MOBILIARIO}}

[[CLAUSE]]QUINTA. MASCOTAS
{{BLOQUE_MASCOTAS}}

[[CLAUSE]]SEXTA. DEPÓSITO ADICIONAL
{{BLOQUE_DEPOSITO_ADICIONAL}}

[[CLAUSE]]SÉPTIMA. AVALISTAS / FIADORES
{{BLOQUE_AVALISTAS}}

[[CLAUSE]]OCTAVA. PLURALIDAD DE ARRENDATARIOS Y SOLIDARIDAD
{{CLAUSULA_SOLIDARIDAD}}`
}
