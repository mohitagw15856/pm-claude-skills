---
name: house-style-enforcer
description: "Apply a team's writing style consistently — extract the house style from exemplar documents into a checkable rule card, run the conformance pass on new drafts, and fix violations without flattening the author's voice. Use when asked make this match our style, why do our docs all sound different, build a style guide from our best docs, or check this draft against house style. Produces the extracted rule card, the conformance pass with per-fix reasons, and the voice-preservation line."
---

# House Style Enforcer Skill

Most teams have a house style nobody wrote down — it lives in the three documents everyone calls "really good" and gets enforced by vibes in review. This skill makes it checkable: extract the rules from the exemplars (structure, tone registers, formatting conventions, banned constructions), compress them into a one-page rule card, then run drafts against the card — fixing violations *of the card* while leaving the author's voice alone, because style guides that flatten everyone into one android author get ignored in self-defense.

## What This Skill Produces

- **The rule card** — one page: structure rules, tone register, formatting conventions, the banned list — each rule with an example from the exemplars
- **The conformance pass** — the draft checked rule-by-rule, fixes applied with the violated rule cited
- **The voice line** — what the card deliberately does NOT govern (word choice within register, sentence rhythm, personality) — written down so enforcement has a boundary
- **The card's maintenance rule** — how rules get added/killed, so the card doesn't become the forty-page guide nobody reads

## Required Inputs

Ask for these if not provided:
- **The exemplars** — the 2–4 documents the team already agrees are right; the card is extracted from evidence, not invented from taste
- **The draft to check** (for conformance passes) — and its author's awareness (a pass the author asked for reads differently than one imposed; the output's tone follows)
- **The known fights** — the style arguments that recur (oxford commas, heading case, "we" vs "I", emoji in docs) — the card exists to settle them once, so they need listing
- **The scope** — which document types the card governs (specs? emails too?) — over-scoped cards die of exceptions

## Framework: The Enforcement Rules

1. **Extract, don't legislate:** every rule on the card cites its exemplar evidence ("all three exemplars open with the decision — rule: BLUF opening") — rules from taste get relitigated forever; rules from the team's own best work carry their own authority.
2. **The card is one page or it's a shelf ornament:** structure (3–5 rules), tone register (2–3), formatting (3–5), the banned list (the recurring fights, settled with one line each). Rule 15 costs compliance with rules 1–14; the maintenance rule (add one → consider killing one) keeps the budget.
3. **Check against the card, not against taste:** the conformance pass cites a card rule for every fix — "passive voice in the recommendation (card: recommendations are active)" — and anything the checker dislikes *without* a card rule is either proposed as a new rule or left alone. This is what separates enforcement from rewriting-in-my-voice.
4. **The voice line is load-bearing:** the card governs structure, register, and conventions — not vocabulary within register, not rhythm, not humor-where-appropriate. Two compliant authors should still sound like two people; a pass that makes everyone sound like the checker is a bug with confidence.
5. **Settle the fights on the card, once:** each recurring argument gets its line ("Oxford comma: yes · headings: sentence case · emoji: sparing in docs, free in chat") — the card's citation ends the thread. Fights the card hasn't settled get settled *by amending the card*, not by winning in one document's comments.

## Output Format

# House Style: [team] — card v[N]

## The Rule Card (one page)
**Structure:** [rules + exemplar cites] · **Register:** [...] · **Formatting:** [...] · **Settled fights:** [the one-liners]
**The voice line:** this card does not govern [vocabulary within register, rhythm, personality].

## Conformance Pass: [draft]
| Location | Violation | Card rule | The fix |
|---|---|---|---|
[Plus: "flagged but not card-covered: [items] — propose as rules or leave alone"]

## Maintenance
[Add-one-consider-killing-one · card owner · where it lives]

## Quality Checks

- [ ] Every rule cites exemplar evidence
- [ ] The card fits one page with the fight-settlers included
- [ ] Every conformance fix cites its rule; taste-only objections are separated
- [ ] The voice line exists and the pass honored it
- [ ] The card has an owner and an amendment path

## Anti-Patterns

- [ ] Do not invent rules from taste — extraction from exemplars or it's just the loudest reviewer's preferences, laminated
- [ ] Do not grow the card past a page — comprehensiveness is how style guides die
- [ ] Do not fix what no rule covers — that's rewriting, wearing enforcement's badge
- [ ] Do not flatten voice — compliant and distinctive must remain compatible or authors will route around the card
- [ ] Do not relitigate settled fights in comments — amend the card or accept it; documents are not the venue

## Example Trigger Phrases

- "Make this match our style."
- "Why do our docs all sound different?"
- "Build a style guide from our best docs."
- "Check this draft against house style."
