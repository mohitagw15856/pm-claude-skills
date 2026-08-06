---
aliases: ["Feynman Explainer"]
tags: [pm-skills, skill]
skill: feynman-explainer
description: "Learn something deeply by trying to explain it simply — the Feynman technique — surfacing exactly the gaps where your understanding is fake. Use when asked help me really understand X, explain this back to check my understanding, use the Feynman technique on, or do I actually get this. Produces a prompt to explain the concept in plain language yourself, a check that flags where your explanation went vague, hand-wavy, or jargon-hid a gap, the specific things you don't actually understand yet, and how to close each — because if you can't explain it simply, you don't really know it."
---

# Feynman Explainer

You don't understand something until you can explain it simply — jargon and complexity are where fake understanding hides. This runs the Feynman technique: you explain the concept in plain words (as if to a curious 12-year-old), and it catches exactly where you got vague, leaned on jargon, or skipped a step — because those are the precise spots your understanding is actually a gap. Then it helps you close them.

## What This Skill Produces

- **The explain-it prompt** — a nudge to explain the concept simply, in your own words, no jargon allowed
- **The gap detector** — where your explanation went vague, circular, hand-wavy, or hid behind a term you can't unpack
- **The real gaps named** — the specific things you don't actually understand (vs. think you do)
- **The fill-the-gap guidance** — what to relearn or clarify for each gap, then re-explain
- **A simplicity test** — whether you can now explain it to a smart 12-year-old (the bar for real understanding)

## Required Inputs

Ask for these if not provided:
- **The concept** — what you're trying to understand
- **Your explanation** — your attempt to explain it simply (this is the raw material)
- **Why you need it** — an exam, a decision, teaching someone, genuine curiosity
- **Your current confidence** — sure you get it, or suspect you don't

## Framework: Explain Simply, Find The Fake Understanding

1. **Explain it plainly.** Have the person explain the concept in simple language, as if to a curious child — no jargon to hide behind.
2. **Hunt the vagueness.** Where the explanation gets fuzzy, circular, or reaches for a term without unpacking it — that's a gap, every time.
3. **Name the real gaps.** Convert the fuzzy spots into specific "you don't actually understand X yet" items.
4. **Fill and re-explain.** For each gap, point to what to relearn, then re-explain that piece simply — the loop is explain → find gap → fill → re-explain.
5. **Test the bar.** Can they now explain the whole thing to a smart 12-year-old? If yes, they know it. If a part still needs jargon, that part isn't understood.

## Output Format

### Concept: [what you're learning]

**Your explanation:** [what you said].
**Where it got fuzzy (= gaps):** [vague/circular/jargon-hidden spots].
**What you don't actually understand yet:** [the specific gaps].
**Close each:** [what to relearn/clarify] → then re-explain it simply.
**The bar:** can you now explain it to a curious 12-year-old? [yes → you've got it / not the part about X].

## Quality Checks
- [ ] Prompts a genuine plain-language explanation
- [ ] Catches vagueness, circularity, and jargon-hiding
- [ ] Converts fuzzy spots into specific named gaps
- [ ] Gives fill-the-gap guidance and a re-explain loop
- [ ] Uses the "explain to a 12-year-old" bar

## Anti-Patterns
- **Accepting a jargon-filled explanation** as understanding.
- **Explaining it *for* them** instead of catching their gaps.
- **Vague "you could go deeper"** instead of named gaps.
- **Skipping the re-explain loop.**

## Example Trigger Phrases
- "Help me really understand how interest rates work — I'll explain, you find my gaps."
- "Use the Feynman technique on this concept with me."
- "Let me explain this back — do I actually get it?"
- "I think I understand recursion but I'm not sure. Test me."
- "Check my understanding of this by making me explain it simply."

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
