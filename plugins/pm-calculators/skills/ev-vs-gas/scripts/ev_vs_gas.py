#!/usr/bin/env python3
"""EV vs gas total-cost calculator for the ev-vs-gas skill.

Cumulative cost per year for an EV and a comparable gas car: purchase price
(minus incentives), energy vs fuel, maintenance delta, resale. Reports the
crossover year, if any. Deterministic, stdlib only.

Usage
-----
    python3 ev_vs_gas.py --ev-price 42000 --gas-price 33000
    python3 ev_vs_gas.py --ev-price 42000 --gas-price 33000 --incentive 7500 \
        --miles 15000 --kwh-price 0.16 --gas-price-gal 3.60 --json
"""
from __future__ import annotations
import argparse, json, sys

def main(argv=None):
    ap = argparse.ArgumentParser(description="EV vs gas cumulative cost and crossover year.")
    ap.add_argument("--ev-price", type=float, required=True)
    ap.add_argument("--gas-price", type=float, required=True, help="Comparable gas car price")
    ap.add_argument("--incentive", type=float, default=0, help="EV incentives/credits applied at purchase (default 0)")
    ap.add_argument("--miles", type=float, default=12000, help="Miles/yr (default 12000)")
    ap.add_argument("--ev-eff", type=float, default=3.3, help="EV efficiency mi/kWh (default 3.3)")
    ap.add_argument("--kwh-price", type=float, default=0.15, help="$/kWh incl. charging mix (default 0.15)")
    ap.add_argument("--mpg", type=float, default=32, help="Gas car mpg (default 32)")
    ap.add_argument("--gas-price-gal", type=float, default=3.50, help="$/gallon (default 3.50)")
    ap.add_argument("--ev-maint", type=float, default=500, help="EV maintenance $/yr (default 500)")
    ap.add_argument("--gas-maint", type=float, default=900, help="Gas maintenance $/yr (default 900)")
    ap.add_argument("--insurance-delta", type=float, default=150, help="EV insurance premium over gas $/yr (default 150)")
    ap.add_argument("--horizon", type=int, default=10, help="Years (default 10)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    ev_energy_yr = a.miles / a.ev_eff * a.kwh_price
    gas_fuel_yr = a.miles / a.mpg * a.gas_price_gal
    ev_start = a.ev_price - a.incentive
    rows, crossover = [], None
    ev_cum, gas_cum = ev_start, a.gas_price
    for y in range(1, a.horizon + 1):
        ev_cum += ev_energy_yr + a.ev_maint + a.insurance_delta
        gas_cum += gas_fuel_yr + a.gas_maint
        rows.append({"year": y, "ev_cum": round(ev_cum), "gas_cum": round(gas_cum),
                     "ev_lead": round(gas_cum - ev_cum)})
        if crossover is None and ev_cum < gas_cum:
            crossover = y
    out = {"upfront_gap": round(ev_start - a.gas_price),
           "annual_energy": {"ev": round(ev_energy_yr), "gas": round(gas_fuel_yr),
                              "ev_saves": round(gas_fuel_yr - ev_energy_yr)},
           "annual_maint_delta": a.gas_maint - a.ev_maint,
           "insurance_delta": a.insurance_delta,
           "crossover_year": crossover, "rows": rows,
           "not_modeled": ["battery replacement risk / warranty", "resale-value differences (evolving market)",
                            "home-charger install cost (add to --ev-price)", "gas/electricity price drift"]}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"upfront: EV {ev_start:,.0f} (after {a.incentive:,.0f} incentive) vs gas {a.gas_price:,.0f} — gap {out['upfront_gap']:+,}")
    print(f"per year: energy {ev_energy_yr:,.0f} vs fuel {gas_fuel_yr:,.0f} (EV saves {out['annual_energy']['ev_saves']:,}) · maintenance delta {out['annual_maint_delta']:,} · insurance {a.insurance_delta:+,}")
    print("year     EV cumulative   gas cumulative     EV lead")
    for r in rows:
        print(f"{r['year']:>4} {r['ev_cum']:>15,} {r['gas_cum']:>16,} {r['ev_lead']:>11,}")
    print(f"crossover: {'year ' + str(crossover) if crossover else 'not within horizon'} — before it the gas car is ahead on cost; after it the EV is.")
    print("not modeled: battery risk, resale deltas, charger install, price drift. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
