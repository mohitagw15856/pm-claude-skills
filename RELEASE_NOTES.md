# v81.1.0: launch kit, 3D explorer, tech tree, and more for China

**1,235 skills across 142 bundles** (from 1,212 across 139 in v81.0.0).

This release adds two bundles and a new way to see the library. **pm-oss-launch** takes a side project from "works on my machine" to a repo strangers install, trust and contribute to: a README written as benefits, a no-signup demo, an importer that never drops records, good first issues, a licence audit with a NOTICE file, fortnightly releases, one-command self-hosting, a read-only MCP server and the 20-second demo clip. **pm-3d-explorer** turns a topic into an interactive 3D page with clickable labelled parts, an exploded view and a quiz, with every label tied to a named source. The **tech tree** draws all 1,235 skills as a strategy-game research tree, with the community's most-voted requests in research. It also ships the Chinese work merged since v81.0.0: an exams and early-career pack, Feishu, DingTalk and WeCom formats, and the playground and a skill router on ModelScope.

## New skills

| Skill | Bundle | What it does |
|---|---|---|
| readme-benefit-writer | pm-oss-launch | Rewrites a README so every feature reads as a user benefit, with a Your data section |
| demo-data-generator | pm-oss-launch | Seeded, internally consistent fake data for a no-signup demo, with a no-real-data checklist |
| importer-scaffolder | pm-oss-launch | Field mapping, importer skeleton and fixtures from a competitor's export; nothing is silently dropped |
| first-issue-designer | pm-oss-launch | 8 to 12 good first issues with context, acceptance criteria, files to touch and effort |
| licence-notice-auditor | pm-oss-launch | Licence inventory for code, data and media, conflict flags and a NOTICE.md draft (not legal advice) |
| fortnightly-release-planner | pm-oss-launch | Small themed two-week releases, ROADMAP.md and a changelog template |
| self-host-packager | pm-oss-launch | docker-compose.yml, an explained .env.example and SELF_HOSTING.md with HTTPS, backups and upgrades |
| readonly-mcp-wrapper | pm-oss-launch | A read-only stdio MCP server over a folder of Markdown or JSON files, with a safety statement |
| demo-clip-storyboard | pm-oss-launch | The 20-second demo video: hook, timed shot list, on-screen text and post copy for X and LinkedIn |
| explorer-interface-brief | pm-3d-explorer | UI design brief and an image-model prompt for the explorer mock |
| model-prompt-pack | pm-3d-explorer | One image-to-3D prompt per part and a parts list where every label names a trusted source |
| explorer-viewer-builder | pm-3d-explorer | A single-file Three.js viewer with orbit controls, labelled parts, exploded view and quiz mode |
| explorer-pipeline | pm-3d-explorer | Runs the three explorer skills in order with a build checklist |
| cn-civil-exam-essay | pm-china-exams | Practise and mark the civil service essay paper (申论) against the materials' scoring points |
| cn-civil-exam-interview | pm-china-exams | Structured interview practice (结构化面试) with timed mock rounds and scored feedback |
| cn-kaoyan-planner | pm-china-exams | Postgraduate entrance exam planning (考研): targets, phased study plan, 复试 and 调剂 |
| cn-campus-recruitment | pm-china-exams | Campus recruitment (校招): timeline, campus CV, interviews and the 三方协议 |
| cn-soe-interview | pm-china-exams | State-owned enterprise recruitment (国企面试): written test, interview and offer comparison |
| feishu-doc-writer | pm-china-work | Documents shaped for Feishu / Lark: summary callout, outline headings, owner-and-date tasks |
| dingtalk-work-log | pm-china-work | DingTalk daily, weekly and monthly logs (钉钉日志), field by field |
| wecom-announcement | pm-china-work | Internal announcements for WeCom (企业微信公告) with group-chat and pinned versions |
| cn-prd-review | pm-china-work | Prepare and run a PRD review (需求评审) to a written conclusion |
| cn-level-mapper | pm-china-work | Compare job levels (职级对标) across companies to judge an offer |

## Install

```bash
# Claude Code plugin marketplace
/plugin marketplace add mohitagw15856/pm-claude-skills
/plugin install pm-oss-launch@pm-claude-skills
/plugin install pm-3d-explorer@pm-claude-skills
/plugin install pm-china-exams@pm-claude-skills

# Any supported tool, through the CLI
npx pm-claude-skills add --agent claude --bundle pm-oss-launch,pm-3d-explorer

# From mainland China, through the npm mirror
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --bundle pm-china-exams,pm-china-work
```

Tech tree: <https://mohitagw15856.github.io/pm-claude-skills/tech-tree/>

**Full changelog:** v81.0.0 to v81.1.0
