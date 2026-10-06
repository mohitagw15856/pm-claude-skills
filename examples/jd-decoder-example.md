# Example: jd-decoder

## What this skill does

Decodes a job description into what they actually want: the real must-haves versus negotiable nice-to-haves, hidden priorities and culture signals in the wording, red flags, an honest fit read, and the exact phrases to mirror in your application.

## How to trigger it

### Example 1: decode before applying

**You say:**
> "Decode this JD [pasted: 'Senior Product Manager, Payments' listing 14 requirements including '7+ years PM', 'payments/fintech experience', 'thrives in ambiguity', 'wears many hats', 'experience with regulators a plus', no salary listed]. I have 5 years PM, 2 in a lending startup."

**Claude produces (excerpt):**

### JD Decode: Senior PM, Payments at [company]

**1. What they actually want:** beneath 14 bullets, three things decide this hire:
- Someone who has shipped in a regulated environment ("experience with regulators a plus" is listed last but, combined with payments, is the actual job)
- Someone senior enough to be left alone ("thrives in ambiguity" + "wears many hats" = you'll define your own roadmap with thin support)
- Fintech fluency; the payments-specific asks read generic, so adjacent fintech likely qualifies

**2. Must-haves vs nice-to-haves**

| Requirement | Real weight | Your match |
|---|---|---|
| "7+ years PM" | nice-to-have (it's a seniority proxy, not a count) | ◐ 5 yrs, senior scope |
| "payments experience" | negotiable; fintech adjacency likely passes | ◐ lending = adjacent |
| regulated-environment shipping | must-have (buried, but it's the job) | ✅ lending is regulated |
| "wears many hats" | not a requirement; a warning | n/a |

**3. Hidden priorities & culture signals:** "wears many hats" plus "thrives in ambiguity" in a *senior* posting signals an under-resourced team, probably the first PM in payments. The long requirements list suggests the JD was written by committee; expect interviewers to disagree about the role.

**4. 🚩 Red flags:** no salary (negotiation starts dark); 14 requirements for one role (unsettled scope); "plus" on the thing that is clearly core (they may not know what they need; medium-serious).

**5. Your honest fit:** stretch, and a credible one. The year-count gap is the weakest objection; your regulated-shipping experience answers the strongest need. Address the 5-vs-7 head-on in the letter rather than hoping nobody counts.

**6. Phrases to mirror:** "regulated environment", "0-to-1", "cross-functional stakeholders", "payments infrastructure"; verbatim, in both CV and letter.

### Example 2: comparing two offers' JDs for the real job

**You say:**
> "Both JDs are for 'Head of Product'. One lists 'manage and grow a team of 8'; the other says 'player-coach, hands-on'. Same title; what am I actually choosing between?"

**Claude produces (excerpt):**

**The decode:** the first is a management job (your output is the team); the second is a senior IC job with a courtesy title ("player-coach" almost always resolves to "player"). Neither is better; they are different careers. Ask company two how many reports the role has *today*, not at plan; if the answer is 0-2, the title is aspiration.

## Tips for best results

- Paste the full JD including the boilerplate; culture signals hide in the parts companies think nobody reads.
- Give your actual background; the fit read is only honest with real inputs.
- Use the mirror phrases verbatim; the ATS matches strings, not synonyms.

## Related skills

- `interview-prep` once the decoded application gets a response
- `salary-negotiation` for the offer stage the missing salary line deferred
