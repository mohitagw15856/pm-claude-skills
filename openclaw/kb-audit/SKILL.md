---
name: kb-audit
description: "Audit a knowledge base / help center for coverage, accuracy, and findability. Use when asked to audit a help center, review KB health, find documentation gaps, reduce ticket volume with better docs, or prioritise what to write/fix. Produces an audit — a health scorecard, content gaps (driven by top ticket drivers), stale/duplicate/low-findability articles, and a prioritised fix-and-create backlog."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/kb-audit.html
metadata:
  {
    "openclaw": { "emoji": "🎧" }
  }
---

# Knowledge Base Audit Skill

A help center silently rots: articles go stale, gaps let tickets through, duplicates confuse search, and
nobody notices until deflection drops. This skill audits it — scoring health, mapping gaps against your
*actual top ticket drivers* (so you write what reduces volume, not what's easy), and flagging stale/
duplicate/unfindable content — then hands back a prioritised backlog of what to fix and create.

## Required Inputs

Ask for these only if they aren't already provided:

- **The KB** — the article list/structure (titles, sections; or a sample if large).
- **Top ticket drivers** — the most common support topics/questions (the single most useful input — it's what *should* be documented).
- **Signals if available** — article views, search terms with no results, "was this helpful?" ratings, last-updated dates.
- **The goal** — reduce ticket volume, improve self-serve, onboard a new product area?

## Output Format

### KB Audit: [help center]

**1. Health scorecard** — a quick read across: **coverage** (are top topics documented?), **freshness** (how much is stale), **findability** (titles/search-friendly?), **quality** (answer-first, scannable?), **structure** (organised, no duplication). RAG per dimension.

| Dimension | Status | Note |
|---|---|---|

**2. Coverage gaps (priority)** — cross-reference **top ticket drivers** against existing articles. The gaps where high ticket volume meets no/poor article = the highest-ROI things to write. Rank them.

**3. Fix list** — existing articles that are **stale** (outdated steps/screenshots), **duplicate/overlapping** (consolidate — they split search authority), **hard to find** (bad title, missing search terms), or **low-quality** (answer buried, not scannable).

**4. Prioritised backlog** — combine create + fix, ranked by **ticket-deflection impact × effort**:

| # | Action (create/fix/merge) | Article/topic | Why (impact) | Effort |
|---|---|---|---|---|

**5. Quick wins** — the 3–5 highest-impact, lowest-effort items to do first (often: fix the title on a high-traffic article, write the one missing top-driver doc).

## Quality Checks

- [ ] Gaps are driven by actual top ticket drivers, not guesswork (write what deflects volume)
- [ ] Scorecard covers coverage, freshness, findability, quality, and structure
- [ ] Stale, duplicate, and low-findability articles are specifically flagged
- [ ] The backlog is prioritised by deflection impact × effort, not alphabetically
- [ ] Quick wins are separated out so there's an obvious place to start

## Anti-Patterns

- [ ] Do not prioritise by what's easy to write — prioritise by what deflects the most tickets
- [ ] Do not ignore duplicates — overlapping articles split search ranking and confuse users; merge them
- [ ] Do not treat all gaps equally — a gap on a top-5 ticket driver outranks ten niche ones
- [ ] Do not skip findability — a perfect article with a bad title that no one finds deflects nothing
- [ ] Do not audit without the ticket data if it exists — it's the map of what actually matters

## Based On

Knowledge-base / support-content practice — ticket-driver-led gap analysis, content health scoring, deflection-impact prioritisation.

## Example Trigger Phrases

- "Audit a help center."
- "Review KB health."
- "Find documentation gaps."
- "Reduce ticket volume with better docs."
- "Prioritise what to write/fix."
