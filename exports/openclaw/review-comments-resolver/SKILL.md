---
name: review-comments-resolver
description: "Resolve a document's forty review comments systematically — triage by type (accept, push back, conflict, out-of-scope), batch the mechanical fixes, draft the disagreement replies, and reconcile reviewers who contradict each other. Use when asked work through these review comments, two reviewers want opposite things, close out the feedback on this doc, or which comments do I actually have to take. Produces the comment triage, the batched fixes, the push-back replies, the conflict reconciliations, and the closure sweep."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/review-comments-resolver.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Review Comments Resolver Skill

A document with forty comments induces either capitulation (accept-all, the doc becomes committee mush) or avoidance (the comments age until the doc ships around them). Resolution is triage: most comments are mechanical (accept in batch, thank in aggregate), some are substantive-and-right (accept with the change named), some deserve push-back (drafted politely, decided by the doc's owner), and a few *contradict each other* — those aren't the author's to split; they get reconciled by naming the conflict to its parties. Every comment ends closed, and the doc stays the author's.

## What This Skill Produces

- **The triage table** — every comment sorted: accept-mechanical / accept-substantive / push-back / conflict / out-of-scope
- **The batch plan** — mechanical fixes applied in one pass, resolved with one courtesy note
- **The push-back replies** — drafted: the reviewer's point honored, the decision explained, the owner's call made
- **The conflict reconciliations** — contradicting reviewers named to each other with the author's recommendation
- **The closure sweep** — nothing left dangling; the resolved-vs-declined summary if the doc's approver wants it

## Required Inputs

Ask for these if not provided:
- **The comments and the doc** — the actual comment set; triage reads them, not a summary of them
- **The authority map** — whose comments are directives (the approver), whose are advice (peers), whose are taste — the same words resolve differently by author; "consider rewording" from the VP and from a peer are different speech acts
- **The doc's non-negotiables** — what the author is defending (the recommendation, the scope, the tone) — push-back needs a spine to push from
- **The deadline** — a closing date makes "let's discuss" comments convert to decisions instead of orbit

## Framework: The Resolution Rules

1. **Triage before touching:** read all comments first, sort into the five bins — resolving in document-order mixes typo fixes with strategy debates and exhausts the author by page three. The bins get processed cheapest-first: mechanical batch, then substantive accepts, then push-backs, then conflicts.
2. **Mechanical means batch:** typos, clarity nits, formatting — apply all, resolve all, one aggregate thank-you. Individually replying "good catch!" forty times is a day lost to etiquette.
3. **Push-back is a reply, not a silence:** declining a comment requires saying so — "Kept as-is: the recommendation stays unhedged because [reason]; happy to discuss" — because silently-unaddressed comments return in the next review round with reinforcements. The author owns the call on advice-comments; directive-comments that the author disagrees with get escalated as a conversation, not quietly overridden.
4. **Conflicts get named, not averaged:** when reviewer A wants detail added and reviewer B wants the section cut, the author doesn't split the difference into mush — the conflict is surfaced ("A and B, you're asking for opposites here — my recommendation is B's cut because [header test]; A, does the appendix satisfy the need?") and decided once, on the record.
5. **The sweep closes everything:** every comment ends in resolved / replied / escalated — a doc with lingering open comments reads as contested, and approvers notice. The closing summary ("38 taken, 4 declined with reasons, 2 conflicts resolved with A/B") converts the review round into a credibility artifact.

## Output Format

# Comment Resolution: [doc] — [N] comments

## The Triage
| # | Comment (gist) | From | Bin | Action |
|---|---|---|---|---|

## Batch Pass
[The mechanical list → applied · the aggregate note]

## Push-Backs (drafted)
[Per comment: the honor-then-decide reply, verbatim]

## Conflicts (reconciled)
[Per pair: the naming message + the author's recommendation]

## The Sweep
[All closed · the summary line for the approver]

## Quality Checks

- [ ] Every comment landed in exactly one bin before any fix was made
- [ ] The authority map informed the bins — directives and advice resolved differently
- [ ] Every decline has a stated reason in a reply
- [ ] No conflict was averaged into mush — each was named and decided
- [ ] Zero comments remain open at the end

## Anti-Patterns

- [ ] Do not accept-all — forty reviewers produce committee prose; the author is the editor
- [ ] Do not resolve in page order — bins first, or the strategy debates drown in typo fixes
- [ ] Do not decline silently — unaddressed comments respawn with allies
- [ ] Do not split contradictory feedback down the middle — mush satisfies neither reviewer and weakens the doc
- [ ] Do not leave "let's discuss" comments orbiting — the deadline converts them to decisions

## Example Trigger Phrases

- "Work through these review comments."
- "Close out the feedback on this doc."
- "Which comments do I actually have to take?"
