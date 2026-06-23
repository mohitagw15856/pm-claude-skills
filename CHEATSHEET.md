<!-- Single-page cheatsheet. Canonical source; a printable poster lives at web/cheatsheet.html
     (rendered to docs-assets/cheatsheet.png / .pdf). Keep the numbers in sync with web/skills.json. -->

# 🧠 PM Skills — One-Page Cheatsheet

**207 open-source AI skills + memory + actions, for every profession.** MIT.
**Repo:** https://github.com/mohitagw15856/pm-claude-skills · **Try free (no install):** https://mohitagw15856.github.io/pm-claude-skills/?ref=cheatsheet

> *PM = Professional, not just Product Management.* Each skill is a `SKILL.md` that teaches an AI the real
> structure a senior pro uses — PRDs, exec updates, launch plans, postmortems — so the first draft is shippable.
> **207 skills · 21 professions · 196 eval-scored (avg 4.8/5) · runs in Claude / ChatGPT / Gemini / Cursor / Codex / Hermes.**

---

## ⚡ Install (pick one)

| Want… | Command |
|---|---|
| **Claude Code** (skills + agents + commands + personas) | `npx pm-claude-skills add --agent claude` |
| **Any agent** (Cursor/Codex/60+) via the open installer | `npx skills add mohitagw15856/pm-claude-skills` |
| **MCP — on demand, every client** (no per-file install) | `claude mcp add pm-skills -- npx -y pm-claude-skills-mcp` |
| **Hosted MCP / connector URL** (ChatGPT, Claude.ai, Cursor) | `https://pm-skills-mcp.pm-claude-skills.workers.dev/` |
| **Python** (LangChain / CrewAI tools) | `pip install pm-skills` |
| **Claude Code plugins** (by profession) | `/plugin marketplace add mohitagw15856/pm-claude-skills` |
| **Nothing** — run in the browser with your own key | [open the Playground](https://mohitagw15856.github.io/pm-claude-skills/) |

---

## 🗂️ Skills by profession (207 across 21)

| Profession | # | Try first | Profession | # | Try first |
|---|--:|---|---|--:|---|
| 🛠️ Product Mgmt | 37 | `/prd` `/rice` | ⚖️ Legal | 7 | `contract-review` |
| 👩‍💻 Engineering | 43 | `incident-postmortem` | 💰 Finance | 5 | `investor-pitch-deck` |
| 📣 Marketing & GTM | 8 | `go-to-market` | 🚀 Founders | 6 | `startup-idea-validator` |
| 🤝 Customer Success | 6 | `cs-health-scorecard` | 🎓 Educators | 6 | `lesson-plan` |
| 📊 Data & Analytics | 12 | `metric-tree-builder` | 🎬 Creators | 6 | `hook-writer` |
| 🧑‍💼 Leadership/People | 5 | `executive-update` | 👥 HR | 5 | `job-description-writer` |
| 🎨 Design & UX | 4 | `design-critique` | 🤝 Sales | 6 | `sales-battlecard` |
| 🏢 Business/Strategy | 3 | `competitor-teardown` | ⚙️ Operations | 10 | `sop-writer` |
| 🖼️ Figma | 10 | `figma-design-review` | 🏥 Research/Health | 4 | `literature-review` |
| 📱 Social Media | 5 | `social-media-strategy` | ✍️ Writers | 6 | `aeo-optimizer` |
| 🌐 Cross-profession | 10 | `meeting-notes` · `professional-brain` | | | |

**Tiers:** 🟢 50 Production-Ready · 🔵 145 Stable · 🟡 12 Experimental. New? Start with `pm-essentials` + a 🟢 skill.

---

## 🧩 Compose — recipes, agents, commands

- **Workflow recipes** (chain skills, pass context forward): `/ship-a-feature` · `/close-the-quarter` · `/launch-a-product` · `/rescue-an-account` · `/run-discovery` · `/repurpose`
- **Subagents (5):** `pm-partner` · `sprint-master` · `cs-guardian` · `launch-captain` · *(brain)*
- **Slash commands (16):** `/prd` `/rice` `/sprint-plan` `/retro` `/exec-summary` `/health-scorecard` `/brain` … + the recipes above
- **Personas (5):** Startup CTO · Growth Marketer · Solo Founder · Product Leader (`/output-style`)
- **Build visually:** [Workflow Canvas](https://mohitagw15856.github.io/pm-claude-skills/canvas.html) (drag skills into a chain) · [Auto-Agent](https://mohitagw15856.github.io/pm-claude-skills/agent.html) (plain-English goal → planned chain)
- **🌐 Any language:** run any skill in **10 languages** (Spanish · Mandarin · Hindi · Arabic *(RTL)* · Portuguese · French · German · Japanese · Russian · Indonesian) — pick a language in the playground; the frameworks are universal.

---

## 🧠 The Professional Brain — memory + actions

A local, **plain-markdown** memory the skills read before answering and write to after. **No vector DB** — grep-able, auditable, Obsidian-compatible.

```
brain/  context.md · knowledge/ · decisions/ · hypotheses/ · stakeholders/ · entities/ · source/
```

- **Provenance tags** (strongest→weakest): `[data]` `[interview]` `[external]` `[verbal]` `[hunch]` — a hunch never poses as data.
- **Ops:** `init` · `ingest` · `recall` · `record` · `review` (via the `/brain` command).
- **Recall:** `python3 brain_query.py ./brain "<query>"` — deterministic, ranked by provenance.
- **Write-back:** `brain_write.py` — append-only, **dry-run by default**, approval-gated.
- **Actions (`action-runner`):** turn a skill's recommendations into real tickets / messages — risk-rated 🟢🟡🔴, **approved per risky action**, recorded back. *Nothing acts silently.*
- **In-browser brain:** https://mohitagw15856.github.io/pm-claude-skills/brain.html (localStorage, round-trips with the files)

**The loop:** `recall → run a skill → produce → propose actions → approve → execute → record back → weekly review`

---

## 🌍 Run it anywhere — REST API & integrations

**REST API** (read-only, no auth, open CORS) — base `https://pm-skills-mcp.pm-claude-skills.workers.dev`:

| Endpoint | Returns |
|---|---|
| `GET /v1/skills` | all skills (`?bundle=` `?q=` `?limit=`) |
| `GET /v1/skills/{name}` | one skill (`?format=md` for raw Markdown) |
| `GET /v1/search?q=` | keyword search |
| `GET /v1/workflows` | the recipe chains |

- **n8n** — MCP Client node, or an HTTP node feeding a skill into your AI node → [connectors/n8n.md](connectors/n8n.md)
- **Obsidian** — every skill as a vault note / AI-plugin prompt → [connectors/obsidian.md](connectors/obsidian.md)
- **Lovable** — build skill-powered apps; a knowledge snippet makes its generator skill-aware → [connectors/lovable.md](connectors/lovable.md)
- **Exports (10 platforms):** ChatGPT · Gemini · Cursor · Windsurf · Aider · Cline · Continue · Zed · Roo · Obsidian

---

## ✅ Quality & 🛠️ tooling

- **Eval-scored, not just counted:** an LLM judge rates each skill (structure · completeness · usefulness · grounding) — **196 scored, avg 4.8/5** → [leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html)
- **Self-improving:** `/improve` rewrites a skill and keeps the change only if the score goes up.
- **Gates on every PR:** SkillCheck (structure) + Skill Security Auditor (prompt-injection / exfiltration).
- **Explore & try:** [Skill Galaxy](https://mohitagw15856.github.io/pm-claude-skills/galaxy.html) (constellation map) · [Ask](https://mohitagw15856.github.io/pm-claude-skills/ask.html) (dev Q&A) · [Grade your draft](https://mohitagw15856.github.io/pm-claude-skills/grade.html) · [Compare mode](https://mohitagw15856.github.io/pm-claude-skills/) · [Skill Studio](https://mohitagw15856.github.io/pm-claude-skills/studio.html) (make a skill in-browser → PR)
- **In CI:** the [GitHub Action](action/) runs a skill on any PR; the **Skill Bot** runs `/skill <name>` from a comment.

---

<sub>⭐ **Star & share:** https://github.com/mohitagw15856/pm-claude-skills · Built by [Mohit Aggarwal](https://medium.com/@mohit15856) · MIT · *PM stands for Professional.*</sub>
