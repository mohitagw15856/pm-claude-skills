# Worked Example — Acquirer Red Team

## The brief

Fieldnote (workforce-management SaaS, 11 people) has a strategic acquirer circling at "$18–22M." Founder shares honestly: $2.1M ARR (+40% y/y), biggest customer is 24% of ARR, "some month-to-month contracts we call recurring," the lead engineer owns the deployment system solo, and an old contractor never signed an IP assignment. "Red-team us before their DD does."

## The output

# Project Copper: Diligence Red Flags — INTERNAL

> Simulation — a plausible adversarial reading, not a prediction or financial advice.

## Summary Box
Asking frame: $18–22M (~9–10× ARR) · our current view: $13–16M pre-fix · total identified chips: **$4.5–7.5M** · walk-away risks: 1 (IP assignment, curable)

## Findings

| # | Category | Finding | Evidence we'd request | Price mechanism | Chip estimate |
|---|---|---|---|---|---|
| 1 | Revenue quality | ~$380k of "ARR" is month-to-month usage billed monthly — recurring by habit, not contract | Contract-by-contract revenue tie-out | Recompute ARR at $1.7M → multiple applies to the smaller base | **$2.5–3.5M** |
| 2 | Concentration | Meridian Logistics = 24% of ARR; renewal in 7 months; no assignment-consent clause verified | The Meridian MSA; churn correspondence | Earnout on Meridian's renewal, or escrow | **$1–2M shifted to earnout** |
| 3 | Key person | Deployment/release system understood by one engineer; no runbook survives his vacation | Architecture review; bus-factor interviews | Retention package carved from proceeds + closing condition | **$0.5–1M** (founders' pocket) |
| 4 | Tech & IP | 2019 contractor (billing module) — no IP assignment on file | Full contractor agreement sweep | Indemnity + holdback until cured; worst case: walk | **$0.5–1M holdback** (or deal risk) |
| 5 | Legal | Customer DPAs reference a subprocessor list last updated 2023 | Privacy-doc sweep | Cleanup covenant | noise |

## The Retrade Script

"We've completed the revenue tie-out. On contracted, committed recurring revenue we're at $1.7M, not $2.1M — we remain enthusiastic, but the structure needs to reflect that base: $14M at close, with $3M contingent on Meridian's renewal at flat-or-better terms. On the IP matter, our offer assumes cure before signing."

## Debrief — out of character

| Finding | Fixable pre-process? | Fix and time-to-fix | Or: pre-disclose how |
|---|---|---|---|
| M2M-as-ARR | ✅ 1–2 quarters | Convert usage accounts to annual contracts (discount lever); relabel the rest honestly NOW | Present two revenue lines yourself: "contracted ARR $1.7M + $380k recurring usage revenue, 94% 12-mo retention" — self-defined beats DD-defined |
| Meridian 24% | ⚠️ Partially | Renewal push *now*, multi-year with assignment consent; grow others | Disclose with the retention data attached |
| Bus factor | ✅ 6–8 weeks | Runbooks + a second engineer through three release cycles; document before the data room opens | — |
| Contractor IP | ✅ 2–6 weeks | Assignment-for-consideration from the contractor — costs a few thousand now, seven figures in holdback later | Never let this one be discovered — cure it |
| DPA staleness | ✅ Days | Update the list; version the docs | — |

Order of operations for the next two quarters: **contractor IP first** (small, deadly, curable), bus-factor second, annual-contract conversion third. The one to pre-disclose rather than fully fix: **Meridian concentration** — it can't be hidden and shrinking it takes longer than the process; a founder who walks in saying "24%, here's the retention history and the renewal in writing" converts the chip into a structured earnout instead of a price cut.

*Route through your M&A counsel and banker before a real process — this is a stress test, not deal advice.*

## Why it's shaped this way

- **Revenue quality leads and gets the biggest chip** — the multiple applies to the base, so redefining the base is the acquirer's highest-leverage move; the founder hearing $2.5–3.5M concentrates the mind.
- **Every chip carries its mechanism** (recompute / earnout / carve-out / holdback) — a risk without price mechanics is noise, per the quality checks.
- **The retrade script is one deliverable paragraph** — founders prepare for documents; the price actually moves on a phone call.
- **The debrief's disclose-vs-fix split is honest** — concentration can't be fixed in time, so the play is framing; concealment is never on the menu, per the anti-patterns.
- **The retention-package chip is labeled as coming from the seller's pocket** — the standard surprise the skill exists to remove.
