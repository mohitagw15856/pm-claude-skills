# 🔌 MCP pairings — skills that *act*, not just answer

A skill produces the artifact; a connected **MCP server** delivers it where work actually lives. In Claude Code (or any MCP host), pairing the two turns input→output skills into end-to-end workflows: *meeting notes that file themselves in Notion, stakeholder updates that post to Slack, postmortem action items that become tracker tickets.*

The safety pattern is always the same, and it's the one [SkillSpec §5](../SKILLSPEC.md) formalises:

```
skill produces the artifact  →  human approves it VERBATIM  →  MCP tool delivers it  →  verify + report the link
```

The skill never gains network access; the *agent* uses tools it already has, inside the skill's Execution gates.

## The pairing table

| Skill | Pairs with (MCP) | The end-to-end workflow |
|---|---|---|
| [`meeting-notes`](../skills/meeting-notes/SKILL.md) | Notion · Linear/Jira | Transcript → structured notes filed as a Notion page; each action item becomes a tracker issue with its owner |
| [`stakeholder-update`](../skills/stakeholder-update/SKILL.md) | Slack · Gmail | The approved update posts to the exact channel/recipients — its Execution block already specifies the gates |
| [`incident-postmortem`](../skills/incident-postmortem/SKILL.md) | GitHub/Linear · Slack | Postmortem drafted → action items filed as issues with owners/due dates (via [`action-runner`](../skills/action-runner/SKILL.md)) → doc linked in the incident channel |
| [`sprint-planning`](../skills/sprint-planning/SKILL.md) | Linear/Jira | The approved plan *builds the sprint*: container created, items moved, points set — its Execution block is the worked example |
| [`/firm`](../commands/firm.md) | Slack · Notion | Board minutes delivered to your leadership channel / minutes database after each session |
| [`pm-weekly-review`](../skills/pm-weekly-review/SKILL.md) | Google Calendar · Gmail | The week's calendar becomes review input; the review's commitments become calendar blocks |
| [`competitive-intelligence-monitor`](../skills/competitive-intelligence-monitor/SKILL.md) | Slack | The weekly delta brief posts itself to `#competitive` — pair with [`schedule-recipe`](../skills/schedule-recipe/SKILL.md) for the cadence |
| [`renewal-playbook`](../skills/renewal-playbook/SKILL.md) | Salesforce/HubSpot MCPs | Account context pulled live instead of pasted; the save plan's tasks written back |

## Wiring it (Claude Code)

1. Connect the servers you use: `claude mcp add …` (Notion, Slack, Linear, GitHub and hundreds more speak MCP).
2. Install the skills (`npx pm-claude-skills add --agent claude`).
3. Ask for the outcome, not the steps: *"take this transcript, file the notes in Notion and create the action items in Linear."* The agent runs the skill, shows you the artifact, and — only after your yes — delivers through the MCP tools.

Skills with a formal `## Execution` block (`sprint-planning`, `stakeholder-update`, `meeting-notes`) make the boundaries explicit: a **closed allow-list** of actions, human approval on anything outward-facing, verification afterwards, and a rollback path. For skills without one, the same discipline applies by convention — the artifact is approved before anything leaves the session.

## House rules

- **Approval precedes delivery, always.** An MCP pairing never auto-sends; "the user said post it last week" does not carry over.
- **Verbatim means verbatim.** What was approved is what ships — no silent edits between approval and delivery.
- **Verify and link back.** After delivery, fetch the created page/issue/message and report its URL; a claimed delivery without a link didn't happen.
- **Least tools.** Load only the MCP servers a workflow needs; a skill that files Notion pages has no business seeing your email.
