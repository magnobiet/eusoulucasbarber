import { SiGithub as GithubIcon } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import type { ReactElement } from 'react';

export function CallToActionSection(): ReactElement {
  return (
    <section
      data-testid="call-to-action-section"
      id="secao-5"
      className="bg-linear-to-b from-white to-slate-100 py-24"
    >
      <div className="mx-auto max-w-5xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-700 uppercase">
          Seu próximo site começa aqui
        </span>

        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Comece sem refazer o setup
        </h2>

        <p className="mx-auto max-w-2xl text-base text-slate-600">
          Use uma base pronta para landing pages e sites modernos. Crie seu
          repositório no GitHub e comece a trabalhar no que o projeto precisa.
        </p>

        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <Link
            href="https://github.com/magnobiet/template-nextjs/generate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
          >
            <GithubIcon className="size-4.5" />
            Usar Template no GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
