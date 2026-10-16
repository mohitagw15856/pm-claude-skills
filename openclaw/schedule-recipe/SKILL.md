---
name: schedule-recipe
description: "Turn 'run this every Friday at 4pm' into a working, copy-paste schedule on the user's actual runner. Use when asked to schedule a recurring AI task, set up a routine or cron job for a skill, automate a weekly report, or wire a skill into n8n or GitHub Actions. Produces the exact setup for the chosen runner plus the prompt to run, failure alerting, and a first-run test plan."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/schedule-recipe.html
metadata:
  {
    "openclaw": { "emoji": "🛫" }
  }
---

# Schedule Recipe Skill

Convert a recurring intent — "competitive briefing every Monday 8am" — into the concrete, copy-paste setup for whatever runner the user actually has, with failure handling so it degrades loudly, not silently.

## What This Skill Produces

- A **runner recommendation** (or confirmation of the user's choice) with the reason
- The **exact setup** — command, cron expression, or workflow file — ready to paste
- The **run prompt**: what the scheduled agent should do each cycle, including which skill to load
- **Failure alerting and a first-run test plan**

## Required Inputs

Ask for (if not already provided):
- **What should run** — which skill or task, and what inputs it reads each cycle
- **Cadence and timezone** — "every Friday 4pm" means nothing without one
- **Where it can run** — Claude Code (routines/loops), a server with cron, n8n, or GitHub Actions
- **Where the output should land** — file in a repo, Slack/email, a Brain folder, a PR

## Runner Selection

Pick the simplest runner the user already has, in this order:

| Runner | Choose when | Setup shape |
|---|---|---|
| **Claude Code routine** (`/schedule`) | The user lives in Claude Code and the task needs an agent (reads repos, runs skills) | A scheduled cloud agent with the run prompt |
| **Claude Code `/loop`** | Same-session polling or short-lived recurrence, not a standing schedule | `/loop <interval> <command>` |
| **GitHub Actions cron** | Inputs and output both live in a repo; team wants runs versioned and reviewable | A workflow YAML with `schedule:` trigger |
| **n8n / Make** | The trigger or output is a SaaS app (Slack, CRM, sheets) | A workflow calling the skills REST API |
| **System cron** | A server exists and the task is a script | A crontab line invoking the CLI |

State the choice and the runner-up. If the user names a runner, use it — don't relitigate.

## The Run Prompt

Every recipe includes the prompt the scheduled run executes. It must contain:
1. **The skill to load** and the artifact to produce
2. **The sources to read this cycle** — explicit paths/URLs, not "the usual"
3. **Where to write the result** and how to mark the edition (date, sources read)
4. **What to do on missing sources** — name the failure behaviour, never fabricate
5. **Delta instruction** if recurring: read the previous edition first and report changes (see `delta-briefing`)

## Output Format

### Schedule Recipe: [task] — [cadence]

**Runner:** [choice] — because [one line]. Runner-up: [alternative] if [condition].

**Setup (copy-paste):**
```
[the exact command / crontab line / workflow YAML / n8n outline]
```

**Run prompt:**
> [the full prompt the scheduled agent executes each cycle]

**Failure alerting:** [how a failed/skipped run becomes visible — e.g. the run posts an error note to the same channel it would post the brief].

**First-run test:** trigger one run manually now; check [the two or three things that prove it worked] before trusting the schedule.

## Quality Checks

- [ ] The cron expression / schedule matches the stated cadence *and timezone* — show the conversion
- [ ] The setup block is genuinely copy-paste: no `<placeholders>` left except secrets, which are named
- [ ] The run prompt names explicit sources and an output destination
- [ ] A failed run is visible somewhere a human already looks
- [ ] The recipe includes a manual first-run test, not just "it'll fire Monday"

## Anti-Patterns

- [ ] Do not pick a runner the user doesn't have — a perfect n8n flow is useless without n8n
- [ ] Do not write a run prompt that says "as usual" or relies on the agent remembering prior runs without a stored previous edition
- [ ] Do not schedule without failure alerting — silence and success must not look identical
- [ ] Do not default to hourly/daily to "be safe" — match the cadence to how often the inputs change
- [ ] Do not put secrets inline in the setup block — reference the runner's secret store

## Example Trigger Phrases

- "Schedule a recurring AI task."
- "Set up a routine."
- "Automate a weekly report."
- "Wire a skill into n8n or GitHub Actions."
