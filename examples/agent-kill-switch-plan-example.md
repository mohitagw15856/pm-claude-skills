# Example: Agent Kill Switch Plan

## What this skill does
Writes, in advance, the runbook for stopping a misbehaving proactive agent: pause, revoke, check, tell, restart.

## How to trigger it

### Example 1: Preparing in advance
**You say:**
> "Make a kill switch plan for my Duet. It's connected to Gmail, Google Drive, QuickBooks, Stripe and Slack. I run a small design agency."

**Claude produces (excerpt):**

**Pause (under a minute):** disconnect or pause the agent in the Duet app [check in your app's settings]; if you can't find it, sign out of the Claude account on every device.

**Revoke, in this order:**
| # | App | Why this order | Where to revoke |
|---|---|---|---|
| 1 | Stripe | can move money | Stripe dashboard, connected apps [check] |
| 2 | QuickBooks | can issue invoices | QuickBooks apps settings [check] |
| 3 | Gmail | can send as you | Google account, third-party access |
| 4 | Slack | can post as you | Slack workspace apps |
| 5 | Google Drive | can share or delete files | Google account, third-party access |

**Message to anyone affected:** "Apologies: an automated assistant sent you a message in error earlier today. Please disregard it. I'll follow up personally by [time]."

---

### Example 2: It's happening now
**You say:**
> "My agent just replied-all to a client thread with internal notes, help."

**Claude produces (excerpt):** three immediate steps first (pause the agent, revoke Gmail access, screenshot the sent message), then the recall attempt, a two-line apology to the client, and the full runbook.

## Tips for best results
- Write it before you switch the agent on, and test the pause step once
- Keep the runbook somewhere you can reach from your phone
- After any incident, update `standing-orders` or `approval-policy-designer` before restarting

## Related skills
- `agent-incident-postmortem`: the write-up after the incident
- `approval-policy-designer`: tighten what the agent may do alone
- `tool-permission-review`: what each connection can technically do
