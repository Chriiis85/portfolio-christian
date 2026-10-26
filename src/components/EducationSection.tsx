import { useState, useEffect, useRef, type ReactNode } from 'react';
import { GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';

interface StudyItem {
  institution: string;
  degree: string;
  date: string;
  location: string;
  highlight?: boolean;
  description: (string | ReactNode)[];
}

export const EducationSection = () => {
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

  const studies: StudyItem[] = [
    {
      institution: "I.E.S. Puig Adam",
      degree: "Grado Superior en Desarrollo de Aplicaciones Web (DAW)",
      date: "Septiembre 2023 — Junio 2024",
      location: "Getafe, Madrid",
      highlight: true,
      description: [
        "Desarrollo Full Stack de aplicaciones web dinámicas, arquitectura cliente-servidor y diseño de interfaces responsive.",
        "Creación y consumo de APIs REST, gestión de bases de datos relacionales y desarrollo integral del proyecto de fin de grado."
      ]
    },
    {
      institution: "La Inmaculada Padres Escolapios",
      degree: "Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
      date: "Septiembre 2021 — Junio 2023",
      location: "Getafe, Madrid",
      highlight: false,
      description: [
        "Programación orientada a objetos (Java y entorno .NET), desarrollo de aplicaciones multiplataforma y acceso a datos.",
        "Modelado y administración de bases de datos SQL, programación de servicios, procesos e interfaces de usuario."
      ]
    },
    {
      institution: "I.E.S. Laguna de Joatzel",
      degree: "Grado Medio en Sistemas Microinformáticos y Redes (SMR)",
      date: "Septiembre 2019 — Junio 2021",
      location: "Getafe, Madrid",
      highlight: false,
      description: [
        "Instalación, configuración y administración de sistemas operativos en red e infraestructuras locales.",
        "Montaje, mantenimiento de hardware, seguridad informática y soporte técnico a usuarios."
      ]
    },
    {
      institution: "Certificaciones, Idiomas y Movilidad",
      degree: "Formación Complementaria y Competencias",
      date: "Actualidad",
      location: "Madrid",
      highlight: false,
      description: [
        <>
          Certificaciones oficiales:{" "}
          <a
            href="https://www.udemy.com/certificate/UC-c2f88cef-7d7f-4a92-801c-b15869b064ec/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:underline font-semibold"
          >
            Angular 18: De Cero a Experto
          </a>{" "}
          y{" "}
          <a
            href="https://www.udemy.com/certificate/UC-497035ed-855d-47fd-b05b-0bbcab3fa7cd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:underline font-semibold"
          >
            Git y GitHub
          </a>{" "}
          (Udemy).
        </>,
        "Doble titulación oficial de Técnico Superior en Desarrollo de Software (Especialidades DAW + DAM).",
        "Idiomas: Español (Nativo) | Inglés (Nivel Alto).",
        "Permiso de conducir (Carnet B) y vehículo propio con plena disponibilidad de movilidad en la Comunidad de Madrid."
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="estudios"
      className="w-full lg:min-h-screen pt-2 sm:pt-4 pb-10 sm:pb-16 lg:pb-24 mt-4 sm:mt-8 lg:mt-12 px-4 scroll-mt-24 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto lg:my-auto">
        <div
          className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-3.5 mb-8 sm:mb-12 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500 dark:text-sky-400 shrink-0" />
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Estudios y Certificados</h3>
        </div>

        <div className="relative ml-2 sm:ml-4 md:ml-6 space-y-10 sm:space-y-12 pb-4">
          {/* Línea vertical animada tipo persiana (baja de arriba a abajo) */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 origin-top transition-transform duration-1000 ease-out ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
          />

          {studies.map((item, idx) => {
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
                    item.highlight
                      ? 'bg-sky-500 dark:bg-sky-400 border-sky-500/25 dark:border-sky-400/25'
                      : 'bg-zinc-300 dark:bg-zinc-700 border-[#fafafa] dark:border-[#09090b]'
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5 gap-1">
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{item.degree}</h4>
                  <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
                    {item.date}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-300">
                    {item.institution}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-500 text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {item.location}
                  </span>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {item.description.map((point, i) => (
                    <li
                      key={i}
                      style={{ transitionDelay: `${itemDelay + 140 + i * 70}ms` }}
                      className={`flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed transition-all duration-500 ease-out transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
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

