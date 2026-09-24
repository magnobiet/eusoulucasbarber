import type { MetadataRoute } from 'next';
import { config } from '../config';

const { pageTitle, shortTitle, description, theme } = config;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: pageTitle,
    short_name: shortTitle,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: theme.background,
    theme_color: theme.background,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
