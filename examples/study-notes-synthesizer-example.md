# Example: study-notes-synthesizer

## What this skill does

Turns lecture notes, slides and readings into one exam-ready study guide: concepts organised by dependency rather than lecture order, plain-language explanations before formal definitions, confusable pairs side by side, three-depth self-test questions, and an honest list of gaps in your materials.

## How to trigger it

### Example 1: a semester of notes into one guide

**You say:**
> "Make a study guide from my research methods notes [uploaded: 9 lectures of notes, patchy after lecture 6]. Exam in 2 weeks, I'm weakest on validity and sampling."

**Claude produces (excerpt):**

# Study Guide: Research Methods, exam [date]
**Start here (your declared weak spots):** clusters 2 (validity) and 4 (sampling), below.
**⚠ Gaps in your materials:** lectures 7-9 notes are thin; the syllabus lists *mixed methods* and *ethics in field research* which your notes cover in 4 lines total. These are studyable from the textbook chapter 11-12, not from these notes; flagging now, not the night before.

## Cluster 2: Validity (and its confusables)
**Plainly:** validity asks "are we measuring the thing we claim to measure?"; reliability asks "do we get the same answer each time?". A bathroom scale that is always 3kg heavy is reliable but not valid.
**Formally:** validity = the degree to which evidence supports the intended interpretation of scores; reliability = consistency of a measure across time, items, and raters.
**Builds on:** operationalisation (cluster 1); you cannot judge validity of an unmeasured construct.
**Confused with:** reliability (above), and internal vs external validity:

| | Internal validity | External validity |
|---|---|---|
| The question | did X really cause Y here? | does it generalise beyond here? |
| Threatened by | confounds, selection bias | artificial settings, narrow samples |
| The trade-off | tight lab control raises it | ...and usually lowers this one |

### Test yourself
1. [recall] Define internal validity in one sentence.
2. [apply] A study finds a tutoring app improves grades, but app users were volunteers. Which validity is threatened and why?
3. [why X not Y] Why can a highly reliable measure still be invalid, but a highly valid measure cannot be wildly unreliable?

## One-page cram sheet (excerpt)
- Validity = right thing; reliability = same thing
- Random *sampling* → generalisation; random *assignment* → causation (the exam will test this exact distinction)

### Example 2: two sources that disagree

**You say:**
> "My lecture notes define a confidence interval one way and the textbook another. Which goes in the guide?"

**Claude produces (excerpt):**

**Both, side by side, labelled:** the lecture version is the informal reading ("range we're 95% sure contains the mean"), the textbook's is the correct frequentist one ("95% of such intervals would contain the true mean"). The guide keeps the textbook definition as the exam answer and flags the lecture phrasing as the common misconception, because that is exactly the distinction a "explain why X not Y" question harvests. When sources disagree, the disagreement goes in the guide as content, not resolved silently.

## Tips for best results

- Upload everything, including the messy notes; gaps can only be flagged against what you give.
- Declare your weak spots; the guide leads with them instead of lecture 1.
- Name confusable pairs you keep mixing up; side-by-side tables are built from them.

## Related skills

- `exam-prep-planner` to schedule the retrieval sessions this guide feeds
- `meeting-notes` for synthesising work meetings rather than course material
