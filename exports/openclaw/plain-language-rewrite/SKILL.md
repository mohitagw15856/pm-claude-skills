---
name: plain-language-rewrite
description: "Rewrite jargon-dense text into plain language without losing precision — the translation pass that keeps every fact and qualifier, the jargon triage (terms to replace, terms to keep-and-define), and the reading-level honesty for the actual audience. Use when asked make this readable, translate this for non-experts, de-jargon this announcement, or rewrite this so my parents/customers/new hires understand it. Produces the rewrite with a fidelity check, the jargon ledger, and the kept-terms glossary line."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/plain-language-rewrite.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Plain Language Rewrite Skill

Plain language has a bad reputation because it's done badly — "simplifying" that quietly drops the qualifiers, rounds the numbers, and turns precise claims into vibes. Done right, it's a *translation* with a fidelity guarantee: every fact, number, condition, and hedge in the original survives; what changes is the packaging — sentence length, word choice, structure, and the jargon triage (most terms translate; some are load-bearing and get kept-and-defined instead, because renaming a term of art creates confusion downstream). The test is a reader who knows nothing and a checker who knows everything, both satisfied.

## What This Skill Produces

- **The rewrite** — the same content at the target reading level, structured for the new reader
- **The fidelity check** — facts/numbers/qualifiers in original vs. rewrite, diffed to zero loss
- **The jargon ledger** — each term: translated (to what) / kept-and-defined (why it's load-bearing)
- **The audience calibration** — what the target reader knows, and the one-notch rule applied

## Required Inputs

Ask for these if not provided:
- **The text** — verbatim; translation works on actual sentences
- **The audience, concretely** — "customers who don't know insurance" beats "general public"; the rewrite calibrates to what *they* already know, and one text can't serve experts and novices simultaneously (say so when asked to)
- **The load-bearing terms** — which jargon is contractual, regulatory, or searchable-by-the-reader (those get kept-and-defined; renaming "deductible" to "your share" helps nobody who then reads their policy)
- **The stakes** — legal/medical/financial texts keep their hedges verbatim-in-meaning; marketing texts have more freedom — the fidelity bar scales up with stakes

## Framework: The Translation Rules

1. **Fidelity is the contract:** before rewriting, extract the original's claims list (facts, numbers, conditions, hedges); after, diff the rewrite against it. "Usually," "up to," and "unless" are content, not decoration — a plain rewrite that drops them is a *different document* with better fonts.
2. **The jargon triage, not the jargon purge:** each term gets a verdict — *translate* (internal shorthand, latinate padding: "utilize"→"use", "prior to"→"before") or *keep-and-define* (terms of art the reader will meet again: "your deductible — the amount you pay before insurance starts paying"). The ledger records both, because reviewers will ask.
3. **Sentence surgery before word surgery:** the biggest readability gains are structural — one idea per sentence, front-loaded subjects, lists for parallel items, 20-ish words average. Swapping words inside 60-word sentences polishes the unreadable.
4. **Calibrate one notch below the audience's floor:** write to slightly *simpler* than the audience needs — comprehension costs nothing extra for strong readers, and the weakest reader in the audience is the one the text exists to reach. But never condescend in tone: plain is respectful; simplified-with-a-pat-on-the-head is not.
5. **The two-reader test:** a target-audience reader retells the content correctly (comprehension) AND a subject-matter expert confirms nothing became false (fidelity). Passing one test is easy; the skill is passing both, and the output states both results.

## Output Format

# Plain Rewrite: [text] — for [audience]

## The Rewrite
[The translated text, structured for the reader]

## Fidelity Check
| Original claim/number/qualifier | Where it survives in the rewrite |
|---|---|
[Zero-loss demonstrated, or the flagged intentional cuts with reasons]

## Jargon Ledger
| Term | Verdict | Rendered as |
|---|---|---|

## The Two-Reader Result
[Comprehension: retellable? · Fidelity: expert-clean? · the stakes note for legal/medical texts: hedges preserved verbatim-in-meaning]

## Quality Checks

- [ ] The claims list was extracted before rewriting and diffed after
- [ ] Every qualifier survives — no "usually" became "always"
- [ ] Load-bearing terms were kept-and-defined, not renamed
- [ ] Sentence structure did the heavy lifting before word swaps
- [ ] Both readers pass: the novice retells it; the expert signs it

## Anti-Patterns

- [ ] Do not simplify by deletion — dropped hedges are the classic plain-language malpractice
- [ ] Do not rename terms of art — the reader meets "deductible" again five minutes later
- [ ] Do not write down at the audience — plain and respectful are the same register
- [ ] Do not serve two audiences with one text — name the split when asked to
- [ ] Do not skip the expert pass on high-stakes text — readable-but-wrong is the worst outcome on the board

## Example Trigger Phrases

- "Make this readable."
- "Translate this for non-experts."
- "De-jargon this announcement."
- "Rewrite this so my parents/customers/new hires understand it."
