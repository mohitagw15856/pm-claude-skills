# MCP Server

A zero-dependency [Model Context Protocol](https://modelcontextprotocol.io) server that exposes this skill library to **any MCP client** (Claude Code, Claude Desktop, Cursor, Windsurf, Cline…). Instead of installing 174 files, your assistant can **search and pull skills — and run workflow recipes — on demand**.

## One-line install (Claude Code)

```bash
claude mcp add pm-skills -- npx -y pm-claude-skills-mcp
```

That's it — all 174 skills and 5 workflow recipes are now available in every Claude Code session, on any project.

## Tools

| Tool | What it does |
|---|---|
| `list_skills` | List every skill (name, tier, one-line description). Optional `tier` filter. |
| `search_skills` | Keyword search across name, description, and body — returns the best matches. |
| `get_skill` | Return the full instructions for one skill by name, ready to apply. |
| `list_workflows` | List workflow recipes — named chains of skills (e.g. ship-a-feature). |
| `get_workflow` | Return one recipe: the ordered skills to run and what each produces. |

## Configure it

**Claude Desktop** — add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pm-claude-skills": {
      "command": "npx",
      "args": ["-y", "pm-claude-skills-mcp"]
    }
  }
}
```

**Cursor / Windsurf / Cline** — add the same `mcpServers` block to the client's MCP config (`~/.cursor/mcp.json`, Windsurf settings, etc.).

**From a local clone** (no npm install):

```json
{
  "mcpServers": {
    "pm-claude-skills": {
      "command": "node",
      "args": ["/absolute/path/to/pm-claude-skills/mcp/server.mjs"]
    }
  }
}
```

Restart the client. Then ask it to *"search the skills for customer churn"*, *"get the rice-prioritisation skill and apply it to my backlog"*, or *"run the ship-a-feature workflow for a referral program"* — it calls the tools automatically.

## Ground skills in your real data

Skills are far more useful on *your* data than on pasted summaries. Because this server speaks standard MCP, run it **alongside other MCP servers** in the same client — then a skill can act on what those servers expose:

- `filesystem` MCP → "get the `churn-analysis` skill and run it on `exports/q2.csv`"
- a Linear/Jira/GitHub MCP → "get `prd-template` and base it on issue ABC-123"
- a database/Drive MCP → "pull last quarter's numbers, then run `metrics-framework`"

The skill supplies the *structure*; the other server supplies the *facts*. In the browser playground, the **📎 Ground in a file** button does the lightweight version — loading a local file into your context.

**→ Copy-paste configs + worked recipes:** [`connectors/`](../connectors/) ("draft the PRD *from* GitHub issue #123", "run churn-analysis on `exports/q2.csv`", "open an issue per launch-checklist item").

## How it works

Pure Node standard library, MCP stdio transport (newline-delimited JSON-RPC 2.0). It reads the bundled `skills/` at startup and serves them in-memory; all logging goes to stderr so it never corrupts the protocol stream. No network, no data leaves your machine.
