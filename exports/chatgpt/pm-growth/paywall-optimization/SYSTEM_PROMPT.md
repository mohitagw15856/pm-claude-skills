# Paywall Optimization Skill

The paywall is where free turns into revenue — and where a clumsy one turns users off forever. Getting it right
is about *what* you gate, *when* you ask, and *how* you frame the upgrade. This skill designs or tunes a paywall
that converts by making the paid value obvious at a moment of real intent — not by holding core value hostage.

## Required Inputs

Ask for these only if they aren't already provided:

- **The model & current state** — freemium / free-trial / hard paywall; what's free vs. paid today; current conversion if known.
- **The value** — what users come for, the "aha" moment, and the features worth paying for.
- **Plans & pricing** — tiers and prices (or that they're open to design).
- **The trigger context** — where users hit the wall today, and where they feel the most value/intent.

## Output Format

### Paywall plan: [product]

**1. Gating strategy** — what stays free vs. what's paid, and *why*. The free tier must deliver a real aha (so users want more); gate the value that scales with success/usage — not the thing that proves value in the first place.

**2. The moment** — *when* to show the paywall: at a point of demonstrated intent or hitting a real limit, ideally just after the user has felt value — not on first open. Soft wall (prompt, keep browsing) vs. hard wall (must pay), with a rationale.

**3. The screen** — layout and copy:
- **Headline** — the value/outcome, not "Upgrade now".
- **Plan presentation** — tiers, the anchor/recommended plan highlighted, billing toggle (annual discount framed clearly).
- **Value reinforcement** — what they unlock, in benefit terms; social proof; risk-reducers (trial, money-back, cancel anytime).
- **Friendly exit** — a graceful "maybe later" so a non-buyer isn't lost (and can be re-prompted).

**4. Experiments to run** — the highest-leverage tests (trigger timing, what's gated, plan framing/anchor, annual default), each with the metric it moves.

**5. Metrics & guardrails** — free→paid conversion, trial-start and trial→paid, ARPU — *and* guardrails: free-user retention, refund/chargeback and churn rate (a paywall that converts but spikes churn isn't a win).

## Quality Checks

- [ ] The free tier still delivers a genuine aha — core value isn't held hostage
- [ ] The paywall triggers at a moment of real intent/limit, after value is felt — not on first open
- [ ] Plan presentation has a clear anchor/recommended option and honest framing
- [ ] Risk-reducers and a graceful exit are included
- [ ] Both conversion metrics *and* guardrail metrics (retention, churn, refunds) are tracked
- [ ] Experiments are prioritized by leverage, each tied to a metric

## Anti-Patterns

- [ ] Do not gate the core aha — users who never feel value never pay
- [ ] Do not hit users with the wall on first open, before any value — it just bounces them
- [ ] Do not use dark patterns (hidden cancel, forced continuity, fake urgency) — short lift, long-term churn
- [ ] Do not optimize conversion while ignoring churn/refund guardrails
- [ ] Do not present plans without a clear recommended/anchor option — choice overload kills conversion

## Based On

Freemium / subscription conversion practice (value-based gating, trigger-at-intent, plan anchoring, conversion vs. retention guardrails).
