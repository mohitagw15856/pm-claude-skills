---
name: sop-meeting-prep
description: "Prepare an S&OP cycle readout that surfaces the demand-supply gaps and forces the three decisions the meeting must make. Use when asked to prep an S&OP meeting, build the executive S&OP deck, summarize demand vs supply for the monthly cycle, or prepare a supply review readout. Produces a gap table, scenario levers with costs, an inventory projection, a decisions-required list, and a pre-read package."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/sop-meeting-prep.html
metadata:
  {
    "openclaw": { "emoji": "📦" }
  }
---

# S&OP Meeting Prep Skill

An S&OP meeting that reviews numbers but decides nothing just delayed the miss by a month. This skill prepares the readout so the meeting spends its time on the three decisions only that room can make — not on re-litigating the forecast. Everything else goes in the pre-read, gaps are quantified in units *and* money, and every open gap arrives with priced scenario levers.

> **Not quite this?** Use `meeting-prep-live` when you need general meeting preparation, not supply-chain S&OP.

## What This Skill Produces

- A demand vs. supply gap table by product family and month
- Scenario levers for each material gap (expedite / build-ahead / allocate / demand-shape) with cost and consequence
- A projected inventory position (units, value, days/weeks of supply) under the recommended plan
- The **three decisions** the meeting must make, each framed with options and a recommendation
- A pre-read package with what to absorb before the meeting vs. what will be decided in it

## Required Inputs

Ask for these if not provided:
- **Planning horizon & buckets** — typically months 1–18, decisions concentrated in months 1–3
- **Demand plan** — consensus forecast by family, plus notable changes since last cycle
- **Supply plan** — capacity, committed material, known constraints (lines, labor, supplier allocations)
- **Inventory position** — current on-hand, in-transit, and targets by family
- **Carry-overs** — decisions or actions from last cycle and their status
- **Financial context** — revenue plan the volumes must support; standard margins if trade-off math is needed

From a thin brief, build the structure with the numbers marked `[to confirm]` — a skeleton the planner fills beats a refusal.

## Gap & Decision Framework

**Gap table discipline** — for each family × month: demand, supply, gap (units and %), and gap valued at revenue at risk. Classify each gap:

| Gap size | Class | Treatment |
|---|---|---|
| Within ±5% | Noise | Note it; no meeting time |
| 5–15% | Manageable | Lever proposed in pre-read; meeting ratifies |
| >15% or any strategic account short | Escalation | A named decision on the agenda |

**Scenario levers** — price every option, never present a bare gap:
- **Expedite** — premium freight / overtime: cost per unit recovered, margin erosion
- **Build-ahead** — pull production into soft months: inventory carrying cost, obsolescence exposure if demand slips
- **Allocate** — who gets shorted, by name: revenue and relationship consequence per customer tier
- **Demand-shape** — delay a promotion/launch: revenue timing shift, commercial owner's agreement required

**The three-decisions rule** — the agenda names at most three decisions, each stated as a question with options A/B, the cost of each, and a recommendation. If there are more than three, the smaller ones move to the pre-read as "ratify unless objection." A decision without a recommendation is analysis, not an agenda item.

**Pre-read discipline** — issued 48 hours ahead; contains all data, gap analysis, and lever costing; the meeting assumes it was read. First slide of the meeting is the decision list, not the demand review.

## Output Format

### S&OP Readout: [cycle / month]

**1. Cycle summary** — plan vs. last cycle in three sentences; biggest change since last month.

**2. Carry-over actions** — last cycle's decisions: done / at risk / missed, with owner.

**3. Demand vs. supply gap table** — Family | Month | Demand | Supply | Gap (units / % / $) | Class | Proposed lever.

**4. Scenario levers** — per escalation-class gap: options with cost, consequence, and decision deadline ("expedite window closes [date]").

**5. Inventory projection** — by family: closing inventory under the recommended plan vs. target, flagged where projection exceeds target by >20% or falls below safety stock.

**6. Decisions required (max 3)** — Decision | Options & cost | Recommendation | Owner if approved.

**7. Pre-read appendix** — assumptions, forecast changes, ratify-unless-objection items.

## Quality Checks

- [ ] Every gap >5% has a proposed lever with a cost — no naked gaps
- [ ] Gaps expressed in units and dollars, so finance and operations read the same page
- [ ] Exactly 1–3 decisions on the agenda, each with options, costs, and a recommendation
- [ ] Allocation scenarios name which customers/tiers get shorted — no abstract "reduce supply"
- [ ] Carry-over actions from last cycle reviewed before new ones are added
- [ ] Inventory projection reflects the *recommended* levers, not the unresolved plan
- [ ] Decision deadlines stated where levers expire (expedite windows, build-ahead cutoffs)

## Anti-Patterns

- [ ] Do not spend meeting time re-forecasting — forecast disputes go back to the demand review step
- [ ] Do not present a gap without at least one priced lever — that's reporting a problem, not planning
- [ ] Do not bury the decisions at slide 30 — they open the meeting
- [ ] Do not show inventory only in units — value and days-of-supply are what the CFO and planner each need
- [ ] Do not let "allocate" stay abstract — someone specific gets shorted, and the meeting must own that choice
- [ ] Do not issue the pre-read at midnight before the meeting — 48 hours or the meeting becomes the read-through

## Example Trigger Phrases

- "Prep an S&OP meeting."
- "Build the executive S&OP deck."
- "Summarize demand vs supply for the monthly cycle."
- "Prepare a supply review readout."
