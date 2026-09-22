#!/usr/bin/env python3
"""Print the complete release package for a newly drafted skill in this library.

usage: promoter_publish.py [-h] [--bundle BUNDLE] [--version V] [--selftest] SKILL

Checks the skill folder exists and has the required sections, then prints, in order, the
generator commands, the gates, the manifests to bump, the CHANGELOG stanza and the git
commands. It never runs anything: the publish skill reads this and executes with the
user's confirmation. Stdlib only.
"""
import argparse, os, re, sys

REQUIRED = ["What This Skill Produces", "Required Inputs", "Output Format", "Quality Checks", "Anti-Patterns"]


def check(skill_dir):
    md_path = os.path.join(skill_dir, "SKILL.md")
    if not os.path.isfile(md_path):
        return [f"missing {md_path}"]
    md = open(md_path, encoding="utf-8").read()
    problems = []
    if not re.search(r"^name:\s*\S+", md, re.M):
        problems.append("frontmatter has no name")
    d = re.search(r'^description:\s*"?(.*?)"?\s*$', md, re.M)
    if not d or "Use when" not in d.group(1) or "Produces" not in d.group(1):
        problems.append("description must contain 'Use when' and 'Produces'")
    for sec in REQUIRED:
        if not re.search(rf"^## {re.escape(sec)}", md, re.M):
            problems.append(f"missing section: {sec}")
    if "—" in md:
        problems.append("contains an em dash; this bundle avoids them")
    return problems


def package(skill, bundle, version):
    return f"""# Release package for {skill}

## 1. Generate (never hand-edit these outputs)
node scripts/new-bundle.mjs --name {bundle} --desc "<one line>" --skills {skill}   # wires plugin.json + marketplace entry, idempotent
node web/build-skills.mjs && node scripts/build-exports.mjs && node scripts/build-workflows.mjs && node scripts/build-samples.mjs && node scripts/build-skills-md.mjs && node scripts/build-disambiguation.mjs && node scripts/build-conformance-badge.mjs && node scripts/check-risk-tiers.mjs

## 2. Gates (all must pass)
node scripts/skillcheck.mjs
node scripts/skill-dupes.mjs --check
node scripts/check-vendor-neutrality.mjs
node scripts/check-eval-coverage.mjs --check      # needs a case for {skill} in evals/cases.json
node scripts/check-drift.mjs                      # every living doc must carry the new headline count

## 3. Manifests to bump to {version}
package.json · server.json (two places) · .claude-plugin/marketplace.json · python/pyproject.toml (its own scheme)
Headline count: package.json and server.json descriptions must read "<N> professional ..."; README, PACKS, CHEATSHEET, PERSONAS, REPO-MAP, training/*, docs/SHOWCASE, docs/FOUNDATION and web/*.html carry the same number.

## 4. CHANGELOG.md (under ## [Unreleased] → new heading)
## [{version}] - <title> - <date>
### Added
- **{bundle}** ({skill}) - <what it does, one line>

## 5. Git
git add -A -- . ':!.DS_Store'
git commit -F <message-file>            # no backticks in the message; end with the co-author line the repo uses
git tag -a v{version} -F <notes-file>
git push origin main && git push origin v{version}
gh release create v{version} --title "v{version} - <title>" --notes-file <notes-file> --latest

Publishing to npm, PyPI, the MCP registry and the newsletter is triggered by the GitHub release.
"""


def selftest():
    import tempfile
    d = tempfile.mkdtemp()
    open(os.path.join(d, "SKILL.md"), "w").write('---\nname: t\ndescription: "X. Use when y. Produces z."\n---\n## What This Skill Produces\n## Required Inputs\n## Output Format\n## Quality Checks\n## Anti-Patterns\n')
    assert check(d) == [], check(d)
    open(os.path.join(d, "SKILL.md"), "w").write('---\nname: t\ndescription: "X"\n---\n')
    p = check(d)
    assert any("Use when" in x for x in p) and any("missing section" in x for x in p), p
    assert "git tag -a v80.0.0" in package("t", "pm-t", "80.0.0")
    print("promoter_publish self-test: 3 passed")
    return 0


def main():
    ap = argparse.ArgumentParser(description="Print the full release package for a drafted skill.")
    ap.add_argument("skill", nargs="?", help="skill name (folder under skills/)")
    ap.add_argument("--bundle", default="pm-custom", help="bundle to wire it into (default pm-custom)")
    ap.add_argument("--version", default="<next>", help="release version, e.g. 80.0.0")
    ap.add_argument("--selftest", action="store_true", help="run the built-in checks and exit")
    a = ap.parse_args()
    if a.selftest:
        return selftest()
    if not a.skill:
        ap.error("give a skill name (or --selftest)")
    problems = check(os.path.join("skills", a.skill))
    if problems:
        print("Not ready to publish:")
        for p in problems:
            print(f"  - {p}")
        return 2
    print(package(a.skill, a.bundle, a.version))
    return 0


if __name__ == "__main__":
    sys.exit(main())
