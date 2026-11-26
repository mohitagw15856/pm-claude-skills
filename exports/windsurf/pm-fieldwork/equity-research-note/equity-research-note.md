---
trigger: model_decision
description: "Write a structured research note on a listed company from filings and figures the user supplies: the business in plain words, what drives revenue and margin, a bull, base and bear case with the assumptions behind each, valuation as a range, and what would change the view. Use when asked to write up this stock, analyse this company for me, build an investment thesis, summarise these earnings, or what would make me wrong on this position. Produces a research note for the user's own decision making. It is not personalised financial advice."
---

# Equity Research Note Skill

A useful research note lets the reader disagree with it. It shows which numbers it rests on, which assumptions do the work, and what evidence would break the thesis. This skill structures that from material the user provides. It does not fetch prices or forecasts, it does not recommend buying or selling, and it says so in the output. For a one-screen summary of a ticker, use `stock-snapshot`. For a first-time investor's questions, use `investing-for-beginners`.

## What This Skill Produces

- **The business in plain words**: what it sells, to whom, and how it gets paid
- **The drivers**: the few variables that move revenue and margin, with the figures supplied
- **Three cases** (bull, base, bear), each as a set of stated assumptions rather than a mood
- **Valuation as a range**, with the method named and its weak point stated
- **The break conditions**: observable events that would prove the thesis wrong
- **A sources and gaps list**: what was supplied, its date, and what was missing

## Required Inputs

Ask for these if not provided:
- **The company** and the listing
- **The source material**: annual or quarterly report figures, the earnings release, segment data. Paste the numbers or the text
- **The date of the material**, so the note can say how stale it is
- **The reader's question**: understand the business, test an existing thesis, or compare with a peer
- **Time horizon**, since a thesis for one quarter and one for five years use different evidence

If a figure is not supplied, write "not supplied" in its place. Never estimate a price, a multiple, a growth rate or a consensus number from memory.

## Framework: From Numbers to a Testable View

1. **Describe before judging.** State the business model in three sentences a non-investor could follow. If that cannot be done from the material, the note is not ready.
2. **Find the drivers.** Decompose revenue into volume times price (or users times revenue per user, or stores times sales per store). Decompose margin into the cost lines that move. Keep to the handful that explain most of the change.
3. **Separate reported from adjusted.** Where the company presents adjusted figures, show both and name what was removed.
4. **Build cases from assumptions.** Each case is a row of driver values. The difference between cases must be traceable to named assumptions, not to adjectives.
5. **Value as a range.** Use a method that fits the business (earnings multiple, cash flow, asset based, sum of parts) and show the result for each case. State the input the answer is most sensitive to.
6. **Write the break conditions.** For the base case, list what would have to be observed to abandon it: a churn level, a margin floor, a covenant, a regulatory decision.
7. **Mark the limits.** Date of data, what was not reviewed, and conflicts the reader should weigh.

## Output Format

# Research Note: [company] ([listing])

*Based on material dated [date], supplied by the reader. For the reader's own analysis. Not personalised financial advice and not a recommendation to buy or sell.*

## The Business
[Three sentences]

## What Drives It
| Driver | Latest figure | Trend in the material | Why it matters |
|--------|---------------|-----------------------|----------------|

## Three Cases
| Assumption | Bear | Base | Bull |
|------------|------|------|------|

## Valuation
[Method · result per case as a range · the most sensitive input]

## What Would Change the View
[Observable break conditions for the base case]

## Risks Not in the Numbers
[Governance, concentration, regulation, accounting choices]

## Sources and Gaps
[What was supplied and its date · figures marked not supplied]

## Quality Checks

- [ ] Every figure traces to the supplied material or is marked "not supplied"
- [ ] The three cases differ by named assumptions shown in a table
- [ ] Valuation is a range with the method and its most sensitive input named
- [ ] Break conditions are observable events, not sentiments
- [ ] The disclaimer and the data date appear at the top
- [ ] Reported and adjusted figures are both shown where they differ

## Anti-Patterns

- [ ] Do not give a price target as a single number
- [ ] Do not say buy, sell or hold
- [ ] Do not fill a missing figure from memory, however confident
- [ ] Do not let the bull case be the base case with better adjectives
- [ ] Do not omit the date of the data

## Example Trigger Phrases

- "Write up this company from the annual report I pasted."
- "Build me a bull, base and bear case for this stock."
- "Summarise these earnings and tell me what changed."
- "What would make me wrong on this position?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/equity-research-note.html

<!-- pm-claude-skills v84.0.0 | skill: equity-research-note | source: skills/equity-research-note/SKILL.md | sha256: 069fe823a47ec562ed015304e3723acfbe681542e7c62d53e2ce8debd9e076aa | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
