import type { ReactElement } from 'react';

const problems = [
  'Horas perdidas configurando linters, formatadores e regras iniciais.',
  'Pipelines de CI/CD inexistentes ou complexas de estruturar.',
  'Falta de padronização em validações e testes automatizados.',
  'Ausência de ferramentas essenciais de monitoramento desde o dia 1.',
];

const solutions = [
  'Ambiente pronto com arquitetura validada e padrões corporativos.',
  'Automações de testes e deploy configuradas via GitHub Actions.',
  'Qualidade de código assegurada por hooks e verificações pré-commit.',
  'Foco total na entrega de valor e regras de negócio específicas.',
];

export function ProblemSection(): ReactElement {
  return (
    <section
      data-testid="problem-section"
      id="secao-2"
      className="border-b border-slate-200 bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
            Pare de refazer o mesmo setup em todo projeto
          </h2>

          <p className="text-base text-slate-600">
            Criar uma página não deveria começar com horas de configuração antes
            do primeiro componente.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-rose-200 bg-rose-50/60 p-8">
            <div className="flex items-center space-x-3 font-semibold text-rose-600">
              <span>⚠️</span>
              <span>O setup que atrasa seu projeto</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-2">
                  ❌ {problem}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-8">
            <div className="flex items-center space-x-3 font-semibold text-indigo-700">
              <span>🎯</span>
              <span>O que você recebe pronto</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-2">
                  ✅ {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
