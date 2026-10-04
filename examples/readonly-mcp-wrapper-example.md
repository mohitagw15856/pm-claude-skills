# Example: readonly-mcp-wrapper

## What this skill does

Generates a read-only MCP server over a folder of Markdown or JSON files, with the client configuration, a safety statement and a test that proves nothing can be written or escaped.

## How to trigger it

### Example 1: an Obsidian vault for Claude Code

**You say:**
> "Make a read-only MCP server so Claude Code can search my Obsidian vault at ~/Notes. Never serve the Journal folder."

**Claude produces (excerpt):**

```bash
claude mcp add notes -- node /Users/you/tools/notes-mcp/server.mjs /Users/you/Notes
```

| Tool | Input | Returns |
|---|---|---|
| list_documents | none | relative paths, Journal excluded |
| search_documents | query, limit | path and excerpt per match |
| read_document | path | full text |

Safety statement for your README:

> This server exposes three read-only tools. It contains no code that writes, deletes or moves
> files, and no network code. Paths are resolved and must stay inside ~/Notes, symlinks
> included. Only .md files under 512 KB are served, and Journal/ is excluded.

---

### Example 2: the proof

**You say:**
> "Show me it really can't escape the folder."

**Claude produces:**

```
$ ./test-server.sh
initialize                         ok
tools/list                         3 tools, all readOnlyHint
read_document "Ideas/launch.md"    ok (2,104 characters)
read_document "../.ssh/id_rsa"     refused: path is outside the served folder
read_document "link-to-home.md"    refused: path is outside the served folder (symlink)
read_document "config.yaml"        refused: only .md and .json files are served
tools/call "delete_document"       refused: unknown tool
grep for write/delete/network APIs no matches
```

## Tips for best results

- Name anything inside the folder that must stay private; it is excluded in the file walk.
- Use absolute paths in the client configuration.
- Keep a write-capable server, if you ever need one, as a separate server with its own review.

## Related skills

- `mcp-server-spec`: design a full MCP surface for a product, including auth.
- `importer-scaffolder`: turn other tools' exports into files this server can read.
