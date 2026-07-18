---
name: digital-legacy-planner
description: "Plan what happens to your digital life — the account inventory, the access plan that doesn't violate terms or law, platform legacy settings, and the memorialize/delete/preserve decisions, written down while it's easy. Use when asked what happens to my accounts when I die, set up a digital legacy plan, help an executor deal with online accounts, or how does my family get into my stuff. Produces the tiered inventory, the legal-access setup (password-manager emergency access + platform legacy tools), the wishes document, and the executor's digital checklist."
---

# Digital Legacy Planner Skill

Everyone now dies twice — once in the world and once across forty accounts, and the second death is unplanned in almost every family. The photos are in a cloud account nobody can enter, the subscriptions keep billing, and the email that could reset everything is locked behind the very 2FA that made it safe. This skill plans it while it's easy: inventory by importance, *legitimate* access routes (platform legacy tools and password-manager emergency access — not "here's my password on a sticky note," which is both fragile and often violates terms or law), and the wishes written where they'll be found.

## What This Skill Produces

- **The tiered inventory** — accounts by consequence: the keys (email, phone, password manager), the money, the memories, the long tail
- **The access plan** — platform legacy settings + password-manager emergency access, configured; the sticky-note anti-pattern replaced
- **The wishes document** — memorialize / delete / preserve / hand-to, per account-that-matters, plus the message-to-family
- **The executor's digital checklist** — for the other direction: someone died, here's the order of operations

## Required Inputs

Ask for these if not provided:
- **Which direction** — planning your own (the calm version) or handling someone else's (the checklist version, cross-linked with [estate-settlement-organizer](../estate-settlement-organizer/SKILL.md))
- **The digital footprint, roughly** — main email provider, phone platform, password manager (or its absence — fixing that is step one), where the photos live, anything monetized (channel, store, domains, crypto — the last needs special handling and its absence from this plan is a finding)
- **The people** — who should get access, who should decide, and whether those are the same person

## Framework: The Legitimacy-First Rules

1. **Tier by consequence, plan the top:** Tier 1 — the keys (primary email, phone account, password manager): whoever holds these holds everything, and they get the formal tools. Tier 2 — money (banking handled via the estate; here it's the *digital-only* value: payment apps, monetized accounts, domains, crypto). Tier 3 — memories (photos, messages — usually what the family actually grieves for). Tier 4 — the long tail (subscriptions to kill, socials to close). The plan is written top-down because time and attention run out bottom-up.
2. **Use the platforms' own legacy tools — they exist and almost nobody sets them:** Google's Inactive Account Manager, Apple's Legacy Contact, Facebook's legacy contact/memorialization — each takes minutes now and replaces months of grief-bureaucracy later. The plan lists the user's actual platforms with their tool named as configure-this-week items (flag: features change — verify in settings).
3. **Password-manager emergency access is the master move:** one well-configured emergency-access grant (with a waiting period) beats every list of passwords ever written — it stays current automatically, it's revocable, and it's the legitimate version of what the sticky note was trying to do. No password manager yet? That's the plan's first action item, before any legacy configuration.
4. **Sharing passwords ad hoc is the anti-plan:** it violates most platforms' terms, can create legal ambiguity for the survivor (unauthorized-access laws don't pause for grief — jurisdiction-varies, flagged), goes stale instantly, and fails exactly when 2FA works. The plan's job is making the legitimate routes so easy the workaround loses.
5. **Wishes are decisions, written down:** memorialize or delete the profiles? Photos to whom? The channel — archived or continued? Silence hands these to a grieving committee with no mandate; a one-page wishes document (stored with the will and named in the estate file) hands them answers. Include the human line — the message that says what mattered.

## Output Format

# Digital Legacy Plan: [name] — [date]

## The Inventory (tiered)
| Tier | Account/asset | Legacy tool | Status |
|---|---|---|---|

## Configure This Week
[The user's actual platforms → each legacy tool, as a checklist · password-manager emergency access: grantee + waiting period · the no-manager-yet branch]

## The Wishes Document (store with the will)
[Per Tier-1–3 item: memorialize / delete / preserve / hand to [name] · the crypto/domain special-handling note · the message to family]

## Executor's Digital Checklist (the other direction)
[Don't guess passwords (legal risk — flagged) → use legacy tools + death-certificate processes per platform → kill the billing tail → memorialize/close per wishes or family decision]

> Platform legacy features change and unauthorized-access laws vary by jurisdiction — verify tools in current settings and route legal questions (especially crypto and cross-border accounts) to the estate's attorney. Not legal advice.

## Quality Checks

- [ ] Tier 1 (email, phone, password manager) is planned before anything else
- [ ] Every named platform maps to its actual legacy tool, flagged verify-in-settings
- [ ] The password-sharing anti-pattern is replaced, not just discouraged
- [ ] Crypto/domains/monetized assets get their special-handling note or an explicit absence-finding
- [ ] The wishes document includes decisions, not just access

## Anti-Patterns

- [ ] Do not build the plan on a shared password list — stale, terms-violating, and 2FA breaks it
- [ ] Do not advise survivors to log in as the deceased — legal risk, jurisdiction-dependent, flag and route
- [ ] Do not inventory forty accounts with equal weight — the tiers are the plan
- [ ] Do not leave memorialize-vs-delete to the grieving — the wishes document exists to answer it
- [ ] Do not treat this as morbid housekeeping — frame it as the last considerate thing on the to-do list, because it is
