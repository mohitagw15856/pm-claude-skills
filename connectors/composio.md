# ⚡ Composio — skills that *act* across 500+ apps

[MCP connectors](README.md) let a skill read your files or GitHub. **[Composio](https://composio.dev)** takes it further: one MCP server that gives the assistant authenticated **actions** across 500+ SaaS apps — Gmail, Slack, Jira, Linear, Notion, HubSpot, Salesforce, Google Calendar, Sheets, GitHub, and more.

Pair `pm-skills` (the *structure* layer) with Composio (the *action* layer) and a skill stops being advice — it does the thing.

> The skill says *what good looks like*. Composio *executes it* against your real tools. "Write the launch checklist **and open a Jira ticket per item**", not "here's a checklist, now go copy it into Jira."

## Setup

1. **Add the `pm-skills` server** (structure layer — no auth):
   ```bash
   claude mcp add pm-skills -- npx -y -p pm-claude-skills pm-claude-skills-mcp
   ```
2. **Add Composio** (action layer) and authorize the apps you want. Composio handles each app's OAuth for you — you connect Gmail/Slack/Jira/etc. **once** in Composio, then the assistant can act through it. See [Composio's MCP docs](https://docs.composio.dev) for the current `mcp add` command and your hosted server URL; it looks like:
   ```bash
   claude mcp add composio -- npx -y @composio/mcp@latest --url "<your-composio-mcp-url>"
   ```
3. Restart your client (Claude Code / Desktop / Cursor / Windsurf). Both servers are now available in the same session.

## 🔑 What you authorize

| Layer | Server | Auth |
|---|---|---|
| Structure | `pm-skills` | **none** — just serves skill instructions |
| Action | `composio` | connect each app **once** inside Composio (OAuth); the MCP server uses that connection |

Nothing is sent anywhere except your own model and the apps you explicitly connected.

## Worked recipes (copy the prompt)

**🚀 Launch checklist → real Jira tickets** *(pm-skills + Composio/Jira)*
> Get the `product-launch-checklist` skill, generate it for the v2 launch, then create a Jira issue in `LAUNCH` for each checklist item with a sensible priority.

**📋 PRD → Linear project** *(pm-skills + Composio/Linear)*
> Get `prd-template`, draft the PRD for the referrals feature, then create a Linear project with one issue per requirement.

**📣 Exec update → emailed + posted** *(pm-skills + Composio/Gmail + Slack)*
> Get `executive-update`, write this month's update from these numbers, email it to the leadership list, and post the TL;DR to #leadership in Slack.

**🤝 Account plan → CRM** *(pm-skills + Composio/HubSpot or Salesforce)*
> Get `account-plan`, build the plan for Acme, then log the next-step tasks against the Acme account in the CRM.

**📅 Sprint plan → calendar + tickets** *(pm-skills + Composio/Calendar + Jira)*
> Get `sprint-planning`, plan the next sprint from this backlog, create the tickets, and put the ceremonies on the team calendar.

## Safety

Composio actions can **change real systems** (send, create, update). Connect only the apps you need, prefer least-privilege scopes, and confirm before destructive or outbound actions. The skill is just instructions — the access lives entirely in your Composio connections, which you control and can revoke.

## How it works

`pm-skills` exposes `search_skills` / `get_skill` / `get_workflow`; Composio exposes the app actions. The assistant fetches the right skill, produces the structured output, then calls Composio's tools to execute it — no glue code, both servers just configured in the same client. See [`../mcp/README.md`](../mcp/README.md) and the [connectors overview](README.md).
