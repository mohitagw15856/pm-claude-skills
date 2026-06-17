# On-Call Runbook Skill

Produce a complete on-call runbook for a service — giving the on-call engineer everything they need to respond confidently to alerts at 3am, without having to ask anyone for help.

A good on-call runbook reduces mean time to resolution (MTTR) by eliminating the "what do I do first?" problem. It is written for the on-call engineer who has just been paged and needs to act, not for someone calmly reading documentation.

## Required Inputs

Ask for these if not already provided:
- **Service name** and what it does
- **Team** and tech lead name
- **Alert list** — names of alerts that currently page on-call
- **Monitoring setup** — Datadog / Grafana / CloudWatch / PagerDuty / etc.
- **Common failure modes** — what breaks most often, and what fixes it
- **Escalation contacts** — who to call when on-call can't resolve it
- **Deployment setup** — can on-call roll back? How?
- **Service dependencies** — what does this service depend on, and what depends on it?

## Output Format

---

# On-Call Runbook: [Service Name]

**Team:** [Team name] | **Tech lead:** [Name]
**PagerDuty service:** [Link] | **Escalation policy:** [Policy name]
**Last updated:** [Date] | **Next review:** [Date + 90 days]

> **First time on-call for this service?** Read the [developer onboarding doc] first — it covers the architecture and how things work. This runbook assumes you understand the service.

---

## Quick Reference

**Dashboard:** [Link — the first thing to open when paged]
**Logs:** [Link — where to find logs]
**Runbook index:** Jump to the alert that paged you → [Alert list below]
**Can't resolve in 30 min?** Escalate to: [Name] via [Slack / PagerDuty]

**Rollback command (memorise this):**
```bash
[rollback command — e.g. kubectl rollout undo deployment/[service-name]]
```

---

## Escalation Matrix

| Situation | Escalate to | How | After how long |
|---|---|---|---|
| Can't diagnose the alert | [Tech lead name] | Slack DM / Phone | 30 minutes |
| Alert requires infra change | [Platform team] | `#platform` Slack | Immediately |
| Customer-facing impact | [CSM / Support lead] | `#incidents` Slack | Immediately (P1) |
| Database issue | [DBA or data team] | Slack / PagerDuty | Immediately |
| [Specific dependency] down | [[Dependency] on-call] | PagerDuty / Slack | Immediately |
| Extended outage (>1 hour) | [Engineering manager] | Phone | 1 hour |

**Contacts:**

| Name | Role | Slack | Phone |
|---|---|---|---|
| [Name] | Tech lead | @[handle] | [Number] |
| [Name] | Engineering manager | @[handle] | [Number] |
| [Name] | Platform / infra | @[handle] | [Number] |
| [Platform team] | Infra on-call | `#platform` | PagerDuty |

---

## Service Architecture (Quick View)

```
[Upstream callers]
        │
        ▼
[This Service]
        │
        ├──→ [Primary Database]
        ├──→ [Cache — e.g. Redis]
        └──→ [Downstream Service / Queue]
```

**If this service is down, these are affected:** [List downstream consumers]
**If these are down, this service is affected:** [List upstream dependencies]

---

## Alert Runbooks

### ALERT: [Alert Name 1 — e.g. HighErrorRate]

**What it means:** [Plain English — e.g. "More than 5% of API requests are returning 5xx errors in the last 5 minutes"]
**Severity:** P1 / P2 / P3
**SLO impact:** Yes / No — [If yes: this alert means the error budget is burning at [X]× rate]

**Step 1 — Acknowledge and assess**
```bash
# Check current error rate
[query or dashboard link]

# Check which endpoints are erroring
[query or command]
```

**Step 2 — Check recent changes**
```bash
# Any deploys in the last hour?
[command or link to deployment log]

# Recent config changes?
[where to check]
```

**Step 3 — Check dependencies**
```bash
# Is the database healthy?
[health check command or link]

# Is [downstream service] healthy?
[health check command or link]
```

**Step 4 — Diagnose**

| If you see | It means | Do this |
|---|---|---|
| [Error pattern 1] | [Cause] | [Action] |
| [Error pattern 2] | [Cause] | [Action] |
| [Error pattern 3] | [Cause] | [Action] |
| No clear pattern | Unknown cause | Escalate to [name] |

**Step 5 — Fix or mitigate**
```bash
# If caused by bad deploy — roll back:
[rollback command]

# If caused by [specific issue]:
[fix command]

# If caused by upstream dependency:
[mitigation — e.g. enable circuit breaker, reduce traffic, etc.]
```

**After resolving:**
- [ ] Confirm error rate has returned to baseline
- [ ] Check no downstream services were affected
- [ ] If P1: open a post-incident review — see [incident-postmortem skill]
- [ ] Update `#incidents` with resolution summary

---

### ALERT: [Alert Name 2 — e.g. HighLatency]

**What it means:** [e.g. "P99 response time has exceeded 1s for more than 3 consecutive minutes"]
**Severity:** P1 / P2 / P3
**SLO impact:** Yes — latency SLO breach

**Step 1 — Assess scope**
```bash
# Check which endpoints are slow
[query or dashboard — broken down by endpoint]

# Check if latency is across all regions or localised
[query or command]
```

**Step 2 — Common causes and fixes**

| Cause | Signal | Fix |
|---|---|---|
| Database slow queries | DB latency spike on dashboard | [Check slow query log: `command`] |
| Cache miss storm | Cache hit rate drops on dashboard | [command or action] |
| Memory pressure / GC | High memory on service dashboard | [command or action — e.g. restart, scale up] |
| Upstream service slow | Trace shows time in external call | Escalate to [service] on-call |
| Traffic spike | Request rate spike on dashboard | [Scale up: `command`] |

**Step 3 — Escalate if unresolved in 20 minutes**
Page [Tech lead] via PagerDuty / Slack.

---

### ALERT: [Alert Name 3 — e.g. DatabaseConnectionPoolExhausted]

**What it means:** [e.g. "The service has used all available database connections — new requests will fail"]
**Severity:** P1
**SLO impact:** Yes — will cause errors immediately

**Immediate mitigation:**
```bash
# Restart the service to flush stale connections
[restart command]

# Check current connection count
[DB connection query]
```

**Diagnose root cause after stabilising:**
```bash
# Check for long-running queries holding connections
[query]

# Check if a recent deploy changed connection pool config
[where to check]
```

**Resolution:** [e.g. "Increase pool size in config / kill long-running queries / scale the service"]

---

### ALERT: [Alert Name 4 — e.g. QueueBacklogHigh / ConsumerLag]

**What it means:** [e.g. "The message queue backlog exceeds 10,000 messages — consumers are not keeping up"]
**Severity:** P2
**SLO impact:** Depends — if queue backs up, downstream systems will receive delayed data

**Step 1 — Check consumer health**
```bash
# Are consumers running?
[command]

# Consumer error rate?
[dashboard or query]
```

**Step 2 — Check message contents**
```bash
# Are there poison messages causing retries?
[command to inspect dead-letter queue or failed messages]
```

**Step 3 — Options**

| If | Then |
|---|---|
| Consumers are down | Restart consumers: `[command]` |
| Poison message in queue | Move to DLQ: `[command]` |
| Consumers healthy but slow | Scale consumers: `[command]` |
| Upstream producing too fast | Escalate to [upstream service] owner |

---

### ALERT: [Add additional alerts following the same pattern]

---

## Diagnostic Cheat Sheet

Common commands for quick diagnosis. Paste and run without modification.

```bash
# Service health
[health check command]

# Recent logs (last 100 lines)
[log command]

# Error logs only
[error log filter command]

# Current pod / instance status
[kubectl get pods / aws ecs describe-tasks / etc.]

# Restart the service
[restart command]

# Roll back to previous version
[rollback command]

# Database connection count
[DB query]

# Cache hit rate
[cache stats command]

# Current request rate
[metrics query]
```

---

## Useful Dashboard Links

| Dashboard | URL | Use it to |
|---|---|---|
| Service overview | [Link] | First stop — error rate, latency, request rate |
| Database | [Link] | Connection count, slow queries, replication lag |
| Infrastructure | [Link] | CPU, memory, disk |
| Queue / consumers | [Link] | Backlog depth, consumer throughput |
| Upstream dependencies | [Link] | Dependency health at a glance |

---

## Incident Communication

When you declare an incident:

**Post to `#incidents` immediately:**
```
🔴 INCIDENT — [Service Name]
Status: Investigating
Impact: [Who is affected and how]
Paged: [Your name]
Next update: [Time — max 30 min from now]
```

**Update every 30 minutes while active:**
```
🔴 UPDATE — [Service Name] — [Time]
Status: [Investigating / Identified / Mitigating / Resolved]
Latest: [One sentence on what you found or did]
Next update: [Time]
```

**On resolution:**
```
✅ RESOLVED — [Service Name] — [Time]
Duration: [X minutes]
Impact: [Summary of who was affected]
Cause: [One sentence]
Follow-up: [PIR required? Yes/No — link when created]
```

---

## On-Call Handoff

Use this template at the end of every on-call shift:

```
--- ON-CALL HANDOFF: [Service Name] ---
Date: [Date]
Outgoing: [Your name]
Incoming: [Next on-call name]

INCIDENTS THIS SHIFT:
- [Incident summary — date, duration, cause, resolution, follow-up required]

OPEN ISSUES TO WATCH:
- [Anything not fully resolved / trending in the wrong direction]

CHANGES SINCE LAST HANDOFF:
- [Deploys, config changes, infra changes that affect on-call awareness]

RUNBOOK GAPS FOUND:
- [Anything you had to figure out that isn't documented — please add it]

ANYTHING ELSE:
- [Notes for incoming on-call]
```

---

## Quality Checks

- [ ] Every alert that pages on-call has a runbook entry — no alert is missing
- [ ] Rollback command is accurate and tested recently
- [ ] Escalation contacts have current phone numbers and Slack handles
- [ ] Diagnostic commands work — they have been run by at least one person recently
- [ ] Handoff template is used at every shift change — not just during incidents
- [ ] "Things I had to figure out that weren't documented" are added to this runbook after every incident

## Anti-Patterns

- [ ] Do not write alert runbooks with vague diagnostic steps like "check the logs" — every step must specify the exact command, dashboard link, or query to run
- [ ] Do not include an alert in the runbook that has no specific on-call action — an alert that pages someone with no defined response path creates panic, not resolution
- [ ] Do not leave the rollback command undocumented or untested — a rollback procedure that has never been run will fail when needed most
- [ ] Do not list escalation contacts without phone numbers and Slack handles — email-only escalation paths are useless during a 3am incident
- [ ] Do not write the runbook once and treat it as permanent — runbooks go stale after incidents; every incident must trigger a review of the relevant runbook entries
