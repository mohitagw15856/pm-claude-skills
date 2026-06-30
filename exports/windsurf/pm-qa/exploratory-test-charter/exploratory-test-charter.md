---
trigger: model_decision
description: "Write session-based exploratory testing charters to find what scripted tests miss. Use when asked to plan exploratory testing, write a test charter, design a testing session, or do risk-based exploration of a feature. Produces focused charters — a mission, areas/risks to explore, tactics and oracles, and timeboxed sessions — so exploration is purposeful and accountable, not random clicking."
---

# Exploratory Test Charter Skill

Exploratory testing finds the bugs scripts don't — but only when it's *chartered*: a clear mission, a defined
area, and a timebox, so it's purposeful and you can report what was covered. This skill writes session-based
charters that point skilled testing at the riskiest areas, with the tactics and oracles to know when something
is wrong.

## Working from a brief

Given "explore the new checkout flow", **write the charters anyway** — infer the risk areas, useful tactics,
and oracles, labelling assumptions. Prioritise by risk. Never hand back a question instead of charters.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The target** — the feature/area and what it does.
- **Risk & concerns** — what's new/changed, what's complex, and where failure would hurt most.
- **Context** — users, platforms, data, and integrations involved.
- **Time available** — to size and prioritise the sessions.

## Output Format

### Exploratory Testing Charters: [feature]

**Risk overview** — the few areas most worth exploring and why (new, complex, high-impact, historically buggy).

**Charters** — one per focused session (Session-Based Test Management style):

> **Charter:** Explore [area] using [tactics/data] to discover [information about risk].
> - **Areas / things to cover:** the specific surfaces, flows, inputs, states.
> - **Test ideas & tactics:** how to probe it — boundary values, interruptions, bad data, concurrency, navigation, roles/permissions, network conditions, etc.
> - **Oracles** (how you'll know it's wrong): the spec, consistency, comparable products, user expectations, "would a user be annoyed?".
> - **Timebox:** ~60–90 min (short/long), priority.
> - **Data / setup needed.**

Provide 3–6 charters, **prioritised by risk**.

**Reporting** — what to capture per session: bugs found, areas covered vs. not, new risks/questions, and follow-up charters.

## Quality Checks

- [ ] Each charter has a clear mission (explore X to discover Y about risk Z) — not "test the app"
- [ ] Charters are prioritised by risk, with the rationale stated
- [ ] Test ideas/tactics are concrete (boundaries, interruptions, bad data, roles…), not generic
- [ ] Oracles are named so the tester can recognise a problem
- [ ] Sessions are timeboxed and sized to the available time
- [ ] A lightweight reporting structure (coverage + findings) is included

## Anti-Patterns

- [ ] Do not write "explore the feature" with no mission, areas, or oracles — that's aimless clicking
- [ ] Do not skip prioritisation — explore the riskiest areas first
- [ ] Do not turn charters into scripted step-by-step cases — exploration needs freedom within focus
- [ ] Do not omit oracles — without them a tester can't tell right from wrong
- [ ] Do not leave sessions open-ended — timebox them so coverage is accountable

## Based On

Session-Based Test Management (exploratory testing) — chartered, risk-prioritised, timeboxed sessions with explicit tactics and oracles.
