---
name: decision-memo
description: "Write a crisp decision memo that drives a clear decision, not a discussion. Use when asked to write a decision memo, a recommendation memo, a one/six-pager for a decision, or to get leadership to decide something. Produces a decision memo — the decision & recommendation up front, the context, options with trade-offs, what you'd need to believe, risks, and the explicit ask with a deadline."
---

# Decision Memo Skill

A decision memo exists to get a decision made — fast, on the record, by the right person. The failure
mode is a memo that reads like a discussion: lots of context, no recommendation, no ask. This skill
front-loads the recommendation and the decision being requested, then *supports* it — so the reader can
say yes, no, or "here's my concern" in five minutes.

> **Not quite this?** Use `async-decision-memo` when the decision will be made asynchronously, with a read window, comments and a deadline.

## Required Inputs

Ask for these only if they aren't already provided:

- **The decision** — the specific choice to be made (phrase it as a question with a yes/no or A/B/C answer).
- **The recommendation** — your actual recommendation (a memo without one is a status update).
- **The options** considered and their trade-offs.
- **The decider & deadline** — who owns this call and by when.

## Output Format

### Decision Memo: [the decision]
**To:** [decider] · **From:** [you] · **Date:** [date] · **Decision needed by:** [date]

**1. Recommendation (TL;DR)** — the recommendation in 2–3 sentences, *first*. What you want them to approve, and the one-line why.

**2. The decision** — the question being decided, framed so the answer is a clear choice.

**3. Context** — the minimum background needed to evaluate it (link the rest). Why this is on the table now.

**4. Options & trade-offs** — a table; be fair to the options you're not recommending (a stacked deck reads as one):

| Option | Pros | Cons | Cost / effort |
|---|---|---|---|

**5. Why this recommendation** — the reasoning, and **what you'd have to believe** for it to be wrong (the assumptions it rests on).

**6. Risks & mitigations** — the real downsides and how you'd handle them. A reversible decision deserves less agonising than an irreversible one — say which it is.

**7. The ask** — exactly what you need from the reader: approve / pick an option / give input — by the deadline.

## Quality Checks

- [ ] The recommendation is in the first paragraph, not the conclusion
- [ ] The decision is framed as a clear question with a finite set of answers
- [ ] Options not recommended are presented fairly, with real pros
- [ ] The memo states what would have to be true for the recommendation to be wrong
- [ ] It says whether the decision is reversible (one-way vs. two-way door)
- [ ] There is an explicit ask and a decision deadline

## Anti-Patterns

- [ ] Do not bury the recommendation at the end — the reader should know what you want in the first 30 seconds
- [ ] Do not write a status update disguised as a decision memo — if there's no decision and no ask, it's not this document
- [ ] Do not stack the options — strawman alternatives destroy your credibility and the decision's quality
- [ ] Do not over-agonise a reversible decision — match the rigor to the cost of being wrong
- [ ] Do not hide the assumptions — surfacing "what we'd need to believe" is what lets a decider pressure-test it

## Based On

Narrative decision-memo practice (Amazon-style one/six-pagers; one-way vs. two-way door decisions).
