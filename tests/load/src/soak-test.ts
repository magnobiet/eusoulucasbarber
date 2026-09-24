/**
 * @fileoverview Maintains average load for an extended period to verify
 * stability, performance degradation, and potential resource leaks.
 * @see https://grafana.com/docs/k6/latest/testing-guides/test-types/soak-testing/
 */
import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { Options } from 'k6/options';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options: Options = {
  stages: [
    { duration: '1m', target: 5 },
    { duration: '10m', target: 5 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
    'http_req_duration{name:SoakTestRequest}': ['p(95)<1000'],
    checks: ['rate>0.99'],
  },
};

export default function soakTest(): void {
  group('Soak Test', () => {
    const url = `${BASE_URL}/`;

    const response = http.get(url, { tags: { name: 'SoakTestRequest' } });

    check(response, {
      'status returned 200': ({ status }) => status === 200,
      'response time below 1000ms': ({ timings }) => timings.duration < 1000,
      'response body is not empty': ({ body }) =>
        body !== null &&
        (typeof body === 'string' ? body.length > 0 : body.byteLength > 0),
    });

    sleep(1);
  });
}
