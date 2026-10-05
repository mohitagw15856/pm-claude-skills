---
name: survey-design-basics
description: "Design a survey that measures instead of leads — neutral question wording, answer scales that don't smuggle conclusions, the length that respects completion rates, and the analysis plan written before launch. Use when asked write our customer/employee survey, check these questions for bias, why are our survey results useless, or design the questionnaire for this decision. Produces the question set with bias fixes, the scale choices, the pilot step, and the pre-launch analysis plan."
---

# Survey Design Basics Skill

Surveys fail at design time, invisibly: the leading question ("How much do you love our new feature?"), the double-barrel ("Is the product fast and reliable?" — which one?), the scale with no honest exit (forced positivity), and the twenty-minute questionnaire that only the delighted and the furious complete. By the time results arrive, the damage is unfixable — the data measures the questionnaire, not the population. Design discipline is cheap and front-loaded: neutral wording, one question per question, scales with real options, brutal length editing, a pilot, and the analysis plan written *before* launch — because a question you don't know how you'll analyze is a question you shouldn't ask.

## What This Skill Produces

- **The question set** — each question bias-checked and single-barreled, mapped to the decision it informs
- **The scale choices** — response options with the reasoning (and the don't-know/NA exits that keep answers honest)
- **The length edit** — the cut list, with the completion-rate logic
- **The pilot + analysis plan** — five test-takers before launch, and the how-each-question-gets-analyzed table written first

## Required Inputs

Ask for these if not provided:
- **The decision the survey feeds** — what will be done differently based on results; questions that inform no decision get cut first ([kpi-tracker-design](../kpi-tracker-design/SKILL.md) so-what logic)
- **The audience and reach method** — who gets it, how, and the response-rate reality (the selection caveat gets written into the analysis plan now, not discovered later)
- **The draft questions, if any** — existing drafts get the bias audit; the classic sins are findable and fixable
- **Prior interview themes** — surveys size what interviews surfaced ([interview-synthesis](../interview-synthesis/SKILL.md) hands off here); a survey inventing its own hypotheses mid-questionnaire does both jobs badly

## Framework: The Design Rules

1. **Neutral wording or measured applause:** every question checked for leading language ("how much do you love" → "how would you rate"), loaded framing, and social-desirability pull (people report the virtuous answer — anonymity and neutral framing are the mitigations). The test: could a respondent tell which answer you're hoping for?
2. **One barrel per question:** "fast and reliable" splits into two; "satisfied with price and support" splits into two — every "and" in a question is a fork respondents resolve invisibly, corrupting both halves.
3. **Scales with honest exits:** balanced options (as many negative as positive), a genuine midpoint where neutrality is real, and *don't-know / not-applicable* where respondents might legitimately not know — forced answers are fabricated data with a UI. Consistent scale direction throughout (flipping positive-left to positive-right mid-survey harvests inattention, not insight).
4. **Length is a completion-rate decision:** every question costs respondents; the audit asks each one "which decision do you inform?" and cuts the merely-interesting. Target minutes stated honestly up front; the nice-to-know questions die so the need-to-know ones get answered by more than the furious-and-delighted.
5. **Pilot, then the pre-launch analysis plan:** five real-ish people take it aloud (confusions found here cost nothing; found in results, everything) — and the analysis table (question → how it's cut → what result triggers what) exists *before* launch. It catches unanalyzable questions, pre-commits interpretations (guarding against results-fishing), and makes the results memo a fill-in exercise.

## Output Format

# Survey: [purpose] → [the decision] — target: [N] min

## The Questions
| # | Question (bias-checked) | Scale + exits | Informs which decision |
|---|---|---|---|
[The cut list below: killed questions + why]

## Scale & Flow Notes
[Direction consistency · midpoint/NA reasoning · anonymity level and its social-desirability logic]

## The Pilot
[Five think-aloud runs · the confusion fixes]

## The Analysis Plan (pre-launch)
[Question → the cut/comparison → the result-to-action mapping · the selection caveat, pre-written]

## Quality Checks

- [ ] No question telegraphs its hoped-for answer
- [ ] Zero double-barrels survived
- [ ] Every scale has honest exits and consistent direction
- [ ] Every surviving question maps to a decision; the cut list exists
- [ ] The analysis plan predates the launch

## Anti-Patterns

- [ ] Do not lead — a survey that flatters its author measures the flattery
- [ ] Do not force answers — missing "don't know" manufactures opinions from noise
- [ ] Do not ask everything interesting — length is paid in completion bias
- [ ] Do not launch without the analysis plan — unanalyzable questions are respondent-time theft
- [ ] Do not report percentages without the selection caveat — who answered is half the result

## Example Trigger Phrases

- "Write our customer/employee survey."
- "Check these questions for bias."
- "Why are our survey results useless?"
- "Design the questionnaire for this decision."
