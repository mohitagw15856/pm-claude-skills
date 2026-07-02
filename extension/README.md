# 🧩 PM Skills — Browser Extension

Insert any of the **198 professional Agent Skills** straight into the **ChatGPT**, **Claude.ai**, or **Gemini** chat box. No copy-paste, no switching tabs — pick a skill, it drops the framework into your message, you add your task and send.

![works on ChatGPT, Claude.ai, Gemini](https://img.shields.io/badge/works%20on-ChatGPT%20·%20Claude.ai%20·%20Gemini-d97757)

## What it does

- Adds a floating **🧠 Skills** button on chatgpt.com, claude.ai, and gemini.google.com.
- Click it → search **198 skills** (PRD, launch plan, postmortem, rubric, contract review, runway planner…).
- Pick one → its full framework is inserted into the chat input, prefixed above whatever you've already typed.
- 100% local. Skills are **bundled with the extension** — nothing is sent to any server. No login, no API key.

## Install (unpacked — while it's pre–Web Store)

1. Download/clone this repo.
2. Go to `chrome://extensions` (or `edge://extensions`) and turn on **Developer mode**.
3. Click **Load unpacked** and select this `extension/` folder.
4. Open ChatGPT / Claude.ai / Gemini — you'll see the **🧠 Skills** button bottom-right.

Works in any Chromium browser (Chrome, Edge, Brave, Arc). A packaged Chrome Web Store / Edge Add-ons listing is on the way.

## ✓ Lint — check your own writing against a skill's quality bar (new in 1.1)

The popup's **Lint** tab is "Grammarly for professional judgment": select text you wrote on any page (a PRD in Notion, an update in GitHub, an email draft), open the extension, and it lints the selection against a skill's **Quality Checks** and **Anti-Patterns** — *"success metrics have no baselines"*, *"this KR is an output, not an outcome"*. Judgment only; it never rewrites.

- **Auto-detect** picks the matching skill from the text (or type one explicitly).
- Uses **your own Anthropic API key** (Claude Haiku — a lint costs a fraction of a cent). The key is stored in `chrome.storage.local` on your machine and sent **only to api.anthropic.com** when you click Lint.
- Results show as pass / fail / n-a chips with a specific note per check, and copy out as markdown.
- If the page blocks script injection (e.g. chrome:// pages), paste the text into the box instead.

**Manual test after loading unpacked:** select a few paragraphs on any article → open the popup (it lands on Lint, prefilled) → pick *PRD Template* → paste a key → Lint → expect a verdict list with at least one FAIL note quoting your text.

## Keeping skills up to date

The extension ships a snapshot of the catalog at `extension/skills.json`. To refresh it after skills change:

```bash
node web/build-skills.mjs      # regenerate the canonical catalog
node extension/sync-skills.mjs # copy it into the extension
```

## Privacy

The insert feature runs solely on the three chat sites listed in `manifest.json`, reads no page content beyond the message box it writes into, and makes no network requests. The Lint tab additionally uses `activeTab` + `scripting` (to read your current selection when you open the popup — never in the background) and talks to exactly one host: `api.anthropic.com`, with your own key, only when you click Lint. Nothing is ever sent to us.

## Prefer not to install anything?

Every skill also runs in the browser at the **[Playground](https://mohitagw15856.github.io/pm-claude-skills/)** (your own Claude key) or copies as a ready-made ChatGPT/Gemini prompt.
