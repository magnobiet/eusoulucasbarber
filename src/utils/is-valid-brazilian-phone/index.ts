import parsePhoneNumber from 'libphonenumber-js/max';

export function isValidBrazilianPhone(phone: string): boolean {
  const digits = phone.replaceAll(/\D/g, '');
  const parsedPhone = parsePhoneNumber(phone, {
    defaultCountry: 'BR',
    extract: false,
  });

  return (
    parsedPhone?.country === 'BR' &&
    parsedPhone.nationalNumber === digits &&
    parsedPhone.isValid()
  );
}
