# 🌐 Christian Moreno — Developer Portfolio

[🇪🇸 Ver en Español](#-español) | [🇬🇧 View in English](#-english)

**Live Production:** [https://portfolio-christianmd.vercel.app](https://portfolio-christianmd.vercel.app)

---

## 🇪🇸 Español

¡Hola! 👋 Soy **Christian**, Desarrollador Web Full Stack con doble titulación técnica superior en **DAW** (Desarrollo de Aplicaciones Web) y **DAM** (Desarrollo de Aplicaciones Multiplataforma).

Diseñé y desarrollé este portfolio no como una página estática convencional, sino como una **aplicación web interactiva completa**, orientada a demostrar mis habilidades en frontend moderno, arquitectura de componentes, diseño de interfaz (UI/UX) con estética inspirada en macOS y un rendimiento optimizado al milímetro.

### ✨ Experiencias y Componentes de Autor

- 🍏 **Ventana Modal macOS Safari:** Simulador interactivo del navegador Safari de Apple con botones de semáforo nativos, barra de direcciones interactiva, visor fotográfico de capturas de proyectos con navegación por teclado (flechas y ESC) y opción de maximizado en pantalla completa.
- 💻 **Consola Interactiva de Código ("Sobre Mí"):** Editor de código simulado con animación *typing* en tiempo real y coloreado sintáctico, acompañado de un botón interactivo de compilación que despliega fluidamente mi perfil profesional y experiencia laboral.
- 📄 **Visor macOS Preview para el Currículum:** Modal nativo estilo Preview.app de macOS con semáforo interactivo, visor integrado del PDF del CV (optimizado estrictamente a 1 página A4) y descarga directa con un clic.
- 🎛️ **Filtro Dinámico de Stack Tecnológico:** Pestañas interactivas categorizadas (Frontend, Backend, Bases de Datos, Herramientas) con resaltado dinámico de marcas tecnológicas, transiciones suaves y modo oscuro/claro integrado.
- 📬 **Formulario de Contacto Interactivo:** Formulario directo con validación visual, asunto dinámico preconfigurado y botón de copia rápida de correo electrónico al portapapeles.
- 📱 **Diseño 100% Responsive y Mobile-First:** Adaptabilidad cuidada para móviles, tablets y monitores de alta resolución con tipografías sans y mono equilibradas.

### 💡 Retos Técnicos Resueltos

1. **Arquitectura Limpia en React 19 y Cero Renders en Cascada:**  
   Sincronización de estados y animaciones sin llamadas síncronas de `setState` dentro de `useEffect`, cumpliendo las directrices más estrictas de ESLint (`react-hooks/set-state-in-effect` y Fast Refresh `react-refresh/only-export-components`).
2. **Portales y Gestión Avanzada del DOM:**  
   Uso de `createPortal` de React para los modales de Safari y Preview de CV, garantizando que el árbol del DOM permanezca aislado y libre de conflictos de apilamiento (`z-index`) o scroll involuntario de fondo (`body overflow hidden`).
3. **Rendimiento y Build Ultrarrápido:**  
   Configuración optimizada con **Vite** y **TypeScript** que compila casi 2.000 módulos en producción (`tsc -b && vite build`) en menos de **850ms**, generando un bundle ligero y eficiente.

### 🛠️ Stack Tecnológico

- **React 19**
- **TypeScript 5**
- **Tailwind CSS**
- **Vite 8**
- **Lucide React & React Icons**
- **Vercel** (Despliegue y CI/CD)

### 💻 Cómo probarlo en local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Chriiis85/portfolio-christian.git
cd portfolio-christian

# 2. Instalar dependencias
npm install

# 3. Iniciar el entorno de desarrollo
npm run dev
# Abrir en el navegador: http://localhost:5173

# 4. Compilar para producción
npm run build
```

---

## 🇬🇧 English

Hello! 👋 I'm **Christian**, a Full Stack Web Developer with a dual higher technical degree in **DAW** (Web Application Development) and **DAM** (Multiplatform Application Development).

I created this portfolio not just as a static resume, but as a **fully interactive modern web application** designed to showcase my skills in frontend architecture, thoughtful UI/UX inspired by macOS design systems, fluid micro-interactions, and high-performance engineering.

### ✨ Key Interactive Features

- 🍏 **macOS Safari Modal Window:** An interactive replica of Apple's Safari browser featuring native traffic light controls, an address bar, a screenshot gallery with keyboard navigation (arrow keys and ESC), and full-screen maximization.
- 💻 **Interactive Code Console ("About Me"):** Simulated code editor featuring a real-time typing animation with syntax highlighting, alongside an interactive compile trigger that smoothly unveils my background and career history.
- 📄 **macOS Preview CV Viewer:** A native macOS Preview.app styled modal window with traffic light buttons, embedding my official 1-page A4 PDF resume with immediate one-click download.
- 🎛️ **Dynamic Tech Stack Filter:** Interactive categorized tabs (Frontend, Backend, Databases, Tools) with brand color accents, smooth transition effects, and dark/light system adaptation.
- 📬 **Interactive Contact Form:** Built-in form with live validation feedback, automatic email subject generation, and single-click email copying to the clipboard.
- 📱 **Mobile-First & 100% Responsive:** Pixel-perfect layout tailored for smartphones, tablets, and high-density desktop displays.

### 💡 Technical Highlights

1. **Clean React 19 Architecture & Zero Cascading Renders:**  
   Effect synchronization without synchronous `setState` in effect bodies, strictly adhering to modern ESLint rules (`react-hooks/set-state-in-effect`) and Fast Refresh standards.
2. **React Portals & DOM Isolation:**  
   Extensive use of `createPortal` for Safari and CV Preview modals to maintain a clean stacking context (`z-index`) and prevent background scroll bleeding.
3. **Blazing Fast Production Build:**  
   Fine-tuned bundling with **Vite** and **TypeScript** compiling nearly 2,000 modules in under **850ms**, producing a lean, production-ready asset bundle.

### 🛠️ Tech Stack

- **React 19**
- **TypeScript 5**
- **Tailwind CSS**
- **Vite 8**
- **Lucide React & React Icons**
- **Vercel** (Deploy & Hosting)

### 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/Chriiis85/portfolio-christian.git
cd portfolio-christian

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# Open in browser: http://localhost:5173

# 4. Build for production
npm run build
```

---

<div align="center">
  <sub>Diseñado y desarrollado con dedicación por Christian Moreno Díaz · © Christian.dev</sub>
</div>
