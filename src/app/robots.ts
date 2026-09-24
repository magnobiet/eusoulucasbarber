import type { MetadataRoute } from 'next';
import { environment } from '~/environment';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${environment.BASE_URL}/sitemap.xml`,
  };
}
