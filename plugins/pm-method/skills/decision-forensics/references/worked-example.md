# Worked Example — Decision Forensics

## The brief

A PM pastes 40 messages from #proj-sunset (Slack, Mar 3–5) after a dispute erupts over whether the team agreed to deprecate the legacy exports API. Participants: Rhea (PM), Coleman (eng lead), Ives (CS director), Marta (VP Product, joined late). "We're arguing about what we decided. Reconstruct it."

## The output

# Decision Record (reconstructed): Deprecate legacy exports API for NEW customers only; existing customers' timeline undecided
**Source:** #proj-sunset, Mar 3–5 · **Reconstruction confidence: MEDIUM** — the narrow decision has an authority approval; the broader one everyone remembers was never actually made.

## The Decision
One decision was reached: **stop offering legacy exports to new signups, effective with the April release.** Evidence: Rhea's proposal (Mar 4, 10:12: "minimum move: gate it off for new accounts in April") followed by Marta (Mar 4, 16:40: *"fine with the April gating for new accounts"*) — explicit authority approval of the narrow scope.
**No decision was reached** on deprecating for *existing* customers. The thread ends with that question open (see Papered Over), though subsequent behavior (Coleman's removal ticket) assumed it.

## Commitments
| Who | Committed to | The binding quote | By when |
|---|---|---|---|
| Coleman | Gate legacy exports for new accounts | "I can have the flag in the April train" (Mar 4, 11:03) | April release |
| Rhea | Migration guide draft | "I'll get the migration doc started this week" (Mar 4, 11:20) | ~Mar 8 |
| Ives | List of active-usage customers | "I'll pull who's actually using it" (Mar 4, 14:55) | unstated |

## Assumptions (all `[reconstructed]`)
- That gating new accounts implies eventual full deprecation — everyone *acts* on this; nobody states it `[reconstructed]`
- That Marta's "fine with the April gating" extended to the whole deprecation plan — her wording is scope-limited `[reconstructed]`
- That Ives's usage list would gate the existing-customer timeline — implied by sequence, never agreed `[reconstructed]`

## Options Dismissed
| Option | Dismissed by/when | Stated reason | Actually resolved? |
|---|---|---|---|
| Hard EOL date for everyone (Coleman, Mar 3) | Ives, Mar 3, 17:30 | "Three enterprise accounts export daily — we can't just date it" | ❌ Deferred, not decided — this IS the current dispute |
| Keep indefinitely, price it (Ives, Mar 3) | Nobody explicitly | Thread moved on after Rhea's compromise proposal | ❌ Abandoned by swerve |

## Papered Over
- **The existing-customer timeline** — raised by Coleman (Mar 4, 11:05: "and current accounts? six months?"), answered by nobody; Rhea changed the subject to the migration doc two minutes later. This is the void the current dispute grew in.
- **Who tells the three enterprise accounts** — Ives raised it (Mar 5, 09:12); the thread ended forty minutes later without a reply.

## Confidence note
MEDIUM overall: the narrow decision has explicit authority approval (HIGH); the commitments are direct quotes (HIGH); but the load-bearing question everyone *believes* was settled exists only as an unanswered message and subsequent behavior (LOW — inferred from fragments). The dispute is genuine: both sides are correctly remembering different halves of an incomplete decision.

## Why it's shaped this way

- **The headline separates what WAS decided from what wasn't** — "no decision was reached" on the disputed half is the finding, stated as a valid, useful outcome per the anti-patterns.
- **Every attribution carries its quote and timestamp** — Marta's scope-limited "fine with the April gating" is the crux; paraphrasing it broadly is exactly how the dispute started.
- **Assumptions are labeled `[reconstructed]`** — the silent belief in eventual-full-deprecation is surfaced as a belief, never promoted to a decision.
- **The swerve is documented** (11:05 question, 11:07 subject change) — papered-over moments have locations; naming them dissolves the "you agreed!" fight.
- **The confidence note grades its own evidence types** — a reconstruction that hides its uncertainty is fabrication with footnotes.
