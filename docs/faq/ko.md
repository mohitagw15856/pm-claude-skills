# 자주 묻는 질문

[English](README.md) · [简体中文](zh-CN.md) · [繁體中文](zh-TW.md) · [日本語](ja.md) · 한국어 · [Español](es.md) · [Português](pt-BR.md)

## 스킬이 무엇이고, 모델에게 그냥 묻는 것과 무엇이 다른가요

스킬은 `SKILL.md`라는 일반 마크다운 파일로, AI 어시스턴트에게 하나의 전문 업무를 시니어 전문가 수준으로 수행하는 방법을 가르칩니다. 모델에게 바로 물으면 기억에서 꺼낸 답이 나오고 구조와 깊이가 매번 달라집니다. 스킬을 불러오면 모델은 적힌 절차를 따릅니다. 빠진 입력을 묻고, 정해진 구조로 결과를 내고, 체크리스트로 스스로 검토합니다. 숫자에는 계산 과정이 붙습니다. 스킬은 모델을 대신하지 않습니다. 모델에게 방법을 줍니다.

## 무료인가요? 회사에서 써도 되나요

네. 라이브러리는 MIT 라이선스입니다. 상업적으로 쓰고, 수정하고, 회사 내부 도구에 넣을 수 있습니다. 비용은 여러분이 쓰는 모델 제공자의 토큰 요금뿐입니다.

## 데이터가 어디로 전송되나요

아니요. 설치 후 스킬은 여러분 컴퓨터의 마크다운 파일입니다. 런타임도 계정도 없고, 텔레메트리는 기본적으로 꺼져 있습니다. 대화는 여러분이 고른 AI 도구와 모델에만, 각자의 개인정보 정책에 따라 전송됩니다. 온라인 플레이그라운드에서 API 키는 브라우저에만 남고 요청은 제공자에게 직접 갑니다. 명령줄 `run` 하위 명령에는 선택적 사용 카운터가 있는데, `PM_SKILLS_TELEMETRY=1`을 설정한 경우에만 스킬 이름만 보냅니다.

## 어떤 도구에서 쓸 수 있나요

Claude Code, Claude Desktop과 Cowork, Claude.ai, Cursor, Codex, Windsurf, Cline, Zed, Gemini CLI 등 마크다운 규칙을 읽거나 MCP를 지원하는 모든 도구입니다. `npx pm-claude-skills add --agent <도구>`가 각 도구가 기대하는 위치에 파일을 씁니다. 스킬은 설명을 기준으로 발동하므로 매 대화에 전부 로드되지 않습니다.

## 어떻게 설치하나요

- **모든 도구:** `npx pm-claude-skills add`를 실행하고 안내를 따릅니다.
- **Claude Code:** `/plugin`을 열고 공식 디렉터리에서 pm-skills를 검색해 원하는 번들을 설치합니다.
- **Python:** `pip install pm-skills`
- **MCP:** MCP 설정에 `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp`를 추가합니다.
- **설치 없이:** [플레이그라운드](https://mohitagw15856.github.io/pm-claude-skills/)에서 브라우저로 어떤 스킬이든 실행할 수 있습니다.

## 코드를 못 써도 쓸 수 있나요

네. [플레이그라운드](https://mohitagw15856.github.io/pm-claude-skills/)를 열고 스킬을 고른 뒤 필요한 것을 평범한 말로 적으세요. Claude.ai 사용자는 Add-to-Claude 버튼으로 스킬을 ZIP으로 올릴 수 있습니다. Claude Desktop처럼 MCP를 지원하는 데스크톱 앱은 터미널 없이 설정 화면에서 MCP 서버를 추가할 수 있습니다.

## 스킬이 발동하지 않아요

명확하게 말하세요. "이거 도와줘" 대신 스킬 설명에 있는 식으로 "…에 대한 PRD를 써 줘"라고 요청합니다. `npx pm-claude-skills doctor`로 설치 여부를 확인하세요. 그래도 안 되면 사용한 문장을 그대로 적어 [버그를 신고](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml)해 주세요.

## 어떻게 업데이트하나요

설치 명령을 다시 실행하면 됩니다. `npx pm-claude-skills doctor`가 설치된 것과 오래된 것을 보여줍니다. Claude Code에서는 `/plugin`을 열어 pm-claude-skills 마켓플레이스를 업데이트합니다. Python은 `pip install -U pm-skills`입니다. 저장소를 포크했다면 함께 제공되는 `sync-fork.yml` 워크플로가 매주 `main`을 업스트림에 맞춥니다. [fork-sync.md](../fork-sync.md)를 보세요.

## 법률, 세무, 인사 답변을 믿어도 되나요

조언이 아니라 준비 자료로 보세요. 이 스킬들은 계산 과정을 보여주고, 확인해야 할 수치를 나열하고, 상담해야 할 기관(노동위원회, 세무서, 변호사 등)을 알려줍니다. 규정은 지역마다 다르고 자주 바뀝니다. 규제 관련 스킬의 공식 출처는 매주 변경을 감시하지만, 최신 현지 규정이 항상 우선입니다.

## 회사 안에서 자체 스킬과 함께 쓸 수 있나요

네. Org Edition은 컨테이너로 동작합니다. `docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills`를 실행하고 비공개 스킬을 공개 스킬 옆에 마운트하세요. 비공개 스킬은 별도 폴더나 저장소에 두면 이 라이브러리 사본을 언제든 업데이트할 수 있습니다.

## 스킬 요청, 버그 신고, 기여는 어떻게 하나요

이슈 폼을 사용하세요. [스킬 요청](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.yml), [버그 신고](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml), [질문](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=question-feedback.yml). 스킬을 추가하려면 [CONTRIBUTING.md](../../CONTRIBUTING.md)를 읽고 풀 리퀘스트를 열어 주세요. 👍가 가장 많은 요청부터 만듭니다.
