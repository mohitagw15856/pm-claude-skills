#!/usr/bin/env python3
"""Debt payoff calculator for the debt-payoff skill.

Simulates avalanche (highest APR first) vs snowball (smallest balance first)
month by month: payoff date and total interest for each. Deterministic,
stdlib only.

Usage
-----
    python3 debt_payoff.py --debt "visa:9000:24.9:180" --debt "loan:3000:6:60" --extra 200
    python3 debt_payoff.py --debt "a:2000:19:50" --debt "b:9000:6:180" --extra 150 --json

Each --debt is name:balance:apr:minimum. --extra is the monthly amount beyond
the minimums, applied to the strategy's current target debt.
"""
from __future__ import annotations
import argparse, json, sys

def simulate(debts, extra, order_key):
    debts = [dict(d) for d in debts]
    months, interest_total, log = 0, 0.0, []
    while any(d["bal"] > 0.005 for d in debts) and months < 1200:
        months += 1
        for d in debts:
            if d["bal"] > 0:
                i = d["bal"] * d["apr"] / 100 / 12
                d["bal"] += i
                interest_total += i
        budget = extra + sum(d["min"] for d in debts if d["bal"] > 0)
        live = sorted((d for d in debts if d["bal"] > 0), key=order_key)
        # minimums first, then the surplus cascades onto the target debt(s)
        for d in live:
            pay = min(d["min"], d["bal"])
            d["bal"] -= pay
            budget -= pay
        for d in live:
            if budget <= 0:
                break
            pay = min(budget, d["bal"])
            d["bal"] -= pay
            budget -= pay
        for d in debts:
            if d["bal"] <= 0.005 and not d.get("done"):
                d["done"] = True
                log.append({"month": months, "paid_off": d["name"]})
    return {"months": months, "total_interest": round(interest_total, 2), "payoff_order": log}

def main(argv=None):
    ap = argparse.ArgumentParser(description="Avalanche vs snowball: payoff timeline and total interest.")
    ap.add_argument("--debt", action="append", required=True,
                    help="name:balance:apr:minimum (repeatable)")
    ap.add_argument("--extra", type=float, default=0, help="Monthly amount beyond the minimums (default 0)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    debts = []
    for spec in a.debt:
        try:
            name, bal, apr, mn = spec.split(":")
            debts.append({"name": name, "bal": float(bal), "apr": float(apr), "min": float(mn)})
        except ValueError:
            ap.error(f"bad --debt '{spec}' — expected name:balance:apr:minimum")

    ava = simulate(debts, a.extra, lambda d: (-d["apr"], d["name"]))
    sno = simulate(debts, a.extra, lambda d: (d["bal"], d["name"]))
    out = {"debts": [{k: d[k] for k in ("name", "bal", "apr", "min")} for d in debts],
           "extra_monthly": a.extra,
           "avalanche": ava, "snowball": sno,
           "interest_saved_by_avalanche": round(sno["total_interest"] - ava["total_interest"], 2)}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    total = sum(d["bal"] for d in debts)
    print(f"{len(debts)} debts, {total:,.0f} total, {a.extra:,.0f}/mo extra:")
    for name, r in (("avalanche (highest APR first)", ava), ("snowball (smallest balance first)", sno)):
        yrs = f"{r['months']} months ({r['months']/12:.1f} yrs)"
        print(f"  {name:<34} debt-free in {yrs} · interest paid: {r['total_interest']:,.2f}")
    d = out["interest_saved_by_avalanche"]
    if abs(d) < 0.01:
        print("  identical cost here — pick snowball for the early wins.")
    else:
        print(f"  avalanche saves {d:,.2f} in interest; snowball buys earlier paid-off moments — both beat minimum-only by miles.")
    print("assumes fixed APRs, on-time payments, no new charges. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
