---
name: wage-garnishment-response
description: "Respond fast when your wages are being garnished or about to be — the deadlines, the exemptions that can reduce or stop it, and the steps that actually protect your paycheck. Use when asked they're garnishing my wages, how do I stop wage garnishment, I got a garnishment notice, or can they take my whole paycheck. Produces the urgent-deadline map (garnishments have short windows to object), the exemptions that may reduce or stop it (income limits, protected funds like benefits, head-of-household), how to file a claim of exemption or challenge, options to negotiate or resolve the underlying debt, and where to get legal aid immediately — so you act inside the window instead of watching your pay disappear. Not legal advice; centers fast legal-aid help."
---

# Wage-Garnishment Response

A garnishment notice is an emergency with a clock — there's usually a short window to object or claim exemptions, and missing it means watching a chunk of every paycheck vanish. This gets you moving inside that window: the deadlines, the exemptions that can reduce or stop it, how to file a challenge, options to resolve the debt, and where to get legal aid today — because speed is the whole game here.

## What This Skill Produces

- **The deadline map** — the short windows a garnishment gives you to respond, object, or claim exemptions, flagged as urgent-first
- **The exemptions to check** — limits on how much of your pay can be taken, and protected funds that often can't be garnished at all (many benefits, certain income), plus protections like head-of-household where they exist
- **How to challenge it** — filing a claim of exemption or objection, and what to bring
- **Resolution options** — negotiating the underlying debt, a payment agreement, or addressing the judgment behind the garnishment
- **The stop-the-source view** — whether the judgment itself can be contested or the debt was even valid (link to `debt-collector-scripts`)
- **An immediate-help pointer** — legal aid and where to get fast, often-free assistance, because deadlines are tight

## Required Inputs

Ask for these if not provided:
- **The stage** — notice received / already being deducted, and any date on the paperwork
- **The debt** — what it's for (consumer, taxes, child support — rules differ sharply)
- **Your situation** — income level, whether the funds involved are protected (benefits), household
- **Where** — region (garnishment limits, exemptions, and deadlines are local)

## Framework: Beat the Clock, Claim Exemptions, Get Help Now

1. **Find the deadline first.** The response/objection window is short and everything hinges on it — identify it and act before it closes.
2. **Check the exemptions.** Caps limit how much of your pay is reachable, and some funds (many benefits, certain income) are largely protected; head-of-household and hardship exemptions may apply.
3. **File the challenge.** A claim of exemption or objection, filed correctly and on time, can reduce or stop the garnishment — with the right documents.
4. **Address the underlying debt.** Negotiating a payment plan or settling can end the garnishment; and check whether the judgment/debt was even valid.
5. **Get legal aid immediately.** Given the deadlines, this is where free legal help matters most — don't wait to try it alone.

## Output Format

### Garnishment response: [stage] · [debt type] · [region]

**Deadline (act first):** [the objection/exemption window — urgent].
**Exemptions to claim:** [pay caps · protected funds (benefits) · head-of-household/hardship].
**How to challenge:** [file claim of exemption/objection + documents needed].
**Resolve the debt:** [payment plan · settle · contest the judgment/validity].
**Get help now:** [legal aid · court self-help — because the clock is short].

> Not legal advice — garnishment limits, exemptions, and deadlines are jurisdiction-specific, and child-support/tax garnishments follow different rules. Contact legal aid immediately.

## Quality Checks
- [ ] Surfaces the response deadline as the first, urgent item
- [ ] Lists pay caps and protected/exempt funds to claim
- [ ] Explains filing a claim of exemption/objection
- [ ] Includes resolving or contesting the underlying debt
- [ ] Routes to legal aid immediately given tight timelines

## Anti-Patterns
- **Missing the objection window** and losing the chance to reduce it.
- **Not claiming exemptions** you qualify for.
- **Assuming your whole paycheck** can be taken (caps usually apply).
- **Ignoring protected funds** like benefits that often can't be touched.
- **Trying to beat a deadline alone** instead of getting fast legal aid.

## Example Trigger Phrases
- "They're garnishing my wages — how do I stop it?"
- "I got a wage garnishment notice, what do I do?"
- "Can they legally take my entire paycheck?"
- "How do I claim an exemption to reduce a garnishment?"
- "Is it too late to fight a garnishment that already started?"
