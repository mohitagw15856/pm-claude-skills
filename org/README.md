# Org Edition — run your company's skill library on your infrastructure

One command gives your org: the full playground, the REST API, all 466 curated skills, **plus your private skills** — on your network, with zero data leaving it.

```bash
git clone https://github.com/mohitagw15856/pm-claude-skills && cd pm-claude-skills
docker compose -f org/compose.yml up -d        # or: node org/server.mjs
open http://localhost:8080
```

- **Private skills**: drop `org/private-skills/<name>/SKILL.md` folders — hot-reloaded every 60s, they override curated skills on name collision, and show `source: "private"` in the API. Convert your existing SOPs with `npx pm-claude-skills migrate ./your-sops`.
- **Access control**: deliberately none built in — run it behind your VPN/SSO proxy exactly like any internal tool. No accounts here means no account database to breach.
- **The API** (`/v1/skills`, `/v1/skills/:name`, `/v1/search?q=`) is drop-in compatible with the hosted worker's REST shape, so n8n/Make/internal agents point at your instance instead.
- **Nothing phones home.** No telemetry, no license checks, MIT.

Team conventions (shared brains, minutes folders, review gates) are documented in [TEAMS-DECISION.md](../docs/TEAMS-DECISION.md) — the Org Edition is the server-shaped half of that story, operated by you.

**Want it set up for you?** Fixed-scope setup, private skill authoring, and support retainers: [docs/SERVICES.md](../docs/SERVICES.md).
