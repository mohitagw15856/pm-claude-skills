# v81.2.0: China compliance, Hong Kong and Taiwan, Dify and Chinese routing

**1,250 skills across 144 bundles** (from 1,235 across 142 in v81.1.0).

This release is the second wave of work for Chinese users. **pm-china-compliance** covers the four assessments Chinese teams are asked for most: the graded protection scheme (等保 2.0), cross-border data transfer (数据出境), the PIPL impact assessment and generative AI filing and labelling. **pm-hk-tw** brings Hong Kong's MPF and Taiwan's Labor Standards Act in Traditional Chinese. Nine more skills cover official documents, theses and citations, tech interviews, household registration points, the housing fund, medical insurance, small business tax and cross-border platforms. A Dify plugin and 12 import-ready Dify apps bring the library to China's most used agent platform, and all 75 Chinese translations are now on ModelScope Skills Central.

## New skills

| Skill | Bundle | What it does |
|---|---|---|
| cn-mlps-checklist | pm-china-compliance | Graded protection (等保 2.0): level, gap checklist and the filing and testing path |
| cn-data-export-assessment | pm-china-compliance | Cross-border data transfer (数据出境): which route applies and the self-assessment |
| cn-pipl-pia | pm-china-compliance | A PIPL personal information protection impact assessment with a risk register |
| cn-genai-filing | pm-china-compliance | Generative AI filing (大模型备案) and AI content labelling |
| hk-mpf-explainer | pm-hk-tw | Hong Kong's Mandatory Provident Fund (強積金), with worked calculations |
| tw-labour-standards | pm-hk-tw | Taiwan's Labor Standards Act (勞動基準法): overtime, leave, notice and severance |
| cn-official-document | pm-china-work | Official documents (公文) in the GB/T 9704 format |
| cn-thesis-proposal | pm-china-exams | A thesis proposal (开题报告) |
| cn-citation-gbt7714 | pm-china-exams | GB/T 7714 references, with a tested formatter |
| cn-tech-interview-drill | pm-china-exams | Tech interview practice for Chinese internet companies (八股, 手撕, 系统设计, 追问) |
| cn-hukou-points | pm-china-life | Household registration points (积分落户) |
| cn-housing-fund-withdrawal | pm-china-life | Housing fund withdrawal (公积金提取) |
| cn-medical-insurance-claim | pm-china-life | Medical insurance claims (医保报销) |
| cn-small-business-tax | pm-china-life | Tax for sole traders and small companies (个体户与小微企业) |
| crossborder-platform-playbook | pm-chuhai | Choosing and launching on cross-border e-commerce platforms |

## Also in this release

- **Dify**: a plugin that finds skills offline and loads them from Gitee, attached to this release as `pm_skills.difypkg`, and 12 import-ready Dify apps in `integrations/dify-templates/`.
- **MaxKB and FastGPT**: a skill tool that only needs Gitee. A guide for Coze, Yuanqi and ERNIE agents.
- **Chinese routing evaluation**: 200 real Chinese requests scored across three routers (`docs/ZH-ROUTING.md`).
- **ModelScope Skills Central**: all 75 Chinese translations, under @mohitagw15856.
- **Tech tree**: a Chinese interface and share posters with a QR code. **Playground**: voice input.
- **Gitee**: the mirror shows the Chinese README first and retries failed pushes.

## Install

```bash
# Claude Code plugin marketplace
/plugin marketplace add mohitagw15856/pm-claude-skills
/plugin install pm-china-compliance@pm-claude-skills
/plugin install pm-hk-tw@pm-claude-skills

# Any supported tool, through the CLI
npx pm-claude-skills add --agent claude --bundle pm-china-compliance,pm-hk-tw

# From mainland China, through the npm mirror
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --bundle pm-china-compliance,pm-china-life
```

Library: <https://github.com/mohitagw15856/pm-claude-skills>

**Full changelog:** v81.1.0 to v81.2.0
