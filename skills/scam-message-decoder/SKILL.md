---
name: scam-message-decoder
description: "Decode a suspicious message — text, email, call transcript, or DM — against the anatomy of known scam families, with a 🔴🟡🟢 read and the safe next move. Use when someone asks is this a scam, decode this suspicious text, my 'bank' just called me, this job offer seems off, or my parent got a weird message. Produces the verdict with the specific scam-family match, the tells quoted from the message itself, the safe-verification path (never the message's own links or numbers), and the if-you-already-clicked triage."
---

# Scam Message Decoder Skill

Every scam is a costume over the same skeleton: manufactured urgency, an unusual payment or credential request, and a channel you didn't initiate. This skill reads the actual message against the known families — phishing, smishing, the fake-fraud-alert call, job scams, romance/pig-butchering, invoice fraud, grandparent emergencies, tech-support pop-ups — quotes the tells from the text itself, and gives the one move that defeats nearly all of them: **verify through a channel you already had, never through anything the message provides.** No shame anywhere in the output; these work on smart people because they're built by professionals to.

## What This Skill Produces

- **The verdict** — 🔴 scam-pattern match / 🟡 suspicious-verify-first / 🟢 consistent-with-legitimate — with the family named
- **The tells, quoted** — each red flag pointed at the message's own words
- **The safe next move** — the independent-channel verification path, specific to the situation
- **The already-engaged triage** — clicked/paid/shared? The damage-control ladder, calm and ordered

## Required Inputs

Ask for these if not provided:
- **The message itself** — pasted verbatim (sender address/number included; the from-field is often the loudest tell)
- **The context** — do they have a relationship with the claimed sender? Were they expecting anything? (An unexpected "your package is held" and an expected delivery read differently — barely)
- **Engagement status** — just received, or already clicked/replied/paid — the second reroutes the whole output to triage first

## Framework: The Anatomy Rules

1. **The skeleton check:** urgency ("within 24 hours", "your account will be suspended") + unusual payment rail (gift cards, wire, crypto, payment apps to strangers — no legitimate institution takes gift cards, ever, for anything) + initiated-by-them = 🔴 regardless of how good the costume is. These three carry more weight than any logo.
2. **Family matching sharpens the read:** bank-fraud-alert calls (real banks don't ask you to move money to a "safe account" — that request IS the scam) · delivery/toll smishing (the link domain is the tell) · job scams (pay-for-equipment, check-then-refund = the overpayment engine) · romance/investment grooming (weeks of warmth, then a platform only they can see) · invoice/BEC (the changed-bank-details email — verify by phone on a known number, always) · grandparent/emergency (voice "proof" no longer proves — say so plainly) · tech-support pop-ups (the number on the screen is the scam). Each match brings its specific counter-move.
3. **The universal counter is channel independence:** hang up and call the number on the card · type the site yourself · contact the "relative" on their known number · verify invoices by known-number phone call. The message's links, numbers, and "press 1" exist to keep you inside the scam's channel — the decode says this explicitly every time.
4. **🟢 exists and gets said:** real messages get flagged by anxious people constantly; a delivery text that matches an expected package, links to the real domain, and asks for nothing is 🟢 — with the note that typing the tracking number into the carrier's site yourself costs nothing. Crying wolf on everything teaches people to stop checking.
5. **Already-engaged triage, in order:** money sent → contact the bank/rail's fraud line *now* (speed matters for recalls — some rails can claw back, some can't; no promises made) · credentials shared → change that password + everywhere it's reused + enable 2FA · card numbers → freeze/reissue · remote access granted → disconnect, run security scan, change passwords from a *different* device · then report (the platform, and the national reporting body — named as a type, jurisdiction-flagged). Shame delays every one of these steps, so the triage opens by saying: professionals fall for professional scams; speed matters more than embarrassment.

## Output Format

# Scam Decode: [message type] — verdict: [🔴/🟡/🟢]

**[The one-line verdict with the family name: "🔴 — this matches the fake-bank-fraud-alert pattern."]**

## The Tells
> "[quoted line from the message]"
[What it signals · why legitimate senders don't do this]

## The Safe Move
[The independent-channel verification, specific: which number/site, from where]

## If You Already Engaged
[The ordered triage for what was shared, calm, no shame — speed over embarrassment]

> Scam patterns evolve and reporting channels vary by country — when money has moved, the bank's fraud line and local reporting body come before everything else. No legitimate organization takes payment in gift cards.

## Quality Checks

- [ ] Every red flag quotes the message's actual words
- [ ] The verdict names a specific family, not generic "be careful"
- [ ] The safe move uses only channels the user already had
- [ ] 🟢 verdicts are given when earned, with the free-verification note
- [ ] The triage is ordered by recoverability speed and opens shame-free

## Anti-Patterns

- [ ] Do not shame the target anywhere — these are professional operations; embarrassment is part of their design
- [ ] Do not verify through anything the message provided — links, numbers, "press 1"
- [ ] Do not mark everything 🔴 — false alarms train people to stop asking
- [ ] Do not promise recovery of sent money — route to the fraud line fast and honestly
- [ ] Do not reproduce or improve scam text — this skill decodes attacks, never drafts them
