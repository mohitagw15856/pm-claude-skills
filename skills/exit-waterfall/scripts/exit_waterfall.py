#!/usr/bin/env python3
"""Exit waterfall calculator for the exit-waterfall skill.

Given a cap table (share classes with liquidation preferences) and one or more
exit prices, computes who gets what at each price — showing where preferences
convert and where the founders' share collapses. Pure Python standard library —
no dependencies, no network access.

Model (documented simplifications)
----------------------------------
- Preferred classes are pari passu (no seniority stacking between them).
- Non-participating preferred takes max(preference, as-converted); conversion
  decisions are found by brute force over convert/no-convert subsets, picking
  the stable equilibrium (every class is best-responding).
- Participating preferred takes preference + pro-rata participation (no cap —
  capped participation is noted as a limitation, not modeled).
- Options exercise if the per-share common payout exceeds the strike
  (treasury method: strike proceeds join the pool); found by fixed-point
  iteration.
This is an educational model of the standard structures, not deal software.

Input
-----
JSON: {"classes": [...], "exits": [30000000, 60000000]}
Each class: {"name": str, "shares": int, "type": "common"|"preferred"|"options",
             "invested": float (preferred), "pref_multiple": float (default 1),
             "participating": bool (default false), "strike": float (options)}

Example (cap.json):

    {"classes": [
      {"name": "Founders",  "shares": 6000000, "type": "common"},
      {"name": "Seed",      "shares": 1500000, "type": "preferred", "invested": 2000000, "pref_multiple": 1},
      {"name": "Series A",  "shares": 2500000, "type": "preferred", "invested": 8000000, "pref_multiple": 1},
      {"name": "Options",   "shares": 1000000, "type": "options", "strike": 0.8}
     ],
     "exits": [10000000, 30000000, 60000000, 120000000]}

Usage
-----
    python3 exit_waterfall.py cap.json
    cat cap.json | python3 exit_waterfall.py - --json
    python3 exit_waterfall.py cap.json --exit 50000000
"""
from __future__ import annotations

import argparse
import itertools
import json
import sys


def load(src):
    data = sys.stdin.read() if src == "-" else open(src, encoding="utf-8").read()
    return json.loads(data)


def payouts_for_subset(classes, exit_value, converters, exercised):
    """Payouts given a fixed set of converting preferred + exercised options."""
    pool = exit_value
    pay = {c["name"]: 0.0 for c in classes}
    # 1. preferences for non-converting preferred (pari passu, pro-rated if short)
    prefs = [(c, c.get("invested", 0.0) * c.get("pref_multiple", 1.0))
             for c in classes if c["type"] == "preferred" and c["name"] not in converters]
    total_pref = sum(p for _, p in prefs)
    if total_pref > 0:
        scale = min(1.0, pool / total_pref)
        for c, p in prefs:
            pay[c["name"]] += p * scale
        pool -= min(pool, total_pref)
    # 2. strike proceeds join the pool (treasury method)
    strike_in = sum(c["shares"] * c.get("strike", 0.0) for c in classes
                    if c["type"] == "options" and c["name"] in exercised)
    pool += strike_in
    # 3. residual splits pro-rata: common + converted preferred + participating preferred + exercised options
    sharers = []
    for c in classes:
        if c["type"] == "common":
            sharers.append(c)
        elif c["type"] == "preferred" and (c["name"] in converters or c.get("participating")):
            sharers.append(c)
        elif c["type"] == "options" and c["name"] in exercised:
            sharers.append(c)
    total_shares = sum(c["shares"] for c in sharers)
    if total_shares > 0 and pool > 0:
        for c in sharers:
            pay[c["name"]] += pool * c["shares"] / total_shares
    # exercised options pay their strike back out of their proceeds
    for c in classes:
        if c["type"] == "options" and c["name"] in exercised:
            pay[c["name"]] -= c["shares"] * c.get("strike", 0.0)
    return pay


def solve(classes, exit_value):
    """Stable conversion equilibrium by brute force; options by fixed point."""
    np_pref = [c["name"] for c in classes if c["type"] == "preferred" and not c.get("participating")]
    opts = [c["name"] for c in classes if c["type"] == "options"]
    exercised = set(opts)  # start optimistic, iterate to fixed point
    for _ in range(6):
        best = None
        for combo in itertools.product([False, True], repeat=len(np_pref)):
            conv = {n for n, c in zip(np_pref, combo) if c}
            pay = payouts_for_subset(classes, exit_value, conv, exercised)
            stable = True
            for n in np_pref:
                alt = payouts_for_subset(
                    classes, exit_value,
                    conv ^ {n}, exercised)
                if alt[n] > pay[n] + 1e-6:
                    stable = False
                    break
            if stable:
                best = (conv, pay)
                break
        conv, pay = best if best else (set(), payouts_for_subset(classes, exit_value, set(), exercised))
        # re-decide option exercise from common's per-share value
        new_ex = set()
        for c in classes:
            if c["type"] == "options":
                per_share_pool = pay.get(c["name"], 0.0) / c["shares"] if c["name"] in exercised and c["shares"] else 0.0
                commons = [x for x in classes if x["type"] == "common"]
                per_common = (pay[commons[0]["name"]] / commons[0]["shares"]) if commons and commons[0]["shares"] else 0.0
                if per_common > c.get("strike", 0.0):
                    new_ex.add(c["name"])
        if new_ex == exercised:
            return conv, exercised, pay
        exercised = new_ex
    return conv, exercised, pay


def main(argv=None):
    ap = argparse.ArgumentParser(description="Exit waterfall: who gets what at each exit price.")
    ap.add_argument("input", help="JSON file with classes+exits, or - for stdin")
    ap.add_argument("--exit", type=float, action="append", help="Override/add an exit value (repeatable)")
    ap.add_argument("--json", action="store_true", help="JSON output")
    a = ap.parse_args(argv)
    data = load(a.input)
    classes = data["classes"]
    exits = sorted(a.exit if a.exit else data.get("exits", []))
    if not exits:
        ap.error("no exit values: provide in JSON or via --exit")
    rows = []
    for e in exits:
        conv, ex, pay = solve(classes, e)
        rows.append({"exit": e,
                     "converted": sorted(conv), "options_exercised": sorted(ex),
                     "payouts": {k: round(v, 2) for k, v in pay.items()}})
    if a.json:
        print(json.dumps({"results": rows}, indent=2))
        return 0
    names = [c["name"] for c in classes]
    print("Exit waterfall (educational model, pari passu preferences, uncapped participation)")
    header = "exit".rjust(14) + "".join(n.rjust(16) for n in names) + "  converts"
    print(header)
    for r in rows:
        line = f"{r['exit']:>14,.0f}"
        for n in names:
            line += f"{r['payouts'][n]:>16,.0f}"
        line += "  " + (",".join(r["converted"]) if r["converted"] else "-")
        print(line)
    return 0


if __name__ == "__main__":
    sys.exit(main())
