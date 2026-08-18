---
trigger: model_decision
description: "Figure out whether your record can be sealed or expunged, and map the steps to do it — eligibility, waiting periods, forms, and where to get help. Use when asked can I get my record expunged, how do I seal my criminal record, clear my background, or am I eligible for expungement. Produces a plain-language read on likely eligibility (offense type, dispositions, waiting periods), the document and step sequence to petition, the costs and fee-waiver options, the realistic timeline, and where to get free or low-cost legal help — so a record that can be cleared actually gets cleared. Not legal advice; expungement law is highly jurisdiction-specific and this points you to the right help."
---

# Expungement Navigator

Many records can be sealed or expunged — but the rules are a maze of offense types, waiting periods, and forms that stop people before they start. This cuts through it: a plain read on whether you're likely eligible, the step-by-step to petition, the costs and fee waivers, and where to get free legal help — so a clearable record doesn't sit on you for life out of confusion.

## What This Skill Produces

- **A likely-eligibility read** — based on offense type, how the case ended (dismissed, convicted, deferred), and time since — what's probably eligible, what isn't, and what needs a lawyer's read
- **The step sequence** — get your record (RAP sheet), confirm eligibility, obtain and complete the petition, file, serve, and (often) a hearing
- **Documents & costs** — what you'll need, filing fees, and fee-waiver options if you can't pay
- **A realistic timeline** — how long each stage typically takes, so you plan around it
- **Where to get help** — legal aid, public defenders' expungement clinics, reentry orgs, and court self-help centers
- **What clearing it does and doesn't do** — realistic expectations about what disappears from background checks

## Required Inputs

Ask for these if not provided:
- **The record** — offense type(s), how each case ended, roughly when
- **Where** — the state/county where the case was (rules are local)
- **Your goal** — sealing vs. expungement vs. a certificate of rehabilitation
- **Constraints** — budget for fees, urgency (a pending job/housing application)

## Framework: Eligibility → Petition → Help

1. **Pull the actual record.** You can't assess eligibility from memory — get the official RAP sheet / case dispositions first.
2. **Screen for eligibility.** Offense category, disposition, and waiting period are the three gates; flag anything borderline for a lawyer rather than guessing.
3. **Map the petition path.** The specific forms, filing court, service requirements, and whether a hearing is likely — as an ordered checklist.
4. **Plan for cost.** Filing fees plus fee-waiver eligibility, so cost isn't a silent blocker.
5. **Route to real help.** Expungement clinics, legal aid, and reentry orgs do this for free or cheap — always point there for the actual filing.

## Output Format

### Expungement path: [region]

**Likely eligible:** [what qualifies] · **Likely not:** [what doesn't] · **Needs a lawyer's read:** [borderline].
**Steps:** [pull record → confirm eligibility → petition → file/serve → hearing].
**Documents & fees:** [what you need] · [filing fee ~ / fee-waiver if you qualify].
**Timeline:** [stage-by-stage rough duration].
**Get help:** [legal-aid clinic · public defender expungement day · reentry org · court self-help].
**What it does:** [what leaves background checks — and the limits].

> Not legal advice — expungement rules are highly jurisdiction-specific and change. Use a legal-aid clinic or attorney to confirm eligibility and file.

## Quality Checks
- [ ] Bases eligibility on offense type, disposition, and waiting period
- [ ] Starts with pulling the official record
- [ ] Gives an ordered petition checklist and the documents needed
- [ ] Covers fees and fee-waiver options
- [ ] Routes to free/low-cost legal help for the actual filing

## Anti-Patterns
- **Guessing eligibility** without the actual dispositions.
- **Presenting it as DIY-only** when a clinic would do it free and correctly.
- **Ignoring fees/waivers** that silently stop people.
- **Overpromising** that everything vanishes from every check.
- **Generic steps** not tied to the person's jurisdiction.

## Example Trigger Phrases
- "Can I get my record expunged?"
- "How do I seal my criminal record so it stops showing up?"
- "Am I eligible to clear my background?"
- "What's the process to expunge a misdemeanor here?"
- "Where can I get free help expunging my record?"
