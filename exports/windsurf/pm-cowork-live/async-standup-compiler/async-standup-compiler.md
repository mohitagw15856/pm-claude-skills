---
trigger: model_decision
description: "Compile the team's REAL updates into one async standup — pull what people posted in Slack (and moved in Notion/Linear), not a template for running standups. Use when asked to compile today's standup, pull the team's updates into one post, what did the team ship, or run async standup in Cowork. Reads a Slack channel and (optionally) the tracker via connectors, groups updates by person into shipped / in-progress / blocked, surfaces the blockers needing attention, and produces a standup-digest artifact ready to post back."
---

# Async Standup Compiler (Live)

Async standups scatter across a channel — twelve messages, three threads, and the blockers get lost. In Claude Cowork this skill reads the *real* channel (and the tracker), compiles one clean digest grouped by person and status, and surfaces the blockers that actually need someone — so the team gets signal, not scroll.

## What This Skill Produces

- **The standup digest** — each person's shipped / in-progress / blocked, deduped and tightened
- **The blocker board** — blockers pulled to the top with who's waiting on whom
- **A post-ready artifact** — the digest formatted to drop back into Slack/Notion (posted only on request)

## Required Inputs

Ask for these if not provided:
- **The channel & window** — which Slack channel and time range (e.g. "#eng-standup, today")
- **The roster** — who's expected, so silence is visible
- **Tracker (optional)** — a Notion/Linear board to cross-reference what actually moved

## Framework: A Standup That Earns Its Place

1. **By person, by status** — shipped / in-progress / blocked; one line each, no essays.
2. **Blockers first-class** — every blocker names who can unblock it.
3. **Silence is data** — expected people who didn't post are listed, not hidden.
4. **Cross-check reality** — if a tracker is available, note "said done" vs "still open".
5. **Signal over ceremony** — the digest is shorter than the raw channel.

## Execution (Cowork)

1. **Read the channel** — via the Slack connector, pull messages in the window; follow threads. Map each update to its author.
2. **Cross-reference (optional)** — via the Notion/Linear connector, check what moved; flag mismatches between claims and the board.
3. **Compile** — group by person into shipped/in-progress/blocked; dedupe repeats; keep each item to a line. List rostered people who didn't post.
4. **Surface blockers** — pull them to a board with the owner and who's waiting.
5. **Emit the artifact** — the digest, formatted for the target. Post it back **only if asked**; default is produce-and-show.

Guardrails: attribute every item to the person who actually posted it; don't invent updates for silent members — list them as "no update"; flag claim-vs-tracker mismatches rather than resolving them silently; post only on explicit request; if a connector is unauthorised, compile from what's available and say what's missing.

## Output Format

An **Async Standup Digest**:

### 🚑 Blockers (needs attention)
| Blocker | Owner | Waiting on |
|---|---|---|

### Updates by person
**[name]** — ✅ shipped: … · 🔨 in progress: … · ⛔ blocked: …

### No update
- [names who were expected but silent]

### Reality check (if tracker available)
- "said done" vs board: [mismatches]

## Quality Checks
- [ ] Every item is attributed to the person who posted it
- [ ] Blockers are surfaced with an owner and who's waiting
- [ ] Silent-but-expected people are listed, not omitted
- [ ] The digest is shorter than the raw channel
- [ ] Nothing was posted back without an explicit request

## Anti-Patterns
- **Inventing updates** for people who didn't post — mark them silent.
- **Burying blockers** inside a person's paragraph.
- **Auto-posting** the digest without being asked.
- **A digest longer than the channel** — compress, don't transcribe.

## Example Trigger Phrases
- "Compile today's async standup from #eng-standup."
- "Pull the team's updates into one post and surface the blockers."
- "What did the team ship today? Cross-check against Linear."
- "Run async standup in Cowork and give me a post-ready digest."
