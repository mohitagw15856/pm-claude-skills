---
name: citation-hygiene
description: "Keep citations honest in business documents — every load-bearing claim sourced, links that actually contain the claim, the as-of dates that keep numbers honest, and the internal-vs-external sourcing rules for decks and memos. Use when asked check the sourcing in this deck, add citations to this doc, our slide says 'studies show' — which studies, or set citation norms for the team. Produces the claim-by-claim audit, the fixes (source found, claim softened, or cut), the citation format for the venue, and the team norm card."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/citation-hygiene.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Citation Hygiene Skill

Business documents run on unsourced confidence: "studies show," "industry-standard," the market-size number nobody can trace, the chart with no as-of date. Each unsourced load-bearing claim is a small loan against credibility — called in the moment a skeptic asks "says who?" in front of the room. Citation hygiene is not academia: it's the practical discipline that every claim someone might *challenge or act on* carries its source, the link actually contains the claim (the classic drive-by cite doesn't), numbers wear their dates, and claims that can't be sourced get softened or cut *before* the meeting does it for you.

## What This Skill Produces

- **The claim audit** — the doc's load-bearing claims listed, each: sourced / sourceable / soften / cut
- **The fixes** — sources attached (verified to contain the claim — the [source-triangulation](../source-triangulation/SKILL.md) quick check), softenings drafted, the cut list
- **The venue format** — how citations look here: footnotes for memos, the source line for slides, links for docs
- **The norm card** — the team's three citation rules, postable

## Required Inputs

Ask for these if not provided:
- **The document** — and its stakes/venue (the board deck's bar differs from the team memo's; both have one)
- **Which claims are load-bearing** — the ones decisions or credibility rest on; hygiene triages (sourcing every sentence is academia cosplay — sourcing none is the current problem)
- **The available sources** — where the numbers came from (the analyst's model? a report? memory?) — "memory" is an honest answer that routes to softening
- **Internal-data provenance** — for internal numbers: which system, what query, as of when — internal claims need internal citations too ("revenue dashboard, July 15" beats "our data shows")

## Framework: The Hygiene Rules

1. **Triage by load-bearing:** the claims that carry the recommendation, the sizing, or the urgency get the audit; connective prose doesn't. The test: if challenged in the room, would the author need to defend it? Then it needs its source *now*, cheaply, instead of live, expensively.
2. **The link must contain the claim:** the drive-by cite — a link that discusses the topic but never states the number — is the most common citation fraud, usually accidental (the chain of paraphrase drifted). The verify step: open the source, find the sentence. Absent, the claim inherits the source's actual wording or loses the cite.
3. **Numbers wear dates and denominators:** "as of Q2 2026" on every market figure and internal metric ("40% growth" — of what, since when?); an undated number in a living deck becomes silently false on schedule. Internal numbers cite system + date ("CRM export, Jul 15") so the inevitable "that doesn't match my dashboard" resolves in seconds.
4. **Unsourceable claims soften or die:** the options, in order — find the source · soften to earned confidence ("we believe, based on [basis]" / "directionally," per the triangulation phrasing rules) · attribute honestly ("our estimate") · cut. What never survives: the bare assertion whose defense is hope.
5. **Venue formats keep it light:** slides get the small source line (source, date) per chart/claim · memos get footnotes or inline links · docs get links. The norm card is three lines: *load-bearing claims carry sources · numbers carry dates · "studies show" is banned without the study* — light enough to enforce, sharp enough to matter.

## Output Format

# Citation Audit: [document] — [N] load-bearing claims

## The Audit
| Claim | Status | Fix |
|---|---|---|
[Sourced ✓ (verified-contains) / softened to: "…" / internal-cited / cut]

## The Fixes Applied
[Sources attached in venue format · the softened phrasings · the cut list with the credibility logic]

## The Venue Format
[The citation style for this document type, shown]

## The Norm Card (post this)
[The three rules · the banned phrase list ("studies show", "industry-standard" unaccompanied)]

## Quality Checks

- [ ] Load-bearing claims were triaged from connective prose
- [ ] Every attached source was opened and verified to contain the claim
- [ ] Every number carries its date (and internal numbers their system)
- [ ] Unsourceable claims were softened or cut, never left bare
- [ ] The format matches the venue and stays light

## Anti-Patterns

- [ ] Do not cite everything — academia cosplay buries the load-bearing sources in noise
- [ ] Do not link topics — the link contains the claim or it's decoration
- [ ] Do not ship undated numbers — they're scheduled falsehoods
- [ ] Do not let "studies show" survive without the studies — it's the tell the whole audit exists for
- [ ] Do not defend unsourceable claims by intensity — soften, attribute, or cut; the room's skeptic is faster than you

## Example Trigger Phrases

- "Check the sourcing in this deck."
- "Does every claim in this memo have a source?"
- "Do these links actually say what we claim?"
- "Set citation norms for the team."
