---
name: federal-resume
description: "Write a US federal resume for a USAJOBS application: the long, detailed format with hours per week, grade-relevant duties and specialised experience written to the announcement's qualifications. Use when asked to write my federal resume, apply on USAJOBS, turn my private-sector resume into a government resume, or qualify for a GS grade. Produces the federal resume, a qualifications crosswalk against the announcement's specialised experience, and a checklist of the details USAJOBS reviewers reject applications for missing."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/federal-resume.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Federal Resume

A US federal resume is the opposite of a private-sector resume. It is long, literal and complete, because human resources specialists check it against the announcement line by line before a hiring manager sees it. Missing hours per week or a vague duty can disqualify an otherwise strong applicant. This skill writes it to that checklist.

Part of the pm-cv bundle.

## What This Skill Produces

- **The federal resume**
- **A qualifications crosswalk**: each specialised-experience line from the announcement and where the resume proves it
- **A completeness checklist** of the details reviewers look for

## Required Inputs

Ask for these if not provided:
- **The job announcement**: the full text, especially Qualifications, Specialised Experience and the questionnaire
- **The target grade** (for example GS-12)
- **The person's experience**, with start and end dates (month and year), hours per week, and salary if they choose
- **Eligibility details** they want to claim (veterans' preference, status, programmes), only as they state them

## Framework

For each role include:
- Employer, location, title
- Start and end dates (month and year)
- Hours per week
- Salary (optional; include only if the person chooses)
- Supervisor name and whether they may be contacted (optional, as the person chooses)
- Duties and accomplishments, written to the announcement's specialised experience, in plain detail

Rules:
- **One year of specialised experience at the next lower grade** is the usual test. Make the level of each duty clear: scope, complexity, independence.
- **Use the announcement's words** where the experience truly matches; reviewers search for them.
- **Questionnaire answers must be supported.** Every "expert" self-rating needs a resume line behind it.
- **Length**: there is no two-page rule. Recent USAJOBS guidance has at times set a page limit; check the announcement and follow it exactly.

## Output Format

### Federal resume: [name], [title], [grade]
**1. The resume**
**2. Qualifications crosswalk** | Specialised experience line | Resume evidence | Role and dates |
**3. Questionnaire support** | Self-rating claimed | Supporting resume line |
**4. Completeness checklist** (hours per week, dates, grade-level detail, page limit)

## Quality Checks
- [ ] Every role has month and year dates and hours per week
- [ ] Every specialised-experience line is answered with a specific duty
- [ ] Any page limit in the announcement is respected
- [ ] Every high questionnaire rating is supported in the resume
- [ ] Eligibility claims are exactly as the person stated

## Anti-Patterns
- **A one-page private-sector resume.** It will likely be found not qualified.
- **Vague duties.** "Supported projects" does not show grade level.
- **Unsupported questionnaire ratings.** They can disqualify the whole application.
- **Guessing eligibility.** Veterans' preference and status claims are the person's to state.

## Example Trigger Phrases
- "Turn my resume into a federal resume for this USAJOBS posting."
- "I want to qualify for GS-13. Write my resume to the announcement."
- "What am I missing in my federal resume?"
- "Help me apply for a government job on USAJOBS."
