#!/usr/bin/env python3
"""ROPA validator for the gdpr-compliance skill.

Checks a Record of Processing Activities for the things GDPR actually requires —
a lawful basis, a purpose, and a retention period per activity — scores
completeness, and flags activities that trigger a DPIA (Art. 35). Deterministic,
standard library only, no network.

Input
-----
A JSON list of activities (file path or '-' for stdin). Per activity:
  activity         : name (required)
  purpose          : why you process (required)
  lawful_basis     : one of consent|contract|legal_obligation|vital_interests|
                     public_task|legitimate_interests (required)
  retention        : a retention period string, e.g. "3y" (required)
  recipients       : optional list
  special_category : optional bool (health/biometric/etc.)
  large_scale      : optional bool
  systematic_monitoring : optional bool

Usage
-----
  python3 ropa_check.py ropa.json
  python3 ropa_check.py ropa.json --json
"""
import argparse
import json
import sys

VALID_BASES = {
    "consent", "contract", "legal_obligation",
    "vital_interests", "public_task", "legitimate_interests",
}


def load(path):
    text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(text)
    if not isinstance(data, list):
        raise ValueError("Expected a JSON list of processing activities.")
    return data


def check(activities):
    rows = []
    for a in activities:
        name = a.get("activity", "(unnamed)")
        issues = []
        basis = str(a.get("lawful_basis", "")).lower()
        if not a.get("purpose"):
            issues.append("no purpose")
        if not basis:
            issues.append("no lawful basis")
        elif basis not in VALID_BASES:
            issues.append(f"invalid lawful basis '{basis}'")
        if not a.get("retention"):
            issues.append("no retention period")
        if a.get("special_category") and basis:
            issues.append("special-category data needs an Art. 9 condition (confirm)")
        # DPIA triggers (Art. 35): large-scale special category, or systematic monitoring.
        dpia = bool(a.get("special_category") and a.get("large_scale")) or bool(a.get("systematic_monitoring"))
        rows.append({"activity": name, "issues": issues, "dpia_required": dpia, "compliant": not issues})
    n = len(rows)
    ok = sum(1 for r in rows if r["compliant"])
    return {
        "completeness": round(100 * ok / n, 1) if n else 0.0,
        "activities": n,
        "compliant": ok,
        "dpia_required": [r["activity"] for r in rows if r["dpia_required"]],
        "rows": rows,
    }


def main():
    ap = argparse.ArgumentParser(description="Validate a GDPR ROPA and flag DPIA triggers.")
    ap.add_argument("input", help="ROPA JSON file, or - for stdin")
    ap.add_argument("--json", action="store_true", help="emit JSON")
    args = ap.parse_args()
    try:
        result = check(load(args.input))
    except Exception as e:  # noqa: BLE001
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps(result, indent=2))
        return

    print(f"ROPA completeness: {result['completeness']}%  ({result['compliant']}/{result['activities']} activities complete)")
    flawed = [r for r in result["rows"] if r["issues"]]
    if flawed:
        print("\nGaps:")
        for r in flawed:
            print(f"  🔴 {r['activity']}: {', '.join(r['issues'])}")
    if result["dpia_required"]:
        print("\n⚠ DPIA required (Art. 35) for:")
        for a in result["dpia_required"]:
            print(f"  • {a}")


if __name__ == "__main__":
    main()
