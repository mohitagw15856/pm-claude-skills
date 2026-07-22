# House Prose Rules

The writing standard for output produced by this library — the prose that comes *out* of a skill, and the prose in the skills, docs, and READMEs themselves. The goal is plain: text that reads like a competent professional wrote it on purpose, not like a model filled a template. Sharper, more concrete, less generic — without cheap tricks.

This is the **full** version. Two shorter forms carry the same rules for different budgets:
- **Compact** — the [`plain-honest-prose`](../output-styles/plain-honest-prose.md) output-style, a persona that applies these rules to any skill's output (switch with `/output-style` in Claude Code).
- **Mini** — the ~15-line block in the repo's root [`AGENTS.md`](../AGENTS.md), for agents that read it automatically.

> Related skills, when you want a tool rather than a rule: [`notes-humanizer`](../skills/notes-humanizer/SKILL.md) (strip AI tells from one draft), [`house-style-enforcer`](../skills/house-style-enforcer/SKILL.md) (enforce a *team's* exemplar style), [`plain-language-rewrite`](../skills/plain-language-rewrite/SKILL.md) (de-jargon), [`ai-content-audit`](../skills/ai-content-audit/SKILL.md) (audit a whole library for slop).

---

## 1. Start from the job of the text

Before the first sentence, know three things: the **medium**, the **reader**, and the **decision or action** the text exists to produce. A board update, a runbook, a cold email, and a blog post are four different jobs with four different shapes. Most generic writing is generic because it was written for no one in particular.

## 2. Calibrate voice to genre

Voice is not a constant to maximise — it's a dial you set by genre.
- **Neutral / informational** (docs, references, summaries, reports, official comms): no personality. Clear, scannable, correct. Injected "voice" here reads as unprofessional.
- **Personal / persuasive** (opinion, blog, founder notes, marketing, personal email): a real person can show through — a stated view, a concrete anecdote, a plain aside.
- When unsure, go neutral. Under-flavoured beats over-flavoured.

## 3. Concrete anchors over polished generality

If a paragraph contains no checkable detail — a number, a name, an example, a mechanism — it is probably filler, however smooth it reads. Revise it or cut it. "Drives significant efficiency gains" says nothing; "cuts the weekly close from three days to one" says something. Prefer the sentence a reader could argue with.

## 4. Never fake specificity

The one line that outranks all others: **do not invent detail to sound concrete.** No fabricated numbers, quotes, dates, names, study citations, or causal claims. A made-up statistic is worse than an honest "we haven't measured this yet." If a claim needs support it doesn't have, hedge it honestly or ask for the source — never manufacture one. Concreteness is only a virtue when it's true.

## 5. Ordinary words

Prefer the plain word to the inflated one: *use* over *utilise*, *help* over *facilitate*, *about* over *in the region of*. Kill the thesaurus reach. Repetition of the right ordinary word beats variation for its own sake — you don't need three synonyms for "customer." Drop the words that only signal effort: *leverage, robust, seamless, holistic, myriad, delve, navigate* (used for non-navigation), *game-changer, best-in-class*.

## 6. Cut the staged parts

Model prose stages a performance. Remove the theatre:
- **Ceremonial openings** — "In today's fast-paced world…", "Let's dive in", "It's worth noting that". Start with the actual first point.
- **Keynote cadence** — the rising rule-of-three, the portentous one-line paragraph, the rhetorical question you immediately answer.
- **Service-desk tone** — "Great question!", "I'd be happy to help you with that." Just do the thing.
- **Filler closings** — "In conclusion", "At the end of the day", the summary that restates what was just said. End on the last real point.

## 7. Break the templated shape

Even with clean words, prose can still *look* generated: every paragraph the same length, every section a bulleted list, every list item the same grammar and word count, signposts ("Firstly… Moreover… Furthermore…") standing in for actual transitions. Vary the shape where the meaning varies — but only where it varies (see §8).

## 8. Don't fake humanity

The failure mode of "make it sound human": inventing the signals mechanically. **No manufactured typos, no forced slang, no random "But" to open a sentence, no chopping a sentence to a stub just to vary length, no staged messiness.** A signal inserted to hit a quota is itself a tell. Let a sentence be short when the point lands short; start with "And" only where the rhythm truly earns it; add an aside only when there's a real one to add. Earned, or absent.

## 9. Keep the structure that helps

Scannability is not slop. A doc that needs headings, a procedure that needs numbered steps, a comparison that needs a table — keep them. Don't dissolve genuine structure into prose just to look less templated. Remove decoration, not architecture.

## 10. Revise by reading and cutting

The edit that does most of the work: read it back and delete. Collapse restatements into one line. Drop the "announcement" sentences that say what the next sentence will say ("Now let's look at the three main benefits."). Replace the single most generic clause with something specific. Cut every word that isn't carrying weight. Prose gets better mostly by getting shorter.

---

## The two-minute checklist

- [ ] I could name the reader and the action this text is for.
- [ ] Voice matches the genre (neutral stays neutral).
- [ ] Every paragraph has at least one checkable, **true** detail.
- [ ] Nothing was invented to sound specific.
- [ ] Plain words; no thesaurus reach; no effort-signalling adjectives.
- [ ] No ceremonial opener, keynote cadence, service-desk tone, or filler close.
- [ ] Shape varies with meaning, not on a schedule; no faked "human" signals.
- [ ] Useful structure kept; decoration cut.
- [ ] Read back and cut — it's shorter than the first draft.

*This document is original to this repository (MIT). The approach is informed by widely-shared writing principles; the wording here is our own.*
