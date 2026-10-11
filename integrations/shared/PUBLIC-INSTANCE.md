# Running a public instance of the bots

The Telegram bot, the WhatsApp bot and the phone line are built to be deployed by whoever pays for them. To share one instance with everyone, for example a public "@PMSkillsBot", turn on the daily caps so it can't run up your Anthropic bill.

1. Create a KV namespace and bind it as `CAPS_KV` in each worker's `wrangler.toml`:

   ```bash
   npx wrangler kv namespace create CAPS_KV
   ```

   ```toml
   [[kv_namespaces]]
   binding = "CAPS_KV"
   id = "<the id it printed>"
   ```

2. Optionally set the limits (defaults shown) under `[vars]`:

   ```toml
   [vars]
   CAP_PER_USER_PER_DAY = "5"
   CAP_GLOBAL_PER_DAY = "200"
   ```

3. Redeploy. Every model call (a drafted skill, a read document, a phone answer) counts against both limits. Search and `/skill` stay free.

**What it costs:** with the defaults, at most 200 model calls a day across all users. That's roughly $1 to $3 a day on Sonnet for documents and drafts, and less on Haiku for the phone line. Set the global cap to what you are willing to spend.

**Privacy:** the cap stores a SHA-256 hash of the chat id or phone number with a count, for two days. Nothing else. Code: [`caps.js`](caps.js).

**Then share it:** put the bot link or number on the site's [integrations page](../README.md) and in the launch kit (`docs/launch-drafts/2026-10-bets/10-forward-it.md`, `14-phone-line.md`).
