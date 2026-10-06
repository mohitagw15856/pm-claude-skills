---
name: expense-audit
description: "Audit spending to find leaks — recurring subscriptions, creep, and cuttable costs — ranked by impact. Use when asked to cut expenses, review subscriptions, find where money is going, or free up cash. Produces a categorized spend breakdown, a ranked list of cuts with dollar amounts, and the annualized savings. Educational, not regulated financial advice."
---

# Expense Audit Skill

Money leaks quietly — forgotten subscriptions, lifestyle creep, small daily costs that annualize into a lot.
This skill audits someone's spending, surfaces the **leaks ranked by annual impact**, and proposes specific
cuts with dollar amounts — so they free up cash without a vague "spend less". Educational, not personalized
financial advice.

## Required Inputs

Ask for these only if they aren't already provided:

- **Spending data** — a list of expenses or transactions (paste what they have: statements, a rough list, categories + amounts).
- **Which are recurring** — subscriptions and memberships, with frequency.
- **What's off-limits** (optional) — costs they won't cut (and why), so suggestions stay realistic.
- **Goal** (optional) — a target amount to free up.

## Output Format

### Expense audit — [name]

**Where the money goes**

| Category | Monthly | % of spend | Annualized |
|---|---|---|---|
| | $ | % | $ |

**🔁 Recurring / subscriptions** — every recurring charge found, with monthly + annual cost, and a verdict (keep / downgrade / cancel / negotiate). Flag duplicates and "haven't used it" candidates.

**✂️ Ranked cuts** — the highest-impact opportunities first, each with the **annual** dollar saving and how to do it:

| Cut | Monthly saved | Annual saved | How |
|---|---|---|---|
| | $ | $ | |

**Total opportunity:** **$X/year** if all suggested cuts are made (and a realistic "easy wins only" subtotal).

**Notes** — what was assumed; the "small daily cost" reframed annually (e.g. "$6 coffee × workdays ≈ $1,500/yr"); anything to verify on a statement.

## Quality Checks

- [ ] Spending is categorized with both monthly and annualized figures
- [ ] Every recurring charge is listed with a keep/downgrade/cancel/negotiate verdict
- [ ] Cuts are ranked by annual impact, each with a dollar amount and a how-to
- [ ] A clear total opportunity (and an easy-wins subtotal) is given
- [ ] Suggestions respect the off-limits items and stay realistic

## Anti-Patterns

- [ ] Do not say "spend less" — every cut must name an amount and a method
- [ ] Do not rank by monthly when annual reveals the real impact — annualize everything
- [ ] Do not suggest cutting things the person flagged as off-limits
- [ ] Do not miss the silent recurring charges — those are usually the biggest, easiest wins
- [ ] Do not present this as personalized financial advice

## Based On

Spending-audit / subscription-audit practice (categorize, annualize, rank cuts by impact).

## Example Trigger Phrases

- "Cut expenses."
- "Review subscriptions."
- "Find where money is going."
- "Free up cash."
