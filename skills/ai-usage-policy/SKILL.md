---
name: ai-usage-policy
description: "Write an AI usage policy people can actually follow — approved tools, data rules, disclosure duties, and review obligations, in one page instead of legal fog. Use when asked for a company AI policy, acceptable-use rules for ChatGPT/Claude/Copilot at work, guidance on what data may go into AI tools, or to fix a policy nobody reads. Produces a one-page usable policy plus the decision log behind it. Not a substitute for legal advice; pairs with compliance-checklist for regulatory mapping and ai-ethics-review for system-level assessments."
---

# AI Usage Policy Skill

Most corporate AI policies fail in one of two ways: a fearful ban everyone quietly ignores (shadow AI, zero visibility), or legal fog nobody can apply to the question they actually have — "can I paste this customer email into Claude?" This skill writes the policy as a *decision aid*: one page, answerable in the moment of use, with the reasoning logged separately for counsel.

## What This Skill Produces

- A **one-page policy**: approved tools, the data traffic-light, disclosure duties, review obligations, and how to get a tool approved
- A **decision log**: the reasoning behind each rule, for legal/leadership review
- A **rollout note**: how the policy lands without becoming shelfware

## Required Inputs

Ask for (if not already provided):
- **The org**: size, industry, regulatory exposure (health, finance, gov contracts change the answers)
- **Current reality**: which AI tools are already in use — officially and (honestly) unofficially
- **Data landscape**: what sensitive classes exist (customer PII, PHI, source code, financials, client-confidential)
- **Enterprise agreements in place**: which tools have zero-retention/no-training terms signed vs consumer accounts
- **Risk appetite**: enable-with-guardrails or restrict-hard? (Get the sponsor's one-word answer.)

## Policy Method

1. **Legalise reality first.** Shadow AI is the largest risk *created by* strict policies. Start from what people already use; the policy's first job is making the sanctioned path easier than the unsanctioned one — approved tools with enterprise terms, clearly listed, with a fast approval lane for new ones (named owner, ≤2-week SLA).
2. **Rule on data, not tools.** Tools churn monthly; data classes don't. The core artifact is a traffic-light table people can apply in three seconds:
   - 🟢 **Fine in approved tools** — public info, your own drafts, non-confidential work product
   - 🟡 **Approved tools with enterprise terms only** — internal business data, code, unreleased plans
   - 🔴 **Never in any AI tool** (until a named exception is granted) — regulated data (PHI, card data), client-confidential under NDA, credentials, anything under legal hold
   Each row names *examples from this org's actual work*, not abstract categories.
3. **Set the accountability rule once, clearly.** The human who ships it owns it — AI-assisted or not. From that root, the review duties follow: outputs going to customers/public/regulators get human review *by someone competent to catch the errors*; internal drafts don't need ceremony. State both halves; policies that demand review-everything get review-nothing.
4. **Decide disclosure deliberately.** Internal: generally not required (it's a tool). External: disclose where the audience would feel deceived otherwise (bylined content, legal filings, anything presented as human judgment — expert reports, references) or where law/regulator requires it. Write the *specific* disclosure lines for this org's cases, not a principle.
5. **Keep the enforcement honest.** First violations of 🟡 rules are coaching moments; 🔴 violations follow the existing data-handling discipline process (don't invent a parallel one). The policy names its owner, its review cadence (quarterly — the landscape moves), and where questions go *today*.
6. **Log the reasoning separately.** Every rule gets one line in the decision log: what we ruled, why, what we considered. Counsel reviews the log; humans read the page.

## Output Format

### AI Usage Policy: [org] — v1, [date] · owner: [role] · review: quarterly

**Approved tools:** [tool → account type (enterprise/consumer-banned) → what it's approved for]
**Getting a tool approved:** [the lane: who, what they check, SLA]

**The data rule** *(the table above, with org-specific examples per row)*

**Your accountability:** [the ship-it-you-own-it rule + review duties by output destination]

**Disclosure:** [the org's specific cases with the exact lines to use]

**If something goes wrong:** [pasted the wrong thing / AI error shipped → who to tell, framed as no-fault-if-fast]

---
**Decision log** *(separate artifact)*: [rule → reasoning → alternatives considered → open questions for counsel]

**Rollout note:** [announce with the *enabling* frame; 30-min manager briefing; the three examples everyone actually asks about, answered]

## Quality Checks

- [ ] A stressed employee can answer "can I paste X into Y?" from the page in under a minute
- [ ] Every data-class row carries examples from this org's real work
- [ ] The sanctioned path is genuinely easier than shadow use (tools listed, approval lane fast)
- [ ] Disclosure rules are specific lines for specific cases, not a value statement
- [ ] The policy names its owner, review cadence, and question channel
- [ ] The decision log exists — counsel reviews reasoning, not just conclusions

## Anti-Patterns

- [ ] Do not ban broadly and enforce never — that policy trains people to hide usage you most need to see
- [ ] Do not write rules per-tool as primary structure — tools churn; data classes are the stable spine
- [ ] Do not require human review of *everything* — undifferentiated duty guarantees zero real review
- [ ] Do not copy another company's policy without the data-class mapping — the table is the policy
- [ ] Do not present this as legal advice — it's the draft counsel refines, and the page says so

## Example Trigger Phrases

- "Write a company AI policy."
- "What are our rules for using ChatGPT and Claude at work?"
- "Write acceptable-use rules for Copilot."
- "Fix an AI policy nobody reads."
