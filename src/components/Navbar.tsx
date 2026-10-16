import { useState } from 'react';
import { User, Briefcase, LayoutGrid, GraduationCap, Mail, Code, Code2, Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  // Empezamos en oscuro por defecto
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const dockItems = [
    { name: 'Sobre mí', href: '#sobre-mi', icon: <User size={22} /> },
    { name: 'Experiencia', href: '#experiencia', icon: <Briefcase size={22} /> },
    { name: 'Proyectos', href: '#proyectos', icon: <LayoutGrid size={22} /> },
    { name: 'Stack', href: '#stack', icon: <Code size={22} /> },
    { name: 'Estudios', href: '#estudios', icon: <GraduationCap size={22} /> },
    { name: 'Contacto', href: '#contacto', icon: <Mail size={22} /> },
  ];

  const socialItems = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/Chriiis85', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ) 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/christian-moreno-díaz-109024292/', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ) 
    },
    { name: 'Más', href: '#', icon: <Code2 size={20} /> },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-5xl h-16 bg-white/80 dark:bg-[#393e46]/80 backdrop-blur-md border border-slate-200 dark:border-[#393e46] shadow-2xl rounded-2xl flex items-center justify-between px-6 z-50 transition-colors duration-300">

      {/* IZQUIERDA: Logo y Tema */}
      <div className="flex-1 flex items-center gap-4">
        <a href="#inicio" className="text-xl font-bold text-[#222831] dark:text-[#eeeeee] tracking-wide hover:scale-105 transition-transform">
          Christian<span className="text-[#0092ca]">.dev</span>
        </a>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[#393e46] dark:text-[#eeeeee] hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-[#222831] transition-all hover:scale-110"
          title="Cambiar modo claro/oscuro"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* CENTRO: Dock */}
      <div className="flex-none flex items-center gap-2">
        {dockItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative group p-3 rounded-xl bg-slate-100/50 dark:bg-[#222831] text-[#393e46] dark:text-[#eeeeee] hover:text-[#222831] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#222831] transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:shadow-lg"
          >
            {item.icon}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white dark:bg-[#222831] dark:text-[#eeeeee] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.name}
            </span>
          </a>
        ))}
      </div>

      {/* DERECHA: Redes */}
      <div className="flex-1 flex items-center gap-2 justify-end">
        {socialItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-[#393e46] dark:text-[#eeeeee] hover:text-[#0092ca] dark:hover:text-[#0092ca] hover:bg-slate-100 dark:hover:bg-[#222831] transition-all hover:scale-110"
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
      </div>

    </nav>
  );
};



