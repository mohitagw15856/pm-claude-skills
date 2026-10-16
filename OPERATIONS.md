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
| **Committing `exports/` to git** (2026-07-02, **reversed 2026-10-11**) | **Stop committing; build at publish.** At 1,285 skills the folder was 15,577 files and 108 MB, and #335 touched 10,719 files, so GitHub skipped the path-filtered CI checks entirely. Now `exports/` is gitignored, built by `prepack` before every npm publish (the package still ships it), built in CI before linting, built on first use from a clone by the CLI and `install.sh`, and published as one commit to the browsable [`exports` branch](https://github.com/mohitagw15856/pm-claude-skills/tree/exports) by `publish-exports-branch.yml`, so deep links keep working. | If a tool needs exports at a fixed git path on main again. |
| **Tier entry policy** (2026-07-02) | New self-contained skills enter **Stable**; **Experimental** only for external-dependency skills. Matches actual practice; authoring standard §8 updated. | If unscored-Stable skills draw quality complaints, revisit gating Stable on an eval score. |
| **Teams = folder convention, no backend** (2026-07-04) | **No accounts, no hosted DB, no server-side team features.** The workspace bridge + a shared git repo + replay links + registry packs ARE the team story. Full reasoning: [docs/TEAMS-DECISION.md](docs/TEAMS-DECISION.md). | Two of: repeated asks the conventions can't serve · an ops-dedicated maintainer · sustainable funding for the operational tax. |
| **Evolution loop is dispatch-only** (2026-07-04) | `evolve-skills.yml` never runs on a schedule — it spends API credits (1 rewrite + 2 judge calls per skill). Winners land on `evolve-<run>` branches, never main; humans merge. | If a free/local judge becomes good enough to make runs costless. |

## API spending is off by default (October 2026)

Nothing calls the Anthropic API automatically unless the **`ALLOW_API_SPEND`** variable is `true`:

- **GitHub:** set it as a repository variable. It gates PR descriptions, the `/skill` issue bot, daily scheduled reports, the monthly AI-at-work and Chinese benchmarks, and Skill Cup scoring.
- **Cloudflare:** set it as a worker variable. It gates Claude for the site's free answers (otherwise Cloudflare Workers AI's free allowance) and the router's Claude fallback.

Manual dispatches of benchmark workflows still run when you start them. The PM-8B teacher pass refuses to use Claude without `--allow-api-spend`; its free route is `training/run-on-gpu.sh`.
