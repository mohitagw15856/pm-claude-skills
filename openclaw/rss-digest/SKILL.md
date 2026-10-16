---
name: rss-digest
description: "Fetch and digest any RSS or Atom feed with zero API keys — curl plus disciplined parsing into a ranked, deduplicated briefing instead of a link dump. Use when asked summarize this feed, what's new on this blog, digest these RSS feeds, or build me a morning briefing from these sources. Produces the digest with dates and one-line what-it-is summaries, cross-feed dedup, and the rerunnable commands per feed."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/rss-digest.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# RSS Digest Skill

RSS never died — every blog, newsroom, podcast, release page, and status page still speaks it, keylessly, and it remains the cleanest way for an agent to answer "what's new from the sources I care about." This skill fetches feeds with curl, parses the two dialects (RSS 2.0 and Atom) without ceremony, and produces what the user actually wanted: a dated, deduplicated briefing with one line of substance per item — not thirty titles.

## What This Skill Produces

- **The digest** — items with date, source, title, and a one-line what-it-actually-says from the item's own description
- **Cross-feed dedup** — the same story via three feeds appears once, sources noted
- **The since-filter** — "what's new" means since the user last asked or a stated window, applied
- **The commands** — one curl per feed, rerunnable

## Required Inputs

Ask for these if not provided:
- **The feed URLs** — or the site ("find the feed" is part of the job: try `/feed`, `/rss`, `/atom.xml`, `/index.xml`, and the `<link rel="alternate" type="application/rss+xml">` tag in the page head)
- **The window** — today, this week, since a date — "what's new" needs an epoch
- **The lens** — everything, or filtered to a topic; a briefing has a reader, and the reader has interests

## Framework: Fetch, Parse, Digest

1. **The fetch:** `curl -sL "https://hnrss.org/frontpage"` — follow redirects (`-L`), and identify politely if a feed rejects default agents (`-A "rss-digest/1.0"`). Feeds are XML; both dialects carry the same essentials: RSS `<item><title><link><pubDate><description>` · Atom `<entry><title><link href><updated><summary/content>`.
2. **Parse without heroics:** items are extracted with straightforward pattern-matching on those tags; HTML inside descriptions gets stripped to text; entities decoded. Malformed feeds (common) get a best-effort parse and an honest note, not a crash or silent gaps.
3. **The one-line rule:** each item's line comes from its *description/summary content* — what the piece actually says — not a restatement of its title. When the description is empty or useless, say what can be said from the title and mark it thin; fetch the full article only if the user asks for a deep-dive on an item.
4. **Dedup and order:** same-story detection across feeds by normalized title/URL similarity; ordering is newest-first within the window, or grouped by source when the user's mental model is per-source.
5. **Honest dating:** `pubDate`/`updated` converted to the user's zone; items without dates are labeled undated, not invisibly slotted; and the digest states its own window ("covering the last 48h as of [time]").

## Output Format

# Digest: [N sources] — [window], as of [time]

**[If a lens was set: the matching items first.]**

**[Source A]**
- [date] **[title]** — [one line of what it says] ([link])
[…]

[Duplicates noted: "also covered by X, Y" · thin-description items marked]

Feeds: `[curl per feed]` · window: [the since-filter applied]

## Quality Checks

- [ ] Every item line summarizes the description, not the title
- [ ] The window is stated and applied — no undated "new"
- [ ] Cross-feed duplicates are merged with sources noted
- [ ] Malformed feeds produce a note, not silent item loss
- [ ] Feed discovery was attempted when given a bare site URL

## Anti-Patterns

- [ ] Do not output a link dump — the one-line-of-substance rule is the product
- [ ] Do not restate titles as summaries — the description field exists; use it or mark the item thin
- [ ] Do not fetch every full article by default — the feed's own content first, deep-dives on request
- [ ] Do not present an old cached item as new — the window does the filtering, visibly
- [ ] Do not invent a feed's contents when the fetch fails — report the failure and move to the sources that answered

## Example Trigger Phrases

- "Summarize this feed."
- "What's new on this blog?"
- "Digest these RSS feeds."
- "Build me a morning briefing from these sources."
