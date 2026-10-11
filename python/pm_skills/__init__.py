"""pm_skills: the PM Skills library of professional Agent Skills as importable building blocks for Python
AI agents (LangChain, CrewAI, LlamaIndex, or any framework).

Core helpers have no dependencies:

    import pm_skills
    pm_skills.search_skills("customer churn")     # -> [skill dicts]
    pm_skills.get_skill("prd-template")            # -> skill dict
    pm_skills.skill_prompt("prd-template", task="a referral feature")  # -> ready prompt

Framework adapters lazy-import the framework (install the extra you need):

    from pm_skills import as_langchain_tools, as_crewai_tools
"""
from __future__ import annotations
import json
from functools import lru_cache
from importlib import resources

__all__ = [
    "list_skills", "get_skill", "search_skills", "skill_prompt", "bundles",
    "as_langchain_tools", "as_crewai_tools", "__version__",
]
try:
    from importlib.metadata import version as _version, PackageNotFoundError
    try:
        __version__ = _version("pm-skills")
    except PackageNotFoundError:  # running from a source checkout
        __version__ = "0.0.0"
except ImportError:  # Python < 3.8
    __version__ = "0.0.0"


@lru_cache(maxsize=1)
def _skills() -> list[dict]:
    text = resources.files("pm_skills").joinpath("skills.json").read_text(encoding="utf-8")
    return json.loads(text)["skills"]


def list_skills(bundle: str | None = None) -> list[dict]:
    """All skills, optionally filtered to one bundle (e.g. 'pm-engineering')."""
    return [s for s in _skills() if bundle is None or s.get("plugin") == bundle]


def bundles() -> list[str]:
    return sorted({s.get("plugin", "other") for s in _skills()})


def get_skill(name: str) -> dict:
    """A skill by exact name. Raises KeyError if not found."""
    for s in _skills():
        if s["name"] == name:
            return s
    raise KeyError(f"No skill named {name!r}. Try search_skills().")


def search_skills(query: str, limit: int = 10) -> list[dict]:
    """Keyword search over title/description/name, best matches first."""
    q = query.lower()
    scored = [(s, (s["title"] + " " + s["description"] + " " + s["name"]).lower().count(q)) for s in _skills()]
    return [s for s, n in sorted(scored, key=lambda x: -x[1]) if n > 0][:limit]


def skill_prompt(name: str, task: str = "") -> str:
    """The skill's full instructions, ready to send to any model — optionally with a task."""
    body = get_skill(name)["instructions"]
    return body + (f"\n\n---\nApply this skill now to the following:\n{task}" if task else "")


# ---- framework adapters (lazy imports) -------------------------------------
def as_langchain_tools():
    """Two LangChain tools: search_pm_skills(query) and get_pm_skill(name)."""
    try:
        from langchain_core.tools import tool
    except ImportError as e:  # pragma: no cover
        raise ImportError("Install LangChain: pip install pm-skills[langchain]") from e

    @tool
    def search_pm_skills(query: str) -> str:
        """Search 205 professional skills (PRDs, launches, postmortems, rubrics…) by keyword."""
        hits = search_skills(query, limit=8)
        return "\n".join(f"- {s['name']}: {s['description']}" for s in hits) or "No matches."

    @tool
    def get_pm_skill(name: str) -> str:
        """Get a professional skill's full instructions by name, to apply to the current task."""
        try:
            return skill_prompt(name)
        except KeyError as e:
            return str(e)

    return [search_pm_skills, get_pm_skill]


def as_crewai_tools():
    """The same two tools as CrewAI BaseTools."""
    try:
        from crewai.tools import tool
    except ImportError as e:  # pragma: no cover
        raise ImportError("Install CrewAI: pip install pm-skills[crewai]") from e

    @tool("Search PM Skills")
    def search_pm_skills(query: str) -> str:
        """Search 205 professional skills by keyword; returns names + descriptions."""
        hits = search_skills(query, limit=8)
        return "\n".join(f"- {s['name']}: {s['description']}" for s in hits) or "No matches."

    @tool("Get PM Skill")
    def get_pm_skill(name: str) -> str:
        """Get a professional skill's full instructions by name."""
        try:
            return skill_prompt(name)
        except KeyError as e:
            return str(e)

    return [search_pm_skills, get_pm_skill]
