---
name: company-tailored-cv
description: "Produce a CV shaped for one target company and role: its applicant tracking system, the country's conventions, the sector's norms, its published values and the job ad, with every choice explained. Use when asked to write my CV for a specific company, tailor my CV to Google, Amazon or any named employer, make my CV fit this company's format, or turn my experience into a CV for this job. Produces the tailored CV, a short format rationale citing public sources with dates, and a list of claims the person must be ready to defend. Never invents experience or insider knowledge."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/company-tailored-cv.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Company-Tailored CV

Almost no company publishes a CV format. What actually decides the right CV for a company is five things: the applicant tracking system it uses, the country's conventions, the sector's norms, its published values, and the job ad. This skill works those out from public information and the person's own experience, then writes one CV for one application.

Core skill of the pm-cv bundle. Reads the output of `career-inventory` when it exists.

## What This Skill Produces

- **The tailored CV**, ready to paste or export with `cv-docx-export`
- **A format rationale**: the five factors, what each one changed, and the public source for each, with the date checked
- **A keyword map**: the job ad's requirements and where the CV answers each one
- **A defend list**: every claim an interviewer is likely to probe, with the evidence behind it

## Required Inputs

Ask for these if not provided:
- **The person's experience**: a `career-inventory` file, an existing CV, or answers to a short interview
- **The target company and role**
- **The job ad**: the link or the full text. Without it, say the CV will be generic and ask again once
- **The country of the role**, which can differ from the company's home country
- **Anything to keep private**: a current employer, a gap, a visa status

## Framework: The Five Factors

Work them out in this order, and record the source of each.

1. **Applicant tracking system.** Read the application link. Use `ats-detector` rules: `myworkdayjobs.com` is Workday, `boards.greenhouse.io` is Greenhouse, `jobs.lever.co` is Lever, and so on. If unknown, assume a strict parser: one column, standard headings, no tables, text not images.
2. **Country.** Apply `country-cv-format`: length, photo, personal details, date format, spelling, paper size.
3. **Sector.** Consulting and banking want one page with education first. Academia wants a full CV. Government roles may want a specific form. Startups want evidence of range and speed.
4. **Published values.** If the company publishes values or principles, use `values-mapped-cv` to choose which achievements lead. Cite the page and the date. If it does not, skip this factor and say so.
5. **The job ad.** Extract the must-haves and nice-to-haves. Every must-have is answered in the top half of page one, in the ad's own words where the person's experience truly matches.

Then write:
- **Summary**: three lines, the role title from the ad, years, two strongest proofs
- **Experience**: newest first; three to five bullets per recent role, chosen for this ad; older roles shortened
- **Skills**: only those with proof in the experience section
- **Education and the rest**: in the order the country and sector expect

If web access is not available, say so, ask the person to paste the job ad and the values page, and do not guess at either.

## Output Format

### Tailored CV: [name] for [role], [company]

**1. The CV** (complete, in plain text or markdown that converts cleanly)

**2. Format rationale**
| Factor | What it is for this application | What it changed | Source, date checked |

**3. Keyword map**
| Requirement from the ad | Must or nice | Answered by | Strength: direct / adjacent / missing |

**4. Defend list**
| Claim on the CV | Likely question | Evidence to have ready |

**5. Missing requirements**: honest gaps, each with the best truthful framing or "do not claim"

## Quality Checks
- [ ] Every must-have from the ad is answered or listed as missing
- [ ] Every factor in the rationale has a source and a date, or says "not published"
- [ ] No experience, title, date or number appears that the person did not give
- [ ] Layout follows the tracking system's rules: one column, standard headings, no tables or images
- [ ] Personal details follow the country's rules, including what must be left out
- [ ] The defend list covers every number on the CV

## Anti-Patterns
- **Claiming a company "format" that does not exist.** Say what was inferred and from where.
- **Keyword stuffing.** Use the ad's words only where the experience genuinely matches. A screener and an interviewer will both notice.
- **Inventing to fill a gap.** List the gap with an honest framing instead.
- **Copying the company's values as adjectives.** "Customer-obsessed" proves nothing. An achievement that shows it does.
- **One CV for every application.** This skill writes one CV for one job, on purpose.
- **Hard-coding company facts from memory.** Tracking systems, values and job ads change. Check them each time and date them.

## Example Trigger Phrases
- "Write my CV for the senior product manager role at Monzo. Here's the job ad."
- "Tailor my CV to this Amazon job, in whatever format they expect."
- "I have my career inventory. Make the CV for this Siemens role in Munich."
- "Turn my experience into a CV for this company."
