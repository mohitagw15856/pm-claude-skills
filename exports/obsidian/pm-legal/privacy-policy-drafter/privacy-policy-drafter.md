---
aliases: ["Privacy Policy Drafter"]
tags: [pm-skills, skill]
skill: privacy-policy-drafter
description: "Draft a clear, plain-language privacy policy tailored to what a product actually collects and does with data. Use when asked to write a privacy policy, draft a data-protection notice, or create a GDPR/CCPA-aware privacy statement. Produces a structured policy covering data collected, purposes, legal bases, sharing, retention, user rights, and contact — written to be readable, not boilerplate. Not legal advice; have counsel review before publishing."
---

# Privacy Policy Drafter Skill

A privacy policy should tell users plainly what you collect, why, and what control they have — not hide it in legalese. This skill drafts a structured, regulation-aware policy from how the product actually handles data. **Not legal advice — a qualified lawyer should review before you publish, and obligations vary by jurisdiction.**

## Working from a brief

Given a product description, **draft the full policy anyway**, inferring typical data flows and marking each inference *(confirm — reflects assumed practice)*. Never leave "[company name]"-style gaps un-flagged, and never state a practice the founder didn't confirm as fact without labelling it an assumption.

## Required Inputs

Ask for (if not already provided):
- **Product / company** and what it does
- **Data collected** (account info, usage/analytics, payment, location, cookies, etc.)
- **Why** it's collected and **who it's shared with** (processors, analytics, payment, ads)
- **Jurisdictions / regulations** in scope (GDPR, UK GDPR, CCPA/CPRA, others)
- **Contact** for privacy requests and whether there's a DPO

## Output Format

A ready-to-review policy with these sections:
1. **Who we are & scope** — controller identity, what the policy covers, effective date
2. **Information we collect** — categorised (provided / automatic / from third parties), each with examples
3. **How and why we use it** — purposes, with **legal bases** where GDPR applies (consent, contract, legitimate interest…)
4. **Cookies & tracking** — types used and how to control them (link to a cookie notice if separate)
5. **Sharing & disclosure** — processors and third parties, why, and cross-border transfer note
6. **Retention** — how long, and the criteria for deciding
7. **Your rights** — access, deletion, correction, portability, objection, opt-out of sale/sharing; how to exercise them
8. **Security** — high-level measures (no false guarantees)
9. **Children** — whether the service targets/permits minors
10. **Changes & contact** — how updates are notified; the privacy contact / DPO

End with: **⚠️ Review checklist** — the specific items counsel must confirm (legal bases, retention periods, transfer mechanism, sub-processor list).

## Quality Checks

- [ ] Each data category ties to a stated purpose (and legal basis where GDPR applies)
- [ ] User rights and how to exercise them are explicit
- [ ] Retention is addressed, not skipped
- [ ] Plain language — readable by a non-lawyer
- [ ] Assumptions flagged; "not legal advice — counsel must review" retained

## Anti-Patterns

- Generic boilerplate that doesn't match what the product does
- Claiming GDPR/CCPA compliance as a fact rather than reflecting practices
- Vague "we may share with third parties" with no categories or purpose
- Overpromising security ("your data is 100% safe")

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
