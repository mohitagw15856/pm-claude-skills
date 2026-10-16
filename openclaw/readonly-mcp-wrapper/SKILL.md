---
name: readonly-mcp-wrapper
description: "Use when asked to expose a folder of notes or docs to Claude or another AI client, build an MCP server over Markdown or JSON files, let an agent read my knowledge base safely, or wrap documentation as MCP tools. Produces a read-only MCP server over a folder of Markdown or JSON files: server code using stdio transport, tool definitions, a client configuration snippet, and a safety section confirming no write, delete or network tools are exposed. To design an MCP server for a whole product, use mcp-server-spec."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/readonly-mcp-wrapper.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Read-only MCP Wrapper

The fastest way to give an AI assistant a project's knowledge (docs, notes, specs, exported data) is a small MCP server that can list, search and read files, and can do nothing else. Most hand-rolled servers drift into risk: a "helpful" write tool, a path that escapes the folder through `..` or a symlink, or logs printed to stdout that corrupt the protocol. This skill generates a server that is read-only by construction, from the tested template in `references/server-template.mjs`.

## Required Inputs

Ask for these if not provided:
- **The folder** to serve, and roughly how many files and how large
- **File types**: Markdown, JSON, or both (other types are excluded by default)
- **The client**: Claude Code, Claude Desktop, Cursor, or another MCP client
- **Runtime**: Node is the default; ask if the user needs Python instead
- **Anything inside the folder that must never be served** (drafts, private notes), to exclude by path

## Output Structure

### 1. Server code
A complete file based on `references/server-template.mjs`, adapted to the inputs:
- stdio transport: newline-delimited JSON-RPC 2.0 on stdin and stdout; all logging on stderr
- handles `initialize`, `ping`, `tools/list` and `tools/call`; ignores notifications; returns `-32601` for anything else
- the served root resolved once with `realpath`; every requested path resolved and checked to stay inside it, so `..` and symlinks cannot escape
- an allow-list of extensions and a per-file size cap
- exclusions from the inputs applied in the file walk

### 2. Tool definitions
A table and the JSON schemas:
| Tool | Input | Returns | Read-only hint |
|---|---|---|---|
| `list_documents` | none | relative paths | true |
| `search_documents` | `query` (2+ characters), optional `limit` up to 50 | path and excerpt per match | true |
| `read_document` | `path` from `list_documents` | full text | true |

Errors are returned as tool results with `isError: true` and a message that never includes the absolute path.

### 3. Client configuration
The exact snippet for the named client, with an absolute path placeholder, for example for Claude Code:
```bash
claude mcp add my-docs -- node /absolute/path/server.mjs /absolute/path/to/folder
```
and the `mcpServers` JSON block for Claude Desktop or Cursor.

### 4. Safety section
A short statement the user can paste into their README, confirming:
- the server exposes exactly three tools, all read-only
- there is no code that writes, deletes, renames or moves files
- there is no network code: no HTTP client, no sockets, no child processes
- paths cannot escape the served folder, including through symlinks
- only allow-listed file types under the size cap are returned

Then the commands that prove it: a `grep` over the server for write, delete, network and process APIs that should return nothing, and the test below.

### 5. Test script
Piped JSON-RPC requests that check: initialize succeeds; the three tools are listed; a document can be listed, searched and read; `../` traversal is refused; a symlink pointing outside is refused; a disallowed extension is refused; an unknown tool returns an error.

## Quality Checks

- [ ] Exactly three tools are exposed, each with `readOnlyHint: true`
- [ ] The server contains no write, delete, rename, network or child-process calls
- [ ] Nothing but protocol messages is written to stdout
- [ ] Traversal with `..` and symlinks pointing outside the folder are both refused
- [ ] Only allow-listed extensions under the size cap are served
- [ ] Error messages never reveal the absolute path of the served folder
- [ ] The client snippet uses absolute paths and the exact command for the named client
- [ ] The test script covers every refusal case listed above

## Anti-Patterns

- **"Just one write tool."** The moment an agent can write, the safety story changes; build a separate server for that.
- **`console.log` for debugging.** It corrupts the stdio protocol; log to stderr.
- **Checking paths with string prefixes only.** `startsWith(root)` without `realpath` lets symlinks escape.
- **Serving everything in the folder.** Allow-list file types; keys and `.env` files live in the same trees as docs.

## Example Trigger Phrases

- "Make an MCP server so Claude can read my Obsidian notes, read-only."
- "Expose this docs folder to Cursor as MCP tools."
- "Build a safe MCP server over a folder of JSON files."
- "I want my agent to search our specs but never change them."
