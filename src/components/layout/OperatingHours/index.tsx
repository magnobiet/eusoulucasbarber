import { Clock } from 'lucide-react';
import type { ReactElement } from 'react';

export function OperatingHours(): ReactElement {
  return (
    <section
      className="stagger-item mb-6 w-full delay-7"
      data-purpose="hours-card"
    >
      <div className="card-coffee flex flex-col gap-2 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-brand-cognac h-4 w-4" />
            <h3 className="font-heading text-xs font-semibold tracking-wider text-white uppercase">
              Horário de atendimento
            </h3>
          </div>
        </div>
        <p className="text-cream mt-0.5 text-xs font-medium">
          Segunda a Sábado das 09h às 20h
        </p>
      </div>
    </section>
  );
}
