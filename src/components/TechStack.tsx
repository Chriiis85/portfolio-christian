import { useState, useEffect, useRef, type ReactNode } from 'react';
import { 
  FaReact, 
  FaAngular, 
  FaHtml5, 
  FaCss3Alt, 
  FaJava, 
  FaPhp, 
  FaFigma, 
  FaGitAlt, 
  FaGithub, 
  FaServer, 
  FaDatabase,
  FaWindows 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiBootstrap, 
  SiDotnet, 
  SiMysql, 
  SiPostgresql, 
  SiFirebase, 
  SiJson, 
  SiPostman, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiSupabase, 
  SiVite, 
  SiNpm,
  SiPrisma,
  SiVercel 
} from 'react-icons/si';
import { TbBrandCSharp, TbSql } from 'react-icons/tb';
import { VscVscode, VscTerminal } from 'react-icons/vsc';

// Iconos genéricos minimalistas
const DesignIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

interface TechItem {
  name: string;
  icon: ReactNode;
  brandColor: string;
  darkBrandColor?: string;
}

export const TechStack = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          requestAnimationFrame(() => {
            setIsClear(true);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setIsClear(false);
    setActiveTab(tab);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsClear(true);
      });
    });
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const iconClass = "w-6 h-6 transition-transform duration-300";

  const categories: Record<string, TechItem[]> = {
    'Frontend': [
      { name: "React", icon: <FaReact className={iconClass} />, brandColor: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs className={iconClass} />, brandColor: "#000000", darkBrandColor: "#FFFFFF" },
      { name: "Angular", icon: <FaAngular className={iconClass} />, brandColor: "#DD0031" },
      { name: "TypeScript", icon: <SiTypescript className={iconClass} />, brandColor: "#3178C6" },
      { name: "JavaScript", icon: <SiJavascript className={iconClass} />, brandColor: "#F7DF1E" },
      { name: "Tailwind", icon: <SiTailwindcss className={iconClass} />, brandColor: "#06B6D4" },
      { name: "Bootstrap", icon: <SiBootstrap className={iconClass} />, brandColor: "#7952B3" },
      { name: "HTML5", icon: <FaHtml5 className={iconClass} />, brandColor: "#E34F26" },
      { name: "CSS3", icon: <FaCss3Alt className={iconClass} />, brandColor: "#1572B6" },
      { name: "Vite", icon: <SiVite className={iconClass} />, brandColor: "#646CFF" },
    ],
    'Backend': [
      { name: "C#", icon: <TbBrandCSharp className={iconClass} />, brandColor: "#9B4993" },
      { name: "ASP.NET Core", icon: <SiDotnet className={iconClass} />, brandColor: "#512BD4" },
      { name: "Node.js", icon: <SiNodedotjs className={iconClass} />, brandColor: "#5FA04E" },
      { name: "Express", icon: <SiExpress className={iconClass} />, brandColor: "#000000", darkBrandColor: "#FFFFFF" },
      { name: "PHP", icon: <FaPhp className={iconClass} />, brandColor: "#777BB4" },
      { name: "Java", icon: <FaJava className={iconClass} />, brandColor: "#ED8B00" },
      { name: "Entity Framework", icon: <FaDatabase className={iconClass} />, brandColor: "#512BD4" },
      { name: "REST APIs", icon: <FaServer className={iconClass} />, brandColor: "#0092CA" },
    ],
    'Bases de Datos': [
      { name: "SQL Server", icon: <TbSql className={iconClass} />, brandColor: "#CC292B" },
      { name: "PostgreSQL", icon: <SiPostgresql className={iconClass} />, brandColor: "#4169E1" },
      { name: "MySQL", icon: <SiMysql className={iconClass} />, brandColor: "#4479A1" },
      { name: "Supabase", icon: <SiSupabase className={iconClass} />, brandColor: "#3ECF8E" },
      { name: "Prisma ORM", icon: <SiPrisma className={iconClass} />, brandColor: "#2D3748", darkBrandColor: "#FFFFFF" },
      { name: "Firebase", icon: <SiFirebase className={iconClass} />, brandColor: "#FFCA28" },
      { name: "JSON", icon: <SiJson className={iconClass} />, brandColor: "#0092CA" },
    ],
    'Herramientas': [
      { name: "Git", icon: <FaGitAlt className={iconClass} />, brandColor: "#F05032" },
      { name: "GitHub", icon: <FaGithub className={iconClass} />, brandColor: "#24292E", darkBrandColor: "#FFFFFF" },
      { name: "Vercel", icon: <SiVercel className={iconClass} />, brandColor: "#000000", darkBrandColor: "#FFFFFF" },
      { name: "Postman", icon: <SiPostman className={iconClass} />, brandColor: "#FF6C37" },
      { name: "VS Code", icon: <VscVscode className={iconClass} />, brandColor: "#007ACC" },
      { name: "Windows Server", icon: <FaWindows className={iconClass} />, brandColor: "#0078D6" },
      { name: "npm", icon: <SiNpm className={iconClass} />, brandColor: "#CB3837" },
      { name: "Terminal / Linux", icon: <VscTerminal className={iconClass} />, brandColor: "#4D5BCE" },
    ],
    'Diseño': [
      { name: "Figma", icon: <FaFigma className={iconClass} />, brandColor: "#F24E1E" },
      { name: "UI Design", icon: <DesignIcon className={iconClass} />, brandColor: "#0092CA" },
      { name: "UX Design", icon: <DesignIcon className={iconClass} />, brandColor: "#10B981" },
      { name: "Prototyping", icon: <DesignIcon className={iconClass} />, brandColor: "#8B5CF6" },
    ]
  };

  const currentItems = categories[activeTab] || categories['Frontend'];

  return (
    <section 
      ref={sectionRef}
      id="stack" 
      className="w-full lg:min-h-screen pt-2 sm:pt-4 pb-10 sm:pb-16 lg:pb-20 mt-4 sm:mt-6 px-4 scroll-mt-24 flex flex-col items-center justify-center relative overflow-x-hidden"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center lg:my-auto">
        
        {/* Título de la sección */}
        <h2
          className={`text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 sm:mb-8 text-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-4 blur-sm'
          }`}
        >
          Mi Stack
        </h2>

        {/* Selector de Secciones Estilo Pure Zinc */}
        <div
          className={`flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 bg-zinc-100/90 dark:bg-[#111113] p-1.5 rounded-2xl sm:rounded-full border border-zinc-200/90 dark:border-zinc-800/90 shadow-xs relative z-20 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-4 blur-sm'
          }`}
        >
          {Object.keys(categories).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs border border-zinc-200/90 dark:border-zinc-800' 
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent bg-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid Estilo Panel con efecto de vaho/borrosidad que se despeja en cascada */}
        <div className="w-full relative border-l border-t border-zinc-200/90 dark:border-zinc-800/80 bg-white/40 dark:bg-[#111113]/40">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {currentItems.map((item, i) => {
              // Lógica de intersecciones para las cruces (Crosshairs)
              const isLastCol = (i + 1) % 4 === 0;
              const isLastRow = Math.floor(i / 4) === Math.floor((currentItems.length - 1) / 4);
              const showCross = !isLastCol && !isLastRow;

              // Onda diagonal tipo panal (fila + columna) para despejar el vaho celda por celda
              const row = Math.floor(i / 4);
              const col = i % 4;
              const cellDelay = (row + col) * 75;

              const isHovered = hoveredItem === item.name;
              const effectiveColor = (isDark && item.darkBrandColor) ? item.darkBrandColor : item.brandColor;

              return (
                <div 
                  key={`${activeTab}-${item.name}`} 
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setHoveredItem(hoveredItem === item.name ? null : item.name)}
                  style={{
                    backgroundColor: isHovered 
                      ? (isDark ? `${effectiveColor}14` : `${effectiveColor}0d`) 
                      : undefined,
                  }}
                  className="relative h-20 sm:h-24 px-2 flex items-center justify-center border-r border-b border-zinc-200/90 dark:border-zinc-800/80 transition-colors duration-300 group cursor-default overflow-hidden select-none"
                >
                  {/* Capa de vaho / cristal empañado que se evapora al aparecer */}
                  <div
                    style={{ transitionDelay: `${cellDelay}ms` }}
                    className={`pointer-events-none absolute inset-0 z-20 bg-[#fafafa]/70 dark:bg-[#09090b]/75 backdrop-blur-md transition-opacity duration-700 ease-out ${
                      isClear ? 'opacity-0' : 'opacity-100'
                    }`}
                  />

                  {/* Resplandor ambiental suave al hover con el color de la marca */}
                  <div 
                    className={`absolute w-16 h-16 rounded-full blur-xl pointer-events-none transition-opacity duration-300 ${
                      isHovered ? 'opacity-40 dark:opacity-30' : 'opacity-0'
                    }`}
                    style={{ backgroundColor: effectiveColor }}
                  />

                  {/* Contenido que pasa de borroso/empañado a totalmente nítido */}
                  <div
                    style={{ transitionDelay: `${cellDelay}ms` }}
                    className={`relative z-10 flex items-center gap-2.5 sm:gap-3 transition-all duration-700 ease-out transform ${
                      isClear
                        ? 'opacity-100 scale-100 blur-none translate-y-0'
                        : 'opacity-0 scale-90 blur-[8px] translate-y-2'
                    }`}
                  >
                    <span 
                      style={{ color: isHovered ? effectiveColor : undefined }}
                      className={`transition-all duration-300 transform group-hover:scale-115 shrink-0 ${
                        isHovered ? '' : 'text-zinc-400 dark:text-zinc-500'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-semibold text-xs sm:text-[15px] tracking-wide text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-300 truncate">
                      {item.name}
                    </span>
                  </div>
                  
                  {/* Cruz en la intersección (Crosshair) */}
                  {showCross && (
                    <svg className="absolute -right-[9px] -bottom-[9px] w-[18px] h-[18px] text-zinc-300 dark:text-zinc-700 z-10 hidden md:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      
      </div>
    </section>
  );
};
