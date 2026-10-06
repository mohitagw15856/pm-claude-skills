---
name: data-contract
description: "Define a data contract between a producer and consumers of a dataset/event/API. Use when asked to write a data contract, define a schema agreement, set data SLAs, or stop a producer from silently breaking downstream consumers. Produces a contract — schema with types & constraints, semantics, quality SLAs (freshness/completeness/validity), ownership, versioning & breaking-change policy, and a change process."
---

# Data Contract Skill

Most data outages are a producer changing a column without telling anyone downstream. A data contract
fixes that: it's an explicit, versioned agreement on the **schema, semantics, and quality guarantees** of
a dataset/event/stream, with an owner and a breaking-change policy. This skill writes one, so producers
and consumers share a single source of truth and changes can't silently break pipelines.

## Required Inputs

Ask for these only if they aren't already provided:

- **The data asset** — the table, event, topic, or API, and what it represents.
- **Producer & consumers** — who owns it, who depends on it.
- **Schema** — fields, types, and which are required; the semantics of the tricky ones.
- **Quality expectations** — freshness (how current), completeness, valid ranges, uniqueness.

## Output Format

### Data Contract: `[asset]` v[x.y]
**Producer (owner):** [team] · **Consumers:** [teams/systems] · **Status:** active

**1. Schema** — every field: name · type · required? · description/semantics · constraints (enum, range, format).

| field | type | required | constraint | meaning |
|---|---|---|---|---|

**2. Semantics** — the non-obvious meanings: timezone of timestamps, currency/units, what null means, how late-arriving data is handled, the grain/uniqueness.

**3. Quality SLAs** — the guarantees, measurable: **freshness** (e.g. updated by 06:00 UTC daily), **completeness** (no missing required fields), **validity** (values in range), **uniqueness** (PK unique). These are what consumers can rely on.

**4. Ownership & support** — who owns it, where to raise issues, on-call/response expectations.

**5. Versioning & breaking changes** — semver for the schema; what counts as **breaking** (removing/renaming a field, tightening a type, changing semantics) vs. **non-breaking** (adding optional fields); deprecation window before a breaking change ships.

**6. Change process** — how a change is proposed, who must sign off (affected consumers), and the notice period.

## Quality Checks

- [ ] Every field has a type, required-flag, and clear semantics (esp. timezone/units/null meaning)
- [ ] Quality SLAs are measurable (a number/time), not "should be fresh"
- [ ] Breaking vs. non-breaking changes are explicitly defined
- [ ] There's a deprecation window and a sign-off process for breaking changes
- [ ] An owner and an issue/escalation path are named

## Anti-Patterns

- [ ] Do not leave semantics implicit — undocumented timezone/units/null handling is the #1 silent data bug
- [ ] Do not write vague SLAs — "fresh and accurate" is unenforceable; give times and thresholds
- [ ] Do not allow breaking changes without notice — a deprecation window + consumer sign-off is the whole point
- [ ] Do not skip ownership — an unowned dataset has no one to hold to the contract
- [ ] Do not version informally — schema changes need semver so consumers know what broke

## Based On

Data-contract practice — schema + semantics + measurable quality SLAs, semantic versioning, and producer/consumer change governance.

## Example Trigger Phrases

- "Write a data contract."
- "Define a schema agreement."
- "Set data SLAs."
- "Stop a producer from silently breaking downstream consumers."
