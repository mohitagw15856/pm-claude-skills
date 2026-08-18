---
trigger: model_decision
description: "Check whether a raise, more hours, or a new job could cost you more in lost benefits than you gain — the 'benefits cliff' — before you accept it. Use when asked will a raise hurt my benefits, benefits cliff, if I make more will I lose my food stamps or medicaid, or should I take more hours. Produces a plain map of which benefits phase out at what income (and which cut off suddenly vs. taper), a rough read on whether a specific income change helps or hurts net, the ones with hard cliffs to watch (childcare, Medicaid, housing), the moves that soften a cliff, and where to get a real benefits screening — so you make an income decision with eyes open, not a nasty surprise. Not financial/benefits advice; points to a benefits counselor."
---

# Benefits-Cliff Check

More income is supposed to mean more money — but for people on income-tested benefits, a raise can cost more in lost help than it adds in pay. That's the benefits cliff, and it blindsides people into being worse off for working more. This maps how your benefits phase out, gives a rough read on whether a specific change helps or hurts net, and flags the hard cliffs — so you decide with eyes open and get a real screening before acting.

## What This Skill Produces

- **A phase-out map** — which of your benefits taper gradually vs. cut off at a hard income line (food assistance, Medicaid/health subsidies, childcare help, housing assistance, EITC)
- **A rough net read** — for a specific raise/hours/new job, a plain estimate of whether you come out ahead, flat, or behind after benefit changes
- **The hard cliffs to watch** — the benefits that vanish suddenly at a threshold (often childcare, Medicaid, housing) where a small raise can cost a lot
- **Cliff-softening moves** — options like pre-tax contributions, timing, or transitional-benefit programs that ease a threshold
- **A "get it screened" pointer** — where a benefits counselor can run your actual numbers (this is a directional read, not a calculation)
- **A decision frame** — accept, negotiate differently, or plan the income increase in steps

## Required Inputs

Ask for these if not provided:
- **The change** — the raise/hours/new job and roughly the new income
- **Your benefits** — which you receive (food, health, childcare, housing, tax credits)
- **Your household** — size and who's covered (drives thresholds)
- **Where** — region (thresholds and programs are local)

## Framework: Map the Phase-Outs, Watch the Hard Cliffs

1. **List what's income-tested.** Only benefits tied to income are at risk — map which you get and roughly where each phases out.
2. **Separate tapers from cliffs.** Some benefits shrink gradually (usually fine to earn more); others end abruptly at a line — the cliffs are the danger, especially childcare, Medicaid, and housing.
3. **Estimate net, directionally.** Add the income gain, subtract the likely benefit losses — even a rough read shows whether a change is a trap or a win.
4. **Look for the softening moves.** Pre-tax contributions that lower countable income, timing the increase, and transitional-benefit programs can turn a cliff into a slope.
5. **Get the real numbers screened.** Thresholds are exact and local — a benefits counselor can run your actual case; treat this as the check-before-you-check, not the final math.

## Output Format

### Benefits-cliff check: +[income change] · [household] · [region]

**Your income-tested benefits:** [list].
**Tapers (earn more, mostly fine):** [which].
**Hard cliffs (watch these):** [childcare / Medicaid / housing — vanish at a line].
**Rough net read:** [ahead / flat / behind — directional].
**Softening moves:** [pre-tax contributions · timing · transitional programs].
**Get it screened:** [benefits counselor / local agency — for your exact numbers].
**Decision frame:** [accept · phase it in · negotiate differently].

> Not financial or benefits advice — thresholds are exact, local, and change. Get a real screening from a benefits counselor before deciding.

## Quality Checks
- [ ] Identifies which benefits are income-tested
- [ ] Distinguishes gradual tapers from hard cliffs
- [ ] Gives a directional net read for the specific change
- [ ] Flags the high-risk cliffs (childcare/Medicaid/housing)
- [ ] Points to a real benefits screening for exact numbers

## Anti-Patterns
- **Assuming more income is always better** — ignoring the cliff.
- **Treating a rough read as exact** rather than getting screened.
- **Missing the hard-cliff benefits** buried among the tapers.
- **Ignoring softening moves** that would keep the raise worth it.
- **Turning down a raise** on fear without checking the actual net.

## Example Trigger Phrases
- "Will this raise actually cost me money in lost benefits?"
- "What's the benefits cliff and does it affect me?"
- "If I make more, will I lose Medicaid or food stamps?"
- "Should I take the extra hours or will it hurt my childcare help?"
- "How do I know if a new job leaves me better or worse off?"
