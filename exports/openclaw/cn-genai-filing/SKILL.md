---
name: cn-genai-filing
description: "Use when asked 大模型备案怎么做, 生成式人工智能服务备案还是登记, 算法备案流程, AI 生成内容标识怎么加, 我们接了已备案的大模型还要备案吗, or prepare a generative AI product for launch in mainland China. Produces the obligations that apply (generative AI service filing, registration for apps built on a filed model, algorithm filing, AI-generated content labelling), the documents and security self-assessment to prepare, a launch checklist, and the questions for the provincial cyberspace administration, each marked to confirm."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-genai-filing.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Generative AI Filing (生成式人工智能备案)

Offering generative AI to the public in mainland China brings obligations under the Interim Measures for the Management of Generative AI Services (effective 15 August 2023), the algorithm recommendation rules, the deep synthesis rules, and the measures for labelling AI-generated content (effective 1 September 2025). Which apply depends on whether the company trains or provides its own model, builds on a model that is already filed, serves the public or only businesses, and what the product generates. This skill works out which apply and prepares the materials.

Write in Simplified Chinese unless asked otherwise. Procedures run through the provincial cyberspace administration (省级网信办) and the national algorithm filing system, and practice changes; confirm with the local 网信办 and counsel. This is preparation, not legal advice.

## Required Inputs

Ask for these if not provided:
- **The product**: what it generates (text, images, audio, video), for whom (public or businesses only), and how users reach it (app, website, API, mini program)
- **The model**: own model, a fine-tuned open model, or an API from a provider whose model is already filed (and which)
- **Training data** sources and how rights and personal information were handled, if the company trains
- **Safety measures**: content filtering, complaint handling, minors protection, logging
- **Launch date** and province of registration

## Output Structure

### 1. Obligations map
| Obligation | Applies? | Why | Where it is handled |
Covering: generative AI service filing (大模型备案) for providers of their own model to the public; registration (登记) for public-facing apps that call a filed model (confirm the local practice); algorithm filing (算法备案) through the national system where the product has public-opinion or social-mobilisation attributes; deep synthesis duties; and AI content labelling (explicit labels users can see, and implicit labels such as metadata).

### 2. Materials to prepare
For filing or registration: service description, model details or the filed model's filing number, the security self-assessment against the national security requirements for generative AI services (TC260 basic requirements), training data and annotation records where relevant, keyword and test question banks, user agreement and privacy policy, and complaint channels.

### 3. Labelling plan
Where explicit labels appear (text notices, image watermarks, audio cues, video captions), how implicit labels are written into file metadata, and how user downloads and shares keep the labels.

### 4. Launch checklist
| Item | Owner | Done |
Including real-name verification where required, minors protection, a complaint and reporting channel, log retention, and a process for handling illegal content.

## Quality Checks

- [ ] Each obligation states why it does or does not apply to this product
- [ ] Building on a filed model is distinguished from providing an own model
- [ ] The labelling plan covers both explicit and implicit labels
- [ ] Materials include the security self-assessment and test question banks
- [ ] Every procedure is marked to confirm with the provincial 网信办
- [ ] The output states it is not legal advice

## Anti-Patterns

- **Assuming an API wrapper needs nothing.** Public-facing apps on a filed model still have duties.
- **Labels only in the interface.** Downloads must carry implicit labels too.
- **Launching before filing.** Public services wait for filing or registration to complete.
- **A safety section with no evidence.** Reviewers ask for test results, not promises.

## Example Trigger Phrases

- "我们做了一个调用 DeepSeek API 的写作 App，要备案吗？"
- "大模型备案需要准备哪些材料？"
- "AI 生成的图片怎么加标识才合规？"
- "What filings does our generative AI product need before launching in China?"
