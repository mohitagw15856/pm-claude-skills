#!/usr/bin/env python3
"""Retention-schedule validator for the data-retention-policy skill.

Validates a retention schedule — every category needs a period AND a basis — and,
where an event date is given, computes the earliest deletion date. Flags the
risky rows (no period, no basis) so "keep forever" can't hide. Standard library
only, no network.

Input
-----
A JSON list of categories (file path or '-' for stdin). Per category:
  category        : name (required)
  retention_months: integer months (required; omit/null = UNDEFINED, a flag)
  basis           : legal/business basis string (required)
  event_date      : optional "YYYY-MM-DD" — start of the retention clock

Usage
-----
  python3 retention_schedule.py data.json
  python3 retention_schedule.py data.json --json
"""
import argparse
import json
import sys
from datetime import date


def load(path):
    text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(text)
    if not isinstance(data, list):
        raise ValueError("Expected a JSON list of data categories.")
    return data


def add_months(d, months):
    m = d.month - 1 + months
    y = d.year + m // 12
    m = m % 12 + 1
    # clamp day to end of month
    day = min(d.day, [31, 29 if y % 4 == 0 and (y % 100 != 0 or y % 400 == 0) else 28,
                      31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1])
    return date(y, m, day)


def check(items):
    rows = []
    no_period = []
    no_basis = []
    for c in items:
        name = c.get("category", "(unnamed)")
        months = c.get("retention_months")
        basis = str(c.get("basis", "")).strip()
        delete_on = None
        if months is None:
            no_period.append(name)
        if not basis:
            no_basis.append(name)
        if months is not None and c.get("event_date"):
            try:
                ev = date.fromisoformat(c["event_date"])
                delete_on = add_months(ev, int(months)).isoformat()
            except ValueError:
                raise ValueError(f"Bad event_date for {name!r} (use YYYY-MM-DD).")
        rows.append({"category": name, "retention_months": months, "basis": basis or None,
                     "delete_on": delete_on, "ok": months is not None and bool(basis)})
    n = len(rows)
    ok = sum(1 for r in rows if r["ok"])
    return {"categories": n, "complete": ok,
            "completeness": round(100 * ok / n, 1) if n else 0.0,
            "missing_period": no_period, "missing_basis": no_basis, "rows": rows}


def main():
    ap = argparse.ArgumentParser(description="Validate a data retention schedule.")
    ap.add_argument("input", help="schedule JSON file, or - for stdin")
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

    print(f"Retention schedule: {r['completeness']}% complete ({r['complete']}/{r['categories']} categories)")
    deletions = [(x["category"], x["delete_on"]) for x in r["rows"] if x["delete_on"]]
    if deletions:
        print("\nEarliest deletion dates:")
        for cat, d in deletions:
            print(f"  • {cat}: {d}")
    if r["missing_period"]:
        print(f"\n🔴 No retention period (undefined = highest risk): {', '.join(r['missing_period'])}")
    if r["missing_basis"]:
        print(f"🔴 No legal/business basis (can't justify keeping): {', '.join(r['missing_basis'])}")


if __name__ == "__main__":
    main()
