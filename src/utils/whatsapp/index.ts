export function createWhatsAppUrl(phone: string, message?: string): string {
  const digits = phone.replaceAll(/\D/g, '');
  const url = `https://api.whatsapp.com/send?phone=${digits}`;

  return message ? `${url}&text=${encodeURIComponent(message)}` : url;
}
