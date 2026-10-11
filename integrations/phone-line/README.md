# ☎️ PM Skills phone line

Call a number, say what you need, and hear a short answer shaped by the matching skill:

> "My landlord is keeping my whole deposit for a scuff on the wall."
>
> *"First, ask in writing for an itemised list of deductions with receipts. In most places a landlord can only charge for damage beyond normal wear and tear… This isn't legal advice."*
>
> "Text me."
>
> *"Done, check your messages."* (an SMS with the full `security-deposit-recovery` skill, your question filled in)

It's for people who would rather talk than type, or who have a phone but not the app: a parent with their hands full, someone in a car park outside a meeting, an older relative. Up to six questions per call. Say "no" to finish.

## How it works

1. Twilio answers and transcribes your speech (`<Gather input="speech">`).
2. The library's search picks the skill.
3. One Claude Haiku call gives the two or three most useful first moves in under 110 spoken words. Haiku keeps the reply inside Twilio's 15-second webhook window.
4. Twilio reads the answer aloud.
5. "Text me" sends an SMS link to the playground with the skill open and your question in it.

Stateless: the skill and your question ride in the next webhook URL, and nothing is stored. Every request's `X-Twilio-Signature` is verified (shared code: [`../shared/twilio-signature.js`](../shared/twilio-signature.js)), so nobody else can use your line's keys.

## Set up (about 15 minutes, needs a Twilio account)

1. `cd integrations/phone-line && npx wrangler deploy`
2. `npx wrangler secret put TWILIO_AUTH_TOKEN` (required), `ANTHROPIC_API_KEY` (required) and `TWILIO_ACCOUNT_SID` (for "text me").
3. In Twilio, buy a voice-capable number. Under **Voice → A call comes in**, set **Webhook** to your worker's URL, method **POST**.
4. Optional, in `wrangler.toml` `[vars]`:
   - `VOICE_LANG` and `VOICE`, for another language. For example `hi-IN` with `Polly.Kajal-Neural`, or `es-ES` with `Polly.Lucia-Neural`. The skill search is English-first, so test your language.
   - `ALLOWED_CALLERS`, to keep the line private.

**Costs** are yours: Twilio's per-minute voice and per-SMS rates, plus about one Haiku call per question.

## Privacy

What the caller says is transcribed by Twilio and sent to Anthropic to write the answer. Nothing is stored by the worker. Say so if you publish the number. The answer always tells callers to hang up and call emergency services if someone is in danger.
