/**
 * Validates the fixed-window rate limit configured in src/proxy.ts.
 *
 * The proxy allows 30 requests per minute for one identifier. This scenario
 * deliberately sends 31 sequential requests with the same forwarded IP so
 * the final request must be rejected with the rate-limit response contract.
 */
import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { Options } from 'k6/options';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const RATE_LIMIT_CLIENT_ID = __ENV.RATE_LIMIT_CLIENT_ID || '198.51.100.42';
const RATE_LIMIT = 30;

const successfulRequests = new Counter('rate_limit_successful_requests');
const rejectedRequests = new Counter('rate_limit_rejected_requests');
const recoveryRequests = new Counter('rate_limit_recovery_requests');

export const options: Options = {
  scenarios: {
    rateLimit: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: RATE_LIMIT + 1,
      maxDuration: '90s',
    },
  },
  thresholds: {
    checks: ['rate==1'],
    rate_limit_successful_requests: [`count==${RATE_LIMIT}`],
    rate_limit_rejected_requests: ['count==1'],
    rate_limit_recovery_requests: ['count==1'],
    'http_req_duration{name:RateLimitRequest}': ['p(95)<1000'],
    'http_req_duration{name:RateLimitRecoveryRequest}': ['p(95)<1000'],
  },
};

export default function rateLimitTest(): void {
  group('Rate Limit Test', () => {
    const requestNumber = __ITER + 1;
    const response = http.get(`${BASE_URL}/`, {
      headers: {
        'x-forwarded-for': RATE_LIMIT_CLIENT_ID,
      },
      tags: { name: 'RateLimitRequest' },
    });
    const shouldBeRejected = requestNumber > RATE_LIMIT;

    if (shouldBeRejected) {
      rejectedRequests.add(1);
    } else {
      successfulRequests.add(1);
    }

    check(response, {
      [`request ${requestNumber} has the expected status`]: ({ status }) =>
        status === (shouldBeRejected ? 429 : 200),
      ...(shouldBeRejected
        ? {
            '429 response contains the error': ({ body }) =>
              typeof body === 'string' && body.includes('Too many requests'),
            '429 response includes rate-limit headers': ({ headers }) =>
              headers['X-Ratelimit-Limit'] === String(RATE_LIMIT) &&
              headers['X-Ratelimit-Remaining'] === '0' &&
              typeof headers['X-Ratelimit-Reset'] === 'string' &&
              typeof headers['Retry-After'] === 'string',
          }
        : {
            'successful response includes rate-limit headers': ({ headers }) =>
              headers['X-Ratelimit-Limit'] === String(RATE_LIMIT) &&
              typeof headers['X-Ratelimit-Remaining'] === 'string' &&
              typeof headers['X-Ratelimit-Reset'] === 'string',
          }),
    });

    if (shouldBeRejected) {
      const retryAfter = Number(response.headers['Retry-After']);
      sleep(Number.isFinite(retryAfter) ? retryAfter + 1 : 1);

      const recoveryResponse = http.get(`${BASE_URL}/`, {
        headers: {
          'x-forwarded-for': RATE_LIMIT_CLIENT_ID,
        },
        tags: { name: 'RateLimitRecoveryRequest' },
      });

      recoveryRequests.add(1);

      check(recoveryResponse, {
        'request succeeds after Retry-After expires': ({ status }) =>
          status === 200,
        'recovered response includes reset rate-limit headers': ({ headers }) =>
          headers['X-Ratelimit-Limit'] === String(RATE_LIMIT) &&
          typeof headers['X-Ratelimit-Remaining'] === 'string' &&
          typeof headers['X-Ratelimit-Reset'] === 'string',
      });
    }
  });
}
