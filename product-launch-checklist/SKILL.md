---
name: product-launch-checklist
description: Generates comprehensive pre-launch, launch day, and post-launch checklists for product releases. Use when preparing for a product launch, feature release, or major update. Triggers on "launch checklist", "pre-launch", "launch day", "release checklist", "ship checklist", "go-live checklist".
---

# Product Launch Checklist Skill

Never launch without checking everything. Generate a complete, role-assigned checklist covering pre-launch readiness, launch day execution, and post-launch monitoring.

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

## Guidelines

- The Go/No-Go decision must have a named owner — "the team" is not an owner
- Never launch on a Friday unless you have weekend engineering coverage
- Recommend starting all launches at <10% traffic — even for simple features
- Document rollback time: "We can revert this in X minutes" should be known before launch
