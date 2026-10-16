import React, { useState } from 'react';
import { FaReact, FaAngular, FaHtml5, FaCss3Alt, FaJava, FaPhp, FaFigma, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiTailwindcss, SiBootstrap, SiDotnet, SiMysql, SiPostgresql, SiFirebase, SiJson, SiPostman } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

// Iconos genéricos minimalistas de fallback
const ServerIcon = ({ className }: { className?: string }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>;
const DesignIcon = ({ className }: { className?: string }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;

export const TechStack = () => {
  const [activeTab, setActiveTab] = useState('Frontend');

  const iconClass = "w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300";

  const categories = {
    'Frontend': [
      { name: "React", icon: <FaReact className={iconClass} /> },
      { name: "Angular", icon: <FaAngular className={iconClass} /> },
      { name: "TypeScript", icon: <SiTypescript className={iconClass} /> },
      { name: "JavaScript", icon: <SiJavascript className={iconClass} /> },
      { name: "Tailwind", icon: <SiTailwindcss className={iconClass} /> },
      { name: "Bootstrap", icon: <SiBootstrap className={iconClass} /> },
      { name: "HTML5", icon: <FaHtml5 className={iconClass} /> },
      { name: "CSS3", icon: <FaCss3Alt className={iconClass} /> },
    ],
    'Backend': [
      { name: "Java", icon: <FaJava className={iconClass} /> },
      { name: "PHP", icon: <FaPhp className={iconClass} /> },
      { name: "ASP.NET", icon: <SiDotnet className={iconClass} /> },
      { name: "MySQL", icon: <SiMysql className={iconClass} /> },
      { name: "PostgreSQL", icon: <SiPostgresql className={iconClass} /> },
      { name: "Firebase", icon: <SiFirebase className={iconClass} /> },
      { name: "REST APIs", icon: <ServerIcon className={iconClass} /> },
      { name: "JSON", icon: <SiJson className={iconClass} /> },
    ],
    'Design': [
      { name: "Figma", icon: <FaFigma className={iconClass} /> },
      { name: "UI Design", icon: <DesignIcon className={iconClass} /> },
      { name: "UX Design", icon: <DesignIcon className={iconClass} /> },
      { name: "Prototyping", icon: <DesignIcon className={iconClass} /> },
    ],
    'Apps': [
      { name: "Git", icon: <FaGitAlt className={iconClass} /> },
      { name: "GitHub", icon: <FaGithub className={iconClass} /> },
      { name: "Postman", icon: <SiPostman className={iconClass} /> },
      { name: "VS Code", icon: <VscVscode className={iconClass} /> },
    ]
  };

  const currentItems = categories[activeTab as keyof typeof categories];

  return (
    <section id="stack" className="pt-0 pb-24 mt-12 scroll-mt-24 flex flex-col items-center relative">
      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        
        {/* Título igual que en Mis Proyectos */}
        <h2 className="text-4xl font-bold text-[#222831] dark:text-[#eeeeee] mb-8 text-center">
          Mi Stack
        </h2>

      {/* Selector de Secciones Estilo Elegante (Restaurado a la petición del usuario) */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 bg-slate-100 dark:bg-[#0a0a0a] p-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm relative z-20">
        {Object.keys(categories).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-white dark:bg-[#1c1c1c] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-white/10' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-transparent bg-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Estilo Logo Cloud Puro */}
      <div className="w-full relative border-l border-t border-slate-200 dark:border-white/5 bg-transparent">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {currentItems.map((item, i) => {
            // Lógica de intersecciones para las cruces (Crosshairs)
            const isLastCol = (i + 1) % 4 === 0;
            const isLastRow = Math.floor(i / 4) === Math.floor((currentItems.length - 1) / 4);
            const showCross = !isLastCol && !isLastRow;

            return (
              <div 
                key={item.name} 
                className="relative h-24 flex items-center justify-center border-r border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group cursor-default"
              >
                {/* Contenido Minimalista (Icono Monocromático + Texto) */}
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-semibold text-[15px] tracking-wide text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
                
                {/* Cruz en la intersección (Crosshair) idéntica a la imagen */}
                {showCross && (
                  <svg className="absolute -right-[9px] -bottom-[9px] w-[18px] h-[18px] text-slate-300 dark:text-slate-500/70 z-10 hidden md:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

