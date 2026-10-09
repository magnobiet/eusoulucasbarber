import { Calendar } from 'lucide-react';
import type { ReactElement } from 'react';
import { config } from '~/config';
import { createWhatsAppUrl } from '~/utils/whatsapp';

const { booking, vcard } = config;

export function PrimaryCTA(): ReactElement {
  return (
    <section
      className="stagger-item mb-2.5 w-full delay-5"
      data-purpose="primary-conversion"
    >
      <a
        className="cognac-action group font-heading text-coffee-950 relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-5 py-4 text-sm font-bold tracking-wider uppercase transition duration-200"
        href={createWhatsAppUrl(vcard.phone, booking.message)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="shimmer-beam" />
        <Calendar className="relative h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
        <span className="relative tracking-wider uppercase">
          {booking.label}
        </span>
      </a>
    </section>
  );
}
