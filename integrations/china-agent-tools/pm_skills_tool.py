"""PM Skills as a tool for MaxKB (函数库) and FastGPT (代码运行). Standard library only.

    find_skills("帮我写周报", 5)            -> [{"name", "description"}, ...]
    get_skill("cn-weekly-report", "zh")     -> the full SKILL.md text

Everything loads from the Gitee mirror (reachable in mainland China), with GitHub as the fallback.
"""
import json
import re
import urllib.request

MIRRORS = ("https://gitee.com/mohitagw/pm-claude-skills/raw/main/{path}",
           "https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/{path}")
NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
_INDEX = None


def _get(path, timeout=15):
    errors = []
    for mirror in MIRRORS:
        try:
            req = urllib.request.Request(mirror.format(path=path), headers={"User-Agent": "pm-skills-tool"})
            with urllib.request.urlopen(req, timeout=timeout) as res:
                return res.read().decode("utf-8")
        except Exception as e:
            errors.append(str(e))
    raise RuntimeError("could not reach Gitee or GitHub: " + "; ".join(errors))


def _tokens(text):
    text = text.lower()
    words = [w for w in re.findall(r"[a-z0-9]+", text) if len(w) > 1]
    cjk = [run[i:i + 2] for run in re.findall(r"[一-鿿]+", text) for i in range(max(1, len(run) - 1))]
    return set(words) | set(cjk)


def _index():
    global _INDEX
    if _INDEX is None:
        data = json.loads(_get("web/skills-index.json"))
        _INDEX = [(s["name"], s.get("description", ""), _tokens(s["name"].replace("-", " ")),
                   _tokens(" ".join([s.get("description", ""), s.get("descriptionZh", "")])))
                  for s in data["skills"] if not s.get("deprecated")]
    return _INDEX


def find_skills(query, limit=5):
    q = _tokens(query or "")
    if not q:
        return []
    # Words in the skill's own name count three times as much as words in its description.
    scored = sorted(((3 * len(q & name_t) + len(q & desc_t), name, desc) for name, desc, name_t, desc_t in _index()), reverse=True)
    return [{"name": name, "description": desc[:300]} for score, name, desc in scored[: max(1, min(int(limit), 10))] if score > 0]


def get_skill(name, language="en"):
    if not isinstance(name, str) or not NAME.match(name):
        raise ValueError("name must be a kebab-case skill name such as cn-weekly-report")
    if language == "zh":
        try:
            text = _get(f"skills-i18n/zh/{name}/SKILL.md")
            if text.lstrip().startswith("---"):
                return text
        except RuntimeError:
            pass
    text = _get(f"skills/{name}/SKILL.md")
    if not text.lstrip().startswith("---"):
        raise ValueError(f"unknown skill: {name}")
    return text


if __name__ == "__main__":
    hits = find_skills("帮我写周报", 3)
    assert hits and hits[0]["name"] == "cn-weekly-report", hits
    assert find_skills("my landlord kept my deposit", 3)[0]["name"] == "security-deposit-recovery"
    assert "language: zh" in get_skill("cn-weekly-report", "zh")
    try:
        get_skill("../x")
        raise SystemExit("accepted a bad name")
    except ValueError:
        pass
    print("ok:", [h["name"] for h in hits])
