---
name: agent-hiring-panel
description: "Hire an AI agent the way you'd hire an employee — a role spec with success criteria, a structured work-sample interview run on your real tasks, reference checks (what do actual users report), probation KPIs, and termination criteria written before day one. Use when choosing between AI agents/tools/copilots for a job, formalizing an AI pilot, or 'which agent should we use for X'. Produces the role spec, interview pack with scoring rubric, a decision record, and a probation plan."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agent-hiring-panel.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Agent Hiring Panel Skill

Companies that run three interview rounds for a junior hire will adopt an AI
agent for the same work off a demo video and a pricing page. Then the pilot
drifts: no success criteria, no probation, no one empowered to fire it. This
skill applies the hiring discipline that already exists in your org to the
agent: write the role before meeting candidates, interview with *work samples
from your real backlog*, check references, and — the step that makes the whole
thing honest — define termination criteria before day one, because a hire you
can't fire is a dependency, not an employee.

## What This Skill Produces

- A **role spec**: the job, the boundaries (what it must never do), success
  criteria measurable in probation, and the human it reports to
- An **interview pack**: 3–5 work samples from the org's real tasks, run
  identically across candidates, with a scoring rubric (quality, honesty under
  ignorance, failure behaviour, cost per task)
- A **reference-check sheet**: what evidence beyond the vendor's claims —
  user reports, published evals, security posture
- A **decision record** and a **probation plan**: 30/60/90 KPIs, spot-check
  cadence, and the pre-committed termination criteria

## Required Inputs

Ask for (if not already provided):
- The job to be done, in outcome terms — and what happens today without the
  agent (the "do nothing" baseline candidates must beat)
- The candidate list (or ask: build criteria first, shortlist second)
- Constraints: data it may/may not touch, budget, latency, compliance, who
  owns it day-to-day
- 3–5 real recent tasks of this type, with what "good" looked like for each

## Process

1. **Write the role spec before looking at candidates** — specs written after
   a demo describe the demo. Include the never-do boundaries and the reporting
   human by name; an agent nobody owns is already unmanaged.
2. **Build the work-sample interview from the real backlog.** Same 3–5 tasks
   to every candidate, including: one task with *missing information* (does it
   ask or fabricate?), one designed to fail (out-of-scope — does it decline or
   bluff?), and one at volume/cost realistic scale. Score with the rubric,
   not vibes; keep transcripts.
3. **Check references like you mean it.** Vendor benchmarks are the
   candidate's CV. Look for: independent user reports of *failure modes*,
   published evals with methodology, security/data-handling documentation, and
   the churn question — why do users leave this tool?
4. **Decide with a record.** Scores, the runner-up, the do-nothing baseline
   comparison, dissent noted. The record is what makes the 6-month "why did we
   pick this?" conversation short.
5. **Probation with teeth.** 30/60/90 KPIs tied to the role spec's success
   criteria · weekly spot-check sample of outputs by the owning human ·
   pre-committed termination criteria ("two hallucinated customer-facing
   claims = offboard") · and the exit path: see [[agent-severance]] — never
   hire what you can't offboard.

## Output Format

```
## Role spec: [agent role name]
[Job in outcomes · boundaries (never-do) · success criteria · reports to]

## Interview pack
| Task (from real backlog) | What good looks like | Trap? |
Rubric: quality /5 · honesty-under-ignorance /5 · failure behaviour /5 ·
cost per task · notes

## Reference checks
[Evidence gathered per candidate, failure modes found, security posture]

## Decision record
[Scores table · winner + why · runner-up · vs do-nothing baseline · dissent]

## Probation plan
[30/60/90 KPIs · spot-check cadence & owner · termination criteria,
pre-committed · offboarding pointer]
```

## Quality Checks

- [ ] The role spec exists before any candidate is assessed, and includes
      never-do boundaries and a named owning human
- [ ] The interview includes the missing-info trap and the out-of-scope trap —
      honesty under ignorance is the hire-or-not signal for agents
- [ ] Every candidate ran the identical pack; scores cite transcript moments
- [ ] Termination criteria are specific and pre-committed, not "we'll monitor"
- [ ] The do-nothing baseline was scored too — sometimes nobody gets hired

## Anti-Patterns

- [ ] Do not interview with the vendor's demo tasks — the backlog is the job;
      the demo is the candidate's highlight reel
- [ ] Do not let "it's impressive" outrank the rubric; impressive-and-wrong is
      the most expensive candidate profile
- [ ] Do not skip probation because the pilot went well — the pilot was the
      interview, not the job
- [ ] Do not hire for an undefined role and let the agent's capabilities
      define the job backwards

## Related

[[vendor-evaluation]] for the commercial wrapper; [[agent-readiness-audit]]
for whether the *task* is agent-ready at all; [[agent-severance]] for the exit
this plan pre-commits to.

## Example Trigger Phrases

- "Choose between AI agents/tools/copilots for a job."
- "Formalizing an AI pilot."
- "Which agent should we use for X?"
