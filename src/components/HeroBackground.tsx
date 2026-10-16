const mockImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=600&q=80"
];

// Columna individual (Estática, sin animación)
const ImageColumn = ({ images = [] }: { images: string[] }) => (
  <div className="flex flex-col gap-4 sm:gap-6 min-w-[200px] sm:min-w-[250px] lg:min-w-[300px]">
    {images.map((src, i) => (
      <div key={i} className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/10 aspect-video lg:aspect-[4/3] bg-slate-200 dark:bg-slate-800">
        <img 
          src={src} 
          alt="Project Background" 
          className="w-full h-full object-cover opacity-90 grayscale-[20%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/5 dark:bg-black/20"></div>
      </div>
    ))}
  </div>
);

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Contenedor limitado al 50% izquierdo de la pantalla */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-full flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-40 dark:opacity-50 transform -rotate-[25deg] scale-[1.7] lg:scale-[1.5] origin-center">
        
        {/* Columnas estáticas */}
        <ImageColumn images={mockImages.slice(0, 3)} />
        <ImageColumn images={mockImages.slice(3, 6)} />
        <ImageColumn images={mockImages.slice(1, 4)} />

      </div>

      {/* Degradado fuerte hacia la derecha para fundirlo a partir de la mitad de la pantalla */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#eeeeee]/90 to-[#eeeeee] dark:from-transparent dark:via-[#222831]/90 dark:to-[#222831]"></div>
      
      {/* Degradados verticales para suavizar bordes superior e inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#eeeeee] via-transparent to-[#eeeeee] dark:from-[#222831] dark:via-transparent dark:to-[#222831]"></div>

    </div>
  );
};


