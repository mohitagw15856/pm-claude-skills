---
name: followup-sweep
description: "Sweep the user's REAL mail and calendar for dropped balls — threads awaiting their reply, promises they made, and replies they're owed — then draft the nudges. Use when asked what am I forgetting, what have I not replied to, who owes me a reply, or chase my open threads in Cowork. Reads sent/received mail via the Gmail connector and recent events via Calendar, finds the open loops, and produces a follow-up-list artifact plus ready-to-send draft nudges."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/followup-sweep.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Follow-up Sweep (Live)

Dropped balls hide in the sent folder: the reply you promised, the question you asked that never came back, the thread that stalled after you. In Claude Cowork this skill scans the *real* account for those open loops and drafts the nudges so nothing important dies of silence.

## What This Skill Produces

- **The open-loop list** — threads awaiting the user's reply, promises the user made with no follow-through, and replies the user is owed
- **Draft nudges** — short, polite chase messages created as Gmail drafts for the ones worth sending
- **A follow-up-sweep artifact** — everything found, ranked by staleness and stakes, with the suggested action per item

## Required Inputs

Ask for these if not provided:
- **Window** — how far back to sweep (default: last 14 days)
- **Who counts** — everyone, or just external/customers/VIPs
- **Draft or list-only** — may it write draft nudges? (default: yes, drafts only)

## Framework: The Three Open Loops

1. **You owe them** — a direct question or ask you haven't answered → reply-now or a holding note.
2. **They owe you** — you asked, no reply after a reasonable gap → a nudge.
3. **You promised** — "I'll send X by Friday" with no evidence it went → deliver or renegotiate.

## Execution (Cowork)

1. **Scan** — via the Gmail connector, read recent received mail (unanswered questions to you) and **sent** mail (your questions/promises). Via Calendar, note commitments tied to past events.
2. **Detect loops** — match each thread to one of the three loops; use the last message's direction and age. Ignore newsletters, notifications, and resolved threads.
3. **Rank** — by staleness × stakes (external/customer/named-deadline outrank internal chatter).
4. **Draft** — for nudge-worthy items, create short, warm Gmail **drafts** (never sent): reference the thread, restate the ask, propose a next step.
5. **Emit the artifact** — the ranked follow-up list with the drafted-vs-manual split.

Guardrails: drafts only, never auto-send; don't nudge someone who replied in a thread you missed — re-check the latest message; never invent a promise the user didn't make; if a connector is unauthorised, produce the list from what's available and say what's missing.

## Output Format

A **Follow-up Sweep** artifact:

### Summary
`N open loops · X you owe · Y owed to you · Z promises · D drafts ready`

### Ranked follow-ups
| Thread | Loop type | Age | Stakes | Suggested action |
|---|---|---|---|---|

### Drafts created
- **[subject]** → draft ready; one-line summary of the nudge

### Judgement calls (left for you)
- **[thread]** — why it wasn't auto-drafted

## Quality Checks
- [ ] Nothing was sent — only drafted
- [ ] Each item is correctly typed (you owe / owed / promised) from the real last message
- [ ] Resolved threads were excluded (checked the latest message, not just the first)
- [ ] Ranking reflects staleness AND stakes, not date alone
- [ ] Promises attributed to the user actually appear in their sent mail

## Anti-Patterns
- **Nudging on a thread that was already answered** — always read the latest message.
- **Auto-sending chases** — draft, let the human send.
- **Inventing a promise** to manufacture a follow-up.
- **Flat date-sort** that buries a stale customer thread under fresh internal noise.

## Example Trigger Phrases
- "What am I forgetting to follow up on?"
- "Sweep my inbox for dropped balls and draft the nudges."
- "Who owes me a reply, and who am I ignoring?"
- "Chase my open threads from the last two weeks in Cowork."
