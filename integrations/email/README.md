# Email-native operator

The skills, inside the tool everyone already lives in. **Forward a thread** (or write a fresh mail) to your operator address and the drafted artifact comes back **as a reply, in the same thread** — a PRD, a summary, board minutes, a drafted response.

```
To:      do@yourdomain.com
Subject: board-minutes
Body:    <paste or forward the meeting notes>

← Re: board-minutes
  MINUTES OF THE BOARD MEETING …
  — drafted with the "board-minutes" skill · run it yourself: https://…/?skill=board-minutes
```

- **Name a skill in the subject** (`prd-template`, `meeting-notes`, …) to force it, or just describe the task and it picks the best-fit skill.
- Replies land **in-thread** using Cloudflare's native email reply — no outbound email service needed.

## How it works

A Cloudflare **Email Worker** (`src/index.js`) parses the incoming message (`postal-mime`), routes it to a skill via the hosted `/v1/search` API, runs the skill's instructions on the body with Claude, builds a reply (`mimetext`), and sends it with `message.reply()`.

## Setup

1. **Install + deploy**
   ```bash
   cd integrations/email
   npm install
   npx wrangler deploy
   npx wrangler secret put ANTHROPIC_API_KEY
   ```
2. **Turn on Email Routing** — Cloudflare dashboard → your domain → **Email → Email Routing** → enable (this adds the MX/TXT records automatically; your domain must be on Cloudflare).
3. **Route an address to the Worker** — create a custom address like `do@yourdomain.com` with the action **"Send to a Worker" → `pm-skills-email`**.
4. Email or forward a thread to that address. The reply comes back.

## Notes

- Stateless; no message content is stored. Cost is your Anthropic usage.
- The reply always links back to the browser run for the full, editable version.
- Every draft is footered with a "review before sending / verify `[to confirm]`" reminder.

MIT © Mohit Aggarwal
