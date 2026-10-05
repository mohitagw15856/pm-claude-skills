---
name: kr-work-report
description: "Use when asked 보고서 써 줘, 주간보고 작성해 줘, 개조식으로 정리해 줘, 팀장님께 보고할 내용 정리, 1페이지 보고서, 업무 보고서 양식, or write a Korean business report or weekly report. Produces a Korean workplace report in 개조식 and 두괄식 style: a one-line conclusion, then 현황, 문제점, 대안 비교, 건의사항 and 향후 계획 for a 보고서, or 금주 실적, 차주 계획 and 이슈 및 협조 요청 for a 주간보고, with consistent noun-form endings, numbers and owners, plus a short verbal briefing version."
version: 1.0.0
---

# Korean Business Report (보고서 and 주간보고)

Korean workplaces have a recognisable reporting style. Managers expect 개조식 (short bullet lines ending in noun forms such as ~함, ~임, ~예정), 두괄식 (the conclusion or request first), and a fixed structure that fits on one page. A report written as flowing prose, or one that saves the ask for the end, gets sent back. This skill turns the person's notes into a report a 팀장 or 임원 can read in a minute and decide on.

Write in Korean business style unless the person asks for an English version alongside. Follow the company's own template where the person provides one. Use only the facts and numbers given; mark anything missing as to be filled.

## Required Inputs

Ask for these if not provided:
- **Report type**: a one-off 보고서 (검토, 결과, 계획, 이슈) or a recurring 주간보고 or 월간보고
- **Reader**: 팀장, 본부장, 임원, or a client, and what they need to decide or know
- **The content**: notes, figures, progress, problems, options considered
- **The ask**: approval, a decision between options, resources, or information only
- **Template or length**: company format, one page, slide or document

## Output Structure

### 1. Report
For a 보고서: 제목; 보고 요지 (one or two lines: the conclusion and the ask); 1. 추진 배경 및 목적; 2. 현황; 3. 문제점 또는 검토 내용; 4. 대안 비교 (table with cost, effect, risk); 5. 건의사항 (the recommended option and what is needed); 6. 향후 계획 (일정, 담당). For a 주간보고: 금주 실적 (with 진척률 or numbers), 차주 계획, 이슈 및 리스크, 협조 요청 사항. Every line in 개조식 with consistent endings, hierarchy marked with □, ○, - or the company's own symbols.

### 2. Numbers and owners check
| Item | Figure or date | Owner | Source |
Every plan line has a date and an owner; every claim of progress has a number or a deliverable.

### 3. Verbal briefing
A 30-second spoken version (구두 보고) in polite speech for reporting in person or on a call: conclusion, reason, ask.

## Quality Checks

- [ ] The conclusion and the ask appear in the first lines
- [ ] Endings are consistent 개조식 noun forms throughout
- [ ] Options are compared when a decision is requested
- [ ] Plans have dates and owners; progress has numbers
- [ ] It fits the requested length (usually one page)
- [ ] No figure is invented; gaps are marked to be filled

## Anti-Patterns

- **Prose paragraphs.** Korean managers scan; write lines, not essays.
- **The ask on the last line.** Put it in the 요지.
- **Mixed endings.** Switching between ~했습니다 and ~함 looks careless.
- **Activity without results.** "회의 진행" says nothing; say what was decided.
- **Hiding a problem in the weekly report.** Put risks under 이슈 with what is needed.

## Example Trigger Phrases

- "이번 주 주간보고 개조식으로 정리해 주세요. 메모 붙여 넣을게요."
- "신규 CRM 도입 검토 보고서 1페이지로 써 주세요. 팀장님 결재 받아야 해요."
- "본부장님께 프로젝트 지연 상황을 보고해야 하는데 두괄식으로 정리해 줘."
- "Write a Korean-style weekly report from these English notes for my manager in Seoul."
