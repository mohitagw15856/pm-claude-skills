# The hosted skill broker

You do not have to install anything to use the library. A hosted MCP server serves every skill, with its inputs, permission manifest and typed contract, to any agent that speaks the Model Context Protocol. It runs on Cloudflare Workers, costs nothing to use, and reads the same `skills.json` the playground reads, so it is always on the latest release.

```
https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp
```

Transport: Streamable HTTP. No key, no sign-up, no telemetry (see [TELEMETRY.md](TELEMETRY.md)).

## Add it in one line

| Client | How |
|---|---|
| Claude Code | `claude mcp add --transport http pm-skills https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp` |
| Claude.ai, ChatGPT, Cursor, Windsurf, Zed | Add a remote MCP server (connector) with the URL above |
| Codex | `codex mcp add pm-skills --url https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp` |
| Dify, FastGPT, MaxKB, n8n | Add an MCP tool with the URL above; see [CHINA.md](CHINA.md) for the mainland note |
| Any HTTP tool | REST: `GET https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills/<name>?format=md` |
| Another agent | A2A: `GET https://pm-skills-mcp.pm-claude-skills.workers.dev/.well-known/agent-card.json` |

Prefer everything local? `claude mcp add pm-skills -- npx -y -p pm-claude-skills pm-claude-skills-mcp` runs the same tools from the npm package with no network calls.

## The flow an agent follows

1. **`search_skills`** with a few words of the task ("post-mortem for a payments outage") returns the best matches with a one-line description and tier.
2. **`get_skill_contract`** for the chosen skill returns its permission manifest and, where one exists, the typed contract: a JSON Schema for the inputs the skill needs and for the structured output it produces. The agent can validate what it has collected before spending a model call, and knows whether the skill needs a human's approval to act.
3. **`get_skill`** returns the full instructions. The agent applies them to the user's input, or hands them to a sub-agent.
4. **`run_skill`** (optional) asks the host model to run the skill through MCP sampling. A skill whose manifest says `approval: always` is refused until the caller passes `approved: true`, which is the host's signal that a human agreed.

Other tools: `list_skills` (by bundle), `get_skill_inputs` (the required-inputs list parsed from the prose), `list_workflows` and `get_workflow` (multi-skill chains), `check_contrast` (a WCAG helper for design skills).

## What a contract looks like

```json
{
  "skill": "incident-postmortem",
  "version": 1,
  "inputs":  { "type": "object", "required": ["title", "severity", "narrative"], "properties": { "...": "..." } },
  "outputs": { "type": "object", "required": ["summary", "timeline", "root_cause", "action_items"], "properties": { "...": "..." } }
}
```

Ten skills carry a contract today: prd-template, rice-prioritisation, incident-postmortem, user-story-writer, okr-builder, competitor-teardown, risk-register, churn-analysis, sprint-planning and changelog-generator. The source files live in [`schemas/skills/`](../schemas/skills/), are validated by `node scripts/check-skill-schemas.mjs` on every change, and are published at `https://mohitagw15856.github.io/pm-claude-skills/schemas/skills/<name>.json`. To add one, copy an existing file, keep `skill` equal to the folder name, and open a pull request. The format is specified in [SKILLSPEC.md section 9.2](../SKILLSPEC.md#92-typed-contract-schemasskillsnamejson).

## Permission manifests

Skills that act rather than draft declare what they need in their frontmatter ([SKILLSPEC.md section 9.1](../SKILLSPEC.md#91-permission-manifest-metadatapermissions)):

```yaml
metadata:
  permissions:
    tools: [browser, screenshot]
    approval: always
```

The broker returns this from `get_skill` and `get_skill_contract`, so a host can show the user "this skill wants a browser and will ask before acting" before anything runs.

## Run your own

The Worker is open source in [`mcp-remote/`](../mcp-remote/) and deploys in two minutes with `wrangler deploy`. It fetches `skills.json` from GitHub Pages once an hour, so a fork serves its own catalogue by changing one URL.
