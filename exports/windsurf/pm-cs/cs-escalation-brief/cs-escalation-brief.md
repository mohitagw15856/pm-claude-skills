---
trigger: model_decision
description: "Write a structured escalation brief for an at-risk customer account. Use when an account has escalated, when a customer is threatening churn, when a P1 customer issue needs executive attention, or when preparing an internal save play. Produces a crisp escalation brief with account context, timeline, root cause, business impact, and a clear resolution plan."
---

# Customer Escalation Brief Skill

Produce a clear, concise escalation brief that gives internal stakeholders — VP CS, CCO, product leadership, or the CEO — everything they need to understand the situation, make decisions, and act fast.

A good escalation brief is not a complaint. It is a professional document that states the facts, assigns accountability honestly, and proposes a specific resolution plan.

## Required Inputs

Ask for these if not already provided:
- **Account name**, tier, and ARR
- **CSM name** and account owner
- **Nature of the escalation** — what happened, what the customer is saying
- **Timeline** of events leading to escalation
- **Customer contact** who escalated (name, role, influence level)
- **What the customer wants** — their stated ask
- **What we believe the root cause is**
- **What has already been done** to address the situation
- **Renewal date** and current renewal risk assessment

## Escalation Levels

Calibrate urgency and audience based on escalation level:

| Level | Trigger | Audience | Response time |
|---|---|---|---|
| L1 — Account Risk | Customer expressing dissatisfaction; renewal at risk | CSM + CS Manager | 24 hours |
| L2 — Executive Escalation | Customer escalated to their exec; requesting vendor exec involvement | VP CS + Account Exec | 4 hours |
| L3 — Churn Risk | Customer has issued notice or is in active churn conversation | CCO / CEO + Revenue leadership | 1 hour |
| L4 — Public Risk | Customer threatening public escalation, legal, or press | CCO / Legal / Comms | Immediate |

## Output Format

---

# Escalation Brief: [Account Name]

**Escalation level:** L[1/2/3/4] — [Label]
**Date raised:** [Date]
**Raised by:** [CSM name]
**Escalation owner:** [Name of exec or senior stakeholder now leading response]

---

## Account at a Glance

| Field | Detail |
|---|---|
| ARR | £/$/€[X] |
| Tier | Enterprise / Mid-Market / SMB |
| Customer since | [Date] |
| Renewal date | [Date] — [N] days away |
| Renewal risk (pre-escalation) | Green / Amber / Red |
| Renewal risk (current) | Green / Amber / Red |
| Customer contact who escalated | [Name, role, seniority] |
| Executive sponsor (customer) | [Name, role — active / passive / vacant] |
| Executive sponsor (vendor) | [Name, role] |

---

## What Happened — Summary

[3–5 sentences. State the facts plainly. What the customer experienced, how they reacted, and how we learned about the escalation. No editorialising. No blame.]

---

## Timeline

List in chronological order. Each entry: `[Date / time] — [What happened. Who did what.]`

Include:
- When the original issue or trigger event occurred
- When the customer first raised concerns (informally)
- When it escalated (formal escalation or exec involvement)
- Actions taken since escalation

---

## Root Cause

**Primary cause:** [One clear sentence. What specifically went wrong.]

**Contributing factors:**
- [Factor 1 — be honest about internal failures as well as external ones]
- [Factor 2]

**Is this a systemic issue or isolated?**
[ ] Isolated to this account
[ ] Pattern seen in other accounts — details: [_______]
[ ] Product or process gap that needs fixing

---

## Customer's Stated Position

**What the customer says happened:** [Their version of events — fair and unfiltered]

**What they are asking for:** [Their explicit ask — compensation, fix by date, exec call, SLA credit, exit clause]

**Sentiment of escalating contact:** [Frustrated but constructive / Angry / Seeking exit / Unknown]

**Risk of public escalation:** Low / Medium / High — [evidence if Medium or High]

---

## Business Impact

| Impact type | Detail |
|---|---|
| ARR at risk | £/$/€[X] |
| Potential churn probability | [X]% |
| Reputational risk | Low / Medium / High |
| Reference / case study status | [Was a reference — now at risk / Not a reference] |
| Expansion pipeline at risk | £/$/€[X] |

---

## What Has Been Done So Far

1. [Action taken — by whom — date — outcome]
2. [Action taken — by whom — date — outcome]
3. [Action taken — by whom — date — outcome]

**Has a formal apology or acknowledgement been issued?** Yes / No

---

## Proposed Resolution Plan

**Immediate actions (next 24–48 hours):**

| Action | Owner | By when |
|---|---|---|
| [Action] | [Name] | [Date] |
| [Action] | [Name] | [Date] |

**Medium-term actions (next 2–4 weeks):**

| Action | Owner | By when |
|---|---|---|
| [Action] | [Name] | [Date] |

**What we are NOT offering:** [Be explicit about what is not on the table — avoids misaligned expectations]

**Success criteria:** [How will we know the escalation is resolved? What does the customer need to confirm they are satisfied?]

---

## Decision Required from Escalation Owner

[State clearly what decision or resource the escalation owner needs to provide. Be specific — do not make them ask. E.g.: "We need approval to offer a 20% service credit for Q2" or "We need an exec call with [name] within 48 hours."]

---

## Communication Plan

| Audience | Message | Channel | Owner | By when |
|---|---|---|---|---|
| Escalating customer contact | [Summary of message] | Email / Call | [Name] | [Date] |
| Customer exec sponsor | [Summary] | Call | [Name] | [Date] |
| Internal CS team | [Summary] | Slack / Meeting | CS Manager | [Date] |

---

## Quality Checks

- [ ] Root cause is specific — not "communication breakdown" or "product gap" without detail
- [ ] Customer's position is stated fairly — not minimised or dismissed
- [ ] A clear decision is requested from the escalation owner — brief does not end with "what do you think?"
- [ ] ARR at risk is quantified
- [ ] Communication plan has owners and dates — not "TBD"
- [ ] Language is professional and blameless toward individuals

## Anti-Patterns

- [ ] Do not assign blame to individuals — focus on system failures and process gaps
- [ ] Do not downplay ARR at risk or describe churn risk vaguely without a number
- [ ] Do not leave resolution plan ownership as "TBD" or unassigned
- [ ] Do not write the brief without a clear ask from the escalation owner
- [ ] Do not omit the customer's own stated position — their perspective must be represented fairly
