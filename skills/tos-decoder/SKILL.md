---
name: tos-decoder
description: "Decode a terms of service or privacy policy into what you're actually agreeing to, ranked by real-world impact. Use when someone asks 'what am I agreeing to', 'decode this privacy policy', 'is this ToS bad', or 'should I click accept'. Produces a ranked findings table with a 'should I care?' verdict per finding, covering data resale, arbitration and class-action waivers, unilateral changes, content licenses, and what deletion really means."
---

# ToS Decoder Skill

Nobody reads the terms — that's the business model. This skill reads them and answers the only
question that matters per clause: *should you actually care?* Most of a ToS is defensive
boilerplate; the value is finding the three clauses that aren't.

## What This Skill Produces

- Findings ranked by real-world impact, not document order
- A plain-English "what you're agreeing to" per finding, with a "should I care?" verdict
- The accept / accept-with-eyes-open / avoid bottom line
- What you can actually do about the bad parts (settings, opt-outs, alternatives)

## Required Inputs

Ask for these only if they aren't already provided:

- **The ToS / privacy policy text** — pasted in full or in sections. With excerpts, decode what's there and list which high-impact topics (arbitration, data sharing, licenses, deletion) are missing from what was shared.
- **What the service is** and how they'll use it (casually vs. for business, uploading original work, storing sensitive data).
- **What they're most worried about**, if anything specific.

## Framework: Severity Scale

Rank findings by what happens to a real person, worst first:

- 🔴 **Can cost you real money or rights** — binding arbitration + class-action waiver (you can't join a lawsuit when things go wrong), sale or sharing of personal data with third parties/brokers, broad perpetual licenses to your content (especially sublicensable/for AI training), unilateral-change clauses with "continued use = consent," account termination with forfeiture of paid balances or content.
- 🟡 **Unusual — know before you click** — "deletion" that's really deactivation or excludes backups, auto-renewal with hard cancellation, data retention after account closure, jurisdiction/venue far from home, feedback-becomes-ours clauses.
- 🟢 **Standard boilerplate** — warranty disclaimers, liability caps, acceptable-use rules; name them so the reader can stop worrying about them.

For each 🔴/🟡 finding, write a one-line **"Should I care?"** verdict tuned to *this user's* stated use — e.g. "Yes if you upload original work; ignore if you're just lurking." Check specifically: data collected vs. shared vs. sold; the exact scope of any content license (perpetual? sublicensable? survives deletion?); how disputes must be resolved; how terms can change; what deletion actually deletes.

## Output Format

### ToS Decode: [service name]

**1. Bottom line** — accept / accept with eyes open / avoid, in two sentences, plus the single worst clause.

**2. Findings, ranked by impact**

| # | What you're agreeing to (plain English) | Where (quoted line/section) | Severity | Should I care? |
|---|---|---|---|---|

**3. The deletion reality** — what "delete my account/data" actually does, per the text.

**4. What you can do** — opt-outs, settings, arbitration opt-out windows if the text offers one, and what's simply take-it-or-leave-it.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Findings are ranked by real-world impact, not by the document's own order
- [ ] Every 🔴/🟡 finding quotes the actual clause text or section number
- [ ] Every finding gets a "should I care?" verdict tied to the user's stated use
- [ ] Standard boilerplate is labelled 🟢 explicitly — reassurance is part of the product
- [ ] High-impact topics absent from the provided text are listed as unreviewed, not assumed fine
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not invent clauses that aren't in the document — decode only the provided text
- [ ] Do not soften a red flag to seem balanced — "everyone does this" doesn't make it harmless
- [ ] Do not present jurisdiction-dependent rules (privacy rights, arbitration limits) as universal
- [ ] Do not perform outrage at ordinary boilerplate — crying wolf buries the real findings
- [ ] Do not skip the verdict — a list of clauses without "should I care?" is just a shorter ToS

## Based On

Consumer-contract review practice — impact-ranked clause triage, license-scope reading, dispute-clause analysis.
