---
name: lifecycle-crm-plan
description: "Design lifecycle marketing / CRM journeys across the customer lifecycle. Use when asked to plan onboarding emails, lifecycle/CRM campaigns, drip sequences, re-engagement or winback flows, or a messaging calendar. Produces a lifecycle plan — stage map, the trigger/message/goal for each journey, channel & timing, segmentation, suppression rules, and success metrics."
---

# Lifecycle / CRM Plan Skill

Lifecycle marketing is the difference between a product people sign up for and one they actually use.
This skill maps the customer lifecycle to triggered journeys — each with a clear job — so messaging is
behaviour-driven and purposeful, not a batch-and-blast newsletter that trains people to ignore you.

## Required Inputs

Ask for these only if they aren't already provided:

- **Product & lifecycle stages** — what the journey from signup → active → loyal → churned looks like.
- **The key moments** — activation milestone, the "aha", upgrade triggers, and churn signals.
- **Channels available** — email, push, in-app, SMS — and any consent/deliverability constraints.
- **Goal** — the lifecycle metric to move (activation %, D30 retention, expansion, winback rate).

## Output Format

### Lifecycle / CRM Plan: [product]

**1. Lifecycle map** — the stages and the one behaviour you want at each (signup → activate → habit → expand → renew; with winback for lapsed).

**2. Journey table** — the core deliverable:

| Journey | Trigger (behaviour, not date) | Audience/segment | Message & goal | Channel | Timing | Success metric | Exit/suppression |
|---|---|---|---|---|---|---|---|
| Onboarding | signed up, not activated | new, no key action | get to first value | email + in-app | t+0, t+1d, t+3d | activation % | activated → exit |
| Winback | inactive 30d | was active | reason to return | email | t+30, t+37 | reactivation % | returned → exit |

**3. Segmentation** — the few segments that change the message (by behaviour/value, not vanity demographics).

**4. Timing & frequency** — cadence rules and a **global frequency cap / suppression** so journeys don't collide or fatigue.

**5. Measurement** — per-journey metric, holdout group to prove incrementality, and the deliverability guardrails (bounce/spam/unsub watch).

## Quality Checks

- [ ] Journeys are **behaviour-triggered**, not date-batched
- [ ] Every journey has an explicit goal, success metric, and exit condition
- [ ] A global frequency cap / suppression prevents message collisions and fatigue
- [ ] A holdout group is used to measure incrementality, not just open/click rates
- [ ] Segmentation is based on behaviour/value, not vanity attributes

## Anti-Patterns

- [ ] Do not batch-and-blast — untriggered, irrelevant sends train users to ignore and unsubscribe
- [ ] Do not measure success by opens/clicks alone — tie journeys to the lifecycle outcome (activation, retention, revenue) with a holdout
- [ ] Do not forget exit conditions — a user who already activated should not keep getting "activate now" emails
- [ ] Do not ignore frequency capping — overlapping journeys are how you fatigue and burn a list
- [ ] Do not skip deliverability guardrails — a great journey in the spam folder reaches no one

## Based On

Lifecycle marketing / behavioural CRM practice — trigger-based journeys, segmentation, and incrementality testing with holdouts.

## Example Trigger Phrases

- "Plan onboarding emails."
- "Plan our lifecycle campaigns."
- "Design drip and winback flows."
- "Build a CRM messaging calendar."
