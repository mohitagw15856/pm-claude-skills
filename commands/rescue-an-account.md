---
description: Workflow recipe — diagnose an at-risk customer and build the full save play through to renewal by chaining 4 skills.
argument-hint: "[the account and what's going wrong]"
---

Run the **Rescue an Account** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next. Open with a one-line plan of the 4 stages, then ask once for any essential missing inputs (ARR, renewal date, usage signals, the trigger). Don't re-ask between stages.

Run each stage under a clear `## Stage N — <name>` heading:

1. **Score the risk** — apply the `cs-health-scorecard` skill to produce a health score and the specific risk drivers.
2. **Find the cause** — apply the `churn-analysis` skill to identify the root cause and whether the risk is avoidable.
3. **Escalate it** — apply the `cs-escalation-brief` skill to write the internal brief and resolution plan.
4. **Plan the renewal** — apply the `renewal-playbook` skill to build the renewal strategy and negotiation plan.

Do not invent account facts — work only with what is given. End with a 4-bullet **"What you now have"** recap.
