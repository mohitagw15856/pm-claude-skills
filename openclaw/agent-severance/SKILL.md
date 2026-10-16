---
name: agent-severance
description: "Offboard an AI agent the way you'd offboard an employee — inventory what it knew and touched, export then purge its memory, revoke every credential and access grant, and write the handover for its successor (human or agent). Use when decommissioning an agent or bot, switching agent vendors, ending an AI pilot, or when someone asks 'what did this thing have access to?'. Produces a severance checklist, an access-revocation table, a memory disposition record, and a successor handover."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agent-severance.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Agent Severance Skill

Orgs learned employee offboarding the hard way: the contractor whose VPN worked
for a year after the contract, the shared password nobody rotated. Long-lived
agents recreate every one of those failure modes with worse logging — an agent
accumulates credentials, memory, integrations, scheduled jobs, and undocumented
responsibilities, and then one day it's "turned off" by deleting a chat window
while its API keys live on. This skill runs the severance properly: know what
it had, keep what's valuable, kill what's live, and hand over what it did.

## What This Skill Produces

- An **inventory**: everything the agent could touch (credentials, tools, data
  stores, channels), everything it knew (memory, context files, fine-tuning or
  instructions), and everything it *did on a schedule*
- An **access-revocation table** with owner and verification step per row —
  revoked isn't revoked until someone confirmed the key is dead
- A **memory disposition record**: exported / retained (where, why, how long) /
  purged (how verified) — the part compliance will ask about in 2027
- A **successor handover**: the agent's actual duties, including the
  undocumented ones users discovered, for whoever inherits them

## Required Inputs

Ask for (if not already provided):
- The agent: platform, what it was for, how long it ran, who owned it
- Known integrations and credentials (then treat the list as incomplete on
  principle — the inventory step hunts for the rest)
- Why it's being offboarded (vendor switch, pilot ended, incident, cost) —
  incident-driven severance changes the order: revoke first, inventory second
- What must survive: memory worth exporting, workflows someone still needs

## Process

1. **Inventory before touching anything** (unless incident — then revoke
   first). Hunt beyond the known list: API keys and OAuth grants · service
   accounts · webhook URLs pointing at it · scheduled/cron jobs it ran ·
   channels it posted in · data stores it read or wrote · other agents that
   called it (the A2A dependencies nobody documented) · what its memory
   contains, including personal data.
2. **Decide memory disposition per store, not wholesale.** Export what has
   value (decisions log, learned context) to an owned location; name a
   retention owner and period for anything kept; purge the rest and record
   *how* purged (vendor deletion request ≠ deleted — note what the vendor
   actually promises). Personal data follows your privacy policy's deletion
   rules, flagged explicitly.
3. **Revoke with verification.** Every row gets: the credential, who revokes
   it, and the test that proves it's dead (the call that now fails). Rotate
   any *shared* secrets the agent ever held — its copy dying doesn't kill the
   copies.
4. **Write the honest handover.** What it was supposed to do, what it actually
   did (ask its users — there are always undocumented duties), open threads
   mid-flight, and the workflows that will silently break next Tuesday when it
   stops.
5. **Announce the death.** One message to the channels it served: it's gone,
   here's who/what replaces it, here's where its exported memory lives.

## Output Format

```
## Severance summary
[Agent, tenure, reason, severance owner, target date]

## Inventory
Access: [table — system, grant, discovered-how] · Knowledge: [stores + contents]
Duties: [scheduled + reactive + undocumented] · Dependents: [who/what calls it]

## Memory disposition
| Store | Export → where | Retain (owner, period) | Purge (method, verified how) |

## Revocation
| Credential/grant | Revoked by | Dead-key test | Status |

## Handover to successor
[Duties with enough detail to actually run them · open threads · will-break list]

## Announcement
[The message to its channels]
```

## Quality Checks

- [ ] The inventory includes at least one category the user didn't mention —
      scheduled jobs and agent-to-agent callers are the usual blind spots
- [ ] Every revocation row has a verification test, not just an action
- [ ] Shared secrets the agent held are rotated, not just revoked
- [ ] Memory disposition distinguishes vendor-promised deletion from verified
      deletion, and flags personal data
- [ ] The handover names what breaks when the agent stops — if the answer is
      "nothing", the duties inventory probably isn't done

## Anti-Patterns

- [ ] Do not equate "deleted the chat/app" with offboarded — the checklist
      exists because credentials outlive interfaces
- [ ] Do not purge memory before the export decision — severance is
      irreversible in exactly one direction
- [ ] Do not skip the users interview; the undocumented duties are the ones
      that page someone at 2am after shutdown
- [ ] Do not write this as a vendor grudge document — it's an operational
      record compliance and the successor will both read

## Related

[[agent-hiring-panel]] is the front door this is the back door of;
[[context-bankruptcy]] when the agent stays but its memory shouldn't;
[[agent-incident-postmortem]] if an incident triggered this.

## Example Trigger Phrases

- "Decommissioning an agent."
- "Switch agent vendors."
- "Ending an AI pilot."
