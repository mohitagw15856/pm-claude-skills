---
name: current-practice-check
description: "Check advice about tools, prices, model names, regulations and best practice for staleness before it is given, by dating each claim, marking what the assistant only remembers, and saying what to look up. Use when asked is this still current, what is the latest way to do this, double-check this is not out of date, which version should I use, or review this doc for stale advice. Produces a claim-by-claim freshness table, the items that must be verified with a source, a corrected draft where sources were supplied, and a review date."
---

# Current Practice Check Skill

An assistant's knowledge stops at a date, and the world does not. The dangerous answers are the confident ones about things that change: which model is newest, what a plan costs, which API is deprecated, what a regulation requires this year. This skill makes the age of each claim visible. It does not know what changed after the assistant's training; it knows which kinds of claim go stale and refuses to pass them off as current. To check a document's factual claims against supplied sources in general, use `fact-check-pass`.

> **Not quite this?** Use `fact-check-pass` when the question is whether claims are true against sources, not whether they have aged.

## What This Skill Produces

- **A freshness table**: each claim, the kind of fact it is, how fast that kind changes, and where the claim came from
- **A must-verify list**: the claims that should not be relied on without a current source, with where to look
- **A corrected draft**, only for claims the user supplied a current source for
- **A review date** for the document, based on its fastest-changing claim

## Required Inputs

Ask for these if not provided:
- **The advice or document** to check
- **Today's date** if it is not already known in the conversation
- **Any current sources** the user has: release notes, a pricing page, an official changelog, the regulation text
- **What it will be used for**, since advice that feeds a purchase or a compliance decision needs a higher bar

If a search or documentation tool is available, use it for the must-verify items and cite what was found with its date. If none is available, say so and leave the items marked unverified.

## Framework: Date Every Claim

1. **Split the text into claims.** One checkable statement per row.
2. **Classify the kind of fact.** Use the watchlist below. Kinds differ in how quickly they change.
3. **Mark the source.** One of: supplied by the user with a date, looked up now with a date, or remembered by the assistant with no date.
4. **Apply the rule.** A fast-changing claim that is only remembered is **unverified**, however confident. It is rewritten as "as far as I know, as of my training" or removed, and added to the must-verify list.
5. **Point to the authority.** For each must-verify item name where the answer lives: the vendor's pricing or release page, the standards body, the regulator. Do not guess a URL; name the page.
6. **Set the review date.** The document is only as fresh as its fastest-changing claim.

### Watchlist: what goes stale, and how fast

| Kind of claim | Typical pace | Treat a remembered claim as |
|---|---|---|
| Which AI model or version is newest or best | Weeks to months | Unverified |
| Prices, plan limits, free-tier terms | Months | Unverified |
| API parameters, deprecations, CLI flags | Months | Unverified |
| Feature availability in a named product | Months | Unverified |
| Tax rates, thresholds, filing dates | Yearly, sometimes mid-year | Unverified |
| Regulation and platform policy (privacy, app stores, advertising) | Yearly or faster | Unverified |
| Market share, user counts, benchmarks | Quarterly | Unverified |
| Security guidance for a named library | On disclosure | Unverified |
| Framework and library best practice | One to two years | Check if it matters |
| Established method (how to run an interview, write a goal, structure a postmortem) | Slow | Usually fine; say so |

## Output Format

# Freshness Check: [document or topic] · checked [date]

**Verdict:** [safe to use / verify before use / do not use as written] · **Review again by:** [date]

## Claims
| # | Claim | Kind | Source and its date | Status |
|---|-------|------|---------------------|--------|

## Verify Before Relying On
| Claim | Why it may have changed | Where the current answer lives |
|-------|-------------------------|--------------------------------|

## Corrected Text
[Only claims with a supplied or looked-up source are changed. Remembered fast-changing claims are hedged or removed.]

## What Was Not Checked
[Claims left alone and why]

## Quality Checks

- [ ] Every fast-changing claim has a status and a source with a date, or is marked unverified
- [ ] No remembered price, version, limit or rule is presented as current
- [ ] Corrections are made only where a current source exists, and the source is named
- [ ] Slow-changing method advice is not buried in needless hedging
- [ ] A review date is given

## Anti-Patterns

- [ ] Do not answer "what is the latest" from memory without saying it is from memory
- [ ] Do not invent a release date, a version number or a URL
- [ ] Do not hedge everything equally; that hides the claims that matter
- [ ] Do not treat a source the user supplied as current without reading its date
- [ ] Do not mark a claim verified because it sounds right

## Example Trigger Phrases

- "Is this advice still current?"
- "Review this doc for anything out of date."
- "What is the latest way to do this, and how sure are you?"
- "Double-check these prices and version numbers."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/current-practice-check.html

<!-- pm-claude-skills v84.1.0 | skill: current-practice-check | source: skills/current-practice-check/SKILL.md | sha256: ba97119edd461438734b0fc60534dd0af739f3997cb647f41a30d81daf3e99e2 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
