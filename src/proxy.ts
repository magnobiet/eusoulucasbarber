import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { environment } from '~/environment';
import { logger } from './utils';

export const config = {
  matcher: ['/api/:path*'],
};

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse<unknown>> {
  if (
    !environment.UPSTASH_REDIS_REST_URL ||
    !environment.UPSTASH_REDIS_REST_TOKEN
  ) {
    return NextResponse.next();
  }

  const ratelimit = new Ratelimit({
    analytics: true,
    redis: new Redis({
      url: environment.UPSTASH_REDIS_REST_URL,
      token: environment.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.fixedWindow(30, '1m'),
  });

  const identifier =
    request.headers.get('x-forwarded-for')?.split(',', 1)[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const result = await ratelimit.limit(identifier);

  const rateLimitHeaders = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.reset),
  };

  if (!result.success) {
    const retryAfter = Math.max(
      0,
      Math.ceil((result.reset - Date.now()) / 1000),
    );

    logger.error(`[${identifier}] Rate limit exceeded`, {
      header: rateLimitHeaders,
    });

    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          'Retry-After': String(retryAfter),
        },
      },
    );
  }

  const response = NextResponse.next();

  for (const [name, value] of Object.entries(rateLimitHeaders)) {
    response.headers.set(name, value);
  }

  return response;
}
