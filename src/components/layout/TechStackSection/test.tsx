import { render, screen } from '@testing-library/react';

import { TechStackSection } from './';

describe('TechStackSection', () => {
  it('renders every technology with its description', () => {
    render(<TechStackSection />);

    expect(screen.getByTestId('tech-stack-section')).toHaveAttribute(
      'id',
      'secao-3',
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(15);
    expect(screen.getByText('GitHub & Actions')).toBeInTheDocument();
    expect(
      screen.getByText('CI/CD automatizado para lint, testes e deploy.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Knip')).toBeInTheDocument();
    expect(screen.getByText('Google Analytics')).toBeInTheDocument();
    expect(screen.getByText('Cookiebot')).toBeInTheDocument();
    expect(screen.getByText('Upstash')).toBeInTheDocument();
  });
});
