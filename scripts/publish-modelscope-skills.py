#!/usr/bin/env python3
"""Publish the Chinese-language skills to ModelScope Skills Central through its OpenAPI.

For every skill with a Simplified (skills-i18n/zh) or Traditional (skills-i18n/zh-TW) translation,
creates @<owner>/<name> if it does not exist yet: uploads a zip whose root holds exactly one
SKILL.md (the Chinese text, with a version added to the frontmatter), then creates the skill
with a Chinese display name, MIT licence and a link back to GitHub. Existing skills are left alone.

Environment: MODELSCOPE_TOKEN (access token), MODELSCOPE_OWNER, MODELSCOPE_HOST (www.modelscope.ai
or www.modelscope.cn). Standard library plus curl.

    python3 scripts/publish-modelscope-skills.py --dry-run
    python3 scripts/publish-modelscope-skills.py --limit 5
"""
import argparse
import io
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = "https://github.com/mohitagw15856/pm-claude-skills"
CATEGORY = {"pm-zh-content": "marketing-seo", "pm-chuhai": "marketing-seo"}
DOC_SKILLS = {"feishu-doc-writer", "dingtalk-work-log", "wecom-announcement", "cn-official-document",
              "cn-citation-gbt7714", "cn-thesis-proposal", "cn-weekly-report", "cn-year-end-review"}


def translations():
    out = []
    for lang in ("zh", "zh-TW"):
        base = os.path.join(ROOT, "skills-i18n", lang)
        for name in sorted(os.listdir(base)):
            f = os.path.join(base, name, "SKILL.md")
            if os.path.isfile(f) and os.path.isdir(os.path.join(ROOT, "skills", name)) and name not in {n for n, _ in out}:
                out.append((name, f))
    return out


def bundle_of(name):
    plugins = os.path.join(ROOT, "plugins")
    for b in sorted(os.listdir(plugins)):
        if os.path.isdir(os.path.join(plugins, b, "skills", name)):
            return b
    return ""


def build(name, path):
    text = open(path, encoding="utf-8").read().replace("\r\n", "\n")
    m = re.match(r"^---\n([\s\S]*?)\n---\n", text)
    if not m:
        raise ValueError(f"{name}: no frontmatter")
    fm = m.group(1)
    if not re.search(r"^version:", fm, re.M):
        text = text.replace(fm, fm + "\nversion: 1.0.0", 1)
    desc = re.search(r'^description:\s*"?(.*?)"?\s*$', fm, re.M).group(1)
    h1 = re.search(r"^# (.+)$", text, re.M)
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("SKILL.md", text)
    cat = "doc-processing" if name in DOC_SKILLS else CATEGORY.get(bundle_of(name), "other")
    return {"zip": buf.getvalue(), "display_name": (h1.group(1).strip() if h1 else name)[:60],
            "description": desc[:500], "category": cat}


def curl(args, token):
    cmd = ["curl", "-sS", "-w", "\n%{http_code}", "-H", f"Authorization: Bearer {token}"] + args
    out = subprocess.run(cmd, capture_output=True, text=True, timeout=120).stdout
    body, _, code = out.rpartition("\n")
    return int(code or 0), body


def main():
    ap = argparse.ArgumentParser(description="Publish Chinese skills to ModelScope Skills Central.")
    ap.add_argument("--dry-run", action="store_true", help="list what would be published; no network writes")
    ap.add_argument("--limit", type=int, default=0, help="publish at most this many new skills")
    args = ap.parse_args()
    owner = os.environ.get("MODELSCOPE_OWNER", "")
    host = os.environ.get("MODELSCOPE_HOST", "www.modelscope.cn")
    token = os.environ.get("MODELSCOPE_TOKEN", "")
    if host not in ("www.modelscope.cn", "www.modelscope.ai") or not re.match(r"^[A-Za-z0-9_.-]+$", owner):
        sys.exit("MODELSCOPE_HOST must be www.modelscope.cn or www.modelscope.ai, and MODELSCOPE_OWNER a username")
    api = f"https://{host}/openapi/v1"
    items = translations()
    print(f"{len(items)} translated skills")
    if args.dry_run:
        for name, path in items:
            b = build(name, path)
            print(f"  @{owner}/{name}  [{b['category']}]  {b['display_name']}")
        return 0
    if not token:
        sys.exit("MODELSCOPE_TOKEN is not set")
    created = skipped = failed = 0
    for name, path in items:
        code, _ = curl([f"{api}/skills/@{owner}/{name}"], token)
        if code == 200:
            skipped += 1
            continue
        if args.limit and created >= args.limit:
            break
        b = build(name, path)
        with tempfile.NamedTemporaryFile(suffix=".zip", delete=False) as tmp:
            tmp.write(b["zip"])
            zpath = tmp.name
        code, body = curl(["-X", "POST", f"{api}/files/upload", "-F", f"file=@{zpath};filename={name}.zip", "-F", "type=skill"], token)
        os.unlink(zpath)
        try:
            file_id = json.loads(body)["data"]["id"]
        except (ValueError, KeyError, TypeError):
            print(f"  ✗ {name}: upload failed (HTTP {code}): {body[:200]}")
            failed += 1
            continue
        payload = {"owner": owner, "skill_name": name, "display_name": b["display_name"], "description": b["description"],
                   "skill_file": file_id, "category": b["category"], "license": "MIT License",
                   "tags": ["pm-skills", "chinese"], "source_url": f"{REPO}/tree/main/skills/{name}"}
        code, body = curl(["-X", "POST", f"{api}/skills", "-H", "Content-Type: application/json", "--data-binary", json.dumps(payload, ensure_ascii=False)], token)
        if code in (200, 201):
            created += 1
            print(f"  ✓ @{owner}/{name}")
        else:
            failed += 1
            print(f"  ✗ {name}: create failed (HTTP {code}): {body[:200]}")
        time.sleep(1)
    print(f"created {created}, already there {skipped}, failed {failed}")
    return 1 if failed and not created else 0


if __name__ == "__main__":
    sys.exit(main())
