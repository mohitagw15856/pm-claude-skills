---
name: ai-assisted-performance-review
description: "Evaluate performance fairly when output is AI-assisted — what still measures the human, what now measures the tooling, and how to run the review conversation. Use when reviewing someone whose work is heavily AI-assisted, when output volume stopped meaning anything, when calibrating a team with uneven AI adoption, or when writing review criteria for the AI era. Produces review guidance: a what-measures-whom analysis, rewritten criteria, calibration rules for mixed-adoption teams, and conversation scripts. For the general review document use performance-review; for redesigning the role itself use role-redesign-for-ai."
---

# AI-Assisted Performance Review Skill

The uncomfortable review question of the decade: when a report ships twice the output with AI, what did *they* do? Volume stopped measuring effort; polish stopped measuring skill. Punishing AI use is as wrong as crediting the model's work to the human. This skill separates the signals — and gives managers the conversation, not just the theory.

## What This Skill Produces

- A **what-measures-whom analysis** of the role's current evaluation criteria
- **Rewritten criteria** that measure the human: judgment, verification, outcomes, leverage
- **Calibration rules** for teams with uneven AI adoption
- **Conversation scripts** for the three hard cases

## Required Inputs

Ask for (if not already provided):
- **The role and current review criteria** (the rubric, or how it really works)
- **How AI shows up in the work** — which tasks, how much of the output it drafts, what the tooling reality is
- **The specific situation**, if any: one person's review? team calibration? criteria rewrite?
- **The org's AI stance** — encouraged? tolerated? policy exists? (Reviews must not punish sanctioned behaviour)

## Method

1. **Sort every criterion: human, tool, or hybrid.** Walk the current rubric. Volume of drafts, formatting quality, speed to first version → now mostly **tool** signals (evaluating them evaluates prompt luck and subscription tier). Decision quality, stakeholder trust, error catch rate, what they *chose* to build → still **human**. Output quality overall → **hybrid**: credit belongs to the pair, and the review's job is to see the human's contribution inside it.
2. **Rewrite around the four durable human signals:**
   - **Judgment** — what they decided to do, what they declined, how they scoped; the quality of taste applied to AI output (what they kept, cut, and corrected)
   - **Verification** — do errors get caught before shipping? A person whose AI-assisted work is *reliably right* is demonstrating skill; one who forwards unverified fluency is a risk wearing productivity's clothes
   - **Outcomes** — did the work move what it was for (the metric, the decision, the customer), independent of how it was produced
   - **Leverage** — do they make AI multiply the *team* (shared prompts, workflows, teaching) or only their own count
3. **Set the calibration rules for mixed adoption.** In one team you'll have a 2×-output adopter and a careful non-adopter. Rules that keep it fair: evaluate against the role's outcomes, not each other's volume · where AI use is sanctioned, *not* adopting is a development conversation (not a values one) · where someone's edge is invisible verification labour, surface it explicitly before comparing. Never let the review become a proxy war about the tools.
4. **Demand evidence that sees the human.** Volume anecdotes are out. In: a sample of shipped work walked backwards (what did the AI draft, what did you change, why) · error/rework history · decisions log · peer signals about trust and leverage. The walk-backwards exercise is the single highest-signal artifact — put it in the review prep.
5. **Script the three hard cases:**
   - *The volume star with thin judgment* — "Your output doubled; let's walk three pieces backwards" (the conversation is about the delta between draft and shipped)
   - *The careful sceptic being out-shipped* — outcomes-first framing; adoption raised as growth, not deficiency; their verification strength named as a strength
   - *The launderer* — unverified AI work shipped as their own, errors reaching others: this is a *reliability* conversation with the accountability rule from the org's AI policy, not an AI conversation

## Output Format

### AI-Era Review Guidance: [role/team]

**Criteria audit**
| Current criterion | Measures | Verdict |
|---|---|---|
| | human / tool / hybrid | keep / rewrite / kill |

**Rewritten criteria:** [the judgment/verification/outcomes/leverage set, with observable definitions each]

**Evidence to collect:** [the walk-backwards sample protocol + the rest]

**Calibration rules:** [the mixed-adoption rules, as committee guidance]

**The conversations:** [scripts for the three hard cases, adapted to the situation given]

## Quality Checks

- [ ] Every current criterion has a human/tool/hybrid verdict — none skipped as "obviously fine"
- [ ] New criteria are observable behaviours, not virtues ("catches errors before shipping" not "is diligent")
- [ ] Verification labour is explicitly valued somewhere — the invisible work made visible
- [ ] Calibration rules prevent both punishing adoption and punishing non-adoption
- [ ] The launderer case routes to reliability/accountability, not to relitigating the AI policy

## Anti-Patterns

- [ ] Do not credit or blame the human for what the model did — walk the work backwards to find the human
- [ ] Do not keep volume metrics "because they're objective" — they're objective measurements of the wrong thing now
- [ ] Do not run calibration comparing raw output across uneven adopters — that's a tooling lottery, not a review
- [ ] Do not treat AI scepticism as a performance problem where use is optional — outcomes are the bar, not enthusiasm
- [ ] Do not have the accountability conversation without the org's policy in hand — improvised rules in a review are how grievances are born

## Example Trigger Phrases

- "Review someone whose work is heavily AI-assisted."
- "Calibrating a team with uneven AI adoption."
- "Write review criteria for the AI era."
