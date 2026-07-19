---
name: handbook-page
description: "Write the handbook page that ends the repeated explanation — the answer-shaped structure (task-first, context second), the ownership and freshness header, and the write-once-point-forever discipline that turns tribal knowledge into infrastructure. Use when asked document how we do X, write the wiki page for this process, I explain this every month, or make this knowledge survive me. Produces the page with task-first structure, the header block, the worked example, and the pointer habit."
---

# Handbook Page Skill

The handbook page is the highest-leverage document in team life: written once, it answers a question *forever* — but only if it's written answer-shaped. Most wiki pages are essay-shaped (history, context, philosophy, and eventually, maybe, the steps), while their readers arrive task-shaped ("how do I request access?"). The working page leads with the task, keeps context below the fold, carries the [doc-versioning-discipline](../doc-versioning-discipline/SKILL.md) header (owner, status, last-reviewed), includes one worked example — and then gets *used*: every repeat question gets answered with the link, because a handbook nobody points to is a diary.

## What This Skill Produces

- **The page** — task-first structure: the answer/steps up top, the context and edge cases below
- **The header block** — owner, status, last-reviewed — the trust signals
- **The worked example** — one realistic walkthrough, because examples teach what steps can't
- **The pointer habit** — the answer-with-the-link move that makes the page pay for itself

## Required Inputs

Ask for these if not provided:
- **The repeated question** — the actual thing people keep asking (verbatim asks beat topic descriptions — the [faq-builder](../faq-builder/SKILL.md) mining logic); pages written for imagined questions join the unread
- **The answer, from the explainer** — the current oral version, including the caveats and the "oh but if it's a contractor it's different" branches that live only in the explainer's head
- **The audience floor** — who arrives at this page and what they already know; the page assumes the floor and links the rest
- **Where the handbook lives** — and the naming/finding conventions there, so the page is discoverable by the words askers use

## Framework: The Page Rules

1. **Answer-shaped, not essay-shaped:** the reader's task is satisfied in the first screen — the steps, the link, the form, the decision table. History and rationale live below under "Background," read by the curious minority. The test: the modal reader leaves within ninety seconds, satisfied.
2. **Steps at do-this grain with branches explicit:** the oral version's "oh, unless…" branches become visible forks ([runbook-writer](../runbook-writer/SKILL.md) grain for anything procedural) — the page must beat asking-a-human, and humans handle branches; pages that don't send readers back to the human.
3. **The worked example is half the teaching:** one realistic case walked end-to-end ("requesting prod access for a new analyst: …") — readers pattern-match from examples faster than they parse instructions, and the example disambiguates everything the steps left abstract.
4. **The header makes it trustworthy:** owner (who answers when the page is wrong), status, last-reviewed — without these, readers who've been burned by stale wikis re-ask the human anyway, and the page's ROI dies. The owner's review is 5 minutes on the heartbeat cadence.
5. **The pointer habit is the payoff loop:** from publication day, every repeat ask gets "here you go: [link] — tell me if anything's unclear" — which (a) delivers the answer, (b) trains the link-first reflex, and (c) field-tests the page (every "the page didn't cover my case" is an edit, same day). Explaining orally *after* the page exists is paying twice for the same knowledge.

## Output Format

# [Page title = the question, in the asker's words]

*Owner: [name] · Status: active · Last reviewed: [date]*

## The Answer
[Steps/decision table/link — first screen, task-complete]

## Worked Example
[One realistic end-to-end case]

## Edge Cases & Branches
[The "unless…" forks, explicit]

## Background (for the curious)
[Why it works this way · history · related pages]

## Quality Checks

- [ ] The first screen completes the modal reader's task
- [ ] Branches from the oral version are visible forks, not omissions
- [ ] The worked example is realistic and end-to-end
- [ ] The header carries owner, status, and a real review date
- [ ] The pointer habit started on publication day — the next ask got the link

## Anti-Patterns

- [ ] Do not open with history — the reader is mid-task; context is the appendix
- [ ] Do not write the ideal process — document the real one, or the page and reality diverge and both lose trust
- [ ] Do not skip the example to save time — it's the half of the page that actually teaches
- [ ] Do not publish ownerless — orphan pages rot into the stale wiki that taught readers to re-ask humans
- [ ] Do not keep explaining orally — every post-page explanation is a vote against your own infrastructure
