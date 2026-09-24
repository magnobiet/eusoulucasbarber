import { ConfigSchema, type Config } from './schema';

const data: Config = {
  language: 'pt-BR',
  pageTitle: 'Lucas Xavier | Barbeiro',
  shortTitle: 'Lucas Xavier',
  description:
    'Corte de cabelo, barba e visagismo masculino em Caxias do Sul. Atendimento com hora marcada.',
  theme: {
    background: '#140f0c',
    foreground: '#f1ede8',
  },
  contact: {
    phone: '+55 54 99190-9175',
    socialNetworks: [
      {
        platform: 'whatsapp',
        url: 'https://api.whatsapp.com/send?phone=5554991909175',
        handle: '+55 54 99190-9175',
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/eusoulucasbarber',
        handle: 'eusoulucasbarber',
      },
    ],
  },
  vcard: {
    firstName: 'Lucas',
    lastName: 'Xavier',
    fullName: 'Lucas Xavier',
    organization: 'Lucas Xavier',
    title: 'Barbeiro',
    phone: '+5554991909175',
    phoneType: ['cell', 'voice'],
    street: 'R. Cristiano Ramos de Oliveira, 407 - Loja 3',
    city: 'Caxias do Sul',
    region: 'RS',
    country: 'Brasil',
    url: 'https://instagram.com/eusoulucasbarber',
    note: 'Corte de cabelo, barba e visagismo masculino. Atendimento com hora marcada.',
  },
  opengraph: {
    eyebrow: 'Barbeiro',
    title: 'Lucas Xavier',
    subtitle: 'Corte, barba e visagismo masculino em Caxias do Sul.',
    badge: 'Atendimento com hora marcada.',
    footer: '@eusoulucasbarber',
    colors: {
      backgroundStart: '#140f0c',
      backgroundEnd: '#1a1410',
      eyebrowBackground: 'rgba(20, 15, 12, 0.8)',
      eyebrowBorder: 'rgba(195, 124, 51, 0.35)',
      eyebrowText: '#f1ede8',
      accentStart: '#c37c33',
      accentEnd: '#784312',
      text: '#f1ede8',
      muted: '#c7beb5',
    },
  },
  favicon: {
    text: 'LX',
    background: '#140f0c',
    foreground: '#c37c33',
  },
} as const;

export const config = ConfigSchema.parse(data);
