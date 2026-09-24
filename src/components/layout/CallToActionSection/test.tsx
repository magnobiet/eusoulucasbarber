import { render, screen } from '@testing-library/react';

import { CallToActionSection } from './';

describe('CallToActionSection', () => {
  it('renders the section content', () => {
    render(<CallToActionSection />);

    expect(screen.getByTestId('call-to-action-section')).toHaveAttribute(
      'id',
      'secao-5',
    );
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Comece sem refazer o setup',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Seu próximo site começa aqui'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Use uma base pronta para landing pages e sites modernos. Crie seu repositório no GitHub e comece a trabalhar no que o projeto precisa.',
      ),
    ).toBeInTheDocument();
  });

  it('renders a secure external link to generate the template', () => {
    render(<CallToActionSection />);

    expect(
      screen.getByRole('link', { name: /usar template no github/i }),
    ).toHaveAttribute(
      'href',
      'https://github.com/magnobiet/template-nextjs/generate',
    );
    expect(
      screen.getByRole('link', { name: /usar template no github/i }),
    ).toHaveAttribute('target', '_blank');
    expect(
      screen.getByRole('link', { name: /usar template no github/i }),
    ).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
