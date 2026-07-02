# 🌐 Remote MCP server — add PM Skills to ChatGPT, Claude.ai & Cursor with a URL

The local MCP server (`npx -y pm-claude-skills-mcp`) is great for Claude Code / Desktop. This
is its **hosted twin**: a tiny Cloudflare Worker that speaks MCP over **Streamable HTTP**, so
anyone can add the whole skill library as a **URL connector** — no install, no Node.

It exposes the same surface as the local server — `list_skills` / `search_skills` / `get_skill`
tools, every skill as an MCP **prompt** and **resource** — and fetches the live catalog from the
public site (cached at the edge), so it stays current automatically.

## Deploy (2 minutes, free)

```bash
cd mcp-remote
npx wrangler deploy        # first run: it opens a browser to log into a free Cloudflare account
```

Wrangler prints your URL, e.g. `https://pm-skills-mcp.<you>.workers.dev`.

## Add it as a connector

- **ChatGPT** (Settings → Connectors / "Add MCP server") → paste the URL.
- **Claude.ai** (Settings → Connectors → Add custom connector) → paste the URL.
- **Cursor** (`~/.cursor/mcp.json`):
  ```json
  { "mcpServers": { "pm-skills": { "url": "https://pm-skills-mcp.<you>.workers.dev" } } }
  ```

Then ask: *"search the pm-skills for churn and apply the best one,"* or pick a skill from the
prompt/resource list — the assistant fetches the framework on demand.

## REST API (for n8n, Lovable, Make, any HTTP tool)

The same Worker also serves a **read-only JSON REST API** under `/v1`, so no-code and HTTP
tools that don't speak MCP can use the library. No auth, CORS open.

| Endpoint | Returns |
|---|---|
| `GET /v1` | the API index |
| `GET /v1/skills` | list skills — `?bundle=<plugin>` `?q=<search>` `?limit=N` |
| `GET /v1/skills/{name}` | one skill as JSON — `?format=md` for the raw Markdown body |
| `GET /v1/search?q=` | keyword search |
| `GET /v1/workflows` | the workflow recipes (skill chains) |
| `GET /v1/workflows/{id}` | one recipe with its ordered steps |

```bash
curl https://pm-skills-mcp.<you>.workers.dev/v1/skills/prd-template?format=md
```

See [`../connectors/n8n.md`](../connectors/n8n.md), [`../connectors/lovable.md`](../connectors/lovable.md),
and [`../connectors/obsidian.md`](../connectors/obsidian.md) for worked integrations.

## Agent-to-agent (A2A) discovery — other agents can hire the library

The Worker also speaks the emerging **agent-to-agent** pattern, so autonomous agents can
*discover* this service and pull the right professional skill for a task without a human
wiring anything:

- **Discovery card:** `GET /.well-known/agent-card.json` — who this agent is, what it can
  do (`search-skills`, `get-skill`, `get-workflow`), and where to message it.
- **Messaging:** `POST /a2a` — minimal JSON-RPC 2.0, method `message/send`. Send a task
  description; the reply names the best-matching skill (plus a runner-up) and includes its
  **full SKILL.md instructions** for the calling agent to execute itself. Read-only, no
  server-side LLM calls, no auth, CORS open.

```bash
curl -s https://pm-skills-mcp.pm-claude-skills.workers.dev/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"message/send",
       "params":{"message":{"parts":[{"kind":"text","text":"I need to prioritise a messy backlog for Q3"}]}}}'
```

Deploys automatically: any push to `main` touching `mcp-remote/**` triggers the
[`deploy-worker`](../.github/workflows/deploy-worker.yml) workflow.

## How it works

`src/index.js` is a stateless Worker. A `GET /v1/*` request is served by the REST handler;
every other request is MCP JSON-RPC over HTTP POST, returning JSON results for `initialize`,
`tools/*`, `prompts/*`, `resources/*`, and `ping`. CORS is open so browser-based clients can
reach it. Skills come from
[`skills.json`](https://mohitagw15856.github.io/pm-claude-skills/skills.json) and are cached, so
updates to the library appear automatically without redeploying.

No secrets, no state, no database — and the Cloudflare free tier comfortably covers it.
