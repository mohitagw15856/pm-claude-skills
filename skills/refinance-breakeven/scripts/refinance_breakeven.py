#!/usr/bin/env python3
"""Refinance breakeven calculator for the refinance-breakeven skill.

Given the current loan and a refinance offer, computes the monthly-payment
delta, the month refinancing actually starts saving money, and total interest
on both paths — including the trap where a lower payment costs more because
the term reset. Pure Python standard library — no dependencies, no network.

Model
-----
- Standard amortization: payment = P * r / (1 - (1+r)^-n), r = monthly rate.
- Breakeven month = first month where cumulative payment savings exceed
  closing costs + points. (Simple-savings method; it ignores reinvestment and
  tax effects — the skill text says so.)
- Points are pct of the new balance, added to closing costs.

Usage
-----
    python3 refinance_breakeven.py --balance 380000 --rate 6.9 --months-left 336 \
        --new-rate 5.6 --new-term 360 --closing 6500
    python3 refinance_breakeven.py --json-input refi.json --json
"""
from __future__ import annotations

import argparse
import json
import sys


def payment(principal, annual_rate_pct, months):
    r = annual_rate_pct / 100.0 / 12.0
    if r == 0:
        return principal / months
    return principal * r / (1 - (1 + r) ** -months)


def total_interest(principal, annual_rate_pct, months):
    return payment(principal, annual_rate_pct, months) * months - principal


def main(argv=None):
    ap = argparse.ArgumentParser(description="Refi breakeven: the month a refinance starts saving money.")
    ap.add_argument("--balance", type=float, help="Current remaining balance")
    ap.add_argument("--rate", type=float, help="Current annual rate, percent")
    ap.add_argument("--months-left", type=int, help="Months remaining on current loan")
    ap.add_argument("--new-rate", type=float, help="Offered annual rate, percent")
    ap.add_argument("--new-term", type=int, help="New term in months")
    ap.add_argument("--closing", type=float, default=0.0, help="Closing costs, dollars")
    ap.add_argument("--points", type=float, default=0.0, help="Points, percent of balance")
    ap.add_argument("--json-input", help="Read the same fields from a JSON file (or - for stdin)")
    ap.add_argument("--json", action="store_true", help="JSON output")
    a = ap.parse_args(argv)
    if a.json_input:
        raw = sys.stdin.read() if a.json_input == "-" else open(a.json_input, encoding="utf-8").read()
        d = json.loads(raw)
        a.balance = d.get("balance", a.balance)
        a.rate = d.get("rate", a.rate)
        a.months_left = d.get("months_left", a.months_left)
        a.new_rate = d.get("new_rate", a.new_rate)
        a.new_term = d.get("new_term", a.new_term)
        a.closing = d.get("closing", a.closing)
        a.points = d.get("points", a.points)
    for f in ("balance", "rate", "months_left", "new_rate", "new_term"):
        if getattr(a, f) is None:
            ap.error(f"missing --{f.replace('_', '-')}")
    cost = a.closing + a.balance * a.points / 100.0
    old_pay = payment(a.balance, a.rate, a.months_left)
    new_pay = payment(a.balance, a.new_rate, a.new_term)
    delta = old_pay - new_pay
    breakeven = None
    if delta > 0:
        m, saved = 0, 0.0
        while saved < cost and m < 1200:
            m += 1
            saved += delta
        breakeven = m if saved >= cost else None
    old_int = total_interest(a.balance, a.rate, a.months_left)
    new_int = total_interest(a.balance, a.new_rate, a.new_term) + cost
    out = {
        "old_payment": round(old_pay, 2), "new_payment": round(new_pay, 2),
        "monthly_delta": round(delta, 2), "upfront_cost": round(cost, 2),
        "breakeven_month": breakeven,
        "total_interest_keep": round(old_int, 2),
        "total_interest_refi_plus_costs": round(new_int, 2),
        "term_extended_months": max(0, a.new_term - a.months_left),
    }
    if a.json:
        print(json.dumps(out, indent=2))
        return 0
    print(f"payment: {old_pay:,.2f} -> {new_pay:,.2f}  (delta {delta:+,.2f}/mo)")
    print(f"upfront cost: {cost:,.2f}")
    if breakeven:
        print(f"breakeven: month {breakeven}  — if you sell or re-refi before month {breakeven}, don't.")
    elif delta <= 0:
        print("breakeven: never — the new payment is not lower.")
    else:
        print("breakeven: beyond 100 years — effectively never.")
    print(f"total interest if you keep:            {old_int:,.2f}")
    print(f"total interest if you refi (+costs):   {new_int:,.2f}")
    if out["term_extended_months"] > 0:
        print(f"⚠ term reset: {out['term_extended_months']} extra months — "
              f"a lower payment can still cost more in total. Compare the interest lines, not the payments.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
