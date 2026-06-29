---
aliases: ["Customer Outage Notice"]
tags: [pm-skills, skill]
skill: customer-outage-notice
description: "Write clear customer-facing outage and service-disruption notifications. Use when asked to write an outage notice, a status-page update, a service-disruption email, a maintenance notice, or an incident update sequence. Produces status-page updates for each phase (investigating → identified → monitoring → resolved), a customer email, and a resolved/post-incident summary, in plain, reassuring language."
---

# Customer Outage Notice Skill

During an outage, customers don't need engineering detail — they need to know you're aware, that you're on it,
and when you'll update them next. This skill writes the notifications across the whole incident lifecycle, in
calm, plain language that reduces support tickets instead of generating them. (For a security/data incident or
a PR crisis, use [`incident-public-statement`](../incident-public-statement/SKILL.md) or
[`pr-crisis-response`](../pr-crisis-response/SKILL.md).)

## Working from a brief

Given "checkout is down for some users", **produce the full set of phased notices anyway** — infer the affected
scope and a plausible update cadence, label assumptions, and bracket the specific facts (start time, services,
ETA) to fill in. Never wait for full detail; teams paste these live and edit the brackets.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **What's affected** — which service/feature, and for whom (all users, a region, a plan).
- **Severity** — full outage, partial/degraded, or intermittent.
- **Status** — investigating, root cause known, fix deploying, or resolved.
- **Timing** — when it started and the next-update cadence (or ETA, if known).
- **Channel** — status page, email, in-app banner; and your voice.

## Output Format

### Outage Communications: [service]

**1. Status-page updates** — a short post for each phase, each timestamped and committing to a next-update time:

| Phase | Message (template) |
|---|---|
| Investigating | "We're investigating reports of [issue] affecting [scope]. Next update by [time]." |
| Identified | "We've identified the cause of [issue] and are working on a fix. [Scope] remains affected. Next update by [time]." |
| Monitoring | "A fix has been deployed and we're monitoring recovery. You may see [residual effect]. Next update by [time]." |
| Resolved | "This incident is resolved as of [time]. [Service] is operating normally. Thank you for your patience." |

**2. Customer email** — a slightly fuller version for direct notification: what's affected, what they can/can't
do right now, any workaround, and where to follow live status.

**3. In-app / banner line** — one sentence for a status banner.

**4. Resolved summary** — a short post-incident note: what happened (plain language), the impact window, what
you've done to prevent recurrence, and how to reach support if they're still affected. Keep it blameless and
non-technical; link a full post-mortem if one exists.

## Quality Checks

- [ ] Every active-incident update commits to a specific next-update time
- [ ] Scope is stated honestly (who is and isn't affected) — no vague "some users" when you know more
- [ ] Language is plain and calm — no internal jargon, no over-technical root-cause mid-incident
- [ ] A workaround or "what you can do now" is included when one exists
- [ ] The resolved summary states the impact window and a prevention step
- [ ] Updates are written so a non-engineer on the team can post them as-is

## Anti-Patterns

- [ ] Do not go quiet between updates — a "still working on it, next update by X" beats silence
- [ ] Do not minimise ("minor issue") when customers are clearly blocked — it erodes trust
- [ ] Do not dump engineering detail or assign blame in a live customer notice
- [ ] Do not promise an ETA you're not confident in — commit to an update time instead
- [ ] Do not forget the resolved message — leaving an incident "open" worries customers

## Based On

Incident-communication practice — phased status updates (investigating/identified/monitoring/resolved), committed update cadence, and blameless plain-language summaries.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
