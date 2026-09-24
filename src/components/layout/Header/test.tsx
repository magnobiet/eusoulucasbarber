import { render, screen } from '@testing-library/react';

import { Header } from './';

describe('Header', () => {
  it('renders the navigation and GitHub link', () => {
    render(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /next\.js template/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Visão geral' })).toHaveAttribute(
      'href',
      '#secao-1',
    );
    expect(
      screen.getByRole('link', { name: /ver no github/i }),
    ).toHaveAttribute('href', 'https://github.com/magnobiet/template-nextjs');
  });
});
