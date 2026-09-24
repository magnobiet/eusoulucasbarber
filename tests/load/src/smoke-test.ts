/**
 * @fileoverview Quickly validates the endpoint under minimal load and provides
 * a baseline after changes to the script or application.
 * @see https://grafana.com/docs/k6/latest/testing-guides/test-types/smoke-testing/
 */
import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { Options } from 'k6/options';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options: Options = {
  vus: 2,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    'http_req_duration{name:SmokeTestRequest}': ['p(95)<500'],
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    checks: ['rate>0.99'],
  },
};

export default function smokeTest(): void {
  group('Smoke Test', () => {
    const url = `${BASE_URL}/`;

    const response = http.get(url, { tags: { name: 'SmokeTestRequest' } });

    check(response, {
      'status returned 200': ({ status }) => status === 200,
      'response time below 500ms': ({ timings }) => timings.duration < 500,
      'response body is not empty': ({ body }) =>
        body !== null &&
        (typeof body === 'string' ? body.length > 0 : body.byteLength > 0),
    });

    sleep(1);
  });
}
