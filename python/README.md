# pm-skills (Python)

**206 professional Agent Skills** — PRDs, launch plans, postmortems, rubrics, contracts, pitch
decks and more, across 21 professions — as importable building blocks for Python AI agents.
The skills are bundled with the package, so there's **no network call and no API key** to read them.

```bash
pip install pm-skills                 # core
pip install "pm-skills[langchain]"    # + LangChain tools
pip install "pm-skills[crewai]"       # + CrewAI tools
```

## Core (no dependencies)

```python
import pm_skills

pm_skills.search_skills("customer churn")          # -> [skill dicts]
pm_skills.get_skill("prd-template")["description"]  # -> "..."
pm_skills.bundles()                                  # -> ['pm-creator', 'pm-engineering', ...]

# A ready-to-send prompt for any model:
prompt = pm_skills.skill_prompt("incident-postmortem", task="API outage, 42 min, bad deploy")
```

## As LangChain tools

```python
from langchain.agents import create_react_agent
from pm_skills import as_langchain_tools

tools = as_langchain_tools()   # [search_pm_skills, get_pm_skill]
# give `tools` to your agent — it can search the library and pull a skill's framework on demand
```

## As CrewAI tools

```python
from crewai import Agent
from pm_skills import as_crewai_tools

analyst = Agent(role="Product Analyst", tools=as_crewai_tools(), goal="...", backstory="...")
```

Any other framework works too — `skill_prompt(name, task)` returns plain text you can drop into
any LLM call. Same skills run live in the [browser playground](https://mohitagw15856.github.io/pm-claude-skills/),
over [MCP](https://github.com/mohitagw15856/pm-claude-skills/tree/main/mcp), or via `npx pm-claude-skills`.
