import { render, screen } from '@testing-library/react';

import { ProblemSection } from './';

describe('ProblemSection', () => {
  it('renders four problems and four solutions', () => {
    render(<ProblemSection />);

    expect(screen.getByTestId('problem-section')).toHaveAttribute(
      'id',
      'secao-2',
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Pare de refazer o mesmo setup em todo projeto',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(
      screen.getByText('O setup que atrasa seu projeto'),
    ).toBeInTheDocument();
    expect(screen.getByText('O que você recebe pronto')).toBeInTheDocument();
  });
});
