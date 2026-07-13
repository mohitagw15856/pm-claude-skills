# PM Skills — Watch-me-work Coach (browser extension)

The library comes to *you*. As you draft a doc, an issue, or an email, a quiet nudge suggests the professional skill that fits — one click to run it. Proactive and in-context, not a catalog you have to remember to visit.

> Writing a PRD in Google Docs → *"💡 Drafting this? Try the **PRD Template** skill — Run →"*
> Typing an incident update in a GitHub issue → *"💡 Try the **Incident Postmortem** skill"*

Works on **Google Docs, Gmail, GitHub, Linear, Notion, Jira/Confluence, and Slack**.

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
