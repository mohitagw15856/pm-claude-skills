---
name: insurance-policy-decoder
description: "Decode a home, renters, or auto insurance policy into what's actually covered, what's excluded, and what the payout math really looks like before you need it. Use when someone asks 'what does my insurance actually cover', 'decode my policy', 'is this deductible normal', or 'actual cash value vs replacement cost'. Produces a coverage decode with real payout scenarios, ranked exclusion red flags, the ACV-vs-replacement-cost math, and the questions to ask your agent before renewal."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/insurance-policy-decoder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Insurance Policy Decoder Skill

Insurance policies are read twice: at signing (by no one) and after the loss (too late). This skill does the first reading properly — what each coverage line pays in a real scenario, which exclusions swallow which promises, and whether "covered" means replaced-new or depreciated-to-pennies. The declarations page is marketing; the exclusions and definitions sections are the policy.

## What This Skill Produces

- A coverage-by-coverage decode with a concrete payout scenario for each ("kitchen fire, $40k damage → policy pays X because…")
- Ranked red flags: exclusions that gut headline coverage, sublimits, ACV traps, coinsurance penalties
- The ACV vs. replacement-cost math, shown on the user's actual property
- Questions for the agent — gaps found, endorsements worth pricing, and what to get in writing

## Required Inputs

Ask for these only if they aren't already provided:

- **The policy documents** — declarations page at minimum; exclusions/definitions sections if available. With only a declarations page, decode what's visible and list the sections still needed — the exclusions are where the reading matters.
- **What's being protected** — home value and contents ballpark, or vehicle + how it's used; anything unusual (home business, expensive equipment, a finished basement in a rain-prone area).
- **Their worry list** — the losses they actually fear; the decode ranks against those.

## Framework: Severity Scale

- 🔴 **Can cost you real money** — actual-cash-value settlement on roof/contents (depreciation eats the payout), water/flood/sewer-backup exclusions (the most commonly discovered-too-late gap — flood is almost never in a standard policy), sublimits far below stated property ("jewelry: $1,500 total"), coinsurance clauses (insure below X% of value → every claim penalized proportionally), ordinance-of-law gaps (rebuilding to current code isn't covered by default), business-use exclusions voiding claims for home-office equipment or delivery driving.
- 🟡 **Unusual — probe before renewal** — high or percentage-based wind/hail deductibles (2% of dwelling ≠ 2% of the claim), depreciation on partial roof claims, named-perils contents coverage masquerading as comprehensive, rental-car and loss-of-use caps that run out mid-repair.
- 🟢 **Standard** — normal liability structures, standard deductibles, ordinary named exclusions (war, wear-and-tear); label them so the reader can stop worrying.

Always show the math: **ACV example** (10-year-old roof, $30k replacement, 25-year life → depreciated payout ≈ $12k minus deductible — compute it); **coinsurance example** if the clause exists; **sublimit audit** against the user's actual valuables. Where a term is defined in the definitions section, the defined meaning wins over the plain-English one — quote it.

## Output Format

### Policy Decode: [type — carrier, policy period]

**1. The verdict** — the three findings that most change what this user thinks they have, in plain sentences.

**2. Coverage decode**

| Coverage line | Limit / basis | What it pays in a real scenario | Severity |
|---|---|---|---|

**3. 🚩 Red flags, ranked** — quoted exclusion/definition text, the scenario where it bites, the dollar gap.

**4. The math section** — ACV vs. replacement worked on their property; deductible reality (percentage deductibles in dollars); sublimits vs. their actual valuables.

**5. Questions for the agent** — coverage gaps to price (flood, sewer backup, scheduled valuables, replacement-cost endorsement), and which answers to get in writing.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Every coverage line gets a concrete payout scenario, not a restatement of the limit
- [ ] ACV vs. replacement cost is computed on the user's numbers, not explained abstractly
- [ ] Percentage deductibles are converted to dollars
- [ ] Exclusions are quoted, and defined terms use the policy's definition
- [ ] Sections not provided (exclusions, definitions) are named as gaps, not assumed standard
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not invent coverage terms or limits that aren't in the documents
- [ ] Do not soften a red flag to seem balanced — an ACV roof on a 15-year-old roof is a small payout, say so
- [ ] Do not present jurisdiction-dependent rules (claim deadlines, bad-faith standards) as universal
- [ ] Do not rank by section order — rank by the user's stated worries and the dollar gaps
- [ ] Do not recommend carriers or price coverage — decode this policy; shopping is the user's move

## Based On

Policyholder-side coverage review practice — declarations/exclusions reconciliation, payout-scenario testing, sublimit auditing.
