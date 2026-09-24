import { render, screen } from '@testing-library/react';

import { WorkflowSection } from './';

describe('WorkflowSection', () => {
  it('renders the three workflow steps and commands', () => {
    render(<WorkflowSection />);

    expect(screen.getByTestId('workflow-section')).toHaveAttribute(
      'id',
      'secao-4',
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getByText('ETAPA 01')).toBeInTheDocument();
    expect(screen.getByText('ETAPA 02')).toBeInTheDocument();
    expect(screen.getByText('ETAPA 03')).toBeInTheDocument();
    expect(
      screen.getByText('git clone repo-url && npm install'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('npm run test && npm run lint'),
    ).toBeInTheDocument();
    expect(screen.getByText('git push origin main')).toBeInTheDocument();
  });
});
