import { SiGithub as GithubIcon } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import type { ReactElement } from 'react';

export function Header(): ReactElement {
  return (
    <header
      data-testid="header"
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
            Next.js <span className="text-indigo-600">Template</span>
          </h1>
        </div>

        <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="#secao-1" className="transition hover:text-indigo-600">
            Visão geral
          </Link>

          <Link href="#secao-2" className="transition hover:text-indigo-600">
            O problema
          </Link>

          <Link href="#secao-3" className="transition hover:text-indigo-600">
            O que vem pronto
          </Link>

          <Link href="#secao-4" className="transition hover:text-indigo-600">
            Como funciona
          </Link>

          <Link href="#secao-5" className="transition hover:text-indigo-600">
            Criar projeto
          </Link>
        </nav>

        <div>
          <Link
            href="https://github.com/magnobiet/template-nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            <GithubIcon className="size-4" />
            <span>Ver no GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
