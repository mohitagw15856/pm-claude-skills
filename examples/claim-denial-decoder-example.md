# Example: claim-denial-decoder

## What this skill does

Decodes an insurance claim denial: what the cited reason actually means and whether it is commonly overturnable, the evidence checklist that answers it, a point-by-point appeal letter ready to send, the escalation ladder, and every deadline that matters.

## How to trigger it

### Example 1: "not medically necessary"

**You say:**
> "My insurance claim was denied, what do I do? [pasted letter]: MRI denied as 'not medically necessary', internal appeal deadline 180 days, my GP referred me after 8 weeks of physio didn't resolve the shoulder pain."

**Claude produces (excerpt):**

### Denial Decode & Appeal: claim [#], [insurer]

**1. The decode:** "not medically necessary" is the most-cited and most-overturned denial category 🔴; it typically means a reviewer (often without your records) applied a checklist, not that your care was judged. Your fact pattern (conservative treatment tried and failed, physician referral) is exactly what answers it. Honest framing: genuinely appealable, with the treating-physician letter doing most of the work.

**2. Evidence checklist**

| Denial assertion | Evidence that answers it | Where to get it | Status |
|---|---|---|---|
| not medically necessary | letter of medical necessity citing the failed 8-week conservative course | your GP | to request |
| (implied) guidelines not met | the clinical guideline for imaging after failed conservative treatment | GP can cite; ask them to name it | to request |
| (records gap) | physio attendance and outcome notes | the physio clinic | to request |

**3. The appeal letter (excerpt):**

> Re: Claim [#], appeal of denial dated [date]
> Your letter states: "the requested MRI is not medically necessary."
> This determination does not reflect the clinical record. Enclosure 1, a letter of medical necessity from Dr [name], documents an eight-week course of conservative treatment (Enclosure 2) which failed to resolve symptoms, meeting the standard set out in [guideline] for diagnostic imaging.
> Policy section [§], "Diagnostic Services", provides coverage for imaging ordered by a treating physician.
> I request that the denial be reversed and the MRI authorised. This appeal is made within the 180-day window stated in your letter; if I do not receive a response within [the policy's stated period], I will pursue external review.
> Sent by tracked delivery.

**4. Escalation ladder:** internal appeal (this letter) → external/independent review (your letter's rights section names the body; deadline starts from the appeal outcome) → regulator complaint → demand letter/counsel if the amount justifies it.

**5. Deadlines box:** internal appeal by [date]; keep proof of every send.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

### Example 2: when the honest answer is "don't appeal"

**You say:**
> "Travel insurance denied my claim because the policy lapsed 3 days before the flight; I'd missed the renewal payment. Can I fight it?"

**Claude produces (excerpt):**

**The decode, honestly:** coverage lapsed at the date of loss is a 🟢 likely-solid denial; an appeal would spend your energy and deadlines on a near-zero-odds argument. What is worth 20 minutes instead: check whether the insurer sent the legally required lapse notice (no notice is the one crack in these denials; ask for proof of it in writing), and pursue the airline's own disruption obligations and your card's embedded travel cover, which are separate pots entirely.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

## Tips for best results

- Paste the denial letter verbatim; the appeal must quote and answer its exact words.
- Answer only the reason cited; arguing uncited grounds teaches the insurer new ones.
- Send everything trackable and diary every deadline; appeals are lost to calendars more than to merits.

## Related skills

- `disability-insurance-decoder` to understand the policy before a claim is ever made
- `benefits-decoder` for the employer plan documents behind a health denial
