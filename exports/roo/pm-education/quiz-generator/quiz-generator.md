# Quiz Generator Skill

Good assessment questions test understanding, not recall of trivia — and have answer keys that teach. This skill writes questions aligned to objectives, spread across difficulty and Bloom's levels, with explanations.

## Working from a brief

Given a topic, **generate the full quiz anyway** at a reasonable level, and mark assumed scope. Never leave "[question here]" or an answer blank. For MCQs, every distractor must be plausible (reflect a real misconception), not filler.

## Required Inputs

Ask for (if not already provided):
- **Topic / content** and **grade or level**
- **Number of questions** and **types** (MCQ, true/false, short answer, essay, fill-in)
- **Difficulty mix** and whether to align to specific objectives/standards
- **Purpose** (formative check, graded test, exam prep)

## Output Format

### Quiz header
- **Topic · Level · # questions · est. time**
- **Coverage:** which objectives/subtopics each section maps to.

### Questions
Numbered, grouped by type. Each question tagged: `[difficulty · Bloom's level]`.
- **MCQs:** 4 options, one correct, three plausible distractors tied to misconceptions.
- **Short answer / essay:** include what a full-credit response must contain.

### Answer key
For every question: the correct answer **and a one-line explanation** (for MCQs, also *why each distractor is wrong* where useful).

### Blueprint table

| # | Type | Difficulty | Bloom's | Objective |
|---|---|---|---|---|

(Shows the spread so it's not all recall or all hard.)

## Quality Checks

- [ ] Questions test the objective, not trivia or wording tricks
- [ ] MCQ distractors are plausible and reflect real misconceptions
- [ ] Difficulty and cognitive levels are genuinely mixed, shown in the blueprint
- [ ] Every question has a correct answer + explanation in the key
- [ ] No "all/none of the above" crutches or giveaway grammatical tells

## Anti-Patterns

- All recall, no application or analysis
- Obvious throwaway distractors
- Trick questions that test reading, not the subject
- Answer key with answers but no explanations
