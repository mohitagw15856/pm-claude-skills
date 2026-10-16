---
name: evidence-grading
description: "Grade the evidence behind a claim before betting on it — the hierarchy for business evidence (experiments > usage data > surveys > interviews > anecdotes > opinion), the fit-for-decision test, and the mixed-evidence verdicts that real questions produce. Use when asked how strong is our evidence for this, grade what we know before the decision, is this enough to bet on, or we have three anecdotes and a survey — now what. Produces the evidence inventory with grades, the sufficiency verdict against the decision's stakes, and the cheapest-upgrade path."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/evidence-grading.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Evidence Grading Skill

"We have evidence" covers everything from a randomized experiment to the CEO's seatmate on a flight — and decisions made on ungraded evidence inherit the confusion. The grading discipline: inventory what actually supports the claim, place each item on the business-evidence hierarchy (what it *is*, not how confident it feels), test the graded weight against the decision's stakes (a reversible pilot needs less than a one-way rebrand — [decision-journal](../decision-journal/SKILL.md) logic), and when evidence falls short, name the *cheapest upgrade* — because the answer to weak evidence is usually a better test, not a braver bet.

## What This Skill Produces

- **The evidence inventory** — everything supporting (and contradicting) the claim, each item graded on the hierarchy
- **The weight assessment** — what the graded pile actually supports, including the mixed-signals honest read
- **The sufficiency verdict** — enough for this decision's stakes / not yet — with the stakes analysis shown
- **The upgrade path** — the cheapest next evidence that would move the verdict ("a 2-week holdout test settles this for $0")

## Required Inputs

Ask for these if not provided:
- **The claim and the decision riding on it** — "users want X" feeding a backlog item vs. feeding a repositioning are different sufficiency bars; the decision's reversibility and cost set the bar
- **The evidence, itemized** — every piece: the data pull, the survey, the five customer quotes, the competitor's move, the expert's opinion — including the inconvenient items (an inventory that omits contradicting evidence is advocacy)
- **The evidence's provenance** — n, selection, dates, who collected it and with what incentive ([source-triangulation](../source-triangulation/SKILL.md) supplies the externals; internal evidence has incentives too)

## Framework: The Grading Rules

1. **The hierarchy, applied without sentiment:** experiments/A-B tests (causal) > usage/behavioral data (what people *do*, correlational) > surveys (what they *say*, at scale — [survey-design-basics](../survey-design-basics/SKILL.md) quality adjusts the grade) > interviews (rich, small-n — [interview-synthesis](../interview-synthesis/SKILL.md) counts matter) > anecdotes (existence proofs only) > expert opinion (informed priors) > internal conviction (a hypothesis, not evidence). Each item gets its rung *and its quality-within-rung* — a leading survey grades below honest interviews.
2. **Direction and independence both count:** the inventory includes contradicting evidence at its own grade, and echo-checks the supporting pile (three anecdotes traceable to one loud customer are one anecdote). The weight is the *net*, honestly netted.
3. **Anecdotes prove existence, never prevalence:** "a customer asked for X" establishes that the need exists somewhere — it cannot establish how common; the classic grading error is prevalence conclusions from existence evidence, and it's the error this skill most often catches.
4. **Sufficiency is relative to stakes:** the verdict tests weight against the decision — reversible-and-cheap decisions legitimately run on interview-grade evidence (the pilot *is* the experiment); irreversible-and-expensive ones demand behavioral or experimental grade. "Weak evidence" isn't a verdict; "weak for *this* bet" is.
5. **The upgrade path is the constructive ending:** when insufficient, name the cheapest test that would change the verdict — the holdout, the fake-door, the survey that sizes the interview theme, the pilot-with-metrics. Ranked by cost-to-confidence ratio; the skill's product is often not "no" but "this $0 two-week test first."

## Output Format

# Evidence Grade: "[the claim]" — feeding [the decision]

## The Inventory
| Evidence | Rung | Quality notes (n, selection, date, independence) | Direction |
|---|---|---|---|

## The Weight
[What the graded net actually supports, in one honest paragraph — existence vs. prevalence vs. causation explicitly]

## The Sufficiency Verdict
[The decision's stakes (reversibility × cost) · enough / not yet · the reasoning]

## The Upgrade Path
[The cheapest evidence that moves the verdict · cost and time · the second option]

## Quality Checks

- [ ] Every item has a rung and within-rung quality notes
- [ ] Contradicting evidence is in the inventory at its own grade
- [ ] Echoes were collapsed before weighing
- [ ] The verdict is stakes-relative, not absolute
- [ ] The insufficient branch ends in a priced upgrade, not just a no

## Anti-Patterns

- [ ] Do not grade by vividness — the memorable anecdote outshines the boring dataset in every meeting; the hierarchy exists to resist exactly that
- [ ] Do not conclude prevalence from existence — the most common grading felony
- [ ] Do not omit the inconvenient items — an advocacy inventory grades the author, not the claim
- [ ] Do not demand experimental grade for reversible bets — over-evidencing cheap decisions is its own waste
- [ ] Do not end at "insufficient" — the upgrade path is the difference between rigor and obstruction

## Example Trigger Phrases

- "How strong is our evidence for this?"
- "Grade what we know before the decision."
- "Is this enough to bet on?"
