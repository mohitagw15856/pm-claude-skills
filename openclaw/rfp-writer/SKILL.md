---
name: rfp-writer
description: "Write a clear Request for Proposal that gets comparable, high-quality vendor bids. Use when asked to write an RFP, a request for proposal/quote/tender, or to solicit and compare vendor proposals. Produces a complete RFP — background, scope of work, requirements, evaluation criteria with weights, submission instructions, and timeline — structured so responses are easy to compare apples-to-apples."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/rfp-writer.html
metadata:
  {
    "openclaw": { "emoji": "🔩" }
  }
---

# RFP Writer Skill

A good RFP gets you proposals you can actually compare; a vague one gets a pile of incomparable sales decks.
The trick is to specify the problem and the **evaluation criteria** clearly enough that vendors answer the same
questions the same way. This skill writes that RFP — scoped, requirement-driven, and weighted — so selection is
a defensible comparison, not a gut call.

## Working from a brief

Given "we need an RFP for a new CRM", **produce the full RFP anyway** — infer a sensible scope, requirements,
and evaluation weights for that category, label assumptions, and bracket org-specifics (budget, dates, contacts)
to fill in. Never withhold for missing detail.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **What you're buying** — the product/service/project and the problem it solves.
- **Scope** — what's in and explicitly out, deliverables, and any integration/constraints.
- **Requirements** — must-haves vs. nice-to-haves (functional, technical, security, compliance).
- **Evaluation priorities** — what matters most (price, capability, support, security, timeline) for weighting.
- **Logistics** — budget range (if shared), timeline, submission format, and contact.

## Output Format

### Request for Proposal: [project]

- **1. Introduction & background** — who you are, the problem, and the goal of this RFP.
- **2. Scope of work** — deliverables, what's in/out of scope, and success criteria.
- **3. Requirements** — organised, and split into **mandatory** and **desirable** (so non-compliant bids screen out fast).
- **4. Vendor questions** — the specific questions every vendor must answer (capability, approach, team, security, references, pricing model) — phrased so answers are comparable.
- **5. Evaluation criteria** — the weighted scoring model:

| Criterion | Weight | What we're assessing |
|---|---|---|
| Capability / fit | 35% | meets mandatory + desirable requirements |
| Price / TCO | 25% | total cost over the term, not just licence |
| Support & SLAs | 15% | onboarding, support, uptime |
| Security & compliance | 15% | data handling, certifications |
| References / track record | 10% | proven delivery for similar orgs |

- **6. Submission instructions** — format, page/section limits, what to include, and how/where to submit.
- **7. Timeline** — issue date, questions deadline, submission deadline, evaluation, decision, and start.
- **8. Terms** — confidentiality, that the RFP isn't a commitment, and how questions are handled.

## Quality Checks

- [ ] Requirements are split into mandatory vs. desirable so bids can be screened and scored
- [ ] Evaluation criteria are explicit and weighted **before** responses arrive (not reverse-engineered to a favourite)
- [ ] Vendor questions are phrased to produce comparable, apples-to-apples answers
- [ ] Scope states what's explicitly out, not just what's in
- [ ] Submission format and limits are specified so responses are easy to evaluate
- [ ] A clear timeline with a questions window and deadlines is included

## Anti-Patterns

- [ ] Do not leave evaluation criteria unstated — undefined scoring invites bias and disputes
- [ ] Do not write open-ended questions that produce incomparable marketing answers
- [ ] Do not blur must-haves and nice-to-haves — vendors (and evaluators) can't prioritise
- [ ] Do not omit out-of-scope — scope creep starts in a vague RFP
- [ ] Do not set the weights after seeing the bids — decide what matters up front

## Based On

Procurement practice — requirement-driven scoping, weighted evaluation criteria set in advance, and structured questions for comparable bids.

## Example Trigger Phrases

- "Write an RFP."
- "Write a request for quotes."
- "Write a tender for this project."
- "Solicit and compare vendor proposals."
