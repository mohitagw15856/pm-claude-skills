# Example: Approval Policy Designer

## What this skill does
Sets, per connected app, which actions a proactive agent may take alone, must ask about, or must never take.

## How to trigger it

### Example 1: An online shop owner
**You say:**
> "My Duet is connected to Gmail, Google Calendar, Shopify and Stripe. I'm sick of approving newsletter archiving, but it must never refund anyone without me. Internal domain is fernandhoney.co.uk."

**Claude produces (excerpt):**

| App | Act (alone) | Ask (show me first) | Never (draft or flag instead) |
|---|---|---|---|
| Gmail | label, archive newsletters and receipts, draft replies | send, reply-all, forward to anyone outside fernandhoney.co.uk | delete customer email |
| Calendar | add internal holds | accept or move any meeting with an external guest | decline on your behalf |
| Shopify | tag orders, draft product copy | publish product changes, change prices | issue refunds, cancel orders |
| Stripe | read balances and disputes | none | refunds, payouts, any payment |

**Thresholds:** no money moves without you. Refunds are never, at any amount, as you said.
**Anything not listed:** ask.
**Paste into the agent's instructions:** "Draft and tidy freely, ask before anything a customer or supplier sees, never move money; anything not listed, ask me first."

---

### Example 2: From a list of apps only
**You say:**
> "Approval rules for my agent: Outlook, Teams, HubSpot."

**Claude produces (excerpt):** a three-row table with conservative defaults, each inferred row marked [inferred], and the unlisted default stated as ask.

## Tips for best results
- Name your internal domain so the agent can tell internal from external
- Start strict; move one action from ask to act each week once the audit lines show it behaving
- Pair it with `standing-orders` (the wider rules) and `send-approval-check` (the card shown for each send)

## Related skills
- `send-approval-check`: the card for one outgoing message
- `standing-orders`: the full operating manual
- `tool-permission-review`: what the agent's connections can technically do
