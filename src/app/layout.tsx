import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Wonder.Legal España - Crea fácilmente tus documentos legales",
  description: "Un formulario muy intuitivo te guiará en la redacción de tus documentos",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${roboto.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
