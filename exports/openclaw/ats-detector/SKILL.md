---
name: ats-detector
description: "Work out which applicant tracking system a job uses from its application link, and give the formatting rules that system parses safely. Use when asked which ATS does this company use, will my CV get through the ATS, is my CV ATS friendly, or how should I format for Workday, Greenhouse, Lever or Taleo. Produces the detected system with the evidence, a parsing-safe formatting checklist, the file type to upload, and a check of a supplied CV against the rules."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ats-detector.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# ATS Detector

An applicant tracking system reads the CV before a person does. Each one parses differently, and the cheapest way to fail is a layout the parser scrambles: two columns, a table, a header image, contact details in a text box. This skill identifies the system from the application link and checks the CV against what that system needs.

Part of the pm-cv bundle. Used by `company-tailored-cv`.

## What This Skill Produces

- **The detected system**, with the evidence (the address pattern) and a confidence level
- **A formatting checklist** for that system
- **The file type** to upload
- **A CV check**: each rule marked pass or fail against a supplied CV, with the fix

## Required Inputs

Ask for these if not provided:
- **The application link** (the page where the "Apply" button leads, not the company homepage)
- **The CV**, if the person wants it checked

## Framework: Detection by Address

| Address contains | System |
|---|---|
| `myworkdayjobs.com`, `wd1.`, `wd3.`, `wd5.` | Workday |
| `boards.greenhouse.io`, `job-boards.greenhouse.io`, `gh_jid=` | Greenhouse |
| `jobs.lever.co` | Lever |
| `jobs.ashbyhq.com` | Ashby |
| `smartrecruiters.com` | SmartRecruiters |
| `icims.com` | iCIMS |
| `taleo.net` | Oracle Taleo |
| `oraclecloud.com/hcmUI` | Oracle Recruiting Cloud |
| `successfactors.com`, `jobs.sap.com` | SAP SuccessFactors |
| `bamboohr.com/careers` | BambooHR |
| `workable.com` | Workable |
| `teamtailor.com` | Teamtailor |
| `personio.de`, `personio.com` | Personio |
| `recruitee.com` | Recruitee |
| `jobvite.com` | Jobvite |
| `breezy.hr` | Breezy HR |
| `moka` or `mokahr.com` | Moka (China) |
| `zhiye.com` (Beisen) | Beisen (China) |

If the link is a company domain with none of these, say the system is unknown and apply the strict rules below. Do not guess a vendor.

## Framework: Parsing-Safe Rules (all systems)

1. One column. No sidebars.
2. No tables, text boxes, headers or footers for content. Contact details go in the body.
3. Standard headings: Summary, Experience, Education, Skills (or the local equivalents).
4. Dates in one consistent format, on the same line as each role.
5. Real text, not images of text. No icons standing in for words.
6. Common fonts. No ligatures or decorative characters in names and headings.
7. File type: `.docx` is the safest; text-based PDF is accepted by most modern systems. Never a scanned PDF.
8. File name: `Firstname-Lastname-CV.docx`.

System notes, where they differ:
- **Workday** asks the candidate to re-enter or confirm parsed fields. Keep job titles, employers and dates very plain so the autofill is right.
- **Taleo and older iCIMS** set-ups are the strictest parsers. Prefer `.docx`.
- **Greenhouse, Lever and Ashby** generally keep the original file for the human reviewer, so layout quality matters more for the second reader.

These notes describe common behaviour, not a guarantee. Each employer configures its system.

## Programmatic Helper

```bash
python3 skills/ats-detector/scripts/ats_detect.py "https://jobs.lever.co/acme/123"
python3 skills/ats-detector/scripts/ats_detect.py --json "https://acme.wd3.myworkdayjobs.com/en-US/careers/job/123"
```

It matches the address against the table above and prints the system and confidence. Standard library only. It does not fetch the page.

## Output Format

### ATS check: [company], [role]
**1. System**: [name] · Evidence: [the matching part of the address] · Confidence: high / medium / unknown
**2. Rules for this application** (checklist)
**3. CV check** | Rule | Pass / fail | Where | Fix |
**4. Upload**: [file type and file name]

## Quality Checks
- [ ] The evidence for the detected system is quoted from the address
- [ ] An unknown system is reported as unknown, with the strict rules applied
- [ ] Every failed rule has a specific fix
- [ ] The file type recommendation is stated

## Anti-Patterns
- **Guessing the vendor from the company's size or industry.** Only the address is evidence.
- **Promising a CV will "pass the ATS".** Systems rank and filter differently, and humans decide. Say it will parse cleanly.
- **Keyword-stuffing advice.** Hidden white text and keyword blocks are detected and look worse to the human reader.
- **Treating a beautiful two-column design as fine.** It may be fine for a human; it is a risk for the parser.

## Example Trigger Phrases
- "Which ATS is this job using? https://acme.wd3.myworkdayjobs.com/..."
- "Is my CV ATS friendly?"
- "How should I format my CV for Greenhouse?"
- "Will this two-column CV get through Taleo?"
