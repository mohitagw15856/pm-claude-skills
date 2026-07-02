# 🛠️ Operations — where everything lives

A single reference for every URL, dashboard, and config location for this project.
**No secrets/tokens are stored here** — the admin dashboards below are all login-gated.

## 🌐 Public URLs (live)

| What | URL |
|---|---|
| Repo | https://github.com/mohitagw15856/pm-claude-skills |
| Playground | https://mohitagw15856.github.io/pm-claude-skills/ |
| Leaderboard | https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html |
| `llms.txt` | https://mohitagw15856.github.io/pm-claude-skills/llms.txt |
| npm package | https://www.npmjs.com/package/pm-claude-skills |
| PyPI package | https://pypi.org/project/pm-skills/ |
| Hosted MCP connector | https://pm-skills-mcp.pm-claude-skills.workers.dev/ |
| Smithery (hosted MCP) | https://smithery.ai/servers/mohit15856/pm-skills |
| Official MCP registry | `io.github.mohitagw15856/pm-claude-skills` (see `server.json`) |
| Sister project | https://github.com/mohitagw15856/ContentGoldMine |

## 🔐 Your dashboards (login required)

| What | Where | Notes |
|---|---|---|
| **Analytics (GoatCounter)** | https://mohitagw.goatcounter.com/ | Page views + `run/<skill>` events. Code `mohitagw`, set in `web/nav.js`. |
| **Cloudflare Worker** | https://dash.cloudflare.com → Workers → `pm-skills-mcp` | Redeploy: `cd mcp-remote && npx wrangler deploy` |
| **PyPI publishing** | https://pypi.org/manage/account/publishing/ | Trusted Publisher: project `pm-skills`, workflow `publish-python.yml`, env `pypi` |
| **GitHub Actions** | https://github.com/mohitagw15856/pm-claude-skills/actions | Eval leaderboard, npm/PyPI/MCP publish, deploy |
| **VS Code Marketplace** | https://marketplace.visualstudio.com/manage | Publisher `mohitagw15856` (for the `vscode-extension/`) |
| **Chrome Web Store** | https://chrome.google.com/webstore/devconsole | For the `extension/` (zip on Desktop) |

## ⚙️ Config — where things are set

| Setting | File |
|---|---|
| Analytics on/off + code | `web/nav.js` (`ANALYTICS_CODE`) |
| Hosted MCP worker | `mcp-remote/wrangler.toml` + `mcp-remote/src/index.js` |
| MCP registry manifest | `server.json` (version must match npm on publish) |
| Smithery config | `smithery.yaml` |
| PyPI publish | `.github/workflows/publish-python.yml` |
| MCP registry publish | `.github/workflows/publish-mcp-registry.yml` |
| Eval the library | Actions → "Update Skill Leaderboard" (`scope=all`, `seed_branch=eval-results`) |

## 📋 Still to submit (your account; see PM-Skills-Launch-Checklist on Desktop)

- Chrome Web Store · VS Code Marketplace · Anthropic plugin directory ([clau.de/plugin-directory-submission](https://clau.de/plugin-directory-submission))
- mcp.so · PulseMCP (optional) · 4 awesome-list PRs (travisvn, ComposioHQ, BehiSecc, hesreallyhim)

## 📦 Standing decisions

| Decision | Call | Revisit when |
|---|---|---|
| **Committing `exports/` to git** (2026-07-02) | **Keep committing.** Browsable exports on GitHub are a real feature (deep links in README/docs, zero-build consumption), and generation-at-publish would break existing links. Cost: ~32 MB tree, ~11 files rewritten per skill edit. | Pack size crosses **150 MB** (`git count-objects -vH`), or GitHub starts warning — then switch to generate-at-publish + a one-time history rewrite. |
| **Tier entry policy** (2026-07-02) | New self-contained skills enter **Stable**; **Experimental** only for external-dependency skills. Matches actual practice; authoring standard §8 updated. | If unscored-Stable skills draw quality complaints, revisit gating Stable on an eval score. |
