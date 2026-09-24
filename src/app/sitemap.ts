import type { MetadataRoute } from 'next';
import { environment } from '~/environment';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: environment.BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
