---
trigger: model_decision
description: "Turn a long article, email thread, document, or transcript into a tight summary you can act on — the gist, the key points, and what it means for you. Use when asked for a TL;DR, to summarize this, give me the gist, or the key takeaways. Produces a one-line TL;DR, the key points as scannable bullets, any decisions/action items with owners, and open questions — faithful to the source, with nothing invented and important caveats kept."
---

# Summarize Anything

A summary is only useful if you can trust it — which means it can't quietly drop the caveat that changes everything or invent a takeaway that wasn't there. This compresses hard while staying faithful: the one-line gist for the busy, the key points for the skimmer, and — for threads and meetings — the decisions and who-owes-what, so a summary becomes something you can act on, not just a shorter read.

## What This Skill Produces

- **TL;DR** — one line, the single most important thing
- **Key points** — the 3–7 that carry the meaning, as scannable bullets
- **Decisions & action items** — for threads/meetings: what was decided, who owns what, by when
- **Open questions / caveats** — what's unresolved or conditional (kept, not smoothed away)

## Required Inputs

Ask for these if not provided:
- **The source** — paste the text (article, thread, doc, transcript)
- **What you need from it** — just the gist, or the decisions, or "should I read the whole thing?"
- **Length** — one-liner, a paragraph, or the fuller structured version

## Framework: Compress Without Distorting

1. **Faithful first.** Every point traces to the source; nothing is added, sharpened, or invented.
2. **Lead with the answer.** The TL;DR is the conclusion, not "this document discusses…".
3. **Keep the load-bearing caveat.** The "but only if…" is often the whole point — never drop it for brevity.
4. **Separate fact from opinion.** Note when a "point" is the author's claim vs. established fact.
5. **Make threads actionable.** Who decided what, who's on the hook, what's still open.

## Output Format

### TL;DR
> One sentence.

### Key points
- …

### Decisions & actions *(threads/meetings)*
| Decision / action | Owner | By |
|---|---|---|

### Open / caveats
- …

## Quality Checks
- [ ] Every point is supported by the source — nothing invented or overstated
- [ ] The TL;DR is the actual conclusion, not a topic label
- [ ] Load-bearing caveats/conditions are preserved
- [ ] For threads/meetings, decisions and owners are pulled out
- [ ] The author's claims are distinguished from established facts where it matters

## Anti-Patterns
- **Inventing a takeaway** that sounds good but isn't in the source.
- **Dropping the caveat** that flips the meaning, in the name of brevity.
- **"This article discusses…"** throat-clearing instead of the actual point.
- **Presenting opinion as fact** by stripping the hedges the author used.

## Example Trigger Phrases
- "TL;DR this article: [paste]"
- "Summarize this email thread and tell me what I need to do."
- "Give me the key takeaways from this transcript."
- "What's the gist of this doc — is it worth reading fully?"
- "Pull the decisions and action items out of these meeting notes."
