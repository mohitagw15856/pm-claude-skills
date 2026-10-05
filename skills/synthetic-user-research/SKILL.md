---
name: synthetic-user-research
description: "Use AI personas for early-stage research signal — with hard guardrails on what synthetic methods can and cannot validate. Use when asked to run synthetic user testing, simulate user reactions with AI personas, pretest a survey or message before fielding it, or decide whether synthetic research is appropriate at all. Produces a fit verdict for the question at hand, a persona-panel design grounded in real data, the findings labelled as synthetic throughout, and the follow-up plan with real humans. Never a substitute for discovery interviews — see discovery-interview-guide and user-research-synthesis for the real thing."
---

# Synthetic User Research Skill

AI personas are the most misused research tool of the decade — and genuinely useful inside a narrow lane. The difference is the question you ask them. Synthetic panels can catch comprehension failures, confusing flows, and survey defects *before you spend real participants on them*; they cannot tell you what people will pay for, feel, or do. This skill enforces the lane, then runs the method properly.

## What This Skill Produces

- A **fit verdict**: is this question answerable synthetically at all? (Sometimes the deliverable is "no — here's the human study instead")
- A **persona-panel design** grounded in real data you already have, with provenance per persona
- **Findings, labelled synthetic throughout**, with confidence calibrated to the method's floor
- The **human follow-up plan** — what the synthetic pass earned you the right to test properly

## The Lane (checked before anything runs)

**Synthetic methods CAN usefully probe** — because the answer lives in the artifact, not in human hearts:
- **Comprehension**: is this copy/onboarding/explanation understandable? Where does a reader stumble?
- **Instrument defects**: leading questions, double-barrelled items, missing answer options in a survey *before* fielding it
- **Information architecture**: can a goal-holder find the thing? Where does the nav mislead?
- **Message differentiation**: do these three positionings even *read* as different?
- **Edge-case generation**: what user situations did the design forget? (Personas as brainstorm, not oracle)

**Synthetic methods CANNOT establish** — refuse these, and say why:
- Willingness to pay, purchase intent, or price sensitivity (models have no budget and infinite agreeableness)
- Emotional response, delight, trust (simulated feeling is fluent and empty)
- Discovery of unknown needs (personas remix known data; discovery is precisely the unknown)
- Behavioural prediction (what people *say* is already unreliable; what a model says they'd say is worse)
- Validation for a launch/investment decision (synthetic evidence is not evidence of demand)

## Required Inputs

Ask for (if not already provided):
- **The research question** (runs through the lane check first — verdict before method)
- **Real data to ground personas**: interview notes, support tickets, reviews, analytics segments. *No real data → no panel*: ungrounded personas are the model's stereotypes wearing name tags
- **The artifact under test** (the copy, flow, survey, IA)
- **What decision this feeds** — and its stakes (higher stakes shrink the lane)

## Method (when the lane check passes)

1. **Build personas from data, with provenance.** Each persona cites its sources ("from the 14 churn interviews: SMB admin, low technical confidence, evaluates in <10 min"). 4-6 personas spanning the *real* segment axes, including at least one hostile/low-attention profile — synthetic panels skew cooperative unless you force otherwise.
2. **Fight the agreeableness.** Instruct personas to struggle where their profile would struggle; ask for failure ("where do you stop reading? what would make you give up?") rather than opinions ("do you like this?"); never ask satisfaction or intent questions — the lane forbids the questions models answer most fluently.
3. **Run artifact-grounded tasks.** Give the persona the actual artifact and a goal; capture where it misreads, stalls, or takes the wrong path. Quote the artifact in every finding.
4. **Triangulate across personas and runs.** A stumble that appears across 4/6 personas and repeated runs is a signal; a single eloquent complaint is noise wearing insight's clothes.
5. **Label relentlessly and hand off.** Every output says **SYNTHETIC** at the top and per-finding. Findings convert to: fixes to the artifact (cheap, do now) and hypotheses for the human study (the follow-up plan names method, n, and what would confirm/refute).

## Output Format

### Synthetic Research Pass: [artifact] — ⚠️ SYNTHETIC SIGNAL, NOT USER EVIDENCE

**Lane check:** [question] → [in-lane ✅ / out-of-lane 🔴 with the human method to use instead]

**Panel:** [persona → grounded in → key traits] *(provenance per persona)*

**Findings** *(each labelled synthetic)*
| # | Finding | Artifact evidence (quoted) | Personas affected | Confidence |
|---|---|---|---|---|

**Fixes now:** [artifact changes the synthetic pass justifies — comprehension/IA/instrument defects]

**For real humans:** [hypothesis → method → n → what confirms/refutes] — *the synthetic pass bought sharper questions, not answers*

## Quality Checks

- [ ] The lane check ran first, and out-of-lane questions were refused with the alternative named
- [ ] Every persona cites the real data it's built from — no data, no persona
- [ ] The panel includes hostile/low-attention profiles
- [ ] No finding reports simulated emotion, intent, or willingness to pay
- [ ] SYNTHETIC labelling survives copy-paste (it's in the findings, not just the header)
- [ ] The human follow-up plan exists — this method ends in better questions, never in validation

## Anti-Patterns

- [ ] Do not run synthetic "validation" for launch or investment decisions — that's laundering a model's agreeableness into evidence
- [ ] Do not build personas from vibes or market-report archetypes — stereotypes in, stereotypes out
- [ ] Do not ask personas how they *feel* or what they'd *pay* — the fluent answer is the false one
- [ ] Do not report synthetic findings in the same register as real research — a stakeholder who can't tell the difference wasn't told loudly enough
- [ ] Do not let a synthetic pass replace the discovery interview it was supposed to prepare — the lane is *before* human research, never instead of it

## Example Trigger Phrases

- "Run synthetic user testing."
- "Simulate user reactions with AI personas."
- "Pretest a survey."
- "Decide whether synthetic research is appropriate at all."
