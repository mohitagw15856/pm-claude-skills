---
trigger: model_decision
description: "Strips AI writing patterns from text and rewrites it to sound genuinely human by removing statistical defaults and injecting the specific signals that human writers produce. Use when a draft reads as AI-generated, over-polished, or rhythmically uniform — including blog posts, emails, LinkedIn posts, or any prose that needs to sound like a real person wrote it. Produces a pattern audit, side-by-side comparison, itemised change log, and clean rewritten output ready to paste."
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

4. Added short sentence: "That's the problem."
   Why: needed a sub-8-word sentence to vary rhythm

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

### Phase 2: Inject

After stripping patterns, add the following signals. Each one should emerge from the actual content — don't add generic filler:

1. **One genuine opinion or take.** The author appears to actually believe something specific. State it without hedging. ("This approach works, and I think most people underestimate how rarely the alternative does.")

2. **One specific detail, example, or number.** Ground the most abstract claim in the text with something concrete. If the text says "this happens frequently," add a real or illustrative number. If it says "many companies do this," name the type of company.

3. **One aside or parenthetical thought that breaks the fourth wall slightly.** This is the signal most synthetic text lacks — the writer momentarily steps out of the formal argument to say something human. ("(I've seen this specific mistake made by people who absolutely should have known better.)")

4. **At least one sentence under 8 words.** Make it land on a point, not a transition.

5. **One sentence that starts with "And" or "But."** Place it where the rhythm earns it, not randomly.

### Phase 3: Report

Present the output in the four-section structure defined above. The change log must list every individual change — not categories of change, but specific instances. If you changed three em dashes, list all three separately.

### Handling edge cases

- **If the text is already mostly clean:** Report what you found (or didn't find), make the few remaining changes, and note explicitly that the original was close. Don't invent problems.
- **If the text is very short (under 100 words):** Skip the comparison table. Show original, then rewritten, then change log.
- **If the text is over 1,500 words:** Process the full text but collapse the comparison table to changed sections only.

---

## Quality Checks

- [ ] Audit was completed before rewriting (patterns counted, not just detected)
- [ ] Every removed pattern is listed in the change log with a specific reason
- [ ] Em dashes were assessed individually — only parenthetical-substitute uses were removed
- [ ] Rule-of-three lists: the rhythm was actually checked, not just the fact that there were three items
- [ ] At least one sentence under 8 words was added (or was already present)
- [ ] At least one sentence starts with "And" or "But" in the final text
- [ ] The specific detail or example added connects to an actual claim in the text, not floated in generically
- [ ] The aside breaks the fourth wall slightly without being forced or cutesy
- [ ] The change log lists specific instances, not categories
- [ ] The clean output section has no annotations or formatting artifacts — ready to paste
- [ ] If the original was already clean, that was stated explicitly rather than changes invented

## Anti-Patterns

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
