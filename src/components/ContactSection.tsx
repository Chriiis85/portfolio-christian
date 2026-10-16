export const ContactSection = () => {
  return (
    <section id="contacto" className="w-full pt-0 pb-24 mt-12 scroll-mt-24 flex flex-col justify-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#393e46]/20 dark:border-[#393e46] rounded-2xl h-96 bg-white/50 dark:bg-[#393e46]/50">
          <h2 className="text-2xl font-bold text-[#393e46] dark:text-[#eeeeee] mb-2">Contacto</h2>
          <p className="text-[#393e46] dark:text-[#eeeeee]">Sección en construcción. Espacio reservado.</p>
        </div>
      </div>
      
      {/* FOOTER BÁSICO */}
      <footer className="w-full text-center mt-24 mb-8 text-slate-500 dark:text-slate-500/50 text-sm">
        <p>Desarrollado por Christian Moreno Díaz © {new Date().getFullYear()}</p>
      </footer>
    </section>
  );
};

