<!-- PROJECT LOGO -->
<p align="center">
  <h1 align="center">🧩 Clon tipo Wonder.Legal — Wizard + Vista Previa Reactiva</h1>
  <p align="center">
    Generador de <b>contratos de arrendamiento</b> con edición en vivo, cláusulas condicionales y arquitectura limpia.
    <br />
    <a href="https://wonder-clon.vercel.app">Ver demo</a>
    
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-App%20Router-000000?logo=nextdotjs" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/shadcn-ui-000" />
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel" />
    <img src="https://img.shields.io/badge/License-MIT-green" />
  </p>
</p>

---

## ✨ Highlights

- 🧠 **Arquitectura Feature-Sliced con capa de Entidades** (FSD + Clean)
- 🧵 **Motor de plantillas** con **tokens** `{{...}}` (agnóstico del dominio)
- ⚖️ **Bloques legales condicionales** (amueblado, suministros, pluralidad, representante, DNI/NIE/Pasaporte…)
- ⚡ **Edición en vivo**: resaltado + autoscroll inteligente al párrafo que cambia
- 🔒 **Sin `dangerouslySetInnerHTML`** (XSS-safe), reemplazo token→valor
- 🧪 **Funciones puras** en dominio → tests simples

---

## 📸 Demo rápida

>
![Vista previa del wizard](./public/img/preview_md.png)

---

## 🧰 Stack

- **Next.js (App Router) + React 18**
- **TypeScript estricto** + **ESLint**
- **TailwindCSS + shadcn/ui**
- Deploy recomendado: **Vercel**

---

## 🗺️ Tabla de contenidos

- [Arquitectura](#-arquitectura)
- [Estructura de carpetas](#-estructura-de-carpetas)
- [Flujo de datos en vivo](#-flujo-de-datos-en-vivo)
- [Tokens y Bloques](#-tokens-y-bloques)
- [Scripts](#-scripts)
- [Calidad y Seguridad](#-calidad-y-seguridad)
- [Tests (sugeridos)](#-tests-sugeridos)
- [Roadmap](#-roadmap)

---

## 🧱 Arquitectura

**Feature-Sliced Design (FSD) con capa de entidades** + separación de responsabilidades (Clean).

```bash
app/                 # rutas Next.js (App Router)
features/            # casos de uso (wizard, preview, export)
  └─ lease-wizard/   # formulario multipaso (estado/control)
  └─ lease-preview/  # vista previa reactiva (render)
entities/            # dominio "contrato" (reglas, tipos, bloques)
  └─ contract/
      model/         # tipos, esquemas
      lib/           # normalizadores, mapping
      templates/     # funciones que devuelven párrafos/cláusulas
document-engine/     # motor genérico de plantillas con tokens {{...}}
shared/              # UI y helpers reutilizables
widgets/             # secciones UI grandes (Navbar/Footer/etc.)
tests/               # unit/e2e (opcional)
```

## Dependencias entre capas

- `Features` → depende de entities y shared
- `entities` → puro dominio (no depende de React)
- `document-engine` → infraestructura genérica (no conoce el dominio)
- `app` → compone páginas a partir de features


## 📁 Estructura de carpetas

```bash
src/
  app/
    documentos/
      arrendamiento/
        contrato-arrendamiento-vivienda-habitual/
          page.tsx
  entities/
    contract/
      model/types.ts
      lib/normalizers.ts
      lib/mapping.ts
      templates/blocks.ts
      index.ts
    document-engine/
      lib/renderTemplate.ts
      index.ts
  features/
    lease-wizard/
      ui/ContractForm.tsx
      model/questions.ts
    lease-preview/
      ui/ContractPreview.tsx
  shared/
    ui/FormField.tsx
    ui/ProgressBar.tsx
    lib/...
```

## 🔄 Flujo de datos (cómo se edita “en vivo”)

entities/contract/lib/mapping.ts define el mapa:

```
export const SCROLL_ANCHORS = {
  furnished: "CLAUSULA_MOBILIARIO",
  numTenants: "CLAUSULA_SOLIDARIDAD",
  // ...otros mapeos...
}
export const getAnchorKey = (id: string) => SCROLL_ANCHORS[id] || id

```


1. **Estado controlado**: `ContractForm.tsx` gestiona `contractData` (lo que escribe el usuario) y `currentFieldId` (paso actual).
2. **Normalización**: helpers puros (`formatFechaES`, `formatEuros`, `labelPago`, `fallback`) preparan los datos.
3. **Bloques condicionales**: `buildBlocks(data)` produce **párrafos/cláusulas completas** según opciones (amueblado, suministros, pluralidad, representante, DNI/NIE/Pasaporte…).
4. **Motor de plantillas**: un template con **tokens** `{{TOKEN}}` se sustituye por texto. En el preview, cada token se imprime como `<span>` con `id` único para permitir resaltado y scroll preciso.
5. **Autoscroll inteligente**: `SCROLL_ANCHORS` mapea `campo → token`. Ej.: `furnished → CLAUSULA_MOBILIARIO`. Al cambiar un radio/select, el preview se desplaza al bloque correcto.

---

## 🧱 Tokens y bloques (conceptos clave)

- **Tokens `{{...}}`**: placeholders semánticos en el template (p. ej. `{{CLAUSULA_MOBILIARIO}}`, `{{BLOQUE_SUMINISTROS}}`).  
  Si falta dato, se muestra `__________`.
- **Bloques/estrategias**: funciones puras que devuelven el texto legal correcto según el estado (Sí/No, tipo de persona, nº de arrendatarios, etc.).
- **Mapa de anclas**: tabla `campo→token` para resaltar y scrollear al párrafo que cambia.

### Ejemplos

**Amueblado (Sí/No)**
- Token: `{{CLAUSULA_MOBILIARIO}}`
- Sí → inventario (Anexo I), conservación, cargo a fianza/depósito si procede.  
- No → mobiliario propio, retiro al final, estado de devolución.

**Pluralidad de arrendatarios (1/2/3)**
- `numTenants` controla:
  - Inputs dinámicos para co-arrendatario 2/3 en el wizard.
  - Listado en “REUNIDOS” (`{{BLOQUE_COTENANTS}}`).
  - **Cláusula de solidaridad** (`{{CLAUSULA_SOLIDARIDAD}}`): responsabilidad solidaria y notificaciones válidas a cualquiera.

**Tipos de persona y documento**
- `{{BLOQUE_PARTE_ARRENDADOR}}` / `{{BLOQUE_PARTE_ARRENDATARIO}}`:
  - Jurídica → “La sociedad X, identificada con NIF… con domicilio social…”
  - Física → “Nombre, identificado con DNI/NIE/Pasaporte… con domicilio en…”
  - Con representante → se añade coletilla de poder suficiente.

---

## 🔒 Seguridad y calidad

- Sin `dangerouslySetInnerHTML`: menor riesgo de XSS.
- Reemplazo **token→valor** (no `replaceAll` del valor): evita que, por ejemplo, todos los “2” se resalten.
- TypeScript estricto (sin `any`) y ESLint limpio.
- Funciones de dominio **puras** → unit tests simples.

---

## ▶️ Scripts

```bash
# instalar dependencias
npm install

# desarrollo local
npm run dev

# linter
npm run lint

# build de producción
npm run build
```


## tsconfig.json (paths):

```bash
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}

```

## 🧪 Tests (sugeridos)

- normalizers.spec.ts (fechas, importes)
- blocks.spec.ts (amueblado, pluralidad, tipos de doc/persona)
- renderTemplate.spec.ts (reemplazo de tokens; guiones por defecto)

