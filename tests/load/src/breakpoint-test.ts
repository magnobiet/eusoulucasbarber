/**
 * @fileoverview Continuously increases the request rate to find the point at
 * which the system begins to degrade or fail.
 * @see https://grafana.com/docs/k6/latest/testing-guides/test-types/breakpoint-testing/
 */
import { check, group } from 'k6';
import http from 'k6/http';
import { Options } from 'k6/options';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options: Options = {
  scenarios: {
    breakpoint: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 5,
      maxVUs: 50,
      stages: [
        { duration: '1m', target: 10 },
        { duration: '1m', target: 20 },
      ],
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.05', abortOnFail: true }],
    http_req_duration: ['p(95)<5000'],
    'http_req_duration{name:BreakpointTestRequest}': ['p(95)<5000'],
  },
};

export default function breakpointTest(): void {
  group('Breakpoint Test', () => {
    const url = `${BASE_URL}/`;

    const response = http.get(url, { tags: { name: 'BreakpointTestRequest' } });

    check(response, {
      'status returned 200': ({ status }) => status === 200,
      'response body is not empty': ({ body }) =>
        body !== null &&
        (typeof body === 'string' ? body.length > 0 : body.byteLength > 0),
    });
  });
}
