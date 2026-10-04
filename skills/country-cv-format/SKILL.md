---
name: country-cv-format
description: "Apply the CV conventions of the country where the job is: length, photo, personal details, date and name order, spelling, paper size and the documents expected alongside. Use when asked what a CV looks like in Germany, Japan, China, the UK, the US, France, India, the Gulf or Australia, should I put a photo on my CV, convert my US resume to a UK CV, or make a 简历, 履歴書 or Lebenslauf. Produces the country rules as a checklist, the CV converted to them, and the personal details that must be removed or added, with the legal reason where there is one."
version: 1.0.0
---

# Country CV Format

The same experience needs a different document in Berlin, Tokyo, Shanghai and Chicago. A photo that is expected in one country is a discrimination risk in another; a two-page CV is normal in London and too long in New York. This skill applies the conventions of the country where the job is, which is not always the employer's home country.

Part of the pm-cv bundle. Used by `company-tailored-cv`.

## What This Skill Produces

- **The rules for that country**, as a checklist
- **The CV converted** to those rules
- **A personal-details decision list**: what to add, what to remove, and why
- **The companion documents** that country expects, such as a cover letter, references or certificates

## Required Inputs

Ask for these if not provided:
- **The country of the job**, and the city if the person is unsure of local norms
- **The employer type**: local company, multinational, public sector or start-up. Multinationals often accept an international format
- **The current CV**
- **The language** the application should be in

## Framework: Conventions by Country

These are common conventions, not laws, except where a law is named. Check the employer's own instructions first; they override this table.

| Country | Name and length | Photo | Personal details | Notes |
|---|---|---|---|---|
| United States | Resume, 1 page (2 for 10+ years) | No | No age, marital status, nationality or photo, to avoid discrimination claims | US Letter, MM/YYYY |
| Canada | Resume, 2 pages | No | As the US | Bilingual roles may want French |
| United Kingdom | CV, 2 pages | No | No age, date of birth, marital status or photo (Equality Act 2010) | A4, British spelling, "References available on request" is outdated |
| Ireland | CV, 2 pages | No | As the UK | A4 |
| Germany | Lebenslauf, 1 to 2 pages, reverse chronological | Common, increasingly optional | Date of birth and nationality often included; optional under the General Equal Treatment Act (AGG) | Signed and dated at the end is traditional; certificates (Zeugnisse) expected in the application pack |
| Austria, Switzerland | As Germany | Common | As Germany | Swiss roles often want work permit status |
| France | CV, 1 page for juniors, 2 for seniors | Optional, declining | Optional | A cover letter (lettre de motivation) is expected |
| Netherlands, Nordics | CV, 2 pages | Optional | Minimal | Direct, plain tone |
| Spain, Italy, Portugal | CV, 2 pages; Europass common in public sector | Common | Date of birth often included | Italy: a privacy consent line (GDPR) is often added at the end |
| Japan | 履歴書 (rirekisho, fixed form) plus 職務経歴書 (shokumu keirekisho, career history) | Expected on the rirekisho | Date of birth, address, commute time on the form | Japanese era or Western dates; the rirekisho follows the JIS-style form |
| China (mainland) | 简历, 1 to 2 pages | Common | 求职意向 (target role) near the top; age, hometown and political status sometimes included, increasingly optional | Chinese and English versions often both wanted; see `bilingual-cv-zh-en` |
| Hong Kong, Taiwan | CV, 2 pages | Common | Expected salary and notice period often stated | Traditional characters for Chinese versions |
| Singapore | CV, 2 pages | Optional | Nationality or work pass status commonly stated | |
| India | CV, 2 pages | Optional | Date of birth sometimes; avoid caste, religion | Campus CVs follow the institution's one-page format |
| UAE, Saudi Arabia, Gulf | CV, 2 to 3 pages | Common | Nationality, visa status and date of birth often expected | |
| Australia, New Zealand | Resume or CV, 2 to 3 pages | No | No age or photo | Referees often named with contact details |

Rules that apply everywhere:
- Never include a national ID number, bank details or a full home address in a public application.
- Personal details that local law protects (age, religion, marital status, health) are added only if the person chooses to and the country expects them. Say so plainly.

## Output Format

### CV format: [country], [role]
**1. Rules for this application** (checklist, with the source of any legal point)
**2. Personal details decision** | Detail | Include? | Why |
**3. The converted CV**
**4. Companion documents** expected in this country
**5. What changed** from the person's original, in a short list

## Quality Checks
- [ ] The country is the country of the job, confirmed with the person
- [ ] Every legal claim names the law; everything else is called a convention
- [ ] Protected personal details are optional, and the person decided
- [ ] Paper size, date format and spelling match the country
- [ ] The employer's own instructions, if given, override the table

## Anti-Patterns
- **Treating conventions as laws.** Most of this table is custom. Say which parts are law.
- **Adding a photo by default.** Ask, and explain the norm and the risk.
- **Assuming the employer's home country.** A US company hiring in Munich wants a German-style application more often than not.
- **Converting by length only.** A rirekisho is a form, not a shorter CV.
- **Treating the table as current forever.** Norms change; check recent local job boards when unsure.

## Example Trigger Phrases
- "Convert my US resume into a UK CV."
- "What should a German Lebenslauf look like? Do I need a photo?"
- "Make my CV into a Japanese 履歴書 and 職務経歴書."
- "帮我把简历改成国内的格式。"
