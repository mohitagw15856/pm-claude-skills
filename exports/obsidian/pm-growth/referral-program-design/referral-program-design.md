---
aliases: ["Referral Program Design"]
tags: [pm-skills, skill]
skill: referral-program-design
description: "Design a referral or viral-loop program that actually drives growth. Use when asked to design a referral or refer-a-friend program, build a viral/invite loop, set referral incentives, turn happy users into a growth channel, or improve word-of-mouth growth. Produces a referral design — the loop mechanics, incentive structure (who gets what, when), the viral-math estimate (k-factor/cycle time), the unit-economics check, fraud guardrails, placement & messaging, and success metrics."
---

# Referral Program Design Skill

A referral program is a growth loop, not a coupon. It only compounds if each new user invites more than
they cost and the cycle is fast. This skill designs the mechanics and incentives, then sanity-checks them
with the viral math — because most referral programs fail not on creativity but on a k-factor below 1.

## Required Inputs

Ask for these only if they aren't already provided:

- **Why users would share** — the genuine reason (status, mutual benefit, the product is better with others).
- **Economics** — the value of a new customer (so the incentive budget is grounded) and current organic word-of-mouth.
- **The moment of delight** — when users are happiest (the best time to ask for a referral).
- **Goal** — what the program must do (lower CAC, accelerate growth) and over what horizon.

## Output Format

### Referral Program: [product]

**1. The loop** — map it: a user does X → is prompted to invite → friend accepts → friend activates → becomes a referrer. Name every step; the loop is only as strong as its weakest conversion.

**2. Incentive structure** — who gets what and **when it unlocks** (one-sided vs. two-sided; reward on signup vs. on the friend's activation — gating on activation kills fraud and aligns value). Ground the reward in customer value.

**3. Viral math** — estimate **k = invites sent × conversion rate**, and the **cycle time**. State honestly whether k approaches/exceeds 1 (true virality) or simply lowers CAC (the common, still-useful case). Don't promise exponential growth from a k of 0.2.

**4. Placement & messaging** — where the ask appears (anchored to the delight moment, not signup), the share channels, and copy that gives the sharer a *reason that makes them look good*.

**5. Fraud & abuse guardrails** — self-referral and fake-account defenses, reward gating on real activation, and limits/velocity checks.

**6. Metrics** — share rate, invite→signup→activation conversion, k-factor, referred-user retention vs. baseline, and CAC of referred vs. paid.

## Quality Checks

- [ ] The reward unlocks on the referred friend's **activation**, not just signup (aligns value, blocks fraud)
- [ ] The viral math (k-factor + cycle time) is estimated honestly — including admitting when it's a CAC-reducer, not true virality
- [ ] The ask is placed at a delight moment, not bolted onto signup
- [ ] Fraud guardrails (self-referral, fake accounts, velocity limits) are specified
- [ ] Referred-user retention is measured, not just signups (referred users can be low quality)

## Anti-Patterns

- [ ] Do not pay for signups instead of activations — you'll fund fraud and low-quality users
- [ ] Do not claim virality from a k-factor below 1 — be honest that it's lowering CAC, which is still worth doing
- [ ] Do not bolt the ask onto onboarding before the user has felt value — nobody refers a product they haven't experienced
- [ ] Do not ignore the sharer's social risk — give them a reason that makes them look generous/smart, not spammy
- [ ] Do not skip fraud guardrails — an ungated incentive is an arbitrage opportunity, not a growth loop

## Based On

Viral-loop / referral practice — k-factor and cycle-time math, activation-gated two-sided incentives, and abuse-resistant design.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
