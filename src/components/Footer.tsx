// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="container mx-auto text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Wonder Legal Clone. Todos los derechos reservados.
      </div>
    </footer>
  );
}
