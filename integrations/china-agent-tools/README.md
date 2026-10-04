# 在 MaxKB 和 FastGPT 里使用 PM Skills · PM Skills in MaxKB and FastGPT

[`pm_skills_tool.py`](pm_skills_tool.py) 只用 Python 标准库，从 Gitee 镜像读取技能（国内可访问），GitHub 作为备用。两个函数：

- `find_skills(query, limit=5)`：根据中文或英文请求，返回最匹配的技能名称和简介
- `get_skill(name, language="zh")`：返回技能的完整说明（有中文版时返回中文版）

`pm_skills_tool.py` uses only the standard library and loads skills from the Gitee mirror, with GitHub as a fallback. Run `python3 pm_skills_tool.py` to self-test.

## MaxKB：函数库 / 工具

新建一个函数，把 `pm_skills_tool.py` 的全部内容粘贴进去，在文件末尾加上入口函数：

```python
def pm_skills(query: str, skill_name: str = "") -> str:
    """先用 query 找技能；给了 skill_name 就直接返回该技能的完整说明。"""
    if skill_name:
        return get_skill(skill_name, "zh")
    hits = find_skills(query, 5)
    return "\n".join(f"{h['name']}: {h['description']}" for h in hits) or "没有找到匹配的技能"
```

参数：`query`（字符串，必填）、`skill_name`（字符串，可选）。在应用里让模型先调用一次找技能，再带上技能名调用一次取说明。

## FastGPT：代码运行节点

在工作流里加一个"代码运行"节点（Python），粘贴 `pm_skills_tool.py` 的全部内容，再加上：

```python
def main(query: str) -> dict:
    hits = find_skills(query, 3)
    if not hits:
        return {"skill": "", "instructions": ""}
    return {"skill": hits[0]["name"], "instructions": get_skill(hits[0]["name"], "zh")}
```

把输出的 `instructions` 接到 AI 对话节点的系统提示词，用户的问题作为输入，就得到一个按技能工作的应用。

## 也可以用 MCP

FastGPT 和 MaxKB 都能接入 MCP 工具。部署在海外、能访问 `workers.dev` 的实例可以直接用 `https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp`（Streamable HTTP）。部署在国内的实例请用上面的函数，它们只依赖 Gitee。

See also: the [Dify plugin](../dify-plugin/) and [Dify app templates](../dify-templates/).
