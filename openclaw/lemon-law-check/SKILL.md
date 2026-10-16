---
name: lemon-law-check
description: "Figure out whether your problem car might qualify for a refund or replacement under lemon law or warranty — and build the paper trail to claim it. Use when asked is my car a lemon, my new car keeps breaking, lemon law help, or can I return a defective car. Produces a plausibility read against typical lemon-law criteria (repeated same defect, repair attempts, time out of service, warranty window), the records to gather, the manufacturer-claim and escalation steps, and a strong flag that lemon laws are jurisdiction-specific. Not legal advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/lemon-law-check.html
metadata:
  {
    "openclaw": { "emoji": "⚖️" }
  }
---

# Lemon Law Check

A car that keeps failing for the same fault, despite repeated repair attempts, may qualify for a refund or replacement under lemon laws or warranty — but only if you meet the criteria and have the documentation. This checks whether your situation plausibly fits, tells you exactly what records to keep, and lays out the manufacturer claim and escalation — while being clear that lemon laws vary by jurisdiction and this isn't legal advice.

## What This Skill Produces

- **A plausibility read** — how your situation maps to typical lemon-law/warranty criteria (a substantial defect, a reasonable number of repair attempts or days out of service, within the coverage window)
- **The records to gather** — every repair order, dates, the same-defect history, communications, and days in the shop
- **The claim path** — notifying the manufacturer, the (often required) final repair opportunity, and requesting refund/replacement
- **Escalation** — arbitration programs, consumer authorities, and when to get a lemon-law attorney
- **A jurisdiction flag** — criteria and remedies differ by location; not legal advice

## Required Inputs

Ask for these if not provided:
- **The vehicle & purchase** — new/used, when bought/leased, and the warranty status
- **The defect** — what keeps going wrong, and whether it's the same recurring issue
- **Repair history** — how many attempts on the same fault, and total days out of service
- **Communications** — what the dealer/manufacturer has said or done
- **Location** — determines whether/how lemon law applies

## Framework: Match The Criteria, Document Everything

1. **Test against the typical criteria.** Lemon laws generally need a substantial defect, a reasonable number of repair attempts (or days out of service) for the *same* issue, within a coverage window — check the pattern honestly.
2. **Same-defect history is key.** Repeated attempts at the *same* fault matter more than lots of unrelated issues — establish that history.
3. **Document relentlessly.** Every repair order (with the complaint and what was done), dates, and days in the shop are the entire case — gather them now.
4. **Follow the manufacturer process.** Notify the manufacturer in writing, allow any required final repair attempt, and formally request a refund or replacement.
5. **Escalate the right way.** Manufacturer arbitration, consumer-protection authorities, then a lemon-law attorney (often paid by the manufacturer if you win) — flag when it's worth legal help.

## Output Format

### Lemon check: [vehicle] · [new/used] · defect: [x]

**Plausible lemon?** vs typical criteria: same defect [n] attempts / [days] out of service / within warranty → [likely / borderline / probably not].
**Gather:** every repair order (complaint + fix) · dates · days in shop · all communications.
**Claim:** notify manufacturer in writing → allow required final repair → request refund/replacement.
**Escalate:** [arbitration → consumer authority → lemon-law attorney].

> Lemon laws are jurisdiction-specific and this isn't legal advice. Confirm your local criteria; a lemon-law attorney is often free to you if the manufacturer pays fees on a win.

## Quality Checks
- [ ] Maps the situation to typical lemon-law/warranty criteria honestly
- [ ] Stresses the same-recurring-defect history
- [ ] Lists the documentation that constitutes the case
- [ ] Gives the manufacturer notice/final-repair/claim process
- [ ] Includes arbitration/authority/attorney escalation
- [ ] Flags jurisdiction-specificity / not legal advice

## Anti-Patterns
- **Declaring it a lemon** without matching the criteria.
- **Ignoring documentation** — the case *is* the paper trail.
- **Conflating many unrelated issues** with the same recurring defect.
- **Skipping the required manufacturer process.**
- **Asserting one law** across jurisdictions.

## Example Trigger Phrases
- "My new car keeps breaking down with the same problem — is it a lemon?"
- "The dealer's fixed it four times and it still fails. What are my options?"
- "Can I get a refund or replacement for a defective car?"
- "How does lemon law work and do I qualify?"
- "What records do I need to make a lemon-law claim?"
