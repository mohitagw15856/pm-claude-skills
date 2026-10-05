# v82.0.0: China for everyone, Korea and Southeast Asia, lite skills, teams

**1,285 skills across 152 bundles** (from 1,250 across 144 in v81.2.0).

This release takes the library well beyond office workers. In China it now serves teachers, parents, foreign-trade staff, factory engineers and people looking after ageing parents. New packs cover Korea, Japan, Singapore and Malaysia, with 28 skills each in Vietnamese and Indonesian. The README was rebuilt so a library this size does not overwhelm: pick a path, take a four-question quiz, or follow a chart to the five skills you will use. Under the hood come lite skills for small local models, calculators with tests, a prompt-injection suite, offline use, Word and WPS add-ins, and a way for a team to keep every laptop on the same skills.

## New skills

| Bundle | Skills |
|---|---|
| **pm-china-teachers** (教师) | cn-lesson-plan (新课标教案), cn-class-meeting (主题班会), cn-parent-meeting (家长会), cn-term-comments (期末评语), cn-open-class (公开课与说课稿) |
| **pm-china-parents** (家长) | cn-school-entry (幼升小 / 小升初), cn-home-school-comms (家校沟通), cn-extracurricular-plan (课外安排), cn-homework-helper-parent (辅导作业) |
| **pm-china-trade** (外贸) | cn-inquiry-reply (询盘回复), cn-letter-of-credit-check (信用证审单), cn-trade-quotation (报价单), cn-customs-docs (报关单证) |
| **pm-china-manufacturing** (制造业) | cn-8d-report (8D 报告), cn-5s-audit (5S 检查), cn-quality-traceability (质量追溯), cn-sop-writer (作业指导书) |
| **pm-china-yearend** (述职季) | cn-shuzhi-deck (述职 PPT), cn-year-end-bonus (年终奖与个税), cn-next-year-plan (OKR 与个人发展计划), with cn-year-end-review |
| pm-china-work | cn-jargon-translator (互联网黑话翻译器) |
| pm-china-life | cn-help-parents-admin (帮爸妈办事), plus a 长辈版 output in the medical and social insurance skills |
| pm-hk-tw | hk-cantonese-copy (粵語文案) |
| **pm-korea** | kr-year-end-tax-settlement (연말정산), kr-severance-pay (퇴직금), kr-cover-letter (자기소개서), kr-work-report (보고서, 주간보고) |
| **pm-japan** | jp-year-end-adjustment (年末調整), jp-tax-return (確定申告), jp-resignation-procedures (退職の手続き), jp-ringisho (稟議書) |
| **pm-sea** | singapore-cpf-explainer, malaysia-epf-explainer (KWSP), singapore-employment-act, huawen-business-writing (新马华文商务写作) |

Tax, labour and legal skills mark every rule to confirm and say they are not advice.

## A README that does not overwhelm

A TL;DR box, "1,285 skills, you need 5", six Pick your path cards, a "What do you want to do today?" chart, a four-question quiz, a quest log, and images that refresh daily: skill of the day, live stats, exam countdowns and a 二十四节气 and festival banner. Before-and-after animations, search demos and a tech-tree tour. READMEs in 简体中文, 繁體中文 and 한국어.

## For Chinese users

- Pinyin search (`zb` finds 周报), Chinese landing pages, and the skill finder now understands Chinese.
- Free models in the playground through ModelScope and Hugging Face.
- An intranet offline pack with guides for 统信 UOS and 银河麒麟, a local-model guide (数据不出域), and Feishu, DingTalk, WeCom and Discord bots.
- Word and WPS add-ins, trackers for 飞书多维表格, Notion and Obsidian, Xiaohongshu share cards, 拜年, 调休 and 述职 tools, and Chinese workflow chains.

## Quality and trust

- **Lite skills:** `npx pm-claude-skills add --lite` installs condensed skills for small local models, about 20% smaller, keeping every input, check and disclaimer.
- **Tested calculators:** the year-end bonus tax, Chinese, Korean and Taiwan severance, and Hong Kong MPF are pinned by worked-value tests.
- **Injection defences:** a prompt-injection suite of 15 hostile documents, and the skills that read pasted documents now treat them as data.
- **Rules checked:** dates on 181 rule-based skills, which turn amber after a year.
- **Release integrity:** a reproducible release bundle with a signed SBOM, checked by `verify --release`.

## For teams

- `npx pm-claude-skills profile` saves your role, city and language once, on your computer only, and skills personalise from it.
- A committed `.pm-skills.json` plus `npx pm-claude-skills sync` keeps every laptop on the same skills; `sync --check` fails when one drifts.
- Jupyter cookbooks, a jsDelivr route (`install --cdn`), an offline playground, and contributor credits.

## Install

```bash
# Claude Code plugin marketplace
/plugin marketplace add mohitagw15856/pm-claude-skills
/plugin install pm-china-teachers@pm-claude-skills

# Any supported tool, through the CLI
npx pm-claude-skills add --agent claude --bundle pm-korea,pm-sea

# From mainland China, through the npm mirror
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --bundle pm-china-teachers,pm-china-parents
```

Library: <https://github.com/mohitagw15856/pm-claude-skills>

**Full changelog:** v81.2.0 to v82.0.0 (#313 to #330)
