---
name: college-cost
description: "Compute what a degree will actually cost — sticker minus real aid, inflated per year, split into cash and loans, with the loan's decade-long monthly tail made visible before enrollment instead of after. Use when asked what will college really cost, compare these two offers' real prices, how much loan payment after graduation, or is this school affordable. Produces the all-in number from the script, the offer-letter decode (grants vs loans untangled), the monthly-tail reality check, and the two-school comparison."
---

# College Cost Skill

The two numbers that matter — the true all-in cost, and the monthly payment for the decade after — appear nowhere on the marketing or, tellingly, the financial-aid letter, which routinely blends grants (free) with loans (very much not) into one cheerful "award." This skill computes both numbers: net cost per year with aid honestly sorted, inflated forward (tuition outruns CPI), split into cash and borrowed, and the borrowed part converted into the graduate's first decade of monthly reality. Two offers become comparable the moment both are run through it.

## What This Skill Produces

- **The all-in number** — net 4-year cost, cash vs. borrowed, from the script
- **The offer decode** — the award letter's lines sorted: grants/scholarships (free) vs. loans (repaid) vs. work-study (earned) — the blend untangled
- **The monthly tail** — the post-graduation payment, term, and total interest, stated next to a starting-salary reality check
- **The comparison** — two+ schools on identical assumptions, which the letters never are

## Required Inputs

Ask for these if not provided:
- **The sticker** — full cost of attendance (tuition + room/board + fees, not tuition alone — the letter's fine print has it)
- **The aid, sorted** — the award letter's actual lines; anything ambiguous gets decoded ("award" ≠ grant until proven), and renewal conditions noted (GPA floors, year-one-only grants — the classic bait)
- **The family math** — what's payable in cash per year without borrowing; the gap is the loan share
- **The candidate schools** — for comparisons, each letter, same treatment

## Programmatic Helper

```bash
python3 scripts/college_cost.py --sticker 32000 --aid 14000
python3 scripts/college_cost.py --sticker 32000 --aid 14000 --loan-share 60 --loan-apr 6.5 --json
```

Deterministic. Defaults: 4% cost inflation, 4 years, 50% loan share at 6.5% over 10 years — all overridable; the true-all-in line includes the loan interest the sticker never mentions.

## Framework: The Honest-Number Rules

1. **Sort the award letter before believing it:** grants and scholarships reduce cost; loans *defer* it with interest; work-study is a job. Letters present all three as "aid" — the decode re-sorts, and the net price is what remains after *only the free money*.
2. **Renewal conditions are the letter's fine print trap:** a year-one grant that needs a 3.5 GPA, or doesn't renew at all, makes year one's net price a teaser — the model runs the conservative case (aid as-guaranteed) beside the hopeful one and shows the spread.
3. **The monthly tail is the decision's true unit:** $454/month for ten years means something a $79,887 total doesn't — the output states it next to typical starting salaries for the intended field (as a sanity band, not a prophecy), because the loan-to-income ratio is the affordability question.
4. **The fifth-year risk is a real input:** graduation-in-four is an assumption; a fifth year adds a full year of net cost *and* delays income. Schools' actual 4-year graduation rates vary enormously and are public — the checklist sends the user to look theirs up.
5. **Compare schools on identical assumptions:** same inflation, same loan terms, each school's own aid — the script run twice; a $10k/year difference compounds through interest into a much larger true-all-in gap, and the cheaper-sticker school is not always the cheaper school once aid sorts differently.

## Output Format

---

# College Cost: [school(s)]

## The All-In Number
[Script output: per-year table, net total, cash/borrowed split, the loan tail, true all-in]

## The Offer, Decoded
| Letter line | Actually is | Counts against cost? | Renewal condition |
|---|---|---|---|

## The Monthly Tail
[Payment/term/interest · against the field's starting-salary band, labeled as a band · the loan-to-income read]

## [If comparing] The Table
[School × (net total · borrowed · monthly tail · true all-in) — same assumptions, stated]

*Aid renewal terms and loan programs vary; verify each with the school and servicer. Educational model, not financial advice — and the graduation-rate lookup is homework worth doing.*

---

## Quality Checks

- [ ] The letter is sorted before the math — no loan counted as aid
- [ ] Renewal conditions produce a conservative-case run beside the hopeful one
- [ ] The monthly tail appears with the loan-to-income framing
- [ ] Comparisons use identical assumptions with each school's own aid
- [ ] The fifth-year risk and graduation-rate homework are named

## Anti-Patterns

- [ ] Do not accept "total aid" as a discount — the sort is the whole skill
- [ ] Do not model tuition flat — it inflates faster than most things families budget with
- [ ] Do not present the total without the monthly tail — the decade is the decision
- [ ] Do not compare letters as written — they're formatted to resist exactly that
- [ ] Do not editorialize school choice — price it honestly; worth is the family's call
