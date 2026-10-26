import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, FileText, X } from 'lucide-react';

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl?: string;
  fileName?: string;
}

export const CvPreviewModal = ({
  isOpen,
  onClose,
  cvUrl = '/CV_Christian_Moreno_Diaz.pdf',
  fileName = 'CV_Christian_Moreno_Diaz.pdf',
}: CvPreviewModalProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      timer = setTimeout(() => {
        setIsRendered(true);
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 0);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'auto';
      const animTimer = setTimeout(() => {
        setIsVisible(false);
        setIsMaximized(false);
      }, 0);
      timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => {
        clearTimeout(animTimer);
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-6 md:p-10 transition-all duration-300 ease-out ${
        isVisible
          ? 'bg-black/65 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0'
      }`}
    >
      {/* VENTANA NATIVA MACOS PREVIEW (Visor de CV) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col bg-[#f5f5f7] dark:bg-[#141417] border border-zinc-300/90 dark:border-zinc-800 rounded-xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.75)] overflow-hidden transition-all duration-300 ease-out transform ${
          isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-6 opacity-0'
        } ${
          isMaximized
            ? 'w-[98vw] h-[94vh]'
            : 'w-full max-w-4xl h-[85vh] sm:h-[88vh]'
        }`}
      >
        {/* BARRA SUPERIOR ESTILO MACOS PREVIEW.APP */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-100/95 dark:bg-[#1a1a1e] border-b border-zinc-300/90 dark:border-zinc-800 select-none shrink-0">
          
          {/* Izquierda: Semáforo Mac */}
          <div className="flex items-center gap-2 w-auto sm:w-36 shrink-0">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:brightness-95 border border-black/10 flex items-center justify-center group cursor-pointer"
              title="Cerrar (Esc)"
            >
              <span className="text-[9px] font-bold text-red-950 opacity-0 group-hover:opacity-100 leading-none">✕</span>
            </button>
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#febc2e] hover:brightness-95 border border-black/10 flex items-center justify-center group cursor-pointer"
              title="Minimizar"
            >
              <span className="text-[9px] font-bold text-yellow-950 opacity-0 group-hover:opacity-100 leading-none">−</span>
            </button>
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="w-3.5 h-3.5 rounded-full bg-[#28c840] hover:brightness-95 border border-black/10 flex items-center justify-center group cursor-pointer"
              title="Maximizar / Restaurar"
            >
              <span className="text-[8px] font-bold text-green-950 opacity-0 group-hover:opacity-100 leading-none">+</span>
            </button>
          </div>

          {/* Centro: Cápsula con nombre del archivo (en font-mono como el resto de ventanas) */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs font-mono px-2.5 sm:px-5 py-1.5 rounded-md border border-zinc-200/90 dark:border-zinc-800/90 flex items-center gap-1.5 sm:gap-2 max-w-[300px] w-full justify-center truncate shadow-2xs">
              <FileText className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 shrink-0" />
              <span className="truncate">{fileName}</span>
            </div>
          </div>

          {/* Derecha: Acciones de Descargar, Abrir en pestaña nueva y Cerrar (X) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 w-auto sm:w-44 shrink-0">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-1.5 rounded-md bg-white/90 dark:bg-zinc-800 border border-zinc-300/90 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs"
              title="Abrir PDF en pestaña nueva"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={cvUrl}
              download={fileName}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white text-xs font-semibold transition-all active:scale-95 shadow-2xs"
              title="Descargar CV en PDF"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Descargar</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center p-1.5 rounded-md bg-white/90 dark:bg-zinc-800 border border-zinc-300/90 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-2xs transition-colors cursor-pointer"
              title="Cerrar ventana (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CUERPO DEL VISOR DE PDF */}
        <div className="flex-1 bg-zinc-200/90 dark:bg-[#09090b] relative overflow-hidden flex flex-col">
          <iframe
            src={`${cvUrl}#toolbar=0&navpanes=0&view=FitH`}
            title="Currículum Vitae - Christian Moreno Díaz"
            className="w-full h-full border-0 flex-1 bg-white"
          />

          {/* Barra flotante inferior en móvil para facilitar descarga directa */}
          <div className="sm:hidden bg-zinc-100/95 dark:bg-[#161618] border-t border-zinc-300/80 dark:border-zinc-800 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0">
            <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
              Currículum Vitae (PDF)
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200"
              >
                Abrir
              </a>
              <a
                href={cvUrl}
                download={fileName}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
