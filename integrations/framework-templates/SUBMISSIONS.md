# Framework template submissions

Ready-to-open pull requests that put the skills inside each framework's own examples. Each one is opened by the repository owner by hand. Before opening one, read the target repository's CONTRIBUTING file; some only take examples through a discussion or issue first. Then re-run the file in this folder against the framework's latest release.

## Vercel AI SDK: `vercel/ai`

- **Where:** `examples/` (look for the folder that holds the MCP client examples, for example `examples/mcp/`).
- **Add:** `vercel-ai-sdk/agent.ts` as `professional-skills-agent.ts`.
- **Title:** `examples(mcp): agent that loads professional skills from a public MCP server`
- **Body:**

  > Adds a small example of `createMCPClient` over HTTP against a public, keyless MCP server that serves 1,285 MIT-licensed professional skills (PRDs, post-mortems, contract reviews and so on). The agent calls `search_skills`, then `get_skill`, then follows the skill. It shows a pattern people ask about: loading instructions as tools at run time, not just calling APIs. No new dependencies beyond `@ai-sdk/mcp`. Happy to move it or trim it to fit your examples' conventions.

## OpenAI Agents SDK: `openai/openai-agents-python`

- **Where:** `examples/mcp/` (a new `skills_server_example/` folder).
- **Add:** `openai-agents/agent.py` as `main.py`, plus a three-line README.
- **Title:** `Add example: Streamable HTTP MCP server serving agent skills`
- **Body:**

  > A runnable example of `MCPServerStreamableHttp` against a public, keyless server (no local process to start), which makes it a quick way to try MCP tools. The server serves 1,285 MIT-licensed professional skills; the agent searches for the right one, loads it and follows it.

## LangChain: `langchain-ai/langchain-mcp-adapters`

- **Where:** the README's examples section, or `examples/` if the repository has one.
- **Add:** `langgraph/agent.py`.
- **Title:** `docs: example with a public streamable-HTTP MCP server`
- **Body:**

  > `MultiServerMCPClient` with `streamable_http` against a public server needs no local setup, so it makes a good first example. It serves 1,285 MIT-licensed skills; the agent uses `create_agent` from `langchain.agents`.

## Mastra: `mastra-ai/mastra`

- **Where:** `examples/` (a new `agent-skills-mcp/` folder with a `package.json`).
- **Add:** `mastra/agent.ts`.
- **Title:** `examples: agent with professional skills over MCP`
- **Body:**

  > A minimal `MCPClient` plus `Agent` example against a public, keyless MCP server serving 1,285 MIT-licensed professional skills. It notes the `serverName_toolName` prefixing, which trips people up the first time.

## Directories that list MCP servers

These are listings rather than templates, and they are often accepted faster: the MCP Registry (already published; see `server.json`), Smithery (`smithery.yaml`), and Glama (`glama.json`). See [growth/awesome-lists.md](../../growth/awesome-lists.md) for the awesome-list submissions.
