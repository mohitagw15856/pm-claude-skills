---
name: jd-gap-score
description: "Score how well a CV covers a job ad, requirement by requirement, and say honestly what to do about each gap. Use when asked how well do I match this job, score my CV against this job description, what am I missing for this role, or should I apply. Produces a requirement table marked covered, partly covered or missing with the evidence, a fit score with its method shown, and for each gap a truthful framing, a quick way to close it, or advice not to claim it."
version: 1.0.0
---

# JD Gap Score

A match score is only useful if it shows its working. This skill reads the job ad, separates must-haves from nice-to-haves, finds the evidence for each in the CV, and scores the fit in a way the person can check line by line. Then it says what to do about each gap, including when the honest answer is "do not claim this".

Part of the pm-cv bundle. Complements `jd-decoder`, which explains what a job ad really means.

## What This Skill Produces

- **A requirement table**: each requirement, must or nice, covered, partly covered or missing, and the CV line that proves it
- **A fit score** with the method shown
- **A gap plan**: for each gap, a truthful framing, a way to close it, or "do not claim"
- **An apply verdict**: apply, apply with a framing, or a stretch worth a referral

## Required Inputs

Ask for these if not provided:
- **The job ad**, in full
- **The CV** or a `career-inventory` file

## Framework

1. **Extract requirements.** One per line. Mark must-have (required, essential, minimum) or nice-to-have (preferred, bonus, desirable). If the ad does not say, a requirement in the first list is a must-have.
2. **Find evidence.** For each, quote the CV line that shows it. Rate it:
   - **Covered (1.0)**: direct evidence, same thing
   - **Partly covered (0.5)**: adjacent experience a reasonable reader would accept
   - **Missing (0)**: nothing, or only a keyword with no evidence behind it
3. **Score.** Must-haves weigh 2, nice-to-haves weigh 1. Fit = weighted points ÷ weighted maximum, as a percentage. Show the sum.
4. **Plan each gap.**
   - **Truthful framing** when adjacent experience exists ("led migration to a similar platform")
   - **Close it fast** when a course, certificate or small project would do it in weeks
   - **Do not claim** when there is nothing. Say so plainly.
5. **Verdict.** Over 75% with all must-haves at least partly covered: apply. 50% to 75%: apply with the framings. Under 50% or a missing must-have: a stretch; a referral matters more than the CV.

## Programmatic Helper

```bash
python3 skills/jd-gap-score/scripts/jd_gap.py --jd job.txt --cv cv.txt
python3 skills/jd-gap-score/scripts/jd_gap.py --jd job.txt --cv cv.txt --json
```

A rough first pass: it pulls bullet lines from the job ad and counts how many of each line's meaningful words appear in the CV. It is a keyword check, not a judgement. Use it to find lines to look at, then rate evidence by reading. Standard library only.

## Output Format

### Gap score: [role], [company]
**1. Requirements** | # | Requirement | Must / nice | Status | Evidence from the CV |
**2. Score**: [points] of [maximum] = [percentage], with the sum written out
**3. Gap plan** | Requirement | Action: framing / close it / do not claim | Detail |
**4. Verdict**: [apply / apply with framing / stretch] and the one-sentence reason

## Quality Checks
- [ ] Every requirement in the ad appears in the table
- [ ] Every "covered" or "partly covered" quotes a CV line
- [ ] The score's arithmetic is shown and correct
- [ ] At least one gap is marked "do not claim" if nothing supports it
- [ ] The verdict follows the stated thresholds

## Anti-Patterns
- **A score without working.** A number nobody can check is decoration.
- **Counting keywords as evidence.** "Kubernetes" in a skills list with no project behind it is missing.
- **Encouraging false claims** to raise the score.
- **Discouraging by default.** Many people meet 60% and get hired. Say when to apply anyway.

## Example Trigger Phrases
- "How well does my CV match this job?"
- "Score my CV against this job description."
- "What am I missing for this role? Should I apply?"
- "帮我看看我的简历和这个岗位要求的匹配度。"
