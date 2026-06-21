# 📡 Listing PM Skills in the MCP registries

The MCP server is on npm as **`pm-claude-skills-mcp`** and ships two manifests so the major
registries can index it:

- [`server.json`](../server.json) — the **official MCP registry** schema (reverse-DNS name `io.github.mohitagw15856/pm-claude-skills`).
- [`smithery.yaml`](../smithery.yaml) — **Smithery** launch config.

Getting listed in these is pure distribution — each is a search surface where people discover MCP servers. Steps (one-time, your accounts):

| Registry | How to list |
|---|---|
| **Official MCP registry** | ✅ Automated — the [`publish-mcp-registry.yml`](../.github/workflows/publish-mcp-registry.yml) workflow publishes `server.json` on each release (GitHub OIDC verifies the `io.github.*` namespace; no secret). Run it from the Actions tab anytime. |
| **Smithery** ([smithery.ai](https://smithery.ai)) | Connect the GitHub repo at smithery.ai → it reads `smithery.yaml` and lists the server. |
| **mcp.so** ([mcp.so](https://mcp.so)) | Submit the repo via their "Submit" form — it indexes from GitHub + npm. |
| **Glama** ([glama.ai/mcp/servers](https://glama.ai/mcp/servers)) | Auto-discovers public MCP servers on GitHub; submit/claim the listing to add metadata. |
| **PulseMCP** ([pulsemcp.com](https://www.pulsemcp.com)) | Submit via their "Add a server" form. |

Also worth doing: the [official Claude plugin directory](https://clau.de/plugin-directory-submission) (for the Claude Code plugin) and the remote-connector URL from [`../mcp-remote`](../mcp-remote) for ChatGPT/Claude.ai.

> Keep `server.json`'s `version` in step with `package.json` when you publish a new npm version, so the registry shows the current release.
