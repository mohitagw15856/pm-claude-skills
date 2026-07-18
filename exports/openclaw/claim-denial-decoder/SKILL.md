---
name: claim-denial-decoder
description: "Decode an insurance claim denial letter — what the cited reason actually means, whether it's commonly overturnable, and the appeal letter that answers it point by point. Use when someone asks 'my insurance claim was denied what do I do', 'decode this denial letter', 'can I appeal this denial', or 'write my insurance appeal'. Produces the denial decode with overturn-likelihood framing, the evidence checklist, the point-by-point appeal letter, and the escalation ladder past the insurer."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/claim-denial-decoder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Claim Denial Decoder Skill

Denial letters are written to end conversations; appeals exist because they often shouldn't. A meaningful share of denials — especially coding errors, "not medically necessary," and documentation gaps — get overturned when someone answers the *stated reason* with evidence instead of outrage. This skill decodes what the denial actually claims, matches each claim to the evidence that answers it, and writes the appeal that reads like it was drafted by someone who will escalate.

## What This Skill Produces

- The denial decoded: the cited reason in plain language, and what that reason-type means for appeal odds
- An evidence checklist matched to the denial type — what to gather before writing
- The appeal letter — point-by-point, document-cited, deadline-aware
- The escalation ladder — internal appeal levels, external/independent review, regulator complaint — in order

## Required Inputs

Ask for these only if they aren't already provided:

- **The denial letter text** — the cited reason codes/language, and the stated appeal deadline. No letter yet? First move is requesting the denial in writing with the specific policy basis.
- **The claim story** — what was claimed, when, the loss or treatment, and any prior authorizations or adjuster interactions.
- **The policy language** if available — the appeal's strongest sentences quote the policy against the denial.
- **What's already been sent** — and what the insurer claims it never received (the classic).

## Framework: Severity Scale

Read the denial's cited reason and classify it:

- 🔴 **Commonly answerable — appeal with evidence** — "not medically necessary" (answered by treating-physician letter + records + guidelines), coding/billing errors (answered by corrected codes from the provider), "documentation not received" (answered by re-sending with proof of delivery), "pre-existing condition" or "prior damage" assertions without evidence (answered by dated records), lowball valuations (answered by independent estimates — a dispute, not a denial, and the letter should reframe it as such).
- 🟡 **Harder but contestable** — "experimental/investigational" treatments (guidelines and peer-reviewed support needed), late filing with good cause, exclusion interpretations where the policy language is ambiguous (ambiguity is generally read against the drafter — flag as jurisdiction-dependent, worth the fight).
- 🟢 **Likely solid denials** — clearly excluded perils/treatments, coverage lapsed at date of loss, claims outside policy period; say so honestly — a hopeless appeal costs the deadline for options that might work (negotiation, payment plans, other coverage).

The appeal's structure is always the same: **restate the denial's exact words → answer that reason specifically with attached evidence → quote the policy language that supports coverage → request the specific action → name the deadline you're inside and the next step you'll take if unanswered.** Never argue reasons the letter didn't cite — it teaches them new denial grounds.

## Output Format

### Denial Decode & Appeal: [claim #, insurer]

**1. The decode** — the cited reason in plain English, its type, and honest appeal-odds framing (answerable / contestable / likely solid).

**2. Evidence checklist**

| Denial assertion | Evidence that answers it | Where to get it | Status |
|---|---|---|---|

**3. The appeal letter** — full text, ready to send: claim details header · "your letter of [date] states: '[quoted]'" · point-by-point response with enclosure references · policy language quoted · the specific request · sent-by-trackable-means note.

**4. Escalation ladder** — internal appeal level(s) with deadlines → external/independent review rights (jurisdiction- and plan-dependent — check the denial letter's own rights section) → regulator complaint → the demand-letter/counsel threshold.

**5. Deadlines box** — every date that matters, from the letter and the policy.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] The appeal answers the denial's exact cited words, quoted back
- [ ] Every assertion in the appeal points to an attached document
- [ ] Appeal-odds framing is honest — hopeless denials are named as such with the alternative path
- [ ] The escalation ladder notes which rungs are jurisdiction/plan-dependent
- [ ] All deadlines extracted into one box, with the send-date recommendation inside them
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not write an outrage letter — adjusters route anger to the bottom of the pile; evidence moves files
- [ ] Do not argue grounds the denial didn't cite — answer what was asserted, nothing more
- [ ] Do not promise overturn odds as percentages — frame as reason-type patterns, not statistics
- [ ] Do not let the appeal miss its deadline while gathering perfect evidence — file adequate-and-on-time, supplement after
- [ ] Do not skip the reframe when it's a valuation dispute — "denied" and "lowballed" have different playbooks

## Based On

Policyholder appeal practice — denial-reason triage, evidence matching, point-by-point appeal drafting, escalation sequencing.
