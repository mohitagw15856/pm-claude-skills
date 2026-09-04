---
name: disagreeing-experts
description: "Put one situation in front of three professionals chosen to disagree — the lawyer, the accountant, and the therapist read the same divorce — each ruling independently, with the conflicts surfaced in a disagreement table instead of blended into mush. Use when asked for different professional perspectives, what would a lawyer versus an accountant say, I keep getting one-sided advice, or pressure-test this from multiple angles. Produces three independent readings, the disagreement table with why the frames diverge, and the decision map of which expert to weight for which sub-decision. The anti-consensus skill: it never averages."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/disagreeing-experts.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Disagreeing Experts Skill

Ask one professional and you get their profession's answer: the lawyer sees exposure, the accountant sees the tax year, the therapist sees what the fight is actually about — and each is right inside their frame while the frames point different directions. Ask an AI and you usually get something worse: all three blended into an even-handed paste where the conflicts, which were the information, have been smoothed away. This skill refuses the blend. It picks the three professionals *most likely to disagree* about your situation, has each read it cold and rule independently — verdict, reasoning, what they would ask first, what they would charge you to stop doing — and then puts the disagreements in a table, named and explained. Because where experts disagree is exactly where your real decision lives.

## What This Skill Produces

- **The panel selection** — three professions chosen for maximum productive disagreement about *this* situation, with the reason each earned a seat
- **Three independent readings** — each expert's verdict and reasoning in their own professional register, written as if the others do not exist
- **The disagreement table** — every point of conflict: who says what, why their frames diverge, and what fact would settle it
- **The convergence list** — the short set all three agree on, which is as informative as the conflicts and usually actionable immediately
- **The first-question set** — what each expert would ask before advising, since the questions reveal each frame's blind spots in the others
- **The decision map** — which expert to weight for which sub-decision, replacing "who is right" with "right about what"

## Required Inputs

Ask for these if not provided:
- **The situation** — in full, messy is fine; each expert will extract what their frame considers relevant, and the differences in extraction are part of the output
- **The decision in play** — what actually gets decided after this, so the readings aim at something
- **The panel, if the requester wants to choose** — otherwise the skill selects for disagreement and says why; a panel that will agree is a wasted panel
- **The advice already received** — whose frame has already been heard, so the panel can be weighted toward the unheard frames
- **The constraints** — anything already fixed (deadlines, budgets, relationships that must survive), which the experts must respect rather than advise away

## Framework: Select for Conflict, Rule Independently, Surface the Fault Lines

1. **Choose the panel for disagreement, not coverage.** The useful panel holds frames in genuine tension for this case: risk versus growth, this-year versus decade, the relationship versus the transaction. Three experts who would nod at each other teach nothing; the selection step must be able to say what each pair will fight about *before* the readings are written.
2. **Write each reading in isolation and in register.** Each expert reads the situation cold — no references to the other readings, no pre-softening. The lawyer writes like a lawyer (exposure, worst-case, paper trail); the therapist writes like a therapist (patterns, needs, what is not being said). The registers are kept distinct on purpose: the *vocabulary* differences carry information.
3. **Let each expert be professionally biased.** The accountant is allowed to care about the tax consequence more than the marriage; that is what accountants are for. The bias is labelled, never corrected — correcting it re-blends the paste.
4. **Build the disagreement table as the centrepiece.** For each conflict: the positions, the frame-reason they diverge (different time horizons? different definitions of risk? different clients — the lawyer protects *you*, the therapist protects the *relationship*?), and the fact or value judgment that would settle it. Some rows settle with information; some are genuinely values — the table says which.
5. **Extract the convergence honestly.** When three hostile frames agree on something, that something is load-bearing. The convergence list is short, and each item on it can usually be acted on today regardless of the rest.
6. **Map experts to sub-decisions.** The verdict is never "the lawyer wins." It is: weight the lawyer on the signature, the accountant on the timing, the therapist on the conversation — with the requester left holding the values calls the table exposed, which is where they belonged.

## Output Format

### Disagreeing experts: [situation] · panel: [A / B / C]

**Why this panel:** [what each pair will conflict about — declared before the readings]

---
**[Expert A]'s reading** — [verdict in one line]
[Their reasoning, in their register · what they would ask first · what they would tell you to stop doing]

**[Expert B]'s reading** — [...]

**[Expert C]'s reading** — [...]

---
**The disagreement table**
| Question | [A] says | [B] says | [C] says | Why they diverge | Settles with |
|---|---|---|---|---|---|
| [conflict] | | | | [frame reason] | [a fact / a values call — whose] |

**Where all three agree:** [the short list — act on these first]

**The decision map:** [sub-decision → which expert to weight, and why] · **Left with you:** [the values calls, named plainly]

> Three simulated professional frames, not three professionals. For decisions with real legal, financial, or clinical stakes, the output's job is to make the real consultations sharper — each reading ends with what to bring to the actual expert.

## Quality Checks
- [ ] The panel selection predicts the disagreements before the readings exist
- [ ] Each reading stands alone, in its own register, with its bias intact and labelled
- [ ] The disagreement table explains *why* frames diverge, not just that they do
- [ ] Each conflict row says whether information or values would settle it
- [ ] The convergence list exists and is genuinely actionable
- [ ] The decision map assigns experts to sub-decisions instead of crowning one

## Anti-Patterns
- **The blend.** Any sentence beginning "on balance, the experts suggest" has destroyed the product; the conflicts are the deliverable.
- **The strawman seat.** Three experts where one exists to lose is a rigged panel; every seat must be capable of being right.
- **De-biasing the professionals.** The accountant who also weighs the emotional side has stopped being the accountant; the panel already has a therapist.
- **Settling values rows with fake facts.** "It depends what you value more" is an honest table entry, and pretending data settles it is the consensus disease returning.
- **Panel sprawl.** Four-plus experts turns readings into a survey; three frames in real tension is the format.
- **Forgetting the real-world handoff.** High-stakes cases end each reading with what to bring to the genuine professional — the simulation sharpens that meeting, never replaces it.
