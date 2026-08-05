---
aliases: ["Contract Red Flags"]
tags: [pm-skills, skill]
skill: contract-red-flags
description: "Scan a contract you're about to sign in plain language — surface the clauses that could bite you, what they mean, and what to question or renegotiate. Use when asked to check this contract before I sign, what am I agreeing to, are there red flags in this agreement, or explain this contract's risky bits. Produces a plain-English flag list of the risky/unusual clauses (auto-renewal, lock-in, liability, IP, termination, fees), what each means for you, questions to ask, and suggested changes — flagging when it's important enough for a lawyer. Not legal advice."
---

# Contract Red Flags

Most people sign contracts they haven't really read — and the damage lives in the clauses they skimmed: auto-renewals, one-sided termination, liability waivers, IP grabs, hidden fees. This reads the agreement as a wary friend would, translates the risky bits into plain language, and tells you what to question or push back on before you sign — while being clear it's not legal advice and some contracts warrant a lawyer.

## What This Skill Produces

- **A plain-English flag list** — the clauses that could hurt you, translated out of legalese
- **What each means for you** — the real-world consequence, not the wording
- **Questions to ask** — what to clarify with the other party before signing
- **Suggested changes** — reasonable edits or removals to request
- **A severity read** — which flags are dealbreakers vs. minor, and when the contract is big enough to warrant a lawyer

## Required Inputs

Ask for these if not provided:
- **The contract** — the text or the key clauses (paste what you can)
- **The type & stakes** — employment, lease, freelance/SOW, service, sale, NDA — and how much rides on it
- **Your role** — which side you're on
- **Your concerns** — anything specific worrying you
- **Region** — laws vary; affects enforceability and rights

## Framework: Translate, Flag, Question

1. **Read for the common traps.** Auto-renewal/evergreen terms, long lock-ins and exit/termination terms, liability and indemnity, IP ownership, non-competes, fee/late-charge clauses, unilateral change rights, and dispute/arbitration terms.
2. **Translate to consequences.** For each flag, say plainly what it means for the person ("they can cancel on 7 days' notice; you can't"), not just the clause.
3. **Separate dealbreakers from noise.** Rank flags by real risk so the person knows what to fight for vs. accept.
4. **Give questions and edits.** Offer specific things to ask and reasonable changes to request — most terms are negotiable if you raise them.
5. **Know the limit.** Enforceability varies by jurisdiction and you're not giving legal advice — flag high-stakes or complex contracts for a lawyer.

## Output Format

### Contract review: [type] · your side: [x] · stakes: [level]

**Red flags (plain English)**
| Clause | What it says | What it means for you | Severity |
|---|---|---|---|
| [name] | [plain summary] | [consequence] | 🚩/⚠️/ℹ️ |

**Ask before signing:** [clarifying questions].
**Request these changes:** [reasonable edits/removals].
**Dealbreakers:** [the ones to resolve or walk].

> Not legal advice. Enforceability varies by jurisdiction. For high-stakes or complex agreements, have a qualified lawyer review it.

## Quality Checks
- [ ] Flags the common trap clauses present in the contract
- [ ] Translates each into a real-world consequence, not legalese
- [ ] Ranks flags by severity (dealbreaker vs minor)
- [ ] Provides questions to ask and specific changes to request
- [ ] Flags when the stakes warrant a lawyer
- [ ] States it isn't legal advice / laws vary

## Anti-Patterns
- **Restating legalese** without translating the consequence.
- **Flagging everything equally** with no severity.
- **Missing the quiet killers** (auto-renewal, unilateral change, arbitration).
- **Asserting enforceability** as fact across jurisdictions.
- **Reassuring on a high-stakes contract** that truly needs a lawyer.

## Example Trigger Phrases
- "Check this freelance contract before I sign it."
- "What am I actually agreeing to in this lease?"
- "Are there red flags in this employment offer's fine print?"
- "Explain the risky clauses in this service agreement."
- "This NDA feels one-sided — what should I push back on?"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
