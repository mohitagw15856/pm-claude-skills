# PM Skills — Watch-me-work Coach (browser extension)

The library comes to *you*. As you draft a doc, an issue, or an email, a quiet nudge suggests the professional skill that fits — one click to run it. Proactive and in-context, not a catalog you have to remember to visit.

> Writing a PRD in Google Docs → *"💡 Drafting this? Try the **PRD Template** skill — Run →"*
> Typing an incident update in a GitHub issue → *"💡 Try the **Incident Postmortem** skill"*

Works on **Google Docs, Gmail, GitHub, Linear, Notion, Jira/Confluence, and Slack**.

### Or: right-click any text → send it to a skill

Don't want to wait for a nudge? Select any text on **any** page, right-click, and choose **"Run a PM Skill on …"**. Pick one of a dozen everyday skills (Executive Update, PRD, Postmortem, Rewrite Clearer, …) and the playground opens with your selection already dropped into the skill's first input — ready to run. Or choose **"Browse the whole library…"** to send the selection to the command bar and pick the best fit from all 500+.

This is handled by a small background service worker (`background.js`) using Chrome's `contextMenus` API. Like the coach, it sends nothing on its own — it just opens a link your browser navigates to.

## Private by design

Everything runs locally. The text you type is matched against a **bundled skill index** in your browser — **nothing you write ever leaves the page**. The only thing that happens is a suggestion chip appears; clicking it opens the playground.

## How it works

A single content script (`content.js`) watches editable fields, waits for a pause in typing, keyword-matches what you've written against `coach-skills.json` (a compact index of all skills), and — only when there's a real signal — shows a dismissible chip in the corner. Dismiss a suggestion and it won't nag you again on that page.

## Install (unpacked)

1. Open **`chrome://extensions`** (or `edge://extensions`), enable **Developer mode**.
2. **Load unpacked** → select this `integrations/coach-extension/` folder.
3. Open a Google Doc / GitHub issue / email and start writing — the coach appears when it has a good match.

## Keep it current

After a release, refresh the bundled index:

```bash
node integrations/coach-extension/sync-skills.mjs
```

To publish to the Chrome Web Store, zip this folder and submit it.

MIT © Mohit Aggarwal
