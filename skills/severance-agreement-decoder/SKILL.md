---
name: severance-agreement-decoder
description: "Decode a severance agreement before you sign it — what you're giving up, what's negotiable, and the deadlines that decide your leverage. Use when asked to decode my severance, is this severance offer normal, review my separation agreement, or should I sign this release. Produces a clause-by-clause decode with ranked red flags, the money math (severance vs what you're releasing), the consideration-period clock, and the asks worth making."
---

# Severance Agreement Decoder Skill

A severance agreement is a purchase: the company is buying a release of claims, and the price is negotiable exactly once — before you sign. This skill decodes what's actually being bought and sold, in the week you have to decide, while the shock is still loud.

## What This Skill Produces

- **The trade, stated plainly** — what they pay vs what you release, in one paragraph
- **Clause-by-clause decode** with 🔴🟡🟢 severity
- **The clock** — consideration and revocation windows (age-40+ rules differ), with dates computed
- **The asks worth making** — ranked by success likelihood, with wording

## Required Inputs

Ask for these only if not provided:
- **The agreement text** (paste; partial is workable — name what's missing)
- **The basics:** tenure, role, base pay, unvested equity, and the stated severance amount
- **Rough location** — release enforceability and pay-out rules vary by jurisdiction; never guess it
- **What matters most** — cash, healthcare runway, the narrative/references, or equity

## Framework: What to Walk

- **The release scope** (🔴 zone): claims released vs claims that legally *can't* be released (unemployment, workers' comp, agency charges — jurisdiction-dependent, flag as such); watch for release of *future* claims.
- **Severance math:** weeks-per-year offered vs the informal norms for the role/level; whether unvested equity, bonus proration, and PTO payout appear at all — silence on any of these is an ask, not an answer.
- **The strings** (🟡): non-disparagement (mutual or one-way?), cooperation clauses without time caps, re-affirmation of non-competes (sometimes *new* ones smuggled in — 🔴), confidentiality of the agreement itself.
- **Healthcare:** COBRA-style continuation math — who pays, for how long; an extra month of employer-paid coverage is often the easiest yes in the whole negotiation.
- **The clock:** consideration period (often 21/45 days where age-discrimination rules apply) and revocation window — signing early buys nothing; compute the actual dates.

## Output Format

### Severance Decode: [company]
**1. The trade:** they pay [X]; you release [scope] — worth it? [the one-paragraph read]
**2. Decode table** | Clause | Says | Means for you | Severity |
**3. 🚩 Ranked flags** — each: the quoted line, the realistic cost, the fix to ask for
**4. The money map** — offered vs the silent items (equity, bonus, PTO, healthcare), each: present/absent/ask
**5. The clock** — sign-by and revoke-by dates, computed
**6. The asks** — 2–4, ranked by likelihood, with exact wording ("I'll sign this week if the healthcare continuation extends to six months")

End verbatim: *"This is a plain-language reading, not legal advice — release law varies by jurisdiction; a one-hour employment-lawyer review before signing is usually the best money in this document."*

## Quality Checks

- [ ] The trade is stated as a purchase in the first section
- [ ] Every silent item (equity/bonus/PTO/healthcare) is flagged as present, absent, or ask
- [ ] The consideration/revocation dates are computed, not described
- [ ] Any NEW restrictive covenant is flagged 🔴 loudly
- [ ] Asks come with likelihood ranking and exact wording
- [ ] The lawyer-hour line appears verbatim

## Anti-Patterns

- [ ] Do not soften the moment — the reader just lost their job; clarity is the kindness
- [ ] Do not treat the offer as final — it's an opening bid bought with a release
- [ ] Do not present jurisdiction-dependent release rules as universal
- [ ] Do not let "standard agreement" pass unexamined — standard is what companies call their preferred terms
- [ ] Do not advise signing or refusing — decode, price, and hand the decision back with dates
