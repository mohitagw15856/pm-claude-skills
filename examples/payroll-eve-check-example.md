# Example: Payroll Eve Check

## What this skill does
Have a proactive agent check payroll the day before it runs in Gusto, Deel, Xero Payroll or similar: unusual pay changes, new starters and leavers, missing approvals, enough cash in the funding account, and anything that would make a payslip wrong, reported as a short pre-run list for a human to approve.

## How to trigger it

### Example 1: A 23-person company on Gusto
**You say:**
> "Payroll runs Thursday in Gusto, 23 staff, usually about $96k gross. Mia approves."

**Claude produces (excerpt):**

**Funding:** covered: operating account $141,200 at 18:00 against $96,800 plus $14,300 taxes.
**Run total:** $98,950 vs $95,870 (+3.2%)

| Person or item | What changed | Evidence | Question for Mia |
|---|---|---|---|
| R. Okafor | gross +38% | overtime 42h, no approval on file | Was this overtime approved? |
| J. Brandt (leaver) | still on this run | termination date 16 Oct | Final pay only, or remove? |

**Status:** ready for review by Mia; nothing has been changed or approved.

---

### Example 2: From a one-line brief
**You say:**
> "Check payroll before it runs tomorrow"

**Claude produces (excerpt):** the full watch with default thresholds marked [inferred], the morning brief lines, the interrupt rules, and three questions that would sharpen it.

## Tips for best results
- Give one real number (usual daily volume, a floor, a lead time) and the thresholds stop being guesses
- Start with interrupts off for a week; read the brief lines, then switch on only the interrupts you missed
- Pair with `interrupt-rules` so this watch shares one alert policy with everything else

## Related skills
- `morning-brief-designer`: where these lines sit in the brief
- `interrupt-rules`: the shared alert policy
- `approval-policy-designer`: what the agent may do alone
