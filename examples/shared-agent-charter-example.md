# Example: Shared Agent Charter

## What this skill does
Writes the one-page charter a team pins before sharing one AI agent in Slack, Teams or a ChatGPT workspace.

## How to trigger it

### Example 1: A support team adding a Dot to Slack
**You say:**
> "We're a 9-person customer support team. We want a Dot in Slack to summarise tickets each morning and research answers to tricky questions. Our lead is Amara. Customer data is in Zendesk; we don't want it near HR stuff."

**Claude produces (excerpt):**

**Owner:** Amara, accountable for what it says and does.
**What it is for:** the 9am ticket summary in #support-daily; researching answers on request in #support-help. **What it is not for:** replying to customers; anything about staff.

| Who | May give standing instructions | May make requests | Reads output only |
|---|---|---|---|
| Amara | yes | yes | |
| Support agents (8) | no | yes | |
| Rest of company | no | no | yes, in #support-daily |

**Never reads or repeats:** HR, rota and pay channels; customer card or ID details. Nothing from #support-escalations is repeated elsewhere without Amara's yes.
**Pause:** anyone types "dot pause"; only Amara restarts it.

---

### Example 2: From one line
**You say:**
> "Policy for our team's Slack bot, marketing team of 6."

**Claude produces (excerpt):** the full charter with conservative defaults, [inferred] marks on channels and owner, and four questions to sharpen it.

## Tips for best results
- Name the owner before anything else; the rest follows from who is accountable
- List channels explicitly; "the usual ones" becomes "all of them" within a month
- Run the first-month review even if it went well; it's where scope creep shows

## Related skills
- `standing-orders`: the manual for a personal agent
- `approval-policy-designer`: per-app act, ask and never rules
- `tool-permission-review`: what the agent's connections can technically do
