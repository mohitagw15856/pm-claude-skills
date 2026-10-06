# Example: startup-idea-validator

## What this skill does

Pressure-tests a startup idea like a sharp investor: the steel-manned strongest case, a six-dimension scorecard, the killer risks named as falsifiable assumptions, the why-not-already answer, the cheapest next experiment, and a verdict.

## How to trigger it

### Example 1: validating before building

**You say:**
> "Validate this: a tool that auto-generates SOC 2 evidence for small SaaS companies by reading their existing GitHub, AWS and HR systems. I'm a security engineer; I'd charge £500/month."

**Claude produces (excerpt):**

### 1. Steel-man
Compliance is bought, not loved: budget exists, pain is acute (deals blocked until the report lands), and the buyer can expense £500/month without approval. Founder-market fit is real; you have done the manual version.

### 2. Scorecard

| Dimension | Read | Notes |
|---|---|---|
| Problem | 🟢 | deal-blocking pain, named budget line |
| Market | 🟡 | every B2B SaaS eventually needs it, but Vanta/Drata defined the category |
| Wedge | 🟡 | "evidence generation" is a feature of incumbents, not yet a wedge |
| Why-now | 🟡 | no new enabler you've named; the 2020 why-now belonged to the incumbents |
| Moat | 🔴 | integrations are replicable; incumbents have more of them |
| Distribution | 🟢 | auditors and accountants are a reachable channel incumbents underuse |

### 3. The killer risks
1. **The assumption that £500/month undercuts anyone.** Incumbent list prices are negotiable; your real price gap may be £100/month, which buys no switching.
2. **The assumption that evidence generation is the pain.** For many it is the auditor relationship; if so, you are automating the cheap half.

### 4. Why-not-already
It exists: this is roughly the incumbents' core feature. The honest question is not "why doesn't this exist" but "what do they structurally ignore?" Possible answer: sub-20-person companies pre-first-audit, which incumbents' sales models skip. That segment is your real idea.

### 5. The next experiment
Before writing code: 15 conversations with sub-20-person SaaS founders who finished SOC 2 in the last year. Ask what they paid, what hurt, and whether they'd have switched for your pitch. Green light: 5+ say the incumbents failed them at that size. Red light: they shrugged and paid.

### 6. Verdict
*Promising-with-conditions*: the condition is repositioning from "cheaper Vanta" to "the pre-first-audit segment", and the 15 conversations decide whether that segment is real.

### Example 2: the follow-up after the experiment

**You say:**
> "Did the 15 calls. 11 said the incumbent was overkill before the first audit; 6 used spreadsheets and hated it. But 9 of 15 said they'd only buy if their auditor accepted the output."

**Claude produces (excerpt):**

**What changed:** the wedge is confirmed (🟡 → 🟢) and the real gatekeeper is identified: the auditor, not the founder. The product's first integration is not AWS; it is two named audit firms who bless the output.

**The next experiment:** get one audit firm to agree, in writing, that your evidence format is acceptable. That letter is worth more than an MVP, costs zero code, and is itself the beginning of a moat the incumbents' self-serve model cannot copy cheaply.

## Tips for best results

- Say who you are; founder-market fit changes the read on every dimension.
- Name a price; "would people pay" is untestable, "£500/month" is not.
- Run the next experiment before arguing with the scorecard; evidence beats re-litigation.

## Related skills

- `runway-planner` once the idea is real and burning money
- `investor-cold-email` when validation is done and the raise begins
