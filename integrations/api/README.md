# PM Skills API

A **read-only REST API** over the whole professional-skills library. Same public
JSON that powers the playground, served from the edge with permissive CORS — call
it from a browser, an [n8n](https://n8n.io) / [Make](https://make.com) / Lovable
flow, or your own agent. No key, no accounts.

**Base URL:** `https://pm-skills-mcp.pm-claude-skills.workers.dev`
**Spec:** [`openapi.yaml`](./openapi.yaml) (OpenAPI 3.1) · **Live docs:** the [API page](https://mohitagw15856.github.io/pm-claude-skills/api.html)

## Endpoints

| Method & path | What it does |
| --- | --- |
| `GET /v1` | Index of endpoints |
| `GET /v1/skills` | List skills. Filters: `?bundle=` `?q=` `?limit=` |
| `GET /v1/skills/{name}` | One skill **with full instructions**. `?format=md` for raw markdown |
| `GET /v1/search?q=` | Keyword search, ranked |
| `GET /v1/workflows` | Workflow recipes (skill chains) |
| `GET /v1/workflows/{id}` | One recipe with ordered steps |
| `POST /try` | Run a skill against the model (free, **throttled**) |

## Quickstart

```bash
# Find a skill
curl 'https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/search?q=explain%20a%20metric%20drop'

# Pull its full instructions (the system prompt)
curl 'https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills/executive-update?format=md'
```

## Run it yourself (bring your own key)

The honest, production path: pull a skill's `instructions` and use it as your
model's **system prompt**. Works with any provider.

```js
const skill = await (await fetch(
  'https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills/executive-update'
)).json();

const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: skill.instructions,
    messages: [{ role: 'user', content: 'This week: shipped X, churn up 2pts, hiring paused…' }],
  }),
});
```

The same `instructions` field works as the system prompt for OpenAI, Gemini, or a
local model — the library is provider-neutral.

## Notes

- **Stability:** `/v1/*` read endpoints are stable and safe to depend on.
- **`/try`** is a courtesy endpoint on a shared key; it's throttled and can go
  away. Don't build production on it — bring your own key (above).
- **CORS** is open (`*`) on the read endpoints, so browser calls just work.
- This documents the existing worker (`mcp-remote/src/index.js`); the OpenAPI
  file here is the contract, kept in step with that implementation.

MIT © Mohit Aggarwal
