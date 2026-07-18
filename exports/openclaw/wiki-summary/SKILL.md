---
name: wiki-summary
description: "Fetch Wikipedia's current summary of any topic with zero API keys — the REST summary endpoint via curl, for answers that need today's article rather than training-data memory. Use when asked what does Wikipedia say about X, get me the current summary of a topic, check a fact against Wikipedia, or has this article changed. Produces the live extract with the article link, disambiguation handling, and a clean separation between what Wikipedia says and what the model adds."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/wiki-summary.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Wiki Summary Skill

The model already knows what Wikipedia said at training time; this skill fetches what it says *now* — which matters for anything living: people's roles, company facts, ongoing events, populations, "current CEO" questions. Wikipedia's REST API serves a clean summary per article over keyless HTTPS. The skill's discipline is attribution: the fetched extract is Wikipedia's voice, dated today; anything the model adds around it gets labeled as such.

## What This Skill Produces

- **The live extract** — Wikipedia's current summary paragraph(s) for the topic, quoted as the source
- **The link and metadata** — canonical URL, and the description line ("American computer scientist")
- **Disambiguation handling** — when the title is ambiguous, the options, not a guess
- **The command** — exact curl, rerunnable

## Required Inputs

Ask for these if not provided:
- **The topic** — resolved to an article title (spaces → underscores); ambiguous names get the disambiguation treatment, not a silent pick
- **Language edition** — en default; the endpoint pattern works on any edition (`de.wikipedia.org`, `ja.wikipedia.org`) and the user's question may belong in one
- **Why they're asking** — a fact-check wants the specific claim compared; a primer wants the extract; "has this changed" wants fetched-vs-recalled differences called out

## Framework: The Endpoint and the Attribution Rules

1. **The call:** `curl -s "https://en.wikipedia.org/api/rest_v1/page/summary/Alan_Turing"` → JSON: `title`, `description`, `extract` (the summary text), `content_urls.desktop.page` (canonical link), `type`. URL-encode the title; spaces become underscores.
2. **Search first when the title is uncertain:** `curl -s "https://en.wikipedia.org/w/rest.php/v1/search/title?q=turing&limit=5"` → candidate titles. A `type: "disambiguation"` response means list the options and ask — a confident summary of the wrong John Smith is worse than a question.
3. **Attribution is the product:** the extract is quoted or clearly framed as "Wikipedia currently says…" with the link. Model elaboration goes *outside* that frame, labeled. A fact-check answer states: the claim, what the live article says, and whether they match.
4. **Freshness honesty both directions:** fetched beats recalled for living facts — but Wikipedia itself lags and errs; for high-stakes facts the answer notes it's one (good) source, and breaking-news topics may be mid-edit.
5. **The changed-since-training move:** when the fetched extract contradicts what the model would have said, *say so explicitly* — "training-era memory said X; the live article now says Y" — that delta is often exactly what the user was probing for.

## Output Format

# [Article title] — [description line]

> [The live extract, as Wikipedia's voice]

[Fact-check mode: the claim vs. the extract, verdict stated]
[Model additions, if any, under a labeled line]

Source: [canonical article URL] · fetched [date] · rerun: `[exact curl]`
[Disambiguation case: the candidate list and the ask]

## Quality Checks

- [ ] The extract is attributed to Wikipedia and dated — never blended into model voice
- [ ] Ambiguous titles produced options, not a guess
- [ ] Fact-checks compare the specific claim to the specific sentence
- [ ] Training-memory vs. live-article deltas are called out when found
- [ ] The canonical URL appears

## Anti-Patterns

- [ ] Do not paraphrase the live extract into model voice — the fetch's value is the attribution
- [ ] Do not silently pick among namesakes — disambiguate out loud
- [ ] Do not treat Wikipedia as final authority for high-stakes facts — one good source, framed as such
- [ ] Do not answer "what does Wikipedia say" from memory — that question is a fetch instruction by definition
- [ ] Do not skip the URL — the link is the receipt
