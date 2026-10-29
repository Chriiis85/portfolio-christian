import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, MapPin, CheckCircle2, Code2, GraduationCap, Mail, Phone, FileText } from 'lucide-react';
import { CvPreviewModal } from './CvPreviewModal';

interface CodeToken {
  text: string;
  className: string;
  href?: string;
  external?: boolean;
}

const CODE_TOKENS: CodeToken[] = [
  { text: '# Who I am?\n', className: 'text-zinc-400 dark:text-zinc-500 italic' },
  { text: 'def ', className: 'text-sky-600 dark:text-sky-400 font-semibold' },
  { text: 'about_me\n', className: 'text-emerald-600 dark:text-emerald-400 font-semibold' },
  { text: '  {\n', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: '    name', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: ': ', className: 'text-sky-500 dark:text-sky-400 font-semibold' },
  { text: '"Christian Moreno Díaz"', className: 'text-amber-600 dark:text-amber-300' },
  { text: ',\n', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: '    role', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: ': ', className: 'text-sky-500 dark:text-sky-400 font-semibold' },
  { text: '"Fullstack Developer"', className: 'text-amber-600 dark:text-amber-300' },
  { text: ',\n', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: '    phone', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: ': ', className: 'text-sky-500 dark:text-sky-400 font-semibold' },
  {
    text: '"+34 619 27 66 45"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'tel:+34619276645',
  },
  { text: ',\n', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: '    email', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: ': ', className: 'text-sky-500 dark:text-sky-400 font-semibold' },
  {
    text: '"christianmorenodiaz85@gmail.com"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'mailto:christianmorenodiaz85@gmail.com',
  },
  { text: ',\n', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: '    linkedin', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: ': ', className: 'text-sky-500 dark:text-sky-400 font-semibold' },
  {
    text: '"https://www.linkedin.com/in/christian-moreno-díaz-109024292/"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/',
    external: true,
  },
  { text: ',\n', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: '    github', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: ': ', className: 'text-sky-500 dark:text-sky-400 font-semibold' },
  {
    text: '"https://github.com/Chriiis85"',
    className: 'text-amber-600 dark:text-amber-300',
    href: 'https://github.com/Chriiis85',
    external: true,
  },
  { text: '\n  }\n', className: 'text-zinc-800 dark:text-zinc-200' },
  { text: 'end', className: 'text-sky-600 dark:text-sky-400 font-semibold' },
];

const FULL_CODE_TEXT = CODE_TOKENS.map((t) => t.text).join('');
const TOTAL_CHARS = FULL_CODE_TEXT.length;

type CompileStage = 'idle' | 'collapsing' | 'circle' | 'unfolding' | 'done';

export const AboutSection: React.FC = () => {
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [compileStage, setCompileStage] = useState<CompileStage>('idle');
  const [shouldBounce, setShouldBounce] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const lastScrolledLineRef = useRef<number>(0);
  const userCancelledAutoScrollRef = useRef<boolean>(false);
  const lastUserScrollInputRef = useRef<number>(0);
  const typingStartTimestampRef = useRef<number>(0);

  const isTypingComplete = typedChars >= TOTAL_CHARS;
  const isCompiling = compileStage === 'collapsing' || compileStage === 'circle' || compileStage === 'unfolding';
  const isCompiled = compileStage === 'circle' || compileStage === 'unfolding' || compileStage === 'done';
  const currentLineCount = FULL_CODE_TEXT.slice(0, typedChars).split('\n').length;

  // Detectar cualquier gesto de scroll manual del usuario para no bloquear ni pelear con su deslizamiento
  useEffect(() => {
    const handleUserScrollInput = () => {
      const now = Date.now();
      lastUserScrollInputRef.current = now;

      // Si ya empezó a escribirse hace más de 350ms y el usuario hace scroll manual, cedemos el control total
      if (hasStartedTyping && !isCompiled && now - typingStartTimestampRef.current > 350) {
        userCancelledAutoScrollRef.current = true;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
        handleUserScrollInput();
      }
    };

    window.addEventListener('wheel', handleUserScrollInput, { passive: true });
    window.addEventListener('touchmove', handleUserScrollInput, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserScrollInput);
      window.removeEventListener('touchmove', handleUserScrollInput);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasStartedTyping, isCompiled]);

  // Precargar la foto local para que al pulsar "Compilar" aparezca al instante sin parpadeos
  useEffect(() => {
    const preloadImg = new Image();
    preloadImg.src = '/christian-photo.jpg';
  }, []);

  // Detectar cuando el usuario hace scroll hasta la sección "Sobre mí"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStartedTyping) {
          typingStartTimestampRef.current = Date.now();
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
      return;
    }

    const bounceTimer = setTimeout(() => {
      setShouldBounce(true);
    }, 5000);

    return () => clearTimeout(bounceTimer);
  }, [isTypingComplete, isCompiled, isCompiling]);

  // Auto-scroll inteligente que acompaña el crecimiento de la ventana SOLO si el usuario no está haciendo scroll manual
  useEffect(() => {
    if (!hasStartedTyping || isCompiled || !aboutRef.current || userCancelledAutoScrollRef.current) return;

    const shouldCheckScroll =
      currentLineCount !== lastScrolledLineRef.current || isTypingComplete;

    if (shouldCheckScroll) {
      lastScrolledLineRef.current = currentLineCount;

      requestAnimationFrame(() => {
        if (!aboutRef.current || userCancelledAutoScrollRef.current) return;

        // Si el usuario acaba de usar la rueda o el dedo hace menos de 350ms, respetamos su inercia
        if (Date.now() - lastUserScrollInputRef.current < 350) return;

        const rect = aboutRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const headerOffset = 88; // Altura del header fijo + margen de respiro
        const bottomMargin = 60;

        // Si el usuario ya ha bajado más allá de la cabecera de Sobre Mí, no lo frenamos
        if (rect.top < headerOffset) {
          userCancelledAutoScrollRef.current = true;
          return;
        }

        // A medida que crece la ventana, solo acompañamos hacia abajo si se sale por debajo de la pantalla
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
    if (!isTypingComplete || compileStage !== 'idle') return;
    setShouldBounce(false);

    // PASO 1: El código se contrae hacia el punto central superior donde nacerá el avatar (400ms)
    setCompileStage('collapsing');

    // PASO 2: Emerge y se abre el círculo con la foto de su cara en ese punto exacto
    setTimeout(() => {
      setCompileStage('circle');

      // PASO 3: Desde el círculo, se despliega el resto de la tarjeta suavemente
      setTimeout(() => {
        setCompileStage('unfolding');

        // PASO 4: Finalizado completamente
        setTimeout(() => {
          setCompileStage('done');
          if (aboutRef.current) {
            const headerOffset = 88;
            const targetTop = aboutRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
          }
        }, 650);
      }, 550);
    }, 400);
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
            className={`${token.className} break-all sm:break-words underline decoration-amber-500/40 hover:decoration-sky-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer`}
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
    <section id="sobre-mi" className="w-full pt-0 pb-10 sm:pb-16 lg:pb-24 mt-6 sm:mt-12 lg:mt-20 px-4 flex flex-col items-center scroll-mt-24 overflow-x-hidden">
      
      {/* 1. SOBRE MÍ INTERACTIVO (Ventana macOS igual que Proyectos -> Compilar -> Sobre Mí Real) */}
      <div ref={aboutRef} className="w-full max-w-4xl mx-auto flex flex-col items-center scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 sm:mb-8 text-center">
          Sobre Mí
        </h2>
        {!isCompiled ? (
          <div
            style={{ transformOrigin: '50% 72px' }}
            className={`w-full max-w-4xl mx-auto transition-all duration-400 ease-in-out transform ${
              compileStage === 'collapsing'
                ? 'scale-0 opacity-0 rounded-[999px] blur-xs pointer-events-none'
                : hasStartedTyping
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            {/* Ventana con el mismo estilo exacto de ProjectCard en light y dark mode */}
            <div
              className={`relative w-full flex flex-col border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden bg-white dark:bg-[#111113] shadow-[0_12px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-zinc-300 dark:hover:border-zinc-700/90 transition-all duration-400 ease-in-out ${
                compileStage === 'collapsing' ? 'rounded-[999px]' : 'rounded-xl'
              }`}
            >
              
              {/* CABECERA SAFARI / MAC (adaptable desde 320px hasta 4K) */}
              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-100/90 dark:bg-[#161618] border-b border-zinc-200/90 dark:border-zinc-800/80 transition-colors duration-300">
                {/* 3 Botoncitos Mac */}
                <div className="flex gap-1.5 sm:gap-2 w-auto sm:w-24 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-2xs hover:brightness-110 transition-all" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-2xs hover:brightness-110 transition-all" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-2xs hover:brightness-110 transition-all" />
                </div>

                {/* Barra central estilo archivo/URL */}
                <div className="flex-1 flex justify-center min-w-0">
                  <div className="bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs font-mono px-2.5 sm:px-6 py-1 sm:py-1.5 rounded-md border border-zinc-200/90 dark:border-zinc-800/90 flex items-center gap-1.5 sm:gap-2 max-w-[260px] sm:max-w-[300px] w-full justify-center transition-colors truncate">
                    <Code2 className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 flex-shrink-0" />
                    <span className="truncate">about_me.rb</span>
                  </div>
                </div>

                {/* Botón Compilar arriba a la derecha (en blanco estilo macOS, deshabilitado hasta terminar de tipear y con bote a los 5s) */}
                <div className="w-auto sm:w-24 flex justify-end shrink-0">
                  <button
                    onClick={handleCompile}
                    disabled={!isTypingComplete || isCompiling}
                    className={`px-2.5 sm:px-3.5 py-1 rounded-[7px] font-sans text-xs font-semibold tracking-[-0.01em] select-none transition-all duration-200 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border border-zinc-900 dark:border-zinc-200 shadow-xs ${
                      !isTypingComplete
                        ? 'opacity-35 cursor-not-allowed'
                        : 'opacity-100 cursor-pointer hover:bg-zinc-800 dark:hover:bg-white active:scale-[0.97]'
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
                      <span className="inline-block w-2.5 h-5 align-middle bg-sky-500 dark:bg-sky-400 ml-0.5 animate-pulse" />
                    )}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ) : (
          /* SOBRE MÍ REAL (Despliegue cinematográfico desde el círculo con la foto de su cara) */
          <div className="w-full max-w-4xl mx-auto pt-4 relative">
            {/* AVATAR CIRCULAR: Centro exacto de la metamorfosis, se abre y emite brillo Ice */}
            <div className="flex justify-center -mb-16 sm:-mb-20 relative z-30 pointer-events-auto">
              <div
                className={`relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-[#111113] bg-zinc-800 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
                  compileStage === 'circle'
                    ? 'animate-circle-bloom ring-4 ring-sky-400'
                    : 'scale-100 ring-2 ring-sky-500/30 dark:ring-sky-400/30 shadow-2xl'
                }`}
              >
                <img
                  src="/christian-photo.jpg"
                  alt="Christian Moreno Díaz"
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>

            {/* CUERPO DE LA TARJETA: Se despliega desde el círculo */}
            <div
              className={`relative flex flex-col min-w-0 break-words bg-white dark:bg-[#111113] w-full rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 px-4 sm:px-12 pb-8 sm:pb-12 pt-20 sm:pt-24 transition-all duration-700 ease-out origin-top ${
                compileStage === 'circle'
                  ? 'opacity-0 scale-y-0 pointer-events-none h-0 overflow-hidden'
                  : compileStage === 'unfolding'
                  ? 'animate-card-unfold shadow-[0_12px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)]'
                  : 'opacity-100 scale-y-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)]'
              }`}
            >
              {/* Fila superior: Estadísticas (Izquierda) + Espaciador central + Botones (Derecha) */}
              <div className="flex flex-col md:flex-row items-center justify-between">
                
                {/* Estadísticas rápidas: se despliegan desde el círculo hacia la izquierda */}
                <div
                  className={`w-full md:w-5/12 flex justify-center md:justify-start gap-6 sm:gap-8 order-2 md:order-1 mt-6 md:mt-0 transition-all duration-600 delay-150 transform ${
                    compileStage === 'circle' ? '-translate-x-12 opacity-0' : 'translate-x-0 opacity-100'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                      5+
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Proyectos</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                      4
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Empresas</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                      18+
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Skills</span>
                  </div>
                </div>

                {/* Espaciador central para el avatar en desktop */}
                <div className="hidden md:block w-2/12" />

                {/* Botones VER CV, CONNECT (LinkedIn) y PROJECTS (GitHub) */}
                <div
                  className={`w-full md:w-5/12 flex flex-wrap items-center justify-center md:justify-end gap-2.5 order-3 mt-6 md:mt-0 transition-all duration-600 delay-200 transform ${
                    compileStage === 'circle' ? 'translate-x-12 opacity-0' : 'translate-x-0 opacity-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setIsCvModalOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white active:scale-95 text-white dark:text-zinc-950 font-semibold uppercase text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all tracking-wider cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-sky-400 dark:text-sky-600 shrink-0" />
                    <span>Ver CV</span>
                  </button>
                  <a
                    href="https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 active:scale-95 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold uppercase text-xs px-4 py-2.5 rounded-lg shadow-xs transition-all tracking-wider"
                  >
                    Connect
                  </a>
                  <a
                    href="https://github.com/Chriiis85"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 active:scale-95 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold uppercase text-xs px-4 py-2.5 rounded-lg shadow-xs transition-all tracking-wider"
                  >
                    Projects
                  </a>
                </div>
              </div>

              {/* Información central de Christian: se desliza suavemente hacia abajo */}
              <div
                className={`text-center mt-8 transition-all duration-600 delay-250 transform ${
                  compileStage === 'circle' ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Christian Moreno Díaz
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
                  <a
                    href="mailto:christianmorenodiaz85@gmail.com"
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 shrink-0" />
                    <span>christianmorenodiaz85@gmail.com</span>
                  </a>
                  <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
                  <a
                    href="tel:+34619276645"
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 shrink-0" />
                    <span>619 27 66 45</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-zinc-700 dark:text-zinc-300 text-sm md:text-base font-medium mb-2">
                  <Briefcase className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                  <span>Desarrollador de Aplicaciones Web - Desarrollador Full Stack</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-zinc-700 dark:text-zinc-300 text-sm md:text-base font-medium">
                  <GraduationCap className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                  <span>Técnico Superior en Desarrollo de Aplicaciones Web (DAW) y Multiplataforma (DAM)</span>
                </div>
              </div>

              {/* Línea divisoria + Texto completo Sobre Mí: se despliega suavemente */}
              <div
                className={`mt-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 text-center transition-all duration-600 delay-300 transform ${
                  compileStage === 'circle' ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-10/12 px-2 sm:px-4 space-y-5">
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Soy un <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Desarrollador Web Full Stack</strong> con visión global del ciclo de vida del software y doble titulación técnica superior en <strong className="text-zinc-900 dark:text-zinc-100 font-medium">DAW y DAM</strong>. Me especializo en construir soluciones tecnológicas completas de principio a fin, cuidando al milímetro tanto el diseño visual como la arquitectura interna.
                    </p>
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Aporto solidez técnica tanto en el desarrollo de interfaces de usuario modernas, interactivas y accesibles (<strong className="text-zinc-900 dark:text-zinc-100 font-medium">React, Angular, Next.js, TypeScript, Tailwind, Bootstrap</strong>) como en la implementación de la lógica de servidor, APIs RESTful y gestión de bases de datos (<strong className="text-zinc-900 dark:text-zinc-100 font-medium">Node.js, Express, C# / .NET, PHP, Java, PostgreSQL, SQL Server, MySQL, Supabase</strong>).
                    </p>
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Mi filosofía es clara: código limpio, rendimiento optimizado y un compromiso constante con la calidad técnica y las necesidades del usuario final. Perfil resolutivo y orientado a resultados, listo para aportar valor a tu equipo desde el primer día.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
      <CvPreviewModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
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
      role: "Desarrollador Web Full Stack",
      date: "Octubre 2024 — Actualidad",
      location: "Madrid",
      current: true,
      description: [
        "Desarrollo Full Stack en aplicaciones corporativas de gran escala para clientes multinacionales: implementación y mantenimiento de lógica de negocio, reglas de cálculo y motores de evaluación en C# y ASP.NET MVC.",
        "Diseño e integración de APIs RESTful para la comunicación eficiente entre módulos, sincronización de datos y respuesta en tiempo real.",
        "Desarrollo, optimización y mantenimiento de plataformas web dinámicas y encuestas interactivas de alto tráfico, garantizando un tratamiento fluido y seguro de datos masivos en bases de datos relacionales.",
        "Modernización de herramientas internas y refactorización de código para mejorar el rendimiento y la mantenibilidad de los sistemas en producción."
      ],
      stack: "C#, ASP.NET MVC, ASP clásico, JavaScript, PHP, MySQL / SQL Server, REST APIs, Bootstrap, HTML5, CSS3"
    },
    {
      company: "IbernetCloud, Rentdays",
      role: "Desarrollador Web Full Stack (Prácticas)",
      date: "Marzo 2024 — Junio 2024",
      location: "Madrid",
      current: false,
      description: [
        "Desarrollo integral de plataforma web de reservas y gestión inmobiliaria (modelo marketplace turístico estilo Airbnb): arquitectura modular y maquetación responsive orientada a conversión.",
        "Implementación del motor de reservas en tiempo real, control dinámico de disponibilidad por fechas, cálculo automatizado de tarifas y gestión del ciclo de vida del alquiler.",
        "Desarrollo del panel de administración (Dashboard) y gestión de usuarios, permitiendo a propietarios dar de alta inmuebles, gestionar inventario y monitorear reservas entrantes.",
        "Diseño de interfaces con enfoque mobile-first mediante Bootstrap y JavaScript modular, asegurando máxima accesibilidad, tiempos de carga rápidos y compatibilidad cross-browser."
      ],
      stack: "JavaScript (ES6+), PHP, MySQL, Bootstrap, HTML5, CSS3, REST APIs"
    },
    {
      company: "Teditel, Tecnoaccesos",
      role: "Desarrollador Web / Software (Prácticas)",
      date: "Marzo 2023 — Junio 2023",
      location: "Vallecas, Madrid",
      current: false,
      description: [
        "Desarrollo y mantenimiento de software web para control de accesos y seguridad física en edificios corporativos y recintos empresariales.",
        "Desarrollo con C# y .NET bajo arquitectura MVC, participando en la lógica de servidor para la gestión de credenciales y comunicación con terminales de acceso.",
        "Implementación del sistema de registro de visitas en tiempo real, control de entradas/salidas y módulo de generación de códigos QR dinámicos para validación en lectores y tornos.",
        "Creación de interfaces de usuario adaptadas a múltiples dispositivos y quioscos táctiles de recepción."
      ],
      stack: "C#, .NET (MVC), JavaScript, HTML5, CSS3, MySQL"
    },
    {
      company: "Motiva Consulting",
      role: "Técnico Informático de Sistemas (Prácticas)",
      date: "Marzo 2021 — Junio 2021",
      location: "San Blas, Madrid",
      current: false,
      description: [
        "Instalación y configuración de sistemas operativos y software. Mantenimiento, montaje y reparación de equipos y sistemas informáticos, garantizando la verificación y comprobación de su correcto funcionamiento.",
        "Soporte técnico a usuarios, solucionando incidencias y realizando mantenimiento preventivo para asegurar el óptimo rendimiento de los sistemas."
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="w-full pt-0 pb-10 sm:pb-16 lg:pb-24 mt-4 sm:mt-8 lg:mt-12 px-4 flex flex-col items-center scroll-mt-24 overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div
          className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-3.5 mb-8 sm:mb-12 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500 dark:text-sky-400 shrink-0" />
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Experiencia Profesional</h3>
        </div>

        <div className="relative ml-2 sm:ml-4 md:ml-6 space-y-10 sm:space-y-12 pb-4">
          {/* Línea vertical animada tipo persiana (baja de arriba a abajo) */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 origin-top transition-transform duration-1000 ease-out ${
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
                  className={`absolute -left-[7.5px] top-1.5 w-4 h-4 rounded-full border-4 transition-transform duration-500 ease-out ${
                    isVisible ? 'scale-100' : 'scale-0'
                  } ${
                    exp.current
                      ? 'bg-sky-500 dark:bg-sky-400 border-sky-500/25 dark:border-sky-400/25 animate-pulse'
                      : 'bg-zinc-300 dark:bg-zinc-700 border-[#fafafa] dark:border-[#09090b]'
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5 gap-1">
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{exp.role}</h4>
                  <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
                    {exp.date}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-300">
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-500 text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      style={{ transitionDelay: `${itemDelay + 140 + i * 70}ms` }}
                      className={`flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed transition-all duration-500 ease-out transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {'stack' in exp && exp.stack && (
                  <div className="mt-3.5 pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-wrap items-baseline gap-1.5 text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Stack:</span>
                    <span>{exp.stack}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

