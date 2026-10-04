---
name: cv-docx-export
description: "Turn a finished CV into a parsing-safe Word file ready to upload: one column, real heading styles, no tables, headers or images, the right paper size, and correct fonts for Chinese, Japanese or Korean text. Use when asked to give me my CV as a Word file, export my CV to docx, make an ATS-safe CV file, or produce my 简历 as a Word document. Produces the .docx file, a text read-back proving it parses, and the upload file name."
version: 1.0.0
---

# CV Word Export

The last step of a CV is the file. A beautiful template with two columns, a photo in a text box and the phone number in the page header can parse into nonsense in a tracking system. This skill writes a plain, well-structured Word file and reads its text back to prove the content survives.

Last step of the pm-cv bundle.

## What This Skill Produces

- **The .docx file**, named `Firstname-Lastname-CV.docx`
- **A read-back**: the text extracted from the file, to show what a parser will see
- **The settings used**: paper size, fonts, and why

## Required Inputs

Ask for these if not provided:
- **The finished CV text**, from `company-tailored-cv` or the person
- **The country of the job**, which decides A4 or US Letter
- **Where to save the file**

## Framework

1. **Convert the CV to the simple input format**: `# Name`, a contact line, `## Section`, `### Role, Organisation | Dates`, `- bullet`.
2. **Choose the paper**: US Letter for the United States and Canada, A4 everywhere else.
3. **Fonts**: a common font (Calibri by default). For Chinese, Japanese or Korean text, an East Asian font is set so characters do not fall back to boxes.
4. **Write the file** with the helper, or, without it, give the person the text with exact instructions: paste into a blank Word document, apply Heading 1 to sections, no tables, no text boxes.
5. **Read it back** and compare with the source. Anything missing is a bug, not a detail.

## Programmatic Helper

```bash
python3 skills/cv-docx-export/scripts/cv_docx.py cv.md Jane-Smith-CV.docx
python3 skills/cv-docx-export/scripts/cv_docx.py cv.md Jane-Smith-CV.docx --paper letter
python3 skills/cv-docx-export/scripts/cv_docx.py cv.md Zhang-Wei-CV.docx --east-asian-font "Microsoft YaHei"
python3 skills/cv-docx-export/scripts/cv_docx.py --check Jane-Smith-CV.docx
```

Standard library only. It refuses to overwrite an existing file unless `--force` is passed.

## Output Format

### CV file: [name]
**1. File**: [path] · [A4 / Letter] · [font], East Asian font [font]
**2. Read-back**: the extracted text
**3. Differences from the source**: "none", or each one listed
**4. Upload as**: [file name], [file type], and any note from `ats-detector`

## Quality Checks
- [ ] The read-back contains every section, role and bullet from the source
- [ ] No tables, text boxes, headers, footers or images in the file
- [ ] Paper size matches the country of the job
- [ ] Chinese, Japanese or Korean text has an East Asian font set
- [ ] An existing file was not overwritten without the person agreeing

## Anti-Patterns
- **Decorative templates for a tracking system.** Save the designed version for a human hand-off.
- **Contact details in the page header.** Many parsers skip headers.
- **Skipping the read-back.** It is the only proof the file says what the person thinks it says.
- **Exporting a CV that has not been checked.** Run `cv-honesty-check` first.

## Example Trigger Phrases
- "Give me my CV as a Word file I can upload."
- "Export this CV to an ATS-safe docx."
- "Make it US Letter, it's for a job in Boston."
- "把我的简历导出成 Word 文件。"
