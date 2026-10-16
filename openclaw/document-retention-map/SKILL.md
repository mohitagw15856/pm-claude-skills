---
name: document-retention-map
description: "Decide what documents to keep, for how long, and where — the personal/small-biz retention map by category (tax, legal, medical, warranties, employment), jurisdiction-flagged periods, and the destruction discipline for what's past its date. Use when asked how long do I keep tax documents, can I shred this, set up a document retention system, or what papers does my small business need to keep. Produces the category map with keep-periods (flagged verify-locally), the keep-forever list, the digitize rules, and the annual purge ritual."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/document-retention-map.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Document Retention Map Skill

Households and small businesses keep documents by anxiety — everything, forever, in boxes — or by accident — nothing, discovered at audit time. Retention is actually a small map: a dozen categories, each with a keep-period driven by *who could ask for it and for how long* (tax authorities, courts, insurers, warranty desks), a short keep-forever list, and a destruction discipline for everything past its date — because keeping expired documents isn't safety, it's liability plus clutter. Periods are jurisdiction-specific; the map states category logic and flags every number verify-locally.

## What This Skill Produces

- **The retention map** — categories × keep-periods × storage location, jurisdiction-flagged throughout
- **The keep-forever list** — the short set where the answer never expires
- **The digitize rules** — what a scan fully replaces, what needs the paper original, and the scan-filing route
- **The purge ritual** — the annual pass that destroys (shreds, not bins) what's aged out

## Required Inputs

Ask for these if not provided:
- **The scope** — personal household, freelancer, or small business (business adds employment, corporate, and customer-data categories with their own clocks)
- **Jurisdiction, loosely** — retention periods are set by local tax law, statutes of limitations, and industry rules; every stated period is a common-pattern placeholder flagged for local verification
- **The current state** — boxes? A scanner backlog? Already digital? The rollout starts from reality
- **Special categories** — property owned, ongoing disputes, professional licensing — each extends specific clocks

## Framework: The Map Rules

1. **The keep-period follows the asker:** tax documents live as long as the tax authority can audit (commonly 3–7 years — verify locally); contracts as long as claims can arise (limitation periods — verify); warranties until expiry + a season; medical records effectively long-term; pay stubs until the year's summary reconciles. Category by category, the question is "who could demand this, until when?"
2. **The keep-forever list is short and sacred:** birth/marriage/citizenship documents, property deeds and major-purchase records (they set cost-basis until sold + audit window), wills and estate documents ([beneficiary-audit](../beneficiary-audit/SKILL.md) territory), pension/retirement grants, and records of anything still owned or still insurable.
3. **Scans replace most paper — not all:** most tax and financial records digitize fully (many authorities accept digital — verify); the paper-original set is small (notarized/sealed documents, some titles, wills in many places — verify locally). Rule: scan everything, keep paper only for the original-required list, file scans by the [folder-structure-designer](../folder-structure-designer/SKILL.md) + [filename-convention](../filename-convention/SKILL.md) rules with backup.
4. **Destruction is part of retention:** expired documents with identity/financial data get *shredded* — the bin is how retention discipline becomes identity-theft surface. The map's purge column says shred/delete, and digital purge includes the backup copies.
5. **The annual ritual keeps it a system:** one calendared hour a year — new documents filed, aged-out categories purged, the keep-forever box verified present. Retention without the ritual regresses to the anxiety boxes within two years.

## Output Format

# Retention Map: [scope] — [jurisdiction, for verification]

## The Map
| Category | Keep for (verify locally) | Why (who can ask) | Form (scan ok / paper original) | Purge method |
|---|---|---|---|---|

## Keep Forever
[The short list, with locations — and the fireproof/safe-deposit note for the irreplaceables]

## Digitize Rules
[Scan-everything default · the paper-original list · filing + backup route]

## The Annual Hour
[Calendared: file, purge (shred), verify the forever-box]

> Retention periods are set by local tax law, limitation statutes, and industry rules — every period above is a common pattern to verify with a local accountant or authority, not a citation. Not legal or tax advice.

## Quality Checks

- [ ] Every period carries its who-can-ask logic and the verify-locally flag
- [ ] The keep-forever list is present and short
- [ ] Paper-original requirements are distinguished from scan-sufficient, both flagged
- [ ] Purge methods specify shredding for identity-bearing paper
- [ ] The annual ritual is calendared with its three moves

## Anti-Patterns

- [ ] Do not state retention periods as legal fact — category logic + local verification, always
- [ ] Do not keep everything forever — expired identity-bearing paper is risk, not safety
- [ ] Do not bin what should shred — retention discipline includes the exit
- [ ] Do not let the scanner backlog block the system — forward-filing starts today; the backlog drains opportunistically
- [ ] Do not skip the ongoing-dispute check — active disputes freeze every related clock, and the map must say so

## Example Trigger Phrases

- "How long do I keep tax documents?"
- "Can I shred this?"
- "Set up a document retention system."
- "What papers does my small business need to keep?"
