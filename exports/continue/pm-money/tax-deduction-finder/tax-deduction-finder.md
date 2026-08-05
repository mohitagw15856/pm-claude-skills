---
name: "Surface the personal tax deductions and credits you might be"
description: "Surface the personal tax deductions and credits you might be missing — so you can research them or raise them with your tax preparer before you file. Use when asked what tax deductions can I claim, am I missing any tax breaks, deductions for [job/situation], or help me lower my tax bill. Produces a tailored list of commonly-missed deductions/credits for your situation, what records each needs, the ones worth digging into, and clear flags to verify against current rules or a professional. Educational — not tax advice, and rules vary by country and year."
---

# Tax Deduction Finder

People overpay tax every year by missing deductions and credits they qualify for — for work expenses, education, home office, dependents, charitable giving, or life events. This surfaces the commonly-missed ones relevant to *your* situation so you can research them or bring them to your preparer — while being explicit that tax rules vary by country and year and this isn't tax advice.

## What This Skill Produces

- **A tailored list** — commonly-overlooked deductions/credits that may fit your job, family, and life events
- **What each needs** — the records/receipts required to actually claim it
- **Priority to investigate** — the higher-value or most-likely-applicable ones to dig into first
- **Questions for your preparer** — specific things to ask so nothing's left on the table
- **Clear verify flags** — that eligibility, limits, and existence of each break depend on your jurisdiction and the current tax year

## Required Inputs

Ask for these if not provided:
- **Your situation** — employment type (employed/self-employed/freelance), income sources
- **Life factors** — dependents, education, home ownership, home office, medical, moving, charity
- **Region & year** — country/state and tax year (rules change annually)
- **How you file** — yourself or with a preparer
- **Known claims** — what you already claim, to avoid repeats

## Framework: Match Situation To Breaks, Then Verify

1. **Map deductions to the person's life.** Self-employment, education, dependents, home office, medical, charitable giving, and major life events each unlock different breaks — target theirs.
2. **Separate deductions from credits.** Credits (reduce tax directly) are often more valuable than deductions (reduce taxable income) — flag the high-value ones.
3. **Name the records needed.** A deduction you can't document is a deduction you'll lose in an audit — list what to keep.
4. **Prioritize by value and likelihood.** Point to the ones most worth researching first, not an exhaustive dump.
5. **Insist on verification.** Every item is jurisdiction- and year-specific with thresholds — mark all as "confirm current rules / ask a professional," never asserted as guaranteed.

## Output Format

### Deduction finder: [situation] · [region] · tax year [x]

**Possibly missing** (verify eligibility)
| Break | Deduction/Credit | Who it fits | Records needed |
|---|---|---|---|
| [item] | [type] | [situation] | [receipts/proof] |

**Dig into first:** [highest-value / most-likely items].
**Ask your preparer:** [specific questions].

> Educational only — not tax advice. Eligibility, limits, and whether a break exists depend on your country/state and the tax year. Confirm current rules or consult a tax professional before claiming.

## Quality Checks
- [ ] Deductions/credits are matched to the person's actual situation
- [ ] Distinguishes higher-value credits from deductions
- [ ] Lists the records needed to claim each
- [ ] Prioritizes what to investigate first
- [ ] Flags everything as jurisdiction/year-specific — verify or ask a pro
- [ ] States it isn't tax advice

## Anti-Patterns
- **Asserting a deduction exists** as fact — rules vary by place and year.
- **A generic dump** ignoring the person's situation.
- **Ignoring documentation** needed to actually claim it.
- **Confusing credits and deductions.**
- **Posing as tax advice** rather than prompts to verify/ask a pro.

## Example Trigger Phrases
- "What tax deductions am I missing as a freelancer?"
- "Are there tax breaks for having a home office?"
- "Help me find deductions I can claim before I file."
- "What credits might I qualify for with two kids and student loans?"
- "Questions to ask my accountant so I don't overpay tax."
