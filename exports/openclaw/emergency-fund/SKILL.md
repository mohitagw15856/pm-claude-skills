---
name: emergency-fund
description: "Size an emergency fund from essential spend and real risk factors — not a one-size 'six months' — with the funding timeline and where the money should sit. Use when asked how big should my emergency fund be, do I have enough saved, emergency fund or invest, or how many months of expenses do I need. Produces the risk-adjusted target from the script, the essential-spend worksheet, the funding plan, and the what-counts-as-an-emergency rules."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/emergency-fund.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Emergency Fund Skill

"Six months of expenses" is a slogan wearing a decimal — the real number depends on which expenses (essential, not total) and which risks (one income or two, steady or variable, how fast the job replaces itself). This skill computes the target from those inputs, builds the funding timeline, and writes the two rule-sets that make a fund work in practice: what counts as an emergency, and when to stop adding to the fund and start investing the surplus.

## What This Skill Produces

- **The risk-adjusted target** — base 3 months of *essentials*, plus priced risk adders, from the script
- **The essential-spend worksheet** — the emergency budget, which is smaller than the current budget on purpose
- **The funding plan** — gap, monthly rate, completion date, and what pauses (not stops) contributions
- **The two rule-sets** — is-this-an-emergency, and the fund-is-full-now-what line

## Required Inputs

Ask for these if not provided:
- **Essential monthly spend** — housing, food, utilities, insurance, minimum debt payments, transport; NOT the current all-in lifestyle number (help build this if they only know the total)
- **The risk profile** — single or dual income, income variability (freelance/commission/seasonal), dependents, how specialized the job market is
- **Current liquid savings and monthly saving capacity** — for the gap and timeline
- **What they're funding *instead*** — high-interest debt or an unmatched 401k competing for the same dollars changes the sequencing conversation

## Programmatic Helper

```bash
python3 scripts/emergency_fund.py --essentials 3400 --saved 4000 --monthly-save 500
python3 scripts/emergency_fund.py --essentials 3400 --saved 4000 --monthly-save 500 --single-income --variable-income --json
```

Deterministic: base 3 months + 1 (single income) + 2 (variable income) + 1 (dependents) + 1 (niche job market), capped by honesty — the flags are the risk conversation made explicit.

## Framework: The Sizing Rules

- **Essentials, not lifestyle** — the emergency budget already cancelled the subscriptions; sizing on total spend overshoots the target by months and delays being protected at all
- **Risk adders are facts, not fears** — each flag maps to a real replacement-time or volatility mechanism; a dual-income steady-job household genuinely needs less than a solo freelancer, and telling both "six months" mis-serves both
- **Sequencing beats purity** — a starter fund (~1 month) before attacking high-interest debt, the full fund after: 24% APR debt is itself an emergency, but zero buffer is how debt gets new charges
- **Liquidity is the product** — the fund lives where it's reachable in days without penalty or market risk; yield is the tiebreaker, never the criterion; anything past the target is investing money wearing a savings label
- **Emergencies are involuntary, necessary, and unexpected** — job loss, medical, the transmission; not the sale, the trip, or the holidays (those are sinking funds — name the distinction in the artifact)

## Output Format

---

# Emergency Fund Plan: [household]

## The Target
[Script output: months, adders, target, gap, months-covered-today, timeline]

## The Essential Budget
| Category | Monthly | Notes |
|---|---|---|
[The emergency-mode number, line by line]

## The Funding Plan
[Monthly rate → completion date · what pauses contributions (a real emergency) vs. what doesn't (a sale) · the starter-fund sequencing if high-interest debt exists]

## The Rules
**It's an emergency if:** involuntary, necessary, unexpected — all three. **The fund is full when:** [target] — after that, the same transfer redirects to [next goal], because past-target "safety" is just uninvested money.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

---

## Quality Checks

- [ ] The target is computed on essentials, with the worksheet shown
- [ ] Every risk adder maps to a stated mechanism, not generic caution
- [ ] The sequencing question (debt, match) is addressed when it applies
- [ ] The all-three emergency test appears in the artifact
- [ ] The stop-adding line exists — the fund has a ceiling, not just a floor

## Anti-Patterns

- [ ] Do not quote "3–6 months" as doctrine — compute this household's number and show why
- [ ] Do not size on lifestyle spend — it delays protection to fund cancelled subscriptions
- [ ] Do not chase yield with the emergency money — the fund's job is existing, not earning
- [ ] Do not let the fund become the goal — past target, saving more is a comfort habit with a real opportunity cost
- [ ] Do not shame the starter-fund compromise — one month of buffer changes lives before the spreadsheet is happy
