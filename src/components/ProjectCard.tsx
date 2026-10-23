import { useState, useRef, useEffect } from 'react';
import { SafariModal, getSkillBadgeConfig } from './SafariModal';

interface ProjectCardProps {
  title: string;
  domain: string;
  description: string;
  aboutApp?: string;
  tags: string[];
  githubUrl?: string;
  webUrl?: string;
  coverImage?: string;
  images?: string[];
  inProgress?: boolean;
}

let activeOpenProjectTitle: string | null = null;

export const ProjectCard = ({ title, domain, description, aboutApp, tags, githubUrl, webUrl, coverImage, images, inProgress }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const previewSrc = coverImage || (images && images.length > 0 ? images[0] : undefined);

  // Aparición suave al hacer scroll hasta cada tarjeta de proyecto
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAppeared(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Cerrar esta tarjeta automáticamente si se abre otro proyecto
  useEffect(() => {
    const handleOtherCardOpen = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail !== title) {
        setIsOpen(false);
      }
    };

    window.addEventListener('project-card-open', handleOtherCardOpen);
    return () => window.removeEventListener('project-card-open', handleOtherCardOpen);
  }, [title]);

  const handleToggleCard = () => {
    const nextIsOpen = !isOpen;
    const hadAnotherOpen = activeOpenProjectTitle !== null && activeOpenProjectTitle !== title;

    if (nextIsOpen) {
      activeOpenProjectTitle = title;
      window.dispatchEvent(new CustomEvent('project-card-open', { detail: title }));
      setIsOpen(true);

      // Si había otra tarjeta abierta cerrándose, esperamos a que termine su transición para calcular la posición exacta
      const delay = hadAnotherOpen ? 520 : 150;
      setTimeout(() => {
        if (!cardRef.current) return;
        const headerOffset = 88;
        const targetTop = cardRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }, delay);
    } else {
      if (activeOpenProjectTitle === title) {
        activeOpenProjectTitle = null;
      }
      setIsOpen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleToggleCard}
        onMouseMove={handleMouseMove}
        /* CONTENEDOR PRINCIPAL: Añadimos soporte claro/oscuro, reflejo especular al mover el ratón, aparición al hacer scroll y animación de altura */
        className={`group/card relative w-full max-w-4xl mx-auto flex flex-col border border-zinc-200/90 dark:border-zinc-800/90 rounded-xl overflow-hidden bg-white dark:bg-[#111113] shadow-[0_12px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)] cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700/90 transition-all duration-700 ease-out scroll-mt-24 transform ${
          hasAppeared
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-10 scale-[0.97]'
        }`}
      >
        {/* Reflejo especular dinámico (Spotlight) que sigue al cursor sin re-renders */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background:
              'radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), rgba(56, 189, 248, 0.07), transparent 45%)',
          }}
        />

        {/* CABECERA SAFARI */}
        <div className="relative z-10 flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-zinc-100/90 dark:bg-[#161618] border-b border-zinc-200/90 dark:border-zinc-800/80 transition-colors duration-300">
          
          {/* 3 Botoncitos Mac */}
          <div className="flex gap-1.5 sm:gap-2 w-14 sm:w-28 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-2xs hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-2xs hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-2xs hover:brightness-110 transition-all" />
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs font-mono px-2.5 sm:px-6 py-1.5 rounded-md border border-zinc-200/90 dark:border-zinc-800/90 flex items-center gap-1.5 sm:gap-2 max-w-[300px] w-full justify-center transition-colors group-hover/card:border-zinc-300 dark:group-hover/card:border-zinc-700 truncate">
              <svg className="w-3 h-3 text-sky-500 dark:text-sky-400 opacity-85 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="truncate">{domain}</span>
            </div>
          </div>

          {/* Espaciador derecho simétrico */}
          <div className="w-14 sm:w-28 shrink-0" />
        </div>

        {/* CUERPO DEL PROYECTO */}
        <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-8">
          
          {/* ESTADO CERRADO (Resumen) */}
          <div className={`flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100 my-2 sm:mt-6 sm:mb-2'
          }`}>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1.5 sm:mb-2">{title}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">Toca para expandir y ver detalles</p>
          </div>

          {/* ESTADO ABIERTO (Detalles) */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-[3000px] opacity-100 mt-2 sm:mt-4' : 'max-h-0 opacity-0 m-0'
          }`}>
            <div className="flex flex-col md:flex-row gap-5 sm:gap-8">
              
              {/* Contenedor de la Imagen - Marco con contraste y sombra profunda para resaltar capturas con fondo blanco */}
              <div 
                onClick={(e) => {
                  e.stopPropagation(); // Evitamos que cierre la tarjeta
                  setIsModalOpen(true);
                }}
                className="flex-1 self-stretch p-2 sm:p-3.5 bg-zinc-100 dark:bg-[#161618] border border-zinc-200/90 dark:border-zinc-800/90 rounded-xl min-h-[190px] sm:min-h-[300px] flex items-center justify-center shadow-inner hover:border-sky-500/40 dark:hover:border-sky-400/40 active:scale-[0.99] transition-all duration-300 relative group"
                title="Ampliar vista"
              >
                <div className="relative w-full h-full aspect-[16/10] md:aspect-auto min-h-[175px] sm:min-h-[272px] rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_35px_-6px_rgba(0,0,0,0.75)] ring-1 ring-zinc-900/10 dark:ring-white/10 flex items-center justify-center">
                  {/* Indicador central "In Progress" estilo en construcción con tono amarillo */}
                  {inProgress && (
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                      <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-amber-50/95 dark:bg-[#18181b]/95 text-amber-700 dark:text-amber-300 border border-amber-400/80 dark:border-amber-400/50 shadow-[0_10px_30px_rgba(245,158,11,0.25)] backdrop-blur-md select-none">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 dark:bg-amber-400" />
                        </span>
                        {/* Icono sutil de en construcción / herramientas */}
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                        <span>In Progress</span>
                      </span>
                    </div>
                  )}

                  {/* Indicador táctil visible en móvil (< md) para saber que se puede abrir la galería */}
                  <div className="md:hidden pointer-events-none absolute bottom-2.5 right-2.5 z-20">
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950/80 text-zinc-100 text-[11px] font-medium px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/15 shadow-lg">
                      <svg className="w-3 h-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>{images && images.length > 0 ? `Ver galería (${images.length})` : 'Ampliar vista'}</span>
                    </span>
                  </div>

                  {/* Indicador de click al hacer hover en desktop */}
                  <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-zinc-950/30 dark:group-hover:bg-black/40 transition-colors z-10 items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-zinc-950/85 text-zinc-100 text-sm px-4 py-2 rounded-lg font-medium transition-all transform scale-95 group-hover:scale-100 shadow-xl backdrop-blur-sm border border-white/15">
                      Ampliar vista
                    </span>
                  </div>
                  {previewSrc ? (
                    <img
                      src={previewSrc}
                      alt={`Vista previa de ${title}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : !inProgress ? (
                    <span className="text-zinc-400 dark:text-zinc-500 font-medium z-0">No preview image</span>
                  ) : null}
                  {/* Borde interior sutil para definir capturas 100% blancas */}
                  <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10 z-10" />
                </div>
              </div>

              {/* Detalles y Botones */}
              <div className="w-full md:w-1/3 flex flex-col gap-3.5 sm:gap-4">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  {description}
                </p>
                
                {/* Lenguajes y Skills (Acabado Pure Zinc & Ice con icono a color) */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                  {tags.map((tag, index) => {
                    const badge = getSkillBadgeConfig(tag, 'w-3.5 h-3.5');
                    return (
                      <span
                        key={index}
                        className="relative inline-flex items-center justify-center gap-1.5 font-medium h-7 sm:h-8 rounded-md px-2.5 sm:px-3 text-[11px] sm:text-xs select-none bg-zinc-100 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      >
                        <span style={{ color: badge.color === '#111111' ? '#38bdf8' : badge.color }} className="shrink-0">
                          {badge.icon}
                        </span>
                        <span>{badge.label || tag}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-3 mt-auto pt-3 sm:pt-4" onClick={(e) => e.stopPropagation() /* Evita cerrar la card al clicar los botones */}>
                  {webUrl && (
                    <a href={webUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 px-4 text-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-white transition-colors text-sm">
                      Visitar Web
                    </a>
                  )}
                  
                  {githubUrl && (
                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-200/80 dark:hover:bg-zinc-800 transition-colors"
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
        description={description}
        aboutApp={aboutApp}
        githubUrl={githubUrl}
        webUrl={webUrl}
        tags={tags}
        images={images}
      />
    </>
  );
};
