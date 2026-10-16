---
trigger: model_decision
description: "Searches Reddit, X/Twitter, and the broader web for recent opinions, sentiment, and signal on any topic. Use when you need to know what real people are saying about a tool, product, trend, or event in the past 30 days — cutting through SEO content to surface genuine community reaction. Produces a structured report with consensus findings, pain points, positive signals, contrarian takes, source links, and a signal confidence rating."
---

# Last 30 Days Research

## The Problem

Googling gives SEO-stuffed "best of" lists written six months ago by someone who has never used the thing. Real honest takes live on Reddit threads, X replies, and niche communities — but chasing them across platforms eats your afternoon. This skill does the chase for you.

## Required Inputs

| Input | Required | Notes |
|-------|----------|-------|
| Topic | Yes | Tool, trend, feature, product, event, company — anything with a name |
| Date scope | No | Defaults to last 30 days. Can override to last 7 days or last 90 days |
| Angle | No | e.g. "focus on developer sentiment" or "looking for pricing complaints specifically" |

## Output Structure

The output is a structured research report with the following sections, delivered in this exact order:

```
## Last 30 Days Research: [Topic]
Research window: [Date 30 days ago] → [Today's date]

---

## What People Agree On
[Consensus points that appear across multiple platforms — most reliable signal]

## Where People Disagree
[Active debates, contrasting views — include which side has more weight]

## Pain Points That Keep Coming Up
[Recurring complaints and frustrations — strongest signal of real problems]

## Positive Signals
[What people genuinely praise — not PR, but unprompted appreciation]

## Most Interesting Takes
[Contrarian, unexpected, or surprisingly insightful comments worth noting]

## Sources
[Links to the most useful threads/posts found — 5–10 links with brief labels]

## Signal Confidence
[High / Medium / Low — with a one-line rationale based on data volume and consistency]
```

Each section should contain substantive content, not placeholders. If a section has no findings (e.g. no positive signals found), state that explicitly rather than leaving it empty or fabricating content.

## Instructions for Claude

### Step 1 — Calculate the date window

Determine today's date and subtract 30 days to get the research start date. Format: YYYY-MM-DD. Use these dates explicitly in every search query.

### Step 2 — Reddit search

Run at least three web searches targeting Reddit:

```
site:reddit.com "[topic]" after:[30-days-ago-date]
site:reddit.com "[topic]" 2025
reddit.com "[topic]" discussion OR thread OR comments
```

For each result: read the thread title, top-level comments, and any highly-upvoted replies. Record the key claims and the URL.

If the topic has common synonyms or abbreviations, run additional searches with those (e.g. "Claude Code" and "claude.code" and "Anthropic coding tool").

### Step 3 — X/Twitter search

Run at least two web searches targeting X:

```
site:twitter.com OR site:x.com "[topic]" after:[30-days-ago-date]
"[topic]" site:x.com -is:retweet
```

Note: X search via web has limitations. If results are sparse, supplement with searches for specific accounts known to discuss the topic area (e.g. tech journalists, domain experts).

### Step 4 — Broader web search

Run at least two broader searches for articles, blog posts, and commentary:

```
"[topic]" review OR opinion OR experience [month] [year]
"[topic]" vs OR alternative OR comparison [month] [year]
```

Target sources: Hacker News, Substack, dev.to, personal blogs, product communities. Avoid press releases and vendor-authored content.

### Step 5 — Cross-platform corroboration check

Before writing the report, review everything collected and apply the corroboration rule:

**When the same point appears on both Reddit and X independently, treat it as strong signal — it's likely true.**

A point mentioned only once on one platform is a data point, not a finding. Weight your sections accordingly.

### Step 6 — Write the report

Populate each section of the output structure. Follow these rules:

- **What People Agree On**: Only include points you saw on 2+ platforms or in multiple independent threads. These are your most reliable findings.
- **Where People Disagree**: Name the sides. "Some say X, others say Y — and the X camp seems louder based on upvote counts / engagement."
- **Pain Points**: Be specific. "Performance issues" is weak. "Cold start times over 4 seconds on the free tier" is useful.
- **Positive Signals**: Must be unprompted praise, not from product marketing or sponsored content.
- **Most Interesting Takes**: At least 2, maximum 5. Quote or closely paraphrase where possible.
- **Sources**: Include the actual URLs. Label each one briefly (e.g. "Reddit thread: 'Has anyone switched from X to Y?'").
- **Signal Confidence**: Rate High/Medium/Low based on:
  - High = 10+ sources, consistent signal across platforms
  - Medium = 5–10 sources, some inconsistency
  - Low = fewer than 5 sources, or highly fragmented signal

### Step 7 — Sanity check before delivering

Before outputting the report, verify:

- [ ] Every claim in the report traces to an actual source found during research (not prior knowledge)
- [ ] The date window was actually applied to searches, not ignored
- [ ] No fabricated or hallucinated URLs in the Sources section
- [ ] Signal Confidence rating reflects the actual data volume, not optimism

## Quality Checks

- [ ] At minimum 3 Reddit searches were run with the date filter applied
- [ ] At minimum 2 X/Twitter searches were run
- [ ] At minimum 2 broader web searches were run
- [ ] Cross-platform corroboration principle was applied (same point on multiple platforms = stronger signal)
- [ ] Pain Points section contains specific, concrete details — not vague generalisations
- [ ] Sources section contains real URLs (not hallucinated), verified during research
- [ ] Signal Confidence is rated and justified
- [ ] If a section has no findings, it says so explicitly rather than being omitted or padded
- [ ] No vendor-authored content or press releases treated as independent signal
- [ ] Synonyms and alternative names for the topic were searched

## Anti-Patterns

- [ ] Do not treat SEO blog posts or vendor-authored content as community signal — only count independent sources
- [ ] Do not report findings without applying the date filter — prior knowledge mixed with recent search results produces stale, unverifiable claims
- [ ] Do not fabricate or guess at URLs — every link in the Sources section must have been retrieved during the research session
- [ ] Do not report a single mention as a "finding" — a finding requires corroboration from at least two independent sources
- [ ] Do not rate Signal Confidence as High when fewer than 5 credible sources were found — this misleads the reader about how much to rely on the output

## Example Trigger Phrases

- "What are people saying about Cursor AI from the last 30 days?"
- "Research Vercel's recent sentiment"
- "Last 30 days on the Arc browser shutdown"
- "What's the current vibe on Supabase?"
- "What are developers saying about Claude Code lately?"
- "Research [topic] from the last 30 days"
- "Give me a signal report on [product]"
- "What's the Reddit and Twitter take on [trend]?"
