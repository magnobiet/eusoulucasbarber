import { Calendar } from 'lucide-react';
import type { ReactElement } from 'react';

export function PrimaryCTA(): ReactElement {
  return (
    <section
      className="stagger-item mb-4 w-full delay-5"
      data-purpose="primary-conversion"
    >
      <a
        className="cognac-action group font-heading relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-5 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all duration-200"
        href="https://api.whatsapp.com/send?phone=5554991909175&text=Ol%C3%A1%20Lucas!%20Gostaria%20de%20consultar%20a%20disponibilidade%20para%20um%20agendamento."
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="shimmer-beam" />
        <Calendar className="h-5 w-5 text-white/95 transition-transform duration-200 group-hover:scale-110" />
        <span className="tracking-wider uppercase">Agendar horário</span>
      </a>
    </section>
  );
}
