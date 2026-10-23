import './App.css'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { TechStack } from './components/TechStack'
import { HeroBackground } from './components/HeroBackground'
import { AboutSection, ExperienceSection } from './components/AboutSection'
import { EducationSection } from './components/EducationSection'
import { ContactSection } from './components/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-[#eeeeee] dark:bg-[#222831] text-[#222831] dark:text-[#eeeeee] transition-colors duration-300">
      {/* Nuestro nuevo componente de Navegación */}
      <Navbar />

      <main>
        {/* SECCIÓN: Inicio */}
        <section id="inicio" className="relative overflow-hidden min-h-screen flex items-center justify-center pt-16 px-4 bg-[#eeeeee] dark:bg-[#222831] transition-colors duration-300">
          <HeroBackground />
          <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#222831] dark:text-[#eeeeee] mb-3 sm:mb-4 leading-tight">
              ¡Hola, soy Christian!
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-[#0092ca] font-medium mb-4 sm:mb-6">
              Desarrollador de Aplicaciones Web | Desarrollador Full Stack
            </p>
            <p className="text-sm sm:text-lg text-[#393e46] dark:text-[#eeeeee]/80 max-w-2xl mx-auto">
              Bienvenido a mi portfolio. Aquí podrás encontrar mis últimos proyectos, novedades sobre mí y un punto mas focalizado de mi vida como desarrollador.</p>

            {/* Botones de Acción Rápida (CTA) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a href="#proyectos" className="w-full sm:w-auto px-8 py-3 sm:py-3.5 bg-[#222831] text-[#eeeeee] dark:bg-[#0092ca] dark:text-[#eeeeee] font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-slate-900/10 dark:shadow-white/10 text-sm sm:text-base">
                Ver Mis Proyectos
              </a>
              <a href="#experiencia" className="w-full sm:w-auto px-8 py-3 sm:py-3.5 bg-white text-[#222831] border border-[#393e46]/20 dark:bg-[#393e46] dark:text-[#eeeeee] dark:border-[#393e46] font-bold rounded-full hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95 transition-all text-sm sm:text-base">
                Ver Experiencia
              </a>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Sobre Mí */}
        <AboutSection />

        {/* SECCIÓN: Mis Proyectos */}
        <section id="proyectos" className="w-full pt-0 pb-16 sm:pb-24 mt-8 sm:mt-12 px-4 scroll-mt-24 flex flex-col items-center justify-center bg-[#eeeeee] dark:bg-[#222831] transition-colors duration-300">
          <div className="w-full max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#222831] dark:text-[#eeeeee] mb-3 sm:mb-4">Mis Proyectos</h2>
            <p className="text-sm sm:text-base text-[#393e46] dark:text-[#eeeeee]/80 max-w-2xl mx-auto">
              Haz clic en cualquiera de las "ventanas" para expandir y ver más detalles sobre mis proyectos.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-12">
            
            {/* Proyecto 1: Motoring Community */}
            <ProjectCard 
              title="Motoring Community" 
              domain="motoring-community-v1.vercel.app" 
              description="Soy un gran aficionado a la Fórmula 1 y quise llevar la idea de mi TFG al siguiente nivel rehaciéndola desde cero con Next.js, React y TypeScript. Es una web pensada para seguir el Mundial de F1, y estar al día de este mundillo: cuenta atrás en directo para la próxima carrera, noticias del paddock, fichas actualizadas de pilotos y escuderías, clasificación del mundial, histórico de temporadas y foro."
              aboutApp="Como apasionado del automovilismo y la Fórmula 1, creé Motoring Community para reunir en un mismo sitio todo lo que siempre busco cada semana de Gran Premio. Esta versión es la evolución moderna de mi proyecto de fin de grado, reconstruida con un stack actual para lograr una interfaz mucho más rápida, visual y adaptable. En ella puedes consultar la cuenta atrás en tiempo real hasta el próximo GP, leer las últimas noticias del paddock, explorar las tarjetas de pilotos y constructores, revisar las tablas de puntos e históricos año por año y participar en el foro con otros aficionados."
              tags={["TypeScript", "React", "Next.js", "Tailwind CSS"]}
              githubUrl="https://github.com/Chriiis85/motoring-community"
              webUrl="https://motoring-community-v1.vercel.app"
              coverImage="/projects/motoring-community/Cover_MotoringCommunity.png"
              images={[
                "/projects/motoring-community/1_MotoringCommunity.png",
                "/projects/motoring-community/2_MotoringCommunity.png",
                "/projects/motoring-community/3_MotoringCommunity.png",
                "/projects/motoring-community/4_MotoringCommunity.png",
                "/projects/motoring-community/5_MotoringCommunity.png",
                "/projects/motoring-community/6_MotoringCommunity.png",
              ]}
            />

            {/* Proyecto 2: RCManager (Frontend) */}
            <ProjectCard 
              title="RCManager" 
              domain="rcmanager-nine.vercel.app/" 
              description="Nació de mi afición por los parques temáticos y las montañas rusas. Es una plataforma donde puedes llevar tu propio diario de 'credits' (registrar en qué montañas rusas te has montado, cuántas veces y puntuarlas del 1 al 10), explorar fichas técnicas de atracciones de todo el mundo, consultar el ranking global, organizar viajes con amigos y preguntar a su asistente ParksIA."
              aboutApp="En el mundo de los parques temáticos llamamos 'credit' a cada montaña rusa distinta en la que nos subimos, y creé RCManager (Roller Coaster Manager) para poder llevar ese registro al detalle de forma visual y social. La aplicación permite apuntar cada montaña rusa probada, puntuarla del 1 al 10, consultar un catálogo completo con datos técnicos reales (altura, velocidad, longitud y fabricante como B&M o Intamin), descubrir el ranking mundial de parques y coasters, planificar viajes enviando invitaciones a amigos y apoyarte en su asistente integrado ParksIA."
              tags={["JavaScript", "HTML", "CSS", "Frontend"]}
              githubUrl="https://github.com/Chriiis85/RCManager"
              webUrl="https://rcmanager-nine.vercel.app/"
              inProgress
              coverImage="/projects/rcmanager/Cover_RCManager.png"
              images={[
                "/projects/rcmanager/1_RCManager.png",
                "/projects/rcmanager/2_RCManager.png",
                "/projects/rcmanager/3_RCManager.png",
                "/projects/rcmanager/4_RCManager.png",
                "/projects/rcmanager/5_RCManager.png",
                "/projects/rcmanager/6_RCManager.png",
              ]}
            />

            {/* Proyecto Nuevo: RCManagerAPI (Backend) */}
            <ProjectCard 
              title="RCManager API" 
              domain="rc-manager-api.vercel.app/" 
              description="Para darle una base sólida a RCManager construí su propia API RESTful y esta web de documentación interactiva. Conectada en tiempo real a PostgreSQL en Supabase, ofrece endpoints públicos en JSON con datos reales de montañas rusas, parques temáticos, atracciones, espectáculos y restaurantes listos para consultar y probar en vivo."
              aboutApp="Quería que RCManager contara con un backend independiente y bien documentado, así que desarrollé RCManager API junto con su propio portal de referencia interactivo. Está conectada en tiempo real a una base de datos PostgreSQL en Supabase y sirve endpoints abiertos en formato JSON sobre montañas rusas (fabricante, velocidad, altura, longitud o estado operativo), parques temáticos, atracciones, espectáculos, restaurantes y operadores, permitiendo explorar cada modelo de datos y probar las peticiones GET directamente desde el navegador."
              tags={["Node.js", "Express", "API REST", "Backend"]}
              githubUrl="https://github.com/Chriiis85/RCManagerAPI"
              webUrl="https://rc-manager-api.vercel.app/"
              inProgress
              coverImage="/projects/rcmanager-api/Cover_RCApi.png"
              images={[
                "/projects/rcmanager-api/1_RCApi.png",
                "/projects/rcmanager-api/2_RCApi.png",
                "/projects/rcmanager-api/3_RCApi.png",
                "/projects/rcmanager-api/4_RCApi.png",
              ]}
            />
            
            {/* Proyecto 3: Manager */}
            <ProjectCard 
              title="Manager App" 
              domain="manager-coral-seven.vercel.app" 
              description="Cansado de usar cuatro aplicaciones distintas para organizarme, estoy desarrollando Manager Hub: mi propia suite de gestión personal. Desde un único panel central reúne cuatro módulos prácticos para el día a día: gestor de finanzas y ahorro, seguimiento de entrenamientos y pesos del gimnasio, listas de la compra para casa y bloc de notas y utilidades."
              aboutApp="Manager Hub nació de una necesidad personal: quería centralizar todo lo que organizo a diario en una sola aplicación limpia, rápida y pensada para llevar en el móvil. La he estructurado en cuatro áreas conectadas desde un mismo panel central: un módulo de Finanzas para controlar ingresos, gastos diarios y presupuestos mensuales; un Gestor de Gimnasio para anotar rutinas, pesos, repeticiones y marcas personales; un Gestor de Compras y despensa del hogar; y un espacio de Utilidades con notas rápidas, enlaces frecuentes y recordatorios."
              tags={["TypeScript", "React", "Tailwind CSS", "UI/UX"]}
              githubUrl="https://github.com/Chriiis85/Manager"
              webUrl="https://manager-coral-seven.vercel.app"
              inProgress
            />

            {/* Proyecto 4: TFG-DAW-2024 */}
            <ProjectCard 
              title="TFG DAW 2024" 
              domain="github.com/Chriiis85/TFG-DAW-2024" 
              description="Mi Trabajo de Fin de Grado de DAW y el origen de Motoring Community. Fue mi primer gran proyecto Full-Stack hecho a mano de cero con PHP, JavaScript, CSS y MySQL, donde diseñé desde la base de datos hasta el foro de usuarios, el calendario de carreras de Fórmula 1, las fichas de pilotos de 2024 y el buscador de campeonatos históricos."
              aboutApp="Este proyecto tiene un valor muy especial para mí porque fue mi Trabajo de Fin de Grado en Desarrollo de Aplicaciones Web (DAW) y la semilla de lo que hoy es Motoring Community. Lo desarrollé íntegramente desde cero sin frameworks modernos, trabajando con PHP, JavaScript, CSS y MySQL a medida para construir una plataforma completa para fans de la Fórmula 1: sistema de usuarios, un foro funcional donde abrir y filtrar temas de debate, fichas de la parrilla de pilotos y escuderías de 2024, calendario de Grandes Premios y consulta dinámica de clasificaciones históricas."
              tags={["Full-Stack", "PHP", "JavaScript", "CSS", "MySQL"]}
              githubUrl="https://github.com/Chriiis85/TFG-DAW-2024"
              webUrl="#"
              coverImage="/projects/tfg-daw-2024/Cover_TFG.png"
              images={[
                "/projects/tfg-daw-2024/1_TFG.png",
                "/projects/tfg-daw-2024/2_TFG.png",
                "/projects/tfg-daw-2024/3_TFG.png",
                "/projects/tfg-daw-2024/4_TFG.png",
                "/projects/tfg-daw-2024/5_TFG.png",
                "/projects/tfg-daw-2024/6_TFG.png",
              ]}
            />

          </div>
        </section>

        {/* SECCIÓN: Experiencia Profesional */}
        <ExperienceSection />

        {/* SECCIÓN: Mi Stack */}
        <TechStack />

        {/* SECCIÓN: Estudios y Certificados */}
        <EducationSection />

        {/* SECCIÓN: Contacto */}
        <ContactSection />
      </main>
    </div>
  )
}

export default App








