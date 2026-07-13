# PM Skills — Slack & Discord bot (`/pmskill`)

Bring the library into the places teams actually work. A single Cloudflare Worker serves a **`/pmskill`** slash command on **both** Slack and Discord: type what you need, get the top matching skills with links to run them free in the browser.

```
/pmskill launch plan
→ • Go-To-Market — build the storyline, channels, and launch plan …
  • Launch Readiness — Go / Conditional Go / No-Go with ranked blockers …
  • Product Launch Checklist — every function, owner, and T-minus step …
```

It reads the live REST API, so results stay current. Requests are **cryptographically verified** (Slack HMAC, Discord Ed25519) and the Worker **fails closed** — a route without its secret refuses.

## Deploy the Worker (once)

```bash
cd integrations/chatops
npx wrangler deploy
```

Wrangler prints your URL, e.g. `https://pm-skills-chatops.<you>.workers.dev`.

## Slack setup

1. Create an app at **[api.slack.com/apps](https://api.slack.com/apps)** → *From scratch*.
2. **Basic Information** → copy the **Signing Secret**, then:
   ```bash
   npx wrangler secret put SLACK_SIGNING_SECRET
   ```
3. **Slash Commands** → *Create New Command*:
   - **Command:** `/pmskill`
   - **Request URL:** `https://<worker>/slack`
   - **Short description:** `Search the PM Skills library`
   - **Usage hint:** `what you need — e.g. launch plan`
4. **Install App** to your workspace. Try `/pmskill board minutes`.

> Replies are **ephemeral** (only the requester sees them). To post results to the channel, change `response_type` to `'in_channel'` in `src/index.js`.

## Discord setup

1. Create an app at **[discord.com/developers/applications](https://discord.com/developers/applications)**.
2. **General Information** → copy the **Public Key**, then:
   ```bash
   npx wrangler secret put DISCORD_PUBLIC_KEY
   ```
3. Register the slash command (once):
   ```bash
   DISCORD_APP_ID=xxx DISCORD_BOT_TOKEN=yyy node register-discord-command.mjs
   # add DISCORD_GUILD_ID=zzz to test instantly in one server
   ```
4. Back in the portal, set **Interactions Endpoint URL** to `https://<worker>/discord` and save (Discord sends a signed PING to verify — the Worker answers it).
5. In **OAuth2 → URL Generator**, tick `applications.commands`, open the URL, and add the app to your server. Try `/pmskill query: churn`.

## How it works

- `POST /slack` — verifies `X-Slack-Signature` (HMAC-SHA256 over `v0:{ts}:{body}`, 5-minute replay window), parses the command, searches, replies in Slack `mrkdwn`.
- `POST /discord` — verifies `X-Signature-Ed25519` over `{timestamp}{body}`, answers `PING`, then **defers** the command (type 5) and edits the reply via the interaction webhook once the search returns — so a cold upstream never trips Discord's 3-second deadline. Replies are ephemeral.
- Both call `GET /v1/search?q=…` on the hosted API and link each result to `…/?skill=<name>`.

No data is stored; nothing but an event is ever logged. MIT © Mohit Aggarwal.
