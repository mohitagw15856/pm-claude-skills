---
name: mcp-server-spec
description: "Design an MCP server for a product — the tool surface, auth model, and safety boundaries that make it genuinely usable by AI agents. Use when asked to spec an MCP server, expose a product to agents, design tools for Claude or other MCP clients, or review why an existing MCP server performs badly. Produces a complete server spec: a small task-shaped toolset with agent-tested descriptions, auth and scoping decisions, error design, and an explicit not-exposed list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/mcp-server-spec.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# MCP Server Spec Skill

Every SaaS is shipping an MCP server; most dump their REST API as forty tools and wonder why agents flail. This skill designs the server as what it actually is: a *user interface for a non-human user* — few tools, task-shaped, with descriptions written for a model deciding under uncertainty.

## What This Skill Produces

- A **toolset design**: 3-10 tools mapped to agent *tasks*, not API endpoints
- **Per-tool specs**: name, description (the routing surface), parameters, returns, error behaviour
- **Auth & scoping decisions**: how credentials flow, what a token can never do
- An explicit **not-exposed list** with reasons — the most load-bearing section
- A **test plan**: the agent-eval loop that proves the toolset works

## Required Inputs

Ask for (if not already provided):
- **The product** and what users hire it for (the top 5 jobs, not the feature list)
- **The existing API surface** (endpoints or capability list) if one exists
- **Who the agent acts for** — the end user's own account? a service account? multi-tenant?
- **The riskiest actions** the product supports (deletes, sends, payments, permission changes)

## Design Method

1. **Start from agent tasks, not endpoints.** List the 5-8 things an agent will actually be *asked to do* with this product ("file an expense", "find last quarter's report", "summarise ticket history"). Each becomes one tool — even if it spans four API calls internally. An endpoint-mirrored toolset makes the agent do your orchestration; a task-shaped one does it for them.
2. **Keep the toolset small.** Every tool dilutes selection accuracy on every call. Target ≤10; past ~15, split into separately-loadable servers by workflow. Merge list/get/search variants behind one tool with parameters where natural.
3. **Write descriptions as routing surfaces.** The description is all the model sees when choosing. Formula per tool: what it does (one clause) · when to use it *and when to use the sibling tool instead* · what it returns. Test: could a model pick correctly between your two closest tools from descriptions alone?
4. **Design returns for context windows.** Return the 6 fields an agent needs, not the 60 the API has; include stable IDs for chaining; paginate with explicit `has_more`; keep any response under ~2k tokens by default with an opt-in for detail.
5. **Make errors instructive.** An agent retries what it understands: `"date must be YYYY-MM-DD"` beats `400 Bad Request`. Every error names the parameter at fault and the fix.
6. **Draw the safety boundary.** Classify every capability: **expose** (read/create, low blast radius) · **expose gated** (destructive/outward-facing — require an explicit confirmation parameter and document that clients should surface approval) · **never expose** (auth changes, deletes without recovery, bulk exports of other users' data). The never-list ships in the spec with reasons.
7. **Specify auth honestly.** OAuth per end user (agent acts as the user, inherits their permissions) vs API key (service account — then per-tool scoping matters more). State token lifetime, revocation, and what happens mid-session on expiry.

## Output Format

### MCP Server Spec: [product]

**Agent jobs served:** [the 5-8 tasks] · **Tool count:** [n] · **Auth:** [model + scoping]

**Tools**
| Tool | Description (as shipped) | Key params | Returns | Risk class |
|---|---|---|---|---|

**Gated actions:** [which tools require confirmation params, and the expected client behaviour]

**Never exposed:** [capability → reason] *(one line each; this list is reviewed like an API contract)*

**Error design:** [the error shape + 3 example messages]

**Test plan:** [10-15 realistic agent prompts spanning the jobs; run against a real client; a tool whose description gets misselected twice gets rewritten, not documented around]

## Quality Checks

- [ ] Every tool maps to an agent task; no tool exists because "the endpoint was there"
- [ ] Any two sibling tools are distinguishable from their descriptions alone
- [ ] Default responses fit comfortably in a context window (≤~2k tokens)
- [ ] Every destructive or outward-facing action is gated or on the never-list
- [ ] Errors name the offending parameter and the fix
- [ ] The spec includes the agent-eval test plan, not just the schema

## Anti-Patterns

- [ ] Do not mirror the REST API — 40 endpoint-tools is the #1 way MCP servers fail
- [ ] Do not write descriptions for developers ("wraps the /v2/items endpoint") — write them for a model choosing a tool
- [ ] Do not return full API payloads — context windows are the scarce resource
- [ ] Do not expose destructive actions ungated because "the client will be careful"
- [ ] Do not skip the never-exposed list — an MCP server without one hasn't been threat-modelled
- [ ] Do not ship without running the agent test plan — schema-valid and agent-usable are different properties

## Example Trigger Phrases

- "Spec an MCP server."
- "Expose a product to agents."
- "Design tools for Claude."
- "Review why an existing MCP server performs badly."
