---
name: design-doc-review
description: "Review a technical design document or RFC the way a careful senior reviewer would: restate what it proposes, test the problem statement, probe the alternatives, find the unhandled failure cases, and return comments ranked by how much they should block. Use when asked to review this design doc, give feedback on this RFC, what is missing from this spec, should we approve this design, or play a tough reviewer on this proposal. Produces a summary of the proposal, blocking and non-blocking comments with locations, open questions, and a recommendation."
---

# Design Doc Review Skill

A design review has one job: to catch the expensive mistake while it is still a paragraph. Reviews fail by going wide and shallow, with twenty comments on naming and none on the migration that cannot be rolled back. This skill reads for the decisions that are hard to reverse and ranks every comment by whether it should stop approval. To write the document in the first place, use `rfc-writer` or `technical-spec-template`.

> **Not quite this?** Use `figma-design-review` when the design is a visual one in Figma. Use `agent-design-review` when the design is an AI agent: its tools, permissions and autonomy.

## What This Skill Produces

- **The proposal restated** in a few sentences, so the author can confirm the reviewer understood it
- **Blocking comments**: issues that should be resolved before approval, each with location and a suggested resolution
- **Non-blocking comments**: improvements the author may take or leave
- **Open questions** that the document must answer but the reviewer cannot
- **A recommendation**: approve, approve with changes, or revise and re-review, with the reason

## Required Inputs

Ask for these if not provided:
- **The document** in full
- **The reviewer's stake**: which system or team the reviewer represents, since that sets what to look hardest at
- **The stage**: early sketch or final sign-off. Early drafts need direction, not line edits
- **Known constraints**: deadlines, compliance needs, systems that cannot change

Review only what the document says. Where the review depends on a fact about the existing system that is not in the document, ask, or mark the comment as an assumption.

## Framework: Read for the Irreversible

1. **Restate.** Summarise problem, proposal and scope. If this is hard, the first blocking comment is clarity.
2. **Test the problem.** Is there evidence the problem exists and matters? Is the stated goal measurable? Are non-goals written down?
3. **Probe the alternatives.** Is doing nothing considered? Is the simplest option considered and rejected for a stated reason? A document with one option is a decision already made.
4. **Find the one-way doors.** Data model changes, public interfaces, migrations, vendor lock-in, anything users will build on. These get the deepest reading.
5. **Walk the failure cases.** Partial failure, retries, duplicate delivery, ordering, timeouts, a dependency being down, a deploy halfway through. Ask what the user sees in each.
6. **Check the operations.** Rollout and rollback plan, monitoring, alerting, capacity, cost, on-call impact, security and privacy review.
7. **Rank.** Blocking means approval would be a mistake without a change. Everything else is non-blocking and labelled as such. Praise what is good in one line so the author keeps it.

## Output Format

# Review: [document title]

**Recommendation:** [approve / approve with changes / revise and re-review] because [one sentence]

## What I Understood
[Problem, proposal, scope: three or four sentences]

## Blocking
| # | Section | Issue | Why it blocks | Suggested resolution |
|---|---------|-------|---------------|----------------------|

## Non-blocking
| # | Section | Comment |
|---|---------|---------|

## Open Questions
[Questions the document should answer]

## Assumptions I Made
[Facts about the current system assumed during review]

## Worth Keeping
[What the document does well]

## Quality Checks

- [ ] The restatement would be recognised by the author
- [ ] Every blocking comment says why it blocks and offers a way forward
- [ ] Irreversible decisions received the most attention
- [ ] At least the main failure paths were walked
- [ ] Comments on style are non-blocking
- [ ] Assumptions about the existing system are listed, not presented as fact

## Anti-Patterns

- [ ] Do not bury one blocking issue among twenty minor ones
- [ ] Do not redesign the system in the comments; say what is wrong and what a fix must satisfy
- [ ] Do not block on preference
- [ ] Do not approve a document with no rollback plan for a risky change
- [ ] Do not review a draft sketch as though it were a final spec

## Example Trigger Phrases

- "Review this design doc."
- "What is missing from this RFC?"
- "Play a tough reviewer on this proposal."
- "Should we approve this spec?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/design-doc-review.html

<!-- pm-claude-skills v84.1.0 | skill: design-doc-review | source: skills/design-doc-review/SKILL.md | sha256: 900602a9e1392a201bd04843d15cfa01f12638610140f14ce1e8e7751b2b0f29 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
