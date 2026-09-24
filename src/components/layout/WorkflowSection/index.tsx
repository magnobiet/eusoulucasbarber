import type { ReactElement } from 'react';

const workflowSteps = [
  {
    title: 'Clone e Instale',
    description:
      'Abra a página de geração, escolha o nome do repositório e clique em “Create”. Depois, clone o projeto localmente.',
    command: 'git clone repo-url && npm install',
  },
  {
    title: 'Valide e Teste',
    description:
      'Instale as dependências e rode as verificações locais antes de começar a construir sua página.',
    command: 'npm run test && npm run lint',
  },
  {
    title: 'Deploy Automatizado',
    description:
      'Faça o push para o GitHub e acompanhe o pipeline de lint, testes e validações automatizadas.',
    command: 'git push origin main',
  },
];

export function WorkflowSection(): ReactElement {
  return (
    <section
      data-testid="workflow-section"
      id="secao-4"
      className="border-b border-slate-200 bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
            Do repositório ao primeiro deploy
          </h2>

          <p className="text-base text-slate-600">
            Crie seu repositório no GitHub, instale as dependências e publique
            sua página com as verificações essenciais já configuradas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <div className="mb-2 font-mono text-sm font-bold text-indigo-600">
                ETAPA 0{index + 1}
              </div>

              <h3 className="mb-2 text-lg font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mb-4 text-sm text-slate-600">{step.description}</p>

              <code className="block rounded-lg bg-slate-900 p-3 font-mono text-xs text-indigo-400">
                {step.command}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
