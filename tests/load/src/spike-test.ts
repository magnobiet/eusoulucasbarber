/**
 * @fileoverview Simulates a sudden and intense increase in endpoint traffic.
 * The scenario has no plateau; it ramps up quickly and tests recovery.
 * @see https://grafana.com/docs/k6/latest/testing-guides/test-types/spike-testing/
 */
import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { Options } from 'k6/options';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options: Options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<3000'],
    'http_req_duration{name:SpikeTestRequest}': ['p(95)<3000'],
    checks: ['rate>0.95'],
  },
};

export default function spikeTest(): void {
  group('Spike Test', () => {
    const url = `${BASE_URL}/`;

    const response = http.get(url, { tags: { name: 'SpikeTestRequest' } });

    check(response, {
      'status returned 200': ({ status }) => status === 200,
      'response time below 3000ms': ({ timings }) => timings.duration < 3000,
      'response body is not empty': ({ body }) =>
        body !== null &&
        (typeof body === 'string' ? body.length > 0 : body.byteLength > 0),
    });

    sleep(1);
  });
}
