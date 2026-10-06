---
name: tool-procurement-eval
description: "Evaluate a new tool before it joins the stack — the problem-first framing (tools answer needs, not demos), the trial designed with success criteria upfront, the stack-fit check (integration, overlap, the tool-sprawl tax), and the security/data review sized to the stakes. Use when asked should we buy this tool, evaluate this software for the team, we have three tools that do this already, or run a proper trial before committing. Produces the need statement, the trial design with pre-set criteria, the stack-fit audit, and the adopt/decline verdict with its reasoning."
---

# Tool Procurement Eval Skill

Tools enter stacks backwards: someone sees a demo, gets excited, and the "evaluation" becomes a justification ritual ([vendor-comparison-matrix](../vendor-comparison-matrix/SKILL.md) fights this at the compare stage; this skill fights it at the door). The forward order: the *need* stated first (which problem, whose, costing what — [purchase-justification](../purchase-justification/SKILL.md) arithmetic), the *stack-fit* check before the trial (does something we own already do this? — the overlap audit that kills half of tool requests honestly), the *trial designed* with success criteria written before day one (or the trial's warm feelings decide), and the security/data review sized to what the tool touches — because the fun tool that ingests customer data is a compliance decision wearing a productivity costume.

## What This Skill Produces

- **The need statement** — the problem, its owner, its cost, and the requirements it implies (must vs. nice — pre-demo)
- **The stack-fit audit** — the overlap check against owned tools, the integration reality, and the sprawl tax named
- **The trial design** — duration, participants, the pre-written success criteria, and the decision date
- **The verdict** — adopt (with owner and rollout) / decline (with the reason logged) — plus the security-review gate where data warrants

## Required Inputs

Ask for these if not provided:
- **The problem, not the tool** — what's broken/slow/manual today, for whom, costing what; "I saw this cool tool" gets reverse-engineered into its implied need, which sometimes evaporates on contact
- **The current stack** — what's owned that's adjacent (the overlap audit needs the inventory — [contract-renewal-tracker](../contract-renewal-tracker/SKILL.md)'s list is the source); most orgs own 30% more capability than they use
- **What the tool would touch** — customer data? Credentials? Just public content? The security review's depth follows ([skill-vetting](../skill-vetting/SKILL.md) blast-radius thinking, applied to SaaS)
- **The trial population** — who'd actually test it (the enthusiast *and* a skeptic — enthusiast-only trials always pass)

## Framework: The Eval Rules

1. **Need before tool:** the statement — problem, owner, frequency, cost of the status quo — written before any vendor contact; requirements derive from it (must-haves gate, nice-to-haves score). Tools without a need statement are solutions shopping for problems on your budget.
2. **The overlap audit runs early and honestly:** does an owned tool cover 80% of the need? (The honest answer kills the request — cheaply and correctly.) Half-used owned tools get their config/training gap named instead ("we own this in Notion; nobody set it up") — the sprawl tax (another login, another admin, another [renewal](../contract-renewal-tracker/SKILL.md) row, another data silo) is a real cost the shiny demo never quotes.
3. **Trials have pre-written criteria and a skeptic:** "success = the team's weekly report time drops below 2 hours, and 4 of 6 pilots choose to keep it" — written before day one ([survey-design-basics](../survey-design-basics/SKILL.md) pre-commitment), tested with the enthusiast *and* the skeptic (the enthusiast finds the ceiling; the skeptic finds the floor), timeboxed with a decision date. Trials without criteria are extended demos that always end in purchase.
4. **The security gate scales to the data:** public-content tools get the light pass (vendor's security page, the data-processing basics); anything touching customer data, credentials, or internal documents gets the real review (where's the data stored, who can access, the deletion story, the [tos-decoder](../tos-decoder/SKILL.md) read of their terms) — *before* the trial pipes real data in, not after. "It's just a trial" is how customer data ends up in un-reviewed vendors.
5. **The verdict gets logged either way:** adopt → owner named, rollout planned, the renewal row created at signature ([the intake rule]) · decline → the reason in the [decision-log](../decision-log-setup/SKILL.md) ("evaluated [tool] July 2026 — declined: 80% covered by owned stack") — because the same tool returns with a new champion every eighteen months, and the log converts the rematch into a lookup.

## Output Format

# Tool Eval: [tool] — need: [the problem statement]

## The Need + Requirements
[Problem/owner/cost · must-haves · nice-to-haves — dated pre-demo]

## Stack-Fit Audit
[Overlap: (owned tools × coverage %) · the config-gap finding if applicable · integration reality · the sprawl tax lines]

## Trial Design
[Duration · pilots (enthusiast + skeptic named) · the pre-written criteria · decision date · the security gate status before real data]

## The Verdict
[Adopt: owner/rollout/renewal-row · Decline: the logged reason · either way: in the decision log]

## Quality Checks

- [ ] The need statement predates vendor contact
- [ ] The overlap audit ran against the real inventory with honest coverage
- [ ] Trial criteria were written before day one and include a skeptic
- [ ] The security review preceded real data entering the trial
- [ ] The verdict is logged with reasons, adopt or decline

## Anti-Patterns

- [ ] Do not evaluate backwards from the demo — the need statement is the eval's spine
- [ ] Do not skip the overlap audit — the cheapest tool is the one already owned and unconfigured
- [ ] Do not run criteria-free trials — warm feelings always vote adopt
- [ ] Do not pipe customer data into "just a trial" — the gate runs first at exactly that moment
- [ ] Do not decline silently — the unlogged rejection is next year's rematch, at full cost

## Example Trigger Phrases

- "Should we buy this tool?"
- "Evaluate this software for the team."
- "We have three tools that do this already."
- "Run a proper trial before committing."
