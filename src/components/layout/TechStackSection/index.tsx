import type { ReactElement } from 'react';

const technologies = [
  {
    icon: '🐙',
    title: 'GitHub & Actions',
    description: 'CI/CD automatizado para lint, testes e deploy.',
  },
  {
    icon: '⚡',
    title: 'React & Next.js',
    description: 'App Router moderno e renderização híbrida.',
  },
  {
    icon: '💙',
    title: 'TypeScript',
    description: 'Tipagem estática rigorosa e segura.',
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS',
    description: 'Estilização utilitária rápida e responsiva.',
  },
  {
    icon: '🧹',
    title: 'ESLint & Prettier',
    description: 'Padronização e formatação impecável.',
  },
  {
    icon: '🐕',
    title: 'Husky & Lint-Staged',
    description: 'Git hooks para validação pré-commit.',
  },
  {
    icon: '🧪',
    title: 'Jest & Playwright',
    description: 'Testes unitários e end-to-end automatizados.',
  },
  {
    icon: '🛡️',
    title: 'Zod',
    description: 'Validação de esquemas e dados em runtime.',
  },
  {
    icon: '🚨',
    title: 'Sentry',
    description: 'Monitoramento de erros e exceções.',
  },
  {
    icon: '✉️',
    title: 'Resend',
    description: 'APIs modernas para disparo de e-mails.',
  },
  {
    icon: '📈',
    title: 'K6',
    description: 'Testes de carga e performance.',
  },
  {
    icon: '✂️',
    title: 'Knip',
    description: 'Detecção e remoção de código morto.',
  },
  {
    icon: '📊',
    title: 'Google Analytics',
    description: 'Medição de tráfego e comportamento dos usuários.',
  },
  {
    icon: '🍪',
    title: 'Cookiebot',
    description: 'Gestão de consentimento e cookies em conformidade.',
  },
  {
    icon: '🚦',
    title: 'Upstash',
    description:
      'Rate limiting para proteger endpoints e controlar requisições.',
  },
];

export function TechStackSection(): ReactElement {
  return (
    <section
      data-testid="tech-stack-section"
      id="secao-3"
      className="border-b border-slate-200 bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
            Tudo o que seu site precisa para começar bem
          </h2>

          <p className="text-base text-slate-600">
            Ferramentas essenciais já conectadas para manter seu código
            consistente, testável e pronto para evoluir.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map((technology) => (
            <div
              key={technology.title}
              className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <span className="mb-2 text-2xl">{technology.icon}</span>

              <h3 className="text-sm font-bold text-slate-900">
                {technology.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {technology.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
