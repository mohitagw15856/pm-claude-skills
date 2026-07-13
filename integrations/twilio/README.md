# Text a skill (Twilio SMS / WhatsApp)

Run a professional skill by **texting it** — no app, no browser. Meets people where they already are.

```
You:  board minutes from these notes: Q3 board, 4 directors, approved the budget,
      deferred the raise. Actions: CFO to send runway model.
Bot:  MINUTES OF THE BOARD MEETING …
      — via board-minutes · full: https://…/?skill=board-minutes
```

- **Auto-routes** the message to the best-fit skill, or force one with a prefix: `prd-template: a referral program for B2B users`.
- Long results are trimmed with a link to the full run in the browser.
- Works for **SMS and WhatsApp** (Twilio treats both the same way).

## How it works

A Cloudflare Worker (`src/index.js`) verifies Twilio's request signature (HMAC-SHA1 over the URL + sorted params with your Auth Token — **fails closed** if a secret is missing), finds the skill via the hosted `/v1/search` API, fetches its instructions, runs them on your message with Claude, and returns TwiML so Twilio texts the reply back.

## Setup

1. **Deploy the worker**
   ```bash
   cd integrations/twilio
   npx wrangler deploy
   ```
2. **Add the secrets**
   ```bash
   npx wrangler secret put ANTHROPIC_API_KEY   # your Claude key — runs the skill
   npx wrangler secret put TWILIO_AUTH_TOKEN    # Twilio console → Account Info
   ```
3. **Point Twilio at it** — buy a number (or use the WhatsApp sandbox), then set
   **Messaging → "A message comes in"** to `https://<worker>.workers.dev/sms` (HTTP **POST**).
4. Text your number a task. That's it.

## Notes

- Cost is your Anthropic usage + Twilio's per-message fee. The reply is capped (`SMS_LIMIT`) so a single task stays a few segments.
- No message content is stored; the worker is stateless.
- For richer, longer artifacts, the reply always links back to the browser run.

MIT © Mohit Aggarwal
