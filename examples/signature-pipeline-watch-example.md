# Example: Signature Pipeline Watch

## What this skill does
Have a proactive agent watch documents waiting for signature in DocuSign, Adobe Sign or PandaDoc: which are stuck, for how long, with whom, which have expiry dates coming, and which signed ones still need countersigning or filing, reported in the brief with drafted reminders a human sends.

## How to trigger it

### Example 1: A consultancy using DocuSign
**You say:**
> "Watch our DocuSign. Customer contracts go through Tomás, offer letters through Grace."

**Claude produces (excerpt):**

| Document | Stage | With whom | Days at stage | Expires | Next step |
|---|---|---|---|---|---|
| Northbridge MSA | partly signed | their legal (A. Chen) | 9 | 30 Oct | Tomás to call; reminder drafted |
| Offer: data analyst | waiting on countersignature | Grace | 2 | none | Grace to countersign |
| Halden SOW | completed, not filed | n/a | 4 | n/a | file to Clients/Halden |

---

### Example 2: From a one-line brief
**You say:**
> "Which contracts are stuck waiting for signature?"

**Claude produces (excerpt):** the full watch with default thresholds marked [inferred], the morning brief lines, the interrupt rules, and three questions that would sharpen it.

## Tips for best results
- Give one real number (usual daily volume, a floor, a lead time) and the thresholds stop being guesses
- Start with interrupts off for a week; read the brief lines, then switch on only the interrupts you missed
- Pair with `interrupt-rules` so this watch shares one alert policy with everything else

## Related skills
- `morning-brief-designer`: where these lines sit in the brief
- `interrupt-rules`: the shared alert policy
- `approval-policy-designer`: what the agent may do alone
