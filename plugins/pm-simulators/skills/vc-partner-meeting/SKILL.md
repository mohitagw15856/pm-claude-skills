---
name: vc-partner-meeting
description: "Simulate the VC partner meeting that discusses your pitch after you leave the room — four partner archetypes debate, then write the internal verdict memo. Use when asked how will VCs discuss my pitch, simulate the partner meeting, stress-test my fundraise, or what happens after the pitch. Produces the meeting transcript, the internal fund/pass/track memo, and a debrief listing which objections are fixable before the real meeting."
---

# VC Partner Meeting Skill

The most important meeting of your fundraise is one you're not in. This skill runs it early: four partners who just watched your pitch debate it the way funds actually do — pattern-matching, fund math, and all — then commit a verdict to the internal memo.

## What This Skill Produces

- **The transcript** — four partner archetypes discussing your company, each in a distinct voice
- **The internal memo** — the fund/pass/track verdict with the reasoning a fund would actually write down
- **The debrief** — out of character: objections ranked by fixability before your real meeting

## Required Inputs

Ask for these if not provided:
- **The pitch** — deck text, memo, or a summary of the business (stage, traction, team, market, raise amount, valuation ask)
- **The fund context** (optional) — fund size and stage focus; default to a $300M multi-stage fund if absent
- **Known objections** (optional) — what pushback the user has already heard

## Framework: The Four Partners

Each speaks at least twice; they must disagree somewhere — real partner meetings are arguments:

| Partner | What they weigh | Their failure mode (include it) |
|---|---|---|
| **The Champion** | Why this could be huge; founder quality | Falls in love, discounts risk |
| **The Skeptic** | Why this dies: competition, moat, timing | Kills things that later win |
| **The Pattern-Matcher** | "This looks like X in 2021" — comps, cautionary tales | Fights the last war |
| **The Fund-Math Partner** | Can THIS check return the fund? Ownership, entry price, follow-on reserve | Passes on great-but-small |

**Verdicts:** FUND (term sheet path) · TRACK (specific milestone named — "come back at $1M ARR") · PASS (real reason, not the polite one).

Ground every argument in the supplied facts; where the pitch is silent, the partners should *notice the silence* — that is realistic — rather than invent numbers.

## Output Format

---

# Partner Meeting: [Company] — [date]

> Simulation — a plausible adversarial reading, not a prediction or investment advice.

## Transcript
[Natural discussion, 12–20 exchanges. Interruptions, references to the deck's actual numbers, at least one genuine disagreement that doesn't fully resolve.]

## Internal Memo
**Verdict:** FUND / TRACK / PASS
**One-line thesis or anti-thesis:** …
**What we'd need to believe:** 3 bullets
**Deal terms discussed:** ownership target, price reaction
**If TRACK:** the named milestone. **If PASS:** the real reason vs. what the associate will email the founder.

## Debrief — out of character
| Objection raised | Fixable before the real meeting? | How |
|---|---|---|

One paragraph: the single strongest move before pitching for real.

---

## Quality Checks

- [ ] All four archetypes speak with distinguishable voices and at least one real disagreement
- [ ] Every numeric claim in the transcript comes from the pitch or is flagged as a partner's assumption
- [ ] Fund math is actually computed (ownership × plausible exit vs fund size), not gestured at
- [ ] The PASS reason (if pass) is the true one, and differs from the polite email version
- [ ] Debrief separates fixable objections from structural ones honestly

## Anti-Patterns

- [ ] Do not pull punches — a meeting where everyone likes the deal is a worthless simulation
- [ ] Do not let the Champion win by default; the memo verdict must follow the strongest argument
- [ ] Do not invent traction numbers the pitch didn't claim — partners noticing missing numbers IS the feedback
- [ ] Do not stay in character in the debrief
- [ ] Do not produce a generic "VCs care about TAM" lecture — every line must be about THIS company
