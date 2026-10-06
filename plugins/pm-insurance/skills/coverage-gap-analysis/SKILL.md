---
name: coverage-gap-analysis
description: "Map an organisation's risks against its insurance policy portfolio to find what's uncovered, underinsured, or double-covered. Use when asked to run a coverage gap analysis, review an insurance programme against a risk register, check what risks aren't insured, or audit a policy portfolio. Produces a risk-by-coverage matrix, flagged gaps and overlaps, a deductible stack review, and recommendations ranked by expected-loss severity."
---

# Coverage Gap Analysis Skill

Organisations rarely know what they're *not* insured for until the loss arrives. This skill crosses the risk register against the policy portfolio and makes the gaps, the thin spots, and the accidental overlaps visible — then ranks the fixes by how badly the gap could hurt.

## What This Skill Produces

- A risk register × coverage matrix (which policy responds to which risk)
- Flags per risk: covered / uncovered / underinsured / double-covered / consciously retained
- A deductible stack review (total retained exposure across lines vs risk tolerance)
- Recommendations ranked by expected-loss severity

## Required Inputs

Ask for missing items; if no formal risk register exists, build a first-pass one from the business description and label it `[draft register — validate with management]`:

- **Risk register** — or at minimum a business description (operations, assets, revenue, geography, key dependencies)
- **Policy portfolio** — each policy's line, limits, deductibles, headline exclusions
- **Risk tolerance** — how much loss the organisation can absorb in a bad year, even roughly
- **Known worry list** — what management already loses sleep over

## Analysis Framework

**1. Build the matrix.** Rows = risks (sweep at least: property damage, business interruption, general/products liability, professional liability, cyber incl. BI and liability, D&O, crime/fidelity, employment practices, key-person, supply-chain failure, regulatory/legal defence, environmental, terrorism/political where relevant). Columns = policies. Each cell: responds fully / responds partially (state the limiting exclusion or sublimit) / silent.

**2. Flag each risk** with exactly one status:
- **Uncovered** — no policy responds; distinguish *uninsurable* from *unpurchased*.
- **Underinsured** — a policy responds but the limit or a sublimit is materially below plausible loss (test against a stated worst-case scenario, not the premium-friendly one).
- **Double-covered** — two policies respond; note the other-insurance clauses and who pays first, because overlap creates dispute, not extra protection.
- **Consciously retained** — management has explicitly accepted it. Only management's explicit statement earns this flag — silence is "uncovered".

**3. Deductible stack review.** Sum the deductibles/retentions that could plausibly hit in the same bad year (e.g. property + BI + cyber after one event; or 2–3 uncorrelated events). Compare the stack to stated risk tolerance. A stack above tolerance is itself a finding, even with every risk "covered".

**4. Rank recommendations by expected-loss severity.** For each gap, band severity (catastrophic: threatens solvency / severe: > a year's profit / moderate: absorbable with pain / minor) and rough likelihood (recurring / plausible / remote). Fix order: catastrophic-plausible first; severity beats frequency — a remote solvency-threat gap outranks a frequent nuisance gap.

## Output Format

### Coverage gap analysis: [organisation / date]

**1. Method & sources** — register used, policies reviewed, what was assumed.
**2. Risk × coverage matrix** — table: risk | responding policy | limit/sublimit | deductible | status flag.
**3. Findings** — grouped: uncovered / underinsured / double-covered / consciously retained, each with the scenario that exposes it.
**4. Deductible stack** — table + comparison to risk tolerance.
**5. Recommendations** — ranked table: # | gap | severity band | likelihood | recommended action (buy / raise limit / restructure / formally accept) | indicative priority.
**6. Open questions** — what needs management or broker confirmation.

End with: *"This analysis is analytical support, not a coverage determination or advice to purchase. Placement and retention decisions follow your organisation's policy and the advice of your licensed broker/adviser and applicable regulation."*

## Quality Checks

- [ ] Every register risk appears in the matrix with exactly one status flag
- [ ] Underinsurance verdicts cite a worst-case scenario, not a gut feel
- [ ] "Consciously retained" appears only where management explicitly accepted the risk
- [ ] Double-coverage findings name the other-insurance/priority question
- [ ] Deductible stack is compared to a stated risk tolerance figure
- [ ] Recommendations are ranked with severity dominating frequency

## Anti-Patterns

- [ ] Do not mark a risk "covered" on policy line name alone — check the limiting exclusion or sublimit in the cell
- [ ] Do not treat silence as acceptance — an undiscussed gap is "uncovered", never "retained"
- [ ] Do not rank by likelihood alone — a remote solvency-threatening gap outranks a frequent small one
- [ ] Do not ignore overlaps because "more cover is fine" — overlap creates claims disputes; name who pays first
- [ ] Do not invent policy terms or limits — mark unavailable wordings `[to confirm]` and say what the answer changes

## Example Trigger Phrases

- "Run a coverage gap analysis."
- "Review an insurance programme against a risk register."
- "Check what risks aren't insured."
- "Audit a policy portfolio."
