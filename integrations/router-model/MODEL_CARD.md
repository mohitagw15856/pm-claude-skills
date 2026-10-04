---
license: mit
tasks:
  - text-classification
language:
  - en
  - zh
tags:
  - agent-skills
  - routing
  - retrieval
  - chinese
frameworks:
  - other
---

# pm-skills-router

A small, dependency-free router for the [PM Skills](https://github.com/mohitagw15856/pm-claude-skills) library. Give it a request in English or Chinese and it returns the best-matching skills from {{SKILLS}}. It runs anywhere Python runs: no GPU, no network, standard library only.

一个小巧、零依赖的技能路由模型：输入中文或英文的请求，返回 PM Skills 技能库中最匹配的技能。不需要 GPU，不联网，只用 Python 标准库。

## Use it 使用

```python
from modelscope import snapshot_download
import sys
path = snapshot_download('{{OWNER_NAME}}')
sys.path.insert(0, path)
from pm_router import Router

router = Router.load(f"{path}/router.json")
router.route("帮我把这些笔记整理成周报", k=3)
# [('cn-weekly-report', 0.34...), ('dingtalk-work-log', ...), ...]
router.route("my landlord is keeping my deposit", k=3)
```

Then load the matching skill's `SKILL.md` from the library (npm `pm-claude-skills`, PyPI `pm-skills`, or the [Gitee mirror](https://gitee.com/mohitagw/pm-claude-skills)) and give it to your model as instructions.

## How it works 原理

TF-IDF nearest centroid. Latin text becomes word unigrams and bigrams; Chinese becomes character bigrams. Each skill's centroid is built from its trigger phrases (the [pm-skills-instruct](https://www.modelscope.ai/datasets/mohitagw15856/pm-skills-instruct) routing set, weighted double), its description, and its Simplified Chinese description where one exists, then pruned to the 80 strongest features. The training script is in the model files (`pm_router.py train`).

## Evaluation 评测

Measured when this version was built:

| Test | Top-1 | Top-3 | Cases |
|---|---|---|---|
| Held-out trigger phrases (one per skill with two or more, not used in training) | {{H1}} | {{H3}} | {{HN}} |
| Chinese eval inputs from the library's eval set | {{Z1}} | {{Z3}} | {{ZN}} |

The Chinese test is small, so treat it as a sanity check rather than a benchmark. Lexical routing misses paraphrases that share no words with a skill; when the top score is low (below about 0.1), ask the user to rephrase or show the top few choices.

## Updates 更新

Rebuilt and republished on every library release by `.github/workflows/publish-modelscope-model.yml` in the source repository. Version: {{TAG}}.
