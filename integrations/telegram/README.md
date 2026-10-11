# 📱 PM Skills — Telegram bot

Run a professional skill from any Telegram chat — the [Slack app](../slack-app/)'s
twin for everyone who doesn't live in Slack:

```
/find churn analysis
/skill executive-update
/run executive-update  churn up 2pts, shipped referral, hiring paused
```

Plain text works too: with a key configured it auto-matches a skill and drafts the
artifact; without one it behaves like `/find`. Search and fetch need no key at all.

## 📄 Forward it: photos and PDFs of documents

Photograph a lease, a medical bill, an insurance letter or a contract and send it to the bot. It works out what the document is, picks the matching skill (`lease-decoder`, `medical-bill-decoder`, `insurance-policy-decoder` and so on), and replies with that skill's read of it: figures quoted as printed, unreadable parts named instead of guessed, and a not-advice line for legal, medical and money matters. Add a caption to say what you want ("is the deposit legal?"). It needs the Anthropic key, and takes JPEG, PNG, WebP and PDF up to 8 MB. The code is shared by both bots: [`../shared/forward-doc.js`](../shared/forward-doc.js).

## Set up (once, ~5 minutes)

1. **Create the bot:** message [@BotFather](https://t.me/BotFather) → `/newbot` →
   pick a name and handle. Copy the token it prints.
2. **Deploy the Worker:**
   ```bash
   cd integrations/telegram
   npx wrangler deploy
   npx wrangler secret put TELEGRAM_BOT_TOKEN        # from BotFather
   npx wrangler secret put TELEGRAM_WEBHOOK_SECRET   # any random string, e.g. `openssl rand -hex 16`
   npx wrangler secret put ANTHROPIC_API_KEY         # optional — enables /run
   ```
3. **Point Telegram at it:**
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook" \
     -d "url=https://pm-skills-telegram.<you>.workers.dev" \
     -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
   ```
4. Optionally register the command menu with BotFather: `/setcommands` →
   ```
   find - search the skill library
   skill - get a skill's full instructions
   run - draft the artifact here
   help - how to use the bot
   ```

## Privacy

The Worker is stateless: it stores nothing, and sees only the messages Telegram
forwards to the webhook. `/find` and `/skill` touch only the public catalog API.
`/run` sends the chat text to the Anthropic API on the **deployer's** key — deploy
your own bot rather than sharing one across a team you don't want on your key, and
note that Telegram chats are not a place for confidential inputs unless you trust
the bot's deployer. A forwarded document goes to Anthropic for two calls (identify,
then read) and is not stored; the bot says so before it reads. Webhook calls are authenticated with a secret token, so third
parties can't feed the worker fake updates.
