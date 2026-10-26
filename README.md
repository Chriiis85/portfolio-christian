# Christian Moreno — Developer Portfolio

[Ver en Español](#-español) | [View in English](#-english)

**Live:** [https://portfolio-christianmd.vercel.app](https://portfolio-christianmd.vercel.app)

---

## 🇪🇸 Español

¡Hola! 👋 Soy **Christian**, desarrollador Web Full Stack con doble titulación técnica superior en **DAW** y **DAM**.

Diseñé este portfolio como una **aplicación web interactiva**, cuidando la experiencia de usuario (UX/UI) con detalles visuales inspirados en el diseño de macOS y un rendimiento optimizado al milímetro.

### Funcionalidades destacadas

- **Ventana modal estilo macOS Safari:** Visor de capturas de proyectos con la apariencia del navegador Safari de Apple (semáforo de controles, barra de direcciones, pantalla completa y navegación con teclado mediante flechas y tecla ESC).
- **Consola interactiva con typing:** Editor de código simulado en el apartado "Sobre mí" con animación de tipeo y coloreado sintáctico, que incluye un botón de "Compilar" interactivo para desplegar mi perfil y trayectoria.
- **Visor nativo para el CV:** Modal inspirado en la app Vista Previa de macOS para consultar y descargar el currículum en PDF (optimizado en 1 página A4) con un solo clic.
- **Filtro interactivo de tecnologías:** Selector por categorías (Frontend, Backend, Bases de Datos, Herramientas) con los colores de marca de cada tecnología y soporte para modo oscuro y claro.
- **Formulario de contacto:** Validación directa de campos en cliente, generación de asunto dinámico y botón para copiar mi correo al portapapeles.
- **Responsive:** Maquetado con Tailwind CSS asegurando fluidez en móviles, tablets y pantallas de escritorio.

### Retos técnicos resueltos

1. **Control de estados y efectos en React 19:**  
   Sincronicé animaciones y transiciones de apertura/cierre sin recurrir a llamadas síncronas a `setState` dentro del cuerpo de los `useEffect`, previniendo renders en cascada y manteniendo el proyecto con 0 errores y 0 warnings en ESLint.
2. **Uso de React Portals:**  
   Tanto la ventana de Safari como el visor de CV utilizan `createPortal` para montarse en el nodo raíz del DOM, evitando conflictos de apilamiento (`z-index`) y gestionando el bloqueo del scroll de fondo (`overflow: hidden`) mientras los modales están activos.
3. **Build rápido y optimizado:**  
   Configurado con Vite y TypeScript (`tsc -b && vite build`), compilando cerca de 2.000 módulos en producción en menos de 850ms.

### Tecnologías utilizadas

- **React 19**
- **TypeScript 5**
- **Tailwind CSS**
- **Vite 8**
- **Lucide React & React Icons**
- **Vercel**

### Cómo probarlo en local

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

Hello! 👋 I'm **Christian**, a Full Stack Web Developer with a dual higher technical degree in **DAW** and **DAM**.

I built this portfolio as an **interactive single-page application**, focusing on micro-interactions, clean UI/UX inspired by macOS design systems, and fast loading times.

### Key Features

- **macOS Safari Modal Window:** An interactive replica of Apple's Safari browser showcasing project screenshots with keyboard navigation (arrow keys & ESC) and full-screen maximization.
- **Interactive Code Console:** A simulated code editor in the "About Me" section with syntax highlighting and live typing animation, featuring a "Compile" button that smoothly reveals my bio and experience.
- **macOS Preview CV Viewer:** A native Preview.app styled modal allowing visitors to inspect and download my 1-page A4 PDF resume in a single click.
- **Tech Stack Filter:** Categorized tabs (Frontend, Backend, Databases, Tools) with brand colors and dark/light mode support.
- **Contact Form:** Interactive contact form with validation feedback and single-click email copying.
- **Responsive Design:** Mobile-first layout with clean typography and adaptive design across all screen sizes.

### Technical Highlights

1. **State & Effect Management in React 19:**  
   Coordinated modal transitions without synchronous `setState` calls inside `useEffect`, preventing cascading renders and maintaining clean ESLint compliance.
2. **React Portals:**  
   Utilized `createPortal` to render modal overlays at the root DOM level, preventing stacking context issues and managing background scroll locking.
3. **Fast Bundling:**  
   Vite + TypeScript production build (`tsc -b && vite build`) transforming nearly 2,000 modules in under 850ms.

### Tech Stack

- **React 19**
- **TypeScript 5**
- **Tailwind CSS**
- **Vite 8**
- **Lucide React & React Icons**
- **Vercel**

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Chriiis85/portfolio-christian.git
cd portfolio-christian

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build
```

---

<div align="center">
  <sub>Christian Moreno Díaz · Portfolio</sub>
</div>
