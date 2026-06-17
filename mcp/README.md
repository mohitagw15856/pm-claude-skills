# MCP Server

A zero-dependency [Model Context Protocol](https://modelcontextprotocol.io) server that exposes this skill library to any MCP client (Claude Desktop, Cline, etc.). Instead of installing 172 files, your assistant can **search and pull skills on demand**.

## Tools

| Tool | What it does |
|---|---|
| `list_skills` | List every skill (name, tier, one-line description). Optional `tier` filter. |
| `search_skills` | Keyword search across name, description, and body — returns the best matches. |
| `get_skill` | Return the full instructions for one skill by name, ready to apply. |

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

Restart the client. Then ask it to *"search the skills for customer churn"* or *"get the rice-prioritisation skill and apply it to my backlog"* — it calls the tools automatically.

## How it works

Pure Node standard library, MCP stdio transport (newline-delimited JSON-RPC 2.0). It reads the bundled `skills/` at startup and serves them in-memory; all logging goes to stderr so it never corrupts the protocol stream. No network, no data leaves your machine.
