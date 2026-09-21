# Running a public WhatsApp / Telegram bot (reach idea #6)

The `integrations/telegram` and `integrations/whatsapp` folders are *code*. This is the runbook for running one as a **live, public bot** — the surface where a caregiver, someone in debt, or a newcomer actually uses the library: on their phone, no setup, no GitHub.

## Why this matters
Your best skills (`pm-hardship`, `pm-grief`, `pm-caregiving`, `pm-newcomer`) are for people who will never run `npx`. A public bot is the only channel that reaches them. It is also the channel with the most **duty of care** — read the safety section twice.

## Architecture (keep it boring)
- **Telegram first.** Public bots are trivial (BotFather token), no business verification, and the existing integration already speaks the API. WhatsApp needs a Meta Business account + template approval — do it second, once Telegram proves demand.
- **Host** the bot on the same worker platform as the MCP server (`mcp-remote/`, Cloudflare Workers) or a small always-on VM. Stateless per message; **no conversation logs by default**.
- **The model call** goes through your existing free-run quota (the same sponsor-funded path as the Playground), with a per-user daily cap.
- **Menus, not free text, to start.** `/start` shows the **packs** (New Parent · Just Laid Off · Money in Crisis · Losing Someone · Caring for a Parent · New Here · Starting Over). Picking one lists its skills. This keeps the bot on-rails and the not-advice boundaries in every reply.

## Safety — non-negotiable for a public surface
1. **Disclaimers in the reply, not a footer no one reads.** Every high-stakes skill's output (see `data/risk-tiers.json`) starts with a one-line "educational, not legal/medical/financial advice — confirm locally" and ends with the real-help pointer.
2. **Crisis routing.** If a message suggests self-harm or immediate danger, the bot replies with crisis-line information for the user's country *before anything else* and does not continue the skill. Detect conservatively (better a false positive).
3. **No PII collection.** Never ask for account numbers, IDs, addresses. Don't log message bodies. State the privacy posture in `/start` and `/privacy`.
4. **Rate limits + abuse.** Per-user daily cap; block obvious abuse; a `/report` command.
5. **Jurisdiction ask.** For money/legal packs, ask the country first so replies can say what's verified vs. not (and use `variants/` where they exist).

## Launch checklist
- [ ] BotFather token in a secret, not in code; `/privacy` and `/help` commands live.
- [ ] Menus wired to the 7 packs; every reply carries the boundary line.
- [ ] Crisis-keyword routing tested with a dozen phrasings.
- [ ] Daily cap + a quota alert to you.
- [ ] Bot username + link added to the README badge row and the packs page.
- [ ] Soft launch: share in one caregiver or newcomer community, watch for a week, then widen.

## Metrics (aggregate only — keep the no-telemetry promise)
Count messages per pack per day and quota usage. Never store who said what.
