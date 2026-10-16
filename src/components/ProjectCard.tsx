import { useState, useRef, useEffect } from 'react';
import { SafariModal, getSkillBadgeConfig } from './SafariModal';

interface ProjectCardProps {
  title: string;
  domain: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  webUrl?: string;
}

export const ProjectCard = ({ title, domain, description, tags, githubUrl, webUrl }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para colocar el inicio de la tarjeta justo debajo del header cuando se abre
  useEffect(() => {
    if (isOpen && cardRef.current) {
      setTimeout(() => {
        if (!cardRef.current) return;
        const headerOffset = 88;
        const targetTop = cardRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }, 150);
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setIsOpen(!isOpen)}
        /* CONTENEDOR PRINCIPAL: Añadimos soporte claro/oscuro y animación de altura */
        className={`relative w-full max-w-4xl mx-auto flex flex-col border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden bg-white dark:bg-[#16171d] shadow-xl dark:shadow-2xl cursor-pointer hover:shadow-purple-500/10 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 ease-in-out scroll-mt-24`}
      >
        {/* CABECERA SAFARI */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-slate-100 dark:bg-[#1e1f26] border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
          
          {/* 3 Botoncitos Mac */}
          <div className="flex gap-1.5 sm:gap-2 w-14 sm:w-24 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm hover:brightness-110 transition-all" />
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="bg-slate-200 dark:bg-[#16171d] text-slate-600 dark:text-slate-400 text-xs font-mono px-2.5 sm:px-6 py-1.5 rounded-md border border-slate-300/50 dark:border-slate-700/50 flex items-center gap-1.5 sm:gap-2 max-w-[300px] w-full justify-center transition-colors group-hover:bg-slate-300 dark:group-hover:bg-[#1a1c23] truncate">
              <svg className="w-3 h-3 opacity-70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="truncate">{domain}</span>
            </div>
          </div>

          <div className="w-6 sm:w-24 shrink-0"></div>
        </div>

        {/* CUERPO DEL PROYECTO */}
        <div className="relative flex flex-col flex-1 p-5 sm:p-8">
          
          {/* ESTADO CERRADO (Resumen) */}
          <div className={`flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100 mt-4 sm:mt-8'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Haz clic para expandir y ver detalles</p>
          </div>

          {/* ESTADO ABIERTO (Detalles) */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-[3000px] opacity-100 mt-4' : 'max-h-0 opacity-0 m-0'
          }`}>
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
              
              {/* Contenedor de la Imagen - Ahora es clickeable y abre la modal */}
              <div 
                onClick={(e) => {
                  e.stopPropagation(); // Evitamos que cierre la tarjeta
                  setIsModalOpen(true);
                }}
                className="flex-1 bg-slate-100 dark:bg-[#1e1f26] border border-slate-200 dark:border-slate-700/50 rounded-lg min-h-[200px] sm:min-h-[300px] flex items-center justify-center transition-all duration-300 overflow-hidden relative group"
                title="Ampliar vista"
              >
                {/* Indicador de click al hacer hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors z-10 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-black/60 text-white text-sm px-4 py-2 rounded-full font-medium transition-opacity transform scale-95 group-hover:scale-100">
                    Ampliar vista
                  </span>
                </div>
                <span className="text-slate-400 dark:text-slate-500 font-medium z-0">No preview image</span>
              </div>

              {/* Detalles y Botones */}
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  {description}
                </p>
                
                {/* Lenguajes y Skills (estilo botones con icono y color de referencia) */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => {
                    const badge = getSkillBadgeConfig(tag, 'w-3.5 h-3.5');
                    return (
                      <span
                        key={index}
                        style={{ backgroundColor: badge.color }}
                        className="shadow-md text-white relative inline-flex items-center justify-center gap-1.5 font-medium h-8 rounded-md px-3.5 text-xs select-none border border-white/10"
                      >
                        {badge.icon}
                        <span>{badge.label || tag}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-3 mt-auto pt-4" onClick={(e) => e.stopPropagation() /* Evita cerrar la card al clicar los botones */}>
                  {webUrl && (
                    <a href={webUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 px-4 text-center bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors text-sm">
                      Visitar Web
                    </a>
                  )}
                  
                  {githubUrl && (
                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center px-4 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                      title="Ver en GitHub"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal tipo Safari que se abre por encima de todo (Portal) */}
      <SafariModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={title} 
        domain={domain} 
        githubUrl={githubUrl}
        webUrl={webUrl}
        tags={tags}
      />
    </>
  );
};
