---
name: version-chaos-untangler
description: "Untangle a document that exists in six copies across email, drives, and desktops — establish the canonical version defensibly, merge the divergent edits, and install the single-source rule that prevents the rematch. Use when asked which version is the real one, merge these document copies, we've been editing different files, or stop the version chaos on this doc. Produces the version census with the canonical verdict, the divergence merge plan, the announce-and-redirect step, and the single-source going-forward rules."
---

# Version Chaos Untangler Skill

Six copies of the contract: email attachments, two drives, someone's desktop, one renamed `-final-JT-edits`. Two have diverged — different edits on a shared ancestor — and the team is now editing in parallel universes. Untangling is forensic then structural: census every copy (where, modified-when, by-whom), establish the canonical *defensibly* (newest is not automatically rightest), merge what diverged, then kill the conditions — one home, links-not-attachments, and platform version history doing what filename suffixes failed to do.

## What This Skill Produces

- **The version census** — every known copy: location, modified date, editor, size/diff signals
- **The canonical verdict** — which version wins and *why* (the lineage argument, not just the timestamp)
- **The merge plan** — the divergent edits reconciled, with the who-confirms list for judgment conflicts
- **The single-source install** — one home, the redirect of every old copy, and the links-only norm

## Required Inputs

Ask for these if not provided:
- **The copies** — everywhere it lives (search email attachments by filename, both drives, ask the usual suspects); the census is only as good as the hunt
- **The stakes** — a contract mid-negotiation and a team doc carry different merge rigor; legal-adjacent docs get the careful version
- **The editors** — who touched it recently; diverged edits need their authors for the judgment calls
- **The platform reality** — where the canonical *should* live (the versioned platform — cloud doc or drive with history — not email, not desktops)

## Framework: The Untangle Rules

1. **Census before choosing:** list every copy with modified-date and editor before any verdict — the loudest "mine is latest" claim is wrong often enough that the census is not optional. Email attachments are copies-at-a-timestamp, and every send forked the universe.
2. **Canonical is lineage, not timestamp:** the winner is the copy containing the most confirmed-wanted edits — usually but not always the newest. The tell for divergence: two copies both modified after their common ancestor. When found, neither is canonical yet; the *merge output* is.
3. **Merge by diff, confirm by author:** compare divergent copies section-by-section (platform compare tools where they exist); mechanical differences merge directly, judgment conflicts (two different edits to the same clause) go to their authors by name. The merge doc lists every judgment call and who confirmed it — for legal-adjacent docs, that list is the audit trail.
4. **Kill the old copies loudly:** every non-canonical copy gets replaced by a pointer ("moved — canonical lives here: [link]") or deleted where possible, and the announcement names the one true home. Silent canonicalization loses to the first person who edits their bookmarked copy.
5. **The prevention is structural:** the doc lives on a versioned platform (history replaces suffix-naming) · **links, never attachments** (an attachment is a fork) · the filename loses its version theater per [filename-convention](../filename-convention/SKILL.md) · and mid-negotiation external docs get one named copy-holder who alone sends/receives versions.

## Output Format

# Version Untangle: [document]

## The Census
| Copy | Location | Modified | Editor | Signals |
|---|---|---|---|---|

## The Verdict
[Canonical: which and the lineage why · divergence found: yes/no · if yes: the merge is the canonical]

## The Merge (if diverged)
[Section-level reconciliation · judgment calls × confirming author · the audit-trail note for legal docs]

## The Install
[The one home (versioned platform) · pointers placed over old copies · the announcement line · links-only norm + the external copy-holder rule if applicable]

## Quality Checks

- [ ] Every findable copy is in the census before any verdict
- [ ] The canonical argument is lineage-based, not timestamp-only
- [ ] Divergent judgment calls were confirmed by their authors, listed
- [ ] Every old copy now points to the canonical or is gone
- [ ] The doc's new home has version history — the suffix era is over for this file

## Anti-Patterns

- [ ] Do not crown the newest by default — the newest fork of the wrong branch is still wrong
- [ ] Do not merge judgment conflicts by taste — authors confirm their own clauses
- [ ] Do not canonicalize silently — unannounced truth loses to bookmarked habit
- [ ] Do not leave the winner on a desktop or in a thread — un-versioned homes restart the chaos
- [ ] Do not send attachments of the untangled doc — every attachment is the sequel's opening scene

## Example Trigger Phrases

- "Which version is the real one?"
- "Merge these document copies."
- "Stop the version chaos on this doc."
