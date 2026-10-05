# PM Skills: 1,285개의 전문 Agent Skills, 한국어로 물어보면 됩니다

<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.zh-TW.md">繁體中文</a> · <b>한국어</b> · <a href="SKILLS.md">전체 스킬</a> · <a href="CHANGELOG.md">변경 내역</a>
</p>

<p align="center">
  <a href="https://github.com/mohitagw15856/pm-claude-skills/stargazers"><img src="https://img.shields.io/github/stars/mohitagw15856/pm-claude-skills?style=social" alt="GitHub Stars"></a>
  <a href="https://www.npmjs.com/package/pm-claude-skills"><img src="https://img.shields.io/npm/v/pm-claude-skills?logo=npm&color=cb3837" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/라이선스-MIT-lightgrey" alt="MIT"></a>
</p>

> **연말정산 서류는 쌓여 있고, 퇴직금은 얼마인지 모르겠고, 자소서 마감은 내일입니다.**
> 일반 AI는 자신감 넘치는 인턴과 같습니다. **PM Skills**는 선배의 업무 노트입니다. 1,285개, 각각 마크다운 파일 하나입니다. (PM은 Product Manager가 아니라 Professional, 즉 모든 직업의 전문가를 뜻합니다.)

## 작동 방식

AI 어시스턴트에게 평소처럼 말하면 맞는 스킬 하나가 로드되고, 조언이 아니라 완성된 결과물을 돌려줍니다. 예를 들어 "3년 2개월 다니고 퇴사해요. 퇴직금 얼마예요?"라고 물으면 [`kr-severance-pay`](skills/kr-severance-pay/SKILL.md)가 평균임금과 계속근로기간으로 단계별로 계산하고, 퇴직연금 유형에 따라 무엇이 달라지는지 알려 줍니다.

MIT 라이선스, 영구 무료. 런타임도, 원격 수집도, 계정도 없습니다.

## 한국에서 일하는 분을 위한 스킬 팩: pm-korea

| 스킬 | 하는 일 | 이렇게 물어보세요 |
|---|---|---|
| [`kr-year-end-tax-settlement`](skills/kr-year-end-tax-settlement/SKILL.md) 연말정산 | 일정, 내 상황에 맞는 공제와 증빙, 홈택스 간소화 자료 제출, 회사에서 정산하지 못해 5월 종합소득세 신고나 경정청구로 가야 하는 항목 | "맞벌이 부부인데 아이 공제랑 카드 공제 누가 받는 게 유리한가요?" |
| [`kr-severance-pay`](skills/kr-severance-pay/SKILL.md) 퇴직금 | 지급 대상 확인, 내 숫자로 하는 단계별 퇴직금 계산, DB형과 DC형 퇴직연금의 차이, 지급 기한과 IRP, 퇴직소득세 | "회사가 DC형 퇴직연금이래요. 퇴직금 계산이 다른가요?" |
| [`kr-cover-letter`](skills/kr-cover-letter/SKILL.md) 자기소개서 | 항목별 자기소개서: 글자 수 안에서 소제목, 두괄식 첫 문장, 상황·행동·결과로 쓴 구체적 경험, 직무와의 연결 | "삼성전자 DX부문 신입 자기소개서 지원동기 700자로 써 주세요." |
| [`kr-work-report`](skills/kr-work-report/SKILL.md) 보고서·주간보고 | 개조식·두괄식 보고서와 주간보고: 한 줄 결론, 현황, 문제점, 대안 비교, 건의사항, 금주 실적과 차주 계획 | "이번 주 주간보고 개조식으로 정리해 주세요." |

세금, 노동, 퇴직연금에 관한 내용은 모두 확인이 필요한 정보로 표시되며 법률·세무 자문이 아닙니다. 국세청, 고용노동부 또는 전문가에게 최신 기준을 확인하세요.

## 설치

```bash
# Claude Code
npx pm-claude-skills add --agent claude --bundle pm-korea

# Cursor, Codex, Windsurf 등 다른 도구
npx pm-claude-skills add --agent cursor --bundle pm-korea
```

Claude Code에서는 `/plugin`을 입력하고 **pm-skills**를 검색해 설치할 수도 있습니다. 설치하면 텍스트 파일만 복사되고, 삭제하면 그 파일만 지워집니다.

## 그 밖의 스킬

PM Skills에는 기획, 개발, 데이터, 디자인, 마케팅, 영업, 인사, 법무, 재무 등 35개 직업에 걸친 1,000개가 넘는 범용 스킬이 있습니다. 한국어로 물어봐도 영어 스킬이 잘 작동하며, 결과는 한국어로 받을 수 있습니다. 전체 목록은 [SKILLS.md](SKILLS.md)에 있습니다.

- 일본에서 일한다면: [pm-japan](plugins/pm-japan/) (年末調整, 確定申告, 退職の手続き, 稟議書)
- 브라우저에서 바로 써 보기: [Playground](https://mohitagw15856.github.io/pm-claude-skills/)
- 하고 싶은 일로 스킬 찾기: [find](https://mohitagw15856.github.io/pm-claude-skills/find.html)

## 참여하기

- 한국 실정에 맞지 않는 스킬이 있나요? 한국어로 [Issue](https://github.com/mohitagw15856/pm-claude-skills/issues)를 열어 주세요
- 스킬을 한국어로 번역하고 싶다면 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요

프로젝트 주소: https://github.com/mohitagw15856/pm-claude-skills

## 라이선스

MIT. 자유롭게 쓰고, 고치고, 업무에 활용하세요.
