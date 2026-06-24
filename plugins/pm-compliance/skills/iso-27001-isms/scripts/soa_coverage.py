#!/usr/bin/env python3
"""Statement of Applicability coverage scorer for the iso-27001-isms skill.

Scores SoA coverage over the applicable Annex A controls and — the part auditors
check — flags any control marked not-applicable WITHOUT a justification, which is
the classic ISO 27001 finding. Standard library only, no network.

Input
-----
A JSON list of SoA entries (file path or '-' for stdin). Per entry:
  control      : Annex A reference, e.g. "A.5.1" (required)
  applicable   : bool
  status       : "met" | "partial" | "gap"  (for applicable controls)
  justification: text — required when applicable is false (and recommended always)

Usage
-----
  python3 soa_coverage.py soa.json
  python3 soa_coverage.py soa.json --json
"""
import argparse
import json
import sys

SCORE = {"met": 1.0, "partial": 0.5, "gap": 0.0}


def load(path):
    text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(text)
    if not isinstance(data, list):
        raise ValueError("Expected a JSON list of SoA entries.")
    return data


def check(entries):
    applicable = [e for e in entries if e.get("applicable")]
    excluded = [e for e in entries if not e.get("applicable")]
    got = 0.0
    gaps = []
    for e in applicable:
        st = str(e.get("status", "gap")).lower()
        if st not in SCORE:
            raise ValueError(f"Bad status {st!r} for {e.get('control')!r}.")
        got += SCORE[st]
        if st != "met":
            gaps.append({"control": e.get("control", ""), "status": st})
    unjustified = [e.get("control", "") for e in excluded if not str(e.get("justification", "")).strip()]
    return {
        "controls_total": len(entries),
        "applicable": len(applicable),
        "excluded": len(excluded),
        "coverage": round(100 * got / len(applicable), 1) if applicable else 0.0,
        "gaps": gaps,
        "excluded_without_justification": unjustified,
    }


def main():
    ap = argparse.ArgumentParser(description="Score ISO 27001 SoA coverage and flag unjustified exclusions.")
    ap.add_argument("input", help="SoA JSON file, or - for stdin")
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

    print(f"SoA coverage: {r['coverage']}% of {r['applicable']} applicable controls "
          f"({r['excluded']} excluded, {r['controls_total']} total)")
    if r["gaps"]:
        print(f"\nApplicable but not met ({len(r['gaps'])}):")
        for g in r["gaps"]:
            mark = "🔴" if g["status"] == "gap" else "🟡"
            print(f"  {mark} {g['control']} ({g['status']})")
    if r["excluded_without_justification"]:
        print(f"\n🔴 Excluded WITHOUT justification ({len(r['excluded_without_justification'])}) — audit findings:")
        for c in r["excluded_without_justification"]:
            print(f"  • {c}")


if __name__ == "__main__":
    main()
