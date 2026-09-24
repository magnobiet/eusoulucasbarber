/**
 * @fileoverview Pushes the system above average load to observe degradation.
 * Run after smoke and average-load tests, increasing the target carefully.
 * @see https://grafana.com/docs/k6/latest/testing-guides/test-types/stress-testing/
 */
import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { Options } from 'k6/options';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options: Options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '2m', target: 10 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
    'http_req_duration{name:StressTestRequest}': ['p(95)<2000'],
    checks: ['rate>0.95'],
  },
};

export default function stressTest(): void {
  group('Stress Test', () => {
    const url = `${BASE_URL}/`;

    const response = http.get(url, { tags: { name: 'StressTestRequest' } });

    check(response, {
      'status returned 200': ({ status }) => status === 200,
      'response time below 2000ms': ({ timings }) => timings.duration < 2000,
      'response body is not empty': ({ body }) =>
        body !== null &&
        (typeof body === 'string' ? body.length > 0 : body.byteLength > 0),
    });

    sleep(1);
  });
}
