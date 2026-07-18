---
name: data-breach-response
description: "Respond to your data being breached — triage by what actually leaked, the freeze/rotate/monitor ladder in the right order, and the calibrated watchfulness that follows, without panic or paralysis. Use when someone asks my data was in a breach what do I do, I got a breach notification letter, my SSN/ID number leaked, or should I freeze my credit. Produces the leaked-data triage, the ordered response ladder with the do-today items, the monitoring plan, and the breach-letter decode (including what the free credit monitoring offer is and isn't)."
---

# Data Breach Response Skill

The breach notification letter arrives months late, written by lawyers to minimize alarm and liability in the same paragraph — and the reader's real question is buried: *what did they get, and what do I actually do?* The answer depends entirely on the first part: a leaked password and a leaked government ID number are different emergencies with different ladders. This skill triages by what leaked, orders the response (some steps are today, most aren't), and decodes the letter itself — including the free-monitoring offer, which is worth taking and worth understanding.

## What This Skill Produces

- **The triage** — what leaked, mapped to what it enables: account takeover, financial fraud, identity theft, targeted phishing
- **The ladder** — do-today / this-week / ongoing, ordered by damage-prevented-per-minute
- **The monitoring plan** — what to watch, where, at what cadence — calibrated, not paranoid
- **The letter decode** — what the notification actually admits, and what the monitoring offer covers

## Required Inputs

Ask for these if not provided:
- **What leaked** — from the letter or breach-lookup: email? passwords (hashed or plain — the letter usually says)? card numbers? government ID / SSN? medical? The whole response keys off this list
- **The account's blast radius** — was that password reused? (The honest answer decides half the ladder) Is the breached account an identity anchor (primary email)?
- **Jurisdiction, loosely** — credit freezes, fraud alerts, and ID-theft reporting are country-specific; the ladder names the *step types* with verify-locally flags
- **What's been noticed** — any weird charges, logins, or mail already? That upgrades the response from preventive to active-incident

## Framework: The Leak-to-Ladder Map

1. **Passwords leaked → today:** change it, then everywhere it was reused (the breach's real payload is credential-stuffing every other site), enable 2FA on the anchors (email first — it resets everything else), and check the account's forwarding/recovery settings if it's email (persistence tricks outlive password changes).
2. **Card numbers → today:** freeze/reissue via the bank app, review recent transactions, set transaction alerts. Painless, fast, and the bank's problem-handling here is mature.
3. **Government ID / SSN → this week, and it's the big one:** a credit freeze at the bureaus (the strongest single move where available — free in many jurisdictions, verify locally; it blocks new-account fraud at the source), fraud alerts as the lighter alternative, tax-filing and benefits-fraud awareness where relevant. The ID number can't be rotated like a password — which is why the freeze, monitoring, and calibrated long-term watchfulness *are* the response.
4. **Email + context leaked → the phishing upgrade:** breach data fuels *targeted* scams that reference real details ("your recent order at…") — the ladder includes the expectation-setting line: incoming messages referencing this breach are now *more* suspicious, not more credible (route to [scam-message-decoder](../scam-message-decoder/SKILL.md)).
5. **The letter decode:** "no evidence of misuse" means "we haven't seen it yet," not "you're safe" · the free credit monitoring is worth activating (it's detection, not prevention — it tells you *after* something happened; the freeze is prevention) · class-action notices are separate and slow · and the offer's enrollment deadline is a real date worth catching.

## Output Format

# Breach Response: [breach/company] — leaked: [the list]

## What This Enables
[The leaked items → the specific risks, plainly — no vague "your data may be at risk"]

## The Ladder
**Today:** [the leak-keyed items] · **This week:** [freeze/alerts (verify-locally), monitoring enrollment before its deadline] · **Ongoing:** [the calibrated watch: statements cadence, credit-report cadence, the phishing expectation]

## The Letter, Decoded
["No evidence of misuse" translation · what the monitoring offer does and doesn't do · deadlines in the letter, extracted]

## If Something's Already Wrong
[Active-fraud branch: dispute processes, the ID-theft report path (jurisdiction-flagged), the paper trail to start]

> Freeze mechanics, fraud-alert rules, and identity-theft reporting vary by country — verify the flagged steps locally. A freeze blocks new credit, not existing-account fraud; the ladder covers both for that reason.

## Quality Checks

- [ ] Every response item traces to a specific leaked data type — no generic hygiene dump
- [ ] The reuse question was asked and its answer shaped the ladder
- [ ] Freeze vs. monitoring is explained as prevention vs. detection
- [ ] Jurisdiction-specific mechanisms are typed and flagged, not asserted
- [ ] The active-incident branch exists and upgrades the response when triggered

## Anti-Patterns

- [ ] Do not respond to every breach identically — a forum password and an ID number are different events
- [ ] Do not present the monitoring offer as protection — it's a smoke detector, not a lock; take it anyway
- [ ] Do not induce panic or dismiss — the calibrated middle is the product
- [ ] Do not skip the email-anchor check — the account that resets all others is the one that matters most
- [ ] Do not let "no evidence of misuse" close the case — the ladder runs on what leaked, not on the letter's comfort
