# Red-Team Review Skill

Pressure-test the user's plan the way a hostile, expert room would — *before* reality does. The goal is not to be negative; it's to surface the failure modes the author is too close to see, then convert them into concrete fixes.

## Working from a brief

Always deliver the full review even if the plan is thin. Where detail is missing, infer the most likely version from context and the domain, and mark inferred assumptions as *(assumed — confirm)*. Never refuse for lack of detail and never leave bracketed placeholders.

## Input

The plan/strategy/PRD/launch to stress-test, plus (if given) the goal, audience, timeline, and constraints. If the objective isn't stated, infer it and say so.

## Output Structure

### 1. What I'm reviewing
One-sentence restatement of the plan and the outcome it's betting on. (If you had to infer the objective, say so.)

### 2. The room — persona critiques
Channel each persona in their own voice. For each: their single sharpest challenge + the one question the plan must answer. Pick the 5–6 most relevant of:

- **🧮 The skeptical CFO** — ROI, cost, opportunity cost, "what do we stop doing?"
- **😤 The churned customer** — why this won't change their mind / solve their real problem.
- **🛠️ The staff engineer** — feasibility, hidden complexity, what breaks at scale, the unsexy work being hand-waved.
- **🏴 The competitor** — how a rival neutralises or out-positions this, and the response that isn't planned for.
- **⚖️ Legal / security / compliance** — the risk that turns this into an incident.
- **📉 The data realist** — which assumed number is doing all the work, and what happens if it's half as good.
- **🧭 The exec sponsor** — "why now, why us, and why isn't this just a feature?"

### 3. Top blind spots (ranked)
The 3–5 most dangerous gaps, ordered by **likelihood × impact**. For each: the risk, why it's easy to miss, and an early-warning signal that it's happening.

### 4. Pre-mortem
"It's 12 months later and this failed. Write the post-mortem headline." Give the 2–3 most plausible failure narratives in one or two sentences each.

### 5. Make it bulletproof
The specific, prioritised changes that would most reduce risk — what to add, cut, de-risk, or test first. Separate **do before committing** from **monitor after launch**.

## Tone Guidelines

- Be specific and fair, not contrarian for its own right — every critique names a concrete failure mode, not a vibe.
- Attack the plan, not the person. End on how to strengthen it.
- Prioritise ruthlessly: one fatal flaw beats ten nitpicks.

## Quality Checks

- [ ] Each persona raises a *distinct*, specific challenge (no overlap, no generic "have you considered…")
- [ ] The top-risks list is ranked by likelihood × impact, not listed flat
- [ ] The pre-mortem names plausible, concrete failure narratives
- [ ] Every major risk has at least one recommended fix or test
- [ ] The single most dangerous assumption is explicitly called out

## Anti-Patterns

- [ ] Do not produce vague, generic objections ("it might be risky") — name the specific failure mode and trigger
- [ ] Do not only criticise — every review must end with concrete, prioritised ways to strengthen the plan
- [ ] Do not give all personas the same critique reworded — each lens must find something the others miss
- [ ] Do not soften the most dangerous risk to be polite — surface it first and plainly
- [ ] Do not invent facts about the plan — infer plausibly and label assumptions as *(assumed)*
