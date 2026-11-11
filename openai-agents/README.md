# OpenAI Agents SDK — agent definition (agent.json)

> Auto-generated from `skills/*/SKILL.md` by `scripts/build-exports.mjs`.
> **Do not edit these files by hand** — edit the source skill and regenerate.

1386 skills exported. Copy a `agent.json` into the tool to use it.

```python
import json
from agents import Agent, Runner

spec = json.load(open("pm-essentials/prd-template/agent.json"))
prd = Agent(name=spec["name"], instructions=spec["instructions"], handoff_description=spec["handoff_description"])
print(Runner.run_sync(prd, "A referral programme for B2B users").final_output)
```

```ts
import { Agent, run } from "@openai/agents";
import spec from "./pm-essentials/prd-template/agent.json" with { type: "json" };

const prd = new Agent({ name: spec.name, instructions: spec.instructions, handoffDescription: spec.handoff_description });
console.log((await run(prd, "A referral programme for B2B users")).finalOutput);
```

Several specs can be handed to one triage agent as `handoffs`; the `handoff_description` is what it routes on.

Every file ends with a provenance block: library version, source path, the SHA-256 of the source
`SKILL.md` and the licence. The same hash is published at `https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json`,
so a copy can be checked against the library with `shasum -a 256` on the source file.

| Skill | Bundle | Path |
|---|---|---|
| 360-Degree Feedback Template | `pm-people` | `pm-people/360-feedback-template/agent.json` |
| 401k Plan Decoder | `pm-decoders` | `pm-decoders/401k-plan-decoder/agent.json` |
| A/B Test Planner | `pm-delivery` | `pm-delivery/ab-test-planner/agent.json` |
| A/B Test Readout | `pm-data` | `pm-data/ab-test-readout/agent.json` |
| Academic CV | `pm-cv` | `pm-cv/academic-cv/agent.json` |
| Accessibility Audit | `pm-design` | `pm-design/accessibility-audit/agent.json` |
| Accessible Travel Planner | `pm-accessibility` | `pm-accessibility/accessible-travel-planner/agent.json` |
| Accommodation Request | `pm-accessibility` | `pm-accessibility/accommodation-request/agent.json` |
| Account Plan | `pm-sales` | `pm-sales/account-plan/agent.json` |
| Account Recovery Plan | `pm-digital-safety` | `pm-digital-safety/account-recovery-plan/agent.json` |
| Acquirer Red Team | `pm-simulators` | `pm-simulators/acquirer-red-team/agent.json` |
| Action Runner | `pm-cross` | `pm-cross/action-runner/agent.json` |
| Ad Copy | `pm-copy` | `pm-copy/ad-copy/agent.json` |
| AEO Optimizer | `pm-writers` | `pm-writers/aeo-optimizer/agent.json` |
| After The Disaster | `pm-emergency` | `pm-emergency/after-the-disaster/agent.json` |
| Agenda Or Cancel | `pm-cowork` | `pm-cowork/agenda-or-cancel/agent.json` |
| Agent Design Review | `pm-ai` | `pm-ai/agent-design-review/agent.json` |
| Agent Era Pricing | `pm-agentnative` | `pm-agentnative/agent-era-pricing/agent.json` |
| Agent Hiring Panel | `pm-2027` | `pm-2027/agent-hiring-panel/agent.json` |
| Agent Incident Postmortem | `pm-agentops` | `pm-agentops/agent-incident-postmortem/agent.json` |
| Agent Kill Switch Plan | `pm-duet` | `pm-duet/agent-kill-switch-plan/agent.json` |
| Agent Negotiation Brief | `pm-agentnative` | `pm-agentnative/agent-negotiation-brief/agent.json` |
| Agent Observability Spec | `pm-agentops` | `pm-agentops/agent-observability-spec/agent.json` |
| Agent Project File | `pm-agentnative` | `pm-agentnative/agent-project-file/agent.json` |
| Agent Readiness Audit | `pm-agentnative` | `pm-agentnative/agent-readiness-audit/agent.json` |
| Agent Severance | `pm-2027` | `pm-2027/agent-severance/agent.json` |
| Agent Spec | `pm-ai` | `pm-ai/agent-spec/agent.json` |
| Agent Spending Mandate | `pm-agentnative` | `pm-agentnative/agent-spending-mandate/agent.json` |
| Aging-in-Place Assessment | `pm-caregiving` | `pm-caregiving/aging-in-place-assessment/agent.json` |
| Aging Parent Talks | `pm-aging-parents` | `pm-aging-parents/aging-parent-talks/agent.json` |
| AGM In A Box | `pm-committee` | `pm-committee/agm-in-a-box/agent.json` |
| AI-Agent Reliability | `pm-ai-native` | `pm-ai-native/ai-agent-reliability/agent.json` |
| AI-Assisted Performance Review | `pm-aiwork` | `pm-aiwork/ai-assisted-performance-review/agent.json` |
| AI Code Review | `pm-engineering` | `pm-engineering/ai-code-review/agent.json` |
| AI Content Audit | `pm-aiwork` | `pm-aiwork/ai-content-audit/agent.json` |
| AI-Context Primer | `pm-ai-native` | `pm-ai-native/ai-context-primer/agent.json` |
| AI Disclosure Policy | `pm-2027` | `pm-2027/ai-disclosure-policy/agent.json` |
| AI Ethics Review | `pm-advanced` | `pm-advanced/ai-ethics-review/agent.json` |
| AI Eval Plan | `pm-ai` | `pm-ai/ai-eval-plan/agent.json` |
| AI Feature PRD | `pm-ai` | `pm-ai/ai-feature-prd/agent.json` |
| AI-Output Verifier | `pm-ai-native` | `pm-ai-native/ai-output-verifier/agent.json` |
| AI Product Canvas | `pm-advanced` | `pm-advanced/ai-product-canvas/agent.json` |
| AI ROI Audit | `pm-aiwork` | `pm-aiwork/ai-roi-audit/agent.json` |
| AI-Tool Picker | `pm-ai-native` | `pm-ai-native/ai-tool-picker/agent.json` |
| AI Usage Policy | `pm-aiwork` | `pm-aiwork/ai-usage-policy/agent.json` |
| AI-Workflow Designer | `pm-ai-native` | `pm-ai-native/ai-workflow-designer/agent.json` |
| Air Quality | `pm-live` | `pm-live/air-quality/agent.json` |
| All Hands Deck | `pm-cowork` | `pm-cowork/all-hands-deck/agent.json` |
| Altitude Shifter | `pm-comms` | `pm-comms/altitude-shifter/agent.json` |
| Ambiguity Resolver | `pm-strategy` | `pm-strategy/ambiguity-resolver/agent.json` |
| Analyst Relations Brief | `pm-pmm` | `pm-pmm/analyst-relations-brief/agent.json` |
| Announcement Card | `pm-visuals` | `pm-visuals/announcement-card/agent.json` |
| Annual Report Tutor | `pm-investing-literacy` | `pm-investing-literacy/annual-report-tutor/agent.json` |
| API Docs Writer | `pm-engineering` | `pm-engineering/api-docs-writer/agent.json` |
| API For Yourself | `pm-2027` | `pm-2027/api-for-yourself/agent.json` |
| API Test Plan | `pm-qa` | `pm-qa/api-test-plan/agent.json` |
| API Versioning Strategy | `pm-engineering` | `pm-engineering/api-versioning-strategy/agent.json` |
| Apology Letter | `pm-crisis` | `pm-crisis/apology-letter/agent.json` |
| Appliance Buying Guide | `pm-lifeadmin` | `pm-lifeadmin/appliance-buying-guide/agent.json` |
| Application Tracker | `pm-cv` | `pm-cv/application-tracker/agent.json` |
| Apprentice First Week | `pm-trades` | `pm-trades/apprentice-first-week/agent.json` |
| Approval Policy Designer | `pm-duet` | `pm-duet/approval-policy-designer/agent.json` |
| Architectural Programme Brief | `pm-architecture` | `pm-architecture/architectural-programme-brief/agent.json` |
| Architectural Specification Section | `pm-architecture` | `pm-architecture/architectural-specification/agent.json` |
| Architecture Client Presentation | `pm-architecture` | `pm-architecture/architecture-client-presentation/agent.json` |
| Architecture Decision Record (ADR) | `pm-engineering` | `pm-engineering/architecture-decision-record/agent.json` |
| Architecture Diagram | `pm-visuals` | `pm-visuals/architecture-diagram/agent.json` |
| Archive Strategy | `pm-cowork` | `pm-cowork/archive-strategy/agent.json` |
| Arrival Setup | `pm-newcomer` | `pm-newcomer/arrival-setup/agent.json` |
| Ask for a Raise | `pm-wealth` | `pm-wealth/ask-for-a-raise/agent.json` |
| Assumption Audit | `pm-thinking` | `pm-thinking/assumption-audit/agent.json` |
| Assumption Bounty | `pm-warroom` | `pm-warroom/assumption-bounty/agent.json` |
| Assumption Mapper | `pm-discovery` | `pm-discovery/assumption-mapper/agent.json` |
| Async Decision Memo | `pm-operations` | `pm-operations/async-decision-memo/agent.json` |
| Async Instead | `pm-cowork` | `pm-cowork/async-instead/agent.json` |
| Async Standup Compiler (Live) | `pm-cowork-live` | `pm-cowork-live/async-standup-compiler/agent.json` |
| Async Update Format | `pm-cowork` | `pm-cowork/async-update-format/agent.json` |
| ATS Detector | `pm-cv` | `pm-cv/ats-detector/agent.json` |
| Attention Reset | `pm-newgen` | `pm-newgen/attention-reset/agent.json` |
| Audited Boundary Check | `pm-investing-literacy` | `pm-investing-literacy/audited-boundary-check/agent.json` |
| Auto Repair Estimate Decoder | `pm-decoders` | `pm-decoders/auto-repair-estimate-decoder/agent.json` |
| Autopilot Charter | `pm-autopilot` | `pm-autopilot/autopilot-charter/agent.json` |
| Awkward Message Helper | `pm-comms` | `pm-comms/awkward-message-helper/agent.json` |
| Backup Strategy | `pm-digital-safety` | `pm-digital-safety/backup-strategy/agent.json` |
| Band Agreement | `pm-musician` | `pm-musician/band-agreement/agent.json` |
| Bank Fee Refund | `pm-money` | `pm-money/bank-fee-refund/agent.json` |
| Bankruptcy Decision | `pm-hardship` | `pm-hardship/bankruptcy-decision/agent.json` |
| Behavior Intervention Plan | `pm-teaching` | `pm-teaching/behavior-intervention-plan/agent.json` |
| Beneficiary Audit | `pm-estate` | `pm-estate/beneficiary-audit/agent.json` |
| Benefits-Cliff Check | `pm-hardship` | `pm-hardship/benefits-cliff-check/agent.json` |
| Benefits Decoder | `pm-decoders` | `pm-decoders/benefits-decoder/agent.json` |
| Bennett Time Audit | `pm-dead-mentors` | `pm-dead-mentors/bennett-time-audit/agent.json` |
| Bid / Tender Review | `pm-construction` | `pm-construction/bid-tender-review/agent.json` |
| Big-Purchase Timing | `pm-money` | `pm-money/big-purchase-timing/agent.json` |
| B 站视频脚本 | `pm-zh-content` | `pm-zh-content/bilibili-video-script/agent.json` |
| Bilingual CV, Chinese and English | `pm-cv` | `pm-cv/bilingual-cv-zh-en/agent.json` |
| Birdwatching Log | `pm-hobbies` | `pm-hobbies/birdwatching-log/agent.json` |
| Blast Radius Drill | `pm-seatbelt` | `pm-seatbelt/blast-radius-drill/agent.json` |
| Blended-Family Plan | `pm-family` | `pm-family/blended-family-plan/agent.json` |
| Board Deck Narrative | `pm-business` | `pm-business/board-deck-narrative/agent.json` |
| Board Game Designer | `pm-tabletop` | `pm-tabletop/board-game-designer/agent.json` |
| Board Game Night Planner | `pm-hobbies` | `pm-hobbies/board-game-night-planner/agent.json` |
| Board Minutes | `pm-business` | `pm-business/board-minutes/agent.json` |
| Board Pre-Read | `pm-business` | `pm-business/board-pre-read/agent.json` |
| Body Double Session | `pm-neurodivergent` | `pm-neurodivergent/body-double-session/agent.json` |
| Body-Doubling Partner | `pm-focus` | `pm-focus/body-doubling-partner/agent.json` |
| BOM Cost Review | `pm-hardware` | `pm-hardware/bom-cost-review/agent.json` |
| Bookkeeping Categorization | `pm-accounting` | `pm-accounting/bookkeeping-categorization/agent.json` |
| Boolean Search Builder | `pm-recruiting` | `pm-recruiting/boolean-search-builder/agent.json` |
| Boundary-Setting Scripts | `other` | `other/boundary-setting-scripts/agent.json` |
| IRPF Prep (Brazil) | `pm-latam` | `pm-latam/br-irpf-prep/agent.json` |
| Rescisão CLT (Brazil) | `pm-latam` | `pm-latam/br-rescisao-clt/agent.json` |
| Brag Doc | `pm-career` | `pm-career/brag-doc/agent.json` |
| Brainstorming | `pm-method` | `pm-method/brainstorming/agent.json` |
| Brand Guidelines | `pm-design` | `pm-design/brand-guidelines/agent.json` |
| Brand Impersonation Response | `pm-crisis` | `pm-crisis/brand-impersonation-response/agent.json` |
| Brief Builder | `pm-cross` | `pm-cross/brief-builder/agent.json` |
| Brief From Pile | `pm-cowork` | `pm-cowork/brief-from-pile/agent.json` |
| Briefing Note | `pm-gov` | `pm-gov/briefing-note/agent.json` |
| Browser Agent Preflight | `pm-seatbelt` | `pm-seatbelt/browser-agent-preflight/agent.json` |
| Budget Builder | `pm-money` | `pm-money/budget-builder/agent.json` |
| Budget Tracker Design | `pm-cowork` | `pm-cowork/budget-tracker-design/agent.json` |
| Budget Variance Analysis | `pm-finance` | `pm-finance/budget-variance-analysis/agent.json` |
| Bug Diagnosis | `pm-craft` | `pm-craft/bug-diagnosis/agent.json` |
| Bug Report | `pm-qa` | `pm-qa/bug-report/agent.json` |
| Bug Triage Pack | `pm-qa` | `pm-qa/bug-triage-pack/agent.json` |
| Build My Memory File | `pm-focus` | `pm-focus/build-my-memory-file/agent.json` |
| Burnout Recovery Plan | `pm-career` | `pm-career/burnout-recovery-plan/agent.json` |
| Business-Idea Validator | `pm-freelance` | `pm-freelance/business-idea-validator/agent.json` |
| Calendar Defrag | `pm-operator` | `pm-operator/calendar-defrag/agent.json` |
| Candidate Scorecard | `pm-recruiting` | `pm-recruiting/candidate-scorecard/agent.json` |
| Cap Table Explainer | `pm-founders` | `pm-founders/cap-table-explainer/agent.json` |
| Capacity Planning | `pm-engineering` | `pm-engineering/capacity-planning/agent.json` |
| Capital Allocation | `pm-business` | `pm-business/capital-allocation/agent.json` |
| Car-Buying Negotiation | `pm-lifeadmin` | `pm-lifeadmin/car-buying-negotiation/agent.json` |
| Car Lease Decoder | `pm-decoders` | `pm-decoders/car-lease-decoder/agent.json` |
| Car TCO | `pm-calculators` | `pm-calculators/car-tco/agent.json` |
| Carbon Accounting Check | `pm-climate` | `pm-climate/carbon-accounting-check/agent.json` |
| Care-Decision Family Meeting | `pm-caregiving` | `pm-caregiving/care-decision-family-meeting/agent.json` |
| Care-Home Contract Decoder | `pm-decoders` | `pm-decoders/care-home-contract-decoder/agent.json` |
| Care-Team Coordinator | `pm-caregiving` | `pm-caregiving/care-team-coordinator/agent.json` |
| Career-Changer CV | `pm-cv` | `pm-cv/career-changer-cv/agent.json` |
| Career Inventory | `pm-cv` | `pm-cv/career-inventory/agent.json` |
| Career Ladder Map | `pm-career` | `pm-career/career-ladder-map/agent.json` |
| Career Pivot Plan | `pm-career` | `pm-career/career-pivot-plan/agent.json` |
| Caregiver-Burnout Check | `pm-caregiving` | `pm-caregiving/caregiver-burnout-check/agent.json` |
| Caregiver Coordination | `pm-lifeadmin` | `pm-lifeadmin/caregiver-coordination/agent.json` |
| Case for Support | `pm-nonprofit` | `pm-nonprofit/case-for-support/agent.json` |
| Case Study Write-up | `pm-consulting` | `pm-consulting/case-study-writeup/agent.json` |
| Cash Flow Forecast | `pm-accounting` | `pm-accounting/cash-flow-forecast/agent.json` |
| Cash Watch | `pm-duet` | `pm-duet/cash-watch/agent.json` |
| Category Page Brief | `pm-ecommerce` | `pm-ecommerce/category-page-brief/agent.json` |
| Cease-and-Desist Letter | `pm-legal` | `pm-legal/cease-and-desist-letter/agent.json` |
| Change Management Plan | `pm-hr` | `pm-hr/change-management-plan/agent.json` |
| Change Order Writer | `pm-construction` | `pm-construction/change-order-writer/agent.json` |
| Changelog For Humans | `pm-cowork` | `pm-cowork/changelog-for-humans/agent.json` |
| Changelog from Commits (Live) | `pm-cowork-live` | `pm-cowork-live/changelog-from-commits/agent.json` |
| Changelog Generator | `pm-engineering` | `pm-engineering/changelog-generator/agent.json` |
| Changelog Writer | `pm-devrel` | `pm-devrel/changelog-writer/agent.json` |
| Channel Hygiene | `pm-cowork` | `pm-cowork/channel-hygiene/agent.json` |
| Chargeback Dispute Response | `pm-ecommerce` | `pm-ecommerce/chargeback-dispute-response/agent.json` |
| Chart | `pm-visuals` | `pm-visuals/chart/agent.json` |
| Chart Choice | `pm-cowork` | `pm-cowork/chart-choice/agent.json` |
| Chart Data Extractor | `pm-vision` | `pm-vision/chart-data-extractor/agent.json` |
| Chess Opening Coach | `pm-hobbies` | `pm-hobbies/chess-opening-coach/agent.json` |
| Childcare Comparison | `pm-family` | `pm-family/childcare-comparison/agent.json` |
| 出海 Market Entry | `pm-chuhai` | `pm-chuhai/chuhai-market-entry/agent.json` |
| Churn Analysis | `pm-cs` | `pm-cs/churn-analysis/agent.json` |
| CI/CD Playbook | `pm-engineering` | `pm-engineering/cicd-playbook/agent.json` |
| Citation Hygiene | `pm-cowork` | `pm-cowork/citation-hygiene/agent.json` |
| Civil Service and NHS Application | `pm-cv` | `pm-cv/civil-service-application/agent.json` |
| Claim Denial Decoder | `pm-decoders` | `pm-decoders/claim-denial-decoder/agent.json` |
| Claims Triage | `pm-insurance` | `pm-insurance/claims-triage/agent.json` |
| Class-Action Claim Finder | `pm-money` | `pm-money/class-action-claim-finder/agent.json` |
| Claude Project Setup | `pm-ai-native` | `pm-ai-native/claude-project-setup/agent.json` |
| Claude Superpowers | `pm-engineering` | `pm-engineering/claude-superpowers/agent.json` |
| Clause Explainer | `pm-legal` | `pm-legal/clause-explainer/agent.json` |
| Client Discharge Notes | `pm-veterinary` | `pm-veterinary/client-discharge-notes/agent.json` |
| Client Discovery | `pm-consulting` | `pm-consulting/client-discovery/agent.json` |
| Client Offboarding | `pm-freelance` | `pm-freelance/client-offboarding/agent.json` |
| Client-Onboarding Kit | `pm-freelance` | `pm-freelance/client-onboarding-kit/agent.json` |
| Client Red Flags | `pm-freelance` | `pm-freelance/client-red-flags/agent.json` |
| Climate Risk Assessment | `pm-climate` | `pm-climate/climate-risk-assessment/agent.json` |
| Clinical Case Summary | `pm-research` | `pm-research/clinical-case-summary/agent.json` |
| Clinical Trial Protocol | `pm-health` | `pm-health/clinical-trial-protocol/agent.json` |
| Clip Factory | `pm-newgen` | `pm-newgen/clip-factory/agent.json` |
| Clone Brief | `pm-2027` | `pm-2027/clone-brief/agent.json` |
| Closing Disclosure Decoder | `pm-decoders` | `pm-decoders/closing-disclosure-decoder/agent.json` |
| 1688 批发 Listing | `pm-china-ecommerce` | `pm-china-ecommerce/cn-1688-wholesale-listing/agent.json` |
| 5S / 6S Audit (5S / 6S 检查表) | `pm-china-manufacturing` | `pm-china-manufacturing/cn-5s-audit/agent.json` |
| 8D Report (8D 报告) | `pm-china-manufacturing` | `pm-china-manufacturing/cn-8d-report/agent.json` |
| Campus Recruitment (校招) | `pm-china-exams` | `pm-china-exams/cn-campus-recruitment/agent.json` |
| GB/T 7714 References (参考文献著录) | `pm-china-exams` | `pm-china-exams/cn-citation-gbt7714/agent.json` |
| Civil Service Essay (申论) | `pm-china-exams` | `pm-china-exams/cn-civil-exam-essay/agent.json` |
| Civil Service Interview (结构化面试) | `pm-china-exams` | `pm-china-exams/cn-civil-exam-interview/agent.json` |
| Class Meeting Plan (主题班会方案) | `pm-china-teachers` | `pm-china-teachers/cn-class-meeting/agent.json` |
| 公司注册 | `pm-china-startup` | `pm-china-startup/cn-company-registration/agent.json` |
| 电商客服话术 | `pm-china-ecommerce` | `pm-china-ecommerce/cn-customer-service-scripts/agent.json` |
| Customs Documents (报关单证清单) | `pm-china-trade` | `pm-china-trade/cn-customs-docs/agent.json` |
| Data Export Assessment (数据出境) | `pm-china-compliance` | `pm-china-compliance/cn-data-export-assessment/agent.json` |
| 大促方案（双 11 / 618） | `pm-china-ecommerce` | `pm-china-ecommerce/cn-double11-promotion-plan/agent.json` |
| 国内电商商品 Listing | `pm-china-ecommerce` | `pm-china-ecommerce/cn-ecommerce-listing/agent.json` |
| 创始人股权分配 | `pm-china-startup` | `pm-china-startup/cn-equity-split/agent.json` |
| Extracurricular Planner (兴趣班与课外安排) | `pm-china-parents` | `pm-china-parents/cn-extracurricular-plan/agent.json` |
| 融资商业计划书（BP） | `pm-china-startup` | `pm-china-startup/cn-financing-bp/agent.json` |
| 复盘 (Fupan) | `pm-china-work` | `pm-china-work/cn-fupan/agent.json` |
| Gaokao Application Planner (高考志愿) | `pm-china-life` | `pm-china-life/cn-gaokao-planner/agent.json` |
| Generative AI Filing (生成式人工智能备案) | `pm-china-compliance` | `pm-china-compliance/cn-genai-filing/agent.json` |
| Helping Parents With Admin (帮爸妈办事) | `pm-china-life` | `pm-china-life/cn-help-parents-admin/agent.json` |
| 高新技术企业认定申报 | `pm-china-startup` | `pm-china-startup/cn-high-tech-enterprise-application/agent.json` |
| Home-School Messages (家校沟通) | `pm-china-parents` | `pm-china-parents/cn-home-school-comms/agent.json` |
| Homework Guide for Parents (家长辅导作业) | `pm-china-parents` | `pm-china-parents/cn-homework-helper-parent/agent.json` |
| Housing Fund Withdrawal (公积金提取) | `pm-china-life` | `pm-china-life/cn-housing-fund-withdrawal/agent.json` |
| Hukou Points (积分落户) | `pm-china-life` | `pm-china-life/cn-hukou-points/agent.json` |
| China Annual Tax Reconciliation (个税年度汇算) | `pm-china-life` | `pm-china-life/cn-iit-reconciliation/agent.json` |
| Inquiry Reply (外贸询盘回复) | `pm-china-trade` | `pm-china-trade/cn-inquiry-reply/agent.json` |
| Chinese Internet Jargon Translator (互联网黑话翻译器) | `pm-china-work` | `pm-china-work/cn-jargon-translator/agent.json` |
| Kaoyan Planner (考研规划) | `pm-china-exams` | `pm-china-exams/cn-kaoyan-planner/agent.json` |
| China Labour Contract Decoder (劳动合同) | `pm-china-life` | `pm-china-life/cn-labour-contract-decoder/agent.json` |
| Chinese Lesson Plan (教案 / 教学设计) | `pm-china-teachers` | `pm-china-teachers/cn-lesson-plan/agent.json` |
| Letter of Credit Check (信用证审证与审单) | `pm-china-trade` | `pm-china-trade/cn-letter-of-credit-check/agent.json` |
| Level Mapper (职级对标) | `pm-china-work` | `pm-china-work/cn-level-mapper/agent.json` |
| Medical Insurance Claims (医保报销) | `pm-china-life` | `pm-china-life/cn-medical-insurance-claim/agent.json` |
| MLPS 2.0 Checklist (等保 2.0) | `pm-china-compliance` | `pm-china-compliance/cn-mlps-checklist/agent.json` |
| Next Year's OKR and Development Plan (明年个人 OKR 与个人发展计划) | `pm-china-yearend` | `pm-china-yearend/cn-next-year-plan/agent.json` |
| Official Document (公文) | `pm-china-work` | `pm-china-work/cn-official-document/agent.json` |
| Open Class and Lesson Talk (公开课准备与说课稿) | `pm-china-teachers` | `pm-china-teachers/cn-open-class/agent.json` |
| Parent Meeting Pack (家长会发言稿与材料) | `pm-china-teachers` | `pm-china-teachers/cn-parent-meeting/agent.json` |
| PIPL Impact Assessment (个人信息保护影响评估) | `pm-china-compliance` | `pm-china-compliance/cn-pipl-pia/agent.json` |
| PRD Review (需求评审) | `pm-china-work` | `pm-china-work/cn-prd-review/agent.json` |
| Promotion Defence (晋升答辩) | `pm-china-work` | `pm-china-work/cn-promotion-defence/agent.json` |
| Quality Traceability Plan (质量追溯方案) | `pm-china-manufacturing` | `pm-china-manufacturing/cn-quality-traceability/agent.json` |
| 海归求职 | `pm-china-study-abroad` | `pm-china-study-abroad/cn-returnee-job-search/agent.json` |
| School Entry Planner (幼升小 / 小升初) | `pm-china-parents` | `pm-china-parents/cn-school-entry/agent.json` |
| China Severance Calculator (经济补偿金) | `pm-china-life` | `pm-china-life/cn-severance-calculator/agent.json` |
| 述职 PPT Builder (述职 PPT 大纲与讲稿) | `pm-china-yearend` | `pm-china-yearend/cn-shuzhi-deck/agent.json` |
| Small Business Tax (个体户与小微企业税务) | `pm-china-life` | `pm-china-life/cn-small-business-tax/agent.json` |
| China Social Insurance Explainer (五险一金) | `pm-china-life` | `pm-china-life/cn-social-insurance-explainer/agent.json` |
| State-Owned Enterprise Interview (国企面试) | `pm-china-exams` | `pm-china-exams/cn-soe-interview/agent.json` |
| Work Instruction (作业指导书 / SOP) | `pm-china-manufacturing` | `pm-china-manufacturing/cn-sop-writer/agent.json` |
| 留学申请文书 | `pm-china-study-abroad` | `pm-china-study-abroad/cn-study-abroad-essay/agent.json` |
| 留学签证准备 | `pm-china-study-abroad` | `pm-china-study-abroad/cn-study-visa-prep/agent.json` |
| 补贴与政策申报 | `pm-china-startup` | `pm-china-startup/cn-subsidy-filing/agent.json` |
| Tech Interview Drill (大厂技术面试) | `pm-china-exams` | `pm-china-exams/cn-tech-interview-drill/agent.json` |
| End-of-Term Comments (期末评语) | `pm-china-teachers` | `pm-china-teachers/cn-term-comments/agent.json` |
| Thesis Proposal (开题报告) | `pm-china-exams` | `pm-china-exams/cn-thesis-proposal/agent.json` |
| Export Quotation (外贸报价单与成本核算) | `pm-china-trade` | `pm-china-trade/cn-trade-quotation/agent.json` |
| Chinese Weekly Report (周报) | `pm-china-work` | `pm-china-work/cn-weekly-report/agent.json` |
| Year-End Bonus Clarifier (年终奖、13薪与个税) | `pm-china-yearend` | `pm-china-yearend/cn-year-end-bonus/agent.json` |
| Chinese Year-End Review (述职报告 / 年终总结) | `pm-china-yearend` | `pm-china-yearend/cn-year-end-review/agent.json` |
| 专精特新申报 | `pm-china-startup` | `pm-china-startup/cn-zhuanjingtexin-application/agent.json` |
| Co-Marketing | `pm-growth` | `pm-growth/co-marketing/agent.json` |
| Co-Parenting Messages | `pm-family` | `pm-family/co-parenting-messages/agent.json` |
| Coaching Season Plan | `pm-sports-coaching` | `pm-sports-coaching/coaching-season-plan/agent.json` |
| Coaching Session Plan | `pm-sports-coaching` | `pm-sports-coaching/coaching-session-plan/agent.json` |
| Cocktail From What I Have | `pm-hobbies` | `pm-hobbies/cocktail-from-what-i-have/agent.json` |
| Code Explainer | `pm-engineering` | `pm-engineering/code-explainer/agent.json` |
| Code Review Checklist | `pm-engineering` | `pm-engineering/code-review-checklist/agent.json` |
| Code Review Guide | `pm-craft` | `pm-craft/code-review-guide/agent.json` |
| Code Simplification | `pm-method` | `pm-method/code-simplification/agent.json` |
| Cohort Analysis | `pm-data` | `pm-data/cohort-analysis/agent.json` |
| Cohort Curve Model | `pm-calculators` | `pm-calculators/cohort-curve-model/agent.json` |
| Cold Email | `pm-copy` | `pm-copy/cold-email/agent.json` |
| Cold Outreach That Isn't Spam | `pm-freelance` | `pm-freelance/cold-outreach-that-isnt-spam/agent.json` |
| Collaboration Contract | `pm-cowork` | `pm-cowork/collaboration-contract/agent.json` |
| Collections Email | `pm-accounting` | `pm-accounting/collections-email/agent.json` |
| College App Parent Guide | `pm-parents` | `pm-parents/college-app-parent-guide/agent.json` |
| College Cost | `pm-calculators` | `pm-calculators/college-cost/agent.json` |
| Coming Out Rehearsal | `pm-identity` | `pm-identity/coming-out-rehearsal/agent.json` |
| Committee Handover Pack | `pm-committee` | `pm-committee/committee-handover-pack/agent.json` |
| Community Management Playbook | `pm-social` | `pm-social/community-management-playbook/agent.json` |
| Community Moderation Policy | `pm-social` | `pm-social/community-moderation-policy/agent.json` |
| Company Brief | `pm-jobsearch` | `pm-jobsearch/company-brief/agent.json` |
| Company Compare, Same Definitions | `pm-investing-literacy` | `pm-investing-literacy/company-compare-same-definitions/agent.json` |
| Company Event Ops | `pm-cowork` | `pm-cowork/company-event-ops/agent.json` |
| Company-Tailored CV | `pm-cv` | `pm-cv/company-tailored-cv/agent.json` |
| Comparative Market Analysis | `pm-realestate` | `pm-realestate/comparative-market-analysis/agent.json` |
| Competitive Analysis | `pm-essentials` | `pm-essentials/competitive-analysis/agent.json` |
| Competitive Intelligence Monitor | `pm-strategy` | `pm-strategy/competitive-intelligence-monitor/agent.json` |
| Competitive Scan Lite | `pm-cowork` | `pm-cowork/competitive-scan-lite/agent.json` |
| Competitor Signal Tracker | `pm-strategy` | `pm-strategy/competitor-signal-tracker/agent.json` |
| Competitor Teardown | `pm-gtm` | `pm-gtm/competitor-teardown/agent.json` |
| Complaint Letter | `pm-lifeadmin` | `pm-lifeadmin/complaint-letter/agent.json` |
| Compliance Checklist | `pm-legal` | `pm-legal/compliance-checklist/agent.json` |
| Compound-Growth Explainer | `pm-wealth` | `pm-wealth/compound-growth-explainer/agent.json` |
| Compounding Record | `pm-pharmacy` | `pm-pharmacy/compounding-record/agent.json` |
| Computer-Use Runbook | `pm-agentnative` | `pm-agentnative/computer-use-runbook/agent.json` |
| Condolence Message Helper | `pm-family` | `pm-family/condolence-message-helper/agent.json` |
| Conference Talk Proposal | `pm-devrel` | `pm-devrel/conference-talk-proposal/agent.json` |
| Conflict De-escalation | `other` | `other/conflict-deescalation/agent.json` |
| Construction RFI Response | `pm-architecture` | `pm-architecture/construction-rfi-response/agent.json` |
| Consulting and Banking CV | `pm-cv` | `pm-cv/consulting-banking-cv/agent.json` |
| Consulting Proposal | `pm-consulting` | `pm-consulting/consulting-proposal/agent.json` |
| Content Calendar | `pm-gtm` | `pm-gtm/content-calendar/agent.json` |
| Content Repurposer | `pm-creator` | `pm-creator/content-repurposer/agent.json` |
| Content Style Guide | `pm-uxwriting` | `pm-uxwriting/content-style-guide/agent.json` |
| Context Bankruptcy | `pm-2027` | `pm-2027/context-bankruptcy/agent.json` |
| Context Budget | `pm-tokens` | `pm-tokens/context-budget/agent.json` |
| Context Crusher | `pm-tokens` | `pm-tokens/context-crusher/agent.json` |
| Context Engineering Review | `pm-agentops` | `pm-agentops/context-engineering-review/agent.json` |
| Context Mode | `pm-engineering` | `pm-engineering/context-mode/agent.json` |
| Context Switch Budget | `pm-cowork` | `pm-cowork/context-switch-budget/agent.json` |
| Context-Switch Recovery | `pm-focus` | `pm-focus/context-switch-recovery/agent.json` |
| Contract Red Flags | `pm-legal` | `pm-legal/contract-red-flags/agent.json` |
| Contract Renewal Brief | `pm-procurement` | `pm-procurement/contract-renewal-brief/agent.json` |
| Contract Renewal Tracker | `pm-procurement` | `pm-procurement/contract-renewal-tracker/agent.json` |
| Contract Review | `pm-legal` | `pm-legal/contract-review/agent.json` |
| Contractor Dispute | `pm-lifeadmin` | `pm-lifeadmin/contractor-dispute/agent.json` |
| Contributor Guide | `pm-devrel` | `pm-devrel/contributor-guide/agent.json` |
| Controlled Substance Reconciliation & Audit | `pm-pharmacy` | `pm-pharmacy/controlled-substance-audit/agent.json` |
| Conversion Rate Optimization | `pm-growth` | `pm-growth/conversion-rate-optimization/agent.json` |
| Couch-to-Goal Runner | `pm-wellbeing` | `pm-wellbeing/couch-to-goal-runner/agent.json` |
| Counteroffer Decoder | `pm-resignation` | `pm-resignation/counteroffer-decoder/agent.json` |
| Country CV Format | `pm-cv` | `pm-cv/country-cv-format/agent.json` |
| Cover Letter | `pm-personal` | `pm-personal/cover-letter/agent.json` |
| Coverage Gap Analysis | `pm-insurance` | `pm-insurance/coverage-gap-analysis/agent.json` |
| Creator Brand Kit | `pm-creator` | `pm-creator/creator-brand-kit/agent.json` |
| Creator Deal Decoder | `pm-newgen` | `pm-newgen/creator-deal-decoder/agent.json` |
| Creator Media Kit | `pm-creator` | `pm-creator/creator-media-kit/agent.json` |
| Credential Recognition | `pm-newcomer` | `pm-newcomer/credential-recognition/agent.json` |
| Credit From Scratch | `pm-newcomer` | `pm-newcomer/credit-from-scratch/agent.json` |
| Credit Memo | `pm-banking` | `pm-banking/credit-memo/agent.json` |
| CRM Hygiene Sweep | `pm-duet` | `pm-duet/crm-hygiene-sweep/agent.json` |
| Crop Insurance Claim | `pm-insurance` | `pm-insurance/crop-insurance-claim/agent.json` |
| Crop Season Plan | `pm-agriculture` | `pm-agriculture/crop-season-plan/agent.json` |
| Cross-Border Listing | `pm-chuhai` | `pm-chuhai/cross-border-listing/agent.json` |
| Cross-Examine Me | `pm-thinking` | `pm-thinking/cross-examine-me/agent.json` |
| Cross-border Platform Playbook (跨境平台选择与入驻) | `pm-chuhai` | `pm-chuhai/crossborder-platform-playbook/agent.json` |
| Crypto Prices | `pm-live` | `pm-live/crypto-prices/agent.json` |
| Customer Escalation Brief | `pm-cs` | `pm-cs/cs-escalation-brief/agent.json` |
| Customer Health Scorecard | `pm-cs` | `pm-cs/cs-health-scorecard/agent.json` |
| CSAT / NPS Analysis | `pm-support` | `pm-support/csat-nps-analysis/agent.json` |
| Currency Rates | `pm-live` | `pm-live/currency-rates/agent.json` |
| Customer Advisory Board | `pm-pmm` | `pm-pmm/customer-advisory-board/agent.json` |
| Customer Incident Update | `pm-crisis` | `pm-crisis/customer-incident-update/agent.json` |
| Customer Journey Map | `pm-discovery` | `pm-discovery/customer-journey-map/agent.json` |
| Customer Outage Notice | `pm-crisis` | `pm-crisis/customer-outage-notice/agent.json` |
| Customer Success Plan | `pm-cs` | `pm-cs/customer-success-plan/agent.json` |
| CV Word Export | `pm-cv` | `pm-cv/cv-docx-export/agent.json` |
| CV Honesty Check | `pm-cv` | `pm-cv/cv-honesty-check/agent.json` |
| Daily Cash Book | `pm-sidehustle` | `pm-sidehustle/daily-cash-book/agent.json` |
| Dashboard Brief | `pm-data` | `pm-data/dashboard-brief/agent.json` |
| Data Analysis Standard | `pm-analytics` | `pm-analytics/data-analysis-standard/agent.json` |
| Data Breach Response | `pm-scam-defense` | `pm-scam-defense/data-breach-response/agent.json` |
| Data-Broker Removal | `pm-digital-safety` | `pm-digital-safety/data-broker-removal/agent.json` |
| Data Cleaning Pass | `pm-cowork` | `pm-cowork/data-cleaning-pass/agent.json` |
| Data Contract | `pm-dataeng` | `pm-dataeng/data-contract/agent.json` |
| Data Pipeline Spec | `pm-data` | `pm-data/data-pipeline-spec/agent.json` |
| Data Quality Audit | `pm-data` | `pm-data/data-quality-audit/agent.json` |
| Data Quality Checks | `pm-dataeng` | `pm-dataeng/data-quality-checks/agent.json` |
| Data Retention Policy | `pm-compliance` | `pm-compliance/data-retention-policy/agent.json` |
| Data Slide Design | `pm-cowork` | `pm-cowork/data-slide-design/agent.json` |
| Database Migration Plan | `pm-engineering` | `pm-engineering/database-migration-plan/agent.json` |
| Database Schema Design | `pm-engineering` | `pm-engineering/database-schema-design/agent.json` |
| Dataset Datasheet | `pm-ai` | `pm-ai/dataset-datasheet/agent.json` |
| Dating Profile Doctor | `pm-newgen` | `pm-newgen/dating-profile-doctor/agent.json` |
| Daycare vs Stay-Home | `pm-calculators` | `pm-calculators/daycare-vs-stay-home/agent.json` |
| dbt Model Spec | `pm-dataeng` | `pm-dataeng/dbt-model-spec/agent.json` |
| Arbeitszeugnis Decoder (Germany) | `pm-dach` | `pm-dach/de-arbeitszeugnis-decoder/agent.json` |
| Kündigungsfrist Check (Germany) | `pm-dach` | `pm-dach/de-kuendigungsfrist-check/agent.json` |
| Steuererklärung Prep (Germany) | `pm-dach` | `pm-dach/de-steuererklaerung-prep/agent.json` |
| Debt Collector Response | `pm-money` | `pm-money/debt-collector-response/agent.json` |
| Debt-Collector Scripts | `pm-hardship` | `pm-hardship/debt-collector-scripts/agent.json` |
| Debt Payoff | `pm-calculators` | `pm-calculators/debt-payoff/agent.json` |
| Debt Payoff Plan | `pm-money` | `pm-money/debt-payoff-plan/agent.json` |
| Debugging Log Analyser | `pm-engineering` | `pm-engineering/debugging-log-analyser/agent.json` |
| Decision Autopsy | `pm-warroom` | `pm-warroom/decision-autopsy/agent.json` |
| Decision Forensics | `pm-method` | `pm-method/decision-forensics/agent.json` |
| Decision Helper | `pm-personal` | `pm-personal/decision-helper/agent.json` |
| Decision Journal | `pm-essentials` | `pm-essentials/decision-journal/agent.json` |
| Decision Log Setup | `pm-cowork` | `pm-cowork/decision-log-setup/agent.json` |
| Decision Meeting Format | `pm-cowork` | `pm-cowork/decision-meeting-format/agent.json` |
| Decision Memo | `pm-business` | `pm-business/decision-memo/agent.json` |
| Decision Panel | `pm-thinking` | `pm-thinking/decision-panel/agent.json` |
| Decision Tree Solver | `pm-calculators` | `pm-calculators/decision-tree-solver/agent.json` |
| Decision When Tired | `pm-focus` | `pm-focus/decision-when-tired/agent.json` |
| Deck Autopsy | `pm-vision` | `pm-vision/deck-autopsy/agent.json` |
| Deck from Doc (Live) | `pm-cowork-live` | `pm-cowork-live/deck-from-doc/agent.json` |
| Deck Narrative Arc | `pm-cowork` | `pm-cowork/deck-narrative-arc/agent.json` |
| Deck Outline First | `pm-cowork` | `pm-cowork/deck-outline-first/agent.json` |
| Deck Review Rubric | `pm-cowork` | `pm-cowork/deck-review-rubric/agent.json` |
| Declutter By Room | `pm-lifeadmin` | `pm-lifeadmin/declutter-by-room/agent.json` |
| Deep Work Blocking | `pm-cowork` | `pm-cowork/deep-work-blocking/agent.json` |
| Deepfake Drill | `pm-2027` | `pm-2027/deepfake-drill/agent.json` |
| Defamation Response | `pm-legal` | `pm-legal/defamation-response/agent.json` |
| Delay Claim Letter | `pm-construction` | `pm-construction/delay-claim-letter/agent.json` |
| Delegate to AI | `pm-ai-native` | `pm-ai-native/delegate-to-ai/agent.json` |
| Delegation Brief | `pm-cowork` | `pm-cowork/delegation-brief/agent.json` |
| Deliberate-Practice Plan | `pm-learning` | `pm-learning/deliberate-practice-plan/agent.json` |
| Delta Briefing | `pm-autopilot` | `pm-autopilot/delta-briefing/agent.json` |
| Demand Forecast Review | `pm-supplychain` | `pm-supplychain/demand-forecast-review/agent.json` |
| Demand Letter | `pm-legal` | `pm-legal/demand-letter/agent.json` |
| Demo Clip Storyboard | `pm-oss-launch` | `pm-oss-launch/demo-clip-storyboard/agent.json` |
| Demo Data Generator | `pm-oss-launch` | `pm-oss-launch/demo-data-generator/agent.json` |
| Demo Script | `pm-cowork` | `pm-cowork/demo-script/agent.json` |
| Dental Clinical Note | `pm-dentistry` | `pm-dentistry/dental-clinical-note/agent.json` |
| Dental Emergency Triage | `pm-dentistry` | `pm-dentistry/dental-emergency-triage/agent.json` |
| Dental Pre-Authorisation & Claim Narrative | `pm-dentistry` | `pm-dentistry/dental-insurance-preauth/agent.json` |
| Dental Recall & Reactivation | `pm-dentistry` | `pm-dentistry/dental-recall-reactivation/agent.json` |
| Dental Referral Letter | `pm-dentistry` | `pm-dentistry/dental-referral-letter/agent.json` |
| Dependency Audit | `pm-engineering` | `pm-engineering/dependency-audit/agent.json` |
| Dependency Check | `pm-focus` | `pm-focus/dependency-check/agent.json` |
| Dependency Conflict Resolver | `pm-engineering` | `pm-engineering/dependency-conflict-resolver/agent.json` |
| Deprecation Comms Plan | `pm-devrel` | `pm-devrel/deprecation-comms-plan/agent.json` |
| Design Critique | `pm-design` | `pm-design/design-critique/agent.json` |
| Design Handoff Brief | `pm-advanced` | `pm-advanced/design-handoff-brief/agent.json` |
| Design System Audit | `pm-design` | `pm-design/design-system-audit/agent.json` |
| Design System Generate | `pm-design` | `pm-design/design-system-generate/agent.json` |
| Desk Ergonomics Audit | `pm-wellbeing` | `pm-wellbeing/desk-ergonomics-audit/agent.json` |
| Desk Research Sprint | `pm-cowork` | `pm-cowork/desk-research-sprint/agent.json` |
| Desktop Zero | `pm-cowork` | `pm-cowork/desktop-zero/agent.json` |
| Developer Onboarding Document | `pm-engineering` | `pm-engineering/developer-onboarding-doc/agent.json` |
| Devil's Advocate On Demand | `pm-thinking` | `pm-thinking/devils-advocate-on-demand/agent.json` |
| Devil's Twin | `pm-warroom` | `pm-warroom/devils-twin/agent.json` |
| Diagnosis Limbo Kit | `pm-invisible-illness` | `pm-invisible-illness/diagnosis-limbo-kit/agent.json` |
| Dictionary Lookup | `pm-live` | `pm-live/dictionary-lookup/agent.json` |
| Difficult Conversation | `pm-comms` | `pm-comms/difficult-conversation/agent.json` |
| Digital Death Plan | `other` | `other/digital-death-plan/agent.json` |
| Digital Legacy Planner | `pm-estate` | `pm-estate/digital-legacy-planner/agent.json` |
| DingTalk Work Log (钉钉日志) | `pm-china-work` | `pm-china-work/dingtalk-work-log/agent.json` |
| Disability Benefit Appeal | `pm-accessibility` | `pm-accessibility/disability-benefit-appeal/agent.json` |
| Disability Disclosure Decision | `pm-accessibility` | `pm-accessibility/disability-disclosure-decision/agent.json` |
| Disability Insurance Decoder | `pm-decoders` | `pm-decoders/disability-insurance-decoder/agent.json` |
| Disagreeing Experts | `pm-thinking` | `pm-thinking/disagreeing-experts/agent.json` |
| Disaster Recovery Plan | `pm-engineering` | `pm-engineering/disaster-recovery-plan/agent.json` |
| Discharge Summary | `pm-health` | `pm-health/discharge-summary/agent.json` |
| Discovery Call Prep | `pm-sales` | `pm-sales/discovery-call-prep/agent.json` |
| Discovery Eyes | `pm-simulators` | `pm-simulators/discovery-eyes/agent.json` |
| Discovery Interview Guide | `pm-discovery` | `pm-discovery/discovery-interview-guide/agent.json` |
| Dispute Letter | `pm-lifeadmin` | `pm-lifeadmin/dispute-letter/agent.json` |
| Tabletop Campaign Starter | `pm-hobbies` | `pm-hobbies/dnd-campaign-starter/agent.json` |
| DNS Lookup | `pm-live` | `pm-live/dns-lookup/agent.json` |
| Doc Restructure (Live) | `pm-cowork-live` | `pm-cowork-live/doc-restructure-live/agent.json` |
| Doc Versioning Discipline | `pm-cowork` | `pm-cowork/doc-versioning-discipline/agent.json` |
| Docs Quickstart | `pm-devrel` | `pm-devrel/docs-quickstart/agent.json` |
| Doctor Visit Prep | `pm-lifeadmin` | `pm-lifeadmin/doctor-visit-prep/agent.json` |
| Document Retention Map | `pm-cowork` | `pm-cowork/document-retention-map/agent.json` |
| Word Doc Tracked Changes | `pm-essentials` | `pm-essentials/docx-tracked-changes/agent.json` |
| Donor Update | `pm-nonprofit` | `pm-nonprofit/donor-update/agent.json` |
| Double Opt-In Intro | `pm-cowork` | `pm-cowork/double-opt-in-intro/agent.json` |
| 抖音 Script | `pm-zh-content` | `pm-zh-content/douyin-script/agent.json` |
| Downloads Triage | `pm-cowork` | `pm-cowork/downloads-triage/agent.json` |
| Doxxing Response | `pm-digital-safety` | `pm-digital-safety/doxxing-response/agent.json` |
| DPA Review | `pm-legal` | `pm-legal/dpa-review/agent.json` |
| Driver Incident Investigation | `pm-fleet` | `pm-fleet/driver-incident-investigation/agent.json` |
| Driver Retention Plan | `pm-fleet` | `pm-fleet/driver-retention-plan/agent.json` |
| Clinical Intervention Record | `pm-pharmacy` | `pm-pharmacy/drug-interaction-intervention/agent.json` |
| Earthquake Watch | `pm-live` | `pm-live/earthquake-watch/agent.json` |
| Elder Scam Briefing | `pm-scam-defense` | `pm-scam-defense/elder-scam-briefing/agent.json` |
| Elected Rep Letter | `pm-civic` | `pm-civic/elected-rep-letter/agent.json` |
| Email Agent Preflight | `pm-seatbelt` | `pm-seatbelt/email-agent-preflight/agent.json` |
| Email Campaign | `pm-gtm` | `pm-gtm/email-campaign/agent.json` |
| Email Sequence | `pm-copy` | `pm-copy/email-sequence/agent.json` |
| Email To Tasks | `pm-cowork` | `pm-cowork/email-to-tasks/agent.json` |
| Email Triage | `pm-operations` | `pm-operations/email-triage/agent.json` |
| Email Triage System | `pm-cowork` | `pm-cowork/email-triage-system/agent.json` |
| Emergency Doc Kit | `pm-emergency` | `pm-emergency/emergency-doc-kit/agent.json` |
| Emergency Fund | `pm-calculators` | `pm-calculators/emergency-fund/agent.json` |
| Emergency Grant Application | `pm-emergency` | `pm-emergency/emergency-grant-application/agent.json` |
| Emil Design Eng (pointer) | `pm-design-taste` | `pm-design-taste/emil-design-eng-pointer/agent.json` |
| Employee Engagement Survey | `pm-hr` | `pm-hr/employee-engagement-survey/agent.json` |
| Empty State Writer | `pm-uxwriting` | `pm-uxwriting/empty-state-writer/agent.json` |
| End Of Day Report | `pm-duet` | `pm-duet/end-of-day-report/agent.json` |
| End-of-Life Wishes Conversation | `pm-caregiving` | `pm-caregiving/end-of-life-wishes-conversation/agent.json` |
| Energy Scheduling | `pm-cowork` | `pm-cowork/energy-scheduling/agent.json` |
| Engagement Retro | `pm-consulting` | `pm-consulting/engagement-retro/agent.json` |
| Engineering Hiring Rubric | `pm-engineering` | `pm-engineering/engineering-hiring-rubric/agent.json` |
| Engineering Weekly Report | `pm-engineering` | `pm-engineering/engineering-weekly-report/agent.json` |
| Entity-Relationship Diagram | `pm-visuals` | `pm-visuals/entity-relationship-diagram/agent.json` |
| Epic Progress Report | `pm-delivery` | `pm-delivery/epic-progress-report/agent.json` |
| Error Decoder | `pm-engineering` | `pm-engineering/error-decoder/agent.json` |
| Error Message Writer | `pm-uxwriting` | `pm-uxwriting/error-message-writer/agent.json` |
| Escalate or Hold | `pm-decisions` | `pm-decisions/escalate-or-hold/agent.json` |
| Escalation Email | `pm-cowork` | `pm-cowork/escalation-email/agent.json` |
| Escalation Tree | `pm-support` | `pm-support/escalation-tree/agent.json` |
| ESG Disclosure Draft | `pm-climate` | `pm-climate/esg-disclosure-draft/agent.json` |
| Estate Planning Kit | `pm-money` | `pm-money/estate-planning-kit/agent.json` |
| Estate Settlement Organizer | `pm-estate` | `pm-estate/estate-settlement-organizer/agent.json` |
| Eulogy & Obituary Writer | `pm-grief` | `pm-grief/eulogy-and-obituary-writer/agent.json` |
| Eulogy Writer | `pm-lifeadmin` | `pm-lifeadmin/eulogy-writer/agent.json` |
| Euthanasia Conversation | `pm-veterinary` | `pm-veterinary/euthanasia-conversation/agent.json` |
| EV vs Gas | `pm-calculators` | `pm-calculators/ev-vs-gas/agent.json` |
| Eval Rubric Designer | `pm-ai` | `pm-ai/eval-rubric-designer/agent.json` |
| Event Budget Plan | `pm-events` | `pm-events/event-budget-plan/agent.json` |
| Event Run of Show | `pm-events` | `pm-events/event-run-of-show/agent.json` |
| Event Safety Plan | `pm-events` | `pm-events/event-safety-plan/agent.json` |
| Event Vendor Brief | `pm-events` | `pm-events/event-vendor-brief/agent.json` |
| Evidence Grading | `pm-cowork` | `pm-cowork/evidence-grading/agent.json` |
| Evidence Lock | `pm-research` | `pm-research/evidence-lock/agent.json` |
| EVT/DVT/PVT Gate Review | `pm-hardware` | `pm-hardware/evt-dvt-pvt-gate-review/agent.json` |
| Exam Prep Planner | `pm-students` | `pm-students/exam-prep-planner/agent.json` |
| Exam Study Plan | `pm-students` | `pm-students/exam-study-plan/agent.json` |
| Excel Model | `pm-documents` | `pm-documents/excel-model/agent.json` |
| Exec Vs Working Deck | `pm-cowork` | `pm-cowork/exec-vs-working-deck/agent.json` |
| Executing Plans | `pm-method` | `pm-method/executing-plans/agent.json` |
| Executive CV | `pm-cv` | `pm-cv/executive-cv/agent.json` |
| Executive Presence | `pm-comms` | `pm-comms/executive-presence/agent.json` |
| Executive Summary | `pm-cross` | `pm-cross/executive-summary/agent.json` |
| Executive Update | `pm-strategy` | `pm-strategy/executive-update/agent.json` |
| Exit Interview Strategy | `pm-resignation` | `pm-resignation/exit-interview-strategy/agent.json` |
| Exit Waterfall | `pm-calculators` | `pm-calculators/exit-waterfall/agent.json` |
| Expense Audit | `pm-money` | `pm-money/expense-audit/agent.json` |
| Expense Discipline | `pm-cowork` | `pm-cowork/expense-discipline/agent.json` |
| Expense Filer | `pm-operator` | `pm-operator/expense-filer/agent.json` |
| Expense Policy | `pm-accounting` | `pm-accounting/expense-policy/agent.json` |
| Expense Sheet Design | `pm-cowork` | `pm-cowork/expense-sheet-design/agent.json` |
| Experiment Designer | `pm-advanced` | `pm-advanced/experiment-designer/agent.json` |
| Experiment Readout | `pm-dataeng` | `pm-dataeng/experiment-readout/agent.json` |
| Expert Interview Prep | `pm-cowork` | `pm-cowork/expert-interview-prep/agent.json` |
| Explain My Decision To Me | `pm-thinking` | `pm-thinking/explain-my-decision-to-me/agent.json` |
| Explain Simply | `pm-comms` | `pm-comms/explain-simply/agent.json` |
| Exploratory Test Charter | `pm-qa` | `pm-qa/exploratory-test-charter/agent.json` |
| Explorer Interface Brief | `pm-3d-explorer` | `pm-3d-explorer/explorer-interface-brief/agent.json` |
| Explorer Pipeline | `pm-3d-explorer` | `pm-3d-explorer/explorer-pipeline/agent.json` |
| Explorer Viewer Builder | `pm-3d-explorer` | `pm-3d-explorer/explorer-viewer-builder/agent.json` |
| Expungement Navigator | `pm-reentry` | `pm-reentry/expungement-navigator/agent.json` |
| Fact-Check Pass | `pm-journalism` | `pm-journalism/fact-check-pass/agent.json` |
| Factory Acceptance Test | `pm-hardware` | `pm-hardware/factory-acceptance-test/agent.json` |
| Fair Split | `pm-calculators` | `pm-calculators/fair-split/agent.json` |
| Faith Transition Companion | `pm-identity` | `pm-identity/faith-transition-companion/agent.json` |
| Family Cookbook Archivist | `pm-family` | `pm-family/family-cookbook-archivist/agent.json` |
| Family Emergency Plan | `pm-family` | `pm-family/family-emergency-plan/agent.json` |
| Fantasy League Drafter | `pm-hobbies` | `pm-hobbies/fantasy-league-drafter/agent.json` |
| FAQ Builder | `pm-cowork` | `pm-cowork/faq-builder/agent.json` |
| Farm Buyer Contract Check | `pm-agriculture` | `pm-agriculture/farm-buyer-contract-check/agent.json` |
| Farm Records Book | `pm-agriculture` | `pm-agriculture/farm-records-book/agent.json` |
| Farm Subsidy Application | `pm-agriculture` | `pm-agriculture/farm-subsidy-application/agent.json` |
| Feature Flag Guide | `pm-engineering` | `pm-engineering/feature-flag-guide/agent.json` |
| Feature Prioritisation | `pm-planning` | `pm-planning/feature-prioritisation/agent.json` |
| Feature Sunset Plan | `pm-planning` | `pm-planning/feature-sunset-plan/agent.json` |
| Federal Resume | `pm-cv` | `pm-cv/federal-resume/agent.json` |
| Feishu Doc Writer (飞书文档) | `pm-china-work` | `pm-china-work/feishu-doc-writer/agent.json` |
| Feynman Explainer | `pm-learning` | `pm-learning/feynman-explainer/agent.json` |
| Figma Annotation Guide | `pm-figma` | `pm-figma/figma-annotation-guide/agent.json` |
| Figma Component Audit | `pm-figma` | `pm-figma/figma-component-audit/agent.json` |
| Figma Design Brief | `pm-figma` | `pm-figma/figma-design-brief/agent.json` |
| Figma Design Critique — PM Perspective | `pm-figma` | `pm-figma/figma-design-critique-pm/agent.json` |
| Figma Design QA | `pm-figma` | `pm-figma/figma-design-qa/agent.json` |
| Figma Design Review | `pm-figma` | `pm-figma/figma-design-review/agent.json` |
| Figma Prototype Plan | `pm-figma` | `pm-figma/figma-prototype-plan/agent.json` |
| Figma Spacing System | `pm-figma` | `pm-figma/figma-spacing-system/agent.json` |
| Figma User Flow Planner | `pm-figma` | `pm-figma/figma-user-flow-planner/agent.json` |
| Figma Variant Matrix | `pm-figma` | `pm-figma/figma-variant-matrix/agent.json` |
| File Access Preflight | `pm-seatbelt` | `pm-seatbelt/file-access-preflight/agent.json` |
| Filename Convention | `pm-cowork` | `pm-cowork/filename-convention/agent.json` |
| Financial Aid Appeal | `pm-students` | `pm-students/financial-aid-appeal/agent.json` |
| Financial Checkup | `pm-wealth` | `pm-wealth/financial-checkup/agent.json` |
| Financial Due Diligence | `pm-finance` | `pm-finance/financial-due-diligence/agent.json` |
| Financial-Independence Roadmap | `pm-wealth` | `pm-wealth/financial-independence-roadmap/agent.json` |
| Financial Model Narrative | `pm-finance` | `pm-finance/financial-model-narrative/agent.json` |
| Financial Statement Explainer | `pm-accounting` | `pm-accounting/financial-statement-explainer/agent.json` |
| Fine Appeal Letter | `pm-lifeadmin` | `pm-lifeadmin/fine-appeal-letter/agent.json` |
| FIRE Number | `pm-calculators` | `pm-calculators/fire-number/agent.json` |
| First 100k Plan | `pm-wealth` | `pm-wealth/first-100k-plan/agent.json` |
| First 90 Days Out | `pm-reentry` | `pm-reentry/first-90-days-out/agent.json` |
| First Client Contract | `pm-sidehustle` | `pm-sidehustle/first-client-contract/agent.json` |
| First-Hire Plan | `pm-career` | `pm-career/first-hire-plan/agent.json` |
| First Issue Designer | `pm-oss-launch` | `pm-oss-launch/first-issue-designer/agent.json` |
| First Maintainer Month | `pm-maintainer` | `pm-maintainer/first-maintainer-month/agent.json` |
| Five Minds | `pm-thinking` | `pm-thinking/five-minds/agent.json` |
| Flare Day Planner | `pm-invisible-illness` | `pm-invisible-illness/flare-day-planner/agent.json` |
| Fleet Compliance Audit Preparation | `pm-fleet` | `pm-fleet/fleet-compliance-audit-prep/agent.json` |
| Fleet Maintenance Programme | `pm-fleet` | `pm-fleet/fleet-maintenance-programme/agent.json` |
| Flight-Delay Compensation | `pm-lifeadmin` | `pm-lifeadmin/flight-delay-compensation/agent.json` |
| Flight Tracker | `pm-live` | `pm-live/flight-tracker/agent.json` |
| Flow Metrics Interpreter | `pm-delivery` | `pm-delivery/flow-metrics-interpreter/agent.json` |
| Flowchart | `pm-visuals` | `pm-visuals/flowchart/agent.json` |
| FOIA / Public-Records Request | `pm-gov` | `pm-gov/foia-request/agent.json` |
| Folder Structure Designer | `pm-cowork` | `pm-cowork/folder-structure-designer/agent.json` |
| Follow-Up Chaser | `pm-cowork` | `pm-cowork/follow-up-chaser/agent.json` |
| Follow-Up Sequence | `pm-jobsearch` | `pm-jobsearch/follow-up-sequence/agent.json` |
| Follow-up Sweep (Live) | `pm-cowork-live` | `pm-cowork-live/followup-sweep/agent.json` |
| Form Explainer | `pm-decoders` | `pm-decoders/form-explainer/agent.json` |
| Form Filler Operator | `pm-operator` | `pm-operator/form-filler-operator/agent.json` |
| Formula Detangler | `pm-cowork` | `pm-cowork/formula-detangler/agent.json` |
| Fortnightly Release Planner | `pm-oss-launch` | `pm-oss-launch/fortnightly-release-planner/agent.json` |
| Founder-Market Fit | `pm-founders` | `pm-founders/founder-market-fit/agent.json` |
| Franchise Decoder | `pm-decoders` | `pm-decoders/franchise-decoder/agent.json` |
| Franklin Decision Ledger | `pm-dead-mentors` | `pm-dead-mentors/franklin-decision-ledger/agent.json` |
| Freelance Rate | `pm-calculators` | `pm-calculators/freelance-rate/agent.json` |
| Freight Rate Quote | `pm-fleet` | `pm-fleet/freight-rate-quote/agent.json` |
| From First Principles | `pm-thinking` | `pm-thinking/from-first-principles/agent.json` |
| Frontend Design | `pm-design` | `pm-design/frontend-design/agent.json` |
| Frontend Design (pointer) | `pm-design-taste` | `pm-design-taste/frontend-design-pointer/agent.json` |
| Functional Assessment Prep | `pm-accessibility` | `pm-accessibility/functional-assessment-prep/agent.json` |
| Fundraising FAQ | `pm-founders` | `pm-founders/fundraising-faq/agent.json` |
| Funeral Pricing Decoder | `pm-decoders` | `pm-decoders/funeral-pricing-decoder/agent.json` |
| Future Self Interview | `other` | `other/future-self-interview/agent.json` |
| Future Selves Council | `pm-thinking` | `pm-thinking/future-selves-council/agent.json` |
| Game Night Planner | `pm-tabletop` | `pm-tabletop/game-night-planner/agent.json` |
| Gantt / Roadmap | `pm-visuals` | `pm-visuals/gantt-roadmap/agent.json` |
| GDPR Compliance | `pm-compliance` | `pm-compliance/gdpr-compliance/agent.json` |
| Generate, Then Execute | `pm-thinking` | `pm-thinking/generate-then-execute/agent.json` |
| Get More From AI | `pm-ai-native` | `pm-ai-native/get-more-from-ai/agent.json` |
| Gift-Card Recovery | `pm-money` | `pm-money/gift-card-recovery/agent.json` |
| Gift Finder | `pm-personal` | `pm-personal/gift-finder/agent.json` |
| Git Troubleshooter | `pm-engineering` | `pm-engineering/git-troubleshooter/agent.json` |
| GitHub Repo Vitals | `pm-live` | `pm-live/github-repo-vitals/agent.json` |
| Give Hard Feedback Kindly | `other` | `other/give-hard-feedback-kindly/agent.json` |
| Giving Feedback | `pm-comms` | `pm-comms/giving-feedback/agent.json` |
| Glossary Builder | `pm-localization` | `pm-localization/glossary-builder/agent.json` |
| Go-Bag Builder | `pm-emergency` | `pm-emergency/go-bag-builder/agent.json` |
| Go-To-Market | `pm-gtm` | `pm-gtm/go-to-market/agent.json` |
| Go-to-Market Planner | `pm-delivery` | `pm-delivery/go-to-market-planner/agent.json` |
| Good-Enough Detector | `pm-focus` | `pm-focus/good-enough-detector/agent.json` |
| Graduate CV | `pm-cv` | `pm-cv/graduate-cv/agent.json` |
| Grant Proposal | `pm-cross` | `pm-cross/grant-proposal/agent.json` |
| Gratitude Practice | `pm-wellbeing` | `pm-wellbeing/gratitude-practice/agent.json` |
| Greenwashing Self-Audit | `pm-climate` | `pm-climate/greenwashing-self-audit/agent.json` |
| Grief Admin | `other` | `other/grief-admin/agent.json` |
| Grieving at Work | `pm-grief` | `pm-grief/grieving-at-work/agent.json` |
| Grocery Budget Audit | `pm-kitchen` | `pm-kitchen/grocery-budget-audit/agent.json` |
| Group Trip Negotiator | `other` | `other/group-trip-negotiator/agent.json` |
| Growth Experiment Backlog | `pm-growth` | `pm-growth/growth-experiment-backlog/agent.json` |
| Guest Incident Log | `pm-hospitality` | `pm-hospitality/guest-incident-log/agent.json` |
| Gulf Job Offer Check | `pm-mena` | `pm-mena/gulf-job-offer-check/agent.json` |
| Gulf Residence Visa Admin | `pm-mena` | `pm-mena/gulf-residence-visa-admin/agent.json` |
| Habit Builder | `pm-wellbeing` | `pm-wellbeing/habit-builder/agent.json` |
| Handbook Page | `pm-cowork` | `pm-cowork/handbook-page/agent.json` |
| Hardware PRD | `pm-hardware` | `pm-hardware/hardware-prd/agent.json` |
| Hazard Risk Map | `pm-emergency` | `pm-emergency/hazard-risk-map/agent.json` |
| Headline Options | `pm-copy` | `pm-copy/headline-options/agent.json` |
| Health Inspection Prep | `pm-hospitality` | `pm-hospitality/health-inspection-prep/agent.json` |
| Healthcare System Primer | `pm-newcomer` | `pm-newcomer/healthcare-system-primer/agent.json` |
| Help Center Article | `pm-support` | `pm-support/help-center-article/agent.json` |
| Hidden-Fee Auditor | `pm-money` | `pm-money/hidden-fee-auditor/agent.json` |
| HIPAA Safeguards | `pm-compliance` | `pm-compliance/hipaa-safeguards/agent.json` |
| Hire or Pass | `pm-decisions` | `pm-decisions/hire-or-pass/agent.json` |
| Hiring Rubric | `pm-people` | `pm-people/hiring-rubric/agent.json` |
| Hong Kong Cantonese Copy (香港粵語文案) | `pm-hk-tw` | `pm-hk-tw/hk-cantonese-copy/agent.json` |
| Hong Kong MPF Explainer (強積金) | `pm-hk-tw` | `pm-hk-tw/hk-mpf-explainer/agent.json` |
| HN Digest | `pm-live` | `pm-live/hn-digest/agent.json` |
| HOA Decoder | `pm-decoders` | `pm-decoders/hoa-decoder/agent.json` |
| HOA Violation Response | `pm-legal` | `pm-legal/hoa-violation-response/agent.json` |
| Hobby Starter Kit | `pm-hobbies` | `pm-hobbies/hobby-starter-kit/agent.json` |
| Home Contractor Quote Decoder | `pm-decoders` | `pm-decoders/home-contractor-quote-decoder/agent.json` |
| Home Energy Savings | `pm-lifeadmin` | `pm-lifeadmin/home-energy-savings/agent.json` |
| Home-Inspection Decoder | `pm-lifeadmin` | `pm-lifeadmin/home-inspection-decoder/agent.json` |
| Home-Maintenance Calendar | `pm-lifeadmin` | `pm-lifeadmin/home-maintenance-calendar/agent.json` |
| Home Workout Builder | `pm-wellbeing` | `pm-wellbeing/home-workout-builder/agent.json` |
| Hook Writer | `pm-creator` | `pm-creator/hook-writer/agent.json` |
| Hospital-Stay Plan | `pm-caregiving` | `pm-caregiving/hospital-stay-plan/agent.json` |
| Driver Hours Compliance Check | `pm-fleet` | `pm-fleet/hours-of-service-check/agent.json` |
| House Style Enforcer | `pm-cowork` | `pm-cowork/house-style-enforcer/agent.json` |
| Household Constitution | `pm-family` | `pm-family/household-constitution/agent.json` |
| Houseplant Care | `pm-hobbies` | `pm-hobbies/houseplant-care/agent.json` |
| Housing With a Record | `pm-reentry` | `pm-reentry/housing-with-a-record/agent.json` |
| 新马华文商务写作 (Singapore and Malaysia Chinese business writing) | `pm-sea` | `pm-sea/huawen-business-writing/agent.json` |
| Human-in-the-Loop Design | `pm-agentnative` | `pm-agentnative/human-in-the-loop-design/agent.json` |
| Hydration & Energy Plan | `pm-wellbeing` | `pm-wellbeing/hydration-and-energy-plan/agent.json` |
| Hyperfocus Exit | `pm-focus` | `pm-focus/hyperfocus-exit/agent.json` |
| i18n Readiness Review | `pm-localization` | `pm-localization/i18n-readiness-review/agent.json` |
| Idea Storm | `pm-thinking` | `pm-thinking/idea-storm/agent.json` |
| Identity Theft Recovery | `pm-digital-safety` | `pm-digital-safety/identity-theft-recovery/agent.json` |
| IEP 504 Meeting Kit | `pm-parents` | `pm-parents/iep-504-meeting-kit/agent.json` |
| IEP Goal Support | `pm-education` | `pm-education/iep-goal-support/agent.json` |
| IEP Goal Writer | `pm-teaching` | `pm-teaching/iep-goal-writer/agent.json` |
| Immigration Document Checklist | `pm-personal` | `pm-personal/immigration-document-checklist/agent.json` |
| Impact Report | `pm-nonprofit` | `pm-nonprofit/impact-report/agent.json` |
| Impeccable (pointer) | `pm-design-taste` | `pm-design-taste/impeccable-pointer/agent.json` |
| Importer Scaffolder | `pm-oss-launch` | `pm-oss-launch/importer-scaffolder/agent.json` |
| EPF Withdrawal Guide (India) | `pm-india` | `pm-india/in-epf-withdrawal-guide/agent.json` |
| Gratuity Calculator (India) | `pm-india` | `pm-india/in-gratuity-calculator/agent.json` |
| GST Return Explainer (India) | `pm-india` | `pm-india/in-gst-return-explainer/agent.json` |
| Income Tax Regime Chooser (India) | `pm-india` | `pm-india/in-income-tax-regime-chooser/agent.json` |
| Labour Codes Decoder (India) | `pm-india` | `pm-india/in-labour-codes-decoder/agent.json` |
| In-Law Boundary Scripts | `pm-family` | `pm-family/in-law-boundary-scripts/agent.json` |
| Notice Period and Full and Final Settlement (India) | `pm-india` | `pm-india/in-notice-period-fnf-settlement/agent.json` |
| Inbox Triage (Live) | `pm-cowork-live` | `pm-cowork-live/inbox-triage-live/agent.json` |
| Inbox Unsubscribe Purge | `pm-cowork` | `pm-cowork/inbox-unsubscribe-purge/agent.json` |
| Inbox Zero Operator | `pm-operator` | `pm-operator/inbox-zero-operator/agent.json` |
| Incident Postmortem | `pm-engineering` | `pm-engineering/incident-postmortem/agent.json` |
| Incident Public Statement | `pm-crisis` | `pm-crisis/incident-public-statement/agent.json` |
| Incremental Implementation | `pm-method` | `pm-method/incremental-implementation/agent.json` |
| Index-Fund Starter | `pm-wealth` | `pm-wealth/index-fund-starter/agent.json` |
| Influencer Brief | `pm-social` | `pm-social/influencer-brief/agent.json` |
| Informational-Interview Prep | `pm-career` | `pm-career/informational-interview-prep/agent.json` |
| Infrastructure-as-Code Review | `pm-engineering` | `pm-engineering/infra-as-code-review/agent.json` |
| Injection Spotter | `pm-seatbelt` | `pm-seatbelt/injection-spotter/agent.json` |
| Inspection Report Decoder | `pm-decoders` | `pm-decoders/inspection-report-decoder/agent.json` |
| Instagram Post Downloader | `pm-writers` | `pm-writers/instagram-post-downloader/agent.json` |
| Insurance Claim | `pm-lifeadmin` | `pm-lifeadmin/insurance-claim/agent.json` |
| Insurance Claim Appeal | `pm-insurance` | `pm-insurance/insurance-claim-appeal/agent.json` |
| Insurance Policy Decoder | `pm-decoders` | `pm-decoders/insurance-policy-decoder/agent.json` |
| Interrupt Rules | `pm-duet` | `pm-duet/interrupt-rules/agent.json` |
| Interview Me | `pm-method` | `pm-method/interview-me/agent.json` |
| Interview Prep | `pm-jobsearch` | `pm-jobsearch/interview-prep/agent.json` |
| Interview Question Bank | `pm-recruiting` | `pm-recruiting/interview-question-bank/agent.json` |
| Interview Synthesis | `pm-cowork` | `pm-cowork/interview-synthesis/agent.json` |
| Inventory Policy | `pm-supplychain` | `pm-supplychain/inventory-policy/agent.json` |
| Inversion Thinking | `pm-thinking` | `pm-thinking/inversion-thinking/agent.json` |
| Investing for Beginners | `pm-wealth` | `pm-wealth/investing-for-beginners/agent.json` |
| Investing Policy Statement | `pm-money` | `pm-money/investing-policy-statement/agent.json` |
| Investing Vocabulary Explainer | `pm-investing-literacy` | `pm-investing-literacy/investing-vocabulary-explainer/agent.json` |
| Investment-Account Picker | `pm-wealth` | `pm-wealth/investment-account-picker/agent.json` |
| Investor Cold Email | `pm-founders` | `pm-founders/investor-cold-email/agent.json` |
| Investor Pitch Deck | `pm-finance` | `pm-finance/investor-pitch-deck/agent.json` |
| Investor Update | `pm-business` | `pm-business/investor-update/agent.json` |
| Invoice Generator | `pm-accounting` | `pm-accounting/invoice-generator/agent.json` |
| IP Lookup | `pm-live` | `pm-live/ip-lookup/agent.json` |
| Is This Actually Good | `pm-thinking` | `pm-thinking/is-this-actually-good/agent.json` |
| ISO 27001 ISMS | `pm-compliance` | `pm-compliance/iso-27001-isms/agent.json` |
| ISS Tracker | `pm-live` | `pm-live/iss-tracker/agent.json` |
| Issue Triage (Live) | `pm-cowork-live` | `pm-cowork-live/issue-triage-live/agent.json` |
| JD Decoder | `pm-jobsearch` | `pm-jobsearch/jd-decoder/agent.json` |
| JD Gap Score | `pm-cv` | `pm-cv/jd-gap-score/agent.json` |
| Job Application | `pm-business` | `pm-business/job-application/agent.json` |
| Job Description Writer | `pm-hr` | `pm-hr/job-description-writer/agent.json` |
| Job Search With a Record | `pm-reentry` | `pm-reentry/job-search-with-a-record/agent.json` |
| Job Story Mapper | `pm-discovery` | `pm-discovery/job-story-mapper/agent.json` |
| Journaling Prompts | `pm-wellbeing` | `pm-wellbeing/journaling-prompts/agent.json` |
| Japan Resignation Procedures (退職の手続き) | `pm-japan` | `pm-japan/jp-resignation-procedures/agent.json` |
| Japanese Approval Request (稟議書) | `pm-japan` | `pm-japan/jp-ringisho/agent.json` |
| Japan Tax Return (確定申告) | `pm-japan` | `pm-japan/jp-tax-return/agent.json` |
| Japan Year-End Tax Adjustment (年末調整) | `pm-japan` | `pm-japan/jp-year-end-adjustment/agent.json` |
| Jury Duty Guide | `pm-legal` | `pm-legal/jury-duty-guide/agent.json` |
| Jury Duty Navigator | `pm-civic` | `pm-civic/jury-duty-navigator/agent.json` |
| Karaoke Song Picker | `pm-hobbies` | `pm-hobbies/karaoke-song-picker/agent.json` |
| Knowledge Base Audit | `pm-support` | `pm-support/kb-audit/agent.json` |
| M-Pesa Reversal and Dispute (Kenya) | `pm-africa` | `pm-africa/ke-mpesa-reversal-dispute/agent.json` |
| Kenyan Payslip Decoder | `pm-africa` | `pm-africa/ke-payslip-decoder/agent.json` |
| Kids' Online-Safety Plan | `pm-digital-safety` | `pm-digital-safety/kids-online-safety-plan/agent.json` |
| Knowledge-Gap Map | `pm-learning` | `pm-learning/knowledge-gap-map/agent.json` |
| Knowledge Gardening | `pm-cowork` | `pm-cowork/knowledge-gardening/agent.json` |
| KPI Tracker Design | `pm-cowork` | `pm-cowork/kpi-tracker-design/agent.json` |
| Korean Job Application Essay (자기소개서) | `pm-korea` | `pm-korea/kr-cover-letter/agent.json` |
| Korea Severance Pay (퇴직금) | `pm-korea` | `pm-korea/kr-severance-pay/agent.json` |
| Korean Business Report (보고서 and 주간보고) | `pm-korea` | `pm-korea/kr-work-report/agent.json` |
| Korea Year-End Tax Settlement (연말정산) | `pm-korea` | `pm-korea/kr-year-end-tax-settlement/agent.json` |
| KSA Labour Contract Decoder | `pm-mena` | `pm-mena/ksa-labour-contract-decoder/agent.json` |
| KYC Escalation | `pm-banking` | `pm-banking/kyc-escalation/agent.json` |
| Landing Page Copy | `pm-copy` | `pm-copy/landing-page-copy/agent.json` |
| Language-Learning Plan | `pm-students` | `pm-students/language-learning-plan/agent.json` |
| Last 30 Days Research | `pm-cross` | `pm-cross/last-30-days-research/agent.json` |
| Last Two Weeks Handoff | `pm-resignation` | `pm-resignation/last-two-weeks-handoff/agent.json` |
| Late-Invoice Chaser | `pm-freelance` | `pm-freelance/late-invoice-chaser/agent.json` |
| Late Invoice Escalation | `pm-freelance` | `pm-freelance/late-invoice-escalation/agent.json` |
| Launch Post | `pm-devrel` | `pm-devrel/launch-post/agent.json` |
| Launch Readiness | `pm-delivery` | `pm-delivery/launch-readiness/agent.json` |
| Launch Tiering Framework | `pm-pmm` | `pm-pmm/launch-tiering-framework/agent.json` |
| Layoff Announcement | `pm-layoff` | `pm-layoff/layoff-announcement/agent.json` |
| Layoff Communication | `pm-crisis` | `pm-crisis/layoff-communication/agent.json` |
| Layoff Financial Triage | `pm-layoff` | `pm-layoff/layoff-financial-triage/agent.json` |
| Layoff: First 72 Hours | `pm-career` | `pm-career/layoff-first-72-hours/agent.json` |
| Learn-Anything Roadmap | `pm-learning` | `pm-learning/learn-anything-roadmap/agent.json` |
| Learn From a Project | `pm-learning` | `pm-learning/learn-from-a-project/agent.json` |
| Lease Decoder | `pm-decoders` | `pm-decoders/lease-decoder/agent.json` |
| Legacy Letter | `other` | `other/legacy-letter/agent.json` |
| Legal Brief | `pm-legal` | `pm-legal/legal-brief/agent.json` |
| Lemon Law Check | `pm-legal` | `pm-legal/lemon-law-check/agent.json` |
| Lending Risk Brief | `pm-banking` | `pm-banking/lending-risk-brief/agent.json` |
| Lesson Plan | `pm-education` | `pm-education/lesson-plan/agent.json` |
| Lesson Plan Builder | `pm-teaching` | `pm-teaching/lesson-plan-builder/agent.json` |
| Licence and Notice Auditor | `pm-oss-launch` | `pm-oss-launch/licence-notice-auditor/agent.json` |
| Life Premortem | `other` | `other/life-premortem/agent.json` |
| Lifecycle / CRM Plan | `pm-growth` | `pm-growth/lifecycle-crm-plan/agent.json` |
| LinkedIn Profile | `pm-personal` | `pm-personal/linkedin-profile/agent.json` |
| Literature Review | `pm-research` | `pm-research/literature-review/agent.json` |
| Literature Review Builder | `pm-students` | `pm-students/literature-review-builder/agent.json` |
| Livestream Sales Script (直播带货) | `pm-zh-content` | `pm-zh-content/livestream-sales-script/agent.json` |
| LLM Cost & Latency Budget | `pm-ai` | `pm-ai/llm-cost-latency-budget/agent.json` |
| LLM Guardrails Spec | `pm-ai` | `pm-ai/llm-guardrails-spec/agent.json` |
| Load Testing Plan | `pm-engineering` | `pm-engineering/load-testing-plan/agent.json` |
| Loan Covenant Review | `pm-banking` | `pm-banking/loan-covenant-review/agent.json` |
| Loan Decoder | `pm-decoders` | `pm-decoders/loan-decoder/agent.json` |
| Local Dev Setup | `pm-engineering` | `pm-engineering/local-dev-setup/agent.json` |
| Localization Brief | `pm-localization` | `pm-localization/localization-brief/agent.json` |
| Logistics Incident Report | `pm-supplychain` | `pm-supplychain/logistics-incident-report/agent.json` |
| Long-Distance Relationship Plan | `pm-family` | `pm-family/long-distance-relationship-plan/agent.json` |
| Long-Term Care Options | `pm-caregiving` | `pm-caregiving/long-term-care-options/agent.json` |
| Lost Documents Replacement | `pm-emergency` | `pm-emergency/lost-documents-replacement/agent.json` |
| Love-Letter Helper | `pm-family` | `pm-family/love-letter-helper/agent.json` |
| Lower My Bill | `pm-money` | `pm-money/lower-my-bill/agent.json` |
| Machiavelli Counsel | `pm-dead-mentors` | `pm-dead-mentors/machiavelli-counsel/agent.json` |
| Maintainer Triage | `pm-maintainer` | `pm-maintainer/maintainer-triage/agent.json` |
| Make Friends as an Adult | `other` | `other/make-friends-as-an-adult/agent.json` |
| Make Me a | `pm-focus` | `pm-focus/make-me-a-skill/agent.json` |
| Malaysia EPF Explainer (KWSP) | `pm-sea` | `pm-sea/malaysia-epf-explainer/agent.json` |
| Manager First 90 Days | `pm-people` | `pm-people/manager-first-90-days/agent.json` |
| Managing Up | `pm-comms` | `pm-comms/managing-up/agent.json` |
| Market Stall Pricing | `pm-sidehustle` | `pm-sidehustle/market-stall-pricing/agent.json` |
| Marketing Funnel Plan | `pm-growth` | `pm-growth/marketing-funnel-plan/agent.json` |
| Marketing Psychology | `pm-growth` | `pm-growth/marketing-psychology/agent.json` |
| Marketplace Listing Optimizer | `pm-ecommerce` | `pm-ecommerce/marketplace-listing-optimizer/agent.json` |
| Masking Budget | `pm-neurodivergent` | `pm-neurodivergent/masking-budget/agent.json` |
| Match Review | `pm-sports-coaching` | `pm-sports-coaching/match-review/agent.json` |
| MCP Server Spec | `pm-agentnative` | `pm-agentnative/mcp-server-spec/agent.json` |
| Meal Prep OS | `pm-kitchen` | `pm-kitchen/meal-prep-os/agent.json` |
| Mechanic Quote Decoder | `other` | `other/mechanic-quote-decoder/agent.json` |
| Media Pitch | `pm-gtm` | `pm-gtm/media-pitch/agent.json` |
| Medical-Appointment Advocate | `pm-caregiving` | `pm-caregiving/medical-appointment-advocate/agent.json` |
| Medical Bill Decoder | `pm-decoders` | `pm-decoders/medical-bill-decoder/agent.json` |
| Medical Records Request | `pm-lifeadmin` | `pm-lifeadmin/medical-records-request/agent.json` |
| Medication-Management System | `pm-caregiving` | `pm-caregiving/medication-management-system/agent.json` |
| Medication Therapy Review | `pm-pharmacy` | `pm-pharmacy/medication-therapy-review/agent.json` |
| Meeting Action Extractor | `pm-essentials` | `pm-essentials/meeting-action-extractor/agent.json` |
| Meeting Cost Meter | `pm-cowork` | `pm-cowork/meeting-cost-meter/agent.json` |
| Meeting Notes | `pm-essentials` | `pm-essentials/meeting-notes/agent.json` |
| Meeting Prep (Live) | `pm-cowork-live` | `pm-cowork-live/meeting-prep-live/agent.json` |
| Meeting Prep Pack | `pm-cowork` | `pm-cowork/meeting-prep-pack/agent.json` |
| Meeting Room Etiquette | `pm-cowork` | `pm-cowork/meeting-room-etiquette/agent.json` |
| Meltdown Map | `pm-neurodivergent` | `pm-neurodivergent/meltdown-map/agent.json` |
| Memoir Story Capture | `pm-writers` | `pm-writers/memoir-story-capture/agent.json` |
| Memory-File Maintenance | `pm-ai-native` | `pm-ai-native/memory-file-maintenance/agent.json` |
| Menu Cost Engineer | `pm-hospitality` | `pm-hospitality/menu-cost-engineer/agent.json` |
| Message for the Moment | `pm-comms` | `pm-comms/message-for-the-moment/agent.json` |
| Messaging Framework | `pm-growth` | `pm-growth/messaging-framework/agent.json` |
| Metric Gaslighting Detector | `pm-warroom` | `pm-warroom/metric-gaslighting-detector/agent.json` |
| Metric Semantic Layer | `pm-dataeng` | `pm-dataeng/metric-semantic-layer/agent.json` |
| Metric Tree Builder | `pm-data` | `pm-data/metric-tree-builder/agent.json` |
| Metrics Framework | `pm-data` | `pm-data/metrics-framework/agent.json` |
| Micro Retirement Planner | `pm-newgen` | `pm-newgen/micro-retirement-planner/agent.json` |
| Microcopy Writer | `pm-uxwriting` | `pm-uxwriting/microcopy-writer/agent.json` |
| Microloan Comparison | `pm-money` | `pm-money/microloan-comparison/agent.json` |
| Microservices Decomposition | `pm-engineering` | `pm-engineering/microservices-decomposition/agent.json` |
| Migration Day Runbook | `pm-cowork` | `pm-cowork/migration-day-runbook/agent.json` |
| Mind Map | `pm-visuals` | `pm-visuals/mind-map/agent.json` |
| Model Card | `pm-ai` | `pm-ai/model-card/agent.json` |
| Model Migration Plan | `pm-agentops` | `pm-agentops/model-migration-plan/agent.json` |
| Model Prompt Pack | `pm-3d-explorer` | `pm-3d-explorer/model-prompt-pack/agent.json` |
| Model Selection Advisor | `pm-ai` | `pm-ai/model-selection-advisor/agent.json` |
| Momentum Map | `pm-focus` | `pm-focus/momentum-map/agent.json` |
| Money Mindset Reset | `pm-wealth` | `pm-wealth/money-mindset-reset/agent.json` |
| Money Priorities Order | `pm-money` | `pm-money/money-priorities-order/agent.json` |
| Monitoring Setup Guide | `pm-engineering` | `pm-engineering/monitoring-setup-guide/agent.json` |
| Morning Brief Designer | `pm-duet` | `pm-duet/morning-brief-designer/agent.json` |
| Morning Intelligence | `pm-operations` | `pm-operations/morning-intelligence/agent.json` |
| Moving Company Estimate Decoder | `pm-decoders` | `pm-decoders/moving-company-estimate-decoder/agent.json` |
| Moving House Checklist | `pm-lifeadmin` | `pm-lifeadmin/moving-house-checklist/agent.json` |
| Moving-Quote Decoder | `pm-lifeadmin` | `pm-lifeadmin/moving-quote-decoder/agent.json` |
| Multi-Source Signal Synthesiser | `pm-advanced` | `pm-advanced/multi-source-signal-synthesiser/agent.json` |
| Declaración Anual Prep (Mexico) | `pm-latam` | `pm-latam/mx-declaracion-anual-prep/agent.json` |
| Finiquito y Liquidación (Mexico) | `pm-latam` | `pm-latam/mx-finiquito-liquidacion/agent.json` |
| My Energy Map | `pm-focus` | `pm-focus/my-energy-map/agent.json` |
| My Failure Museum | `pm-focus` | `pm-focus/my-failure-museum/agent.json` |
| Name Change Navigator | `pm-identity` | `pm-identity/name-change-navigator/agent.json` |
| Name What I'm Feeling | `pm-focus` | `pm-focus/name-what-im-feeling/agent.json` |
| NDA Analyser | `pm-legal` | `pm-legal/nda-analyser/agent.json` |
| Neighbor-Dispute Resolver | `pm-lifeadmin` | `pm-lifeadmin/neighbor-dispute-resolver/agent.json` |
| Net Worth Statement | `pm-money` | `pm-money/net-worth-statement/agent.json` |
| Networking for Introverts | `other` | `other/networking-for-introverts/agent.json` |
| Networking Outreach | `pm-career` | `pm-career/networking-outreach/agent.json` |
| New-Baby Logistics | `pm-family` | `pm-family/new-baby-logistics/agent.json` |
| New Manager: First 90 Days | `pm-career` | `pm-career/new-manager-first-90-days/agent.json` |
| New Parent Logistics | `pm-lifeadmin` | `pm-lifeadmin/new-parent-logistics/agent.json` |
| Newcomer School Enrolment | `pm-newcomer` | `pm-newcomer/newcomer-school-enrolment/agent.json` |
| Newsletter Digest Brief | `pm-cowork` | `pm-cowork/newsletter-digest-brief/agent.json` |
| Newsletter Writer | `pm-creator` | `pm-creator/newsletter-writer/agent.json` |
| Nigerian Payslip Decoder | `pm-africa` | `pm-africa/ng-payslip-decoder/agent.json` |
| Nigerian Pension RSA Guide | `pm-africa` | `pm-africa/ng-pension-rsa-guide/agent.json` |
| Note-Taking System | `pm-learning` | `pm-learning/note-taking-system/agent.json` |
| NotebookLM Connector | `pm-cross` | `pm-cross/notebooklm-connector/agent.json` |
| Notes Humanizer | `pm-writers` | `pm-writers/notes-humanizer/agent.json` |
| Notify Everyone of a Death | `pm-grief` | `pm-grief/notify-everyone-of-a-death/agent.json` |
| Notion DB Hygiene (Live) | `pm-cowork-live` | `pm-cowork-live/notion-db-hygiene/agent.json` |
| NT Translator | `pm-neurodivergent` | `pm-neurodivergent/nt-translator/agent.json` |
| Nursing Care Plan | `pm-nursing` | `pm-nursing/nursing-care-plan/agent.json` |
| Nursing Family Update | `pm-nursing` | `pm-nursing/nursing-family-update/agent.json` |
| Nursing Incident Report | `pm-nursing` | `pm-nursing/nursing-incident-report/agent.json` |
| Nursing Shift Handover | `pm-nursing` | `pm-nursing/nursing-shift-handover/agent.json` |
| Offer Comparison | `pm-calculators` | `pm-calculators/offer-comparison/agent.json` |
| Offer Letter | `pm-recruiting` | `pm-recruiting/offer-letter/agent.json` |
| Office Hours Design | `pm-cowork` | `pm-cowork/office-hours-design/agent.json` |
| Office Move Runbook | `pm-cowork` | `pm-cowork/office-move-runbook/agent.json` |
| Offsite Planner | `pm-cowork` | `pm-cowork/offsite-planner/agent.json` |
| OKR Builder | `pm-planning` | `pm-planning/okr-builder/agent.json` |
| Onboarding Buddy Plan | `pm-cowork` | `pm-cowork/onboarding-buddy-plan/agent.json` |
| Onboarding Copy | `pm-uxwriting` | `pm-uxwriting/onboarding-copy/agent.json` |
| Onboarding Plan | `pm-hr` | `pm-hr/onboarding-plan/agent.json` |
| On-Call Handoff | `pm-engineering` | `pm-engineering/oncall-handoff/agent.json` |
| On-Call Runbook | `pm-engineering` | `pm-engineering/oncall-runbook/agent.json` |
| One Hard Truth | `pm-focus` | `pm-focus/one-hard-truth/agent.json` |
| One-on-One Prep | `pm-career` | `pm-career/one-on-one-prep/agent.json` |
| One-Pager | `pm-personal` | `pm-personal/one-pager/agent.json` |
| Open House Plan | `pm-realestate` | `pm-realestate/open-house-plan/agent.json` |
| Opposing Counsel | `pm-simulators` | `pm-simulators/opposing-counsel/agent.json` |
| Oral History Kit | `pm-family` | `pm-family/oral-history-kit/agent.json` |
| Org Chart | `pm-visuals` | `pm-visuals/org-chart/agent.json` |
| Out Of Office Designer | `pm-cowork` | `pm-cowork/out-of-office-designer/agent.json` |
| Outcome Tracker | `pm-autopilot` | `pm-autopilot/outcome-tracker/agent.json` |
| Outline Before Prose | `pm-cowork` | `pm-cowork/outline-before-prose/agent.json` |
| Outreach Message | `pm-jobsearch` | `pm-jobsearch/outreach-message/agent.json` |
| Oversharing Audit | `pm-digital-safety` | `pm-digital-safety/oversharing-audit/agent.json` |
| Overwhelm Triage | `pm-focus` | `pm-focus/overwhelm-triage/agent.json` |
| Package Health | `pm-live` | `pm-live/package-health/agent.json` |
| Paid Acquisition Plan | `pm-growth` | `pm-growth/paid-acquisition-plan/agent.json` |
| Panel of Experts | `pm-thinking` | `pm-thinking/panel-of-experts/agent.json` |
| Parent Communication | `pm-education` | `pm-education/parent-communication/agent.json` |
| Parent Conference Prep | `pm-teaching` | `pm-teaching/parent-conference-prep/agent.json` |
| Parent Teacher Conference Prep | `pm-parents` | `pm-parents/parent-teacher-conference-prep/agent.json` |
| Partnership Proposal | `pm-sales` | `pm-sales/partnership-proposal/agent.json` |
| Passive-Income Reality Check | `pm-wealth` | `pm-wealth/passive-income-reality-check/agent.json` |
| Password & 2FA Setup | `pm-digital-safety` | `pm-digital-safety/password-and-2fa-setup/agent.json` |
| Patient Communication | `pm-research` | `pm-research/patient-communication/agent.json` |
| Patient Education Explainer | `pm-physio` | `pm-physio/patient-education-explainer/agent.json` |
| Pay Stub Decoder | `pm-decoders` | `pm-decoders/pay-stub-decoder/agent.json` |
| Payroll Eve Check | `pm-duet` | `pm-duet/payroll-eve-check/agent.json` |
| Paywall Optimization | `pm-growth` | `pm-growth/paywall-optimization/agent.json` |
| Penetration Test Report | `pm-security` | `pm-security/pentest-report/agent.json` |
| Performance Budget | `pm-engineering` | `pm-engineering/performance-budget/agent.json` |
| Performance Review | `pm-people` | `pm-people/performance-review/agent.json` |
| Perimenopause Navigator | `pm-invisible-illness` | `pm-invisible-illness/perimenopause-navigator/agent.json` |
| Permit Navigator | `pm-civic` | `pm-civic/permit-navigator/agent.json` |
| Personal Bio | `pm-personal` | `pm-personal/personal-bio/agent.json` |
| Personal Board of Directors | `pm-personal` | `pm-personal/personal-board-of-directors/agent.json` |
| Personal Operating Manual | `pm-focus` | `pm-focus/personal-operating-manual/agent.json` |
| Personal Statement | `pm-students` | `pm-students/personal-statement/agent.json` |
| Personal WIP Limits | `pm-cowork` | `pm-cowork/personal-wip-limits/agent.json` |
| Persuasion Brief | `pm-comms` | `pm-comms/persuasion-brief/agent.json` |
| Pharmacy Counselling Script | `pm-pharmacy` | `pm-pharmacy/pharmacy-counselling-script/agent.json` |
| PhD Supervisor Update | `pm-phd` | `pm-phd/phd-supervisor-update/agent.json` |
| Phishing Triage | `pm-digital-safety` | `pm-digital-safety/phishing-triage/agent.json` |
| Photo Library Rescue | `pm-cowork` | `pm-cowork/photo-library-rescue/agent.json` |
| Physiotherapy Discharge Summary | `pm-physio` | `pm-physio/physio-discharge-summary/agent.json` |
| Physiotherapy Initial Assessment | `pm-physio` | `pm-physio/physio-initial-assessment/agent.json` |
| Physiotherapy Progress Note | `pm-physio` | `pm-physio/physio-progress-note/agent.json` |
| PIP Responder | `pm-career` | `pm-career/pip-responder/agent.json` |
| PIP Writer | `pm-people` | `pm-people/pip-writer/agent.json` |
| PIPL and GDPR Crosswalk | `pm-chuhai` | `pm-chuhai/pipl-gdpr-crosswalk/agent.json` |
| Pitch Vs Teach | `pm-cowork` | `pm-cowork/pitch-vs-teach/agent.json` |
| Pivot Analysis Planner | `pm-cowork` | `pm-cowork/pivot-analysis-planner/agent.json` |
| Pixel GIF Maker | `other` | `other/pixel-gif-maker/agent.json` |
| Plain Language Rewrite | `pm-cowork` | `pm-cowork/plain-language-rewrite/agent.json` |
| Plan My Day | `pm-rituals` | `pm-rituals/plan-my-day/agent.json` |
| Planning Application Statement | `pm-architecture` | `pm-architecture/planning-application-statement/agent.json` |
| Playwright CLI (pointer) | `pm-design-taste` | `pm-design-taste/playwright-cli-pointer/agent.json` |
| PM Weekly Review | `pm-rituals` | `pm-rituals/pm-weekly-review/agent.json` |
| Poke Holes In This | `pm-thinking` | `pm-thinking/poke-holes-in-this/agent.json` |
| Policy Drafter | `pm-cowork` | `pm-cowork/policy-drafter/agent.json` |
| Policy Memo | `pm-gov` | `pm-gov/policy-memo/agent.json` |
| Policy Renewal Review | `pm-insurance` | `pm-insurance/policy-renewal-review/agent.json` |
| Portfolio Page | `pm-personal` | `pm-personal/portfolio-page/agent.json` |
| Post-Event Debrief | `pm-events` | `pm-events/post-event-debrief/agent.json` |
| Posture Reset Plan | `pm-wellbeing` | `pm-wellbeing/posture-reset-plan/agent.json` |
| Power of Attorney Explainer | `pm-legal` | `pm-legal/power-of-attorney-explainer/agent.json` |
| Power Outage Plan | `pm-emergency` | `pm-emergency/power-outage-plan/agent.json` |
| PPTX Slide Auditor | `pm-delivery` | `pm-delivery/pptx-slide-auditor/agent.json` |
| PR Crisis Response | `pm-crisis` | `pm-crisis/pr-crisis-response/agent.json` |
| PR Description | `pm-craft` | `pm-craft/pr-description/agent.json` |
| PR Description (Live) | `pm-cowork-live` | `pm-cowork-live/pr-description-live/agent.json` |
| PR Description Writer | `pm-engineering` | `pm-engineering/pr-description-writer/agent.json` |
| PRD Template | `pm-essentials` | `pm-essentials/prd-template/agent.json` |
| Pre-Mortem Panel | `pm-thinking` | `pm-thinking/pre-mortem-panel/agent.json` |
| Premortem Assassin | `pm-warroom` | `pm-warroom/premortem-assassin/agent.json` |
| Prepare For Duet | `pm-duet` | `pm-duet/prepare-for-duet/agent.json` |
| Prescription Cost Navigator | `pm-lifeadmin` | `pm-lifeadmin/prescription-cost-navigator/agent.json` |
| Declining to Dispense | `pm-pharmacy` | `pm-pharmacy/prescription-refusal-to-fill/agent.json` |
| Presenter Notes | `pm-cowork` | `pm-cowork/presenter-notes/agent.json` |
| Press Kit EPK | `pm-musician` | `pm-musician/press-kit-epk/agent.json` |
| Press Release | `pm-cross` | `pm-cross/press-release/agent.json` |
| Price Increase Announcement | `pm-pmm` | `pm-pmm/price-increase-announcement/agent.json` |
| Price-Match Request | `pm-money` | `pm-money/price-match-request/agent.json` |
| Pricing Calculator | `pm-calculators` | `pm-calculators/pricing-calculator/agent.json` |
| Pricing Page Copy | `pm-pmm` | `pm-pmm/pricing-page-copy/agent.json` |
| Pricing Sensitivity Model (Van Westendorp) | `pm-calculators` | `pm-calculators/pricing-sensitivity-model/agent.json` |
| Pricing Strategy | `pm-planning` | `pm-planning/pricing-strategy/agent.json` |
| Pricing Your Services | `pm-freelance` | `pm-freelance/pricing-your-services/agent.json` |
| Prior Authorization Letter | `pm-health` | `pm-health/prior-authorization-letter/agent.json` |
| Privacy Policy Drafter | `pm-legal` | `pm-legal/privacy-policy-drafter/agent.json` |
| Process Documentation | `pm-operations` | `pm-operations/process-documentation/agent.json` |
| Product Description | `pm-ecommerce` | `pm-ecommerce/product-description/agent.json` |
| Product Health Analysis | `pm-analytics` | `pm-analytics/product-health-analysis/agent.json` |
| Product Launch Checklist | `pm-delivery` | `pm-delivery/product-launch-checklist/agent.json` |
| Product Naming | `pm-uxwriting` | `pm-uxwriting/product-naming/agent.json` |
| Product Positioning Doc | `pm-gtm` | `pm-gtm/product-positioning-doc/agent.json` |
| Product-Recall Check | `pm-lifeadmin` | `pm-lifeadmin/product-recall-check/agent.json` |
| Professional Brain | `pm-cross` | `pm-cross/professional-brain/agent.json` |
| Professional Translator | `pm-localization` | `pm-localization/professional-translator/agent.json` |
| Profit to Cash Walk | `pm-investing-literacy` | `pm-investing-literacy/profit-to-cash-walk/agent.json` |
| Programmatic SEO | `pm-growth` | `pm-growth/programmatic-seo/agent.json` |
| Project Status Report | `pm-operations` | `pm-operations/project-status-report/agent.json` |
| Promoter Draft | `pm-skill-promoter` | `pm-skill-promoter/promoter-draft/agent.json` |
| Promoter Publish | `pm-skill-promoter` | `pm-skill-promoter/promoter-publish/agent.json` |
| Promoter Scan | `pm-skill-promoter` | `pm-skill-promoter/promoter-scan/agent.json` |
| Promoter Test | `pm-skill-promoter` | `pm-skill-promoter/promoter-test/agent.json` |
| Promotion Packet | `pm-career` | `pm-career/promotion-packet/agent.json` |
| Promotion Plan | `pm-ecommerce` | `pm-ecommerce/promotion-plan/agent.json` |
| Prompt Debugging | `pm-ai-native` | `pm-ai-native/prompt-debugging/agent.json` |
| Prompt-Library Builder | `pm-ai-native` | `pm-ai-native/prompt-library-builder/agent.json` |
| Prompt Optimizer | `pm-ai` | `pm-ai/prompt-optimizer/agent.json` |
| Prompt Regression Suite | `pm-agentops` | `pm-agentops/prompt-regression-suite/agent.json` |
| Property Investment Analysis | `pm-realestate` | `pm-realestate/property-investment-analysis/agent.json` |
| Property Listing | `pm-realestate` | `pm-realestate/property-listing/agent.json` |
| Property Offer Letter | `pm-realestate` | `pm-realestate/property-offer-letter/agent.json` |
| Property Tax Appeal | `pm-legal` | `pm-legal/property-tax-appeal/agent.json` |
| Proposal Skeleton | `pm-cowork` | `pm-cowork/proposal-skeleton/agent.json` |
| Proposal Writer | `pm-sales` | `pm-sales/proposal-writer/agent.json` |
| Public Comment | `pm-gov` | `pm-gov/public-comment/agent.json` |
| Public Holidays | `pm-live` | `pm-live/public-holidays/agent.json` |
| Public-Speaking Prep | `pm-comms` | `pm-comms/public-speaking-prep/agent.json` |
| Punch List Builder | `pm-construction` | `pm-construction/punch-list-builder/agent.json` |
| Purchase Justification | `pm-cowork` | `pm-cowork/purchase-justification/agent.json` |
| QA Handoff Package | `pm-qa` | `pm-qa/qa-handoff-package/agent.json` |
| QA Release Sign-off | `pm-qa` | `pm-qa/qa-release-signoff/agent.json` |
| QBR Deck | `pm-cs` | `pm-cs/qbr-deck/agent.json` |
| Quarterly Tax Rhythm | `pm-sidehustle` | `pm-sidehustle/quarterly-tax-rhythm/agent.json` |
| Quiz Generator | `pm-education` | `pm-education/quiz-generator/agent.json` |
| Quote Card | `pm-visuals` | `pm-visuals/quote-card/agent.json` |
| Rabbit Hole Rescue | `other` | `other/rabbit-hole-rescue/agent.json` |
| RACI Matrix | `pm-operations` | `pm-operations/raci-matrix/agent.json` |
| RAG Architecture Review | `pm-ai` | `pm-ai/rag-architecture-review/agent.json` |
| RAG Design Doc | `pm-ai` | `pm-ai/rag-design-doc/agent.json` |
| Raise vs Jump | `pm-calculators` | `pm-calculators/raise-vs-jump/agent.json` |
| Ranked Climb Coach | `pm-newgen` | `pm-newgen/ranked-climb-coach/agent.json` |
| Ransomware First Response | `pm-digital-safety` | `pm-digital-safety/ransomware-first-response/agent.json` |
| Rate Card | `pm-consulting` | `pm-consulting/rate-card/agent.json` |
| Read the Room | `other` | `other/read-the-room/agent.json` |
| Reading Retention System | `pm-learning` | `pm-learning/reading-retention-system/agent.json` |
| README Benefit Writer | `pm-oss-launch` | `pm-oss-launch/readme-benefit-writer/agent.json` |
| README Writer | `pm-devrel` | `pm-devrel/readme-writer/agent.json` |
| Read-only MCP Wrapper | `pm-oss-launch` | `pm-oss-launch/readonly-mcp-wrapper/agent.json` |
| Receipts Audit | `pm-method` | `pm-method/receipts-audit/agent.json` |
| Reconnect After Time Away | `pm-reentry` | `pm-reentry/reconnect-after-time-away/agent.json` |
| Reconnect With Someone | `other` | `other/reconnect-with-someone/agent.json` |
| Recovery Day Planner | `pm-wellbeing` | `pm-wellbeing/recovery-day-planner/agent.json` |
| Recruiter Outreach | `pm-recruiting` | `pm-recruiting/recruiter-outreach/agent.json` |
| Recruiter Scan Simulator | `pm-cv` | `pm-cv/recruiter-scan-simulator/agent.json` |
| Recurring Meeting Pruner | `pm-cowork` | `pm-cowork/recurring-meeting-pruner/agent.json` |
| Red-Team My Plan | `pm-thinking` | `pm-thinking/red-team-my-plan/agent.json` |
| Red-Team Review | `pm-cross` | `pm-cross/red-team-review/agent.json` |
| Redundancy Consultation | `pm-hr` | `pm-hr/redundancy-consultation/agent.json` |
| Refactoring Plan | `pm-craft` | `pm-craft/refactoring-plan/agent.json` |
| Reference Check Script | `pm-recruiting` | `pm-recruiting/reference-check-script/agent.json` |
| Reference Letter | `pm-lifeadmin` | `pm-lifeadmin/reference-letter/agent.json` |
| Reference Request Kit | `pm-layoff` | `pm-layoff/reference-request-kit/agent.json` |
| Referral Program | `pm-growth` | `pm-growth/referral-program/agent.json` |
| Referral Program Design | `pm-growth` | `pm-growth/referral-program-design/agent.json` |
| Referral Request | `pm-cv` | `pm-cv/referral-request/agent.json` |
| Refinance Breakeven | `pm-calculators` | `pm-calculators/refinance-breakeven/agent.json` |
| Regex Builder & Explainer | `pm-engineering` | `pm-engineering/regex-builder/agent.json` |
| Regression Test Plan | `pm-qa` | `pm-qa/regression-test-plan/agent.json` |
| Regret Minimizer | `pm-focus` | `pm-focus/regret-minimizer/agent.json` |
| Regulator Eyes | `pm-simulators` | `pm-simulators/regulator-eyes/agent.json` |
| Regulatory Impact Analysis | `pm-gov` | `pm-gov/regulatory-impact-analysis/agent.json` |
| Rehabilitation Programme Design | `pm-physio` | `pm-physio/rehab-programme-design/agent.json` |
| Rejection-Sensitivity Reframe | `pm-focus` | `pm-focus/rejection-sensitivity-reframe/agent.json` |
| Relationship Check-In | `pm-family` | `pm-family/relationship-check-in/agent.json` |
| Release Day Countdown | `pm-musician` | `pm-musician/release-day-countdown/agent.json` |
| Relocation Planner | `pm-lifeadmin` | `pm-lifeadmin/relocation-planner/agent.json` |
| Renew or Churn Call | `pm-decisions` | `pm-decisions/renew-or-churn-call/agent.json` |
| Renewal Playbook | `pm-cs` | `pm-cs/renewal-playbook/agent.json` |
| Renovation Scope & Budget | `pm-lifeadmin` | `pm-lifeadmin/renovation-scope-and-budget/agent.json` |
| Rent Increase Response | `pm-renters` | `pm-renters/rent-increase-response/agent.json` |
| Rent vs Buy | `pm-calculators` | `pm-calculators/rent-vs-buy/agent.json` |
| Rental Application | `pm-lifeadmin` | `pm-lifeadmin/rental-application/agent.json` |
| Renting After Disaster Damage | `pm-renters` | `pm-renters/renting-after-disaster-damage/agent.json` |
| Repair After a Fight | `other` | `other/repair-after-a-fight/agent.json` |
| Repair Request Escalation | `pm-renters` | `pm-renters/repair-request-escalation/agent.json` |
| Reply In Their Tone | `pm-cowork` | `pm-cowork/reply-in-their-tone/agent.json` |
| Repo Map | `pm-tokens` | `pm-tokens/repo-map/agent.json` |
| Report A Hazard | `pm-civic` | `pm-civic/report-a-hazard/agent.json` |
| Resale Flip Kit | `pm-newgen` | `pm-newgen/resale-flip-kit/agent.json` |
| Research Protocol | `pm-research` | `pm-research/research-protocol/agent.json` |
| Research Repo Setup | `pm-cowork` | `pm-cowork/research-repo-setup/agent.json` |
| Resignation Letter | `pm-resignation` | `pm-resignation/resignation-letter/agent.json` |
| Respite-Care Plan | `pm-caregiving` | `pm-caregiving/respite-care-plan/agent.json` |
| Resume | `pm-personal` | `pm-personal/resume/agent.json` |
| Retail Shift Handover | `pm-retail-shopfloor` | `pm-retail-shopfloor/retail-shift-handover/agent.json` |
| Retention Analysis | `pm-analytics` | `pm-analytics/retention-analysis/agent.json` |
| Retention Loop Design | `pm-growth` | `pm-growth/retention-loop-design/agent.json` |
| Retrospective Analysis | `pm-delivery` | `pm-delivery/retro-analysis/agent.json` |
| Return & Refund Policy | `pm-ecommerce` | `pm-ecommerce/return-refund-policy/agent.json` |
| Return-to-Activity Criteria | `pm-physio` | `pm-physio/return-to-activity-criteria/agent.json` |
| Returner CV | `pm-cv` | `pm-cv/returner-cv/agent.json` |
| Review Comments Resolver | `pm-cowork` | `pm-cowork/review-comments-resolver/agent.json` |
| Review Response | `pm-ecommerce` | `pm-ecommerce/review-response/agent.json` |
| Reviewer Rebuttal Letter | `pm-phd` | `pm-phd/reviewer-rebuttal-letter/agent.json` |
| Rewards Optimizer | `pm-money` | `pm-money/rewards-optimizer/agent.json` |
| RFC Writer | `pm-engineering` | `pm-engineering/rfc-writer/agent.json` |
| RFP Response | `pm-procurement` | `pm-procurement/rfp-response/agent.json` |
| RFP Scoring Matrix | `pm-supplychain` | `pm-supplychain/rfp-scoring-matrix/agent.json` |
| RFP Writer | `pm-procurement` | `pm-procurement/rfp-writer/agent.json` |
| RICE + Strategic Alignment | `pm-planning` | `pm-planning/rice-impact-matrix/agent.json` |
| RICE Prioritisation | `pm-planning` | `pm-planning/rice-prioritisation/agent.json` |
| Risk Register | `pm-operations` | `pm-operations/risk-register/agent.json` |
| RMA Failure Analysis | `pm-hardware` | `pm-hardware/rma-failure-analysis/agent.json` |
| Roadmap Narrative | `pm-planning` | `pm-planning/roadmap-narrative/agent.json` |
| Roadmap Presentation | `pm-planning` | `pm-planning/roadmap-presentation/agent.json` |
| ROI Estimator | `pm-calculators` | `pm-calculators/roi-estimator/agent.json` |
| Role Redesign For AI | `pm-aiwork` | `pm-aiwork/role-redesign-for-ai/agent.json` |
| Rollback Plan | `pm-engineering` | `pm-engineering/rollback-plan/agent.json` |
| Roommate Agreement | `pm-newgen` | `pm-newgen/roommate-agreement/agent.json` |
| RSS Digest | `pm-live` | `pm-live/rss-digest/agent.json` |
| Rubric Builder | `pm-education` | `pm-education/rubric-builder/agent.json` |
| Rules Lawyer | `pm-tabletop` | `pm-tabletop/rules-lawyer/agent.json` |
| Run an Agent Team | `pm-ai-native` | `pm-ai-native/run-an-agent-team/agent.json` |
| Runbook Writer | `pm-engineering` | `pm-engineering/runbook-writer/agent.json` |
| Runway Calculator | `pm-calculators` | `pm-calculators/runway-calculator/agent.json` |
| Runway Monte Carlo | `pm-calculators` | `pm-calculators/runway-monte-carlo/agent.json` |
| Runway Planner | `pm-founders` | `pm-founders/runway-planner/agent.json` |
| SaaS Metrics | `pm-calculators` | `pm-calculators/saas-metrics/agent.json` |
| Safe Online Shopping | `pm-digital-safety` | `pm-digital-safety/safe-online-shopping/agent.json` |
| Salary Benchmarking | `pm-career` | `pm-career/salary-benchmarking/agent.json` |
| Salary Negotiation | `pm-career` | `pm-career/salary-negotiation/agent.json` |
| Sales Battlecard | `pm-sales` | `pm-sales/sales-battlecard/agent.json` |
| Sales Demo Script | `pm-pmm` | `pm-pmm/sales-demo-script/agent.json` |
| Sales Enablement Kit | `pm-pmm` | `pm-pmm/sales-enablement-kit/agent.json` |
| Sales Forecasting Model | `pm-sales` | `pm-sales/sales-forecasting-model/agent.json` |
| Sales Page | `pm-copy` | `pm-copy/sales-page/agent.json` |
| Savings Goal Plan | `pm-money` | `pm-money/savings-goal-plan/agent.json` |
| Saying No | `pm-comms` | `pm-comms/saying-no/agent.json` |
| Saying No Kindly | `pm-cowork` | `pm-cowork/saying-no-kindly/agent.json` |
| Scam Message Decoder | `pm-scam-defense` | `pm-scam-defense/scam-message-decoder/agent.json` |
| Schedule Monte Carlo | `pm-calculators` | `pm-calculators/schedule-monte-carlo/agent.json` |
| Schedule Recipe | `pm-autopilot` | `pm-autopilot/schedule-recipe/agent.json` |
| Schema Markup | `pm-growth` | `pm-growth/schema-markup/agent.json` |
| Scholarship Essay | `pm-students` | `pm-students/scholarship-essay/agent.json` |
| School Choice Decision | `pm-family` | `pm-family/school-choice-decision/agent.json` |
| Scope Creep Response | `pm-freelance` | `pm-freelance/scope-creep-response/agent.json` |
| Screen-Time Detox | `pm-wellbeing` | `pm-wellbeing/screen-time-detox/agent.json` |
| Screenshot Teardown | `pm-vision` | `pm-vision/screenshot-teardown/agent.json` |
| Second Opinion Request | `pm-lifeadmin` | `pm-lifeadmin/second-opinion-request/agent.json` |
| Secure a Lost Phone | `pm-digital-safety` | `pm-digital-safety/secure-a-lost-phone/agent.json` |
| Security Deposit Recovery | `pm-renters` | `pm-renters/security-deposit-recovery/agent.json` |
| Security Incident Response | `pm-security` | `pm-security/security-incident-response/agent.json` |
| Security Questionnaire Autofill | `pm-compliance` | `pm-compliance/security-questionnaire-autofill/agent.json` |
| Security Review | `pm-security` | `pm-security/security-review/agent.json` |
| Security Threat Model | `pm-engineering` | `pm-engineering/security-threat-model/agent.json` |
| Self-Host Packager | `pm-oss-launch` | `pm-oss-launch/self-host-packager/agent.json` |
| Self-Review | `pm-career` | `pm-career/self-review/agent.json` |
| Send Approval Check | `pm-duet` | `pm-duet/send-approval-check/agent.json` |
| Sensory Audit | `pm-neurodivergent` | `pm-neurodivergent/sensory-audit/agent.json` |
| SEO Content Brief | `pm-gtm` | `pm-gtm/seo-content-brief/agent.json` |
| Sequence Diagram | `pm-visuals` | `pm-visuals/sequence-diagram/agent.json` |
| Server Training Guide | `pm-hospitality` | `pm-hospitality/server-training-guide/agent.json` |
| Service Catalog Entry | `pm-engineering` | `pm-engineering/service-catalog-entry/agent.json` |
| Session Handoff | `pm-tokens` | `pm-tokens/session-handoff/agent.json` |
| Severance Agreement Decoder | `pm-layoff` | `pm-layoff/severance-agreement-decoder/agent.json` |
| Shared Agent Charter | `pm-duet` | `pm-duet/shared-agent-charter/agent.json` |
| Shared Drive Cleanup | `pm-cowork` | `pm-cowork/shared-drive-cleanup/agent.json` |
| Shift Schedule Builder | `pm-retail-shopfloor` | `pm-retail-shopfloor/shift-schedule-builder/agent.json` |
| Ship or Slip | `pm-decisions` | `pm-decisions/ship-or-slip/agent.json` |
| 视频号脚本 | `pm-zh-content` | `pm-zh-content/shipinhao-script/agent.json` |
| Short-Form Script | `pm-creator` | `pm-creator/short-form-script/agent.json` |
| Should I Quit or Push | `pm-focus` | `pm-focus/should-i-quit-or-push/agent.json` |
| Should I Send This | `pm-focus` | `pm-focus/should-i-send-this/agent.json` |
| Shrink Report | `pm-retail-shopfloor` | `pm-retail-shopfloor/shrink-report/agent.json` |
| Shutdown Ritual | `pm-cowork` | `pm-cowork/shutdown-ritual/agent.json` |
| Sibling Care Summit | `pm-aging-parents` | `pm-aging-parents/sibling-care-summit/agent.json` |
| Side Business Setup | `pm-sidehustle` | `pm-sidehustle/side-business-setup/agent.json` |
| Signature Pipeline Watch | `pm-duet` | `pm-duet/signature-pipeline-watch/agent.json` |
| Singapore CPF Explainer | `pm-sea` | `pm-sea/singapore-cpf-explainer/agent.json` |
| Singapore Employment Act Guide | `pm-sea` | `pm-sea/singapore-employment-act/agent.json` |
| Site Analysis Report | `pm-architecture` | `pm-architecture/site-analysis-report/agent.json` |
| Site Check | `pm-live` | `pm-live/site-check/agent.json` |
| Site Safety Briefing | `pm-construction` | `pm-construction/site-safety-briefing/agent.json` |
| Skill Fusion | `pm-advanced` | `pm-advanced/skill-fusion/agent.json` |
| Skill-Plateau Breaker | `pm-learning` | `pm-learning/skill-plateau-breaker/agent.json` |
| Skill Security Auditor | `pm-engineering` | `pm-engineering/skill-security-auditor/agent.json` |
| Skill Vetting | `pm-security` | `pm-security/skill-vetting/agent.json` |
| Sleep Reset Plan | `pm-wellbeing` | `pm-wellbeing/sleep-reset-plan/agent.json` |
| Slide Deck | `pm-documents` | `pm-documents/slide-deck/agent.json` |
| Slide Density Rules | `pm-cowork` | `pm-cowork/slide-density-rules/agent.json` |
| SLO and Error Budget | `pm-engineering` | `pm-engineering/slo-error-budget/agent.json` |
| Small-Claims Prep | `pm-legal` | `pm-legal/small-claims-prep/agent.json` |
| Small-Talk Survival | `other` | `other/small-talk-survival/agent.json` |
| SOAP Note | `pm-health` | `pm-health/soap-note/agent.json` |
| SOC 2 Readiness | `pm-compliance` | `pm-compliance/soc2-readiness/agent.json` |
| Social Ad Campaign | `pm-social` | `pm-social/social-ad-campaign/agent.json` |
| Social Media Audit | `pm-social` | `pm-social/social-media-audit/agent.json` |
| Social Media Strategy | `pm-gtm` | `pm-gtm/social-media-strategy/agent.json` |
| Solar Breakeven | `pm-calculators` | `pm-calculators/solar-breakeven/agent.json` |
| S&OP Meeting Prep | `pm-supplychain` | `pm-supplychain/sop-meeting-prep/agent.json` |
| SOP Writer | `pm-operations` | `pm-operations/sop-writer/agent.json` |
| Source Interview Prep | `pm-journalism` | `pm-journalism/source-interview-prep/agent.json` |
| Source Protection Plan | `pm-journalism` | `pm-journalism/source-protection-plan/agent.json` |
| Source Triangulation | `pm-cowork` | `pm-cowork/source-triangulation/agent.json` |
| Sourcing Strategy | `pm-recruiting` | `pm-recruiting/sourcing-strategy/agent.json` |
| Sourdough Troubleshooter | `pm-hobbies` | `pm-hobbies/sourdough-troubleshooter/agent.json` |
| Spaced-Repetition Setup | `pm-learning` | `pm-learning/spaced-repetition-setup/agent.json` |
| Speak At The Council | `pm-committee` | `pm-committee/speak-at-the-council/agent.json` |
| Spoon Planner | `pm-invisible-illness` | `pm-invisible-illness/spoon-planner/agent.json` |
| Sports Parent Comms | `pm-sports-coaching` | `pm-sports-coaching/sports-parent-comms/agent.json` |
| Sports Scores | `pm-live` | `pm-live/sports-scores/agent.json` |
| Spot AI Mistakes | `pm-ai-native` | `pm-ai-native/spot-ai-mistakes/agent.json` |
| Spreadsheet Audit | `pm-cowork` | `pm-cowork/spreadsheet-audit/agent.json` |
| Spreadsheet Audit (Live) | `pm-cowork-live` | `pm-cowork-live/spreadsheet-audit-live/agent.json` |
| Spreadsheet Handover | `pm-cowork` | `pm-cowork/spreadsheet-handover/agent.json` |
| Spreadsheet Or Database | `pm-cowork` | `pm-cowork/spreadsheet-or-database/agent.json` |
| Sprint Brief | `pm-delivery` | `pm-delivery/sprint-brief/agent.json` |
| Sprint Planning | `pm-delivery` | `pm-delivery/sprint-planning/agent.json` |
| Sprint Retro Facilitator | `pm-delivery` | `pm-delivery/sprint-retro-facilitator/agent.json` |
| Sprint Velocity Analysis | `pm-engineering` | `pm-engineering/sprint-velocity-analysis/agent.json` |
| SQL Optimizer | `pm-dataeng` | `pm-dataeng/sql-optimizer/agent.json` |
| SQL Query Explainer | `pm-data` | `pm-data/sql-query-explainer/agent.json` |
| Stage Payment Shield | `pm-trades` | `pm-trades/stage-payment-shield/agent.json` |
| Stakeholder Influence Mapper | `pm-strategy` | `pm-strategy/stakeholder-influence-mapper/agent.json` |
| Stakeholder Update | `pm-essentials` | `pm-essentials/stakeholder-update/agent.json` |
| Standing Meeting Audit | `pm-cowork` | `pm-cowork/standing-meeting-audit/agent.json` |
| Standing Orders | `pm-duet` | `pm-duet/standing-orders/agent.json` |
| Stargazing Tonight | `pm-hobbies` | `pm-hobbies/stargazing-tonight/agent.json` |
| Startup Idea Validator | `pm-founders` | `pm-founders/startup-idea-validator/agent.json` |
| Statement Coach | `pm-students` | `pm-students/statement-coach/agent.json` |
| Statement of Work | `pm-consulting` | `pm-consulting/statement-of-work/agent.json` |
| Status Report Pipeline | `pm-cowork` | `pm-cowork/status-report-pipeline/agent.json` |
| Steelman the Weird Option | `pm-thinking` | `pm-thinking/steelman-the-weird-option/agent.json` |
| Stock Snapshot | `pm-live` | `pm-live/stock-snapshot/agent.json` |
| Stock Take Plan | `pm-retail-shopfloor` | `pm-retail-shopfloor/stock-take-plan/agent.json` |
| Stoic Setback Debrief | `pm-dead-mentors` | `pm-dead-mentors/stoic-setback-debrief/agent.json` |
| Stop Overthinking This | `pm-focus` | `pm-focus/stop-overthinking-this/agent.json` |
| Stop-the-Bleed Triage | `pm-hardship` | `pm-hardship/stop-the-bleed-triage/agent.json` |
| Store Watch | `pm-duet` | `pm-duet/store-watch/agent.json` |
| Story Pitch | `pm-journalism` | `pm-journalism/story-pitch/agent.json` |
| Strategic Narrative Generator | `pm-strategy` | `pm-strategy/strategic-narrative-generator/agent.json` |
| Strategy Memo | `pm-business` | `pm-business/strategy-memo/agent.json` |
| Stretching Routine | `pm-wellbeing` | `pm-wellbeing/stretching-routine/agent.json` |
| Student Feedback | `pm-education` | `pm-education/student-feedback/agent.json` |
| Student Loan Strategy | `pm-calculators` | `pm-calculators/student-loan-strategy/agent.json` |
| Study Notes Synthesizer | `pm-students` | `pm-students/study-notes-synthesizer/agent.json` |
| Style Fingerprint | `pm-essentials` | `pm-essentials/style-fingerprint/agent.json` |
| Subagent Orchestration | `pm-method` | `pm-method/subagent-orchestration/agent.json` |
| Subcontractor Scorecard | `pm-construction` | `pm-construction/subcontractor-scorecard/agent.json` |
| Subscription Audit | `pm-calculators` | `pm-calculators/subscription-audit/agent.json` |
| Subscription Auditor | `pm-operator` | `pm-operator/subscription-auditor/agent.json` |
| Substack Notes Scraper | `pm-writers` | `pm-writers/substack-notes-scraper/agent.json` |
| Subtitle & Caption | `pm-localization` | `pm-localization/subtitle-caption/agent.json` |
| Summarize Anything | `pm-comms` | `pm-comms/summarize-anything/agent.json` |
| Sun and Moon | `pm-live` | `pm-live/sun-and-moon/agent.json` |
| Sun Tzu Strategy Brief | `pm-dead-mentors` | `pm-dead-mentors/sun-tzu-strategy-brief/agent.json` |
| Supplier Scorecard | `pm-supplychain` | `pm-supplychain/supplier-scorecard/agent.json` |
| Support a Friend in Crisis | `other` | `other/support-a-friend-in-crisis/agent.json` |
| Support Macro | `pm-support` | `pm-support/support-macro/agent.json` |
| Support Runbook | `pm-support` | `pm-support/support-runbook/agent.json` |
| Support Staffing Model | `pm-calculators` | `pm-calculators/support-staffing-model/agent.json` |
| Support the Bereaved | `pm-grief` | `pm-grief/support-the-bereaved/agent.json` |
| Survey Design Basics | `pm-cowork` | `pm-cowork/survey-design-basics/agent.json` |
| Sycophancy Challenger | `pm-cross` | `pm-cross/sycophancy-challenger/agent.json` |
| Synthetic User Research | `pm-research` | `pm-research/synthetic-user-research/agent.json` |
| System Design Interview | `pm-engineering` | `pm-engineering/system-design-interview/agent.json` |
| Tabletop Negotiator | `pm-tabletop` | `pm-tabletop/tabletop-negotiator/agent.json` |
| Task to First Step | `pm-focus` | `pm-focus/task-to-first-step/agent.json` |
| Task Triage Matrix | `pm-cowork` | `pm-cowork/task-triage-matrix/agent.json` |
| Tax Deduction Finder | `pm-money` | `pm-money/tax-deduction-finder/agent.json` |
| Tax Planning Checklist | `pm-finance` | `pm-finance/tax-planning-checklist/agent.json` |
| Tax Residency Primer | `pm-newcomer` | `pm-newcomer/tax-residency-primer/agent.json` |
| TDD Workflow | `pm-craft` | `pm-craft/tdd-workflow/agent.json` |
| Teach Me in Layers | `pm-learning` | `pm-learning/teach-me-in-layers/agent.json` |
| Teach The Game | `pm-tabletop` | `pm-tabletop/teach-the-game/agent.json` |
| Teaching Lesson Plan | `pm-cross` | `pm-cross/teaching-lesson-plan/agent.json` |
| Team Budget Tracker | `pm-cowork` | `pm-cowork/team-budget-tracker/agent.json` |
| Team Health Check | `pm-people` | `pm-people/team-health-check/agent.json` |
| Team Offsite Planner | `pm-people` | `pm-people/team-offsite-planner/agent.json` |
| Tech Radar | `pm-engineering` | `pm-engineering/tech-radar/agent.json` |
| Technical Debt Register | `pm-engineering` | `pm-engineering/technical-debt-register/agent.json` |
| Technical Spec Template | `pm-delivery` | `pm-delivery/technical-spec-template/agent.json` |
| Template Designer | `pm-cowork` | `pm-cowork/template-designer/agent.json` |
| Tenant Rights Explainer | `pm-legal` | `pm-legal/tenant-rights-explainer/agent.json` |
| Tenant Screening Guide | `pm-realestate` | `pm-realestate/tenant-screening-guide/agent.json` |
| Test Case Writer | `pm-qa` | `pm-qa/test-case-writer/agent.json` |
| Test Strategy Document | `pm-engineering` | `pm-engineering/test-strategy-doc/agent.json` |
| Testimonial Request | `pm-freelance` | `pm-freelance/testimonial-request/agent.json` |
| The 2-Minute Launch | `pm-focus` | `pm-focus/the-2-minute-launch/agent.json` |
| The Boring Answer Detector | `pm-thinking` | `pm-thinking/the-boring-answer-detector/agent.json` |
| The Car Dealership | `pm-simulators` | `pm-simulators/the-car-dealership/agent.json` |
| The Churning Customer | `pm-simulators` | `pm-simulators/the-churning-customer/agent.json` |
| The Due Diligence Call | `pm-simulators` | `pm-simulators/the-due-diligence-call/agent.json` |
| The Ethics Board | `pm-simulators` | `pm-simulators/the-ethics-board/agent.json` |
| The Ick Decoder | `other` | `other/the-ick-decoder/agent.json` |
| The Insurance Adjuster | `pm-simulators` | `pm-simulators/the-insurance-adjuster/agent.json` |
| The Journalist Call | `pm-simulators` | `pm-simulators/the-journalist-call/agent.json` |
| The Loan Officer | `pm-simulators` | `pm-simulators/the-loan-officer/agent.json` |
| The Maintainer's No | `pm-maintainer` | `pm-maintainer/the-maintainers-no/agent.json` |
| The One Thing | `pm-focus` | `pm-focus/the-one-thing/agent.json` |
| The Open House | `pm-simulators` | `pm-simulators/the-open-house/agent.json` |
| The Org Simulator | `pm-2027` | `pm-2027/the-org-simulator/agent.json` |
| The Planning Committee | `pm-simulators` | `pm-simulators/the-planning-committee/agent.json` |
| The Price Pushback | `pm-simulators` | `pm-simulators/the-price-pushback/agent.json` |
| The Procurement Gauntlet | `pm-simulators` | `pm-simulators/the-procurement-gauntlet/agent.json` |
| The Promotion Committee | `pm-simulators` | `pm-simulators/the-promotion-committee/agent.json` |
| The Ruthless Editor | `pm-craft` | `pm-craft/the-ruthless-editor/agent.json` |
| The School Appeal | `pm-simulators` | `pm-simulators/the-school-appeal/agent.json` |
| The Second Opinion | `pm-thinking` | `pm-thinking/the-second-opinion/agent.json` |
| The Skeptic and the Believer | `pm-thinking` | `pm-thinking/the-skeptic-and-the-believer/agent.json` |
| The Strong No | `pm-thinking` | `pm-thinking/the-strong-no/agent.json` |
| The Thesis Defense | `pm-students` | `pm-students/the-thesis-defense/agent.json` |
| The Third Answer | `pm-thinking` | `pm-thinking/the-third-answer/agent.json` |
| The Time Capsule | `pm-2027` | `pm-2027/the-time-capsule/agent.json` |
| The Understudy | `pm-2027` | `pm-2027/the-understudy/agent.json` |
| The Union Table | `pm-simulators` | `pm-simulators/the-union-table/agent.json` |
| The Vibe Check | `pm-newgen` | `pm-newgen/the-vibe-check/agent.json` |
| The Visa Interview | `pm-simulators` | `pm-simulators/the-visa-interview/agent.json` |
| The Worry Decompiler | `pm-focus` | `pm-focus/the-worry-decompiler/agent.json` |
| The Year of Firsts | `pm-grief` | `pm-grief/the-year-of-firsts/agent.json` |
| Thesis Chapter Plan | `pm-phd` | `pm-phd/thesis-chapter-plan/agent.json` |
| Thesis Outline | `pm-students` | `pm-students/thesis-outline/agent.json` |
| Think From Another Angle | `pm-thinking` | `pm-thinking/think-from-another-angle/agent.json` |
| Thread To Decision | `pm-cowork` | `pm-cowork/thread-to-decision/agent.json` |
| Thread to Decision (Live) | `pm-cowork-live` | `pm-cowork-live/thread-to-decision-live/agent.json` |
| Threat Model | `pm-security` | `pm-security/threat-model/agent.json` |
| Thumbnail Creator Skill (via Gemini) | `pm-writers` | `pm-writers/thumbnail-creator/agent.json` |
| Timeshare Contract Decoder | `pm-decoders` | `pm-decoders/timeshare-contract-decoder/agent.json` |
| Token Cost | `pm-tokens` | `pm-tokens/token-cost/agent.json` |
| Token Diet | `pm-tokens` | `pm-tokens/token-diet/agent.json` |
| Tone Fixer | `pm-comms` | `pm-comms/tone-fixer/agent.json` |
| Tool Permission Review | `pm-seatbelt` | `pm-seatbelt/tool-permission-review/agent.json` |
| Tool Procurement Eval | `pm-cowork` | `pm-cowork/tool-procurement-eval/agent.json` |
| Tooling Risk Assessment | `pm-hardware` | `pm-hardware/tooling-risk-assessment/agent.json` |
| Tornado Sensitivity | `pm-calculators` | `pm-calculators/tornado-sensitivity/agent.json` |
| ToS Decoder | `pm-decoders` | `pm-decoders/tos-decoder/agent.json` |
| Trade Quote Builder | `pm-trades` | `pm-trades/trade-quote-builder/agent.json` |
| Transcreation | `pm-localization` | `pm-localization/transcreation/agent.json` |
| Travel Brief | `pm-cowork` | `pm-cowork/travel-brief/agent.json` |
| Treatment Plan Estimate | `pm-veterinary` | `pm-veterinary/treatment-plan-estimate/agent.json` |
| Dental Treatment Plan Presentation | `pm-dentistry` | `pm-dentistry/treatment-plan-presentation/agent.json` |
| Trip Planner | `pm-personal` | `pm-personal/trip-planner/agent.json` |
| TTRPG Session Forge | `pm-newgen` | `pm-newgen/ttrpg-session-forge/agent.json` |
| Taiwan Labour Standards (勞動基準法) | `pm-hk-tw` | `pm-hk-tw/tw-labour-standards/agent.json` |
| Two Worlds Translator | `pm-identity` | `pm-identity/two-worlds-translator/agent.json` |
| UAE Gratuity Calculator | `pm-mena` | `pm-mena/uae-gratuity-calculator/agent.json` |
| UI Design Pipeline | `pm-design-taste` | `pm-design-taste/ui-design-pipeline/agent.json` |
| UI UX Pro Max (pointer) | `pm-design-taste` | `pm-design-taste/ui-ux-pro-max-pointer/agent.json` |
| Unblock Protocol | `pm-cowork` | `pm-cowork/unblock-protocol/agent.json` |
| Unclaimed-Money Tracer | `pm-money` | `pm-money/unclaimed-money-tracer/agent.json` |
| Underwriting Narrative | `pm-insurance` | `pm-insurance/underwriting-narrative/agent.json` |
| Unit Economics | `pm-calculators` | `pm-calculators/unit-economics/agent.json` |
| Usage-Based Pricing Model | `other` | `other/usage-based-pricing-model/agent.json` |
| Used Car Decoder | `other` | `other/used-car-decoder/agent.json` |
| User Interview Synthesis | `pm-discovery` | `pm-discovery/user-interview-synthesis/agent.json` |
| User Journey Map | `pm-visuals` | `pm-visuals/user-journey-map/agent.json` |
| User Research Synthesis | `pm-essentials` | `pm-essentials/user-research-synthesis/agent.json` |
| User Story Writer | `pm-delivery` | `pm-delivery/user-story-writer/agent.json` |
| Utility Switch Advisor | `pm-money` | `pm-money/utility-switch-advisor/agent.json` |
| UX Research Plan | `pm-design` | `pm-design/ux-research-plan/agent.json` |
| Value Proposition | `pm-copy` | `pm-copy/value-proposition/agent.json` |
| Values-Mapped CV | `pm-cv` | `pm-cv/values-mapped-cv/agent.json` |
| VC Partner Meeting | `pm-simulators` | `pm-simulators/vc-partner-meeting/agent.json` |
| Vehicle-Maintenance Schedule | `pm-lifeadmin` | `pm-lifeadmin/vehicle-maintenance-schedule/agent.json` |
| Vendor Breakup Email | `pm-cowork` | `pm-cowork/vendor-breakup-email/agent.json` |
| Vendor Comparison Matrix | `pm-cowork` | `pm-cowork/vendor-comparison-matrix/agent.json` |
| Vendor Contract Checklist | `pm-operations` | `pm-operations/vendor-contract-checklist/agent.json` |
| Vendor Evaluation | `pm-operations` | `pm-operations/vendor-evaluation/agent.json` |
| Vendor Security Review | `pm-compliance` | `pm-compliance/vendor-security-review/agent.json` |
| Venue Access Check | `pm-accessibility` | `pm-accessibility/venue-access-check/agent.json` |
| Venue Contract Review | `pm-events` | `pm-events/venue-contract-review/agent.json` |
| Verification Before Completion | `pm-method` | `pm-method/verification-before-completion/agent.json` |
| Version Chaos Untangler | `pm-cowork` | `pm-cowork/version-chaos-untangler/agent.json` |
| Vet Estimate Decoder | `pm-decoders` | `pm-decoders/vet-estimate-decoder/agent.json` |
| Viral Content Framework | `pm-social` | `pm-social/viral-content-framework/agent.json` |
| Viva Prep Pack | `pm-phd` | `pm-phd/viva-prep-pack/agent.json` |
| Voice Agent Design | `pm-agentnative` | `pm-agentnative/voice-agent-design/agent.json` |
| Voice of Customer Program | `pm-pmm` | `pm-pmm/voice-of-customer-program/agent.json` |
| Volunteer Treasurer Basics | `pm-committee` | `pm-committee/volunteer-treasurer-basics/agent.json` |
| Voting Navigator | `pm-civic` | `pm-civic/voting-navigator/agent.json` |
| Vulnerability Triage | `pm-security` | `pm-security/vuln-triage/agent.json` |
| Wage-Garnishment Response | `pm-hardship` | `pm-hardship/wage-garnishment-response/agent.json` |
| Warranty Claim | `pm-money` | `pm-money/warranty-claim/agent.json` |
| Weather Now | `pm-live` | `pm-live/weather-now/agent.json` |
| WeChat Official Account Article (公众号文章) | `pm-zh-content` | `pm-zh-content/wechat-article/agent.json` |
| WeCom Announcement (企业微信公告) | `pm-china-work` | `pm-china-work/wecom-announcement/agent.json` |
| Wedding Budget | `pm-wedding` | `pm-wedding/wedding-budget/agent.json` |
| Wedding Logistics Planner | `pm-wedding` | `pm-wedding/wedding-logistics-planner/agent.json` |
| Wedding Speech | `pm-lifeadmin` | `pm-lifeadmin/wedding-speech/agent.json` |
| Wedding Vendor Contract Decoder | `pm-wedding` | `pm-wedding/wedding-vendor-contract-decoder/agent.json` |
| Wedding Vows Writer | `pm-family` | `pm-family/wedding-vows-writer/agent.json` |
| Weekly Review Ritual | `pm-cowork` | `pm-cowork/weekly-review-ritual/agent.json` |
| Weekly Rollup | `pm-duet` | `pm-duet/weekly-rollup/agent.json` |
| Weekly Unstuck | `pm-focus` | `pm-focus/weekly-unstuck/agent.json` |
| Wellness Plan | `pm-veterinary` | `pm-veterinary/wellness-plan/agent.json` |
| What Am I Not Seeing | `pm-thinking` | `pm-thinking/what-am-i-not-seeing/agent.json` |
| What To Ask | `pm-decoders` | `pm-decoders/what-to-ask/agent.json` |
| What's for Dinner | `pm-kitchen` | `pm-kitchen/whats-for-dinner/agent.json` |
| When Someone Dies | `pm-estate` | `pm-estate/when-someone-dies/agent.json` |
| Where Do I Start | `pm-focus` | `pm-focus/where-do-i-start/agent.json` |
| Which Skill Router | `pm-essentials` | `pm-essentials/which-skill/agent.json` |
| Whiteboard To Spec | `pm-vision` | `pm-vision/whiteboard-to-spec/agent.json` |
| Wiki Summary | `pm-live` | `pm-live/wiki-summary/agent.json` |
| Win/Loss Analysis | `pm-pmm` | `pm-pmm/win-loss-analysis/agent.json` |
| Win-back Playbook | `pm-cs` | `pm-cs/winback-playbook/agent.json` |
| Windfall Plan | `pm-money` | `pm-money/windfall-plan/agent.json` |
| Wine Pairing | `pm-hobbies` | `pm-hobbies/wine-pairing/agent.json` |
| Witness Statement Writer | `pm-legal` | `pm-legal/witness-statement-writer/agent.json` |
| Word Document | `pm-documents` | `pm-documents/word-document/agent.json` |
| Working Agreements | `pm-cowork` | `pm-cowork/working-agreements/agent.json` |
| Workshop Designer | `pm-cowork` | `pm-cowork/workshop-designer/agent.json` |
| Workshop Facilitation Guide | `pm-operations` | `pm-operations/workshop-facilitation-guide/agent.json` |
| World Clock | `pm-live` | `pm-live/world-clock/agent.json` |
| Writing Great Skills | `pm-engineering` | `pm-engineering/writing-great-skills/agent.json` |
| Writing Plans | `pm-method` | `pm-method/writing-plans/agent.json` |
| 小红书 Note | `pm-zh-content` | `pm-zh-content/xiaohongshu-note/agent.json` |
| 小宇宙播客提纲 | `pm-zh-content` | `pm-zh-content/xiaoyuzhou-podcast-outline/agent.json` |
| Year in Review | `pm-career` | `pm-career/year-in-review/agent.json` |
| YouTube Script | `pm-creator` | `pm-creator/youtube-script/agent.json` |
| YouTube Script Writer | `pm-writers` | `pm-writers/youtube-script-writer/agent.json` |
| Retrenchment Package Check (South Africa) | `pm-africa` | `pm-africa/za-retrenchment-package-check/agent.json` |
| UIF Claim Guide (South Africa) | `pm-africa` | `pm-africa/za-uif-claim-guide/agent.json` |
| 知乎回答 | `pm-zh-content` | `pm-zh-content/zhihu-answer/agent.json` |
