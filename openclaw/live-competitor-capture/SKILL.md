---
name: live-competitor-capture
description: "Plan and run an evidence-first walkthrough of a competitor's public product with a browser tool, capturing dated screenshots and observations, then separate what was seen from what was inferred. Use when asked to walk through a competitor's signup, capture their pricing page, document their onboarding with screenshots, get evidence for this teardown, or check what a competitor actually ships today. Produces a capture plan, a dated evidence log with one entry per screen, an observed versus inferred table, and the gaps that could not be reached."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/live-competitor-capture.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Live Competitor Capture Skill

Competitive analysis written from memory describes the competitor as they were when the author last looked. This skill gathers the evidence first: a planned walk through the public product, one screenshot and one note per step, each with a date and an address. Analysis comes after and is kept apart from observation. Use it with a browser automation tool or by hand. To analyse the evidence afterwards, hand the log to `competitor-teardown`; to critique a single screenshot, use `screenshot-teardown`.

## What This Skill Produces

- **A capture plan**: the flows to walk, in order, and what to record at each step
- **An evidence log**: one row per screen with date, address, what is on it, and the screenshot file name
- **An observed versus inferred table**, so no guess is mistaken for a fact
- **A gaps list**: what sat behind a paywall, a sales call or a login that should not be crossed
- **A re-capture schedule** for pages that change often, such as pricing

## Required Inputs

Ask for these if not provided:
- **The competitor** and the product area of interest
- **The question** the evidence must answer (for example: how many steps to first value, what is in the free tier)
- **The tool available**: a browser automation tool, or the user capturing by hand
- **Boundaries**: confirm that only public pages and legitimately created trial accounts will be used

Stay inside what any member of the public may see. Do not use another person's credentials, do not misstate who you are to a sales team, do not get around a paywall or a robots restriction, and follow the site's terms of use. If a flow needs any of those, record it as a gap.

## Framework: Evidence Before Opinion

1. **Write the question first.** A capture without a question produces a folder of screenshots nobody reads.
2. **Plan the flows.** Usual set: home page promise, pricing, signup, first run, the core action, upgrade prompt, help and documentation, cancellation. Pick the ones the question needs.
3. **Capture one step, one row.** For each screen record the date, the address, the visible headline and primary action, the fields asked for, and the file name. Use a naming scheme such as `competitor-flow-step-date`.
4. **Record friction as counts.** Steps, required fields, screens before first value, time shown by the product. Count what is on the screen; do not time anything you did not measure.
5. **Quote, do not paraphrase.** Copy headlines, plan names and limits exactly. Prices and limits are the facts most often misremembered.
6. **Separate observed from inferred.** "The free plan lists three projects" is observed. "They are targeting small teams" is inferred. Keep them in different columns.
7. **Log the gaps and the date.** State what could not be reached and when the capture was made. Evidence about a competitor expires.

## Programmatic Helper

This skill ships `scripts/capture_log.py`, with no dependencies beyond the standard library. It keeps the dated log and renders the evidence table and the counts, so nothing is retyped. It never opens a browser or a network connection: you or your browser tool do the capturing.

```bash
python3 scripts/capture_log.py init log.json --competitor "Acme" --question "Steps before first task?"
python3 scripts/capture_log.py add log.json --flow signup --url https://example.com/signup \
    --headline "Start free" --action "Create account" --fields "email,password" --shot acme-signup-01.png
python3 scripts/capture_log.py report log.json
```

`add` stamps today's date unless `--date` is given, numbers the step, and refuses an address that is not `http` or `https`. `report` prints the evidence log as a table, counts screens and fields per flow, and lists entries that have no screenshot.

## Output Format

# Capture: [competitor] · [flow] · [date]

**Question:** [what this evidence is for]
**Method:** [tool or manual] · **Account used:** [public pages / own trial account]

## Capture Plan
| # | Flow | Start address | What to record |
|---|------|---------------|----------------|

## Evidence Log
| # | Date | Address | Headline and primary action (quoted) | Fields or limits shown | Screenshot |
|---|------|---------|--------------------------------------|------------------------|------------|

## Counts
[Steps · required fields · screens before first value]

## Observed versus Inferred
| Observed (with log row) | Inference | Confidence |
|-------------------------|-----------|------------|

## Gaps
[What could not be reached and why]

## Re-capture
[Pages to check again and when]

## Quality Checks

- [ ] Every log row has a date, an address and a screenshot name
- [ ] Prices, plan names and limits are quoted exactly
- [ ] No inference appears in the evidence log
- [ ] Each inference points to the rows it rests on
- [ ] Nothing was captured from behind another person's login or a bypassed restriction
- [ ] The capture date is stated at the top

## Anti-Patterns

- [ ] Do not write the analysis before the capture
- [ ] Do not describe a page from memory and present it as captured
- [ ] Do not pose as a customer to a sales team to extract a quote
- [ ] Do not report timings that were not measured
- [ ] Do not treat last quarter's pricing screenshot as current

## Example Trigger Phrases

- "Walk through their signup and capture each step."
- "Capture their pricing page with a date."
- "Get me screenshot evidence for this teardown."
- "Document what their onboarding actually asks for today."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/live-competitor-capture.html

<!-- pm-claude-skills v84.1.0 | skill: live-competitor-capture | source: skills/live-competitor-capture/SKILL.md | sha256: d7062ee784a6324fb47cabfc93edba38489aa318dac9a5119ca70fd4d8204f7c | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
