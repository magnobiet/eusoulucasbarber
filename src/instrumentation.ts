import * as Sentry from '@sentry/nextjs';
import { environment } from './environment';

export async function register(): Promise<void> {
  if (environment.NODE_ENV !== 'production') {
    return;
  }

  if (environment.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  } else if (environment.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
