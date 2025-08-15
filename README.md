<!-- PROJECT LOGO -->
<p align="center">
  <h1 align="center">🧩 Clon tipo Wonder.Legal — Wizard + Vista Previa Reactiva</h1>
  <p align="center">
    Generador de <b>contratos de arrendamiento</b> con edición en vivo, cláusulas condicionales y arquitectura limpia.
    <br />
    <a href="#-demo-rápida">Ver demo</a>
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