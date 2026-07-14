---
name: product-launch-checklist
description: "Generate a comprehensive pre-launch, launch day, and post-launch checklist for any product release. Use when preparing for a product launch, feature release, or major update. Produces a role-assigned, tiered checklist covering engineering readiness, marketing and comms, support, and post-launch monitoring."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/product-launch-checklist.html
metadata:
  {
    "openclaw": { "emoji": "🚚" }
  }
---

# Product Launch Checklist Skill

Never launch without checking everything. Generate a complete, role-assigned checklist covering pre-launch readiness, launch day execution, and post-launch monitoring.

## Proposes Actions

Once the checklist is approved, it can be *executed*: hand the items to [`action-runner`](../action-runner/SKILL.md), which previews them (dry-run, risk-rated), runs only what you approve via the connected action MCP (GitHub/Linear/Slack), and records what was done back to the brain. Typical: **open an issue per checklist item** in the named repo/project (🟡), and **post the launch summary to Slack** (🔴 — approved individually). This skill proposes; action-runner gates and runs — never silently.

## Required Inputs

Ask the user for these if not provided:
- **Launch name** and planned launch date
- **Launch tier** (1 = major product launch, 2 = significant feature release, 3 = incremental update)
- **Team members and their roles** (engineering lead, PM, marketing, support, etc.)
- **Feature description** (what is being launched)
- **Rollback capability** (can this be feature-flagged or reverted quickly?)

## How to Use This Skill

Provide:
- Launch name and date
- Launch tier (1 = major, 2 = feature, 3 = incremental)
- Team members and their roles

The skill generates a tiered checklist. Tier 3 launches use only the Essentials section. Tier 2 adds Marketing & Comms. Tier 1 uses all sections.

---

## Output Format

### Launch Checklist — [Feature/Product Name] — Target Date: [Date]

**Launch Tier:** [1 / 2 / 3]
**Launch Owner:** [PM Name]
**Engineering Lead:** [Name]
**Go/No-Go Decision By:** [Date and time — typically 24 hours before launch]

---

### 🔧 PRE-LAUNCH — Engineering & Product (T-2 weeks)
- [ ] Feature flag created and tested in staging
- [ ] All acceptance criteria signed off by PM
- [ ] Code reviewed and merged to main
- [ ] QA sign-off completed (regression + new feature)
- [ ] Performance testing completed (load, latency)
- [ ] Security review completed (if data or auth changes)
- [ ] Rollback procedure documented and tested
- [ ] Monitoring and alerting configured
- [ ] Error logging in place with correct severity levels
- [ ] Database migrations tested on staging with production data volume

### 📢 PRE-LAUNCH — Marketing & Comms (T-1 week)
- [ ] Blog post written, reviewed, and scheduled
- [ ] In-app announcement or tooltip configured
- [ ] Email campaign drafted and QA'd
- [ ] Social media posts drafted and scheduled
- [ ] Landing page or feature page live in staging
- [ ] Press outreach sent (Tier 1 only)
- [ ] Product Hunt / community posts prepared (Tier 1 only)

### 🎓 PRE-LAUNCH — Sales & Support (T-1 week)
- [ ] Sales enablement one-pager completed
- [ ] FAQ document shared with sales and support teams
- [ ] Help centre articles written and published
- [ ] Support team demo / training completed
- [ ] Customer success team briefed on top accounts
- [ ] Pricing updated (if applicable)
- [ ] Contracts / ToS updated (if applicable)

### 📊 PRE-LAUNCH — Analytics (T-1 week)
- [ ] Analytics events firing correctly in staging
- [ ] Dashboard configured for launch metrics
- [ ] Baseline metrics documented
- [ ] Success criteria documented and shared with team
- [ ] A/B test configured (if applicable)

---

### ✅ GO / NO-GO DECISION — T-24 hours

| Criteria | Status | Owner |
|---|---|---|
| All critical bugs resolved | 🟢 / 🔴 | Eng Lead |
| QA sign-off complete | 🟢 / 🔴 | QA |
| Rollback tested | 🟢 / 🔴 | Eng Lead |
| Help centre articles live | 🟢 / 🔴 | Support |
| Monitoring active | 🟢 / 🔴 | Eng Lead |
| PM sign-off | 🟢 / 🔴 | PM |

**Go / No-Go Decision:** [GO / NO-GO]
**Decision Owner:** [PM + Eng Lead jointly]

---

### 🚀 LAUNCH DAY
- [ ] Feature flag enabled for [X%] of users (start low — 5–10%)
- [ ] Launch confirmed in team Slack/channel
- [ ] Metrics dashboard open and being monitored
- [ ] Error rate checked at T+15 min, T+1 hr, T+4 hr
- [ ] Blog post published / email sent
- [ ] Social posts live
- [ ] Support team on standby for first 4 hours
- [ ] PM available and reachable all day
- [ ] Feature flag expanded to 50% if T+2hr checks pass
- [ ] Feature flag expanded to 100% if T+4hr checks pass

---

### 📈 POST-LAUNCH (D+7, D+30)
- [ ] D+7 metrics review: adoption, errors, support tickets
- [ ] D+7 customer feedback synthesised
- [ ] Retrospective scheduled
- [ ] Learnings documented
- [ ] D+30 success metrics reviewed against targets
- [ ] Feature flag removed from codebase (clean up)
- [ ] Follow-up features added to backlog based on feedback

---

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Tier calibration | No tier stated, or checklist depth obviously mismatched (full Tier 1 ceremony for a copy tweak, or a bare list for a new revenue line) | Tier stated but not justified; some sections included or dropped inconsistently with the tier | Tier stated with the reasoning (pricing, legal, blast radius — not engineering effort), sections match the tier, and any tier disagreement is resolved on record |
| Ownership & timing | Items and gates owned by "the team" or nobody; no dates | Most items have owners but key gates (Go/No-Go, expansions, retro) lack a named individual or a specific time | Every checklist item, gate, and decision has one named individual and a date/time, including the Go/No-Go decision time set ~24h before launch |
| Rollback & staged rollout | No rollback plan, or flag flips to 100% on day one | Rollback documented but untested; staging exists but expansion steps have no pass criteria | Rollback tested with a known revert time ("X minutes, tested on [date]"), flag staged 5–10% → 50% → 100%, and each expansion gated on specific named checks |
| Go/No-Go integrity | No gate, or a gate that is theatre — everything green by default, blocked work checked off | Gate exists with criteria, but blocked items are softened, statuses aspirational, or a NO-GO has no revised plan | Honest statuses (reds shown with blocker and owner), the decision follows the table even when that means slipping, and a NO-GO produces a dated re-gate — plus the retro booked at launch time |

## Quality Checks

- [ ] Launch tier confirmed before generating checklist (scope determines depth)
- [ ] Go/No-Go decision has a named owner and a specific decision time
- [ ] Rollback procedure is documented and tested (not just planned)
- [ ] Feature flag expansion is staged (5% → 50% → 100%), not all-at-once
- [ ] Post-launch retrospective is scheduled at launch time

## Anti-Patterns

- [ ] Do not apply a Tier 1 checklist to an incremental update — tier the launch appropriately before generating the checklist
- [ ] Do not launch on a Friday without confirmed weekend engineering coverage
- [ ] Do not leave the Go/No-Go decision owner as "the team" — it must be a named individual
- [ ] Do not skip the rollback plan for Tier 1 and 2 launches — know the revert time before going live
- [ ] Do not close the launch without scheduling the post-launch retrospective — it must be booked at launch time, not after

## Guidelines

- The Go/No-Go decision must have a named owner — "the team" is not an owner
- Never launch on a Friday unless you have weekend engineering coverage
- Recommend starting all launches at <10% traffic — even for simple features
- Document rollback time: "We can revert this in X minutes" should be known before launch
