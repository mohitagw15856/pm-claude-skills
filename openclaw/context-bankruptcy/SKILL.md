---
name: context-bankruptcy
description: "Declare bankruptcy on a long-lived AI agent's accumulated memory — audit what it currently believes, separate ground truth from stale and wrong, purge deliberately, restate the truths that survive, and log what was lost. Use when an agent keeps acting on outdated facts, contradicts itself across sessions, 'remembers' things wrong, or after a reorg/pivot makes its worldview obsolete. Produces a belief audit, a keep/correct/purge ledger, a restated ground-truth file, and the bankruptcy record."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/context-bankruptcy.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Context Bankruptcy Skill

Every long-lived agent slowly fills with sediment: the org chart from two
reorgs ago, the project that got cancelled but still shapes its suggestions,
the preference you expressed once, sarcastically, in March. Deleting everything
loses the genuinely valuable judgment it accumulated; deleting nothing means
arguing with a colleague who lives in the past. Bankruptcy is the middle path
with discipline: audit the beliefs, keep what's true, correct what drifted,
purge what's wrong or expired — and write down what was lost, because silent
memory loss is how the same wrong belief gets re-learned from the same stale
sources next month.

## What This Skill Produces

- A **belief audit**: what the agent currently holds, organized into facts /
  preferences / procedures / relationships, each dated and sourced where
  possible
- A **keep / correct / purge ledger** with a reason per entry — the artifact
  that makes the bankruptcy deliberate instead of a rage-wipe
- A **restated ground-truth file**: the clean, current worldview to reload,
  written to survive the next drift longer (dated claims, expiry hints)
- A **bankruptcy record**: what was purged and why, plus the re-learn guards —
  which stale sources fed the bad beliefs and how to stop them refeeding

## Required Inputs

Ask for (if not already provided):
- The agent's memory contents, exported or pasted (memory files, saved
  context, custom instructions, whatever the platform exposes) — the audit
  works on what it can see, and says so
- The symptoms: what it keeps getting wrong, where it contradicts itself
- What changed in reality (reorg, pivot, new stack, new owner) and when
- What the agent is *good* at that must survive — the reason this is
  bankruptcy, not deletion

## Process

1. **Extract beliefs, not text.** Convert the memory dump into discrete claims:
   "believes the platform team owns billing" · "believes user prefers terse
   answers" · "believes deploys happen Fridays". Tag each: fact / preference /
   procedure / relationship, with best-guess age. Unstated-but-acted-on
   beliefs (visible in the symptoms) go in too, marked *inferred*.
2. **Sort against current reality.** With the user, mark each claim KEEP
   (true, valuable) · CORRECT (right shape, wrong details — write the fix) ·
   PURGE (wrong, expired, or toxic — including preferences the user no longer
   holds). Rule for ties: a belief that can silently misdirect output is
   PURGE-by-default; a belief that's merely unused can stay.
3. **Find the feeders.** For each purged belief worth the trouble: where did it
   come from, and does that source still exist (an old doc it can read, a
   stale instruction file, a pinned message)? Purging the belief but not the
   feeder schedules the relapse.
4. **Restate ground truth to age well.** Write the reload file with dated
   claims ("as of Jul 2026, billing is owned by…"), explicit preferences in
   the user's own words, and expiry hints ("re-verify org facts quarterly").
   Load order matters on most platforms: ground truth in the durable slot
   (instructions/memory), not a chat message that scrolls away.
5. **Record the bankruptcy.** What was purged, why, date, and the guards
   added. Schedule the next audit — sediment accumulates at a knowable rate;
   quarterly is the sane default for daily-driver agents.

## Output Format

```
## Belief audit — [agent], [date]
| # | Belief (as a claim) | Type | Age | Source | Inferred? |

## The ledger
| # | Verdict (KEEP / CORRECT→fix / PURGE) | Reason |

## Ground truth v[N] (reload this)
[Dated claims · preferences verbatim · procedures · expiry hints]

## Bankruptcy record
[Purged: what & why · Feeders closed: … · Guards added: … · Next audit: date]
```

## Quality Checks

- [ ] Beliefs are discrete, checkable claims — not pasted memory prose
- [ ] Every PURGE has a reason; every CORRECT has the actual correction written
- [ ] At least one feeder was traced — bankruptcy without closing feeders is a
      subscription to this skill
- [ ] Ground-truth claims are dated and the file says where it should live on
      the platform (durable slot, not chat)
- [ ] What-was-lost is recorded — the user can consciously re-teach, rather
      than discover absence mid-task

## Anti-Patterns

- [ ] Do not rage-wipe — full deletion without the audit loses the judgment
      that took months to accumulate, which is why this skill exists
- [ ] Do not keep contradictions to "be safe"; two contradictory beliefs means
      the agent picks one at random per session
- [ ] Do not restate ground truth undated — undated truth is next quarter's
      sediment
- [ ] Do not treat vendor "memory deleted" claims as verified for sensitive
      content — note what the platform actually promises (see
      [[agent-severance]] for full offboarding)

## Related

[[session-handoff]] compresses a session; this resets a *worldview*.
[[context-budget]] for the token-layout side; [[agent-severance]] when the
answer is offboarding, not bankruptcy.

## Example Trigger Phrases

- "My agent keeps acting on outdated beliefs."
- "Purge my assistant's stale memory."
- "Audit what my agent currently believes."
- "Reset the agent's memory after our pivot."
