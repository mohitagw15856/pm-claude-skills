# 🔑 Activation checklist — built and waiting on your accounts

Everything here is **already built**; each item is the exact remaining owner
action, shortest first. Cross them off as you go.

## 1. Social preview (1 minute)

Repo → **Settings → General → Social preview** → upload
`web/docs-assets/social-card.png`. Makes every shared repo link unfurl with the
branded card.

## 2. Telegram bot (~5 minutes)

1. Message [@BotFather](https://t.me/BotFather) → `/newbot` → name it (e.g.
   *PM Skills*, handle like `pm_skills_bot`). Copy the token.
2. ```bash
   cd integrations/telegram
   npx wrangler deploy
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_WEBHOOK_SECRET   # any random string: openssl rand -hex 16
   npx wrangler secret put ANTHROPIC_API_KEY         # optional — enables /run
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook" \
     -d "url=https://pm-skills-telegram.<you>.workers.dev" \
     -d "secret_token=<WEBHOOK_SECRET>"
   ```
3. Optional: `/setcommands` with BotFather (list in `integrations/telegram/README.md`).

## 3. WhatsApp bot (~10 minutes, needs a Twilio account)

`cd integrations/whatsapp && npx wrangler deploy`, then in Twilio: Messaging →
WhatsApp sandbox → set the inbound webhook to the worker URL (POST). Details and
the sandbox join-code caveat: `integrations/whatsapp/README.md`.

## 4. Crowdin (community translations, ~10 minutes)

1. Free open-source project at crowdin.com, point it at this repo (it reads
   `crowdin.yml`).
2. `gh secret set CROWDIN_PROJECT_ID` · `gh secret set CROWDIN_PERSONAL_TOKEN`
3. Enable the GitHub integration (sync branch → PRs). Then link the project in
   `i18n/TRANSLATING.md` where the placeholder notes it.

## 5. SkillBench v2 official run (spends API money — your call on budget)

```bash
node skillbench/run-skillbench.mjs --tasks skillbench/tasks-v2.json \
  --models claude-sonnet-5-5,gpt-4o,gemini-2.0-flash \
  --judges claude-sonnet-4-6,gpt-4o --dry-run     # cost preview first
```
Needs `ANTHROPIC_API_KEY` + `OPENAI_API_KEY` (+ `GEMINI_API_KEY`). Cross-vendor
results unlock the arXiv submission (steps at the end of `skillbench/REPORT.md`).

## 6. The HN moment

Kit is ready: `docs/launch-drafts/v62-hn-launch.md` — title options, first
comment, runbook, and the comment crib. Best done *after* #5 so the benchmark
claim links a cross-vendor result.

## 6b. awesome-claude-code recommendation (2 minutes, form-only by their rules)

Three awesome-list PRs are already open ([ComposioHQ#1439](https://github.com/ComposioHQ/awesome-claude-skills/pull/1439), [travisvn#1038](https://github.com/travisvn/awesome-claude-skills/pull/1038), [BehiSecc#495](https://github.com/BehiSecc/awesome-claude-skills/pull/495)).
The fourth list, [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code), **requires their web issue form** (PRs risk a ban). Open [the form](https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=recommend-resource.yml) and paste:

- **Display Name:** PM Skills
- **Category:** Skills
- **Link:** `https://github.com/mohitagw15856/pm-claude-skills`
- **Author Name:** Mohit Aggarwal · **Author Link:** `https://github.com/mohitagw15856`
- **Description:** 771 MIT-licensed professional Agent Skills (PRDs, postmortems, lease/medical-bill decoders, negotiation simulators, deterministic calculators) across 35 professions — each SkillSpec-gated and security-scanned in CI, eval-scored in the open, installable via the Claude Code plugin marketplace (`/plugin marketplace add mohitagw15856/pm-claude-skills`) or `npx pm-claude-skills add`, with a free browser playground.

Their CONTRIBUTING is blunt that listing is selective and traction-first — if it's not taken now, resubmit after the HN moment.

## 7. Store submissions (your dev accounts)

- **Chrome Web Store:** dashboard → upload the extension zip (Desktop) — listing
  copy in `docs/submission-kit.md`.
- **VS Code Marketplace:** `cd vscode-extension && npx vsce publish` (publisher
  `mohitagw15856`).
- **PulseMCP:** submit the hosted worker URL via their form (pulsemcp.com/submit).

## 8. Polar (paid packs — only when ready to pilot)

Create the org at polar.sh, set the 85/15 listing terms, recruit one pilot
author. The RFC gates everything else on that pilot: `docs/rfcs/0003-paid-community-packs.md`.

## 9. Apple Shortcuts one-tap links

Build the two shortcuts from `integrations/shortcuts/README.md` once on your
phone, Share → Copy iCloud Link, paste the links into that README.

---
*Generated as part of the ten-ideas build, 2026-07-26. Delete entries as they ship.*
