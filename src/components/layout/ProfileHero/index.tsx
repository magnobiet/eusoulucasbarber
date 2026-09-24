import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import type { ReactElement } from 'react';

const specialties = [
  {
    label: 'Corte',
    icon: (
      <svg
        className="text-brand-cognac h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" x2="8.12" y1="4" y2="15.88" />
        <line x1="14.47" x2="20" y1="14.48" y2="20" />
        <line x1="8.12" x2="12" y1="8.12" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Barba',
    icon: (
      <svg
        className="text-brand-cognac h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 4 8 0-4 3-7 6-7s6 3 6 7c2-1.5 4-4.5 4-8 0-5.5-4.5-10-10-10z" />
      </svg>
    ),
  },
  {
    label: 'Visagismo',
    icon: (
      <svg
        className="text-brand-cognac h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" fill="currentColor" r="1" />
        <circle cx="15" cy="10" fill="currentColor" r="1" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
  },
];

export function ProfileHero(): ReactElement {
  return (
    <section
      className="mt-2 mb-6 flex w-full flex-col items-center text-center"
      data-purpose="artisan-hero"
    >
      <div className="stagger-item group relative mb-4 delay-2">
        <div className="from-brand-cognac via-brand-dark/35 avatar-halo absolute -inset-2.5 rounded-full bg-linear-to-b to-transparent" />
        <div className="from-brand-cognac via-brand-deep to-coffee-700 relative h-32 w-32 rounded-full bg-linear-to-b p-0.75 shadow-xl transition-transform duration-500 group-hover:scale-105">
          <Image
            alt="Lucas Xavier"
            className="h-full w-full rounded-full object-cover select-none"
            height={128}
            loading="eager"
            priority
            src="/profile.jpg"
            width={128}
          />
        </div>

        <div className="border-brand-cognac/50 bg-coffee-900 text-brand-cognac absolute right-1 bottom-0 rounded-full border p-1.5 shadow-md">
          <div className="radar-pulse" />
          <BadgeCheck className="z-10 h-4 w-4" />
        </div>
      </div>

      <div className="stagger-item delay-3">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-white uppercase transition-colors duration-200">
          Lucas Xavier
        </h1>
        <p className="text-brand-light mt-1 text-xs font-semibold tracking-wider uppercase">
          Barbeiro em Caxias do Sul
        </p>
        <p className="text-cream-muted mx-auto mt-2.5 max-w-xs text-xs leading-relaxed font-normal">
          Corte de cabelo, barba e visagismo masculino. Atendimento com hora
          marcada.
        </p>
      </div>

      <div className="stagger-item mt-3.5 flex max-w-sm flex-wrap justify-center gap-1.5 delay-4">
        {specialties.map(({ label, icon }) => (
          <span
            key={label}
            className="specialty-pill group border-coffee-700 bg-coffee-850 text-cream inline-flex cursor-default items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm"
          >
            {icon}
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
