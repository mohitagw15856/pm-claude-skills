#!/usr/bin/env python3
"""Calibration report over prediction records (outcome-tracker skill).

Reads a JSON array of prediction records and reports, per framework and per
confidence band, how often predictions actually landed — so frameworks earn
trust from outcomes, not vibes. Standard library only.

Record fields used (others ignored):
  framework   str   what produced the claim, e.g. "rice-prioritisation"
  confidence  float 0.5-0.95, stated at decision time
  outcome     str   "hit" | "partial" | "miss" | "unresolvable" | absent=pending

Examples:
  python3 outcome_calibration.py predictions.json
  python3 outcome_calibration.py predictions.json --json
  echo '[{"framework":"rice-prioritisation","confidence":0.8,"outcome":"hit"}]' \\
    | python3 outcome_calibration.py -
"""
import argparse
import json
import sys
from collections import defaultdict

MIN_RESOLVED = 10  # below this, a hit rate is noise — say so instead

def load(path):
    raw = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(raw)
    if not isinstance(data, list):
        raise SystemExit("Expected a JSON array of prediction records.")
    return data

def band(conf):
    try:
        c = float(conf)
    except (TypeError, ValueError):
        return "unstated"
    for lo, hi, label in ((0, 0.6, "≈50%"), (0.6, 0.75, "≈70%"), (0.75, 0.87, "≈80%"), (0.87, 1.01, "≈90%+")):
        if lo <= c < hi:
            return label
    return "unstated"

def score(rows):
    """Hit rate with half credit for partials, over resolved predictions."""
    resolved = [r for r in rows if r.get("outcome") in ("hit", "partial", "miss")]
    if not resolved:
        return None, 0
    credit = sum(1.0 if r["outcome"] == "hit" else 0.5 if r["outcome"] == "partial" else 0.0 for r in resolved)
    return credit / len(resolved), len(resolved)

def report(records):
    out = {"total": len(records), "resolved": 0, "pending": 0, "unresolvable": 0,
           "frameworks": {}, "confidence_bands": {}, "flags": []}
    by_fw, by_band = defaultdict(list), defaultdict(list)
    for r in records:
        o = r.get("outcome")
        if o in ("hit", "partial", "miss"):
            out["resolved"] += 1
        elif o == "unresolvable":
            out["unresolvable"] += 1
        else:
            out["pending"] += 1
        by_fw[r.get("framework") or "unattributed"].append(r)
        by_band[band(r.get("confidence"))].append(r)

    for fw, rows in sorted(by_fw.items()):
        rate, n = score(rows)
        unres = sum(1 for r in rows if r.get("outcome") == "unresolvable")
        entry = {"resolved": n, "unresolvable": unres,
                 "hit_rate": round(rate, 3) if rate is not None else None,
                 "note": "insufficient history" if n < MIN_RESOLVED else ""}
        out["frameworks"][fw] = entry

    for b, rows in sorted(by_band.items()):
        rate, n = score(rows)
        target = {"≈50%": 0.5, "≈70%": 0.7, "≈80%": 0.8, "≈90%+": 0.9}.get(b)
        entry = {"resolved": n, "hit_rate": round(rate, 3) if rate is not None else None, "target": target}
        if rate is not None and target and n >= MIN_RESOLVED and rate < target - 0.15:
            entry["flag"] = "overconfident"
            out["flags"].append(f"{b} claims land {rate:.0%} of the time — stated confidence is inflated.")
        out["confidence_bands"][b] = entry

    if out["total"] and out["unresolvable"] / out["total"] > 0.3:
        out["flags"].append(
            f"{out['unresolvable']}/{out['total']} predictions unresolvable — instrument the metrics before making more bets.")
    return out

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input", help="JSON file of prediction records, or - for stdin")
    ap.add_argument("--json", action="store_true", help="emit the report as JSON (for chaining)")
    args = ap.parse_args()
    rep = report(load(args.input))
    if args.json:
        print(json.dumps(rep, indent=2))
        return
    print(f"Calibration — {rep['total']} predictions: {rep['resolved']} resolved, "
          f"{rep['pending']} pending, {rep['unresolvable']} unresolvable\n")
    print("Per framework:")
    for fw, e in rep["frameworks"].items():
        rate = f"{e['hit_rate']:.0%}" if e["hit_rate"] is not None else "—"
        note = f"  ({e['note']})" if e["note"] else ""
        print(f"  {fw:32s} {rate:>5s} over {e['resolved']} resolved{note}")
    print("\nPer stated confidence:")
    for b, e in rep["confidence_bands"].items():
        rate = f"{e['hit_rate']:.0%}" if e["hit_rate"] is not None else "—"
        tgt = f" (target ~{e['target']:.0%})" if e.get("target") else ""
        flag = "  ⚠ overconfident" if e.get("flag") else ""
        print(f"  {b:8s} {rate:>5s} over {e['resolved']} resolved{tgt}{flag}")
    for f in rep["flags"]:
        print(f"\n⚠ {f}")

if __name__ == "__main__":
    main()
