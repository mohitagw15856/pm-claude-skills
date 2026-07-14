---
name: "Read your marketing claims, landing page, or ad copy the way"
description: "Read your marketing claims, landing page, or ad copy the way a consumer-protection investigator would (FTC/ASA framing) and draft the inquiry letter they could send. Use when asked to check my marketing claims, read this like a regulator, audit my landing page for claim risk, or is this ad compliant. Produces a claim inventory with substantiation demands, the inquiry letter, and a fix-or-drop debrief per claim."
---

# Regulator Eyes Skill

Marketing is written for customers but eventually read by regulators, competitors, and plaintiff's lawyers. This skill performs that hostile reading now: every claim inventoried, the substantiation each would require, and the inquiry letter that arrives when someone files a complaint. (Environmental claims have a dedicated sibling: `greenwashing-self-audit`.)

## What This Skill Produces

- **Claim inventory** — every express and implied claim, including ones made by images, testimonials, and omission
- **Substantiation demands** — what evidence a regulator would require per claim, and whether the user has it
- **The inquiry letter** — the civil investigative demand / information request they could receive
- **Fix-or-drop debrief** — per claim: keep with evidence, reword, add disclosure, or drop

## Required Inputs

Ask for these if not provided:
- **The marketing material** — landing page text, ad copy, emails, app store listing (paste it)
- **What evidence exists** — studies, data, guarantees infrastructure (or "none yet" — that's an answer)
- **Jurisdiction/vertical** (optional) — default to US FTC framing; flag if health, finance, or children's products (higher bar)

## Framework: How an Investigator Reads

| Pass | Looking for |
|---|---|
| 1. Express claims | Direct statements: "fastest", "clinically proven", "saves 40%", "#1" |
| 2. Implied claims | What a reasonable consumer takes away — before/afters, testimonials as typical results, comparison imagery |
| 3. Material omissions | Conditions, fees, auto-renewals, "results not typical" realities left unsaid |
| 4. Format traps | Fake countdown timers, dark-pattern cancellation, undisclosed endorsements/affiliates |

**Risk scale:** 🔴 enforcement-grade (deceptive on its face or unsubstantiated health/money claim) · 🟡 challengeable (defensible only with evidence the user must produce) · 🟢 puffery (opinion no reasonable consumer takes literally — "the best coffee in town").

Judge claims by the *net impression on a reasonable consumer*, not the writer's intent — that is the actual legal standard's shape.

## Output Format

---

# Regulatory Reading: [Asset] — [date]

> Simulation — a plausible adversarial reading, not a prediction or legal advice.

## Claim Inventory
| # | Claim (verbatim) | Type (express/implied/omission) | Substantiation required | User has it? | Risk |
|---|---|---|---|---|---|

## The Inquiry Letter
[A formal information request citing the specific claims, demanding the substantiation, with a response deadline — the document that starts a very bad quarter.]

## Debrief — out of character
| # | Verdict | New wording or required disclosure |
|---|---|---|
[keep / reword / disclose / drop for every 🔴 and 🟡]

*Confirm anything load-bearing with an advertising-law attorney — standards vary by jurisdiction and vertical.*

---

## Quality Checks

- [ ] Implied claims and omissions are inventoried, not just literal sentences
- [ ] Every 🔴 names the specific missing substantiation, not "needs evidence"
- [ ] Puffery is honestly rated 🟢 — inflating everything to red destroys the signal
- [ ] The letter cites the user's actual claims verbatim
- [ ] Every red/yellow claim gets a concrete verdict with replacement wording where kept

## Anti-Patterns

- [ ] Do not grade intent — grade the net impression on a reasonable consumer
- [ ] Do not invent claims the material doesn't make; the inventory quotes the source
- [ ] Do not offer "add an asterisk" as a fix for a deceptive net impression — disclosures cure omissions, not lies
- [ ] Do not treat testimonials as safe because they're "just customers talking" — typicality is the user's problem
- [ ] Do not stay in character in the debrief
