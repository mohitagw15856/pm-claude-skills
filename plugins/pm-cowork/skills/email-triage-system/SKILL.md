---
name: email-triage-system
description: "Turn an overflowing inbox into a four-verb system — archive, reply-now, task, or park — with the two-minute rule enforced and a daily cadence that survives busy weeks. Use when asked help me get to inbox zero, my email is out of control, build me an email triage system, or process this backlog. Produces the triage pass on the actual inbox, the four-verb rules, the folder/label minimal set, and the daily cadence."
---

# Email Triage System Skill

Inboxes overflow because every message gets the same treatment: opened, half-read, left "for later" — and later compounds. Triage replaces reading with *deciding*: every message gets exactly one of four verbs on first touch, the two-minute rule handles the small stuff instantly, and the system runs on a cadence measured in minutes per day, not heroic weekend purges.

## What This Skill Produces

- **The triage pass** — the current backlog sorted into the four verbs, oldest-first batches
- **The four-verb rules** — archive / reply-now / task / park, with the decision test for each
- **The minimal structure** — 3–4 labels maximum; folders are where email goes to die
- **The daily cadence** — two fixed windows, timeboxed, with the backlog-never-returns rule

## Required Inputs

Ask for these if not provided:
- **The inbox state** — count, oldest unread, and the honest description ("4,000, mostly newsletters" vs. "200, mostly real")
- **The role's email reality** — customer-facing (reply SLAs matter) vs. internal (batching is fine)
- **Past attempts** — what system died before and why; the new one must not repeat its failure mode

## Framework: The Four Verbs

1. **Archive (the default):** no action needed, might need finding later → archive immediately. Search beats filing; the archive is one big searchable bucket. Most email is this, and treating it as anything else is the whole problem.
2. **Reply-now (the two-minute rule):** if a real reply takes under two minutes, send it during triage — touching it twice costs more than answering it once. Short is fine; sent beats polished.
3. **Task:** replies needing real work become tasks in the task system with the email linked — *never* left in the inbox as their own reminder. An inbox used as a to-do list fails at both jobs.
4. **Park (rare, explicit):** genuinely waiting-on-something messages get a `@waiting` label and a weekly review. Parking without the review label is just procrastination with a name.
5. **The cadence:** two triage windows daily (morning, late afternoon), 15–20 minutes each, inbox to zero *decisions* (not zero work). Between windows, email stays closed — every glance costs a context switch. Backlogs older than 30 days get declared bankrupt: archive-all + one "if it was important, resend" note to self.

## Output Format

# Email Triage: [inbox state] → system

## The Backlog Pass
[Batches with verb counts: "archive ~3,100 (newsletters, notifications) · reply-now 12 · task 23 · park 4" · the bankruptcy call if warranted]

## The Rules Card (keep visible)
[The four verbs with their tests · the two-minute rule · labels: @waiting, @task-filed, +1 optional]

## The Cadence
[Windows, lengths, the closed-between rule · the weekly @waiting review]

## Quality Checks

- [ ] Every message class in the backlog maps to exactly one verb
- [ ] The two-minute rule is stated with its touch-it-once logic
- [ ] Labels number ≤4 — structure stays under the complexity that killed the last system
- [ ] The cadence is timeboxed and the between-windows rule is explicit
- [ ] 30-day-plus backlogs get the bankruptcy option, framed as the rational move it is

## Anti-Patterns

- [ ] Do not build 20 folders — filing is procrastination that looks like organization
- [ ] Do not leave actionable email in the inbox as its own reminder — task systems exist
- [ ] Do not check between windows — ambient email is the tax that never stops
- [ ] Do not process newest-first during backlog clearing — oldest-first or the backlog is immortal
- [ ] Do not moralize the overflow — inboxes overflow structurally; the system is the fix, not discipline

## Example Trigger Phrases

- "Help me get to inbox zero."
- "My email is out of control."
- "Build me an email triage system."
- "Process this backlog."
