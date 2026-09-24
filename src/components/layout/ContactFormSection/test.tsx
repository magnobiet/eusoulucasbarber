import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactFormSection } from './';

describe('ContactFormSection', () => {
  it('renders the section content and contact fields', () => {
    render(<ContactFormSection />);

    expect(screen.getByTestId('contact-form-section')).toHaveAttribute(
      'id',
      'contato',
    );
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Vamos tirar sua ideia do papel?',
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(screen.getByLabelText(/e-mail/i)).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(screen.getByLabelText(/e-mail/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/telefone/i)).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(screen.getByLabelText(/telefone/i)).toHaveAttribute('type', 'tel');
    expect(screen.getByLabelText(/estado/i)).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(screen.getByLabelText(/cidade/i)).toBeDisabled();
    expect(screen.getByLabelText(/mensagem/i)).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(
      screen.getByRole('button', { name: 'Enviar mensagem' }),
    ).toHaveAttribute('type', 'submit');
  });

  it('renders every Brazilian state as an option', () => {
    render(<ContactFormSection />);

    expect(screen.getByRole('option', { name: 'Acre' })).toHaveValue('AC');
    expect(
      screen.getByRole('option', { name: 'Distrito Federal' }),
    ).toHaveValue('DF');
    expect(screen.getByRole('option', { name: 'São Paulo' })).toHaveValue('SP');
    expect(screen.getAllByRole('option')).toHaveLength(29);
  });
});

describe('ContactFormSection phone', () => {
  it('applies the Brazilian phone mask', async () => {
    const user = userEvent.setup();
    render(<ContactFormSection />);

    const phoneInput = screen.getByLabelText(/telefone/i);
    await user.type(phoneInput, '11999999999');

    expect(phoneInput).toHaveValue('(11) 99999-9999');
  });

  it.each([
    ['an invalid area code', '08478978978', '(08) 47897-8978'],
    ['a mobile number not starting with 9', '11899999999', '(11) 89999-9999'],
  ])('keeps the mask but rejects %s', async (_scenario, value, maskedValue) => {
    const user = userEvent.setup();
    render(<ContactFormSection />);

    const phoneInput = screen.getByLabelText(/telefone/i);
    await user.type(phoneInput, value);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(phoneInput).toHaveValue(maskedValue);
    expect(
      await screen.findByText('Informe um telefone válido'),
    ).toBeInTheDocument();
  });
});

describe('ContactFormSection validation', () => {
  it('requires email and phone', async () => {
    const user = userEvent.setup();
    render(<ContactFormSection />);

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByText('Informe seu e-mail')).toBeInTheDocument();
    expect(screen.getByText('Informe seu telefone')).toBeInTheDocument();
  });

  it('shows validation errors for invalid fields', async () => {
    const user = userEvent.setup();
    render(<ContactFormSection />);

    await user.type(screen.getByLabelText(/nome/i), 'A');
    await user.type(screen.getByLabelText(/e-mail/i), 'email-invalido');
    await user.type(screen.getByLabelText(/telefone/i), '123');
    await user.type(screen.getByLabelText(/mensagem/i), 'Curta');
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText('Informe seu nome com pelo menos 2 caracteres'),
    ).toBeInTheDocument();
    expect(screen.getByText('Informe um e-mail válido')).toBeInTheDocument();
    expect(screen.getByText('Informe um telefone válido')).toBeInTheDocument();
    expect(
      screen.getByText('Selecione um estado', { selector: 'p' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('A mensagem deve ter pelo menos 10 caracteres'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
