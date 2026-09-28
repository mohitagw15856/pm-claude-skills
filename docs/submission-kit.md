# 📮 Submission kit — the distribution backlog, ready to click through

Everything below is prepared; each submission needs **your logged-in account** for the final clicks. Work top to bottom — ~45 minutes total.

## 1. Chrome Web Store (the extension, v1.1 with ambient Lint)

**Prepared:** `~/Desktop/pm-skills-extension-v1.1.0.zip` (fresh build of `extension/`, dev files excluded).

1. https://chrome.google.com/webstore/devconsole → your developer account ($5 one-time fee if not yet registered)
2. **New item** → upload the zip
3. Listing copy (paste-ready):
   - **Name:** PM Skills — Skill Picker & Writing Lint
   - **Summary (132 chars max):** Insert 441 professional AI skills into ChatGPT, Claude & Gemini — and lint your own writing against a skill's quality bar.
   - **Description:** Use the description section from [`extension/README.md`](../extension/README.md) (What it does + the Lint section).
   - **Category:** Productivity → Tools. **Language:** English.
4. **Privacy tab** (they will ask; honest answers):
   - Single purpose: "Insert professional writing frameworks into AI chat sites and lint user-selected text against quality checklists."
   - Permission justifications — `storage`: persists the user's own API key + preferences locally · `activeTab`/`scripting`: reads the user's current text selection only when the popup is opened · host `api.anthropic.com`: sends lint requests with the user's own key. **No analytics, no data collection** — say exactly that.
   - Remote code: none (all bundled).
5. Screenshots: 1280×800 — take two: the skill picker on chatgpt.com, and the Lint tab with verdicts. Submit for review (typically 1–3 days).

## 2. VS Code Marketplace

**Prepared:** `vscode-extension/pm-skills-0.1.0.vsix` (freshly packaged, verified).

1. https://marketplace.visualstudio.com/manage — publisher `mohitagw15856` (create it there if it doesn't exist yet; needs an Azure DevOps org + a Marketplace PAT with *Marketplace → Manage* scope)
2. Either upload the `.vsix` in the web UI (**New extension → Visual Studio Code**), or from the terminal:
   ```bash
   cd vscode-extension && npx @vscode/vsce login mohitagw15856 && npx @vscode/vsce publish
   ```
3. The README in `vscode-extension/` becomes the listing page automatically.

## 3. mcp.so

Form-based — https://mcp.so → **Submit**: paste the repo URL (`https://github.com/mohitagw15856/pm-claude-skills`) and the npm package (`pm-claude-skills-mcp`). It indexes from GitHub+npm, so the listing self-updates. While there, also check **PulseMCP** (pulsemcp.com → submit) — same two links.

## 4. Awesome-list PRs

Opened from your account by Claude (see the PR links in the session summary) — if any list maintainer requests format changes, the PRs are one-line edits.

## 5. After all four

Update the "Still to submit" section of [`OPERATIONS.md`](../OPERATIONS.md) — move the completed ones into the live-links table with their listing URLs.

---

## 🏪 Storefront submissions — one-time, permanent discovery channels

Each entry below is paste-ready. Do them in any order; each takes 5-15 minutes.

### 1. PulseMCP (pulsemcp.com)
Submit at pulsemcp.com → "Submit a server".
- **Name:** PM Skills
- **Server URL / package:** `npx -y -p pm-claude-skills pm-claude-skills-mcp` · hosted: `https://pm-skills-mcp.pm-claude-skills.workers.dev/`
- **Description:** 454 professional Agent Skills (PRDs, launches, postmortems, negotiations, compliance…) as MCP tools: search_skills, get_skill, workflow recipes, and run_skill via MCP sampling — execute any skill with ZERO API key (your client's model does the work). Community registry + REST API included.
- **Repo:** https://github.com/mohitagw15856/pm-claude-skills

### 2. mcp.so
Submit at mcp.so → "Submit" (GitHub URL is usually enough; it auto-reads the README).
- **GitHub URL:** https://github.com/mohitagw15856/pm-claude-skills
- If a description field appears, reuse the PulseMCP one above.

### 3. Glama (glama.ai/mcp)
`glama.json` is now in the repo root with your handle as maintainer — Glama indexes npm MCP packages automatically. Go to glama.ai/mcp, search "pm-claude-skills", and **claim the server** with your GitHub login. If it hasn't been indexed, use their "Add server" with the npm package name `pm-claude-skills-mcp`.

### 4. Slack App Directory (the /pmskill bot, shipped v35)
api.slack.com/apps → your app → "Manage Distribution" → "Submit to App Directory".
- **Short description:** Instantly pull any of 454 professional skill templates (PRDs, launch checklists, postmortems…) into your channel with /pmskill.
- **Long description:** reuse the bot section from integrations/chatops/README.md.
- Needs: app icon (use icon.svg → PNG), a support URL (the repo), a privacy note ("processes only the command text; stores nothing" — verify against the bot code before submitting).

### 5. Discord App Directory
discord.com/developers → your application → "App Directory" → get discoverable.
- Same copy as Slack. Needs the bot verified if it's in 100+ servers; below that, the directory listing is still available for eligible apps.

### 6. Raycast Store (extension already built: integrations/raycast/)
The extension is store-shaped already (search → open/run/install skills via the hosted REST API).
1. `cd integrations/raycast && npm install && npx ray develop` — test it locally in Raycast once.
2. Fork raycast/extensions, copy the folder in under `extensions/pm-skills/`, `npx ray build -e dist` to validate.
3. Open the PR — their bot walks you through review. Store listing = permanent storefront in front of exactly your audience.

### 7. pre-commit hooks directory (pre-commit.com/hooks)
The repo ships `.pre-commit-hooks.yaml` (the `skillspec` hook). Get listed:
- PR to https://github.com/pre-commit/pre-commit.github.io adding `mohitagw15856/pm-claude-skills` to `all-repos.yaml` (alphabetical).
- One-line PR; their CI does the rest.

### 8. The awesome-list PRs (highest value, yours by request)
The prefilled entries are earlier in this document — awesome-claude-code, awesome-mcp-servers, awesome-chatgpt, awesome-product-management.
