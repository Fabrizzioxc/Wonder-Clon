import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar"; // ojo: ruta y nombre del archivo
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wonder.Legal España - Crea fácilmente tus documentos legales",
  description: "Un formulario muy intuitivo te guiará en la redacción de tus documentos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
