---
name: go-to-market-planner
description: "Build a go-to-market plan for any product launch, feature release, or new market entry. Use when planning a product launch, writing a GTM strategy, defining launch tiers, or coordinating cross-functional launch activities. Produces a tiered GTM plan with messaging, cross-functional activity tracker, success metrics, and launch day checklist."
---

# Go-to-Market Planner Skill

Produce a complete, cross-functional GTM plan that aligns product, marketing, sales, and support around a single launch — with clear owners, timelines, and success metrics.

## Launch Tier Framework

Before planning, classify the launch:

| Tier | Scope | Typical Effort | Examples |
|---|---|---|---|
| **Tier 1 — Major Launch** | New product / significant platform change | 8–12 weeks | New pricing model, platform rebrand, new product line |
| **Tier 2 — Feature Launch** | Significant new capability | 4–6 weeks | Major feature, API release, new integration |
| **Tier 3 — Incremental Release** | Improvement, bug fix, minor feature | 1–2 weeks | UI tweak, performance improvement, small enhancement |

Always confirm tier with the user before proceeding.

---

## GTM Plan Output Format

### GTM Plan — [Product/Feature Name] — [Launch Date]

**Launch Tier:** [1 / 2 / 3]
**Launch Owner (PM):** [Name]
**Target Launch Date:** [Date]
**Soft Launch Date (Beta/Limited):** [Date, if applicable]

---

### 1. What We're Launching
**One-line description:** [What it is, for whom, and why now]
**Key customer problem solved:** [Specific pain point]
**Key differentiator:** [Why ours, why now]

---

### 2. Target Audience
**Primary segment:** [Who benefits most — be specific]
**Secondary segment:** [Who else benefits]
**Not for:** [Who this is NOT for — helps sales and support]

---

### 3. Messaging

**Headline:** [Customer-facing headline — lead with outcome, not feature]
**Sub-headline:** [Supporting context — how it works or why it matters]
**3 key messages:**
1. [Problem solved]
2. [How it works / what's new]
3. [Proof / social proof / data]

**Elevator pitch (30 seconds):**
> [For [target user] who [has this problem], [product/feature] is a [category] that [key benefit]. Unlike [alternative], we [differentiator].]

---

### 4. Launch Activities by Function

| Function | Activity | Owner | Due Date | Status |
|---|---|---|---|---|
| Product | Feature flagging / rollout plan | PM | [date] | |
| Marketing | Blog post / landing page | Marketing | [date] | |
| Marketing | Email campaign to existing users | Marketing | [date] | |
| Marketing | Social media content | Marketing | [date] | |
| Sales | Sales enablement deck | PM + Sales | [date] | |
| Sales | FAQ for sales team | PM | [date] | |
| Support | Help centre articles | Support | [date] | |
| Support | Support team training | Support | [date] | |
| Engineering | Monitoring/alerting in place | Eng | [date] | |

---

### 5. Success Metrics

| Metric | Baseline | Target | Measurement Window |
|---|---|---|---|
| [Adoption metric] | [X] | [Y] | 30 days post-launch |
| [Engagement metric] | [X] | [Y] | 60 days post-launch |
| [Business metric] | [X] | [Y] | 90 days post-launch |

---

### 6. Risks & Contingencies

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| [Risk] | H/M/L | H/M/L | [Action if it happens] |

---

### 7. Launch Day Checklist
- [ ] Feature live for [X%] of users
- [ ] Monitoring dashboard active
- [ ] Support team briefed
- [ ] Blog post published
- [ ] Email sent / scheduled
- [ ] Sales team notified
- [ ] Executive announcement sent (if Tier 1)
- [ ] Rollback procedure confirmed

---

## Required Inputs

Ask the user for these if not provided:
- **Product or feature name**
- **Target launch date**
- **Launch tier** (Tier 1 / 2 / 3 — or describe scope and the skill will classify)
- **Target audience** (who benefits and who it's NOT for)
- **Key message** (what's the headline outcome for the customer)
- **PM and launch owner**

## Guidelines

- Never plan a Tier 1 launch without at least 8 weeks of lead time
- Always include a "Not for" section — it prevents misdirected sales and support tickets
- Recommend a soft launch to 5–10% of users before full rollout for any Tier 1 or 2 launch
- Post-launch retrospective should be scheduled at launch planning time — don't leave it to chance

## Quality Checks

- [ ] Launch tier is confirmed and appropriate for scope
- [ ] "Not for" section is included to prevent misdirected sales and support
- [ ] Every function has at least one activity with a named owner and due date
- [ ] Success metrics include a measurement window (30/60/90 days)
- [ ] Rollback procedure is confirmed for Tier 1 and 2 launches
- [ ] Post-launch retrospective is scheduled
