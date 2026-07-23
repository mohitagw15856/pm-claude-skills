---
name: "Plan the communications for deprecating a product, API, endp"
description: "Plan the communications for deprecating a product, API, endpoint, or feature that customers depend on. Use when winding down or sunsetting something, planning a breaking change, or migrating customers off a legacy path. Produces a staged timeline with grace periods, tiered customer messaging, a migration-guide outline, the channel plan, and an internal escalation playbook for the highest-risk accounts. This is the customer-communications program — distinct from [[feature-sunset-plan]] (the kill decision, data handling, and code removal) and [[api-versioning-strategy]] (the technical versioning mechanics)."
---

# Deprecation Comms Plan Skill

Deprecations go wrong in two ways: too fast (customers get broken and churn angry) or too quiet (they find out when it breaks). This skill plans the wind-down as a *communications program*, not an announcement — enough runway, messaging matched to how much each customer depends on the thing, a real migration path, and a plan for the accounts that will need a human.

## Working from a brief

Given what's being deprecated and why, **produce the full plan** — infer the risk tiers from usage and contract exposure. Right-size the runway to how hard the migration is (an internal flag flip is weeks; a public API is many months). If there's no migration path yet, flag that as a blocker before any announcement.

## Required Inputs

Ask for (if not provided, else infer and label the assumption):
- **What's being deprecated** and **why** (cost, security, strategy, replaced-by)
- **Who depends on it** — rough usage, and which segments/contracts are exposed
- **The replacement / migration path** (or that there isn't one yet)
- **Hard constraints** — a forcing date (security, legal, contract), team capacity

## Output Format

### Deprecation policy in one line
The principle you're committing to (e.g. _"announce → N months deprecated (works, warns) → sunset, with a migration path live before we announce"_).

### Timeline

| Phase | Date / window | What changes | What customers can still do |
|---|---|---|---|
| Announce | | nothing breaks; docs + warnings | full use, start migrating |
| Deprecated | | warnings, no new adoption | migrate |
| Sunset | | turned off | must have migrated |

Include grace periods and any extension policy for large accounts.

### Tiered messaging
Segmented by dependence, not one blast:
- **Tier 1 — heavy/contractual users:** proactive, human (CSM/AM), often a call + tailored plan.
- **Tier 2 — active users:** direct email + in-product warning + migration guide.
- **Tier 3 — light/dormant:** changelog, docs banner, deprecation headers.

For each: the core message (what, when, why, what to do), the ask, and the escalation path.

### Migration guide outline
The structure of the how-to: before/after, step-by-step, code/config examples, a mapping table (old → new), FAQ, and where to get help.

### Channel plan
Which channels fire at which phase — email, in-product, docs/changelog, API deprecation headers/`Sunset` header, status page, community/social — and the cadence (announce, reminders at intervals, final notice).

### Internal escalation playbook
The at-risk account list, who owns each, the CSM talking points, the "customer can't migrate in time" decision tree, and the exception/extension approval path.

## Quality Checks

- [ ] A migration path exists and is referenced everywhere before any customer message goes out
- [ ] Runway is sized to migration difficulty, with grace periods stated
- [ ] Messaging is tiered by dependence; Tier-1 accounts get a human, not a blast
- [ ] Every message says what, when, why, and the exact next step
- [ ] The channel cadence includes reminders and a final notice, not a single announcement
- [ ] High-risk accounts have a named owner and an escalation/extension path

## Anti-Patterns

- Too little runway for the migration actually required
- A silent breaking change, or burying it in a changelog nobody reads
- Announcing before the migration path is live
- One-size messaging that treats a whale like a dormant free user
- No plan for the accounts that physically can't migrate in time
- "Why" that blames the customer or the old system instead of owning the change
