# 💬 PM Skills — WhatsApp bot (via Twilio)

The [Telegram bot](../telegram/)'s twin for the world's biggest messenger:

```
find churn analysis
skill executive-update
run executive-update  churn up 2pts, shipped referral, hiring paused
```

Plain text auto-routes to the best skill. Search and fetch need no key; `run`
drafts with the deployer's Anthropic key if configured.

## 📄 Forward it: photos and PDFs of documents

Photograph a lease, a medical bill, an insurance letter or a contract and send it to the bot. It works out what the document is, picks the matching skill (`lease-decoder`, `medical-bill-decoder`, `insurance-policy-decoder` and so on), and replies with that skill's read of it: figures quoted as printed, unreadable parts named instead of guessed, and a not-advice line for legal, medical and money matters. Add a caption to say what you want ("is the deposit legal?"). On WhatsApp it needs the Anthropic key plus `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`: Twilio media is behind your account's credentials, and reading a document takes longer than Twilio's 15-second webhook window, so the result is sent back through Twilio's API. It and takes JPEG, PNG, WebP and PDF up to 8 MB. The code is shared by both bots: [`../shared/forward-doc.js`](../shared/forward-doc.js).

## Set up

1. **Deploy the worker:**
   ```bash
   cd integrations/whatsapp
   npx wrangler deploy
   npx wrangler secret put ANTHROPIC_API_KEY   # optional — enables "run" and document reading
   npx wrangler secret put TWILIO_AUTH_TOKEN   # recommended — verifies every webhook's X-Twilio-Signature
   npx wrangler secret put TWILIO_ACCOUNT_SID  # with the token, enables forwarded photos and PDFs
   ```
2. **Twilio side** (needs a Twilio account): Messaging → Try WhatsApp (sandbox, free,
   good for personal use) or a registered WhatsApp sender for production. Set the
   inbound webhook to your worker URL, method POST. Text replies ride back as TwiML.
   Set `TWILIO_AUTH_TOKEN` so the worker rejects any request Twilio did not sign;
   without it, anyone who finds the URL can make the bot spend your Anthropic key.
3. Sandbox note: users must first send the join code Twilio shows (e.g.
   `join amber-lion`) to the sandbox number; production senders don't have that step.

## Privacy

Stateless — the worker stores nothing and sees only what Twilio forwards. `run`
sends message text to the Anthropic API on the deployer's key; deploy your own
rather than sharing one with people you wouldn't share a key with. A forwarded
document goes to Anthropic for two calls (identify, then read) and is not stored;
the bot says so before it reads, and suggests covering account and ID numbers.
