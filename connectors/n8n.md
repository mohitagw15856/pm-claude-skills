# 🔗 n8n — run PM Skills inside your automations

[n8n](https://n8n.io) is an open-source workflow automation tool. PM Skills plugs in as the
**brains** of a workflow: a trigger fires, a skill turns raw input into a structured
professional artifact, and the next node routes it where it belongs (Slack, Notion, a doc,
a ticket).

There are three ways in, from zero-build to native. Pick by how much you want to wire.

---

## Tier 0 — MCP Client node (works today, no build)

n8n's **AI Agent** node can use any external MCP server as a tool via the **MCP Client Tool**
node. Point it at the hosted PM Skills connector and all 205 skills + 6 workflow recipes
become tools the agent can call on demand.

1. Add an **AI Agent** node (with your Anthropic/OpenAI credential).
2. Add an **MCP Client Tool** sub-node → **Endpoint:**
   `https://pm-skills-mcp.pm-claude-skills.workers.dev/`  (SSE/Streamable HTTP, no auth).
3. Prompt the agent naturally — *"Search the skills for churn and apply the best one to this
   account note."* It calls `search_skills` → `get_skill` and applies the result.

The skill supplies the *structure*; your AI Agent node's model does the *thinking*. Nothing
to host, nothing to maintain.

---

## Tier 1 — HTTP Request node (REST, model-agnostic)

Prefer to keep control of the model call? Use the read-only **REST API** to fetch a skill,
then feed its instructions into whatever LLM node you like.

> The `/v1` REST API is served by the same Cloudflare Worker as the MCP connector. If you
> self-host the worker (`mcp-remote/`), deploy the latest version first. The static
> `skills.json` fallback below needs no deploy and works today.

**Fetch one skill's instructions** — *HTTP Request* node:

```
Method: GET
URL:    https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills/pr-description-writer?format=md
```

Returns the raw Markdown body. Wire it into an **Anthropic / OpenAI / AI Agent** node as the
system prompt, with your trigger data as the user message.

**Other endpoints:**

| Call | Returns |
|---|---|
| `GET /v1/skills` | every skill (`?bundle=pm-cs`, `?q=churn`, `?limit=20`) |
| `GET /v1/skills/{name}` | one skill as JSON (`?format=md` for raw Markdown) |
| `GET /v1/search?q=pricing` | best keyword matches |
| `GET /v1/workflows` | the 6 chain recipes |
| `GET /v1/workflows/{id}` | one recipe with its ordered steps |

**No-deploy fallback** — the catalogue is also static JSON on GitHub Pages, usable from an
HTTP Request node today:

```
GET https://mohitagw15856.github.io/pm-claude-skills/skills.json
```

Each item has `name`, `title`, `description`, `plugin`, and `instructions` (the full body).

---

## Example workflows

A ready-to-import example lives in [`n8n-example-workflow.json`](n8n-example-workflow.json)
(*Manual trigger → fetch `pr-description-writer` → return its instructions*). In n8n:
**Workflows → Import from File**.

Patterns worth building:

- **GitHub PR → PR description.** *GitHub Trigger → HTTP (get diff) → HTTP (get
  `pr-description-writer`) → AI node → GitHub (post comment).*
- **RSS → competitive signal.** *RSS Trigger → HTTP (get `competitor-signal-tracker`) → AI
  node → Slack.*
- **Form → PRD → Notion.** *Form Trigger → HTTP (get `prd-template`) → AI node → Notion
  (create page).*
- **Weekly metrics → exec update.** *Schedule → Postgres/Sheets → HTTP (get
  `executive-update`) → AI node → Email.*

---

## Tier 2 — native community node (roadmap)

A first-class `n8n-nodes-pm-skills` node (List / Search / Get / Run Skill + Run Workflow
recipe) is on the roadmap so PM Skills is installable from n8n's **Community Nodes** panel.
Want it sooner? [Open an issue](https://github.com/mohitagw15856/pm-claude-skills/issues).

## Design note — return vs run

Lean on **return the skill** (fetch the body, run it in n8n's own AI node) rather than having
PM Skills call a model for you. n8n already manages model credentials, retries, and
streaming — the REST API stays free, stateless, and model-agnostic.

## Safety

The PM Skills endpoints are **read-only** and need no auth — they only serve skill text.
Any credential in the workflow (GitHub, Slack, your LLM key) lives in n8n's own credential
store, scoped by you.
