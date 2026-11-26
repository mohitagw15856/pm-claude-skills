# Worked Example — Claim Denial Decoder

A gold-standard run of this skill: a "not medically necessary" denial answered point by point with evidence, inside the deadline, in the tone that moves files.

## The brief

Marcus's insurer denied coverage for an MRI his orthopedist ordered after eight weeks of worsening knee pain that hadn't responded to physical therapy. The denial letter states: *"The requested service (MRI, right knee) is not medically necessary. Clinical guidelines indicate conservative therapy should be attempted prior to advanced imaging. You may appeal within 180 days."* Marcus has: the orthopedist's referral notes, PT records showing 16 completed sessions over 8 weeks with documented worsening, and the denial letter dated June 12. He's furious and drafted an opener that begins "Your company's greed is endangering my health."

## The output

### Denial Decode & Appeal: claim #[…], [insurer]

**1. The decode** — The cited reason is "not medically necessary — conservative therapy first." This is the **most commonly overturned denial type**, and this one contains its own defeat: the letter demands conservative therapy be attempted first, and Marcus's records show *eight weeks of it, completed and failed*. The denial appears to have been issued without the PT records — either they weren't received or weren't reviewed. Appeal odds framing: strong-answerable. (The furious draft goes in a drawer: adjusters route anger to the bottom of the pile; evidence moves files.)

**2. Evidence checklist**

| Denial assertion | Evidence that answers it | Where to get it | Status |
|---|---|---|---|
| "Conservative therapy should be attempted prior" | 16 PT sessions / 8 weeks, documented worsening | PT clinic records | ✅ in hand |
| "Not medically necessary" | Treating physician's letter: exam findings, why imaging changes treatment | Orthopedist (request the letter this week) | ⏳ request |
| (implied) guidelines support denial | The same guideline class typically supports imaging *after failed conservative care* — ask the orthopedist to cite it in the letter | In the physician letter | ⏳ |

**3. The appeal letter** —

> RE: Appeal of denial dated June 12, claim #[…], member #[…]
>
> Your letter of June 12 states the requested right-knee MRI is "not medically necessary" because "clinical guidelines indicate conservative therapy should be attempted prior to advanced imaging."
>
> Conservative therapy has been attempted and has failed. Enclosed are records documenting sixteen physical-therapy sessions over eight weeks (April 10–June 5), with clinician-documented worsening of symptoms over that course (Enclosure 1). Also enclosed is a letter from my treating orthopedist, Dr. [name], setting out the examination findings, the guideline basis for advanced imaging following failed conservative treatment, and how the MRI result will determine the treatment plan (Enclosure 2).
>
> The denial's stated condition — conservative therapy first — is therefore satisfied. I request that the denial be reversed and the MRI authorized. I am filing this appeal well within the 180-day window stated in your letter; please confirm receipt and provide your decision timeline. This letter is sent by trackable delivery.

**4. Escalation ladder** — Internal appeal (this letter) → if upheld, the letter's own rights section describes the next internal level and any external/independent review (plan- and jurisdiction-dependent — read that section; external review exists in many systems and reverses a meaningful share) → regulator complaint → for a denial of significant ongoing treatment, counsel.

**5. Deadlines box** — Appeal window: 180 days from June 12 → **December 9**. Send by: this month (adequate-and-on-time beats perfect-and-late; the physician letter is the only missing piece). Confirm receipt: 10 days after sending.

*"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Why it's shaped this way

- **The appeal answers the denial's exact quoted words** — "conservative therapy should be attempted prior" is restated and then *satisfied with evidence*, per the framework's core structure; arguing anything else would teach the insurer new denial grounds.
- **The fury draft was retired, explicitly and kindly** — the skill's anti-pattern is the outrage letter; the decode explains *why* (routing, not fairness) so Marcus's anger has somewhere to go that isn't the file.
- **The denial's self-defeat is the strategy** — this reason-type is flagged 🔴-answerable in the framework precisely because the evidence (completed PT) directly negates the stated basis; the decode says so, which sets honest expectations.
- **The physician letter is requested with its contents specified** — findings, guideline citation, treatment-plan impact — because a generic "please cover it" note wastes the strongest voice in the file.
- **Every assertion points to an enclosure** — the evidence-checklist-to-letter pipeline is the skill's mechanism; no claim in the letter floats free of a document.
- **The deadline box turns 180 days into a send-this-month plan** — per the anti-patterns, the perfect appeal in month five loses to the strong appeal in month one, and external review needs the internal clock run properly.
