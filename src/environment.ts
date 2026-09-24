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

    COOKIEBOT_ID: z.string().optional(),
    COOKIEBOT_BLOCKING_MODE: z.enum(['auto', 'manual']).optional(),

    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_DSN: z.url().includes('sentry.io').optional(),

    UPSTASH_REDIS_REST_URL: z.url().endsWith('upstash.io').optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    RESEND_API_KEY: z.string().startsWith('re_').optional(),

    CONFIGCAT_SDK_KEY: z.string().startsWith('configcat-sdk-1/').optional(),
  },
  client: {
    NEXT_PUBLIC_SENTRY_ORG: z.string().optional(),
    NEXT_PUBLIC_SENTRY_PROJECT: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.url().includes('sentry.io').optional(),
  },
  runtimeEnv: {
    CI: process.env.CI,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,

    VERCEL_WEB_ANALYTICS_ENABLED: process.env.VERCEL_WEB_ANALYTICS_ENABLED,
    VERCEL_WEB_ANALYTICS_DEBUG_ENABLED:
      process.env.VERCEL_WEB_ANALYTICS_DEBUG_ENABLED,

    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,

    COOKIEBOT_ID: process.env.COOKIEBOT_ID,
    COOKIEBOT_BLOCKING_MODE: process.env.COOKIEBOT_BLOCKING_MODE,

    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_DSN: process.env.SENTRY_DSN,

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

    NEXT_PUBLIC_SENTRY_ORG: process.env.NEXT_PUBLIC_SENTRY_ORG,
    NEXT_PUBLIC_SENTRY_PROJECT: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

    RESEND_API_KEY: process.env.RESEND_API_KEY,

    CONFIGCAT_SDK_KEY: process.env.CONFIGCAT_SDK_KEY,
  },
});
