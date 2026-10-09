import { createWhatsAppUrl } from './index';

describe('createWhatsAppUrl', () => {
  it('should keep only the digits of the phone number', () => {
    expect(createWhatsAppUrl('+55 (54) 99190-9175')).toBe(
      'https://api.whatsapp.com/send?phone=5554991909175',
    );
  });

  it('should append the encoded message when provided', () => {
    expect(createWhatsAppUrl('+5554991909175', 'Olá Lucas! Tudo bem?')).toBe(
      'https://api.whatsapp.com/send?phone=5554991909175&text=Ol%C3%A1%20Lucas!%20Tudo%20bem%3F',
    );
  });

  it('should ignore an empty message', () => {
    expect(createWhatsAppUrl('5554991909175', '')).toBe(
      'https://api.whatsapp.com/send?phone=5554991909175',
    );
  });
});
