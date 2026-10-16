---
name: human-in-the-loop-design
description: "Design the human approval surface for an agent system — which actions gate, how approvals batch without becoming rubber stamps, and what the audit trail must hold. Use when asked to add human oversight to an agent, design approval workflows for AI actions, decide what an agent may do autonomously, or fix approval fatigue in an existing loop. Produces an action-tier policy, approval UX spec, escalation rules, and audit-trail requirements. For specifying the whole agent use agent-spec; for the per-skill execution gates see the Execution-block pattern in SKILLSPEC §5."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/human-in-the-loop-design.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Human-in-the-Loop Design Skill

The failure mode of agent oversight isn't too little review — it's review that decays into a rubber stamp. Forty approval prompts a day trains the human to click yes; then the one that mattered goes through with the rest. This skill designs the loop so human attention lands exactly where it changes the outcome, and nowhere else.

## What This Skill Produces

- An **action-tier policy**: every agent action classified auto / notify / approve / forbidden
- An **approval UX spec**: what the human sees, batching rules, and the anti-rubber-stamp mechanics
- **Escalation & fallback rules**: timeouts, absent approvers, disagreement
- **Audit-trail requirements**: what gets recorded so any decision is reconstructable

## Required Inputs

Ask for (if not already provided):
- **The agent and its action inventory** — everything it *can* do (from its tool list, not its marketing)
- **Blast radius per action**: reversible? outward-facing? money/data/permissions involved?
- **Volume estimates**: how many times per day each action fires (approval load is a design constraint, not an afterthought)
- **Who approves** — role, how many people, what else competes for their attention

## Design Method

1. **Tier every action by consequence, not by feel.** Two axes decide the tier: *reversibility* (undo in one step ↔ irreversible) and *reach* (internal draft ↔ external/financial/permanent). Then:
   - **Auto** — reversible + internal (drafts, reads, internal scratch writes). Log only.
   - **Notify** — reversible + modest reach (filed a ticket, updated a record). Do it, tell the human, easy undo.
   - **Approve** — hard to reverse OR outward-facing (send, publish, pay, delete, grant). Blocks until a human decides.
   - **Forbidden** — irreversible + high reach where the org has decided no automation belongs (auth changes, legal commitments). Not gated — *absent from the toolset*.
2. **Budget the approvals.** Multiply approve-tier actions by daily volume. If the number exceeds ~10-15 meaningful decisions per approver per day, the design is broken *before launch*: move volume down-tier by adding reversibility (drafts, holds, delayed sends) rather than by lowering the bar.
3. **Design the approval moment against rubber-stamping.**
   - Show the *decision*, not the transcript: what will happen, to whom, why the agent believes it's right, and what's unusual about this one.
   - **Surface anomaly, hide routine**: same-as-last-50 approvals batch into one digest; the outlier renders differently and alone.
   - Require *typed* engagement for the highest stakes (type the amount, name the recipient) — friction proportional to consequence.
   - Track approval latency and edit rate per approver: 100% instant approvals is a broken loop, not a good agent — say so in the metrics section.
4. **Write the escalation rules.** Approver silent for [X]: action expires safely (never auto-proceeds). Approver rejects: agent gets the reason as context, may revise once, then stops. Two approvers disagree: named tiebreaker. After-hours urgent: the on-call path, or an honest "waits until morning".
5. **Spec the audit trail.** Per gated action: what the agent proposed (verbatim), the evidence it showed, who decided, what shipped (diff vs proposal), timestamps. The reconstruction test: six months later, "why did this go out?" is answerable from the trail alone.
6. **Plan the tier reviews.** Tiers loosen with evidence, not with comfort: an action moves down a tier after [N] consecutive approvals with zero edits *and* a human review of a sample. Tightening is immediate on any incident.

## Output Format

### HITL Design: [agent system]

**Action-tier policy**
| Action | Reversibility | Reach | Tier | Volume/day | Notes |
|---|---|---|---|---|---|

**Approval load:** [decisions/day/approver at launch — and the redesign applied if it exceeded budget]

**The approval moment:** [what renders; batching rules; anomaly surfacing; typed-engagement thresholds]

**Escalation:** [timeout → outcome · rejection → protocol · disagreement → tiebreaker · after-hours → path]

**Audit trail:** [fields recorded; retention; who can query]

**Tier evolution:** [down-tier evidence bar · instant up-tier triggers · review cadence]

**Health metrics:** [approval latency, edit rate, override rate — with the "100% instant approvals means the loop is dead" alarm]

## Quality Checks

- [ ] Every action in the agent's toolset appears in the tier table — none defaulted silently
- [ ] The approval budget is computed, and the launch design fits inside it
- [ ] Timeout behaviour is safe-by-default (expire, never auto-proceed)
- [ ] The forbidden tier removes capabilities from the toolset rather than gating them
- [ ] Health metrics detect rubber-stamping, not just agent errors

## Anti-Patterns

- [ ] Do not gate everything — undifferentiated approval load is how the important one slips through
- [ ] Do not show raw transcripts as the approval artifact — humans approve decisions, not logs
- [ ] Do not let unanswered approvals auto-proceed on timeout "to keep things moving"
- [ ] Do not loosen tiers on gut feel — the down-tier bar is written evidence, the up-tier trigger is any incident
- [ ] Do not measure only agent mistakes — an approver who edits nothing for a month is the riskier signal

## Example Trigger Phrases

- "Design approval workflows for AI actions."
- "Decide what an agent may do autonomously."
- "Fix approval fatigue in an existing loop."
