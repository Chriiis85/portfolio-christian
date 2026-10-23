import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Code2, GraduationCap, Mail, Phone } from 'lucide-react';

interface CodeToken {
  text: string;
  className: string;
  href?: string;
  external?: boolean;
}

const CODE_TOKENS: CodeToken[] = [
  { text: '# Who I am?\n', className: 'text-slate-400 dark:text-slate-500 italic' },
  { text: 'def ', className: 'text-blue-600 dark:text-[#3b82f6] font-semibold' },
  { text: 'about_me\n', className: 'text-emerald-600 dark:text-emerald-400 font-semibold' },
  { text: '  {\n', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: '    name', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: ': ', className: 'text-[#0092ca] font-semibold' },
  { text: '"Christian Moreno Díaz"', className: 'text-amber-600 dark:text-amber-300' },
  { text: ',\n', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: '    role', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: ': ', className: 'text-[#0092ca] font-semibold' },
  { text: '"Fullstack Developer"', className: 'text-amber-600 dark:text-amber-300' },
  { text: ',\n', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: '    phone', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: ': ', className: 'text-[#0092ca] font-semibold' },
  {
    text: '"+34 619 27 66 45"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'tel:+34619276645',
  },
  { text: ',\n', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: '    email', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: ': ', className: 'text-[#0092ca] font-semibold' },
  {
    text: '"christianmorenodiaz85@gmail.com"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'mailto:christianmorenodiaz85@gmail.com',
  },
  { text: ',\n', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: '    linkedin', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: ': ', className: 'text-[#0092ca] font-semibold' },
  {
    text: '"https://www.linkedin.com/in/christian-moreno-díaz-109024292/"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/',
    external: true,
  },
  { text: ',\n', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: '    github', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: ': ', className: 'text-[#0092ca] font-semibold' },
  {
    text: '"https://github.com/Chriiis85"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'https://github.com/Chriiis85',
    external: true,
  },
  { text: '\n  }\n', className: 'text-slate-800 dark:text-[#eeeeee]' },
  { text: 'end', className: 'text-blue-600 dark:text-[#3b82f6] font-semibold' },
];

const FULL_CODE_TEXT = CODE_TOKENS.map((t) => t.text).join('');
const TOTAL_CHARS = FULL_CODE_TEXT.length;

export const AboutSection: React.FC = () => {
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isCompiled, setIsCompiled] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const lastScrolledLineRef = useRef<number>(0);

  const isTypingComplete = typedChars >= TOTAL_CHARS;
  const currentLineCount = FULL_CODE_TEXT.slice(0, typedChars).split('\n').length;

  // Detectar cuando el usuario hace scroll hasta la sección "Sobre mí"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStartedTyping) {
          setHasStartedTyping(true);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, [hasStartedTyping]);

  // Efecto máquina de escribir mientras emerge la ventana
  useEffect(() => {
    if (!hasStartedTyping || isCompiled) return;

    if (typedChars < TOTAL_CHARS) {
      const timeout = setTimeout(() => {
        setTypedChars((prev) => Math.min(prev + 2, TOTAL_CHARS));
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [hasStartedTyping, typedChars, isCompiled]);

  // Si pasan 5 segundos tras terminar el tipeo sin pulsar Compilar, el botón empieza a botar
  useEffect(() => {
    if (!isTypingComplete || isCompiled || isCompiling) {
      setShouldBounce(false);
      return;
    }

    const bounceTimer = setTimeout(() => {
      setShouldBounce(true);
    }, 5000);

    return () => clearTimeout(bounceTimer);
  }, [isTypingComplete, isCompiled, isCompiling]);

  // Auto-scroll inteligente a medida que se van tipeando líneas sin cortar nunca la parte superior con el header
  useEffect(() => {
    if (!hasStartedTyping || isCompiled || !aboutRef.current) return;

    const shouldCheckScroll =
      currentLineCount !== lastScrolledLineRef.current || isTypingComplete;

    if (shouldCheckScroll) {
      lastScrolledLineRef.current = currentLineCount;

      requestAnimationFrame(() => {
        if (!aboutRef.current) return;
        const rect = aboutRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const headerOffset = 88; // Altura del header fijo + margen de respiro
        const bottomMargin = 60;

        // Al empezar a escribir, colocamos el título/inicio de la sección justo debajo del header
        if (currentLineCount <= 2 && (rect.top > viewportHeight * 0.45 || rect.top < headerOffset)) {
          const targetTop = rect.top + window.scrollY - headerOffset;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
          });
          return;
        }

        // A medida que crece la ventana, solo bajamos si no empuja el título por encima del header fijo
        if (rect.bottom > viewportHeight - bottomMargin && rect.top > headerOffset + 20) {
          const maxAllowedDelta = Math.max(0, rect.top - headerOffset);
          const neededDelta = rect.bottom - (viewportHeight - bottomMargin);
          const delta = Math.min(neededDelta, maxAllowedDelta);
          if (delta > 4) {
            window.scrollBy({
              top: delta,
              behavior: 'smooth',
            });
          }
        }
      });
    }
  }, [currentLineCount, isTypingComplete, hasStartedTyping, isCompiled]);

  const handleCompile = () => {
    if (!isTypingComplete || isCompiling) return;
    setShouldBounce(false);
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setIsCompiled(true);
      setTimeout(() => {
        if (!aboutRef.current) return;
        const headerOffset = 88;
        const targetTop = aboutRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }, 60);
    }, 450);
  };

  // Renderizado parcial de tokens según typedChars (con enlaces clicables válidos)
  const renderTypedTokens = () => {
    let remaining = typedChars;
    return CODE_TOKENS.map((token, index) => {
      if (remaining <= 0) return null;
      const visibleText = token.text.slice(0, remaining);
      remaining -= token.text.length;

      if (token.href) {
        return (
          <a
            key={index}
            href={token.href}
            target={token.external ? '_blank' : undefined}
            rel={token.external ? 'noopener noreferrer' : undefined}
            className={`${token.className} break-all sm:break-words underline decoration-amber-500/40 hover:decoration-[#0092ca] hover:text-[#0092ca] dark:hover:text-[#0092ca] transition-colors cursor-pointer`}
            title={`Abrir ${token.href.replace(/^(mailto:|tel:)/, '')}`}
          >
            {visibleText}
          </a>
        );
      }

      return (
        <span key={index} className={token.className}>
          {visibleText}
        </span>
      );
    });
  };

  return (
    <section id="sobre-mi" className="w-full pt-0 pb-16 sm:pb-24 mt-12 sm:mt-20 px-4 flex flex-col items-center scroll-mt-24">
      
      {/* 1. SOBRE MÍ INTERACTIVO (Ventana macOS igual que Proyectos -> Compilar -> Sobre Mí Real) */}
      <div ref={aboutRef} className="w-full max-w-4xl mx-auto flex flex-col items-center scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#222831] dark:text-[#eeeeee] mb-6 sm:mb-8 text-center">
          Sobre <span className="text-[#0092ca]">Mí</span>
        </h2>
        {!isCompiled ? (
          <div
            className={`w-full max-w-4xl mx-auto transition-all duration-700 ease-out transform ${
              hasStartedTyping
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            {/* Ventana con el mismo estilo exacto de ProjectCard en light y dark mode */}
            <div className="relative w-full flex flex-col border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden bg-white dark:bg-[#16171d] shadow-xl dark:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 ease-in-out">
              
              {/* CABECERA SAFARI / MAC (adaptable desde 320px hasta 4K) */}
              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-100 dark:bg-[#1e1f26] border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
                {/* 3 Botoncitos Mac */}
                <div className="flex gap-1.5 sm:gap-2 w-auto sm:w-24 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm hover:brightness-110 transition-all" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm hover:brightness-110 transition-all" />
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm hover:brightness-110 transition-all" />
                </div>

                {/* Barra central estilo archivo/URL */}
                <div className="flex-1 flex justify-center min-w-0">
                  <div className="bg-slate-200 dark:bg-[#16171d] text-slate-600 dark:text-slate-400 text-xs font-mono px-2.5 sm:px-6 py-1 sm:py-1.5 rounded-md border border-slate-300/50 dark:border-slate-700/50 flex items-center gap-1.5 sm:gap-2 max-w-[260px] sm:max-w-[300px] w-full justify-center transition-colors truncate">
                    <Code2 className="w-3.5 h-3.5 text-[#0092ca] flex-shrink-0" />
                    <span className="truncate">about_me.rb</span>
                  </div>
                </div>

                {/* Botón Compilar arriba a la derecha (en blanco estilo macOS, deshabilitado hasta terminar de tipear y con bote a los 5s) */}
                <div className="w-auto sm:w-24 flex justify-end shrink-0">
                  <button
                    onClick={handleCompile}
                    disabled={!isTypingComplete || isCompiling}
                    className={`px-2.5 sm:px-3.5 py-1 rounded-[7px] font-sans text-xs font-medium tracking-[-0.01em] select-none transition-all duration-200 bg-gradient-to-b from-white to-slate-100 dark:from-[#252832] dark:to-[#1b1c23] text-slate-700 dark:text-slate-200 border border-slate-300/90 dark:border-slate-700/80 shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-none ${
                      !isTypingComplete
                        ? 'opacity-45 cursor-not-allowed'
                        : 'opacity-100 cursor-pointer hover:brightness-95 dark:hover:brightness-110 active:scale-[0.97]'
                    } ${shouldBounce && !isCompiling ? 'animate-bounce' : ''}`}
                  >
                    {isCompiling ? 'Compilando…' : 'Compilar'}
                  </button>
                </div>
              </div>

              {/* CUERPO DEL EDITOR: se va desplegando orgánicamente a medida que se tipea */}
              <div className="p-3.5 sm:p-6 md:p-10 font-mono text-[13px] sm:text-base md:text-lg leading-relaxed overflow-x-auto transition-all duration-300">
                <pre className="whitespace-pre-wrap break-words m-0">
                  <code>
                    {renderTypedTokens()}
                    {!isTypingComplete && (
                      <span className="inline-block w-2.5 h-5 align-middle bg-[#0092ca] ml-0.5 animate-pulse" />
                    )}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ) : (
          /* SOBRE MÍ REAL (Tarjeta de perfil estilo referencia con el mismo ancho max-w-4xl que Mis Proyectos) */
          <div className="w-full max-w-4xl mx-auto pt-16 sm:pt-20 mt-2 transition-all duration-500 animate-fadeIn">
            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#16171d] w-full shadow-xl dark:shadow-2xl rounded-xl border border-slate-200 dark:border-slate-700/60 px-4 sm:px-12 pb-8 sm:pb-12 pt-6">
              
              {/* Fila superior: Estadísticas (Izquierda) + Foto sobresaliendo (Centro) + Botón CONNECT a GitHub (Derecha) */}
              <div className="flex flex-col md:flex-row items-center justify-between">
                
                {/* Estadísticas rápidas */}
                <div className="w-full md:w-4/12 flex justify-center md:justify-start gap-6 sm:gap-8 order-2 md:order-1 mt-6 md:mt-0">
                  <div className="text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-[#222831] dark:text-[#eeeeee]">
                      5+
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-400">Proyectos</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-[#222831] dark:text-[#eeeeee]">
                      4
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-400">Empresas</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-[#222831] dark:text-[#eeeeee]">
                      18+
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-400">Skills</span>
                  </div>
                </div>

                {/* Foto circular sobresaliendo por arriba */}
                <div className="w-full md:w-4/12 flex justify-center order-1 md:order-2">
                  <div className="relative -mt-20 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-[#16171d] bg-[#393e46]">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4D03AQER95VpQqGa6g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710956028738?e=1793232000&v=beta&t=r2znvX5bBHZIGz03ckGuWbA6Zp60uVlcOkOCAPnj90w"
                      alt="Christian Moreno Díaz"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Botones CONNECT (LinkedIn) y PROJECTS (GitHub) */}
                <div className="w-full md:w-4/12 flex flex-wrap items-center justify-center md:justify-end gap-3 order-3 mt-6 md:mt-0">
                  <a
                    href="https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0092ca] hover:bg-[#0092ca]/90 active:scale-95 text-white font-bold uppercase text-xs px-5 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all tracking-wider"
                  >
                    Connect
                  </a>
                  <a
                    href="https://github.com/Chriiis85"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#222831] dark:bg-[#393e46] hover:bg-[#393e46] dark:hover:bg-[#0092ca] active:scale-95 text-white font-bold uppercase text-xs px-5 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all tracking-wider"
                  >
                    Projects
                  </a>
                </div>
              </div>

              {/* Información central de Christian */}
              <div className="text-center mt-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-normal text-[#222831] dark:text-[#eeeeee] mb-2">
                  Christian Moreno Díaz
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-6">
                  <a
                    href="mailto:christianmorenodiaz85@gmail.com"
                    className="inline-flex items-center gap-1.5 hover:text-[#0092ca] transition-colors break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0092ca] shrink-0" />
                    <span>christianmorenodiaz85@gmail.com</span>
                  </a>
                  <span className="hidden sm:inline">•</span>
                  <a
                    href="tel:+34619276645"
                    className="inline-flex items-center gap-1.5 hover:text-[#0092ca] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0092ca] shrink-0" />
                    <span>619 27 66 45</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#393e46] dark:text-slate-300 text-sm md:text-base font-medium mb-2">
                  <Briefcase className="w-4 h-4 text-[#0092ca] shrink-0" />
                  <span>Desarrollador de Aplicaciones Web - Desarrollador Full Stack</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#393e46] dark:text-slate-300 text-sm md:text-base font-medium">
                  <GraduationCap className="w-4 h-4 text-[#0092ca] shrink-0" />
                  <span>Técnico Superior en Desarrollo de Aplicaciones Web (DAW) y Multiplataforma (DAM)</span>
                </div>
              </div>

              {/* Línea divisoria + Texto completo Sobre Mí */}
              <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-700/60 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-10/12 px-2 sm:px-4 space-y-5">
                    <p className="text-base md:text-lg text-[#393e46] dark:text-[#eeeeee]/90 leading-relaxed">
                      Soy un <strong className="text-[#222831] dark:text-[#eeeeee] font-semibold">Desarrollador Web Full Stack</strong> con visión global del producto. Me especializo en construir soluciones tecnológicas completas de principio a fin, cuidando al milímetro tanto el diseño como la arquitectura interna.
                    </p>
                    <p className="text-base md:text-lg text-[#393e46] dark:text-[#eeeeee]/90 leading-relaxed">
                      Domino todo el ciclo de vida del software. Aporto solidez técnica creando interfaces de usuario atractivas y accesibles (<strong className="text-[#222831] dark:text-[#eeeeee] font-medium">Frontend</strong>), respaldadas por una lógica de servidor robusta y gestión eficiente de bases de datos (<strong className="text-[#222831] dark:text-[#eeeeee] font-medium">Backend</strong>).
                    </p>
                    <p className="text-base md:text-lg text-[#393e46] dark:text-[#eeeeee]/90 leading-relaxed">
                      Mi filosofía es clara: código limpio, rendimiento optimizado y un compromiso absoluto con la experiencia del usuario. Soy un perfil orientado a resultados, resolutivo y listo para aportar valor a tu equipo desde el primer día.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const ExperienceSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      company: "ANALISIS SURVEY UNIT SL",
      role: "Desarrollador",
      date: "OCT 2024 - ACTUAL",
      location: "Madrid",
      current: true,
      description: [
        "Desarrollo y mantenimiento de encuestas web interactivas como plataformas dinámicas y accesibles.",
        "Gestión y tratamiento eficiente de datos mediante sistemas de bases de datos.",
        "Participación en todo el ciclo de desarrollo, desde el análisis y diseño hasta la optimización."
      ]
    },
    {
      company: "IbernetCloud, Rentdays",
      role: "Desarrollador Web (Prácticas)",
      date: "MAR 2024 - JUN 2024",
      location: "Madrid",
      current: false,
      description: [
        "Diseño, maquetación y creación de un portal web inmobiliario (estilo Airbnb/Booking).",
        "Gestión de reservas, control de usuarios y registro de inmuebles con diseño responsive.",
      ]
    },
    {
      company: "Teditel, Tecnoaccesos",
      role: "Desarrollador Web (Prácticas)",
      date: "MAR 2023 - JUN 2023",
      location: "Vallecas, Madrid",
      current: false,
      description: [
        "Desarrollo de sitio web responsive y accesible para generar visitas de empresas.",
        "Creación de plataforma para gestión de visitas, registro de códigos QR y control de accesos."
      ]
    },
    {
      company: "Motiva Consulting, S.L.",
      role: "Técnico Informático de Sistemas (Prácticas)",
      date: "MAR 2021 - JUN 2021",
      location: "San Blas, Madrid",
      current: false,
      description: [
        "Instalación, mantenimiento y reparación de equipos y sistemas operativos.",
        "Soporte técnico a usuarios resolviendo incidencias."
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="w-full pt-0 pb-16 sm:pb-24 mt-8 sm:mt-12 px-4 flex flex-col items-center scroll-mt-24 overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div
          className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-[#0092ca] shrink-0" />
          <h3 className="text-2xl sm:text-3xl font-bold text-[#222831] dark:text-[#eeeeee]">Experiencia Profesional</h3>
        </div>

        <div className="relative ml-2 sm:ml-4 md:ml-6 space-y-10 sm:space-y-12 pb-4">
          {/* Línea vertical animada tipo persiana (baja de arriba a abajo) */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10 origin-top transition-transform duration-1000 ease-out ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
          />

          {experiences.map((exp, idx) => {
            const itemDelay = idx * 160;
            return (
              <div
                key={idx}
                style={{ transitionDelay: `${itemDelay}ms` }}
                className={`relative pl-6 sm:pl-8 md:pl-12 transition-all duration-700 ease-out transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                {/* Punto en la línea */}
                <div
                  style={{ transitionDelay: `${itemDelay + 80}ms` }}
                  className={`absolute -left-[7px] top-1.5 w-4 h-4 rounded-full border-4 transition-transform duration-500 ease-out ${
                    isVisible ? 'scale-100' : 'scale-0'
                  } ${
                    exp.current
                      ? 'bg-[#0092ca] border-[#0092ca]/30 dark:border-[#0092ca]/30 animate-pulse'
                      : 'bg-slate-300 dark:bg-[#393e46] border-white dark:border-[#222831]'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1.5 sm:gap-2">
                  <h4 className="text-lg sm:text-xl font-bold text-[#222831] dark:text-[#eeeeee]">{exp.role}</h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 text-[#393e46] dark:text-[#eeeeee] text-xs font-semibold rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.date}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-medium text-[#0092ca]">
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      style={{ transitionDelay: `${itemDelay + 140 + i * 70}ms` }}
                      className={`flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-[#393e46] dark:text-slate-400 leading-relaxed transition-all duration-500 ease-out transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0092ca] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

