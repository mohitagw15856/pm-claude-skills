---
name: notes-humanizer
description: "Strips AI writing patterns from text and rewrites it to sound genuinely human — removing the statistical defaults, then adding earned voice calibrated to genre (opinion pieces get a person's voice; docs and summaries stay neutral) without ever faking humanity. Use when a draft reads as AI-generated, over-polished, or rhythmically uniform — including blog posts, emails, LinkedIn posts, or any prose that needs to sound like a real person wrote it. Produces a pattern audit, side-by-side comparison, itemised change log, and clean rewritten output ready to paste."
---

# Notes Humanizer

"Humanize this" prompts don't work because they don't know what to remove. AI text has specific, identifiable defaults — em dashes used as parenthetical substitutes, rule-of-three lists where all items have identical rhythm, sentences that hover between 15 and 20 words. Fix those defaults, add the signals human writers actually produce, and the text stops reading as synthetic. This skill does that systematically, in two phases, and shows you exactly what changed and why.

> Credit: Originally created by Orel (TheIndiepreneur) — adapted and extended for this library.

---

## Required Inputs

| Input | Format | Notes |
|---|---|---|
| Text to humanize | Paste directly into the chat | Any length. Works on paragraphs, full articles, social posts, emails. |

No other inputs required. Claude will not ask clarifying questions before starting — it works with what's given.

---

## Output Structure

### Section 1: What Was Found

A plain-language audit of the AI patterns detected in the original text, before any rewriting:

```
PATTERNS DETECTED
─────────────────
Em dashes used as parenthetical substitutes: 3
Filler openers ("Let's dive in", "It's worth noting", etc.): 2
Rule-of-three lists with identical rhythm: 1
Sentence length variance: low (avg 17 words, range 14–21)
Hedging qualifiers: 4
Passive constructions where active is cleaner: 2
```

### Section 2: Side-by-Side Comparison

| Original | Rewritten |
|---|---|
| [original paragraph] | [rewritten paragraph] |

(One row per paragraph or logical block. Short texts get the full comparison in one table. Long texts get the table collapsed to changed sections only, with unchanged sections noted.)

### Section 3: Change Log

Every specific change made, with the reason:

```
CHANGES MADE
────────────────────────────────────────────────
1. Removed em dash in "success — and it shows"
   → Rewritten as "success (and it shows)"
   Why: em dash here is a parenthetical substitute, not a genuine pause

2. Deleted "It's worth noting that"
   Why: pure filler — the sentence is stronger without it

3. Broke rule-of-three list "X, Y, and Z"
   → "X and Y. Z is different — [expanded thought]"
   Why: all three items had identical rhythm; broke the pattern

4. Split a 30-word sentence where the point turned: "…and it failed. That's the problem."
   Why: the meaning lands on a short beat here — the brevity is earned, not inserted for variance

5. Added sentence starting with "But"
   Why: human writers do this; AI avoids it as a statistical default

6. Added specific example: [detail added]
   Why: the original made an abstract claim with no grounding detail

7. Added aside: "(I've watched this fail three times in a row)"
   Why: breaks fourth wall slightly; signals genuine perspective
```

### Section 4: Clean Output

The full rewritten text, ready to copy and paste — no annotations, no formatting artifacts.

```
[Full rewritten text here]
```

---

## Instructions for Claude

### Phase 0: Calibrate to genre (do this first)

Before touching anything, decide what kind of text this is — the genre sets how far Phase 2 goes:

- **Neutral / informational** (documentation, reference, summaries, status reports, official notices, most business comms): run **Phase 1 only**. Strip the tells and stop. Do **not** inject opinion, asides, or personality — a clean doc is the goal, not a voice. Injected "humanity" here reads as unprofessional.
- **Personal / persuasive / social** (opinion pieces, blog posts, founder notes, LinkedIn, marketing, personal emails): run **Phase 1 + Phase 2**. Here earned voice is the point.
- **Unsure or mixed:** default to the lighter touch (Phase 1, plus only the Phase 2 moves the content genuinely earns), and say which genre you assumed.

The single rule underneath: **calibrate voice to the job of the text.** Never dismantle useful structure (a scannable doc, a real list) just to look less templated.

### Phase 1: Audit

Read the full text before making any changes. Identify and count every instance of these patterns:

**Patterns to remove or rewrite:**

| Pattern | Action |
|---|---|
| Em dash used as parenthetical substitute (`word — word` where a comma or parenthesis would work) | Replace with parentheses or rewrite the clause |
| "Let's dive in" | Delete or replace with a direct first sentence |
| "In conclusion" | Delete or rewrite as a genuine closing thought |
| "It's worth noting that" | Delete — the sentence stands without it |
| "At its core" | Delete or rewrite |
| "Game-changer" | Replace with what the thing actually changes |
| "Delve" | Replace with look, dig, explore — or rewrite the sentence |
| "Navigate" used metaphorically for non-navigation tasks | Replace with a direct verb |
| Rule-of-three lists where all three items have identical grammatical structure and similar word count | Break the third item out as its own sentence or expand it |
| Sentences where every sentence in a paragraph falls in the 14–22 word range | Deliberately add one very short sentence and one longer one |
| "Needless to say" | Delete |
| "It's important to note that" | Delete |
| Passive constructions where the active form is more direct | Flip to active |

Do not remove every em dash — only the ones used as parenthetical substitutes. Do not remove all hedging — only empty hedging that adds no information.

### Phase 2: Inject (personal / persuasive genres only — see Phase 0)

Only for text where earned voice is the point. These are **options the content earns, not a checklist to complete** — apply the ones the material genuinely supports and **skip any that would be forced**. A move inserted to hit a quota is itself an AI tell. Never fake humanity: no invented typos, no forced slang, no staged messiness, and no chopping or padding sentences just to manufacture rhythm variance.

1. **A genuine opinion or take** *(if the author clearly holds one).* State the belief the text already implies, without hedging. Don't manufacture an opinion the author never expressed.

2. **A specific detail or example** *(only if a real one exists).* Ground the most abstract claim in something concrete the author actually knows. **Never invent a number, quote, date, name, or fact to sound specific** — that's fake specificity, a worse tell than vagueness. If no real detail is available, ask the author for one or keep the honest abstraction; do not fabricate.

3. **An aside that steps out of the formal argument** *(where it fits the register).* The signal most synthetic text lacks — but only in genres that welcome it, and only when it connects to a real point. Forced or cutesy asides are worse than none.

4. **Let a sentence be short where the point lands on a short beat.** Follow the meaning, not a word count. Never shorten a sentence just to add "variance."

5. **Start a sentence with "And" or "But" only where the rhythm truly earns it.** If no place does, don't add one — a random "But" is a tell, not a fix.

### Phase 3: Report

Present the output in the four-section structure defined above. The change log must list every individual change — not categories of change, but specific instances. If you changed three em dashes, list all three separately.

### Handling edge cases

- **If the text is already mostly clean:** Report what you found (or didn't find), make the few remaining changes, and note explicitly that the original was close. Don't invent problems.
- **If the text is very short (under 100 words):** Skip the comparison table. Show original, then rewritten, then change log.
- **If the text is over 1,500 words:** Process the full text but collapse the comparison table to changed sections only.

---

## Quality Checks

- [ ] Genre was assessed first (Phase 0); neutral/informational text got Phase 1 only, with no injected opinion, aside, or personality
- [ ] Audit was completed before rewriting (patterns counted, not just detected)
- [ ] Every removed pattern is listed in the change log with a specific reason
- [ ] Em dashes were assessed individually — only parenthetical-substitute uses were removed
- [ ] Rule-of-three lists: the rhythm was actually checked, not just the fact that there were three items
- [ ] No fact, number, quote, date, or name was invented to add specificity
- [ ] Any Phase 2 moves applied were earned by the content — none inserted to hit a quota (short sentence / "And"/"But" opener / aside added only where the material genuinely called for it, or not at all)
- [ ] The specific detail or example added connects to an actual claim in the text, not floated in generically
- [ ] The aside (if any) breaks the fourth wall slightly without being forced or cutesy
- [ ] The change log lists specific instances, not categories
- [ ] The clean output section has no annotations or formatting artifacts — ready to paste
- [ ] If the original was already clean, that was stated explicitly rather than changes invented

## Anti-Patterns

- [ ] Do not fake humanity: no invented typos, no forced slang, no staged messiness, and no programmatic sentence-length variation added to hit a target — faked signals are themselves AI tells
- [ ] Do not inject voice into neutral genres — documentation, summaries, reports, and official comms get the tells stripped and nothing added; personality there reads as unprofessional
- [ ] Do not invent specificity — never add a number, quote, date, name, or fact that isn't real to make prose sound concrete; ask for the detail or keep the honest abstraction
- [ ] Do not dismantle useful structure (a scannable layout, a genuine list) just to look less templated
- [ ] Do not remove all em dashes — only the ones functioning as parenthetical substitutes should be removed; genuine dramatic pauses are valid
- [ ] Do not invent problems to justify changes when the original is already clean — report what was found honestly, even if the answer is "this text is mostly fine"
- [ ] Do not add the aside or opinion generically — the injected human signals must connect to an actual claim or argument in the text, not float in as decoration
- [ ] Do not list changes by category in the change log — every individual change must be listed separately with the specific reason for that specific instance
- [ ] Do not apply humanisation changes that alter the factual claims or intended meaning of the original text — the skill rewrites style, not substance

---

## Example Trigger Phrases

- "Humanize this text: [paste]"
- "Use the notes-humanizer skill on this draft"
- "This reads like ChatGPT wrote it — fix it: [paste]"
- "Strip the AI out of this and make it sound like a real person wrote it"
- "Run the humanizer on this LinkedIn post: [paste]"
- "This has too many em dashes and rule-of-three lists — clean it up: [paste]"
- "Make this email sound less robotic: [paste]"
