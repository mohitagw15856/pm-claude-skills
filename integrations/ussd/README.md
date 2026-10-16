# 📟 PM Skills over USSD

A menu you dial on **any phone**, including a basic feature phone with no data and no app. That's how much of the world uses a phone: USSD is the `*123#` kind of short code that mobile money runs on.

```
CON PM Skills: free help        CON Home and rent              END Get my deposit back
1. Money and work               1. Get my deposit back         Get your security deposit back,
2. Home and rent        →  2    2. Repairs not done      →  1  the move-out documentation that
3. Health and care              3. Home damaged                wins disputes before they start…
4. Papers and help              0. Back                        We have sent you the link by SMS.
5. Is this a scam?                                             Not professional advice.
```

Pick a topic, then your situation. You see the skill's first step on screen, and an SMS brings the link to the full skill, so it can be opened later on any smartphone, at a library or by a friend.

**No AI model is called**, so there is no API bill. The only costs are your USSD and SMS provider's fees.

## How it works

The provider (Africa's Talking, or any gateway with the same callback shape) POSTs `sessionId`, `phoneNumber` and `text`, which holds every choice so far joined by `*` (for example `2*1`). The worker replies `CON …` to show another menu or `END …` to finish.

It's stateless: the route through the menu is in `text`, and nothing is stored. Screens stay under 182 characters and use the plain GSM character set (no emoji or long dashes), so they display on any handset.

## Set up (about 20 minutes, needs an Africa's Talking account)

1. `cd integrations/ussd && npx wrangler deploy`
2. `npx wrangler secret put USSD_SECRET`: a long random string. Your callback URL is `https://<your-worker>/<USSD_SECRET>`, so nobody else can drive it or send SMS on your account.
3. In Africa's Talking, create a USSD channel (start with the free **sandbox** and its simulator) and set its callback URL to the address from step 2.
4. Optional, for the SMS link: `npx wrangler secret put AT_API_KEY`, then add `AT_USERNAME` to `[vars]` in `wrangler.toml` (and `AT_SANDBOX = "true"` while testing, and `AT_SENDER_ID` if you have one).
5. Public short code? Bind `CAPS_KV` to cap SMS per number per day: [`../shared/PUBLIC-INSTANCE.md`](../shared/PUBLIC-INSTANCE.md).

Test locally with `node integrations/ussd/test.mjs`; it checks every menu skill exists and every screen fits.

## Make it yours

The menu is one file, [`src/menu.js`](src/menu.js): change the topics and the skills under them, or translate the labels (for Swahili, Hausa or Amharic, copy the file and import it in `src/index.js`). Five topics of up to five skills fit a screen. The first step shown on screen is the skill's own description, in English. For other languages, put the first step in the menu file itself.

## Limits

USSD sessions time out after about 20 to 180 seconds, depending on the network, and a screen holds about 182 characters. So this is a signpost, not a full answer: the right skill, its first step, and a link to the rest. For a spoken answer, see the [phone line](../phone-line/). For chat, see [WhatsApp](../whatsapp/) or [Telegram](../telegram/).
