---
aliases: ["Evidence Lock"]
tags: [pm-skills, skill]
skill: evidence-lock
description: "Write or rewrite a document in evidence-locked mode: no unsourced sentences — every substantive claim carries a footnote citing the exact passage in the user's provided sources, and anything unsupportable is explicitly marked. Use when asked to make a document fully sourced, add citations from my docs, ground a draft in the attached material, or produce something for audiences that will check (legal, board, regulators, enterprise buyers). Produces the document with numbered citations, a source map quoting each cited passage, and an unsupported-claims register."
---

# Evidence Lock Skill

For most drafts, plausible is enough. This mode is for the documents where someone *will* check: every substantive sentence either cites the exact passage in the user's sources that supports it, or wears an explicit `[UNSOURCED]` flag. No third state.

## What This Skill Produces

- The **document**, with numbered footnote markers on every substantive claim
- A **source map**: each footnote → source name + the supporting passage *quoted verbatim*
- An **unsupported-claims register**: every `[UNSOURCED]` item with what evidence would resolve it
- A **coverage score**: % of substantive claims that are locked

## Required Inputs

Ask for (if not already provided):
- **The sources** — pasted documents, files, or excerpts. This skill cannot run without them; general knowledge is not a source here.
- **The task** — either a draft to lock (rewrite mode) or a brief to write from scratch (compose mode)
- **Strictness** — *hard lock* (unsupported claims are removed to the register) or *soft lock* (they stay in the text, flagged `[UNSOURCED]`). Default: soft.

## Locking Method

1. **Index the sources first.** Skim all provided material and note what each source can support. If sources are thin relative to the task, say so up front — don't compensate with fluency.
2. **Classify each sentence while writing:** *substantive* (factual claim, number, attribution, causal statement) → needs a lock; *structural* (transitions, headings, statements of the document's own intent) → exempt. When in doubt, it's substantive.
3. **Lock = quote-level, not document-level.** A footnote cites the source *and the passage*: `[3]` → "Q2 churn analysis, §4: 'logo churn concentrated in accounts under $10k ACV (71% of losses)'". Citing a whole document is not a lock.
4. **No stretching.** The passage must actually support the claim as written — not a weaker cousin of it. If the source says "churn rose in Q2" and the draft says "churn is accelerating", that's `[UNSOURCED]` (or the sentence gets weakened to what the source supports — prefer weakening).
5. **Conflicts surface, never average.** Two sources disagreeing produces both citations and a visible note, not a blended number.
6. **Inference is allowed but labelled.** A conclusion derived from cited facts gets `[inference from 2,5]` — distinguishing *sourced*, *inferred from sourced*, and *unsourced*.

## Output Format

### [Document title] — evidence-locked · coverage: [n]% ([x] of [y] substantive claims)

[The document. Substantive claims carry `[n]` markers; unsupported ones carry `[UNSOURCED]` (soft) or are absent (hard). Inferences carry `[inference from n,m]`.]

---
**Source map**
| # | Source | Supporting passage (verbatim) |
|---|---|---|
| 1 | [doc, section] | "[exact quote]" |

**Unsupported claims register**
| Claim | Why it's unsourced | What would resolve it |
|---|---|---|

**Conflicts noted:** [source A says X; source B says Y — surfaced at footnote n]

## Quality Checks

- [ ] Every substantive sentence has a footnote, an `[UNSOURCED]` flag, or an `[inference from …]` label — zero unmarked claims
- [ ] Every footnote quotes the passage verbatim; spot-checking any quote against the source succeeds
- [ ] No passage is stretched — each supports the claim *as written*
- [ ] The coverage score is computed by counting, and low coverage is stated plainly, not disguised
- [ ] Source conflicts appear in the text, not silently resolved

## Anti-Patterns

- [ ] Do not fill source gaps with general knowledge — in this mode the provided sources are the entire universe of evidence
- [ ] Do not cite documents wholesale — a lock names the passage
- [ ] Do not launder inference as citation — derived conclusions are labelled as derived
- [ ] Do not quietly drop claims that can't be sourced in soft mode — the register exists so the author sees what's resting on air
- [ ] Do not proceed without sources "just this once" — without sources this is a normal draft, and other skills do that better

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
