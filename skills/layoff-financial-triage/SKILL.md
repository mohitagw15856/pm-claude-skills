---
name: layoff-financial-triage
description: "The first-72-hours money plan after a layoff — runway computed, deadlines caught, bleeding stopped, in priority order. Use when asked I just got laid off what do I do about money, build my layoff budget, how long can I last, or what needs to happen this week. Produces the runway number, the deadline list (healthcare, unemployment filing, equity exercise windows), the spending triage, and a one-week action checklist."
---

# Layoff Financial Triage Skill

The first week after a layoff has three jobs: know the runway number, catch the deadlines that expire silently, and stop the optional bleeding. Grief and job-searching come after solvency. This skill runs the triage in that order — numbers first, calmly, with dates.

## What This Skill Produces

- **The runway number** — months of survival at triage spending, computed
- **The deadline list** — everything with a clock: unemployment filing, healthcare election, equity exercise windows, 401(k) loan repayment triggers
- **Spending triage** — keep / pause / cancel, with the monthly recovery totaled
- **The one-week checklist** — ordered, dated, small enough to do while stunned

## Required Inputs

Ask for these if not provided:
- **Cash and near-cash** — checking, savings, anything liquid (not retirement)
- **Monthly spend** — rough is fine; the triage refines it
- **The exit terms** — final pay date, severance if any, healthcare end date, unvested/vested equity and its exercise window
- **Household** — partner income, dependents, anything on employer benefits (insurance, phone, disability)
- **Jurisdiction** — unemployment rules and timelines vary; never guess

## Framework

1. **Runway before feelings:** runway = liquid cash ÷ triage-level monthly spend. Compute it in the first section — an actual number beats dread every time.
2. **Deadlines are the emergency:** unemployment filing (file week one — eligibility often starts at filing, not at layoff), healthcare election windows, **equity exercise windows** (the classic five-figure silent expiry — bold it), FSA spend-down, 401(k) loan acceleration.
3. **Triage tiers:** Keep (housing, food, insurance, internet) · Pause (subscriptions, memberships — chain to `subscription-auditor`) · Cancel/renegotiate (the discretionary layer). Total the recovery per month.
4. **Do NOT list:** panic-selling investments, raiding retirement (penalties + taxes — flag as last-resort with the real cost computed), and paying off low-interest debt early "to feel lighter."
5. **Income bridges, honestly ranked:** unemployment first (it's insurance, not charity — say so), severance negotiation (chain to `severance-agreement-decoder`), then gig/contract stopgaps.

## Output Format

# Financial Triage: [date]
**Runway: [n.n] months** at triage spending ([current] → [triage] $/mo)

## The clock ⏰
| Deadline | Date | What expires | Action |
|---|---|---|---|

## Spending triage
| Item | $/mo | Verdict | Note |
**Recovered: $[n]/mo → runway extends to [n.n] months**

## Do-not list
[The panic moves, each with its real cost]

## This week, in order
Mon: … Tue: … (file unemployment day 1–2, always)

## Quality Checks

- [ ] The runway number leads, computed both pre- and post-triage
- [ ] Unemployment filing appears in the first two days of the checklist
- [ ] Equity exercise windows are surfaced and bolded if present
- [ ] Every triage verdict shows its monthly recovery; the total is stated
- [ ] Retirement-raiding appears only in the do-not list with its true cost

## Anti-Patterns

- [ ] Do not open with reassurance — open with the number; calm comes from arithmetic
- [ ] Do not let shame delay the unemployment filing — it's an insurance claim on premiums already paid
- [ ] Do not cut health insurance to extend runway — one ER visit undoes years; it's in Keep
- [ ] Do not build the plan on a hoped-for job date — runway assumes zero income until real income exists
- [ ] Do not moralize about past spending — triage looks forward only
