---
trigger: model_decision
description: "Appeal a parking ticket, penalty charge, or administrative fine with the grounds that actually get appeals granted — not indignation. Use when someone got a ticket/fine/penalty notice and either has a legitimate case or wants an honest read on whether they do. Produces a short formal appeal letter built on recognised grounds (signage, procedure, mitigation, first-offence discretion), the evidence checklist, and a candid win-likelihood note — or the honest advice to just pay it."
---

# Fine Appeal Letter

Appeals officers read thousands of letters. Anger loses; length loses; the word "outrageous" loses. What wins is a short letter matching one **recognised ground** to **attached evidence**. This skill writes that letter — and tells you when you don't have one, because the second-best outcome is not wasting an afternoon.

## Required Inputs

- **The notice** — what for, when, where, the cited code/rule if shown, the deadline (appeals have clocks; state it back).
- **What actually happened** — the honest version. The letter will be built only from defensible facts.
- **Evidence available** — photos (signage, meter, bay markings), receipts, tickets, medical/breakdown documentation, prior clean record.

## The Grounds That Work (match one, lead with it)

1. **Signage/markings defective or ambiguous** — obscured, contradictory, missing at point of decision (photo-dependent; the strongest ground when real)
2. **Procedural error** — wrong plate/location/time on the notice, issued outside rules, meter fault (the notice's own text is the evidence)
3. **The situation exempted you** — loading, medical emergency, breakdown, valid permit not visible through no fault (documentation-dependent)
4. **Mitigation + first-offence discretion** — no legal ground, but clean record + genuine circumstance + polite request for discretion; explicitly a request, not an argument (issuers grant more of these than people expect — but only to letters that don't pretend it's ground 1-3)

## Output Format

1. **The honesty gate first** — one short paragraph: which ground applies, its realistic strength (strong / arguable / discretion-only / none), and if none: "pay it; here's why fighting costs more."
2. **The letter** — ≤250 words: reference numbers up top, ground stated in sentence one, facts in neutral past tense, evidence enumerated ("Photo A shows…"), the specific request (cancel / reduce to warning), deadline-respecting close. No adjectives about the issuer.
3. **Evidence checklist** — exactly what to photograph or attach for the chosen ground, and what's missing that would upgrade the case.
4. **The realistic note** — what happens next (timeline, escalation tier if refused) and whether escalation is worth it at this fine size.

## Quality Checks

- [ ] Exactly one primary ground, stated in the first sentence — letters that argue three grounds signal none is strong
- [ ] Every factual claim is attachable-evidence-backed or clearly framed as the appellant's account
- [ ] Zero emotional language survives — the tone test is "written by a calm lawyer with a train to catch"
- [ ] The honesty gate is present even when the letter is written — strength stated, not implied
- [ ] Reference number, date, and deadline appear correctly and the request is specific

## Anti-Patterns

- [ ] Do not fabricate or shade circumstances — beyond ethics, issuers cross-check timestamps and records, and a caught embellishment kills a real ground
- [ ] Do not write the indignation draft "to feel heard" — this skill produces the version that wins, not the version that vents
- [ ] Do not bury the ground under narrative — officers triage in the first sentence
- [ ] Do not promise outcomes — likelihood language stays calibrated ("this ground succeeds regularly when photographed clearly")
- [ ] Do not encourage appealing a fair fine on volume tactics — the honesty gate exists precisely for this
