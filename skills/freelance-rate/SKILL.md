---
name: freelance-rate
description: "Derive a freelance day/hourly rate backwards from target income, honest billable utilization, overhead, and the self-employment tax premium — the arithmetic that proves a rate is not salary÷2000. Use when asked what should I charge as a freelancer, how do I set my consulting rate, why is my freelance rate so high, or convert my salary to a contract rate. Produces the required-revenue breakdown, billable-hours math, the hourly and day rate, and the multiplier vs the naive salary÷2000 number."
---

# Freelance Rate Skill

New freelancers price by dividing their old salary by 2,000 hours and wondering why they're broke by March. The employer was silently paying for benefits, taxes, tools, sales time, and dry spells — and now all of that lives inside the rate. This skill derives the rate *backwards* from target income through honest utilization, so the number arrives with its own justification attached — which is exactly what you need when a client asks why you charge it.

## What This Skill Produces

- **Required revenue** — target income + self-employment tax premium + business overhead
- **Honest billable hours** — working weeks × hours × billable %, with the billable % defended
- **The rate** — hourly and day rate, plus the multiplier vs naive salary÷2000
- **The justification narrative** — the same math in client-safe words, for the "why so much?" conversation

## Required Inputs

Ask for these if not provided:
- **Target pre-tax personal income** — what they want to pay themselves, not what they hope to gross
- **Business overhead** — insurance, tools, accounting, coworking (default $12,000/yr, labeled)
- **Weeks off** — vacation + sick + admin-only weeks (default 6, labeled)
- **Billable %** — the honest one; 60% is a realistic default, 80%+ is a mature practice with full pipeline, 100% is a fantasy

## Programmatic Helper

```bash
python3 scripts/freelance_rate.py --target 90000
python3 scripts/freelance_rate.py --target 90000 --billable-pct 55 --overhead 14000 --json
```

Deterministic. The tax premium default (8%) is a placeholder for the self-employment delta and varies by jurisdiction — set `--extra-tax-pct` to the user's real number or say it's the default.

## Framework: The Utilization Honesty Rules

- **Billable % is the make-or-break input** — sales calls, proposals, invoicing, learning, and gaps between clients are all unbillable; freelancers who assume 100% have priced their own bankruptcy
- **The employer's invisible spend is now yours** — payroll-tax share, benefits, equipment, paid holidays: the reason market contract rates run 1.5–2.5× salary-equivalent hourly, and why that multiple is fair, not greedy
- **Derive backwards, not forwards** — start from the life the rate must fund; "what do competitors charge" is a sanity check, not a derivation
- **Round up, not down** — a rate you can discount from beats a rate you must survive on; anchoring low is nearly irreversible with an existing client
- **The rate is also a filter** — clients who balk at a defensible rate are usually the ones who scope-creep; the math doubles as the screening mechanism

## Output Format

---

# Freelance Rate: [name/practice]

## The Derivation
[Script output: required revenue → billable hours → hourly/day rate → multiplier vs naive]

## The Client-Safe Justification
[2–3 sentences translating the math for a client: what the rate covers, why it maps to a salary of X, no apology in it.]

## Sensitivity
[One line: the rate at billable 50% / 60% / 70% — utilization is the input to watch.]

*Educational model, not financial or tax advice — verify the tax premium and business setup with a licensed professional.*

---

## Quality Checks

- [ ] Billable % is defended, not assumed at 100%
- [ ] The tax premium is labeled jurisdiction-dependent
- [ ] The multiplier vs salary÷2000 appears with its explanation
- [ ] The client-safe justification contains no apology
- [ ] The disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not derive the rate from salary÷2000 — that's the error this skill corrects
- [ ] Do not assume 100% (or even 80%) billable for a new freelancer
- [ ] Do not present the rate without the justification narrative — the number alone invites haggling
- [ ] Do not give jurisdiction-specific tax advice — flag the premium as a parameter
- [ ] Do not price to "win the client" — price to fund the practice, then decide about discounts consciously

## Example Trigger Phrases

- "What should I charge as a freelancer?"
- "How do I set my consulting rate?"
- "Why is my freelance rate so high?"
- "Convert my salary to a contract rate."
