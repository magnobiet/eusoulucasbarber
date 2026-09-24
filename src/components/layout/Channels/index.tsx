import { SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons';
import { ChevronRight, MapPin } from 'lucide-react';
import type { ReactElement } from 'react';

const channels = [
  {
    id: 'whatsapp',
    href: 'https://api.whatsapp.com/send?phone=5554991909175',
    icon: <SiWhatsapp className="h-5 w-5 fill-current" />,
    title: 'WhatsApp',
    detail: '(54) 9 9190-9175',
    detailClassName: 'text-cream-subtle',
  },
  {
    id: 'instagram',
    href: 'https://instagram.com/eusoulucasbarber',
    icon: <SiInstagram className="h-5 w-5 fill-current" />,
    title: 'Instagram',
    detail: '@eusoulucasbarber',
    detailClassName: 'text-brand-cognac',
  },
  {
    id: 'location',
    href: 'https://maps.google.com/?q=R.+Cristiano+Ramos+de+Oliveira,+407+-+Charqueadas,+Caxias+do+Sul+-+RS',
    icon: <MapPin className="h-5 w-5" />,
    title: 'Endereço',
    detail: 'R. Cristiano Ramos de Oliveira, 407 • Loja 3',
    detailClassName: 'text-cream-subtle',
  },
] as const;

export function Channels(): ReactElement {
  return (
    <section
      className="stagger-item mb-5 w-full space-y-2.5 delay-7"
      data-purpose="channels-list"
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="text-cream-dim text-xs font-semibold tracking-wider uppercase">
          Atendimento
        </h2>
      </div>

      {channels.map(({ id, href, icon, title, detail, detailClassName }) => (
        <a
          key={id}
          className="card-coffee group flex items-center justify-between rounded-xl p-3.5"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex items-center gap-3.5">
            <div className="border-brand-cognac/30 bg-brand-cognac/15 text-brand-cognac flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105">
              {icon}
            </div>
            <div>
              <span className="group-hover:text-cream-highlight block text-xs font-semibold text-white transition-colors">
                {title}
              </span>
              <span className={`block text-xs ${detailClassName}`}>
                {detail}
              </span>
            </div>
          </div>
          <ChevronRight className="text-cream-dim group-hover:text-brand-cognac h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
        </a>
      ))}
    </section>
  );
}
