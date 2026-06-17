---
trigger: model_decision
description: "Write a load and performance testing plan for a service. Use when asked to create a performance test plan, write load testing documentation, define stress or soak test scenarios, or set performance regression gates for CI. Produces a complete test plan document with scenario definitions, k6/Locust script skeleton, threshold table, result interpretation guide, and CI integration steps."
---

# Load Testing Plan Skill

Produce a complete load and performance testing plan for a service — covering test objectives, scenario definitions, tooling configuration, success thresholds, and CI integration. A good load testing plan eliminates ambiguity about what "performance is acceptable" means, so engineers can run tests and get a pass/fail answer without having to interpret raw numbers themselves.

## Required Inputs

Ask for these if not already provided:
- **Service name and key endpoints** — which endpoints are under test (path, method, typical request/response shape)
- **Current traffic baseline** — current requests/sec, p50/p99 latency, error rate under normal load
- **Peak traffic expectations** — expected peak RPS (e.g. 10× baseline for flash sales, or seasonality peak)
- **SLO targets** — latency SLOs (p99 < X ms), error rate SLO (< Y%), availability target
- **Preferred testing tool** — k6, Locust, JMeter, Gatling, or no preference
- **Test environment availability** — dedicated load test environment, staging, or production (with traffic shaping)

## Output Format

---

# Load Testing Plan: [Service Name]

**Author:** [Name] | **Team:** [Team name]
**Date:** [Date] | **Review cycle:** Before each major release and quarterly
**Testing tool:** [k6 / Locust / JMeter / Gatling]
**Test environment:** [Environment name and URL]

---

## 1. Objectives and Scope

**What we are testing:** [Service name] handles [describe function — e.g. "user authentication requests from the mobile and web clients"]. This plan validates that the service meets its SLOs under expected and elevated traffic conditions.

**In scope:**
- [Endpoint 1: METHOD /path — description]
- [Endpoint 2: METHOD /path — description]
- [Endpoint 3: METHOD /path — description]

**Out of scope:**
- [Any endpoints explicitly excluded and why — e.g. "admin APIs — low traffic, excluded from load test"]
- [Third-party integrations that cannot be load-tested — mock them instead]

---

## 2. Performance Targets (Success Criteria)

Every scenario has explicit pass/fail thresholds. A test run FAILS if any threshold is breached.

| Metric | Baseline scenario | Stress scenario | Spike scenario | Soak scenario |
|---|---|---|---|---|
| p50 latency | < [X] ms | < [X × 1.5] ms | < [X × 2] ms | < [X] ms |
| p95 latency | < [Y] ms | < [Y × 1.5] ms | < [Y × 2] ms | < [Y] ms |
| p99 latency | < [Z] ms | < [Z × 2] ms | < [Z × 3] ms | < [Z] ms |
| Error rate | < [0.1]% | < [1]% | < [2]% | < [0.1]% |
| Throughput | ≥ [N] RPS | ≥ [N × 3] RPS | N/A | ≥ [N] RPS |
| Failed requests | 0 (5xx) | < [threshold] | < [threshold] | 0 (5xx) |

**SLO reference:** These thresholds are derived from the service SLOs — p99 < [Z ms], error rate < [0.1]%, availability [99.9]%.

---

## 3. Traffic Model

**Baseline traffic (current production):**
- Average RPS: [N] req/sec
- Peak RPS (observed): [N] req/sec
- Request distribution by endpoint:
  - [Endpoint 1]: [X]% of traffic
  - [Endpoint 2]: [Y]% of traffic
  - [Endpoint 3]: [Z]% of traffic

**Simulated user behaviour:**
- Think time between requests: [X–Y] seconds (randomised)
- Session duration: [N] minutes average
- Authenticated vs anonymous ratio: [X]%/[Y]%
- Geographic distribution: [Region 1 X]%, [Region 2 Y]%

---

## 4. Test Scenarios

### Scenario 1: Baseline (Steady-State)

**Purpose:** Confirm the service performs acceptably under normal production load.
**Duration:** 10 minutes
**Load profile:** Ramp to [N] RPS over 2 minutes, hold for 8 minutes.
**Concurrency:** [N] virtual users

**Pass criteria:** All thresholds in the Baseline column of the targets table above.

---

### Scenario 2: Stress Test

**Purpose:** Find the breaking point — how much load can the service handle before SLOs are breached?
**Duration:** 20–30 minutes
**Load profile:** Ramp from [N] RPS (baseline) to [N × 5] RPS in 5-minute steps. Hold each step for 5 minutes. Stop at first SLO breach.
**Concurrency:** Scales with RPS target

**What to record:**
- RPS at which p99 latency first exceeds SLO
- RPS at which error rate first exceeds SLO
- Whether the service recovers when load drops back to baseline

---

### Scenario 3: Spike Test

**Purpose:** Simulate a sudden traffic surge (flash sale, viral event, bot attack).
**Duration:** 15 minutes
**Load profile:** Hold at [N] RPS (baseline) for 3 minutes, spike to [N × 10] RPS instantly, hold for 5 minutes, drop back to baseline for 7 minutes.

**What to record:**
- Latency during spike and recovery
- Whether the service sheds load gracefully (rate limiting, queue depth)
- Time to recover to baseline latency after spike ends

---

### Scenario 4: Soak / Endurance Test

**Purpose:** Detect memory leaks, connection pool exhaustion, and slow degradation over time.
**Duration:** 4–8 hours (run overnight)
**Load profile:** Steady [N × 1.5] RPS (50% above baseline) for entire duration.

**What to watch:**
- Memory usage trend over time (should not grow unboundedly)
- Error rate trend (should be flat, not creeping up)
- GC pause frequency (JVM/Go services)
- Database connection pool utilisation
- p99 latency trend (should not creep up over hours)

---

## 5. Test Environment Requirements

### Infrastructure

| Component | Requirement | Notes |
|---|---|---|
| Service under test | Isolated from production | [N] replicas, matching prod resource limits |
| Database | Separate instance with production-scale data | Seed script in section 7 |
| Cache (Redis/Memcached) | Empty at test start | Ensures cold-start conditions are tested |
| Load generator | Separate from service under test | [N] vCPUs, [N] GB RAM minimum |
| Network | Low-latency path to service | Do not run generator on same host |

### Data Seeding

Before every test run, ensure the environment has:
```bash
# Seed test users (needed for authenticated endpoint tests)
[seed command or script path — e.g. python scripts/seed_load_test_users.py --count 10000]

# Seed test data for read endpoints
[seed command — e.g. ./scripts/seed_products.sh --count 50000]

# Verify seed completed
[verification command — e.g. psql $DB_URL -c "SELECT COUNT(*) FROM users WHERE load_test=true"]
```

**Test data rules:**
- Never use real production user data in load tests
- Tag all test-generated records with `load_test=true` for easy cleanup
- Run cleanup after each test: `[cleanup command]`

---

## 6. Tooling Setup

### k6 Script Skeleton

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('error_rate');
const endpointLatency = new Trend('endpoint_latency', true);

// Test configuration — override per scenario
export const options = {
  scenarios: {
    baseline: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: [BASELINE_VUS] },
        { duration: '8m', target: [BASELINE_VUS] },
        { duration: '1m', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: [
      'p(95)<[Y_MS]',
      'p(99)<[Z_MS]',
    ],
    error_rate: ['rate<0.01'],
    http_req_failed: ['rate<0.01'],
  },
};

// Auth helper — get token once per VU
export function setup() {
  const loginRes = http.post('[BASE_URL]/auth/login', JSON.stringify({
    username: `load_test_user_${Math.floor(Math.random() * 10000)}@example.com`,
    password: '[LOAD_TEST_PASSWORD]',
  }), { headers: { 'Content-Type': 'application/json' } });

  check(loginRes, { 'login ok': (r) => r.status === 200 });
  return { token: loginRes.json('access_token') };
}

export default function (data) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
    'Content-Type': 'application/json',
  };

  // Endpoint 1: [Description]
  const res1 = http.get('[BASE_URL]/[endpoint-1]', { headers });
  check(res1, {
    '[endpoint-1] status 200': (r) => r.status === 200,
    '[endpoint-1] latency < [X]ms': (r) => r.timings.duration < [X],
  });
  errorRate.add(res1.status >= 400);
  endpointLatency.add(res1.timings.duration, { endpoint: '[endpoint-1]' });

  sleep(Math.random() * [THINK_TIME_MAX] + [THINK_TIME_MIN]);

  // Endpoint 2: [Description]
  const res2 = http.post('[BASE_URL]/[endpoint-2]',
    JSON.stringify({ [key]: '[value]' }),
    { headers }
  );
  check(res2, {
    '[endpoint-2] status 201': (r) => r.status === 201,
  });
  errorRate.add(res2.status >= 400);
}
```

### Locust Script Skeleton (alternative)

```python
from locust import HttpUser, task, between
import random

class [ServiceName]User(HttpUser):
    wait_time = between([THINK_TIME_MIN], [THINK_TIME_MAX])
    token = None

    def on_start(self):
        """Called once per simulated user — authenticate."""
        user_id = random.randint(1, 10000)
        response = self.client.post("/auth/login", json={
            "username": f"load_test_user_{user_id}@example.com",
            "password": "[LOAD_TEST_PASSWORD]",
        })
        self.token = response.json()["access_token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}

    @task([WEIGHT_1])  # Weight = relative frequency
    def [endpoint_1_task](self):
        """[Endpoint 1 description]"""
        with self.client.get(
            "/[endpoint-1]",
            headers=self.headers,
            catch_response=True
        ) as response:
            if response.elapsed.total_seconds() > [LATENCY_THRESHOLD]:
                response.failure(f"Too slow: {response.elapsed.total_seconds()}s")

    @task([WEIGHT_2])
    def [endpoint_2_task](self):
        """[Endpoint 2 description]"""
        self.client.post(
            "/[endpoint-2]",
            json={"[key]": "[value]"},
            headers=self.headers,
        )
```

### Running Tests

```bash
# k6 — run baseline scenario
k6 run --env BASE_URL=https://[test-env-url] scripts/load_test.js

# k6 — run stress scenario with output to InfluxDB
k6 run --out influxdb=http://[influxdb-host]:8086/k6 \
  --env SCENARIO=stress \
  scripts/load_test.js

# Locust — headless run
locust -f locustfile.py \
  --headless \
  --users [N] \
  --spawn-rate [N] \
  --run-time 10m \
  --host https://[test-env-url] \
  --csv=results/[run-id]

# Locust — web UI (interactive)
locust -f locustfile.py --host https://[test-env-url]
```

---

## 7. Metrics to Capture

Capture all of the following during every test run. Missing any of these makes result comparison unreliable.

| Metric | Source | Why it matters |
|---|---|---|
| p50, p95, p99, p999 latency per endpoint | Load tool | SLO validation |
| Error rate (4xx, 5xx) per endpoint | Load tool | SLO validation |
| Requests/sec (throughput) | Load tool | Capacity baseline |
| CPU utilisation (%) | Infra monitoring | Saturation signal |
| Memory utilisation (%) | Infra monitoring | Leak detection |
| GC pause time / frequency | JVM/Go metrics | Latency spike root cause |
| DB connection pool: active/idle/waiting | DB metrics | Pool exhaustion detection |
| DB query latency (p99) | DB metrics | Downstream bottleneck |
| Cache hit rate | Cache metrics | Miss storm detection |
| Pod/instance count (if autoscaling) | Infra | Scaling behaviour |
| Network in/out bytes | Infra | Bandwidth saturation |

---

## 8. Result Analysis Framework

After each test run, work through this analysis in order:

**Step 1 — Pass/fail check**
Compare all captured metrics against the thresholds in Section 2. Record pass/fail per scenario.

**Step 2 — Latency distribution**
Plot the full latency histogram, not just percentiles. A bimodal distribution (two humps) indicates two distinct code paths — investigate the slow hump.

**Step 3 — Error correlation**
If errors occurred, correlate them with:
- Time of occurrence (was it during ramp-up, steady state, or spike?)
- Specific endpoint (is it one endpoint or all?)
- Infrastructure events (CPU spike, OOM, DB connection exhaustion?)

**Step 4 — Saturation analysis**
Graph CPU, memory, and connection pool over time. If any resource reached 80%+ of capacity, it is a candidate bottleneck — even if SLOs passed this run.

**Step 5 — Compare to baseline run**
Every run should be compared to the previous run. A 10% regression in p99 latency warrants investigation even if it is still within SLO.

**Regression classification:**

| Change | Classification | Action |
|---|---|---|
| p99 within 5% of previous run | Green — no regression | No action |
| p99 5–15% worse than previous | Yellow — watch | Investigate before next release |
| p99 >15% worse than previous | Red — regression | Block release, file ticket |
| Error rate increased vs previous | Red — regression | Block release |
| SLO threshold breached | Critical | Block release, page on-call |

---

## 9. CI Integration

Add load tests as a gated step in the release pipeline. Run the baseline scenario on every release candidate; run all scenarios weekly.

```yaml
# Example: GitHub Actions step (adapt for your CI platform)
load-test:
  runs-on: ubuntu-latest
  needs: [deploy-staging]
  if: github.ref == 'refs/heads/main'
  steps:
    - uses: actions/checkout@v3

    - name: Install k6
      run: |
        curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
        echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
        sudo apt-get update && sudo apt-get install k6

    - name: Seed test data
      run: [seed command]

    - name: Run baseline load test
      run: |
        k6 run \
          --env BASE_URL=${{ secrets.LOAD_TEST_ENV_URL }} \
          --out json=results.json \
          scripts/load_test.js
      env:
        LOAD_TEST_ENV_URL: ${{ secrets.LOAD_TEST_ENV_URL }}

    - name: Check thresholds
      run: |
        # k6 exits with non-zero if any threshold fails — this step fails the build
        echo "k6 threshold check complete"

    - name: Upload results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: load-test-results-${{ github.run_id }}
        path: results.json

    - name: Cleanup test data
      if: always()
      run: [cleanup command]
```

**CI gates summary:**
- Baseline scenario runs on every release to staging
- Full scenario suite (stress, spike, soak) runs weekly on a schedule
- Any threshold failure blocks promotion to production
- Results are archived for trend analysis

---

## Quality Checks

- [ ] All key endpoints are covered by at least one test scenario — no production endpoint is untested
- [ ] Thresholds are derived from actual SLO targets, not guesses
- [ ] Test data seeding is scripted and reproducible — tests do not rely on pre-existing environment state
- [ ] The load generator runs on separate infrastructure from the service under test
- [ ] CI integration blocks promotion on threshold failure — not just records results
- [ ] Soak test has been run at least once to establish a memory and connection pool baseline
- [ ] Results comparison to previous run is part of the analysis — not just absolute pass/fail

## Anti-Patterns

- [ ] Do not set thresholds without grounding them in actual SLO targets or production baselines — arbitrary numbers produce meaningless pass/fail results
- [ ] Do not run the load generator on the same host as the service under test — this contaminates both the test results and the service metrics
- [ ] Do not use production user data in load test seeding — all test data must be synthetic, tagged, and cleaned up after each run
- [ ] Do not skip the soak test on first deployment — only a soak test reveals slow memory leaks and connection pool exhaustion that short tests miss
- [ ] Do not treat a passing baseline test as evidence the service handles spikes — baseline, stress, spike, and soak scenarios test fundamentally different failure modes
