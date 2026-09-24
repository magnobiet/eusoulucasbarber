import * as Sentry from '@sentry/nextjs';
import { environment } from '~/environment';

export const logger = environment.SENTRY_DSN ? Sentry.logger : console;
