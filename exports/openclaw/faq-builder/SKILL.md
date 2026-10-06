---
name: faq-builder
description: "Build an FAQ from the questions people actually ask — mined from tickets, chats, and repeated explanations, answered once and well, organized by the asker's words, and maintained by a capture loop instead of annual archaeology. Use when asked create an FAQ for this product/process/team, I answer the same questions weekly, turn our support threads into docs, or why does nobody find our answers. Produces the mined question list with frequencies, the answers in ask-language, the structure, and the capture loop."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/faq-builder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# FAQ Builder Skill

FAQs fail when they're written from the inside: questions the team *wishes* people asked ("What makes our approach unique?"), phrased in the team's vocabulary, frozen at launch. The working FAQ is mined — from tickets, chat searches, and the questions someone answers every week — phrased in the *asker's* words (findability is vocabulary-matching; nobody searches for "provisioning cadence" when their question is "how long until it works"), answered once and well, and kept alive by a capture loop: every newly-repeated question flows in, because the FAQ is a cache of answers and caches need writes.

## What This Skill Produces

- **The mined question list** — real questions with rough frequencies and sources, deduplicated by intent
- **The answers** — direct-first (the answer, then the caveat), in ask-language, each with an owner
- **The structure** — ordered by frequency within asker-journey groups, question-phrased headings
- **The capture loop** — the answered-it-twice rule that keeps the FAQ current

## Required Inputs

Ask for these if not provided:
- **The question sources** — tickets, chat logs, inbox searches, the team's "I keep explaining…" list; mining needs raw material, and the wish-list questions are explicitly not it
- **The askers** — customers, new hires, other teams? Their vocabulary (from the actual questions) becomes the headings' language
- **The answer authority** — who signs off that each answer is *correct* (an FAQ with confident wrong answers is worse than none); per-topic owners named
- **Where it will live** — the wiki, the docs site, the bot's knowledge base — findability mechanics differ, and answers should be written to be found there

## Framework: The Builder Rules

1. **Mine, don't imagine:** the question list comes from evidence — search the ticket system for repeated intents, grep the chat, ask each teammate for their three most-repeated explanations. Frequency ranks; a question asked weekly outranks a question asked once eloquently. Wish-questions ("Why are we the best?") are marketing, filed elsewhere.
2. **Dedupe by intent, keep the phrasings:** "how do I reset my password" / "locked out" / "can't log in" are one answer with three findable phrasings — the heading takes the most common, the variants live in the body (or as aliases) so search hits all three.
3. **Answer-first, then nuance:** the first sentence answers ("Yes — up to 5 seats on the standard plan."); caveats follow; links go last. Answers that open with background make the reader hunt, and hunting readers file tickets. Long answers get a link to the full doc rather than inlining it — the FAQ is the cache, not the library.
4. **Structure by the asker's journey, order by frequency:** groups the asker recognizes (Getting started / Billing / When things break), most-asked first within each — not the org chart, not alphabetical. Headings are the questions verbatim, because headings are what search and scanning both hit.
5. **The capture loop is the maintenance:** the rule — *answered it twice outside the FAQ → it goes in this week* — plus a quarterly prune of zero-traffic entries and a correctness pass by the owners. An FAQ without the loop decays into the confident-wrong-answers zone within two quarters, which is worse than its absence.

## Output Format

# FAQ: [audience/domain] — [N] questions, mined from [sources]

## The Mined List
| Question (asker's words) | Frequency | Source | Variants |
|---|---|---|---|

## The FAQ
### [Group, in journey order]
**[Question verbatim]** — [Answer-first sentence. Caveat. Link.] *(owner: [name])*

## The Capture Loop
[The answered-twice rule · where new candidates get logged · quarterly prune + correctness pass, calendared]

## Quality Checks

- [ ] Every question traces to evidence with a frequency, not a wish
- [ ] Headings use the asker's vocabulary; variants are findable
- [ ] Every answer's first sentence answers
- [ ] Every answer has a named correctness owner
- [ ] The capture loop and prune are scheduled, not aspirational

## Anti-Patterns

- [ ] Do not write questions nobody asked — the FAQ is a mirror of demand, not a brochure
- [ ] Do not phrase in internal jargon — findability is speaking the asker's language
- [ ] Do not open answers with background — answer, then explain
- [ ] Do not inline the library — cache the answer, link the depth
- [ ] Do not launch without the loop — a static FAQ is a snapshot aging into misinformation

## Example Trigger Phrases

- "Create an FAQ for this product/process/team."
- "I answer the same questions weekly."
- "Turn our support threads into docs."
- "Why does nobody find our answers?"
