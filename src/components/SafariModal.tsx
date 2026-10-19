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
  images?: string[];
}

const DEFAULT_GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1400&q=85',
];

// Alturas escalonadas para las 6 imágenes (2 por columna) creando efecto Masonry
const HEIGHT_PATTERN = ['h-64', 'h-80', 'h-80', 'h-64', 'h-64', 'h-80'];

const shuffleArray = (arr: string[]): string[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const getFileNameFromUrl = (url: string, fallbackIndex: number, projectTitle: string): string => {
  try {
    const cleanUrl = url.split('?')[0];
    const lastSegment = decodeURIComponent(cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1));
    if (lastSegment && /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(lastSegment)) {
      return lastSegment;
    }
  } catch {
    // Fallback below
  }
  return `${fallbackIndex + 1}_${projectTitle.replace(/\s+/g, '')}.png`;
};

export const SafariModal = ({ isOpen, onClose, title, domain, githubUrl, webUrl, tags = [], images }: SafariModalProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [shuffledUrls, setShuffledUrls] = useState<string[]>(() =>
    shuffleArray(images && images.length > 0 ? images : DEFAULT_GALLERY_IMAGES)
  );

  // Estados de la ventana Vista Previa (macOS Preview.app)
  const [showSidebar, setShowSidebar] = useState(true);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);

  const getHeightClass = (idx: number, total: number) => {
    if (total === 4) {
      return idx === 0 || idx === 3 ? 'h-64 md:h-[33.5rem]' : 'h-64';
    }
    return HEIGHT_PATTERN[idx % HEIGHT_PATTERN.length];
  };

  const galleryImages = shuffledUrls.map((src, idx) => ({
    src,
    alt: `${title} - Captura ${idx + 1}`,
    fileName: getFileNameFromUrl(src, idx, title),
    heightClass: getHeightClass(idx, shuffledUrls.length),
  }));

  // Efecto para manejar la animación de entrada/salida y barajar imágenes aleatoriamente al abrir
  useEffect(() => {
    if (isOpen) {
      const baseImages = images && images.length > 0 ? images : DEFAULT_GALLERY_IMAGES;
      setShuffledUrls(shuffleArray(baseImages));
      setIsRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      setSelectedImageIndex(null);
      setIsPreviewMaximized(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      document.body.style.overflow = 'auto';
      return () => clearTimeout(timer);
    }
  }, [isOpen, images]);

  // Cerrar con la tecla ESC y navegar imágenes con flechas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else {
          onClose();
        }
      } else if (selectedImageIndex !== null && (e.key === 'ArrowRight' || e.key === 'ArrowDown')) {
        e.preventDefault();
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      } else if (selectedImageIndex !== null && (e.key === 'ArrowLeft' || e.key === 'ArrowUp')) {
        e.preventDefault();
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
        );
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, selectedImageIndex, galleryImages.length]);

  const renderGalleryItem = (index: number) => {
    const item = galleryImages[index];
    if (!item) return null;
    return (
      <div
        key={item.src + index}
        onClick={() => setSelectedImageIndex(index)}
        className="group p-2 rounded-2xl bg-gradient-to-b from-slate-200/85 to-slate-200/55 dark:from-[#1c1e26] dark:to-[#14161d] border border-slate-300/90 dark:border-white/10 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.16)] dark:shadow-[0_14px_34px_-6px_rgba(0,0,0,0.65)] hover:shadow-[0_18px_38px_-8px_rgba(0,146,202,0.28)] hover:border-[#0092ca]/60 dark:hover:border-[#0092ca]/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-md ring-1 ring-slate-900/12 dark:ring-white/15">
          <img
            src={item.src}
            alt={item.alt}
            className={`w-full ${item.heightClass} object-cover object-top`}
          />
          {/* Borde interior sutil para que las capturas con fondo blanco nunca pierdan definición */}
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-900/25 dark:group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 bg-black/75 text-white text-xs font-medium px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-xl border border-white/15 transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>Vista Previa</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Reparto en 3 columnas (6 imágenes: [0,1], [2,3], [4,5] | 4 imágenes: [0], [1,2], [3])
  const col1Indices =
    galleryImages.length === 6
      ? [0, 1]
      : galleryImages.length === 4
      ? [0]
      : galleryImages.map((_, i) => i).filter((i) => i % 3 === 0);
  const col2Indices =
    galleryImages.length === 6
      ? [2, 3]
      : galleryImages.length === 4
      ? [1, 2]
      : galleryImages.map((_, i) => i).filter((i) => i % 3 === 1);
  const col3Indices =
    galleryImages.length === 6
      ? [4, 5]
      : galleryImages.length === 4
      ? [3]
      : galleryImages.map((_, i) => i).filter((i) => i % 3 === 2);

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
          <div className="flex-1 max-w-md mx-2 sm:mx-4 min-w-0">
            <a
              href={webUrl && webUrl !== '#' ? webUrl : undefined}
              target="_blank"
              rel="noreferrer"
              className={`w-full bg-white dark:bg-[#16171d] text-slate-700 dark:text-slate-300 text-xs font-mono py-1.5 px-2.5 sm:px-4 rounded-lg border border-slate-300/80 dark:border-slate-700/60 flex items-center justify-center gap-1.5 sm:gap-2 shadow-inner transition-all truncate ${
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
          <div className="flex items-center gap-3 w-8 sm:w-20 justify-end shrink-0">
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
        <div className="relative w-full flex-1 bg-[#f4f5f7] dark:bg-[#0d0e12] p-4 sm:p-10 overflow-y-auto max-h-[80vh] min-h-[320px] sm:min-h-[500px]">
          
          {/* STACK ESPECÍFICO DEL PROYECTO */}
          {tags && tags.length > 0 && (
            <div className="w-full max-w-5xl mx-auto mb-12 sm:mb-16 mt-2 sm:mt-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#222831] dark:text-[#eeeeee] mb-6 text-center tracking-tight">Stack de la Aplicación</h3>
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

          <div className="flex flex-col items-center text-center mb-8 sm:mb-10 mt-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222831] dark:text-[#eeeeee] mb-3 tracking-tight">Galería del Proyecto</h2>
            <p className="text-sm sm:text-base text-[#393e46] dark:text-[#eeeeee]/70">Explora la colección de capturas e interfaces de la aplicación</p>
          </div>

          {/* Grid Estilo Masonry (6 imágenes en orden aleatorio) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mx-auto pb-10">
            {/* Columna 1 */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {col1Indices.map((idx) => renderGalleryItem(idx))}
            </div>

            {/* Columna 2 (Centro) */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {col2Indices.map((idx) => renderGalleryItem(idx))}
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {col3Indices.map((idx) => renderGalleryItem(idx))}
            </div>
          </div>
        </div>
      </div>

      {/* VENTANA NATIVA MACOS PREVIEW (Vista Previa de Apple Mac) */}
      {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedImageIndex(null);
          }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-6 md:p-10 bg-black/50 backdrop-blur-[3px] animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex flex-col bg-[#f5f5f7] dark:bg-[#25262b] border border-slate-300/90 dark:border-white/15 rounded-xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.75)] overflow-hidden transition-all duration-300 ${
              isPreviewMaximized
                ? 'w-[98vw] h-[94vh]'
                : 'w-full max-w-5xl h-[82vh] sm:h-[84vh]'
            }`}
          >
            {/* BARRA DE HERRAMIENTAS DE VISTA PREVIA (macOS Preview Toolbar) */}
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-gradient-to-b from-[#fbfbfd] to-[#e9e9ec] dark:from-[#32333a] dark:to-[#27282e] border-b border-slate-300/90 dark:border-black/50 select-none shrink-0">
              
              {/* Izquierda: Semáforo Mac + Selector de barra lateral + Nombre del archivo */}
              <div className="flex items-center gap-3 min-w-0">
                {/* 3 Botones Mac */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:brightness-95 border border-black/10 flex items-center justify-center group cursor-pointer"
                    title="Cerrar Vista Previa (Esc)"
                  >
                    <span className="text-[9px] font-bold text-red-950 opacity-0 group-hover:opacity-100 leading-none">✕</span>
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="w-3.5 h-3.5 rounded-full bg-[#febc2e] hover:brightness-95 border border-black/10 flex items-center justify-center group cursor-pointer"
                    title="Minimizar"
                  >
                    <span className="text-[9px] font-bold text-yellow-950 opacity-0 group-hover:opacity-100 leading-none">−</span>
                  </button>
                  <button
                    onClick={() => setIsPreviewMaximized((prev) => !prev)}
                    className="w-3.5 h-3.5 rounded-full bg-[#28c840] hover:brightness-95 border border-black/10 flex items-center justify-center group cursor-pointer"
                    title="Maximizar / Restaurar"
                  >
                    <span className="text-[8px] font-bold text-green-950 opacity-0 group-hover:opacity-100 leading-none">+</span>
                  </button>
                </div>

                {/* Botón de barra lateral de miniaturas (macOS Sidebar Icon) */}
                <button
                  onClick={() => setShowSidebar((prev) => !prev)}
                  className={`hidden sm:flex items-center justify-center p-1.5 rounded-md border transition-colors cursor-pointer ${
                    showSidebar
                      ? 'bg-black/10 dark:bg-white/15 border-slate-400/40 dark:border-white/15 text-slate-800 dark:text-white'
                      : 'bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                  title="Mostrar/Ocultar miniaturas"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="9" y1="4" x2="9" y2="20" />
                  </svg>
                </button>

                {/* Separador vertical sutil */}
                <div className="hidden sm:block h-5 w-px bg-slate-300 dark:bg-white/10" />

                {/* Icono de imagen + Nombre de archivo + Página X de Y */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <svg className="w-3.5 h-3.5 text-[#0092ca] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {galleryImages[selectedImageIndex].fileName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight truncate">
                    Página {selectedImageIndex + 1} de {galleryImages.length}
                  </span>
                </div>
              </div>

              {/* Derecha: Controles segmentados nativos de macOS Preview */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                
                {/* Navegación Anterior / Siguiente */}
                <div className="inline-flex items-center rounded-md bg-white/90 dark:bg-[#3a3b42] border border-slate-300/90 dark:border-white/10 shadow-2xs overflow-hidden">
                  <button
                    onClick={() =>
                      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length)
                    }
                    className="p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 active:bg-slate-200 transition-colors cursor-pointer"
                    title="Imagen anterior (←)"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="h-4 w-px bg-slate-300/80 dark:bg-white/10" />
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length)}
                    className="p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 active:bg-slate-200 transition-colors cursor-pointer"
                    title="Imagen siguiente (→)"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Botón Abrir original en pestaña nueva (macOS Share/Export icon) */}
                <a
                  href={galleryImages[selectedImageIndex].src}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-1.5 rounded-md bg-white/90 dark:bg-[#3a3b42] border border-slate-300/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs transition-colors"
                  title="Abrir imagen original"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Botón Cerrar con X del mismo estilo */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="flex items-center justify-center p-1.5 rounded-md bg-white/90 dark:bg-[#3a3b42] border border-slate-300/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs transition-colors cursor-pointer"
                  title="Cerrar Vista Previa (Esc)"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CUERPO DE VISTA PREVIA: Barra lateral de miniaturas + Lienzo central */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
              
              {/* Barra lateral izquierda de miniaturas (estilo macOS Preview) */}
              {showSidebar && (
                <div className="hidden sm:flex w-44 md:w-48 bg-[#ebebed] dark:bg-[#1e1f24] border-r border-slate-300/80 dark:border-black/50 overflow-y-auto p-3 flex-col gap-3 select-none shrink-0">
                  {galleryImages.map((img, idx) => {
                    const isCurrent = idx === selectedImageIndex;
                    return (
                      <button
                        key={img.src + idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`flex flex-col items-center p-1.5 rounded-lg transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#0092ca]/15 dark:bg-[#0092ca]/25 ring-2 ring-[#0092ca]'
                            : 'hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="w-full h-20 rounded overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xs border border-black/10 dark:border-white/10">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <span
                          className={`mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            isCurrent
                              ? 'bg-[#0092ca] text-white font-semibold'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Lienzo principal de visualización de imagen */}
              <div
                onClick={() => setSelectedImageIndex(null)}
                className="flex-1 bg-[#dcdce0] dark:bg-[#16171b] overflow-auto flex items-center justify-center p-3 sm:p-8 relative select-none"
              >
                <img
                  src={galleryImages[selectedImageIndex].src}
                  alt={galleryImages[selectedImageIndex].alt}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-[4px] shadow-[0_15px_50px_rgba(0,0,0,0.45)] border border-black/10 dark:border-white/10 cursor-default"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};
