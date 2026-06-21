# 🔌 Connectors — skills that act on your real data

A skill gives you **structure**. A connector gives it **facts to work with**. Run the
`pm-skills` MCP server *alongside* a data server (filesystem, GitHub, a database, Drive,
Linear…) in the same client, and a skill can act on what that server exposes — instead of
you copy-pasting context.

> The skill supplies the *how-good-looks*. The other MCP server supplies the *your-actual-data*. Together: "draft the PRD **from** the real tickets," not "draft a PRD about… let me paste everything."

## Setup (2 minutes)

**Claude Code** — one line each:
```bash
claude mcp add pm-skills   -- npx -y pm-claude-skills-mcp
claude mcp add filesystem  -- npx -y @modelcontextprotocol/server-filesystem /path/to/your/project
claude mcp add github      -- npx -y @modelcontextprotocol/server-github      # set GITHUB_PERSONAL_ACCESS_TOKEN
```

**Claude Desktop / Cursor / Windsurf** — paste the servers you want from
[`mcp.example.json`](mcp.example.json) into the client's MCP config, then restart.

Any [MCP server](https://github.com/modelcontextprotocol/servers) works — Postgres, Slack,
Notion, Google Drive, Sentry, etc. `pm-skills` is the structure layer; they're the data layer.

## 🔑 What you connect / authorize

`pm-skills` itself needs **no auth** — it only serves skill instructions. Each **data** server
you add authorizes on its own, once, in your MCP config:

| Data server | What it needs |
|---|---|
| **filesystem** | a folder path you grant it (no token) |
| **GitHub** | a Personal Access Token (`GITHUB_PERSONAL_ACCESS_TOKEN`) — use a fine-grained, read-mostly one |
| **Slack** | a Slack bot/app token (OAuth) |
| **Notion / Google Drive** | the provider's API token / OAuth connection |
| **Postgres & co.** | a connection string |

So "connect your GitHub/Slack" = add that provider's MCP server with its token to your client
**once** — then every skill can use it. Nothing is sent anywhere except your own model + the
servers you configured.

## Worked recipes (copy the prompt)

**📋 PRD from a real ticket** *(pm-skills + github)*
> Get the `prd-template` skill, read GitHub issue `owner/repo#123` for the context, and write the PRD from it.

**📉 Churn analysis on your export** *(pm-skills + filesystem)*
> Get the `churn-analysis` skill and run it on `exports/q2-churn.csv` in my project.

**🐞 Debug from the actual logs** *(pm-skills + filesystem)*
> Get `error-decoder`, read `logs/app.log`, and diagnose the most recent error.

**🚀 Launch checklist → real issues** *(pm-skills + github)*
> Get `product-launch-checklist`, generate it for the v2 launch, then open a GitHub issue per checklist item in `owner/repo`.

**🔁 A whole recipe, grounded** *(pm-skills + filesystem/github)*
> Get the `ship-a-feature` workflow, use the notes in `docs/idea.md` as the kickoff, and run the chain end to end.

## How it works
`pm-skills` exposes `search_skills` / `get_skill` / `get_workflow` over MCP; the assistant
fetches the right instructions and applies them to whatever the *data* server returns. No
glue code — both servers just need to be configured in the same client. See
[`../mcp/README.md`](../mcp/README.md).

## Safety
Give data servers the **narrowest** scope that works (a single project dir for filesystem;
a fine-grained, read-mostly PAT for GitHub). Skills are plain instructions — they don't
exfiltrate anything; the access lives entirely in the data server you configure.
