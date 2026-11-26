# 常見問題

[English](README.md) · [简体中文](zh-CN.md) · 繁體中文 · [日本語](ja.md) · [한국어](ko.md) · [Español](es.md) · [Português](pt-BR.md)

## 技能是什麼？跟直接問模型有什麼不同？

技能是一個純 Markdown 檔案 `SKILL.md`，教 AI 助手以資深專業人士的標準完成一項具體工作。直接問，模型憑印象回答，每次的結構和深度都不一樣。載入技能後，模型照著一份寫好的流程做：先問清楚缺的資料，再按固定結構產出，最後用清單自我檢查。數字會列出計算過程。技能不取代模型，它給模型一套方法。

## 要付費嗎？可以在公司用嗎？

不用。MIT 授權，可以商用、修改、放進公司內部工具。唯一的費用是你自己呼叫模型的費用，由模型服務商收取。

## 資料會上傳嗎？

不會。安裝後技能就是你電腦上的 Markdown 檔案，沒有執行環境、不需要帳號、預設沒有遙測。你的對話只會送到你自己選擇的 AI 工具和模型。線上試用的 API Key 只存在你的瀏覽器裡，請求直接送到模型服務商。命令列的 `run` 子指令有一個選用的使用統計，只送技能名稱，而且只有設定 `PM_SKILLS_TELEMETRY=1` 才會送出。

## 支援哪些工具？

Claude Code、Claude Desktop 和 Cowork、Claude.ai、Cursor、Codex、Windsurf、Cline、Zed、Gemini CLI，以及任何能讀 Markdown 規則或支援 MCP 的工具。`npx pm-claude-skills add --agent <工具>` 會把檔案寫到各工具要求的位置。技能按描述觸發，不會每次對話都全部載入。

## 怎麼安裝？

- **任何工具：**`npx pm-claude-skills add`，按提示操作。
- **Claude Code：**開啟 `/plugin`，在官方目錄搜尋 pm-skills，安裝需要的技能包。
- **Python：**`pip install pm-skills`。
- **MCP：**在 MCP 設定裡加 `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp`。
- **不想安裝：**[線上試用](https://mohitagw15856.github.io/pm-claude-skills/) 直接在瀏覽器裡執行任何技能。

## 不會寫程式，可以用嗎？

可以。開啟[線上試用](https://mohitagw15856.github.io/pm-claude-skills/)，選一個技能，用自己的話說你要做什麼。Claude.ai 使用者可以用 Add-to-Claude 按鈕把技能以 ZIP 上傳。支援 MCP 的桌面應用程式（例如 Claude Desktop）可以在設定畫面加入 MCP 伺服器，不需要終端機。

## 技能不觸發怎麼辦？

說得更明確：按技能描述的說法提需求，例如「幫我寫一份 PRD」而不是「幫我看看這個」。用 `npx pm-claude-skills doctor` 確認已安裝。還是不行，就[回報 Bug](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml)，附上你用的原句。

## 怎麼更新？

再執行一次安裝指令即可。`npx pm-claude-skills doctor` 會列出已安裝和已過時的技能。Claude Code 裡開啟 `/plugin` 更新 pm-claude-skills 市集。Python 用 `pip install -U pm-skills`。自己 Fork 的，倉庫自帶的 `sync-fork.yml` 工作流程每週把 `main` 快轉到上游，見 [fork-sync.md](../fork-sync.md)。

## 法律、稅務、強積金這類答案可靠嗎？

把它當準備材料，不是專業意見。技能會把計算過程和依據寫出來，標出需要你核實的數字，並說明應該諮詢的機構（積金局、稅務局、律師）。法例會改，請以官方最新公告為準。

## 可以在公司內部用、加自己的私有技能嗎？

可以。企業版是一個容器：`docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills`，把私有技能目錄掛載進去即可。私有技能放在單獨的目錄或倉庫，公共技能庫就能隨時更新。

## 香港用粵語問可以嗎？

可以。例如 `hk-mpf-explainer` 本身就認得「強積金點計」「幾時可以攞」這類說法，回答會用繁體中文。

## 怎麼提需求、回報問題、參與貢獻？

用 Issue 表單：[技能需求](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.yml)、[Bug 回報](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml)、[提問](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=question-feedback.yml)。想加技能，看 [CONTRIBUTING.md](../../CONTRIBUTING.md) 然後開 PR。👍 最多的需求優先做。
