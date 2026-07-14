#!/usr/bin/env python3
"""Job-offer comparison calculator for the offer-comparison skill.

Computes year-by-year and cumulative total compensation for two or more offers
over a 4-year horizon — vesting schedules, cliffs, bonuses, 401(k) match — and
reports the crossover year. Pure Python standard library — no dependencies,
no network access.

Model (documented simplifications)
----------------------------------
- Equity is valued at the grant value supplied (your risk adjustment is an
  input, not a hidden assumption: pass private-company equity pre-discounted).
- Vesting: cliff (months), then even monthly or annual vesting over vest_years.
- Bonus is bonus_pct of base, assumed paid in full each year.
- 401(k) match: match_pct of base up to match_cap dollars (0 = no cap).
- No raises/refreshers unless refresh_per_year (a flat annual $ of new vesting
  value starting year 2) is given. Real offers drift — rerun with new numbers.

Input
-----
JSON list of offers:

    [
      {"name": "BigCo",   "base": 190000, "bonus_pct": 15, "equity_total": 240000,
       "vest_years": 4, "cliff_months": 12, "vest_freq": "monthly",
       "match_pct": 4, "match_cap": 0},
      {"name": "Startup", "base": 165000, "bonus_pct": 0,  "equity_total": 400000,
       "vest_years": 4, "cliff_months": 12, "vest_freq": "monthly"}
    ]

Usage
-----
    python3 offer_comparison.py offers.json
    cat offers.json | python3 offer_comparison.py - --json
    python3 offer_comparison.py offers.json --years 4
"""
from __future__ import annotations

import argparse
import json
import sys


def vested_in_year(o, year):
    """Equity value vesting during calendar year `year` (1-based)."""
    total = o.get("equity_total", 0.0)
    vy = o.get("vest_years", 4)
    cliff = o.get("cliff_months", 12)
    freq = o.get("vest_freq", "monthly")
    if total <= 0 or vy <= 0:
        return 0.0
    per_month = total / (vy * 12)
    months = range((year - 1) * 12 + 1, year * 12 + 1)
    if freq == "annual":
        # vests in a lump at each anniversary month 12, 24, ...
        vested = 0.0
        for m in months:
            if m % 12 == 0 and m >= max(cliff, 12) and m <= vy * 12:
                vested += total / vy
        return vested
    vested = 0.0
    for m in months:
        if m > vy * 12:
            break
        if m < cliff:
            continue
        if m == cliff:
            vested += per_month * cliff  # cliff releases the accrued months
        else:
            vested += per_month
    return vested


def year_comp(o, year):
    base = o.get("base", 0.0)
    bonus = base * o.get("bonus_pct", 0.0) / 100.0
    match = base * o.get("match_pct", 0.0) / 100.0
    cap = o.get("match_cap", 0.0)
    if cap:
        match = min(match, cap)
    equity = vested_in_year(o, year)
    refresh = o.get("refresh_per_year", 0.0) if year >= 2 else 0.0
    return base + bonus + match + equity + refresh


def main(argv=None):
    ap = argparse.ArgumentParser(description="Compare job offers: total comp per year + crossover.")
    ap.add_argument("input", help="JSON file with a list of offers, or - for stdin")
    ap.add_argument("--years", type=int, default=4, help="Horizon in years (default 4)")
    ap.add_argument("--json", action="store_true", help="JSON output")
    a = ap.parse_args(argv)
    raw = sys.stdin.read() if a.input == "-" else open(a.input, encoding="utf-8").read()
    offers = json.loads(raw)
    if not isinstance(offers, list) or len(offers) < 2:
        ap.error("need a JSON list of 2+ offers")
    table = []
    for y in range(1, a.years + 1):
        row = {"year": y}
        for o in offers:
            row[o["name"]] = round(year_comp(o, y), 2)
        table.append(row)
    cum = {o["name"]: 0.0 for o in offers}
    cumrows = []
    crossover = None
    names = [o["name"] for o in offers]
    prev_leader = None
    for row in table:
        for n in names:
            cum[n] += row[n]
        leader = max(names, key=lambda n: cum[n])
        if prev_leader and leader != prev_leader and crossover is None:
            crossover = row["year"]
        prev_leader = leader
        cumrows.append({"year": row["year"], **{n: round(cum[n], 2) for n in names}})
    out = {"per_year": table, "cumulative": cumrows,
           "leader_end": prev_leader, "crossover_year": crossover}
    if a.json:
        print(json.dumps(out, indent=2))
        return 0
    print("Total comp per year (equity at supplied grant value — risk-adjust private equity yourself)")
    print("year".rjust(6) + "".join(n.rjust(16) for n in names))
    for row in table:
        print(f"{row['year']:>6}" + "".join(f"{row[n]:>16,.0f}" for n in names))
    print("cumulative:")
    for row in cumrows:
        print(f"{row['year']:>6}" + "".join(f"{row[n]:>16,.0f}" for n in names))
    print(f"leader at year {a.years}: {prev_leader}"
          + (f" · leadership changed in year {crossover}" if crossover else " · no crossover"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
