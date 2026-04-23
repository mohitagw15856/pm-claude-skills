---
name: runbook-writer
description: "Write an operational runbook for a service, incident type, or deployment procedure. Use when asked to write a runbook, create an ops guide, document an operational procedure, or prepare an incident response playbook. Produces a runbook with overview, prerequisites, step-by-step procedures, rollback steps, troubleshooting table, and escalation paths. Optimised for Opus 4.7 and newer models."
---

# Runbook Writer Skill

Produces operational runbooks for services, incident types, and deployment procedures — structured so an on-call engineer who's never touched the system can follow them under pressure.

## Required Inputs

Ask for these if not provided:
- **What the runbook is for** (e.g. deploying the payment service, responding to a database failover, rotating API keys)
- **Runbook type** (Deployment / Incident Response / Maintenance / Disaster Recovery)
- **System/service name and what it does** (brief description)
- **Audience** (new on-call engineers / experienced SREs / DevOps team)
- **Tech stack** (where relevant — e.g. Kubernetes, AWS RDS, Node.js)

## Output Structure

---
**Runbook:** [Runbook Title]
**Service:** [Service Name]
**Type:** [Deployment / Incident Response / Maintenance / DR]
**Last Updated:** [Date]
**Owner:** [Team or person]
**Severity:** [P1 / P2 / P3 — if incident-type]

---

### Overview
**What this runbook covers:**
[1–2 sentences on the scenario this runbook handles]

**When to use this runbook:**
- [Specific trigger condition 1 — e.g. PagerDuty alert: `high-error-rate-payment-service`]
- [Specific trigger condition 2 — e.g. Deploy needed after PR merged to `main`]

**Estimated time to complete:** [X minutes / X–Y minutes depending on outcome]

**Impact if not completed correctly:** [e.g. Payment processing degraded / Data loss risk / Users locked out]

---

### Prerequisites

**Access required:**
- [ ] [System/tool access — e.g. AWS Console: `production-account`]
- [ ] [Credential — e.g. `vault read secret/payment-service`]
- [ ] [VPN / bastion access if needed]

**Tools required:**
- [ ] [Tool name and version — e.g. `kubectl` v1.28+]
- [ ] [CLI or dashboard name]

**Before you start:**
- [ ] [Prerequisite check — e.g. Verify current deployment is healthy in Grafana]
- [ ] [Prerequisite action — e.g. Announce in `#ops-live` that you're starting]

---

### Procedure

Number every step. Use exact commands. Do not paraphrase tool names or flags.

**Step 1: [Action name]**
[What you're doing and why — one sentence]
```bash
# Exact command
[command here]
```
**Expected output:** `[what should appear if this worked]`
**If this fails:** [Exact error message to look for] → [What to do, or see Troubleshooting]

**Step 2: [Action name]**
[Same structure as Step 1]

**Step 3: Verify**
Always include a verification step after the main procedure:
```bash
[verification command]
```
**Expected state:** [What a healthy system looks like after this runbook completes]

---

### Rollback

How to undo this procedure if something went wrong:

**Step R1: [Rollback action]**
```bash
[rollback command]
```
**Verify rollback:** `[command to confirm rollback succeeded]`

---

### Troubleshooting

| Symptom | Likely Cause | Resolution |
|---|---|---|
| [Error message or observable symptom] | [Why this happens] | [Exact fix or next step] |
| [Another symptom] | [Cause] | [Resolution] |

---

### Escalation

If this runbook does not resolve the issue:

| Condition | Who to Contact | How |
|---|---|---|
| [e.g. DB unavailable after 10 min] | [DBA on-call] | [PagerDuty policy: `db-oncall`] |
| [e.g. Payment provider unresponsive] | [Vendor contact] | [Contact in 1Password: `vendor-escalation`] |

**Always update the incident timeline in [tool] before escalating.**

---

### Post-Procedure Checklist

After completing the runbook:
- [ ] Announce completion in `#ops-live` with outcome
- [ ] Update the incident ticket / deploy log
- [ ] Verify alerts have resolved in monitoring dashboard
- [ ] If this revealed a gap in this runbook — update it now (link to edit process)

---

## Quality Checks
- [ ] Every step has an exact command (no "run the deploy script")
- [ ] Expected output is specified for each step so engineer knows if it worked
- [ ] Failure path is explicit for each step (not "if it fails, investigate")
- [ ] Rollback procedure is complete and independently testable
- [ ] Escalation paths name specific contacts, not just team names
- [ ] Runbook can be followed by someone who has never touched this system

## Example Trigger Phrases
- "Write a runbook for [service] deployment"
- "Create an incident response runbook for [alert type]"
- "I need a runbook for [procedure]"
- "Document the operational procedure for [X]"
- "Write an ops playbook for [scenario]"
