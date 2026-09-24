import { ConfigSchema, type Config } from './schema';

const data: Config = {
  language: 'pt-BR',
  pageTitle: 'Next.js Template',
  shortTitle: 'Next.js',
  description:
    'Uma base Next.js para criar sites e landing pages modernos sem começar do zero.',
  theme: {
    background: '#FFFFFF',
    foreground: '#000000',
  },
  contact: {
    phone: '+55 (11) 99999-9999',
    email: 'contato@localhost.com',
    socialNetworks: [
      {
        platform: 'facebook',
        url: 'https://facebook.com/minhaempresa',
        handle: 'minhaempresa',
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/minhaempresa',
        handle: 'minhaempresa',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/company/minhaempresa',
        handle: 'minhaempresa',
      },
      {
        platform: 'x',
        url: 'https://x.com/minhaempresa',
        handle: 'minhaempresa',
      },
      {
        platform: 'youtube',
        url: 'https://youtube.com/@minhaempresa',
        handle: '@minhaempresa',
      },
    ],
  },
  address: {
    street: 'Av. Paulista',
    number: '1000',
    complement: 'Sala 15',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    coordinates: {
      latitude: -23.561684,
      longitude: -46.655981,
    },
  },
  opengraph: {
    eyebrow: 'Boilerplate',
    title: 'Next.js Boilerplate',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    badge: 'Nunc ut metus nec velit ultricies pulvinar',
    footer: '@nextjs-boilerplate',
    colors: {
      backgroundStart: '#FFFFFF',
      backgroundEnd: '#E8E8E8',
      eyebrowBackground: 'rgba(255, 255, 255, 0.8)',
      eyebrowBorder: 'rgba(176, 176, 176, 0.35)',
      eyebrowText: '#151515',
      accentStart: '#151515',
      accentEnd: '#6B6B6B',
      text: '#0A0A0A',
      muted: '#6B6B6B',
    },
  },
  favicon: {
    text: '▲',
    background: '#000000',
    foreground: '#FFFFFF',
  },
} as const;

export const config = ConfigSchema.parse(data);
