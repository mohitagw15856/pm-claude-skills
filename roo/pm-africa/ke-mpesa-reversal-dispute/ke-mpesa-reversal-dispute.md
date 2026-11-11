# M-Pesa Reversal and Dispute (Kenya)

Mobile money moves instantly, and the chance of recovering a wrong transfer falls with every minute the money sits in someone else's wallet. The provider can hold funds that are still in the recipient's account but cannot simply take money back once it has been withdrawn. This skill gives the order of actions, the wording, and the escalation path. Shortcodes, time windows and procedures are set by the provider and can change, so each is marked for confirmation. It is not legal advice.

## What This Skill Produces

- A first-ten-minutes action list
- The reversal request to send or say, with the details the provider needs
- A log of events with times, for any later complaint
- A calm message to the recipient
- An escalation ladder: provider, police, regulator, court, with what to bring to each
- For fraud: steps to protect the account

## Required Inputs

Ask for these if not provided:

- What happened: wrong number, wrong amount, wrong paybill or till, or fraud
- The transaction confirmation message (code, amount, recipient name and number, time)
- How long ago, and anything done so far
- Whether the recipient has been contacted and what they said
- For fraud: how contact was made, what was shared (PIN, one-time code, ID), and any other accounts at risk
- Amount involved

## Framework

1. **Act at once.** Do not send anything further. Do not delete the confirmation message.
2. **Request the reversal through the provider's official channel.** The usual route is forwarding the confirmation message to the provider's reversal shortcode or using the app or customer care line. Confirm the current shortcode from the provider's official site or SIM menu, not from a search result or an SMS.
3. **What the provider does.** If the funds are still in the recipient's wallet they can be held while the recipient is contacted. A reversal generally needs the recipient's confirmation or a clear case of error. If the money has been withdrawn or spent, the provider cannot recover it directly.
4. **Paybill and till payments.** The business receiving the payment handles the refund. Contact the business first with the transaction code; the provider can assist.
5. **Contact the recipient once, politely.** Ask them to approve the reversal when the provider contacts them. Do not threaten. Do not share your PIN or any code.
6. **If the recipient refuses or has withdrawn.** Keeping money received by mistake can be a criminal matter. Report at a police station and obtain the occurrence book number; the provider acts on a police request or court order. For modest sums the small claims court is a low-cost route, within its monetary limit.
7. **Fraud.** Call the provider to block the account and change the PIN, report the fraudster's number, report to the police, and warn contacts. A request to "reverse" money that someone claims to have sent you by mistake is itself a common scam: check your actual balance and reverse only through the official channel.
8. **Complaints about the provider.** Escalate in writing to the provider, then to the communications regulator or the central bank's consumer channel.
9. **Log everything.** Times, names, reference numbers.

## Output Format

### Recovery plan: [wrong transfer / fraud], [amount], [time since]

**Do now**
1. [action]

**Reversal request**
> [Wording for customer care or the form: transaction code, amount, date and time, intended recipient, actual recipient, what you are asking for.]

**Message to the recipient**
> [Short, polite, no threats, no personal details.]

**Log**
| Time | Action | Reference | Outcome |
|---|---|---|---|

**Escalation**
| Step | When | Bring |
|---|---|---|
| Provider customer care | Now | Confirmation message, ID |
| Police report | If refused or fraud | Messages, log, ID |
| Regulator complaint | If the provider does not respond | Complaint reference, log |
| Small claims court | If the amount justifies it | Police report, evidence, recipient's details |

**Protect the account (fraud):** [steps]

**Confirm before using:** [shortcode, time windows, court limit] from official sources.

**Assumptions and gaps**
- [What was assumed about timing or funds still being available]
- [Information the provider will ask for that is missing]

*Practical guidance, not legal advice.*

## Quality Checks

- [ ] The first actions are ordered by urgency
- [ ] The reversal request contains the transaction code, amount, time and both numbers
- [ ] No shortcode or time window is given as certain
- [ ] The message to the recipient contains no threat and no sensitive data
- [ ] The reverse-scam warning appears
- [ ] A log template is included

## Anti-Patterns

- **Do not promise that the money will come back.**
- **Do not tell the user to share a PIN or one-time code with anyone**, including someone claiming to be the provider.
- **Do not suggest threatening or publicly shaming the recipient.**
- **Do not give a shortcode from memory as fact.**
- **Do not skip the police report** where fraud is involved.

## Example Trigger Phrases

- "I just sent 15,000 to the wrong number. What do I do right now?"
- "The person says they already used the money. Can I get it back?"
- "Nimetuma pesa kwa number mbaya, nifanye nini?"
- "Someone called pretending to be customer care and I gave them a code."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/ke-mpesa-reversal-dispute.html

<!-- pm-claude-skills v84.0.0 | skill: ke-mpesa-reversal-dispute | source: skills/ke-mpesa-reversal-dispute/SKILL.md | sha256: 4a85836706df998234f8d1f70e76f0870200568979d369d880fbc6f7bf3dbe45 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
