---
name: "Write a concrete rollback plan for a risky change (deploy, m"
description: "Write a concrete rollback plan for a risky change (deploy, migration, feature-flag flip, config rollout) so the reverse is one command away — not an improvised debate at 2am. Use when asked to write a rollback plan, back-out plan, revert plan, or 'what if we need to undo this'. Produces a rollback plan with the signals that trigger it, exact reverse commands, verification steps, data-safety notes, and a communications template."
---

# Rollback Plan Skill

Turns "we'll roll back if it goes bad" into a plan somebody unfamiliar with the change can execute under pressure. The single job: make the reverse of the change knowable, verifiable, and boring.

## Working from a brief

Deliver the full plan even from a thin brief — infer and label assumptions (never invent service names, dashboard URLs, commit SHAs, or migration IDs). If a required input is missing, ask once, then move on with `unknown — confirm before rollout` placeholders.

## Required Inputs

Ask for (if not already provided), else label as unknown:

- **The change** — what's shipping, service(s) affected, blast radius.
- **How it ships** — deploy pipeline, feature-flag key, migration ID, config path.
- **Rollout shape** — big-bang, staged (X% → Y% → 100%), canary, region-by-region.
- **Data implications** — does it write new schema/data, change the meaning of existing columns, backfill, encrypt-in-place, delete? Reversible in-place or one-way?
- **Downstream consumers** — services / queues / clients that read the changed contract.
- **Trigger conditions** — the SLIs / dashboards / alerts that would tell us it's bad (be specific: metric, threshold, duration).
- **Who owns the decision** — the human who can pull the trigger, and their escalation path if unreachable.

## Output Format

```markdown
# Rollback Plan — <change name>
**Owner:** <name>  ·  **Approver for rollback:** <name / role>  ·  **Rollout window:** <YYYY-MM-DD HH:MM TZ>

## 1. The change (one paragraph)
<what ships, where, how it's gated, expected impact>

## 2. Trigger conditions — roll back if ANY of these hold
| Signal | Threshold | Window | Where to look |
|---|---|---|---|
| <metric / alert / user report> | <e.g. p99 > 400ms> | <e.g. 10 min sustained> | <dashboard link / logs query> |

Also roll back on any P1/P2 incident opened against <service> during the window.

## 3. The reverse — exact steps, in order
> Rehearse this in a lower environment before the change ships. The first time you run these under load should not be the real rollback.

1. **Announce** — post in `#<channel>` from the template in §7.
2. **Stop the rollout** — <feature-flag off / freeze the pipeline / halt canary>.
   - Command: `<exact command or console path>`
   - Verify: `<how to confirm it stopped, e.g. flag API returns "off", pipeline status = PAUSED>`
3. **Revert the code / config** — <exactly one action>.
   - Command: `<git revert <sha> && …>` or `<kubectl rollout undo deploy/<name>>` or `<terraform apply -target=…>`
   - Verify: <version endpoint, image tag, config checksum>
4. **Data reversal** — <one of>:
   - Reversible in place: run `<script / migration --down>`.
   - Forward-only (data was written under the new schema): <what stays, what gets quarantined, backfill / cleanup ticket to file>.
   - Not reversible: STOP — escalate to the approver; do not proceed without them.
5. **Drain / warm** — <e.g. flush caches, restart consumers, rewarm feature-flag SDKs>.
6. **Verify recovery** — the same signals in §2 must return to baseline within <N minutes>.

## 4. Data safety
- **What new writes look like:** <schema/columns/values>
- **Reversibility:** ✅ reversible in place · ⚠ forward-only (specify what's kept) · 🛑 destructive (never)
- **PII / compliance touched:** <list, or "none">
- **Backups / snapshots to take before rollout:** <what, retention, restore command>

## 5. Verification checklist (post-rollback)
- [ ] Trigger signals in §2 back within normal range for <window>.
- [ ] No new P1/P2 opened in the <N> minutes after the reverse.
- [ ] Downstream consumers (<list>) show green on their SLOs.
- [ ] The feature-flag / migration / config surface reflects the old state (screenshot / checksum captured).

## 6. What we do NOT do on rollback
- Do not delete data written during the rollout — quarantine it (see §4).
- Do not silently mute alerts to "get clean" — that hides the very signals we need for §5.
- Do not roll forward a "quick fix" before deciding rollback — one direction at a time.

## 7. Comms template
> **Subject:** Rolling back <change name> (<yyyy-mm-dd hh:mm TZ>)
> Triggered by <signal + value>. Reversing per plan; expected recovery <N> minutes. Impact so far: <one line>. Owner on the reverse: <name>. Next update in <N> minutes or on recovery.

## 8. Post-rollback follow-ups (file before you close the incident)
- Root cause captured to <postmortem / incident>.
- Ticket to re-attempt (or kill) the change, with what will be different.
- Any data cleanup / backfill scheduled with an owner and date.
```

## Quality Checks

- [ ] Every "reverse" step in §3 has an **exact command or console path** — no "revert in the usual way".
- [ ] Every step in §3 has a **verify** action — a rollback that can't be confirmed didn't happen.
- [ ] Trigger conditions in §2 name a **threshold** and a **window**, not "if things look bad".
- [ ] Data safety in §4 explicitly picks one of: reversible / forward-only / destructive. Ambiguity here is what kills rollbacks under stress.
- [ ] The approver in the header is a **person**, not a role queue — someone the on-caller can page at 2am.
- [ ] The plan has been **read aloud** by someone who wasn't in the design meeting; if they can't execute it from the doc, it's not a plan.

## Anti-Patterns

- [ ] Do not write "revert the PR" as the only step for a schema-changing deploy. Code is one of the reversal surfaces, not the whole reversal.
- [ ] Do not conflate "the deploy pipeline stops" with "the change is reversed" — a stopped pipeline just prevents *further* damage.
- [ ] Do not promise a rollback window shorter than the slowest step in §3 (usually cache warm or migration down). Time it, don't guess.
- [ ] Do not skip §4 because "this change doesn't touch data" — always say so out loud; the failure mode is silently changing something you thought was read-only.
- [ ] Do not treat "monitor for 24h and revert if bad" as a rollback plan. That's an intention. §3 is the plan.
- [ ] Do not lock the plan behind a login the on-caller may not have. Paste it into the runbook or the incident channel pin.

## Example Trigger Phrases

- "Write a rollback plan for the new checkout service deploy on Wednesday"
- "We're flipping the new-search flag to 100% — draft the back-out plan"
- "Rollback plan for the users-table migration"
- "What's our revert plan if the pricing change goes sideways?"
- "Rollout is staged 5/25/100 — I need a rollback per stage"
