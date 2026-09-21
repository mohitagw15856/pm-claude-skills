# Jurisdiction variants — depth where "neutral" isn't enough

The money and legal skills are written **jurisdiction-neutral** with "verify locally" flags. That's honest, but a lease, a deposit, or a garnishment is never neutral — the deadline, the multiplier, and the forum are all local. Variants add that depth **without** forking the skill.

## How it works

A variant is an **overlay**, not a copy: a short file at `variants/<skill>/<code>.md` that the agent reads *on top of* the base `skills/<skill>/SKILL.md`. It only states what differs — deadlines, statutory rules, the forum, the specific bodies to contact — and keeps every "verify current statute" flag. The base skill's framework, output format, and quality checks are unchanged.

```
skills/security-deposit-recovery/SKILL.md      ← the neutral base (unchanged)
variants/security-deposit-recovery/us.md        ← US overlay (state-varies framing)
variants/security-deposit-recovery/uk.md        ← England & Wales overlay
```

**Codes:** ISO-style — `us`, `uk` (England & Wales unless stated; `uk-scot`, `uk-ni` where different), `in`, `eu`, `ca`, `au`, and `us-<state>` (e.g. `us-ca`) when a state differs enough to matter.

## Rules for writing a variant

1. **Only the deltas.** Don't restate the base skill; state what's different here.
2. **Keep the hedge.** Laws change — every rule carries a "verify the current statute / scheme rules" flag and a date.
3. **Point to the real body.** The deposit scheme, the tenancy tribunal, the small-claims court, the ombudsman — name them.
4. **Not advice, still.** A variant sharpens the framework; it does not make the skill a lawyer. Route to legal aid where the base skill does.
5. **Human review first for high-stakes.** A variant to a high-stakes skill should get an expert review (`docs/EXPERT-REVIEW-PROGRAM.md`) before it's relied on.

## How the agent uses a variant

When the user's jurisdiction is known (asked in Required Inputs, or stated), read the base skill, then the matching variant, and let the variant's specifics override the base's "verify locally" placeholders. If no variant exists for the jurisdiction, use the base skill as-is and say the specifics are unverified.

## Priority list (build these next)

The highest-traffic high-stakes skills, in order: `security-deposit-recovery` (✅ us, uk), `lease-decoder`, `wage-garnishment-response`, `debt-collector-scripts`, `benefits-cliff-check`, `severance-agreement-decoder`, `notify-everyone-of-a-death`, `expungement-navigator`, `disability-benefit-appeal`, `tax-residency-primer`. Each needs `us`, `uk`, and `in` to start.
