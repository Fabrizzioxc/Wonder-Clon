"use client";
export default function Crear() {
  return (
    <main className="container mx-auto px-4 py-8 grid lg:grid-cols-[340px,1fr,180px] gap-6">
      <aside className="space-y-4">/* aquí el formulario por pasos */</aside>
      <section className="border rounded-lg p-4 bg-white shadow-sm">/* aquí el preview en vivo */</section>
      <aside>/* aquí la barra de progreso */</aside>
    </main>
  );
}
