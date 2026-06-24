#!/usr/bin/env python3
"""SOC 2 readiness scorer for the soc2-readiness skill.

Scores readiness from a control list so the headline number is computed, not
eyeballed. Each control is met (1.0), partial (0.5), or gap (0.0), optionally
weighted; the score is the weighted fraction, reported per Trust Services
Criterion and overall, with the open gaps listed. Pure standard library — no
dependencies, no network.

Input
-----
A JSON list of controls (file path or '-' for stdin). Each control needs:
  criterion : the TSC group, e.g. "Security", "Availability"
  control   : the control description
  status    : "met" | "partial" | "gap"  (case-insensitive)
  weight    : optional number (default 1) — use >1 for critical controls

Example (controls.json):
  [
    {"criterion": "Security", "control": "MFA on all admin access", "status": "met", "weight": 2},
    {"criterion": "Security", "control": "Quarterly access reviews", "status": "partial"},
    {"criterion": "Availability", "control": "Tested backups", "status": "gap"}
  ]

Usage
-----
  python3 soc2_score.py controls.json
  python3 soc2_score.py controls.json --json
  cat controls.json | python3 soc2_score.py -
"""
import argparse
import json
import sys

SCORE = {"met": 1.0, "partial": 0.5, "gap": 0.0}


def load(path):
    text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(text)
    if not isinstance(data, list):
        raise ValueError("Expected a JSON list of controls.")
    return data


def score(controls):
    groups = {}
    gaps = []
    for c in controls:
        crit = c.get("criterion", "Uncategorised")
        status = str(c.get("status", "gap")).lower()
        if status not in SCORE:
            raise ValueError(f"Bad status {status!r} for {c.get('control')!r} (use met/partial/gap).")
        w = float(c.get("weight", 1) or 1)
        g = groups.setdefault(crit, {"got": 0.0, "max": 0.0, "n": 0})
        g["got"] += SCORE[status] * w
        g["max"] += w
        g["n"] += 1
        if status != "met":
            gaps.append({"criterion": crit, "control": c.get("control", ""), "status": status, "weight": w})
    per = {k: round(100 * v["got"] / v["max"], 1) if v["max"] else 0.0 for k, v in groups.items()}
    tot_got = sum(v["got"] for v in groups.values())
    tot_max = sum(v["max"] for v in groups.values())
    overall = round(100 * tot_got / tot_max, 1) if tot_max else 0.0
    # Highest-weight, furthest-from-met gaps first.
    gaps.sort(key=lambda x: (x["status"] != "gap", -x["weight"], x["criterion"]))
    return {"overall": overall, "per_criterion": per, "controls": len(controls), "gaps": gaps}


def main():
    ap = argparse.ArgumentParser(description="Score SOC 2 readiness from a control list.")
    ap.add_argument("input", help="controls JSON file, or - for stdin")
    ap.add_argument("--json", action="store_true", help="emit JSON")
    args = ap.parse_args()
    try:
        result = score(load(args.input))
    except Exception as e:  # noqa: BLE001 — surface a clean message, not a traceback
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps(result, indent=2))
        return

    print(f"SOC 2 readiness: {result['overall']}%  ({result['controls']} controls)")
    print("\nBy criterion:")
    for crit, pct in sorted(result["per_criterion"].items(), key=lambda x: x[1]):
        bar = "█" * int(pct // 5)
        print(f"  {pct:5.1f}%  {bar:<20} {crit}")
    if result["overall"] < 85:
        print("\n⚠ Below ~85% — not yet audit-ready.")
    if result["gaps"]:
        print(f"\nOpen items ({len(result['gaps'])}), fix the gaps first:")
        for g in result["gaps"]:
            mark = "🔴" if g["status"] == "gap" else "🟡"
            print(f"  {mark} [{g['criterion']}] {g['control']}")


if __name__ == "__main__":
    main()
