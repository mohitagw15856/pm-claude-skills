#!/usr/bin/env python3
"""Rough keyword coverage of a job ad's requirement lines by a CV.

A first pass only: it finds the bullet lines in a job ad, keeps the meaningful
words of each, and reports what share of them appear in the CV. It cannot tell
evidence from a keyword, so the skill reads and rates each line afterwards.
Standard library only, no network access.

Works on English and on Chinese text (Chinese is compared as two-character
pieces, since it has no spaces between words).

Usage
-----
    python3 jd_gap.py --jd job.txt --cv cv.txt
    python3 jd_gap.py --jd job.txt --cv cv.txt --json
    python3 jd_gap.py --selftest
"""
from __future__ import annotations

import argparse
import json
import re
import sys

STOP = set(
    """a an and are as at be by can do for from have in into is it of on or our
    that the their this to we will with you your who what years year experience
    ability strong excellent good knowledge understanding skills skill working
    work plus preferred required requirements etc including include such using""".split()
)
BULLET = re.compile(r"^\s*(?:[-*•●·]|\d+[.)、]|[（(]?\d+[）)])\s*(.+)$")
CJK = re.compile(r"[一-鿿]")


def read(path: str) -> str:
    if path == "-":
        return sys.stdin.read()
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def requirement_lines(jd: str) -> list[str]:
    lines = []
    for raw in jd.splitlines():
        m = BULLET.match(raw)
        if m:
            text = m.group(1).strip()
            if len(text) >= 4:
                lines.append(text)
    return lines


def terms(text: str) -> set[str]:
    text = text.lower()
    out = {w for w in re.findall(r"[a-z][a-z0-9+#.\-]{1,}", text) if w not in STOP}
    out = {w.rstrip(".") for w in out if w.rstrip(".")}
    for run in re.findall(r"[一-鿿]+", text):
        if len(run) == 1:
            continue
        out.update(run[i : i + 2] for i in range(len(run) - 1))
    return out


def score(jd: str, cv: str) -> dict:
    cv_terms = terms(cv)
    rows = []
    for line in requirement_lines(jd):
        want = terms(line)
        if not want:
            continue
        hit = sorted(want & cv_terms)
        miss = sorted(want - cv_terms)
        share = len(hit) / len(want)
        rows.append({"requirement": line, "coverage": round(share, 2), "found": hit, "missing": miss})
    overall = round(sum(r["coverage"] for r in rows) / len(rows), 2) if rows else None
    return {"requirements": rows, "average_coverage": overall, "note": "keyword overlap only; rate evidence by reading"}


def selftest() -> int:
    jd = "Requirements:\n- 5+ years of product management experience\n- SQL and Python\n* Stakeholder management\n1. Kubernetes\n- 熟悉数据分析和用户研究\nNot a bullet line"
    cv = "Product manager for 6 years. Wrote SQL daily. Managed stakeholders. 负责数据分析工作。"
    r = score(jd, cv)
    checks = [
        (len(r["requirements"]) == 5, "five bullet lines found"),
        (r["requirements"][0]["coverage"] > 0, "product management line partly covered"),
        ("kubernetes" in r["requirements"][3]["missing"], "kubernetes missing"),
        (r["requirements"][3]["coverage"] == 0, "kubernetes coverage is 0, not dropped"),
        ("数据" in r["requirements"][4]["found"], "Chinese two-character piece matched"),
        (score("no bullets here", cv)["average_coverage"] is None, "no requirements gives None, not 0"),
        (requirement_lines("（1）负责产品规划\n2、熟悉SQL") == ["负责产品规划", "熟悉SQL"], "Chinese list markers"),
    ]
    failed = [name for ok, name in checks if not ok]
    for name in failed:
        print(f"FAIL {name}", file=sys.stderr)
    print(f"jd_gap selftest: {len(checks) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Rough keyword coverage of a job ad by a CV.")
    p.add_argument("--jd", help="job ad text file, or - for stdin")
    p.add_argument("--cv", help="CV text file")
    p.add_argument("--json", action="store_true")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if not a.jd or not a.cv:
        p.error("--jd and --cv are both required")
    if a.jd == "-" and a.cv == "-":
        p.error("only one of --jd and --cv can read from stdin")
    result = score(read(a.jd), read(a.cv))
    if a.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    if not result["requirements"]:
        print("No bullet lines found in the job ad. Paste the requirements as a list.")
        return 0
    for i, row in enumerate(result["requirements"], 1):
        print(f"{i:>2}. {int(row['coverage'] * 100):>3}%  {row['requirement']}")
        if row["missing"]:
            print(f"        not found: {', '.join(row['missing'][:8])}")
    print(f"\nAverage keyword coverage: {int(result['average_coverage'] * 100)}% ({result['note']})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
