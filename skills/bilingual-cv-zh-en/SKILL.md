---
name: bilingual-cv-zh-en
description: "Produce a matched Chinese and English CV (中英文简历) from one set of facts: each version follows its own conventions rather than a literal translation, with names, titles, dates, education and company names rendered correctly in both. Use when asked for a Chinese and English resume, translate my CV into Chinese, 中英文简历, 英文简历, or apply to a foreign company in China or a Chinese company abroad. Produces the Chinese CV, the English CV, a consistency table proving the facts match, and a glossary of the terms chosen."
version: 1.0.0
---

# Bilingual CV, Chinese and English

Many roles in China, and many Chinese candidates applying abroad, need a CV in both languages. A literal translation reads badly in both: Chinese CVs and English CVs follow different conventions. This skill writes two native-feeling documents from one set of facts, and checks that the facts match exactly.

Part of the pm-cv bundle. Uses `country-cv-format` for the conventions of each side.

## What This Skill Produces

- **The Chinese CV (中文简历)**, in mainland conventions, or Traditional Chinese if the role is in Hong Kong or Taiwan
- **The English CV**, in the conventions of the target country
- **A consistency table**: every date, title, employer and number in both versions, side by side
- **A glossary**: the translation chosen for titles, employers, degrees and specialist terms

## Required Inputs

Ask for these if not provided:
- **The person's experience**, in either language
- **Where each version is going**: for example a multinational in Shanghai, a Chinese company's overseas office, or a UK employer
- **Simplified or Traditional characters**
- **The official English names** of employers and universities, if the person knows them

## Framework

**Chinese version (mainland conventions)**:
- Header: 姓名, contact details, and 求职意向 (target role, city, and expected salary only if the person chooses)
- Personal details such as age, 籍贯 (hometown) or 政治面貌 (political status) are optional; include only if the person chooses and the role expects them
- A photo is common; the person decides
- Sections: 教育背景, 工作经历, 项目经历, 专业技能, 证书与荣誉, 自我评价 (keep this short and evidence-based, or leave it out)
- Dates as 2021.03 至 2023.06 or 2021年3月至2023年6月, consistently

**English version**:
- Follows the target country's conventions (photo and personal details usually removed for the US, UK and Australia)
- Name order: given name then family name for most Western employers, with the family name in capitals if helpful (Wei ZHANG); keep the person's preferred English name if they have one
- No 自我评价 section; its content becomes a short summary with evidence

**Rendering rules**:
- Employers and universities: use the official English name. If unknown, use pinyin and say so in the glossary; never invent an English brand name
- Titles: translate the function, not the literal words (高级经理 may be Senior Manager; 总监 is usually Director); flag ambiguous ones
- Degrees: 本科 Bachelor's, 硕士 Master's, 博士 PhD; include the major
- Numbers and money: keep the currency (RMB or CNY) unless converting is agreed; never change a figure between versions

## Output Format

### Bilingual CV: [name]
**1. 中文简历**
**2. English CV**
**3. Consistency table** | Fact | 中文 | English | Match |
**4. Glossary** | Chinese term | English chosen | Note |

## Quality Checks
- [ ] Every date, number, title and employer matches between versions
- [ ] Official English names are used, or pinyin is flagged in the glossary
- [ ] Personal details follow each version's target country and the person's choice
- [ ] Neither version reads as a word-for-word translation

## Anti-Patterns
- **Literal translation.** "Responsible for" chains in English and stiff 被动 constructions in Chinese read as machine output.
- **Different facts in each version.** Recruiters at bilingual employers compare them.
- **Invented English company names.** Use the official one or pinyin.
- **Keeping 自我评价 adjectives in English.** "Hard-working, strong sense of responsibility" says nothing to an English reader.

## Example Trigger Phrases
- "帮我做一份中英文简历。"
- "Translate my Chinese CV into English for a job in London."
- "I need my English resume in Chinese for a role in Shanghai."
- "英文简历怎么写？我要投外企。"
