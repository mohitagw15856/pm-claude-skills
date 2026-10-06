---
name: recurring-meeting-pruner
description: "Prune your own recurring-meeting load — the personal calendar audit (your role in each, honestly), the four exit moves (leave, delegate, downgrade to notes, halve), and the graceful exit scripts that don't burn standing. Use when asked get me out of some of these meetings, my calendar is 80% recurring, which meetings can I stop attending, or leave a meeting politely. Produces the personal audit with role verdicts, the exit move per meeting, the scripts, and the calendar-shape after."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/recurring-meeting-pruner.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Recurring Meeting Pruner Skill

The [standing-meeting-audit](../standing-meeting-audit/SKILL.md) fixes a *team's* meetings; this skill fixes *yours* — the personal version, where the question isn't "should this meeting exist" but "should it contain me." Most personal calendars carry meetings attended by inertia: invited once for a project that ended, kept for fear of missing something, present as a spectator. The prune audits your actual role in each (decider, contributor, informed, or furniture), applies the four exit moves, and scripts the departures — because leaving well costs one message, while ghosting costs standing.

## What This Skill Produces

- **The personal audit** — every recurring meeting: your honest role, your last contribution, what you'd lose by absence
- **The verdict per meeting** — stay / leave (with script) / delegate / downgrade-to-notes / halve (alternate weeks)
- **The exit scripts** — the graceful leave, the delegate handoff, the notes-instead request
- **The after-shape** — the reclaimed hours and what they're re-blocked for (unblocked reclaimed time evaporates)

## Required Inputs

Ask for these if not provided:
- **The recurring load** — the standing meetings with length/frequency, and the honest role in each ("I speak in maybe one in four")
- **The fear inventory** — what absence risks per meeting (missing decisions? visibility? offending the organizer?) — each fear gets addressed by the move chosen, not dismissed
- **The political weights** — whose meetings can be left cheaply vs. whose exit needs care (the boss's staff meeting prunes differently than a peer's sync)
- **The purpose of the reclaimed time** — what the hours are *for*; pruning without a destination refills within a month

## Framework: The Prune Rules

1. **Audit by role, honestly:** for each meeting — when did you last contribute something only you could? Do decisions there need you, or reach you fine in notes? Four roles: *decider/contributor* (stay, maybe halve), *informed* (notes will do), *represented* (delegate), *furniture* (leave). Most calendars are 30–50% the last two.
2. **The four moves, matched to the fear:** *Leave* when absence costs nothing real — the script handles the social part. *Delegate* when the team needs representation but not specifically you (a growth gift for the delegate — framed that way, honestly). *Downgrade to notes* when the content matters but the presence doesn't — "I'll follow via notes; ping me when an agenda item needs me." *Halve* (alternate instances) when contribution is real but not weekly — the compromise that organizers accept easiest.
3. **The scripts carry respect for the meeting:** "I'm pulling back to notes on this one — the updates serve me fine and I'll join whenever [topic] hits the agenda. Ping me anytime I'm needed" — the exit affirms the meeting's value for its members while ending yours. Never the honest-but-fatal "this isn't a good use of my time."
4. **Visibility fears get a real answer:** if a meeting is genuinely where you're *seen* (some are — the skip-level's staff meeting), that's a stay-reason to weigh openly, not a guilty secret. The prune is honest accounting, and "presence as career strategy" is a legitimate line item — just a priced one.
5. **Re-block or relapse:** the reclaimed hours get immediately blocked for their purpose ([deep-work-blocking](../deep-work-blocking/SKILL.md) territory) — a visibly empty calendar slot is an invitation the organization always accepts. And the guard: every *new* recurring invite gets the role question before acceptance — "what's my role there?" asked once at the door beats the audit done yearly.

## Output Format

# Meeting Prune: [name] — [N] recurring, [H] hrs/week

## The Audit
| Meeting | Role (honest) | Last unique contribution | Absence cost | Verdict |
|---|---|---|---|---|

## The Moves + Scripts
[Per exit: the move · the script, verbatim · the delegate's briefing where relevant]

## The After-Shape
[Hours reclaimed → re-blocked for [purpose] · the new-invite door question installed]

## Quality Checks

- [ ] Every role verdict cites the last-unique-contribution evidence
- [ ] Each fear was matched by its move, not waved away
- [ ] Scripts affirm the meeting while exiting it
- [ ] Visibility-stays are named as strategy, priced honestly
- [ ] Reclaimed time is re-blocked before the week ends

## Anti-Patterns

- [ ] Do not ghost — fading attendance without the message costs more standing than the meeting cost hours
- [ ] Do not leave with a review of the meeting's worth — exit your seat, not their format
- [ ] Do not delegate as dumping — the handoff includes the brief and the framing, or it's just displacement
- [ ] Do not leave reclaimed slots visibly empty — nature and calendars abhor a vacuum
- [ ] Do not prune once — the door question on new invites is the system; the audit is just the reset

## Example Trigger Phrases

- "Get me out of some of these meetings."
- "My calendar is 80% recurring."
- "Which meetings can I stop attending?"
- "Leave a meeting politely."
