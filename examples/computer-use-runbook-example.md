# Example: Computer-Use Runbook

## What this skill does
Writes the step-by-step runbook a computer-use agent follows to finish a real online task, with checkpoints, stop points and verification.

## How to trigger it

### Example 1: Cancelling a streaming subscription
**You say:**
> "Write steps for my browser agent to cancel my StreamCo subscription. Don't let it accept any offers. I'm logged in already."

**Claude produces (excerpt):**

**The agent must stop for a person at:** any payment page, any new terms, any identity check it cannot answer, any page that does not match the step.

| # | Look for | Do | Expect | If not |
|---|---|---|---|---|
| 1 | Account page showing your plan [check on the live page] | Open "Membership" or "Plan" | Plan details with a cancel option | stop and report the page title |
| 2 | A cancel link or button | Click it once | A retention offer or a reason form | stop and report |
| 3 | A discount or "pause instead" offer | Choose "No thanks, continue cancelling" | The final confirmation step | stop: never accept an offer |
| 4 | "Finish cancellation" | Click it | A confirmation with an end date | stop and screenshot |

**Done means:** a cancellation email with the end date arrives, or the account page shows "Ends on [date]". Otherwise report as unverified, with what was seen.

---

### Example 2: From a one-line task
**You say:**
> "Runbook for an agent to switch my broadband to a cheaper deal."

**Claude produces (excerpt):** the full runbook, with "accepting a new contract" as a stop point that needs you, screen labels marked [check on the live page], and a note that signing up for the new deal is your decision, not the agent's.

## Tips for best results
- Say what must not be lost (a phone number to keep, a refund due) so the runbook protects it
- Run the agent with sending and payment permissions off for the first attempt
- Keep the screenshots the runbook asks for; they're your evidence if the cancellation is disputed

## Related skills
- `browser-agent-preflight`: the safety checklist before an agent drives a browser
- `approval-policy-designer`: what the agent may do alone across your apps
- `agent-kill-switch-plan`: how to stop it if it goes wrong
