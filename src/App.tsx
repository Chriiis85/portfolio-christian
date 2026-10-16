import './App.css'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { TechStack } from './components/TechStack'
import { HeroBackground } from './components/HeroBackground'
import { AboutSection } from './components/AboutSection'
import { EducationSection } from './components/EducationSection'
import { ContactSection } from './components/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-[#eeeeee] dark:bg-[#222831] text-[#222831] dark:text-[#eeeeee] transition-colors duration-300">
      {/* Nuestro nuevo componente de Navegación */}
      <Navbar />

      <main>
        {/* SECCIÓN: Inicio */}
        <section id="inicio" className="relative overflow-hidden min-h-screen flex items-center justify-center pt-16 bg-[#eeeeee] dark:bg-[#222831] transition-colors duration-300">
          <HeroBackground />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-[#222831] dark:text-[#eeeeee] mb-4">
              ¡Hola, soy Christian!
            </h1>
            <p className="text-xl md:text-2xl text-[#0092ca] font-medium mb-6">
              Desarrollador de Aplicaciones Web | Desarrollador Full Stack
            </p>
            <p className="text-lg text-[#393e46] dark:text-[#eeeeee]/80 max-w-2xl mx-auto">
              Bienvenido a mi portfolio. Aquí podrás encontrar mis últimos proyectos y un poco más sobre mi experiencia.</p>

            {/* Botones de Acción Rápida (CTA) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a href="#proyectos" className="w-full sm:w-auto px-8 py-3.5 bg-[#222831] text-[#eeeeee] dark:bg-[#0092ca] dark:text-[#eeeeee] font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-slate-900/10 dark:shadow-white/10">
                Ver Mis Proyectos
              </a>
              <a href="#sobre-mi" className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#222831] border border-[#393e46]/20 dark:bg-[#393e46] dark:text-[#eeeeee] dark:border-[#393e46] font-bold rounded-full hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                Ver Experiencia
              </a>
            </div>
          </div>
        </section>



        {/* SECCIÓN: Sobre mí, Experiencia y Educación */}
        <AboutSection />

        {/* SECCIÓN: Proyectos */}
        <section id="proyectos" className="pt-0 pb-24 mt-12 px-4 scroll-mt-24 flex flex-col items-center justify-center bg-[#eeeeee] dark:bg-[#222831] transition-colors duration-300">
          <div className="w-full max-w-5xl text-center mb-12">
            <h2 className="text-4xl font-bold text-[#222831] dark:text-[#eeeeee] mb-4">Mis Proyectos</h2>
            <p className="text-[#393e46] dark:text-[#eeeeee]/80 max-w-2xl mx-auto">
              Haz clic en cualquiera de las "ventanas" para expandir y ver más detalles sobre el desarrollo y las tecnologías aplicadas.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">
            
            {/* Proyecto 1: Motoring Community */}
            <ProjectCard 
              title="Motoring Community" 
              domain="motoring-community-v1.vercel.app" 
              description="Plataforma comunitaria moderna para entusiastas del motor. Permite a los usuarios conectarse, compartir experiencias, organizar rutas y debatir en foros especializados."
              tags={["TypeScript", "React", "Next.js", "Tailwind CSS"]}
              githubUrl="https://github.com/Chriiis85/motoring-community"
              webUrl="https://motoring-community-v1.vercel.app"
            />

            {/* Proyecto 2: RCManager (Frontend) */}
            <ProjectCard 
              title="RCManager" 
              domain="rcmanager-nine.vercel.app/" 
              description="Frontend de la aplicación para la gestión y control remoto. Interfaz desarrollada con enfoque en la experiencia de usuario (UX/UI) y consumo eficiente de datos."
              tags={["JavaScript", "HTML", "CSS", "Frontend"]}
              githubUrl="https://github.com/Chriiis85/RCManager"
              webUrl="https://rcmanager-nine.vercel.app/"
            />

            {/* Proyecto Nuevo: RCManagerAPI (Backend) */}
            <ProjectCard 
              title="RCManager API" 
              domain="rc-manager-api.vercel.app/" 
              description="Backend y API RESTful para la plataforma RCManager. Gestiona la lógica de negocio, acceso a bases de datos y la comunicación segura con la aplicación cliente."
              tags={["Node.js", "Express", "API REST", "Backend"]}
              githubUrl="https://github.com/Chriiis85/RCManagerAPI"
              webUrl="https://rc-manager-api.vercel.app/"
            />
            
            {/* Proyecto 3: Manager */}
            <ProjectCard 
              title="Manager App" 
              domain="manager-coral-seven.vercel.app" 
              description="Herramienta de gestión empresarial interactiva. Orientada a simplificar tareas administrativas y mejorar la productividad con una interfaz de usuario limpia y minimalista."
              tags={["TypeScript", "React", "Tailwind CSS", "UI/UX"]}
              githubUrl="https://github.com/Chriiis85/Manager"
              webUrl="https://manager-coral-seven.vercel.app"
            />

            {/* Proyecto 4: TFG-DAW-2024 */}
            <ProjectCard 
              title="TFG DAW 2024" 
              domain="github.com/Chriiis85/TFG-DAW-2024" 
              description="Trabajo de Fin de Grado para Desarrollo de Aplicaciones Web. Un proyecto integral full-stack desarrollado desde cero aplicando todas las competencias técnicas adquiridas durante la formación académica."
              tags={["Full-Stack", "PHP", "JavaScript", "CSS", "MySQL"]}
              githubUrl="https://github.com/Chriiis85/TFG-DAW-2024"
              webUrl="#"
            />

          </div>
        </section>

        {/* SECCIÓN: Stack */}
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








