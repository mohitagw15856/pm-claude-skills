# Example: CRM Hygiene Sweep

## What this skill does
Have a proactive agent sweep a CRM (HubSpot, Salesforce, Pipedrive) on a schedule for the things that quietly rot a pipeline: deals with no next step, close dates in the past, deals untouched for weeks, contacts with no owner, and duplicate records, reported per owner with suggested fixes a human approves.

## How to trigger it

### Example 1: A 4-rep team on HubSpot
**You say:**
> "Sweep our HubSpot every Monday. 4 reps, ~120 open deals."

**Claude produces (excerpt):**

**Summary:** 23 without next step, 17 past close date (£212k), 9 stale over 21 days, 3 without owner, 4 likely duplicates.

**Priya:**
| Deal or record | Issue | Evidence | Suggested fix |
|---|---|---|---|
| Arden Foods expansion | past close date | close 30 Sep, stage Proposal | update close date or mark lost with reason |
| Kestrel Logistics | no next step | last activity 12 Oct email | add next step: follow-up call |

---

### Example 2: From a one-line brief
**You say:**
> "Clean up my CRM pipeline"

**Claude produces (excerpt):** the full watch with default thresholds marked [inferred], the morning brief lines, the interrupt rules, and three questions that would sharpen it.

## Tips for best results
- Give one real number (usual daily volume, a floor, a lead time) and the thresholds stop being guesses
- Start with interrupts off for a week; read the brief lines, then switch on only the interrupts you missed
- Pair with `interrupt-rules` so this watch shares one alert policy with everything else

## Related skills
- `morning-brief-designer`: where these lines sit in the brief
- `interrupt-rules`: the shared alert policy
- `approval-policy-designer`: what the agent may do alone
