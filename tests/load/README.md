# Grafana K6 Performance Testing: Comprehensive Reference Guide

This guide provides an in-depth reference for performance testing concepts, test types, statistical metrics, request lifecycle metrics, and recommended threshold configurations based on industry best practices with **Grafana k6**.

## 1. Overview of Performance Testing Types

Different test types target distinct aspects of system performance, scalability, and reliability. Choosing the correct test type ensures you catch bottlenecks before they reach production.

| Test Type           | Primary Purpose & Objective                                                                                                    | Typical Configuration           | When to Use                                                                                               |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------- |
| **Smoke Test**      | Sanity check to verify that your system works under minimal load and that your script executes without errors.                 | `2 VUs`, `30 seconds`           | Immediately after writing a new test script or deploying a minor build to verify basic functionality.     |
| **Load Test**       | Evaluate system performance and behavior under normal expected traffic conditions and standard operational capacity.           | `5 VUs`, `3 minutes`            | Before releasing a new feature or routine validation of API performance during normal peak hours.         |
| **Stress Test**     | Push the system beyond normal operational limits to determine its breaking point, stability ceiling, and failure behavior.     | `10 VUs`, `3.5 minutes`         | Capacity planning, stress resilience audits, and preparing for major traffic events (e.g., Black Friday). |
| **Spike Test**      | Assess how the application reacts to a sudden, extreme surge of traffic occurring almost instantaneously.                      | `0 → 20 VUs` in `10 seconds`    | Simulating viral marketing campaigns, flash sales, or breaking news alerts.                               |
| **Breakpoint Test** | Increase the request rate continuously until the system degrades or fails, identifying its operational limit.                  | `1 → 20 req/s` over `2 minutes` | Capacity-limit discovery after the system passes the other test types.                                    |
| **Soak Test**       | Uncover performance degradation, memory leaks, resource exhaustion, or database connection pool leaks over extended durations. | `5 VUs`, `12 minutes`           | Pre-production releases, long-term stability verification, and identifying slow memory degradation.       |

## 2. Understanding Statistical Metrics & Percentiles

When analyzing k6 test results, raw averages can be deceptive. A complete statistical breakdown helps uncover hidden latency issues.

| Stat        | Technical Definition                                      | What It Tells You Practically                                                                                                       |
| :---------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`avg`**   | Arithmetic mean of all observed values.                   | Provides a general overview, but is highly sensitive to outliers (skewed by extreme highs or lows).                                 |
| **`min`**   | The fastest single observed value in the run.             | Represents the best-case scenario (idealized performance under zero network contention).                                            |
| **`max`**   | The slowest single observed value in the run.             | Represents the worst-case scenario; often an isolated outlier or GC pause.                                                          |
| **`med`**   | Median (50th percentile) — the midpoint of sorted values. | Exactly 50% of all requests completed faster than this duration. Good baseline user experience indicator.                           |
| **`p(90)`** | 90th percentile response time.                            | 90% of all user requests completed within or faster than this timeframe.                                                            |
| **`p(95)`** | 95th percentile response time.                            | **Industry standard Service Level Objective (SLO) target.** Excludes extreme 5% outliers to represent real-world user satisfaction. |
| **`p(99)`** | 99th percentile (Tail Latency).                           | Measures the experience of the unluckiest 1% of users. Crucial for identifying severe edge-case bottlenecks.                        |

> 💡 **Pro Tip on Thresholds:** Never rely solely on the `avg` metric for performance pass/fail criteria. Average response times completely hide slow outliers. If your `p(95)` is 430ms, it means 95% of your users experienced a response time of 430ms or less. Always anchor your SLO thresholds to **`p(95)`** or **`p(99)`**.

## 3. Deep Dive into k6 Key Metrics

Grafana k6 automatically collects a robust set of built-in metrics during every execution. Understanding what each metric tracks helps you diagnose specific performance bottlenecks (network, database, server computation, or serialization).

### Request Performance & Timing

- **`http_req_duration`**: Total time for the complete HTTP request lifecycle (from sending the first byte of the request to receiving the final byte of the response). This is your primary performance indicator.

- **`http_req_waiting`**: Time spent waiting for the server's first byte (**TTFB — Time to First Byte**). Directly reflects server-side processing time, database query execution, and business logic overhead.

- **`http_req_connecting`**: Time spent establishing the TCP connection to the remote host. High values indicate network routing issues, distant server geography, or exhausted server connection queues.
- **`http_req_tls_handshaking`**: Time spent establishing the TLS/SSL secure handshake. Only applicable over HTTPS; high values point to cryptographic overhead or certificate chain issues.
- **`http_req_sending`**: Time spent sending the HTTP request data to the server (depends on client upload bandwidth and payload size).
- **`http_req_receiving`**: Time spent receiving response data from the server (depends on response payload size and network download bandwidth).

### Execution & System Health

- **`http_req_failed`**: Percentage of failed requests (defined as non-2xx or non-3xx HTTP status codes, or connection timeouts). **Goal:** Keep this at `0%` or exceptionally low under normal load.

- **`http_reqs`**: Total aggregate number of HTTP requests generated across all virtual users during the test run.

- **`vus`**: Current active count of Virtual Users executing code at any given second.
- **`vus_max`**: Maximum configured ceiling of virtual users allocated for the test run.
- **`iterations`**: Total number of times the default exported test function was successfully executed.
- **`data_received`**: Total volume of network data received from the system under test (useful for spotting oversized payload responses).
- **`data_sent`**: Total volume of network data transmitted to the system under test (useful for payload optimization audits).
- **`checks`**: Pass/fail counter tracking assertions defined inside your `check()` blocks.

## 4. Recommended Threshold Starting Points

Thresholds in k6 act as pass/fail gates for your CI/CD pipelines. If a threshold fails, k6 exits with a non-zero status code, preventing performance regressions from reaching production environments.

| Metric                            | Suggested Production Threshold                           | Rationale                                                                            |
| :-------------------------------- | :------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| **`http_req_duration` (`p(95)`)** | `< 500ms` for REST APIs<br>`< 2000ms` for full SSR pages | 500ms is the cognitive threshold where web applications feel instantaneous to users. |
| **`http_req_duration` (`p(99)`)** | `< 1500ms` for APIs                                      | Ensures tail latency doesn't degrade drastically for edge users.                     |
| **`http_req_failed`**             | `< 0.01` (Less than 1% error rate)                       | Ensures high system reliability and prevents unhandled exceptions under load.        |
| **`checks`**                      | `== 1.0` (100% pass rate)                                | Critical business assertions and schema validations must never fail under load.      |
