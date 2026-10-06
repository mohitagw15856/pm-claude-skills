---
name: lending-risk-brief
description: "Write a portfolio-level lending risk brief: concentration analysis by sector, geography and single name, vintage performance, migration matrix narrative, macro-sensitivity scenarios, top watch names, and actions. Use when asked to write a portfolio risk report, credit risk committee brief, loan book review, or quarterly portfolio quality update. Produces a structured risk brief with concentration tables, migration narrative, scenario read, watch list, and recommended actions."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/lending-risk-brief.html
metadata:
  {
    "openclaw": { "emoji": "🏦" }
  }
---

# Lending Risk Brief Skill

A loan book fails in patterns before it fails in names. This skill writes the portfolio-level brief that makes the patterns visible: where the book is concentrated, which vintages are misbehaving, which way the grades are migrating, what the macro could do to it, and which names need decisions now.

## What This Skill Produces

- Concentration analysis: sector, geography, single-name — each against limits
- Vintage performance comparison
- A migration-matrix narrative (not just the matrix)
- Macro-sensitivity scenarios (base / adverse / severe) with named transmission channels
- A top-10 watch-names table
- Recommended actions with owners

## Required Inputs

Ask for what's available; compute what the data supports and mark the rest `[data gap — request from portfolio systems]`:

- **Portfolio snapshot** — exposures by borrower, sector, geography, grade, origination vintage
- **Concentration limits** from the risk appetite statement, if set
- **Grade migrations** this period (upgrades/downgrades by exposure)
- **Delinquency/NPL and provision figures**, current and prior periods
- **Watch-list candidates** already known to the team

## Portfolio Framework

**1. Concentration.** Three cuts, each vs its limit (or vs a stated reference norm if no limit exists — and flag the missing limit as a finding): top sector and top-3 sector share; geographic share; single-name — top-10 and top-20 obligor share, largest single exposure vs capital. Concentration that grew via *passive drift* (runoff elsewhere) deserves the same flag as active growth — say which it was. Correlated concentrations count together (e.g. construction lending + commercial-real-estate collateral is one bet, not two).

**2. Vintage performance.** Compare cohorts at the same age on-book (delinquency/default at month 12, 24…), not calendar snapshots — a young book always looks clean. A vintage underperforming its age-matched predecessors signals an underwriting-standards question for that origination period; name the period and what changed in criteria then, if known.

**3. Migration narrative.** Report net migration by exposure, not count. The narrative must answer: is movement drift (broad one-notch slippage → macro/sector pressure) or jumps (multi-notch falls → underwriting or monitoring misses)? Which sectors drive the downgrades? Are downgrades arriving *before* delinquency (grading works) or after (grading lags — a finding in itself)?

**4. Macro scenarios.** Base / adverse / severe. For each: the named driver (rates, unemployment, property values, sector shock) and its *transmission channel* into this specific book ("+200bps hits the 34% of book on floating rate at refinance; DSCR<1.2x share rises from X to Y `[compute from data]`"). Severity framing over precision — label all scenario numbers as estimates.

**5. Watch names.** Top 10 by exposure-weighted concern: name/ref, exposure, grade and recent movement, the concern in one sentence, the action and its owner and date.

**6. Actions.** Each tied to a finding: limit proposals, sector pause/tighten, deep-dive reviews, provision considerations, data fixes. An observation without an action is a gap — either act or state why watching is the action.

## Output Format

### Portfolio risk brief: [portfolio / as-at date]

**1. Headline read** — 3–4 sentences: direction of book quality and the one thing committee must decide.
**2. Concentration** — table per cut: segment | exposure | share % | limit | headroom | trend.
**3. Vintage performance** — cohorts at matched age, worst vintage named.
**4. Migration** — net migration by exposure + the drift-vs-jumps narrative.
**5. Scenarios** — base/adverse/severe: driver | transmission channel | estimated impact.
**6. Top-10 watch names** — ref | exposure | grade Δ | concern | action | owner | date.
**7. Actions** — numbered, each tied to its finding, with owner.

End with: *"This brief is analytical support, not a credit, provisioning, or capital determination. Decisions follow your institution's risk policy and applicable regulation."*

## Quality Checks

- [ ] Every concentration cut is compared to a limit, or the absent limit is flagged as a finding
- [ ] Correlated concentrations are counted together, not reported as separate comfort
- [ ] Vintages compared at matched age on-book, not calendar date
- [ ] Migration reported by exposure with a drift-vs-jumps interpretation
- [ ] Each scenario names its transmission channel into this book, not a generic macro headline
- [ ] Every watch name and every finding has an action with an owner
- [ ] Estimated figures labelled as estimates; missing data marked `[data gap]`

## Anti-Patterns

- [ ] Do not let a young book's low arrears pass as quality — age-match or say you can't
- [ ] Do not present the migration matrix without the narrative — the matrix is data, the drift-vs-jumps read is the analysis
- [ ] Do not report single-name and sector concentration as independent when they overlap in the same names
- [ ] Do not write a scenario without its transmission channel into this specific book
- [ ] Do not list an observation without an action or an explicit "monitor, because…"
- [ ] Do not invent portfolio statistics — compute from provided data or mark the gap

## Example Trigger Phrases

- "Write a portfolio risk report."
- "Write the loan book review."
- "Write the quarterly portfolio quality update."
- "Brief the credit risk committee."
