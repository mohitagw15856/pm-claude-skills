# Example: interview-prep

## What this skill does

Prepares you for a specific interview at a specific company: what this round tests, likely questions ordered by probability, STAR answers drafted from your real background, a story bank mapped to competencies, questions to ask, and your gaps with honest handling.

## How to trigger it

### Example 1: behavioural round prep from a real background

**You say:**
> "Prep me for a behavioural round, senior PM at [fintech scale-up], interviewer is the Head of Product. My background: 4 years PM at a marketplace, led a payments migration that slipped 2 months, grew seller activation 30%, managed zero people but led a 7-person squad."

**Claude produces (excerpt):**

### Interview Prep: Senior PM at [fintech], behavioural with Head of Product

**1. What this round tests:** with a HoP interviewing, expect seniority calibration: ownership without authority, judgement under ambiguity, and how you handle failure. The payments migration slip is not a liability here; it is the interview.

**2. Likely questions (ordered):**
1. "Tell me about a project that didn't go to plan." (near-certain; your migration)
2. "How do you influence engineers who don't report to you?" (squad-lead background invites it)
3. "Walk me through a metric you moved and how you know you caused it."

**3. Your answers (STAR), top question drafted:**
- **S:** Led the payments provider migration, hard deadline from the acquirer's sunset date.
- **T:** Move 40k sellers with zero payout interruptions.
- **A:** Two weeks in, our reconciliation testing surfaced mismatches the vendor's sandbox hadn't shown. I made the call to slip rather than ship, re-cut the plan into seller cohorts, and renegotiated the sunset date with the acquirer directly.
- **R:** Landed 2 months late with zero missed payouts and zero seller churn attributable to the migration. The cohort playbook became the standard for the next two migrations.
- **The senior move in the telling:** own the slip as your decision, not a thing that happened to you; "I chose late over wrong" is the line a HoP is listening for.

**4. Story bank:** migration (failure, judgement, stakeholder), activation +30% (metrics, experimentation), squad leading (influence), [one more needed; see gaps].

**6. Gaps & landmines:** zero direct reports at senior level; pre-empt with "I've led through influence by design; here's the evidence it works", not an apology. Second gap: no fintech regulation exposure; one honest line plus the migration's compliance-adjacent work covers it.

### Example 2: the case round, different muscle

**You say:**
> "Same company, next round is a product case: 'improve our card-spend product'. How do I prep for that?"

**Claude produces (excerpt):**

**Structured approach to rehearse:** clarify the goal (revenue? engagement? retention?) before touching solutions; expect the interviewer to leave it ambiguous on purpose, because choosing a goal *is* the test. Then: user segments → the one friction worth solving → two solutions sized against effort → the metric and the kill criterion.

**A worked opening:** "Before I improve it, I'd want to know what winning means: interchange revenue or daily engagement? They pull in different directions; I'll assume engagement and say why..."

## Tips for best results

- Give your real background including the failures; the slipped project is usually the strongest story in the pack.
- Name the round and interviewer's role; a HoP and an HR screen test different things from identical questions.
- Rehearse the story bank aloud, not the question list; stories flex across questions, scripts don't.

## Related skills

- `jd-decoder` to decode the posting before prepping for its interview
- `salary-negotiation` for the stage this round leads to
