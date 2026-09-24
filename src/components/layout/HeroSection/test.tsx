import { render, screen } from '@testing-library/react';

import { HeroSection } from './';

describe('HeroSection', () => {
  it('renders the main message, steps, and calls to action', () => {
    render(<HeroSection />);

    expect(screen.getByTestId('hero-section')).toHaveAttribute('id', 'secao-1');
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /crie sites modernos sem começar do zero/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(
      screen.getByRole('link', { name: 'Ver o que vem pronto' }),
    ).toHaveAttribute('href', '#secao-3');
    expect(
      screen.getByRole('link', { name: 'Usar Template no GitHub' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/magnobiet/template-nextjs/generate',
    );
  });
});
