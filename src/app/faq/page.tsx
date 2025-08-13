export default function FAQPage() {
  return (
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-2xl font-semibold">Preguntas frecuentes</h1>
      <ul className="mt-6 space-y-4 text-slate-700">
        <li><strong>¿Cómo funciona?</strong> Rellenas un formulario y generas tu documento.</li>
        <li><strong>¿Puedo editar?</strong> Sí, antes de exportar puedes revisar y ajustar.</li>
      </ul>
    </section>
  );
}
