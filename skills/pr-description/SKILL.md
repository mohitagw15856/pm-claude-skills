---
name: pr-description
description: "Write a clear pull-request description that gets reviewed fast and merged with confidence. Use when opening a PR, summarizing a change for review, or asked to write a PR/merge-request description. Produces a structured PR: what changed and why, how it was tested, risk and rollout, and a focused reviewer guide — so the reviewer understands intent before reading a single diff line."
---

# PR Description Skill

A good PR description is a gift to the reviewer: it explains *intent* before they read the diff, so review is
fast and confident. This skill turns a change into a structured PR write-up — what and why, how it was tested,
the risk, and where to focus — the difference between a one-pass approval and three rounds of confused
back-and-forth.

## Required Inputs

Ask for these only if they aren't already provided:

- **The change** — what was done (the diff summary, commits, or a description).
- **The why** — the problem/issue it solves (link the ticket).
- **Testing** — how it was verified (tests added, manual steps, edge cases checked).
- **Risk & rollout** — blast radius, migrations, flags, backward compatibility, how to roll back.

## Output Format

### [Concise, imperative PR title] (e.g. "Add rate limiting to the login endpoint")

**What & why** — 2–4 sentences: the problem and what this change does about it. Link the issue (`Closes #123`).

**Changes** — the key changes as bullets (the substantive ones, not every file). Group if large.

**How it was tested** — tests added/updated, and the manual verification + edge cases checked. Be specific enough that the reviewer trusts it works.

**Risk & rollout** — blast radius, any migration/flag/config, backward-compatibility notes, and how to roll back if it goes wrong. Say "low risk, no migration" if so.

**Reviewer guide** — where to start, what to scrutinize, anything intentionally out of scope or deferred (with a follow-up note). Call out anything you're unsure about and want eyes on.

**Screenshots / output** (if UI or user-facing) — before/after.

Keep it proportional — a one-line fix gets a short description; a big change earns the full structure.

## Quality Checks

- [ ] Title is concise and imperative; the why and linked issue are clear up front
- [ ] Changes summarize intent, not a file-by-file dump
- [ ] Testing is specific (what was run, which edge cases) — not "tested locally"
- [ ] Risk, rollout, and rollback are addressed (even if "low risk, none")
- [ ] A reviewer guide points to where to focus and flags anything uncertain
- [ ] Length is proportional to the size of the change

## Anti-Patterns

- [ ] Do not just paste the commit list — explain intent the diff can't convey
- [ ] Do not say "tested" without saying how — give the reviewer something to trust
- [ ] Do not hide risk or migrations — surface them so they're reviewed deliberately
- [ ] Do not write a novel for a one-line change — match effort to size
- [ ] Do not omit the "what to focus on" — undirected review is slow review

## Based On

Code-review and PR best practices (explain intent, make review easy, surface risk) — modern engineering norms.
