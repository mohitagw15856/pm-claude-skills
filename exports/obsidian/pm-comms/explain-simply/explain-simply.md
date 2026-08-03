---
aliases: ["Explain Simply"]
tags: [pm-skills, skill]
skill: explain-simply
description: "Explain anything in plain language — a contract clause, a medical term, a tax rule, a tech acronym, a news story — layered from a one-liner to as much depth as you want. Use when asked to explain like I'm 5, explain this simply, break this down in plain English, or what does this even mean. Produces the one-sentence version, a plain-language explanation with a concrete analogy, the 'why it matters to you,' and an honest note on anything genuinely uncertain or oversimplified."
---

# Explain Simply

Jargon is a wall, and most explanations either stay behind it or dumb things down so far they're wrong. This does the honest version: the gist in one sentence, then a plain-language explanation anchored to something you already understand, going only as deep as you ask — and flagging where the simple version leaves out something that actually matters.

## What This Skill Produces

- **The one-liner** — if you only read one sentence, this is it
- **The plain explanation** — no jargon, with a concrete everyday analogy
- **Why it matters to you** — the "so what," in your situation if you gave one
- **The honest caveat** — what the simple version glosses over, and where to be careful

## Required Inputs

Ask for these if not provided:
- **The thing** — paste the term/clause/text, or name the topic
- **Your level** — total beginner, or "I know the basics" (sets the depth and the analogies)
- **Why you're asking** — signing something? studying? just curious? — steers "why it matters"

## Framework: Simple, Not Wrong

1. **Lead with the gist.** One true sentence before any detail.
2. **Anchor to the known.** A good analogy borrows understanding you already have — but flag where the analogy breaks.
3. **Layer, don't dump.** Start shallow; add depth on request. Don't front-load everything.
4. **Plain words.** If a term is unavoidable, define it the first time in-line.
5. **Flag the oversimplification.** Note where "roughly" hides a detail that could matter (money, legal, medical).

## Output Format

### [Thing] — in plain English

**In one sentence:** …

**The plain version:** … *(with an analogy: "it's like…")*

**Why it matters to you:** …

**Worth knowing (where the simple version cuts a corner):** …

*Want it deeper? Ask and I'll go a layer down.*

## Quality Checks
- [ ] The one-sentence gist is accurate, not just short
- [ ] The analogy genuinely aids understanding and its limits are noted
- [ ] No unexplained jargon in the plain version
- [ ] Depth matches the stated level (not a firehose for a beginner)
- [ ] Any consequential oversimplification (legal/medical/financial) is flagged, not smoothed over

## Anti-Patterns
- **Simple-but-wrong** — shaving off a detail that changes the meaning.
- **The firehose** — dumping every nuance on someone who asked for the gist.
- **A cute analogy that misleads** — flag where it breaks or drop it.
- **Fake confidence on genuinely uncertain things** — say "it depends, and here's on what."

## Example Trigger Phrases
- "Explain this contract clause like I'm 5: [paste]"
- "What does 'APR' actually mean in plain English?"
- "Break down what this medical term means for me."
- "ELI5 how a Roth IRA works."
- "What is this news story actually about?"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
