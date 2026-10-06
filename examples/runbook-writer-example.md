# Example: runbook-writer

## What this skill does

Writes an operational runbook: trigger conditions, prerequisites, step-by-step procedure with verification at each step, rollback, a troubleshooting table and escalation paths.

## How to trigger it

### Example 1: an incident runbook from a past outage

**You say:**
> "Runbook for 'payment service high error rate'. From last month's incident: check the dashboard, usual causes are provider timeouts or connection-pool exhaustion; restart drains the pool; escalate to payments on-call if provider status page shows degradation."

**Claude produces (excerpt):**

**Runbook:** Payment service: high error rate
**Type:** Incident Response | **Severity:** P1
**Owner:** [payments team]

### Overview
**When to use this runbook:**
- PagerDuty alert: `high-error-rate-payment-service` (error rate > 2% for 5 min)

**Estimated time to complete:** 10 to 25 minutes depending on cause

### Procedure
1. **Confirm scope** [2 min]: open [dashboard link]; note error rate and affected endpoints.
   Verify: errors concentrated on `/charge` vs spread across all endpoints.
2. **Check provider status** [1 min]: [provider status page].
   If degraded: go to step 5 (escalation); a restart will not fix an upstream outage.
3. **Check connection pool** [2 min]: `kubectl exec ... -- curl localhost:9090/metrics | grep pool_in_use`.
   If in-use ≥ 95% of max: proceed to step 4.
4. **Rolling restart** [5 min]: `kubectl rollout restart deploy/payment-api`.
   Verify: error rate under 0.5% within 5 minutes of rollout completing.
5. **Escalate** if error rate persists 10 minutes after restart, or provider degradation confirmed: page `payments-oncall-secondary`; notify #incident-room.

### Rollback
A restart has no rollback; if a deploy preceded the alert by < 60 min, roll back that deploy first: [link to deploy runbook].

### Troubleshooting
| Symptom | Likely cause | Action |
|---|---|---|
| Errors only on `/charge` | provider timeout | step 2 |
| Pool at max, CPU normal | connection leak | step 4, then file leak ticket |

### Example 2: a deployment runbook

**You say:**
> "Runbook for deploying our monthly on-prem release to customer environments. Must cover the pre-flight backup and what to do when the schema migration fails halfway."

**Claude produces (excerpt):**

**Type:** Deployment

### Prerequisites
- [ ] Customer snapshot/backup completed and restore-tested within 24h (step 0 is the rollback)
- [ ] Maintenance window confirmed in writing with [customer contact]

### Procedure (excerpt)
4. **Run schema migration** [5-20 min]: `./migrate --to [version]`.
   Verify: `./migrate --status` reports clean at target version.

### Rollback: migration fails mid-way
1. Do not retry blindly; capture `migrate.log` first.
2. `./migrate --rollback-to [previous]`; if the tool reports a dirty state, restore the step-0 snapshot (this is why it is non-skippable).

## Tips for best results

- Give the real alert names, commands and links; a runbook with placeholders fails at 3am.
- Describe the last real incident; the troubleshooting table is built from what actually happened.
- State verification for every step; a step without a check is a guess under pressure.

## Related skills

- `incident-postmortem` to turn the incident this runbook handles into lessons
- `oncall-handoff` for passing the pager along with the runbooks
