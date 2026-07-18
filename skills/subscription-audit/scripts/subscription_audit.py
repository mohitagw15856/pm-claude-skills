#!/usr/bin/env python3
"""Subscription audit calculator for the subscription-audit skill.

Annualizes every recurring charge, ranks the leak, and totals it per year,
per month, and per day. Deterministic, stdlib only.

Usage
-----
    python3 subscription_audit.py --sub "streaming-a:15.99:monthly" --sub "cloud:2.99:monthly" --sub "vpn:71.88:yearly"
    python3 subscription_audit.py --sub "gym:45:monthly" --sub "news:4:weekly" --json

Cadences: weekly, monthly, quarterly, yearly.
"""
from __future__ import annotations
import argparse, json, sys

MULT = {"weekly": 52, "monthly": 12, "quarterly": 4, "yearly": 1}

def main(argv=None):
    ap = argparse.ArgumentParser(description="Annualize and rank recurring charges.")
    ap.add_argument("--sub", action="append", required=True, help="name:amount:cadence (repeatable)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    subs = []
    for spec in a.sub:
        try:
            name, amt, cad = spec.split(":")
            cad = cad.lower()
            if cad not in MULT:
                ap.error(f"cadence '{cad}' not in {sorted(MULT)}")
            subs.append({"name": name, "amount": float(amt), "cadence": cad,
                         "per_year": round(float(amt) * MULT[cad], 2)})
        except ValueError:
            ap.error(f"bad --sub '{spec}' — expected name:amount:cadence")

    subs.sort(key=lambda s: (-s["per_year"], s["name"]))
    total = round(sum(s["per_year"] for s in subs), 2)
    out = {"subscriptions": subs, "count": len(subs),
           "per_year": total, "per_month": round(total / 12, 2), "per_day": round(total / 365, 2),
           "top_three_share_pct": round(sum(s["per_year"] for s in subs[:3]) / total * 100, 1) if total else 0}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"{'subscription':<22}{'cadence':>10}{'charge':>10}{'per year':>12}")
    for s in subs:
        print(f"{s['name']:<22}{s['cadence']:>10}{s['amount']:>10,.2f}{s['per_year']:>12,.2f}")
    print(f"{len(subs)} subscriptions = {total:,.2f}/year · {total/12:,.2f}/month · {total/365:,.2f}/day")
    print(f"the top 3 are {out['top_three_share_pct']:g}% of the leak — start there. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
