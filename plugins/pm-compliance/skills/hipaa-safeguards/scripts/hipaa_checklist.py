#!/usr/bin/env python3
"""HIPAA Security Rule safeguard scorer for the hipaa-safeguards skill.

Scores safeguard coverage by category and, crucially, surfaces unmet REQUIRED
safeguards separately from addressable ones — because a missing required
safeguard is a straight violation, while an addressable one needs a documented
justification. Standard library only, no network.

Input
-----
A JSON list of safeguards (file path or '-' for stdin). Per safeguard:
  category : "Administrative" | "Physical" | "Technical"
  safeguard: description (required)
  required : bool — true = Required, false = Addressable
  status   : "met" | "partial" | "gap"
  justification : optional — for addressable items not fully met

Usage
-----
  python3 hipaa_checklist.py safeguards.json
  python3 hipaa_checklist.py safeguards.json --json
"""
import argparse
import json
import sys

SCORE = {"met": 1.0, "partial": 0.5, "gap": 0.0}


def load(path):
    text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(text)
    if not isinstance(data, list):
        raise ValueError("Expected a JSON list of safeguards.")
    return data


def check(items):
    cats = {}
    required_gaps = []
    addressable_undoc = []
    for s in items:
        cat = s.get("category", "Uncategorised")
        status = str(s.get("status", "gap")).lower()
        if status not in SCORE:
            raise ValueError(f"Bad status {status!r} for {s.get('safeguard')!r}.")
        c = cats.setdefault(cat, {"got": 0.0, "n": 0})
        c["got"] += SCORE[status]
        c["n"] += 1
        if status != "met":
            if s.get("required"):
                required_gaps.append({"category": cat, "safeguard": s.get("safeguard", ""), "status": status})
            elif not s.get("justification"):
                addressable_undoc.append({"category": cat, "safeguard": s.get("safeguard", "")})
    per = {k: round(100 * v["got"] / v["n"], 1) if v["n"] else 0.0 for k, v in cats.items()}
    got = sum(v["got"] for v in cats.values())
    n = sum(v["n"] for v in cats.values())
    return {
        "overall": round(100 * got / n, 1) if n else 0.0,
        "per_category": per,
        "safeguards": n,
        "required_gaps": required_gaps,
        "addressable_undocumented": addressable_undoc,
    }


def main():
    ap = argparse.ArgumentParser(description="Score HIPAA Security Rule safeguard coverage.")
    ap.add_argument("input", help="safeguards JSON file, or - for stdin")
    ap.add_argument("--json", action="store_true", help="emit JSON")
    args = ap.parse_args()
    try:
        r = check(load(args.input))
    except Exception as e:  # noqa: BLE001
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps(r, indent=2))
        return

    print(f"HIPAA safeguard coverage: {r['overall']}%  ({r['safeguards']} safeguards)")
    for cat, pct in sorted(r["per_category"].items()):
        print(f"  {pct:5.1f}%  {cat}")
    if r["required_gaps"]:
        print(f"\n🔴 Unmet REQUIRED safeguards ({len(r['required_gaps'])}) — these are violations, fix first:")
        for g in r["required_gaps"]:
            print(f"  • [{g['category']}] {g['safeguard']} ({g['status']})")
    if r["addressable_undocumented"]:
        print(f"\n🟡 Addressable safeguards not met AND not justified ({len(r['addressable_undocumented'])}):")
        for g in r["addressable_undocumented"]:
            print(f"  • [{g['category']}] {g['safeguard']} — implement or document the alternative")


if __name__ == "__main__":
    main()
