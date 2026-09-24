import Link from 'next/link';
import type { ReactElement } from 'react';

const steps = [
  {
    icon: '1️⃣',
    title: 'Comece pelo que importa',
    description:
      'Uma base pronta para criar landing pages e sites modernos sem repetir o mesmo setup em cada projeto.',
  },
  {
    icon: '2️⃣',
    title: 'Feito para sites',
    description:
      'Ideal para desenvolvedores e equipes que criam páginas de produto, sites institucionais e campanhas.',
  },
  {
    icon: '3️⃣',
    title: 'Qualidade desde o início',
    description:
      'Lint, testes, hooks e CI/CD configurados para você manter consistência desde o primeiro commit.',
  },
] as const;

export function HeroSection(): ReactElement {
  return (
    <section
      data-testid="hero-section"
      id="secao-1"
      className="relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-white to-slate-100 pt-20 pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-700 uppercase">
            <span>⚡</span>
            <span>Next.js Template</span>
          </div>

          <h2 className="text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Crie sites modernos{' '}
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              sem começar do zero
            </span>
            .
          </h2>

          <p className="text-lg text-slate-600">
            Uma base Next.js com TypeScript, Tailwind CSS, testes, lint, CI/CD e
            monitoramento já configurados para você focar no conteúdo e na
            experiência do seu site.
          </p>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href="https://github.com/magnobiet/template-nextjs/generate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
            >
              Usar Template no GitHub
            </Link>

            <Link
              href="#secao-3"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-base font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              Ver o que vem pronto
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 font-bold text-indigo-600">
                {step.icon}
              </div>

              <h3 className="mb-2 text-lg font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
