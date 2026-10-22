import { useMemo } from 'react';

const projectImages = [
  // Motoring Community
  "/projects/motoring-community/Cover_MotoringCommunity.png",
  "/projects/motoring-community/1_MotoringCommunity.png",
  "/projects/motoring-community/2_MotoringCommunity.png",
  "/projects/motoring-community/3_MotoringCommunity.png",
  "/projects/motoring-community/4_MotoringCommunity.png",
  "/projects/motoring-community/5_MotoringCommunity.png",
  "/projects/motoring-community/6_MotoringCommunity.png",
  // RCManager
  "/projects/rcmanager/Cover_RCManager.png",
  "/projects/rcmanager/1_RCManager.png",
  "/projects/rcmanager/2_RCManager.png",
  "/projects/rcmanager/3_RCManager.png",
  "/projects/rcmanager/4_RCManager.png",
  "/projects/rcmanager/5_RCManager.png",
  "/projects/rcmanager/6_RCManager.png",
  // RCManager API
  "/projects/rcmanager-api/Cover_RCApi.png",
  "/projects/rcmanager-api/1_RCApi.png",
  "/projects/rcmanager-api/2_RCApi.png",
  "/projects/rcmanager-api/3_RCApi.png",
  "/projects/rcmanager-api/4_RCApi.png",
  // TFG DAW 2024
  "/projects/tfg-daw-2024/Cover_TFG.png",
  "/projects/tfg-daw-2024/1_TFG.png",
  "/projects/tfg-daw-2024/2_TFG.png",
  "/projects/tfg-daw-2024/3_TFG.png",
  "/projects/tfg-daw-2024/4_TFG.png",
  "/projects/tfg-daw-2024/5_TFG.png",
  "/projects/tfg-daw-2024/6_TFG.png",
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Columna individual (Estática, sin animación)
const ImageColumn = ({ images = [] }: { images: string[] }) => (
  <div className="flex flex-col gap-4 sm:gap-6 min-w-[200px] sm:min-w-[250px] lg:min-w-[300px]">
    {images.map((src, i) => (
      <div key={src || i} className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-300/70 dark:border-white/10 aspect-video lg:aspect-[4/3] bg-slate-200 dark:bg-slate-800">
        <img 
          src={src} 
          alt="Project Background" 
          className="w-full h-full object-cover object-top opacity-90 grayscale-[15%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/5 dark:bg-black/20"></div>
      </div>
    ))}
  </div>
);

export const HeroBackground = () => {
  const shuffledImages = useMemo(() => shuffleArray(projectImages), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Contenedor limitado al 50% izquierdo de la pantalla */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-full flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-40 dark:opacity-50 transform -rotate-[25deg] scale-[1.7] lg:scale-[1.5] origin-center">
        
        {/* Columnas estáticas con capturas reales aleatorias sin repetir */}
        <ImageColumn images={shuffledImages.slice(0, 3)} />
        <ImageColumn images={shuffledImages.slice(3, 6)} />
        <ImageColumn images={shuffledImages.slice(6, 9)} />

      </div>

      {/* Degradado fuerte hacia la derecha para fundirlo a partir de la mitad de la pantalla */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#eeeeee]/90 to-[#eeeeee] dark:from-transparent dark:via-[#222831]/90 dark:to-[#222831]"></div>
      
      {/* Degradados verticales para suavizar bordes superior e inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#eeeeee] via-transparent to-[#eeeeee] dark:from-[#222831] dark:via-transparent dark:to-[#222831]"></div>

    </div>
  );
};


