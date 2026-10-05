# Cookbooks

Jupyter notebooks that use the [`pm-skills`](https://pypi.org/project/pm-skills/) Python package with Chinese and local models. Each one installs the package, finds a skill, runs it, and routes a plain-language request to the right skill. The model call uses only Python's standard library, against any OpenAI-compatible endpoint.

| Notebook | Model | Key |
|---|---|---|
| [01-deepseek.ipynb](01-deepseek.ipynb) | DeepSeek (`deepseek-chat`) | `DEEPSEEK_API_KEY` |
| [02-qwen-modelscope.ipynb](02-qwen-modelscope.ipynb) | Qwen on ModelScope API-Inference (daily free quota) | `MODELSCOPE_TOKEN` |
| [03-ollama-local.ipynb](03-ollama-local.ipynb) | Any Ollama model, fully offline | none |

Keys are read from the environment, never written into the notebooks; the committed notebooks carry no outputs. Outputs are drafts to check, not professional advice.

## 中文说明

三个 Jupyter 示例：用 `pm-skills` Python 包配合 DeepSeek、魔搭（通义千问，每天有免费额度）和本地 Ollama 运行技能。模型调用只用 Python 标准库，任何兼容 OpenAI 格式的接口都能用。Key 从环境变量读取，不会写进笔记本。安装国内镜像：`pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pm-skills`。
