---
trigger: model_decision
description: "Extract every hidden assumption from a plan or document and put a price on each one — what it costs if wrong, what it costs to test. Use before committing to anything whose author says 'obviously' or whose spreadsheet has hardcoded cells: the bounty hunt makes the invisible load-bearing beliefs explicit and tells you which three to test this week. Produces the assumption ledger (priced and ranked), the cheapest test for each dangerous one, and the document's honest confidence statement."
---

# Assumption Bounty

Every plan is a stack of beliefs wearing a costume of facts. Most die from an assumption nobody wrote down — because unwritten assumptions can't be tested, assigned, or noticed when they quietly become false. The bounty hunt pays by the find: every hidden belief extracted, priced, and ranked by (cost if wrong) ÷ (cost to test).

## Required Inputs

- **The document** — plan, model, PRD, forecast, strategy. Spreadsheet-backed documents: include the key hardcoded numbers; each one is an assumption in a trench coat.
- Optional: which assumptions the team already knows about — the bounty only pays for *hidden* ones, and knowing the acknowledged list sharpens the hunt.

## Where Assumptions Hide

- **In verbs**: "users will migrate" (will they?), "the team can absorb" (can it?)
- **In adjectives**: "conservative estimate", "simple integration", "standard terms"
- **In silence**: what the document never mentions — pricing pages that assume no competitor response, hiring plans that assume no attrition
- **In hardcoded numbers**: every constant in the model (conversion 3%, CAC $400) is a belief with a confidence interval nobody stated
- **In the past tense**: "as we saw in the pilot" — assuming the pilot generalises
- **In org charts**: "marketing will drive awareness" assumes a team's priorities that were never negotiated

## Output Format

1. **The ledger** — table, ranked by danger score: assumption (quoted or reconstructed) | where it hides | cost if wrong (order of magnitude, in the plan's own currency: money, weeks, credibility) | cost to test | danger = wrong÷test.
2. **The big three** — the top of the ledger, each with its **cheapest decisive test**: what to do this week, what result confirms vs kills, who can run it. A test that can't kill the assumption isn't a test.
3. **The upgrade list** — assumptions that become facts with one email/query ("we assume the contract allows X" → legal can answer today). Free confidence; harvest it.
4. **The honest confidence statement** — one paragraph the author could paste into the document: "This plan holds if A, B, and C; A is tested, B is testable by <date>, C is a bet we're choosing to take." Plans with this paragraph survive contact with executives.

## Quality Checks

- [ ] Every ledger entry is traceable to the document (quote or named silence) — no imported generic risks
- [ ] Costs are in the plan's own units and orders of magnitude, not "high/medium/low" theatre
- [ ] Each big-three test can actually KILL the assumption — confirmation-only tests are flagged and replaced
- [ ] At least two upgrade-list items exist, or the hunt states the document was unusually explicit (rare; say it with respect)
- [ ] The confidence statement names the chosen bets as bets — the honesty is the deliverable

## Anti-Patterns

- [ ] Do not list more than ~12 assumptions — past that, extraction has become transcription; rank and cut
- [ ] Do not price everything as catastrophic — a ledger where everything kills the plan hides the one that actually will
- [ ] Do not propose tests that cost more than being wrong — the ratio is the whole game
- [ ] Do not treat acknowledged assumptions as finds — the bounty is for the hidden ones; padding with the known list is claiming someone else's kill
- [ ] Do not moralise about assuming — plans require assumptions; the sin is anonymity, not existence
