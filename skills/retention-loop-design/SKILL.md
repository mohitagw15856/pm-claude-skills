---
name: retention-loop-design
description: "Design retention and engagement loops that bring users back. Use when asked to improve retention, design an engagement/habit loop, fix a leaky retention curve, or build a re-engagement system. Produces a retention design — the retention curve diagnosis, the core habit loop (trigger→action→reward→investment), the activation→habit path, re-engagement triggers, and the metrics to watch."
---

# Retention Loop Design Skill

Acquisition without retention is a leaky bucket — you pay to fill it and it drains. This skill diagnoses
*where and why* users drop, then designs the loop that makes the product habitual: the trigger that brings
them back, the value they get, and the investment that makes the next visit more likely. Retention is the
truest measure of product-market fit.

## Required Inputs

Ask for these only if they aren't already provided:

- **The retention curve** — how usage decays over time (D1/D7/D30, or weekly cohorts); does it flatten or go to zero?
- **The core value & natural frequency** — what users come for, and how often they'd genuinely need it.
- **Activation definition** — the early action that correlates with sticking (or note it's unknown).
- **Current loops** — any notifications, streaks, or re-engagement already in place.

## Output Format

### Retention Design: [product]

**1. Curve diagnosis** — read the retention curve: does it **flatten** (a retained core exists — good) or **decay to zero** (no PMF for this segment)? Identify the drop-off point and the cohort that retains best (your beachhead).

**2. Activation → habit** — the early "setup moment" and the **habit milestone** (e.g. "3 sessions in week 1"); the shortest path to it, since activation is the strongest lever on long-term retention.

**3. The core loop** — design the engagement loop explicitly:
- **Trigger** — external (notification, email) and the internal trigger you want to own (the felt need).
- **Action** — the simplest behaviour that delivers value.
- **Reward** — the value/variable reward received.
- **Investment** — what the user puts in (data, content, social, configuration) that makes the next loop better and raises switching cost.

**4. Natural frequency match** — align the loop's cadence to how often the job actually recurs; don't manufacture engagement the product doesn't warrant.

**5. Re-engagement** — triggered winback for users sliding toward churn (behavioural signal → message → return path); pair with [`lifecycle-crm-plan`](../lifecycle-crm-plan/SKILL.md).

**6. Metrics** — the retention metric and cohort view to watch, plus the leading indicator (habit-milestone rate) that predicts it.

## Quality Checks

- [ ] The retention curve is diagnosed as flattening vs. decaying — that determines whether to fix retention or fix fit first
- [ ] Activation/habit milestone is defined and tied to long-term retention
- [ ] The loop names a trigger, action, reward, AND investment (the investment is what compounds)
- [ ] Loop cadence matches the product's natural frequency — no manufactured engagement
- [ ] A leading indicator (not just lagging retention) is identified to act on early

## Anti-Patterns

- [ ] Do not optimise retention before the curve flattens for some segment — if it decays to zero there's no PMF to retain, fix that first
- [ ] Do not bolt on streaks/badges without a real reward — gamification on a product with no core value just annoys
- [ ] Do not spam notifications to force engagement — manufactured frequency drives uninstalls and erodes trust
- [ ] Do not ignore the investment phase — without stored value/data, there's nothing raising the cost of leaving
- [ ] Do not report only average retention — cohorts and the best-retaining segment tell you where to aim

## Based On

The Hook Model (Nir Eyal) and cohort-retention analysis practice (flattening curve = PMF signal).

## Example Trigger Phrases

- "Improve retention."
- "Design an engagement/habit loop."
- "Fix a leaky retention curve."
- "Build a re-engagement system."
