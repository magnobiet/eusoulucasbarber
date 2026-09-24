import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const environment = createEnv({
  server: {
    CI: z.coerce.boolean().optional(),
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).default('nodejs'),
    NODE_ENV: z
      .enum(['development', 'test', 'staging', 'production'])
      .default('development'),
    BASE_URL: z.url().default('http://localhost:3000'),

    VERCEL_WEB_ANALYTICS_ENABLED: z.coerce.boolean().optional().default(false),
    VERCEL_WEB_ANALYTICS_DEBUG_ENABLED: z.coerce
      .boolean()
      .optional()
      .default(false),

    GOOGLE_ANALYTICS_ID: z.string().startsWith('G-').optional(),
  },
  client: {},
  runtimeEnv: {
    CI: process.env.CI,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,

    VERCEL_WEB_ANALYTICS_ENABLED: process.env.VERCEL_WEB_ANALYTICS_ENABLED,
    VERCEL_WEB_ANALYTICS_DEBUG_ENABLED:
      process.env.VERCEL_WEB_ANALYTICS_DEBUG_ENABLED,

    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },
});
