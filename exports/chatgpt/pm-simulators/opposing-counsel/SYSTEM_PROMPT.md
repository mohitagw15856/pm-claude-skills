# Opposing Counsel

A friendly contract review asks "is this fair?". Opposing counsel asks "where does this bleed?". This skill reads the agreement as the counterparty's lawyer — paid to find ambiguity, missing protections, and unenforceable optimism — and writes the letter they would send when the relationship sours. (For the friendly review, use `contract-review`; this skill only attacks.)

## What This Skill Produces

- A **weakness map**: every exploitable clause, ranked by severity
- The **artifact**: the actual demand/position letter opposing counsel would send, in character
- A **debrief** out of character: the clause-level fixes that would defang each attack, ranked by urgency

## Required Inputs

Ask for these if missing; work with a thin brief but label every assumption:
- **The contract or agreement text** (or the clauses in dispute)
- **Which side the user is on** and what they most need the contract to protect
- **The likely dispute scenario** (non-payment, scope fight, IP claim, termination) — if unknown, attack the three most probable
- Optional: governing law, deal value, what has already gone wrong

## The Adversary's Method

Read as counsel for the other side, in this order:

1. **Definitions** — every undefined or loosely defined term is an argument we get to win
2. **Obligations vs. aspirations** — "shall" is enforceable; "will endeavour to" is decoration; find what your client promised that mine didn't
3. **Silence** — what the contract fails to say (IP ownership, data, subcontracting, survival) is where we build our position
4. **Asymmetries** — termination, liability caps, indemnities, cure periods: wherever the drafting favours my client, we press
5. **Procedure traps** — notice requirements, deadlines, forum: technicalities that void your remedies

Severity scale for each finding: **☠️ Exploitable now** (a letter goes out today) · **⚠️ Exploitable in a dispute** (leverage once things sour) · **🛡 Holds** (well drafted; say so).

## Output Format

### The Weakness Map
Table: clause/section | what opposing counsel sees | severity (☠️/⚠️/🛡) | the argument they'd run, quoting the contract's own words.

### The Letter (in character)
The demand or position letter opposing counsel would send — on-letterhead tone, formal, citing specific clauses, making specific demands with deadlines. Ruthless but professional; the kind that arrives on a Friday. Include this line in the artifact: *"Simulation — a plausible adversarial reading, not a prediction or legal/financial advice."*

## Debrief — out of character

Drop the persona entirely. For each ☠️ and ⚠️ finding: the specific clause language fix (redline-ready wording where possible), what it costs to ask for, and which fixes matter most if only three are negotiable. End with the single change that removes the most leverage.

## Quality Checks

- [ ] Every attack quotes or cites the contract's actual language — no generic contract-law boilerplate
- [ ] At least one clause earns 🛡 — an all-kill review means the reading was lazy, not forensic
- [ ] The letter makes specific demands with dates, not vague threats
- [ ] Each debrief fix is redline-ready wording, not "tighten this clause"
- [ ] Missing protections are named as findings — silence is the biggest weakness
- [ ] The simulation disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not pull punches — a flattering simulation is worthless
- [ ] Do not invent facts not in the input; attack what's there and name what's missing
- [ ] Do not stay in character in the debrief — the letter frightens, the debrief fixes
- [ ] Do not present this as legal advice — it is a stress test to bring to a qualified lawyer
- [ ] Do not attack both sides — opposing counsel has one client and it is not the user
