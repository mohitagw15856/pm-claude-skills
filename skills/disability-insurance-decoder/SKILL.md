---
name: disability-insurance-decoder
description: "Decode a disability insurance policy or employer LTD plan — own-occupation vs any-occupation, the benefit math after offsets and taxes, and the definitions that decide whether it pays. Use when someone asks 'is my disability insurance any good', 'decode my LTD policy', 'what does own-occupation mean', or 'how much would I actually get'. Produces a definition decode of the clauses that decide claims, the real benefit math after offsets, ranked red flags, and the questions to ask before relying on the coverage."
---

# Disability Insurance Decoder Skill

Disability insurance is the coverage most likely to be needed and least likely to be read — and its entire value hides in definitions. "60% of income" can mean 60%, or it can mean 60% of base-only, minus Social Security, minus state benefits, taxed — call it 31%. Whether you're "disabled" at all depends on two words: *own* occupation or *any* occupation, and on which date that definition quietly changes. This skill reads the definitions like a claims adjuster will.

## What This Skill Produces

- The definition decode: own-occ vs. any-occ (and the switch date), "total" vs. "residual" disability, pre-existing look-back windows
- The real benefit math: stated % → after offsets → after taxes (premium-payer rule) → real monthly number
- Ranked red flags: offset clauses, benefit-period limits for mental-health/musculoskeletal claims, the 24-month own-occ switch
- The reliance checklist — what to confirm with HR or the insurer before treating this coverage as a plan

## Required Inputs

Ask for these only if they aren't already provided:

- **The policy or plan documents** — the certificate/summary plan description; the definitions section is the one that matters. Decode what's provided, list what's missing.
- **Their income shape** — base vs. bonus/commission split (many plans cover base only — a 40%-commission earner has half the coverage they think).
- **Who pays the premium and how** — employer-paid pre-tax vs. self-paid post-tax generally flips whether benefits are taxed; flag as jurisdiction/plan-dependent.
- **Their occupation** — the own-occ vs. any-occ distinction bites hardest for specialized professionals.

## Framework: Severity Scale

- 🔴 **Can cost you real money** — any-occupation definitions (benefits stop if you can do *any* job you're suited for — quote the exact wording), the own-occ-for-24-months-then-any-occ switch (the industry's quietest clause; find the date), offset stacking (Social Security, state disability, workers' comp all subtracted — the stated 60% is a ceiling, not a floor), base-salary-only coverage for variable-comp earners, 24-month benefit caps on mental-health and self-reported-symptom claims, pre-existing exclusion look-backs that catch recent diagnoses.
- 🟡 **Unusual — clarify before relying** — long elimination periods vs. their emergency fund (a 180-day wait needs 6 months of runway), residual/partial disability terms (can they work part-time and collect?), portability on leaving the employer (usually none — flag it), cost-of-living riders absent on long benefit periods.
- 🟢 **Standard** — ordinary elimination periods with adequate runway, true own-occupation definitions, standard exclusions; label the strong parts — a good policy deserves confidence.

Always show the math: **stated benefit → minus each quoted offset → tax treatment applied (flagged as depends-on-premium-payer, verify) → the real monthly number vs. their real monthly expenses.** The gap between those last two numbers is the finding.

## Output Format

### Disability Coverage Decode: [policy/plan]

**1. The verdict** — the real monthly number vs. their expenses, the definition that governs, and the single clause most worth knowing about.

**2. Definition decode**

| Clause | The policy's words (quoted) | What it means when claiming | Severity |
|---|---|---|---|

**3. The benefit math** — stated % → offsets → taxes → real number, arithmetic shown, assumptions labeled `[verify]`.

**4. 🚩 Red flags, ranked** — quoted language, the claim scenario where it bites, the dollar effect.

**5. The reliance checklist** — what to confirm in writing (own-occ switch date, offset list, tax treatment, portability), and the gap a supplemental individual policy would need to fill — described, not sold.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Own-occ vs. any-occ is quoted verbatim, with any switch date extracted
- [ ] The benefit math runs all the way to a real monthly number vs. real expenses
- [ ] Offsets are listed from the policy text, never assumed absent
- [ ] Tax treatment is flagged as premium-payer-dependent, not asserted
- [ ] Variable-comp earners get the base-only check explicitly
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not invent definitions or offsets that aren't in the documents
- [ ] Do not let the stated percentage stand as the headline — the after-everything number is the headline
- [ ] Do not present tax and benefit-coordination rules as universal — they vary by jurisdiction and plan
- [ ] Do not soften the any-occ finding — for a specialist, it's the difference between covered and not
- [ ] Do not sell products — naming the gap is the job; filling it is the user's shopping trip

## Based On

Policyholder-side disability review practice — definition-first reading, offset math, claim-scenario testing.
