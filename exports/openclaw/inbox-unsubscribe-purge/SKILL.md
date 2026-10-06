---
name: inbox-unsubscribe-purge
description: "Cut inbox volume at the source — the unsubscribe purge that classifies recurring senders into kill/digest/keep, executes safely (real unsubscribes vs. spam-report vs. never-click), and installs the filters that catch the rest. Use when asked my inbox is all newsletters, mass unsubscribe safely, cut my email volume, or set up filters for the noise. Produces the sender census, the kill/digest/keep sort, the safe-unsubscribe rules, and the filter set."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/inbox-unsubscribe-purge.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Inbox Unsubscribe Purge Skill

Triage manages the flow; the purge shrinks it. Most inbox volume is recurring senders — newsletters, notifications, marketing — and each one is a decision made once that pays forever. The purge runs a census of who actually sends the volume, sorts senders into kill/digest/keep, and executes with the safety rules most people don't know: legitimate senders' unsubscribe links are safe and legally binding-ish; *spam* senders' unsubscribe links are confirmation beacons — those get reported, never clicked.

## What This Skill Produces

- **The sender census** — the top recurring senders by volume, from the actual inbox
- **The sort** — kill (unsubscribe) / digest (batch to a daily-read label) / keep (whitelist to inbox)
- **The safety rules** — which unsubscribe links to click, which to never touch, what gets spam-reported
- **The filter set** — the rules that auto-route what survives, and the notification-settings homework that beats filtering

## Required Inputs

Ask for these if not provided:
- **The census data** — search counts per suspected sender, or a description of the noise ("LinkedIn, three newsletters, shop marketing, GitHub notifications")
- **Honest reading behavior** — which newsletters actually get read (the calendar answer; "I mean to" is a kill vote)
- **The platform** — Gmail/Outlook/other; filter syntax differs, and the skill writes the real rules

## Framework: The Purge Rules

1. **Census before action:** search per sender (`from:newsletter@x.com`), count the last 90 days — volume × read-rate sorts everything. The top ten senders are usually half the noise; purge by impact order, not inbox order.
2. **The kill test:** would you notice if it stopped? Not "is it good" — *would you notice.* Unread-for-a-month newsletters, notification emails duplicating app pings, and every marketing list fail the test. Kill without ceremony.
3. **The safety line:** known-legitimate senders (real newsletters, real companies) → unsubscribe link is safe and usually works. Unknown/sketchy senders → the link confirms your address is live; **report as spam instead, never click.** The test: did you knowingly sign up? No → spam-report path.
4. **Digest beats trickle for the keepers:** surviving newsletters get a filter to skip the inbox into a `@read-later` label, read in one weekly sitting. Notifications that must exist (CI, mentions) get their *source* settings tightened first — filtering email that shouldn't be sent is fixing the wrong end.
5. **The maintenance rule:** every new recurring sender gets the kill test on first arrival — one decision at first touch beats a re-purge every quarter. The purge is an event; the test is a habit.

## Output Format

# Unsubscribe Purge: [inbox]

## The Census
| Sender | Volume /90d | Actually read? | Verdict |
|---|---|---|---|

## Execution
**Kill (safe unsubscribe):** [list] · **Spam-report (never click):** [list, with why] · **Digest:** [list → the filter rule, in platform syntax] · **Source-settings homework:** [the app notifications to turn off at origin]

## The Filters
[The actual rules, platform syntax, paste-ready]

## Quality Checks

- [ ] The census is by measured volume, not by annoyance salience
- [ ] Every kill passed the would-you-notice test
- [ ] The click/never-click line is applied per sender, with the sketchy ones named
- [ ] Digest filters skip the inbox, not just label it
- [ ] Notification volume is fixed at the source where a source setting exists

## Anti-Patterns

- [ ] Do not click unsubscribe on spam — it's a liveness beacon; report instead
- [ ] Do not keep newsletters aspirationally — the read-rate is the vote, not the intention
- [ ] Do not build filters for email that shouldn't exist — source settings first
- [ ] Do not purge alphabetically — impact order; the top ten senders are half the volume
- [ ] Do not skip the first-touch habit — without it, the purge is an annual chore instead of a one-time fix

## Example Trigger Phrases

- "My inbox is all newsletters."
- "Cut my email volume."
- "Set up filters for the noise."
