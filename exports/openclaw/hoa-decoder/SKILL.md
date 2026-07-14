---
name: hoa-decoder
description: "Decode HOA covenants (CC&Rs) and the fee structure before you buy into them. Use when someone asks 'what do these HOA rules actually mean', 'decode these CC&Rs', 'is this HOA going to be a problem', or 'what should I check before buying in an HOA'. Produces a restriction decode ranked by lifestyle impact, special-assessment exposure analysis, enforcement and fine mechanics, and the exact records to request before buying."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/hoa-decoder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# HOA Decoder Skill

Buying into an HOA means joining a tiny government with taxing power over you. This skill reads
the CC&Rs like a friend who's sat through the board meetings: which rules will change how you
live, how big the surprise bills can get, and which records to demand first.

## What This Skill Produces

- Use restrictions decoded and ranked by lifestyle impact for this buyer
- Special-assessment exposure: what the board can levy, with what vote, capped by what
- Enforcement and fine mechanics — how a violation escalates, up to liens
- Rental-restriction decode, fee-escalation questions, and the records to request

## Required Inputs

Ask for these only if they aren't already provided:

- **The documents** — CC&Rs, bylaws, rules, fee/budget pages. Decode whatever is provided; reserve study, budget, and minutes usually aren't in the CC&Rs — flag them as records to request.
- **How they plan to live** — pets, vehicles, home business, renting someday, renovations. Ranking depends on this.
- **Current dues and any known assessments**, if not in the text.

## Framework: Severity Scale

- 🔴 **Can cost you real money** — uncapped or low-threshold special assessments, fines that compound and can ripen into liens (in some places foreclosure — jurisdiction-dependent), rental bans/caps that kill an investment plan, alteration approval with vague standards, uncapped dues increases, transfer fees.
- 🟡 **Unusual — probe before buying** — restrictions colliding with this buyer's stated plans (pets, vehicles, home business, decor), architectural review with no decision deadline, board power to amend rules without a member vote.
- 🟢 **Standard** — ordinary nuisance, trash, and common-area rules; label them so the buyer doesn't panic at boilerplate.

Walk the documents for: **use restrictions**, **assessment mechanics** (dues-increase caps; approval threshold; no stated cap = flag), **rental restrictions** (caps, waitlists, minimum terms, grandfathering), **enforcement chain** (notice → hearing → fine → lien; quote each step), **amendment rules** (how easily rules can change under you). Where enforceability is questionable, flag *"enforceability varies by jurisdiction — verify locally"* rather than declaring it void.

## Output Format

### HOA Decode: [community name]

**1. The verdict** — buy comfortably / buy with eyes open / this HOA will fight your lifestyle — in three sentences.

**2. Restrictions ranked by impact on you**

| Restriction (§) | What it says | How it hits your plans | Severity |
|---|---|---|---|

**3. 💸 Money exposure** — dues today, increase mechanics, special-assessment rules quoted, the realistic worst-case bill; fine schedule and lien path.

**4. 🚩 Red flags, ranked** — quoted language, the scenario where it bites, severity.

**5. Records to request before buying** — reserve study (and funding level), 24 months of board minutes, budget and delinquency rate, master insurance policy, pending/past special assessments and litigation, rental cap status and waitlist.

**6. Questions for the board/manager** — fee-escalation history ("dues for each of the last 5 years?"), upcoming major repairs, how often fines are actually levied.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Restrictions are ranked by this buyer's stated lifestyle, not document order
- [ ] Special-assessment mechanics are quoted; "no cap stated" is itself flagged 🔴
- [ ] The enforcement chain is traced step-by-step from the actual text
- [ ] The records-to-request list is concrete, with why each matters
- [ ] Documents not provided (reserve study, minutes, budget) are named as gaps
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not invent restrictions or powers that aren't in the documents
- [ ] Do not soften a red flag to seem balanced — an uncapped assessment power is a blank check
- [ ] Do not present jurisdiction-dependent rules (lien/foreclosure powers, enforceability) as universal
- [ ] Do not rank by how strict a rule sounds — rank by whether it touches this buyer's life
- [ ] Do not skip the financial-health questions — CC&Rs alone never show a broke HOA

## Based On

Buyer-side HOA due-diligence practice — CC&R triage, assessment-exposure analysis, records checklists.
