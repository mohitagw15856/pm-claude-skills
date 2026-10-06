---
name: newsletter-digest-brief
description: "Turn a pile of newsletters and subscriptions into one skimmable brief — the items that matter to YOUR interests extracted with sources, the noise dropped with a count, on a cadence that replaces daily trickle-reading. Use when asked digest my newsletters, summarize what my subscriptions said this week, what did I miss that I actually care about, or make my reading pile useful. Produces the interest-filtered brief with per-item sources, the dropped-with-reasons ledger, and the cadence that makes trickle-reading obsolete."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/newsletter-digest-brief.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Newsletter Digest Brief Skill

Newsletters are individually reasonable and collectively unreadable — twelve arrivals a week, each 70% padding, each interrupting on its own schedule. The digest move: batch them (the [inbox-unsubscribe-purge](../inbox-unsubscribe-purge/SKILL.md) filter routes them to a label), then process the pile into *one brief* filtered by the reader's actual interests — items extracted with their source and why-it-matters, everything else dropped with a visible count so the reader trusts the filter instead of re-reading behind it.

## What This Skill Produces

- **The brief** — the items that matter to this reader's stated interests: one line of what + one of so-what + the source link
- **The dropped ledger** — "skipped 31 items: 12 promos, 9 repeats of the X story, 10 off-interest" — the trust mechanism
- **The repeat-collapse** — one story covered by four newsletters appears once, best-source-first
- **The cadence setting** — weekly for most; daily only for genuinely fast-moving beats

## Required Inputs

Ask for these if not provided:
- **The pile** — the newsletters' content (pasted/forwarded), or the label they collect under
- **The interest profile** — the beats that actually matter to this reader ("AI tooling, pricing strategy, my competitors, nothing about funding rounds") — the filter IS the product, and it needs edges
- **The action bias** — reading-for-awareness vs. hunting-for-actions; the brief leads with actionable items when the latter

## Framework: The Digest Rules

1. **Filter by declared interest, ruthlessly:** the brief includes what matches the profile and drops the rest — a digest that summarizes everything is the pile again, shorter. Edge cases get one "borderline" line at most, not inclusion.
2. **What + so-what + source, one item = two lines:** "Vercel shipped edge-side A/B testing (what). Relevant: replaces the tool you're paying $400/mo for (so-what). [source]" — the so-what is written for *this reader*, which is what separates a digest from a table of contents.
3. **Collapse the echo:** the same announcement in four newsletters is one item, attributed to the best treatment ("deepest take: X's issue"). The echo-count is itself signal ("covered everywhere = the week's consensus story") and gets a line when heavy.
4. **The dropped ledger builds the trust:** the counted skip-list ("12 promos, 9 echoes, 10 off-interest") is what lets the reader *not* re-read the pile — a filter with invisible drops never earns retirement of the source reading.
5. **Cadence follows the beat's clock:** weekly suits almost everything; daily digest is for beats where a day's lag costs (markets, security advisories). The cadence is chosen once and defended — an "urgent" exception lane exists only for the reader's pre-named topics.

## Output Format

# Digest: [period] — [N] sources, [M] items kept, [K] dropped

## Actionable (if any)
[Items implying a move for this reader, first]

## Worth Knowing
[Per item: **what** — so-what for you. ([best source])]
[Echo notes where heavy: "covered by 4 of your sources"]

## Borderline (one-liners)
[…]

## Dropped: [K]
[The counted categories — promos / echoes / off-interest]

## Quality Checks

- [ ] Every kept item has a reader-specific so-what, not a generic summary
- [ ] Repeats are collapsed with the best source named
- [ ] The dropped ledger is counted and categorized
- [ ] Actionable items lead when the reader's bias is action
- [ ] The interest profile's edges were honored — no scope creep toward "interesting generally"

## Anti-Patterns

- [ ] Do not summarize everything — an unfiltered digest is the pile with extra steps
- [ ] Do not write so-whats that would fit any reader — the profile is the point
- [ ] Do not hide the drops — invisible filtering keeps the reader re-reading the sources
- [ ] Do not let one loud newsletter dominate — items compete on interest-match, not sender volume
- [ ] Do not run daily by default — cadence inflation recreates the interruption problem the digest exists to solve

## Example Trigger Phrases

- "Digest my newsletters."
- "Summarize what my subscriptions said this week."
- "What did I miss that I actually care about?"
- "Make my reading pile useful."
