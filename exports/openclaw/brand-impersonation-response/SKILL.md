---
name: brand-impersonation-response
description: "Respond to a brand or executive impersonation incident — deepfaked executives, cloned support lines, fake apps, spoofed domains, or AI-generated scam content wearing your name. Use when a deepfake of a leader is circulating, customers report a fake version of your product or support channel, or to prepare the impersonation playbook before it happens. Produces an incident response: verification protocol, takedown sequencing by platform, customer and public communications, and the hardening plan. For general crisis comms use press-release/pm-crisis skills; for security incidents inside your systems use security-incident-response."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/brand-impersonation-response.html
metadata:
  {
    "openclaw": { "emoji": "🚨" }
  }
---

# Brand Impersonation Response Skill

Cheap generative tools made impersonation an industrial product: a CEO deepfake pushing a token, a cloned support line harvesting card numbers, a spoofed checkout collecting credentials. The attack isn't on your systems — it's on your *customers' trust*, using your face. Speed and sequencing decide the damage; this skill runs both.

## What This Skill Produces

- A **verification protocol** — confirm it's fake, preserve evidence, assess reach *before* amplifying it
- A **takedown sequence** by platform/registrar/store, with the escalation paths that actually work
- **Communications** for each audience: targeted customers, all customers, public, employees, and (deepfaked) the impersonated person
- A **hardening plan** so the next attempt lands softer

## Required Inputs

Ask for (if not already provided):
- **What's circulating**: the artifact (video/audio/site/app/account), where it lives, how it was discovered
- **The harm mechanism**: financial scam? credential harvesting? reputation/market manipulation? (Drives urgency and legal posture)
- **Reach so far** — views, victim reports, whether it's spreading or stagnant
- **Who's impersonated** — the brand, a product surface, or a named human (a deepfaked *person* is also a victim; the response includes them)

## Response Method

**Phase 1 — Verify and preserve (first hours).**
Confirm fabrication with the impersonated party directly (deepfakes are good; "that's obviously fake" is not a verification method). Preserve everything *before* takedowns delete the evidence: URLs, hashes, screen recordings, WHOIS, wallet addresses, timestamps — the takedown kills the scam, the evidence supports fraud referrals and platform escalation. Quietly assess reach; **do not publicly respond yet** — a statement about a 400-view scam gives it 40,000.

**Phase 2 — Contain (same day).**
Takedowns in parallel, sequenced by harm-per-hour:
- **Payment/credential harvesting first**: hosting provider + registrar (impersonation/phishing abuse reports), Google Safe Browsing / Microsoft SmartScreen flagging (kills most browser traffic faster than the registrar acts), payment processor fraud teams if cards are flowing
- **Platforms**: impersonation reports via *brand/IP channels*, not generic user reports — trademark-based reports move in hours where "report account" moves in weeks; file with rights documentation attached
- **App stores**: developer-impersonation + trademark claims through the formal IP channels
- Route it as **fraud, not just abuse**, where money moved: law enforcement referral (IC3 or local equivalent) — platforms escalate faster with a case number
Log every report: platform, ticket, time — the log *is* the escalation tool when nothing moves.

**Phase 3 — Communicate (as reach demands).**
The proportionality rule: **warn the targeted, inform the asking, broadcast only when reach forces it.**
- **Targeted/victimised customers** immediately: what happened, what we will *never* ask (the anchor line: "we will never DM you for payment/credentials/wallet transfers"), what to do if they engaged, one report channel
- **The impersonated executive** (deepfake cases): they're a victim, not just an asset — align their personal statement with the company's; one voice
- **Public statement** only past the reach threshold: short, factual, no link or screenshot of the fake, the never-ask anchor, the report channel. Never repeat the scam's claims in the correction (repetition entrenches)
- **Support + social teams** get the script *before* the public does — they're already getting the questions

**Phase 4 — Harden (the week after).**
Verification anchors customers can check (verified handles list on your domain, DMARC/BIMI, signed comms for high-stakes messages) · monitoring for the next round (domain-permutation watch, brand-mention alerts, app-store sweeps — impersonators retry) · the *internal* deepfake protocol (a "CEO" voice call requesting a transfer gets a callback on a known number — write it down now) · pre-registered abuse contacts at the platforms that were slow this time.

## Output Format

### Impersonation Response: [what's circulating] — [date]

**Verification:** [how fabrication was confirmed · evidence preserved (list) · reach assessment]

**Takedown log**
| Target | Channel used | Filed | Status | Escalation path |
|---|---|---|---|---|

**Communications** *(drafted, per audience)*: [targeted-customer notice · support script · public statement (with its reach trigger) · executive's personal statement if applicable]

**The never-ask anchor:** [the exact line, everywhere]

**Hardening plan:** [verification anchors · monitoring · internal deepfake protocol · owner + dates]

## Quality Checks

- [ ] Evidence was preserved before takedowns were filed
- [ ] Takedowns route through IP/trademark channels with documentation, not generic reports
- [ ] Public response is gated on a stated reach threshold, not reflex
- [ ] No communication links, screenshots, or restates the scam's content
- [ ] Money-moved cases include the law-enforcement referral
- [ ] The hardening plan includes the internal voice-deepfake protocol

## Anti-Patterns

- [ ] Do not amplify a low-reach scam with a high-reach denial — proportionality is the discipline
- [ ] Do not file generic "report this account" tickets when trademark channels exist — wrong queue, weeks lost
- [ ] Do not let takedowns destroy the evidence — preserve first, always
- [ ] Do not leave the deepfaked human out of the response — an executive learning the plan from the press release is a second incident
- [ ] Do not treat it as a one-off — impersonation that worked once is a campaign; monitoring is part of the response, not the postscript

## Example Trigger Phrases

- "A deepfake of our CEO is going around."
- "Customers are reporting a fake version of our app."
- "Someone cloned our support line."
- "Prepare an impersonation playbook before it happens."
