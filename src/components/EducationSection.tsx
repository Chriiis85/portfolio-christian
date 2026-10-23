import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

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

  const studies = [
    {
      institution: "I.E.S Puig Adam",
      degree: "Grado Superior en Desarrollo de Aplicaciones Web (DAW)",
      date: "SEP 2023 - JUN 2024",
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
      date: "SEP 2021 - JUN 2023",
      location: "Getafe, Madrid",
      highlight: false,
      description: [
        "Programación orientada a objetos (Java y entorno .NET), desarrollo de aplicaciones multiplataforma y acceso a datos.",
        "Modelado y administración de bases de datos SQL, programación de servicios, procesos e interfaces de usuario."
      ]
    },
    {
      institution: "I.E.S Laguna de Joatzel",
      degree: "Grado Medio en Sistemas Microinformáticos y Redes (SMR)",
      date: "SEP 2019 - JUN 2021",
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
      date: "ACTUALIDAD",
      location: "Madrid",
      highlight: false,
      description: [
        "Doble titulación oficial de Técnico Superior en Desarrollo de Software (Especialidades DAW + DAM).",
        "Idiomas: Español (Nativo) e Inglés (Nivel Intermedio en lectura técnica y comunicación).",
        "Permiso de conducir y vehículo propio con disponibilidad total en la Comunidad de Madrid."
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="estudios"
      className="w-full min-h-[calc(100vh-5rem)] lg:min-h-screen pt-4 pb-16 sm:pb-24 mt-8 sm:mt-12 px-4 scroll-mt-24 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto my-auto">
        <div
          className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-[#0092ca] shrink-0" />
          <h3 className="text-2xl sm:text-3xl font-bold text-[#222831] dark:text-[#eeeeee]">Estudios y Certificados</h3>
        </div>

        <div className="relative ml-2 sm:ml-4 md:ml-6 space-y-10 sm:space-y-12 pb-4">
          {/* Línea vertical animada tipo persiana (baja de arriba a abajo) */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10 origin-top transition-transform duration-1000 ease-out ${
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
                  className={`absolute -left-[7px] top-1.5 w-4 h-4 rounded-full border-4 transition-transform duration-500 ease-out ${
                    isVisible ? 'scale-100' : 'scale-0'
                  } ${
                    item.highlight
                      ? 'bg-[#0092ca] border-[#0092ca]/30 dark:border-[#0092ca]/30'
                      : 'bg-slate-300 dark:bg-[#393e46] border-white dark:border-[#222831]'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1.5 sm:gap-2">
                  <h4 className="text-lg sm:text-xl font-bold text-[#222831] dark:text-[#eeeeee]">{item.degree}</h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 text-[#393e46] dark:text-[#eeeeee] text-xs font-semibold rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-medium text-[#0092ca]">
                    {item.institution}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {item.location}
                  </span>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {item.description.map((point, i) => (
                    <li
                      key={i}
                      style={{ transitionDelay: `${itemDelay + 140 + i * 70}ms` }}
                      className={`flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-[#393e46] dark:text-slate-400 leading-relaxed transition-all duration-500 ease-out transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0092ca] shrink-0 mt-0.5" />
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

