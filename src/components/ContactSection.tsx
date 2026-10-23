import { useState, type FormEvent } from 'react';
import { Send, Check, Copy, Mail } from 'lucide-react';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('christianmorenodiaz85@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    const payload = {
      Nombre: name,
      Email: email,
      Asunto: subject,
      Mensaje: message,
      _subject: `Nuevo mensaje desde tu Portfolio: ${subject}`,
      _template: 'table',
    };

    setStatus('sending');

    // Envío en segundo plano con keepalive
    fetch('https://formsubmit.co/ajax/598561fd483d1071367db31138ee6a99', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silencioso en background
    });

    // Respuesta inmediata al usuario
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 300);
  };

  return (
    <section id="contacto" className="w-full pt-0 pb-16 sm:pb-24 mt-8 sm:mt-12 px-4 scroll-mt-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Título de sección igual que Mis Proyectos y Sobre Mí */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#222831] dark:text-[#eeeeee] mb-2">
            Contacto
          </h2>
          <p className="text-sm sm:text-base text-[#393e46] dark:text-[#eeeeee]/80 max-w-2xl mx-auto font-sans">
            Escríbeme directamente a mi correo o contactame para tener una charla.
          </p>
        </div>

        {/* VENTANA NATIVA APPLE MAIL (macOS Mail.app — Redactar mensaje) */}
        <form
          onSubmit={handleSubmit}
          className="w-full border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden bg-white dark:bg-[#16171d] shadow-xl dark:shadow-2xl transition-all duration-300 font-sans"
        >
          {/* BARRA SUPERIOR MACOS MAIL */}
          <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-slate-100 dark:bg-[#1e1f26] border-b border-slate-200 dark:border-slate-700/50 select-none transition-colors duration-300">
            
            {/* Izquierda: Semáforo Mac */}
            <div className="flex items-center gap-1.5 sm:gap-2 w-16 sm:w-24 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm hover:brightness-110 transition-all" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm hover:brightness-110 transition-all" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm hover:brightness-110 transition-all" />
            </div>

            {/* Centro: Título dinámico de la ventana de correo */}
            <div className="flex-1 flex justify-center min-w-0">
              <div className="bg-slate-200 dark:bg-[#16171d] text-slate-600 dark:text-slate-400 text-xs font-mono px-2.5 sm:px-6 py-1.5 rounded-md border border-slate-300/50 dark:border-slate-700/50 flex items-center gap-1.5 sm:gap-2 max-w-[320px] w-full justify-center transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-[#0092ca] flex-shrink-0" />
                <span className="truncate">{subject.trim() ? subject : 'Nuevo mensaje — Mail'}</span>
              </div>
            </div>

            {/* Derecha: Espaciador simétrico para centrar perfectamente la cápsula de título */}
            <div className="w-16 sm:w-24 shrink-0" />
          </div>

          {/* CAMPOS DE CABECERA DE CORREO ESTILO APPLE MAIL */}
          <div className="px-4 sm:px-6 divide-y divide-slate-200/80 dark:divide-slate-800 font-sans text-sm">
            
            {/* Fila: Para */}
            <div className="flex flex-wrap items-center gap-2 py-2.5">
              <span className="text-slate-400 dark:text-slate-500 font-medium w-16 shrink-0 select-none">
                Para:
              </span>
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0092ca]/10 dark:bg-[#0092ca]/20 text-[#0092ca] text-xs font-medium border border-[#0092ca]/20 truncate">
                  <span>Christian Moreno Díaz</span>
                  <span className="opacity-75 hidden sm:inline">&lt;christianmorenodiaz85@gmail.com&gt;</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#0092ca] dark:hover:text-[#0092ca] transition-colors cursor-pointer ml-auto font-sans"
                  title="Copiar dirección de correo"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copiar correo</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Fila: De (Nombre del remitente) */}
            <div className="flex items-center gap-2 py-2.5">
              <label htmlFor="mail-name" className="text-slate-400 dark:text-slate-500 font-medium w-16 shrink-0 select-none">
                Nombre:
              </label>
              <input
                id="mail-name"
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre o empresa"
                className="w-full bg-transparent font-sans text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none text-sm"
              />
            </div>

            {/* Fila: Correo del remitente */}
            <div className="flex items-center gap-2 py-2.5">
              <label htmlFor="mail-from" className="text-slate-400 dark:text-slate-500 font-medium w-16 shrink-0 select-none">
                De:
              </label>
              <input
                id="mail-from"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-transparent font-sans text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none text-sm"
              />
            </div>

            {/* Fila: Asunto */}
            <div className="flex items-center gap-2 py-2.5">
              <label htmlFor="mail-subject" className="text-slate-400 dark:text-slate-500 font-medium w-16 shrink-0 select-none">
                Asunto:
              </label>
              <input
                id="mail-subject"
                type="text"
                name="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Motivo del mensaje"
                className="w-full bg-transparent font-sans text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* LIENZO DE ESCRITURA DEL CORREO (Área de redacción con tipografía homogénea) */}
          <div className="px-4 sm:px-6 pt-4 pb-4 border-t border-slate-200/80 dark:border-slate-800">
            <textarea
              rows={4}
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full bg-transparent font-sans text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none text-sm sm:text-base leading-relaxed resize-none"
            />

            {/* Pie del correo: Firma homogénea + Botón de acción principal */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
              <div className="font-sans text-xs text-slate-500 dark:text-slate-400 select-none flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">— Christian Moreno Díaz</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>Full Stack Developer</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <a href="tel:+34619276645" className="hover:text-[#0092ca] transition-colors">
                  +34 619 27 66 45
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 w-full md:w-auto">
                {status === 'success' && (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    ¡Mensaje enviado correctamente!
                  </span>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-md ${
                    status === 'success'
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                      : 'bg-[#0092ca] hover:bg-[#0081b3] shadow-[#0092ca]/25 hover:shadow-lg hover:shadow-[#0092ca]/30'
                  }`}
                >
                  {status === 'success' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Enviado</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* FOOTER BÁSICO */}
      <footer className="w-full max-w-4xl mx-auto text-center mt-10 mb-20 md:mb-6 text-slate-500 dark:text-slate-500/50 text-sm font-sans">
        <p>Desarrollado por Christian Moreno Díaz © {new Date().getFullYear()}</p>
      </footer>
    </section>
  );
};

