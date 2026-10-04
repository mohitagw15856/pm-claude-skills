"""Core logic for the PM Skills Dify plugin. Standard library only, so it is testable without Dify.

- find(query, limit): ranks skills with the bundled router (data/router.json), offline
- fetch(name, language): loads SKILL.md from the Gitee mirror, falling back to GitHub
"""
import json
import os
import re
import urllib.request

from pm_router import Router

HERE = os.path.dirname(os.path.abspath(__file__))
NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
MIRRORS = (
    "https://gitee.com/mohitagw/pm-claude-skills/raw/main/{path}",
    "https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/{path}",
)
_router = None
_index = None


def _load():
    global _router, _index
    if _router is None:
        _router = Router.load(os.path.join(HERE, "data", "router.json"))
        with open(os.path.join(HERE, "data", "index.json"), encoding="utf-8") as f:
            _index = json.load(f)
    return _router, _index


def find(query: str, limit: int = 5) -> list[dict]:
    if not isinstance(query, str) or not query.strip():
        raise ValueError("query must be a non-empty string")
    limit = max(1, min(int(limit or 5), 10))
    router, index = _load()
    out = []
    for name, score in router.route(query, k=limit):
        entry = index.get(name, {})
        out.append({"name": name, "score": score, "description": entry.get("d", ""), "has_chinese": bool(entry.get("zh"))})
    return out


def fetch(name: str, language: str = "en", timeout: float = 8.0) -> str:
    if not isinstance(name, str) or not NAME.match(name):
        raise ValueError("name must be a kebab-case skill name such as cn-weekly-report")
    _, index = _load()
    if name not in index:
        raise ValueError(f"unknown skill: {name}. Call find_skill first.")
    paths = []
    if language == "zh" and index[name].get("zh"):
        paths.append(f"skills-i18n/zh/{name}/SKILL.md")
    paths.append(f"skills/{name}/SKILL.md")
    errors = []
    for path in paths:
        for mirror in MIRRORS:
            url = mirror.format(path=path)
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "pm-skills-dify-plugin"})
                with urllib.request.urlopen(req, timeout=timeout) as res:
                    text = res.read().decode("utf-8")
                if text.lstrip().startswith("---"):
                    return text
                errors.append(f"{url}: unexpected content")
            except Exception as e:  # network errors fall through to the next mirror
                errors.append(f"{url}: {e}")
    raise RuntimeError("could not load the skill from Gitee or GitHub: " + "; ".join(errors[:2]))
