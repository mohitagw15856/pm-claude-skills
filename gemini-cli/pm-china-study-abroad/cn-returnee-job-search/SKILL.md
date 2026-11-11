---
name: cn-returnee-job-search
description: "Plan the job search of a Chinese student returning from study abroad (海归): the recruitment calendar, graduate-status and degree-certification rules, where returnees are competitive, converting an overseas CV for Chinese employers, interview preparation and settlement policies. Use when asked 海归怎么找工作, 留学生回国求职时间线, 秋招什么时候开始, 留学生算应届生吗, 学历认证怎么办, 留学生落户, or plan my job search back in China. Produces a timeline by graduation date, a status and paperwork checklist, a target list by employer type, a CV conversion, interview preparation and a list of local policies to verify. Distinct from cn-campus-recruitment, which is for students at Chinese universities."
---

# 海归求职

Returning graduates lose months to timing. Chinese campus recruitment runs on its own calendar, a one-year master's graduate can miss the main season while still abroad, and employers and cities define "fresh graduate" differently. This skill sets the timeline from the graduation date, clears the paperwork, and converts an overseas profile into one a Chinese recruiter can read. Policies on status, certification and settlement are local and change; each is marked for confirmation.

Write in Simplified Chinese.

## What This Skill Produces

- A timeline: which recruitment seasons the person can enter and when to apply
- A status and paperwork checklist: graduate status, degree certification, documents
- A target list by employer type with the fit and the catch for each
- A converted CV in Chinese with the overseas experience explained
- Interview preparation: online tests, group interviews, remote interviews across time zones
- A list of settlement and talent policies to check in target cities

## Required Inputs

Ask for these if not provided:

- Country, university, degree, subject, start and graduation dates
- Undergraduate background and any work experience in China or abroad
- Target cities, industries and roles
- Internships, and whether any were in China
- Chinese and English working level, and other languages
- Constraints: when the person can return, whether remote interviews are needed
- Priorities: salary, stability, settlement (户口), career track

## Framework

1. **The calendar.** Autumn recruitment (秋招) runs from late summer to late autumn for the following year's graduates and carries most graduate openings. Spring recruitment (春招) follows after the new year with fewer places. Early batches and internship-to-offer programmes open before the autumn season. Map the person's graduation date onto these.
2. **Graduate status.** Employers set their own definition of 应届生 for returnees, often by a window around the graduation date. State-owned enterprises, public institutions and civil service posts apply stricter rules. Check each employer's notice.
3. **Degree certification.** Overseas degrees are certified by the education ministry's service centre for overseas study. Many employers and all settlement applications require it. Apply as soon as the certificate is issued; before that, prepare the enrolment proof and expected graduation letter.
4. **Where returnees are competitive.** Foreign companies and their China operations, companies going overseas (出海), internet and technology firms with global products, finance, consulting, research roles, and international business in state-owned groups. Where they are not: roles that reward local internships and networks the person does not have.
5. **Fix the gaps.** One internship in China, even remote or short, changes screening results. So does a clear statement of why the person is returning.
6. **CV conversion.** One page for graduates. Chinese format: education first with degree level explained (for example a one-year taught master's), ranking context stated factually, courses relevant to the role, internships with results, skills and certificates. Translate course and employer names, keep originals in brackets.
7. **Process.** Online application, online assessment (行测-style reasoning, personality, coding for technical roles), group interview (群面), professional and manager interviews, offer and the tripartite or employment agreement. Prepare for interviews at night in the person's time zone.
8. **Settlement and talent policies.** Several cities run settlement routes, subsidies or housing support for returnees, with conditions on university ranking, degree, time since graduation and social insurance. Verify on the city's human resources bureau site.
9. **Expectations.** Salary offers reflect the local graduate market, not the cost of the degree. Compare offers on role, growth and city.

## Output Format

### 海归求职计划：[姓名]，[毕业时间]

**时间线**
| 时间 | 招聘批次 | 你能否参加 | 该做什么 |
|---|---|---|---|

**身份与手续**
| 事项 | 要求 | 状态 | 何时办 |
|---|---|---|---|
| 应届生身份（按目标企业） | | | |
| 学历学位认证 | | | |
| 成绩单、在读证明、预毕业证明 | | | |

**目标雇主**
| 类型 | 匹配点 | 难点 | 行动 |
|---|---|---|---|

**简历转换**
> [中文简历草稿，一页]

**面试准备**：[在线测评、群面、专业面、跨时区安排]

**城市政策待核实**
| 城市 | 政策类型 | 查询渠道 |
|---|---|---|

**Assumptions and gaps**
- [假设的身份界定或时间]
- [最需要补的一段经历]

## Quality Checks

- [ ] The timeline is tied to the actual graduation date
- [ ] Graduate status is treated as employer-specific and marked for checking
- [ ] Degree certification appears with timing
- [ ] The CV explains the overseas degree in terms a local recruiter understands
- [ ] Each employer type lists both fit and difficulty
- [ ] Settlement policies are listed for verification, not asserted

## Anti-Patterns

- **Do not assume the overseas degree speaks for itself.**
- **Do not tell the user they count as a fresh graduate everywhere.**
- **Do not state a city's settlement rule as fact.**
- **Do not wait until after returning to start applying.**
- **Do not inflate the CV.** Background checks and certification will expose it.

## Example Trigger Phrases

- "我明年 9 月英国硕士毕业，秋招应该什么时候开始投？"
- "留学生回国算应届生吗？想进国企。"
- "帮我把英文简历改成国内互联网公司能看懂的中文简历。"
- "没有国内实习，回国找工作怎么补救？"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-returnee-job-search.html

<!-- pm-claude-skills v84.0.0 | skill: cn-returnee-job-search | source: skills/cn-returnee-job-search/SKILL.md | sha256: 69e5a2486b72913d46f7fba58498db9742d1af2c314ed59375e25b86f669fcfa | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
