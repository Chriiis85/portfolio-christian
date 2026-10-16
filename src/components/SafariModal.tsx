import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FaAngular,
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaCode,
  FaPhp,
  FaJava,
  FaDatabase,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaDocker,
  FaNodeJs,
  FaServer,
  FaLayerGroup,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiFirebase,
  SiJquery,
  SiNextdotjs,
  SiExpress,
} from 'react-icons/si';

export interface SkillBadgeConfig {
  icon: React.ReactNode;
  color: string;
  label?: string;
}

export const getSkillBadgeConfig = (tag: string, iconClass = 'w-4 h-4'): SkillBadgeConfig => {
  const normalized = tag.trim();
  const map: Record<string, SkillBadgeConfig> = {
    'Angular': { icon: <FaAngular className={iconClass} />, color: '#DD0031' },
    'React': { icon: <FaReact className={iconClass} />, color: '#0284C7' },
    'Wordpress': { icon: <FaWordpress className={iconClass} />, color: '#21759B' },
    'WordPress': { icon: <FaWordpress className={iconClass} />, color: '#21759B' },
    'HTML': { icon: <FaHtml5 className={iconClass} />, color: '#E34F26' },
    'CSS': { icon: <FaCss3Alt className={iconClass} />, color: '#1572B6' },
    'JavaScript': { icon: <FaJs className={iconClass} />, color: '#CA9E00' },
    'TypeScript': { icon: <SiTypescript className={iconClass} />, color: '#3178C6' },
    'PHP': { icon: <FaPhp className={iconClass} />, color: '#777BB4' },
    'Java': { icon: <FaJava className={iconClass} />, color: '#E76F00' },
    'SQL/MYSQL': { icon: <SiMysql className={iconClass} />, color: '#4479A1' },
    'MySQL': { icon: <SiMysql className={iconClass} />, color: '#4479A1', label: 'MySQL' },
    'Firebase': { icon: <SiFirebase className={iconClass} />, color: '#F57C00' },
    'Bootstrap': { icon: <FaBootstrap className={iconClass} />, color: '#7952B3' },
    'Tailwind': { icon: <SiTailwindcss className={iconClass} />, color: '#06B6D4' },
    'Tailwind CSS': { icon: <SiTailwindcss className={iconClass} />, color: '#06B6D4', label: 'Tailwind CSS' },
    'jQuery': { icon: <SiJquery className={iconClass} />, color: '#0769AD' },
    'Git': { icon: <FaGitAlt className={iconClass} />, color: '#F05032' },
    'Github': { icon: <FaGithub className={iconClass} />, color: '#24292E' },
    'GitHub': { icon: <FaGithub className={iconClass} />, color: '#24292E' },
    'Figma': { icon: <FaFigma className={iconClass} />, color: '#F24E1E' },
    'UI/UX': { icon: <FaFigma className={iconClass} />, color: '#F24E1E' },
    'Docker': { icon: <FaDocker className={iconClass} />, color: '#2496ED' },
    'Next.js': { icon: <SiNextdotjs className={iconClass} />, color: '#111111' },
    'Node.js': { icon: <FaNodeJs className={iconClass} />, color: '#339933' },
    'Express': { icon: <SiExpress className={iconClass} />, color: '#353B48' },
    'API REST': { icon: <FaServer className={iconClass} />, color: '#0092CA' },
    'Backend': { icon: <FaDatabase className={iconClass} />, color: '#475569' },
    'Frontend': { icon: <FaCode className={iconClass} />, color: '#2563EB' },
    'Full-Stack': { icon: <FaLayerGroup className={iconClass} />, color: '#6D28D9' },
  };

  return (
    map[normalized] || {
      icon: <FaCode className={iconClass} />,
      color: '#0092CA',
    }
  );
};

interface SafariModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  domain: string;
  githubUrl?: string;
  webUrl?: string;
  tags?: string[];
}

export const SafariModal = ({ isOpen, onClose, title, domain, githubUrl, webUrl, tags = [] }: SafariModalProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para manejar la animación de entrada y salida
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      document.body.style.overflow = 'auto';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cerrar con la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-300 ease-out ${
        isVisible ? 'bg-black/60 backdrop-blur-md opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Ventana de Safari */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-6xl bg-slate-100 dark:bg-[#1e1f26] border border-slate-300 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out transform ${
          isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
        }`}
      >
        {/* Cabecera de Safari (Barra Superior) */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-200/80 dark:bg-[#25262e] border-b border-slate-300 dark:border-slate-700/50 select-none">
          {/* Izquierda: Botones de control de ventana (Mac) + Controles de pestaña */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group transition-colors shadow-sm cursor-pointer"
                title="Cerrar ventana"
              >
                <span className="text-[9px] font-bold text-red-950 opacity-0 group-hover:opacity-100 leading-none">✕</span>
              </button>
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group transition-colors shadow-sm cursor-pointer"
                title="Minimizar"
              >
                <span className="text-[9px] font-bold text-yellow-950 opacity-0 group-hover:opacity-100 leading-none">−</span>
              </button>
              <button
                className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group transition-colors shadow-sm cursor-default"
                title="Pantalla completa"
              >
                <span className="text-[8px] font-bold text-green-950 opacity-0 group-hover:opacity-100 leading-none">+</span>
              </button>
            </div>

            {/* Iconos decorativos de navegación de Safari */}
            <div className="hidden sm:flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>

          {/* Centro: Barra de Direcciones URL */}
          <div className="flex-1 max-w-md mx-4">
            <a
              href={webUrl && webUrl !== '#' ? webUrl : undefined}
              target="_blank"
              rel="noreferrer"
              className={`w-full bg-white dark:bg-[#16171d] text-slate-700 dark:text-slate-300 text-xs font-mono py-1.5 px-4 rounded-lg border border-slate-300/80 dark:border-slate-700/60 flex items-center justify-center gap-2 shadow-inner transition-all ${
                webUrl && webUrl !== '#' ? 'hover:border-blue-500 cursor-pointer' : 'cursor-default'
              }`}
            >
              <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="truncate">{domain}</span>
            </a>
          </div>

          {/* Derecha: Icono de GitHub */}
          <div className="flex items-center gap-3 w-20 justify-end">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#393e46] dark:text-[#eeeeee]/70 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Ver en GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Cuerpo / Contenido de la web */}
        <div className="relative w-full flex-1 bg-white dark:bg-[#0d0e12] p-6 sm:p-10 overflow-y-auto max-h-[75vh] min-h-[500px]">
          
          {/* STACK ESPECÍFICO DEL PROYECTO */}
          {tags && tags.length > 0 && (
            <div className="w-full max-w-5xl mx-auto mb-16 mt-4">
              <h3 className="text-2xl font-extrabold text-[#222831] dark:text-[#eeeeee] mb-6 text-center tracking-tight">Stack de la Aplicación</h3>
              <div className="relative border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#111]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {tags.map((tag, idx) => {
                    const iconElement = getSkillBadgeConfig(
                      tag,
                      "w-8 h-8 text-[#393e46] dark:text-[#eeeeee]/70 group-hover:text-[#0092ca] dark:group-hover:text-[#0092ca] transition-colors duration-300 mb-3"
                    ).icon;
                    return (
                      <div key={idx} className="relative group flex flex-col items-center justify-center p-6 border-b border-r border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        {/* Crosshair (bottom right) */}
                        <svg className="absolute -right-[9px] -bottom-[9px] w-4 h-4 text-slate-300 dark:text-slate-600 z-10 hidden md:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                        </svg>
                        
                        {iconElement ? (
                          iconElement
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center mb-3">
                             <span className="text-[#393e46] dark:text-[#eeeeee]/70 font-mono text-xl font-bold">{tag.charAt(0)}</span>
                          </div>
                        )}
                        <span className="text-xs font-semibold text-[#393e46] dark:text-[#eeeeee]/70 group-hover:text-[#0092ca] dark:group-hover:text-[#0092ca] transition-colors text-center">{tag}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center text-center mb-10 mt-4">
            <h2 className="text-4xl font-extrabold text-[#222831] dark:text-[#eeeeee] mb-3 tracking-tight">Galería del Proyecto</h2>
            <p className="text-[#393e46] dark:text-[#eeeeee]/70">Explora la colección de capturas e interfaces de la aplicación</p>
          </div>

          {/* Grid Estilo Masonry (como en la referencia) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mx-auto pb-10">
            {/* Columna 1 */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Preview 1" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Preview 2" className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Columna 2 (Centro) */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" alt="Preview 3" className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2 bg-black/60 p-2 rounded-lg backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80" alt="Preview 4" className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" alt="Preview 5" className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80" alt="Preview 6" className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="Preview 7" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
