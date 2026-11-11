# v84.0.0: Regions and new models

**1,374 skills across 167 bundles** (from 1,310 across 153 in v83.2.0).

This release takes the library to more places and more kinds of work, gives Chinese users ways in that need no terminal, and moves the code to the current Claude models.

## New bundles

| Bundle | Skills |
|---|---|
| **pm-mena** (Gulf) | uae-gratuity-calculator, gulf-residence-visa-admin, ksa-labour-contract-decoder, gulf-job-offer-check |
| **pm-latam** (Brazil, Mexico) | br-rescisao-clt, br-irpf-prep, mx-finiquito-liquidacion, mx-declaracion-anual-prep |
| **pm-dach** (Germany) | de-arbeitszeugnis-decoder, de-kuendigungsfrist-check, de-steuererklaerung-prep |
| **pm-africa** (Nigeria, Kenya, South Africa) | ng-payslip-decoder, ng-pension-rsa-guide, ke-payslip-decoder, ke-mpesa-reversal-dispute, za-retrenchment-package-check, za-uif-claim-guide |
| **pm-nursing** | nursing-shift-handover, nursing-care-plan, nursing-incident-report, nursing-family-update |
| **pm-agriculture** | crop-season-plan, farm-subsidy-application, farm-records-book, farm-buyer-contract-check |
| **pm-retail-shopfloor** | stock-take-plan, shrink-report, retail-shift-handover |
| **pm-sports-coaching** | coaching-season-plan, coaching-session-plan, sports-parent-comms, match-review |
| **pm-procurement** | contract-renewal-brief, with the existing RFP and supplier skills |
| **pm-phd** | phd-supervisor-update, thesis-chapter-plan, reviewer-rebuttal-letter, viva-prep-pack |
| **pm-china-ecommerce** (电商运营) | cn-ecommerce-listing, cn-1688-wholesale-listing, cn-double11-promotion-plan, cn-customer-service-scripts |
| **pm-china-startup** (创业) | cn-company-registration, cn-equity-split, cn-high-tech-enterprise-application, cn-zhuanjingtexin-application, cn-subsidy-filing, cn-financing-bp |
| **pm-china-study-abroad** (留学与海归) | cn-study-abroad-essay, cn-study-visa-prep, cn-returnee-job-search |

`pm-zh-content` gains bilibili-video-script, zhihu-answer, shipinhao-script and xiaoyuzhou-podcast-outline.

The regional skills show their working, mark each statutory figure for checking and say they are not legal or tax advice. They are rated high-stakes; none has yet been reviewed by a qualified professional.

## China tools

- A WeChat Mini Program skill finder that works offline (`integrations/wechat-miniprogram`).
- uTools and Quicker plugins.
- `npx pm-claude-skills add --agent qwen`, `--agent iflow` and `--agent kimi`.
- Write-back of a skill's output to 飞书文档, 语雀 and 钉钉文档 (`integrations/writeback-cn`).
- A weekly page of mainland usage from public counters.

## Languages

- Arabic for the four Gulf skills, ten skills in German and nine more in French, all machine-translated and awaiting native review.
- The side-by-side reader lays right-to-left languages out from the right.
- A second USSD menu for Nigeria, Kenya and South Africa.

## Current models

- **One registry.** `data/models.json` names the model for each role; code asks for a role. A check stops unlisted ids and new references to legacy models. See `docs/MODELS.md`.
- **Per-skill guidance.** `pm-claude-skills run <skill> --auto-model` starts each skill on the model and effort its risk tier and length justify. Derived, not measured.
- **Missions.** `pm-claude-skills mission run retention-quarter --input in.json` chains typed pipelines into one run with checkpoints and `--resume`. See `docs/MISSIONS.md`.
- **Prompt audit.** Every skill scanned for text written for older models; `docs/PROMPT-AUDIT.md` has the result.

## Also in this release

Everything merged since v83.2.0: typed contracts and pipelines, the lockfile and memory commands, an India pack, Copilot, Gemini CLI and OpenAI Agents exports, provenance footers, starters, an offline bundle, a setup wizard, a git hook, the Agent Arena, LTS skills and a course pack. The [changelog](CHANGELOG.md) has the full list.

## Fixed

- The mainland agent tool and chat bots could not load the skills index after #502.
- A pipeline stopped when an optional input was not supplied.
- SkillBench read an empty first block from models that think before answering.

## Not done

- 164 references in 77 files still name a legacy model; each needs one live call to verify.
- SkillBench has not been run on the current line-up; it costs API credit.
- The Mini Program, the Quicker script and the write-back script have not run against the real platforms.

## Upgrade

```bash
npx pm-claude-skills@latest update
```

The Python package now needs Python 3.10 or later.
