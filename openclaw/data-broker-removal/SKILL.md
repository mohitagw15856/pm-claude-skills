---
name: data-broker-removal
description: "Get your personal info off people-search and data-broker sites — a prioritized opt-out plan that targets the sites that matter and keeps them from reappearing. Use when asked to remove my info from the internet, opt out of data brokers, my address/phone is on people-search sites, or reduce my digital footprint. Produces a prioritized target list (the high-traffic brokers first), the opt-out method for each, a suppression-at-source plan so data stops flowing back, a recheck cadence, and safe-handling cautions for the personal data you'll be submitting."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/data-broker-removal.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Data-Broker Removal

Your home address, phone, relatives, and past addresses are listed on dozens of people-search sites — scraped and resold. You can't clear all of them forever, but you can remove the highest-impact ones and slow the reappearance. This gives a prioritized opt-out plan: which brokers to hit first, how to opt out of each, and how to reduce the sources feeding them.

## What This Skill Produces

- **A prioritized target list** — the biggest/most-visible brokers and people-search sites first, where removal matters most
- **The opt-out method per site** — the specific route (opt-out form, email, verification steps) for each
- **Source suppression** — reducing what feeds the brokers (public records settings, marketing opt-outs, tightening accounts)
- **A recheck cadence** — because listings reappear; when and how to re-scan and re-remove
- **Safe-handling cautions** — how to opt out without oversharing new data or falling for fake "removal" services
- **A do-it-yourself vs paid-service note** — honest tradeoffs of removal services

## Required Inputs

Ask for these if not provided:
- **Your goal** — general privacy, or a specific worry (safety, harassment, a stalker — changes urgency)
- **What's exposed** — address, phone, email, relatives, workplace (from a self-search)
- **Region** — determines which brokers and which privacy rights apply
- **Time/effort** — DIY or considering a paid removal service
- **Safety context** — if there's a safety threat, that reprioritizes everything

## Framework: Biggest First, Suppress The Source, Repeat

1. **Self-search to map exposure.** Search your name + city to see what's actually listed and where — target from reality, not a generic list.
2. **Hit the high-impact brokers first.** The largest aggregators feed the smaller ones; removing them has outsized effect.
3. **Follow each site's real opt-out.** Use the site's official opt-out page; verify carefully and don't submit more than required.
4. **Suppress at the source.** Reduce public-record exposure, opt out of marketing data sharing, and lock down accounts so brokers have less to re-scrape.
5. **Recheck on a cadence.** Listings return; schedule periodic re-scans and re-removals — it's maintenance, not one-and-done.
6. **Mind safety and scams.** For a genuine safety threat, prioritize and consider expert help; avoid "removal" services that are themselves data grabs.

## Output Format

### Data-broker removal: goal [x] · [region] · [DIY/service]

**Map it:** self-search results → what's exposed.

**Remove (priority order)**
1. [Major broker] — opt out via [method/URL type], verify by [step].
2. [Broker] — [method].
… (highest-traffic first)

**Suppress the source:** [public-record/marketing/account settings].
**Recheck:** every [1–3 months] — re-scan and re-remove.
**Cautions:** submit only required info · avoid shady "removal" services · [safety note if relevant].

## Quality Checks
- [ ] Starts from a real self-search, not a generic list
- [ ] Prioritizes the highest-impact brokers first
- [ ] Gives the specific opt-out method per site
- [ ] Includes source-suppression so data stops flowing back
- [ ] Sets a recheck cadence (reappearance is expected)
- [ ] Cautions against oversharing and fake removal services
- [ ] Reprioritizes for genuine safety threats

## Anti-Patterns
- **Treating it as one-and-done** — listings come back.
- **Random order** instead of biggest-impact-first.
- **Oversharing** extra data in the opt-out itself.
- **Ignoring the source** so brokers just re-scrape.
- **Recommending a sketchy removal service** that harvests data.

## Example Trigger Phrases
- "How do I get my home address off those people-search sites?"
- "Remove my personal info from data brokers."
- "My phone number and relatives are showing up online — help."
- "I want to shrink my digital footprint for safety reasons."
- "Are data-removal services worth it, or can I do it myself?"
