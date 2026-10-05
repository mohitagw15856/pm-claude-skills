# Example: kr-work-report

## What this skill does

Turns notes into a Korean workplace report in 개조식 and 두괄식 style: a one-line conclusion and ask, then 현황, 문제점, 대안 and 향후 계획 for a 보고서, or 금주 실적, 차주 계획, 이슈 and 협조 요청 for a 주간보고, with a 30-second spoken version.

## How to trigger it

### Example 1: a weekly report with a risk

**You say:**
> "이번 주 주간보고 정리해 주세요. 메모: 결제 모듈 연동 80% 완료, 카드사 테스트 서버 장애로 이틀 지연, 다음 주 QA 시작 예정, 디자인팀에 영수증 화면 시안 요청 필요, 출시일 10월 20일 유지 가능할지 불확실."

**Claude produces (excerpt):**

**보고 요지**: 결제 모듈 연동 80% 완료, 카드사 테스트 서버 장애로 2일 지연. 10/20 출시 유지 위해 디자인팀 영수증 시안 협조 필요함.

□ 금주 실적
 ○ 결제 모듈 연동 80% 완료 (카드 승인, 취소 API 연동 완료)
 ○ 카드사 테스트 서버 장애로 일정 2일 지연 발생

□ 차주 계획
 ○ QA 착수 예정 (담당: [이름], 일정: [날짜])

□ 이슈 및 협조 요청
 ○ 영수증 화면 시안 필요 (요청 대상: 디자인팀, 필요 일자: [날짜])
 ○ 10/20 출시 일정 유지 여부 차주 수요일까지 판단 예정

## Tips for best results

- Paste raw notes; the skill sorts them into the structure.
- Say who reads it and what you need from them.
- Share the company template if there is one.

## Related skills

- `kr-cover-letter` for applications to Korean employers
- `cn-weekly-report` for Chinese 周报
