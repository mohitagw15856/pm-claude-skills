# Worked Example — Pay Stub Decoder

A gold-standard run of this skill: a "my paycheck feels small" stub that decodes into two real errors — a stopped employer match and a wrong-state tax line — worth $2,900 a year combined.

## The brief

Sam, a salaried analyst at $78,000/year paid semi-monthly ($3,250 gross per period), asks why the paycheck "feels smaller than it should." Stated situation: single filer, elected 6% traditional 401k with a 50%-of-first-6% employer match, employee-only health plan at ~$95/period, moved from Ohio to Colorado four months ago and told HR "around then." The stub (period 14 of 24) shows: GROSS 3,250.00 · FED W/H 297.10 · OASDI 201.50 · MED 47.13 · OH ST TX 81.20 · 401K 195.00 · MED PRETX 95.00 · DENTL 12.40 · LTD 8.15 · NET 2,312.52. YTD columns include 401K 2,730.00 and ER MATCH 682.50.

## The output

### Pay Stub Decode: period 14/24, semi-monthly

**The waterfall:** Gross $3,250.00 → taxes −$626.93 (19.3%) → pre-tax −$290.00 → post-tax −$20.55 → **Net $2,312.52** (71.2% of gross)

**Line decode**

| Line/code | Plain English | Amount | /year | Check |
|---|---|---|---|---|
| FED W/H | Federal income tax withholding | 297.10 | 7,130 | plausible for single/no-adjustments — verify against your W-4 |
| OASDI | Social Security (6.2% of gross) | 201.50 | 4,836 | ✓ exactly 6.2% |
| MED | Medicare (1.45%) | 47.13 | 1,131 | ✓ exactly 1.45% |
| OH ST TX | **Ohio** state income tax | 81.20 | 1,949 | ⚠ you live in Colorado |
| 401K | Your traditional 401k (pre-tax) | 195.00 | 4,680 | ✓ exactly 6% of gross |
| MED PRETX | Health premium, pre-tax | 95.00 | 2,280 | ✓ matches election |
| DENTL | Dental premium | 12.40 | 298 | ✓ |
| LTD | Long-term disability premium (post-tax — note: post-tax premiums often mean untaxed benefits; worth confirming this is intended) | 8.15 | 196 | ✓ |

**⚠ Findings**

1. **The employer match stopped after period 7.** Expected: 50% × 6% = $97.50/period → $1,365 YTD by period 14. Actual YTD ER MATCH: $682.50 = exactly 7 periods. The single stub hides this (match isn't a deduction line); the YTD column shows it. Annualized gap if unfixed: **$2,340/year of free money not arriving.** Likely cause: a benefits-system event around period 7 (the move? a plan re-enrollment?) silently zeroing the match.
2. **State tax is going to Ohio, four months after the Colorado move.** $81.20/period to OH while CO obligations accrue unpaid — an annualized $1,949 to the wrong state, plus a filing-season mess growing each period. Likely cause: the address change hit HR but not payroll's tax profile.
3. **Not an error, but the answer to "why it feels small":** the check is 71.2% of gross, and $302.40/period of the gap is your own 401k + health elections — money that's yours (savings) or buying coverage, not vanished. The waterfall is working as designed outside findings 1–2.

**For payroll:** "Two items on my period-14 stub: (1) YTD employer match is $682.50, which equals 7 periods of $97.50 — my 6% election has continued, so match should be accruing; can you restore it and confirm whether missed periods 8–14 will be trued up? (2) My state tax line still shows Ohio; I moved to Colorado effective [date], notified HR [date]. Please correct the work/residence state going forward and advise on the YTD misallocation."

**Looks right:** OASDI and Medicare are to-the-cent correct; 401k deduction matches the 6% election exactly; health and dental match elections; federal withholding is in the plausible band for the stated filing status.

*"This is a plain-language reading, not tax or legal advice — payroll rules vary by jurisdiction; confirm anything load-bearing with payroll or a tax professional."*

## Why it's shaped this way

- **The YTD column found the biggest error** — the stopped match appears on no single-period line; $682.50 ÷ $97.50 = exactly 7 periods is the arithmetic tell. This is framework rule 5 (YTD is the audit trail) earning its keep.
- **Every finding shows period and annualized numbers** — $97.50 reads ignorable; $2,340/year does not. The annualize-the-surprises rule exists because urgency scales with the yearly figure.
- **The wrong-state line was checked against the stated life, not the stub's internal consistency** — the stub is self-consistent; only the user's "I moved four months ago" exposes it. That's why the skill demands the expectations as required inputs.
- **The waterfall reconciles to the stated net to the cent** — 3,250.00 − 626.93 − 290.00 − 20.55 = 2,312.52 — because a decode that doesn't reconcile can't claim to have decoded anything.
- **"Feels small" got a real answer beyond the errors** — finding 3 attributes most of the gap to the user's own elections, distinguishing taxes, savings, and benefits per the anti-pattern about treating all deductions as losses.
- **Clean lines are affirmed explicitly** — OASDI/Medicare verified to the cent, elections matched — because decoded confidence is half the product; silence would leave every unmentioned line under suspicion.
- **The payroll message is line-numbers and expected-vs-actual, zero temperature** — including the true-up question for the missed match periods, which is the ask most people forget; per the anti-patterns, tone gets ticket queues and specifics get fixes.
- **The LTD post-tax note stops at "worth confirming"** — the tax treatment of disability premiums is consequential but jurisdiction- and plan-dependent, so the decode flags it without crossing into tax advice.
