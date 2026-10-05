---
name: kr-cover-letter
description: "Use when asked 자기소개서 써 줘, 자소서 첨삭해 줘, 지원동기 어떻게 써, 입사 후 포부 항목, 대기업 공채 자소서, 공기업 NCS 자기소개서, or write a Korean self-introduction essay for a job application. Produces a 항목별 자기소개서 for a Korean employer: one answer per question within the character limit (공백 포함 or 제외 as specified), each with a 소제목, a 두괄식 opening and a concrete experience told as situation, action and result, tied to the job and company, plus a character count and the interview questions each answer invites."
version: 1.0.0
---

# Korean Job Application Essay (자기소개서)

Korean employers rarely ask for a free-form cover letter. They ask for a 자기소개서 with fixed questions (항목), each with a strict character limit: 지원동기, 성장과정, 성격의 장단점, 직무역량, 입사 후 포부, or a company's own prompts. Reviewers read hundreds; an answer that opens with a family story or repeats the company's slogan is skipped. This skill writes each answer so the point comes first and the evidence is specific, in the length the form allows.

Write in Korean (합니다체) unless the person asks for an English or Chinese draft alongside. Use only experience the person provides; never invent projects, numbers or awards. For 블라인드 채용 (most 공공기관 and many companies), remove school names, hometown, family background and anything else the posting forbids.

## Required Inputs

Ask for these if not provided:
- **Company and role**: company, 직무, 신입 or 경력, the job posting or 직무기술서 (NCS for 공기업)
- **The 항목**: each question exactly as written, and its character limit (공백 포함 or 공백 제외)
- **Experience**: projects, internships, part-time jobs, clubs, competitions, with what the person did and the result, numbers where they exist
- **Why this company**: what the person actually knows or likes about it (products, recent news, values)
- **Existing draft**, if the person wants 첨삭 rather than a new answer
- **Blind hiring rules** in the posting, if any

## Output Structure

### 1. Answer plan
| 항목 | Character limit | Core message | Experience used |
One distinct experience per answer where possible, so the set does not repeat itself.

### 2. The answers
For each 항목: a [소제목] in brackets that states the point; a first sentence that answers the question directly (두괄식); one experience told as 상황, 행동, 결과 with the person's own actions and numbers; one or two sentences tying it to the role or company. Character count shown under each answer (공백 포함 / 공백 제외), within the limit and ideally above 90 percent of it.

### 3. Company and role fit check
Where each answer connects to the posting's 우대사항 or 직무 requirements, and where the 지원동기 shows knowledge of this company rather than the industry in general.

### 4. Interview follow-ups
| Answer | Likely 면접 question | What to prepare |
Interviewers ask about what is written; every claim should survive a "구체적으로 말해 보세요".

## Quality Checks

- [ ] Every answer fits its character limit, counted the way the form counts
- [ ] Each answer opens with the point, not background
- [ ] Experiences are the person's own, with no invented facts or numbers
- [ ] 지원동기 and 입사 후 포부 name something specific to this company and role
- [ ] Blind-hiring rules are respected where they apply
- [ ] No two answers rely on the same story unless the person chose that

## Anti-Patterns

- **"저는 화목한 가정에서 태어나...".** 성장과정 is about what shaped how you work, not family background.
- **Copying the company's 인재상 back at them.** Show it through an experience instead.
- **Vague adjectives.** "열정적인" says nothing; the result and the number do.
- **Writing to 60 percent of the limit.** A short answer reads as low effort when others use the space.
- **Reusing one 자소서 for every company.** The 지원동기 gives it away.

## Example Trigger Phrases

- "삼성전자 DX부문 신입 자기소개서 지원동기 700자로 써 주세요. 공백 포함이에요."
- "제 자소서 첨삭해 주세요. 직무역량 항목이 너무 평범한 것 같아요."
- "공기업 NCS 자기소개서인데 블라인드 채용이라 학교 이름을 빼야 해요."
- "Help me write a Korean 자기소개서 for a marketing role at a Korean startup."
