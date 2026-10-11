# Agent framework templates

Starter agents for four frameworks. Each gets this library's 1,285 professional skills through the hosted MCP server (`https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp`), so there is no key to get and nothing to install beyond the framework itself. The agent searches for the right skill, loads it, and follows it, quality checks included.

| Framework | File | Language | Checked with |
|---|---|---|---|
| Vercel AI SDK | [`vercel-ai-sdk/agent.ts`](vercel-ai-sdk/agent.ts) | TypeScript | `ai` 7.0, `@ai-sdk/mcp` 2.0 |
| OpenAI Agents SDK | [`openai-agents/agent.py`](openai-agents/agent.py) | Python | `openai-agents` 0.23 |
| LangChain / LangGraph | [`langgraph/agent.py`](langgraph/agent.py) | Python | `langchain` 1.4, `langgraph` 1.2, `langchain-mcp-adapters` 0.3 |
| Mastra | [`mastra/agent.ts`](mastra/agent.ts) | TypeScript | `@mastra/core`, `@mastra/mcp` 2.2 |

"Checked" means each file's MCP connection was run against the live server (all six tools listed, and a `search_skills` call returned results) and the TypeScript was type-checked with `--strict`. The model calls themselves need your provider key.

The server's tools: `search_skills`, `get_skill`, `list_skills`, and three renderers (`render_rice_matrix`, `render_roadmap`, `render_health_scorecard`). Prefer running locally? Replace the URL with the stdio server: `npx -y -p pm-claude-skills pm-claude-skills-mcp`. Python projects can also use `pip install pm-skills`, which has LangChain and CrewAI tools built in ([python/](../../python/)).

## Getting these into the frameworks' own templates

[`SUBMISSIONS.md`](SUBMISSIONS.md) has the target repository for each framework, what to add, and pull-request text ready to paste. Those PRs are the maintainers' call, so they are opened by hand.
