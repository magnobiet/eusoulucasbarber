import { render, screen } from '@testing-library/react';

import { Footer } from './';

describe('Footer', () => {
  it('renders the license link', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'MIT' })).toHaveAttribute(
      'href',
      'https://license.magnobiet.com/mit/2026',
    );
  });
});
