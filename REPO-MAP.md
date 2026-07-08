# 🗺 Repo Map — what's here, and what you can ignore

This is a monorepo on purpose: the skills, the tools that verify them, and the surfaces that serve them live together so they can't drift apart. But **you almost never need all of it.** Find your row:

| You want to… | You need | Ignore everything else |
|---|---|---|
| **Use the skills** | Nothing here — `npx pm-claude-skills add --agent claude`, or the [playground](https://mohitagw15856.github.io/pm-claude-skills/) | ✔ |
| **Read/copy skills** | [`skills/`](skills/) — 454 folders, one `SKILL.md` each (~3 MB total) | ✔ |
| **Contribute a skill** | [`skills/`](skills/) + [SKILL-AUTHORING-STANDARD.md](SKILL-AUTHORING-STANDARD.md) + `node scripts/skillcheck.mjs` | ✔ |
| **Contribute a bench/scenario pack** | [`packs/`](packs/) + [community/README.md](community/README.md) | ✔ |
| **Hack on the CLI** | [`bin/`](bin/) (+ `scripts/` for the build/validation tooling) | ✔ |
| **Hack on the playground** | [`web/`](web/) + `tests/web-smoke.mjs` | ✔ |
| **MCP / integrations** | [`mcp/`](mcp/) (local server) · [`mcp-remote/`](mcp-remote/) (hosted worker) · [`integrations/`](integrations/) | ✔ |

## The fast clone (skill authors: 10 seconds, ~5 MB)

```bash
git clone --filter=blob:none --sparse https://github.com/mohitagw15856/pm-claude-skills
cd pm-claude-skills && git sparse-checkout set skills scripts
```

Or take everything but skip the blobs you never open: `git clone --filter=blob:none <url>` (full tree, lazy downloads).

## Every top-level directory, one line each

| Dir | What it is | Generated? |
|---|---|---|
| `skills/` | **The product.** 454 skill definitions + their references/templates/scripts | hand-written |
| `plugins/` | The same skills packaged as 65 Claude Code marketplace bundles | assembled from skills/ |
| `web/` | The playground: 33 pages, arenas, 3D, PWA | hand-written (+ some generated, gitignored) |
| `exports/` | Skills pre-converted for 11 other tools (Cursor, Zed, Obsidian…) | **generated** — never edit |
| `tools-pkg/` | Skills as agent-framework tools (npm: `pm-skills-tools`) | **generated** |
| `bin/` | The CLI (`add`, `install`, `run`, `chain`, `doctor`, `verify`…) | hand-written |
| `mcp/`, `mcp-remote/` | MCP servers (local stdio + hosted Cloudflare worker) | hand-written |
| `skillspec/` | The standalone SKILL.md linter (npm: `skillspec-check`) | hand-written |
| `scripts/` | Build, validation, census, evolution — the machinery | hand-written |
| `tests/` | Web smoke suite + executable-skills harness | hand-written |
| `evals/`, `skillbench/` | The eval suite + the professional-work benchmark | fixtures + results |
| `community/`, `packs/` | The registry (third-party skills, sha256-pinned) + first packs | hand-written |
| `agents/`, `commands/`, `hooks/`, `output-styles/` | Claude Code extras installed by the CLI | hand-written |
| `templates/`, `examples/`, `docs/`, `i18n/`, `dataset/`, `connectors/`, `action/`, `extension/`, `integrations/`, `python/` | Workspace templates, sample outputs, docs & launch kits, Spanish translations, the HF dataset, connector guides, the GitHub Action, browser extension data, Raycast/chatops, the pip package | mixed |

**Rule of thumb:** if a directory's README says *generated*, regenerate it (`scripts/build-*.mjs`) — never edit it by hand.
