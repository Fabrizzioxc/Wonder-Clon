<!-- PROJECT LOGO -->
<p align="center">
  <h1 align="center">🧩 Clon tipo Wonder.Legal — Wizard + Vista Previa Reactiva</h1>
  <p align="center">
    Generador de <b>contratos de arrendamiento</b> con edición en vivo, cláusulas condicionales y arquitectura limpia.
    <br />
    <a href="https://wonder-clon.vercel.app">Ver demo</a>
    ·
    <a href="#-arquitectura">Arquitectura</a>
    ·
    <a href="#-flujo-de-datos-en-vivo">Cómo funciona</a>
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

> **Idea de demo**: mientras escribes en el wizard, la vista previa inserta el texto en tiempo real, resalta el párrafo afectado y hace scroll automático (ej.: “Amueblado: Sí/No” → “CUARTA BIS. MOBILIARIO”).
>
> *(Opcional: añade un GIF/MP4 aquí)*

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
- [Elevator Pitch](#-elevator-pitch)

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

## Flujo de datos (cómo se edita “en vivo”)

```
Form (feature) → ContractData (estado)
  → normalizers (fechas, €) + blocks (cláusulas cond.) [entities]
  → values map { TOKEN: texto }
  → template con {{TOKENS}} [document-engine]
  → render a spans con id únicos
  → resaltado + autoscroll al bloque que cambió

```

## Flujo de datos (cómo se edita “en vivo”)

entities/contract/lib/mapping.ts define el mapa:

```
export const SCROLL_ANCHORS = {
  furnished: "CLAUSULA_MOBILIARIO",
  numTenants: "CLAUSULA_SOLIDARIDAD",
  // ...otros mapeos...
}
export const getAnchorKey = (id: string) => SCROLL_ANCHORS[id] || id

```