---
name: competitive-scan-lite
description: "Run a fast, honest competitive scan — the dimension table built from public evidence (sites, docs, pricing pages, changelogs, reviews), the claims-vs-observed discipline, and the so-what synthesis that ends in moves, not a landscape mural. Use when asked what are competitors doing, quick scan of these three rivals, how does our pricing/feature set compare, or prep the competitive slide honestly. Produces the evidence-based comparison table, the marketing-vs-reality flags, the so-what synthesis, and the staleness date."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/competitive-scan-lite.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Competitive Scan Lite Skill

Competitive scans fail toward two poles: the mural (a beautiful landscape slide, no implications, stale in a month) and the strawman (competitors rendered conveniently weak, disproven at the first customer call). The lite scan is evidence-first and implication-shaped: a small dimension table (the 5–7 dimensions that matter *for the current decision*), filled from what's publicly observable — pricing pages, docs, changelogs, review sites, job postings (the underrated tell of where rivals are investing) — with claims marked as claims and observations as observations, ending in the only section that justifies the exercise: *so-what moves for us*. Dated, because scans rot on schedule.

## What This Skill Produces

- **The dimension table** — competitors × the decision-relevant dimensions, every cell sourced
- **The claims-vs-observed flags** — what their marketing says vs. what docs/reviews/changelogs show
- **The investment tells** — changelog velocity, job postings, pricing changes — where rivals are *heading*
- **The so-what synthesis** — the 2–3 implications and moves, plus the scan's staleness date

## Required Inputs

Ask for these if not provided:
- **The decision the scan feeds** — pricing review? Roadmap bet? A deal's competitive slide? The dimensions come from the decision, not from "everything about everyone"
- **The competitor set, argued** — who actually competes for the same customer decision (the aspirational rival and the real alternative — often "spreadsheets" — both belong or don't, per the decision)
- **What's already known** — the team's current beliefs and battle-scars (sales's anecdotes are evidence at anecdote grade — [evidence-grading](../evidence-grading/SKILL.md) applies)
- **The freshness need** — one-shot for a decision, or a standing scan with a refresh cadence?

## Framework: The Scan Rules

1. **Dimensions from the decision, capped at 7:** a pricing review scans packaging, tiers, and public price points; a roadmap bet scans capability depth and release velocity — the generic everything-table serves no decision and takes the longest. Each dimension states why it's in.
2. **Public evidence, sourced per cell:** pricing pages (screenshot with dates — they change silently), docs (capability truth lives here, not on the homepage), changelogs (velocity and direction), review sites (the complaints are the honest spec sheet), job postings (hiring for ML engineers tells you the roadmap before the press release). Every cell carries its source; empty cells stay *empty-and-labeled*, never inferred.
3. **Claims ≠ observations, marked:** "AI-powered" on the homepage is a claim; the docs' actual feature list is an observation; the review saying "the AI features are a demo" is a third data point. The table's flags (📢 claimed / 👁 observed / ⭐ user-reported) keep the scan from laundering marketing into fact — in either direction, including ours.
4. **Steelman the rivals:** each competitor gets its honest best case ("their onboarding is genuinely better — reviews confirm repeatedly") — the [proposal-skeleton](../proposal-skeleton/SKILL.md) steelman rule, because a scan that flatters us prepares the team to lose politely. What they're *bad* at needs the same evidence bar.
5. **So-what or it was a mural:** the synthesis names 2–3 implications ("their per-seat pricing breaks at exactly the segment we're strong in — the wedge is usage-based") and the moves they suggest — plus the staleness stamp ("scanned July 2026; pricing and changelog cells rot fastest — refresh before reuse"). A scan without moves is decoration with citations.

## Output Format

# Competitive Scan: [us] vs [set] — feeds: [decision] · scanned: [date]

## The Table
| Dimension (why it's in) | Us | [A] | [B] |
|---|---|---|---|
[Every cell: source + 📢/👁/⭐ flag · empty cells labeled "not public"]

## The Tells
[Changelog velocity · hiring signals · pricing moves — the direction reads]

## Steelman Corner
[Each rival's genuine best case, evidence-backed — including what reviews say beats us]

## So-What
[The 2–3 implications → moves · the staleness stamp and refresh-fastest cells]

## Quality Checks

- [ ] Dimensions trace to the decision and stay ≤7
- [ ] Every cell is sourced and flagged claimed/observed/user-reported
- [ ] Rivals got their steelman with evidence
- [ ] Empty cells are labeled, not inferred
- [ ] The synthesis ends in moves and carries the staleness date

## Anti-Patterns

- [ ] Do not build the mural — a landscape without implications is wall art with a legend
- [ ] Do not launder homepage claims into capability facts — the flags exist for both directions
- [ ] Do not scan the convenient weaknesses — the steelman is what preps the team for real deals
- [ ] Do not fill unknowable cells by vibe — "not public" is an honest, useful entry
- [ ] Do not reuse a stale scan silently — pricing cells lie within a quarter; the stamp is load-bearing

## Example Trigger Phrases

- "What are competitors doing?"
- "How does our pricing/feature set compare?"
- "Prep the competitive slide honestly."
