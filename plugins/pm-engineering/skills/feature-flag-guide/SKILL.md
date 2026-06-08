---
name: feature-flag-guide
description: "Write a feature flag management guide and lifecycle playbook for a service or team — covering flag taxonomy, creation checklist, rollout strategy, monitoring requirements, cleanup policy, and governance. Use when asked to document feature flag practices, create a flag rollout plan, write a feature flag policy, or guide a team on flag lifecycle management. Produces a flag lifecycle playbook, taxonomy reference, per-flag creation template, rollout decision tree, and cleanup checklist."
---

# Feature Flag Guide Skill

Produce a complete feature flag management guide for a service or team — covering how flags are named and categorised, how to create and roll out a flag safely, what to monitor during rollout, when and how to clean up flags, and who is responsible for each stage. Feature flags without discipline become permanent technical debt. This guide gives the team a repeatable process so flags are created intentionally, rolled out safely, and removed when done.

## Required Inputs

Ask for these if not already provided:
- **Service or team name** — scope of the guide
- **Feature flag platform** — LaunchDarkly, Split, Unleash, Flagsmith, Flipt, or a custom/in-house solution
- **Flag being documented** (if writing a per-flag guide) or "general guide" (if writing team-wide policy)
- **Rollout constraints** — any compliance, data privacy, or contractual constraints on who can see a feature (e.g. HIPAA, EU-only, enterprise customers only)

## Output Format

---

# Feature Flag Management Guide: [Service / Team Name]

**Team:** [Team name] | **Platform:** [LaunchDarkly / Split / Unleash / Custom]
**Document owner:** [Name] | **Last updated:** [Date]
**Review cycle:** Quarterly, and whenever the flag platform changes

---

## 1. Flag Taxonomy

Every flag belongs to exactly one category. The category determines default behaviour, who can enable it in production, and when it must be cleaned up.

| Type | Purpose | Default state | Production gate | Max lifetime |
|---|---|---|---|---|
| **Release flag** | Controls rollout of a new feature — decouples deploy from release | Off | Tech lead approval | 90 days from feature launch |
| **Experiment flag** | A/B or multivariate test — measures impact of a change | Off (control group) | Product + tech lead | Duration of experiment + 30 days |
| **Ops flag** | Operational control — circuit breaker, kill switch, throttle | On (normal behaviour) | On-call engineer can toggle | Indefinite (review annually) |
| **Permission flag** | Gates access by user segment, tier, or region | Off (restricted) | Product + Account owner | Indefinite (review annually) |

**When in doubt:** If the flag is temporary (tied to a specific feature launch), it is a Release flag. If it will exist forever as a control knob, it is an Ops flag.

---

## 2. Flag Naming Convention

All flags must follow this naming scheme:

```
[type]-[service]-[feature-description]
```

| Segment | Values | Example |
|---|---|---|
| type | `release`, `exp`, `ops`, `perm` | `release` |
| service | Short service identifier, lowercase, hyphenated | `payments` |
| feature-description | Kebab-case description, max 5 words | `new-checkout-flow` |

**Full examples:**
- `release-payments-new-checkout-flow` — release flag for a new checkout feature in the payments service
- `exp-search-personalized-ranking` — experiment on personalized search ranking
- `ops-api-rate-limit-override` — operational flag to override API rate limits
- `perm-dashboard-beta-users-only` — permission flag gating dashboard for beta users

**Do not:**
- Use ticket numbers in flag names (`release-JIRA-1234` → not searchable or self-describing)
- Use dates in flag names (`release-dark-mode-jan-2024` → flags outlive their dates)
- Use vague names (`release-new-thing` → not useful when you have 50 flags)

---

## 3. Flag Creation Checklist

Complete every item before creating a flag in the production environment.

**Before creating the flag:**
- [ ] Flag type determined from taxonomy (Section 1)
- [ ] Flag name follows naming convention (Section 2)
- [ ] Flag owner assigned — one named engineer responsible for cleanup
- [ ] Cleanup date set in the flag description field (for Release and Experiment flags)
- [ ] Rollout strategy defined — see Section 4
- [ ] Monitoring plan defined — see Section 5
- [ ] Code review approved with flag guard in place

**Flag description field (required):**
```
Type: [Release / Experiment / Ops / Permission]
Owner: [Name]
Linked ticket: [JIRA-XXXX or GitHub issue URL]
Purpose: [One sentence — what this flag controls]
Cleanup by: [Date — required for Release and Experiment flags; "Annual review" for Ops/Permission]
Rollout plan: [Link to this document or inline summary]
```

**Code requirements:**
```python
# Good — behaviour is clear when flag is off, and cleanup is obvious
if flag_client.is_enabled("release-[service]-[feature]", user_context):
    return new_feature_handler(request)
else:
    return existing_handler(request)

# Bad — nested flags, ternaries, and implicit defaults make cleanup error-prone
result = new_handler() if (f1 and not f2) or f3 else old_handler()
```

---

## 4. Rollout Strategy

### Decision Tree

Use this decision tree to pick the right rollout strategy for a Release or Experiment flag:

```
Is the change reversible without a deploy?
├── No → Use an Ops flag with manual enable, not a percentage rollout
└── Yes → Continue

Is there a user-level identifier available (user ID, session ID)?
├── No → Use server-side percentage (stateless, but inconsistent per user)
└── Yes → Use user-based percentage (consistent experience per user) ← preferred

Is the change risky (touches payments, auth, or data writes)?
├── Yes → Start at 1% → 5% → 25% → 50% → 100%, with 24-hour holds
└── No → Start at 10% → 50% → 100%, with 4-hour holds

Does the change affect specific customer tiers or geographies?
├── Yes → Use segment-based targeting, not percentage rollout
└── No → Use percentage rollout
```

### Rollout Stages

| Stage | Percentage | Hold duration | Pass criteria before advancing |
|---|---|---|---|
| Canary | 1% | 24 hours | Error rate within SLO, no P1 incidents |
| Early rollout | 5–10% | 24 hours | Error rate and latency match control group |
| Partial rollout | 25–50% | 24–48 hours | Business metrics not degraded vs. control |
| Majority | 75% | 24 hours | Final check — no regressions |
| Full rollout | 100% | 48 hours | Stable — schedule cleanup |

**Do not skip stages for Release flags on production.** Speed of rollout is not worth a production incident.

### Segment-Based Targeting

Use segment targeting when the rollout must be restricted:

```yaml
# LaunchDarkly segment example — adapt for your platform
targeting_rules:
  - clause:
      attribute: "subscription_tier"
      operator: "in"
      values: ["enterprise", "team"]
    serve: "on"
  - clause:
      attribute: "country"
      operator: "in"
      values: ["US", "CA", "GB"]
    serve: "on"
  default: "off"
```

---

## 5. Monitoring Requirements

Every flag that is not at 0% or 100% rollout requires active monitoring. Do not roll out a flag and walk away.

### Required Metrics Per Flag

| Metric | What to compare | Alert threshold |
|---|---|---|
| Error rate | Flag-on cohort vs. flag-off cohort | >2× baseline error rate in flag-on group |
| p99 latency | Flag-on vs. flag-off | >20% higher latency in flag-on group |
| [Primary business metric] | Flag-on vs. flag-off | >5% degradation in flag-on group |
| [Conversion / completion rate] | Flag-on vs. flag-off | >2% drop in flag-on group |

**Setting up split metric monitoring in [LaunchDarkly / Split / Datadog]:**
```
1. Navigate to the flag → Metrics tab
2. Add metric: [primary business metric]
3. Add metric: error_rate (service-level)
4. Add metric: p99_latency (endpoint-level)
5. Set alert: notify [flag owner] in Slack #[team-channel] if metric degrades by [threshold]
6. Set experiment duration: [N days] if this is an Experiment flag
```

### Guardrail Metrics

These metrics must never degrade, regardless of what the primary metric shows. If a guardrail is breached, roll back immediately — do not wait for investigation.

- Error rate exceeds SLO threshold ([X]%)
- p99 latency exceeds SLO threshold ([Y] ms)
- [Service-specific guardrail — e.g. payment failure rate, auth failure rate]

**Immediate rollback command if guardrail is breached:**
```bash
# [LaunchDarkly CLI]
ld-cli flag update [project-key] [flag-key] --default-variation off

# [Split CLI]
split-cli update-treatment [flag-name] --treatment "off" --percentage 100

# [Unleash CLI / API]
curl -X POST https://[unleash-host]/api/admin/features/[flag-name]/disable \
  -H "Authorization: [admin-token]"

# [Custom — adapt to your implementation]
[command or dashboard step]
```

---

## 6. Per-Flag Creation Template

Copy this template into your flag's description field and the linked ticket when creating a new flag:

```markdown
## Flag: [flag-name]

**Type:** [Release / Experiment / Ops / Permission]
**Owner:** [Name] ([Slack handle])
**Created:** [Date]
**Cleanup by:** [Date]
**Linked ticket:** [URL]

### Purpose
[One paragraph: what this flag controls, why it exists, what "on" and "off" mean]

### Rollout Plan
| Stage | Target | Date | Approved by |
|---|---|---|---|
| Canary | 1% | [Date] | [Name] |
| Early | 10% | [Date] | [Name] |
| Partial | 50% | [Date] | [Name] |
| Full | 100% | [Date] | [Name] |

### Monitoring
- Primary metric: [metric name and dashboard link]
- Guardrail metrics: error rate < [X]%, p99 < [Y] ms
- Alert channel: #[team-channel]

### Rollback Procedure
[Exact steps to turn the flag off in an emergency — should take < 2 minutes]

### Cleanup Checklist
- [ ] Flag at 100% for 48+ hours with no incidents
- [ ] Code path for flag-off branch removed from codebase
- [ ] Flag deleted from [platform]
- [ ] Ticket closed
```

---

## 7. Emergency Kill-Switch Procedure

When a flag needs to be disabled immediately due to a production incident:

**Time target: flag disabled within 2 minutes of decision.**

```
1. Go to [platform URL] — bookmark this: [URL]
2. Search for the flag by name: [flag-name]
3. Set to 0% / "off" for ALL users
4. Verify the service error rate drops within 60 seconds
5. Post to #incidents:
   "🟡 Feature flag [flag-name] disabled — rolling back [feature description].
    Owner: [name]. Error rate before: [X]%. Monitoring for recovery."
6. Page the flag owner if not already aware
```

**For ops flags (kill switches that must turn OFF normally-on behaviour):**
```bash
# These flags are "on" by default and turned "off" to disable a feature
# Confirm the flag polarity before toggling — "off" may mean "disabled" or "enabled" depending on naming
# Flag [flag-name]: OFF = [feature behaviour when off]
[kill switch command for your platform]
```

---

## 8. Stale Flag Policy and Cleanup

Stale flags are flags that are at 100% rollout, have been at 100% for >48 hours, or are past their cleanup date. Stale flags are technical debt.

### Stale Flag Definition

A flag is stale if ANY of the following are true:
- It is a Release flag past its cleanup date
- It has been at 100% (or 0%) rollout for more than 30 days
- Its linked ticket is closed and code cleanup has not happened
- Its owner has left the team

### Cleanup Checklist

```
[ ] Flag is at 100% rollout and has been stable for 48+ hours
[ ] Monitoring shows no issues for the flag-on cohort
[ ] Code changes:
    [ ] Remove the flag check from application code
    [ ] Remove the "off" code path entirely — do not leave dead code
    [ ] Remove any flag-related tests that test the off behaviour
    [ ] Update any documentation that references the flag
[ ] PR merged and deployed to production
[ ] Flag deleted from [platform] (do not just disable — delete)
[ ] Cleanup ticket closed
[ ] Flag owner confirms cleanup in Slack: "Flag [name] has been cleaned up — [commit link]"
```

**Automated stale flag detection:**
```bash
# Run weekly — flags past cleanup date or at 100% for > 30 days
# [Platform-specific query — adapt:]

# LaunchDarkly API
curl -s "https://app.launchdarkly.com/api/v2/flags/[project-key]" \
  -H "Authorization: [api-key]" | \
  jq '.items[] | select(.creationDate < (now - 2592000) * 1000) | {key: .key, created: .creationDate}'

# Notify #engineering-housekeeping with list of stale flags
```

### Stale Flag Escalation

| Age past cleanup date | Action |
|---|---|
| 0–14 days | Slack reminder to flag owner |
| 14–30 days | Slack reminder to flag owner + tech lead |
| 30+ days | Tech lead assigns cleanup, creates ticket with P2 priority |
| 60+ days | Engineering manager reviews — flag may be force-deleted |

---

## 9. Governance

### Who Can Do What

| Action | Who | Approval required |
|---|---|---|
| Create a flag (any environment) | Any engineer | None — but must complete creation checklist |
| Enable a flag in development | Any engineer | None |
| Enable a flag in staging | Any engineer | None |
| Enable a flag in production (0–10%) | Flag owner | Tech lead awareness |
| Advance rollout in production (10–100%) | Flag owner | Tech lead sign-off per stage |
| Enable an Ops flag in production | On-call engineer | None — these are break-glass controls |
| Delete a flag | Flag owner | Tech lead confirmation that code cleanup is done |
| Create a Permission flag | Flag owner | Product manager approval |

### Audit Logging

All flag changes in production must be traceable. Ensure the following are configured in [platform]:

- **Change log:** Every production flag change logs: who changed it, what they changed, and when.
- **Slack notifications:** Production flag changes post to `#[team]-flag-changes` automatically.
- **Quarterly review:** Every quarter, the tech lead reviews the full flag inventory, confirms owners are current, and removes flags with no owner.

---

## Quality Checks

- [ ] Every flag has an owner named in its description — no orphan flags
- [ ] Release and Experiment flags have a cleanup date set — not open-ended
- [ ] Monitoring is configured for every flag currently between 1–99% rollout
- [ ] The emergency kill-switch procedure has been tested — on-call engineers have bookmarked the platform URL and know the steps
- [ ] Stale flag detection runs automatically and results are reviewed weekly
- [ ] Code review checklist includes: "Does this PR introduce a flag? If yes, is the creation checklist complete?"
- [ ] At least one person other than the flag owner knows how to disable any given flag in an emergency

## Anti-Patterns

- [ ] Do not create release flags without a cleanup date — flags without expiry dates become permanent technical debt that accumulates silently until the codebase is unmaintainable
- [ ] Do not skip monitoring setup for flags between 1–99% rollout — a partially-rolled-out flag without metric comparison is a risk without a sensor
- [ ] Do not nest flags inside other flags — compound flag logic makes cleanup nearly impossible and creates untestable code paths
- [ ] Do not allow flag owners to leave the team without reassigning ownership — orphan flags with no owner never get cleaned up
- [ ] Do not use feature flags as a permanent configuration system — flags that have been at 100% or 0% for more than 30 days must be cleaned up; using flags as permanent config couples business logic to a feature flag platform
