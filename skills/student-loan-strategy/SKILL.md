---
name: student-loan-strategy
description: "Decide what the extra money does about student loans — attack them, invest alongside them, or ride a forgiveness track — with the three paths simulated on your actual loans and the guaranteed-vs-assumed framing kept honest. Use when asked should I pay off my student loans faster, pay loans or invest, is my forgiveness track worth it, or model my student debt. Produces the three-path comparison from the script, the guaranteed-return framing, the forgiveness-track math with its warnings, and the decision sheet."
---

# Student Loan Strategy Skill

The student-loan question is really an allocation question: the same $400/month can attack the balances (a *guaranteed* return equal to the weighted APR), sit in investments (a *higher assumed* return with risk attached), or — on a forgiveness track — do active damage, since extra payments shrink the amount that would have been forgiven. The right answer depends on the APRs, the program, and the person's risk temperament, and the honest move is simulating all three on the actual loans and naming which assumptions carry the conclusion.

## What This Skill Produces

- **The three-path comparison** — attack / minimums-plus-invest / forgiveness-ride, from the script, on the real loans
- **The honest framing** — guaranteed APR vs. assumed return, stated as the different things they are
- **The forgiveness math** — what riding costs, what gets discharged, and the extra-payments-hurt-here warning
- **The decision sheet** — the numbers plus the non-model factors (risk temperament, cash-flow relief, program-trust), position taken

## Required Inputs

Ask for these if not provided:
- **Every loan** — balance, APR, minimum (federal vs. private noted: forgiveness and income-driven options generally attach to federal only — flagged jurisdiction/program-specific)
- **The extra amount** — the real monthly number in play
- **Forgiveness status** — on a track (employment-based, income-driven horizon)? Months remaining and the program named; not on one? The branch disappears honestly
- **The temperament** — how they'd feel about market losses while carrying debt; it's a legitimate input, not noise

## Programmatic Helper

```bash
python3 scripts/student_loan_strategy.py --loan "grad:38000:6.8:410" --loan "undergrad:12000:4.5:130" --extra 400
python3 scripts/student_loan_strategy.py --loan "fed:52000:6.2:560" --extra 300 --forgiveness-months 84 --json
```

Deterministic. Attack = avalanche; invest = extra compounding at the assumed return until natural payoff; forgiveness = minimums to the horizon with the remainder shown as discharged (program rules verify-required).

## Framework: The Allocation Rules

1. **APR vs. assumed return is the whole comparison, framed honestly:** paying a 6.8% loan is a guaranteed, tax-free-ish 6.8%; the market's 6% is an assumption with variance. High-APR loans (7%+) make attacking nearly unbeatable; low-APR loans (3–4%) make investing genuinely competitive — the script's weighted APR is the pivot number.
2. **The split strategy is usually the adult answer:** attack the high-APR loan while investing enough to capture any employer match (the match outranks everything — it's an instant 50–100%); the pure strategies are cleaner in spreadsheets than in lives.
3. **Forgiveness tracks invert the logic:** on a credible track, extra payments reduce the discharge — the strategy becomes *minimize payments within the rules* and bank the extra elsewhere. The two warnings ride along verbatim: program rules change and eligibility has failure modes (verify with the servicer, keep the paper trail), and the discharged amount may have tax treatment (jurisdiction-specific — flag it).
4. **Cash-flow relief is a real return:** killing a $410 minimum frees $410/month of *mandatory* obligation — worth something beyond the interest math when income is volatile; the decision sheet prices it in words.
5. **Refinancing is a one-way door, named not walked:** refinancing federal loans to a lower private rate trades away income-driven options and forgiveness eligibility permanently — the skill flags when the math tempts that direction and routes the decision to proper research, not a footnote.

## Output Format

---

# Student Loan Strategy: [N] loans, [total] — extra [amount]/mo

## The Three Paths
[Script output: attack vs. minimums+invest vs. forgiveness-ride]

## The Honest Frame
[Weighted APR vs. assumed return, in one paragraph — which path the numbers favor and how sensitive that is to the return assumption]

## The Decision Sheet
Match captured first: [yes/no — fix first if no] · Temperament: [their words, weighed] · Cash-flow value of payoff: [named] · Forgiveness trust level: [if applicable] · **The read:** [a position with reasoning]

*Program rules, tax treatment, and refinancing consequences are jurisdiction- and program-specific — verify with the servicer and a professional before acting. Educational model, not financial advice.*

---

## Quality Checks

- [ ] All three paths (or two, honestly, if no forgiveness track) are simulated on the real loans
- [ ] Guaranteed vs. assumed is framed explicitly, never blended
- [ ] The employer-match check happens before any other allocation
- [ ] Forgiveness branches carry both warnings verbatim-in-spirit
- [ ] The read takes a position and names its hostage assumption

## Anti-Patterns

- [ ] Do not compare APR to assumed returns as equals — one is guaranteed, and the framing is the product
- [ ] Do not recommend extra payments on a credible forgiveness track — the math inverts and the skill must too
- [ ] Do not skip the match — allocating around free money is malpractice-by-spreadsheet
- [ ] Do not push refinancing federal loans from inside a calculator — one-way doors get named and routed
- [ ] Do not moralize debt urgency — a 3.5% loan is cheap money and saying so is honesty, not heresy
