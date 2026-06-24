---
aliases: ["Data Retention Policy"]
tags: [pm-skills, skill]
skill: data-retention-policy
description: "Build a data retention and deletion schedule grounded in legal basis. Use when asked to create a data retention policy, set retention periods, plan data deletion/minimisation, or answer 'how long can we keep this data?'. Produces a retention schedule — data categories with their retention period, legal/business basis, deletion trigger and method, plus flags for data kept with no basis or no defined period."
---

# Data Retention Policy Skill

"Keep everything forever" is a liability, not a strategy — it grows breach exposure, violates data-
minimisation rules (GDPR, CCPA), and turns every data subject request into an archaeology project. This
skill builds a retention schedule that ties each data category to *how long* you keep it and *why*
(legal basis), with a concrete deletion trigger — so retention is a defensible policy, not an accident.

## Required Inputs

Ask for these only if they aren't already provided:

- **Data categories** — the kinds of data you hold (customer records, logs, financial, HR, marketing, backups).
- **Legal/regulatory drivers** — anything mandating minimum retention (tax/financial records, employment law) or maximum (GDPR minimisation, sector rules).
- **Business need** — why each category is genuinely needed and for how long.
- **Where it lives** — systems and backups (backups are the most-forgotten place data outlives its policy).

## Output Format

### Data Retention Schedule: [organisation]

**1. Schedule** — the core table, one row per data category:

| Data category | Retention period | Basis (legal/business) | Deletion trigger | Method | System(s) |
|---|---|---|---|---|---|
| Customer PII | 3y after account closure | Legitimate interest + GDPR minimisation | Account closed + 3y | Hard delete | App DB, backups |
| Financial records | 7y | Tax law (statutory minimum) | End of fiscal year + 7y | Archive then delete | Finance system |

**2. Principles** — the policy stance: minimise by default, the shortest period that satisfies the basis, and that retention applies to **backups and logs too**.

**3. Deletion mechanics** — how deletion actually happens (automated job vs. manual), how it cascades to backups, and how it's evidenced.

**4. Flags** — categories with **no defined period** or **no legal/business basis** (these are the risk — data you can't justify keeping).

## Programmatic Helper

`scripts/retention_schedule.py` (stdlib only) validates a schedule and flags categories missing a
period or a basis, and (given a closure/event date) computes the earliest deletion date:

```bash
# data.json: [{"category":"Customer PII","retention_months":36,"basis":"GDPR minimisation","event_date":"2024-01-15"}, ...]
python3 scripts/retention_schedule.py data.json
python3 scripts/retention_schedule.py data.json --json
```

## Quality Checks

- [ ] Every category has both a retention period and a documented basis
- [ ] Periods default to the shortest that satisfies the legal/business need (minimisation), not "indefinite"
- [ ] Backups and logs are covered, not just the primary store
- [ ] Each category has a concrete deletion trigger and method, not just a duration
- [ ] Statutory minimums (tax, employment) and maximums (minimisation) are both respected

## Anti-Patterns

- [ ] Do not set retention to "indefinite" or leave it blank — undefined retention is the highest-risk, least-defensible state
- [ ] Do not forget backups — data deleted from production that lives on in backups is still data you hold
- [ ] Do not keep data with no legal or business basis — if you can't justify it, deleting it lowers risk for free
- [ ] Do not set a blanket period for all data — tax records and marketing emails have very different drivers
- [ ] Do not present statutory periods as advice — flag where legal/compliance must confirm the minimums

## Based On

Data-minimisation practice — GDPR Art. 5(1)(e) storage limitation, sector retention statutes, and defensible-deletion principles.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
