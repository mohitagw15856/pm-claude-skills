# PM Skills on Discord

Two slash commands for a community or team server:

- **`/skill request:<what you need> [skill:<name>]`**: picks the right skill (or uses the one you name), runs it on your request with your model, and posts the finished answer.
- **`/find task:<what you are doing>`**: suggests up to five skills.

It uses Discord's **HTTP interactions**: Discord POSTs each command to your server, signed with Ed25519, so there is no gateway connection to keep alive and it runs anywhere that can take an HTTPS request. Skill routing and the model call are shared with the [Feishu, DingTalk and WeCom bot](../chat-bots/README.md), so the same `PM_LLM_*` settings choose DeepSeek, Qwen, GLM, ModelScope's free quota or a local Ollama. Python 3.9+, no required dependencies.

## Set up

1. In the [Discord Developer Portal](https://discord.com/developers/applications), create an application. From **General Information**, copy the **Application ID** and **Public Key**. From **Bot**, reset and copy the **token** (used once, to register the commands).
2. Register the commands:

   ```bash
   DISCORD_APPLICATION_ID=… DISCORD_BOT_TOKEN=… python3 pm_discord_bot.py --register
   ```

3. Run the server where Discord can reach it over HTTPS (a VPS behind a reverse proxy, or any container host):

   ```bash
   DISCORD_PUBLIC_KEY=… DISCORD_APPLICATION_ID=… \
   PM_LLM_PROVIDER=deepseek PM_LLM_API_KEY=… \
   python3 pm_discord_bot.py --port 8090
   ```

   With Docker, from the repository root:

   ```bash
   docker run -d --name pm-discord -p 8090:8090 -v "$PWD":/app -w /app/integrations/discord-bot \
     -e DISCORD_PUBLIC_KEY -e DISCORD_APPLICATION_ID -e PM_LLM_PROVIDER -e PM_LLM_API_KEY \
     python:3.12-slim python3 pm_discord_bot.py --port 8090
   ```

4. In the Developer Portal, set **Interactions Endpoint URL** to `https://<your-host>/interactions`. Discord sends a signed PING to check it; the bot answers it.
5. Invite the app to your server with the `applications.commands` scope (OAuth2 → URL Generator).

## How it behaves

- Every request's Ed25519 signature is checked against your public key, and requests with timestamps older than five minutes are refused. The `cryptography` package is used when installed; otherwise a pure-Python RFC 8032 verifier is used (both are checked against the RFC test vectors by `--selftest`).
- `/skill` answers within Discord's three-second limit with "thinking…", then edits in the result. Long answers are split across up to four messages of under 2,000 characters.
- Each user gets six requests a minute by default (`PM_RATE_PER_MIN`).
- Nothing about messages or keys is logged: only the HTTP method and status.
- Outputs are drafts from a model, not professional advice; the skills say so where it matters.

`python3 pm_discord_bot.py --selftest` runs the checks offline; `--help` lists the options.
